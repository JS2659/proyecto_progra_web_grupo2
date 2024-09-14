import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useEffect, useState } from "react";

const MySwal = withReactContent(Swal);

/**
 * Alerta para notificar una operación exitosa
 * 
 * @param {string} mensaje - Mensaje a mostrar en la alerta
 */
const alertaSuccess = (mensaje) => {
  MySwal.fire({
    title: mensaje,
    icon: "success",
  });
};

/**
 * Alerta para notificar un error en la operación
 * 
 * @param {string} mensaje - Mensaje a mostrar en la alerta 
 */
const alertaError = (mensaje) => {
  MySwal.fire({
    title: mensaje,
    icon: "error",
  });
};

/**
 * Alerta para notificar una advertencia en la operación
 * 
 * @param {string} mensaje - Mensaje a mostrar en la alerta
 * @param {string} id - (Opcional) Identificador del control para posicionar el cursor 
 */
const alertaWarning = (mensaje, id = "") => {
  onFocus(id);
  MySwal.fire({
    title: mensaje,
    icon: "warning",
  });
};


const onFocus = (id) => {
  if (id !== "") {
    document.getElementById(id).focus();
  }
};

// Componente que carga las tareas
const TaskComponent = () => {
  const [tasks, setTasks] = useState([]);

  // Carga las tareas ya guardadas desde localStorage
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  return (
    <div>
      { }
    </div>
  );
};

export { alertaSuccess, alertaError, alertaWarning, TaskComponent };
