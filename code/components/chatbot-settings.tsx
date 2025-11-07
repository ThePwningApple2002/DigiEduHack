"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, Settings } from "lucide-react"

interface ChatbotSettings {
  difficulty: "beginner" | "intermediate" | "advanced"
  focusArea: string
  exerciseFrequency: "low" | "medium" | "high"
  feedbackStyle: "detailed" | "concise" | "interactive"
  enablePracticeProblems: boolean
  enableQuizzes: boolean
  enableCodeReview: boolean
  personalizationLevel: "minimal" | "standard" | "maximum"
}

interface ChatbotSettingsProps {
  courseId: number
  courseName: string
  onClose: () => void
  onSave: (settings: ChatbotSettings) => void
}

export function ChatbotSettings({ courseId, courseName, onClose, onSave }: ChatbotSettingsProps) {
  const [settings, setSettings] = useState<ChatbotSettings>({
    difficulty: "intermediate",
    focusArea: "All topics",
    exerciseFrequency: "medium",
    feedbackStyle: "detailed",
    enablePracticeProblems: true,
    enableQuizzes: true,
    enableCodeReview: false,
    personalizationLevel: "standard",
  })

  const handleSave = () => {
    localStorage.setItem(`chatbot-settings-${courseId}`, JSON.stringify(settings))
    onSave(settings)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <Card className="w-full max-w-2xl bg-slate-900 border-slate-800 max-h-96 overflow-y-auto">
        <div className="p-6 border-b border-slate-800 flex items-center justify-between sticky top-0 bg-slate-900">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-blue-400" />
            <h2 className="text-xl font-bold text-slate-50">AI Chatbot Settings - {courseName}</h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-200 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Difficulty Level */}
          <div>
            <label className="block text-sm font-semibold text-slate-200 mb-3">Learning Difficulty</label>
            <div className="grid grid-cols-3 gap-3">
              {(["beginner", "intermediate", "advanced"] as const).map((level) => (
                <button
                  key={level}
                  onClick={() => setSettings({ ...settings, difficulty: level })}
                  className={`p-3 rounded-lg border-2 transition-all text-sm font-semibold capitalize ${
                    settings.difficulty === level
                      ? "border-blue-500 bg-blue-500/10 text-blue-300"
                      : "border-slate-700 bg-slate-800 text-slate-300 hover:border-slate-600"
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Focus Area */}
          <div>
            <label className="block text-sm font-semibold text-slate-200 mb-3">Focus Area</label>
            <select
              value={settings.focusArea}
              onChange={(e) => setSettings({ ...settings, focusArea: e.target.value })}
              className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-50 focus:outline-none focus:border-blue-500"
            >
              <option>All topics</option>
              <option>Core concepts</option>
              <option>Practical applications</option>
              <option>Advanced techniques</option>
              <option>Problem-solving</option>
            </select>
          </div>

          {/* Exercise Frequency */}
          <div>
            <label className="block text-sm font-semibold text-slate-200 mb-3">Exercise Recommendation Frequency</label>
            <div className="grid grid-cols-3 gap-3">
              {(["low", "medium", "high"] as const).map((freq) => (
                <button
                  key={freq}
                  onClick={() => setSettings({ ...settings, exerciseFrequency: freq })}
                  className={`p-3 rounded-lg border-2 transition-all text-sm font-semibold capitalize ${
                    settings.exerciseFrequency === freq
                      ? "border-purple-500 bg-purple-500/10 text-purple-300"
                      : "border-slate-700 bg-slate-800 text-slate-300 hover:border-slate-600"
                  }`}
                >
                  {freq}
                </button>
              ))}
            </div>
          </div>

          {/* Feedback Style */}
          <div>
            <label className="block text-sm font-semibold text-slate-200 mb-3">Feedback Style</label>
            <div className="grid grid-cols-3 gap-3">
              {(["detailed", "concise", "interactive"] as const).map((style) => (
                <button
                  key={style}
                  onClick={() => setSettings({ ...settings, feedbackStyle: style })}
                  className={`p-3 rounded-lg border-2 transition-all text-sm font-semibold capitalize ${
                    settings.feedbackStyle === style
                      ? "border-green-500 bg-green-500/10 text-green-300"
                      : "border-slate-700 bg-slate-800 text-slate-300 hover:border-slate-600"
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>

          {/* Personalization Level */}
          <div>
            <label className="block text-sm font-semibold text-slate-200 mb-3">Personalization Level</label>
            <div className="grid grid-cols-3 gap-3">
              {(["minimal", "standard", "maximum"] as const).map((level) => (
                <button
                  key={level}
                  onClick={() => setSettings({ ...settings, personalizationLevel: level })}
                  className={`p-3 rounded-lg border-2 transition-all text-sm font-semibold capitalize ${
                    settings.personalizationLevel === level
                      ? "border-orange-500 bg-orange-500/10 text-orange-300"
                      : "border-slate-700 bg-slate-800 text-slate-300 hover:border-slate-600"
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Feature Toggles */}
          <div>
            <label className="block text-sm font-semibold text-slate-200 mb-3">AI Features</label>
            <div className="space-y-3">
              {[
                { key: "enablePracticeProblems", label: "Practice Problems Generation" },
                { key: "enableQuizzes", label: "Interactive Quizzes" },
                { key: "enableCodeReview", label: "Code Review & Analysis" },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() =>
                    setSettings({
                      ...settings,
                      [key]: !settings[key as keyof ChatbotSettings],
                    })
                  }
                  className={`w-full flex items-center gap-3 p-3 rounded-lg border-2 transition-all text-left ${
                    settings[key as keyof ChatbotSettings]
                      ? "border-blue-500 bg-blue-500/10"
                      : "border-slate-700 bg-slate-800 hover:border-slate-600"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                      settings[key as keyof ChatbotSettings] ? "border-blue-400 bg-blue-500" : "border-slate-600"
                    }`}
                  >
                    {settings[key as keyof ChatbotSettings] && (
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        />
                      </svg>
                    )}
                  </div>
                  <span className={settings[key as keyof ChatbotSettings] ? "text-slate-50" : "text-slate-400"}>
                    {label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-slate-800">
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 border-slate-700 text-slate-300 hover:bg-slate-800 bg-transparent"
            >
              Cancel
            </Button>
            <Button onClick={handleSave} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
              Save Settings
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
