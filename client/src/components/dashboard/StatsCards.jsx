import { 
  CheckCircle2, 
  Hourglass, 
  Clock, 
  AlertTriangle, 
  Calendar, 
  Layers 
} from 'lucide-react';

export default function StatsCards({ stats = {} }) {
  const cards = [
    {
      label: 'Total Tasks',
      value: stats.totalTasks ?? 0,
      icon: Layers,
      color: 'text-indigo-600 dark:text-indigo-400',
      bg: 'bg-indigo-50 dark:bg-indigo-950/40',
      border: 'border-indigo-100 dark:border-indigo-900/30',
    },
    {
      label: 'Completed',
      value: stats.completedTasks ?? 0,
      icon: CheckCircle2,
      color: 'text-emerald-600 dark:text-emerald-400',
      bg: 'bg-emerald-50 dark:bg-emerald-950/40',
      border: 'border-emerald-100 dark:border-emerald-900/30',
    },
    {
      label: 'In Progress',
      value: stats.inProgressTasks ?? 0,
      icon: Clock,
      color: 'text-amber-600 dark:text-amber-400',
      bg: 'bg-amber-50 dark:bg-amber-950/40',
      border: 'border-amber-100 dark:border-amber-900/30',
    },
    {
      label: 'Pending',
      value: stats.pendingTasks ?? 0,
      icon: Hourglass,
      color: 'text-sky-600 dark:text-sky-400',
      bg: 'bg-sky-50 dark:bg-sky-950/40',
      border: 'border-sky-100 dark:border-sky-900/30',
    },
    {
      label: 'Due Today',
      value: stats.todayTasks ?? 0,
      icon: Calendar,
      color: 'text-purple-600 dark:text-purple-400',
      bg: 'bg-purple-50 dark:bg-purple-950/40',
      border: 'border-purple-100 dark:border-purple-900/30',
    },
    {
      label: 'Overdue',
      value: stats.overdueTasks ?? 0,
      icon: AlertTriangle,
      color: 'text-rose-600 dark:text-rose-400',
      bg: 'bg-rose-50 dark:bg-rose-950/40',
      border: 'border-rose-100 dark:border-rose-900/30',
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
      {cards.map((c, i) => {
        const Icon = c.icon;
        return (
          <div
            key={i}
            className={`p-4 rounded-2xl bg-white dark:bg-gray-900 border ${c.border} shadow-xs transition-all hover:shadow-md flex flex-col justify-between`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400 truncate">
                {c.label}
              </span>
              <div className={`w-8 h-8 rounded-xl ${c.bg} ${c.color} flex items-center justify-center shrink-0`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {c.value}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

