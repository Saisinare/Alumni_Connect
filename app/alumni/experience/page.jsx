"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, X, Building, Users, Clock, Star } from "lucide-react"

export default function ShareExperiencePage() {
  const [interviewRounds, setInterviewRounds] = useState([
    { id: 1, round: "Phone Screening", description: "", tips: "" },
  ])
  const [skills, setSkills] = useState([])
  const [newSkill, setNewSkill] = useState("")

  const addInterviewRound = () => {
    const newRound = {
      id: Date.now(),
      round: "",
      description: "",
      tips: "",
    }
    setInterviewRounds([...interviewRounds, newRound])
  }

  const removeInterviewRound = (id) => {
    setInterviewRounds(interviewRounds.filter((round) => round.id !== id))
  }

  const updateInterviewRound = (id, field, value) => {
    setInterviewRounds(interviewRounds.map((round) => (round.id === id ? { ...round, [field]: value } : round)))
  }

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()])
      setNewSkill("")
    }
  }

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove))
  }

  const sharedExperiences = [
    {
      id: 1,
      company: "Google",
      role: "Software Engineer",
      author: "Sarah Chen",
      timeAgo: "2 weeks ago",
      upvotes: 45,
      comments: 12,
      difficulty: "Hard",
      rounds: ["Phone Screen", "Technical", "System Design", "Behavioral"],
    },
    {
      id: 2,
      company: "Microsoft",
      role: "Product Manager",
      author: "Michael Rodriguez",
      timeAgo: "1 month ago",
      upvotes: 32,
      comments: 8,
      difficulty: "Medium",
      rounds: ["Phone Screen", "Case Study", "Technical", "Final Round"],
    },
    {
      id: 3,
      company: "Amazon",
      role: "UX Designer",
      author: "Emily Johnson",
      timeAgo: "3 weeks ago",
      upvotes: 28,
      comments: 15,
      difficulty: "Medium",
      rounds: ["Portfolio Review", "Design Challenge", "Behavioral"],
    },
  ]

  return (
    <DashboardLayout userRole="alumni" title="Share Your Experience">
      <div className="space-y-6">
        {/* Share New Experience */}
        <Card>
          <CardHeader>
            <CardTitle>Share Your Placement Experience</CardTitle>
            <CardDescription>Help students by sharing your interview experience and tips</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input id="company" placeholder="e.g., Google, Microsoft, Amazon" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Input id="role" placeholder="e.g., Software Engineer, Product Manager" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="difficulty">Interview Difficulty</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Process Duration</Label>
                <Input id="duration" placeholder="e.g., 3 weeks, 1 month" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="outcome">Outcome</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select outcome" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="selected">Selected</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="withdrew">Withdrew</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Skills Required */}
            <div className="space-y-2">
              <Label>Skills Required</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-sm">
                    {skill}
                    <button onClick={() => removeSkill(skill)} className="ml-2 hover:text-destructive">
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Add a skill..."
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addSkill()}
                />
                <Button onClick={addSkill} size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Interview Rounds */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-base font-medium">Interview Rounds</Label>
                <Button onClick={addInterviewRound} size="sm" variant="outline" className="bg-transparent">
                  <Plus className="w-4 h-4 mr-1" />
                  Add Round
                </Button>
              </div>

              {interviewRounds.map((round, index) => (
                <Card key={round.id} className="p-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Round {index + 1}</h4>
                      {interviewRounds.length > 1 && (
                        <Button
                          onClick={() => removeInterviewRound(round.id)}
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>

                    <div className="space-y-3">
                      <div className="space-y-2">
                        <Label>Round Type</Label>
                        <Input
                          placeholder="e.g., Phone Screening, Technical Interview, System Design"
                          value={round.round}
                          onChange={(e) => updateInterviewRound(round.id, "round", e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea
                          placeholder="Describe what happened in this round, questions asked, format, etc."
                          value={round.description}
                          onChange={(e) => updateInterviewRound(round.id, "description", e.target.value)}
                          rows={3}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Tips & Advice</Label>
                        <Textarea
                          placeholder="Share your tips for this round - how to prepare, what to focus on, etc."
                          value={round.tips}
                          onChange={(e) => updateInterviewRound(round.id, "tips", e.target.value)}
                          rows={3}
                        />
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Overall Experience */}
            <div className="space-y-4">
              <Label className="text-base font-medium">Overall Experience & Tips</Label>
              <Textarea
                placeholder="Share your overall experience, preparation strategy, resources used, and general advice for future candidates..."
                rows={5}
              />
            </div>

            <div className="flex gap-3">
              <Button className="flex-1">Share Experience</Button>
              <Button variant="outline" className="bg-transparent">
                Save as Draft
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Previously Shared Experiences */}
        <Card>
          <CardHeader>
            <CardTitle>Community Experiences</CardTitle>
            <CardDescription>Recent placement experiences shared by alumni</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {sharedExperiences.map((experience) => (
              <div key={experience.id} className="p-4 rounded-lg border bg-card/50">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Building className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{experience.company}</h4>
                      <p className="text-sm text-muted-foreground">{experience.role}</p>
                    </div>
                  </div>
                  <Badge
                    variant={
                      experience.difficulty === "Hard"
                        ? "destructive"
                        : experience.difficulty === "Medium"
                          ? "default"
                          : "secondary"
                    }
                    className="text-xs"
                  >
                    {experience.difficulty}
                  </Badge>
                </div>

                <div className="flex flex-wrap gap-1 mb-3">
                  {experience.rounds.map((round) => (
                    <Badge key={round} variant="outline" className="text-xs">
                      {round}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <span>by {experience.author}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {experience.timeAgo}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      {experience.upvotes}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {experience.comments}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
