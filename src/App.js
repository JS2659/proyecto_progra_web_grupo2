import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  // Aqui me carga las tareas ya guardadas
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);



  // Este es el boton para agregar una nueva tarea y guardar en localStorage
  const addTask = () => {
    if (newTask.trim() !== '') {
      const task = {
        id: Date.now(),
        text: newTask,
        status: 'Por hacer'
      };
      const updatedTasks = [...tasks, task];
      setTasks(updatedTasks);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks)); 
      setNewTask('');
    }
  };

  // borrar de localstorege las taras
  const deleteTask = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks)); 
  };

  // Editar
  const editTask = (id, newText, newStatus) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, text: newText, status: newStatus } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks)); 
  };

  return (
    <div className="container">
      <h1 className="text-center my-4">Mi Lista de Tareas (TODO List Grupo 3)</h1>

      
      <div className="row mb-3">
        <div className="col-md-8">
          <input
            type="text"
            className="form-control"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Nueva tarea"
          />
        </div>
        <div className="col-md-4">
          <button className="btn btn-primary w-100" onClick={addTask}>Agregar tarea</button>
        </div>
      </div>

      
      <ul className="list-group">
        {tasks.length === 0 && <li className="list-group-item">aun no hay tareas</li>}
        {tasks.map(task => (
          <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div className="flex-grow-1">
              <input
                type="text"
                className="form-control mb-2"
                value={task.text}
                onChange={(e) => editTask(task.id, e.target.value, task.status)}
              />
            </div>
            <div className="d-flex align-items-center">
              <select
                className="form-select mx-2"
                value={task.status}
                onChange={(e) => editTask(task.id, task.text, e.target.value)}
              >
                <option value="Por hacer">Por hacer</option>
                <option value="En progreso">En progreso</option>
                <option value="Finalizada">Finalizada</option>
              </select>
              <button className="btn btn-danger" onClick={() => deleteTask(task.id)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
