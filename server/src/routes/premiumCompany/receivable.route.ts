/* Importing modules */
import { Router } from "express";
import * as receivableController from "../../controllers/premiumCompany/receivable.controller";
import * as receivableValidator from "../../validators/receivable.validator";


const router: Router = Router();

/* Routes */
// POST api/premium-company/receivable - Create a receivable
router.post("/", receivableValidator.createReceivable, receivableController.createReceivable);

// GET api/premium-company/receivable/get - Get all receivables
router.post("/get", receivableValidator.getFilteredReceivables, receivableController.getFilteredReceivables);

// GET api/premium-company/receivable/get/:id - Get a receivable
router.get("/get/:id", receivableController.getReceivable);

// PUT api/premium-company/receivable/update/:id - Update a receivable
router.put("/update/:id", receivableValidator.updateReceivable, receivableController.updateReceivable);

// DELETE api/premium-company/receivable/delete/:id - Delete a receivable
router.delete("/delete/:id", receivableController.deleteReceivable);

export default router;