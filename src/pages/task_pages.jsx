import data from "/src/data/data.json"
import { useState, useEffect } from "react";

function Pages() {
  const [tasks, setTasks] = useState(data);

  return (
    <>
      {tasks.length === 0 ? (
        <p>Нет задач.</p>
      ) : (
        tasks.map((task) => (
          <label key={task.id}>
            <input type="checkbox" />
            {task.task}
          </label>
        ))
      )}
    </>
  );
}

export default Pages;
