import { useState, useEffect } from "react";
import axios from "axios";

function TaskForm({
  fetchTasks,
  editingTask,
  setEditingTask,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setDueDate(editingTask.dueDate);
    }
  }, [editingTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Title is required");
      return;
    }

    try {
      if (editingTask) {
        await axios.put(
          `https://task-manager-fullstack-il39.onrender.com/api/tasks/${editingTask.id}`,
          {
            title,
            description,
            dueDate,
          }
        );

        setEditingTask(null);
      } else {
        await axios.post(
          "http://localhost:5000/api/tasks",
          {
            title,
            description,
            dueDate,
          }
        );
      }

      setTitle("");
      setDescription("");
      setDueDate("");

      fetchTasks();
    } catch (error) {
      console.log(error);

      alert(
        editingTask
          ? "Failed to update task"
          : "Failed to create task"
      );
    }
  };

  const handleCancelEdit = () => {
    setEditingTask(null);

    setTitle("");
    setDescription("");
    setDueDate("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2
        style={{
          marginBottom: "20px",
          color: "#1e293b",
          textAlign: "center",
        }}
      >
        {editingTask
          ? "✏️ Edit Task"
          : "➕ Add New Task"}
      </h2>

      <div style={{ marginBottom: "15px" }}>
        <label
          style={{
            display: "block",
            marginBottom: "6px",
            fontWeight: "600",
          }}
        >
          Task Title
        </label>

        <input
          type="text"
          placeholder="Enter task title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          style={{
            width: "100%",
            padding: "12px",
            border: "1px solid #d1d5db",
            borderRadius: "8px",
            fontSize: "15px",
            boxSizing: "border-box",
          }}
        />
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label
          style={{
            display: "block",
            marginBottom: "6px",
            fontWeight: "600",
          }}
        >
          Description
        </label>

        <textarea
          placeholder="Enter task description"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
          rows="4"
          style={{
            width: "100%",
            padding: "12px",
            border: "1px solid #d1d5db",
            borderRadius: "8px",
            resize: "vertical",
            fontSize: "15px",
            boxSizing: "border-box",
          }}
        />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label
          style={{
            display: "block",
            marginBottom: "6px",
            fontWeight: "600",
          }}
        >
          Due Date
        </label>

        <input
          type="date"
          value={dueDate}
          onChange={(e) =>
            setDueDate(e.target.value)
          }
          style={{
            width: "100%",
            padding: "12px",
            border: "1px solid #d1d5db",
            borderRadius: "8px",
            fontSize: "15px",
            boxSizing: "border-box",
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        <button
          type="submit"
          style={{
            backgroundColor: editingTask
              ? "#f59e0b"
              : "#2563eb",
            color: "white",
            border: "none",
            padding: "12px 20px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          {editingTask
            ? "Update Task"
            : "Add Task"}
        </button>

        {editingTask && (
          <button
            type="button"
            onClick={handleCancelEdit}
            style={{
              backgroundColor: "#ef4444",
              color: "white",
              border: "none",
              padding: "12px 20px",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default TaskForm;