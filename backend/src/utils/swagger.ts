// swagger.ts
import swaggerJsdoc, { type Options } from "swagger-jsdoc";
import dotenv from "dotenv";
dotenv.config();

const options: Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "1-Retail API Documentation",
      version: "1.0.0",
      description:
        "A comprehensive retail management system API for handling user authentication, product inventory, sales transactions, and credit management. Built with Express.js, MongoDB, and TypeScript to provide secure and efficient retail business operations.",
    },
    servers: [
      {
        url:
          process.env.NODE_ENV === "production"
            ? `https://your-domain.com/api`
            : `http://localhost:${process.env.PORT || 3001}`,
        description:
          process.env.NODE_ENV === "production"
            ? "Production server"
            : "Development server",
      },
    ],
  },
  apis: [
    "./src/routes/*.ts", // Path to the API docs
    "./src/routes/*.js", // Include compiled JS files too
  ],
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
