"use client"

import { motion, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"
import { fadeVariants } from "@/lib/motion/variants"

export type FadeInProps = {
  children: React.ReactNode
  className?: string
  /** Seconds before transition starts */
  delay?: number
  /** When true, run when scrolled into view once (default). When false, run on mount. */
  viewport?: boolean
}

export function FadeIn({ children, className, delay = 0, viewport = true }: FadeInProps) {
  const reduced = useReducedMotion() ?? false
  const variants = fadeVariants(reduced)

  return (
    <motion.div
      className={cn(className)}
      variants={variants}
      initial="hidden"
      transition={{ delay: reduced ? 0 : delay }}
      {...(viewport
        ? {
            whileInView: "visible",
            viewport: { once: true, amount: 0.12, margin: "0px 0px -8% 0px" },
          }
        : { animate: "visible" })}
    >
      {children}
    </motion.div>
  )
}
