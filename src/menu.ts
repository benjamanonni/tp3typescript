import promptSync from "prompt-sync";
import { Tarea, alta } from "./alta";
import { mostrarTareas, mostrarPendientes, mostrarCurso, mostrarTerminadas, mostrarDetalles, ordenarFechas } from "./mostrar";
import { buscarClaves } from "./buscar";

const prompt = promptSync({ sigint: true });

//menú principal
export function menu(tareas: Tarea[]): void {
  let opciones: number;
  let opcionVer: number;

  do {
    console.log("\n====== MENÚ PRINCIPAL ======");
    console.log("1 - Ver mis tareas");
    console.log("2 - Buscar una tarea");
    console.log("3 - Agregar una tarea");
    console.log("4 - Salir");
    console.log("============================");

    opciones = Number(prompt("Ingrese una opción: "));

    switch (opciones) {
      case 1:
        do {
          console.log("\n--- Ver tareas ---");
          console.log("1 - Todas");
          console.log("2 - Pendientes");
          console.log("3 - En curso");
          console.log("4 - Terminadas");
          console.log("5 - Volver");
          opcionVer = Number(prompt("Ingrese una opción: "));

          switch (opcionVer) {
            case 1:
              ordenarFechas(tareas);
              mostrarTareas(tareas);
              mostrarDetalles(tareas);
              break;
            case 2:
              ordenarFechas(tareas);
              mostrarPendientes(tareas);
              mostrarDetalles(tareas);
              break;
            case 3:
              ordenarFechas(tareas);
              mostrarCurso(tareas);
              mostrarDetalles(tareas);
              break;
            case 4:
              ordenarFechas(tareas);
              mostrarTerminadas(tareas);
              mostrarDetalles(tareas);
              break;
            case 5:
              console.log("Volviendo al menú principal...");
              break;
            default:
              console.log("Opción inválida");
              break;
          }
        } while (opcionVer !== 5);
        break;

      case 2:
        const resultados = buscarClaves(tareas);
        if (resultados.length > 0) {
          mostrarDetalles(resultados);
        }
        break;

      case 3:
        console.log("---Agregar una tarea ---");
        const tareaNueva = alta();
        tareas.push(tareaNueva);
        break;

      case 4:
        console.log("Saliendo del programa...");
        break;

      default:
        console.log("Opción inválida,intente nuevamente.");
        break;
    }
  } while (opciones !== 4);
}
