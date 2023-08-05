/* Importing modules */
import { Router } from "express";
import * as clientController from "../../controllers/premiumCompany/client.controller";
import * as clientValidator from "../../validators/client.validator";


const router: Router = Router();

/* Routes */
// POST api/premium-company/client - Create a client
router.post("/", clientValidator.createClient, clientController.createClient);

// GET api/premium-company/client - Get all clients
router.get("/", clientController.getAllClients);

// GET api/premium-company/client/:id - Get a client
router.get("/:id", clientController.getClient);

// PUT api/premium-company/client/:id - Update a client
router.put("/:id", clientValidator.updateClient, clientController.updateClient);

// DELETE api/premium-company/client/:id - Delete a client
router.delete("/:id", clientController.deleteClient);

export default router;