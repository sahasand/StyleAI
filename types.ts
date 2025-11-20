
export interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  timestamp: number;
}

export type StyleCategory = 'hair' | 'color' | 'outfit' | 'edit';
export type Gender = 'male' | 'female';
export type HairLength = 'short' | 'medium' | 'long';

export interface StyleOption {
  id: string;
  label: string;
  promptSuffix: string;
  category: StyleCategory;
  gender: Gender | 'both';
  subCategory?: HairLength;
}

export enum AppState {
  UPLOAD = 'UPLOAD',
  EDITOR = 'EDITOR',
}
