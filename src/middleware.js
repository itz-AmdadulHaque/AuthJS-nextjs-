import {PUBLIC_ROUTES, LOGIN, ROOT, PROTECTED_SUB_ROUTES} from "@/lib/routes";
import { authConfig } from "./auth.config";
import NextAuth from "next-auth";
import { auth } from "./auth";

// /*
// In Next.js, middleware executes before your application components and
// API routes are loaded. If you try to access a database model schema
// directly within the middleware, it might be undefined because the
// connection and model definition might not be established yet.
// */

// using the separated auth to avoid the error
// const {auth} = NextAuth(authConfig)

export async function middleware(request) {
  console.log("///////////////midleware//////")
  const { nextUrl } = request;
  const session = await auth();
  const isAuthenticated = !!session?.user;

  
  
  console.log("/////session: ", session?.user)
  console.log("///role: ", session?.user?.role)
  console.log("///auth: ",isAuthenticated, "   ///Url: ", nextUrl.pathname);

  const isPublicRoute = ((PUBLIC_ROUTES.find(route => nextUrl.pathname.startsWith(route))
  || nextUrl.pathname === ROOT) && !PROTECTED_SUB_ROUTES.find(route => nextUrl.pathname.includes(route)));

  console.log("////public route: ",isPublicRoute);

  if (isAuthenticated && nextUrl.pathname === '/admin' && session?.user?.role !== "Admin"){
    return Response.redirect(new URL('/unauthorize', nextUrl));
  }

  if (!isAuthenticated && !isPublicRoute)
    return Response.redirect(new URL(LOGIN, nextUrl));
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"]
};