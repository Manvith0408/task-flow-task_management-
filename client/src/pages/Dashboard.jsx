import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Sparkles, 
  CheckSquare, 
  Calendar, 
  AlertTriangle,
  ArrowRight 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import * as api from '../services/api';
import StatsCards from '../components/dashboard/StatsCards';
import TaskChart from '../components/dashboard/TaskChart';
import RecentTasks from '../components/dashboard/RecentTasks';
import TaskDetailModal from '../components/tasks/TaskDetailModal';
import DeleteConfirmModal from '../components/tasks/DeleteConfirmModal';
import Button from '../components/ui/Button';
import LoadingSkeleton from '../components/ui/LoadingSkeleton';
import { getGreeting } from '../utils/helpers';
import toast from 'react-hot-toast';

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  // Selected task state for modal preview
  const [selectedTask, setSelectedTask] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await api.getTaskStats();
      setStats(res.data.data || res.data);
    } catch (err) {
      toast.error('Failed to load dashboard metrics');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await api.updateTaskStatus(taskId, newStatus);
      toast.success(`Task status updated`);
      fetchStats();
      if (selectedTask && selectedTask._id === taskId) {
        setSelectedTask({ ...selectedTask, status: newStatus });
      }
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  const handleDeleteConfirm = async () => {
    if (!taskToDelete) return;
    setDeleteLoading(true);
    try {
      await api.deleteTask(taskToDelete._id);
      toast.success('Task deleted');
      setTaskToDelete(null);
      if (selectedTask?._id === taskToDelete._id) {
        setSelectedTask(null);
      }
      fetchStats();
    } catch (err) {
      toast.error('Failed to delete task');
    } finally {
      setDeleteLoading(false);
    }
  };

  const greeting = getGreeting();
  const firstName = user?.name ? user.name.split(' ')[0] : 'there';

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-transparent p-6 rounded-3xl border border-indigo-100 dark:border-indigo-900/30">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Productivity Dashboard</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            {greeting}, {firstName}!
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Here is a snapshot of your tasks, progress, and upcoming milestones for today.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            onClick={() => navigate('/tasks')}
          >
            <CheckSquare className="w-4 h-4" />
            <span>View Tasks</span>
          </Button>
          <Button
            variant="primary"
            onClick={() => navigate('/tasks/create')}
          >
            <Plus className="w-4 h-4" />
            <span>Create Task</span>
          </Button>
        </div>
      </div>

      {/* Stats Cards Row */}
      {loading ? (
        <LoadingSkeleton type="stats" count={6} />
      ) : (
        <StatsCards stats={stats} />
      )}

      {/* Main Charts & Recent Tasks Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {loading ? (
          <>
            <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 animate-pulse h-72" />
            <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 animate-pulse h-72" />
          </>
        ) : (
          <>
            <TaskChart stats={stats} />
            <RecentTasks
              tasks={stats?.recentTasks || []}
              onTaskClick={(task) => setSelectedTask(task)}
            />
          </>
        )}
      </div>

      {/* Modals */}
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

      {taskToDelete && (
        <DeleteConfirmModal
          isOpen={Boolean(taskToDelete)}
          onClose={() => setTaskToDelete(null)}
          onConfirm={handleDeleteConfirm}
          loading={deleteLoading}
          title="Delete Task"
          message={`Are you sure you want to delete "${taskToDelete.title}"? This cannot be undone.`}
        />
      )}
    </div>
  );
}

