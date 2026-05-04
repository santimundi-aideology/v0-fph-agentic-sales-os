import type { Variants } from "framer-motion"
import {
  motionDistance,
  motionDuration,
  motionEaseOutSmooth,
  motionScale,
  motionStaggerChildren,
  motionStaggerDelayChildren,
} from "./tokens"

const instant = { duration: 0 }

function transition(duration: number, delay = 0) {
  return { duration, ease: motionEaseOutSmooth, delay }
}

/** Fade only — no layout-affecting properties */
export function fadeVariants(reducedMotion: boolean): Variants {
  if (reducedMotion) {
    return {
      hidden: { opacity: 1 },
      visible: { opacity: 1, transition: instant },
    }
  }
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: transition(motionDuration.normal),
    },
  }
}

/** Slide up: opacity + translateY (GPU-friendly) */
export function slideUpVariants(reducedMotion: boolean, distance: keyof typeof motionDistance = "md"): Variants {
  const y = motionDistance[distance]
  if (reducedMotion) {
    return {
      hidden: { opacity: 1, y: 0 },
      visible: { opacity: 1, y: 0, transition: instant },
    }
  }
  return {
    hidden: { opacity: 0, y },
    visible: {
      opacity: 1,
      y: 0,
      transition: transition(motionDuration.normal),
    },
  }
}

/** Light scale + fade for overlays / cards */
export function scaleInVariants(reducedMotion: boolean): Variants {
  if (reducedMotion) {
    return {
      hidden: { opacity: 1, scale: 1 },
      visible: { opacity: 1, scale: 1, transition: instant },
    }
  }
  return {
    hidden: { opacity: 0, scale: motionScale.subtle },
    visible: {
      opacity: 1,
      scale: 1,
      transition: transition(motionDuration.fast),
    },
  }
}

/** Container variant for staggered lists / grids */
export function staggerContainerVariants(reducedMotion: boolean, delayChildren = 0): Variants {
  if (reducedMotion) {
    return {
      hidden: {},
      visible: {
        transition: { staggerChildren: 0, delayChildren: 0 },
      },
    }
  }
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: motionStaggerChildren,
        delayChildren: delayChildren + motionStaggerDelayChildren,
      },
    },
  }
}

/** Child item under stagger container */
export function staggerItemVariants(reducedMotion: boolean): Variants {
  if (reducedMotion) {
    return {
      hidden: { opacity: 1, y: 0 },
      visible: { opacity: 1, y: 0, transition: instant },
    }
  }
  return {
    hidden: { opacity: 0, y: motionDistance.sm },
    visible: {
      opacity: 1,
      y: 0,
      transition: transition(motionDuration.normal),
    },
  }
}
