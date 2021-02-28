import { User } from "../database/user/user.entity";

export interface AuthInterface {
  email: string,
  password: string
}

export interface AuthResponseInterface {
  user: User,
  token: string
}
