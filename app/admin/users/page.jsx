"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, MoreHorizontal, MapPin, Building, Calendar, CheckCircle, XCircle, UserCheck, Mail } from "lucide-react"

export default function AdminUsersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterRole, setFilterRole] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")

  const users = [
    {
      id: 1,
      name: "Sarah Chen",
      email: "sarah.chen@google.com",
      role: "alumni",
      status: "verified",
      company: "Google",
      position: "Senior Software Engineer",
      graduationYear: "2020",
      location: "Mountain View, CA",
      joinedDate: "2024-01-15",
      mentorshipStatus: "active",
      avatar: "/professional-woman-diverse.png",
    },
    {
      id: 2,
      name: "Alex Kumar",
      email: "alex.kumar@student.edu",
      role: "student",
      status: "active",
      company: null,
      position: "Computer Science Student",
      graduationYear: "2025",
      location: "Boston, MA",
      joinedDate: "2024-02-20",
      mentorshipStatus: "seeking",
      avatar: "/student-alex.png",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike.j@microsoft.com",
      role: "alumni",
      status: "pending",
      company: "Microsoft",
      position: "Product Manager",
      graduationYear: "2019",
      location: "Seattle, WA",
      joinedDate: "2024-03-10",
      mentorshipStatus: "available",
      avatar: "/professional-man.png",
    },
    {
      id: 4,
      name: "Emma Wilson",
      email: "emma.w@student.edu",
      role: "student",
      status: "active",
      company: null,
      position: "Data Science Student",
      graduationYear: "2024",
      location: "New York, NY",
      joinedDate: "2024-01-30",
      mentorshipStatus: "matched",
      avatar: "/professional-woman-designer.png",
    },
  ]

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = filterRole === "all" || user.role === filterRole
    const matchesStatus = filterStatus === "all" || user.status === filterStatus

    return matchesSearch && matchesRole && matchesStatus
  })

  const getStatusBadge = (status) => {
    switch (status) {
      case "verified":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Verified</Badge>
      case "pending":
        return <Badge variant="secondary">Pending</Badge>
      case "active":
        return <Badge variant="default">Active</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getMentorshipBadge = (status) => {
    switch (status) {
      case "active":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Mentoring</Badge>
      case "available":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Available</Badge>
      case "seeking":
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">Seeking</Badge>
      case "matched":
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Matched</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <DashboardLayout userRole="admin" title="User Management">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>User Directory</CardTitle>
            <CardDescription>Manage students, alumni, and their verification status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search users by name or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterRole} onValueChange={setFilterRole}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="student">Students</SelectItem>
                  <SelectItem value="alumni">Alumni</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="verified">Verified</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Tabs defaultValue="list" className="w-full">
              <TabsList>
                <TabsTrigger value="list">List View</TabsTrigger>
                <TabsTrigger value="cards">Card View</TabsTrigger>
              </TabsList>

              <TabsContent value="list" className="space-y-4">
                <div className="rounded-md border">
                  <div className="grid grid-cols-12 gap-4 p-4 font-medium text-sm bg-muted/50 border-b">
                    <div className="col-span-3">User</div>
                    <div className="col-span-2">Role</div>
                    <div className="col-span-2">Status</div>
                    <div className="col-span-2">Company</div>
                    <div className="col-span-2">Mentorship</div>
                    <div className="col-span-1">Actions</div>
                  </div>

                  {filteredUsers.map((user) => (
                    <div
                      key={user.id}
                      className="grid grid-cols-12 gap-4 p-4 border-b last:border-b-0 hover:bg-muted/25"
                    >
                      <div className="col-span-3 flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                          <AvatarFallback>
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{user.name}</p>
                          <p className="text-xs text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                      <div className="col-span-2 flex items-center">
                        <Badge variant="outline" className="capitalize">
                          {user.role}
                        </Badge>
                      </div>
                      <div className="col-span-2 flex items-center">{getStatusBadge(user.status)}</div>
                      <div className="col-span-2 flex items-center">
                        <div>
                          <p className="text-sm font-medium">{user.company || "Student"}</p>
                          <p className="text-xs text-muted-foreground">{user.position}</p>
                        </div>
                      </div>
                      <div className="col-span-2 flex items-center">{getMentorshipBadge(user.mentorshipStatus)}</div>
                      <div className="col-span-1 flex items-center gap-1">
                        {user.status === "pending" && (
                          <Button variant="ghost" size="sm" title="Verify User">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          </Button>
                        )}
                        <Button variant="ghost" size="sm" title="Send Message">
                          <Mail className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" title="More Actions">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="cards" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredUsers.map((user) => (
                    <Card key={user.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="w-12 h-12">
                              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                              <AvatarFallback>
                                {user.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-semibold text-sm">{user.name}</h3>
                              <p className="text-xs text-muted-foreground">{user.email}</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-2 text-xs">
                            <Building className="w-3 h-3 text-muted-foreground" />
                            <span>{user.company || "Student"}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs">
                            <MapPin className="w-3 h-3 text-muted-foreground" />
                            <span>{user.location}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs">
                            <Calendar className="w-3 h-3 text-muted-foreground" />
                            <span>Class of {user.graduationYear}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex gap-2">
                            {getStatusBadge(user.status)}
                            <Badge variant="outline" className="capitalize text-xs">
                              {user.role}
                            </Badge>
                          </div>
                          {getMentorshipBadge(user.mentorshipStatus)}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
