import TaskCard from './TaskCard';
import EmptyState from '../ui/EmptyState';
import { PlusCircle } from 'lucide-react';

export default function TaskList({
  tasks = [],
  viewMode = 'grid',
  onEdit,
  onDelete,
  onStatusChange,
  onTaskClick,
  onCreateTask,
}) {
  if (tasks.length === 0) {
    return (
      <EmptyState
        title="No tasks match your criteria"
        description="Try adjusting your search keywords, status, priority, or category filters, or create a brand new task."
        actionLabel="Create New Task"
        onAction={onCreateTask}
        icon={PlusCircle}
      />
    );
  }

  if (viewMode === 'list') {
    return (
      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
            onStatusChange={onStatusChange}
            onClick={onTaskClick}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
          onClick={onTaskClick}
        />
      ))}
    </div>
  );
}

