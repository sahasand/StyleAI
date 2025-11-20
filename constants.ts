
import { StyleOption } from './types';

const BASE_INSTRUCTION = "Maintain the identity of the person and the photorealistic style. Output high quality image.";

export const STYLE_PRESETS: StyleOption[] = [
  // --- FEMALE HAIR - SHORT ---
  { id: 'fh_s1', label: 'Pixie Cut', category: 'hair', gender: 'female', subCategory: 'short', promptSuffix: `Change the hair to a chic pixie cut. ${BASE_INSTRUCTION}` },
  { id: 'fh_s2', label: 'Bob Cut', category: 'hair', gender: 'female', subCategory: 'short', promptSuffix: `Change the hair to a stylish short bob cut. ${BASE_INSTRUCTION}` },
  { id: 'fh_s3', label: 'Undercut', category: 'hair', gender: 'female', subCategory: 'short', promptSuffix: `Change the hair to an edgy undercut style. ${BASE_INSTRUCTION}` },

  // --- FEMALE HAIR - MEDIUM ---
  { id: 'fh_m1', label: 'Lob (Long Bob)', category: 'hair', gender: 'female', subCategory: 'medium', promptSuffix: `Change the hair to a shoulder-length long bob (lob). ${BASE_INSTRUCTION}` },
  { id: 'fh_m2', label: 'Shaggy Layers', category: 'hair', gender: 'female', subCategory: 'medium', promptSuffix: `Change the hair to a medium length shag with texture. ${BASE_INSTRUCTION}` },
  { id: 'fh_m3', label: 'Bangs & Layers', category: 'hair', gender: 'female', subCategory: 'medium', promptSuffix: `Change hair to shoulder length with stylish bangs. ${BASE_INSTRUCTION}` },

  // --- FEMALE HAIR - LONG ---
  { id: 'fh_l1', label: 'Long Waves', category: 'hair', gender: 'female', subCategory: 'long', promptSuffix: `Change the hair to long, flowing waves. ${BASE_INSTRUCTION}` },
  { id: 'fh_l2', label: 'Elegant Updo', category: 'hair', gender: 'female', subCategory: 'long', promptSuffix: `Change the hair to an elegant updo. ${BASE_INSTRUCTION}` },
  { id: 'fh_l3', label: 'Straight & Sleek', category: 'hair', gender: 'female', subCategory: 'long', promptSuffix: `Change the hair to long, straight and sleek. ${BASE_INSTRUCTION}` },
  
  // --- MALE HAIR - SHORT ---
  { id: 'mh_s1', label: 'Crew Cut', category: 'hair', gender: 'male', subCategory: 'short', promptSuffix: `Change the hair to a clean crew cut with a fade. ${BASE_INSTRUCTION}` },
  { id: 'mh_s2', label: 'Buzz Cut', category: 'hair', gender: 'male', subCategory: 'short', promptSuffix: `Change the hair to a military style buzz cut. ${BASE_INSTRUCTION}` },
  { id: 'mh_s3', label: 'Textured Crop', category: 'hair', gender: 'male', subCategory: 'short', promptSuffix: `Change the hair to a textured crop. ${BASE_INSTRUCTION}` },

  // --- MALE HAIR - MEDIUM ---
  { id: 'mh_m1', label: 'Pompadour', category: 'hair', gender: 'male', subCategory: 'medium', promptSuffix: `Change the hair to a stylish modern pompadour. ${BASE_INSTRUCTION}` },
  { id: 'mh_m2', label: 'Side Part', category: 'hair', gender: 'male', subCategory: 'medium', promptSuffix: `Change the hair to a classic gentleman's side part. ${BASE_INSTRUCTION}` },
  { id: 'mh_m3', label: 'Messy Quiff', category: 'hair', gender: 'male', subCategory: 'medium', promptSuffix: `Change the hair to a medium length messy quiff. ${BASE_INSTRUCTION}` },

  // --- MALE HAIR - LONG ---
  { id: 'mh_l1', label: 'Man Bun', category: 'hair', gender: 'male', subCategory: 'long', promptSuffix: `Change the hair to a stylish man bun. ${BASE_INSTRUCTION}` },
  { id: 'mh_l2', label: 'Surfer Flow', category: 'hair', gender: 'male', subCategory: 'long', promptSuffix: `Change the hair to a shoulder-length surfer flow style. ${BASE_INSTRUCTION}` },
  { id: 'mh_l3', label: 'Slick Back', category: 'hair', gender: 'male', subCategory: 'long', promptSuffix: `Change the hair to a long slicked back style. ${BASE_INSTRUCTION}` },

  // --- COLORS (BOTH) ---
  { id: 'c1', label: 'Platinum Blonde', category: 'color', gender: 'both', promptSuffix: `Change hair color to platinum blonde. Do not change the color of the eyebrows. ${BASE_INSTRUCTION}` },
  { id: 'c2', label: 'Brunette', category: 'color', gender: 'both', promptSuffix: `Change hair color to rich chocolate brunette. Do not change the color of the eyebrows. ${BASE_INSTRUCTION}` },
  { id: 'c3', label: 'Redhead', category: 'color', gender: 'both', promptSuffix: `Change hair color to vibrant red. Do not change the color of the eyebrows. ${BASE_INSTRUCTION}` },
  { id: 'c4', label: 'Silver/Grey', category: 'color', gender: 'both', promptSuffix: `Change hair color to a sophisticated silver grey. Do not change the color of the eyebrows. ${BASE_INSTRUCTION}` },
  { id: 'c5', label: 'Pastel Pink', category: 'color', gender: 'both', promptSuffix: `Change hair color to pastel pink. Do not change the color of the eyebrows. ${BASE_INSTRUCTION}` },

  // --- FEMALE OUTFITS ---
  { id: 'fo1', label: 'Business Suit', category: 'outfit', gender: 'female', promptSuffix: `Change the outfit to a tailored women's business suit. ${BASE_INSTRUCTION}` },
  { id: 'fo2', label: 'Evening Gown', category: 'outfit', gender: 'female', promptSuffix: `Change the outfit to an elegant evening gown. ${BASE_INSTRUCTION}` },
  { id: 'fo3', label: 'Summer Dress', category: 'outfit', gender: 'female', promptSuffix: `Change the outfit to a floral summer dress. ${BASE_INSTRUCTION}` },
  { id: 'fo4', label: 'Leather Jacket', category: 'outfit', gender: 'female', promptSuffix: `Change the outfit to include a stylish leather jacket over a casual top. ${BASE_INSTRUCTION}` },
  { id: 'fo5', label: 'Boho Chic', category: 'outfit', gender: 'female', promptSuffix: `Change the outfit to a bohemian chic style with a flowing skirt. ${BASE_INSTRUCTION}` },

  // --- MALE OUTFITS ---
  { id: 'mo1', label: 'Tuxedo', category: 'outfit', gender: 'male', promptSuffix: `Change the outfit to a classic black tuxedo. ${BASE_INSTRUCTION}` },
  { id: 'mo2', label: 'Business Casual', category: 'outfit', gender: 'male', promptSuffix: `Change the outfit to a blazer with a white shirt and chinos. ${BASE_INSTRUCTION}` },
  { id: 'mo3', label: 'Streetwear', category: 'outfit', gender: 'male', promptSuffix: `Change the outfit to trendy streetwear with a hoodie and jacket. ${BASE_INSTRUCTION}` },
  { id: 'mo4', label: 'Leather Jacket', category: 'outfit', gender: 'male', promptSuffix: `Change the outfit to a cool leather jacket and jeans. ${BASE_INSTRUCTION}` },
  { id: 'mo5', label: 'Polo & Shorts', category: 'outfit', gender: 'male', promptSuffix: `Change the outfit to a summer polo shirt and shorts. ${BASE_INSTRUCTION}` },

  // --- MAGIC EDIT (BOTH) ---
  { id: 'e1', label: 'Vintage Filter', category: 'edit', gender: 'both', promptSuffix: `Apply a vintage 90s photo filter. ${BASE_INSTRUCTION}` },
  { id: 'e2', label: 'Studio Background', category: 'edit', gender: 'both', promptSuffix: `Remove the background and make it a solid studio grey color. ${BASE_INSTRUCTION}` },
  { id: 'e3', label: 'Golden Hour', category: 'edit', gender: 'both', promptSuffix: `Change the lighting to a warm golden hour sunset. ${BASE_INSTRUCTION}` },
  { id: 'e4', label: 'Neon Cyberpunk', category: 'edit', gender: 'both', promptSuffix: `Apply a neon cyberpunk lighting effect. ${BASE_INSTRUCTION}` },
  { id: 'e5', label: 'Pencil Sketch', category: 'edit', gender: 'both', promptSuffix: `Convert the image into a high detail pencil sketch. ${BASE_INSTRUCTION}` },
];

export const CUSTOM_EDIT_EXAMPLES = [
  { 
    label: '🧍 Stand Up', 
    prompt: 'Transform the person into a standing full-body pose, showing the complete outfit and shoes. Maintain photorealism.' 
  },
  { 
    label: '🌈 Vibrant Hair', 
    prompt: 'Dye the hair electric blue with purple highlights, keeping the eyebrows and face natural.' 
  },
  { 
    label: '👗 Gala Outfit', 
    prompt: 'Change the outfit to a luxurious red velvet gala dress with gold accessories.' 
  },
  { 
    label: '🏝️ Tropical BG', 
    prompt: 'Change the background to a sunny tropical beach with palm trees, adjusting lighting to match.' 
  },
  { 
    label: '📸 Pro Headshot', 
    prompt: 'Crop and style as a professional corporate headshot with a blurred office background.' 
  }
];

export const GEMINI_MODEL_NAME = 'gemini-2.5-flash-image';
