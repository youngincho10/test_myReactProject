import { GoogleGenAI } from "@google/genai";
import { UploadedImage } from "../types";

const MODEL_NAME = 'gemini-3-pro-image-preview';

const getApiKey = (): string => {
  const apiKey =
    import.meta.env.VITE_GEMINI_API_KEY ||
    process.env.API_KEY ||
    process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("API_KEY_MISSING");
  }
  return apiKey;
};

/**
 * Generates an image merging the person and the jersey with a specific style.
 */
export const generateJerseySwapImage = async (
  personImage: UploadedImage,
  jerseyImage: UploadedImage,
  stylePrompt: string
): Promise<string> => {
  // Always create a new instance to ensure the latest key is used
  const ai = new GoogleGenAI({ apiKey: getApiKey() });

  const prompt = `
    Instructions:
    1. Analyze the first image (person) and the second image (clothing/jersey).
    2. Generate a highly realistic, high-resolution photo of the person from the first image wearing the exact clothing depicted in the second image.
    3. **Face Preservation**: Ensure the person's facial features and identity are preserved exactly.
    4. **Pose & Composition**: Do NOT simply copy the original pose. Generate a dynamic, natural, and professional football player pose that best fits the context of the environment (e.g., crossing arms, celebrating, looking determined, action shot). The pose should be varied and appropriate for a Manchester United player.
    5. **Clothing Details (CRITICAL)**: The Manchester United jersey details MUST be preserved with extreme precision. The Team Crest, Sponsor Logos (e.g., Snapdragon, Adidas), patterns, and colors must be EXACTLY as shown in the jersey image. Do not alter, distort, or hallucinate new logos. Apply the jersey realistically to the new pose with natural fabric folds, tension, and lighting.
    6. **Style/Environment**: ${stylePrompt}
    7. Aspect ratio should be 1:1.
    8. High quality, detailed, photorealistic, 8k resolution.
  `;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: {
        parts: [
          {
            text: prompt,
          },
          {
            inlineData: {
              mimeType: personImage.mimeType,
              data: personImage.base64,
            },
          },
          {
            inlineData: {
              mimeType: jerseyImage.mimeType,
              data: jerseyImage.base64,
            },
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1",
          imageSize: "1K", // 1K is faster for batch generation
        },
      },
    });

    // Extract image from response
    if (response.candidates && response.candidates[0].content.parts) {
        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                return `data:image/png;base64,${part.inlineData.data}`;
            }
        }
    }
    
    throw new Error("이미지 데이터가 없습니다.");

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    // Handle specific error for re-requesting key if needed
    if (error.message && error.message.includes("Requested entity was not found")) {
         throw new Error("API_KEY_MISSING");
    }
    throw error;
  }
};