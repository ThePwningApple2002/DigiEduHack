"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface CourseCardProps {
  id: number
  title: string
  description: string
  category: string
  progress: number
  lessons: number
  completedLessons: number
  image: string
  color: string
}

export function CourseCard({
  title,
  description,
  category,
  progress,
  lessons,
  completedLessons,
  image,
  color,
}: CourseCardProps) {
  return (
    <Card className="overflow-hidden hover:border-blue-500/50 transition-all duration-300 group cursor-pointer bg-slate-900 border-slate-800 h-full hover:shadow-xl hover:shadow-blue-500/10">
      <div className="relative h-40 overflow-hidden bg-slate-800">
        <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-20`}></div>
        <img
          src={image || "/placeholder.svg?height=160&width=400&query=course+thumbnail"}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-6 space-y-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-semibold px-2 py-1 rounded-full bg-blue-500/10 text-blue-400">
              {category}
            </span>
            <span className="text-xs text-slate-400">
              {completedLessons}/{lessons} lessons
            </span>
          </div>
          <h3 className="text-lg font-bold text-slate-50">{title}</h3>
          <p className="text-sm text-slate-400 mt-1">{description}</p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-400">Progress</span>
            <span className="font-semibold text-blue-400">{progress}%</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2.5">
            <div
              className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2.5 rounded-full transition-all duration-300 shadow-lg shadow-blue-500/50"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white group/btn shadow-lg shadow-blue-600/30">
          Continue Learning
          <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
        </Button>
      </div>
    </Card>
  )
}
