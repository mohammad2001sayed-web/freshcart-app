import * as zod from "zod";
import { rigesterSchema } from "./register.zod";

export type RigesterDataType = zod.infer<typeof rigesterSchema>;