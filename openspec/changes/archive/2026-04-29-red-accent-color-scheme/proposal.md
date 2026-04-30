## Why

The product needs a consistent visual identity aligned with the brand red accent (`#e10801`), clear light surfaces, and a restrained dark mode. Today’s palette does not enforce these tokens globally, which risks inconsistent buttons, links, and backgrounds across pages. Separately, the overall UI reads as **outdated**—flat hierarchy, weak spacing rhythm, and generic surfaces—so this effort should also deliver **light-touch modernization** (clearer visual hierarchy, calmer density, and more current surface treatment) without a from-scratch redesign.

## What Changes

- Replace or remap CSS/design tokens so the **primary accent** is `#e10801` (buttons, focus rings, key highlights).
- **Light mode**: surfaces use **white** (`#ffffff`) as the main background with readable foreground and muted neutrals derived from the accent.
- **Dark mode**: same semantic roles as light mode, but the **page/app background** becomes a **very dark gray** (not pure black unless specified in design), with adjusted foreground and borders for contrast.
- Sweep UI primitives (Tailwind/theme CSS variables, `globals.css`, shared components) so charts, cards, inputs, and navigation inherit the new scheme without one-off hex scattered in components.
- **Visual polish (same initiative)**: Tighten **spacing and layout rhythm** on key screens, improve **typography usage** (scale, line-height, weight for headings vs body), and refresh **cards, inputs, and chrome** (radius, border, shadow, section separation) so the app feels more current while reusing existing components and patterns.

## Capabilities

### New Capabilities

- `theme-colors`: Defines semantic color tokens and requirement-level behavior for light/dark appearance (accent, background, foreground, muted, borders, destructive vs accent distinction).
- `visual-polish`: Defines modest, non-replatforming UI improvements—spacing, typography, and surface hierarchy—so the product feels up to date alongside the new palette.

### Modified Capabilities

- _(none — no existing baseline specs in `openspec/specs/` to delta.)_

## Impact

- **Code**: `app/globals.css`, Tailwind theme extensions (`tailwind.config` / v4 `@theme` if used), `components/theme-provider` usage, shared UI shells (navigation, cards, forms), and key page layouts where spacing or typography overrides live.
- **Dependencies**: No new runtime dependencies expected unless adopting a color helper library (not planned).
- **Systems**: Visual QA on marketing/dashboard flows; optional screenshot or design review for contrast (WCAG) on accent-on-white and accent-on-dark states, plus a quick pass that polished screens still behave correctly at common breakpoints.
