"use client"

import { useState, useRef, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, Send, MessageCircle, Settings } from "lucide-react"
import { ChatbotSettings } from "./chatbot-settings"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

interface ChatbotSettingsType {
  difficulty: "beginner" | "intermediate" | "advanced"
  focusArea: string
  exerciseFrequency: "low" | "medium" | "high"
  feedbackStyle: "detailed" | "concise" | "interactive"
  enablePracticeProblems: boolean
  enableQuizzes: boolean
  enableCodeReview: boolean
  personalizationLevel: "minimal" | "standard" | "maximum"
}

interface ChatAssistantProps {
  onClose: () => void
  courseId?: number
  courseName?: string
}

export function ChatAssistant({ onClose, courseId = 0, courseName = "General Learning" }: ChatAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [settings, setSettings] = useState<ChatbotSettingsType | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (courseId > 0) {
      const savedSettings = localStorage.getItem(`chatbot-settings-${courseId}`)
      if (savedSettings) {
        setSettings(JSON.parse(savedSettings))
      } else {
        setSettings({
          difficulty: "intermediate",
          focusArea: "All topics",
          exerciseFrequency: "medium",
          feedbackStyle: "detailed",
          enablePracticeProblems: true,
          enableQuizzes: true,
          enableCodeReview: false,
          personalizationLevel: "standard",
        })
      }
    }

    const initialMessage: Message = {
      id: "1",
      role: "assistant",
      content:
        courseId > 0
          ? `Hi! I'm your AI learning assistant for ${courseName}. Based on your current settings (${settings?.difficulty || "intermediate"} level, ${settings?.feedbackStyle || "detailed"} feedback), I'm ready to help you master this course. What would you like to learn?`
          : "Hi! I'm your AI learning assistant. I can help you understand concepts, provide personalized exercises, track your progress, and answer your questions about AI engineering, data analytics, and web development. What would you like to learn today?",
      timestamp: new Date(),
    }
    setMessages([initialMessage])
  }, [courseId, courseName])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: generateContextualResponse(input, settings, courseName),
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1000)
  }

  const generateContextualResponse = (
    userInput: string,
    currentSettings: ChatbotSettingsType | null,
    course: string,
  ): string => {
    const lowerInput = userInput.toLowerCase()
    const difficulty = currentSettings?.difficulty || "intermediate"
    const feedbackStyle = currentSettings?.feedbackStyle || "detailed"
    const enablePractice = currentSettings?.enablePracticeProblems

    const contextualResponses: { [key: string]: { [key: string]: string } } = {
      ai: {
        beginner: `Great question! In ${course}, let's start with the basics of AI. AI (Artificial Intelligence) enables machines to learn and make decisions. ${feedbackStyle === "detailed" ? "Think of it like teaching a computer to recognize patterns, just like you learn from examples." : "It's about computers learning from data."}${enablePractice ? " Ready for a beginner practice problem?" : ""}`,
        intermediate: `Excellent! AI engineering involves designing and building intelligent systems. For your ${course} journey at intermediate level, focus on how machine learning models process data and make predictions. Would you like to dive deeper into model architecture or optimization techniques?`,
        advanced: `In ${course} at the advanced level, let's explore cutting-edge AI paradigms. We can discuss transformer architectures, fine-tuning strategies, and inference optimization. What specific aspect interests you most?`,
      },
      data: {
        beginner: `Perfect question for starting your ${course} journey! Data analytics means extracting meaningful patterns from datasets. ${feedbackStyle === "detailed" ? "Start by learning how to collect, clean, and visualize data." : "Focus on SQL and visualization basics."}`,
        intermediate: `For intermediate data analytics in ${course}, you should understand statistical methods, data modeling, and BI tools. ${currentSettings?.enableQuizzes ? "I can create a quiz to test your understanding!" : "What aspect would you like to explore?"}`,
        advanced: `At the advanced level for ${course}, let's discuss distributed computing, real-time analytics, and predictive modeling. Which challenges are you facing?`,
      },
      web: {
        beginner: `Starting ${course}! Web development combines frontend and backend technologies. ${feedbackStyle === "detailed" ? "Begin with HTML/CSS for structure and styling, then learn JavaScript for interactivity." : "Learn HTML, CSS, and JavaScript basics."}`,
        intermediate: `For intermediate ${course}, master frameworks like React for frontend and Node.js for backend. ${enablePractice ? "I can suggest a full-stack project to build!" : "What would you like to focus on?"}`,
        advanced: `Advanced ${course} topics include system design, performance optimization, and DevOps practices. Let's discuss your specific goals.`,
      },
      exercise: {
        low: `I have some great exercises for ${course}. Since you prefer fewer recommendations, I'll suggest one targeted ${difficulty}-level exercise focused on ${currentSettings?.focusArea || "core concepts"}.`,
        medium: `Perfect timing for exercises in ${course}! I'll suggest 2-3 ${difficulty}-level problems that align with your focus on ${currentSettings?.focusArea || "all topics"}. Ready?`,
        high: `Excellent! In ${course}, I'll generate multiple ${difficulty}-level exercises across different topics. With your preference for high-frequency exercises, let's keep the momentum going!`,
      },
      progress: `Here's your ${course} progress summary with ${currentSettings?.personalizationLevel || "standard"} personalization: You're making solid progress! Your focus area (${currentSettings?.focusArea || "all topics"}) is developing well. ${currentSettings?.enableCodeReview ? "I can also review your code for improvements." : "Keep practicing with the suggested exercises!"}`,
      settings: `I see you're interested in adjusting your learning preferences for ${course}. You can customize your difficulty level, feedback style, exercise frequency, and more. This helps me tailor recommendations specifically to your needs!`,
    }

    for (const [key, responses] of Object.entries(contextualResponses)) {
      if (lowerInput.includes(key)) {
        if (typeof responses === "object" && difficulty in responses) {
          return responses[difficulty]
        }
        if (typeof responses === "object" && currentSettings?.exerciseFrequency in responses) {
          return responses[currentSettings.exerciseFrequency]
        }
        return Object.values(responses)[0] || ""
      }
    }

    return `That's a great question about ${course}! Based on your ${difficulty}-level preference and ${feedbackStyle} feedback style, let me help you understand this better. ${currentSettings?.personalizationLevel === "maximum" ? "I've analyzed your learning pattern and recommend focusing on practice problems." : "What specific aspect would you like to explore?"}`
  }

  const handleSaveSettings = (newSettings: ChatbotSettingsType) => {
    setSettings(newSettings)
  }

  return (
    <>
      <Card className="fixed bottom-24 right-6 w-96 h-96 bg-slate-900 border-blue-500/30 shadow-2xl shadow-blue-600/20 flex flex-col z-50">
        <div className="flex items-center justify-between p-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/50">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-50">AI Learning Assistant</h3>
              <p className="text-xs text-green-400">Online</p>
            </div>
          </div>
          <div className="flex gap-2">
            {courseId > 0 && (
              <button
                onClick={() => setShowSettings(true)}
                className="text-slate-400 hover:text-slate-200 transition-colors"
                title="Chatbot Settings"
              >
                <Settings className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-200 transition-colors"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
                  message.role === "user"
                    ? "bg-gradient-to-r from-blue-600 to-blue-600 text-white rounded-br-none shadow-lg shadow-blue-600/30"
                    : "bg-slate-800 text-slate-50 rounded-bl-none"
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-slate-800 text-slate-200 px-4 py-2 rounded-lg rounded-bl-none">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t border-slate-800 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Ask me anything..."
            className="flex-1 bg-slate-800 text-slate-50 rounded-lg px-3 py-2 text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-slate-700"
            disabled={isLoading}
          />
          <Button
            onClick={handleSendMessage}
            disabled={isLoading || !input.trim()}
            className="bg-blue-600 hover:bg-blue-700 text-white p-2"
            size="icon"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </Card>

      {showSettings && settings && (
        <ChatbotSettings
          courseId={courseId}
          courseName={courseName}
          onClose={() => setShowSettings(false)}
          onSave={handleSaveSettings}
        />
      )}
    </>
  )
}
