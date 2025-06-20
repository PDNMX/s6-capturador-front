export interface User {
  _id?: number; // Opcional, se asignará al crear/editar
  username: string;
  password: string;
  client_id: string;
  client_secret: string;
  scope: string[];

  nombre: string;
  primerApellido: string;
  segundoApellido: string;
  institution: string; // ID o nombre, dependiendo del catálogo
  roles: string[]; // Arreglo de roles asignados
}
