"use client"

import { Card } from "@/components/ui/card"
import { Flame } from "lucide-react"

export function StreakCounter() {
  return (
    <Card className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-500/20 px-6 py-4 w-fit">
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg blur-md opacity-50"></div>
          <div className="relative bg-slate-900 p-3 rounded-lg">
            <Flame className="w-8 h-8 text-orange-500 fill-orange-500" />
          </div>
        </div>
        <div>
          <p className="text-sm text-slate-400">Learning Streak</p>
          <p className="text-3xl font-bold text-slate-50">18 days</p>
          <p className="text-xs text-orange-400 mt-1">Keep it going! 🚀</p>
        </div>
      </div>
    </Card>
  )
}
