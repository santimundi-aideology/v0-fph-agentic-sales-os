"use client"

import * as React from "react"
import { Minus, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const STORAGE_KEY = "fph-ui-zoom"
const MIN = 0.75
const MAX = 1.5
const STEP = 0.1

function clamp(value: number) {
  return Math.min(MAX, Math.max(MIN, Math.round(value * 100) / 100))
}

function applyZoom(scale: number) {
  document.documentElement.style.zoom = String(scale)
}

export function ZoomControls({ className }: { className?: string }) {
  const [zoom, setZoom] = React.useState(1)

  React.useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? parseFloat(raw) : 1
    const initial = clamp(Number.isFinite(parsed) ? parsed : 1)
    setZoom(initial)
    applyZoom(initial)
  }, [])

  const setAndPersist = React.useCallback((next: number) => {
    const v = clamp(next)
    setZoom(v)
    localStorage.setItem(STORAGE_KEY, String(v))
    applyZoom(v)
  }, [])

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-md border border-border/60 bg-background/50 p-0.5",
        className,
      )}
      role="group"
      aria-label={`Page zoom ${Math.round(zoom * 100)} percent`}
    >
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-7 w-7 shrink-0"
        onClick={() => setAndPersist(zoom - STEP)}
        disabled={zoom <= MIN + 0.001}
        title="Zoom out"
        aria-label="Zoom out"
      >
        <Minus className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-7 w-7 shrink-0"
        onClick={() => setAndPersist(zoom + STEP)}
        disabled={zoom >= MAX - 0.001}
        title="Zoom in"
        aria-label="Zoom in"
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  )
}
