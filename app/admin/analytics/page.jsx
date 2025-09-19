"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, Users, MessageSquare, Calendar, Award, BarChart3, PieChart, Activity, ArrowUp, ArrowDown, Minus } from "lucide-react"

export default function AdminAnalyticsPage() {
  const overviewStats = [
    {
      title: "Total Users",
      value: "2,847",
      change: "+12.5%",
      trend: "up",
      icon: Users,
      period: "vs last month",
    },
    {
      title: "Active Mentorships",
      value: "156",
      change: "+8.2%",
      trend: "up",
      icon: Award,
      period: "currently active",
    },
    {
      title: "Forum Engagement",
      value: "89%",
      change: "+5.1%",
      trend: "up",
      icon: MessageSquare,
      period: "weekly activity",
    },
    {
      title: "Event Attendance",
      value: "73%",
      change: "+2.8%",
      trend: "up",
      icon: Calendar,
      period: "average rate",
    },
  ]

  const userGrowth = [
    { month: "Jan", students: 120, alumni: 45 },
    { month: "Feb", students: 145, alumni: 52 },
    { month: "Mar", students: 168, alumni: 61 },
    { month: "Apr", students: 192, alumni: 68 },
    { month: "May", students: 215, alumni: 74 },
    { month: "Jun", students: 238, alumni: 82 },
  ]

  const engagementMetrics = [
    {
      category: "Forum Participation",
      value: 85,
      description: "Users actively asking/answering questions",
    },
    {
      category: "Mentorship Requests",
      value: 72,
      description: "Students seeking mentorship",
    },
    {
      category: "Event Participation",
      value: 68,
      description: "Users attending events regularly",
    },
    {
      category: "Profile Completion",
      value: 91,
      description: "Users with complete profiles",
    },
  ]

  const topCompanies = [
    { name: "Google", count: 45, percentage: 18 },
    { name: "Microsoft", count: 38, percentage: 15 },
    { name: "Amazon", count: 32, percentage: 13 },
    { name: "Meta", count: 28, percentage: 11 },
    { name: "Apple", count: 25, percentage: 10 },
    { name: "Others", count: 82, percentage: 33 },
  ]

  const recentTrends = [
    {
      metric: "New User Registrations",
      value: "+23%",
      trend: "up",
      description: "Significant increase in student sign-ups",
    },
    {
      metric: "Mentorship Success Rate",
      value: "91%",
      trend: "stable",
      description: "Consistent high completion rates",
    },
    {
      metric: "Forum Response Time",
      value: "2.4 hrs",
      trend: "down",
      description: "Faster response times from alumni",
    },
    {
      metric: "Event Satisfaction",
      value: "4.8/5",
      trend: "up",
      description: "High satisfaction scores",
    },
  ]

  return (
    <DashboardLayout userRole="admin" title="Analytics Dashboard">
      <div className="space-y-6">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {overviewStats.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.title}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-xs text-muted-foreground mt-1">{stat.period}</p>
                    </div>
                    <div className="flex flex-col items-end">
                      <Icon className="w-5 h-5 text-muted-foreground mb-2" />
                      <div className="flex items-center gap-1">
                        {stat.trend === "up" && <ArrowUp className="w-3 h-3 text-green-600" />}
                        {stat.trend === "down" && <ArrowDown className="w-3 h-3 text-red-600" />}
                        {stat.trend === "stable" && <Minus className="w-3 h-3 text-gray-600" />}
                        <Badge 
                          variant={stat.trend === "up" ? "default" : stat.trend === "down" ? "destructive" : "secondary"} 
                          className="text-xs"
                        >
                          {stat.change}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    User Growth
                  </CardTitle>
                  <CardDescription>Monthly registration trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {userGrowth.slice(-3).map((data, index) => (
                      <div key={data.month} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{data.month} 2024</span>
                          <span className="font-medium">{data.students + data.alumni} users</span>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>Students: {data.students}</span>
                            <span>Alumni: {data.alumni}</span>
                          </div>
                          <Progress value={(data.students / (data.students + data.alumni)) * 100} className="h-2" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="w-5 h-5" />
                    Top Companies
                  </CardTitle>
                  <CardDescription>Alumni distribution by company</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {topCompanies.map((company, index) => (
                      <div key={company.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-3 h-3 rounded-full bg-primary"
                            style={{
                              backgroundColor: `hsl(${index * 60}, 70%, 50%)`,
                            }}
                          />
                          <span className="text-sm font-medium">{company.name}</span>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{company.count}</p>
                          <p className="text-xs text-muted-foreground">{company.percentage}%</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>User Demographics</CardTitle>
                  <CardDescription>Breakdown of platform users</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Students</span>
                      <span className="font-medium">1,847 (65%)</span>
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Alumni</span>
                      <span className="font-medium">1,000 (35%)</span>
                    </div>
                    <Progress value={35} className="h-2" />
                  </div>

                  <div className="pt-4 border-t">
                    <h4 className="font-medium text-sm mb-3">Verification Status</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Verified Alumni</span>
                        <span className="font-medium">877 (88%)</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Pending Verification</span>
                        <span className="font-medium">123 (12%)</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Geographic Distribution</CardTitle>
                  <CardDescription>User locations worldwide</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { location: "United States", count: 1245, percentage: 44 },
                    { location: "India", count: 567, percentage: 20 },
                    { location: "Canada", count: 234, percentage: 8 },
                    { location: "United Kingdom", count: 189, percentage: 7 },
                    { location: "Germany", count: 156, percentage: 5 },
                    { location: "Others", count: 456, percentage: 16 },
                  ].map((location) => (
                    <div key={location.location} className="flex items-center justify-between">
                      <span className="text-sm">{location.location}</span>
                      <div className="text-right">
                        <p className="text-sm font-medium">{location.count}</p>
                        <p className="text-xs text-muted-foreground">{location.percentage}%</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="engagement" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Engagement Metrics
                </CardTitle>
                <CardDescription>Platform activity and user participation rates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {engagementMetrics.map((metric, index) => (
                    <div key={metric.category} className="space-y-3">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium text-sm">{metric.category}</h4>
                        <span className="text-sm font-bold">{metric.value}%</span>
                      </div>
                      <Progress value={metric.value} className="h-2" />
                      <p className="text-xs text-muted-foreground">{metric.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Key Trends
                </CardTitle>
                <CardDescription>Recent platform performance indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {recentTrends.map((trend, index) => (
                    <div key={trend.metric} className="p-4 rounded-lg border">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-sm">{trend.metric}</h4>
                        <Badge
                          variant={trend.trend === "up" ? "default" : trend.trend === "down" ? "secondary" : "outline"}
                          className="text-xs"
                        >
                          {trend.value}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{trend.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
