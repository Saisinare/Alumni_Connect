"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Users,
  Star,
  MessageCircle,
  Video,
  Phone,
  Mail,
  Search,
  Filter,
  Plus,
  CheckCircle,
  XCircle,
  Award,
  BookOpen,
  Target,
  TrendingUp,
  UserCheck,
  CalendarDays,
  ChevronRight,
  ExternalLink,
} from "lucide-react"
import { format } from "date-fns"

export default function StudentMentorshipPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterSkill, setFilterSkill] = useState("all")
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [showBookingDialog, setShowBookingDialog] = useState(false)
  const [selectedMentor, setSelectedMentor] = useState(null)

  const mentors = [
    {
      id: 1,
      name: "Sarah Johnson",
      company: "Google",
      role: "Senior Software Engineer",
      avatar: "/professional-woman-developer.png",
      skills: ["React", "Node.js", "System Design", "Leadership"],
      experience: "8 years",
      rating: 4.9,
      sessionsCompleted: 127,
      bio: "Passionate about mentoring the next generation of developers. I specialize in frontend technologies and system design.",
      availability: ["Monday", "Wednesday", "Friday"],
      timeSlots: ["9:00 AM", "2:00 PM", "4:00 PM"],
      price: "$50/hour",
      isAvailable: true,
    },
    {
      id: 2,
      name: "Michael Chen",
      company: "Microsoft",
      role: "Principal Engineer",
      avatar: "/professional-engineer.png",
      skills: ["Python", "Machine Learning", "Data Science", "AI"],
      experience: "12 years",
      rating: 4.8,
      sessionsCompleted: 89,
      bio: "Data science expert with experience in building ML models at scale. Love helping students understand complex concepts.",
      availability: ["Tuesday", "Thursday", "Saturday"],
      timeSlots: ["10:00 AM", "3:00 PM", "5:00 PM"],
      price: "$75/hour",
      isAvailable: true,
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      company: "Apple",
      role: "Product Manager",
      avatar: "/professional-woman-diverse.png",
      skills: ["Product Strategy", "User Research", "Agile", "Leadership"],
      experience: "6 years",
      rating: 4.7,
      sessionsCompleted: 156,
      bio: "Product management expert focused on user-centric design and strategic thinking.",
      availability: ["Monday", "Tuesday", "Thursday"],
      timeSlots: ["11:00 AM", "1:00 PM", "6:00 PM"],
      price: "$60/hour",
      isAvailable: false,
    },
    {
      id: 4,
      name: "David Kim",
      company: "Netflix",
      role: "Staff Engineer",
      avatar: "/professional-man.png",
      skills: ["Java", "Microservices", "Cloud Architecture", "DevOps"],
      experience: "10 years",
      rating: 4.9,
      sessionsCompleted: 203,
      bio: "Backend systems expert with deep knowledge of distributed systems and cloud technologies.",
      availability: ["Wednesday", "Friday", "Sunday"],
      timeSlots: ["9:00 AM", "1:00 PM", "4:00 PM"],
      price: "$80/hour",
      isAvailable: true,
    },
  ]

  const upcomingSessions = [
    {
      id: 1,
      mentor: "Sarah Johnson",
      mentorAvatar: "/professional-woman-developer.png",
      topic: "React Best Practices",
      date: "2024-01-15",
      time: "2:00 PM - 3:00 PM",
      type: "Video Call",
      status: "confirmed",
    },
    {
      id: 2,
      mentor: "Michael Chen",
      mentorAvatar: "/professional-engineer.png",
      topic: "Machine Learning Fundamentals",
      date: "2024-01-18",
      time: "10:00 AM - 11:00 AM",
      type: "Phone Call",
      status: "pending",
    },
  ]

  const completedSessions = [
    {
      id: 1,
      mentor: "David Kim",
      mentorAvatar: "/professional-man.png",
      topic: "System Design Interview Prep",
      date: "2024-01-10",
      rating: 5,
      feedback: "Excellent session! David provided great insights on designing scalable systems.",
    },
    {
      id: 2,
      mentor: "Emily Rodriguez",
      mentorAvatar: "/professional-woman-diverse.png",
      topic: "Product Management Career Path",
      date: "2024-01-08",
      rating: 4,
      feedback: "Very helpful discussion about transitioning into product management.",
    },
  ]

  const filteredMentors = mentors.filter((mentor) => {
    const matchesSearch =
      mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesSkill = filterSkill === "all" || mentor.skills.includes(filterSkill)
    return matchesSearch && matchesSkill
  })

  const handleBookSession = (mentor) => {
    setSelectedMentor(mentor)
    setShowBookingDialog(true)
  }

  return (
    <DashboardLayout userRole="student" title="Mentorship">
      <div className="space-y-8">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Find Your Mentor</h1>
              <p className="text-blue-100 text-lg">
                Connect with experienced alumni for personalized guidance and career advice
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{mentors.length}</div>
              <div className="text-blue-100">Available Mentors</div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <Card className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search mentors by name, company, or skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="w-full md:w-48">
              <Select value={filterSkill} onValueChange={setFilterSkill}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by skill" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Skills</SelectItem>
                  <SelectItem value="React">React</SelectItem>
                  <SelectItem value="Python">Python</SelectItem>
                  <SelectItem value="System Design">System Design</SelectItem>
                  <SelectItem value="Machine Learning">Machine Learning</SelectItem>
                  <SelectItem value="Product Strategy">Product Strategy</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Mentors List */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Available Mentors</h2>
              <Badge variant="outline" className="text-sm">
                {filteredMentors.length} mentors found
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredMentors.map((mentor) => (
                <Card key={mentor.id} className="hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-blue-50/30 hover:from-blue-50/50 hover:to-purple-50/30">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <Avatar className="w-16 h-16 ring-2 ring-blue-100">
                        <AvatarImage src={mentor.avatar} />
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-lg font-bold">
                          {mentor.name.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-bold text-lg">{mentor.name}</h3>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="text-sm font-medium">{mentor.rating}</span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{mentor.role}</p>
                        <p className="text-sm font-medium text-blue-600">{mentor.company}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline" className="text-xs">
                            {mentor.experience} exp
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {mentor.sessionsCompleted} sessions
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {mentor.bio}
                    </p>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {mentor.skills.slice(0, 3).map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {mentor.skills.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{mentor.skills.length - 3} more
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        <div className="font-medium text-green-600">{mentor.price}</div>
                        <div className="text-muted-foreground">
                          Available: {mentor.availability.join(", ")}
                        </div>
                      </div>
                      <Button
                        onClick={() => handleBookSession(mentor)}
                        disabled={!mentor.isAvailable}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                      >
                        {mentor.isAvailable ? "Book Session" : "Unavailable"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar - Calendar and Sessions */}
          <div className="space-y-6">
            {/* Calendar */}
            <Card className="p-6">
              <CardHeader className="p-0 mb-4">
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <CalendarDays className="w-5 h-5" />
                  Schedule Session
                </CardTitle>
              </CardHeader>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border-0"
              />
            </Card>

            {/* Upcoming Sessions */}
            <Card className="p-6">
              <CardHeader className="p-0 mb-4">
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Upcoming Sessions
                </CardTitle>
              </CardHeader>
              <div className="space-y-3">
                {upcomingSessions.map((session) => (
                  <div key={session.id} className="flex items-center gap-3 p-3 rounded-lg bg-blue-50/50">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={session.mentorAvatar} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-sm">
                        {session.mentor.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="font-medium text-sm">{session.mentor}</div>
                      <div className="text-xs text-muted-foreground">{session.topic}</div>
                      <div className="text-xs text-muted-foreground">{session.date} • {session.time}</div>
                    </div>
                    <Badge variant={session.status === "confirmed" ? "default" : "secondary"}>
                      {session.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>

            {/* Completed Sessions */}
            <Card className="p-6">
              <CardHeader className="p-0 mb-4">
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Recent Sessions
                </CardTitle>
              </CardHeader>
              <div className="space-y-3">
                {completedSessions.map((session) => (
                  <div key={session.id} className="flex items-center gap-3 p-3 rounded-lg bg-green-50/50">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={session.mentorAvatar} />
                      <AvatarFallback className="bg-gradient-to-br from-green-500 to-blue-600 text-white text-sm">
                        {session.mentor.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="font-medium text-sm">{session.mentor}</div>
                      <div className="text-xs text-muted-foreground">{session.topic}</div>
                      <div className="text-xs text-muted-foreground">{session.date}</div>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < session.rating ? "text-yellow-500 fill-current" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Booking Dialog */}
        <Dialog open={showBookingDialog} onOpenChange={setShowBookingDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">
                Book Session with {selectedMentor?.name}
              </DialogTitle>
            </DialogHeader>
            {selectedMentor && (
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 bg-blue-50/50 rounded-lg">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={selectedMentor.avatar} />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-lg font-bold">
                      {selectedMentor.name.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-bold text-lg">{selectedMentor.name}</h3>
                    <p className="text-muted-foreground">{selectedMentor.role} at {selectedMentor.company}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{selectedMentor.rating}</span>
                      <span className="text-sm text-muted-foreground">({selectedMentor.sessionsCompleted} sessions)</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="topic">Session Topic</Label>
                    <Input id="topic" placeholder="e.g., React Best Practices" />
                  </div>
                  <div>
                    <Label htmlFor="duration">Duration</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="60">1 hour</SelectItem>
                        <SelectItem value="90">1.5 hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="preferred-time">Preferred Time</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time slot" />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedMentor.timeSlots.map((slot) => (
                        <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="session-type">Session Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select session type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="video">Video Call</SelectItem>
                      <SelectItem value="phone">Phone Call</SelectItem>
                      <SelectItem value="in-person">In-Person (if available)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="message">Message to Mentor (Optional)</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell your mentor what you'd like to discuss..."
                    rows={3}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-green-50/50 rounded-lg">
                  <div>
                    <div className="font-medium">Session Cost</div>
                    <div className="text-2xl font-bold text-green-600">{selectedMentor.price}</div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setShowBookingDialog(false)}>
                      Cancel
                    </Button>
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                      Book Session
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}
