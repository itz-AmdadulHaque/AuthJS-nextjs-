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

export async function doCredentialLogin(formData) {
  console.log("formData", formData);

  try {
    const response = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,   // user might have email or password error, so dont redirect
    });
    return response;
  } catch (err) {
    throw err;
  }
}
