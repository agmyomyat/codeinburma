import { parseEnv } from "znv";
import { z } from "zod";

export const TypeEnv = parseEnv(process.env, {
  CMS_DATABASE_URL: z.string().min(1),
  //   DATABASE_URL: z.string().min(1),
  PAYLOAD_SECRET: z.string().min(1),
  S3_BUCKET: z.string().min(1),
  S3_ACCOUNT_ID: z.string().min(1),
  S3_ACCESS_KEY_ID: z.string().min(1),
  S3_SECRET_ACCESS_KEY: z.string().min(1),
  S3_REGION: z.string().min(1),
  S3_ENDPOINT: z.string().optional(),
})