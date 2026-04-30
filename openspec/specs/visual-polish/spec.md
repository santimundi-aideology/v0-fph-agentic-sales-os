### Requirement: Key surfaces feel contemporary without new frameworks

The application SHALL apply modest visual updates—consistent spacing rhythm, clearer heading/body hierarchy, and refined card/input/chrome styling (radius, border weight, subtle elevation where appropriate)—on primary user-facing flows so the UI no longer reads as dated. Changes SHALL reuse existing components and Tailwind utilities rather than introducing a parallel design system or new UI library.

#### Scenario: Primary flows reviewed

- **WHEN** a reviewer opens the agreed primary routes (e.g. main dashboard or landing and one representative secondary screen)
- **THEN** spacing between sections and components follows a coherent scale, headings are distinguishable from body copy, and surfaces (cards, inputs, navigation) present consistent elevation and separation appropriate to light and dark themes

### Requirement: Responsive behavior preserved

Layout and polish adjustments SHALL NOT break existing breakpoints: content MUST remain usable on narrow and wide viewports without horizontal overflow introduced solely by spacing changes.

#### Scenario: Narrow viewport

- **WHEN** the user views polished screens at a mobile-class viewport width
- **THEN** no critical content is clipped or unreachable compared to behavior before this change, aside from intentional wrapping improvements
