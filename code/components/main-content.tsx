"use client"

import { CoursesView } from "./views/courses-view"
import { CourseDetailView } from "./views/course-detail-view"
import { ExercisesView } from "./views/exercises-view"
import { ProgressView } from "./views/progress-view"
import { ProfileView } from "./views/profile-view"
import { SettingsView } from "./views/settings-view"

interface MainContentProps {
  activeView: string
  selectedCourseId: number | null
  onSelectCourse: (courseId: number | null) => void
}

export function MainContent({ activeView, selectedCourseId, onSelectCourse }: MainContentProps) {
  if (activeView === "courses" && selectedCourseId !== null) {
    return (
      <main className="flex-1 overflow-y-auto bg-slate-950">
        <CourseDetailView courseId={selectedCourseId} onBack={() => onSelectCourse(null)} />
      </main>
    )
  }

  const renderView = () => {
    switch (activeView) {
      case "courses":
        return <CoursesView onSelectCourse={onSelectCourse} />
      case "exercises":
        return <ExercisesView />
      case "progress":
        return <ProgressView />
      case "profile":
        return <ProfileView />
      case "settings":
        return <SettingsView />
      default:
        return <CoursesView onSelectCourse={onSelectCourse} />
    }
  }

  return <main className="flex-1 overflow-y-auto bg-slate-950">{renderView()}</main>
}
