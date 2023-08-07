/* Importing modules */
import { Router } from "express";
import * as debtController from "../../controllers/premiumCompany/debt.controller";
import * as debtValidator from "../../validators/debt.validator";


const router: Router = Router();

/* Routes */
// POST api/premium-company/debt - Create a debt
router.post("/", debtValidator.createDebt, debtController.createDebt);

// GET api/premium-company/debt - Get all debts
router.get("/", debtValidator.getFilteredDebts, debtController.getFilteredDebts);

// GET api/premium-company/debt/:id - Get a debt
router.get("/:id", debtController.getDebt);

// PUT api/premium-company/debt/:id - Update a debt
router.put("/:id", debtValidator.updateDebt, debtController.updateDebt);

// DELETE api/premium-company/debt/:id - Delete a debt
router.delete("/:id", debtController.deleteDebt);

export default router;