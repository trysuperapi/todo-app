import React, { useState, useEffect } from "react";
import "../App.css";

function Main({ title, source, API_URL, toRefresh }) {
  const [tasks, setTasks] = useState([]);
  const [newNote, setNewNote] = useState("");

  const storeTasks = async () => {
    let _tasks = await pullTasks();
    setTasks(_tasks);
  }

  useEffect(() => {
    setTasks([]);
    storeTasks();
  }, [setTasks, toRefresh]);

  const pullTasks = async () => {
    const response = await fetch(API_URL, {
      headers: {
        'X-USER-ID': 2
      }
    });
    console.log('response: ', response);
    const responseJson = await response.json();

    const _pulledTasks = responseJson['data'];
    console.log('tasks received: ', _pulledTasks);

    const pulledTasks = [];
    for (var i = 0; i < 5; i++) {
      let _pulledTask = _pulledTasks[i];
      let task = { id: _pulledTask.id, note: _pulledTask.description, project: _pulledTask.project_name, complated: false };
      pulledTasks.push(task);
    }
    return pulledTasks;
  }

  const addTask = (e) => {
    // console.log(e.target.parentElement.firstElementChild.value);
    if (e.target.parentElement.firstElementChild.value === "") {
      alert("Please enter the NOTE");
    } else {
      setTasks([...tasks, { id: Date.now(), note: newNote, complated: false }]);
      setNewNote("");
    }
  };

  const markComplated = (id) => {
    setTasks(
      tasks.map((e) => (e.id === id ? { ...e, complated: !e.complated } : e))
    );
  };

  const clearComplated = () => {
    // console.log(tasks[0].note);
    if (tasks[0].note === "") {
      alert("hepsi silindi");
    } else {
      setTasks(tasks.filter((item) => !item.complated));
    }
  };

  return (
    <div className="tasks">
      <h1>{title}</h1>
      <h3>({source})</h3>
      <section className="list-container">

        <nav className="card">
          <nav className="card-body">

            <ul id="list">
              {tasks.map((item) => (
                <li
                  key={item.id}
                  onClick={() => markComplated(item.id)}
                  className={item.complated ? "fixed" : ""}
                >
                  {item.note} ({item.project})
                </li>
              ))}
            </ul>
          </nav>
        </nav>
      </section>
    </div>
  );
}

export default Main;
