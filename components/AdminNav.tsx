"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Package,
  Truck,
  ShoppingCart,
  CreditCard,
  Wallet,
  PackageMinus,
  Menu,
  X,
  Send,
  RotateCcw,
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
    title: "Доставка",
    href: "/admin/delivery",
    icon: Send,
  },
  {
    title: "Возвраты",
    href: "/admin/returns",
    icon: RotateCcw,
  },
  {
    title: "Списания",
    href: "/admin/write-off",
    icon: PackageMinus,
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
  const [isOpen, setIsOpen] = useState(false);

  // Close sidebar on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-background border-b h-14 flex items-center px-4">
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 -ml-2 hover:bg-secondary rounded-lg transition-colors"
        >
          <Menu className="h-6 w-6" />
        </button>
        <div className="ml-3">
          <Image
            src="/Logo_minawear.svg"
            alt="Minawear"
            width={100}
            height={28}
            priority
          />
        </div>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/50"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <nav
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-50 w-64 bg-background lg:bg-secondary/30 border-r transform transition-transform duration-300 ease-in-out",
          "lg:transform-none lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-6 h-full flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <Image
              src="/Logo_minawear.svg"
              alt="Minawear"
              width={140}
              height={40}
              priority
            />
            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden p-2 -mr-2 hover:bg-secondary rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="space-y-2 flex-1">
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

    </>
  );
}
