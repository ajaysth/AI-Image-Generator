import express from "express";
import type { Request, Response } from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());

app.post("/generate", async (req: Request, res: Response) => {
  const { prompt } = req.body;

  if (!prompt || typeof prompt !== "string") {
    return res
      .status(400)
      .json({ error: "Prompt is required and must be a string" });
  }

  if (!process.env.HF_API_KEY) {
    return res
      .status(500)
      .json({ error: "HF_API_KEY is not set in environment variables" });
  }

  try {
    // 1. Updated URL to use the new router path
    const response = await fetch(
      "https://router.huggingface.co/hf-inference/models/stabilityai/stable-diffusion-xl-base-1.0",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json",
          // Removed Accept: application/json because we expect an image blob
        },
        body: JSON.stringify({
          inputs: prompt,
          options: { wait_for_model: true },
        }),
      },
    );

    if (!response.ok) {
      const text = await response.text();
      console.error(`Hugging Face API error (${response.status}):`, text);
      return res.status(response.status).json({
        error: `Hugging Face API error: ${response.status} - ${text}`,
      });
    }

    // 2. Handle Binary Data
    // The model returns a PNG/JPEG, not JSON. We convert it to a Buffer.
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 3. Convert to Base64
    // This allows you to send the image as a string to React
    const base64Image = buffer.toString("base64");
    const dataUrl = `data:image/png;base64,${base64Image}`;

    res.json({ image: dataUrl });
  } catch (err) {
    console.error("Image generation failed:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
