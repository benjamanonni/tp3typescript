// alta.ts
import promptSync from "prompt-sync";
const prompt = promptSync({ sigint: true });

// Definimos la estructura de una tarea
export interface Tarea {
  titulo: string;
  descripcion: string;
  estado: number;
  fechaCreacion: Date;
  fechaEdicion: Date;
  vencimiento: string;
  dificultad: string;
}
//alta
export function alta(): Tarea{ //function nombre(): retorno,osea funcion alta que retorna un dato que es tipo tarea
  //usamos constante porque le decimos que esto se define una vez y despues no mas

//titulo
let titulo: string=prompt("ingrese el nombre de la tarea").trim();
while(titulo.length>100||titulo===""){
   titulo=prompt("vuelva a ingresar el titulo").trim();
}
//descripcion
let descripcion: string=prompt("ingrese la descripcion de la tarea").trim();
while(descripcion.length>500){
  descripcion=prompt("ingrese de nuevo la descripcion").trim()
}
//estado
let estado: number=Number(prompt("ingrese el numero del estado actual,1-pendiente,2-en curso,3-terminada,4-cancelada"));
//lo pasamos a number porque prompt por base siempre es string
if(estado!==1&&estado!==2&&estado!==3&&estado!==4){
  console.log("se asigno pendiente por defecto");
  estado=1;
}
//fecha de creacion y edicion
let fechaCreacion: Date=new Date();//genera date de forma automatica
let fechaEdicion=fechaCreacion;

//fecha de vencimiento
let diaVencimiento: number=Number(prompt("ingrese el dia de vencimiento"));
while(diaVencimiento<1||diaVencimiento>31){
  diaVencimiento=Number(prompt("ingrese correctamente el dia de vencimiento"));
}
let mesVencimiento:number=Number(prompt("ingrese el mes de vencimiento"));
while(mesVencimiento<1||mesVencimiento>12){
  mesVencimiento=Number(prompt("ingrese el mes de vencimiento"));
}

//dificultad
let dificultad:string=prompt("ingrese la dificultad (facil, media, dificil)").toLowerCase();
if(dificultad!=="facil" && dificultad!=="media"&&dificultad!=="dificil"){
  console.log("se asigno media por estandar");
  dificultad="media";
}
//creamos el objeto para retornarlo
let tarea:Tarea={ //declaramos objeto tarea de tipo Tarea
  titulo,
    descripcion,
    estado,
    fechaCreacion,
    fechaEdicion,
    vencimiento:diaVencimiento+"/"+mesVencimiento,
    dificultad
}
console.log("tarea creada con exito");
return tarea;
}
