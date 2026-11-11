from PIL import Image, ImageDraw, ImageFont
import math, os

OUT = r"F:\deepseek-harness\fde51-app\www\icons"
os.makedirs(OUT, exist_ok=True)
FONT_BOLD = r"C:\Windows\Fonts\segoeuib.ttf"

def lerp(a, b, t):
    return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))

def make(size, maskable=False):
    S = size * 4
    img = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    pad = int(S * 0.12) if maskable else 0
    box = (pad, pad, S - pad, S - pad)
    r = int((S - 2 * pad) * 0.26)
    # vertical gradient background
    grad = Image.new("RGB", (1, S), (7, 11, 20))
    gd = ImageDraw.Draw(grad)
    top = (18, 28, 52)
    bot = (6, 10, 18)
    for y in range(S):
        gd.line([(0, y), (1, y)], fill=lerp(top, bot, y / (S - 1)))
    grad = grad.resize((S, S))
    mask = Image.new("L", (S, S), 0)
    ImageDraw.Draw(mask).rounded_rectangle(box, radius=r, fill=255)
    img.paste(grad, (0, 0), mask)

    d = ImageDraw.Draw(img)
    # subtle glow ring
    cx, cy = S / 2, S / 2
    rr = (S - 2 * pad) * 0.36
    for i in range(18, 0, -1):
        a = int(26 * (i / 18) ** 2)
        d.ellipse([cx - rr - i * 3, cy - rr - i * 3, cx + rr + i * 3, cy + rr + i * 3],
                  outline=(78, 211, 163, a), width=2)
    # progress arc
    arc_box = [cx - rr, cy - rr, cx + rr, cy + rr]
    d.arc(arc_box, start=-90, end=200, fill=(78, 211, 163, 255), width=int(S * 0.035))
    d.arc(arc_box, start=200, end=270, fill=(78, 211, 163, 60), width=int(S * 0.035))

    # 51 text
    fs = int(S * 0.34)
    font = ImageFont.truetype(FONT_BOLD, fs)
    text = "51"
    bb = d.textbbox((0, 0), text, font=font)
    tw, th = bb[2] - bb[0], bb[3] - bb[1]
    tx = cx - tw / 2 - bb[0]
    ty = cy - th / 2 - bb[1] - S * 0.02
    d.text((tx, ty), text, font=font, fill=(236, 244, 255, 255))
    # small day label
    fs2 = int(S * 0.075)
    f2 = ImageFont.truetype(FONT_BOLD, fs2)
    label = "FDE"
    bb2 = d.textbbox((0, 0), label, font=f2)
    d.text((cx - (bb2[2] - bb2[0]) / 2 - bb2[0], cy + rr * 0.55), label, font=f2, fill=(110, 231, 183, 235))
    return img.resize((size, size), Image.LANCZOS)

for s in (192, 512):
    make(s).save(os.path.join(OUT, f"icon-{s}.png"))
make(512, maskable=True).save(os.path.join(OUT, "icon-maskable-512.png"))
make(180).save(os.path.join(OUT, "apple-touch-icon.png"))
make(32).save(os.path.join(OUT, "favicon-32.png"))
make(1024, maskable=True).save(os.path.join(OUT, "icon-1024.png"))
print("done", os.listdir(OUT))