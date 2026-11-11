from PIL import Image, ImageDraw, ImageFont
import os

ROOT = r"F:\deepseek-harness\fde51-app"
OUT = os.path.join(ROOT, "assets")
os.makedirs(OUT, exist_ok=True)
FONT = r"C:\Windows\Fonts\segoeuib.ttf"


def lerp(a, b, t):
    return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))


def gradient(size):
    g = Image.new("RGB", (1, size))
    d = ImageDraw.Draw(g)
    top, bot = (18, 28, 52), (6, 10, 18)
    for y in range(size):
        d.line([(0, y), (1, y)], fill=lerp(top, bot, y / (size - 1)))
    return g.resize((size, size))


def logo(size, transparent=False, scale=1.0):
    """Ring + 51 + FDE, drawn on transparent canvas."""
    S = size
    img = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    cx = cy = S / 2
    rr = S * 0.30 * scale
    arc_w = max(2, int(S * 0.030 * scale))
    for i in range(18, 0, -1):
        a = int(24 * (i / 18) ** 2)
        d.ellipse([cx - rr - i * 2.4, cy - rr - i * 2.4, cx + rr + i * 2.4, cy + rr + i * 2.4],
                  outline=(78, 211, 163, a), width=2)
    d.arc([cx - rr, cy - rr, cx + rr, cy + rr], start=-90, end=200,
          fill=(78, 211, 163, 255), width=arc_w)
    d.arc([cx - rr, cy - rr, cx + rr, cy + rr], start=200, end=270,
          fill=(78, 211, 163, 55), width=arc_w)

    fs = int(S * 0.27 * scale)
    f = ImageFont.truetype(FONT, fs)
    bb = d.textbbox((0, 0), "51", font=f)
    d.text((cx - (bb[2] - bb[0]) / 2 - bb[0], cy - (bb[3] - bb[1]) / 2 - bb[1] - S * 0.018 * scale),
           "51", font=f, fill=(236, 244, 255, 255))
    fs2 = int(S * 0.060 * scale)
    f2 = ImageFont.truetype(FONT, fs2)
    bb2 = d.textbbox((0, 0), "FDE", font=f2)
    d.text((cx - (bb2[2] - bb2[0]) / 2 - bb2[0], cy + rr * 0.58), "FDE", font=f2, fill=(110, 231, 183, 235))
    return img


# full-bleed icon (legacy / store)
icon = gradient(1024).convert("RGBA")
icon.alpha_composite(logo(1024, scale=1.0))
icon.save(os.path.join(OUT, "icon.png"))

# adaptive foreground: logo smaller, inside safe zone
fg = logo(1024, scale=0.72)
fg.save(os.path.join(OUT, "icon-foreground.png"))
gradient(1024).save(os.path.join(OUT, "icon-background.png"))

# splash 2732
sp = Image.new("RGB", (2732, 2732), (7, 11, 20))
lg = logo(2732, scale=0.30)
sp = sp.convert("RGBA")
sp.alpha_composite(lg)
sp.convert("RGB").save(os.path.join(OUT, "splash.png"))
sp.convert("RGB").save(os.path.join(OUT, "splash-dark.png"))
print("assets ready", os.listdir(OUT))