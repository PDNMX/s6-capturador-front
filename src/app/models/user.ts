export interface User {
  _id?: number; // Opcional, se asignará al crear/editar
  nombre: string;
  primerApellido: string;
  segundoApellido: string;
  institucion: string; // ID o nombre, dependiendo del catálogo
  roles: string[]; // Arreglo de roles asignados
}
