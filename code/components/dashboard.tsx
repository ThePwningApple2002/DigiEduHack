"use client"

import { useState } from "react"
import { Sidebar } from "./sidebar"
import { MainContent } from "./main-content"
import { ChatAssistant } from "./chat-assistant"

export function Dashboard() {
  const [activeView, setActiveView] = useState("courses")
  const [showChat, setShowChat] = useState(false)
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null)

  return (
    <div className="flex h-screen bg-slate-950 text-slate-50">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <MainContent activeView={activeView} selectedCourseId={selectedCourseId} onSelectCourse={setSelectedCourseId} />
        <button
          onClick={() => setShowChat(!showChat)}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white shadow-lg shadow-blue-600/50 flex items-center justify-center transition-all duration-200 z-40 hover:scale-110"
          aria-label="Open AI Chat Assistant"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </button>
        {showChat && <ChatAssistant onClose={() => setShowChat(false)} />}
      </div>
    </div>
  )
}
