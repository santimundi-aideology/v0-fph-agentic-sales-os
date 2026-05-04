"use client"

import { motion, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"
import { motionDistance } from "@/lib/motion/tokens"
import { slideUpVariants } from "@/lib/motion/variants"

export type SlideUpProps = {
  children: React.ReactNode
  className?: string
  delay?: number
  viewport?: boolean
  distance?: keyof typeof motionDistance
}

export function SlideUp({
  children,
  className,
  delay = 0,
  viewport = true,
  distance = "md",
}: SlideUpProps) {
  const reduced = useReducedMotion() ?? false
  const variants = slideUpVariants(reduced, distance)

  return (
    <motion.div
      className={cn(className)}
      variants={variants}
      initial="hidden"
      transition={{ delay: reduced ? 0 : delay }}
      {...(viewport
        ? {
            whileInView: "visible",
            viewport: { once: true, amount: 0.1, margin: "0px 0px -8% 0px" },
          }
        : { animate: "visible" })}
    >
      {children}
    </motion.div>
  )
}
