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

def bolt(name, location, length=1.25, axis="Z"):
    rotation = (0,0,0) if axis == "Z" else (0, math.pi/2, 0)
    pieces = []
    shaft = cylinder(name + "_shaft", location, .17, length, BRIGHT, 24, rotation=rotation, bevel=.025, track=False)
    pieces.append(shaft)
    if axis == "Z":
        head_loc = (location[0], location[1], location[2] + length/2 + .11)
    else:
        head_loc = (location[0] + length/2 + .11, location[1], location[2])
    head = cylinder(name + "_head", head_loc, .34, .22, BRIGHT, 6, rotation=rotation, bevel=.035, track=False)
    pieces.append(head)
    return join_as(name, pieces)

# Main load-bearing structure.
base = box("Base_Plate", (0, 0, .22), (6.4, 4.8, .44), STEEL, .15)
cut_holes(base, [(-2.35,-1.55,.24),(2.35,-1.55,.24),(-2.35,1.55,.24),(2.35,1.55,.24),(0,-1.55,.28),(0,1.55,.28)])

left = box("Upright_Left", (-2.78, .35, 2.25), (.48, 3.95, 4.05), DARK, .14)
right = box("Upright_Right", (2.78, .35, 2.25), (.48, 3.95, 4.05), DARK, .14)
cut_holes(left, [(-.6,1.55,.31),(.75,2.65,.31),(-.6,3.35,.31)], "X")
cut_holes(right, [(-.6,1.55,.31),(.75,2.65,.31),(-.6,3.35,.31)], "X")

rear = box("Rear_Bridge", (0, 2.05, 2.05), (5.25, .42, 3.4), STEEL, .12)
cut_holes(rear, [(-1.75,1.35,.25),(0,2.55,.30),(1.75,1.35,.25)], "Y")

top = box("Top_Plate", (0, .15, 4.58), (6.25, 4.45, .46), BRIGHT, .14)
cut_holes(top, [(-2.35,-1.45,.23),(2.35,-1.45,.23),(-2.35,1.45,.23),(2.35,1.45,.23),(0,0,.42)])

carriage = box("Inner_Carriage", (0, -.28, 2.45), (4.55, 3.15, .72), STEEL, .16)
cut_holes(carriage, [(-1.55,-.85,.25),(1.55,-.85,.25),(-1.55,.85,.25),(1.55,.85,.25)])

front_clamp = box("Front_Clamp", (0, -1.78, 2.45), (3.4, .48, 1.42), DARK, .12)
cut_holes(front_clamp, [(-1.08,2.45,.24),(1.08,2.45,.24)], "Y")

gusset_l = box("Gusset_Left", (-2.14, 1.45, 1.08), (.92, .68, 1.5), DARK, .12)
gusset_l.rotation_euler.y = math.radians(-16)
gusset_r = box("Gusset_Right", (2.14, 1.45, 1.08), (.92, .68, 1.5), DARK, .12)
gusset_r.rotation_euler.y = math.radians(16)

# Central precision spindle and bearing stack.
spindle = cylinder("Precision_Spindle", (0, -.25, 2.38), .30, 3.9, BRIGHT, 40, rotation=(0,math.pi/2,0), bevel=.05)
for side, x in (("Left",-2.12),("Right",2.12)):
    cylinder(f"Bearing_{side}", (x,-.25,2.38), .58, .32, DARK, 40, rotation=(0,math.pi/2,0), bevel=.05)
    cylinder(f"Spacer_{side}", (x + (.32 if side=="Left" else -.32),-.25,2.38), .43, .20, BRIGHT, 36, rotation=(0,math.pi/2,0), bevel=.035)

# Four removable top fasteners with separate washers and nuts.
for label, x, y in (("FL",-2.35,-1.45),("FR",2.35,-1.45),("RL",-2.35,1.45),("RR",2.35,1.45)):
    bolt(f"Bolt_Top_{label}", (x,y,4.72), 1.22)
    cylinder(f"Washer_Top_{label}", (x,y,4.49), .32, .09, BRIGHT, 36, bevel=.02)
    cylinder(f"Nut_Under_{label}", (x,y,4.18), .32, .27, DARK, 6, bevel=.035)

# Front clamp fasteners.
for label, x in (("L",-1.08),("R",1.08)):
    bolt(f"Bolt_Front_{label}", (x,-1.86,2.45), .78, "X")
    cylinder(f"Washer_Front_{label}", (x,-1.53,2.45), .31, .09, BRIGHT, 36, rotation=(math.pi/2,0,0), bevel=.02)

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
