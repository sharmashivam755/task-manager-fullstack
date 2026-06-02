const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const tasksFile = path.join(__dirname, "../data/tasks.json");

const getTasks = (req, res) => {
  try {
    const tasks = JSON.parse(fs.readFileSync(tasksFile));

    tasks.sort(
      (a, b) =>
        new Date(b.createdAt) - new Date(a.createdAt)
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

module.exports = {
  getTasks,
  createTask,
};