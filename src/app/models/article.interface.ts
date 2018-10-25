export interface Articulo {
    nombreArticulo:string,
    fechaPublicacion:string,
    tags:string[],
    contenido:object,
    autor:{
        nombre:string,
        carrera:string,
        tipo:string,
        picture?:string
    }

}