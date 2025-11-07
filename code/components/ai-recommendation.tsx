"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Lightbulb } from "lucide-react"

export function AIRecommendation() {
  return (
    <Card className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border-blue-500/30 overflow-hidden">
      <div className="p-6 flex items-start gap-4">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg blur-md opacity-50"></div>
          <div className="relative bg-slate-900 p-3 rounded-lg">
            <Lightbulb className="w-6 h-6 text-blue-400" />
          </div>
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-slate-50 text-lg">Personalized AI Recommendation</h3>
          <p className="text-sm text-slate-400 mt-2">
            Based on your progress, I recommend starting with{" "}
            <span className="text-blue-400 font-semibold">"Build Your First Neural Network"</span>. This intermediate
            exercise will strengthen your AI fundamentals and is expected to take 45 minutes. It will earn you 250 XP!
          </p>
          <div className="flex gap-3 mt-4">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/30">
              Start Recommended
            </Button>
            <Button variant="outline" className="border-blue-500/30 text-slate-200 hover:bg-blue-500/10 bg-transparent">
              See Alternatives
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}
