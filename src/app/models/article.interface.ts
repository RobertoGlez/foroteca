export interface Articulo {
    idArticulo?:string
    nombreArticulo:string,
    fechaPublicacion:string,
    fechaModificacion?:string,
    tags:Tag[],
    contenido:any,
    autor:{
        uid:string,
        nombre:string,
        grado?:Grade,
        carrera?:string,
        tipo:string,
        picture?:string
    }
    categoria:{
        division:string,
        carrera:string,
    };

}

interface Tag {
    value:string
}

interface Grade {
    abr:string,
    titulo:string
}