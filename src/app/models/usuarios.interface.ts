export interface Usuario{
    // picture:string
    uid?:string;
    nombre:string;
    apellidos:string;
    email:string;
    // password:string;
    tipo:number; //0 maestro, 1 usuario
    division:string;
    //if alumno
    carrera?:string;
    cuatrimestre?:string;
    //if maestro
    grado?:string;
    titulo?:string;
}

