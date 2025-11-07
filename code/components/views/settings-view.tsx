"use client"

import type React from "react"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bell, Moon, Lock, HelpCircle, LogOut } from "lucide-react"

export function SettingsView() {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-slate-50">Settings</h2>
        <p className="text-slate-400 mt-1">Customize your learning experience</p>
      </div>

      <div className="space-y-4 max-w-2xl">
        <SettingCard
          icon={<Bell className="w-5 h-5" />}
          title="Notifications"
          description="Manage your notification preferences"
          action={<Button variant="outline">Configure</Button>}
        />
        <SettingCard
          icon={<Moon className="w-5 h-5" />}
          title="Theme"
          description="Set your preferred color theme (Dark mode enabled)"
          action={<span className="text-sm text-blue-400 font-semibold">Dark</span>}
        />
        <SettingCard
          icon={<Lock className="w-5 h-5" />}
          title="Privacy & Security"
          description="Manage your account security and privacy settings"
          action={<Button variant="outline">Review</Button>}
        />
        <SettingCard
          icon={<HelpCircle className="w-5 h-5" />}
          title="Help & Support"
          description="Get help with your learning journey"
          action={<Button variant="outline">Contact</Button>}
        />
        <SettingCard
          icon={<LogOut className="w-5 h-5 text-red-400" />}
          title="Sign Out"
          description="Sign out of your account"
          action={
            <Button variant="outline" className="text-red-400 border-red-400/30 hover:bg-red-500/10 bg-transparent">
              Sign Out
            </Button>
          }
        />
      </div>
    </div>
  )
}

interface SettingCardProps {
  icon: React.ReactNode
  title: string
  description: string
  action: React.ReactNode
}

function SettingCard({ icon, title, description, action }: SettingCardProps) {
  return (
    <Card className="bg-slate-900 p-4 flex items-center justify-between hover:border-blue-500/30 transition-colors border-slate-800">
      <div className="flex items-center gap-4">
        <div className="text-slate-400">{icon}</div>
        <div>
          <h4 className="font-semibold text-slate-50">{title}</h4>
          <p className="text-sm text-slate-400">{description}</p>
        </div>
      </div>
      {action}
    </Card>
  )
}
