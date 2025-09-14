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
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const Sidebar = ({ open }: { open: boolean }) => {
  const pathname = usePathname()
  console.log(pathname,'pathname')

  const NavItem = ({
    icon: Icon,
    label,
    to,
  }: {
    icon: any
    label: string
    to: string
  }) => {
    const active = pathname === to || pathname.startsWith(`/${to}`) // highlight current route

    return (
      <Link
        href={`${to}`}
        className={`flex items-center gap-3 px-3 py-2 rounded-xl w-full text-left hover:bg-gray-100 dark:hover:bg-gray-800 transition ${
          active ? "bg-gray-100 dark:bg-gray-800 font-medium" : ""
        }`}
      >
        <Icon className="h-4 w-4" />
        <span className="text-sm">{label}</span>
      </Link>
    )
  }

  return (
    <div
      className={`${
        open ? "block" : "hidden"
      } lg:block lg:sticky lg:top-16 lg:h-[calc(100dvh-4rem)] border-r`}
    >
      <div className="p-3 lg:p-4 w-[280px] space-y-1">
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
        <NavItem to="filters" icon={Filter} label="Filters" />
      </div>
    </div>
  )
}

export default Sidebar
