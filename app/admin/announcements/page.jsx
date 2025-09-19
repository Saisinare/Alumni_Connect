"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  Search,
  Filter,
  Plus,
  Calendar,
  Clock,
  Users,
  Bell,
  Megaphone,
  Edit,
  Trash2,
  Eye,
  Send,
  Save,
  AlertCircle,
  CheckCircle,
  Info,
  Star,
  Pin,
  Archive,
  MoreHorizontal,
} from "lucide-react"

export default function AdminAnnouncementsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    message: "",
    priority: "normal",
    targetAudience: "all",
    isPinned: false,
  })

  const announcements = [
    {
      id: 1,
      title: "Annual Alumni Reunion 2024",
      message: "Join us for our annual alumni reunion on March 15th, 2024 at the Grand Ballroom. This is a great opportunity to reconnect with old friends, network with fellow alumni, and celebrate our shared experiences. We'll have food, drinks, and entertainment. RSVP by March 1st to secure your spot!",
      priority: "high",
      targetAudience: "all",
      status: "published",
      createdAt: "2024-01-15T10:30:00Z",
      publishedAt: "2024-01-15T10:30:00Z",
      author: "Admin Team",
      views: 245,
      isPinned: true,
      tags: ["Event", "Reunion", "Networking"],
    },
    {
      id: 2,
      title: "New Mentorship Program Launch",
      message: "We're excited to announce the launch of our new mentorship program! Alumni can now sign up to mentor current students, and students can request mentorship from experienced professionals. This program aims to bridge the gap between academic learning and real-world experience.",
      priority: "normal",
      targetAudience: "all",
      status: "published",
      createdAt: "2024-01-12T14:20:00Z",
      publishedAt: "2024-01-12T14:20:00Z",
      author: "Admin Team",
      views: 189,
      isPinned: false,
      tags: ["Mentorship", "Program", "Students"],
    },
    {
      id: 3,
      title: "Platform Maintenance Notice",
      message: "Scheduled maintenance will be performed on the platform on January 20th, 2024 from 2:00 AM to 6:00 AM EST. During this time, the platform will be temporarily unavailable. We apologize for any inconvenience and appreciate your patience.",
      priority: "high",
      targetAudience: "all",
      status: "published",
      createdAt: "2024-01-10T09:15:00Z",
      publishedAt: "2024-01-10T09:15:00Z",
      author: "Technical Team",
      views: 156,
      isPinned: false,
      tags: ["Maintenance", "Technical", "Notice"],
    },
    {
      id: 4,
      title: "Job Opportunities at Tech Giants",
      message: "Several of our alumni companies are hiring! Check out the latest job openings at Google, Microsoft, Apple, and other top tech companies. These positions are exclusively available to our alumni network. Don't miss out on these amazing opportunities!",
      priority: "normal",
      targetAudience: "alumni",
      status: "published",
      createdAt: "2024-01-08T16:45:00Z",
      publishedAt: "2024-01-08T16:45:00Z",
      author: "Career Services",
      views: 312,
      isPinned: false,
      tags: ["Jobs", "Career", "Opportunities"],
    },
    {
      id: 5,
      title: "Student Project Showcase",
      message: "Join us for the annual student project showcase on February 10th, 2024. Students will present their innovative projects and research. This is a great opportunity for alumni to see the latest work being done and potentially mentor or collaborate with students.",
      priority: "normal",
      targetAudience: "alumni",
      status: "published",
      createdAt: "2024-01-05T11:30:00Z",
      publishedAt: "2024-01-05T11:30:00Z",
      author: "Academic Affairs",
      views: 98,
      isPinned: false,
      tags: ["Students", "Projects", "Showcase"],
    },
    {
      id: 6,
      title: "Draft: New Feature Announcement",
      message: "We're working on exciting new features for the platform including real-time chat, video calls, and enhanced networking tools. Stay tuned for more updates!",
      priority: "low",
      targetAudience: "all",
      status: "draft",
      createdAt: "2024-01-18T15:20:00Z",
      publishedAt: null,
      author: "Product Team",
      views: 0,
      isPinned: false,
      tags: ["Features", "Platform", "Development"],
    },
  ]

  const handleCreateAnnouncement = () => {
    if (!newAnnouncement.title.trim() || !newAnnouncement.message.trim()) {
      alert("Please fill in all required fields")
      return
    }
    
    console.log("Creating announcement:", newAnnouncement)
    setShowCreateForm(false)
    setNewAnnouncement({
      title: "",
      message: "",
      priority: "normal",
      targetAudience: "all",
      isPinned: false,
    })
    alert("Announcement created successfully!")
  }

  const handlePublish = (announcementId) => {
    console.log("Publishing announcement:", announcementId)
    alert("Announcement published successfully!")
  }

  const handleEdit = (announcementId) => {
    console.log("Editing announcement:", announcementId)
    alert("Edit functionality coming soon!")
  }

  const handleDelete = (announcementId) => {
    console.log("Deleting announcement:", announcementId)
    alert("Announcement deleted successfully!")
  }

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "high":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-700 border-red-200">
            <AlertCircle className="w-3 h-3 mr-1" />
            High
          </Badge>
        )
      case "normal":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-200">
            <Info className="w-3 h-3 mr-1" />
            Normal
          </Badge>
        )
      case "low":
        return (
          <Badge variant="outline" className="bg-gray-100 text-gray-700 border-gray-200">
            <Info className="w-3 h-3 mr-1" />
            Low
          </Badge>
        )
      default:
        return null
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "published":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
            <CheckCircle className="w-3 h-3 mr-1" />
            Published
          </Badge>
        )
      case "draft":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-700 border-yellow-200">
            <Edit className="w-3 h-3 mr-1" />
            Draft
          </Badge>
        )
      default:
        return null
    }
  }

  const getTargetAudienceBadge = (audience) => {
    switch (audience) {
      case "all":
        return (
          <Badge variant="secondary" className="bg-purple-100 text-purple-700">
            <Users className="w-3 h-3 mr-1" />
            All Users
          </Badge>
        )
      case "alumni":
        return (
          <Badge variant="secondary" className="bg-blue-100 text-blue-700">
            <Users className="w-3 h-3 mr-1" />
            Alumni Only
          </Badge>
        )
      case "students":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-700">
            <Users className="w-3 h-3 mr-1" />
            Students Only
          </Badge>
        )
      default:
        return null
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const filteredAnnouncements = announcements.filter((announcement) => {
    const matchesSearch =
      announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      announcement.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      announcement.author.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = filterStatus === "all" || announcement.status === filterStatus
    
    return matchesSearch && matchesStatus
  })

  const sortedAnnouncements = [...filteredAnnouncements].sort((a, b) => {
    // Pinned announcements first
    if (a.isPinned && !b.isPinned) return -1
    if (!a.isPinned && b.isPinned) return 1
    
    // Then by creation date (newest first)
    return new Date(b.createdAt) - new Date(a.createdAt)
  })

  return (
    <DashboardLayout userRole="admin" title="Announcements">
      <div className="space-y-8">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-pink-600 to-rose-600 rounded-2xl p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Announcements</h1>
              <p className="text-pink-100 text-lg">
                Create and manage platform announcements
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{announcements.length}</div>
              <div className="text-pink-100">Total Announcements</div>
            </div>
          </div>
        </div>

        {/* Create Announcement Button */}
        <div className="flex justify-end">
          <Dialog open={showCreateForm} onOpenChange={setShowCreateForm}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Create Announcement
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">Create New Announcement</DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    placeholder="Enter announcement title"
                    value={newAnnouncement.title}
                    onChange={(e) => setNewAnnouncement({...newAnnouncement, title: e.target.value})}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    placeholder="Enter announcement message"
                    rows={6}
                    value={newAnnouncement.message}
                    onChange={(e) => setNewAnnouncement({...newAnnouncement, message: e.target.value})}
                    className="mt-1"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="priority">Priority</Label>
                    <Select value={newAnnouncement.priority} onValueChange={(value) => setNewAnnouncement({...newAnnouncement, priority: value})}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="normal">Normal</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="audience">Target Audience</Label>
                    <Select value={newAnnouncement.targetAudience} onValueChange={(value) => setNewAnnouncement({...newAnnouncement, targetAudience: value})}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select audience" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Users</SelectItem>
                        <SelectItem value="alumni">Alumni Only</SelectItem>
                        <SelectItem value="students">Students Only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="pinned"
                    checked={newAnnouncement.isPinned}
                    onChange={(e) => setNewAnnouncement({...newAnnouncement, isPinned: e.target.checked})}
                  />
                  <Label htmlFor="pinned">Pin this announcement</Label>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateAnnouncement} className="bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white">
                    Create Announcement
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search and Filter */}
        <Card className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search announcements..."
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
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Announcements List */}
        <div className="space-y-6">
          {sortedAnnouncements.map((announcement) => (
            <Card key={announcement.id} className="hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-pink-50/30 hover:from-pink-50/50 hover:to-rose-50/30">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {announcement.isPinned && (
                        <Pin className="w-4 h-4 text-pink-600" />
                      )}
                      <h3 className="font-bold text-xl">{announcement.title}</h3>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      {getPriorityBadge(announcement.priority)}
                      {getStatusBadge(announcement.status)}
                      {getTargetAudienceBadge(announcement.targetAudience)}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline" className="h-8 px-3">
                      <Eye className="w-3 h-3 mr-1" />
                      View
                    </Button>
                    <Button size="sm" variant="outline" className="h-8 px-3">
                      <Edit className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline" className="h-8 px-3">
                      <MoreHorizontal className="w-3 h-3" />
                    </Button>
                  </div>
                </div>

                <p className="text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
                  {announcement.message}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {announcement.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs bg-pink-100 text-pink-700 hover:bg-pink-200">
                      #{tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(announcement.createdAt)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{announcement.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      <span>{announcement.views} views</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {announcement.status === "draft" && (
                      <Button 
                        size="sm" 
                        className="h-8 px-3 bg-green-600 hover:bg-green-700 text-white"
                        onClick={() => handlePublish(announcement.id)}
                      >
                        <Send className="w-3 h-3 mr-1" />
                        Publish
                      </Button>
                    )}
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="h-8 px-3"
                      onClick={() => handleEdit(announcement.id)}
                    >
                      <Edit className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                    <Button 
                      size="sm" 
                      variant="destructive" 
                      className="h-8 px-3"
                      onClick={() => handleDelete(announcement.id)}
                    >
                      <Trash2 className="w-3 h-3 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {sortedAnnouncements.length === 0 && (
          <Card className="p-12 text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center">
                <Megaphone className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold">No announcements found</h3>
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
              <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                <Megaphone className="w-5 h-5 text-pink-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{announcements.length}</div>
                <div className="text-sm text-muted-foreground">Total</div>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{announcements.filter(a => a.status === 'published').length}</div>
                <div className="text-sm text-muted-foreground">Published</div>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Edit className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{announcements.filter(a => a.status === 'draft').length}</div>
                <div className="text-sm text-muted-foreground">Drafts</div>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Eye className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{announcements.reduce((sum, a) => sum + a.views, 0)}</div>
                <div className="text-sm text-muted-foreground">Total Views</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
