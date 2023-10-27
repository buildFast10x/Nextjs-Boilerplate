//config.js
const env = process.env.NEXT_PUBLIC_ENV || '';
// console.log(env);
const dev: any = {
    nextEnv: process.env.NEXT_PUBLIC_ENV || '',
    nextAuthSecret: process.env.DEV_NEXTAUTH_SECRET || '',
    app: {
        url: process.env.NEXT_PUBLIC_DEV_API_URL || ''
    },
    imageKit: {
        publicKey: process.env.NEXT_PUBLIC_DEV_IMAGEKIT_PUBLIC_KEY || '',
        privateKey: process.env.NEXT_PUBLIC_DEV_IMAGEKIT_PRIVATE_KEY || '',
        urlEndpoint: process.env.NEXT_PUBLIC_DEV_IMAGEKIT_URL_ENDPOINT || '',
        authenticationEndpoint: process.env.NEXT_PUBLIC_DEV_AUTHENTICATION_ENDPOINT || ''
    },
    client: {

    },
    server: {
        port: process.env.SERVER_PORT || '',
        db: {
            host: process.env.DEV_DB_HOST || '',
            name: process.env.DEV_DB_NAME || '',
            username: process.env.DEV_DB_USERNAME || '',
            password: process.env.DEV_DB_PASSWORD || '',
            port: process.env.PROD_DB_PORT || ''
        },
        google: {
            clientId: process.env.DEV_GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.DEV_GOOGLE_CLIENT_SECRET || ''
        }
    }
};

const prod: any = {
    nextEnv: process.env.NEXT_PUBLIC_ENV || '',
    nextAuthSecret: process.env.DEV_NEXTAUTH_SECRET || '',
    app: {
        url: process.env.NEXT_PUBLIC_PROD_API_URL || ''
    },
    tinyMCE: {
        apiKey: process.env.NEXT_PUBLIC_TINYMCE || ''
    },
    imageKit: {
        publicKey: process.env.NEXT_PUBLIC_PROD_IMAGEKIT_PUBLIC_KEY || '',
        privateKey: process.env.NEXT_PUBLIC_PROD_IMAGEKIT_PRIVATE_KEY || '',
        urlEndpoint: process.env.NEXT_PUBLIC_PROD_IMAGEKIT_URL_ENDPOINT || '',
        authenticationEndpoint: process.env.NEXT_PUBLIC_PROD_AUTHENTICATION_ENDPOINT || ''
    },
    client: {

    },
    server: {
        port: process.env.SERVER_PORT || '',
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
        }
    }
};

const config: any = {
    dev,
    prod
};

export default config[env];
