/* Importing modules */
import { Router } from "express";

import client from "./client.route";
import supplier from "./supplier.route";
import debt from "./debt.route";
import receivable from "./receivable.route";
import document from "./document.route";

const router: Router = Router();

/* Routes */
// api/premium-company/client
router.use("/client", client);

// api/premium-company/supplier
router.use("/supplier", supplier);

// api/premium-company/debt
router.use("/debt", debt);

// api/premium-company/receivable
router.use("/receivable", receivable);

// api/premium-company/document
router.use("/document", document);

export default router;