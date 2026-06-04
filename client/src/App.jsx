import { useEffect, useState } from "react";
import axios from "axios";

import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [editingTask, setEditingTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        "https://task-manager-fullstack-il39.onrender.com/api/tasks"
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
    const matchesSearch =
      task.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      task.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    if (filter === "active") {
      return !task.completed && matchesSearch;
    }

    if (filter === "completed") {
      return task.completed && matchesSearch;
    }

    return matchesSearch;
  });

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f4f7fc",
        padding: "40px 20px",
        fontFamily: "Segoe UI, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#2563eb",
            marginBottom: "35px",
            fontSize: "42px",
          }}
        >
          Personal Task Manager
        </h1>

        {/* Dashboard Cards */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
            marginBottom: "30px",
          }}
        >
          <div
            style={{
              background: "#ffffff",
              padding: "25px",
              borderRadius: "12px",
              textAlign: "center",
              boxShadow:
                "0 4px 12px rgba(0,0,0,0.08)",
            }}
          >
            <h3 style={{ color: "#64748b" }}>
              Total Tasks
            </h3>

            <h1 style={{ color: "#2563eb" }}>
              {tasks.length}
            </h1>
          </div>

          <div
            style={{
              background: "#eff6ff",
              padding: "25px",
              borderRadius: "12px",
              textAlign: "center",
              boxShadow:
                "0 4px 12px rgba(0,0,0,0.08)",
            }}
          >
            <h3 style={{ color: "#64748b" }}>
              Active Tasks
            </h3>

            <h1 style={{ color: "#0284c7" }}>
              {activeTasks}
            </h1>
          </div>

          <div
            style={{
              background: "#ecfdf5",
              padding: "25px",
              borderRadius: "12px",
              textAlign: "center",
              boxShadow:
                "0 4px 12px rgba(0,0,0,0.08)",
            }}
          >
            <h3 style={{ color: "#64748b" }}>
              Completed Tasks
            </h3>

            <h1 style={{ color: "#16a34a" }}>
              {completedTasks}
            </h1>
          </div>
        </div>

        {/* Task Form */}

        <div
          style={{
            background: "#ffffff",
            padding: "25px",
            borderRadius: "12px",
            boxShadow:
              "0 4px 12px rgba(0,0,0,0.08)",
            marginBottom: "25px",
          }}
        >
          <TaskForm
            fetchTasks={fetchTasks}
            editingTask={editingTask}
            setEditingTask={setEditingTask}
          />
        </div>

        {/* Search */}

        <input
          type="text"
          placeholder="🔍 Search by title or description..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "10px",
            border: "1px solid #d1d5db",
            marginBottom: "20px",
            fontSize: "15px",
            boxSizing: "border-box",
          }}
        />

        {/* Filters */}

        <div
          style={{
            display: "flex",
            gap: "12px",
            marginBottom: "25px",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={() => setFilter("all")}
            style={{
              padding: "10px 18px",
              border: "none",
              borderRadius: "8px",
              background:
                filter === "all"
                  ? "#2563eb"
                  : "#e5e7eb",
              color:
                filter === "all"
                  ? "#fff"
                  : "#000",
              cursor: "pointer",
            }}
          >
            All Tasks
          </button>

          <button
            onClick={() => setFilter("active")}
            style={{
              padding: "10px 18px",
              border: "none",
              borderRadius: "8px",
              background:
                filter === "active"
                  ? "#0284c7"
                  : "#e5e7eb",
              color:
                filter === "active"
                  ? "#fff"
                  : "#000",
              cursor: "pointer",
            }}
          >
            Active
          </button>

          <button
            onClick={() => setFilter("completed")}
            style={{
              padding: "10px 18px",
              border: "none",
              borderRadius: "8px",
              background:
                filter === "completed"
                  ? "#16a34a"
                  : "#e5e7eb",
              color:
                filter === "completed"
                  ? "#fff"
                  : "#000",
              cursor: "pointer",
            }}
          >
            Completed
          </button>
        </div>

        {/* Task List */}

        <TaskList
          tasks={filteredTasks}
          fetchTasks={fetchTasks}
          onEdit={setEditingTask}
        />
      </div>
    </div>
  );
}

export default App;