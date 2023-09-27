import { S3Client } from "@aws-sdk/client-s3";

export const s3Client = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  endpoint: process.env.AWS_S3_ENDPOINT, // Ajoutez votre endpoint OVH ici
  forcePathStyle: true, // Utile si vous utilisez un endpoint différent de celui d'AWS standard
  region: process.env.AWS_REGION, // La région peut également être importante
});