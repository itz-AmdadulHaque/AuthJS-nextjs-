import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "./model/user-model";
import bcrypt from "bcryptjs";
import { dbConnect } from "./lib/dbConnect";
import { authConfig } from "./auth.config";

// here auth gives us the session with info form google or github
// add this handler to [...nextauth]/route.ts to get {get, post} method
export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      // this functionis for applying logic for credential provider
      //it recives the credential info which is given in singIn() method
      async authorize(credentials) {
        await dbConnect();
        if (credentials === null) return null;

        try {
          const user = await User.findOne({
            email: credentials?.email,
          }).select("+password +role"); // won't get them if you don't include them
          console.log("///user: ", user);

          if (user) {
            const isMatch = await bcrypt.compare(
              credentials.password,
              user.password
            );

            if (isMatch) {
              return user;
            } else {
              throw new Error("Email or Password is not correct");
            }
          } else {
            throw new Error("User not found");
          }
        } catch (error) {
          throw new Error(error);
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,

      // (optional) this gives user a "do you want continue" option
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

  //authjs give us default singin page in 'api/auth/signin' route.  we don't want user to able to open that page, rather use our custom page
  // tell auth that, use my custom page for signin, without it user can visit both page but now only to my custom page.
  pages: {
    signIn: "/login",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      console.log("/////jwt user: ", user);
      console.log("/////jwt token: ", token);
      return token;
    },

    async session({ session, token }) {
      if (token?.sub && token?.role) {
        session.user.id = token.sub;
        session.user.role = token.role;
      }
      console.log("///// session token: ", token);
      console.log("///// session: ", session);
      return session;
    },

    signIn: async ({ user, account }) => {
      console.log("///provider Name: ", account?.provider);
      console.log("////signing user: ", user);

      if (account?.provider === "google" || account?.provider === "github") {
        try {
          const { email, name, image, id } = user; // from google or gihub

          await dbConnect();
          const alreadyUser = await User.findOne({ email });
          console.log("/////alreadyUser: ", alreadyUser);

          if (!alreadyUser) {
            const newUser = await User.create({
              email,
              name,
              image,
              authProviderId: id,
            });
            console.log("////OAuth new user: ", newUser);

            user.role = newUser.role;
            return true;
          }

          user.role = alreadyUser.role;
          return true;
        } catch (error) {
          throw new Error("Error while creating user");
        }
      }

      if (account?.provider === "credentials") {
        return true;
      } else {
        return false;
      }
    },
  },
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
