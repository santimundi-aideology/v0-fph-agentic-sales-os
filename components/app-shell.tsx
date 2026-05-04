"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Phone,
  MessageSquare,
  Building,
  Calendar,
  BarChart3,
  Plug,
  Shield,
  ClipboardCheck,
  Activity,
  Users,
  Settings,
  Search,
  ChevronDown,
  Menu,
  X,
  Radio,
  UserPlus,
  Megaphone,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import type { UserRole } from "@/lib/types"
import { getNavigationForRole, getRoleLabel } from "@/lib/role-permissions"
import { cn } from "@/lib/utils"
import { VoiceAgentSelector } from "@/components/voice-agent-selector"
import { ThemeToggle } from "@/components/theme-toggle"
import { ZoomControls } from "@/components/zoom-controls"
import { useI18n } from "@/lib/i18n-context"

const iconMap = {
  LayoutDashboard,
  Phone,
  MessageSquare,
  Building,
  Calendar,
  BarChart3,
  Plug,
  Shield,
  ClipboardCheck,
  Activity,
  Users,
  Settings,
  Radio,
  UserPlus,
  Megaphone,
}

interface AppShellProps {
  children: React.ReactNode
  defaultRole?: UserRole
}

export function AppShell({ children, defaultRole = "sales_manager" }: AppShellProps) {
  const { language, t } = useI18n()
  const [currentRole, setCurrentRole] = React.useState<UserRole>(defaultRole)
  const [sidebarOpen, setSidebarOpen] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)
  const pathname = usePathname()

  React.useEffect(() => {
    setMounted(true)
    // Load role from localStorage after mount to avoid hydration mismatch
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("fph-current-role")
      if (stored) {
        setCurrentRole(stored as UserRole)
      }
      
    }
  }, [])

  const handleRoleChange = (role: UserRole) => {
    setCurrentRole(role)
    if (typeof window !== "undefined") {
      localStorage.setItem("fph-current-role", role)
    }
  }


  const navigation = React.useMemo(
    () => getNavigationForRole(currentRole),
    [currentRole]
  )

  return (
    <div className="relative min-h-screen">
      {/* Top Bar — full width on mobile; from lg onward only above main content (starts where sidebar ends) */}
      <header className="fixed top-0 start-0 end-0 z-50 h-16 glass-panel border-b lg:start-64">
        <div className="flex h-full items-center justify-between gap-4 px-4 lg:px-6">
          {/* Mobile / tablet: menu + compact brand */}
          <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-4 lg:hidden">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="shrink-0 p-2 hover:bg-accent rounded-lg transition-colors"
              type="button"
              aria-expanded={sidebarOpen}
              aria-label={sidebarOpen ? t("Close menu", "إغلاق القائمة") : t("Open menu", "فتح القائمة")}
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <Link href="/" className="flex min-w-0 items-center gap-2 sm:gap-2.5">
              <span className="relative block h-12 w-[min(100%,15rem)] shrink-0 sm:h-14 sm:w-[18rem]">
                <Image
                  src="/logo.png"
                  alt=""
                  fill
                  className="object-contain object-left"
                  sizes="(max-width:768px) 280px, 320px"
                  priority
                />
              </span>
              <div className="min-w-0">
                <div className="truncate font-serif text-sm font-semibold leading-tight tracking-tight text-foreground sm:text-base">
                  {t("Etisalat Projects Holding", "إتصالات للمشاريع القابضة")}
                </div>
              </div>
            </Link>
          </div>

          {/* Center: Search */}
          <div className="hidden md:flex flex-1 max-w-md md:mx-4 lg:mx-8">
            <div className="relative w-full">
              <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t("Search prospects, properties...", "ابحث عن العملاء والعقارات...")}
                className="ps-9 bg-background/50 border-border/50"
              />
            </div>
          </div>

          {/* Right: Environment, Role, User */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-1">
              <ZoomControls />
              <ThemeToggle />
            </div>
            <Badge variant="outline" className="hidden sm:flex gap-1.5 border-primary/30 text-primary">
              <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              {t("Sandbox", "بيئة تجريبية")}
            </Badge>

            {/* Role Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                  {getRoleLabel(currentRole, language)}
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>{t("Switch Role", "تبديل الدور")}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleRoleChange("admin")}>
                  {getRoleLabel("admin", language)}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleRoleChange("sales_manager")}>
                  {getRoleLabel("sales_manager", language)}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleRoleChange("sales_rep")}>
                  {getRoleLabel("sales_rep", language)}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleRoleChange("qa_supervisor")}>
                  {getRoleLabel("qa_supervisor", language)}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleRoleChange("compliance_officer")}>
                  {getRoleLabel("compliance_officer", language)}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleRoleChange("operations")}>
                  {getRoleLabel("operations", language)}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

          </div>
        </div>
      </header>

      {/* Sidebar — desktop: full-height column with large brand; mobile: drawer below header */}
      <aside
        className={cn(
          "fixed start-0 z-40 flex w-64 flex-col glass-panel border-e transition-transform duration-300",
          "top-16 bottom-0 lg:top-0",
          "lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Large logo + title (desktop only — keeps thin top bar at h-16 while logo ~2× compact header size) */}
        <div className="hidden shrink-0 flex-col gap-3 border-b border-border/60 px-4 pb-5 pt-6 lg:flex">
          <Link href="/" className="flex flex-col gap-3 outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg">
            <span className="relative mx-auto block h-32 w-full max-w-[248px]">
              <Image
                src="/logo.png"
                alt=""
                fill
                className="object-contain object-center"
                sizes="320px"
                priority
              />
            </span>
            <p className="text-center font-serif text-sm font-semibold leading-snug tracking-tight text-foreground">
              {t("Etisalat Projects Holding", "إتصالات للمشاريع القابضة")}
            </p>
          </Link>
        </div>

        <nav className="flex flex-1 flex-col overflow-y-auto p-4">
          <div className="space-y-1">
            {navigation.map((item) => {
              const Icon = iconMap[item.icon as keyof typeof iconMap]
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  prefetch={true}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                    isActive
                      ? "bg-primary/10 text-primary border border-primary/20 gold-glow"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50",
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span>{t(item.name, item.nameAr)}</span>
                </Link>
              )
            })}
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="lg:ps-64 pt-16">
        <div className="relative z-10 mx-auto min-h-[calc(100vh-4rem)] w-full max-w-[1600px] px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Voice Agent Selector - Chat Bubble */}
      {mounted && <VoiceAgentSelector />}
    </div>
  )
}
