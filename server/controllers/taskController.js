const Task = require('../models/Task');
const { getTodayRange } = require('../utils/helpers');

/**
 * @desc    Create a new task
 * @route   POST /api/tasks
 * @access  Private
 */
const createTask = async (req, res, next) => {
  try {
    const { title, description, status, priority, category, dueDate } = req.body;

    const task = await Task.create({
      title,
      description,
      status,
      priority,
      category,
      dueDate: dueDate || undefined,
      user: req.user._id,
    });

    // Emit real-time event
    const io = req.app.get('io');
    if (io) {
      io.to(req.user._id.toString()).emit('taskCreated', task);
    }

    res.status(201).json({
      success: true,
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all tasks for the authenticated user with filtering & sorting
 * @route   GET /api/tasks
 * @access  Private
 */
const getTasks = async (req, res, next) => {
  try {
    const { search, status, priority, category, sortBy, order } = req.query;

    // Base filter: only this user's tasks
    const filter = { user: req.user._id };

    // Search in title and description (case-insensitive regex)
    if (search) {
      const regex = new RegExp(search, 'i');
      filter.$or = [{ title: regex }, { description: regex }];
    }

    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (category) filter.category = category;

    // Sorting
    const validSortFields = ['createdAt', 'dueDate', 'priority', 'title'];
    const sortField = validSortFields.includes(sortBy) ? sortBy : 'createdAt';
    const sortOrder = order === 'asc' ? 1 : -1;

    // For priority sorting, map to numeric weight so high > medium > low
    let sortOption;
    if (sortField === 'priority') {
      // Use aggregation to sort by mapped priority
      const priorityMap = { high: 3, medium: 2, low: 1 };
      const tasks = await Task.find(filter).lean();
      tasks.sort((a, b) => {
        const diff = (priorityMap[a.priority] || 0) - (priorityMap[b.priority] || 0);
        return sortOrder === 1 ? diff : -diff;
      });
      return res.json({ success: true, count: tasks.length, data: tasks });
    }

    sortOption = { [sortField]: sortOrder };

    const tasks = await Task.find(filter).sort(sortOption);

    res.json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get task statistics for dashboard
 * @route   GET /api/tasks/stats
 * @access  Private
 */
const getTaskStats = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const now = new Date();
    const { start: todayStart, end: todayEnd } = getTodayRange();

    // Fetch all tasks for the user (lean for performance)
    const tasks = await Task.find({ user: userId }).lean();

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((t) => t.status === 'completed').length;
    const pendingTasks = tasks.filter((t) => t.status === 'pending').length;
    const inProgressTasks = tasks.filter((t) => t.status === 'in-progress').length;

    // Overdue: has a dueDate in the past AND is not completed
    const overdueTasks = tasks.filter(
      (t) => t.dueDate && new Date(t.dueDate) < now && t.status !== 'completed'
    ).length;

    const completionPercentage =
      totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    // Tasks due today
    const todayTasks = tasks.filter(
      (t) =>
        t.dueDate &&
        new Date(t.dueDate) >= todayStart &&
        new Date(t.dueDate) < todayEnd
    ).length;

    // Last 5 created tasks
    const recentTasks = [...tasks]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);

    res.json({
      success: true,
      data: {
        totalTasks,
        completedTasks,
        pendingTasks,
        inProgressTasks,
        overdueTasks,
        completionPercentage,
        todayTasks,
        recentTasks,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get a single task by ID
 * @route   GET /api/tasks/:id
 * @access  Private
 */
const getTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    // Authorization: ensure the task belongs to the requesting user
    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this task',
      });
    }

    res.json({
      success: true,
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update a task
 * @route   PUT /api/tasks/:id
 * @access  Private
 */
const updateTask = async (req, res, next) => {
  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this task',
      });
    }

    const { title, description, status, priority, category, dueDate } = req.body;
    const updates = {};
    if (title !== undefined) updates.title = title;
    if (description !== undefined) updates.description = description;
    if (status !== undefined) updates.status = status;
    if (priority !== undefined) updates.priority = priority;
    if (category !== undefined) updates.category = category;
    if (dueDate !== undefined) updates.dueDate = dueDate || null;

    task = await Task.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });

    // Emit real-time event
    const io = req.app.get('io');
    if (io) {
      io.to(req.user._id.toString()).emit('taskUpdated', task);
    }

    res.json({
      success: true,
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update task status
 * @route   PATCH /api/tasks/:id/status
 * @access  Private
 */
const updateTaskStatus = async (req, res, next) => {
  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this task',
      });
    }

    task = await Task.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    );

    // Emit real-time event
    const io = req.app.get('io');
    if (io) {
      io.to(req.user._id.toString()).emit('taskUpdated', task);
    }

    res.json({
      success: true,
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete a task
 * @route   DELETE /api/tasks/:id
 * @access  Private
 */
const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this task',
      });
    }

    await Task.findByIdAndDelete(req.params.id);

    // Emit real-time event
    const io = req.app.get('io');
    if (io) {
      io.to(req.user._id.toString()).emit('taskDeleted', req.params.id);
    }

    res.json({
      success: true,
      data: {},
      message: 'Task deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTask,
  getTasks,
  getTaskStats,
  getTask,
  updateTask,
  updateTaskStatus,
  deleteTask,
};
