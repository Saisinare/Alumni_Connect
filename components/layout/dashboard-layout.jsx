"use client"

import React from "react"

import { Sidebar } from "@/components/navigation/sidebar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bell, Search, User } from "lucide-react"

export function DashboardLayout({ children, userRole, title }) {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar userRole={userRole} />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <Card className="border-b rounded-none bg-card">
          <div className="flex items-center justify-between p-4">
            <div>{title && <h1 className="text-2xl font-semibold text-balance">{title}</h1>}</div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                <Search className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                <Bell className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                <User className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  )
}
