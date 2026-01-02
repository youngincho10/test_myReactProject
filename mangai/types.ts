export interface UploadedImage {
  file: File;
  previewUrl: string;
  base64: string;
  mimeType: string;
}

export interface GeneratedResult {
  id: string;
  styleName: string;
  url: string | null;
  status: 'pending' | 'loading' | 'success' | 'error';
  error?: string;
}

export interface GeneratedImage {
  url: string;
  id: string;
}

export enum AppState {
  IDLE = 'IDLE',
  GENERATING = 'GENERATING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}