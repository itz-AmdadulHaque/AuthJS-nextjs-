# Authjs (Adding credential login) ([doc](https://authjs.dev/))

A simple app to learn Authjs. Every page has the common layout with a navbar in the top. In the navbar, User will see login button if they did not logged in yet. If they logged in they will see a Dashbaord, Admin, image icon and a logout button. When user login with OAuth like google they will see a image return from google, if they login with credentials(email, password), they will see the image icon. 

Root page("/") has a link to visit 'products' page. User can see the products page and product detail page, but to buy (checkout page) user must have to login.

'/home', '/dashboard', '/admin' these page are protected pages, user must have to login if they want to visit these pages. Again only Admin can visit the '/admin' page.

Backend api consist of 'register' route and 'me' route. 'me' route return user info and only be access after login. By default we have given every user the role as 'user'. If you want to make any user 'Admin' you have to do it manually in the database.

We store the user info in mongodb database when they register using credetials(email, password). When user login with OAuth like google or github, if the user logging for the first time, we store the user in the database.

### Frontend

- we use middleware to apply authentication in the frontend using Authjs.

### Backend api

- we check the session using Authjs in every route, if the user is login or not. (did not use any middleware)
- we made a register route to handle registering user. (does not need to login access this route)

### Problem
- Everything is fine working in dev mode, but when we try to build we get error, as we are using auth from 'auth.js' which using mongodb connection and middleware don't support this, due to edge runtime.

- Again if we use separated auth from 'auth.config.js' to get the auth session in middleware, then the problem solve. but we are not gettting the role in the session in middleware.

### solve
If we don't use middleware then we can use the auth() to check session in every route in frontend or in backend, its work fine, but here we try to add the middleware and way to solve it.

## packages

- Authjs
- lucide-react -> for icons
- mongoose
- bcryptjs

## env variables

- GOOGLE_CLIENT_ID
- GOOGLE_CLIENT_SECRET
- AUTH_SECRET
- GITHUB_CLIENT_ID
- GITHUB_CLIENT_SECRET

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
