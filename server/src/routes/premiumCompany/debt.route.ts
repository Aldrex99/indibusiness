/* Importing modules */
import { Router } from "express";
import * as debtController from "../../controllers/premiumCompany/debt.controller";
import * as debtValidator from "../../validators/debt.validator";


const router: Router = Router();

/* Routes */
// POST api/premium-company/debt - Create a debt
router.post("/", debtValidator.createDebt, debtController.createDebt);

// GET api/premium-company/debt/get - Get all debts
router.post("/get", debtValidator.getFilteredDebts, debtController.getFilteredDebts);

// GET api/premium-company/debt/get/:id - Get a debt
router.get("/get/:id", debtController.getDebt);

// PUT api/premium-company/debt/update/:id - Update a debt
router.put("/update/:id", debtValidator.updateDebt, debtController.updateDebt);

// DELETE api/premium-company/debt/delete/:id - Delete a debt
router.delete("/delete/:id", debtController.deleteDebt);

export default router;