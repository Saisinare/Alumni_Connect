"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  UserCheck,
  MessageSquare,
  Calendar,
  TrendingUp,
  AlertCircle,
  Award,
  Building,
  GraduationCap,
  Activity,
} from "lucide-react"

export default function AdminDashboardPage() {
  const stats = [
    {
      title: "Total Users",
      value: "2,847",
      change: "+12%",
      trend: "up",
      icon: Users,
      description: "Active platform users",
    },
    {
      title: "Pending Verifications",
      value: "23",
      change: "+5",
      trend: "up",
      icon: UserCheck,
      description: "Alumni awaiting verification",
    },
    {
      title: "Active Mentorships",
      value: "156",
      change: "+8%",
      trend: "up",
      icon: Award,
      description: "Ongoing mentor-mentee pairs",
    },
    {
      title: "Forum Activity",
      value: "89",
      change: "+15%",
      trend: "up",
      icon: MessageSquare,
      description: "Questions this week",
    },
  ]

  const recentActivity = [
    {
      type: "verification",
      user: "Sarah Chen",
      action: "submitted verification documents",
      time: "2 hours ago",
      status: "pending",
    },
    {
      type: "mentorship",
      user: "Alex Kumar",
      action: "started mentoring Emma Wilson",
      time: "4 hours ago",
      status: "active",
    },
    {
      type: "forum",
      user: "Mike Johnson",
      action: "answered a question about system design",
      time: "6 hours ago",
      status: "completed",
    },
    {
      type: "event",
      user: "Lisa Park",
      action: "registered for Tech Talk: AI in Healthcare",
      time: "1 day ago",
      status: "registered",
    },
  ]

  const pendingTasks = [
    {
      title: "Review Alumni Verifications",
      count: 23,
      priority: "high",
      description: "New alumni waiting for profile verification",
    },
    {
      title: "Moderate Forum Posts",
      count: 7,
      priority: "medium",
      description: "Flagged posts requiring review",
    },
    {
      title: "Event Approvals",
      count: 4,
      priority: "medium",
      description: "Upcoming events pending approval",
    },
    {
      title: "System Updates",
      count: 2,
      priority: "low",
      description: "Platform maintenance tasks",
    },
  ]

  return (
    <DashboardLayout userRole="admin" title="Admin Dashboard">
      <div className="space-y-6">
        <Card className="bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-teal-500/10 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="pb-6">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
              Admin Dashboard
            </CardTitle>
            <CardDescription className="text-lg mt-2 text-muted-foreground">
              Monitor platform health and manage user activities
            </CardDescription>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon
            const gradientColors = {
              Users: "from-blue-500 to-blue-600",
              UserCheck: "from-purple-500 to-purple-600",
              Award: "from-teal-500 to-teal-600",
              MessageSquare: "from-orange-500 to-orange-600",
            }
            const bgColors = {
              Users: "from-blue-50 to-blue-100/50 hover:from-blue-100 hover:to-blue-200/50",
              UserCheck: "from-purple-50 to-purple-100/50 hover:from-purple-100 hover:to-purple-200/50",
              Award: "from-teal-50 to-teal-100/50 hover:from-teal-100 hover:to-teal-200/50",
              MessageSquare: "from-orange-50 to-orange-100/50 hover:from-orange-100 hover:to-orange-200/50",
            }
            const textColors = {
              Users: "text-blue-700",
              UserCheck: "text-purple-700",
              Award: "text-teal-700",
              MessageSquare: "text-orange-700",
            }

            return (
              <Card
                key={stat.title}
                className={`group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br ${bgColors[stat.icon.name] || bgColors.Users}`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                      <p className={`text-2xl font-bold ${textColors[stat.icon.name] || textColors.Users}`}>
                        {stat.value}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
                    </div>
                    <div className="flex flex-col items-end">
                      <div
                        className={`w-12 h-12 bg-gradient-to-br ${gradientColors[stat.icon.name] || gradientColors.Users} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 mb-2`}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <Badge
                        variant={stat.trend === "up" ? "default" : "secondary"}
                        className="text-xs bg-white/80 shadow-sm"
                      >
                        {stat.change}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-red-50/30">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-orange-600 rounded-lg flex items-center justify-center">
                    <AlertCircle className="w-4 h-4 text-white" />
                  </div>
                  Pending Tasks
                </CardTitle>
                <CardDescription className="mt-2">Items requiring your attention</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {pendingTasks.map((task, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-xl border-0 bg-white/80 hover:bg-white hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold text-sm text-gray-900">{task.title}</h4>
                          <Badge
                            variant={
                              task.priority === "high"
                                ? "destructive"
                                : task.priority === "medium"
                                  ? "default"
                                  : "secondary"
                            }
                            className={`text-xs ${
                              task.priority === "high"
                                ? "bg-red-100 text-red-700 border-red-200"
                                : task.priority === "medium"
                                  ? "bg-orange-100 text-orange-700 border-orange-200"
                                  : "bg-gray-100 text-gray-700 border-gray-200"
                            }`}
                          >
                            {task.priority}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-600 mb-3">{task.description}</p>
                        <Badge variant="outline" className="text-xs bg-blue-100 text-blue-700 border-blue-200">
                          {task.count} items
                        </Badge>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="ml-3 hover:bg-blue-100 text-blue-600 border-blue-200 bg-transparent"
                      >
                        Review
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-blue-50/30">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <Activity className="w-4 h-4 text-white" />
                  </div>
                  Recent Activity
                </CardTitle>
                <CardDescription className="mt-2">Latest platform activities and user actions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-xl border-0 bg-white/80 hover:bg-white hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-md">
                          {activity.type === "verification" && <UserCheck className="w-5 h-5 text-white" />}
                          {activity.type === "mentorship" && <Award className="w-5 h-5 text-white" />}
                          {activity.type === "forum" && <MessageSquare className="w-5 h-5 text-white" />}
                          {activity.type === "event" && <Calendar className="w-5 h-5 text-white" />}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-900">
                            <span className="font-semibold">{activity.user}</span> {activity.action}
                          </p>
                          <div className="flex items-center gap-3 mt-2">
                            <p className="text-xs text-gray-500">{activity.time}</p>
                            <Badge
                              variant={activity.status === "pending" ? "secondary" : "outline"}
                              className={`text-xs ${
                                activity.status === "pending"
                                  ? "bg-orange-100 text-orange-700 border-orange-200"
                                  : activity.status === "active"
                                    ? "bg-green-100 text-green-700 border-green-200"
                                    : "bg-blue-100 text-blue-700 border-blue-200"
                              }`}
                            >
                              {activity.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-teal-50/30">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-white" />
                </div>
                Platform Growth
              </CardTitle>
              <CardDescription className="mt-2">User engagement and growth metrics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">Student Registrations</span>
                  <span className="font-semibold text-teal-600">85%</span>
                </div>
                <Progress value={85} className="h-3 bg-gray-200" />
                <p className="text-xs text-gray-600">1,247 students registered this month</p>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">Alumni Engagement</span>
                  <span className="font-semibold text-blue-600">72%</span>
                </div>
                <Progress value={72} className="h-3 bg-gray-200" />
                <p className="text-xs text-gray-600">Active alumni participation rate</p>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">Mentorship Success</span>
                  <span className="font-semibold text-purple-600">91%</span>
                </div>
                <Progress value={91} className="h-3 bg-gray-200" />
                <p className="text-xs text-gray-600">Successful mentorship completions</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-purple-50/30">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-teal-600 rounded-lg flex items-center justify-center">
                  <Building className="w-4 h-4 text-white" />
                </div>
                Quick Actions
              </CardTitle>
              <CardDescription className="mt-2">Common administrative tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                className="w-full justify-start bg-white hover:bg-blue-50 text-blue-700 border border-blue-200 shadow-sm hover:shadow-md transition-all duration-300"
                variant="outline"
              >
                <UserCheck className="w-4 h-4 mr-3" />
                Review Alumni Verifications
              </Button>
              <Button
                className="w-full justify-start bg-white hover:bg-purple-50 text-purple-700 border border-purple-200 shadow-sm hover:shadow-md transition-all duration-300"
                variant="outline"
              >
                <MessageSquare className="w-4 h-4 mr-3" />
                Moderate Forum Content
              </Button>
              <Button
                className="w-full justify-start bg-white hover:bg-teal-50 text-teal-700 border border-teal-200 shadow-sm hover:shadow-md transition-all duration-300"
                variant="outline"
              >
                <Calendar className="w-4 h-4 mr-3" />
                Manage Events
              </Button>
              <Button
                className="w-full justify-start bg-white hover:bg-orange-50 text-orange-700 border border-orange-200 shadow-sm hover:shadow-md transition-all duration-300"
                variant="outline"
              >
                <GraduationCap className="w-4 h-4 mr-3" />
                Send Announcements
              </Button>
              <Button
                className="w-full justify-start bg-white hover:bg-green-50 text-green-700 border border-green-200 shadow-sm hover:shadow-md transition-all duration-300"
                variant="outline"
              >
                <TrendingUp className="w-4 h-4 mr-3" />
                View Analytics
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
