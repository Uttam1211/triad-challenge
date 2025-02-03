import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import yaml from "js-yaml";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const yamlFile = fs.readFileSync(
      path.join(process.cwd(), "openapi.yaml"),
      "utf8"
    );
    const spec = yaml.load(yamlFile);
    res.status(200).json(spec);
  } catch (error) {
    console.error("Error loading OpenAPI spec:", error);
    res.status(500).json({ error: "Failed to load API specification" });
  }
}
