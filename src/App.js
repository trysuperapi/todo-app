import React, { useState } from "react";
import Main from "./components/Main";
import Time from "./components/Time";
import Header from "./components/Header";

function App() {
  const [toRefresh, setToRefresh] = useState(false);

  const buttonClicked = (e) => {
    e.preventDefault();
    console.log('button has been clicked');
    let t = !toRefresh;
    setToRefresh(t);
  }

  var proxy_url = window.SUPA_PROXY_URL + '/lua/todo/tasks?limit=5';

  return (
    <div>
      <div>
        <header>
          <h2>Dummy Todo List</h2>
        </header>
        <button onClick={buttonClicked}>Refresh</button>
      </div>
      <main className="container">
        <Main title='From Source' source='AWS US-East-1' API_URL='https://demo-origin.trysuperapi.com/todo/tasks?limit=5' toRefresh={toRefresh} />
        <Main title='From SuperAPI' source='Datacenter closest to user' API_URL={proxy_url} toRefresh={toRefresh} />
      </main>
    </div>
  );
}

export default App;
