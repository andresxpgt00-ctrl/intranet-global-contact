import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { Calendar, MapPin, Heart, Shield, Trophy, BookOpen, Sparkles } from 'lucide-react'
import Link from 'next/link'

interface Activity {
  id: string
  title: string
  description?: string
  activity_type: string
  start_date?: string
  end_date?: string
  location?: string
}

interface ActivitiesWidgetProps {
  activities: Activity[]
}

const activityIcons: Record<string, React.ElementType> = {
  bienestar: Heart,
  seguridad: Shield,
  reconocimiento: Trophy,
  capacitacion: BookOpen,
  evento: Calendar,
  otro: Sparkles,
}

const activityColors: Record<string, string> = {
  bienestar: 'bg-emerald-500',
  seguridad: 'bg-amber-500',
  reconocimiento: 'bg-violet-500',
  capacitacion: 'bg-pink-500',
  evento: 'bg-blue-500',
  otro: 'bg-gray-500',
}

export function ActivitiesWidget({ activities }: ActivitiesWidgetProps) {
  return (
    <div className="bg-card border border-border rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-lg">Proximas Actividades</h2>
        <Link
          href="/dashboard/activities"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          Ver todas
        </Link>
      </div>

      {activities.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <Calendar className="h-10 w-10 mx-auto mb-3 opacity-50" />
          <p className="text-sm">No hay actividades programadas</p>
        </div>
      ) : (
        <div className="space-y-4">
          {activities.map((activity) => {
            const Icon = activityIcons[activity.activity_type] || Calendar
            const colorClass = activityColors[activity.activity_type] || 'bg-gray-500'

            return (
              <div key={activity.id} className="flex gap-3">
                <div
                  className={`flex-shrink-0 w-10 h-10 rounded-xl ${colorClass} flex items-center justify-center`}
                >
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm truncate">{activity.title}</h3>
                  {activity.start_date && (
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                      <Calendar className="h-3 w-3" />
                      {format(new Date(activity.start_date), "d 'de' MMM, HH:mm", { locale: es })}
                    </p>
                  )}
                  {activity.location && (
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                      <MapPin className="h-3 w-3" />
                      {activity.location}
                    </p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
