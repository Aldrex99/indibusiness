/* Importing modules */
import { Router } from "express";

import client from "./client.route";
import supplier from "./supplier.route";

const router: Router = Router();

/* Routes */
// api/premium-company/client
router.use("/client", client);

// api/premium-company/supplier
router.use("/supplier", supplier);

// router.use("/receivable", receivable);
// router.use("/debt", debt);
// router.use("/document", document);

export default router;