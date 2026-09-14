"""Build the original WERKFORM Signature assembly, GLB and fallback render."""
import bpy
import math
from pathlib import Path
from mathutils import Vector

ROOT = Path(__file__).resolve().parents[3]
ASSET_DIR = ROOT / "website" / "public" / "assets" / "signature" / "werkform"
ASSET_DIR.mkdir(parents=True, exist_ok=True)

bpy.ops.wm.read_factory_settings(use_empty=True)

def material(name, base, metallic=1.0, roughness=0.28):
    mat = bpy.data.materials.new(name)
    mat.diffuse_color = (*base, 1)
    mat.use_nodes = True
    node = mat.node_tree.nodes.get("Principled BSDF")
    node.inputs["Base Color"].default_value = (*base, 1)
    node.inputs["Metallic"].default_value = metallic
    node.inputs["Roughness"].default_value = roughness
    return mat

STEEL = material("Brushed_Steel", (0.32, 0.34, 0.35), 1.0, 0.24)
DARK = material("Dark_Steel", (0.085, 0.095, 0.10), 1.0, 0.3)
BRIGHT = material("Machined_Edges", (0.55, 0.57, 0.58), 1.0, 0.18)
BLACK = material("Recess_Shadow", (0.012, 0.014, 0.015), 0.25, 0.38)

PARTS = []

def smooth(obj):
    if obj.type == "MESH":
        for polygon in obj.data.polygons:
            polygon.use_smooth = True

def box(name, location, scale, mat=STEEL, bevel=0.11):
    bpy.ops.mesh.primitive_cube_add(location=location)
    obj = bpy.context.object
    obj.name = name
    obj.scale = (scale[0] / 2, scale[1] / 2, scale[2] / 2)
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    bevel_mod = obj.modifiers.new("Precision_Bevel", "BEVEL")
    bevel_mod.width = bevel
    bevel_mod.segments = 3
    bevel_mod.limit_method = "ANGLE"
    bpy.context.view_layer.objects.active = obj
    bpy.ops.object.modifier_apply(modifier=bevel_mod.name)
    obj.data.materials.append(mat)
    PARTS.append(obj)
    return obj

def cylinder(name, location, radius, depth, mat=STEEL, vertices=32, rotation=(0,0,0), bevel=0.04, track=True):
    bpy.ops.mesh.primitive_cylinder_add(vertices=vertices, radius=radius, depth=depth, location=location, rotation=rotation)
    obj = bpy.context.object
    obj.name = name
    if bevel:
        mod = obj.modifiers.new("Edge_Bevel", "BEVEL")
        mod.width = bevel
        mod.segments = 2
        bpy.context.view_layer.objects.active = obj
        bpy.ops.object.modifier_apply(modifier=mod.name)
    smooth(obj)
    obj.data.materials.append(mat)
    if track:
        PARTS.append(obj)
    return obj

def cut_holes(target, specs, axis="Z"):
    for index, (a, b, radius) in enumerate(specs):
        if axis == "Z":
            cutter = cylinder(f"cutter_{target.name}_{index}", (a, b, target.location.z), radius, 12, BLACK, 28, track=False)
        elif axis == "X":
            cutter = cylinder(f"cutter_{target.name}_{index}", (target.location.x, a, b), radius, 12, BLACK, 28, rotation=(0, math.pi/2, 0), track=False)
        else:
            cutter = cylinder(f"cutter_{target.name}_{index}", (a, target.location.y, b), radius, 12, BLACK, 28, rotation=(math.pi/2, 0, 0), track=False)
        mod = target.modifiers.new(f"Hole_{index}", "BOOLEAN")
        mod.operation = "DIFFERENCE"
        mod.solver = "EXACT"
        mod.object = cutter
        bpy.context.view_layer.objects.active = target
        bpy.ops.object.modifier_apply(modifier=mod.name)
        bpy.data.objects.remove(cutter, do_unlink=True)

def join_as(name, objects, mat=None):
    bpy.ops.object.select_all(action="DESELECT")
    for obj in objects:
        obj.select_set(True)
    bpy.context.view_layer.objects.active = objects[0]
    bpy.ops.object.join()
    result = bpy.context.object
    result.name = name
    if mat and len(result.data.materials) == 0:
        result.data.materials.append(mat)
    PARTS.append(result)
    return result

def washer(name, location, axis="Z", radius=.32, hole=.19):
    rotation = (0,0,0) if axis == "Z" else (0,math.pi/2,0) if axis == "X" else (math.pi/2,0,0)
    result = cylinder(name, location, radius, .09, BRIGHT, 36, rotation=rotation, bevel=.02)
    if axis == "Z":
        cut_holes(result, [(location[0], location[1], hole)], "Z")
    elif axis == "X":
        cut_holes(result, [(location[1], location[2], hole)], "X")
    else:
        cut_holes(result, [(location[0], location[2], hole)], "Y")
    return result

def nut(name, location):
    result = cylinder(name, location, .34, .27, DARK, 6, bevel=.035)
    cut_holes(result, [(location[0], location[1], .18)], "Z")
    return result

def bolt(name, location, length=1.25, axis="Z", direction=1):
    rotation = (0,0,0) if axis == "Z" else (0, math.pi/2, 0)
    pieces = []
    shaft = cylinder(name + "_shaft", location, .17, length, BRIGHT, 24, rotation=rotation, bevel=.025, track=False)
    pieces.append(shaft)
    if axis == "Z":
        head_loc = (location[0], location[1], location[2] + length/2 + .11)
    else:
        head_loc = (location[0] + direction * (length/2 + .11), location[1], location[2])
    head = cylinder(name + "_head", head_loc, .34, .22, BRIGHT, 6, rotation=rotation, bevel=.035, track=False)
    if axis == "Z":
        cut_holes(head, [(head_loc[0], head_loc[1], .115)], "Z")
    else:
        cut_holes(head, [(head_loc[1], head_loc[2], .115)], "X")
    pieces.append(head)
    for index in range(7):
        offset = -length * .39 + index * length * .09
        thread_location = (location[0], location[1], location[2] + offset) if axis == "Z" else (location[0] + offset, location[1], location[2])
        bpy.ops.mesh.primitive_torus_add(
            major_radius=.163,
            minor_radius=.018,
            major_segments=24,
            minor_segments=6,
            location=thread_location,
            rotation=rotation,
        )
        thread = bpy.context.object
        thread.name = f"{name}_thread_{index}"
        thread.data.materials.append(BRIGHT)
        smooth(thread)
        pieces.append(thread)
    return join_as(name, pieces)

def engrave_text(target, body, location, size=.34):
    bpy.ops.object.text_add(location=location)
    inset = bpy.context.object
    inset.name = "Engraving_Inlay"
    inset.data.body = body
    inset.data.align_x = "CENTER"
    inset.data.align_y = "CENTER"
    inset.data.size = size
    inset.data.extrude = .006
    inset.data.bevel_depth = .002
    inset.data.bevel_resolution = 1
    bpy.ops.object.convert(target="MESH")
    inset.data.materials.clear()
    inset.data.materials.append(BLACK)
    bpy.ops.object.select_all(action="DESELECT")
    target.select_set(True)
    inset.select_set(True)
    bpy.context.view_layer.objects.active = target
    bpy.ops.object.join()
    target.name = "Base_Plate"

# Functional idler-roller bearing bracket: the base transfers loads into the
# machine frame, two cheeks carry a serviceable axle, and the rear brace plus
# gussets prevent the cheeks from spreading under radial load.
base = box("Base_Plate", (0, 0, .24), (6.4, 4.8, .48), STEEL, .15)
cut_holes(base, [(-2.35,-1.55,.25),(2.35,-1.55,.25),(-2.35,1.55,.25),(2.35,1.55,.25)])

roller_y = -.42
roller_z = 2.35
left = box("Side_Cheek_Left", (-2.15, .25, 2.15), (.48, 3.75, 3.8), DARK, .14)
right = box("Side_Cheek_Right", (2.15, .25, 2.15), (.48, 3.75, 3.8), DARK, .14)
for cheek in (left, right):
    cut_holes(cheek, [(roller_y,roller_z,.58),(roller_y,roller_z-.92,.20),(roller_y,roller_z+.92,.20)], "X")

rear = box("Rear_Cross_Brace", (0, 1.88, 2.78), (3.85, .42, 1.45), STEEL, .12)
cut_holes(rear, [(-1.35,2.52,.22),(1.35,2.52,.22)], "Y")

gusset_l = box("Gusset_Left", (-1.62, 1.42, 1.02), (.84, .72, 1.32), DARK, .12)
gusset_l.rotation_euler.y = math.radians(-14)
gusset_r = box("Gusset_Right", (1.62, 1.42, 1.02), (.84, .72, 1.32), DARK, .12)
gusset_r.rotation_euler.y = math.radians(14)

# Replaceable steel roller with two bearing cartridges on a shoulder axle.
roller_pieces = [
    cylinder("roller_core", (0,roller_y,roller_z), 1.02, 2.9, STEEL, 48, rotation=(0,math.pi/2,0), bevel=.09, track=False),
    cylinder("roller_flange_l", (-1.34,roller_y,roller_z), 1.13, .18, DARK, 48, rotation=(0,math.pi/2,0), bevel=.04, track=False),
    cylinder("roller_flange_r", (1.34,roller_y,roller_z), 1.13, .18, DARK, 48, rotation=(0,math.pi/2,0), bevel=.04, track=False),
]
roller = join_as("Idler_Roller", roller_pieces)
cut_holes(roller, [(roller_y,roller_z,.34)], "X")
shaft = cylinder("Roller_Shaft", (0,roller_y,roller_z), .28, 5.25, BRIGHT, 40, rotation=(0,math.pi/2,0), bevel=.045)

for side, x, direction in (("Left",-2.43,-1),("Right",2.43,1)):
    housing = cylinder(f"Bearing_Housing_{side}", (x,roller_y,roller_z), .86, .22, DARK, 40, rotation=(0,math.pi/2,0), bevel=.055)
    cut_holes(housing, [(roller_y,roller_z,.51)], "X")
    bearing = cylinder(f"Bearing_Cartridge_{side}", (x + direction*.14,roller_y,roller_z), .54, .28, BRIGHT, 48, rotation=(0,math.pi/2,0), bevel=.035)
    cut_holes(bearing, [(roller_y,roller_z,.30)], "X")
    cylinder(f"Spacer_{side}", (direction*1.62,roller_y,roller_z), .43, .22, BRIGHT, 36, rotation=(0,math.pi/2,0), bevel=.03)
    washer(f"Retaining_Washer_{side}", (direction*2.68,roller_y,roller_z), "X", .42, .30)
    bolt(f"Shaft_End_Bolt_{side}", (direction*2.62,roller_y,roller_z), .52, "X", direction)

# Four anchors secure the base to the machine bed.
for label, x, y in (("FL",-2.35,-1.55),("FR",2.35,-1.55),("RL",-2.35,1.55),("RR",2.35,1.55)):
    bolt(f"Base_Bolt_{label}", (x,y,.34), .86)
    washer(f"Base_Washer_{label}", (x,y,.52))

# Two service bolts per cheek retain the bearing housings.
for side, x, direction in (("L",-2.22,-1),("R",2.22,1)):
    for position, z in (("Lower",roller_z-.92),("Upper",roller_z+.92)):
        bolt(f"Housing_Bolt_{side}_{position}", (x,roller_y,z), .72, "X", direction)

# Shallow recessed brand mark on the machine-facing top surface.
engrave_text(base, "WERKFORM", (0,-2.03,.478), .34)

# Metadata makes the node purpose inspectable in the GLB.
for index, obj in enumerate(PARTS):
    obj["werkform_part"] = True
    obj["assembly_index"] = index
    obj["material_note"] = "Illustrative PBR steel; no certified material specification"

# Studio floor and backdrop only for the fallback render.
bpy.ops.mesh.primitive_plane_add(size=40, location=(0,0,-.03))
floor = bpy.context.object
floor.name = "Render_Floor"
floor.data.materials.append(material("Studio_Floor", (.035,.04,.04), .15, .31))

bpy.context.scene.render.engine = "BLENDER_EEVEE"
bpy.context.scene.render.resolution_x = 1200
bpy.context.scene.render.resolution_y = 900
bpy.context.scene.render.resolution_percentage = 100
bpy.context.scene.render.image_settings.file_format = "WEBP"
bpy.context.scene.render.image_settings.quality = 88
bpy.context.scene.render.film_transparent = False
bpy.context.scene.render.filepath = str(ASSET_DIR / "werkform-assembly-fallback.webp")
world = bpy.data.worlds.new("WERKFORM_Studio")
world.color = (.012,.014,.014)
bpy.context.scene.world = world

def area(name, location, energy, size, color):
    data = bpy.data.lights.new(name, "AREA")
    data.energy = energy
    data.shape = "DISK"
    data.size = size
    data.color = color
    obj = bpy.data.objects.new(name, data)
    bpy.context.collection.objects.link(obj)
    obj.location = location
    direction = Vector((0,0,2.0)) - obj.location
    obj.rotation_euler = direction.to_track_quat('-Z','Y').to_euler()
    return obj

area("Key_Softbox", (-5,-6,8), 1150, 5.0, (1.0,.82,.64))
area("Rim_Softbox", (6,2,7), 1450, 4.0, (.66,.79,1.0))
area("Top_Softbox", (0,2,10), 900, 3.0, (1.0,1.0,1.0))

bpy.ops.object.camera_add(location=(10.2,-12.8,8.4))
camera = bpy.context.object
camera.name = "Fallback_Camera"
direction = Vector((0,0.15,2.25)) - camera.location
camera.rotation_euler = direction.to_track_quat('-Z','Y').to_euler()
camera.data.lens = 60
bpy.context.scene.camera = camera
bpy.ops.wm.save_as_mainfile(filepath=str(ROOT / "design" / "signature" / "werkform" / "werkform-assembly-source.blend"))
bpy.ops.render.render(write_still=True)

# Export only the assembly parts, never render lights/floor/camera.
bpy.ops.object.select_all(action="DESELECT")
for obj in PARTS:
    obj.select_set(True)
bpy.context.view_layer.objects.active = PARTS[0]
bpy.ops.export_scene.gltf(
    filepath=str(ASSET_DIR / "werkform-assembly.glb"),
    export_format="GLB",
    use_selection=True,
    export_apply=True,
    export_extras=True,
    export_materials="EXPORT",
    export_cameras=False,
    export_lights=False,
)
print(f"Exported {len(PARTS)} named parts")
