/**
 * Shared motion constants — copy into each demo under `lib/motion/tokens.ts`.
 * Durations in seconds. Distances in px (for translateY/translateX).
 */

/** Step timing for entrance animations */
export const motionDuration = {
  fast: 0.14,
  normal: 0.22,
  slow: 0.36,
} as const

/**
 * Smooth ease-out cubic-bezier (approx).
 * Framer Motion accepts `[x1, y1, x2, y2]`.
 */
export const motionEaseOutSmooth: [number, number, number, number] = [0.22, 1, 0.36, 1]

/** Vertical travel for slide entrances (keep small to avoid layout shift) */
export const motionDistance = {
  sm: 6,
  md: 12,
  lg: 20,
} as const

/** Scale keys for subtle UI feedback */
export const motionScale = {
  subtle: 0.985,
  hover: 1.012,
} as const

/** Stagger: delay between each child (seconds) */
export const motionStaggerChildren = 0.05

/** Extra delay before first child starts staggering */
export const motionStaggerDelayChildren = 0.03
