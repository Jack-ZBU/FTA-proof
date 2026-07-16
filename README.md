# Seeing the Fundamental Theorem of Algebra

A static, single-page site that visually walks through the winding-number proof of the
Fundamental Theorem of Algebra: complex monomials → complex polynomials as vector sums →
the winding-number argument itself.

No build step, no package manager, no framework. Just `index.html`, `styles.css`, and
`script.js`, plus the animated GIFs in `assets/`. Math is typeset with [MathJax](https://www.mathjax.org/)
loaded from a CDN.

## Run it locally

**Option 1 — open directly.** Double-click `index.html`, or open it from your browser with
`File > Open`. Everything (images, styles, script, MathJax via CDN) will work as long as you
have an internet connection for the MathJax CDN script.

**Option 2 — local static server (recommended, avoids any browser file:// quirks).**
From this directory, run whichever you have available:

```bash
# Python 3 (built into macOS/most Linux)
python3 -m http.server 8000

# or Node's http-server, if you have it installed globally
npx http-server -p 8000
```

Then open `http://localhost:8000` in your browser.

## Deploying to GitHub Pages

1. Push this directory to the root of a GitHub repository.
2. In the repo settings, enable GitHub Pages for the `main` branch, root folder.
3. The site will be served at `https://<username>.github.io/<repo>/` — all asset paths in
   this project are relative, so no configuration changes are needed.

## Project structure

```
index.html            Page structure and content for all three sections
styles.css            All styling (responsive, light/dark aware)
script.js             GIF restart controls + progressive disclosure interactions
assets/
  mono/
    monomial_comparison.gif       Section 1: monomial angular velocity comparison
  poly/
    polynomial_radii_comparison.gif  Section 2: polynomial as head-to-tail vector sum
  FTA_eg.gif           Section 3: main winding-number animation
```

## Notes on the assets

The `MISC/mono` and `MISC/poly` folders each contain a single GIF (not several), and each
GIF already shows multiple panels/radii within itself:

- `monomial_comparison.gif` shows three panels: a baseline monomial, the same monomial with
  a different exponent, and the same monomial with a different radius — so the exponent vs.
  radius comparison the writeup calls for is built into this one animation.
- `polynomial_radii_comparison.gif` shows the same polynomial evaluated on four different
  radii in one animation, illustrating the continuous deformation used in the proof.

Both GIFs were included in full; no frames or panels were excluded.

A radius slider was intentionally **not** added: the supplied animations are pre-rendered
GIFs, not a live simulation, so a slider could not actually change the radius shown without
regenerating imagery outside the scope of this static site. Instead, the existing multi-radius
panels in `polynomial_radii_comparison.gif` and the dedicated `FTA_eg.gif` animation are used
to convey the radius-dependent deformation.

Native `<img>`-based GIF playback cannot be paused, resumed, or scrubbed from JavaScript, so
each animation instead gets a **restart** button that reloads the GIF from its first frame.
