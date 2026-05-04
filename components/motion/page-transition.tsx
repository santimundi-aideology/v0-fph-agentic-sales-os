"use client"

import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { motionDuration, motionEaseOutSmooth } from "@/lib/motion/tokens"

export type PageTransitionProps = {
  children: React.ReactNode
  className?: string
}

/** Slight vertical travel so route changes read clearly (still subtle). */
const enterY = 14

/**
 * Cross-fade + short slide on route change. Prefer wrapping from `app/.../template.tsx`
 * so Next remounts the segment on navigation (reliable exit with AnimatePresence).
 */
export function PageTransition({ children, className }: PageTransitionProps) {
  const pathname = usePathname()
  const reduced = useReducedMotion() ?? false
  const duration = reduced ? 0 : motionDuration.normal
  const ease = motionEaseOutSmooth
  const t = { duration, ease }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        className={cn(className)}
        initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: enterY }}
        animate={reduced ? { opacity: 1, y: 0 } : { opacity: 1, y: 0, transition: t }}
        exit={
          reduced
            ? { opacity: 1, y: 0, transition: { duration: 0 } }
            : {
                opacity: 0,
                y: -10,
                transition: { duration: motionDuration.fast, ease },
              }
        }
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
