import * as zod from "zod";
import { LoginSchema } from "./login.zod";

export type LoginDataType = zod.infer<typeof LoginSchema>;


export interface LoginResponseType {
  message: "success" | "Incorrect email or password"
  user: User
  token: string
  statusMsg: string
}

export interface User {
  name: string
  email: string
  role: string
}
