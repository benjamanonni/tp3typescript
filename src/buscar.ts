import { Tarea } from "./alta";
import promptSync from "prompt-sync";

const prompt = promptSync({ sigint: true });

//buscar por claves
export function buscarClaves(tareas: Tarea[]): Tarea[] {
  let tareaCoincidentes: Tarea[] = [];
  let clave: string = prompt("Ingrese la palabra clave: ").toLowerCase();

  // Recorremos todas las tareas buscando coincidencias en el título
  for (let c = 0; c < tareas.length; c++) {
    if (tareas[c].titulo.toLowerCase().includes(clave)) {
      tareaCoincidentes.push(tareas[c]);
    }
  }

  // Si no hay resultados
  if (tareaCoincidentes.length === 0) {
    console.log("No se encontró ninguna tarea con esa clave.");
  } else {
    console.log("=== Resultados de la búsqueda ===");
    for (let c = 0; c < tareaCoincidentes.length; c++) {
      console.log((c + 1) + ".", tareaCoincidentes[c].titulo);
    }
    console.log("===============================");
  }

  return tareaCoincidentes;
}
