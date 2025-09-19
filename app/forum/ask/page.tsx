"use client"

import type React from "react"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Plus, X, Tag, HelpCircle, Lightbulb, AlertCircle } from "lucide-react"

export default function AskQuestionPage() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")
  const [category, setCategory] = useState("")
  const [isAnonymous, setIsAnonymous] = useState(false)

  const suggestedTags = [
    "system-design",
    "interviews",
    "career",
    "faang",
    "salary",
    "internship",
    "resume",
    "networking",
    "coding",
    "algorithms",
    "data-structures",
    "web-development",
    "machine-learning",
    "startup",
    "remote-work",
    "work-life-balance",
  ]

  const categories = [
    { value: "career", label: "Career Advice" },
    { value: "technical", label: "Technical Questions" },
    { value: "interviews", label: "Interview Preparation" },
    { value: "education", label: "Education & Learning" },
    { value: "industry", label: "Industry Insights" },
    { value: "general", label: "General Discussion" },
  ]

  const addTag = (tagToAdd: string) => {
    if (tagToAdd.trim() && !tags.includes(tagToAdd.trim()) && tags.length < 5) {
      setTags([...tags, tagToAdd.trim()])
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    if (!title.trim()) {
      alert("Please enter a question title")
      return
    }

    if (!content.trim()) {
      alert("Please enter your question details")
      return
    }

    if (!category) {
      alert("Please select a category")
      return
    }

    if (tags.length === 0) {
      alert("Please add at least one tag")
      return
    }

    // Handle form submission
    console.log({ title, content, tags, category, isAnonymous })

    // Show success message (in a real app, this would be a toast notification)
    alert("Question submitted successfully! It will be reviewed and published soon.")

    // Reset form
    setTitle("")
    setContent("")
    setTags([])
    setCategory("")
    setIsAnonymous(false)
  }

  return (
    <DashboardLayout userRole="student" title="Ask a Question">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="w-6 h-6" />
              Ask a Question
            </CardTitle>
            <CardDescription>Get help from the community by asking a clear, detailed question</CardDescription>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Title */}
                  <div className="space-y-2">
                    <Label htmlFor="title">Question Title *</Label>
                    <Input
                      id="title"
                      placeholder="Be specific and imagine you're asking a question to another person"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="text-base"
                    />
                    <p className="text-xs text-muted-foreground">{title.length}/150 characters</p>
                  </div>

                  {/* Category */}
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category for your question" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.value} value={cat.value}>
                            {cat.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Content */}
                  <div className="space-y-2">
                    <Label htmlFor="content">Question Details *</Label>
                    <Textarea
                      id="content"
                      placeholder="Provide all the details someone would need to answer your question. Include what you've tried, what you expected to happen, and what actually happened."
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      rows={8}
                      className="text-base"
                    />
                    <p className="text-xs text-muted-foreground">{content.length}/2000 characters</p>
                  </div>

                  {/* Tags */}
                  <div className="space-y-3">
                    <Label>Tags (up to 5)</Label>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-sm">
                          <Tag className="w-3 h-3 mr-1" />
                          {tag}
                          <button type="button" onClick={() => removeTag(tag)} className="ml-2 hover:text-destructive">
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>

                    {tags.length < 5 && (
                      <div className="flex gap-2">
                        <Input
                          placeholder="Add a tag..."
                          value={newTag}
                          onChange={(e) => setNewTag(e.target.value)}
                          onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag(newTag))}
                        />
                        <Button type="button" onClick={() => addTag(newTag)} size="sm" disabled={!newTag.trim()}>
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    )}

                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Suggested tags:</p>
                      <div className="flex flex-wrap gap-2">
                        {suggestedTags
                          .filter((tag) => !tags.includes(tag))
                          .slice(0, 8)
                          .map((tag) => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className="cursor-pointer hover:bg-primary hover:text-primary-foreground text-xs"
                              onClick={() => addTag(tag)}
                            >
                              <Plus className="w-3 h-3 mr-1" />
                              {tag}
                            </Badge>
                          ))}
                      </div>
                    </div>
                  </div>

                  {/* Anonymous Option */}
                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div>
                      <div className="font-medium text-sm">Post Anonymously</div>
                      <div className="text-xs text-muted-foreground">
                        Your name won't be shown, but you can still receive answers
                      </div>
                    </div>
                    <Switch checked={isAnonymous} onCheckedChange={setIsAnonymous} />
                  </div>

                  {/* Submit Buttons */}
                  <div className="flex gap-3 pt-4">
                    <Button type="submit" className="flex-1">
                      Post Question
                    </Button>
                    <Button type="button" variant="outline" className="flex-1 bg-transparent">
                      Save as Draft
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Lightbulb className="w-5 h-5" />
                  Writing Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm space-y-2">
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <p>Be specific about your problem or question</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <p>Include relevant details and context</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <p>Use clear, descriptive tags</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <p>Show what you've already tried</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <p>Be respectful and professional</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Guidelines */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  Community Guidelines
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm space-y-2">
                  <p>• Keep questions relevant to career and academic topics</p>
                  <p>• Search existing questions before posting</p>
                  <p>• One question per post</p>
                  <p>• No spam or promotional content</p>
                  <p>• Be kind and constructive</p>
                </div>
              </CardContent>
            </Card>

            {/* Popular Categories */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Popular Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {categories.slice(0, 4).map((cat) => (
                  <div key={cat.value} className="flex items-center justify-between text-sm">
                    <span>{cat.label}</span>
                    <Badge variant="outline" className="text-xs">
                      {Math.floor(Math.random() * 50) + 10}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
