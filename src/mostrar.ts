import { Tarea } from "./alta";
import {editarTarea} from "./editar";
import promptSync from "prompt-sync";

//mostrar todas las tareas,solo mostramos el titulo y la identificamos a cada una con un indice
export function mostrarTareas(tareas:Tarea[]):void{ //tareas es de tipo Tarea[] osea es un array que contiene objetos de tipo Tarea
for(let c:number=0;c<tareas.length;c++){
  console.log((c+1)+"-titulo"+ tareas[c].titulo)
}
}

//mostrar pendiente,vamos a hacer comparaciones en todo el array donde cumpla lo almacenamos en otro array
export function mostrarPendientes(tareas:Tarea[]):void{
  let filtroPendiente: Tarea[]=[];//filtro pendiente es de tipo arraytarea y esun array
  for(let c=0;c<tareas.length;c++){
    if(tareas[c].estado===1){
      filtroPendiente.push(tareas[c]);
    }
  }
if(filtroPendiente.length===0){
        console.log("no hay tarea en estado pendiente")
    }
//mostrar filtro pendiente 
    for(let c=0;c<filtroPendiente.length;c++){
        console.log((c+1)+".",filtroPendiente[c].titulo);
    }
}

//mostrar tareas en curso
export function mostrarCurso(tareas:Tarea[]):void{
  let filtroCurso:Tarea[]=[];
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
    } else {
        // Muestro las tareas filtradas
        for (let c = 0; c < filtroCurso.length; c++) {
            console.log((c+1)+".",filtroCurso[c].titulo);
        }
    }
}

export function mostrarTerminadas(tareas:Tarea[]):void{
  let filtroTerminadas:Tarea[]=[];
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
    } else {
        // Muestro las tareas filtradas
        for (let c = 0; c < filtroTerminadas.length; c++) {
            console.log((c+1)+".",filtroTerminadas[c].titulo);
        }
    }
}
//ordenar por fechas para eso usamos el algoritmo de burbuja
export function ordenarFechas(tareas: Tarea[]):void{
   for (let i = 0; i < tareas.length - 1; i++) {
        for (let j = 0; j < tareas.length - 1 - i; j++) {
            // Comparo fechas: si la de la izquierda es mayor, las intercambio
            if (tareas[j].fechaCreacion.getTime() > tareas[j+1].fechaCreacion.getTime()) { //se usa getime porque no se pueude comparar el date sino
                let aux = tareas[j];      // guardo la tarea en aux
                tareas[j] = tareas[j+1];  // muevo la derecha a la izquierda
                tareas[j+1] = aux;        // pongo aux en la derecha
            }
        }
    }
}

//mostrar detalles de forma expandida
export function mostrarDetalles(tareas:Tarea[]):void{
  let opcion:number;
  do{
    console.log("Ingrese el número de la tarea a detallar");
    console.log("0 - para volver al menú");  
    opcion = Number(prompt("Ingrese una opción válida: "));
    let t:Tarea=tareas[opcion-1];//acceso directo a tarea

    if(opcion>=1&&opcion<=tareas.length){
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
            let opcion1:number=Number(prompt("desea editarla(1-si,2-no)"));

            if(opcion1===1){
              editarTarea(t);//se edita la tarea t
            }else{
              console.log("opcion invalida");
            }
  }while(opcion!==0);
}
