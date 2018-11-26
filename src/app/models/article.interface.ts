export interface Articulo {
    idArticulo?:string
    nombreArticulo:string,
    fechaPublicacion:string,
    tags:Tag[],
    contenido:any,
    autor:{
        nombre:string,
        carrera:string,
        tipo:string,
        picture?:string
    }

}

interface Tag {
    value:string
}