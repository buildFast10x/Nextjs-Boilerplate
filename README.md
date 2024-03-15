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
### Add these .env values

```printenv
NEXTAUTH_SECRET=""
NEXTAUTH_URL=""
DATABASE_URL=""
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
STRIPE_SECRET_KEY=""
STRIPE_WEBHOOK_SECRET=""
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=""
NEXT_PUBLIC_STRIPE_PRO_PRICE_ID=""
NEXT_PUBLIC_STRIPE_MAX_PRICE_ID=""
NEXT_PUBLIC_STRIPE_ULTRA_PRICE_ID=""
RESEND_API_KEY=""
```


##### Create / Manage billing api route 
POST http://localhost:3000/api/billing
also update stripe/config file

##### Add your Email template or update email template
app/component/email

##### Send email api route
POST http://localhost:3000/api/email

##### Stripe webhooks api
POST http://localhost:3000/api/webhooks/stripe

##### Update next-auth/config
For adding more oauth providers 
For adding or removing user details in login session


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

