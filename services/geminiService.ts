import { GoogleGenAI, Modality } from "@google/genai";
import { GEMINI_MODEL_NAME } from "../constants";

const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found in environment variables");
  }
  return new GoogleGenAI({ apiKey });
};

/**
 * Edits an image using Gemini 2.5 Flash Image based on a text prompt.
 * @param base64Image The source image in base64 format (without data:image/ prefix if possible, though the SDK often handles it, strictly we should strip header).
 * @param prompt The text instruction for the edit.
 * @returns The base64 string of the generated image.
 */
export const editImageWithGemini = async (base64Image: string, prompt: string): Promise<string> => {
  const ai = getAiClient();

  // Clean base64 string if it includes the data URI scheme
  const cleanBase64 = base64Image.replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, "");
  const mimeTypeMatch = base64Image.match(/^data:image\/(png|jpeg|jpg|webp);base64,/);
  const mimeType = mimeTypeMatch ? `image/${mimeTypeMatch[1]}` : 'image/jpeg'; // Default to jpeg if unknown, though usually known from input

  try {
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL_NAME,
      contents: {
        parts: [
          {
            inlineData: {
              data: cleanBase64,
              mimeType: mimeType,
            },
          },
          {
            text: prompt,
          },
        ],
      },
      config: {
        responseModalities: [Modality.IMAGE],
      },
    });

    // Extract image from response
    const part = response.candidates?.[0]?.content?.parts?.[0];
    
    if (part && part.inlineData && part.inlineData.data) {
      return `data:image/png;base64,${part.inlineData.data}`;
    } else {
      throw new Error("No image data returned from Gemini.");
    }
  } catch (error) {
    console.error("Gemini Image Generation Error:", error);
    throw error;
  }
};