import swaggerJsDoc from "swagger-jsdoc";
import { __dirname } from "./utils.js";

const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'Coder eCommerce API Documentation',
            version: '1.0.0',
            description: 'API Documentation for Coder eCommerce Project',
        },
    },
    apis: [`${__dirname}/docs/**/*.yaml`],
};

export const swaggerSetup = swaggerJsDoc(swaggerOptions);