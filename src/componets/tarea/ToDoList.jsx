import { useEffect, useState } from "react";
import axios from "axios";
import { alertaSuccess, alertaError, alertaWarning } from "../../funciones";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { defer } from "react-router-dom";

function ToDo() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const MySwal = withReactContent(Swal);

  // Aqui me carga las tareas ya guardadas
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);


/**
 * Alerta para notificar un error en la operación
 * 
 * @param {string} mensaje - Mensaje a mostrar en la alerta 
 */
const alertaError = (mensaje) => {
  MySwal.fire({
    title: mensaje,
    icon: 'error',
  });
};

/**
 * Alerta para notificar éxito en la operación
 * 
 * @param {string} mensaje - Mensaje a mostrar en la alerta 
 */
const alertaExito = (mensaje) => {
  MySwal.fire({
    title: mensaje,
    icon: 'success',
  });
};


  // Este es el boton para agregar una nueva tarea y guardar en localStorage
  const addTask = () => {
    if (newTask.trim() !== "") {
      const task = {
        id: Date.now(),
        text: newTask,
        status: "Por hacer",
      };
      const updatedTasks = [...tasks, task];
      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      setNewTask("");
  
      // Reemplazar la alerta clásica por SweetAlert2
      alertaExito("Tarea agregada con éxito");
    } else {
      alertaError("Por favor, introduce una tarea válida");
    }
  };
  
  // borrar de localstorege las taras
  const deleteTask = async (id) => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
        title: '¿Está seguro de eliminar la tarea?',
        icon: 'question',
        text: 'La tarea se eliminará de forma permanente',
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar'
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                const updatedTasks = tasks.filter((task) => task.id !== id);
                setTasks(updatedTasks);
                localStorage.setItem("tasks", JSON.stringify(updatedTasks));
                MySwal.fire('Eliminado', 'La tarea ha sido eliminada correctamente', 'success');
            } catch (error) {
                console.error('Error al eliminar tarea:', error);
                MySwal.fire('Error', 'No se pudo eliminar la tarea. Inténtelo de nuevo.', 'error');
            }
        }
    });
};



  // Editar
  const editTask = (id, newText, newStatus) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, text: newText, status: newStatus } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };


  
  return (
    <div className="container">
      <h1 className="text-center my-4">
       TODO List Grup #2
      </h1>

      <div className="row mb-3">
        <div className="col-md-8">
          <input
            type="text"
            className="form-control"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Ingrese Tarea"
          />
        </div>
        <div className="col-md-4">
          <button className="btn btn-primary w-100" onClick={addTask}>
           + Agregar tarea
          </button>
        </div>
      </div>

      <ul className="list-group">
        {tasks.length === 0 && (
          <li className="list-group-item">aun no hay tareas</li>
        )}
        {tasks.map((task) => (
          <li
            key={task.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
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
              <span
                className="btn btn-danger"
                onClick={() => deleteTask(task.id)}
              >
                Eliminar
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ToDo;
