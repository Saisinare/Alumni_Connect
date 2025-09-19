"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  Star,
  Search,
  Filter,
  Plus,
  CheckCircle,
  XCircle,
  Award,
  ExternalLink,
  Bookmark,
  Share2,
  Video,
  Mic,
  Camera,
  Globe,
  Building,
  GraduationCap,
  TrendingUp,
  Heart,
  MessageCircle,
  ChevronRight,
  CalendarDays,
  Clock3,
  UserCheck,
  Play,
  Pause,
  Volume2,
  Trophy,
} from "lucide-react"
import { format, isAfter, isBefore, addDays } from "date-fns"

export default function StudentEventsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [bookmarkedEvents, setBookmarkedEvents] = useState(new Set())

  const events = [
    {
      id: 1,
      title: "Tech Career Fair 2024",
      description: "Connect with top tech companies and discover exciting career opportunities. Meet recruiters from Google, Microsoft, Apple, and more!",
      date: "2024-01-20",
      time: "10:00 AM - 4:00 PM",
      location: "University Campus - Main Hall",
      category: "Career",
      type: "In-Person",
      capacity: 500,
      registered: 342,
      organizer: "Career Services",
      organizerAvatar: "/placeholder-logo.png",
      image: "/startup-pitch-competition-business.jpg",
      status: "upcoming",
      isLive: false,
      tags: ["Career", "Networking", "Recruitment"],
      price: "Free",
      requirements: "Student ID required",
      speakers: [
        { name: "Sarah Johnson", role: "Google", avatar: "/professional-woman-developer.png" },
        { name: "Michael Chen", role: "Microsoft", avatar: "/professional-engineer.png" },
      ],
    },
    {
      id: 2,
      title: "AI & Machine Learning Workshop",
      description: "Hands-on workshop covering the latest trends in AI and ML. Learn practical applications and build your first ML model.",
      date: "2024-01-18",
      time: "2:00 PM - 5:00 PM",
      location: "Virtual Event",
      category: "Workshop",
      type: "Virtual",
      capacity: 100,
      registered: 89,
      organizer: "Computer Science Department",
      organizerAvatar: "/placeholder-logo.png",
      image: "/professional-data-scientist.png",
      status: "upcoming",
      isLive: false,
      tags: ["AI", "Machine Learning", "Workshop"],
      price: "$25",
      requirements: "Laptop required",
      speakers: [
        { name: "Dr. Emily Rodriguez", role: "AI Research Lead", avatar: "/professional-woman-diverse.png" },
      ],
    },
    {
      id: 3,
      title: "Alumni Networking Mixer",
      description: "Connect with successful alumni from various industries. Perfect opportunity to build your professional network and get career advice.",
      date: "2024-01-15",
      time: "6:00 PM - 9:00 PM",
      location: "Downtown Conference Center",
      category: "Networking",
      type: "In-Person",
      capacity: 200,
      registered: 156,
      organizer: "Alumni Association",
      organizerAvatar: "/placeholder-logo.png",
      image: "/diverse-student-profiles.png",
      status: "ongoing",
      isLive: true,
      tags: ["Networking", "Alumni", "Career"],
      price: "Free",
      requirements: "Business casual attire",
      speakers: [
        { name: "David Kim", role: "Netflix", avatar: "/professional-man.png" },
        { name: "Lisa Wang", role: "Startup Founder", avatar: "/professional-woman-designer.png" },
      ],
    },
    {
      id: 4,
      title: "Startup Pitch Competition",
      description: "Watch student teams pitch their innovative startup ideas to a panel of industry experts and investors.",
      date: "2024-01-12",
      time: "1:00 PM - 5:00 PM",
      location: "Business School Auditorium",
      category: "Competition",
      type: "In-Person",
      capacity: 300,
      registered: 278,
      organizer: "Entrepreneurship Club",
      organizerAvatar: "/placeholder-logo.png",
      image: "/startup-pitch-competition-business.jpg",
      status: "completed",
      isLive: false,
      tags: ["Startup", "Pitch", "Competition"],
      price: "Free",
      requirements: "Registration required",
      speakers: [
        { name: "John Smith", role: "VC Partner", avatar: "/professional-man.png" },
        { name: "Maria Garcia", role: "Startup Advisor", avatar: "/professional-woman-diverse.png" },
      ],
    },
    {
      id: 5,
      title: "Web Development Bootcamp",
      description: "Intensive 3-day bootcamp covering modern web development technologies including React, Node.js, and cloud deployment.",
      date: "2024-01-25",
      time: "9:00 AM - 6:00 PM",
      location: "Computer Lab 101",
      category: "Workshop",
      type: "In-Person",
      capacity: 50,
      registered: 45,
      organizer: "Coding Bootcamp",
      organizerAvatar: "/placeholder-logo.png",
      image: "/professional-woman-developer.png",
      status: "upcoming",
      isLive: false,
      tags: ["Web Development", "React", "Node.js"],
      price: "$150",
      requirements: "Basic programming knowledge",
      speakers: [
        { name: "Alex Kumar", role: "Senior Developer", avatar: "/professional-engineer.png" },
      ],
    },
  ]

  const myEvents = events.filter((event) => 
    event.registered > 0 && (event.status === "upcoming" || event.status === "ongoing")
  )

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.organizer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = filterCategory === "all" || event.category === filterCategory
    const matchesStatus = filterStatus === "all" || event.status === filterStatus
    return matchesSearch && matchesCategory && matchesStatus
  })

  const handleBookmark = (eventId) => {
    const newBookmarked = new Set(bookmarkedEvents)
    if (newBookmarked.has(eventId)) {
      newBookmarked.delete(eventId)
    } else {
      newBookmarked.add(eventId)
    }
    setBookmarkedEvents(newBookmarked)
  }

  const getStatusBadge = (status, isLive) => {
    if (isLive) {
      return (
        <Badge className="bg-red-500 text-white animate-pulse">
          <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse" />
          Live Now
        </Badge>
      )
    }
    
    switch (status) {
      case "upcoming":
        return <Badge className="bg-blue-500 text-white">Upcoming</Badge>
      case "ongoing":
        return <Badge className="bg-green-500 text-white">Ongoing</Badge>
      case "completed":
        return <Badge className="bg-gray-500 text-white">Completed</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getCategoryIcon = (category) => {
    switch (category) {
      case "Career":
        return <Building className="w-4 h-4" />
      case "Workshop":
        return <Award className="w-4 h-4" />
      case "Networking":
        return <Users className="w-4 h-4" />
      case "Competition":
        return <Trophy className="w-4 h-4" />
      default:
        return <Calendar className="w-4 h-4" />
    }
  }

  return (
    <DashboardLayout userRole="student" title="Events">
      <div className="space-y-8">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Discover Events</h1>
              <p className="text-purple-100 text-lg">
                Join workshops, networking events, and career fairs to grow your skills and network
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{events.length}</div>
              <div className="text-purple-100">Total Events</div>
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
                  placeholder="Search events by title, description, or organizer..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Career">Career</SelectItem>
                  <SelectItem value="Workshop">Workshop</SelectItem>
                  <SelectItem value="Networking">Networking</SelectItem>
                  <SelectItem value="Competition">Competition</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="ongoing">Ongoing</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All Events</TabsTrigger>
            <TabsTrigger value="my-events">My Events</TabsTrigger>
            <TabsTrigger value="bookmarked">Bookmarked</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <Card key={event.id} className="hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-purple-50/30 hover:from-purple-50/50 hover:to-pink-50/30 overflow-hidden">
                  <div className="relative">
                    <div className="h-48 bg-gradient-to-br from-purple-500 to-pink-500 relative overflow-hidden">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover opacity-80"
                      />
                      <div className="absolute top-4 right-4 flex gap-2">
                        {getStatusBadge(event.status, event.isLive)}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 bg-white/20 hover:bg-white/30 text-white"
                          onClick={() => handleBookmark(event.id)}
                        >
                          <Bookmark className={`w-4 h-4 ${bookmarkedEvents.has(event.id) ? 'fill-current' : ''}`} />
                        </Button>
                      </div>
                      {event.isLive && (
                        <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                          Live
                        </div>
                      )}
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          {getCategoryIcon(event.category)}
                          <Badge variant="outline" className="text-xs">
                            {event.category}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-green-600">{event.price}</div>
                          <div className="text-xs text-muted-foreground">{event.type}</div>
                        </div>
                      </div>

                      <h3 className="font-bold text-lg mb-2 line-clamp-2">{event.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{event.description}</p>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          <span>{format(new Date(event.date), "MMM dd, yyyy")}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          <span className="truncate">{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Users className="w-4 h-4" />
                          <span>{event.registered}/{event.capacity} registered</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {event.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Avatar className="w-6 h-6">
                            <AvatarImage src={event.organizerAvatar} />
                            <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-600 text-white text-xs">
                              {event.organizer.split(" ").map((n) => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-xs text-muted-foreground">{event.organizer}</span>
                        </div>
                        <Button
                          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-sm"
                          disabled={event.status === "completed"}
                        >
                          {event.status === "completed" ? "Completed" : "Register"}
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="my-events" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myEvents.map((event) => (
                <Card key={event.id} className="hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-green-50/30 hover:from-green-50/50 hover:to-blue-50/30 overflow-hidden">
                  <div className="relative">
                    <div className="h-48 bg-gradient-to-br from-green-500 to-blue-500 relative overflow-hidden">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover opacity-80"
                      />
                      <div className="absolute top-4 right-4">
                        {getStatusBadge(event.status, event.isLive)}
                      </div>
                      {event.isLive && (
                        <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                          Live
                        </div>
                      )}
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          {getCategoryIcon(event.category)}
                          <Badge variant="outline" className="text-xs">
                            {event.category}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-green-600">{event.price}</div>
                          <div className="text-xs text-muted-foreground">{event.type}</div>
                        </div>
                      </div>

                      <h3 className="font-bold text-lg mb-2 line-clamp-2">{event.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{event.description}</p>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          <span>{format(new Date(event.date), "MMM dd, yyyy")}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          <span className="truncate">{event.location}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm font-medium text-green-600">Registered</span>
                        </div>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="bookmarked" className="space-y-6">
            <div className="text-center py-12">
              <Bookmark className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No bookmarked events yet</h3>
              <p className="text-muted-foreground">
                Bookmark events you're interested in to see them here
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
