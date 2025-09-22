"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  Building2,
  Code,
  MessageSquare,
  FileText,
  Users,
  TrendingUp,
  Target,
  Lightbulb,
  BarChart3,
  Award,
  Clock,
  Eye,
} from "lucide-react"

export default function SummarizerPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCompany, setSelectedCompany] = useState("all")
  const [selectedTag, setSelectedTag] = useState("all")
  const [sortBy, setSortBy] = useState("recent")
  const [expandedCards, setExpandedCards] = useState(new Set())

  const toggleCardExpansion = (cardId) => {
    const newExpanded = new Set(expandedCards)
    if (newExpanded.has(cardId)) {
      newExpanded.delete(cardId)
    } else {
      newExpanded.add(cardId)
    }
    setExpandedCards(newExpanded)
  }

  const summaryData = [
    {
      id: 1,
      company: "Google",
      totalExperiences: 25,
      summary: "Based on 25 alumni experiences → 88% reported coding questions focusing on arrays and graphs, 72% had behavioral interviews using STAR method, 56% faced system design rounds.",
      topTips: [
        "Master dynamic programming and graph algorithms",
        "Prepare 3-4 detailed project explanations",
        "Practice system design for scalable applications",
        "Use STAR method for behavioral questions"
      ],
      patterns: {
        coding: { percentage: 88, topics: ["Arrays", "Graphs", "Dynamic Programming", "Trees"] },
        behavioral: { percentage: 72, focus: "Leadership and teamwork scenarios" },
        systemDesign: { percentage: 56, focus: "Scalability and distributed systems" },
        technical: { percentage: 64, focus: "CS fundamentals and problem-solving" }
      },
      tags: ["coding", "system-design", "behavioral", "technical"],
      lastUpdated: "2 days ago",
      trending: true
    },
    {
      id: 2,
      company: "Microsoft",
      totalExperiences: 18,
      summary: "Based on 18 alumni experiences → 83% encountered coding challenges in C# or Python, 67% had technical discussions about past projects, 44% faced architecture design questions.",
      topTips: [
        "Focus on object-oriented programming concepts",
        "Prepare detailed explanations of your projects",
        "Study Microsoft's technology stack",
        "Practice explaining complex technical concepts simply"
      ],
      patterns: {
        coding: { percentage: 83, topics: ["OOP", "Data Structures", "Algorithms", "C#/Python"] },
        projectDiscussion: { percentage: 67, focus: "Technical depth and problem-solving approach" },
        architecture: { percentage: 44, focus: "Software design patterns and scalability" },
        cultural: { percentage: 78, focus: "Growth mindset and collaboration" }
      },
      tags: ["coding", "oop", "projects", "architecture"],
      lastUpdated: "4 days ago",
      trending: false
    },
    {
      id: 3,
      company: "Amazon",
      totalExperiences: 22,
      summary: "Based on 22 alumni experiences → 91% faced leadership principle questions, 77% had coding rounds with optimization focus, 59% discussed customer obsession scenarios.",
      topTips: [
        "Memorize and practice Amazon's 16 Leadership Principles",
        "Focus on optimization and efficiency in coding",
        "Prepare customer-centric examples from your experience",
        "Practice the STAR method extensively"
      ],
      patterns: {
        leadership: { percentage: 91, topics: ["Customer Obsession", "Ownership", "Invent and Simplify"] },
        coding: { percentage: 77, focus: "Optimization and time/space complexity" },
        behavioral: { percentage: 85, focus: "Leadership principles application" },
        systemDesign: { percentage: 45, focus: "AWS services and cloud architecture" }
      },
      tags: ["leadership", "coding", "optimization", "aws"],
      lastUpdated: "1 week ago",
      trending: true
    }
  ]

  const filteredData = summaryData.filter((item) => {
    const matchesSearch = item.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.summary.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCompany = selectedCompany === "all" || item.company.toLowerCase() === selectedCompany
    const matchesTag = selectedTag === "all" || item.tags.includes(selectedTag)
    return matchesSearch && matchesCompany && matchesTag
  })

  const sortedData = [...filteredData].sort((a, b) => {
    switch (sortBy) {
      case "experiences":
        return b.totalExperiences - a.totalExperiences
      case "recent":
        return a.id - b.id // Mock recent sorting
      case "trending":
        return b.trending - a.trending
      default:
        return a.id - b.id
    }
  })

  return (
    <DashboardLayout userRole="student" title="Summarizer">
      <div className="space-y-8">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Summarizer</h1>
              <p className="text-blue-100 text-lg">
                Deep insights from alumni experiences and Q&A, organized company-wise
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{summaryData.length}</div>
              <div className="text-blue-100">Companies Analyzed</div>
            </div>
          </div>
        </div>

        {/* Filter Section */}
        <Card className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search companies or insights..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={selectedCompany} onValueChange={setSelectedCompany}>
                <SelectTrigger className="w-48">
                  <Building2 className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="All Companies" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Companies</SelectItem>
                  <SelectItem value="google">Google</SelectItem>
                  <SelectItem value="microsoft">Microsoft</SelectItem>
                  <SelectItem value="amazon">Amazon</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={selectedTag} onValueChange={setSelectedTag}>
                <SelectTrigger className="w-48">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="All Topics" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Topics</SelectItem>
                  <SelectItem value="coding">💻 Coding</SelectItem>
                  <SelectItem value="behavioral">🗣️ Behavioral</SelectItem>
                  <SelectItem value="system-design">📊 System Design</SelectItem>
                  <SelectItem value="leadership">👥 Leadership</SelectItem>
                  <SelectItem value="projects">🚀 Projects</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="experiences">Most Experiences</SelectItem>
                  <SelectItem value="trending">Trending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Summary Cards */}
        <div className="space-y-6">
          {sortedData.map((item) => (
            <Card key={item.id} className="hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-blue-50/30 hover:from-blue-50/50 hover:to-indigo-50/30">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Company Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                        <Building2 className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">{item.company}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Users className="w-4 h-4" />
                          <span>{item.totalExperiences} alumni experiences</span>
                          {item.trending && (
                            <Badge className="bg-orange-100 text-orange-600 border-orange-200">
                              <TrendingUp className="w-3 h-3 mr-1" />
                              Trending
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        Updated {item.lastUpdated}
                      </div>
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="bg-white/60 rounded-lg p-4 border border-blue-100">
                    <p className="text-gray-700 leading-relaxed">{item.summary}</p>
                  </div>

                  {/* Top Tips */}
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
                    <div className="flex items-center gap-2 mb-3">
                      <Lightbulb className="w-5 h-5 text-green-600" />
                      <h4 className="font-semibold text-green-800">Top Preparation Tips</h4>
                    </div>
                    <ul className="space-y-2">
                      {item.topTips.slice(0, expandedCards.has(item.id) ? item.topTips.length : 2).map((tip, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-green-700">
                          <Target className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Patterns Preview */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(item.patterns).slice(0, expandedCards.has(item.id) ? 4 : 2).map(([key, pattern]) => (
                      <div key={key} className="bg-white/80 rounded-lg p-3 border border-gray-200">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600">{pattern.percentage}%</div>
                          <div className="text-xs text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Expand/Collapse Button */}
                  <div className="flex justify-center pt-2">
                    <Button
                      variant="ghost"
                      onClick={() => toggleCardExpansion(item.id)}
                      className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                    >
                      {expandedCards.has(item.id) ? (
                        <>
                          <ChevronUp className="w-4 h-4 mr-2" />
                          Show Less
                        </>
                      ) : (
                        <>
                          <ChevronDown className="w-4 h-4 mr-2" />
                          View More Details
                        </>
                      )}
                    </Button>
                  </div>

                  {/* Expanded Content */}
                  {expandedCards.has(item.id) && (
                    <div className="space-y-4 pt-4 border-t border-gray-200">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <BarChart3 className="w-5 h-5 text-blue-600" />
                          Detailed Breakdown
                        </h4>
                        <div className="space-y-3">
                          {Object.entries(item.patterns).map(([key, pattern]) => (
                            <div key={key} className="flex justify-between items-center">
                              <div>
                                <div className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                                <div className="text-sm text-muted-foreground">{pattern.focus}</div>
                              </div>
                              <div className="text-right">
                                <div className="font-bold text-blue-600">{pattern.percentage}%</div>
                                {pattern.topics && (
                                  <div className="text-xs text-muted-foreground">
                                    {pattern.topics.slice(0, 2).join(", ")}
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {sortedData.length === 0 && (
          <Card className="p-12 text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold">No summarized experiences yet</h3>
              <p className="text-muted-foreground">
                Check back later as alumni share more insights and experiences
              </p>
            </div>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
