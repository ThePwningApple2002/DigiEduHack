"use client"

import { CourseCard } from "../course-card"
import { StreakCounter } from "../streak-counter"

interface CoursesViewProps {
  onSelectCourse: (courseId: number) => void
}

export function CoursesView({ onSelectCourse }: CoursesViewProps) {
  const courses = [
    {
      id: 1,
      title: "AI Engineering Fundamentals",
      description: "Master the core concepts of modern AI systems and machine learning",
      category: "AI",
      progress: 65,
      lessons: 12,
      completedLessons: 8,
      image: "/ai-engineering-course.jpg",
      color: "from-purple-500 to-pink-500",
    },
    {
      id: 2,
      title: "Data Analytics Essentials",
      description: "Learn to extract insights from data using modern analytics tools",
      category: "Data",
      progress: 42,
      lessons: 10,
      completedLessons: 4,
      image: "/data-analytics-dashboard.png",
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: 3,
      title: "Full-Stack Web Development",
      description: "Build modern web applications from frontend to backend",
      category: "Web",
      progress: 88,
      lessons: 15,
      completedLessons: 13,
      image: "/web-development-code.png",
      color: "from-green-500 to-emerald-500",
    },
    {
      id: 4,
      title: "Advanced Prompt Engineering",
      description: "Craft effective prompts to maximize AI model capabilities",
      category: "AI",
      progress: 23,
      lessons: 8,
      completedLessons: 2,
      image: "/prompt-engineering-concept.png",
      color: "from-orange-500 to-red-500",
    },
  ]

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-50">Your Courses</h2>
          <p className="text-slate-400 mt-1">Continue learning from where you left off</p>
        </div>
        <StreakCounter />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {courses.map((course) => (
          <div key={course.id} onClick={() => onSelectCourse(course.id)}>
            <CourseCard {...course} />
          </div>
        ))}
      </div>
    </div>
  )
}
