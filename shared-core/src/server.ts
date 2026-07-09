import cors from "cors";
import express from "express";

import apiConfig from "@shared/src/config/api.json";
import {
  closeDataProvider,
  getProductById,
  getProducts,
} from "@shared/lib/data-provider";

const app = express();
const port = Number(process.env.API_PORT ?? apiConfig.port);
const host = process.env.API_HOST ?? apiConfig.host;

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/products", (_req, res) => {
  try {
    res.json(getProducts());
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

app.get("/api/products/:id", (req, res) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    res.status(400).json({ error: "Invalid product id" });
    return;
  }

  try {
    const product = getProductById(id);

    if (!product) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

const server = app.listen(port, host, () => {
  console.log(`API listening on http://${host}:${port}`);
});

function shutdown(): void {
  closeDataProvider();
  server.close();
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
