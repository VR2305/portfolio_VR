# Frame Sequences

This directory stores the image sequences for the scroll-controlled cinematic engine.

## Sequence Locations:

### 1. `hero-about/`
- **Description:** Front portrait drifting left transition.
- **Trigger:** Scrolled from Hero to About section.
- **Format:** `0001.webp` to `0100.webp` (adjust `frameCount` in `src/lib/cinematic/config.ts`).

### 2. `about-workstation/`
- **Description:** Side profile rotating into workstation composition.
- **Trigger:** Scrolled from About to What I Do section.
- **Format:** `0001.webp` to `0100.webp`.

## Guidelines:
- Use **WebP** for optimal performance and quality.
- Frames should be numbered with 4-digit padding (e.g., `0001.webp`).
- Maintain consistent resolution across frames (e.g., 1920x1080).
