"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import Chatbot from "@/components/chatbot/chatbot"

export default function AlumniChatbotPage() {
  return (
    <DashboardLayout userRole="alumni" title="AI Assistant">
      <div className="h-full flex items-center justify-center p-6">
        <div className="w-full max-w-4xl h-[700px]">
          <Chatbot />
        </div>
      </div>
    </DashboardLayout>
  )
}
