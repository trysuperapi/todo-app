import React, { useState } from "react";
import { useEffect } from "react";
import "../App.css";
function Time() {
  const [clock, setClock] = useState(0);

  const d = new Date();
  const calendar = `${d.getUTCDate()}- ${d.getMonth() + 1}- ${d.getFullYear()}`;
  useEffect(() => {
    setInterval(() => {
      setClock(new Date().toLocaleTimeString());
    }, 1000);
  }, []);
  return (
    <div className="date">
      <span>{clock}</span> <span>{calendar}</span>
    </div>
  );
}

export default Time;
