import "dotenv/config";
import { createServer } from "../server";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const app = createServer();

export default async (req: VercelRequest, res: VercelResponse) => {
  // Only handle API routes - let Vercel serve static files for everything else
  if (!req.url?.startsWith('/api')) {
    return res.status(404).send('Not Found');
  }
  
  return app(req as any, res as any);
};
