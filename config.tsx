//config.js
const env = process.env.NEXT_PUBLIC_ENV || '';
// console.log(env);
const dev: any = {
    app: {
        url: process.env.NEXT_PUBLIC_DEV_API_URL || ''
    },
    googleLogin: {
        clientid: process.env.NEXT_PUBLIC_DEV_GOOGLE_CLIENT_ID || ''
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
        }
    }
};

const prod: any = {
    app: {
        url: process.env.NEXT_PUBLIC_PROD_API_URL || ''
    },
    googleLogin: {
        clientid: process.env.NEXT_PUBLIC_PROD_GOOGLE_CLIENT_ID || ''
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
        }   
    }
};

const config: any = {
    dev,
    prod
};

export default config[env];
