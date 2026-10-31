import { 
  Calendar, 
  Clock, 
  Tag, 
  AlertCircle, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  Hourglass, 
  PlayCircle 
} from 'lucide-react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { 
  formatDate, 
  formatRelative, 
  getPriorityColor, 
  getStatusColor, 
  isOverdue 
} from '../../utils/helpers';

export default function TaskDetailModal({
  isOpen,
  onClose,
  task,
  onEdit,
  onDelete,
  onStatusChange,
}) {
  if (!task) return null;

  const overdue = isOverdue(task.dueDate, task.status);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" title="Task Details">
      <div className="space-y-6 pt-2">
        {/* Title & Badges */}
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <Badge className={getStatusColor(task.status)}>
              {task.status}
            </Badge>
            <Badge className={getPriorityColor(task.priority)}>
              {task.priority} priority
            </Badge>
            {task.category && (
              <Badge className="bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                <Tag className="w-3 h-3 mr-1" />
                {task.category}
              </Badge>
            )}
            {overdue && (
              <Badge className="bg-rose-500 text-white dark:bg-rose-600">
                <AlertCircle className="w-3 h-3 mr-1" />
                Overdue
              </Badge>
            )}
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white break-words">
            {task.title}
          </h2>
        </div>

        {/* Description */}
        <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl border border-gray-100 dark:border-gray-800">
          <p className="text-xs uppercase font-semibold text-gray-400 mb-2 tracking-wider">
            Description
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
            {task.description || 'No detailed description provided.'}
          </p>
        </div>

        {/* Metadata Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2.5 text-gray-600 dark:text-gray-400">
            <Calendar className="w-4 h-4 text-indigo-500 shrink-0" />
            <span>Due Date:</span>
            <span className={`font-medium ${overdue ? 'text-rose-600 dark:text-rose-400 font-semibold' : 'text-gray-900 dark:text-gray-100'}`}>
              {task.dueDate ? formatDate(task.dueDate) : 'No due date'}
            </span>
          </div>

          <div className="flex items-center gap-2.5 text-gray-600 dark:text-gray-400">
            <Clock className="w-4 h-4 text-indigo-500 shrink-0" />
            <span>Created:</span>
            <span className="font-medium text-gray-900 dark:text-gray-100">
              {formatRelative(task.createdAt)}
            </span>
          </div>
        </div>

        {/* Quick Status Toggles */}
        <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
          <p className="text-xs uppercase font-semibold text-gray-400 mb-2 tracking-wider">
            Quick Status Update
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => onStatusChange(task._id, 'pending')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                task.status === 'pending'
                  ? 'bg-gray-800 text-white dark:bg-gray-200 dark:text-gray-900 font-semibold'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300'
              }`}
            >
              <Hourglass className="w-3.5 h-3.5" />
              Pending
            </button>
            <button
              onClick={() => onStatusChange(task._id, 'in-progress')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                task.status === 'in-progress'
                  ? 'bg-amber-500 text-white font-semibold'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300'
              }`}
            >
              <PlayCircle className="w-3.5 h-3.5" />
              In Progress
            </button>
            <button
              onClick={() => onStatusChange(task._id, 'completed')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                task.status === 'completed'
                  ? 'bg-emerald-600 text-white font-semibold'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              Completed
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
          <Button
            variant="danger"
            size="sm"
            onClick={() => {
              onClose();
              onDelete(task);
            }}
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete</span>
          </Button>

          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" onClick={onClose}>
              Close
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                onClose();
                onEdit(task);
              }}
            >
              <Edit3 className="w-4 h-4" />
              <span>Edit Task</span>
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

