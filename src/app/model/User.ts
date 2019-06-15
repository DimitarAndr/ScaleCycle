export class User {
  _id;
  _acl;
  _kmd;
  nombre;
  apellido;
  username;
  password;
  estado;
  token?: string;

  public static printUser(user: User): void {
    console.log('Nombre: ' + user.nombre);
  }
}


