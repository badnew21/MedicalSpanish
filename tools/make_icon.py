"""Draws the launcher icon (a speech bubble with a medical cross) at every density."""
import os
import sys
from PIL import Image, ImageDraw

SIZES = {"mdpi": 48, "hdpi": 72, "xhdpi": 96, "xxhdpi": 144, "xxxhdpi": 192}
TEAL = (14, 124, 123, 255)
WHITE = (255, 255, 255, 255)
CORAL = (240, 101, 84, 255)


def draw(size):
    s = size * 4  # supersample, then shrink for smooth edges
    img = Image.new("RGBA", (s, s), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    pad = s * 0.04
    d.rounded_rectangle([pad, pad, s - pad, s - pad], radius=s * 0.22, fill=TEAL)
    # speech bubble
    bx0, by0, bx1, by1 = s * 0.2, s * 0.2, s * 0.8, s * 0.68
    d.rounded_rectangle([bx0, by0, bx1, by1], radius=s * 0.12, fill=WHITE)
    d.polygon([(s * 0.3, by1 - 2), (s * 0.46, by1 - 2), (s * 0.28, s * 0.84)], fill=WHITE)
    # cross
    cx, cy, arm, w = s * 0.5, s * 0.44, s * 0.16, s * 0.065
    d.rounded_rectangle([cx - w, cy - arm, cx + w, cy + arm], radius=w * 0.4, fill=CORAL)
    d.rounded_rectangle([cx - arm, cy - w, cx + arm, cy + w], radius=w * 0.4, fill=CORAL)
    return img.resize((size, size), Image.LANCZOS)


def main(res_dir):
    for density, size in SIZES.items():
        out = os.path.join(res_dir, "mipmap-" + density)
        os.makedirs(out, exist_ok=True)
        draw(size).save(os.path.join(out, "ic_launcher.png"))


if __name__ == "__main__":
    main(sys.argv[1])
