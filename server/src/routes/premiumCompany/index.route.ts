/* Importing modules */
import { Router } from "express";

import client from "./client.route";

const router: Router = Router();

/* Routes */
// api/premium-company/client
router.use("/client", client);


// router.use("/supplier", supplier);
// router.use("/receivable", receivable);
// router.use("/debt", debt);
// router.use("/document", document);

export default router;