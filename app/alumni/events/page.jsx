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
  Search,
  Filter,
  Calendar,
  Clock,
  MapPin,
  Users,
  ExternalLink,
  Star,
  Bookmark,
  Share2,
  MoreHorizontal,
  Play,
  Pause,
  CheckCircle,
  AlertCircle,
  Info,
  Trophy,
  Award,
  GraduationCap,
  Building2,
  Globe,
  Video,
  Mic,
  Camera,
  Coffee,
  Utensils,
  Wifi,
  Car,
  Plane,
  Train,
  Bus,
  Hotel,
  Home,
  Office,
  School,
  Heart,
  ThumbsUp,
  MessageCircle,
  Eye,
  Download,
  Upload,
  RefreshCw,
} from "lucide-react"

export default function AlumniEventsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterType, setFilterType] = useState("all")
  const [selectedTab, setSelectedTab] = useState("upcoming")

  const events = [
    {
      id: 1,
      title: "Annual Alumni Reunion 2024",
      description: "Join us for our biggest event of the year! Reconnect with old friends, network with fellow alumni, and celebrate our shared experiences. We'll have food, drinks, entertainment, and special guest speakers.",
      type: "reunion",
      status: "upcoming",
      date: "2024-03-15",
      time: "18:00",
      duration: "4 hours",
      location: "Grand Ballroom, Downtown Hotel",
      address: "123 Main Street, San Francisco, CA 94105",
      capacity: 200,
      registered: 156,
      price: 0,
      organizer: "Alumni Association",
      organizerAvatar: "/alumni-association.png",
      tags: ["Networking", "Social", "Reunion"],
      requirements: ["Alumni ID", "RSVP Required"],
      amenities: ["Food", "Drinks", "Parking", "WiFi"],
      image: "/event-reunion.jpg",
      isBookmarked: false,
      isRegistered: false,
      speakers: [
        { name: "Dr. Sarah Johnson", title: "Dean of Engineering", company: "University" },
        { name: "Mike Chen", title: "CTO", company: "TechCorp" },
      ],
      agenda: [
        { time: "18:00", activity: "Registration & Welcome Reception" },
        { time: "18:30", activity: "Keynote Speech by Dr. Sarah Johnson" },
        { time: "19:00", activity: "Networking & Dinner" },
        { time: "20:30", activity: "Alumni Awards Ceremony" },
        { time: "21:00", activity: "Dancing & Socializing" },
      ],
    },
    {
      id: 2,
      title: "Tech Industry Trends Webinar",
      description: "Join industry experts as they discuss the latest trends in technology, including AI, machine learning, and cloud computing. Perfect for staying updated with current industry developments.",
      type: "webinar",
      status: "upcoming",
      date: "2024-02-20",
      time: "14:00",
      duration: "1.5 hours",
      location: "Online",
      address: "Zoom Meeting",
      capacity: 500,
      registered: 234,
      price: 0,
      organizer: "Tech Alumni Network",
      organizerAvatar: "/tech-alumni.png",
      tags: ["Technology", "Learning", "Webinar"],
      requirements: ["Internet Connection", "Zoom Account"],
      amenities: ["Recording Available", "Q&A Session"],
      image: "/event-webinar.jpg",
      isBookmarked: true,
      isRegistered: true,
      speakers: [
        { name: "Alex Rodriguez", title: "VP of Engineering", company: "Google" },
        { name: "Lisa Wang", title: "AI Research Lead", company: "Microsoft" },
      ],
      agenda: [
        { time: "14:00", activity: "Welcome & Introduction" },
        { time: "14:15", activity: "AI Trends by Alex Rodriguez" },
        { time: "14:45", activity: "Machine Learning Applications by Lisa Wang" },
        { time: "15:15", activity: "Q&A Session" },
        { time: "15:30", activity: "Closing Remarks" },
      ],
    },
    {
      id: 3,
      title: "Career Development Workshop",
      description: "Enhance your professional skills with our comprehensive career development workshop. Topics include resume building, interview preparation, and networking strategies.",
      type: "workshop",
      status: "upcoming",
      date: "2024-02-28",
      time: "10:00",
      duration: "3 hours",
      location: "Career Services Center",
      address: "456 University Ave, San Francisco, CA 94102",
      capacity: 50,
      registered: 42,
      price: 25,
      organizer: "Career Services",
      organizerAvatar: "/career-services.png",
      tags: ["Career", "Workshop", "Professional Development"],
      requirements: ["Laptop", "Notebook"],
      amenities: ["Materials Provided", "Coffee Break", "Parking"],
      image: "/event-workshop.jpg",
      isBookmarked: false,
      isRegistered: false,
      speakers: [
        { name: "Jennifer Martinez", title: "Career Counselor", company: "University" },
        { name: "David Kim", title: "HR Director", company: "TechStart" },
      ],
      agenda: [
        { time: "10:00", activity: "Welcome & Introductions" },
        { time: "10:30", activity: "Resume Building Session" },
        { time: "11:30", activity: "Interview Preparation" },
        { time: "12:30", activity: "Lunch Break" },
        { time: "13:00", activity: "Networking Strategies" },
        { time: "13:30", activity: "Q&A & Wrap-up" },
      ],
    },
    {
      id: 4,
      title: "Alumni Mentorship Program Launch",
      description: "Join us for the official launch of our new mentorship program. Learn how you can mentor current students and make a difference in their academic and professional journey.",
      type: "meeting",
      status: "ongoing",
      date: "2024-01-25",
      time: "16:00",
      duration: "2 hours",
      location: "Alumni Center",
      address: "789 Alumni Way, San Francisco, CA 94103",
      capacity: 100,
      registered: 78,
      price: 0,
      organizer: "Alumni Relations",
      organizerAvatar: "/alumni-relations.png",
      tags: ["Mentorship", "Students", "Volunteer"],
      requirements: ["Alumni ID"],
      amenities: ["Refreshments", "Materials", "Parking"],
      image: "/event-mentorship.jpg",
      isBookmarked: true,
      isRegistered: true,
      speakers: [
        { name: "Dr. Robert Chen", title: "Director of Alumni Relations", company: "University" },
        { name: "Emily Johnson", title: "Mentorship Coordinator", company: "Alumni Association" },
      ],
      agenda: [
        { time: "16:00", activity: "Program Overview" },
        { time: "16:30", activity: "Mentor Training Session" },
        { time: "17:00", activity: "Student Matching Process" },
        { time: "17:30", activity: "Q&A & Networking" },
      ],
    },
    {
      id: 5,
      title: "Startup Pitch Competition",
      description: "Watch alumni entrepreneurs pitch their innovative startup ideas to a panel of industry experts. Great opportunity to network with fellow entrepreneurs and investors.",
      type: "competition",
      status: "completed",
      date: "2024-01-15",
      time: "19:00",
      duration: "3 hours",
      location: "Innovation Hub",
      address: "321 Innovation Drive, San Francisco, CA 94104",
      capacity: 150,
      registered: 150,
      price: 15,
      organizer: "Entrepreneurship Club",
      organizerAvatar: "/entrepreneurship-club.png",
      tags: ["Entrepreneurship", "Startups", "Competition"],
      requirements: ["Ticket Required"],
      amenities: ["Food", "Drinks", "Networking"],
      image: "/event-pitch.jpg",
      isBookmarked: false,
      isRegistered: false,
      speakers: [
        { name: "Sarah Chen", title: "CEO", company: "TechStart" },
        { name: "Michael Rodriguez", title: "Venture Partner", company: "VC Firm" },
      ],
      agenda: [
        { time: "19:00", activity: "Welcome & Introduction" },
        { time: "19:15", activity: "Pitch Presentations" },
        { time: "20:30", activity: "Judges Deliberation" },
        { time: "21:00", activity: "Awards Ceremony" },
        { time: "21:30", activity: "Networking Reception" },
      ],
    },
  ]

  const handleBookmark = (eventId) => {
    console.log("Bookmarking event:", eventId)
    alert("Event bookmarked!")
  }

  const handleRegister = (eventId) => {
    console.log("Registering for event:", eventId)
    alert("Successfully registered for event!")
  }

  const handleUnregister = (eventId) => {
    console.log("Unregistering from event:", eventId)
    alert("Successfully unregistered from event!")
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "upcoming":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-200">
            <Clock className="w-3 h-3 mr-1" />
            Upcoming
          </Badge>
        )
      case "ongoing":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
            <Play className="w-3 h-3 mr-1" />
            Ongoing
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="bg-gray-100 text-gray-700 border-gray-200">
            <CheckCircle className="w-3 h-3 mr-1" />
            Completed
          </Badge>
        )
      default:
        return null
    }
  }

  const getTypeBadge = (type) => {
    switch (type) {
      case "reunion":
        return (
          <Badge variant="secondary" className="bg-purple-100 text-purple-700">
            <Users className="w-3 h-3 mr-1" />
            Reunion
          </Badge>
        )
      case "webinar":
        return (
          <Badge variant="secondary" className="bg-blue-100 text-blue-700">
            <Video className="w-3 h-3 mr-1" />
            Webinar
          </Badge>
        )
      case "workshop":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-700">
            <GraduationCap className="w-3 h-3 mr-1" />
            Workshop
          </Badge>
        )
      case "meeting":
        return (
          <Badge variant="secondary" className="bg-orange-100 text-orange-700">
            <Building2 className="w-3 h-3 mr-1" />
            Meeting
          </Badge>
        )
      case "competition":
        return (
          <Badge variant="secondary" className="bg-red-100 text-red-700">
            <Trophy className="w-3 h-3 mr-1" />
            Competition
          </Badge>
        )
      default:
        return null
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(":")
    const date = new Date()
    date.setHours(parseInt(hours), parseInt(minutes))
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.organizer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesStatus = filterStatus === "all" || event.status === filterStatus
    const matchesType = filterType === "all" || event.type === filterType
    
    return matchesSearch && matchesStatus && matchesType
  })

  const upcomingEvents = filteredEvents.filter(event => event.status === "upcoming")
  const ongoingEvents = filteredEvents.filter(event => event.status === "ongoing")
  const completedEvents = filteredEvents.filter(event => event.status === "completed")

  const renderEventCard = (event) => (
    <Card key={event.id} className="hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-cyan-50/30 hover:from-cyan-50/50 hover:to-blue-50/30">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              {getStatusBadge(event.status)}
              {getTypeBadge(event.type)}
            </div>
            <h3 className="font-bold text-xl mb-2">{event.title}</h3>
            <p className="text-muted-foreground mb-4 line-clamp-2 leading-relaxed">{event.description}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              size="sm" 
              variant="ghost" 
              className="h-8 w-8 p-0 hover:bg-yellow-50"
              onClick={() => handleBookmark(event.id)}
            >
              <Bookmark className={`w-4 h-4 ${event.isBookmarked ? "text-yellow-500 fill-current" : "text-gray-400"}`} />
            </Button>
            <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-gray-50">
              <Share2 className="w-4 h-4 text-gray-400" />
            </Button>
          </div>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span className="font-medium">{formatDate(event.date)}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>{formatTime(event.time)} • {event.duration}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="w-4 h-4" />
            <span>{event.registered}/{event.capacity} registered</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mb-4">
          {event.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs bg-cyan-100 text-cyan-700 hover:bg-cyan-200">
              #{tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="w-6 h-6 ring-2 ring-cyan-100">
              <AvatarImage src={event.organizerAvatar} />
              <AvatarFallback className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white font-bold text-xs">
                {event.organizer.split(" ").map((n) => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-semibold text-xs">{event.organizer}</div>
              <div className="text-xs text-muted-foreground">
                {event.price === 0 ? "Free" : `$${event.price}`}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {event.status === "upcoming" && (
              <Button 
                size="sm" 
                className="h-8 px-4 bg-cyan-600 hover:bg-cyan-700 text-white"
                onClick={() => handleRegister(event.id)}
              >
                Register
              </Button>
            )}
            {event.status === "ongoing" && (
              <Button 
                size="sm" 
                variant="outline" 
                className="h-8 px-4"
                onClick={() => handleUnregister(event.id)}
              >
                <Play className="w-3 h-3 mr-1" />
                Join
              </Button>
            )}
            {event.status === "completed" && (
              <Button 
                size="sm" 
                variant="outline" 
                className="h-8 px-4"
              >
                <Eye className="w-3 h-3 mr-1" />
                View Details
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <DashboardLayout userRole="alumni" title="Events">
      <div className="space-y-8">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Alumni Events</h1>
              <p className="text-cyan-100 text-lg">
                Discover and join events designed for our alumni community
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{events.length}</div>
              <div className="text-cyan-100">Total Events</div>
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
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="reunion">Reunion</SelectItem>
                  <SelectItem value="webinar">Webinar</SelectItem>
                  <SelectItem value="workshop">Workshop</SelectItem>
                  <SelectItem value="meeting">Meeting</SelectItem>
                  <SelectItem value="competition">Competition</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="upcoming" className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Upcoming ({upcomingEvents.length})
            </TabsTrigger>
            <TabsTrigger value="ongoing" className="flex items-center gap-2">
              <Play className="w-4 h-4" />
              Ongoing ({ongoingEvents.length})
            </TabsTrigger>
            <TabsTrigger value="completed" className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Completed ({completedEvents.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map(renderEventCard)}
            </div>
          </TabsContent>

          <TabsContent value="ongoing" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ongoingEvents.map(renderEventCard)}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {completedEvents.map(renderEventCard)}
            </div>
          </TabsContent>
        </Tabs>

        {/* Empty State */}
        {filteredEvents.length === 0 && (
          <Card className="p-12 text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center">
                <Calendar className="w-8 h-8 text-cyan-600" />
              </div>
              <h3 className="text-xl font-semibold">No events found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter criteria
              </p>
            </div>
          </Card>
        )}

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-cyan-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{events.length}</div>
                <div className="text-sm text-muted-foreground">Total Events</div>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{upcomingEvents.length}</div>
                <div className="text-sm text-muted-foreground">Upcoming</div>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Play className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{ongoingEvents.length}</div>
                <div className="text-sm text-muted-foreground">Ongoing</div>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{events.reduce((sum, e) => sum + e.registered, 0)}</div>
                <div className="text-sm text-muted-foreground">Total Registrations</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
