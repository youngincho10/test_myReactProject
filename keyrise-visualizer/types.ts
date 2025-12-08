export interface KeyConfig {
  key: string;
  label: string;
  imageUrl: string;
  color: string;
  gradient: string;
}

export interface KeyState {
  [key: string]: boolean;
}