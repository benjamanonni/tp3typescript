"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editarTarea = editarTarea;
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const prompt = (0, prompt_sync_1.default)({ sigint: true });
//editar tarea
function editarTarea(tarea) {
    console.log("Está editando la tarea: " + tarea.titulo);
    console.log("Si desea dejar igual un atributo, presione Enter.");
    // Descripción
    let nuevaDescripcion = prompt("Ingrese la descripción (Enter para dejar igual): ").trim();
    if (nuevaDescripcion !== "") {
        tarea.descripcion = nuevaDescripcion;
    }
    // Estado
    let entrada = prompt("Estado (1-pendiente, 2-en curso, 3-terminada, 4-cancelada, Enter para dejar igual): ").trim();
    if (entrada !== "") {
        let numEstado = Number(entrada);
        if (numEstado === 1 || numEstado === 2 || numEstado === 3 || numEstado === 4) {
            tarea.estado = numEstado;
        }
        else {
            console.log("Estado inválido, se mantiene el anterior.");
        }
    }
    // Dificultad
    let entradaDificultad = prompt("Dificultad (facil, media, dificil, Enter para dejar igual): ").toLowerCase().trim();
    if (entradaDificultad !== "") {
        if (entradaDificultad === "facil" || entradaDificultad === "media" || entradaDificultad === "dificil") {
            tarea.dificultad = entradaDificultad;
        }
        else {
            console.log("Dificultad inválida, se mantiene la anterior.");
        }
    }
    // Fecha de edición siempre se actualiza
    tarea.fechaEdicion = new Date();
    // Vencimiento
    let nuevoDia = prompt("Ingrese el día de vencimiento (1-31, Enter para dejar igual): ").trim();
    let nuevoMes = prompt("Ingrese el mes de vencimiento (1-12, Enter para dejar igual): ").trim();
    if (nuevoDia !== "" && nuevoMes !== "") {
        let nuevoDiaVerificar = Number(nuevoDia);
        let nuevoMesVerificar = Number(nuevoMes);
        if (nuevoDiaVerificar >= 1 && nuevoDiaVerificar <= 31 && nuevoMesVerificar >= 1 && nuevoMesVerificar <= 12) {
            tarea.vencimiento = `${nuevoDiaVerificar}/${nuevoMesVerificar}`;
        }
        else {
            console.log("Fecha inválida, se mantiene la anterior.");
        }
    }
    console.log("Tarea editada con éxito:", tarea);
}
