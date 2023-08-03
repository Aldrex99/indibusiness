/**
 * app.ts - Application for the server
 */

/* Importing modules */
import express, {Application} from 'express';
import applyMiddlewares from "./middlewares/index.middleware";
import errorHandler from "./middlewares/errorHandler.middleware";

import auth from "./routes/auth.route";

/* Creating the application */
const app: Application = express();

/* Applying middlewares */
applyMiddlewares(app);

/* Setting up the routes */
// /api/auth
app.use("/api/auth", auth);


/* Applying error handler */
app.use(errorHandler);

/* Exporting the application */
export default app;