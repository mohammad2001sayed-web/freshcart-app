import NextAuth from "next-auth";
import { authJsConfing } from "@/app/auhtConfing/auhtConfing";

export const { handlers, auth, signIn, signOut } = NextAuth(authJsConfing);