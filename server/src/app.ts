/**
 * app.ts - Application for the server
 */

/* Importing modules */
import express, {Application} from 'express';
import applyMiddlewares from "./middlewares/index.middleware";
import errorHandler from "./middlewares/errorHandler.middleware";

/* Creating the application */
const app: Application = express();

/* Applying middlewares */
applyMiddlewares(app);

/* Setting up the routes */


/* Applying error handler */
app.use(errorHandler);

/* Exporting the application */
export default app;