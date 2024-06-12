import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

// here auth gives us the session with info form google or github
// add this handler to [...nextauth]/route.ts to get {get, post} method
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,

      // (optional) use this, if you are not storing the login info in db for persistance login
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    GitHubProvider({
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
  
        // (optional) use this, if you are not storing the login info in db for persistance login
        authorization: {
          params: {
            prompt: "consent",
            access_type: "offline",
            response_type: "code",
          },
        },
      }),
  ],
});

// Google
// where to get the secret for google provider
// goto 'google cloude platfrom' or "google cloude platfrom"
// then select the 'console' and then select "api and services"
// select 'credentials' and create a credential.
// when creating credential choose 'Oauth"
// then you will get a form. choos aplication type "web app"
// "Authorised js origin" is for withlisting URLs, only from those URLs the auth service can be used
// "Authorized redirect URIs" set it like "http://localhost:3000/api/auth/callback/google". in this url google will send a callback, so we must have a route like that in our application.
// remember this callback route must be in this format as given above "api/auth/callback/name". here our 'api/auth/[...nextauth]' catch all this kind of auth provider callback route and they get integreted with 'next-auth'
// now click create button, then you will get client id and secret, add this in env file. and done.
// create a secrete key and store it in env as 'AUTH_SECRET' , first run 'node' in terminal then paste this "require('crypto').randomBytes(64).toString('hex')"
// now if you past this in url "http://localhost:3000/api/auth/signin", you will see a page with "singin with google" button appear without you building it.
// now all we have to do to trigger it using our custom button

// GitHub
// got to setting and choose 'developer setting' option at bottom
// choose "Oauth apps" , you can choose "github apps" for bigger app
// then click on "new oauth app" , then give your domain in "homepage url"
// now give the "Authorization callback URL" as before "http://localhost:3000/api/auth/callback/github"
// click on regisert and done. you will get the api as before save in env.

// remember to config image setting for googe and github domain