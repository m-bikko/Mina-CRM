"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Package,
  Truck,
  ShoppingCart,
  CreditCard,
  Wallet,
} from "lucide-react";

const navItems = [
  {
    title: "Дашборд",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Товары",
    href: "/admin/products",
    icon: Package,
  },
  {
    title: "Завозы",
    href: "/admin/supply",
    icon: Truck,
  },
  {
    title: "Продажи",
    href: "/admin/sales",
    icon: ShoppingCart,
  },
  {
    title: "Типы оплаты",
    href: "/admin/payment-types",
    icon: CreditCard,
  },
  {
    title: "Финансы",
    href: "/admin/finance",
    icon: Wallet,
  },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="w-64 min-h-screen bg-secondary/30 border-r">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-8">Amina CRM</h1>
        <div className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-secondary"
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{item.title}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
