"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"

export default function AdminVerificationPage() {
  const [selectedTab, setSelectedTab] = useState("pending")

  const pendingAlumni = [
    {
      id: 1,
      name: "Jennifer Martinez",
      email: "jennifer.martinez@email.com",
      company: "Meta",
      position: "Product Designer",
      batch: "2023",
      status: "pending",
      submittedAt: "2024-01-15",
      skills: ["Figma", "Sketch", "Adobe Creative Suite"],
    },
    {
      id: 2,
      name: "Robert Chen",
      email: "robert.chen@email.com",
      company: "Stripe",
      position: "Software Engineer",
      batch: "2022",
      status: "pending",
      submittedAt: "2024-01-14",
      skills: ["JavaScript", "Python", "React"],
    },
  ]

  const verifiedAlumni = [
    {
      id: 3,
      name: "Sarah Chen",
      email: "sarah.chen@email.com",
      company: "Google",
      position: "Senior Software Engineer",
      batch: "2020",
      status: "verified",
      submittedAt: "2024-01-10",
      skills: ["Java", "Python", "Kubernetes"],
    },
  ]

  const rejectedAlumni = [
    {
      id: 4,
      name: "John Smith",
      email: "john.smith@email.com",
      company: "Unknown",
      position: "Software Engineer",
      batch: "2023",
      status: "rejected",
      submittedAt: "2024-01-05",
      skills: ["JavaScript", "React"],
    },
  ]

  const handleApprove = (alumnusId) => {
    console.log("Approving alumnus:", alumnusId)
    alert("Alumnus approved successfully!")
  }

  const handleReject = (alumnusId) => {
    console.log("Rejecting alumnus:", alumnusId)
    alert("Alumnus rejected")
  }

  const renderAlumniCard = (alumnus) => (
    <div key={alumnus.id} className="bg-white rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-bold text-lg">{alumnus.name}</h3>
          <p className="text-sm text-gray-600">{alumnus.position}</p>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          alumnus.status === "pending" ? "bg-yellow-100 text-yellow-700" :
          alumnus.status === "verified" ? "bg-green-100 text-green-700" :
          "bg-red-100 text-red-700"
        }`}>
          {alumnus.status}
        </span>
      </div>

      <div className="space-y-2 mb-4">
        <div className="text-sm text-gray-600">
          <strong>Company:</strong> {alumnus.company}
        </div>
        <div className="text-sm text-gray-600">
          <strong>Batch:</strong> {alumnus.batch}
        </div>
        <div className="text-sm text-gray-600">
          <strong>Submitted:</strong> {alumnus.submittedAt}
        </div>
      </div>

      <div className="mb-4">
        <div className="text-sm font-medium mb-2">Skills:</div>
        <div className="flex flex-wrap gap-1">
          {alumnus.skills.map((skill) => (
            <span key={skill} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
            View Details
          </button>
          <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
            Download
          </button>
        </div>
        {alumnus.status === "pending" && (
          <div className="flex gap-2">
            <button 
              className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
              onClick={() => handleApprove(alumnus.id)}
            >
              Approve
            </button>
            <button 
              className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
              onClick={() => handleReject(alumnus.id)}
            >
              Reject
            </button>
          </div>
        )}
      </div>
    </div>
  )

  return (
    <DashboardLayout userRole="admin" title="Alumni Verification">
      <div className="space-y-8">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Alumni Verification</h1>
              <p className="text-orange-100 text-lg">
                Review and verify alumni applications
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{pendingAlumni.length}</div>
              <div className="text-orange-100">Pending Review</div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="space-y-6">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
            <button
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedTab === "pending" 
                  ? "bg-white text-gray-900 shadow-sm" 
                  : "text-gray-600 hover:text-gray-900"
              }`}
              onClick={() => setSelectedTab("pending")}
            >
              Pending ({pendingAlumni.length})
            </button>
            <button
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedTab === "verified" 
                  ? "bg-white text-gray-900 shadow-sm" 
                  : "text-gray-600 hover:text-gray-900"
              }`}
              onClick={() => setSelectedTab("verified")}
            >
              Verified ({verifiedAlumni.length})
            </button>
            <button
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedTab === "rejected" 
                  ? "bg-white text-gray-900 shadow-sm" 
                  : "text-gray-600 hover:text-gray-900"
              }`}
              onClick={() => setSelectedTab("rejected")}
            >
              Rejected ({rejectedAlumni.length})
            </button>
          </div>

          {/* Tab Content */}
          {selectedTab === "pending" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pendingAlumni.map(renderAlumniCard)}
            </div>
          )}

          {selectedTab === "verified" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {verifiedAlumni.map(renderAlumniCard)}
            </div>
          )}

          {selectedTab === "rejected" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rejectedAlumni.map(renderAlumniCard)}
            </div>
          )}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <span className="text-yellow-600 font-bold">⏰</span>
              </div>
              <div>
                <div className="text-2xl font-bold">{pendingAlumni.length}</div>
                <div className="text-sm text-gray-600">Pending</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-green-600 font-bold">✓</span>
              </div>
              <div>
                <div className="text-2xl font-bold">{verifiedAlumni.length}</div>
                <div className="text-sm text-gray-600">Verified</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <span className="text-red-600 font-bold">✗</span>
              </div>
              <div>
                <div className="text-2xl font-bold">{rejectedAlumni.length}</div>
                <div className="text-sm text-gray-600">Rejected</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 font-bold">👥</span>
              </div>
              <div>
                <div className="text-2xl font-bold">{pendingAlumni.length + verifiedAlumni.length + rejectedAlumni.length}</div>
                <div className="text-sm text-gray-600">Total</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
