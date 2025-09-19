"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { DynamicAvatar } from "@/components/ui/dynamic-avatar"

export default function AlumniForumPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedQuestion, setSelectedQuestion] = useState(null)
  const [newAnswer, setNewAnswer] = useState("")

  const questions = [
    {
      id: 1,
      title: "How to prepare for system design interviews at FAANG companies?",
      content: "I'm a final year student preparing for interviews at top tech companies. What are the key topics I should focus on for system design rounds?",
      author: {
        name: "Alex Johnson",
        role: "student",
        year: "2024",
      },
      tags: ["system-design", "interviews", "career"],
      votes: 24,
      views: 156,
      timeAgo: "2 days ago",
      isAnswered: true,
      isTrending: true,
      answers: [
        {
          id: 1,
          content: "Great question! For system design interviews, focus on these key areas: 1) Scalability patterns (load balancing, caching, sharding), 2) Database design and optimization, 3) Microservices architecture, 4) Real-time systems, and 5) Security considerations.",
          author: {
            name: "Sarah Chen",
            role: "alumni",
            company: "Google",
            position: "Senior Software Engineer",
          },
          timeAgo: "1 day ago",
          votes: 12,
          isAccepted: true,
        },
      ],
    },
    {
      id: 2,
      title: "Best state management solution for large React applications?",
      content: "We're building a complex React app and need to choose between Redux, Context API, and Zustand. What would you recommend for a team of 10+ developers?",
      author: {
        name: "Priya Patel",
        role: "student",
        year: "2024",
      },
      tags: ["react", "state-management", "frontend"],
      votes: 18,
      views: 203,
      timeAgo: "3 days ago",
      isAnswered: false,
      isTrending: false,
      answers: [
        {
          id: 3,
          content: "For large applications, I'd recommend Redux Toolkit with RTK Query. It provides excellent DevTools, predictable state updates, and great TypeScript support.",
          author: {
            name: "Emily Johnson",
            role: "alumni",
            company: "Apple",
            position: "iOS Developer",
          },
          timeAgo: "2 days ago",
          votes: 8,
          isAccepted: false,
        },
      ],
    },
  ]

  const handleAnswerSubmit = (questionId) => {
    if (newAnswer.trim()) {
      console.log("Submitting answer for question:", questionId, "Answer:", newAnswer)
      setNewAnswer("")
      setSelectedQuestion(null)
      alert("Answer submitted successfully!")
    }
  }

  const renderQuestionCard = (question) => (
    <div key={question.id} className="bg-white rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="font-bold text-lg hover:text-blue-600 cursor-pointer mb-2">
            {question.title}
            {question.isTrending && <span className="ml-2 text-orange-500">🔥</span>}
            {question.isAnswered && <span className="ml-2 text-green-500">✓</span>}
          </h3>
          <p className="text-gray-600 mb-3">{question.content}</p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {question.tags.map((tag) => (
              <span key={tag} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                #{tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-4">
              <span>👤 {question.author.name}</span>
              <span>👁️ {question.views} views</span>
              <span>⏰ {question.timeAgo}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>👍 {question.votes}</span>
              <span>💬 {question.answers.length} answers</span>
            </div>
          </div>
        </div>
      </div>

      {/* Answers Section */}
      {question.answers.length > 0 && (
        <div className="mt-4 border-t pt-4">
          <h4 className="font-semibold mb-3">Answers ({question.answers.length})</h4>
          {question.answers.map((answer) => (
            <div key={answer.id} className="bg-gray-50 rounded-lg p-4 mb-3">
              <p className="text-sm text-gray-700 mb-3">{answer.content}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <DynamicAvatar 
                    name={answer.author.name} 
                    size="small"
                    className="w-6 h-6"
                  />
                  <div>
                    <div className="font-semibold text-xs">{answer.author.name}</div>
                    <div className="text-xs text-gray-500">
                      {answer.author.position} at {answer.author.company}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {answer.isAccepted && (
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                      ✓ Accepted
                    </span>
                  )}
                  <span className="text-xs text-gray-500">{answer.timeAgo}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Answer Form */}
      {selectedQuestion === question.id && (
        <div className="mt-4 border-t pt-4">
          <h4 className="font-semibold mb-3">Add Your Answer</h4>
          <textarea
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
            placeholder="Share your knowledge and help fellow students..."
            className="w-full p-3 border border-gray-300 rounded-lg mb-3 resize-none"
            rows={4}
          />
          <div className="flex gap-2">
            <button
              onClick={() => handleAnswerSubmit(question.id)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Submit Answer
            </button>
            <button
              onClick={() => setSelectedQuestion(null)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Answer Button */}
      {selectedQuestion !== question.id && (
        <div className="mt-4 border-t pt-4">
          <button
            onClick={() => setSelectedQuestion(question.id)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Answer This Question
          </button>
        </div>
      )}
    </div>
  )

  return (
    <DashboardLayout userRole="alumni" title="Q&A Forum">
      <div className="space-y-8">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Q&A Forum</h1>
              <p className="text-indigo-100 text-lg">
                Help students by answering their questions
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{questions.length}</div>
              <div className="text-indigo-100">Questions</div>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Search
            </button>
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-6">
          {questions.map(renderQuestionCard)}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                <span className="text-indigo-600 font-bold">💬</span>
              </div>
              <div>
                <div className="text-2xl font-bold">{questions.length}</div>
                <div className="text-sm text-gray-600">Total Questions</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-green-600 font-bold">✓</span>
              </div>
              <div>
                <div className="text-2xl font-bold">{questions.filter(q => q.isAnswered).length}</div>
                <div className="text-sm text-gray-600">Answered</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <span className="text-orange-600 font-bold">🔥</span>
              </div>
              <div>
                <div className="text-2xl font-bold">{questions.filter(q => q.isTrending).length}</div>
                <div className="text-sm text-gray-600">Trending</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-purple-600 font-bold">👥</span>
              </div>
              <div>
                <div className="text-2xl font-bold">{questions.reduce((sum, q) => sum + q.answers.length, 0)}</div>
                <div className="text-sm text-gray-600">Total Answers</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}