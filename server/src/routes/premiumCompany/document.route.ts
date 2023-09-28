/* Importing modules */
import { Router } from "express";
import * as documentController from "../../controllers/premiumCompany/document.controller";
import * as documentValidator from "../../validators/document.validator";


const router: Router = Router();

/* Routes */
// POST api/premium-company/document - Create a document
router.post("/", documentValidator.createDocument, documentController.createDocument);

// POST api/premium-company/document/get - Get all documents
router.post("/get", documentValidator.getFilteredDocuments, documentController.getFilteredDocuments);

// GET api/premium-company/document/get/:id - Get a document
router.get("/get/:id", documentController.getDocument);

export default router;