"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Zap, Sparkles } from "lucide-react"

interface ExerciseCardProps {
  id: number
  title: string
  difficulty: string
  topic: string
  estimatedTime: string
  xp: number
  recommended: boolean
  description: string
  tags: string[]
}

export function ExerciseCard({
  title,
  difficulty,
  topic,
  estimatedTime,
  xp,
  recommended,
  description,
  tags,
}: ExerciseCardProps) {
  const difficultyColor = {
    Beginner: "bg-green-500/10 text-green-400",
    Intermediate: "bg-blue-500/10 text-blue-400",
    Advanced: "bg-red-500/10 text-red-400",
  }

  return (
    <Card className="bg-slate-900 hover:border-blue-500/50 transition-all duration-300 overflow-hidden group border-slate-800">
      {recommended && (
        <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-b border-yellow-500/30 px-4 py-2 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-yellow-400" />
          <span className="text-xs font-semibold text-yellow-300">AI-Recommended for Your Level</span>
        </div>
      )}
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-lg font-bold text-slate-50 group-hover:text-blue-400 transition-colors">{title}</h3>
          <p className="text-sm text-slate-400 mt-2">{description}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="bg-slate-800 text-slate-300 text-xs border-slate-700">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-3 pt-2">
          <div className="bg-slate-800 rounded-lg p-3 text-center border border-slate-700">
            <div className="text-xs text-slate-400">Difficulty</div>
            <div className={`text-sm font-bold mt-1 ${difficultyColor[difficulty as keyof typeof difficultyColor]}`}>
              {difficulty}
            </div>
          </div>
          <div className="bg-slate-800 rounded-lg p-3 text-center flex flex-col items-center justify-center border border-slate-700">
            <Clock className="w-4 h-4 text-slate-400 mb-1" />
            <div className="text-xs text-slate-400">{estimatedTime}</div>
          </div>
          <div className="bg-slate-800 rounded-lg p-3 text-center flex flex-col items-center justify-center border border-slate-700">
            <Zap className="w-4 h-4 text-yellow-400 mb-1" />
            <div className="text-xs text-yellow-400 font-bold">+{xp} XP</div>
          </div>
        </div>

        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/30">
          Start Exercise
        </Button>
      </div>
    </Card>
  )
}
