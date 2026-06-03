import TaskCard from "./TaskCard";

function TaskList({ tasks, fetchTasks, onEdit }) {
  if (tasks.length === 0) {
    return (
      <div>
        <h3>No Tasks Found</h3>
        <p>Create your first task.</p>
      </div>
    );
  }

  return (
    <div>
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          fetchTasks={fetchTasks}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}

export default TaskList;