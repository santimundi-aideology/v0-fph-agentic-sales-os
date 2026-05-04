"use client"

import { motion, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"
import { scaleInVariants } from "@/lib/motion/variants"

export type ScaleInProps = {
  children: React.ReactNode
  className?: string
  delay?: number
  /** Default false — use on mount for dialogs / popovers; set true for scroll reveal */
  viewport?: boolean
}

export function ScaleIn({ children, className, delay = 0, viewport = false }: ScaleInProps) {
  const reduced = useReducedMotion() ?? false
  const variants = scaleInVariants(reduced)

  return (
    <motion.div
      className={cn(className)}
      variants={variants}
      initial="hidden"
      transition={{ delay: reduced ? 0 : delay }}
      {...(viewport
        ? {
            whileInView: "visible",
            viewport: { once: true, amount: 0.15 },
          }
        : { animate: "visible" })}
    >
      {children}
    </motion.div>
  )
}
