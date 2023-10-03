/* Importing modules */
import { Router } from "express";
import * as supplierController from "../../controllers/premiumCompany/supplier.controller";
import * as supplierValidator from "../../validators/supplier.validator";


const router: Router = Router();

/* Routes */
// POST api/premium-company/supplier - Create a supplier
router.post("/", supplierValidator.createSupplier, supplierController.createSupplier);

// GET api/premium-company/supplier - Get all suppliers
router.get("/", supplierController.getAllSuppliers);

// GET api/premium-company/supplier/:id - Get a supplier
router.get("/:id", supplierController.getSupplier);

// PUT api/premium-company/supplier/:id - Update a supplier
router.put("/:id", supplierValidator.updateSupplier, supplierController.updateSupplier);

// DELETE api/premium-company/supplier/:id - Delete a supplier
router.delete("/:id", supplierController.deleteSupplier);

export default router;