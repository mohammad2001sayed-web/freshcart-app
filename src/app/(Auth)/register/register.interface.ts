import * as zod from "zod";
import { registerSchema } from "./register.zod";

export type RigesterDataType = zod.infer<typeof registerSchema>;