"use client"

import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { motionDuration, motionEaseOutSmooth } from "@/lib/motion/tokens"

export type PageTransitionProps = {
  children: React.ReactNode
  className?: string
}

/**
 * Subtle cross-fade on route change. Wrap `children` from `app/layout.tsx` (client boundary).
 */
export function PageTransition({ children, className }: PageTransitionProps) {
  const pathname = usePathname()
  const reduced = useReducedMotion() ?? false
  const t = { duration: reduced ? 0 : motionDuration.fast, ease: motionEaseOutSmooth }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        className={cn(className)}
        initial={{ opacity: reduced ? 1 : 0 }}
        animate={{ opacity: 1, transition: t }}
        exit={{ opacity: reduced ? 1 : 0, transition: { ...t, duration: reduced ? 0 : motionDuration.fast * 0.85 } }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
