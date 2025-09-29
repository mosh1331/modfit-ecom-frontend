"use client"
import React from "react"
import Sidebar from "./sideBar"
import AdminHeader from "../header"
import AdminGuard from "@/hooks/useAdminGuard"

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false)

  return (
    <AdminGuard>
      <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-gray-100">
        <AdminHeader onToggleSidebar={() => setSidebarOpen(o => !o)} />
        <div className="mx-auto max-w-full px-4 sm:px-6 lg:px-8">
          <div className="flex gap-6">
            {/* Sidebar */}
            <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            {/* Main Content */}
            <main className="flex-1 py-6 space-y-6 lg:ml-0">
              {children}
            </main>
          </div>
        </div>
      </div>
    </AdminGuard>
  )
}

export default AdminLayout
