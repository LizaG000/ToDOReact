import React, { useState, useEffect } from "react";
import "/src/App.css";

const loadTasks = () => {
  const savedTasks = localStorage.getItem("tasks");
  return savedTasks ? JSON.parse(savedTasks) : [];
};

function App() {
  const [tasks, setTasks] = useState(loadTasks());
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTaskPure = (tasks, newTask) => {
    return [...tasks, { id: Date.now(), task: newTask, status: false }];
  };

  const toggleStatusPure = (tasks, id) => {
    return tasks.map((task) =>
      task.id === id ? { ...task, status: !task.status } : task
    );
  };

  const deleteTaskPure = (tasks, id) => {
    return tasks.filter((task) => task.id !== id);
  };

  const addTask = () => {
    if (newTask.trim() === "") return;
    setTasks(addTaskPure(tasks, newTask));
    setNewTask("");
  };

  const toggleStatus = (id) => {
    setTasks(toggleStatusPure(tasks, id));
  };

  const deleteTask = (id) => {
    setTasks(deleteTaskPure(tasks, id));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.status;
    if (filter === "incomplete") return !task.status;
    return true;
  });

  return (
    <div>
      <h1>Список задач</h1>

      <div>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Введите новую задачу"
        />
        <button onClick={addTask}>Добавить</button>
      </div>

      <div>
        <button
          onClick={() => setFilter("all")}
          style={{ background: filter === "all" ? "#0056b3" : "#007bff" }}
        >
          Все
        </button>
        <button
          onClick={() => setFilter("completed")}
          style={{ background: filter === "completed" ? "#0056b3" : "#007bff" }}
        >
          Выполненные
        </button>
        <button
          onClick={() => setFilter("incomplete")}
          style={{ background: filter === "incomplete" ? "#0056b3" : "#007bff" }}
        >
          Невыполненные
        </button>
      </div>

      <div>
        {filteredTasks.length === 0 ? (
          <p>Нет задач.</p>
        ) : (
          filteredTasks.map((task) => (
            <div key={task.id}>
              <label>
                <input
                  type="checkbox"
                  checked={task.status}
                  onChange={() => toggleStatus(task.id)}
                />
                <span className={task.status ? "completed" : ""}>
                  {task.task}
                </span>
              </label>
              <button onClick={() => deleteTask(task.id)}>Удалить</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;