import { Link } from 'react-router-dom';
import { Clock, ArrowRight, CheckCircle2, ChevronRight, Calendar } from 'lucide-react';
import Badge from '../ui/Badge';
import { 
  formatDate, 
  getPriorityColor, 
  getStatusColor, 
  isOverdue 
} from '../../utils/helpers';

export default function RecentTasks({ tasks = [], onTaskClick }) {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <span>Recent Activity</span>
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Your most recently created or updated tasks
          </p>
        </div>
        <Link
          to="/tasks"
          className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 flex items-center gap-1 transition-colors"
        >
          <span>View all</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Task List */}
      <div className="divide-y divide-gray-100 dark:divide-gray-800 flex-1">
        {tasks.length === 0 ? (
          <div className="py-8 text-center text-xs text-gray-500 dark:text-gray-400">
            No tasks created yet. Click "New Task" to begin!
          </div>
        ) : (
          tasks.map((task) => {
            const overdue = isOverdue(task.dueDate, task.status);
            return (
              <div
                key={task._id}
                onClick={() => onTaskClick?.(task)}
                className="py-3 flex items-center justify-between gap-3 group hover:bg-gray-50/80 dark:hover:bg-gray-800/40 px-2 rounded-xl transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-2 h-2 rounded-full shrink-0 ${
                      task.status === 'completed'
                        ? 'bg-emerald-500'
                        : task.status === 'in-progress'
                        ? 'bg-amber-500'
                        : 'bg-gray-400'
                    }`}
                  />
                  <div className="min-w-0">
                    <p
                      className={`text-sm font-medium text-gray-900 dark:text-white truncate ${
                        task.status === 'completed'
                          ? 'line-through text-gray-400 dark:text-gray-500'
                          : ''
                      }`}
                    >
                      {task.title}
                    </p>
                    <div className="flex items-center gap-2 text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">
                      <span className="capitalize">{task.category || 'General'}</span>
                      {task.dueDate && (
                        <>
                          <span>•</span>
                          <span
                            className={
                              overdue
                                ? 'text-rose-500 font-semibold'
                                : ''
                            }
                          >
                            {formatDate(task.dueDate)}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Badge className={getPriorityColor(task.priority)}>
                    {task.priority}
                  </Badge>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-indigo-600 transition-colors" />
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

