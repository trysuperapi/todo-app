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
    let promises = [];
    for (var i = 0; i < 10; i++) {
      const response = fetch("https://pop-sf3.superapi.cloud/ready", {
        headers: {
          // 'x-superapi-host': 'app.dover.io',
          // 'X-USER-ID': 2
        }
      });
      promises.push(response);
    }
    await Promise.all(promises);
    // const response = await fetch(API_URL, {
    //   headers: {
    //     'x-superapi-host': 'app.dover.io',
    //     'X-USER-ID': 2
    //   }
    // });
    // const responseJson = await response.json();

    // const _pulledTasks = responseJson['data'];

    const pulledTasks = [];
    // for (var i = 0; i < 2; i++) {
    //   let _pulledTask = _pulledTasks[i];
    //   pulledTasks.push(_pulledTask);
    // }
    return pulledTasks;
  }

  const addTask = (e) => {
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
                  {item.description} for {item.project.client.name}
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
