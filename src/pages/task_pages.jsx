import { useState, useEffect } from "react";

function Pages() {
  const [tasks, setTasks] = useState([]);
  const [filterTask, setFilterTask] = useState([])
  const [selectValue, setSelectValue] = useState("all")
  const [newTask, setNewTask] = useState("Новая таска")

  const newStatus = (id) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        return { ...task, status: !task.status };
      }
      return task;
    });
    setTasks(updatedTasks);
    filter_task(selectValue, updatedTasks)
  }
  const click = () => {
    let id_max = 0
    tasks.map(task => {
      if (task.id > id_max) {
        id_max = task.id
      }
      return task
    })
    let _tasks = [...tasks, {
      "id": id_max + 1,
      "task": newTask,
      "status": false
    }]
    console.log(_tasks)
    setTasks(_tasks)
    filter_task(selectValue, _tasks)
  }

  const delete_click = (id) => {
    let _tasks = tasks.filter(task => task.id !== id);
    setTasks(_tasks);
    setFilterTask(_tasks)
  }

  const filter_task = (value, tasks_list = tasks) => {
    console.log(value)
    let _tasks
    if (value == "true") {
      _tasks = tasks_list.filter(task => task.status == true)
    }
    else if (value == "false") {
      _tasks = tasks_list.filter(task => task.status == false)
    }
    else {
      _tasks = tasks_list
    }
    setFilterTask(_tasks)
    setSelectValue(value);
  }

  return (
    <>
    <h1 className="center-h">Задачи</h1>
      <div className="center-h">
        < input type="text" value={newTask} onChange={(e) => setNewTask(e.target.value)}></input>
        <button className="ml-20" onClick={click}>Создать задачу</button>
        <select className="ml-20" value={selectValue} id="func" onChange={(e) => filter_task(e.target.value)}>
          <option value={"all"}>Все задачи</option>
          <option value={"true"}>Выполненые</option>
          <option value={"false"}>Не выполненые</option>
        </select>
      </div>
      <div>
        {tasks.length === 0 ? (
          <p className="center-h">Нет задач.</p>
        ) : (
          filterTask.map((task) => (
            <div className="center-h">
            <input type="checkbox" checked={task.status} onChange={() => newStatus(task.id)} />
            <label className="w-700" key={task.id}>
              <span>{task.task}</span> 
            </label>
            <button className="ml-20" onClick={(e) => delete_click(task.id)}>Удалить</button>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default Pages;
