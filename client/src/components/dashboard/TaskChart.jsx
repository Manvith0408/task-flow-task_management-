import { CheckCircle2, TrendingUp, BarChart2 } from 'lucide-react';

export default function TaskChart({ stats = {} }) {
  const total = stats.totalTasks || 0;
  const completed = stats.completedTasks || 0;
  const inProgress = stats.inProgressTasks || 0;
  const pending = stats.pendingTasks || 0;
  const percentage = stats.completionPercentage || 0;

  // Percentages for bar breakdown
  const compPct = total > 0 ? Math.round((completed / total) * 100) : 0;
  const inProgPct = total > 0 ? Math.round((inProgress / total) * 100) : 0;
  const pendPct = total > 0 ? Math.round((pending / total) * 100) : 0;

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <span>Progress & Analytics</span>
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Real-time status overview of your assigned goals
          </p>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>{percentage}% Done</span>
        </div>
      </div>

      {/* Main Metric & Progress Bar */}
      <div className="space-y-4 mb-6">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-3xl font-extrabold text-gray-900 dark:text-white">
              {percentage}%
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
              Overall Completion Rate
            </span>
          </div>
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
            {completed} of {total} tasks completed
          </span>
        </div>

        {/* Multi-segmented Progress Bar */}
        <div className="h-3 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden flex shadow-inner">
          <div
            style={{ width: `${compPct}%` }}
            className="h-full bg-emerald-500 transition-all duration-500"
            title={`Completed: ${compPct}%`}
          />
          <div
            style={{ width: `${inProgPct}%` }}
            className="h-full bg-amber-500 transition-all duration-500"
            title={`In Progress: ${inProgPct}%`}
          />
          <div
            style={{ width: `${pendPct}%` }}
            className="h-full bg-sky-500 transition-all duration-500"
            title={`Pending: ${pendPct}%`}
          />
        </div>
      </div>

      {/* Segment Legend */}
      <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-100 dark:border-gray-800 text-center">
        <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/50">
          <div className="flex items-center justify-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Completed</span>
          </div>
          <p className="text-lg font-bold text-gray-900 dark:text-white">
            {completed}
          </p>
        </div>

        <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/50">
          <div className="flex items-center justify-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mb-1">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span>In Progress</span>
          </div>
          <p className="text-lg font-bold text-gray-900 dark:text-white">
            {inProgress}
          </p>
        </div>

        <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/50">
          <div className="flex items-center justify-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mb-1">
            <span className="w-2 h-2 rounded-full bg-sky-500" />
            <span>Pending</span>
          </div>
          <p className="text-lg font-bold text-gray-900 dark:text-white">
            {pending}
          </p>
        </div>
      </div>
    </div>
  );
}

