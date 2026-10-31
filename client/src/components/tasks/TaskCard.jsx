import { useState } from 'react';
import { 
  Calendar, 
  Tag, 
  Check, 
  MoreVertical, 
  Edit3, 
  Trash2, 
  Clock, 
  AlertCircle 
} from 'lucide-react';
import Badge from '../ui/Badge';
import { 
  formatDate, 
  getPriorityColor, 
  getPriorityDot, 
  getStatusColor, 
  truncateText, 
  isOverdue 
} from '../../utils/helpers';

export default function TaskCard({
  task,
  onEdit,
  onDelete,
  onStatusChange,
  onClick,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const overdue = isOverdue(task.dueDate, task.status);
  const isCompleted = task.status === 'completed';

  const handleCheckboxClick = (e) => {
    e.stopPropagation();
    const nextStatus = isCompleted ? 'pending' : 'completed';
    onStatusChange(task._id, nextStatus);
  };

  const handleMenuClick = (e) => {
    e.stopPropagation();
    setMenuOpen(!menuOpen);
  };

  return (
    <div
      onClick={() => onClick?.(task)}
      className={`
        group relative rounded-2xl border p-5 transition-all duration-200 cursor-pointer
        bg-white dark:bg-gray-900 
        ${
          isCompleted 
            ? 'border-gray-200/80 dark:border-gray-800/80 opacity-75 hover:opacity-100' 
            : 'border-gray-200 dark:border-gray-800 hover:border-indigo-300 dark:hover:border-indigo-700/60 shadow-xs hover:shadow-md'
        }
      `}
    >
      {/* Top Header: Checkbox + Title + More menu */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <button
            type="button"
            onClick={handleCheckboxClick}
            className={`
              w-5 h-5 mt-0.5 rounded-md border flex items-center justify-center transition-all duration-150 shrink-0 cursor-pointer
              ${
                isCompleted
                  ? 'bg-emerald-500 border-emerald-500 text-white'
                  : 'border-gray-300 dark:border-gray-600 hover:border-indigo-500 dark:hover:border-indigo-400 bg-white dark:bg-gray-800'
              }
            `}
            title={isCompleted ? 'Mark as incomplete' : 'Mark as complete'}
          >
            {isCompleted && <Check className="w-3.5 h-3.5 stroke-[3]" />}
          </button>

          <div className="flex-1 min-w-0">
            <h3
              className={`text-base font-semibold text-gray-900 dark:text-white leading-snug truncate transition-all ${
                isCompleted ? 'line-through text-gray-400 dark:text-gray-500' : ''
              }`}
            >
              {task.title}
            </h3>
          </div>
        </div>

        {/* More Actions Dropdown */}
        <div className="relative shrink-0" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={handleMenuClick}
            className="p-1 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <MoreVertical className="w-4 h-4" />
          </button>

          {menuOpen && (
            <div 
              className="absolute right-0 mt-1 w-36 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 py-1 z-20 animate-in fade-in zoom-in-95"
              onMouseLeave={() => setMenuOpen(false)}
            >
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onEdit(task);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left"
              >
                <Edit3 className="w-3.5 h-3.5 text-gray-400" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onDelete(task);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors text-left"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Description Preview */}
      {task.description && (
        <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mb-4 pl-8 leading-relaxed">
          {truncateText(task.description, 120)}
        </p>
      )}

      {/* Badges & Info */}
      <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-gray-100 dark:border-gray-800 text-xs">
        {/* Status Badge */}
        <Badge className={getStatusColor(task.status)}>
          {task.status}
        </Badge>

        {/* Priority Badge */}
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(
            task.priority
          )}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${getPriorityDot(task.priority)}`} />
          <span className="capitalize">{task.priority}</span>
        </span>

        {/* Category */}
        {task.category && (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300">
            <Tag className="w-3 h-3" />
            <span>{task.category}</span>
          </span>
        )}

        {/* Due Date / Overdue flag */}
        {task.dueDate && (
          <span
            className={`inline-flex items-center gap-1 ml-auto text-[11px] font-medium ${
              overdue
                ? 'text-rose-600 dark:text-rose-400 font-semibold'
                : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            {overdue ? (
              <AlertCircle className="w-3.5 h-3.5 text-rose-500" />
            ) : (
              <Calendar className="w-3.5 h-3.5" />
            )}
            <span>{formatDate(task.dueDate)}</span>
          </span>
        )}
      </div>
    </div>
  );
}

