/**
 * server.ts - Server for the application
 */

/* Importing modules */
import * as http from "http";
import * as app from "./app";
import * as dotenv from "dotenv";

dotenv.config();

/* Creating the server */
const server : http.Server = http.createServer(app.default);

/* Setting up the server */
const port : number = Number(process.env.PORT) || 8000;

/* Starting the server */
server.listen(port, () => {
  console.log(`Server started on port ${port} at ${new Date()}!`);
  console.log(`Prisma Client is ready`);
});