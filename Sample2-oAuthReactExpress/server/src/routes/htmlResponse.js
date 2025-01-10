import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();

// Get the current directory name (since __dirname is not available in ES modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.get("/", (req, res) => {
  console.log("response");
  res.render("htmlAuth");
});

export default router;
