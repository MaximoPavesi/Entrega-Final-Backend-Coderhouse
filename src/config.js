import dotenv from 'dotenv';
dotenv.config();

export default {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    MONGO_URL: process.env.MONGO_URL,
    PERSISTENCE: process.env.PERSISTENCE || 'MONGO',
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
    GMAIL_USER: process.env.GMAIL_USER,
    GMAIL_PASSWORD: process.env.GMAIL_PASSWORD,
}