"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User, Mail, MapPin } from "lucide-react"

export function ProfileView() {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-slate-50">Your Profile</h2>
        <p className="text-slate-400 mt-1">Manage your learning profile and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card className="bg-slate-900 p-6 text-center space-y-4 border-slate-800">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 mx-auto flex items-center justify-center shadow-lg shadow-blue-500/50">
              <User className="w-12 h-12 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-50">Alex Johnson</h3>
              <p className="text-sm text-slate-400">Learning Enthusiast</p>
            </div>
            <div className="bg-slate-800 rounded-lg p-3 space-y-2 border border-slate-700">
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Mail className="w-4 h-4" />
                <span className="text-xs truncate">alex@example.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <MapPin className="w-4 h-4" />
                <span className="text-xs">San Francisco, CA</span>
              </div>
            </div>
            <Button className="w-full bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/30">Edit Profile</Button>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-slate-900 p-6 space-y-4 border-slate-800">
            <h3 className="text-lg font-bold text-slate-50">Learning Preferences</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                <p className="text-sm text-slate-400 mb-2">Preferred Difficulty</p>
                <select className="w-full bg-slate-900 text-slate-50 rounded-lg px-3 py-2 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Intermediate</option>
                  <option>Beginner</option>
                  <option>Advanced</option>
                </select>
              </div>
              <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                <p className="text-sm text-slate-400 mb-2">Daily Learning Goal</p>
                <select className="w-full bg-slate-900 text-slate-50 rounded-lg px-3 py-2 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>60 minutes</option>
                  <option>30 minutes</option>
                  <option>90 minutes</option>
                </select>
              </div>
            </div>
          </Card>

          <Card className="bg-slate-900 p-6 space-y-4 border-slate-800">
            <h3 className="text-lg font-bold text-slate-50">Your Achievements</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: "🚀", label: "Quick Starter" },
                { icon: "⭐", label: "Top Performer" },
                { icon: "🔥", label: "On Fire" },
                { icon: "🎓", label: "Knowledge Seeker" },
              ].map((badge) => (
                <div key={badge.label} className="bg-slate-800 rounded-lg p-3 text-center border border-slate-700">
                  <div className="text-2xl mb-1">{badge.icon}</div>
                  <p className="text-xs font-semibold text-slate-400">{badge.label}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
