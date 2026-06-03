const express = require("express");

const {
  getTasks,
  createTask,
  updateTask,
  toggleTask,
  deleteTask,
} = require("../controllers/taskController");

const router = express.Router();

router.get("/", getTasks);

router.post("/", createTask);

router.put("/:id", updateTask);

router.patch("/:id/toggle", toggleTask);

router.delete("/:id", deleteTask);

module.exports = router;