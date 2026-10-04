
import * as zod from "zod";

export const LoginSchema = zod.object({
    email: zod.email(),
    password:zod.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,"invalid password"),

})