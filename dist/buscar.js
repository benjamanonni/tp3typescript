"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buscarClaves = buscarClaves;
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const prompt = (0, prompt_sync_1.default)({ sigint: true });
//buscar por claves
function buscarClaves(tareas) {
    let tareaCoincidentes = [];
    let clave = prompt("Ingrese la palabra clave: ").toLowerCase();
    // Recorremos todas las tareas buscando coincidencias en el título
    for (let c = 0; c < tareas.length; c++) {
        if (tareas[c].titulo.toLowerCase().includes(clave)) {
            tareaCoincidentes.push(tareas[c]);
        }
    }
    // Si no hay resultados
    if (tareaCoincidentes.length === 0) {
        console.log("No se encontró ninguna tarea con esa clave.");
    }
    else {
        console.log("=== Resultados de la búsqueda ===");
        for (let c = 0; c < tareaCoincidentes.length; c++) {
            console.log((c + 1) + ".", tareaCoincidentes[c].titulo);
        }
        console.log("===============================");
    }
    return tareaCoincidentes;
}
