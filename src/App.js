import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import ToDo from "./componets/tarea/ToDoList";

function App() {
  return (
    <div className="App">
      <ToDo />
    </div>
  );
}

export default App;
