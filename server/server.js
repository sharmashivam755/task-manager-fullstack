require("dotenv").config();

const express = require("express");
const cors = require("cors");

const taskRoutes = require("./routes/taskRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Root Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Personal Task Manager API is running successfully",
    endpoints: {
      getTasks: "/api/tasks",
      createTask: "/api/tasks",
      updateTask: "/api/tasks/:id",
      deleteTask: "/api/tasks/:id",
    },
  });
});

// Task Routes
app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});