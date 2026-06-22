"""
Generate professional imagery for the NASA AI/ML STIG site using the Gemini API
(model: gemini-3-pro-image-preview, a.k.a. "nano banana").

Style: PHOTOREALISTIC but futuristic/cinematic, and each image should read its
message at a glance (not vague abstraction). Key from ~/.env
(GOOGLE_API_KEY / GEMINI / GOOGLE). Output -> public/images/generated/.

Usage:
    python3 scripts/generate_images.py            # all
    python3 scripts/generate_images.py hero_bg    # one or more keys
Requires: pip install google-genai pillow python-dotenv
"""

import os
import sys
import mimetypes
from pathlib import Path
from google import genai
from google.genai import types
from dotenv import load_dotenv

load_dotenv(os.path.expanduser("~/.env"))


def _client():
    api_key = (
        os.environ.get("GOOGLE_API_KEY")
        or os.environ.get("GEMINI")
        or os.environ.get("GOOGLE")
    )
    if not api_key:
        raise SystemExit("No API key (set GOOGLE_API_KEY / GEMINI / GOOGLE in ~/.env)")
    return genai.Client(api_key=api_key)


def generate_image(prompt: str, output_base: str, max_attempts: int = 5) -> bool:
    client = _client()
    model = "gemini-3-pro-image-preview"
    contents = [types.Content(role="user", parts=[types.Part.from_text(text=prompt)])]
    config = types.GenerateContentConfig(response_modalities=["IMAGE"])
    for attempt in range(max_attempts):
        if attempt > 0:
            print(f"  retry {attempt}/{max_attempts - 1}...")
        try:
            for chunk in client.models.generate_content_stream(model=model, contents=contents, config=config):
                if (chunk.candidates is None or chunk.candidates[0].content is None
                        or chunk.candidates[0].content.parts is None):
                    continue
                part = chunk.candidates[0].content.parts[0]
                if part.inline_data and part.inline_data.data:
                    mime = part.inline_data.mime_type or "image/png"
                    ext = mimetypes.guess_extension(mime) or ".png"
                    if ext == ".jpe":
                        ext = ".jpg"
                    out = output_base + ext
                    os.makedirs(os.path.dirname(out), exist_ok=True)
                    with open(out, "wb") as f:
                        f.write(part.inline_data.data)
                    print(f"  saved {out} ({len(part.inline_data.data)//1024} KB, {mime})")
                    return True
        except Exception as e:  # noqa: BLE001
            print(f"  error: {e}")
            continue
    print(f"  FAILED: {output_base}")
    return False


_NO_TEXT = ("Photorealistic and cinematic, futuristic but believable — like a high-end "
            "editorial photograph or premium 3D render, not a cartoon or vague abstract. "
            "Cool palette of deep navy, blue and cyan with warm key light. "
            "Do NOT include any readable text, letters, numbers, logos, or watermarks.")

IMAGE_SPECS = {
    "hero_bg": {
        "filename": "hero-bg",
        "prompt": f"""A wide cinematic night shot of a modern observatory dome silhouetted under a
brilliant, star-filled sky with the Milky Way arching overhead. Rising from the dome and across
the sky is a subtle translucent hologram of glowing neural-network nodes and flowing data streams —
the fusion of astronomy and artificial intelligence. Atmospheric, awe-inspiring, premium.
Keep the upper-left sky darker and calmer so white headline text reads cleanly over it.
Wide 16:9 landscape. {_NO_TEXT}""",
    },
    "modules_graphic": {
        "filename": "modules-graphic",
        "prompt": f"""A premium 3D product render: glowing translucent glass blocks stacking and
assembling into a larger structure, floating in a dark studio with soft volumetric light and a faint
star field in the background — clearly conveying a STACKABLE, MODULAR curriculum that builds up
step by step. Clean, futuristic, tactile. Square 1:1. {_NO_TEXT}""",
    },
    "showcase_recordings": {
        "filename": "showcase-recordings",
        "prompt": f"""A photorealistic over-the-shoulder shot of a researcher watching a recorded
science lecture on a large modern monitor in a dim, modern office at night. The screen glows with a
presentation slide and a small video of a speaker (faces and any on-screen writing soft and
illegible). A clear glowing play-button motif suggests video. Conveys WATCHING RECORDED LECTURES on
demand. Cinematic warm-cool lighting. Square 1:1. {_NO_TEXT}""",
    },
    "showcase_notebooks": {
        "filename": "showcase-notebooks",
        "prompt": """A realistic documentary photograph, close-up over the shoulder of a researcher
coding on a laptop in a modern office. On the screen is a Jupyter notebook: a panel of Python code on
the left and, beside it, a modest data plot (a line/scatter chart) and a small thumbnail of a galaxy —
realistic in-app scale, the way it actually looks in a notebook. Natural daylight, shallow depth of
field. Conveys hands-on coding with real astronomy data. Realistic photography — NOT sci-fi, no
holograms, no glowing screens, nothing enlarged unrealistically. Square 1:1.
Do NOT include readable text, letters, logos, or watermarks.""",
    },
    "participate_community": {
        "filename": "participate-community",
        "prompt": """A realistic documentary photograph of a diverse group of astronomers and graduate
students collaborating in a seminar room — sitting around a table with laptops, a few standing and
discussing in front of a wall screen showing astronomy plots and galaxy images. Natural indoor
lighting, candid and warm, like a real university research meeting. Conveys an open, welcoming research
community. Realistic photography — NOT sci-fi, no holograms, no glowing/neon effects, no futuristic
overlays. Faces present but not recognizable real individuals. Square 1:1.
Do NOT include readable text, letters, logos, or watermarks.""",
    },
    "participate_async": {
        "filename": "participate-async",
        "prompt": f"""A photorealistic cozy scene of a single researcher studying on a laptop at home
late at night, a warm desk lamp, a window behind showing a starry sky, a mug of coffee — relaxed,
self-paced learning. Conveys LEARN ANYTIME, ASYNCHRONOUSLY. Intimate, warm, cinematic. Square 1:1. {_NO_TEXT}""",
    },
    "cosmic_origins": {
        "filename": "cosmic-origins",
        "prompt": """A realistic, high-resolution astrophotograph in the style of a Hubble or JWST deep
field: a rich field of distant galaxies, star clusters, and softly colored nebulae against deep space.
Awe-inspiring and scientifically plausible — real astronomy imagery, NOT sci-fi, no spacecraft, no
holograms. 4:3 landscape.
Do NOT include readable text, letters, logos, or watermarks.""",
    },
    "why_literacy": {
        "filename": "why-literacy",
        "prompt": """A realistic documentary photograph of an astronomer working at a desk in a modern
university office or observatory control room, looking thoughtfully at two monitors showing real
telescope survey data — a galaxy image and data plots. Natural daylight from a window, candid and
professional, like a real researcher at work. Conveys someone learning to apply modern data methods
in astronomy. Realistic photography — NOT sci-fi, no holograms, no glowing/neon effects, no
futuristic overlays. 4:3 landscape.
Do NOT include readable text, letters, logos, or watermarks.""",
    },
}


def main():
    out_dir = Path(__file__).parent.parent / "public" / "images" / "generated"
    out_dir.mkdir(parents=True, exist_ok=True)
    keys = sys.argv[1:] if len(sys.argv) > 1 else list(IMAGE_SPECS.keys())
    keys = [k for k in keys if k in IMAGE_SPECS] or list(IMAGE_SPECS.keys())
    print(f"Generating {len(keys)} image(s) -> {out_dir}")
    ok = 0
    for k in keys:
        print(f"\n--- {k} ---")
        if generate_image(IMAGE_SPECS[k]["prompt"], str(out_dir / IMAGE_SPECS[k]["filename"])):
            ok += 1
    print(f"\nDone: {ok}/{len(keys)} succeeded.")


if __name__ == "__main__":
    main()
