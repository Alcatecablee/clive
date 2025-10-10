import "dotenv/config";
import { createServer } from "../server";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const app = createServer();

export default async (req: VercelRequest, res: VercelResponse) => {
  return app(req as any, res as any);
};
