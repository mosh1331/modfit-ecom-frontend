"use client"

import {
  Wallet,
  Receipt,
  Shirt,
  LineChart as LineChartIcon,
  Users,
  Filter,
  Book,
  ShoppingBasket,
  X
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const Sidebar = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const pathname = usePathname()

  const NavItem = ({
    icon: Icon,
    label,
    to,
  }: {
    icon: any
    label: string
    to: string
  }) => {
    const active = pathname === to || pathname.startsWith(`/${to}`)
    return (
      <Link
        href={to}
        className={`flex items-center gap-3 px-3 py-2 rounded-xl w-full text-left hover:bg-gray-100 dark:hover:bg-gray-800 transition ${
          active ? "bg-gray-100 dark:bg-gray-800 font-medium" : ""
        }`}
        onClick={onClose} // auto-close when clicking nav
      >
        <Icon className="h-4 w-4" />
        <span className="text-sm">{label}</span>
      </Link>
    )
  }

  return (
    <>
      {/* Mobile Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 z-50 h-full w-[260px] bg-white dark:bg-gray-950 border-r
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:h-[calc(100dvh-4rem)]
        `}
      >
        {/* Mobile Close Button */}
        <div className="flex items-center justify-between p-3 border-b lg:hidden">
          <span className="font-medium">Menu</span>
          <button onClick={onClose}>
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-3 lg:p-4 w-full space-y-1">
          <div className="text-xs uppercase tracking-wider text-gray-500 px-2">
            Overview
          </div>
          <NavItem to="/admin/dashboard" icon={LineChartIcon} label="Dashboard" />
          <NavItem to="/admin/sales" icon={Receipt} label="Sales" />
          <NavItem to="/admin/expenses" icon={Wallet} label="Expenses" />
          <NavItem to="/admin/ledger" icon={Book} label="Ledger" />
          <NavItem to="/admin/partners" icon={Users} label="Partners" />

          <div className="my-2 border-t"></div>

          <div className="text-xs uppercase tracking-wider text-gray-500 px-2">
            Catalog
          </div>
          <NavItem to="/admin/product-manage" icon={Shirt} label="Products" />
          <NavItem to="/admin/materials" icon={ShoppingBasket} label="Materials" />
          <NavItem to="/admin/filters" icon={Filter} label="Filters" />
        </div>
      </div>
    </>
  )
}

export default Sidebar
