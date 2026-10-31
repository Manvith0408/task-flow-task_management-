import { useState, useCallback, useEffect } from 'react';
import * as api from '../services/api';
import toast from 'react-hot-toast';

export default function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    category: '',
    search: '',
    sortBy: 'createdAt',
    order: 'desc',
  });

  const fetchTasks = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const queryParams = { ...filters, ...params };
      // Remove empty values
      Object.keys(queryParams).forEach((k) => {
        if (!queryParams[k]) delete queryParams[k];
      });
      const { data } = await api.getTasks(queryParams);
      const list = Array.isArray(data.data)
        ? data.data
        : Array.isArray(data.tasks)
        ? data.tasks
        : Array.isArray(data)
        ? data
        : [];
      setTasks(list);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch tasks');
      toast.error('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleCreateTask = async (taskData) => {
    const { data } = await api.createTask(taskData);
    const item = data.data || data.task || data;
    setTasks((prev) => [item, ...prev]);
    toast.success('Task created successfully!');
    return item;
  };

  const handleUpdateTask = async (id, taskData) => {
    const { data } = await api.updateTask(id, taskData);
    const updated = data.data || data.task || data;
    setTasks((prev) => prev.map((t) => (t._id === id ? updated : t)));
    toast.success('Task updated successfully!');
    return updated;
  };

  const handleDeleteTask = async (id) => {
    await api.deleteTask(id);
    setTasks((prev) => prev.filter((t) => t._id !== id));
    toast.success('Task deleted successfully!');
  };

  const handleStatusChange = async (id, status) => {
    const { data } = await api.updateTaskStatus(id, status);
    const updated = data.data || data.task || data;
    setTasks((prev) => prev.map((t) => (t._id === id ? updated : t)));
    toast.success(`Task marked as ${status}`);
    return updated;
  };

  const updateFilters = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const clearFilters = () => {
    setFilters({
      status: '',
      priority: '',
      category: '',
      search: '',
      sortBy: 'createdAt',
      order: 'desc',
    });
  };

  return {
    tasks,
    loading,
    error,
    filters,
    fetchTasks,
    createTask: handleCreateTask,
    updateTask: handleUpdateTask,
    deleteTask: handleDeleteTask,
    updateStatus: handleStatusChange,
    updateFilters,
    clearFilters,
  };
}
