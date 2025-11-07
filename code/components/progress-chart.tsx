"use client"

import { Card } from "@/components/ui/card"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts"

export function ProgressChart() {
  const weeklyData = [
    { week: "Week 1", ai: 45, data: 30, web: 60 },
    { week: "Week 2", ai: 52, data: 38, web: 68 },
    { week: "Week 3", ai: 60, data: 42, web: 75 },
    { week: "Week 4", ai: 65, data: 42, web: 88 },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="bg-slate-900 p-6 border-slate-800">
        <h3 className="text-lg font-bold text-slate-50 mb-4">Course Progress Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
            <XAxis dataKey="week" stroke="rgba(148,163,184,0.5)" />
            <YAxis stroke="rgba(148,163,184,0.5)" />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(15,23,42,0.95)",
                border: "1px solid rgba(71,85,105,0.5)",
                borderRadius: "8px",
                color: "rgb(226,232,240)",
              }}
            />
            <Legend />
            <Line type="monotone" dataKey="ai" stroke="#a78bfa" strokeWidth={2} name="AI Engineering" />
            <Line type="monotone" dataKey="data" stroke="#60a5fa" strokeWidth={2} name="Data Analytics" />
            <Line type="monotone" dataKey="web" stroke="#34d399" strokeWidth={2} name="Web Development" />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <Card className="bg-slate-900 p-6 border-slate-800">
        <h3 className="text-lg font-bold text-slate-50 mb-4">XP Earned by Course</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
            <XAxis dataKey="week" stroke="rgba(148,163,184,0.5)" />
            <YAxis stroke="rgba(148,163,184,0.5)" />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(15,23,42,0.95)",
                border: "1px solid rgba(71,85,105,0.5)",
                borderRadius: "8px",
                color: "rgb(226,232,240)",
              }}
            />
            <Legend />
            <Bar dataKey="ai" fill="#a78bfa" name="AI Engineering" />
            <Bar dataKey="data" fill="#60a5fa" name="Data Analytics" />
            <Bar dataKey="web" fill="#34d399" name="Web Development" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  )
}
