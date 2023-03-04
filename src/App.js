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

  var proxy_url = window.SUPA_PROXY_URL + '/api/v2/candidates?job=e48cee51-09ec-4680-a50d-2ce996ee203f&status__list=null&current_stage__list=0&pipeline_candidate_stage_subset=PRE_CLIENT_REVIEW&workflow_state_subset=ACTIVE&ordering=-current_stage%2Cperson__first_name%2Cperson__last_name&limit=10&offset=60&expand=CAMPAIGN_MESSAGE_REQUEST';

  return (
    <div>
      <div>
        <button onClick={buttonClicked}>Refetch data</button>
      </div>
      <main className="container">
        <Main title='With SuperAPI' API_URL={proxy_url} toRefresh={toRefresh} />
      </main>
    </div>
  );
}

export default App;
