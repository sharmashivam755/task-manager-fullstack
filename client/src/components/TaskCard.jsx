import axios from "axios";

function TaskCard({ task, fetchTasks, onEdit }) {
  const isOverdue =
    task.dueDate &&
    !task.completed &&
    new Date(task.dueDate) < new Date();

  const handleToggle = async () => {
    try {
      await axios.patch(
        `https://task-manager-fullstack-il39.onrender.com/api/tasks/${task.id}/toggle`
      );

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/tasks/${task.id}`
      );

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        padding: "20px",
        marginBottom: "16px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        border: isOverdue
          ? "2px solid #ef4444"
          : "1px solid #e5e7eb",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "12px",
          flexWrap: "wrap",
        }}
      >
        <h3
          style={{
            margin: 0,
            color: "#1e293b",
          }}
        >
          {task.title}
        </h3>

        <span
          style={{
            padding: "6px 12px",
            borderRadius: "20px",
            fontSize: "13px",
            fontWeight: "600",
            backgroundColor: task.completed
              ? "#dcfce7"
              : isOverdue
              ? "#fee2e2"
              : "#dbeafe",
            color: task.completed
              ? "#15803d"
              : isOverdue
              ? "#dc2626"
              : "#2563eb",
          }}
        >
          {task.completed
            ? "Completed"
            : isOverdue
            ? "Overdue"
            : "Active"}
        </span>
      </div>

      <p
        style={{
          color: "#475569",
          marginBottom: "15px",
        }}
      >
        {task.description || "No description"}
      </p>

      <p
        style={{
          marginBottom: "15px",
          color: "#64748b",
        }}
      >
        <strong>Due Date:</strong>{" "}
        {task.dueDate || "Not Set"}
      </p>

      {isOverdue && (
        <p
          style={{
            color: "#dc2626",
            fontWeight: "600",
            marginBottom: "15px",
          }}
        >
          ⚠️ This task is overdue
        </p>
      )}

      <div
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={handleToggle}
          style={{
            backgroundColor: task.completed
              ? "#f59e0b"
              : "#22c55e",
            color: "#fff",
            border: "none",
            padding: "10px 14px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          {task.completed
            ? "Mark Active"
            : "Mark Complete"}
        </button>

        <button
          onClick={() => onEdit(task)}
          style={{
            backgroundColor: "#3b82f6",
            color: "#fff",
            border: "none",
            padding: "10px 14px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          Edit
        </button>

        <button
          onClick={handleDelete}
          style={{
            backgroundColor: "#ef4444",
            color: "#fff",
            border: "none",
            padding: "10px 14px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskCard;