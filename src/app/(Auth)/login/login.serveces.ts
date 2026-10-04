import { handleUserLogin } from "./login.action";
import { LoginDataType } from "./login.interface";

export async function sendUserDataLogin(userData: LoginDataType) {
const res = await   handleUserLogin(userData);

if(res === "Login successful"){
    return "success"
}
throw new Error(res);

}
