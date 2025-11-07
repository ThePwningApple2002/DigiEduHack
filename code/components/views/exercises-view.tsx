"use client"

import { ExerciseCard } from "../exercise-card"
import { AIRecommendation } from "../ai-recommendation"

export function ExercisesView() {
  const exercises = [
    {
      id: 1,
      title: "Build Your First Neural Network",
      difficulty: "Intermediate",
      topic: "AI Engineering",
      estimatedTime: "45 min",
      xp: 250,
      recommended: true,
      description: "Create a simple neural network from scratch to understand how AI models learn.",
      tags: ["Neural Networks", "Python", "Machine Learning"],
    },
    {
      id: 2,
      title: "SQL Aggregation Queries",
      difficulty: "Beginner",
      topic: "Data Analytics",
      estimatedTime: "30 min",
      xp: 150,
      recommended: false,
      description: "Master GROUP BY, HAVING, and aggregate functions in SQL.",
      tags: ["SQL", "Database", "Aggregation"],
    },
    {
      id: 3,
      title: "Deploy Your First Web App",
      difficulty: "Intermediate",
      topic: "Web Development",
      estimatedTime: "60 min",
      xp: 300,
      recommended: true,
      description: "Deploy a full-stack application to production using modern DevOps practices.",
      tags: ["Deployment", "DevOps", "Production"],
    },
  ]

  return (
    <div className="p-8 space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-slate-50">Practice Exercises</h2>
        <p className="text-slate-400 mt-1">AI-generated exercises tailored to your skill level</p>
      </div>

      <AIRecommendation />

      <div className="space-y-4">
        <h3 className="text-xl font-bold text-slate-50">Available Exercises</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {exercises.map((exercise) => (
            <ExerciseCard key={exercise.id} {...exercise} />
          ))}
        </div>
      </div>
    </div>
  )
}
