export interface UserPreferences {
  defaultZoom: number;
  showGrid: boolean;
  gridSizeMM: number;
  gridColor: string;
  gridOpacity: number;
  unit: 'mm' | 'px' | 'pt';
  lastUsedDpi: number;
  theme: 'dark' | 'light' | 'system';
  audioEnabled: boolean;
  snapToGrid: boolean;
  snapToObjects: boolean;
  snapToCanvas: boolean;
  snapThresholdMM: number;
  historySensitivity: number; // ms
}

export const DEFAULT_PREFERENCES: UserPreferences = {
  defaultZoom: 1.0,
  showGrid: true,
  gridSizeMM: 5,
  gridColor: '#6366f1',
  gridOpacity: 0.3,
  unit: 'mm',
  lastUsedDpi: 300,
  theme: 'dark',
  audioEnabled: true,
  snapToGrid: true,
  snapToObjects: true,
  snapToCanvas: true,
  snapThresholdMM: 2.0,
  historySensitivity: 400
};
