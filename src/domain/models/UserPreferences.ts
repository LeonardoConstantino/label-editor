export interface UserPreferences {
  // --- GENERAL ---
  theme: 'dark' | 'light' | 'system';
  audioEnabled: boolean;
  unit: 'mm' | 'px' | 'pt';
  lastUsedDpi: number;
  defaultZoom: number;
  
  // --- GRID ---
  showGrid: boolean;
  gridSizeMM: number;
  gridColor: string;
  gridOpacity: number;
  
  // --- SNAPPING & GUIDES ---
  snapToGrid: boolean;
  snapToObjects: boolean;
  snapToCanvas: boolean;
  snapThresholdMM: number;
  snapGuideColor: string; // Task 75 Roadmap
  
  // --- SELECTION ---
  selectionColor: string; // Task 75 Roadmap
  selectionWidth: number; // Task 75 Roadmap
  
  // --- PERFORMANCE & ENGINE ---
  historySensitivity: number; // ms
  historyMaxSteps: number;    // Task 75 Roadmap
  logLevel: number; // 0=Silent, 1=Error, 2=Warn, 3=Info, 4=Debug
  
  // --- CREATION DEFAULTS ---
  autoLockOnCreation: boolean; // Task 75 Roadmap
  defaultFontFamily: string;   // Task 75 Roadmap
}

export const DEFAULT_PREFERENCES: UserPreferences = {
  theme: 'dark',
  audioEnabled: true,
  unit: 'mm',
  lastUsedDpi: 300,
  defaultZoom: 1.0,
  
  showGrid: true,
  gridSizeMM: 5,
  gridColor: '#6366f1',
  gridOpacity: 0.3,
  
  snapToGrid: true,
  snapToObjects: true,
  snapToCanvas: true,
  snapThresholdMM: 2.0,
  snapGuideColor: '#d946ef',
  
  selectionColor: '#f43f5e',
  selectionWidth: 1.5,
  
  historySensitivity: 400,
  historyMaxSteps: 50,
  logLevel: 1, // Default: Errors only in production

  autoLockOnCreation: false,
  defaultFontFamily: 'Inter'
};
