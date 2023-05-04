export interface User {
  id: number;
  name: string;
  surname: string;
  username: string;
  team: string;
  password: string
}

export interface LoginDTO {
  username: string;
  password: string;
}

export interface RegisterDTO {
  name: string;
  surname: string;
  username: string;
  password: string;
  team: string
}
