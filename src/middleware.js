import { NextResponse } from "next/server";
import { authConfig } from "./auth.config";
import NextAuth from "next-auth";

// /*
// In Next.js, middleware executes before your application components and
// API routes are loaded. If you try to access a database model schema
// directly within the middleware, it might be undefined because the
// connection and model definition might not be established yet.
// */

// using the separated auth to avoid the error
const {auth} = NextAuth(authConfig)

import {PUBLIC_ROUTES, LOGIN, ROOT, PROTECTED_SUB_ROUTES} from "@/lib/routes";

export async function middleware(request) {
  const { nextUrl } = request;
  const session = await auth();
  const isAuthenticated = !!session?.user;
  console.log(isAuthenticated, nextUrl.pathname);

  const isPublicRoute = ((PUBLIC_ROUTES.find(route => nextUrl.pathname.startsWith(route))
  || nextUrl.pathname === ROOT) && !PROTECTED_SUB_ROUTES.find(route => nextUrl.pathname.includes(route)));

  console.log(isPublicRoute);

  if (!isAuthenticated && !isPublicRoute)
    return Response.redirect(new URL(LOGIN, nextUrl));
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"]
};