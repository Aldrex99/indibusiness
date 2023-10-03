import { IRequestUser } from "../../models/user.model";
import { Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import * as documentService from "../../services/document.service";
import * as productService from "../../services/product.service";
import { IDocumentCreate, IDocumentCreatePDF, IGetFilteredDocuments } from "../../models/document.model";
import { getUser } from "../../services/user.service";
import { IProductDocumentCreation } from "../../models/product.model";
import { convertDateToISO8601 } from "../../utils/dateFormat.util";
import { addAtTotalReceivable } from "../../services/client.service";
import { createReceivable } from "../../services/receivable.service";
import { IReceivableCreation } from "../../models/receivable.model";
import { translateType } from "../../utils/translateTypeStatus.util";

export const createDocument = async (req: IRequestUser, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      code: 422,
      message: "Les données envoyées sont incorrectes",
      errors: errors.array(),
    });
  }

  const user_id: string = req.user.id;

  // Get the user information
  const user = await getUser(user_id);

  if (!user) {
    return res.status(404).json({
      code: 404,
      message: "Utilisateur introuvable",
    });
  }

  const {
    type,
    number,
  } = req.body;

  const products: IProductDocumentCreation[] = req.body.products;

  const documentLink = `${type}-${number}-${user_id}.pdf`;
  
  try {
    if ("legalForm" in user) {
      const dbDocumentInformations: IDocumentCreate = {
        user_id,
        client_id: req.body.client_id,
        type,
        number,
        date: convertDateToISO8601(req.body.date),
        dueDate: req.body.dueDate ? convertDateToISO8601(req.body.dueDate) : null,
        legalForm: user.legalForm,
        name: user.name,
        address: user.address,
        addressComplement: user.addressComplement,
        zipCode: user.zipCode,
        city: user.city,
        clientLegalForm: req.body.clientLegalForm,
        clientName: req.body.clientName,
        clientAddress: req.body.clientAddress,
        clientAddressComplement: req.body.clientAddressComplement,
        clientZipCode: req.body.clientZipCode,
        clientCity: req.body.clientCity,
        totalHT: req.body.totalHT,
        totalTTC: req.body.totalTTC,
        totalTVA: req.body.totalTVA,
        additionalCostName: req.body.additionalCostName,
        additionalCostAmount: req.body.additionalCostAmount,
        generalDiscountRate: req.body.generalDiscountRate,
        generalDiscountAmount: req.body.generalDiscountAmount,
        specialMention: req.body.specialMention,
        status: req.body.status,
        documentLink,
      };

      const pdfDocumentInformations: IDocumentCreatePDF = {
        ...dbDocumentInformations,
        siren: user.siren,
        tva: user.tva,
      }

      const documentCreated = await documentService.PDFGenerateAndUpload(pdfDocumentInformations, products);

      if (documentCreated) {
        const dbDocument = await documentService.saveDocumentInformations(dbDocumentInformations);

        products.map(async (product: IProductDocumentCreation) => {
          await productService.documentProductCreate({
            document_id: dbDocument.id,
            shortId: product.shortId,
            name: product.name,
            description: product.description,
            unitPrice: product.unitPrice,
            unit: product.unit,
            quantity: product.quantity,
            tvaRate: product.tvaRate,
            discountRate: product.discountRate,
          });
        });

        if (req.body.status === "pending") {
          await addAtTotalReceivable(user_id, req.body.client_id, req.body.totalTTC);
        }

        const ReceivableData: IReceivableCreation = {
          user_id,
          client_id: req.body.client_id,
          document_id: dbDocument.id,
          client_name: req.body.clientName,
          name: `${translateType(type)}-${number}`,
          amount: req.body.totalTTC,
          dueDate: convertDateToISO8601(req.body.dueDate),
          status: req.body.status,
        }

        await createReceivable(ReceivableData);


        const document = await documentService.downloadDocumentSignedURL(documentLink);

        return res.status(201).json({
          message: "Document créé",
          document: document,
        });
      } else {
        return res.status(500).json({
          code: 500,
          message: "Erreur lors de la création du document",
        });
      }
    }
  } catch (err) {
    if (err) {
      return next(err);
    }
  }
}

export const getFilteredDocuments = async (req: IRequestUser, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      code: 422,
      message: "Les données envoyées sont incorrectes",
      errors: errors.array(),
    });
  }

  const user_id: string = req.user.id;
  const {
    skip= 0,
    take = 10,
    search = "",
    status = "",
    type = "",
    orderBy = "createdAt",
    order = "asc",
  }: IGetFilteredDocuments = req.body;

  try {
    const documents = await documentService.getFilteredDocuments({
      user_id,
      skip,
      take,
      search,
      status,
      type,
      orderBy,
      order,
    });

    const documentsChangeURL = await Promise.all(documents.map(async (document) => {
      return {
        ...document,
        documentLink: await documentService.downloadDocumentSignedURL(document.documentLink),
      };
    }));

    return res.status(200).json({
      message: "Documents récupérés",
      documents: documentsChangeURL,
    });
  } catch (err) {
    next(err);
  }
}

export const getDocument = async (req: IRequestUser, res: Response, next: NextFunction) => {
  const user_id: string = req.user.id;
  const document_id: number = parseInt(req.params.id);

  try {
    const document = await documentService.getDocumentInformations(user_id, document_id);

    const documentChangeURL = await Promise.all(document.map(async (document) => {
      return {
        ...document,
        documentLink: await documentService.downloadDocumentSignedURL(document.documentLink),
      };
    }));

    return res.status(200).json({
      message: "Document récupéré",
      document: await documentChangeURL,
    });
  } catch (err) {
    next(err);
  }
}