import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Edit3, ArrowLeft, Loader2 } from 'lucide-react';
import * as api from '../services/api';
import TaskForm from '../components/tasks/TaskForm';
import Button from '../components/ui/Button';
import toast from 'react-hot-toast';

export default function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState(null);
  const [fetching, setFetching] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        setFetching(true);
        const res = await api.getTask(id);
        const data = res.data.data || res.data.task || res.data;
        setTask(data);
      } catch (err) {
        toast.error('Task not found or access denied');
        navigate('/tasks');
      } finally {
        setFetching(false);
      }
    };
    fetchTask();
  }, [id, navigate]);

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      await api.updateTask(id, formData);
      toast.success('Task updated successfully!');
      navigate('/tasks');
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to update task';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="max-w-2xl mx-auto py-12 flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
        <p className="text-sm text-gray-500">Loading task data...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Back button */}
      <div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(-1)}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </Button>
      </div>

      {/* Main Form Card */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100 dark:border-gray-800">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
            <Edit3 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Edit Task
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Update task title, status, priority, or deadline.
            </p>
          </div>
        </div>

        <TaskForm
          initialData={task}
          onSubmit={handleSubmit}
          loading={loading}
          onCancel={() => navigate('/tasks')}
          submitLabel="Save Changes"
        />
      </div>
    </div>
  );
}

