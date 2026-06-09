// Todos los servicion de la base de datos tiene que estar definido aqui
export interface IServicios {
    id:             number;
    titulo:         string;
    categoria:      string;
    descripcion:    string;
    tecnologias:    string[];
    imagen:         string;
}