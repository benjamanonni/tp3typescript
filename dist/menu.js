"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.menu = menu;
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const alta_1 = require("./alta");
const mostrar_1 = require("./mostrar");
const buscar_1 = require("./buscar");
const prompt = (0, prompt_sync_1.default)({ sigint: true });
//menú principal
function menu(tareas) {
    let opciones;
    let opcionVer;
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
                            (0, mostrar_1.ordenarFechas)(tareas);
                            (0, mostrar_1.mostrarTareas)(tareas);
                            (0, mostrar_1.mostrarDetalles)(tareas);
                            break;
                        case 2:
                            (0, mostrar_1.ordenarFechas)(tareas);
                            (0, mostrar_1.mostrarPendientes)(tareas);
                            (0, mostrar_1.mostrarDetalles)(tareas);
                            break;
                        case 3:
                            (0, mostrar_1.ordenarFechas)(tareas);
                            (0, mostrar_1.mostrarCurso)(tareas);
                            (0, mostrar_1.mostrarDetalles)(tareas);
                            break;
                        case 4:
                            (0, mostrar_1.ordenarFechas)(tareas);
                            (0, mostrar_1.mostrarTerminadas)(tareas);
                            (0, mostrar_1.mostrarDetalles)(tareas);
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
                const resultados = (0, buscar_1.buscarClaves)(tareas);
                if (resultados.length > 0) {
                    (0, mostrar_1.mostrarDetalles)(resultados);
                }
                break;
            case 3:
                console.log("---Agregar una tarea ---");
                const tareaNueva = (0, alta_1.alta)();
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
