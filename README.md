# Authjs (Adding credential login) ([doc](https://authjs.dev/))

A simple app where in the home page user will find a form to login with email and password or use google or github  to login. If user login with google or github, user will be redirected to the home page. where the user can see user name, image and a logout button. if user used credetial to login(email, password) then they will see only thier name and logout button. we added a register page, where user can register using credentials(email, password). 

We store the user info in mongodb database when they register using credetials(email, password). we did not store the user info when they login with OAuth like google or github. we will do it later.  Now only the user who is register with credentials(email, password) can login. Again user can login with google or github as we did handle storing OAuth registration in db  yet.

we made a register route to handle register and updated authjs.

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
