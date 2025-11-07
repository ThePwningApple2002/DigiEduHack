"use client"

import { Card } from "@/components/ui/card"
import { ArrowUpRight } from "lucide-react"

interface StatCardProps {
  label: string
  value: string
  trend: string
  color: string
}

export function StatCard({ label, value, trend, color }: StatCardProps) {
  const colorGradients = {
    blue: "from-blue-500 to-cyan-500",
    purple: "from-purple-500 to-pink-500",
    orange: "from-orange-500 to-red-500",
    green: "from-green-500 to-emerald-500",
  }

  return (
    <Card className="bg-slate-900 p-6 space-y-3 border-slate-800">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm text-slate-400">{label}</p>
          <p className="text-3xl font-bold text-slate-50">{value}</p>
        </div>
        <div
          className={`w-10 h-10 rounded-lg bg-gradient-to-br ${colorGradients[color as keyof typeof colorGradients]} opacity-20`}
        ></div>
      </div>
      <div className="flex items-center gap-1 text-xs text-green-400">
        <ArrowUpRight className="w-3 h-3" />
        {trend}
      </div>
    </Card>
  )
}
