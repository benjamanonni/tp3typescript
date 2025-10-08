"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mostrarTareas = mostrarTareas;
exports.mostrarPendientes = mostrarPendientes;
exports.mostrarCurso = mostrarCurso;
exports.mostrarTerminadas = mostrarTerminadas;
exports.ordenarFechas = ordenarFechas;
exports.mostrarDetalles = mostrarDetalles;
const editar_1 = require("./editar");
//mostrar todas las tareas,solo mostramos el titulo y la identificamos a cada una con un indice
function mostrarTareas(tareas) {
    for (let c = 0; c < tareas.length; c++) {
        console.log((c + 1) + "-titulo" + tareas[c].titulo);
    }
}
//mostrar pendiente,vamos a hacer comparaciones en todo el array donde cumpla lo almacenamos en otro array
function mostrarPendientes(tareas) {
    let filtroPendiente = []; //filtro pendiente es de tipo arraytarea y esun array
    for (let c = 0; c < tareas.length; c++) {
        if (tareas[c].estado === 1) {
            filtroPendiente.push(tareas[c]);
        }
    }
    if (filtroPendiente.length === 0) {
        console.log("no hay tarea en estado pendiente");
    }
    //mostrar filtro pendiente 
    for (let c = 0; c < filtroPendiente.length; c++) {
        console.log((c + 1) + ".", filtroPendiente[c].titulo);
    }
}
//mostrar tareas en curso
function mostrarCurso(tareas) {
    let filtroCurso = [];
    // Recorro todas las tareas y guardo las que están en curso
    for (let c = 0; c < tareas.length; c++) {
        if (tareas[c].estado === 2) { // 2 = en curso
            filtroCurso.push(tareas[c]);
        }
    }
    // Si no encontré ninguna
    if (filtroCurso.length === 0) {
        console.log("No hay tareas en curso");
        return;
    }
    else {
        // Muestro las tareas filtradas
        for (let c = 0; c < filtroCurso.length; c++) {
            console.log((c + 1) + ".", filtroCurso[c].titulo);
        }
    }
}
function mostrarTerminadas(tareas) {
    let filtroTerminadas = [];
    // Recorro todas las tareas y guardo las que están terminadas
    for (let c = 0; c < tareas.length; c++) {
        if (tareas[c].estado === 3) { // 3 = terminada
            filtroTerminadas.push(tareas[c]);
        }
    }
    // Si no encontré ninguna
    if (filtroTerminadas.length === 0) {
        console.log("No hay tareas terminadas");
        return;
    }
    else {
        // Muestro las tareas filtradas
        for (let c = 0; c < filtroTerminadas.length; c++) {
            console.log((c + 1) + ".", filtroTerminadas[c].titulo);
        }
    }
}
//ordenar por fechas para eso usamos el algoritmo de burbuja
function ordenarFechas(tareas) {
    for (let i = 0; i < tareas.length - 1; i++) {
        for (let j = 0; j < tareas.length - 1 - i; j++) {
            // Comparo fechas: si la de la izquierda es mayor, las intercambio
            if (tareas[j].fechaCreacion.getTime() > tareas[j + 1].fechaCreacion.getTime()) { //se usa getime porque no se pueude comparar el date sino
                let aux = tareas[j]; // guardo la tarea en aux
                tareas[j] = tareas[j + 1]; // muevo la derecha a la izquierda
                tareas[j + 1] = aux; // pongo aux en la derecha
            }
        }
    }
}
//mostrar detalles de forma expandida
function mostrarDetalles(tareas) {
    let opcion;
    do {
        console.log("Ingrese el número de la tarea a detallar");
        console.log("0 - para volver al menú");
        opcion = Number(prompt("Ingrese una opción válida: "));
        let t = tareas[opcion - 1]; //acceso directo a tarea
        if (opcion >= 1 && opcion <= tareas.length) {
            console.log("---------------");
            console.log("Nombre: " + t.titulo);
            console.log("Estado: " + t.estado);
            console.log("Fecha creación: " + t.fechaCreacion);
            console.log("Última edición: " + t.fechaEdicion);
            console.log("Vencimiento: " + t.vencimiento);
            console.log("Dificultad: " + t.dificultad);
            console.log("---------------");
        }
        //editar la tarea
        let opcion1 = Number(prompt("desea editarla(1-si,2-no)"));
        if (opcion1 === 1) {
            (0, editar_1.editarTarea)(t); //se edita la tarea t
        }
        else {
            console.log("opcion invalida");
        }
    } while (opcion !== 0);
}
