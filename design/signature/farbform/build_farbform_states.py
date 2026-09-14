"""Build pixel-locked FARBFORM wall states and shared decor layers."""

from pathlib import Path

import cv2
import numpy as np


ROOT = Path(__file__).resolve().parents[3]
SOURCE_DIR = ROOT / "design" / "generated" / "signature" / "farbform"
PUBLIC_DIR = ROOT / "website" / "public" / "assets" / "signature" / "farbform"
MASTER = SOURCE_DIR / "farbform-room-clean-master.png"
REFERENCE = SOURCE_DIR / "farbform-room-reference-source.png"
PLANT_SOURCE = SOURCE_DIR / "farbform-plant-cutout-source.png"
MASK_FILE = SOURCE_DIR / "farbform-wall-mask.png"

# sRGB targets. Only the unobstructed architectural wall plane is edited.
TARGETS = {
    "aubergine": (91, 65, 80),
    "mineral": (169, 166, 157),
    "sand": (185, 170, 146),
    "vorher": (216, 209, 197),
}


def rgb_to_lab(rgb: tuple[int, int, int]) -> np.ndarray:
    pixel = np.uint8([[rgb[::-1]]])
    return cv2.cvtColor(pixel, cv2.COLOR_BGR2LAB)[0, 0].astype(np.float32)


def build_wall_mask(image: np.ndarray) -> np.ndarray:
    """Return a feathered mask that never reaches furniture or decor."""
    height, width = image.shape[:2]
    if (width, height) != (1448, 1086):
        raise RuntimeError(f"Unexpected master size: {width}x{height}")

    mask = np.zeros((height, width), dtype=np.float32)
    wall_polygon = np.array([(602, 58), (1177, 58), (1177, 529), (773, 531), (662, 544), (602, 674)], np.int32)
    cv2.fillConvexPoly(mask, wall_polygon, 1.0)
    mask = cv2.GaussianBlur(mask, (0, 0), 0.65)
    return np.clip(mask, 0.0, 1.0)


def recolour(master: np.ndarray, mask: np.ndarray, rgb: tuple[int, int, int]) -> np.ndarray:
    original_lab = cv2.cvtColor(master, cv2.COLOR_BGR2LAB).astype(np.float32)
    output_lab = original_lab.copy()
    target = rgb_to_lab(rgb)

    wall_pixels = original_lab[:, :, 0][mask > 0.99]
    base_lightness = float(np.median(wall_pixels))
    output_lab[:, :, 0] = np.clip(target[0] + (original_lab[:, :, 0] - base_lightness) * 0.82, 0, 255)
    output_lab[:, :, 1] = target[1] + (original_lab[:, :, 1] - 125.5) * 0.18
    output_lab[:, :, 2] = target[2] + (original_lab[:, :, 2] - 139.5) * 0.18

    recoloured = cv2.cvtColor(np.uint8(np.clip(output_lab, 0, 255)), cv2.COLOR_LAB2BGR)
    alpha = mask[:, :, None]
    result = np.rint(master.astype(np.float32) * (1.0 - alpha) + recoloured.astype(np.float32) * alpha)
    return np.uint8(np.clip(result, 0, 255))


def build_plant_layer(canvas_shape: tuple[int, int]) -> np.ndarray:
    """Place the extracted olive on a transparent full-size canvas."""
    cutout = cv2.imread(str(PLANT_SOURCE), cv2.IMREAD_UNCHANGED)
    if cutout is None or cutout.shape[2] != 4:
        raise RuntimeError("Plant source must be an RGBA image")

    alpha = cutout[:, :, 3]
    points = cv2.findNonZero(np.uint8(alpha > 35))
    if points is None:
        raise RuntimeError("Plant source has no visible alpha")
    x, y, width, height = cv2.boundingRect(points)
    cutout = cutout[y : y + height, x : x + width].copy()
    cutout[:, :, 3] = np.uint8(np.clip((cutout[:, :, 3].astype(np.float32) - 38.0) * 2.55, 0, 255))

    target_height = 550
    target_width = round(cutout.shape[1] * target_height / cutout.shape[0])
    cutout = cv2.resize(cutout, (target_width, target_height), interpolation=cv2.INTER_LANCZOS4)

    canvas_height, canvas_width = canvas_shape
    canvas = np.zeros((canvas_height, canvas_width, 4), dtype=np.uint8)
    left, top = 420, 180
    canvas[top : top + target_height, left : left + target_width] = cutout
    return canvas


def build_artwork_layer(canvas_shape: tuple[int, int]) -> np.ndarray:
    """Extract the original framed print as one shared decor layer."""
    canvas_height, canvas_width = canvas_shape
    canvas = np.zeros((canvas_height, canvas_width, 4), dtype=np.uint8)
    reference = cv2.imread(str(REFERENCE), cv2.IMREAD_COLOR)
    if reference is None:
        raise FileNotFoundError(REFERENCE)
    left, top, right, bottom = 944, 280, 1120, 494

    shadow = np.zeros_like(canvas)
    cv2.rectangle(shadow, (left + 5, top + 6), (right + 9, bottom + 10), (24, 20, 15, 105), thickness=-1)
    shadow[:, :, 3] = cv2.GaussianBlur(shadow[:, :, 3], (0, 0), 9)
    canvas = np.maximum(canvas, shadow)
    canvas[top:bottom, left:right, :3] = reference[top:bottom, left:right]
    canvas[top:bottom, left:right, 3] = 255
    return canvas


def mobile_crop(image: np.ndarray) -> np.ndarray:
    crop_width = 760
    left = (image.shape[1] - crop_width) // 2
    crop = image[:, left : left + crop_width]
    return cv2.resize(crop, (720, 1028), interpolation=cv2.INTER_AREA)


def composite(base: np.ndarray, *layers: np.ndarray) -> np.ndarray:
    result = base.astype(np.float32)
    for layer in layers:
        alpha = layer[:, :, 3:4].astype(np.float32) / 255.0
        result = result * (1.0 - alpha) + layer[:, :, :3].astype(np.float32) * alpha
    return np.uint8(np.clip(np.rint(result), 0, 255))


def write_base_assets(image: np.ndarray) -> None:
    cv2.imwrite(str(PUBLIC_DIR / "farbform-room-vorher.webp"), image, [cv2.IMWRITE_WEBP_QUALITY, 84])
    cv2.imwrite(str(PUBLIC_DIR / "farbform-room-vorher-mobile.webp"), mobile_crop(image), [cv2.IMWRITE_WEBP_QUALITY, 84])


def write_wall_layer(name: str, image: np.ndarray, mask: np.ndarray) -> None:
    layer = cv2.cvtColor(image, cv2.COLOR_BGR2BGRA)
    # Extend the layer into an unchanged-pixel safety margin. Its outer alpha
    # edge therefore blends identical pixels and cannot produce a bright seam.
    coverage = cv2.dilate(np.uint8(mask > 0.001), np.ones((31, 31), np.uint8), iterations=1)
    coverage = cv2.GaussianBlur(coverage.astype(np.float32), (0, 0), 0.8)
    layer[:, :, 3] = np.uint8(np.clip(coverage * 255, 0, 255))
    cv2.imwrite(str(PUBLIC_DIR / f"farbform-wall-{name}.webp"), layer, [cv2.IMWRITE_WEBP_QUALITY, 101])
    cv2.imwrite(str(PUBLIC_DIR / f"farbform-wall-{name}-mobile.webp"), mobile_crop(layer), [cv2.IMWRITE_WEBP_QUALITY, 101])


def main() -> None:
    PUBLIC_DIR.mkdir(parents=True, exist_ok=True)
    master = cv2.imread(str(MASTER), cv2.IMREAD_COLOR)
    if master is None:
        raise FileNotFoundError(MASTER)

    mask = build_wall_mask(master)
    cv2.imwrite(str(MASK_FILE), np.uint8(mask * 255))

    states = {"salbei": master}
    for name, colour in TARGETS.items():
        states[name] = recolour(master, mask, colour)

    for name, state in states.items():
        output = SOURCE_DIR / f"farbform-room-{name}-source.png"
        cv2.imwrite(str(output), state, [cv2.IMWRITE_PNG_COMPRESSION, 7])
        if name != "vorher":
            write_wall_layer(name, state, mask)
    write_base_assets(states["vorher"])

    plant = build_plant_layer(master.shape[:2])
    cv2.imwrite(str(SOURCE_DIR / "farbform-plant-layer.png"), plant, [cv2.IMWRITE_PNG_COMPRESSION, 7])
    cv2.imwrite(str(PUBLIC_DIR / "farbform-plant-layer.webp"), plant, [cv2.IMWRITE_WEBP_QUALITY, 90])
    cv2.imwrite(str(PUBLIC_DIR / "farbform-plant-layer-mobile.webp"), mobile_crop(plant), [cv2.IMWRITE_WEBP_QUALITY, 90])

    artwork = build_artwork_layer(master.shape[:2])
    cv2.imwrite(str(SOURCE_DIR / "farbform-artwork-layer.png"), artwork, [cv2.IMWRITE_PNG_COMPRESSION, 7])
    cv2.imwrite(str(PUBLIC_DIR / "farbform-artwork-layer.webp"), artwork, [cv2.IMWRITE_WEBP_QUALITY, 90])
    cv2.imwrite(str(PUBLIC_DIR / "farbform-artwork-layer-mobile.webp"), mobile_crop(artwork), [cv2.IMWRITE_WEBP_QUALITY, 90])

    fallback = composite(states["salbei"], plant, artwork)
    cv2.imwrite(str(PUBLIC_DIR / "farbform-fallback-salbei.webp"), fallback, [cv2.IMWRITE_WEBP_QUALITY, 84])
    cv2.imwrite(str(PUBLIC_DIR / "farbform-fallback-salbei-mobile.webp"), mobile_crop(fallback), [cv2.IMWRITE_WEBP_QUALITY, 84])

    unchanged = mask < 0.001
    for name, state in states.items():
        if not np.array_equal(master[unchanged], state[unchanged]):
            raise RuntimeError(f"Non-wall pixels changed in {name}")

    print(f"Built {len(states)} pixel-locked states and shared decor layers")


if __name__ == "__main__":
    main()
