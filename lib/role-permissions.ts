import type { UserRole } from "./types"

export interface NavItem {
  name: string
  nameAr: string
  href: string
  icon: string
  roles: UserRole[]
}

export const navigationItems: NavItem[] = [
  {
    name: "Overview",
    nameAr: "نظرة عامة",
    href: "/",
    icon: "LayoutDashboard",
    roles: ["admin", "sales_manager", "sales_rep", "qa_supervisor", "compliance_officer", "operations"],
  },
  {
    name: "Campaigns",
    nameAr: "الحملات",
    href: "/campaigns",
    icon: "Megaphone",
    roles: ["admin", "sales_manager", "operations"],
  },
  {
    name: "Conversations",
    nameAr: "المحادثات",
    href: "/conversations",
    icon: "MessageSquare",
    roles: ["admin", "sales_manager", "sales_rep", "qa_supervisor"],
  },
  {
    name: "Live Monitor",
    nameAr: "المراقبة المباشرة",
    href: "/conversations/live",
    icon: "Radio",
    roles: ["admin", "sales_manager", "sales_rep"],
  },
  {
    name: "Handoff Packages",
    nameAr: "حزم التسليم",
    href: "/handoffs",
    icon: "UserPlus",
    roles: ["admin", "sales_manager", "sales_rep"],
  },
  {
    name: "Properties",
    nameAr: "العقارات",
    href: "/properties",
    icon: "Building",
    roles: ["admin", "sales_manager", "sales_rep"],
  },
  {
    name: "Appointments",
    nameAr: "المواعيد",
    href: "/appointments",
    icon: "Calendar",
    roles: ["admin", "sales_manager", "sales_rep"],
  },
  {
    name: "Analytics",
    nameAr: "التحليلات",
    href: "/analytics",
    icon: "BarChart3",
    roles: ["admin", "sales_manager"],
  },
  {
    name: "Integrations",
    nameAr: "التكاملات",
    href: "/integrations",
    icon: "Plug",
    roles: ["admin", "operations"],
  },
  {
    name: "Compliance Center",
    nameAr: "مركز الامتثال",
    href: "/compliance",
    icon: "Shield",
    roles: ["admin", "compliance_officer"],
  },
  {
    name: "QA Review",
    nameAr: "مراجعة الجودة",
    href: "/qa-review",
    icon: "ClipboardCheck",
    roles: ["admin", "qa_supervisor"],
  },
  {
    name: "System Health",
    nameAr: "صحة النظام",
    href: "/system-health",
    icon: "Activity",
    roles: ["admin", "operations"],
  },
  {
    name: "User Management",
    nameAr: "إدارة المستخدمين",
    href: "/users",
    icon: "Users",
    roles: ["admin"],
  },
  {
    name: "Settings",
    nameAr: "الإعدادات",
    href: "/settings",
    icon: "Settings",
    roles: ["admin", "sales_manager", "operations"],
  },
]

export function getNavigationForRole(role: UserRole): NavItem[] {
  return navigationItems.filter((item) => item.roles.includes(role))
}

const roleLabels: Record<UserRole, { en: string; ar: string }> = {
  admin: { en: "Administrator", ar: "مسؤول النظام" },
  sales_manager: { en: "Sales Manager", ar: "مدير المبيعات" },
  sales_rep: { en: "Sales Representative", ar: "مندوب مبيعات" },
  qa_supervisor: { en: "QA Supervisor", ar: "مشرف الجودة" },
  compliance_officer: { en: "Compliance Officer", ar: "مسؤول الامتثال" },
  operations: { en: "Operations Engineer", ar: "مهندس العمليات" },
}

export function getRoleLabel(role: UserRole, lang: "en" | "ar" = "en"): string {
  const row = roleLabels[role]
  return lang === "ar" ? row.ar : row.en
}
