const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const tasksFile = path.join(__dirname, "../data/tasks.json");

const getTasks = (req, res) => {
  try {
    const tasks = JSON.parse(fs.readFileSync(tasksFile));

    tasks.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch tasks",
    });
  }
};

const createTask = (req, res) => {
  try {
    const { title, description, dueDate } = req.body;

    if (!title || title.trim() === "") {
      return res.status(400).json({
        message: "Title is required",
      });
    }

    const tasks = JSON.parse(fs.readFileSync(tasksFile));

    const newTask = {
      id: uuidv4(),
      title,
      description: description || "",
      dueDate: dueDate || "",
      completed: false,
      createdAt: new Date().toISOString(),
    };

    tasks.push(newTask);

    fs.writeFileSync(
      tasksFile,
      JSON.stringify(tasks, null, 2)
    );

    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create task",
    });
  }
};

const updateTask = (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, dueDate } = req.body;

    const tasks = JSON.parse(fs.readFileSync(tasksFile));

    const taskIndex = tasks.findIndex((task) => task.id === id);

    if (taskIndex === -1) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    tasks[taskIndex] = {
      ...tasks[taskIndex],
      title,
      description,
      dueDate,
    };

    fs.writeFileSync(
      tasksFile,
      JSON.stringify(tasks, null, 2)
    );

    res.status(200).json(tasks[taskIndex]);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update task",
    });
  }
};

const toggleTask = (req, res) => {
  try {
    const { id } = req.params;

    const tasks = JSON.parse(fs.readFileSync(tasksFile));

    const taskIndex = tasks.findIndex((task) => task.id === id);

    if (taskIndex === -1) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    tasks[taskIndex].completed =
      !tasks[taskIndex].completed;

    fs.writeFileSync(
      tasksFile,
      JSON.stringify(tasks, null, 2)
    );

    res.status(200).json(tasks[taskIndex]);
  } catch (error) {
    res.status(500).json({
      message: "Failed to toggle task",
    });
  }
};

const deleteTask = (req, res) => {
  try {
    const { id } = req.params;

    const tasks = JSON.parse(fs.readFileSync(tasksFile));

    const filteredTasks = tasks.filter(
      (task) => task.id !== id
    );

    fs.writeFileSync(
      tasksFile,
      JSON.stringify(filteredTasks, null, 2)
    );

    res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete task",
    });
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  toggleTask,
  deleteTask,
};