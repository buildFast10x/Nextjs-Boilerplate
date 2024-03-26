//config.js
const env = process.env.NEXT_PUBLIC_ENV || '';
// console.log(env);

const dev: any = {
    nextEnv: process.env.NEXT_PUBLIC_ENV || '',
    nextAuth: {
        secret: process.env.NEXTAUTH_SECRET || '',
        url: process.env.DEV_NEXTAUTH_URL || ''
    },
    app: {
        url: process.env.NEXT_PUBLIC_DEV_API_URL || ''
    },
    google: {
        clientId: process.env.DEV_GOOGLE_CLIENT_ID || '',
        clientSecret: process.env.DEV_GOOGLE_CLIENT_SECRET || ''
    },
    db: {
        host: process.env.DEV_DB_HOST || '',
        name: process.env.DEV_DB_NAME || '',
        username: process.env.DEV_DB_USERNAME || '',
        password: process.env.DEV_DB_PASSWORD || '',
        port: process.env.PROD_DB_PORT || '',
        url: process.env.DEV_DATABASE_URL || ''
    },
    stripe: {
        secret: process.env.DEV_STRIPE_SECRET_KEY || '',
        webhook: process.env.DEV_STRIPE_WEBHOOK_SECRET || '',
        publishable: process.env.DEV_NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''
    },
    resend: {
        apiKey: process.env.DEV_RESEND_API_KEY || ''
    }
};

const prod: any = {
    nextEnv: process.env.NEXT_PUBLIC_ENV || '',
    nextAuthSecret: process.env.NEXTAUTH_SECRET || '',
    app: {
        url: process.env.NEXT_PUBLIC_PROD_API_URL || ''
    },
    db: {
        host: process.env.PROD_DB_HOST || '',
        name: process.env.PROD_DB_NAME || '',
        username: process.env.PROD_DB_USERNAME || '',
        password: process.env.PROD_DB_PASSWORD || '',
        port: process.env.PROD_DB_PORT || ''
    },
    google: {
        clientId: process.env.PROD_GOOGLE_CLIENT_ID || '',
        clientSecret: process.env.PROD_GOOGLE_CLIENT_SECRET || ''
    },
    stripe: {
        secret: process.env.PROD_STRIPE_SECRET_KEY || '',
        webhook: process.env.PROD_STRIPE_WEBHOOK_SECRET || '',
        publishable: process.env.PROD_NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''
    },
    resend: {
        apiKey: process.env.PROD_RESEND_API_KEY || ''
    }
};

const config: any = {
    dev,
    prod
};

export default config[env];