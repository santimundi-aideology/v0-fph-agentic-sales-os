"use client"

import * as React from "react"
import { Minus, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useI18n } from "@/lib/i18n-context"

const STORAGE_KEY = "fph-ui-zoom"
const MIN = 0.7
const MAX = 1.3
const STEP = 0.05

function clamp(value: number) {
  return Math.min(MAX, Math.max(MIN, Math.round(value * 100) / 100))
}

function applyZoom(scale: number) {
  document.documentElement.style.zoom = String(scale)
}

export function ZoomControls({ className }: { className?: string }) {
  const { t } = useI18n()
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
      aria-label={`${t("Page zoom", "تكبير الصفحة")} ${Math.round(zoom * 100 + Number.EPSILON)}${t("%", "٪")}`}
    >
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-7 w-7 shrink-0"
        onClick={() => setAndPersist(zoom - STEP)}
        disabled={zoom <= MIN + 0.001}
        title={t("Zoom out", "تصغير")}
        aria-label={t("Zoom out", "تصغير")}
      >
        <Minus className="h-4 w-4" />
      </Button>
      <span className="min-w-[2.75rem] px-1 text-center text-xs font-medium tabular-nums text-foreground">
        {Math.round(zoom * 100 + Number.EPSILON)}%
      </span>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-7 w-7 shrink-0"
        onClick={() => setAndPersist(zoom + STEP)}
        disabled={zoom >= MAX - 0.001}
        title={t("Zoom in", "تكبير")}
        aria-label={t("Zoom in", "تكبير")}
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  )
}
