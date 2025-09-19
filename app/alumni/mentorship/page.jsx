"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, CheckCircle, XCircle, Calendar, MessageSquare, User, Star, Award } from "lucide-react"

export default function MentorshipPage() {
  const [selectedRequest, setSelectedRequest] = useState(null)

  const pendingRequests = [
    {
      id: 1,
      student: "Alex Kumar",
      topic: "Software Engineering Career Path",
      message:
        "Hi Sarah! I'm a final year CS student interested in learning about your journey at Google. I'd love to understand how you prepared for technical interviews, what the day-to-day work is like, and any advice you have for someone starting their career in software engineering. I'm particularly interested in machine learning applications.",
      timeAgo: "2 hours ago",
      avatar: "/student-alex.png",
      year: "2024",
      skills: ["JavaScript", "Python", "React", "Machine Learning"],
      gpa: "3.8",
      projects: 5,
    },
    {
      id: 2,
      student: "Priya Sharma",
      topic: "Product Management Transition",
      message:
        "Hello! I'm currently working as a software engineer but I'm very interested in transitioning to product management. I've heard about your successful transition and would love to learn about your experience. What skills should I develop? How did you make the switch? Any courses or resources you'd recommend?",
      timeAgo: "5 hours ago",
      avatar: "/student-priya.png",
      year: "2025",
      skills: ["React", "Data Analysis", "SQL", "Python"],
      gpa: "3.9",
      projects: 8,
    },
    {
      id: 3,
      student: "David Park",
      topic: "Machine Learning Projects",
      message:
        "Hi! I'm working on building a strong portfolio for ML engineer positions. Could you guide me on what types of projects would be most impressive to recruiters? I'm also curious about the technical interview process for ML roles at top tech companies.",
      timeAgo: "1 day ago",
      avatar: "/student-david.png",
      year: "2024",
      skills: ["Python", "TensorFlow", "PyTorch", "Statistics"],
      gpa: "3.7",
      projects: 6,
    },
  ]

  const activeConnections = [
    {
      id: 1,
      student: "Lisa Wang",
      topic: "iOS Development Career",
      startDate: "Nov 15, 2024",
      sessionsCompleted: 3,
      nextSession: "Dec 22, 2024",
      avatar: "/student-lisa.png",
      progress: 60,
    },
    {
      id: 2,
      student: "James Thompson",
      topic: "System Design Preparation",
      startDate: "Oct 28, 2024",
      sessionsCompleted: 5,
      nextSession: "Dec 20, 2024",
      avatar: "/student-james.png",
      progress: 80,
    },
  ]

  const completedMentorships = [
    {
      id: 1,
      student: "Maria Garcia",
      topic: "Full Stack Development",
      duration: "3 months",
      outcome: "Landed job at Stripe",
      rating: 5,
      feedback: "Sarah was an incredible mentor! Her guidance helped me land my dream job.",
      avatar: "/student-maria.png",
    },
    {
      id: 2,
      student: "Kevin Chen",
      topic: "Technical Interview Prep",
      duration: "2 months",
      outcome: "Joined Microsoft",
      rating: 5,
      feedback: "Excellent mentorship. The mock interviews were extremely helpful.",
      avatar: "/student-kevin.png",
    },
  ]

  const handleRequestAction = (requestId, action) => {
    // Handle accept/decline logic here
    console.log(`${action} request ${requestId}`)
    // In a real app, this would make an API call
    if (action === "accept") {
      // Move to active mentorships
      console.log(`Moving request ${requestId} to active mentorships`)
    } else if (action === "decline") {
      // Remove from pending requests
      console.log(`Removing request ${requestId} from pending`)
    }
  }

  return (
    <DashboardLayout userRole="alumni" title="Mentorship">
      <div className="space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-semibold">{pendingRequests.length}</div>
                  <div className="text-sm text-muted-foreground">Pending Requests</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <User className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <div className="text-2xl font-semibold">{activeConnections.length}</div>
                  <div className="text-sm text-muted-foreground">Active Mentorships</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <div className="text-2xl font-semibold">{completedMentorships.length}</div>
                  <div className="text-sm text-muted-foreground">Completed</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <Star className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <div className="text-2xl font-semibold">4.9</div>
                  <div className="text-sm text-muted-foreground">Average Rating</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Mentorship Tabs */}
        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="pending">Pending Requests</TabsTrigger>
            <TabsTrigger value="active">Active Mentorships</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4">
            {pendingRequests.map((request) => (
              <Card key={request.id}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={request.avatar || "/placeholder.svg"} alt={request.student} />
                      <AvatarFallback>
                        {request.student
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-lg">{request.student}</h3>
                          <p className="text-sm text-muted-foreground">Class of {request.year}</p>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          {request.timeAgo}
                        </div>
                      </div>

                      <div className="mb-3">
                        <h4 className="font-medium text-primary mb-1">{request.topic}</h4>
                        <p className="text-sm text-muted-foreground text-pretty">{request.message}</p>
                      </div>

                      <div className="flex items-center gap-6 mb-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Award className="w-4 h-4 text-muted-foreground" />
                          <span>GPA: {request.gpa}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="w-4 h-4 text-muted-foreground" />
                          <span>{request.projects} projects</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {request.skills.map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex gap-3">
                        <Button onClick={() => handleRequestAction(request.id, "accept")} className="flex-1">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Accept Request
                        </Button>
                        <Button
                          onClick={() => handleRequestAction(request.id, "decline")}
                          variant="outline"
                          className="flex-1 bg-transparent"
                        >
                          <XCircle className="w-4 h-4 mr-1" />
                          Decline
                        </Button>
                        <Button variant="ghost" size="sm">
                          View Profile
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="active" className="space-y-4">
            {activeConnections.map((connection) => (
              <Card key={connection.id}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={connection.avatar || "/placeholder.svg"} alt={connection.student} />
                      <AvatarFallback>
                        {connection.student
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-lg">{connection.student}</h3>
                          <p className="text-sm text-primary font-medium">{connection.topic}</p>
                        </div>
                        <Badge variant="secondary">Active</Badge>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                        <div>
                          <div className="text-muted-foreground">Started</div>
                          <div className="font-medium">{connection.startDate}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Sessions</div>
                          <div className="font-medium">{connection.sessionsCompleted}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Next Session</div>
                          <div className="font-medium">{connection.nextSession}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Progress</div>
                          <div className="font-medium">{connection.progress}%</div>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Button size="sm">
                          <Calendar className="w-4 h-4 mr-1" />
                          Schedule Session
                        </Button>
                        <Button size="sm" variant="outline" className="bg-transparent">
                          <MessageSquare className="w-4 h-4 mr-1" />
                          Message
                        </Button>
                        <Button size="sm" variant="ghost">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {completedMentorships.map((mentorship) => (
              <Card key={mentorship.id}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={mentorship.avatar || "/placeholder.svg"} alt={mentorship.student} />
                      <AvatarFallback>
                        {mentorship.student
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-lg">{mentorship.student}</h3>
                          <p className="text-sm text-primary font-medium">{mentorship.topic}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(mentorship.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                        <div>
                          <div className="text-muted-foreground">Duration</div>
                          <div className="font-medium">{mentorship.duration}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Outcome</div>
                          <div className="font-medium text-green-600">{mentorship.outcome}</div>
                        </div>
                      </div>

                      <div className="bg-muted/50 p-3 rounded-lg mb-3">
                        <p className="text-sm text-pretty">"{mentorship.feedback}"</p>
                      </div>

                      <Button size="sm" variant="outline" className="bg-transparent">
                        View Full Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
