import { handleUserRegister } from "./register.action";
import { RigesterDataType } from "./register.interface";

export async function sendUserDataRegister(userData: RigesterDataType) {
   handleUserRegister(userData);
}
