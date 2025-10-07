"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const prompt = (0, prompt_sync_1.default)({ sigint: true });
//alta
function alta() {
    //usamos constante porque le decimos que esto se define una vez y despues no mas
    //titulo
    let titulo = prompt("ingrese el nombre de la tarea").trim();
    while (titulo.length > 100 || titulo === "") {
        titulo = prompt("vuelva a ingresar el titulo").trim();
    }
    //descripcion
    let descripcion = prompt("ingrese la descripcion de la tarea").trim();
    while (descripcion.length > 500) {
        descripcion = prompt("ingrese de nuevo la descripcion").trim();
    }
    //estado
    let estado = Number(prompt("ingrese el numero del estado actual,1-pendiente,2-en curso,3-terminada,4-cancelada"));
    //lo pasamos a number porque prompt por base siempre es string
    if (estado !== 1 && estado !== 2 && estado !== 3 && estado !== 4) {
        console.log("se asigno pendiente por defecto");
        estado = 1;
    }
    //fecha de creacion y edicion
    let fechaCreacion = new Date(); //genera date de forma automatica
    let fechaEdicion = fechaCreacion;
    //fecha de vencimiento
    let diaVencimiento = Number(prompt("ingrese el dia de vencimiento"));
    while (diaVencimiento < 1 || diaVencimiento > 31) {
        diaVencimiento = Number(prompt("ingrese correctamente el dia de vencimiento"));
    }
    let mesVencimiento = Number(prompt("ingrese el mes de vencimiento"));
    while (mesVencimiento < 1 || mesVencimiento > 12) {
        mesVencimiento = Number(prompt("ingrese el mes de vencimiento"));
    }
    //dificultad
    let dificultad = prompt("ingrese la dificultad (facil, media, dificil)").toLowerCase();
    if (dificultad !== "facil" && dificultad !== "media" && dificultad !== "dificil") {
        console.log("se asigno media por estandar");
        dificultad = "media";
    }
    //creamos el objeto para retornarlo
    let tarea = {
        titulo,
        descripcion,
        estado,
        fechaCreacion,
        fechaEdicion,
        vencimiento: diaVencimiento + "/" + mesVencimiento,
        dificultad
    };
    console.log("tarea creada con exito");
    return tarea;
}
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
            editarTarea(t); //se edita la tarea t
        }
        else {
            console.log("opcion invalida");
        }
    } while (opcion !== 0);
}
//editar tarea
function editarTarea(tarea) {
    console.log("esta editando la tarea:" + tarea);
    console.log("si desea dejar igual un atributo aprete enter"); //para eso revisamos todo el tiempo con if que sea !==""
    // Descripción
    let nuevaDescripcion = prompt("Ingrese la descripción (enter para dejar igual): ");
    if (nuevaDescripcion.trim() !== "") {
        tarea.descripcion = nuevaDescripcion;
    }
    // Estado
    let entrada = prompt("Estado (1-pendiente, 2-en curso, 3-terminada, 4-cancelada, enter para dejar igual): ");
    if (entrada.trim() !== "") {
        let numEstado = Number(entrada);
        if (numEstado === 1 || numEstado === 2 || numEstado === 3 || numEstado === 4) {
            tarea.estado = numEstado;
        }
        else {
            console.log("Estado inválido, se mantiene el anterior.");
        }
    }
    // Dificultad
    let entradaDificultad = prompt("Dificultad (facil, media, dificil, enter para dejar igual): ").toLowerCase();
    if (entradaDificultad.trim() !== "") {
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
    let nuevoDia = prompt("Ingrese el día de vencimiento (1-31, enter para dejar igual): ");
    let nuevoMes = prompt("Ingrese el mes de vencimiento (1-12, enter para dejar igual): ");
    if (nuevoDia.trim() !== "" && nuevoMes.trim() !== "") {
        let nuevoDiaVerificar = Number(nuevoDia); //no se puede reasigar nuevoDia como number,por eso creamos nueva variable
        let nuevoMesVerificar = Number(nuevoMes);
        if (nuevoDiaVerificar >= 1 && nuevoDiaVerificar <= 31 && nuevoMesVerificar >= 1 && nuevoMesVerificar <= 12) {
            tarea.vencimiento = nuevoDia + "/" + nuevoMes;
        }
        else {
            console.log("Fecha inválida, se mantiene la anterior.");
        }
    }
    console.log(" Tarea editada con éxito:", tarea);
}
//buscar por claves
function buscarClaves(tareas) {
    let tareaCoincidentes = [];
    let clave = prompt("ingrese la palabra clave").toLowerCase();
    for (let c = 0; c < tareas.length; c++) {
        if (tareas[c].titulo.indexOf(clave) !== -1) {
            tareaCoincidentes.push(tareas[c]);
        }
    }
    if (tareaCoincidentes.length === 0) {
        console.log(" No se encontró ninguna tarea con esa clave.");
    }
    else {
        for (let c = 0; c < tareaCoincidentes.length; c++) {
            console.log((c + 1) + ".", tareaCoincidentes[c].titulo);
        }
    }
    return tareaCoincidentes;
}
//menu
function menu(tareas) {
    let opciones;
    let opcionAlta;
    do {
        console.log("1-ver mis tareas");
        console.log("2-buscar una tarea");
        console.log("3-agregar una tarea");
        console.log("4-salir");
        opciones = Number(prompt("ingrese una opcion"));
        switch (opciones) {
            case 1:
                do {
                    console.log("Elija qué tarea desea ver");
                    console.log("1-Todas");
                    console.log("2-Pendientes");
                    console.log("3-En curso");
                    console.log("4-Terminadas");
                    console.log("5-Volver");
                    opcionAlta = Number(prompt("Ingrese una opción"));
                    switch (opcionAlta) {
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
                            console.log("Volviendo...");
                            break;
                        default:
                            console.log("Opción inválida");
                            break;
                    }
                } while (opcionAlta !== 5);
                break;
            case 2:
                let resultados = buscarClaves(tareas);
                if (resultados.length > 0) {
                    mostrarDetalles(resultados);
                }
                break;
            case 3:
                console.log("Agregando una tarea...");
                let tarea1 = alta();
                tareas.push(tarea1);
                break;
            case 4:
                console.log("Saliendo...");
                break;
            default:
                console.log("Opción inválida. Intenta de nuevo.");
                break;
        }
    } while (opciones !== 4);
}
//MAIN
function main(tareas) {
    menu(tareas);
}
main([]); //comienza con una lista vacia de tareas
