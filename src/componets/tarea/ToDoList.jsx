import { useEffect, useState } from "react";
import { alertaSuccess, alertaError, alertaWarning } from "../../funciones";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function ToDo() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

 //desde aqui se cargan las tareas hechas NO TOCAR
 useEffect(() => {
  const storedTasks = localStorage.getItem("tasks");
  if (storedTasks) {
    setTasks(JSON.parse(storedTasks));
  }
}, []);

// Función para agregar una nueva tarea y guardar en localStorag
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

    alertaSuccess("Tarea agregada con éxito");
  } else {
    alertaError("Por favor, introduce una tarea válida");
  }
};
// --------------------------------------------------------------------------------------

  // Borrar de localStorage las tareas
  const deleteTask = async (id) => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: "¿Está seguro de eliminar la tarea?",
      icon: "question",
      text: "La tarea se eliminará de forma permanente",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const updatedTasks = tasks.filter((task) => task.id !== id);
          setTasks(updatedTasks);
          localStorage.setItem("tasks", JSON.stringify(updatedTasks));
          MySwal.fire(
            "Eliminado",
            "La tarea ha sido eliminada correctamente",
            "success"
          );
        } catch (error) {
          console.error("Error al eliminar tarea:", error);
          MySwal.fire(
            "Error",
            "No se pudo eliminar la tarea. Inténtelo de nuevo.",
            "error"
          );
        }
      }
    });
  };
// --------------------------------------------------------------------------------------

  // Editar
  const editTask = (id, newText, newStatus) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, text: newText, status: newStatus } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

// --------------------------------------------------------------------------------------

  return (
    <div className="container">

      <header>
        <h1 className="text-center my-4">...Proyecto de clase TODO List...</h1>
      </header>

      <div className="main-content">
        <div className="form-container">
          <h2 className="text-center mb-4">Añadir nueva tarea</h2>
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
              <li className="list-group-item">Aún no hay tareas</li>
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
                    onChange={(e) =>
                      editTask(task.id, e.target.value, task.status)
                    }
                  />
                </div>
                <div className="d-flex align-items-center">
                  <select
                    className="form-select mx-2"
                    value={task.status}
                    onChange={(e) =>
                      editTask(task.id, task.text, e.target.value)
                    }
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
      </div>

      <footer className="text-center mt-4">
        <h4>Grupo #2</h4>
      </footer>
    </div>
  );
}

export default ToDo;
