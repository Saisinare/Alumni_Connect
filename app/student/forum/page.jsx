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
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  Search,
  Filter,
  Plus,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Eye,
  Clock,
  Tag,
  TrendingUp,
  CheckCircle,
  Star,
  ArrowUp,
  ArrowDown,
  Bookmark,
  Share2,
  MoreHorizontal,
  User,
  Calendar,
  Award,
  MessageSquare,
  HelpCircle,
  Lightbulb,
  Target,
  Zap,
} from "lucide-react"
import { formatDistanceToNow } from "date-fns"

export default function StudentForumPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("recent")
  const [filterTag, setFilterTag] = useState("all")
  const [upvotedQuestions, setUpvotedQuestions] = useState(new Set())
  const [showAskForm, setShowAskForm] = useState(false)
  const [newQuestion, setNewQuestion] = useState({
    title: "",
    content: "",
    tags: [],
    category: "",
    isAnonymous: false
  })

  const questions = [
    {
      id: 1,
      title: "How to prepare for system design interviews at FAANG companies?",
      content: "I'm a final year student preparing for interviews at top tech companies. What are the key topics I should focus on for system design rounds? Any specific resources or practice problems you'd recommend?",
      author: {
        name: "Alex Kumar",
        avatar: "/student-alex.png",
        role: "student",
        year: "2025",
      },
      tags: ["system-design", "interviews", "faang"],
      category: "Career",
      votes: 24,
      answers: 8,
      views: 156,
      createdAt: new Date("2024-01-10"),
      timeAgo: "2 days ago",
      isAnswered: true,
      isTrending: true,
    },
    {
      id: 2,
      title: "Best practices for React state management in large applications",
      content: "I'm working on a complex React application and struggling with state management. Should I use Redux, Context API, or Zustand? What are the pros and cons of each approach?",
      author: {
        name: "Sarah Chen",
        avatar: "/student-priya.png",
        role: "student",
        year: "2024",
      },
      tags: ["react", "state-management", "frontend"],
      category: "Technical",
      votes: 18,
      answers: 12,
      views: 203,
      createdAt: new Date("2024-01-09"),
      timeAgo: "3 days ago",
      isAnswered: false,
      isTrending: false,
    },
    {
      id: 3,
      title: "Career transition from software engineering to product management",
      content: "I've been working as a software engineer for 3 years and want to transition to product management. What skills should I develop and how can I make this transition successfully?",
      author: {
        name: "Mike Johnson",
        avatar: "/student-david.png",
        role: "alumni",
        year: "2020",
        company: "Google",
      },
      tags: ["career", "product-management", "transition"],
      category: "Career",
      votes: 31,
      answers: 15,
      views: 287,
      createdAt: new Date("2024-01-08"),
      timeAgo: "4 days ago",
      isAnswered: true,
      isTrending: true,
    },
    {
      id: 4,
      title: "How to build a strong professional network as a new graduate?",
      content: "I'm graduating soon and want to build meaningful professional relationships. What are the best strategies for networking, both online and offline?",
      author: {
        name: "Emily Rodriguez",
        avatar: "/professional-woman-diverse.png",
        role: "student",
        year: "2025",
      },
      tags: ["networking", "career", "professional-development"],
      category: "Career",
      votes: 15,
      answers: 6,
      views: 134,
      createdAt: new Date("2024-01-07"),
      timeAgo: "5 days ago",
      isAnswered: false,
      isTrending: false,
    },
    {
      id: 5,
      title: "Machine Learning project ideas for portfolio building",
      content: "I want to build a strong ML portfolio to land internships. What are some interesting project ideas that would impress recruiters? Looking for projects that are challenging but achievable.",
      author: {
        name: "David Kim",
        avatar: "/professional-engineer.png",
        role: "student",
        year: "2024",
      },
      tags: ["machine-learning", "portfolio", "projects"],
      category: "Technical",
      votes: 22,
      answers: 9,
      views: 178,
      createdAt: new Date("2024-01-06"),
      timeAgo: "6 days ago",
      isAnswered: true,
      isTrending: false,
    },
  ]

  const handleUpvote = (questionId) => {
    const newUpvoted = new Set(upvotedQuestions)
    if (newUpvoted.has(questionId)) {
      newUpvoted.delete(questionId)
    } else {
      newUpvoted.add(questionId)
    }
    setUpvotedQuestions(newUpvoted)
  }

  const handleAddTag = (tag) => {
    if (tag && !newQuestion.tags.includes(tag)) {
      setNewQuestion({
        ...newQuestion,
        tags: [...newQuestion.tags, tag]
      })
    }
  }

  const handleRemoveTag = (tagToRemove) => {
    setNewQuestion({
      ...newQuestion,
      tags: newQuestion.tags.filter(tag => tag !== tagToRemove)
    })
  }

  const handleSubmitQuestion = () => {
    if (!newQuestion.title.trim() || !newQuestion.content.trim() || !newQuestion.category) {
      alert("Please fill in all required fields")
      return
    }
    
    console.log("New question:", newQuestion)
    setShowAskForm(false)
    setNewQuestion({
      title: "",
      content: "",
      tags: [],
      category: "",
      isAnonymous: false
    })
    alert("Question submitted successfully!")
  }

  const filteredQuestions = questions.filter((question) => {
    const matchesSearch =
      question.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      question.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      question.author.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTag = filterTag === "all" || question.tags.includes(filterTag)
    return matchesSearch && matchesTag
  })

  const sortedQuestions = [...filteredQuestions].sort((a, b) => {
    switch (sortBy) {
      case "votes":
        return b.votes - a.votes
      case "recent":
        return b.createdAt - a.createdAt
      case "trending":
        return b.views - a.views
      default:
        return b.createdAt - a.createdAt
    }
  })

  return (
    <DashboardLayout userRole="student" title="Q&A Forum">
      <div className="space-y-8">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Q&A Forum</h1>
              <p className="text-green-100 text-lg">
                Ask questions, share knowledge, and learn from the community
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{questions.length}</div>
              <div className="text-green-100">Total Questions</div>
            </div>
          </div>
        </div>

        {/* Ask Question Button */}
        <div className="flex justify-end">
          <Dialog open={showAskForm} onOpenChange={setShowAskForm}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Ask a Question
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">Ask a Question</DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="title">Question Title *</Label>
                  <Input
                    id="title"
                    placeholder="What's your question?"
                    value={newQuestion.title}
                    onChange={(e) => setNewQuestion({...newQuestion, title: e.target.value})}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="content">Question Details *</Label>
                  <Textarea
                    id="content"
                    placeholder="Provide more details about your question..."
                    rows={4}
                    value={newQuestion.content}
                    onChange={(e) => setNewQuestion({...newQuestion, content: e.target.value})}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select value={newQuestion.category} onValueChange={(value) => setNewQuestion({...newQuestion, category: value})}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Career">Career</SelectItem>
                      <SelectItem value="Technical">Technical</SelectItem>
                      <SelectItem value="Academic">Academic</SelectItem>
                      <SelectItem value="General">General</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Tags</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {newQuestion.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                        {tag}
                        <button
                          onClick={() => handleRemoveTag(tag)}
                          className="ml-1 hover:text-red-500"
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                    <Input
                      placeholder="Add a tag and press Enter"
                      className="w-48"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          handleAddTag(e.target.value.trim())
                          e.target.value = ''
                        }
                      }}
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="anonymous"
                    checked={newQuestion.isAnonymous}
                    onChange={(e) => setNewQuestion({...newQuestion, isAnonymous: e.target.checked})}
                  />
                  <Label htmlFor="anonymous">Ask anonymously</Label>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setShowAskForm(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSubmitQuestion} className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white">
                    Submit Question
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
                  placeholder="Search questions, answers, or users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="votes">Most Votes</SelectItem>
                  <SelectItem value="trending">Trending</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterTag} onValueChange={setFilterTag}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by tag" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tags</SelectItem>
                  <SelectItem value="career">Career</SelectItem>
                  <SelectItem value="technical">Technical</SelectItem>
                  <SelectItem value="interviews">Interviews</SelectItem>
                  <SelectItem value="react">React</SelectItem>
                  <SelectItem value="system-design">System Design</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Questions List */}
        <div className="space-y-6">
          {sortedQuestions.map((question) => (
            <Card key={question.id} className="hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-green-50/30 hover:from-green-50/50 hover:to-teal-50/30">
              <CardContent className="p-6">
                <div className="flex gap-6">
                  {/* Vote Section */}
                  <div className="flex flex-col items-center gap-3 min-w-[80px]">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className={`p-2 rounded-full transition-all duration-200 ${
                        upvotedQuestions.has(question.id)
                          ? "bg-green-100 text-green-600 hover:bg-green-200"
                          : "hover:bg-green-50 hover:text-green-600"
                      }`}
                      onClick={() => handleUpvote(question.id)}
                    >
                      <ThumbsUp className="w-5 h-5" />
                    </Button>
                    <span className={`font-bold text-xl ${
                      upvotedQuestions.has(question.id) ? "text-green-600" : "text-muted-foreground"
                    }`}>
                      {question.votes + (upvotedQuestions.has(question.id) ? 1 : 0)}
                    </span>
                    <Button variant="ghost" size="sm" className="p-2 rounded-full hover:bg-red-50 hover:text-red-600">
                      <ThumbsDown className="w-5 h-5" />
                    </Button>
                  </div>

                  {/* Stats Section */}
                  <div className="flex flex-col items-center gap-2 min-w-[60px] text-center">
                    <div
                      className={`text-sm font-medium ${question.isAnswered ? "text-green-600" : "text-muted-foreground"}`}
                    >
                      {question.answers}
                    </div>
                    <div className="text-xs text-muted-foreground">answers</div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Eye className="w-3 h-3" />
                      {question.views}
                    </div>
                  </div>

                  {/* Question Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="font-bold text-xl hover:text-green-600 cursor-pointer transition-colors">
                        {question.title}
                        {question.isTrending && <TrendingUp className="inline w-5 h-5 ml-2 text-orange-500" />}
                        {question.isAnswered && <CheckCircle className="inline w-5 h-5 ml-2 text-green-500" />}
                      </h3>
                    </div>

                    <p className="text-base text-muted-foreground mb-4 line-clamp-3 leading-relaxed">{question.content}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {question.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs bg-white/50 hover:bg-green-50 hover:text-green-600 transition-colors">
                          <Tag className="w-3 h-3 mr-1" />
                          #{tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8 ring-2 ring-green-100">
                          <AvatarImage src={question.author.avatar} />
                          <AvatarFallback className="bg-gradient-to-br from-green-500 to-teal-600 text-white font-bold text-sm">
                            {question.author.name.split(" ").map((n) => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-semibold text-sm">{question.author.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {question.author.role === "student"
                              ? `Class of ${question.author.year}`
                              : `Alumni • ${question.author.company}`}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span className="font-medium">{question.timeAgo}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {sortedQuestions.length === 0 && (
          <Card className="p-12 text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <MessageSquare className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold">No questions found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter criteria
              </p>
            </div>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
