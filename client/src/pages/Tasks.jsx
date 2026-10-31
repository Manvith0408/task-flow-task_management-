import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, CheckSquare } from 'lucide-react';
import * as api from '../services/api';
import TaskFilters from '../components/tasks/TaskFilters';
import TaskList from '../components/tasks/TaskList';
import TaskDetailModal from '../components/tasks/TaskDetailModal';
import DeleteConfirmModal from '../components/tasks/DeleteConfirmModal';
import Button from '../components/ui/Button';
import LoadingSkeleton from '../components/ui/LoadingSkeleton';
import toast from 'react-hot-toast';

export default function Tasks() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');

  // Filters state
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    priority: '',
    category: '',
    sortBy: 'createdAt',
    order: 'desc',
  });

  // Modal states
  const [selectedTask, setSelectedTask] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const params = {};
      if (filters.search) params.search = filters.search;
      if (filters.status) params.status = filters.status;
      if (filters.priority) params.priority = filters.priority;
      if (filters.category) params.category = filters.category;
      if (filters.sortBy) params.sortBy = filters.sortBy;
      if (filters.order) params.order = filters.order;

      const res = await api.getTasks(params);
      const data = res.data.data || res.data.tasks || res.data;
      setTasks(Array.isArray(data) ? data : []);
    } catch (err) {
      toast.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    // Add debounce for search filter
    const timer = setTimeout(() => {
      fetchTasks();
    }, 250);
    return () => clearTimeout(timer);
  }, [fetchTasks]);

  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      status: '',
      priority: '',
      category: '',
      sortBy: 'createdAt',
      order: 'desc',
    });
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      const res = await api.updateTaskStatus(taskId, newStatus);
      const updated = res.data.data || res.data.task || res.data;
      setTasks((prev) =>
        prev.map((t) => (t._id === taskId ? { ...t, status: newStatus } : t))
      );
      if (selectedTask && selectedTask._id === taskId) {
        setSelectedTask({ ...selectedTask, status: newStatus });
      }
      toast.success(`Task marked as ${newStatus}`);
    } catch (err) {
      toast.error('Failed to update task status');
    }
  };

  const handleDeleteConfirm = async () => {
    if (!taskToDelete) return;
    setDeleteLoading(true);
    try {
      await api.deleteTask(taskToDelete._id);
      setTasks((prev) => prev.filter((t) => t._id !== taskToDelete._id));
      toast.success('Task deleted successfully');
      setTaskToDelete(null);
      if (selectedTask?._id === taskToDelete._id) {
        setSelectedTask(null);
      }
    } catch (err) {
      toast.error('Failed to delete task');
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <CheckSquare className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            <span>Task Management</span>
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Filter, search, and track all your personal and team objectives.
          </p>
        </div>

        <Button
          variant="primary"
          onClick={() => navigate('/tasks/create')}
          className="self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Task</span>
        </Button>
      </div>

      {/* Filter Toolbar */}
      <TaskFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onClear={handleClearFilters}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      {/* Task List or Skeletons */}
      {loading ? (
        <LoadingSkeleton type={viewMode === 'grid' ? 'card' : 'list'} count={6} />
      ) : (
        <TaskList
          tasks={tasks}
          viewMode={viewMode}
          onEdit={(task) => navigate(`/tasks/edit/${task._id}`)}
          onDelete={(task) => setTaskToDelete(task)}
          onStatusChange={handleStatusChange}
          onTaskClick={(task) => setSelectedTask(task)}
          onCreateTask={() => navigate('/tasks/create')}
        />
      )}

      {/* Detail Modal */}
      {selectedTask && (
        <TaskDetailModal
          isOpen={Boolean(selectedTask)}
          onClose={() => setSelectedTask(null)}
          task={selectedTask}
          onEdit={(task) => navigate(`/tasks/edit/${task._id}`)}
          onDelete={(task) => setTaskToDelete(task)}
          onStatusChange={handleStatusChange}
        />
      )}

      {/* Delete Confirmation Modal */}
      {taskToDelete && (
        <DeleteConfirmModal
          isOpen={Boolean(taskToDelete)}
          onClose={() => setTaskToDelete(null)}
          onConfirm={handleDeleteConfirm}
          loading={deleteLoading}
          title="Delete Task"
          message={`Are you sure you want to permanently delete "${taskToDelete.title}"?`}
        />
      )}
    </div>
  );
}

