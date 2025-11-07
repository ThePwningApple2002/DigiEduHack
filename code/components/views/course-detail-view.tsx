"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, BookOpen, CheckCircle2, Clock, Users, MessageCircle } from "lucide-react"
import { ChatAssistant } from "../chat-assistant"

interface Lesson {
  id: number
  title: string
  duration: string
  completed: boolean
}

interface Module {
  id: number
  title: string
  lessons: Lesson[]
}

interface CourseData {
  id: number
  title: string
  description: string
  category: string
  progress: number
  lessons: number
  completedLessons: number
  image: string
  color: string
  instructor: string
  students: number
  modules: Module[]
}

// Course data mapping
const courseDatabase: Record<number, CourseData> = {
  1: {
    id: 1,
    title: "AI Engineering Fundamentals",
    description: "Master the core concepts of modern AI systems and machine learning",
    category: "AI",
    progress: 65,
    lessons: 12,
    completedLessons: 8,
    image: "/ai-engineering-course.jpg",
    color: "from-purple-500 to-pink-500",
    instructor: "Dr. Sarah Chen",
    students: 2345,
    modules: [
      {
        id: 1,
        title: "Introduction to AI",
        lessons: [
          { id: 1, title: "What is AI?", duration: "15 min", completed: true },
          { id: 2, title: "AI Applications", duration: "20 min", completed: true },
          { id: 3, title: "Future of AI", duration: "18 min", completed: true },
        ],
      },
      {
        id: 2,
        title: "Machine Learning Basics",
        lessons: [
          { id: 4, title: "Supervised Learning", duration: "25 min", completed: true },
          { id: 5, title: "Unsupervised Learning", duration: "22 min", completed: true },
          { id: 6, title: "Neural Networks", duration: "30 min", completed: false },
        ],
      },
      {
        id: 3,
        title: "Deep Learning",
        lessons: [
          { id: 7, title: "CNNs", duration: "28 min", completed: false },
          { id: 8, title: "RNNs and Transformers", duration: "32 min", completed: false },
          { id: 9, title: "Fine-tuning Models", duration: "25 min", completed: false },
        ],
      },
    ],
  },
  2: {
    id: 2,
    title: "Data Analytics Essentials",
    description: "Learn to extract insights from data using modern analytics tools",
    category: "Data",
    progress: 42,
    lessons: 10,
    completedLessons: 4,
    image: "/data-analytics-dashboard.png",
    color: "from-blue-500 to-cyan-500",
    instructor: "Mike Rodriguez",
    students: 1892,
    modules: [
      {
        id: 1,
        title: "Data Fundamentals",
        lessons: [
          { id: 1, title: "Data Types", duration: "15 min", completed: true },
          { id: 2, title: "Data Sources", duration: "20 min", completed: true },
          { id: 3, title: "Data Quality", duration: "18 min", completed: true },
        ],
      },
      {
        id: 2,
        title: "Analytics Tools",
        lessons: [
          { id: 4, title: "SQL Basics", duration: "25 min", completed: true },
          { id: 5, title: "Python for Data", duration: "30 min", completed: false },
          { id: 6, title: "BI Tools", duration: "22 min", completed: false },
        ],
      },
    ],
  },
  3: {
    id: 3,
    title: "Full-Stack Web Development",
    description: "Build modern web applications from frontend to backend",
    category: "Web",
    progress: 88,
    lessons: 15,
    completedLessons: 13,
    image: "/web-development-code.png",
    color: "from-green-500 to-emerald-500",
    instructor: "Alex Thompson",
    students: 3456,
    modules: [
      {
        id: 1,
        title: "Frontend Basics",
        lessons: [
          { id: 1, title: "HTML & CSS", duration: "20 min", completed: true },
          { id: 2, title: "JavaScript", duration: "25 min", completed: true },
          { id: 3, title: "React", duration: "30 min", completed: true },
        ],
      },
      {
        id: 2,
        title: "Backend Development",
        lessons: [
          { id: 4, title: "Node.js", duration: "25 min", completed: true },
          { id: 5, title: "Databases", duration: "28 min", completed: true },
          { id: 6, title: "APIs", duration: "22 min", completed: true },
        ],
      },
      {
        id: 3,
        title: "Deployment",
        lessons: [
          { id: 7, title: "Docker", duration: "25 min", completed: true },
          { id: 8, title: "Cloud Deployment", duration: "30 min", completed: true },
          { id: 9, title: "CI/CD", duration: "22 min", completed: false },
        ],
      },
    ],
  },
  4: {
    id: 4,
    title: "Advanced Prompt Engineering",
    description: "Craft effective prompts to maximize AI model capabilities",
    category: "AI",
    progress: 23,
    lessons: 8,
    completedLessons: 2,
    image: "/prompt-engineering-concept.png",
    color: "from-orange-500 to-red-500",
    instructor: "Emma Watson",
    students: 1567,
    modules: [
      {
        id: 1,
        title: "Prompt Basics",
        lessons: [
          { id: 1, title: "Anatomy of Prompts", duration: "15 min", completed: true },
          { id: 2, title: "Prompt Patterns", duration: "20 min", completed: true },
        ],
      },
      {
        id: 2,
        title: "Advanced Techniques",
        lessons: [
          { id: 3, title: "Chain-of-Thought", duration: "22 min", completed: false },
          { id: 4, title: "Few-Shot Learning", duration: "18 min", completed: false },
          { id: 5, title: "Prompt Optimization", duration: "25 min", completed: false },
        ],
      },
    ],
  },
}

interface CourseDetailViewProps {
  courseId: number
  onBack: () => void
}

export function CourseDetailView({ courseId, onBack }: CourseDetailViewProps) {
  const course = courseDatabase[courseId]
  const [showCourseChat, setShowCourseChat] = useState(false)

  if (!course) {
    return (
      <div className="p-8">
        <Button onClick={onBack} variant="outline" className="gap-2 bg-transparent">
          <ArrowLeft className="w-4 h-4" />
          Back to Courses
        </Button>
        <div className="mt-8 text-center text-slate-400">Course not found</div>
      </div>
    )
  }

  return (
    <div className="p-8 space-y-8 relative">
      {/* Header */}
      <div className="space-y-4">
        <Button
          onClick={onBack}
          variant="outline"
          className="gap-2 text-slate-300 border-slate-700 hover:bg-slate-800 bg-transparent"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Courses
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero */}
            <div className="relative h-64 rounded-xl overflow-hidden bg-slate-800">
              <div className={`absolute inset-0 bg-gradient-to-br ${course.color} opacity-30`}></div>
              <img
                src={course.image || "/placeholder.svg?height=256&width=800&query=course+hero"}
                alt={course.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Course Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-500/10 text-blue-400">
                  {course.category}
                </span>
              </div>
              <h1 className="text-4xl font-bold text-slate-50">{course.title}</h1>
              <p className="text-lg text-slate-400">{course.description}</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <Card className="p-4 bg-slate-900 border-slate-800">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-4 h-4 text-blue-400" />
                  <span className="text-sm text-slate-400">Students</span>
                </div>
                <p className="text-2xl font-bold text-slate-50">{course.students.toLocaleString()}</p>
              </Card>
              <Card className="p-4 bg-slate-900 border-slate-800">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-slate-400">Lessons</span>
                </div>
                <p className="text-2xl font-bold text-slate-50">{course.lessons}</p>
              </Card>
              <Card className="p-4 bg-slate-900 border-slate-800">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-400" />
                  <span className="text-sm text-slate-400">Progress</span>
                </div>
                <p className="text-2xl font-bold text-slate-50">{course.progress}%</p>
              </Card>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400">Overall Progress</span>
                <span className="font-semibold text-blue-400">
                  {course.completedLessons}/{course.lessons} lessons completed
                </span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 h-3 rounded-full transition-all duration-300 shadow-lg shadow-blue-500/50"
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
            </div>

            {/* Modules */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-50">Course Modules</h2>
              <div className="space-y-4">
                {course.modules.map((module) => (
                  <Card
                    key={module.id}
                    className="bg-slate-900 border-slate-800 overflow-hidden hover:border-slate-700 transition-colors"
                  >
                    <div className="p-4 space-y-3">
                      <h3 className="font-bold text-slate-50 text-lg">{module.title}</h3>
                      <div className="space-y-2">
                        {module.lessons.map((lesson) => (
                          <div
                            key={lesson.id}
                            className="flex items-center justify-between p-3 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer group"
                          >
                            <div className="flex items-center gap-3 flex-1">
                              {lesson.completed ? (
                                <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                              ) : (
                                <div className="w-5 h-5 rounded-full border-2 border-slate-600 group-hover:border-blue-400 transition-colors flex-shrink-0" />
                              )}
                              <span className={lesson.completed ? "text-slate-400 line-through" : "text-slate-50"}>
                                {lesson.title}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-slate-400">
                              <Clock className="w-4 h-4" />
                              {lesson.duration}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-slate-900 border-slate-800 p-6 sticky top-8 space-y-4">
              <h3 className="font-bold text-slate-50 text-lg">Course Details</h3>

              <div className="space-y-4 border-t border-slate-800 pt-4">
                <div>
                  <p className="text-sm text-slate-400 mb-1">Instructor</p>
                  <p className="text-slate-50 font-semibold">{course.instructor}</p>
                </div>

                <div>
                  <p className="text-sm text-slate-400 mb-2">Next Lesson</p>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Continue Learning</Button>
                </div>

                <div>
                  <p className="text-sm text-slate-400 mb-2">AI Assistant</p>
                  <Button
                    onClick={() => setShowCourseChat(true)}
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Customize AI Assistant
                  </Button>
                </div>

                <div className="p-3 rounded-lg bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20">
                  <p className="text-sm text-slate-400 mb-1">Time to Complete</p>
                  <p className="text-slate-50 font-semibold">Est. 2 hours</p>
                </div>

                <div className="p-3 rounded-lg bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20">
                  <p className="text-sm text-slate-400 mb-1">Difficulty</p>
                  <p className="text-slate-50 font-semibold">Intermediate</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {showCourseChat && (
        <ChatAssistant onClose={() => setShowCourseChat(false)} courseId={courseId} courseName={course.title} />
      )}
    </div>
  )
}
