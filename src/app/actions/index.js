"use server";

import { signIn, signOut } from "@/auth";

export async function doSocialLogin(formData) {
  const action = formData.get("action");
  await signIn(action, { redirectTo: "/home" });
  // action ="google", sign in will trigger "api/auth/callback/google" and after login redirect
  // console.log(action)
}

export async function doLogout() {
  await signOut({ redirectTo: "/" });
  // console.log(action)
}
