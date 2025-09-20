"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Plus,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Eye,
  Clock,
  Tag,
  TrendingUp,
  Users,
  CheckCircle,
  Star,
  ChatBubble,
} from "lucide-react"

export default function ForumPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("recent")
  const [filterTag, setFilterTag] = useState("all")
  const [upvotedQuestions, setUpvotedQuestions] = useState(new Set())
  const [showAskForm, setShowAskForm] = useState(false)

  const questions = [
    {
      id: 1,
      title: "How to prepare for system design interviews at FAANG companies?",
      content:
        "I'm a final year student preparing for interviews at top tech companies. What are the key topics I should focus on for system design rounds?",
      author: {
        name: "Alex Kumar",
        role: "student",
        year: "2025",
        avatar: "/images/default-avatar.png",
      },
      tags: ["system-design", "interviews", "faang"],
      votes: 15,
      answers: 8,
      views: 234,
      timeAgo: "2 hours ago",
      isAnswered: true,
      isTrending: true,
    },
    {
      id: 2,
      title: "Best practices for transitioning from academia to industry?",
      content:
        "I'm about to graduate and join my first tech job. What should I expect and how can I make the transition smoother?",
      author: {
        name: "Emma Wilson",
        role: "student",
        year: "2024",
        avatar: "/images/default-avatar.png",
      },
      tags: ["career", "transition", "industry"],
      votes: 23,
      answers: 12,
      views: 456,
      timeAgo: "5 hours ago",
      isAnswered: true,
      isTrending: false,
    },
    {
      id: 3,
      title: "Should I pursue a Master's degree or start working immediately?",
      content:
        "I have job offers but I'm also considering graduate school. What factors should I consider when making this decision?",
      author: {
        name: "Mike Chen",
        role: "student",
        year: "2024",
        avatar: "/images/default-avatar.png",
      },
      tags: ["education", "career", "masters"],
      votes: 8,
      answers: 6,
      views: 189,
      timeAgo: "1 day ago",
      isAnswered: false,
      isTrending: false,
    },
    {
      id: 4,
      title: "How to negotiate salary for your first job?",
      content:
        "I received my first job offer but I'm not sure if the salary is fair. How do I approach salary negotiation as a new graduate?",
      author: {
        name: "Lisa Park",
        role: "student",
        year: "2024",
        avatar: "/images/default-avatar.png",
      },
      tags: ["salary", "negotiation", "first-job"],
      votes: 31,
      answers: 15,
      views: 678,
      timeAgo: "2 days ago",
      isAnswered: true,
      isTrending: true,
    },
  ]

  const popularTags = [
    { name: "system-design", count: 45 },
    { name: "interviews", count: 38 },
    { name: "career", count: 52 },
    { name: "faang", count: 23 },
    { name: "salary", count: 19 },
    { name: "internship", count: 31 },
    { name: "resume", count: 28 },
    { name: "networking", count: 16 },
  ]

  const topContributors = [
    {
      name: "Sarah Chen",
      role: "alumni",
      company: "Google",
      answers: 45,
      reputation: 1250,
    },
    {
      name: "David Kim",
      role: "alumni",
      company: "Microsoft",
      answers: 38,
      reputation: 980,
    },
    {
      name: "Maria Rodriguez",
      role: "alumni",
      company: "Meta",
      answers: 32,
      reputation: 875,
    },
  ]

  const handleUpvote = (questionId: number) => {
    const newUpvoted = new Set(upvotedQuestions)
    if (newUpvoted.has(questionId)) {
      newUpvoted.delete(questionId)
    } else {
      newUpvoted.add(questionId)
    }
    setUpvotedQuestions(newUpvoted)
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
      case "answers":
        return b.answers - a.answers
      case "views":
        return b.views - a.views
      default:
        return 0 // Keep original order for "recent"
    }
  })

  return (
    <DashboardLayout userRole="student" title="Q&A Forum">
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-400 to-blue-500 p-6 rounded-lg text-white">
          <div className="flex items-center gap-4">
            <ChatBubble className="w-10 h-10" />
            <div>
              <h1 className="text-3xl font-bold">Q&A Forum</h1>
              <p className="text-lg">Engage with the community and get your questions answered</p>
            </div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-6 h-6" />
                  Community Q&A
                </CardTitle>
                <CardDescription>Get answers from experienced alumni and help fellow students</CardDescription>
              </div>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Ask Question
              </Button>
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Search questions..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recent">Most Recent</SelectItem>
                      <SelectItem value="votes">Most Voted</SelectItem>
                      <SelectItem value="answers">Most Answered</SelectItem>
                      <SelectItem value="views">Most Viewed</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={filterTag} onValueChange={setFilterTag}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="Filter by tag" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Tags</SelectItem>
                      {popularTags.map((tag) => (
                        <SelectItem key={tag.name} value={tag.name}>
                          {tag.name} ({tag.count})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Questions List */}
            <Tabs defaultValue="all" className="w-full">
              <TabsList>
                <TabsTrigger value="all">All Questions</TabsTrigger>
                <TabsTrigger value="unanswered">Unanswered</TabsTrigger>
                <TabsTrigger value="trending">Trending</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4">
                {sortedQuestions.map((question) => (
                  <Card key={question.id} className="hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-blue-50/30 hover:from-blue-50/50 hover:to-purple-50/30">
                    <CardContent className="p-6">
                      <div className="flex gap-6">
                        {/* Vote Section */}
                        <div className="flex flex-col items-center gap-3 min-w-[80px]">
                          <Button
                            variant="ghost"
                            size="sm"
                            className={`p-2 rounded-full transition-all duration-200 ${upvotedQuestions.has(question.id)
                              ? "bg-green-100 text-green-600 hover:bg-green-200"
                              : "hover:bg-blue-50 hover:text-blue-600"
                              }`}
                            onClick={() => handleUpvote(question.id)}
                          >
                            <ThumbsUp className="w-5 h-5" />
                          </Button>
                          <span className={`font-bold text-xl ${upvotedQuestions.has(question.id) ? "text-green-600" : "text-muted-foreground"
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
                            <h3 className="font-bold text-xl hover:text-blue-600 cursor-pointer transition-colors">
                              {question.title}
                              {question.isTrending && <TrendingUp className="inline w-5 h-5 ml-2 text-orange-500" />}
                              {question.isAnswered && <CheckCircle className="inline w-5 h-5 ml-2 text-green-500" />}
                            </h3>
                          </div>

                          <p className="text-base text-muted-foreground mb-4 leading-relaxed overflow-hidden" style={{
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical'
                          }}>{question.content}</p>

                          <div className="flex flex-wrap gap-2 mb-4">
                            {question.tags.map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs bg-white/50 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                                <Tag className="w-3 h-3 mr-1" />
                                #{tag}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Avatar className="w-8 h-8 ring-2 ring-blue-100">
                                <AvatarImage
                                  src={question.author.avatar || "/placeholder.svg"}
                                  alt={question.author.name}
                                />
                                <AvatarFallback className="text-sm">
                                  {question.author.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
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
              </TabsContent>

              <TabsContent value="unanswered" className="space-y-4">
                {sortedQuestions
                  .filter((q) => !q.isAnswered)
                  .map((question) => (
                    <Card key={question.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex gap-4">
                          <div className="flex flex-col items-center gap-2 min-w-[60px]">
                            <Button variant="ghost" size="sm" className="p-1">
                              <ThumbsUp className="w-4 h-4" />
                            </Button>
                            <span className="font-medium text-lg">{question.votes}</span>
                            <Button variant="ghost" size="sm" className="p-1">
                              <ThumbsDown className="w-4 h-4" />
                            </Button>
                          </div>

                          <div className="flex flex-col items-center gap-2 min-w-[60px] text-center">
                            <div className="text-sm font-medium text-orange-600">{question.answers}</div>
                            <div className="text-xs text-muted-foreground">answers</div>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Eye className="w-3 h-3" />
                              {question.views}
                            </div>
                          </div>

                          <div className="flex-1">
                            <h3 className="font-semibold text-lg hover:text-primary cursor-pointer mb-2">
                              {question.title}
                            </h3>

                            <p className="text-sm text-muted-foreground mb-3 overflow-hidden" style={{
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical'
                            }}>{question.content}</p>

                            <div className="flex flex-wrap gap-2 mb-3">
                              {question.tags.map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                  <Tag className="w-3 h-3 mr-1" />
                                  {tag}
                                </Badge>
                              ))}
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Avatar className="w-6 h-6">
                                  <AvatarImage
                                    src={question.author.avatar || "/placeholder.svg"}
                                    alt={question.author.name}
                                  />
                                  <AvatarFallback className="text-xs">
                                    {question.author.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="text-xs">
                                  <span className="font-medium">{question.author.name}</span>
                                  <span className="text-muted-foreground ml-1">
                                    • {question.author.role} • Class of {question.author.year}
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Clock className="w-3 h-3" />
                                {question.timeAgo}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </TabsContent>

              <TabsContent value="trending" className="space-y-4">
                {sortedQuestions
                  .filter((q) => q.isTrending)
                  .map((question) => (
                    <Card key={question.id} className="hover:shadow-md transition-shadow border-orange-200">
                      <CardContent className="p-6">
                        <div className="flex gap-4">
                          <div className="flex flex-col items-center gap-2 min-w-[60px]">
                            <Button variant="ghost" size="sm" className="p-1">
                              <ThumbsUp className="w-4 h-4" />
                            </Button>
                            <span className="font-medium text-lg">{question.votes}</span>
                            <Button variant="ghost" size="sm" className="p-1">
                              <ThumbsDown className="w-4 h-4" />
                            </Button>
                          </div>

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

                          <div className="flex-1">
                            <h3 className="font-semibold text-lg hover:text-primary cursor-pointer mb-2">
                              {question.title}
                              <TrendingUp className="inline w-4 h-4 ml-2 text-orange-500" />
                              {question.isAnswered && <CheckCircle className="inline w-4 h-4 ml-2 text-green-500" />}
                            </h3>

                            <p className="text-sm text-muted-foreground mb-3 overflow-hidden" style={{
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical'
                            }}>{question.content}</p>

                            <div className="flex flex-wrap gap-2 mb-3">
                              {question.tags.map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                  <Tag className="w-3 h-3 mr-1" />
                                  {tag}
                                </Badge>
                              ))}
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Avatar className="w-6 h-6">
                                  <AvatarImage
                                    src={question.author.avatar || "/placeholder.svg"}
                                    alt={question.author.name}
                                  />
                                  <AvatarFallback className="text-xs">
                                    {question.author.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="text-xs">
                                  <span className="font-medium">{question.author.name}</span>
                                  <span className="text-muted-foreground ml-1">
                                    • {question.author.role} • Class of {question.author.year}
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Clock className="w-3 h-3" />
                                {question.timeAgo}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Popular Tags */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Popular Tags</CardTitle>
                <CardDescription>Most discussed topics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {popularTags.map((tag) => (
                  <div key={tag.name} className="flex items-center justify-between">
                    <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                      <Tag className="w-3 h-3 mr-1" />
                      {tag.name}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{tag.count}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Top Contributors */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Top Contributors</CardTitle>
                <CardDescription>Most helpful community members</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {topContributors.map((contributor, index) => (
                  <div key={contributor.name} className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-xs font-medium">
                      {index + 1}
                    </div>
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={contributor.avatar || "/placeholder.svg"} alt={contributor.name} />
                      <AvatarFallback className="text-xs">
                        {contributor.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{contributor.name}</p>
                      <p className="text-xs text-muted-foreground">{contributor.company}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{contributor.answers} answers</span>
                        <Star className="w-3 h-3 fill-current text-yellow-500" />
                        <span>{contributor.reputation}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Forum Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Forum Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <MessageSquare className="w-4 h-4" />
                    Total Questions
                  </span>
                  <span className="font-medium">1,247</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle className="w-4 h-4" />
                    Answered
                  </span>
                  <span className="font-medium">1,089 (87%)</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <Users className="w-4 h-4" />
                    Active Users
                  </span>
                  <span className="font-medium">456</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <TrendingUp className="w-4 h-4" />
                    This Week
                  </span>
                  <span className="font-medium">89 questions</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
