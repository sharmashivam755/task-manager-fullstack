import axios from "axios";

function TaskCard({ task, fetchTasks, onEdit }) {
  const isOverdue =
    task.dueDate &&
    !task.completed &&
    new Date(task.dueDate) < new Date();

  const handleToggle = async () => {
    try {
      await axios.patch(
        `http://localhost:5000/api/tasks/${task.id}/toggle`
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
        border: isOverdue
          ? "2px solid red"
          : "1px solid #ccc",
        backgroundColor: isOverdue
          ? "#ffe5e5"
          : "#fff",
        padding: "12px",
        marginBottom: "12px",
        borderRadius: "8px",
      }}
    >
      <h3>{task.title}</h3>

      <p>{task.description}</p>

      <p>
        <strong>Due:</strong>{" "}
        {task.dueDate || "No due date"}
      </p>

      <p>
        <strong>Status:</strong>{" "}
        {task.completed ? "Completed" : "Active"}
      </p>

      {isOverdue && (
        <p
          style={{
            color: "red",
            fontWeight: "bold",
          }}
        >
          ⚠️ Overdue Task
        </p>
      )}

      <button onClick={handleToggle}>
        {task.completed
          ? "Mark Active"
          : "Mark Complete"}
      </button>

      <button
        onClick={() => onEdit(task)}
        style={{ marginLeft: "10px" }}
      >
        Edit
      </button>

      <button
        onClick={handleDelete}
        style={{ marginLeft: "10px" }}
      >
        Delete
      </button>
    </div>
  );
}

export default TaskCard;