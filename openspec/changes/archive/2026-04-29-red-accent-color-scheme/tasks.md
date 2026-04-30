## 1. Global tokens

- [x] 1.1 Update `app/globals.css` (and any `@theme` / CSS variable blocks) so `--primary` / accent maps to `#e10801`, light `--background` is white (`#ffffff`), and `.dark` `--background` is very dark gray (`#121212` per design), with `primary-foreground`, `card`, `muted`, `border`, and `ring` adjusted for contrast
- [x] 1.2 Align chart or data-viz color variables (if any) to use primary/semantic tokens instead of hard-coded legacy hues

## 2. Component and page sweep

- [x] 2.1 Search `app/` and `components/` for hard-coded colors (`#`, `rgb(`, `hsl(`) and replace with semantic classes or CSS variables where they bypass theme tokens
- [x] 2.2 Verify shared primitives (buttons, inputs, cards, navigation, links, focus states) in both light and dark mode on representative routes

## 3. Visual polish (outdated UI)

- [x] 3.1 Identify 2–4 primary routes (e.g. main landing/dashboard + one secondary) and adjust spacing scale, section gaps, and max-width containers where layouts feel cramped or inconsistent
- [x] 3.2 Normalize heading vs body styles (font sizes, weights, line-height) using existing font variables / Tailwind typography patterns
- [x] 3.3 Refine cards, inputs, and shell chrome (radius, borders, subtle shadow or separation) via tokens and shared components so surfaces feel current in light and dark mode
- [x] 3.4 Smoke-test responsive breakpoints after polish to ensure no regressions (overflow, clipped nav)

## 4. Handoff

- [x] 4.1 Add a one-line comment next to `.dark` background tokens documenting the fixed very-dark-gray hex (`#121212`) for future designers
