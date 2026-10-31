const express = require('express');
const router = express.Router();
const {
  createTask,
  getTasks,
  getTaskStats,
  getTask,
  updateTask,
  updateTaskStatus,
  deleteTask,
} = require('../controllers/taskController');
const { protect } = require('../middleware/auth');
const {
  validateCreateTask,
  validateUpdateTask,
  validateUpdateStatus,
} = require('../middleware/validate');

// All task routes are protected
router.use(protect);

// Stats must be defined before /:id to avoid "stats" being treated as an id
router.get('/stats', getTaskStats);

router.route('/')
  .post(validateCreateTask, createTask)
  .get(getTasks);

router.route('/:id')
  .get(getTask)
  .put(validateUpdateTask, updateTask)
  .delete(deleteTask);

router.patch('/:id/status', validateUpdateStatus, updateTaskStatus);

module.exports = router;
