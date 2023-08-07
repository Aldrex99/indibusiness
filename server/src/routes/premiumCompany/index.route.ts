/* Importing modules */
import { Router } from "express";

import client from "./client.route";
import supplier from "./supplier.route";
import debt from "./debt.route";

const router: Router = Router();

/* Routes */
// api/premium-company/client
router.use("/client", client);

// api/premium-company/supplier
router.use("/supplier", supplier);

// api/premium-company/debt
router.use("/debt", debt);


// router.use("/receivable", receivable);
// router.use("/document", document);

export default router;