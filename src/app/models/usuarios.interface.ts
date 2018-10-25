export interface Usuario{
    // picture:string
    uid?:string;
    nombre:string;
    apellidos:string;
    email:string;
    // password:string;
    tipo:string; //0 maestro, 1 usuario
    division:string;
    //if alumno
    carrera?:{
        abr:string,
        titulo:string,
        label:string
    };
    cuatrimestre?:string;
    //if maestro
    grado?:{
        abr:string,
        titulo:string,
    };
    titulo?:string;
}

