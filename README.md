# Authjs (Adding credential login) ([doc](https://authjs.dev/))

A simple app to learn Authjs. Root page("/") has a navbar with login option, and  a link to visit 'products' page. User can see the products page and product detail page, but to buy (checkout page) user must have to login. When user login they will see thier image icon on navbar which is a link to visit dashbaord page, user also need to be login to see this page. User can logout using logout button, shown in the navbar after login. User can also register if not have an acount.

Backend api consist of 'register' route and 'me' route. 'me' route return user info and only be access after login.

We store the user info in mongodb database when they register using credetials(email, password). we did not store the user info when they login with OAuth like google or github. we will do it later.  Now only the user who is register with credentials(email, password) can login. 

## Authentication and Authorization
### Frontend
- we use middleware to apply authentication in the frontend using Authjs.
### Backend api
- we check the session using Authjs in every route, if the user is login or not. (did not use any middleware)
- we made a register route to handle registering user. (does not need to login access this route)

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
