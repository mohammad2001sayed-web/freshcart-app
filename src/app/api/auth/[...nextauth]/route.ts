import { authJsConfing } from "@/app/auhtConfing/auhtConfing";
import NextAuth from "next-auth";

const {handlers: {GET, POST}} = NextAuth(authJsConfing);

export {GET, POST};
