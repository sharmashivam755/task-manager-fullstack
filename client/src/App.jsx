import { useEffect, useState } from "react";
import axios from "axios";

import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");

  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/tasks"
      );

      setTasks(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const activeTasks = tasks.length - completedTasks;

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") {
      return !task.completed;
    }

    if (filter === "completed") {
      return task.completed;
    }

    return true;
  });

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "20px auto",
        padding: "20px",
      }}
    >
      <h1>Personal Task Manager</h1>

      <p>Total Tasks: {tasks.length}</p>
      <p>Active Tasks: {activeTasks}</p>
      <p>Completed Tasks: {completedTasks}</p>

      <hr />

      <TaskForm fetchTasks={fetchTasks} />

      <hr />

      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => setFilter("all")}>
          All
        </button>

        <button
          onClick={() => setFilter("active")}
          style={{ marginLeft: "10px" }}
        >
          Active
        </button>

        <button
          onClick={() => setFilter("completed")}
          style={{ marginLeft: "10px" }}
        >
          Completed
        </button>
      </div>

      <TaskList
        tasks={filteredTasks}
        fetchTasks={fetchTasks}
      />
    </div>
  );
}

export default App;