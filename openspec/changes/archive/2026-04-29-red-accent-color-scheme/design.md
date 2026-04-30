## Context

The app is a Next.js project using Tailwind CSS v4 patterns (`globals.css`, `@theme`), `next-themes` via `ThemeProvider`, and shared UI from Radix/shadcn-style components. Colors today are likely defined as CSS variables (`--background`, `--primary`, etc.) mapped to Tailwind utilities. The change is presentational: unify tokens around brand red `#e10801`, white light surfaces, and a very dark gray dark shell, **and** apply constrained UI polish so primary flows feel modern (spacing rhythm, type hierarchy, surface treatment).

## Goals / Non-Goals

**Goals:**

- Single source of truth for **accent** `#e10801` and semantic aliases (`primary`, rings, chart accent where appropriate).
- **Light mode**: page background **white** (`#ffffff`); text and borders tuned for contrast on white.
- **Dark mode**: page background **very dark gray** — baseline token **`#121212`** (common “elevated” dark surface; avoids harsh pure black while staying clearly dark). Foreground and muted text derived for readability on that base.
- Components (`Button`, `Link`, inputs, cards, sidebar) consume semantic tokens, not raw hex in JSX except rare edge cases.
- **Polish**: Improve vertical rhythm, heading/body distinction, and card/input/chrome styling on agreed primary screens using existing primitives.

**Non-Goals:**

- Full redesign, new information architecture, or replacing the component library.
- New typography families beyond what the project already loads (tuning size/weight/line-height is in scope).
- WCAG certification or full audit (reasonable contrast is a goal; formal sign-off is out of scope).
- Changing logo assets or third-party widget styling beyond theme-adjacent overrides if trivial.

## Decisions

1. **Token layer**: Adjust `:root` and `.dark` CSS variables in `app/globals.css` (and any `@theme` mappings) so `background`, `foreground`, `primary`, `primary-foreground`, `accent`, `accent-foreground`, `border`, `muted`, `card`, `ring` align with the new palette. **Rationale**: Matches existing shadcn/Tailwind v4 conventions; one file change propagates globally.

2. **Primary vs accent**: Map **`--primary`** to the brand red `#e10801` and set **`--primary-foreground`** to white (`#ffffff`) for filled buttons and badges. **Rationale**: Most CTAs use `primary`; keeps one dominant brand color.

3. **Dark background**: Use **`#121212`** for `--background` in `.dark`. **Alternative considered**: `#0a0a0a` (deeper); rejected as default because `#121212` is a well-tested “very dark gray” that pairs cleanly with slightly elevated `card` (`#1c1c1c` or similar). Documented as fixed choice; can be tweaked ± one step in implementation if contrast checks fail.

4. **Charts (recharts)**: Prefer CSS variables or Tailwind classes referencing `hsl(var(--primary))` / chart palette variables if present; avoid hard-coded blues/greens clashing with red brand. **Rationale**: Visual coherence across dashboards.

5. **No new dependency**: Implement with CSS only. **Alternative**: `tailwindcss-theme` or OKLCH generators — unnecessary for two modes and one accent.

## Risks / Trade-offs

- **[Risk]** Some components use inline styles or arbitrary hex → colors drift. **Mitigation**: Grep for `#`, `rgb`, `hsl` in `components/` and `app/` during implementation; replace with tokens.

- **[Risk]** Red `#e10801` on white for small text may fail WCAG AA for body copy. **Mitigation**: Use accent for buttons/labels/links; keep body text on neutral foreground tokens, not raw primary green/red text blocks.

- **[Trade-off]** Unified tokens may flatten minor intentional color differences (e.g. subtle section tints). Restore only if product asks.

## Migration Plan

1. Update CSS variables; verify light/dark toggle.
2. Sweep components for stray colors.
3. Spot-check main routes and auth/onboarding if present.
4. **Rollback**: Revert `globals.css` (and any touched component) via git; no data migration.

## Open Questions

- Should **destructive** actions stay system red or align closer to brand red? Default: keep distinct destructive hue unless stakeholders want a single red family.
