"use client"
import { ProgressChart } from "../progress-chart"
import { StatCard } from "../stat-card"

export function ProgressView() {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-slate-50">Your Learning Progress</h2>
        <p className="text-slate-400 mt-1">Track your growth and achievements</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard label="Total XP" value="4,250" trend="+350 this week" color="blue" />
        <StatCard label="Lessons Completed" value="27" trend="60% of total" color="purple" />
        <StatCard label="Current Streak" value="18 days" trend="+2 from last week" color="orange" />
        <StatCard label="Average Score" value="87%" trend="+5% improvement" color="green" />
      </div>

      <ProgressChart />
    </div>
  )
}
