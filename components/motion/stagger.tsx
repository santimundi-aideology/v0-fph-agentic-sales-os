"use client"

import { motion, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"
import { staggerContainerVariants, staggerItemVariants } from "@/lib/motion/variants"

export type StaggerProps = {
  children: React.ReactNode
  className?: string
  /** Extra delay before stagger starts (seconds) */
  delayChildren?: number
}

export function Stagger({ children, className, delayChildren = 0 }: StaggerProps) {
  const reduced = useReducedMotion() ?? false

  return (
    <motion.div
      className={cn(className)}
      variants={staggerContainerVariants(reduced, delayChildren)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.08, margin: "0px 0px -10% 0px" }}
    >
      {children}
    </motion.div>
  )
}

export type StaggerItemProps = {
  children: React.ReactNode
  className?: string
}

export function StaggerItem({ children, className }: StaggerItemProps) {
  const reduced = useReducedMotion() ?? false
  return (
    <motion.div className={cn(className)} variants={staggerItemVariants(reduced)}>
      {children}
    </motion.div>
  )
}
