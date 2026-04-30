## ADDED Requirements

### Requirement: Semantic theme tokens use brand accent and light/dark backgrounds

The application SHALL expose CSS design tokens such that the primary interactive accent color is `#e10801`, the default light-mode application background is white (`#ffffff`), and the default dark-mode application background is a very dark gray (`#121212` unless a documented equivalent is chosen for accessibility). Components that represent primary actions, key links, and focus rings SHALL derive their default styling from these tokens rather than unrelated palette hues.

#### Scenario: Light mode page shell

- **WHEN** the user views the app with light theme active
- **THEN** the main page background appears white and primary-accent UI elements use `#e10801` as their accent source per token mapping

#### Scenario: Dark mode page shell

- **WHEN** the user views the app with dark theme active
- **THEN** the main page background appears very dark gray (not pure white) and foreground and border tokens maintain readable contrast against that background

### Requirement: Theme consistency across shared UI

Shared UI primitives (including but not limited to buttons, inputs, cards, navigation, and focus outlines) SHALL use semantic color tokens (`background`, `foreground`, `primary`, `border`, `muted`, `ring`, etc.) so that switching between light and dark mode updates the entire surface consistently without isolated legacy colors.

#### Scenario: Theme toggle

- **WHEN** the user switches between light and dark theme
- **THEN** all views that use shared primitives reflect the new palette without requiring a full page reload beyond what the theme provider already triggers
