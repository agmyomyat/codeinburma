import { parseEnv } from "znv";
import { z } from "zod";

export const TypeEnv = parseEnv(process.env, {
CMS_DATABASE_URL:z.string().min(1),
DATABASE_URL:z.string().min(1),
PAYLOAD_SECRET:z.string().min(1),
});