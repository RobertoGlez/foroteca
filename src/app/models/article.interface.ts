export interface Articulo {
    nombreArticulo:string,
    fechaPublicacion:string,
    tags:Tag[],
    contenido:object,
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