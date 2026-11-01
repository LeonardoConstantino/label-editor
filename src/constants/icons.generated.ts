// GERADO AUTOMATICAMENTE — NÃO EDITAR À MÃO.
// Regerar: node scripts/generate-icons.mjs [diretório-de-svgs]

export interface IconDefinition {
  name: string;
  viewBox: [number, number, number, number];
  paths: string[];
  stroke?: boolean;
  tags?: string[];
}

export const ICON_REGISTRY: Record<string, IconDefinition> = {
  "a-arrow-down": {"name":"A Arrow Down","viewBox":[0,0,24,24],"paths":["m14 12 4 4 4-4","M18 16V7","m2 16 4.039-9.69a.5.5 0 0 1 .923 0L11 16","M3.304 13h6.392"],"stroke":true},
  "a-arrow-up": {"name":"A Arrow Up","viewBox":[0,0,24,24],"paths":["m14 11 4-4 4 4","M18 16V7","m2 16 4.039-9.69a.5.5 0 0 1 .923 0L11 16","M3.304 13h6.392"],"stroke":true},
  "a-large-small": {"name":"A Large Small","viewBox":[0,0,24,24],"paths":["m15 16 2.536-7.328a1.02 1.02 1 0 1 1.928 0L22 16","M15.697 14h5.606","m2 16 4.039-9.69a.5.5 0 0 1 .923 0L11 16","M3.304 13h6.392"],"stroke":true},
  "accessibility": {"name":"Accessibility","viewBox":[0,0,24,24],"paths":["M 15 4 a 1 1 0 1 0 2 0 a 1 1 0 1 0 -2 0","m18 19 1-7-6 1","m5 8 3-3 5.5 3-2.36 3.5","M4.24 14.5a5 5 0 0 0 6.88 6","M13.76 17.5a5 5 0 0 0-6.88-6"],"stroke":true},
  "activity": {"name":"Activity","viewBox":[0,0,24,24],"paths":["M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"],"stroke":true},
  "activity-square": {"name":"Activity Square","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","M17 12h-2l-2 5-2-10-2 5H7"],"stroke":true},
  "ad": {"name":"Ad","viewBox":[0,0,24,24],"paths":["M10 13H6","M10 15v-4a2 2 0 0 0-4 0v4","M14 14.5a.5.5 0 0 0 .5.5h1a2.5 2.5 0 0 0 2.5-2.5v-1A2.5 2.5 0 0 0 15.5 9h-1a.5.5 0 0 0-.5.5z","M 2 5 h 20 v 14 h -20 z"],"stroke":true},
  "air-vent": {"name":"Air Vent","viewBox":[0,0,24,24],"paths":["M18 17.5a2.5 2.5 0 1 1-4 2.03V12","M6 12H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2","M6 8h12","M6.6 15.572A2 2 0 1 0 10 17v-5"],"stroke":true},
  "airplay": {"name":"Airplay","viewBox":[0,0,24,24],"paths":["M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1","m12 15 5 6H7Z"],"stroke":true},
  "alarm-check": {"name":"Alarm Check","viewBox":[0,0,24,24],"paths":["M 4 13 a 8 8 0 1 0 16 0 a 8 8 0 1 0 -16 0","M5 3 2 6","m22 6-3-3","M6.38 18.7 4 21","M17.64 18.67 20 21","m9 13 2 2 4-4"],"stroke":true},
  "alarm-clock": {"name":"Alarm Clock","viewBox":[0,0,24,24],"paths":["M 4 13 a 8 8 0 1 0 16 0 a 8 8 0 1 0 -16 0","M12 9v4l2 2","M5 3 2 6","m22 6-3-3","M6.38 18.7 4 21","M17.64 18.67 20 21"],"stroke":true},
  "alarm-clock-check": {"name":"Alarm Clock Check","viewBox":[0,0,24,24],"paths":["M 4 13 a 8 8 0 1 0 16 0 a 8 8 0 1 0 -16 0","M5 3 2 6","m22 6-3-3","M6.38 18.7 4 21","M17.64 18.67 20 21","m9 13 2 2 4-4"],"stroke":true},
  "alarm-clock-minus": {"name":"Alarm Clock Minus","viewBox":[0,0,24,24],"paths":["M 4 13 a 8 8 0 1 0 16 0 a 8 8 0 1 0 -16 0","M5 3 2 6","m22 6-3-3","M6.38 18.7 4 21","M17.64 18.67 20 21","M9 13h6"],"stroke":true},
  "alarm-clock-off": {"name":"Alarm Clock Off","viewBox":[0,0,24,24],"paths":["M6.87 6.87a8 8 0 1 0 11.26 11.26","M19.9 14.25a8 8 0 0 0-9.15-9.15","m22 6-3-3","M6.26 18.67 4 21","m2 2 20 20","M4 4 2 6"],"stroke":true},
  "alarm-clock-plus": {"name":"Alarm Clock Plus","viewBox":[0,0,24,24],"paths":["M 4 13 a 8 8 0 1 0 16 0 a 8 8 0 1 0 -16 0","M5 3 2 6","m22 6-3-3","M6.38 18.7 4 21","M17.64 18.67 20 21","M12 10v6","M9 13h6"],"stroke":true},
  "alarm-minus": {"name":"Alarm Minus","viewBox":[0,0,24,24],"paths":["M 4 13 a 8 8 0 1 0 16 0 a 8 8 0 1 0 -16 0","M5 3 2 6","m22 6-3-3","M6.38 18.7 4 21","M17.64 18.67 20 21","M9 13h6"],"stroke":true},
  "alarm-plus": {"name":"Alarm Plus","viewBox":[0,0,24,24],"paths":["M 4 13 a 8 8 0 1 0 16 0 a 8 8 0 1 0 -16 0","M5 3 2 6","m22 6-3-3","M6.38 18.7 4 21","M17.64 18.67 20 21","M12 10v6","M9 13h6"],"stroke":true},
  "alarm-smoke": {"name":"Alarm Smoke","viewBox":[0,0,24,24],"paths":["M11 21c0-2.5 2-2.5 2-5","M16 21c0-2.5 2-2.5 2-5","m19 8-.8 3a1.25 1.25 0 0 1-1.2 1H7a1.25 1.25 0 0 1-1.2-1L5 8","M21 3a1 1 0 0 1 1 1v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a1 1 0 0 1 1-1z","M6 21c0-2.5 2-2.5 2-5"],"stroke":true},
  "album": {"name":"Album","viewBox":[0,0,24,24],"paths":["M11 3v7.751a.25.25 0 00.407.195l2.28-1.834a.5.5 0 01.627 0l2.28 1.834a.25.25 0 00.406-.195V3","M 3 3 h 18 v 18 h -18 z"],"stroke":true},
  "alert-circle": {"name":"Alert Circle","viewBox":[0,0,24,24],"paths":["M 2 12 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0","M 12 8 L 12 12","M 12 16 L 12.01 16"],"stroke":true},
  "alert-octagon": {"name":"Alert Octagon","viewBox":[0,0,24,24],"paths":["M12 16h.01","M12 8v4","M15.312 2a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586l-4.688-4.688A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2z"],"stroke":true},
  "alert-triangle": {"name":"Alert Triangle","viewBox":[0,0,24,24],"paths":["m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3","M12 9v4","M12 17h.01"],"stroke":true},
  "align-center": {"name":"Align Center","viewBox":[0,0,24,24],"paths":["M21 5H3","M17 12H7","M19 19H5"],"stroke":true},
  "align-center-horizontal": {"name":"Align Center Horizontal","viewBox":[0,0,24,24],"paths":["M2 12h20","M10 16v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-4","M10 8V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v4","M20 16v1a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-1","M14 8V7c0-1.1.9-2 2-2h2a2 2 0 0 1 2 2v1"],"stroke":true},
  "align-center-vertical": {"name":"Align Center Vertical","viewBox":[0,0,24,24],"paths":["M12 2v20","M8 10H4a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2h4","M16 10h4a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-4","M8 20H7a2 2 0 0 1-2-2v-2c0-1.1.9-2 2-2h1","M16 14h1a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-1"],"stroke":true},
  "align-end-horizontal": {"name":"Align End Horizontal","viewBox":[0,0,24,24],"paths":["M 4 2 h 6 v 16 h -6 z","M 14 9 h 6 v 9 h -6 z","M22 22H2"],"stroke":true},
  "align-end-vertical": {"name":"Align End Vertical","viewBox":[0,0,24,24],"paths":["M 2 4 h 16 v 6 h -16 z","M 9 14 h 9 v 6 h -9 z","M22 22V2"],"stroke":true},
  "align-horizontal-distribute-center": {"name":"Align Horizontal Distribute Center","viewBox":[0,0,24,24],"paths":["M 4 5 h 6 v 14 h -6 z","M 14 7 h 6 v 10 h -6 z","M17 22v-5","M17 7V2","M7 22v-3","M7 5V2"],"stroke":true},
  "align-horizontal-distribute-end": {"name":"Align Horizontal Distribute End","viewBox":[0,0,24,24],"paths":["M 4 5 h 6 v 14 h -6 z","M 14 7 h 6 v 10 h -6 z","M10 2v20","M20 2v20"],"stroke":true},
  "align-horizontal-distribute-start": {"name":"Align Horizontal Distribute Start","viewBox":[0,0,24,24],"paths":["M 4 5 h 6 v 14 h -6 z","M 14 7 h 6 v 10 h -6 z","M4 2v20","M14 2v20"],"stroke":true},
  "align-horizontal-justify-center": {"name":"Align Horizontal Justify Center","viewBox":[0,0,24,24],"paths":["M 2 5 h 6 v 14 h -6 z","M 16 7 h 6 v 10 h -6 z","M12 2v20"],"stroke":true},
  "align-horizontal-justify-end": {"name":"Align Horizontal Justify End","viewBox":[0,0,24,24],"paths":["M 2 5 h 6 v 14 h -6 z","M 12 7 h 6 v 10 h -6 z","M22 2v20"],"stroke":true},
  "align-horizontal-justify-start": {"name":"Align Horizontal Justify Start","viewBox":[0,0,24,24],"paths":["M 6 5 h 6 v 14 h -6 z","M 16 7 h 6 v 10 h -6 z","M2 2v20"],"stroke":true},
  "align-horizontal-space-around": {"name":"Align Horizontal Space Around","viewBox":[0,0,24,24],"paths":["M 9 7 h 6 v 10 h -6 z","M4 22V2","M20 22V2"],"stroke":true},
  "align-horizontal-space-between": {"name":"Align Horizontal Space Between","viewBox":[0,0,24,24],"paths":["M 3 5 h 6 v 14 h -6 z","M 15 7 h 6 v 10 h -6 z","M3 2v20","M21 2v20"],"stroke":true},
  "align-justify": {"name":"Align Justify","viewBox":[0,0,24,24],"paths":["M3 5h18","M3 12h18","M3 19h18"],"stroke":true},
  "align-left": {"name":"Align Left","viewBox":[0,0,24,24],"paths":["M21 5H3","M15 12H3","M17 19H3"],"stroke":true},
  "align-right": {"name":"Align Right","viewBox":[0,0,24,24],"paths":["M21 5H3","M21 12H9","M21 19H7"],"stroke":true},
  "align-start-horizontal": {"name":"Align Start Horizontal","viewBox":[0,0,24,24],"paths":["M 4 6 h 6 v 16 h -6 z","M 14 6 h 6 v 9 h -6 z","M22 2H2"],"stroke":true},
  "align-start-vertical": {"name":"Align Start Vertical","viewBox":[0,0,24,24],"paths":["M 6 14 h 9 v 6 h -9 z","M 6 4 h 16 v 6 h -16 z","M2 2v20"],"stroke":true},
  "align-vertical-distribute-center": {"name":"Align Vertical Distribute Center","viewBox":[0,0,24,24],"paths":["M22 17h-3","M22 7h-5","M5 17H2","M7 7H2","M 5 14 h 14 v 6 h -14 z","M 7 4 h 10 v 6 h -10 z"],"stroke":true},
  "align-vertical-distribute-end": {"name":"Align Vertical Distribute End","viewBox":[0,0,24,24],"paths":["M 5 14 h 14 v 6 h -14 z","M 7 4 h 10 v 6 h -10 z","M2 20h20","M2 10h20"],"stroke":true},
  "align-vertical-distribute-start": {"name":"Align Vertical Distribute Start","viewBox":[0,0,24,24],"paths":["M 5 14 h 14 v 6 h -14 z","M 7 4 h 10 v 6 h -10 z","M2 14h20","M2 4h20"],"stroke":true},
  "align-vertical-justify-center": {"name":"Align Vertical Justify Center","viewBox":[0,0,24,24],"paths":["M 5 16 h 14 v 6 h -14 z","M 7 2 h 10 v 6 h -10 z","M2 12h20"],"stroke":true},
  "align-vertical-justify-end": {"name":"Align Vertical Justify End","viewBox":[0,0,24,24],"paths":["M 5 12 h 14 v 6 h -14 z","M 7 2 h 10 v 6 h -10 z","M2 22h20"],"stroke":true},
  "align-vertical-justify-start": {"name":"Align Vertical Justify Start","viewBox":[0,0,24,24],"paths":["M 5 16 h 14 v 6 h -14 z","M 7 6 h 10 v 6 h -10 z","M2 2h20"],"stroke":true},
  "align-vertical-space-around": {"name":"Align Vertical Space Around","viewBox":[0,0,24,24],"paths":["M 7 9 h 10 v 6 h -10 z","M22 20H2","M22 4H2"],"stroke":true},
  "align-vertical-space-between": {"name":"Align Vertical Space Between","viewBox":[0,0,24,24],"paths":["M 5 15 h 14 v 6 h -14 z","M 7 3 h 10 v 6 h -10 z","M2 21h20","M2 3h20"],"stroke":true},
  "ambulance": {"name":"Ambulance","viewBox":[0,0,24,24],"paths":["M10 10H6","M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2","M19 18h2a1 1 0 0 0 1-1v-3.28a1 1 0 0 0-.684-.948l-1.923-.641a1 1 0 0 1-.578-.502l-1.539-3.076A1 1 0 0 0 16.382 8H14","M8 8v4","M9 18h6","M 15 18 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0","M 5 18 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0"],"stroke":true},
  "ampersand": {"name":"Ampersand","viewBox":[0,0,24,24],"paths":["M16 12h3","M17.5 12a8 8 0 0 1-8 8A4.5 4.5 0 0 1 5 15.5c0-6 8-4 8-8.5a3 3 0 1 0-6 0c0 3 2.5 8.5 12 13"],"stroke":true},
  "ampersands": {"name":"Ampersands","viewBox":[0,0,24,24],"paths":["M10 17c-5-3-7-7-7-9a2 2 0 0 1 4 0c0 2.5-5 2.5-5 6 0 1.7 1.3 3 3 3 2.8 0 5-2.2 5-5","M22 17c-5-3-7-7-7-9a2 2 0 0 1 4 0c0 2.5-5 2.5-5 6 0 1.7 1.3 3 3 3 2.8 0 5-2.2 5-5"],"stroke":true},
  "amphora": {"name":"Amphora","viewBox":[0,0,24,24],"paths":["M10 2v5.632c0 .424-.272.795-.653.982A6 6 0 0 0 6 14c.006 4 3 7 5 8","M10 5H8a2 2 0 0 0 0 4h.68","M14 2v5.632c0 .424.272.795.652.982A6 6 0 0 1 18 14c0 4-3 7-5 8","M14 5h2a2 2 0 0 1 0 4h-.68","M18 22H6","M9 2h6"],"stroke":true},
  "anchor": {"name":"Anchor","viewBox":[0,0,24,24],"paths":["M12 6v16","m19 13 2-1a9 9 0 0 1-18 0l2 1","M9 11h6","M 10 4 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0"],"stroke":true},
  "angle": {"name":"Angle","viewBox":[0,0,24,24],"paths":["M3 3v16a2 2 0 0 0 2 2h16","M3 11a10 10 0 0 1 10 10"],"stroke":true},
  "angry": {"name":"Angry","viewBox":[0,0,24,24],"paths":["M15 12v-1.584","M17 10a5 5 0 00-3 1","M7 10a5 5 0 013 1","M9 12v-1.584","M9 17a5 5 0 016.001 0","M 2 12 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0"],"stroke":true},
  "annoyed": {"name":"Annoyed","viewBox":[0,0,24,24],"paths":["M14 10h2","M8 10h2","M8 16h8","M 2 12 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0"],"stroke":true},
  "antenna": {"name":"Antenna","viewBox":[0,0,24,24],"paths":["M2 12 7 2","m7 12 5-10","m12 12 5-10","m17 12 5-10","M4.5 7h15","M12 16v6"],"stroke":true},
  "anvil": {"name":"Anvil","viewBox":[0,0,24,24],"paths":["M7 10H6a4 4 0 0 1-4-4 1 1 0 0 1 1-1h4","M7 5a1 1 0 0 1 1-1h13a1 1 0 0 1 1 1 7 7 0 0 1-7 7H8a1 1 0 0 1-1-1z","M9 12v5","M15 12v5","M5 20a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3 1 1 0 0 1-1 1H6a1 1 0 0 1-1-1"],"stroke":true},
  "aperture": {"name":"Aperture","viewBox":[0,0,24,24],"paths":["M 2 12 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0","m14.31 8 5.74 9.94","M9.69 8h11.48","m7.38 12 5.74-9.94","M9.69 16 3.95 6.06","M14.31 16H2.83","m16.62 12-5.74 9.94"],"stroke":true},
  "app-window": {"name":"App Window","viewBox":[0,0,24,24],"paths":["M 2 4 h 20 v 16 h -20 z","M10 4v4","M2 8h20","M6 4v4"],"stroke":true},
  "app-window-mac": {"name":"App Window Mac","viewBox":[0,0,24,24],"paths":["M 2 4 h 20 v 16 h -20 z","M6 8h.01","M10 8h.01","M14 8h.01"],"stroke":true},
  "apple": {"name":"Apple","viewBox":[0,0,24,24],"paths":["M12 6.528V3a1 1 0 0 1 1-1h0","M18.237 21A15 15 0 0 0 22 11a6 6 0 0 0-10-4.472A6 6 0 0 0 2 11a15.1 15.1 0 0 0 3.763 10 3 3 0 0 0 3.648.648 5.5 5.5 0 0 1 5.178 0A3 3 0 0 0 18.237 21"],"stroke":true},
  "archive": {"name":"Archive","viewBox":[0,0,24,24],"paths":["M 2 3 h 20 v 5 h -20 z","M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8","M10 12h4"],"stroke":true},
  "archive-restore": {"name":"Archive Restore","viewBox":[0,0,24,24],"paths":["M 2 3 h 20 v 5 h -20 z","M4 8v11a2 2 0 0 0 2 2h2","M20 8v11a2 2 0 0 1-2 2h-2","m9 15 3-3 3 3","M12 12v9"],"stroke":true},
  "archive-x": {"name":"Archive X","viewBox":[0,0,24,24],"paths":["M 2 3 h 20 v 5 h -20 z","M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8","m9.5 17 5-5","m9.5 12 5 5"],"stroke":true},
  "area-chart": {"name":"Area Chart","viewBox":[0,0,24,24],"paths":["M3 3v16a2 2 0 0 0 2 2h16","M7 11.207a.5.5 0 0 1 .146-.353l2-2a.5.5 0 0 1 .708 0l3.292 3.292a.5.5 0 0 0 .708 0l4.292-4.292a.5.5 0 0 1 .854.353V16a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1z"],"stroke":true},
  "armchair": {"name":"Armchair","viewBox":[0,0,24,24],"paths":["M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3","M3 16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V11a2 2 0 0 0-4 0z","M5 18v2","M19 18v2"],"stroke":true},
  "armenian-dram": {"name":"Armenian Dram","viewBox":[0,0,24,24],"paths":["M11 10h8","M11 14h8","M17 20V10a6 6 0 0 0-12 0"],"stroke":true},
  "arrow-big-down": {"name":"Arrow Big Down","viewBox":[0,0,24,24],"paths":["M9 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v6a1 1 0 0 0 1 1h3.293a.707.707 0 0 1 .5 1.207l-7.086 7.086a1 1 0 0 1-1.414 0l-7.086-7.086a.707.707 0 0 1 .5-1.207H8a1 1 0 0 0 1-1z"],"stroke":true},
  "arrow-big-down-dash": {"name":"Arrow Big Down Dash","viewBox":[0,0,24,24],"paths":["M14 8a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h3.293a.707.707 0 0 1 .5 1.207l-6.939 6.939a1.207 1.207 0 0 1-1.708 0l-6.94-6.94a.707.707 0 0 1 .5-1.206H8a1 1 0 0 0 1-1V9a1 1 0 0 1 1-1z","M9 4h6"],"stroke":true},
  "arrow-big-left": {"name":"Arrow Big Left","viewBox":[0,0,24,24],"paths":["M10.793 19.793a.707.707 0 0 0 1.207-.5V16a1 1 0 0 1 1-1h6a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-6a1 1 0 0 1-1-1V4.707a.707.707 0 0 0-1.207-.5l-6.94 6.94a1.207 1.207 0 0 0 0 1.707z"],"stroke":true},
  "arrow-big-left-dash": {"name":"Arrow Big Left Dash","viewBox":[0,0,24,24],"paths":["M13 9a1 1 0 0 1-1-1V4.707a.707.707 0 0 0-1.207-.5l-6.94 6.94a1.207 1.207 0 0 0 0 1.707l6.94 6.94a.707.707 0 0 0 1.207-.5V16a1 1 0 0 1 1-1h2a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1z","M20 9v6"],"stroke":true},
  "arrow-big-right": {"name":"Arrow Big Right","viewBox":[0,0,24,24],"paths":["M13.207 19.793a.707.707 0 0 1-1.207-.5V16a1 1 0 0 0-1-1H5a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h6a1 1 0 0 0 1-1V4.707a.707.707 0 0 1 1.207-.5l6.94 6.94a1.207 1.207 0 0 1 0 1.707z"],"stroke":true},
  "arrow-big-right-dash": {"name":"Arrow Big Right Dash","viewBox":[0,0,24,24],"paths":["M11 9a1 1 0 0 0 1-1V4.707a.707.707 0 0 1 1.207-.5l6.94 6.94a1.207 1.207 0 0 1 0 1.707l-6.94 6.94a.707.707 0 0 1-1.207-.5V16a1 1 0 0 0-1-1H9a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1z","M4 9v6"],"stroke":true},
  "arrow-big-up": {"name":"Arrow Big Up","viewBox":[0,0,24,24],"paths":["M9 19a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-6a1 1 0 0 1 1-1h3.293a.707.707 0 0 0 .5-1.207l-7.086-7.086a1 1 0 0 0-1.414 0l-7.086 7.086a.707.707 0 0 0 .5 1.207H8a1 1 0 0 1 1 1z"],"stroke":true},
  "arrow-big-up-dash": {"name":"Arrow Big Up Dash","viewBox":[0,0,24,24],"paths":["M14 16a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1h3.293a.707.707 0 0 0 .5-1.207l-6.939-6.939a1.207 1.207 0 0 0-1.708 0l-6.94 6.94a.707.707 0 0 0 .5 1.206H8a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1z","M9 20h6"],"stroke":true},
  "arrow-down": {"name":"Arrow Down","viewBox":[0,0,24,24],"paths":["M12 5v14","m19 12-7 7-7-7"],"stroke":true},
  "arrow-down-0-1": {"name":"Arrow Down 0 1","viewBox":[0,0,24,24],"paths":["m3 16 4 4 4-4","M7 20V4","M 15 4 h 4 v 6 h -4 z","M17 20v-6h-2","M15 20h4"],"stroke":true},
  "arrow-down-01": {"name":"Arrow Down 01","viewBox":[0,0,24,24],"paths":["m3 16 4 4 4-4","M7 20V4","M 15 4 h 4 v 6 h -4 z","M17 20v-6h-2","M15 20h4"],"stroke":true},
  "arrow-down-1-0": {"name":"Arrow Down 1 0","viewBox":[0,0,24,24],"paths":["m3 16 4 4 4-4","M7 20V4","M17 10V4h-2","M15 10h4","M 15 14 h 4 v 6 h -4 z"],"stroke":true},
  "arrow-down-10": {"name":"Arrow Down 10","viewBox":[0,0,24,24],"paths":["m3 16 4 4 4-4","M7 20V4","M17 10V4h-2","M15 10h4","M 15 14 h 4 v 6 h -4 z"],"stroke":true},
  "arrow-down-a-z": {"name":"Arrow Down A Z","viewBox":[0,0,24,24],"paths":["m3 16 4 4 4-4","M7 20V4","M20 8h-5","M15 10V6.5a2.5 2.5 0 0 1 5 0V10","M15 14h5l-5 6h5"],"stroke":true},
  "arrow-down-az": {"name":"Arrow Down Az","viewBox":[0,0,24,24],"paths":["m3 16 4 4 4-4","M7 20V4","M20 8h-5","M15 10V6.5a2.5 2.5 0 0 1 5 0V10","M15 14h5l-5 6h5"],"stroke":true},
  "arrow-down-circle": {"name":"Arrow Down Circle","viewBox":[0,0,24,24],"paths":["M 2 12 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0","M12 8v8","m8 12 4 4 4-4"],"stroke":true},
  "arrow-down-from-line": {"name":"Arrow Down From Line","viewBox":[0,0,24,24],"paths":["M19 3H5","M12 21V7","m6 15 6 6 6-6"],"stroke":true},
  "arrow-down-left": {"name":"Arrow Down Left","viewBox":[0,0,24,24],"paths":["M17 7 7 17","M17 17H7V7"],"stroke":true},
  "arrow-down-left-from-circle": {"name":"Arrow Down Left From Circle","viewBox":[0,0,24,24],"paths":["M2 12a10 10 0 1 1 10 10","m2 22 10-10","M8 22H2v-6"],"stroke":true},
  "arrow-down-left-from-square": {"name":"Arrow Down Left From Square","viewBox":[0,0,24,24],"paths":["M13 21h6a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v6","m3 21 9-9","M9 21H3v-6"],"stroke":true},
  "arrow-down-left-square": {"name":"Arrow Down Left Square","viewBox":[0,0,24,24],"paths":["M15 15H9l6-6","M9 15V9","M 3 3 h 18 v 18 h -18 z"],"stroke":true},
  "arrow-down-narrow-wide": {"name":"Arrow Down Narrow Wide","viewBox":[0,0,24,24],"paths":["m3 16 4 4 4-4","M7 20V4","M11 4h4","M11 8h7","M11 12h10"],"stroke":true},
  "arrow-down-right": {"name":"Arrow Down Right","viewBox":[0,0,24,24],"paths":["m7 7 10 10","M17 7v10H7"],"stroke":true},
  "arrow-down-right-from-circle": {"name":"Arrow Down Right From Circle","viewBox":[0,0,24,24],"paths":["M12 22a10 10 0 1 1 10-10","M22 22 12 12","M22 16v6h-6"],"stroke":true},
  "arrow-down-right-from-square": {"name":"Arrow Down Right From Square","viewBox":[0,0,24,24],"paths":["M21 11V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6","m21 21-9-9","M21 15v6h-6"],"stroke":true},
  "arrow-down-right-square": {"name":"Arrow Down Right Square","viewBox":[0,0,24,24],"paths":["M15 15 9 9","M9 15h6V9","M 3 3 h 18 v 18 h -18 z"],"stroke":true},
  "arrow-down-square": {"name":"Arrow Down Square","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","M12 8v8","m8 12 4 4 4-4"],"stroke":true},
  "arrow-down-to-dot": {"name":"Arrow Down To Dot","viewBox":[0,0,24,24],"paths":["M12 2v14","m19 9-7 7-7-7","M 11 21 a 1 1 0 1 0 2 0 a 1 1 0 1 0 -2 0"],"stroke":true},
  "arrow-down-to-line": {"name":"Arrow Down To Line","viewBox":[0,0,24,24],"paths":["M12 17V3","m6 11 6 6 6-6","M19 21H5"],"stroke":true},
  "arrow-down-up": {"name":"Arrow Down Up","viewBox":[0,0,24,24],"paths":["m3 16 4 4 4-4","M7 20V4","m21 8-4-4-4 4","M17 4v16"],"stroke":true},
  "arrow-down-wide-narrow": {"name":"Arrow Down Wide Narrow","viewBox":[0,0,24,24],"paths":["m3 16 4 4 4-4","M7 20V4","M11 4h10","M11 8h7","M11 12h4"],"stroke":true},
  "arrow-down-z-a": {"name":"Arrow Down Z A","viewBox":[0,0,24,24],"paths":["m3 16 4 4 4-4","M7 4v16","M15 4h5l-5 6h5","M15 20v-3.5a2.5 2.5 0 0 1 5 0V20","M20 18h-5"],"stroke":true},
  "arrow-down-za": {"name":"Arrow Down Za","viewBox":[0,0,24,24],"paths":["m3 16 4 4 4-4","M7 4v16","M15 4h5l-5 6h5","M15 20v-3.5a2.5 2.5 0 0 1 5 0V20","M20 18h-5"],"stroke":true},
  "arrow-left": {"name":"Arrow Left","viewBox":[0,0,24,24],"paths":["m12 19-7-7 7-7","M19 12H5"],"stroke":true},
  "arrow-left-circle": {"name":"Arrow Left Circle","viewBox":[0,0,24,24],"paths":["M 2 12 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0","m12 8-4 4 4 4","M16 12H8"],"stroke":true},
  "arrow-left-from-line": {"name":"Arrow Left From Line","viewBox":[0,0,24,24],"paths":["m9 6-6 6 6 6","M3 12h14","M21 19V5"],"stroke":true},
  "arrow-left-right": {"name":"Arrow Left Right","viewBox":[0,0,24,24],"paths":["M8 3 4 7l4 4","M4 7h16","m16 21 4-4-4-4","M20 17H4"],"stroke":true},
  "arrow-left-square": {"name":"Arrow Left Square","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","m12 8-4 4 4 4","M16 12H8"],"stroke":true},
  "arrow-left-to-line": {"name":"Arrow Left To Line","viewBox":[0,0,24,24],"paths":["M3 19V5","m13 6-6 6 6 6","M7 12h14"],"stroke":true},
  "arrow-right": {"name":"Arrow Right","viewBox":[0,0,24,24],"paths":["M5 12h14","m12 5 7 7-7 7"],"stroke":true},
  "arrow-right-circle": {"name":"Arrow Right Circle","viewBox":[0,0,24,24],"paths":["M 2 12 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0","m12 16 4-4-4-4","M8 12h8"],"stroke":true},
  "arrow-right-from-line": {"name":"Arrow Right From Line","viewBox":[0,0,24,24],"paths":["M3 5v14","M21 12H7","m15 18 6-6-6-6"],"stroke":true},
  "arrow-right-left": {"name":"Arrow Right Left","viewBox":[0,0,24,24],"paths":["m16 3 4 4-4 4","M20 7H4","m8 21-4-4 4-4","M4 17h16"],"stroke":true},
  "arrow-right-square": {"name":"Arrow Right Square","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","M8 12h8","m12 16 4-4-4-4"],"stroke":true},
  "arrow-right-to-line": {"name":"Arrow Right To Line","viewBox":[0,0,24,24],"paths":["M17 12H3","m11 18 6-6-6-6","M21 5v14"],"stroke":true},
  "arrow-up": {"name":"Arrow Up","viewBox":[0,0,24,24],"paths":["m5 12 7-7 7 7","M12 19V5"],"stroke":true},
  "arrow-up-0-1": {"name":"Arrow Up 0 1","viewBox":[0,0,24,24],"paths":["m3 8 4-4 4 4","M7 4v16","M 15 4 h 4 v 6 h -4 z","M17 20v-6h-2","M15 20h4"],"stroke":true},
  "arrow-up-01": {"name":"Arrow Up 01","viewBox":[0,0,24,24],"paths":["m3 8 4-4 4 4","M7 4v16","M 15 4 h 4 v 6 h -4 z","M17 20v-6h-2","M15 20h4"],"stroke":true},
  "arrow-up-1-0": {"name":"Arrow Up 1 0","viewBox":[0,0,24,24],"paths":["m3 8 4-4 4 4","M7 4v16","M17 10V4h-2","M15 10h4","M 15 14 h 4 v 6 h -4 z"],"stroke":true},
  "arrow-up-10": {"name":"Arrow Up 10","viewBox":[0,0,24,24],"paths":["m3 8 4-4 4 4","M7 4v16","M17 10V4h-2","M15 10h4","M 15 14 h 4 v 6 h -4 z"],"stroke":true},
  "arrow-up-a-z": {"name":"Arrow Up A Z","viewBox":[0,0,24,24],"paths":["m3 8 4-4 4 4","M7 4v16","M20 8h-5","M15 10V6.5a2.5 2.5 0 0 1 5 0V10","M15 14h5l-5 6h5"],"stroke":true},
  "arrow-up-az": {"name":"Arrow Up Az","viewBox":[0,0,24,24],"paths":["m3 8 4-4 4 4","M7 4v16","M20 8h-5","M15 10V6.5a2.5 2.5 0 0 1 5 0V10","M15 14h5l-5 6h5"],"stroke":true},
  "arrow-up-circle": {"name":"Arrow Up Circle","viewBox":[0,0,24,24],"paths":["M 2 12 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0","m16 12-4-4-4 4","M12 16V8"],"stroke":true},
  "arrow-up-down": {"name":"Arrow Up Down","viewBox":[0,0,24,24],"paths":["m21 16-4 4-4-4","M17 20V4","m3 8 4-4 4 4","M7 4v16"],"stroke":true},
  "arrow-up-from-dot": {"name":"Arrow Up From Dot","viewBox":[0,0,24,24],"paths":["m5 9 7-7 7 7","M12 16V2","M 11 21 a 1 1 0 1 0 2 0 a 1 1 0 1 0 -2 0"],"stroke":true},
  "arrow-up-from-line": {"name":"Arrow Up From Line","viewBox":[0,0,24,24],"paths":["m18 9-6-6-6 6","M12 3v14","M5 21h14"],"stroke":true},
  "arrow-up-left": {"name":"Arrow Up Left","viewBox":[0,0,24,24],"paths":["M7 17V7h10","M17 17 7 7"],"stroke":true},
  "arrow-up-left-from-circle": {"name":"Arrow Up Left From Circle","viewBox":[0,0,24,24],"paths":["M2 8V2h6","m2 2 10 10","M12 2A10 10 0 1 1 2 12"],"stroke":true},
  "arrow-up-left-from-square": {"name":"Arrow Up Left From Square","viewBox":[0,0,24,24],"paths":["M13 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6","m3 3 9 9","M3 9V3h6"],"stroke":true},
  "arrow-up-left-square": {"name":"Arrow Up Left Square","viewBox":[0,0,24,24],"paths":["M15 15 9 9","M9 15V9h6","M 3 3 h 18 v 18 h -18 z"],"stroke":true},
  "arrow-up-narrow-wide": {"name":"Arrow Up Narrow Wide","viewBox":[0,0,24,24],"paths":["m3 8 4-4 4 4","M7 4v16","M11 12h4","M11 16h7","M11 20h10"],"stroke":true},
  "arrow-up-right": {"name":"Arrow Up Right","viewBox":[0,0,24,24],"paths":["M7 7h10v10","M7 17 17 7"],"stroke":true},
  "arrow-up-right-from-circle": {"name":"Arrow Up Right From Circle","viewBox":[0,0,24,24],"paths":["M22 12A10 10 0 1 1 12 2","M22 2 12 12","M16 2h6v6"],"stroke":true},
  "arrow-up-right-from-square": {"name":"Arrow Up Right From Square","viewBox":[0,0,24,24],"paths":["M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6","m21 3-9 9","M15 3h6v6"],"stroke":true},
  "arrow-up-right-square": {"name":"Arrow Up Right Square","viewBox":[0,0,24,24],"paths":["M15 15V9H9","m9 15 6-6","M 3 3 h 18 v 18 h -18 z"],"stroke":true},
  "arrow-up-square": {"name":"Arrow Up Square","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","m16 12-4-4-4 4","M12 16V8"],"stroke":true},
  "arrow-up-to-line": {"name":"Arrow Up To Line","viewBox":[0,0,24,24],"paths":["M5 3h14","m18 13-6-6-6 6","M12 7v14"],"stroke":true},
  "arrow-up-wide-narrow": {"name":"Arrow Up Wide Narrow","viewBox":[0,0,24,24],"paths":["m3 8 4-4 4 4","M7 4v16","M11 12h10","M11 16h7","M11 20h4"],"stroke":true},
  "arrow-up-z-a": {"name":"Arrow Up Z A","viewBox":[0,0,24,24],"paths":["m3 8 4-4 4 4","M7 4v16","M15 4h5l-5 6h5","M15 20v-3.5a2.5 2.5 0 0 1 5 0V20","M20 18h-5"],"stroke":true},
  "arrow-up-za": {"name":"Arrow Up Za","viewBox":[0,0,24,24],"paths":["m3 8 4-4 4 4","M7 4v16","M15 4h5l-5 6h5","M15 20v-3.5a2.5 2.5 0 0 1 5 0V20","M20 18h-5"],"stroke":true},
  "arrows-up-from-line": {"name":"Arrows Up From Line","viewBox":[0,0,24,24],"paths":["m4 6 3-3 3 3","M7 17V3","m14 6 3-3 3 3","M17 17V3","M4 21h16"],"stroke":true},
  "asterisk": {"name":"Asterisk","viewBox":[0,0,24,24],"paths":["M12 5v14","m18.065 8.496-12.125 7","m5.94 8.504 12.125 7"],"stroke":true},
  "asterisk-square": {"name":"Asterisk Square","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","M12 8v8","m8.5 14 7-4","m8.5 10 7 4"],"stroke":true},
  "astroid": {"name":"Astroid","viewBox":[0,0,24,24],"paths":["M12.983 21.186a1 1 0 0 1-1.966 0 10 10 0 0 0-8.203-8.203 1 1 0 0 1 0-1.966 10 10 0 0 0 8.203-8.203 1 1 0 0 1 1.966 0 10 10 0 0 0 8.203 8.203 1 1 0 0 1 0 1.966 10 10 0 0 0-8.203 8.203"],"stroke":true},
  "at-sign": {"name":"At Sign","viewBox":[0,0,24,24],"paths":["M 8 12 a 4 4 0 1 0 8 0 a 4 4 0 1 0 -8 0","M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8"],"stroke":true},
  "atom": {"name":"Atom","viewBox":[0,0,24,24],"paths":["M 11 12 a 1 1 0 1 0 2 0 a 1 1 0 1 0 -2 0","M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z","M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z"],"stroke":true},
  "audio-lines": {"name":"Audio Lines","viewBox":[0,0,24,24],"paths":["M2 10v3","M6 6v11","M10 3v18","M14 8v7","M18 5v13","M22 10v3"],"stroke":true},
  "audio-lines-off": {"name":"Audio Lines Off","viewBox":[0,0,24,24],"paths":["M10 10v11","M10 3v1.35","M14 14v1","M14 8v.35","M18 5v7.35","M2 10v3","m2 2 20 20","M22 10v3","M6 6v11"],"stroke":true},
  "audio-lines-x": {"name":"Audio Lines X","viewBox":[0,0,24,24],"paths":["M10 3v18","M14 8v6.35","m17 17 5 5","M18 5v8.1","M2 10v3","M22 10v3","m22 17-5 5","M6 6v11"],"stroke":true},
  "audio-waveform": {"name":"Audio Waveform","viewBox":[0,0,24,24],"paths":["M2 13a2 2 0 0 0 2-2V7a2 2 0 0 1 4 0v13a2 2 0 0 0 4 0V4a2 2 0 0 1 4 0v13a2 2 0 0 0 4 0v-4a2 2 0 0 1 2-2"],"stroke":true},
  "award": {"name":"Award","viewBox":[0,0,24,24],"paths":["m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526","M 6 8 a 6 6 0 1 0 12 0 a 6 6 0 1 0 -12 0"],"stroke":true},
  "axe": {"name":"Axe","viewBox":[0,0,24,24],"paths":["m14 12-8.381 8.38a1 1 0 0 1-3.001-3L11 9","M15 15.5a.5.5 0 0 0 .5.5A6.5 6.5 0 0 0 22 9.5a.5.5 0 0 0-.5-.5h-1.672a2 2 0 0 1-1.414-.586l-5.062-5.062a1.205 1.205 0 0 0-1.704 0L9.352 5.648a1.205 1.205 0 0 0 0 1.704l5.062 5.062A2 2 0 0 1 15 13.828z"],"stroke":true},
  "axis-3-d": {"name":"Axis 3 D","viewBox":[0,0,24,24],"paths":["M13.5 10.5 15 9","M4 4v15a1 1 0 0 0 1 1h15","M4.293 19.707 6 18","m9 15 1.5-1.5"],"stroke":true},
  "axis-3d": {"name":"Axis 3d","viewBox":[0,0,24,24],"paths":["M13.5 10.5 15 9","M4 4v15a1 1 0 0 0 1 1h15","M4.293 19.707 6 18","m9 15 1.5-1.5"],"stroke":true},
  "baby": {"name":"Baby","viewBox":[0,0,24,24],"paths":["M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5","M15 12h.01","M19.38 6.813A9 9 0 0 1 20.8 10.2a2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1","M9 12h.01"],"stroke":true},
  "backpack": {"name":"Backpack","viewBox":[0,0,24,24],"paths":["M4 10a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z","M8 10h8","M8 18h8","M8 22v-6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v6","M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"],"stroke":true},
  "badge": {"name":"Badge","viewBox":[0,0,24,24],"paths":["M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"],"stroke":true},
  "badge-alert": {"name":"Badge Alert","viewBox":[0,0,24,24],"paths":["M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z","M 12 8 L 12 12","M 12 16 L 12.01 16"],"stroke":true},
  "badge-cent": {"name":"Badge Cent","viewBox":[0,0,24,24],"paths":["M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z","M12 7v10","M15.4 10a4 4 0 1 0 0 4"],"stroke":true},
  "badge-check": {"name":"Badge Check","viewBox":[0,0,24,24],"paths":["M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z","m16 9-5.5 5.5L8 12"],"stroke":true},
  "badge-dollar-sign": {"name":"Badge Dollar Sign","viewBox":[0,0,24,24],"paths":["M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z","M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8","M12 18V6"],"stroke":true},
  "badge-euro": {"name":"Badge Euro","viewBox":[0,0,24,24],"paths":["M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z","M7 12h5","M15 9.4a4 4 0 1 0 0 5.2"],"stroke":true},
  "badge-help": {"name":"Badge Help","viewBox":[0,0,24,24],"paths":["M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z","M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3","M 12 17 L 12.01 17"],"stroke":true},
  "badge-indian-rupee": {"name":"Badge Indian Rupee","viewBox":[0,0,24,24],"paths":["M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z","M8 8h8","M8 12h8","m13 17-5-1h1a4 4 0 0 0 0-8"],"stroke":true},
  "badge-info": {"name":"Badge Info","viewBox":[0,0,24,24],"paths":["M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z","M 12 16 L 12 12","M 12 8 L 12.01 8"],"stroke":true},
  "badge-japanese-yen": {"name":"Badge Japanese Yen","viewBox":[0,0,24,24],"paths":["M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z","m9 8 3 3v7","m12 11 3-3","M9 12h6","M9 16h6"],"stroke":true},
  "badge-minus": {"name":"Badge Minus","viewBox":[0,0,24,24],"paths":["M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z","M 8 12 L 16 12"],"stroke":true},
  "badge-percent": {"name":"Badge Percent","viewBox":[0,0,24,24],"paths":["M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z","m15 9-6 6","M9 9h.01","M15 15h.01"],"stroke":true},
  "badge-plus": {"name":"Badge Plus","viewBox":[0,0,24,24],"paths":["M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z","M 12 8 L 12 16","M 8 12 L 16 12"],"stroke":true},
  "badge-pound-sterling": {"name":"Badge Pound Sterling","viewBox":[0,0,24,24],"paths":["M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z","M8 12h4","M10 16V9.5a2.5 2.5 0 0 1 5 0","M8 16h7"],"stroke":true},
  "badge-question-mark": {"name":"Badge Question Mark","viewBox":[0,0,24,24],"paths":["M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z","M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3","M 12 17 L 12.01 17"],"stroke":true},
  "badge-russian-ruble": {"name":"Badge Russian Ruble","viewBox":[0,0,24,24],"paths":["M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z","M9 16h5","M9 12h5a2 2 0 1 0 0-4h-3v9"],"stroke":true},
  "badge-swiss-franc": {"name":"Badge Swiss Franc","viewBox":[0,0,24,24],"paths":["M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z","M11 17V8h4","M11 12h3","M9 16h4"],"stroke":true},
  "badge-turkish-lira": {"name":"Badge Turkish Lira","viewBox":[0,0,24,24],"paths":["M11 7v10a5 5 0 0 0 5-5","m15 8-6 3","M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76"],"stroke":true},
  "badge-x": {"name":"Badge X","viewBox":[0,0,24,24],"paths":["M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z","M 15 9 L 9 15","M 9 9 L 15 15"],"stroke":true},
  "baggage-claim": {"name":"Baggage Claim","viewBox":[0,0,24,24],"paths":["M22 18H6a2 2 0 0 1-2-2V7a2 2 0 0 0-2-2","M17 14V4a2 2 0 0 0-2-2h-1a2 2 0 0 0-2 2v10","M 8 6 h 13 v 8 h -13 z","M 16 20 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0","M 7 20 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0"],"stroke":true},
  "balloon": {"name":"Balloon","viewBox":[0,0,24,24],"paths":["M12 16v1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v1","M12 6a2 2 0 0 1 2 2","M18 8c0 4-3.5 8-6 8s-6-4-6-8a6 6 0 0 1 12 0"],"stroke":true},
  "ban": {"name":"Ban","viewBox":[0,0,24,24],"paths":["M 2 12 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0","M4.929 4.929 19.07 19.071"],"stroke":true},
  "banana": {"name":"Banana","viewBox":[0,0,24,24],"paths":["M4 13c3.5-2 8-2 10 2a5.5 5.5 0 0 1 8 5","M5.15 17.89c5.52-1.52 8.65-6.89 7-12C11.55 4 11.5 2 13 2c3.22 0 5 5.5 5 8 0 6.5-4.2 12-10.49 12C5.11 22 2 22 2 20c0-1.5 1.14-1.55 3.15-2.11Z"],"stroke":true},
  "bandage": {"name":"Bandage","viewBox":[0,0,24,24],"paths":["M10 10.01h.01","M10 14.01h.01","M14 10.01h.01","M14 14.01h.01","M18 6v12","M6 6v12","M 2 6 h 20 v 12 h -20 z"],"stroke":true},
  "bangladeshi-taka": {"name":"Bangladeshi Taka","viewBox":[0,0,24,24],"paths":["M6 5a2 2 0 0 1 4 0v12a4 4 0 0 0 8 0 2 2 0 0 0-4 0","M6 9h12"],"stroke":true},
  "banknote": {"name":"Banknote","viewBox":[0,0,24,24],"paths":["M 2 6 h 20 v 12 h -20 z","M 10 12 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0","M6 12h.01M18 12h.01"],"stroke":true},
  "banknote-arrow-down": {"name":"Banknote Arrow Down","viewBox":[0,0,24,24],"paths":["M12 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5","m16 19 3 3 3-3","M18 12h.01","M19 16v6","M6 12h.01","M 10 12 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0"],"stroke":true},
  "banknote-arrow-up": {"name":"Banknote Arrow Up","viewBox":[0,0,24,24],"paths":["M12 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5","M18 12h.01","M19 22v-6","m22 19-3-3-3 3","M6 12h.01","M 10 12 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0"],"stroke":true},
  "banknote-check": {"name":"Banknote Check","viewBox":[0,0,24,24],"paths":["M11.748 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4.875","m16 19 2 2 4-4","M18 12h.01","M6 12h.01","M 10 12 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0"],"stroke":true},
  "banknote-x": {"name":"Banknote X","viewBox":[0,0,24,24],"paths":["M13 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5","m17 17 5 5","M18 12h.01","m22 17-5 5","M6 12h.01","M 10 12 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0"],"stroke":true},
  "bar-chart": {"name":"Bar Chart","viewBox":[0,0,24,24],"paths":["M5 21v-6","M12 21V9","M19 21V3"],"stroke":true},
  "bar-chart-2": {"name":"Bar Chart 2","viewBox":[0,0,24,24],"paths":["M5 21v-6","M12 21V3","M19 21V9"],"stroke":true},
  "bar-chart-3": {"name":"Bar Chart 3","viewBox":[0,0,24,24],"paths":["M3 3v16a2 2 0 0 0 2 2h16","M18 17V9","M13 17V5","M8 17v-3"],"stroke":true},
  "bar-chart-4": {"name":"Bar Chart 4","viewBox":[0,0,24,24],"paths":["M13 17V9","M18 17V5","M3 3v16a2 2 0 0 0 2 2h16","M8 17v-3"],"stroke":true},
  "bar-chart-big": {"name":"Bar Chart Big","viewBox":[0,0,24,24],"paths":["M3 3v16a2 2 0 0 0 2 2h16","M 15 5 h 4 v 12 h -4 z","M 7 8 h 4 v 9 h -4 z"],"stroke":true},
  "bar-chart-horizontal": {"name":"Bar Chart Horizontal","viewBox":[0,0,24,24],"paths":["M3 3v16a2 2 0 0 0 2 2h16","M7 16h8","M7 11h12","M7 6h3"],"stroke":true},
  "bar-chart-horizontal-big": {"name":"Bar Chart Horizontal Big","viewBox":[0,0,24,24],"paths":["M3 3v16a2 2 0 0 0 2 2h16","M 7 13 h 9 v 4 h -9 z","M 7 5 h 12 v 4 h -12 z"],"stroke":true},
  "barcode": {"name":"Barcode","viewBox":[0,0,24,24],"paths":["M3 5v14","M8 5v14","M12 5v14","M17 5v14","M21 5v14"],"stroke":true},
  "barrel": {"name":"Barrel","viewBox":[0,0,24,24],"paths":["M10 3a41 41 0 000 18","M14 3a41 41 0 010 18","M16.997 21a2 2 0 001.68-.92 15.25 15.25 0 000-16.16 2 2 0 00-1.68-.92h-10a2 2 0 00-1.681.92 15.25 15.25 0 000 16.16 2 2 0 001.681.92z","M3.54 16h16.914","M3.54 8h16.914"],"stroke":true},
  "baseline": {"name":"Baseline","viewBox":[0,0,24,24],"paths":["M4 20h16","m6 16 6-12 6 12","M8 12h8"],"stroke":true},
  "bath": {"name":"Bath","viewBox":[0,0,24,24],"paths":["M10 4 8 6","M17 19v2","M2 12h20","M7 19v2","M9 5 7.621 3.621A2.121 2.121 0 0 0 4 5v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"],"stroke":true},
  "battery": {"name":"Battery","viewBox":[0,0,24,24],"paths":["M 22 14 L 22 10","M 2 6 h 16 v 12 h -16 z"],"stroke":true},
  "battery-charging": {"name":"Battery Charging","viewBox":[0,0,24,24],"paths":["m11 7-3 5h4l-3 5","M14.856 6H16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.935","M22 14v-4","M5.14 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2.936"],"stroke":true},
  "battery-full": {"name":"Battery Full","viewBox":[0,0,24,24],"paths":["M10 10v4","M14 10v4","M22 14v-4","M6 10v4","M 2 6 h 16 v 12 h -16 z"],"stroke":true},
  "battery-low": {"name":"Battery Low","viewBox":[0,0,24,24],"paths":["M22 14v-4","M6 14v-4","M 2 6 h 16 v 12 h -16 z"],"stroke":true},
  "battery-medium": {"name":"Battery Medium","viewBox":[0,0,24,24],"paths":["M10 14v-4","M22 14v-4","M6 14v-4","M 2 6 h 16 v 12 h -16 z"],"stroke":true},
  "battery-plus": {"name":"Battery Plus","viewBox":[0,0,24,24],"paths":["M10 9v6","M12.543 6H16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-3.605","M22 14v-4","M7 12h6","M7.606 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3.606"],"stroke":true},
  "battery-warning": {"name":"Battery Warning","viewBox":[0,0,24,24],"paths":["M10 17h.01","M10 7v6","M14 6h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2","M22 14v-4","M6 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2"],"stroke":true},
  "beaker": {"name":"Beaker","viewBox":[0,0,24,24],"paths":["M4.5 3h15","M6 3v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V3","M6 14h12"],"stroke":true},
  "bean": {"name":"Bean","viewBox":[0,0,24,24],"paths":["M10.165 6.598C9.954 7.478 9.64 8.36 9 9c-.64.64-1.521.954-2.402 1.165A6 6 0 0 0 8 22c7.732 0 14-6.268 14-14a6 6 0 0 0-11.835-1.402Z","M5.341 10.62a4 4 0 1 0 5.279-5.28"],"stroke":true},
  "bean-off": {"name":"Bean Off","viewBox":[0,0,24,24],"paths":["M9 9c-.64.64-1.521.954-2.402 1.165A6 6 0 0 0 8 22a13.96 13.96 0 0 0 9.9-4.1","M10.75 5.093A6 6 0 0 1 22 8c0 2.411-.61 4.68-1.683 6.66","M5.341 10.62a4 4 0 0 0 6.487 1.208M10.62 5.341a4.015 4.015 0 0 1 2.039 2.04","M 2 2 L 22 22"],"stroke":true},
  "bed": {"name":"Bed","viewBox":[0,0,24,24],"paths":["M2 4v16","M2 8h18a2 2 0 0 1 2 2v10","M2 17h20","M6 8v9"],"stroke":true},
  "bed-double": {"name":"Bed Double","viewBox":[0,0,24,24],"paths":["M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8","M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4","M12 4v6","M2 18h20"],"stroke":true},
  "bed-single": {"name":"Bed Single","viewBox":[0,0,24,24],"paths":["M3 20v-8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8","M5 10V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4","M3 18h18"],"stroke":true},
  "beef": {"name":"Beef","viewBox":[0,0,24,24],"paths":["M16.4 13.7A6.5 6.5 0 1 0 6.28 6.6c-1.1 3.13-.78 3.9-3.18 6.08A3 3 0 0 0 5 18c4 0 8.4-1.8 11.4-4.3","m18.5 6 1.754 3.5a6.48 6.48 0 0 1-1.854 8.2C15.4 20.2 11 22 7 22a3 3 0 0 1-2.68-1.66L2.4 16.5","M 10 8.5 a 2.5 2.5 0 1 0 5 0 a 2.5 2.5 0 1 0 -5 0"],"stroke":true},
  "beef-off": {"name":"Beef Off","viewBox":[0,0,24,24],"paths":["M11.771 6.109a2.5 2.5 0 0 1 3.12 3.12","M17.852 12.185a6.5 6.5 0 0 0-9.035-9.04","M18.013 18.013C15.029 20.349 10.831 22 7 22a3 3 0 0 1-2.68-1.66L2.4 16.5","m18.5 6 2.19 4.5a6.48 6.48 0 0 1-.139 4.393","m2 2 20 20","M6.355 6.37a7 7 0 0 0-.075.23c-1.1 3.13-.78 3.9-3.18 6.08A3 3 0 0 0 5 18c3.356 0 6.993-1.267 9.85-3.151"],"stroke":true},
  "beer": {"name":"Beer","viewBox":[0,0,24,24],"paths":["M17 11h1a3 3 0 0 1 0 6h-1","M9 12v6","M13 12v6","M14 7.5c-1 0-1.44.5-3 .5s-2-.5-3-.5-1.72.5-2.5.5a2.5 2.5 0 0 1 0-5c.78 0 1.57.5 2.5.5S9.44 2 11 2s2 1.5 3 1.5 1.72-.5 2.5-.5a2.5 2.5 0 0 1 0 5c-.78 0-1.5-.5-2.5-.5Z","M5 8v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8"],"stroke":true},
  "beer-off": {"name":"Beer Off","viewBox":[0,0,24,24],"paths":["M13 13v5","M17 11.47V8","M17 11h1a3 3 0 0 1 2.745 4.211","m2 2 20 20","M5 8v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-3","M7.536 7.535C6.766 7.649 6.154 8 5.5 8a2.5 2.5 0 0 1-1.768-4.268","M8.727 3.204C9.306 2.767 9.885 2 11 2c1.56 0 2 1.5 3 1.5s1.72-.5 2.5-.5a1 1 0 1 1 0 5c-.78 0-1.5-.5-2.5-.5a3.149 3.149 0 0 0-.842.12","M9 14.6V18"],"stroke":true},
  "bell": {"name":"Bell","viewBox":[0,0,24,24],"paths":["M10.268 21a2 2 0 0 0 3.464 0","M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"],"stroke":true},
  "bell-check": {"name":"Bell Check","viewBox":[0,0,24,24],"paths":["M10.268 21a2 2 0 0 0 3.464 0","m15 8 2 2 4-4","M16.8607 4.4824A6 6 0 0 0 6 8C6 12.499 4.589 13.956 3.262 15.326","M3.262 15.326A1 1 0 0 0 4 17H20A1 1 0 0 0 20.74 15.327C20.209 14.779 19.665 14.218 19.203 13.454"],"stroke":true},
  "bell-dot": {"name":"Bell Dot","viewBox":[0,0,24,24],"paths":["M10.268 21a2 2 0 0 0 3.464 0","M11.68 2.009A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673c-.824-.85-1.678-1.731-2.21-3.348","M 15 5 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0"],"stroke":true},
  "bell-electric": {"name":"Bell Electric","viewBox":[0,0,24,24],"paths":["M18.518 17.347A7 7 0 0 1 14 19","M18.8 4A11 11 0 0 1 20 9","M9 9h.01","M 18 16 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0","M 2 9 a 7 7 0 1 0 14 0 a 7 7 0 1 0 -14 0","M 4 16 h 10 v 6 h -10 z"],"stroke":true},
  "bell-minus": {"name":"Bell Minus","viewBox":[0,0,24,24],"paths":["M10.268 21a2 2 0 0 0 3.464 0","M15 8h6","M16.243 3.757A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673A9.4 9.4 0 0 1 18.667 12"],"stroke":true},
  "bell-off": {"name":"Bell Off","viewBox":[0,0,24,24],"paths":["M10.268 21a2 2 0 0 0 3.464 0","M17 17H4a1 1 0 0 1-.74-1.673C4.59 13.956 6 12.499 6 8a6 6 0 0 1 .258-1.742","m2 2 20 20","M8.668 3.01A6 6 0 0 1 18 8c0 2.687.77 4.653 1.707 6.05"],"stroke":true},
  "bell-plus": {"name":"Bell Plus","viewBox":[0,0,24,24],"paths":["M10.268 21a2 2 0 0 0 3.464 0","M15 8h6","M18 5v6","M20.002 14.464a9 9 0 0 0 .738.863A1 1 0 0 1 20 17H4a1 1 0 0 1-.74-1.673C4.59 13.956 6 12.499 6 8a6 6 0 0 1 8.75-5.332"],"stroke":true},
  "bell-ring": {"name":"Bell Ring","viewBox":[0,0,24,24],"paths":["M10.268 21a2 2 0 0 0 3.464 0","M22 8c0-2.3-.8-4.3-2-6","M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326","M4 2C2.8 3.7 2 5.7 2 8"],"stroke":true},
  "between-horizonal-end": {"name":"Between Horizonal End","viewBox":[0,0,24,24],"paths":["M 3 3 h 13 v 7 h -13 z","m22 15-3-3 3-3","M 3 14 h 13 v 7 h -13 z"],"stroke":true},
  "between-horizonal-start": {"name":"Between Horizonal Start","viewBox":[0,0,24,24],"paths":["M 8 3 h 13 v 7 h -13 z","m2 9 3 3-3 3","M 8 14 h 13 v 7 h -13 z"],"stroke":true},
  "between-horizontal-end": {"name":"Between Horizontal End","viewBox":[0,0,24,24],"paths":["M 3 3 h 13 v 7 h -13 z","m22 15-3-3 3-3","M 3 14 h 13 v 7 h -13 z"],"stroke":true},
  "between-horizontal-start": {"name":"Between Horizontal Start","viewBox":[0,0,24,24],"paths":["M 8 3 h 13 v 7 h -13 z","m2 9 3 3-3 3","M 8 14 h 13 v 7 h -13 z"],"stroke":true},
  "between-vertical-end": {"name":"Between Vertical End","viewBox":[0,0,24,24],"paths":["M 3 3 h 7 v 13 h -7 z","m9 22 3-3 3 3","M 14 3 h 7 v 13 h -7 z"],"stroke":true},
  "between-vertical-start": {"name":"Between Vertical Start","viewBox":[0,0,24,24],"paths":["M 3 8 h 7 v 13 h -7 z","m15 2-3 3-3-3","M 14 8 h 7 v 13 h -7 z"],"stroke":true},
  "biceps-flexed": {"name":"Biceps Flexed","viewBox":[0,0,24,24],"paths":["M12.409 13.017A5 5 0 0 1 22 15c0 3.866-4 7-9 7-4.077 0-8.153-.82-10.371-2.462-.426-.316-.631-.832-.62-1.362C2.118 12.723 2.627 2 10 2a3 3 0 0 1 3 3 2 2 0 0 1-2 2c-1.105 0-1.64-.444-2-1","M15 14a5 5 0 0 0-7.584 2","M9.964 6.825C8.019 7.977 9.5 13 8 15"],"stroke":true},
  "bike": {"name":"Bike","viewBox":[0,0,24,24],"paths":["M 15 17.5 a 3.5 3.5 0 1 0 7 0 a 3.5 3.5 0 1 0 -7 0","M 2 17.5 a 3.5 3.5 0 1 0 7 0 a 3.5 3.5 0 1 0 -7 0","M 14 5 a 1 1 0 1 0 2 0 a 1 1 0 1 0 -2 0","M12 17.5V14l-3-3 4-3 2 3h2"],"stroke":true},
  "binary": {"name":"Binary","viewBox":[0,0,24,24],"paths":["M 14 14 h 4 v 6 h -4 z","M 6 4 h 4 v 6 h -4 z","M6 20h4","M14 10h4","M6 14h2v6","M14 4h2v6"],"stroke":true},
  "binoculars": {"name":"Binoculars","viewBox":[0,0,24,24],"paths":["M10 10h4","M19 7V4a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v3","M20 21a2 2 0 0 0 2-2v-3.851c0-1.39-2-2.962-2-4.829V8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v11a2 2 0 0 0 2 2z","M 22 16 L 2 16","M4 21a2 2 0 0 1-2-2v-3.851c0-1.39 2-2.962 2-4.829V8a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v11a2 2 0 0 1-2 2z","M9 7V4a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v3"],"stroke":true},
  "biohazard": {"name":"Biohazard","viewBox":[0,0,24,24],"stroke":true,"tags":["iso","hazard","safety","biologico","risco"],"paths":["M16 7.5a4 4 0 1 1-8 0 4 4 0 0 1 8 0","M19.9 14.25a4 4 0 1 1-8 0 4 4 0 0 1 8 0","M12.1 14.25a4 4 0 1 1-8 0 4 4 0 0 1 8 0","M13 12a1 1 0 1 1-2 0 1 1 0 0 1 2 0"]},
  "bird": {"name":"Bird","viewBox":[0,0,24,24],"paths":["M16 7h.01","M3.4 18H12a8 8 0 0 0 8-8V7a4 4 0 0 0-7.28-2.3L2 20","m20 7 2 .5-2 .5","M10 18v3","M14 17.75V21","M7 18a6 6 0 0 0 3.84-10.61"],"stroke":true},
  "birdhouse": {"name":"Birdhouse","viewBox":[0,0,24,24],"paths":["M12 18v4","m17 18 1.956-11.468","m3 8 7.82-5.615a2 2 0 0 1 2.36 0L21 8","M4 18h16","M7 18 5.044 6.532","M 10 10 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0"],"stroke":true},
  "bitcoin": {"name":"Bitcoin","viewBox":[0,0,24,24],"paths":["M11.767 19.089c4.924.868 6.14-6.025 1.216-6.894m-1.216 6.894L5.86 18.047m5.908 1.042-.347 1.97m1.563-8.864c4.924.869 6.14-6.025 1.215-6.893m-1.215 6.893-3.94-.694m5.155-6.2L8.29 4.26m5.908 1.042.348-1.97M7.48 20.364l3.126-17.727"],"stroke":true},
  "blend": {"name":"Blend","viewBox":[0,0,24,24],"paths":["M 8 9 a 7 7 0 1 0 14 0 a 7 7 0 1 0 -14 0","M 2 15 a 7 7 0 1 0 14 0 a 7 7 0 1 0 -14 0"],"stroke":true},
  "blender": {"name":"Blender","viewBox":[0,0,24,24],"paths":["M8 14a2 2 0 0 0-1.963 1.615l-1.018 5.193A1 1 0 0 0 6 22h12a1 1 0 0 0 .981-1.192l-1.018-5.193A2 2 0 0 0 16 14z","m17 2-1 12","M8.006 14 7 2","M7.565 8.787A5 5 0 0 0 12 8a5 5 0 0 1 4.56-.75","M19 2H5a2 2 0 0 0-2 2v5a2 2 0 0 0 .688 1.5","M12 18h.01"],"stroke":true},
  "blinds": {"name":"Blinds","viewBox":[0,0,24,24],"paths":["M3 3h18","M20 7H8","M20 11H8","M10 19h10","M8 15h12","M4 3v14","M 2 19 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0"],"stroke":true},
  "blocks": {"name":"Blocks","viewBox":[0,0,24,24],"paths":["M10 22V7a1 1 0 0 0-1-1H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5a1 1 0 0 0-1-1H2","M 14 2 h 8 v 8 h -8 z"],"stroke":true},
  "bluetooth": {"name":"Bluetooth","viewBox":[0,0,24,24],"paths":["m7 7 10 10-5 5V2l5 5L7 17"],"stroke":true},
  "bluetooth-connected": {"name":"Bluetooth Connected","viewBox":[0,0,24,24],"paths":["m7 7 10 10-5 5V2l5 5L7 17","M 18 12 L 21 12","M 3 12 L 6 12"],"stroke":true},
  "bluetooth-off": {"name":"Bluetooth Off","viewBox":[0,0,24,24],"paths":["m17 17-5 5V12l-5 5","m2 2 20 20","M14.5 9.5 17 7l-5-5v4.5"],"stroke":true},
  "bluetooth-searching": {"name":"Bluetooth Searching","viewBox":[0,0,24,24],"paths":["m7 7 10 10-5 5V2l5 5L7 17","M20.83 14.83a4 4 0 0 0 0-5.66","M18 12h.01"],"stroke":true},
  "bold": {"name":"Bold","viewBox":[0,0,24,24],"paths":["M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8"],"stroke":true},
  "bolt": {"name":"Bolt","viewBox":[0,0,24,24],"paths":["M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z","M 8 12 a 4 4 0 1 0 8 0 a 4 4 0 1 0 -8 0"],"stroke":true},
  "bomb": {"name":"Bomb","viewBox":[0,0,24,24],"paths":["M 2 13 a 9 9 0 1 0 18 0 a 9 9 0 1 0 -18 0","M14.35 4.65 16.3 2.7a2.41 2.41 0 0 1 3.4 0l1.6 1.6a2.4 2.4 0 0 1 0 3.4l-1.95 1.95","m22 2-1.5 1.5"],"stroke":true},
  "bone": {"name":"Bone","viewBox":[0,0,24,24],"paths":["M17 10c.7-.7 1.69 0 2.5 0a2.5 2.5 0 1 0 0-5 .5.5 0 0 1-.5-.5 2.5 2.5 0 1 0-5 0c0 .81.7 1.8 0 2.5l-7 7c-.7.7-1.69 0-2.5 0a2.5 2.5 0 0 0 0 5c.28 0 .5.22.5.5a2.5 2.5 0 1 0 5 0c0-.81-.7-1.8 0-2.5Z"],"stroke":true},
  "bone-fracture": {"name":"Bone Fracture","viewBox":[0,0,24,24],"paths":["M14 4.5a1 1 0 0 1 5 0 .5.5 0 0 0 .5.5 1 1 0 0 1 0 5c-.81 0-1.8-.7-2.5 0l-1.958 1.957a.15.15 0 0 1-.252-.072l-.493-2.07a.15.15 0 0 0-.111-.112l-2.072-.494a.15.15 0 0 1-.072-.252L14 7c.7-.7 0-1.69 0-2.5","m16 20-1-2","m20 16-2-1","m4 8 2 1","m8 4 1 2","M9.698 14.19a.15.15 0 0 0 .112.112l2.074.489a.15.15 0 0 1 .072.252L10 17c-.7.7 0 1.69 0 2.5a1 1 0 0 1-5 0 .495.495 0 0 0-.5-.5 1 1 0 0 1 0-5c.81 0 1.8.7 2.5 0l1.956-1.957a.15.15 0 0 1 .252.072z"],"stroke":true},
  "book": {"name":"Book","viewBox":[0,0,24,24],"paths":["M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"],"stroke":true},
  "book-a": {"name":"Book A","viewBox":[0,0,24,24],"paths":["M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20","m8 13 4-7 4 7","M9.1 11h5.7"],"stroke":true},
  "book-alert": {"name":"Book Alert","viewBox":[0,0,24,24],"paths":["M12 13h.01","M12 6v3","M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"],"stroke":true},
  "book-audio": {"name":"Book Audio","viewBox":[0,0,24,24],"paths":["M12 6v7","M16 8v3","M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20","M8 8v3"],"stroke":true},
  "book-bookmark": {"name":"Book Bookmark","viewBox":[0,0,24,24],"paths":["M10 2v7.751a.25.25 0 00.407.195l2.28-1.834a.5.5 0 01.627 0l2.28 1.834A.25.25 0 0016 9.751V2","M4 19.5v-15A2.5 2.5 0 016.5 2H19a1 1 0 011 1v18a1 1 0 01-1 1H6.5a1 1 0 010-5H20"],"stroke":true},
  "book-check": {"name":"Book Check","viewBox":[0,0,24,24],"paths":["M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20","m9 9.5 2 2 4-4"],"stroke":true},
  "book-copy": {"name":"Book Copy","viewBox":[0,0,24,24],"paths":["M5 7a2 2 0 0 0-2 2v11","M5.803 18H5a2 2 0 0 0 0 4h9.5a.5.5 0 0 0 .5-.5V21","M9 15V4a2 2 0 0 1 2-2h9.5a.5.5 0 0 1 .5.5v14a.5.5 0 0 1-.5.5H11a2 2 0 0 1 0-4h10"],"stroke":true},
  "book-dashed": {"name":"Book Dashed","viewBox":[0,0,24,24],"paths":["M12 17h1.5","M12 22h1.5","M12 2h1.5","M17.5 22H19a1 1 0 0 0 1-1","M17.5 2H19a1 1 0 0 1 1 1v1.5","M20 14v3h-2.5","M20 8.5V10","M4 10V8.5","M4 19.5V14","M4 4.5A2.5 2.5 0 0 1 6.5 2H8","M8 22H6.5a1 1 0 0 1 0-5H8"],"stroke":true},
  "book-down": {"name":"Book Down","viewBox":[0,0,24,24],"paths":["M12 13V7","M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20","m9 10 3 3 3-3"],"stroke":true},
  "book-headphones": {"name":"Book Headphones","viewBox":[0,0,24,24],"paths":["M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20","M8 12v-2a4 4 0 0 1 8 0v2","M 14 12 a 1 1 0 1 0 2 0 a 1 1 0 1 0 -2 0","M 8 12 a 1 1 0 1 0 2 0 a 1 1 0 1 0 -2 0"],"stroke":true},
  "book-heart": {"name":"Book Heart","viewBox":[0,0,24,24],"paths":["M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20","M8.62 9.8A2.25 2.25 0 1 1 12 6.836a2.25 2.25 0 1 1 3.38 2.966l-2.626 2.856a.998.998 0 0 1-1.507 0z"],"stroke":true},
  "book-image": {"name":"Book Image","viewBox":[0,0,24,24],"paths":["m20 13.7-2.1-2.1a2 2 0 0 0-2.8 0L9.7 17","M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20","M 8 8 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0"],"stroke":true},
  "book-key": {"name":"Book Key","viewBox":[0,0,24,24],"paths":["M13 2H6.5A2.5 2.5 0 0 0 4 4.5v15","M17 2v6","M17 4h2","M20 15.2V21a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20","M 15 10 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0"],"stroke":true},
  "book-lock": {"name":"Book Lock","viewBox":[0,0,24,24],"paths":["M18 6V4a2 2 0 1 0-4 0v2","M20 15v6a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20","M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H10","M 12 6 h 8 v 5 h -8 z"],"stroke":true},
  "book-marked": {"name":"Book Marked","viewBox":[0,0,24,24],"paths":["M10 2v7.751a.25.25 0 00.407.195l2.28-1.834a.5.5 0 01.627 0l2.28 1.834A.25.25 0 0016 9.751V2","M4 19.5v-15A2.5 2.5 0 016.5 2H19a1 1 0 011 1v18a1 1 0 01-1 1H6.5a1 1 0 010-5H20"],"stroke":true},
  "book-minus": {"name":"Book Minus","viewBox":[0,0,24,24],"paths":["M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20","M9 10h6"],"stroke":true},
  "book-open": {"name":"Book Open","viewBox":[0,0,24,24],"paths":["M12 5v16","M20.001 19A2 2 0 0022 17V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2z"],"stroke":true},
  "book-open-check": {"name":"Book Open Check","viewBox":[0,0,24,24],"paths":["M12 5v16","m16 12 2 2 4-4","M22 6V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2h4.001A2 2 0 0022 17v-1.344"],"stroke":true},
  "book-open-text": {"name":"Book Open Text","viewBox":[0,0,24,24],"paths":["M12 5v16","M16 13h2","M16 9h2","M20.001 19A2 2 0 0022 17V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2z","M6 13h2","M6 9h2"],"stroke":true},
  "book-plus": {"name":"Book Plus","viewBox":[0,0,24,24],"paths":["M12 7v6","M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20","M9 10h6"],"stroke":true},
  "book-search": {"name":"Book Search","viewBox":[0,0,24,24],"paths":["M11 22H5.5a1 1 0 0 1 0-5h4.501","m21 22-1.879-1.878","M3 19.5v-15A2.5 2.5 0 0 1 5.5 2H18a1 1 0 0 1 1 1v8","M 14 18 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0"],"stroke":true},
  "book-template": {"name":"Book Template","viewBox":[0,0,24,24],"paths":["M12 17h1.5","M12 22h1.5","M12 2h1.5","M17.5 22H19a1 1 0 0 0 1-1","M17.5 2H19a1 1 0 0 1 1 1v1.5","M20 14v3h-2.5","M20 8.5V10","M4 10V8.5","M4 19.5V14","M4 4.5A2.5 2.5 0 0 1 6.5 2H8","M8 22H6.5a1 1 0 0 1 0-5H8"],"stroke":true},
  "book-text": {"name":"Book Text","viewBox":[0,0,24,24],"paths":["M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20","M8 11h8","M8 7h6"],"stroke":true},
  "book-type": {"name":"Book Type","viewBox":[0,0,24,24],"paths":["M10 13h4","M12 6v7","M16 8V6H8v2","M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"],"stroke":true},
  "book-up": {"name":"Book Up","viewBox":[0,0,24,24],"paths":["M12 13V7","M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20","m9 10 3-3 3 3"],"stroke":true},
  "book-up-2": {"name":"Book Up 2","viewBox":[0,0,24,24],"paths":["M12 13V7","M18 2h1a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20","M4 19.5v-15A2.5 2.5 0 0 1 6.5 2","m9 10 3-3 3 3","m9 5 3-3 3 3"],"stroke":true},
  "book-user": {"name":"Book User","viewBox":[0,0,24,24],"paths":["M15 13a3 3 0 1 0-6 0","M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20","M 10 8 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0"],"stroke":true},
  "book-x": {"name":"Book X","viewBox":[0,0,24,24],"paths":["m14.5 7.5-5 5","M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20","m9.5 7.5 5 5"],"stroke":true},
  "bookmark": {"name":"Bookmark","viewBox":[0,0,24,24],"paths":["M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z"],"stroke":true},
  "bookmark-check": {"name":"Bookmark Check","viewBox":[0,0,24,24],"paths":["M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z","m9 10 2 2 4-4"],"stroke":true},
  "bookmark-minus": {"name":"Bookmark Minus","viewBox":[0,0,24,24],"paths":["M15 10H9","M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z"],"stroke":true},
  "bookmark-off": {"name":"Bookmark Off","viewBox":[0,0,24,24],"paths":["M19 19v1a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5","m2 2 20 20","M8.656 3H17a2 2 0 0 1 2 2v8.344"],"stroke":true},
  "bookmark-plus": {"name":"Bookmark Plus","viewBox":[0,0,24,24],"paths":["M12 7v6","M15 10H9","M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z"],"stroke":true},
  "bookmark-x": {"name":"Bookmark X","viewBox":[0,0,24,24],"paths":["m14.5 7.5-5 5","M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z","m9.5 7.5 5 5"],"stroke":true},
  "boom-box": {"name":"Boom Box","viewBox":[0,0,24,24],"paths":["M4 9V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4","M8 8v1","M12 8v1","M16 8v1","M 2 9 h 20 v 12 h -20 z","M 6 15 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0","M 14 15 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0"],"stroke":true},
  "bot": {"name":"Bot","viewBox":[0,0,24,24],"paths":["M12 8V4H8","M 4 8 h 16 v 12 h -16 z","M2 14h2","M20 14h2","M15 13v2","M9 13v2"],"stroke":true},
  "bot-message-square": {"name":"Bot Message Square","viewBox":[0,0,24,24],"paths":["M12 6V2H8","M15 11v2","M2 12h2","M20 12h2","M20 16a2 2 0 0 1-2 2H8.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 4 20.286V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2z","M9 11v2"],"stroke":true},
  "bot-off": {"name":"Bot Off","viewBox":[0,0,24,24],"paths":["M13.67 8H18a2 2 0 0 1 2 2v4.33","M2 14h2","M20 14h2","M22 22 2 2","M8 8H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 1.414-.586","M9 13v2","M9.67 4H12v2.33"],"stroke":true},
  "bottle-wine": {"name":"Bottle Wine","viewBox":[0,0,24,24],"paths":["M10 3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a6 6 0 0 0 1.2 3.6l.6.8A6 6 0 0 1 17 13v8a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-8a6 6 0 0 1 1.2-3.6l.6-.8A6 6 0 0 0 10 5z","M17 13h-4a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h4"],"stroke":true},
  "bow-arrow": {"name":"Bow Arrow","viewBox":[0,0,24,24],"paths":["M17 3h4v4","M18.575 11.082a13 13 0 0 1 1.048 9.027 1.17 1.17 0 0 1-1.914.597L14 17","M7 10 3.29 6.29a1.17 1.17 0 0 1 .6-1.91 13 13 0 0 1 9.03 1.05","M7 14a1.7 1.7 0 0 0-1.207.5l-2.646 2.646A.5.5 0 0 0 3.5 18H5a1 1 0 0 1 1 1v1.5a.5.5 0 0 0 .854.354L9.5 18.207A1.7 1.7 0 0 0 10 17v-2a1 1 0 0 0-1-1z","M9.707 14.293 21 3"],"stroke":true},
  "box": {"name":"Box","viewBox":[0,0,24,24],"paths":["M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z","m3.3 7 8.7 5 8.7-5","M12 22V12"],"stroke":true},
  "box-select": {"name":"Box Select","viewBox":[0,0,24,24],"paths":["M5 3a2 2 0 0 0-2 2","M19 3a2 2 0 0 1 2 2","M21 19a2 2 0 0 1-2 2","M5 21a2 2 0 0 1-2-2","M9 3h1","M9 21h1","M14 3h1","M14 21h1","M3 9v1","M21 9v1","M3 14v1","M21 14v1"],"stroke":true},
  "boxes": {"name":"Boxes","viewBox":[0,0,24,24],"paths":["M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z","m7 16.5-4.74-2.85","m7 16.5 5-3","M7 16.5v5.17","M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z","m17 16.5-5-3","m17 16.5 4.74-2.85","M17 16.5v5.17","M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z","M12 8 7.26 5.15","m12 8 4.74-2.85","M12 13.5V8"],"stroke":true},
  "braces": {"name":"Braces","viewBox":[0,0,24,24],"paths":["M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1","M16 21h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1"],"stroke":true},
  "brackets": {"name":"Brackets","viewBox":[0,0,24,24],"paths":["M16 3h3a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-3","M8 21H5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h3"],"stroke":true},
  "brain": {"name":"Brain","viewBox":[0,0,24,24],"paths":["M12 18V5","M15 13a4.17 4.17 0 0 1-3-4 4.17 4.17 0 0 1-3 4","M17.598 6.5A3 3 0 1 0 12 5a3 3 0 1 0-5.598 1.5","M17.997 5.125a4 4 0 0 1 2.526 5.77","M18 18a4 4 0 0 0 2-7.464","M19.967 17.483A4 4 0 1 1 12 18a4 4 0 1 1-7.967-.517","M6 18a4 4 0 0 1-2-7.464","M6.003 5.125a4 4 0 0 0-2.526 5.77"],"stroke":true},
  "brain-circuit": {"name":"Brain Circuit","viewBox":[0,0,24,24],"paths":["M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z","M9 13a4.5 4.5 0 0 0 3-4","M6.003 5.125A3 3 0 0 0 6.401 6.5","M3.477 10.896a4 4 0 0 1 .585-.396","M6 18a4 4 0 0 1-1.967-.516","M12 13h4","M12 18h6a2 2 0 0 1 2 2v1","M12 8h8","M16 8V5a2 2 0 0 1 2-2","M 15.5 13 a 0.5 0.5 0 1 0 1 0 a 0.5 0.5 0 1 0 -1 0","M 17.5 3 a 0.5 0.5 0 1 0 1 0 a 0.5 0.5 0 1 0 -1 0","M 19.5 21 a 0.5 0.5 0 1 0 1 0 a 0.5 0.5 0 1 0 -1 0","M 19.5 8 a 0.5 0.5 0 1 0 1 0 a 0.5 0.5 0 1 0 -1 0"],"stroke":true},
  "brain-cog": {"name":"Brain Cog","viewBox":[0,0,24,24],"paths":["m10.852 14.772-.383.923","m10.852 9.228-.383-.923","m13.148 14.772.382.924","m13.531 8.305-.383.923","m14.772 10.852.923-.383","m14.772 13.148.923.383","M17.598 6.5A3 3 0 1 0 12 5a3 3 0 0 0-5.63-1.446 3 3 0 0 0-.368 1.571 4 4 0 0 0-2.525 5.771","M17.998 5.125a4 4 0 0 1 2.525 5.771","M19.505 10.294a4 4 0 0 1-1.5 7.706","M4.032 17.483A4 4 0 0 0 11.464 20c.18-.311.892-.311 1.072 0a4 4 0 0 0 7.432-2.516","M4.5 10.291A4 4 0 0 0 6 18","M6.002 5.125a3 3 0 0 0 .4 1.375","m9.228 10.852-.923-.383","m9.228 13.148-.923.383","M 9 12 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0"],"stroke":true},
  "brick-wall": {"name":"Brick Wall","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","M12 9v6","M16 15v6","M16 3v6","M3 15h18","M3 9h18","M8 15v6","M8 3v6"],"stroke":true},
  "brick-wall-fire": {"name":"Brick Wall Fire","viewBox":[0,0,24,24],"paths":["M16 3v2.107","M17 9c1 3 2.5 3.5 3.5 4.5A5 5 0 0 1 22 17a5 5 0 0 1-10 0c0-.3 0-.6.1-.9a2 2 0 1 0 3.3-2C13 11.5 16 9 17 9","M21 8.274V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.938","M3 15h5.253","M3 9h8.228","M8 15v6","M8 3v6"],"stroke":true},
  "brick-wall-shield": {"name":"Brick Wall Shield","viewBox":[0,0,24,24],"paths":["M12 9v1.258","M16 3v5.46","M21 9.118V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h5.75","M22 17.5c0 2.499-1.75 3.749-3.83 4.474a.5.5 0 0 1-.335-.005c-2.085-.72-3.835-1.97-3.835-4.47V14a.5.5 0 0 1 .5-.499c1 0 2.25-.6 3.12-1.36a.6.6 0 0 1 .76-.001c.875.765 2.12 1.36 3.12 1.36a.5.5 0 0 1 .5.5z","M3 15h7","M3 9h12.142","M8 15v6","M8 3v6"],"stroke":true},
  "bridge": {"name":"Bridge","viewBox":[0,0,24,24],"paths":["M10 9.728V16","M14 9.728V16","M18 20V4","m22 11-4-4A7.5 7.5 0 0 1 6 7l-4 4","M22 16H2","M6 20V4"],"stroke":true},
  "briefcase": {"name":"Briefcase","viewBox":[0,0,24,24],"paths":["M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16","M 2 6 h 20 v 14 h -20 z"],"stroke":true},
  "briefcase-business": {"name":"Briefcase Business","viewBox":[0,0,24,24],"paths":["M12 12h.01","M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2","M22 13a18.15 18.15 0 0 1-20 0","M 2 6 h 20 v 14 h -20 z"],"stroke":true},
  "briefcase-conveyor-belt": {"name":"Briefcase Conveyor Belt","viewBox":[0,0,24,24],"paths":["M10 20v2","M14 20v2","M18 20v2","M21 20H3","M6 20v2","M8 16V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v12","M 4 6 h 16 v 10 h -16 z"],"stroke":true},
  "briefcase-medical": {"name":"Briefcase Medical","viewBox":[0,0,24,24],"paths":["M12 11v4","M14 13h-4","M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2","M18 6v14","M6 6v14","M 2 6 h 20 v 14 h -20 z"],"stroke":true},
  "briefcase-plus": {"name":"Briefcase Plus","viewBox":[0,0,24,24],"paths":["M13.354 20H4a2 2 0 01-2-2V8a2 2 0 012-2h16a2 2 0 012 2v3.354","M16 11.354V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v16","M16 17h6","M19 14v6"],"stroke":true},
  "bring-to-front": {"name":"Bring To Front","viewBox":[0,0,24,24],"paths":["M 8 8 h 8 v 8 h -8 z","M4 10a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2","M14 20a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2"],"stroke":true},
  "broccoli": {"name":"Broccoli","viewBox":[0,0,24,24],"paths":["M10 13a3 3 0 01-2.121-5.121","M15.606 14.204c-3.5 1.5-5.899 4.503-8.899 7.503A1 1 0 016 22c-2 0-4-2-4-4a1 1 0 01.293-.707c1.911-1.911 3.823-3.578 5.347-5.441","M16.573 14.737A4 4 0 0114 11","M7.14 10.907a4 4 0 112.756-7.43A4 4 0 0116.7 4.48a2 2 0 012.82 2.82 4 4 0 011.002 6.805 4 4 0 11-7.51 1.59"],"stroke":true},
  "broom": {"name":"Broom","viewBox":[0,0,24,24],"paths":["M13.5 10.5 22 2","M14.734 13.841a2 2 0 00-.314-2.42L12.58 9.58a2 2 0 00-2.421-.314l-7.657 4.461A1 1 0 002.3 15.3l6.403 6.403a1 1 0 001.571-.204z","m5 18 2-2","m7.699 10.7 5.602 5.601"],"stroke":true},
  "broom-sparkles": {"name":"Broom Sparkles","viewBox":[0,0,24,24],"paths":["M11 2v2","M12 3h-2","M13.5 10.5 22 2","M14.734 13.841a2 2 0 00-.314-2.42L12.58 9.58a2 2 0 00-2.421-.314l-7.657 4.461A1 1 0 002.3 15.3l6.403 6.403a1 1 0 001.571-.204z","M20 15v4","M22 17h-4","M4 4v4","m5 18 2-2","M6 6H2","m7.699 10.7 5.602 5.601"],"stroke":true},
  "brush": {"name":"Brush","viewBox":[0,0,24,24],"paths":["m11 10 3 3","M6.5 21A3.5 3.5 0 1 0 3 17.5a2.62 2.62 0 0 1-.708 1.792A1 1 0 0 0 3 21z","M9.969 17.031 21.378 5.624a1 1 0 0 0-3.002-3.002L6.967 14.031"],"stroke":true},
  "brush-cleaning": {"name":"Brush Cleaning","viewBox":[0,0,24,24],"paths":["m16 22-1-4","M19 14a1 1 0 0 0 1-1v-1a2 2 0 0 0-2-2h-3a1 1 0 0 1-1-1V4a2 2 0 0 0-4 0v5a1 1 0 0 1-1 1H6a2 2 0 0 0-2 2v1a1 1 0 0 0 1 1","M19 14H5l-1.973 6.767A1 1 0 0 0 4 22h16a1 1 0 0 0 .973-1.233z","m8 22 1-4"],"stroke":true},
  "bubbles": {"name":"Bubbles","viewBox":[0,0,24,24],"paths":["M7.001 15.085A1.5 1.5 0 0 1 9 16.5","M 15 8.5 a 3.5 3.5 0 1 0 7 0 a 3.5 3.5 0 1 0 -7 0","M 2 16.5 a 5.5 5.5 0 1 0 11 0 a 5.5 5.5 0 1 0 -11 0","M 5 4.5 a 2.5 2.5 0 1 0 5 0 a 2.5 2.5 0 1 0 -5 0"],"stroke":true},
  "bug": {"name":"Bug","viewBox":[0,0,24,24],"paths":["M12 20v-9","M14 7a4 4 0 0 1 4 4v3a6 6 0 0 1-12 0v-3a4 4 0 0 1 4-4z","M14.12 3.88 16 2","M21 21a4 4 0 0 0-3.81-4","M21 5a4 4 0 0 1-3.55 3.97","M22 13h-4","M3 21a4 4 0 0 1 3.81-4","M3 5a4 4 0 0 0 3.55 3.97","M6 13H2","m8 2 1.88 1.88","M9 7.13V6a3 3 0 1 1 6 0v1.13"],"stroke":true},
  "bug-off": {"name":"Bug Off","viewBox":[0,0,24,24],"paths":["M12 20v-8","M12.656 7H14a4 4 0 0 1 4 4v1.344","M14.12 3.88 16 2","M17.123 17.123A6 6 0 0 1 6 14v-3a4 4 0 0 1 1.72-3.287","m2 2 20 20","M21 5a4 4 0 0 1-3.55 3.97","M22 13h-3.344","M3 21a4 4 0 0 1 3.81-4","M3 5a4 4 0 0 0 3.55 3.97","M6 13H2","m8 2 1.88 1.88","M9.712 4.06A3 3 0 0 1 15 6v1.13"],"stroke":true},
  "bug-play": {"name":"Bug Play","viewBox":[0,0,24,24],"paths":["M10 19.655A6 6 0 0 1 6 14v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 3.97","M14 15.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997a1 1 0 0 1-1.517-.86z","M14.12 3.88 16 2","M21 5a4 4 0 0 1-3.55 3.97","M3 21a4 4 0 0 1 3.81-4","M3 5a4 4 0 0 0 3.55 3.97","M6 13H2","m8 2 1.88 1.88","M9 7.13V6a3 3 0 1 1 6 0v1.13"],"stroke":true},
  "building": {"name":"Building","viewBox":[0,0,24,24],"paths":["M12 10h.01","M12 14h.01","M12 6h.01","M16 10h.01","M16 14h.01","M16 6h.01","M8 10h.01","M8 14h.01","M8 6h.01","M9 22v-3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3","M 4 2 h 16 v 20 h -16 z"],"stroke":true},
  "building-2": {"name":"Building 2","viewBox":[0,0,24,24],"paths":["M10 12h4","M10 8h4","M14 21v-3a2 2 0 0 0-4 0v3","M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2","M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16"],"stroke":true},
  "building-complex": {"name":"Building Complex","viewBox":[0,0,24,24],"paths":["M10 12h4","M10 8h4","M14 21v-3a2 2 0 0 0-4 0v3","M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2","M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16"],"stroke":true},
  "building-complex-plus": {"name":"Building Complex Plus","viewBox":[0,0,24,24],"paths":["M10 12h4","M10 21v-3a2 2 0 013.05-1.702","M10 8h4","M16 19h6","M18 7h2a2 2 0 012 2v4.355","M19 16v6","M6 10H4a2 2 0 00-2 2v7a2 2 0 002 2h8.535","M6 21V5a2 2 0 012-2h8a2 2 0 012 2v7.126"],"stroke":true},
  "bus": {"name":"Bus","viewBox":[0,0,24,24],"paths":["M8 6v6","M15 6v6","M2 12h19.6","M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3","M 5 18 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0","M9 18h5","M 14 18 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0"],"stroke":true},
  "bus-front": {"name":"Bus Front","viewBox":[0,0,24,24],"paths":["M4 6 2 7","M10 6h4","m22 7-2-1","M 4 3 h 16 v 16 h -16 z","M4 11h16","M8 15h.01","M16 15h.01","M6 19v2","M18 21v-2"],"stroke":true},
  "cable": {"name":"Cable","viewBox":[0,0,24,24],"paths":["M17 19a1 1 0 0 1-1-1v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a1 1 0 0 1-1 1z","M17 21v-2","M19 14V6.5a1 1 0 0 0-7 0v11a1 1 0 0 1-7 0V10","M21 21v-2","M3 5V3","M4 10a2 2 0 0 1-2-2V6a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2a2 2 0 0 1-2 2z","M7 5V3"],"stroke":true},
  "cable-car": {"name":"Cable Car","viewBox":[0,0,24,24],"paths":["M10 3h.01","M14 2h.01","m2 9 20-5","M12 12V6.5","M 4 12 h 16 v 10 h -16 z","M9 12v5","M15 12v5","M4 17h16"],"stroke":true},
  "cake": {"name":"Cake","viewBox":[0,0,24,24],"paths":["M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8","M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1","M2 21h20","M7 8v3","M12 8v3","M17 8v3","M7 4h.01","M12 4h.01","M17 4h.01"],"stroke":true},
  "cake-slice": {"name":"Cake Slice","viewBox":[0,0,24,24],"paths":["M16 13H3","M16 17H3","m7.2 7.9-3.388 2.5A2 2 0 0 0 3 12.01V20a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-8.654c0-2-2.44-6.026-6.44-8.026a1 1 0 0 0-1.082.057L10.4 5.6","M 7 7 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0"],"stroke":true},
  "calculator": {"name":"Calculator","viewBox":[0,0,24,24],"paths":["M 4 2 h 16 v 20 h -16 z","M 8 6 L 16 6","M 16 14 L 16 18","M16 10h.01","M12 10h.01","M8 10h.01","M12 14h.01","M8 14h.01","M12 18h.01","M8 18h.01"],"stroke":true},
  "calendar": {"name":"Calendar","viewBox":[0,0,24,24],"paths":["M8 2v3","M16 2v3","M 3 3 h 18 v 18 h -18 z","M3 9h18"],"stroke":true},
  "calendar-1": {"name":"Calendar 1","viewBox":[0,0,24,24],"paths":["M11 13h1v4","M16 2v3","M3 9h18","M8 2v3","M 3 3 h 18 v 18 h -18 z"],"stroke":true},
  "calendar-arrow-down": {"name":"Calendar Arrow Down","viewBox":[0,0,24,24],"paths":["m14 17 4 4 4-4","M16 2v3","M18 13v8","M21 10.354V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h7.343","M3 9h18","M8 2v3"],"stroke":true},
  "calendar-arrow-up": {"name":"Calendar Arrow Up","viewBox":[0,0,24,24],"paths":["m14 17 4-4 4 4","M16 2v3","M18 21v-8","M21 10.343V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h9","M3 9h18","M8 2v3"],"stroke":true},
  "calendar-check": {"name":"Calendar Check","viewBox":[0,0,24,24],"paths":["M8 2v3","M16 2v3","M 3 3 h 18 v 18 h -18 z","M3 9h18","m9 15 2 2 4-4"],"stroke":true},
  "calendar-check-2": {"name":"Calendar Check 2","viewBox":[0,0,24,24],"paths":["M 19 3 L 5 3","M 21 13 L 21 5","M 21 5 A2 2 0 0 0 19 3","M 3 19 A2 2 0 0 0 5 21","M 3 5 L 3 19","M 5 3 A2 2 0 0 0 3 5","m16 19 2 2 4-4","M16 2v3","M3 9h18","M5 21 L12.5 21","M8 2v3"],"stroke":true},
  "calendar-chevrons-right": {"name":"Calendar Chevrons Right","viewBox":[0,0,24,24],"paths":["m13 21 3-3-3-3","M16 2v3","m19 21 3-3-3-3","M21 11.5V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h4","M3 9h18","M8 2v3"],"stroke":true},
  "calendar-clock": {"name":"Calendar Clock","viewBox":[0,0,24,24],"paths":["M16 14v2.2l1.6 1","M16 2v3","M21 7.338V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h2.338","M3 9h5.859","M8 2v3","M 10 16 a 6 6 0 1 0 12 0 a 6 6 0 1 0 -12 0"],"stroke":true},
  "calendar-cog": {"name":"Calendar Cog","viewBox":[0,0,24,24],"paths":["m15.228 16.852-.923-.383","m15.228 19.148-.923.383","M16 2v3","m16.47 14.305.382.923","m16.852 20.772-.383.924","m19.148 15.228.383-.923","m19.53 21.696-.382-.924","m20.773 16.852.924-.383","m20.773 19.148.924.383","M21 10.5V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h5.5","M3 9h18","M8 2v3","M 15 18 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0"],"stroke":true},
  "calendar-days": {"name":"Calendar Days","viewBox":[0,0,24,24],"paths":["M8 2v3","M16 2v3","M 3 3 h 18 v 18 h -18 z","M3 9h18","M8 13h.01","M12 13h.01","M16 13h.01","M8 17h.01","M12 17h.01","M16 17h.01"],"stroke":true},
  "calendar-fold": {"name":"Calendar Fold","viewBox":[0,0,24,24],"paths":["M16 2v3","M21 15V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h10v-5a1 1 0 011-1za2.4 2.4 0 01-.706 1.706l-3.588 3.588A2.4 2.4 0 0115 21","M3 9h18","M8 2v3"],"stroke":true},
  "calendar-heart": {"name":"Calendar Heart","viewBox":[0,0,24,24],"paths":["M12.127 21H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v5.125","M14.62 17.8A2.25 2.25 0 1118 14.836a2.25 2.25 0 113.38 2.966l-2.626 2.856a.998.998 0 01-1.507 0z","M16 2v3","M3 9h18","M8 2v3"],"stroke":true},
  "calendar-minus": {"name":"Calendar Minus","viewBox":[0,0,24,24],"paths":["M16 18h6","M16 2v3","M21 14V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h8.3","M3 9h18","M8 2v3"],"stroke":true},
  "calendar-minus-2": {"name":"Calendar Minus 2","viewBox":[0,0,24,24],"paths":["M8 2v3","M16 2v3","M 3 3 h 18 v 18 h -18 z","M3 9h18","M10 15h4"],"stroke":true},
  "calendar-off": {"name":"Calendar Off","viewBox":[0,0,24,24],"paths":["M16 2v3","m2 2 20 20","M21 9h-5.5","M3 9h6","M3.586 3.586A2 2 0 003 5v14a2 2 0 002 2h14a2 2 0 001.414-.586","M8.656 3H19a2 2 0 012 2v10.344"],"stroke":true},
  "calendar-plus": {"name":"Calendar Plus","viewBox":[0,0,24,24],"paths":["M16 18h6","M16 2v3","M19 15v6","M21 11.5V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h8.3","M3 9h18","M8 2v3"],"stroke":true},
  "calendar-plus-2": {"name":"Calendar Plus 2","viewBox":[0,0,24,24],"paths":["M8 2v3","M16 2v3","M 3 3 h 18 v 18 h -18 z","M3 9h18","M10 15h4","M12 13v4"],"stroke":true},
  "calendar-range": {"name":"Calendar Range","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","M16 2v3","M3 9h18","M8 2v3","M17 13h-6","M13 17H7","M7 13h.01","M17 17h.01"],"stroke":true},
  "calendar-search": {"name":"Calendar Search","viewBox":[0,0,24,24],"paths":["M16 2v3","M21 10.69V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h7.25","m22 21-1.875-1.875","M3 9h18","M8 2v3","M 15 17 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0"],"stroke":true},
  "calendar-sync": {"name":"Calendar Sync","viewBox":[0,0,24,24],"paths":["M11 10v4h4","m11 14 1.535-1.605a5 5 0 018 1.5","M16 2v3","m21 18-1.535 1.605a5 5 0 01-8-1.5","M21 22v-4h-4","M21 8.517V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h3.517","M3 9h4","M8 2v3"],"stroke":true},
  "calendar-x": {"name":"Calendar X","viewBox":[0,0,24,24],"paths":["M8 2v3","M16 2v3","M 3 3 h 18 v 18 h -18 z","M3 9h18","m14 13-4 4","m10 13 4 4"],"stroke":true},
  "calendar-x-2": {"name":"Calendar X 2","viewBox":[0,0,24,24],"paths":["M16 2v3","m17 16 5 5","m17 21 5-5","M21 12V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h8","M3 9h18","M8 2v3"],"stroke":true},
  "calendars": {"name":"Calendars","viewBox":[0,0,24,24],"paths":["M12 2v2","M15.726 21.01A2 2 0 0 1 14 22H4a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2","M18 2v2","M2 13h2","M8 8h14","M 8 3 h 14 v 14 h -14 z"],"stroke":true},
  "camera": {"name":"Camera","viewBox":[0,0,24,24],"paths":["M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z","M 9 13 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0"],"stroke":true},
  "camera-off": {"name":"Camera Off","viewBox":[0,0,24,24],"paths":["M14.564 14.558a3 3 0 1 1-4.122-4.121","m2 2 20 20","M20 20H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 .819-.175","M9.695 4.024A2 2 0 0 1 10.004 4h3.993a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v7.344"],"stroke":true},
  "can": {"name":"Can","viewBox":[0,0,24,24],"paths":["M21 10.5a9 2.5 0 01-18 0v8a9 2.5 0 0018 0z","M21 10.5A9 2.5 25.32 004.59 3.47 9 2.5 25.32 0021 10.5","M3 10.5a9 2.5 0 016.527-2.405","M9 16.858a31 31 0 006 0"],"stroke":true},
  "can-soda": {"name":"Can Soda","viewBox":[0,0,24,24],"paths":["m17 22 1.664-2.496a2 2 0 00.336-1.11V5.606a2 2 0 00-.336-1.11L17 2","M18 22H6","M18 2H6","M5 17h14","M5 7h14","m7 22-1.664-2.496A2 2 0 015 18.394V5.606a2 2 0 01.336-1.11L7 2"],"stroke":true},
  "candlestick-chart": {"name":"Candlestick Chart","viewBox":[0,0,24,24],"paths":["M9 5v4","M 7 9 h 4 v 6 h -4 z","M9 15v2","M17 3v2","M 15 5 h 4 v 8 h -4 z","M17 13v3","M3 3v16a2 2 0 0 0 2 2h16"],"stroke":true},
  "candy": {"name":"Candy","viewBox":[0,0,24,24],"paths":["M10 7v10.9","M14 6.1V17","M16 7V3a1 1 0 0 1 1.707-.707 2.5 2.5 0 0 0 2.152.717 1 1 0 0 1 1.131 1.131 2.5 2.5 0 0 0 .717 2.152A1 1 0 0 1 21 8h-4","M16.536 7.465a5 5 0 0 0-7.072 0l-2 2a5 5 0 0 0 0 7.07 5 5 0 0 0 7.072 0l2-2a5 5 0 0 0 0-7.07","M8 17v4a1 1 0 0 1-1.707.707 2.5 2.5 0 0 0-2.152-.717 1 1 0 0 1-1.131-1.131 2.5 2.5 0 0 0-.717-2.152A1 1 0 0 1 3 16h4"],"stroke":true},
  "candy-cane": {"name":"Candy Cane","viewBox":[0,0,24,24],"paths":["m10.8 5 2.111 4.223","M17.75 7 15 2.1","m4.874 14.647 2.12 4.24","M5.7 21a2 2 0 0 1-3.5-2l8.6-14a6 6 0 0 1 10.4 6 2 2 0 1 1-3.464-2 2 2 0 1 0-3.464-2z","m7.906 9.712 2.005 4.411"],"stroke":true},
  "candy-off": {"name":"Candy Off","viewBox":[0,0,24,24],"paths":["M10 10v7.9","M11.802 6.145a5 5 0 0 1 6.053 6.053","M14 6.1v2.243","m15.5 15.571-.964.964a5 5 0 0 1-7.071 0 5 5 0 0 1 0-7.07l.964-.965","M16 7V3a1 1 0 0 1 1.707-.707 2.5 2.5 0 0 0 2.152.717 1 1 0 0 1 1.131 1.131 2.5 2.5 0 0 0 .717 2.152A1 1 0 0 1 21 8h-4","m2 2 20 20","M8 17v4a1 1 0 0 1-1.707.707 2.5 2.5 0 0 0-2.152-.717 1 1 0 0 1-1.131-1.131 2.5 2.5 0 0 0-.717-2.152A1 1 0 0 1 3 16h4"],"stroke":true},
  "cannabis": {"name":"Cannabis","viewBox":[0,0,24,24],"paths":["M12 22v-4","M7 12c-1.5 0-4.5 1.5-5 3 3.5 1.5 6 1 6 1-1.5 1.5-2 3.5-2 5 2.5 0 4.5-1.5 6-3 1.5 1.5 3.5 3 6 3 0-1.5-.5-3.5-2-5 0 0 2.5.5 6-1-.5-1.5-3.5-3-5-3 1.5-1 4-4 4-6-2.5 0-5.5 1.5-7 3 0-2.5-.5-5-2-7-1.5 2-2 4.5-2 7-1.5-1.5-4.5-3-7-3 0 2 2.5 5 4 6"],"stroke":true},
  "cannabis-off": {"name":"Cannabis Off","viewBox":[0,0,24,24],"paths":["M12 22v-4c1.5 1.5 3.5 3 6 3 0-1.5-.5-3.5-2-5","M13.988 8.327C13.902 6.054 13.365 3.82 12 2a9.3 9.3 0 0 0-1.445 2.9","M17.375 11.725C18.882 10.53 21 7.841 21 6c-2.324 0-5.08 1.296-6.662 2.684","m2 2 20 20","M21.024 15.378A15 15 0 0 0 22 15c-.426-1.279-2.67-2.557-4.25-2.907","M6.995 6.992C5.714 6.4 4.29 6 3 6c0 2 2.5 5 4 6-1.5 0-4.5 1.5-5 3 3.5 1.5 6 1 6 1-1.5 1.5-2 3.5-2 5 2.5 0 4.5-1.5 6-3"],"stroke":true},
  "captions": {"name":"Captions","viewBox":[0,0,24,24],"paths":["M 3 5 h 18 v 14 h -18 z","M7 15h4M15 15h2M7 11h2M13 11h4"],"stroke":true},
  "captions-off": {"name":"Captions Off","viewBox":[0,0,24,24],"paths":["M10.5 5H19a2 2 0 0 1 2 2v8.5","M17 11h-.5","M19 19H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2","m2 2 20 20","M7 11h4","M7 15h2.5"],"stroke":true},
  "car": {"name":"Car","viewBox":[0,0,24,24],"paths":["M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2","M 5 17 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0","M9 17h6","M 15 17 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0"],"stroke":true},
  "car-battery": {"name":"Car Battery","viewBox":[0,0,24,24],"paths":["M14 13h4","M16 15v-4","M18 5v2","M6 13h4","M6 5v2","M 2 7 h 20 v 12 h -20 z"],"stroke":true},
  "car-front": {"name":"Car Front","viewBox":[0,0,24,24],"paths":["m21 8-2 2-1.5-3.7A2 2 0 0 0 15.646 5H8.4a2 2 0 0 0-1.903 1.257L5 10 3 8","M7 14h.01","M17 14h.01","M 3 10 h 18 v 8 h -18 z","M5 18v2","M19 18v2"],"stroke":true},
  "car-taxi-front": {"name":"Car Taxi Front","viewBox":[0,0,24,24],"paths":["M10 2h4","m21 8-2 2-1.5-3.7A2 2 0 0 0 15.646 5H8.4a2 2 0 0 0-1.903 1.257L5 10 3 8","M7 14h.01","M17 14h.01","M 3 10 h 18 v 8 h -18 z","M5 18v2","M19 18v2"],"stroke":true},
  "caravan": {"name":"Caravan","viewBox":[0,0,24,24],"paths":["M18 19V9a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v8a2 2 0 0 0 2 2h2","M2 9h3a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2","M22 17v1a1 1 0 0 1-1 1H10v-9a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v9","M 6 19 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0"],"stroke":true},
  "card-sim": {"name":"Card Sim","viewBox":[0,0,24,24],"paths":["M12 14v4","M14.172 2a2 2 0 0 1 1.414.586l3.828 3.828A2 2 0 0 1 20 7.828V20a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z","M8 14h8","M 8 10 h 8 v 8 h -8 z"],"stroke":true},
  "carrot": {"name":"Carrot","viewBox":[0,0,24,24],"paths":["M15 16a1 1 0 0 0-7-7q-4 4-5.987 12.385a.5.5 0 0 0 .602.602Q11 20 15 16l-3-3","M15 9q4 4 7 0-3-4-7 0 4-4 0-7-4 3 0 7","m8 15-2.58-2.58"],"stroke":true},
  "carton": {"name":"Carton","viewBox":[0,0,24,24],"paths":["M13 22V10a2 2 0 01.539-1.367L16 6H8L5.539 8.633A2 2 0 005 10v10a2 2 0 002 2h10a2 2 0 002-2V10a2 2 0 00-.539-1.367L16 6V3a1 1 0 00-1-1H9a1 1 0 00-1 1v3","M5 10h8"],"stroke":true},
  "carton-off": {"name":"Carton Off","viewBox":[0,0,24,24],"paths":["M10 10H5v10a2 2 0 002 2h10a2 2 0 002-2v-1","M13 22v-9","M13.902 8.245 16 6h-4.343","M19 13.343V10a2 2 0 00-.539-1.367L16 6V3a1 1 0 00-1-1H9a1 1 0 00-.857.486","m2 2 20 20","M7.034 7.034 5.539 8.633A2 2 0 005 10"],"stroke":true},
  "case-lower": {"name":"Case Lower","viewBox":[0,0,24,24],"paths":["M10 9v7","M14 6v10","M 14 12.5 a 3.5 3.5 0 1 0 7 0 a 3.5 3.5 0 1 0 -7 0","M 3 12.5 a 3.5 3.5 0 1 0 7 0 a 3.5 3.5 0 1 0 -7 0"],"stroke":true},
  "case-sensitive": {"name":"Case Sensitive","viewBox":[0,0,24,24],"paths":["m2 16 4.039-9.69a.5.5 0 0 1 .923 0L11 16","M22 9v7","M3.304 13h6.392","M 15 12.5 a 3.5 3.5 0 1 0 7 0 a 3.5 3.5 0 1 0 -7 0"],"stroke":true},
  "case-upper": {"name":"Case Upper","viewBox":[0,0,24,24],"paths":["M15 11h4.5a1 1 0 0 1 0 5h-4a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h3a1 1 0 0 1 0 5","m2 16 4.039-9.69a.5.5 0 0 1 .923 0L11 16","M3.304 13h6.392"],"stroke":true},
  "cassette-tape": {"name":"Cassette Tape","viewBox":[0,0,24,24],"paths":["M 2 4 h 20 v 16 h -20 z","M 6 10 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0","M8 12h8","M 14 10 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0","m6 20 .7-2.9A1.4 1.4 0 0 1 8.1 16h7.8a1.4 1.4 0 0 1 1.4 1l.7 3"],"stroke":true},
  "cast": {"name":"Cast","viewBox":[0,0,24,24],"paths":["M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6","M2 12a9 9 0 0 1 8 8","M2 16a5 5 0 0 1 4 4","M 2 20 L 2.01 20"],"stroke":true},
  "castle": {"name":"Castle","viewBox":[0,0,24,24],"paths":["M10 5V3","M14 5V3","M15 21v-3a3 3 0 0 0-6 0v3","M18 3v8","M18 5H6","M22 11H2","M22 9v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9","M6 3v8"],"stroke":true},
  "cat": {"name":"Cat","viewBox":[0,0,24,24],"paths":["M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.84 6.42-2.26 1.4.58-.42 7-.42 7 .57 1.07 1 2.24 1 3.44C21 17.9 16.97 21 12 21s-9-3-9-7.56c0-1.25.5-2.4 1-3.44 0 0-1.89-6.42-.5-7 1.39-.58 4.72.23 6.5 2.23A9.04 9.04 0 0 1 12 5Z","M8 14v.5","M16 14v.5","M11.25 16.25h1.5L12 17l-.75-.75Z"],"stroke":true},
  "cctv": {"name":"Cctv","viewBox":[0,0,24,24],"paths":["M16.75 12h3.632a1 1 0 0 1 .894 1.447l-2.034 4.069a1 1 0 0 1-1.708.134l-2.124-2.97","M17.106 9.053a1 1 0 0 1 .447 1.341l-3.106 6.211a1 1 0 0 1-1.342.447L3.61 12.3a2.92 2.92 0 0 1-1.3-3.91L3.69 5.6a2.92 2.92 0 0 1 3.92-1.3z","M2 19h3.76a2 2 0 0 0 1.8-1.1L9 15","M2 21v-4","M7 9h.01"],"stroke":true},
  "cctv-off": {"name":"Cctv Off","viewBox":[0,0,24,24],"paths":["m12.309 6.652 4.797 2.401a1 1 0 0 1 .447 1.341l-.501 1.001.605.605h2.725a1 1 0 0 1 .894 1.447l-.724 1.448","m15.166 15.166-.719 1.439a1 1 0 0 1-1.342.447L3.61 12.3a2.92 2.92 0 0 1-1.3-3.91L3.69 5.6a2.9 2.9 0 0 1 .873-1.037","M2 19h3.76a2 2 0 0 0 1.8-1.1l1.441-2.902","m2 2 20 20","M2 21v-4","M7 9h.01"],"stroke":true},
  "ce-mark": {"name":"CE Mark","viewBox":[0,0,24,24],"stroke":true,"tags":["certification","iso","europe","certificacao","conformidade"],"paths":["M12 9a5 5 0 1 0 0 6","M22 7h-6v10h6","M16 12h4"]},
  "center-of-gravity": {"name":"Center Of Gravity","viewBox":[0,0,24,24],"stroke":true,"tags":["iso","handling","packaging","centro de gravidade","peso"],"paths":["M20 12a8 8 0 1 1-16 0 8 8 0 0 1 16 0","M12 2v20","M2 12h20"]},
  "chart-area": {"name":"Chart Area","viewBox":[0,0,24,24],"paths":["M3 3v16a2 2 0 0 0 2 2h16","M7 11.207a.5.5 0 0 1 .146-.353l2-2a.5.5 0 0 1 .708 0l3.292 3.292a.5.5 0 0 0 .708 0l4.292-4.292a.5.5 0 0 1 .854.353V16a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1z"],"stroke":true},
  "chart-bar": {"name":"Chart Bar","viewBox":[0,0,24,24],"paths":["M3 3v16a2 2 0 0 0 2 2h16","M7 16h8","M7 11h12","M7 6h3"],"stroke":true},
  "chart-bar-big": {"name":"Chart Bar Big","viewBox":[0,0,24,24],"paths":["M3 3v16a2 2 0 0 0 2 2h16","M 7 13 h 9 v 4 h -9 z","M 7 5 h 12 v 4 h -12 z"],"stroke":true},
  "chart-bar-decreasing": {"name":"Chart Bar Decreasing","viewBox":[0,0,24,24],"paths":["M3 3v16a2 2 0 0 0 2 2h16","M7 11h8","M7 16h3","M7 6h12"],"stroke":true},
  "chart-bar-increasing": {"name":"Chart Bar Increasing","viewBox":[0,0,24,24],"paths":["M3 3v16a2 2 0 0 0 2 2h16","M7 11h8","M7 16h12","M7 6h3"],"stroke":true},
  "chart-bar-stacked": {"name":"Chart Bar Stacked","viewBox":[0,0,24,24],"paths":["M11 13v4","M15 5v4","M3 3v16a2 2 0 0 0 2 2h16","M 7 13 h 9 v 4 h -9 z","M 7 5 h 12 v 4 h -12 z"],"stroke":true},
  "chart-candlestick": {"name":"Chart Candlestick","viewBox":[0,0,24,24],"paths":["M9 5v4","M 7 9 h 4 v 6 h -4 z","M9 15v2","M17 3v2","M 15 5 h 4 v 8 h -4 z","M17 13v3","M3 3v16a2 2 0 0 0 2 2h16"],"stroke":true},
  "chart-column": {"name":"Chart Column","viewBox":[0,0,24,24],"paths":["M3 3v16a2 2 0 0 0 2 2h16","M18 17V9","M13 17V5","M8 17v-3"],"stroke":true},
  "chart-column-big": {"name":"Chart Column Big","viewBox":[0,0,24,24],"paths":["M3 3v16a2 2 0 0 0 2 2h16","M 15 5 h 4 v 12 h -4 z","M 7 8 h 4 v 9 h -4 z"],"stroke":true},
  "chart-column-decreasing": {"name":"Chart Column Decreasing","viewBox":[0,0,24,24],"paths":["M13 17V9","M18 17v-3","M3 3v16a2 2 0 0 0 2 2h16","M8 17V5"],"stroke":true},
  "chart-column-increasing": {"name":"Chart Column Increasing","viewBox":[0,0,24,24],"paths":["M13 17V9","M18 17V5","M3 3v16a2 2 0 0 0 2 2h16","M8 17v-3"],"stroke":true},
  "chart-column-stacked": {"name":"Chart Column Stacked","viewBox":[0,0,24,24],"paths":["M11 13H7","M19 9h-4","M3 3v16a2 2 0 0 0 2 2h16","M 15 5 h 4 v 12 h -4 z","M 7 8 h 4 v 9 h -4 z"],"stroke":true},
  "chart-gantt": {"name":"Chart Gantt","viewBox":[0,0,24,24],"paths":["M10 6h8","M12 16h6","M3 3v16a2 2 0 0 0 2 2h16","M8 11h7"],"stroke":true},
  "chart-line": {"name":"Chart Line","viewBox":[0,0,24,24],"paths":["M3 3v16a2 2 0 0 0 2 2h16","m19 9-5 5-4-4-3 3"],"stroke":true},
  "chart-network": {"name":"Chart Network","viewBox":[0,0,24,24],"paths":["m13.11 7.664 1.78 2.672","m14.162 12.788-3.324 1.424","m20 4-6.06 1.515","M3 3v16a2 2 0 0 0 2 2h16","M 10 6 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0","M 14 12 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0","M 7 15 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0"],"stroke":true},
  "chart-no-axes-column": {"name":"Chart No Axes Column","viewBox":[0,0,24,24],"paths":["M5 21v-6","M12 21V3","M19 21V9"],"stroke":true},
  "chart-no-axes-column-decreasing": {"name":"Chart No Axes Column Decreasing","viewBox":[0,0,24,24],"paths":["M5 21V3","M12 21V9","M19 21v-6"],"stroke":true},
  "chart-no-axes-column-increasing": {"name":"Chart No Axes Column Increasing","viewBox":[0,0,24,24],"paths":["M5 21v-6","M12 21V9","M19 21V3"],"stroke":true},
  "chart-no-axes-combined": {"name":"Chart No Axes Combined","viewBox":[0,0,24,24],"paths":["M12 16v5","M16 14.639V21","M20 10.656V21","m22 3-8.646 8.646a.5.5 0 0 1-.708 0L9.354 8.354a.5.5 0 0 0-.707 0L2 15","M4 18.463V21","M8 14.656V21"],"stroke":true},
  "chart-no-axes-gantt": {"name":"Chart No Axes Gantt","viewBox":[0,0,24,24],"paths":["M6 5h12","M4 12h10","M12 19h8"],"stroke":true},
  "chart-pie": {"name":"Chart Pie","viewBox":[0,0,24,24],"paths":["M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.998.398-.998.95v8a1 1 0 0 0 1 1z","M21.21 15.89A10 10 0 1 1 8 2.83"],"stroke":true},
  "chart-scatter": {"name":"Chart Scatter","viewBox":[0,0,24,24],"paths":["M 7 7.5 a 0.5 0.5 0 1 0 1 0 a 0.5 0.5 0 1 0 -1 0","M 18 5.5 a 0.5 0.5 0 1 0 1 0 a 0.5 0.5 0 1 0 -1 0","M 11 11.5 a 0.5 0.5 0 1 0 1 0 a 0.5 0.5 0 1 0 -1 0","M 7 16.5 a 0.5 0.5 0 1 0 1 0 a 0.5 0.5 0 1 0 -1 0","M 17 14.5 a 0.5 0.5 0 1 0 1 0 a 0.5 0.5 0 1 0 -1 0","M3 3v16a2 2 0 0 0 2 2h16"],"stroke":true},
  "chart-spline": {"name":"Chart Spline","viewBox":[0,0,24,24],"paths":["M3 3v16a2 2 0 0 0 2 2h16","M7 16c.5-2 1.5-7 4-7 2 0 2 3 4 3 2.5 0 4.5-5 5-7"],"stroke":true},
  "check": {"name":"Check","viewBox":[0,0,24,24],"paths":["M20 6 9 17l-5-5"],"stroke":true},
  "check-check": {"name":"Check Check","viewBox":[0,0,24,24],"paths":["M18 6 7 17l-5-5","m22 10-7.5 7.5L13 16"],"stroke":true},
  "check-circle": {"name":"Check Circle","viewBox":[0,0,24,24],"paths":["M21.801 10A10 10 0 1 1 17 3.335","m9 11 3 3L22 4"],"stroke":true},
  "check-circle-2": {"name":"Check Circle 2","viewBox":[0,0,24,24],"paths":["M 2 12 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0","m16 9-5.5 5.5L8 12"],"stroke":true},
  "check-line": {"name":"Check Line","viewBox":[0,0,24,24],"paths":["M20 4L9 15","M21 19L3 19","M9 15L4 10"],"stroke":true},
  "check-square": {"name":"Check Square","viewBox":[0,0,24,24],"paths":["M21 10.656V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12.344","m9 11 3 3L22 4"],"stroke":true},
  "check-square-2": {"name":"Check Square 2","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","m16 9-5.5 5.5L8 12"],"stroke":true},
  "chef-hat": {"name":"Chef Hat","viewBox":[0,0,24,24],"paths":["M17 21a1 1 0 0 0 1-1v-5.35c0-.457.316-.844.727-1.041a4 4 0 0 0-2.134-7.589 5 5 0 0 0-9.186 0 4 4 0 0 0-2.134 7.588c.411.198.727.585.727 1.041V20a1 1 0 0 0 1 1Z","M6 17h12"],"stroke":true},
  "cherry": {"name":"Cherry","viewBox":[0,0,24,24],"paths":["M2 17a5 5 0 0 0 10 0c0-2.76-2.5-5-5-3-2.5-2-5 .24-5 3Z","M12 17a5 5 0 0 0 10 0c0-2.76-2.5-5-5-3-2.5-2-5 .24-5 3Z","M7 14c3.22-2.91 4.29-8.75 5-12 1.66 2.38 4.94 9 5 12","M22 9c-4.29 0-7.14-2.33-10-7 5.71 0 10 4.67 10 7Z"],"stroke":true},
  "chess-bishop": {"name":"Chess Bishop","viewBox":[0,0,24,24],"paths":["M5 20a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1z","M15 18c1.5-.615 3-2.461 3-4.923C18 8.769 14.5 4.462 12 2 9.5 4.462 6 8.77 6 13.077 6 15.539 7.5 17.385 9 18","m16 7-2.5 2.5","M9 2h6"],"stroke":true},
  "chess-king": {"name":"Chess King","viewBox":[0,0,24,24],"paths":["M4 20a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z","m6.7 18-1-1C4.35 15.682 3 14.09 3 12a5 5 0 0 1 4.95-5c1.584 0 2.7.455 4.05 1.818C13.35 7.455 14.466 7 16.05 7A5 5 0 0 1 21 12c0 2.082-1.359 3.673-2.7 5l-1 1","M10 4h4","M12 2v6.818"],"stroke":true},
  "chess-knight": {"name":"Chess Knight","viewBox":[0,0,24,24],"paths":["M5 20a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1z","M16.5 18c1-2 2.5-5 2.5-9a7 7 0 0 0-7-7H6.635a1 1 0 0 0-.768 1.64L7 5l-2.32 5.802a2 2 0 0 0 .95 2.526l2.87 1.456","m15 5 1.425-1.425","m17 8 1.53-1.53","M9.713 12.185 7 18"],"stroke":true},
  "chess-pawn": {"name":"Chess Pawn","viewBox":[0,0,24,24],"paths":["M5 20a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1z","m14.5 10 1.5 8","M7 10h10","m8 18 1.5-8","M 8 6 a 4 4 0 1 0 8 0 a 4 4 0 1 0 -8 0"],"stroke":true},
  "chess-queen": {"name":"Chess Queen","viewBox":[0,0,24,24],"paths":["M4 20a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z","m12.474 5.943 1.567 5.34a1 1 0 0 0 1.75.328l2.616-3.402","m20 9-3 9","m5.594 8.209 2.615 3.403a1 1 0 0 0 1.75-.329l1.567-5.34","M7 18 4 9","M 10 4 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0","M 18 7 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0","M 2 7 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0"],"stroke":true},
  "chess-rook": {"name":"Chess Rook","viewBox":[0,0,24,24],"paths":["M5 20a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1z","M10 2v2","M14 2v2","m17 18-1-9","M6 2v5a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2","M6 4h12","m7 18 1-9"],"stroke":true},
  "chevron-down": {"name":"Chevron Down","viewBox":[0,0,24,24],"paths":["m6 9 6 6 6-6"],"stroke":true},
  "chevron-down-circle": {"name":"Chevron Down Circle","viewBox":[0,0,24,24],"paths":["M 2 12 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0","m16 10-4 4-4-4"],"stroke":true},
  "chevron-down-square": {"name":"Chevron Down Square","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","m16 10-4 4-4-4"],"stroke":true},
  "chevron-first": {"name":"Chevron First","viewBox":[0,0,24,24],"paths":["m17 18-6-6 6-6","M7 6v12"],"stroke":true},
  "chevron-last": {"name":"Chevron Last","viewBox":[0,0,24,24],"paths":["m7 18 6-6-6-6","M17 6v12"],"stroke":true},
  "chevron-left": {"name":"Chevron Left","viewBox":[0,0,24,24],"paths":["m15 18-6-6 6-6"],"stroke":true},
  "chevron-left-circle": {"name":"Chevron Left Circle","viewBox":[0,0,24,24],"paths":["M 2 12 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0","m14 16-4-4 4-4"],"stroke":true},
  "chevron-left-square": {"name":"Chevron Left Square","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","m14 16-4-4 4-4"],"stroke":true},
  "chevron-right": {"name":"Chevron Right","viewBox":[0,0,24,24],"paths":["m9 18 6-6-6-6"],"stroke":true},
  "chevron-right-circle": {"name":"Chevron Right Circle","viewBox":[0,0,24,24],"paths":["M 2 12 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0","m10 8 4 4-4 4"],"stroke":true},
  "chevron-right-square": {"name":"Chevron Right Square","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","m10 8 4 4-4 4"],"stroke":true},
  "chevron-up": {"name":"Chevron Up","viewBox":[0,0,24,24],"paths":["m18 15-6-6-6 6"],"stroke":true},
  "chevron-up-circle": {"name":"Chevron Up Circle","viewBox":[0,0,24,24],"paths":["M 2 12 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0","m8 14 4-4 4 4"],"stroke":true},
  "chevron-up-square": {"name":"Chevron Up Square","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","m8 14 4-4 4 4"],"stroke":true},
  "chevrons-down": {"name":"Chevrons Down","viewBox":[0,0,24,24],"paths":["m7 6 5 5 5-5","m7 13 5 5 5-5"],"stroke":true},
  "chevrons-down-up": {"name":"Chevrons Down Up","viewBox":[0,0,24,24],"paths":["m7 20 5-5 5 5","m7 4 5 5 5-5"],"stroke":true},
  "chevrons-left": {"name":"Chevrons Left","viewBox":[0,0,24,24],"paths":["m11 17-5-5 5-5","m18 17-5-5 5-5"],"stroke":true},
  "chevrons-left-right": {"name":"Chevrons Left Right","viewBox":[0,0,24,24],"paths":["m9 7-5 5 5 5","m15 7 5 5-5 5"],"stroke":true},
  "chevrons-left-right-ellipsis": {"name":"Chevrons Left Right Ellipsis","viewBox":[0,0,24,24],"paths":["M12 12h.01","M16 12h.01","m17 7 5 5-5 5","m7 7-5 5 5 5","M8 12h.01"],"stroke":true},
  "chevrons-right": {"name":"Chevrons Right","viewBox":[0,0,24,24],"paths":["m6 17 5-5-5-5","m13 17 5-5-5-5"],"stroke":true},
  "chevrons-right-left": {"name":"Chevrons Right Left","viewBox":[0,0,24,24],"paths":["m20 17-5-5 5-5","m4 17 5-5-5-5"],"stroke":true},
  "chevrons-up": {"name":"Chevrons Up","viewBox":[0,0,24,24],"paths":["m17 11-5-5-5 5","m17 18-5-5-5 5"],"stroke":true},
  "chevrons-up-down": {"name":"Chevrons Up Down","viewBox":[0,0,24,24],"paths":["m7 15 5 5 5-5","m7 9 5-5 5 5"],"stroke":true},
  "church": {"name":"Church","viewBox":[0,0,24,24],"paths":["M10 9h4","M12 7v5","M14 21v-3a2 2 0 0 0-4 0v3","m18 9 3.52 2.147a1 1 0 0 1 .48.854V19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-6.999a1 1 0 0 1 .48-.854L6 9","M6 21V7a1 1 0 0 1 .376-.782l5-3.999a1 1 0 0 1 1.249.001l5 4A1 1 0 0 1 18 7v14"],"stroke":true},
  "cigarette": {"name":"Cigarette","viewBox":[0,0,24,24],"paths":["M17 12H3a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h14","M18 8c0-2.5-2-2.5-2-5","M21 16a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1","M22 8c0-2.5-2-2.5-2-5","M7 12v4"],"stroke":true},
  "cigarette-off": {"name":"Cigarette Off","viewBox":[0,0,24,24],"paths":["M12 12H3a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h13","M18 8c0-2.5-2-2.5-2-5","m2 2 20 20","M21 12a1 1 0 0 1 1 1v2a1 1 0 0 1-.5.866","M22 8c0-2.5-2-2.5-2-5","M7 12v4"],"stroke":true},
  "circle": {"name":"Circle","viewBox":[0,0,24,24],"paths":["M 2 12 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0"],"stroke":true},
  "circle-alert": {"name":"Circle Alert","viewBox":[0,0,24,24],"paths":["M 2 12 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0","M 12 8 L 12 12","M 12 16 L 12.01 16"],"stroke":true},
  "circle-arrow-down": {"name":"Circle Arrow Down","viewBox":[0,0,24,24],"paths":["M 2 12 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0","M12 8v8","m8 12 4 4 4-4"],"stroke":true},
  "circle-arrow-left": {"name":"Circle Arrow Left","viewBox":[0,0,24,24],"paths":["M 2 12 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0","m12 8-4 4 4 4","M16 12H8"],"stroke":true},
  "circle-arrow-out-down-left": {"name":"Circle Arrow Out Down Left","viewBox":[0,0,24,24],"paths":["M2 12a10 10 0 1 1 10 10","m2 22 10-10","M8 22H2v-6"],"stroke":true},
  "circle-arrow-out-down-right": {"name":"Circle Arrow Out Down Right","viewBox":[0,0,24,24],"paths":["M12 22a10 10 0 1 1 10-10","M22 22 12 12","M22 16v6h-6"],"stroke":true},
  "circle-arrow-out-up-left": {"name":"Circle Arrow Out Up Left","viewBox":[0,0,24,24],"paths":["M2 8V2h6","m2 2 10 10","M12 2A10 10 0 1 1 2 12"],"stroke":true},
  "circle-arrow-out-up-right": {"name":"Circle Arrow Out Up Right","viewBox":[0,0,24,24],"paths":["M22 12A10 10 0 1 1 12 2","M22 2 12 12","M16 2h6v6"],"stroke":true},
  "circle-arrow-right": {"name":"Circle Arrow Right","viewBox":[0,0,24,24],"paths":["M 2 12 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0","m12 16 4-4-4-4","M8 12h8"],"stroke":true},
  "circle-arrow-up": {"name":"Circle Arrow Up","viewBox":[0,0,24,24],"paths":["M 2 12 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0","m16 12-4-4-4 4","M12 16V8"],"stroke":true},
  "circle-check": {"name":"Circle Check","viewBox":[0,0,24,24],"paths":["M 2 12 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0","m16 9-5.5 5.5L8 12"],"stroke":true},
  "circle-check-big": {"name":"Circle Check Big","viewBox":[0,0,24,24],"paths":["M21.801 10A10 10 0 1 1 17 3.335","m9 11 3 3L22 4"],"stroke":true},
  "circle-chevron-down": {"name":"Circle Chevron Down","viewBox":[0,0,24,24],"paths":["M 2 12 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0","m16 10-4 4-4-4"],"stroke":true},
  "circle-chevron-left": {"name":"Circle Chevron Left","viewBox":[0,0,24,24],"paths":["M 2 12 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0","m14 16-4-4 4-4"],"stroke":true},
  "circle-chevron-right": {"name":"Circle Chevron Right","viewBox":[0,0,24,24],"paths":["M 2 12 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0","m10 8 4 4-4 4"],"stroke":true},
  "circle-chevron-up": {"name":"Circle Chevron Up","viewBox":[0,0,24,24],"paths":["M 2 12 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0","m8 14 4-4 4 4"],"stroke":true},
  "circle-dashed": {"name":"Circle Dashed","viewBox":[0,0,24,24],"paths":["M10.1 2.182a10 10 0 0 1 3.8 0","M13.9 21.818a10 10 0 0 1-3.8 0","M17.609 3.721a10 10 0 0 1 2.69 2.7","M2.182 13.9a10 10 0 0 1 0-3.8","M20.279 17.609a10 10 0 0 1-2.7 2.69","M21.818 10.1a10 10 0 0 1 0 3.8","M3.721 6.391a10 10 0 0 1 2.7-2.69","M6.391 20.279a10 10 0 0 1-2.69-2.7"],"stroke":true},
  "circle-dashed-check": {"name":"Circle Dashed Check","viewBox":[0,0,24,24],"paths":["M10.1 2.182a10 10 0 013.8 0","M13.9 21.818a10 10 0 01-3.8 0","m16 9-5.5 5.5L8 12","M17.609 3.721a10 10 0 012.69 2.7","M2.182 13.9a10 10 0 010-3.8","M20.279 17.609a10 10 0 01-2.7 2.69","M21.818 10.1a10 10 0 010 3.8","M3.721 6.391a10 10 0 012.7-2.69","M6.391 20.279a10 10 0 01-2.69-2.7"],"stroke":true},
  "circle-divide": {"name":"Circle Divide","viewBox":[0,0,24,24],"paths":["M 2 12 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0","M 8 12 L 16 12","M 12 16 L 12 16","M 12 8 L 12 8"],"stroke":true},
  "circle-dollar-sign": {"name":"Circle Dollar Sign","viewBox":[0,0,24,24],"paths":["M 2 12 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0","M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8","M12 18V6"],"stroke":true},
  "circle-dot": {"name":"Circle Dot","viewBox":[0,0,24,24],"paths":["M 11 12 a 1 1 0 1 0 2 0 a 1 1 0 1 0 -2 0","M 2 12 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0"],"stroke":true},
  "circle-dot-dashed": {"name":"Circle Dot Dashed","viewBox":[0,0,24,24],"paths":["M10.1 2.18a9.93 9.93 0 0 1 3.8 0","M17.6 3.71a9.95 9.95 0 0 1 2.69 2.7","M21.82 10.1a9.93 9.93 0 0 1 0 3.8","M20.29 17.6a9.95 9.95 0 0 1-2.7 2.69","M13.9 21.82a9.94 9.94 0 0 1-3.8 0","M6.4 20.29a9.95 9.95 0 0 1-2.69-2.7","M2.18 13.9a9.93 9.93 0 0 1 0-3.8","M3.71 6.4a9.95 9.95 0 0 1 2.7-2.69","M 11 12 a 1 1 0 1 0 2 0 a 1 1 0 1 0 -2 0"],"stroke":true},
  "circle-ellipsis": {"name":"Circle Ellipsis","viewBox":[0,0,24,24],"paths":["M 2 12 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0","M17 12h.01","M12 12h.01","M7 12h.01"],"stroke":true},
  "circle-equal": {"name":"Circle Equal","viewBox":[0,0,24,24],"paths":["M 2 12 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0","M7 10h10","M7 14h10"],"stroke":true},
  "circle-euro": {"name":"Circle Euro","viewBox":[0,0,24,24],"paths":["M15 9.4a4 4 0 1 0 0 5.2","M7 12h5","M 2 12 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0"],"stroke":true},
  "circle-fading-arrow-up": {"name":"Circle Fading Arrow Up","viewBox":[0,0,24,24],"paths":["M12 2a10 10 0 0 1 7.38 16.75","m16 12-4-4-4 4","M12 16V8","M2.5 8.875a10 10 0 0 0-.5 3","M2.83 16a10 10 0 0 0 2.43 3.4","M4.636 5.235a10 10 0 0 1 .891-.857","M8.644 21.42a10 10 0 0 0 7.631-.38"],"stroke":true},
  "circle-fading-plus": {"name":"Circle Fading Plus","viewBox":[0,0,24,24],"paths":["M12 2a10 10 0 0 1 7.38 16.75","M12 8v8","M16 12H8","M2.5 8.875a10 10 0 0 0-.5 3","M2.83 16a10 10 0 0 0 2.43 3.4","M4.636 5.235a10 10 0 0 1 .891-.857","M8.644 21.42a10 10 0 0 0 7.631-.38"],"stroke":true},
  "circle-gauge": {"name":"Circle Gauge","viewBox":[0,0,24,24],"paths":["M15.6 2.7a10 10 0 1 0 5.7 5.7","M 10 12 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0","M13.4 10.6 19 5"],"stroke":true},
  "circle-help": {"name":"Circle Help","viewBox":[0,0,24,24],"paths":["M 2 12 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0","M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3","M12 17h.01"],"stroke":true},
  "circle-minus": {"name":"Circle Minus","viewBox":[0,0,24,24],"paths":["M 2 12 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0","M8 12h8"],"stroke":true},
  "circle-off": {"name":"Circle Off","viewBox":[0,0,24,24],"paths":["m2 2 20 20","M8.35 2.69A10 10 0 0 1 21.3 15.65","M19.08 19.08A10 10 0 1 1 4.92 4.92"],"stroke":true},
  "circle-parking": {"name":"Circle Parking","viewBox":[0,0,24,24],"paths":["M 2 12 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0","M9 17V7h4a3 3 0 0 1 0 6H9"],"stroke":true},
  "circle-parking-off": {"name":"Circle Parking Off","viewBox":[0,0,24,24],"paths":["M12.656 7H13a3 3 0 0 1 2.984 3.307","M13 13H9","M19.071 19.071A1 1 0 0 1 4.93 4.93","m2 2 20 20","M8.357 2.687a10 10 0 0 1 12.956 12.956","M9 17V9"],"stroke":true},
  "circle-pause": {"name":"Circle Pause","viewBox":[0,0,24,24],"paths":["M 2 12 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0","M 10 15 L 10 9","M 14 15 L 14 9"],"stroke":true},
  "circle-percent": {"name":"Circle Percent","viewBox":[0,0,24,24],"paths":["M 2 12 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0","m15 9-6 6","M9 9h.01","M15 15h.01"],"stroke":true},
  "circle-pile": {"name":"Circle Pile","viewBox":[0,0,24,24],"paths":["M 10 19 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0","M 10 5 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0","M 14 12 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0","M 18 19 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0","M 2 19 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0","M 6 12 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0"],"stroke":true},
  "circle-play": {"name":"Circle Play","viewBox":[0,0,24,24],"paths":["M9 9.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997A1 1 0 0 1 9 14.996z","M 2 12 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0"],"stroke":true},
  "circle-plus": {"name":"Circle Plus","viewBox":[0,0,24,24],"paths":["M 2 12 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0","M8 12h8","M12 8v8"],"stroke":true},
  "circle-pound-sterling": {"name":"Circle Pound Sterling","viewBox":[0,0,24,24],"paths":["M 2 12 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0","M10 16V9.5a1 1 0 0 1 5 0","M8 12h4","M8 16h7"],"stroke":true},
  "circle-power": {"name":"Circle Power","viewBox":[0,0,24,24],"paths":["M 2 12 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0","M12 7v4","M7.998 9.003a5 5 0 1 0 8-.005"],"stroke":true},
  "circle-question-mark": {"name":"Circle Question Mark","viewBox":[0,0,24,24],"paths":["M 2 12 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0","M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3","M12 17h.01"],"stroke":true},
  "circle-slash": {"name":"Circle Slash","viewBox":[0,0,24,24],"paths":["M 2 12 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0","M 9 15 L 15 9"],"stroke":true},
  "circle-slash-2": {"name":"Circle Slash 2","viewBox":[0,0,24,24],"paths":["M 2 12 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0","M22 2 2 22"],"stroke":true},
  "circle-slashed": {"name":"Circle Slashed","viewBox":[0,0,24,24],"paths":["M 2 12 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0","M22 2 2 22"],"stroke":true},
  "circle-small": {"name":"Circle Small","viewBox":[0,0,24,24],"paths":["M 6 12 a 6 6 0 1 0 12 0 a 6 6 0 1 0 -12 0"],"stroke":true},
  "circle-star": {"name":"Circle Star","viewBox":[0,0,24,24],"paths":["M 2 12 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0","M11.051 7.616a1 1 0 0 1 1.909.024l.737 1.452a1 1 0 0 0 .737.535l1.634.256a1 1 0 0 1 .588 1.806l-1.172 1.168a1 1 0 0 0-.282.866l.259 1.613a1 1 0 0 1-1.541 1.134l-1.465-.75a1 1 0 0 0-.912 0l-1.465.75a1 1 0 0 1-1.539-1.133l.258-1.613a1 1 0 0 0-.282-.867l-1.156-1.152a1 1 0 0 1 .572-1.822l1.633-.256a1 1 0 0 0 .737-.535z"],"stroke":true},
  "circle-stop": {"name":"Circle Stop","viewBox":[0,0,24,24],"paths":["M 2 12 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0","M 9 9 h 6 v 6 h -6 z"],"stroke":true},
  "circle-user": {"name":"Circle User","viewBox":[0,0,24,24],"paths":["M 2 12 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0","M 9 10 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0","M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"],"stroke":true},
  "circle-user-round": {"name":"Circle User Round","viewBox":[0,0,24,24],"paths":["M17.925 20.056a6 6 0 0 0-11.851.001","M 8 11 a 4 4 0 1 0 8 0 a 4 4 0 1 0 -8 0","M 2 12 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0"],"stroke":true},
  "circle-x": {"name":"Circle X","viewBox":[0,0,24,24],"paths":["M 2 12 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0","m15 9-6 6","m9 9 6 6"],"stroke":true},
  "circuit-board": {"name":"Circuit Board","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","M11 9h4a2 2 0 0 0 2-2V3","M 7 9 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0","M7 21v-4a2 2 0 0 1 2-2h4","M 13 15 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0"],"stroke":true},
  "citrus": {"name":"Citrus","viewBox":[0,0,24,24],"paths":["M21.66 17.67a1.08 1.08 0 0 1-.04 1.6A12 12 0 0 1 4.73 2.38a1.1 1.1 0 0 1 1.61-.04z","M19.65 15.66A8 8 0 0 1 8.35 4.34","m14 10-5.5 5.5","M14 17.85V10H6.15"],"stroke":true},
  "clapperboard": {"name":"Clapperboard","viewBox":[0,0,24,24],"paths":["m12.296 3.464 3.02 3.956","M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1.1-.3 2.2.3 2.5 1.3z","M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z","m6.18 5.276 3.1 3.899"],"stroke":true},
  "clef-alto": {"name":"Clef Alto","viewBox":[0,0,24,24],"paths":["M10 4v16","M14 4.764a3 3 0 1 1-.152 4.327A4 4 0 0 1 10 12a4 4 0 0 1 3.848 2.909A3 3 0 1 1 14 19.236","M6 4v16"],"stroke":true},
  "clef-bass": {"name":"Clef Bass","viewBox":[0,0,24,24],"paths":["M19 11h.01","M19 6h.01","M5 8c0-4 4-4 4-4 6 0 6 6 6 6 0 7-10 11-10 11","M 5 8 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0"],"stroke":true},
  "clef-treble": {"name":"Clef Treble","viewBox":[0,0,24,24],"paths":["M10.586 21.414a2 2 0 0 0 3.378-1.791L11.036 4.377a2 2 0 1 1 3.378 1.037C12.414 7.414 7 8 7 13a5 5 0 0 0 5 5 5 4 0 0 0 5-4 3 3 0 0 0-3-3 3 2 0 0 0-3 2"],"stroke":true},
  "clipboard": {"name":"Clipboard","viewBox":[0,0,24,24],"paths":["M 8 2 h 8 v 4 h -8 z","M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"],"stroke":true},
  "clipboard-check": {"name":"Clipboard Check","viewBox":[0,0,24,24],"paths":["M 8 2 h 8 v 4 h -8 z","M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2","m9 14 2 2 4-4"],"stroke":true},
  "clipboard-clock": {"name":"Clipboard Clock","viewBox":[0,0,24,24],"paths":["M16 14v2.2l1.6 1","M16 4h2a2 2 0 0 1 2 2v.832","M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h2","M 10 16 a 6 6 0 1 0 12 0 a 6 6 0 1 0 -12 0","M 8 2 h 8 v 4 h -8 z"],"stroke":true},
  "clipboard-copy": {"name":"Clipboard Copy","viewBox":[0,0,24,24],"paths":["M 8 2 h 8 v 4 h -8 z","M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2","M16 4h2a2 2 0 0 1 2 2v4","M21 14H11","m15 10-4 4 4 4"],"stroke":true},
  "clipboard-edit": {"name":"Clipboard Edit","viewBox":[0,0,24,24],"paths":["M16 4h2a2 2 0 0 1 2 2v2","M21.34 15.664a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z","M8 22H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2","M 8 2 h 8 v 4 h -8 z"],"stroke":true},
  "clipboard-list": {"name":"Clipboard List","viewBox":[0,0,24,24],"paths":["M 8 2 h 8 v 4 h -8 z","M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2","M12 11h4","M12 16h4","M8 11h.01","M8 16h.01"],"stroke":true},
  "clipboard-minus": {"name":"Clipboard Minus","viewBox":[0,0,24,24],"paths":["M 8 2 h 8 v 4 h -8 z","M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2","M9 14h6"],"stroke":true},
  "clipboard-paste": {"name":"Clipboard Paste","viewBox":[0,0,24,24],"paths":["M11 14h10","M16 4h2a2 2 0 0 1 2 2v1.344","m17 18 4-4-4-4","M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 1.793-1.113","M 8 2 h 8 v 4 h -8 z"],"stroke":true},
  "clipboard-pen": {"name":"Clipboard Pen","viewBox":[0,0,24,24],"paths":["M16 4h2a2 2 0 0 1 2 2v2","M21.34 15.664a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z","M8 22H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2","M 8 2 h 8 v 4 h -8 z"],"stroke":true},
  "clipboard-pen-line": {"name":"Clipboard Pen Line","viewBox":[0,0,24,24],"paths":["M 8 2 h 8 v 4 h -8 z","M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-.5","M16 4h2a2 2 0 0 1 1.73 1","M8 18h1","M21.378 12.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"],"stroke":true},
  "clipboard-plus": {"name":"Clipboard Plus","viewBox":[0,0,24,24],"paths":["M 8 2 h 8 v 4 h -8 z","M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2","M9 14h6","M12 17v-6"],"stroke":true},
  "clipboard-signature": {"name":"Clipboard Signature","viewBox":[0,0,24,24],"paths":["M 8 2 h 8 v 4 h -8 z","M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-.5","M16 4h2a2 2 0 0 1 1.73 1","M8 18h1","M21.378 12.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"],"stroke":true},
  "clipboard-type": {"name":"Clipboard Type","viewBox":[0,0,24,24],"paths":["M 8 2 h 8 v 4 h -8 z","M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2","M9 12v-1h6v1","M11 17h2","M12 11v6"],"stroke":true},
  "clipboard-x": {"name":"Clipboard X","viewBox":[0,0,24,24],"paths":["M 8 2 h 8 v 4 h -8 z","M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2","m14.5 11.5-5 5","m9.5 11.5 5 5"],"stroke":true},
  "clock": {"name":"Clock","viewBox":[0,0,24,24],"paths":["M 2 12 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0","M12 6v6l4 2"],"stroke":true},
  "clock-1": {"name":"Clock 1","viewBox":[0,0,24,24],"paths":["M 2 12 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0","M12 6v6l2-4"],"stroke":true},
  "clock-10": {"name":"Clock 10","viewBox":[0,0,24,24],"paths":["M 2 12 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0","M12 6v6l-4-2"],"stroke":true},
  "clock-11": {"name":"Clock 11","viewBox":[0,0,24,24],"paths":["M 2 12 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0","M12 6v6l-2-4"],"stroke":true},
  "clock-12": {"name":"Clock 12","viewBox":[0,0,24,24],"paths":["M 2 12 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0","M12 6v6"],"stroke":true},
  "clock-2": {"name":"Clock 2","viewBox":[0,0,24,24],"paths":["M 2 12 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0","M12 6v6l4-2"],"stroke":true},
  "clock-3": {"name":"Clock 3","viewBox":[0,0,24,24],"paths":["M 2 12 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0","M12 6v6h4"],"stroke":true},
  "clock-4": {"name":"Clock 4","viewBox":[0,0,24,24],"paths":["M 2 12 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0","M12 6v6l4 2"],"stroke":true},
  "clock-5": {"name":"Clock 5","viewBox":[0,0,24,24],"paths":["M 2 12 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0","M12 6v6l2 4"],"stroke":true},
  "clock-6": {"name":"Clock 6","viewBox":[0,0,24,24],"paths":["M 2 12 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0","M12 6v10"],"stroke":true},
  "clock-7": {"name":"Clock 7","viewBox":[0,0,24,24],"paths":["M 2 12 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0","M12 6v6l-2 4"],"stroke":true},
  "clock-8": {"name":"Clock 8","viewBox":[0,0,24,24],"paths":["M 2 12 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0","M12 6v6l-4 2"],"stroke":true},
  "clock-9": {"name":"Clock 9","viewBox":[0,0,24,24],"paths":["M 2 12 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0","M12 6v6H8"],"stroke":true},
  "clock-alert": {"name":"Clock Alert","viewBox":[0,0,24,24],"paths":["M12 6v6l4 2","M20 12v5","M20 21h.01","M21.25 8.2A10 10 0 1 0 16 21.16"],"stroke":true},
  "clock-arrow-down": {"name":"Clock Arrow Down","viewBox":[0,0,24,24],"paths":["M12 6v6l2 1","M12.337 21.994a10 10 0 1 1 9.588-8.767","m14 18 4 4 4-4","M18 14v8"],"stroke":true},
  "clock-arrow-left": {"name":"Clock Arrow Left","viewBox":[0,0,24,24],"paths":["M12 6v6l1.5.8","M12.338 21.994a10 10 0 1 1 9.587-8.767","M14 18h8","m18 22-4-4 4-4"],"stroke":true},
  "clock-arrow-right": {"name":"Clock Arrow Right","viewBox":[0,0,24,24],"paths":["M12 6v6l2 1","M13.5 21.885A10 10 0 1 1 22 12","M14 18h8","m18 22 4-4-4-4"],"stroke":true},
  "clock-arrow-up": {"name":"Clock Arrow Up","viewBox":[0,0,24,24],"paths":["M12 6v6l1.56.78","M13.227 21.925a10 10 0 1 1 8.767-9.588","m14 18 4-4 4 4","M18 22v-8"],"stroke":true},
  "clock-check": {"name":"Clock Check","viewBox":[0,0,24,24],"paths":["M21.95 13a10 10 0 1 0-8.685 8.92","M12 6v6l4 2","m16 19 2 2 4-4"],"stroke":true},
  "clock-fading": {"name":"Clock Fading","viewBox":[0,0,24,24],"paths":["M12 2a10 10 0 0 1 7.38 16.75","M12 6v6l4 2","M2.5 8.875a10 10 0 0 0-.5 3","M2.83 16a10 10 0 0 0 2.43 3.4","M4.636 5.235a10 10 0 0 1 .891-.857","M8.644 21.42a10 10 0 0 0 7.631-.38"],"stroke":true},
  "clock-plus": {"name":"Clock Plus","viewBox":[0,0,24,24],"paths":["M12 6v6l3.644 1.822","M16 19h6","M19 16v6","M21.92 13.267a10 10 0 1 0-8.653 8.653"],"stroke":true},
  "closed-caption": {"name":"Closed Caption","viewBox":[0,0,24,24],"paths":["M10 9.17a3 3 0 1 0 0 5.66","M17 9.17a3 3 0 1 0 0 5.66","M 2 5 h 20 v 14 h -20 z"],"stroke":true},
  "cloud": {"name":"Cloud","viewBox":[0,0,24,24],"paths":["M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"],"stroke":true},
  "cloud-alert": {"name":"Cloud Alert","viewBox":[0,0,24,24],"paths":["M12 12v4","M12 20h.01","M8.128 16.949A7 7 0 1 1 15.71 8h1.79a1 1 0 0 1 0 9h-1.642"],"stroke":true},
  "cloud-backup": {"name":"Cloud Backup","viewBox":[0,0,24,24],"paths":["M21 15.251A4.5 4.5 0 0 0 17.5 8h-1.79A7 7 0 1 0 3 13.607","M7 11v4h4","M8 19a5 5 0 0 0 9-3 4.5 4.5 0 0 0-4.5-4.5 4.82 4.82 0 0 0-3.41 1.41L7 15"],"stroke":true},
  "cloud-check": {"name":"Cloud Check","viewBox":[0,0,24,24],"paths":["m17 15-5.5 5.5L9 18","M5.516 16.07A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 3.501 7.327"],"stroke":true},
  "cloud-cog": {"name":"Cloud Cog","viewBox":[0,0,24,24],"paths":["m10.852 19.772-.383.924","m13.148 14.228.383-.923","M13.148 19.772a3 3 0 1 0-2.296-5.544l-.383-.923","m13.53 20.696-.382-.924a3 3 0 1 1-2.296-5.544","m14.772 15.852.923-.383","m14.772 18.148.923.383","M4.2 15.1a7 7 0 1 1 9.93-9.858A7 7 0 0 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.2","m9.228 15.852-.923-.383","m9.228 18.148-.923.383"],"stroke":true},
  "cloud-download": {"name":"Cloud Download","viewBox":[0,0,24,24],"paths":["M12 13v8l-4-4","m12 21 4-4","M4.393 15.269A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.436 8.284"],"stroke":true},
  "cloud-drizzle": {"name":"Cloud Drizzle","viewBox":[0,0,24,24],"paths":["M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242","M8 19v1","M8 14v1","M16 19v1","M16 14v1","M12 21v1","M12 16v1"],"stroke":true},
  "cloud-fog": {"name":"Cloud Fog","viewBox":[0,0,24,24],"paths":["M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242","M16 17H7","M17 21H9"],"stroke":true},
  "cloud-hail": {"name":"Cloud Hail","viewBox":[0,0,24,24],"paths":["M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242","M16 14v2","M8 14v2","M16 20h.01","M8 20h.01","M12 16v2","M12 22h.01"],"stroke":true},
  "cloud-lightning": {"name":"Cloud Lightning","viewBox":[0,0,24,24],"paths":["M6 16.326A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 .5 8.973","m13 12-3 5h4l-3 5"],"stroke":true},
  "cloud-moon": {"name":"Cloud Moon","viewBox":[0,0,24,24],"paths":["M13 16a3 3 0 0 1 0 6H7a5 5 0 1 1 4.9-6z","M18.376 14.512a6 6 0 0 0 3.461-4.127c.148-.625-.659-.97-1.248-.714a4 4 0 0 1-5.259-5.26c.255-.589-.09-1.395-.716-1.248a6 6 0 0 0-4.594 5.36"],"stroke":true},
  "cloud-moon-rain": {"name":"Cloud Moon Rain","viewBox":[0,0,24,24],"paths":["M11 20v2","M18.376 14.512a6 6 0 0 0 3.461-4.127c.148-.625-.659-.97-1.248-.714a4 4 0 0 1-5.259-5.26c.255-.589-.09-1.395-.716-1.248a6 6 0 0 0-4.594 5.36","M3 20a5 5 0 1 1 8.9-4H13a3 3 0 0 1 2 5.24","M7 19v2"],"stroke":true},
  "cloud-off": {"name":"Cloud Off","viewBox":[0,0,24,24],"paths":["M10.94 5.274A7 7 0 0 1 15.71 10h1.79a4.5 4.5 0 0 1 4.222 6.057","M18.796 18.81A4.5 4.5 0 0 1 17.5 19H9A7 7 0 0 1 5.79 5.78","m2 2 20 20"],"stroke":true},
  "cloud-rain": {"name":"Cloud Rain","viewBox":[0,0,24,24],"paths":["M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242","M16 14v6","M8 14v6","M12 16v6"],"stroke":true},
  "cloud-rain-wind": {"name":"Cloud Rain Wind","viewBox":[0,0,24,24],"paths":["M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242","m9.2 22 3-7","m9 13-3 7","m17 13-3 7"],"stroke":true},
  "cloud-snow": {"name":"Cloud Snow","viewBox":[0,0,24,24],"paths":["M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242","M8 15h.01","M8 19h.01","M12 17h.01","M12 21h.01","M16 15h.01","M16 19h.01"],"stroke":true},
  "cloud-sun": {"name":"Cloud Sun","viewBox":[0,0,24,24],"paths":["M12 2v2","m4.93 4.93 1.41 1.41","M20 12h2","m19.07 4.93-1.41 1.41","M15.947 12.65a4 4 0 0 0-5.925-4.128","M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z"],"stroke":true},
  "cloud-sun-rain": {"name":"Cloud Sun Rain","viewBox":[0,0,24,24],"paths":["M12 2v2","m4.93 4.93 1.41 1.41","M20 12h2","m19.07 4.93-1.41 1.41","M15.947 12.65a4 4 0 0 0-5.925-4.128","M3 20a5 5 0 1 1 8.9-4H13a3 3 0 0 1 2 5.24","M11 20v2","M7 19v2"],"stroke":true},
  "cloud-sync": {"name":"Cloud Sync","viewBox":[0,0,24,24],"paths":["m17 18-1.535 1.605a5 5 0 0 1-8-1.5","M17 22v-4h-4","M20.996 15.251A4.5 4.5 0 0 0 17.495 8h-1.79a7 7 0 1 0-12.709 5.607","M7 10v4h4","m7 14 1.535-1.605a5 5 0 0 1 8 1.5"],"stroke":true},
  "cloud-upload": {"name":"Cloud Upload","viewBox":[0,0,24,24],"paths":["M12 13v8","M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242","m8 17 4-4 4 4"],"stroke":true},
  "cloudy": {"name":"Cloudy","viewBox":[0,0,24,24],"paths":["M17.5 12a1 1 0 1 1 0 9H9.006a7 7 0 1 1 6.702-9z","M21.832 9A3 3 0 0 0 19 7h-2.207a5.5 5.5 0 0 0-10.72.61"],"stroke":true},
  "clover": {"name":"Clover","viewBox":[0,0,24,24],"paths":["M16.17 7.83 2 22","M4.02 12a2.827 2.827 0 1 1 3.81-4.17A2.827 2.827 0 1 1 12 4.02a2.827 2.827 0 1 1 4.17 3.81A2.827 2.827 0 1 1 19.98 12a2.827 2.827 0 1 1-3.81 4.17A2.827 2.827 0 1 1 12 19.98a2.827 2.827 0 1 1-4.17-3.81A1 1 0 1 1 4 12","m7.83 7.83 8.34 8.34"],"stroke":true},
  "club": {"name":"Club","viewBox":[0,0,24,24],"paths":["M17.28 9.05a5.5 5.5 0 1 0-10.56 0A5.5 5.5 0 1 0 12 17.66a5.5 5.5 0 1 0 5.28-8.6Z","M12 17.66L12 22"],"stroke":true},
  "code": {"name":"Code","viewBox":[0,0,24,24],"paths":["m16 18 6-6-6-6","m8 6-6 6 6 6"],"stroke":true},
  "code-2": {"name":"Code 2","viewBox":[0,0,24,24],"paths":["m18 16 4-4-4-4","m6 8-4 4 4 4","m14.5 4-5 16"],"stroke":true},
  "code-square": {"name":"Code Square","viewBox":[0,0,24,24],"paths":["m10 9-3 3 3 3","m14 15 3-3-3-3","M 3 3 h 18 v 18 h -18 z"],"stroke":true},
  "code-xml": {"name":"Code Xml","viewBox":[0,0,24,24],"paths":["m18 16 4-4-4-4","m6 8-4 4 4 4","m14.5 4-5 16"],"stroke":true},
  "coffee": {"name":"Coffee","viewBox":[0,0,24,24],"paths":["M10 2v2","M14 2v2","M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1","M6 2v2"],"stroke":true},
  "cog": {"name":"Cog","viewBox":[0,0,24,24],"paths":["M11 10.27 7 3.34","m11 13.73-4 6.93","M12 22v-2","M12 2v2","M14 12h8","m17 20.66-1-1.73","m17 3.34-1 1.73","M2 12h2","m20.66 17-1.73-1","m20.66 7-1.73 1","m3.34 17 1.73-1","m3.34 7 1.73 1","M 10 12 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0","M 4 12 a 8 8 0 1 0 16 0 a 8 8 0 1 0 -16 0"],"stroke":true},
  "coins": {"name":"Coins","viewBox":[0,0,24,24],"paths":["M13.744 17.736a6 6 0 1 1-7.48-7.48","M15 6h1v4","m6.134 14.768.866-.5 2 3.464","M 10 8 a 6 6 0 1 0 12 0 a 6 6 0 1 0 -12 0"],"stroke":true},
  "columns": {"name":"Columns","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","M12 3v18"],"stroke":true},
  "columns-2": {"name":"Columns 2","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","M12 3v18"],"stroke":true},
  "columns-3": {"name":"Columns 3","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","M9 3v18","M15 3v18"],"stroke":true},
  "columns-3-cog": {"name":"Columns 3 Cog","viewBox":[0,0,24,24],"paths":["M10.6 21H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v5.6","m14.305 19.53.923-.382","M15 3v7.6","m15.229 16.852-.924-.383","m16.852 15.228-.383-.923","m16.852 20.772-.383.924","m19.148 15.228.383-.923","m19.53 21.696-.382-.924","m20.773 16.852.922-.383","m20.773 19.148.922.383","M9 3v18","M 15 18 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0"],"stroke":true},
  "columns-4": {"name":"Columns 4","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","M7.5 3v18","M12 3v18","M16.5 3v18"],"stroke":true},
  "columns-settings": {"name":"Columns Settings","viewBox":[0,0,24,24],"paths":["M10.6 21H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v5.6","m14.305 19.53.923-.382","M15 3v7.6","m15.229 16.852-.924-.383","m16.852 15.228-.383-.923","m16.852 20.772-.383.924","m19.148 15.228.383-.923","m19.53 21.696-.382-.924","m20.773 16.852.922-.383","m20.773 19.148.922.383","M9 3v18","M 15 18 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0"],"stroke":true},
  "combine": {"name":"Combine","viewBox":[0,0,24,24],"paths":["M14 3a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1","M19 3a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1","m7 15 3 3","m7 21 3-3H5a2 2 0 0 1-2-2v-2","M 14 14 h 7 v 7 h -7 z","M 3 3 h 7 v 7 h -7 z"],"stroke":true},
  "command": {"name":"Command","viewBox":[0,0,24,24],"paths":["M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"],"stroke":true},
  "compass": {"name":"Compass","viewBox":[0,0,24,24],"paths":["M 2 12 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0","m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z"],"stroke":true},
  "component": {"name":"Component","viewBox":[0,0,24,24],"paths":["M15.536 11.293a1 1 0 0 0 0 1.414l2.376 2.377a1 1 0 0 0 1.414 0l2.377-2.377a1 1 0 0 0 0-1.414l-2.377-2.377a1 1 0 0 0-1.414 0z","M2.297 11.293a1 1 0 0 0 0 1.414l2.377 2.377a1 1 0 0 0 1.414 0l2.377-2.377a1 1 0 0 0 0-1.414L6.088 8.916a1 1 0 0 0-1.414 0z","M8.916 17.912a1 1 0 0 0 0 1.415l2.377 2.376a1 1 0 0 0 1.414 0l2.377-2.376a1 1 0 0 0 0-1.415l-2.377-2.376a1 1 0 0 0-1.414 0z","M8.916 4.674a1 1 0 0 0 0 1.414l2.377 2.376a1 1 0 0 0 1.414 0l2.377-2.376a1 1 0 0 0 0-1.414l-2.377-2.377a1 1 0 0 0-1.414 0z"],"stroke":true},
  "computer": {"name":"Computer","viewBox":[0,0,24,24],"paths":["M12 18h6","M6 18h.01","M8 6h1","M 2 14 h 20 v 8 h -20 z","M 4 2 h 16 v 12 h -16 z"],"stroke":true},
  "concierge-bell": {"name":"Concierge Bell","viewBox":[0,0,24,24],"paths":["M3 20a1 1 0 0 1-1-1v-1a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1Z","M20 16a8 8 0 1 0-16 0","M12 4v4","M10 4h4"],"stroke":true},
  "cone": {"name":"Cone","viewBox":[0,0,24,24],"paths":["m20.9 18.55-8-15.98a1 1 0 0 0-1.8 0l-8 15.98","M 3 19 a 9 3 0 1 0 18 0 a 9 3 0 1 0 -18 0"],"stroke":true},
  "construction": {"name":"Construction","viewBox":[0,0,24,24],"paths":["M 2 6 h 20 v 8 h -20 z","M17 14v7","M7 14v7","M17 3v3","M7 3v3","M10 14 2.3 6.3","m14 6 7.7 7.7","m8 6 8 8"],"stroke":true},
  "contact": {"name":"Contact","viewBox":[0,0,24,24],"paths":["M16 2v2","M7 21v-2a2 2 0 012-2h6a2 2 0 012 2v2","M8 2v2","M 9 10 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0","M 3 3 h 18 v 18 h -18 z"],"stroke":true},
  "contact-2": {"name":"Contact 2","viewBox":[0,0,24,24],"paths":["M16 2v2","M17.915 21a6 6 0 10-12 0","M8 2v2","M 8 11 a 4 4 0 1 0 8 0 a 4 4 0 1 0 -8 0","M 3 3 h 18 v 18 h -18 z"],"stroke":true},
  "contact-round": {"name":"Contact Round","viewBox":[0,0,24,24],"paths":["M16 2v2","M17.915 21a6 6 0 10-12 0","M8 2v2","M 8 11 a 4 4 0 1 0 8 0 a 4 4 0 1 0 -8 0","M 3 3 h 18 v 18 h -18 z"],"stroke":true},
  "container": {"name":"Container","viewBox":[0,0,24,24],"paths":["M22 7.7c0-.6-.4-1.2-.8-1.5l-6.3-3.9a1.72 1.72 0 0 0-1.7 0l-10.3 6c-.5.2-.9.8-.9 1.4v6.6c0 .5.4 1.2.8 1.5l6.3 3.9a1.72 1.72 0 0 0 1.7 0l10.3-6c.5-.3.9-1 .9-1.5Z","M10 21.9V14L2.1 9.1","m10 14 11.9-6.9","M14 19.8v-8.1","M18 17.5V9.4"],"stroke":true},
  "contrast": {"name":"Contrast","viewBox":[0,0,24,24],"paths":["M 2 12 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0","M12 18a6 6 0 0 0 0-12v12z"],"stroke":true},
  "cookie": {"name":"Cookie","viewBox":[0,0,24,24],"paths":["M11 17h.01","M11.496 2c.324-.016.558.292.529.615a4 4 0 004.235 4.368.713.713 0 01.758.757 4 4 0 004.366 4.237c.323-.03.63.204.614.527a10 10 0 01-2.915 6.566A1 1 0 114.93 4.918 10 10 0 0111.496 2","M12 12h.01","M16 16h.01","M16 3h.01","M21 4h.01","M21 8h.01","M7 14h.01","M9 8h.01"],"stroke":true},
  "cooking-pot": {"name":"Cooking Pot","viewBox":[0,0,24,24],"paths":["M2 12h20","M20 12v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8","m4 8 16-4","m8.86 6.78-.45-1.81a2 2 0 0 1 1.45-2.43l1.94-.48a2 2 0 0 1 2.43 1.46l.45 1.8"],"stroke":true},
  "copy": {"name":"Copy","viewBox":[0,0,24,24],"paths":["M 8 8 h 14 v 14 h -14 z","M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"],"stroke":true},
  "copy-check": {"name":"Copy Check","viewBox":[0,0,24,24],"paths":["m12 15 2 2 4-4","M 8 8 h 14 v 14 h -14 z","M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"],"stroke":true},
  "copy-minus": {"name":"Copy Minus","viewBox":[0,0,24,24],"paths":["M 12 15 L 18 15","M 8 8 h 14 v 14 h -14 z","M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"],"stroke":true},
  "copy-plus": {"name":"Copy Plus","viewBox":[0,0,24,24],"paths":["M 15 12 L 15 18","M 12 15 L 18 15","M 8 8 h 14 v 14 h -14 z","M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"],"stroke":true},
  "copy-slash": {"name":"Copy Slash","viewBox":[0,0,24,24],"paths":["M 12 18 L 18 12","M 8 8 h 14 v 14 h -14 z","M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"],"stroke":true},
  "copy-x": {"name":"Copy X","viewBox":[0,0,24,24],"paths":["M4 16a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2","M 8 8 h 14 v 14 h -14 z","m12.5 12.5 5 5","m12.5 17.5 5-5"],"stroke":true},
  "copyleft": {"name":"Copyleft","viewBox":[0,0,24,24],"paths":["M 2 12 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0","M9.17 14.83a4 4 0 1 0 0-5.66"],"stroke":true},
  "copyright": {"name":"Copyright","viewBox":[0,0,24,24],"paths":["M 2 12 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0","M14.83 14.83a4 4 0 1 1 0-5.66"],"stroke":true},
  "corner-down-left": {"name":"Corner Down Left","viewBox":[0,0,24,24],"paths":["M20 4v7a4 4 0 0 1-4 4H4","m9 10-5 5 5 5"],"stroke":true},
  "corner-down-right": {"name":"Corner Down Right","viewBox":[0,0,24,24],"paths":["m15 10 5 5-5 5","M4 4v7a4 4 0 0 0 4 4h12"],"stroke":true},
  "corner-left-down": {"name":"Corner Left Down","viewBox":[0,0,24,24],"paths":["m14 15-5 5-5-5","M20 4h-7a4 4 0 0 0-4 4v12"],"stroke":true},
  "corner-left-up": {"name":"Corner Left Up","viewBox":[0,0,24,24],"paths":["M14 9 9 4 4 9","M20 20h-7a4 4 0 0 1-4-4V4"],"stroke":true},
  "corner-right-down": {"name":"Corner Right Down","viewBox":[0,0,24,24],"paths":["m10 15 5 5 5-5","M4 4h7a4 4 0 0 1 4 4v12"],"stroke":true},
  "corner-right-up": {"name":"Corner Right Up","viewBox":[0,0,24,24],"paths":["m10 9 5-5 5 5","M4 20h7a4 4 0 0 0 4-4V4"],"stroke":true},
  "corner-up-left": {"name":"Corner Up Left","viewBox":[0,0,24,24],"paths":["M20 20v-7a4 4 0 0 0-4-4H4","M9 14 4 9l5-5"],"stroke":true},
  "corner-up-right": {"name":"Corner Up Right","viewBox":[0,0,24,24],"paths":["m15 14 5-5-5-5","M4 20v-7a4 4 0 0 1 4-4h12"],"stroke":true},
  "cpu": {"name":"Cpu","viewBox":[0,0,24,24],"paths":["M12 20v2","M12 2v2","M17 20v2","M17 2v2","M2 12h2","M2 17h2","M2 7h2","M20 12h2","M20 17h2","M20 7h2","M7 20v2","M7 2v2","M 4 4 h 16 v 16 h -16 z","M 8 8 h 8 v 8 h -8 z"],"stroke":true},
  "creative-commons": {"name":"Creative Commons","viewBox":[0,0,24,24],"paths":["M 2 12 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0","M10 9.3a2.8 2.8 0 0 0-3.5 1 3.1 3.1 0 0 0 0 3.4 2.7 2.7 0 0 0 3.5 1","M17 9.3a2.8 2.8 0 0 0-3.5 1 3.1 3.1 0 0 0 0 3.4 2.7 2.7 0 0 0 3.5 1"],"stroke":true},
  "credit-card": {"name":"Credit Card","viewBox":[0,0,24,24],"paths":["M 2 5 h 20 v 14 h -20 z","M 2 10 L 22 10","M6 14h2"],"stroke":true},
  "credit-card-check": {"name":"Credit Card Check","viewBox":[0,0,24,24],"paths":["M12.5 19H4a2 2 0 01-2-2V7a2 2 0 012-2h16a2 2 0 012 2v4","M2 10h20","M6 14h2","m16 17 2 2 4-4"],"stroke":true},
  "credit-card-minus": {"name":"Credit Card Minus","viewBox":[0,0,24,24],"paths":["M22 13V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2h8.536","M22 10H2","M6 14h2","M16 17h6"],"stroke":true},
  "credit-card-plus": {"name":"Credit Card Plus","viewBox":[0,0,24,24],"paths":["M22 11.354V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2h8.536","M22 10H2","M6 14h2","M16 17h6","M19 14v6"],"stroke":true},
  "credit-card-reader": {"name":"Credit Card Reader","viewBox":[0,0,24,24],"paths":["M15 16v1","M16.963 7.734A1 1 0 0015.999 7H8.003a1 1 0 00-.964.734L4.073 18.467A2 2 0 006 21h12a2 2 0 001.927-2.532z","M2.678 8.5A2 2 0 012 7V5a2 2 0 012-2h16a2 2 0 012 2v2a2 2 0 01-.676 1.499","m9 21 2-14"],"stroke":true},
  "credit-card-x": {"name":"Credit Card X","viewBox":[0,0,24,24],"paths":["M12.5 19H4a2 2 0 01-2-2V7a2 2 0 012-2h16a2 2 0 012 2v3.5","M2 10h20","M6 14h2","m16.5 14.5 5 5","m21.5 14.5-5 5"],"stroke":true},
  "croissant": {"name":"Croissant","viewBox":[0,0,24,24],"paths":["M10.2 18H4.774a1.5 1.5 0 0 1-1.352-.97 11 11 0 0 1 .132-6.487","M18 10.2V4.774a1.5 1.5 0 0 0-.97-1.352 11 11 0 0 0-6.486.132","M18 5a4 3 0 0 1 4 3 2 2 0 0 1-2 2 10 10 0 0 0-5.139 1.42","M5 18a3 4 0 0 0 3 4 2 2 0 0 0 2-2 10 10 0 0 1 1.42-5.14","M8.709 2.554a10 10 0 0 0-6.155 6.155 1.5 1.5 0 0 0 .676 1.626l9.807 5.42a2 2 0 0 0 2.718-2.718l-5.42-9.807a1.5 1.5 0 0 0-1.626-.676"],"stroke":true},
  "crop": {"name":"Crop","viewBox":[0,0,24,24],"paths":["M6 2v14a2 2 0 0 0 2 2h14","M18 22V8a2 2 0 0 0-2-2H2"],"stroke":true},
  "cross": {"name":"Cross","viewBox":[0,0,24,24],"paths":["M4 9a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h4a1 1 0 0 1 1 1v4a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-4a1 1 0 0 1 1-1h4a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-4a1 1 0 0 1-1-1V4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4a1 1 0 0 1-1 1z"],"stroke":true},
  "crosshair": {"name":"Crosshair","viewBox":[0,0,24,24],"paths":["M 2 12 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0","M 22 12 L 18 12","M 6 12 L 2 12","M 12 6 L 12 2","M 12 22 L 12 18"],"stroke":true},
  "crown": {"name":"Crown","viewBox":[0,0,24,24],"paths":["M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z","M5 21h14"],"stroke":true},
  "cuboid": {"name":"Cuboid","viewBox":[0,0,24,24],"paths":["M10 22v-8","M2.336 8.89 10 14l11.715-7.029","M22 14a2 2 0 0 1-.971 1.715l-10 6a2 2 0 0 1-2.138-.05l-6-4A2 2 0 0 1 2 16v-6a2 2 0 0 1 .971-1.715l10-6a2 2 0 0 1 2.138.05l6 4A2 2 0 0 1 22 8z"],"stroke":true},
  "cup-soda": {"name":"Cup Soda","viewBox":[0,0,24,24],"paths":["m6 8 1.75 12.28a2 2 0 0 0 2 1.72h4.54a2 2 0 0 0 2-1.72L18 8","M5 8h14","M7 15a6.47 6.47 0 0 1 5 0 6.47 6.47 0 0 0 5 0","m12 8 1-6h2"],"stroke":true},
  "cupcake": {"name":"Cupcake","viewBox":[0,0,24,24],"paths":["M12 22v-9","M14 4h1a3 3 0 013 3l-.004.125A4 4 0 0121 11v2","m15.5 22 1.5-9","M21 13a1 1 0 01.919 1.394l-2.74 6.394A2 2 0 0117.34 22H6.659a2 2 0 01-1.838-1.212l-2.74-6.394A1 1 0 013 13z","M3 13v-2a4 4 0 013.003-3.875L6 7a3 3 0 013-3h1","M8.5 22 7 13","M 10 4 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0"],"stroke":true},
  "curly-braces": {"name":"Curly Braces","viewBox":[0,0,24,24],"paths":["M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1","M16 21h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1"],"stroke":true},
  "currency": {"name":"Currency","viewBox":[0,0,24,24],"paths":["M 4 12 a 8 8 0 1 0 16 0 a 8 8 0 1 0 -16 0","M 3 3 L 6 6","M 21 3 L 18 6","M 3 21 L 6 18","M 21 21 L 18 18"],"stroke":true},
  "cylinder": {"name":"Cylinder","viewBox":[0,0,24,24],"paths":["M 3 5 a 9 3 0 1 0 18 0 a 9 3 0 1 0 -18 0","M3 5v14a9 3 0 0 0 18 0V5"],"stroke":true},
  "dam": {"name":"Dam","viewBox":[0,0,24,24],"paths":["M11 11.31c1.17.56 1.54 1.69 3.5 1.69 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1","M11.75 18c.35.5 1.45 1 2.75 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1","M2 10h4","M2 14h4","M2 18h4","M2 6h4","M7 3a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1L10 4a1 1 0 0 0-1-1z"],"stroke":true},
  "database": {"name":"Database","viewBox":[0,0,24,24],"paths":["M 3 5 a 9 3 0 1 0 18 0 a 9 3 0 1 0 -18 0","M3 5V19A9 3 0 0 0 21 19V5","M3 12A9 3 0 0 0 21 12"],"stroke":true},
  "database-arrow-down": {"name":"Database Arrow Down","viewBox":[0,0,24,24],"paths":["m16 19 3 3 3-3","M19 16v6","M21 12.536V5","M3 12A9 3 0 0 0 15.182 14.806","M3 5V19A9 3 0 0 0 13.318 21.968","M 3 5 a 9 3 0 1 0 18 0 a 9 3 0 1 0 -18 0"],"stroke":true},
  "database-arrow-up": {"name":"Database Arrow Up","viewBox":[0,0,24,24],"paths":["M19 22v-6","M21 12.536V5","m22 19-3-3-3 3","M3 12A9 3 0 0 0 14.457 14.886","M3 5V19A9 3 0 0 0 13.318 21.968","M 3 5 a 9 3 0 1 0 18 0 a 9 3 0 1 0 -18 0"],"stroke":true},
  "database-backup": {"name":"Database Backup","viewBox":[0,0,24,24],"paths":["M 3 5 a 9 3 0 1 0 18 0 a 9 3 0 1 0 -18 0","M3 12a9 3 0 0 0 5 2.69","M21 9.3V5","M3 5v14a9 3 0 0 0 6.47 2.88","M12 12v4h4","M13 20a5 5 0 0 0 9-3 4.5 4.5 0 0 0-4.5-4.5c-1.33 0-2.54.54-3.41 1.41L12 16"],"stroke":true},
  "database-check": {"name":"Database Check","viewBox":[0,0,24,24],"paths":["m16 19 2 2 4-4","M21 13.127V5","M3 12A9 3 0 0 0 21 12","M3 5V19A9 3 0 0 0 13.318 21.968","M 3 5 a 9 3 0 1 0 18 0 a 9 3 0 1 0 -18 0"],"stroke":true},
  "database-minus": {"name":"Database Minus","viewBox":[0,0,24,24],"paths":["M21 15V5","M22 19h-6","M3 12A9 3 0 0 0 21 12","M3 5V19A9 3 0 0 0 13.318 21.968","M 3 5 a 9 3 0 1 0 18 0 a 9 3 0 1 0 -18 0"],"stroke":true},
  "database-plus": {"name":"Database Plus","viewBox":[0,0,24,24],"paths":["M19 16v6","M21 12.536V5","M22 19h-6","M3 12A9 3 0 0 0 15.1824 14.8061","M3 5V19A9 3 0 0 0 13.318 21.968","M 3 5 a 9 3 0 1 0 18 0 a 9 3 0 1 0 -18 0"],"stroke":true},
  "database-search": {"name":"Database Search","viewBox":[0,0,24,24],"paths":["M21 11.693V5","m22 22-1.875-1.875","M3 12a9 3 0 0 0 8.697 2.998","M3 5v14a9 3 0 0 0 9.28 2.999","M 15 18 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0","M 3 5 a 9 3 0 1 0 18 0 a 9 3 0 1 0 -18 0"],"stroke":true},
  "database-x": {"name":"Database X","viewBox":[0,0,24,24],"paths":["m17 17 5 5","M19.323 13.744A9 3 0 0 0 21 12","M21 13.127V5","m22 17-5 5","M3 12A9 3 0 0 0 13.563 14.954","M3 5V19A9 3 0 0 0 13 21.981","M 3 5 a 9 3 0 1 0 18 0 a 9 3 0 1 0 -18 0"],"stroke":true},
  "database-zap": {"name":"Database Zap","viewBox":[0,0,24,24],"paths":["M 3 5 a 9 3 0 1 0 18 0 a 9 3 0 1 0 -18 0","M3 5V19A9 3 0 0 0 15 21.84","M21 5V8","M21 12L18 17H22L19 22","M3 12A9 3 0 0 0 14.59 14.87"],"stroke":true},
  "decimals-arrow-left": {"name":"Decimals Arrow Left","viewBox":[0,0,24,24],"paths":["m13 21-3-3 3-3","M20 18H10","M3 11h.01","M 6 3 h 5 v 8 h -5 z"],"stroke":true},
  "decimals-arrow-right": {"name":"Decimals Arrow Right","viewBox":[0,0,24,24],"paths":["M10 18h10","m17 21 3-3-3-3","M3 11h.01","M 15 3 h 5 v 8 h -5 z","M 6 3 h 5 v 8 h -5 z"],"stroke":true},
  "delete": {"name":"Delete","viewBox":[0,0,24,24],"paths":["M10 5a2 2 0 0 0-1.344.519l-6.328 5.74a1 1 0 0 0 0 1.481l6.328 5.741A2 2 0 0 0 10 19h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z","m12 9 6 6","m18 9-6 6"],"stroke":true},
  "dessert": {"name":"Dessert","viewBox":[0,0,24,24],"paths":["M10.162 3.167A10 10 0 0 0 2 13a2 2 0 0 0 4 0v-1a2 2 0 0 1 4 0v4a2 2 0 0 0 4 0v-4a2 2 0 0 1 4 0v1a2 2 0 0 0 4-.006 10 10 0 0 0-8.161-9.826","M20.804 14.869a9 9 0 0 1-17.608 0","M 10 4 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0"],"stroke":true},
  "diameter": {"name":"Diameter","viewBox":[0,0,24,24],"paths":["M 17 19 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0","M 3 5 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0","M6.48 3.66a10 10 0 0 1 13.86 13.86","m6.41 6.41 11.18 11.18","M3.66 6.48a10 10 0 0 0 13.86 13.86"],"stroke":true},
  "diamond": {"name":"Diamond","viewBox":[0,0,24,24],"paths":["M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41l-7.59-7.59a2.41 2.41 0 0 0-3.41 0Z"],"stroke":true},
  "diamond-minus": {"name":"Diamond Minus","viewBox":[0,0,24,24],"paths":["M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41L13.7 2.71a2.41 2.41 0 0 0-3.41 0z","M8 12h8"],"stroke":true},
  "diamond-percent": {"name":"Diamond Percent","viewBox":[0,0,24,24],"paths":["M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41L13.7 2.71a2.41 2.41 0 0 0-3.41 0Z","M9.2 9.2h.01","m14.5 9.5-5 5","M14.7 14.8h.01"],"stroke":true},
  "diamond-plus": {"name":"Diamond Plus","viewBox":[0,0,24,24],"paths":["M12 8v8","M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41L13.7 2.71a2.41 2.41 0 0 0-3.41 0z","M8 12h8"],"stroke":true},
  "dice-1": {"name":"Dice 1","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","M12 12h.01"],"stroke":true},
  "dice-2": {"name":"Dice 2","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","M15 9h.01","M9 15h.01"],"stroke":true},
  "dice-3": {"name":"Dice 3","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","M16 8h.01","M12 12h.01","M8 16h.01"],"stroke":true},
  "dice-4": {"name":"Dice 4","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","M16 8h.01","M8 8h.01","M8 16h.01","M16 16h.01"],"stroke":true},
  "dice-5": {"name":"Dice 5","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","M16 8h.01","M8 8h.01","M8 16h.01","M16 16h.01","M12 12h.01"],"stroke":true},
  "dice-6": {"name":"Dice 6","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","M16 8h.01","M16 12h.01","M16 16h.01","M8 8h.01","M8 12h.01","M8 16h.01"],"stroke":true},
  "dices": {"name":"Dices","viewBox":[0,0,24,24],"paths":["M 2 10 h 12 v 12 h -12 z","m17.92 14 3.5-3.5a2.24 2.24 0 0 0 0-3l-5-4.92a2.24 2.24 0 0 0-3 0L10 6","M6 18h.01","M10 14h.01","M15 6h.01","M18 9h.01"],"stroke":true},
  "diff": {"name":"Diff","viewBox":[0,0,24,24],"paths":["M12 3v14","M5 10h14","M5 21h14"],"stroke":true},
  "disc": {"name":"Disc","viewBox":[0,0,24,24],"paths":["M 2 12 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0","M 10 12 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0"],"stroke":true},
  "disc-2": {"name":"Disc 2","viewBox":[0,0,24,24],"paths":["M 2 12 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0","M 8 12 a 4 4 0 1 0 8 0 a 4 4 0 1 0 -8 0","M12 12h.01"],"stroke":true},
  "disc-3": {"name":"Disc 3","viewBox":[0,0,24,24],"paths":["M 2 12 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0","M6 12c0-1.7.7-3.2 1.8-4.2","M 10 12 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0","M18 12c0 1.7-.7 3.2-1.8 4.2"],"stroke":true},
  "disc-album": {"name":"Disc Album","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","M 7 12 a 5 5 0 1 0 10 0 a 5 5 0 1 0 -10 0","M12 12h.01"],"stroke":true},
  "divide": {"name":"Divide","viewBox":[0,0,24,24],"paths":["M 11 6 a 1 1 0 1 0 2 0 a 1 1 0 1 0 -2 0","M 5 12 L 19 12","M 11 18 a 1 1 0 1 0 2 0 a 1 1 0 1 0 -2 0"],"stroke":true},
  "divide-circle": {"name":"Divide Circle","viewBox":[0,0,24,24],"paths":["M 2 12 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0","M 8 12 L 16 12","M 12 16 L 12 16","M 12 8 L 12 8"],"stroke":true},
  "divide-square": {"name":"Divide Square","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","M 8 12 L 16 12","M 12 16 L 12 16","M 12 8 L 12 8"],"stroke":true},
  "dna": {"name":"Dna","viewBox":[0,0,24,24],"paths":["m10 16 1.5 1.5","m14 8-1.5-1.5","M15 2c-1.798 1.998-2.518 3.995-2.807 5.993","m16.5 10.5 1 1","m17 6-2.891-2.891","M2 15c6.667-6 13.333 0 20-6","m20 9 .891.891","M3.109 14.109 4 15","m6.5 12.5 1 1","m7 18 2.891 2.891","M9 22c1.798-1.998 2.518-3.995 2.807-5.993"],"stroke":true},
  "dna-off": {"name":"Dna Off","viewBox":[0,0,24,24],"paths":["M15 2c-1.35 1.5-2.092 3-2.5 4.5L14 8","m17 6-2.891-2.891","M2 15c3.333-3 6.667-3 10-3","m2 2 20 20","m20 9 .891.891","M22 9c-1.5 1.35-3 2.092-4.5 2.5l-1-1","M3.109 14.109 4 15","m6.5 12.5 1 1","m7 18 2.891 2.891","M9 22c1.35-1.5 2.092-3 2.5-4.5L10 16"],"stroke":true},
  "do-not-stack": {"name":"Do Not Stack","viewBox":[0,0,24,24],"stroke":true,"tags":["iso","handling","packaging","nao empilhar","empilhamento"],"paths":["M4 14h16v7H4z","M8 4h8v7H8z","M3 3l18 18"]},
  "dock": {"name":"Dock","viewBox":[0,0,24,24],"paths":["M2 8h20","M 2 4 h 20 v 16 h -20 z","M6 16h12"],"stroke":true},
  "dog": {"name":"Dog","viewBox":[0,0,24,24],"paths":["M11.25 16.25h1.5L12 17z","M16 14v.5","M4.42 11.247A13.152 13.152 0 0 0 4 14.556C4 18.728 7.582 21 12 21s8-2.272 8-6.444a11.702 11.702 0 0 0-.493-3.309","M8 14v.5","M8.5 8.5c-.384 1.05-1.083 2.028-2.344 2.5-1.931.722-3.576-.297-3.656-1-.113-.994 1.177-6.53 4-7 1.923-.321 3.651.845 3.651 2.235A7.497 7.497 0 0 1 14 5.277c0-1.39 1.844-2.598 3.767-2.277 2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 1-1.261-.472-1.855-1.45-2.239-2.5"],"stroke":true},
  "dollar-sign": {"name":"Dollar Sign","viewBox":[0,0,24,24],"paths":["M 12 2 L 12 22","M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"],"stroke":true},
  "dome": {"name":"Dome","viewBox":[0,0,24,24],"paths":["M10 21v-3a2 2 0 014 0v3","M12 2v2","M18 12v9","M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2v-6a1 1 0 011-1h18a1 1 0 011 1z","M4 12a8 8 0 0116 0","M6 12v9"],"stroke":true},
  "donut": {"name":"Donut","viewBox":[0,0,24,24],"paths":["M20.5 10a2.5 2.5 0 0 1-2.4-3H18a2.95 2.95 0 0 1-2.6-4.4 10 10 0 1 0 6.3 7.1c-.3.2-.8.3-1.2.3","M 9 12 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0"],"stroke":true},
  "door-closed": {"name":"Door Closed","viewBox":[0,0,24,24],"paths":["M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16","M2 21h20","M9 12h.01"],"stroke":true},
  "door-closed-cog": {"name":"Door Closed Cog","viewBox":[0,0,24,24],"paths":["m14.305 19.53.923-.382","m15.229 16.852-.924-.383","m16.852 15.228-.383-.923","m16.852 20.773-.383.924","M19 10.35V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16","m19.148 15.228.383-.923","m19.53 21.697-.382-.924","M2 21h8.58","m20.773 16.852.922-.383","m20.773 19.148.922.383","M9 12h.01","M 15 18 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0"],"stroke":true},
  "door-closed-locked": {"name":"Door Closed Locked","viewBox":[0,0,24,24],"paths":["M19 8V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16","M2 21h8","M20 16v-2a2 2 0 00-4 0v2","M9 12h.01","M 14 16 h 8 v 5 h -8 z"],"stroke":true},
  "door-closed-package": {"name":"Door Closed Package","viewBox":[0,0,24,24],"paths":["M18 13v3","M19 9V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16","M2 21h8","M9 12h.01","M 14 13 h 8 v 8 h -8 z"],"stroke":true},
  "door-open": {"name":"Door Open","viewBox":[0,0,24,24],"paths":["M10 21H2","M10 3H7a2 2 0 00-2 2v16","M14 12h.01","M19 21V5a2 2 0 00-1.675-1.974l-6.163-1.013A1 1 0 0010 3v18a1 1 0 001.124.992z","M22 21h-3"],"stroke":true},
  "door-stairwell": {"name":"Door Stairwell","viewBox":[0,0,24,24],"paths":["M12 17v-3a1 1 0 011-1h6","M19 17h-9a1 1 0 00-1 1v3","M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16","M19 9h-3a1 1 0 00-1 1v3","M22 21H2"],"stroke":true},
  "dot": {"name":"Dot","viewBox":[0,0,24,24],"paths":["M 11 12 a 1 1 0 1 0 2 0 a 1 1 0 1 0 -2 0"],"stroke":true},
  "dot-square": {"name":"Dot Square","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","M 11 12 a 1 1 0 1 0 2 0 a 1 1 0 1 0 -2 0"],"stroke":true},
  "download": {"name":"Download","viewBox":[0,0,24,24],"paths":["M12 15V3","M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4","m7 10 5 5 5-5"],"stroke":true},
  "download-cloud": {"name":"Download Cloud","viewBox":[0,0,24,24],"paths":["M12 13v8l-4-4","m12 21 4-4","M4.393 15.269A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.436 8.284"],"stroke":true},
  "drafting-compass": {"name":"Drafting Compass","viewBox":[0,0,24,24],"paths":["m12.99 6.74 1.93 3.44","M19.136 12a10 10 0 0 1-14.271 0","m21 21-2.16-3.84","m3 21 8.02-14.26","M 10 5 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0"],"stroke":true},
  "drama": {"name":"Drama","viewBox":[0,0,24,24],"paths":["M10 11h.01","M14 6h.01","M18 6h.01","M6.5 13.1h.01","M22 5c0 9-4 12-6 12s-6-3-6-12c0-2 2-3 6-3s6 1 6 3","M17.4 9.9c-.8.8-2 .8-2.8 0","M10.1 7.1C9 7.2 7.7 7.7 6 8.6c-3.5 2-4.7 3.9-3.7 5.6 4.5 7.8 9.5 8.4 11.2 7.4.9-.5 1.9-2.1 1.9-4.7","M9.1 16.5c.3-1.1 1.4-1.7 2.4-1.4"],"stroke":true},
  "drill": {"name":"Drill","viewBox":[0,0,24,24],"paths":["M10 18a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H5a3 3 0 0 1-3-3 1 1 0 0 1 1-1z","M13 10H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1l-.81 3.242a1 1 0 0 1-.97.758H8","M14 4h3a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-3","M18 6h4","m5 10-2 8","m7 18 2-8"],"stroke":true},
  "drone": {"name":"Drone","viewBox":[0,0,24,24],"paths":["M10 10 7 7","m10 14-3 3","m14 10 3-3","m14 14 3 3","M14.205 4.139a4 4 0 1 1 5.439 5.863","M19.637 14a4 4 0 1 1-5.432 5.868","M4.367 10a4 4 0 1 1 5.438-5.862","M9.795 19.862a4 4 0 1 1-5.429-5.873","M 10 8 h 4 v 8 h -4 z"],"stroke":true},
  "droplet": {"name":"Droplet","viewBox":[0,0,24,24],"paths":["M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"],"stroke":true},
  "droplet-off": {"name":"Droplet Off","viewBox":[0,0,24,24],"paths":["M18.715 13.186C18.29 11.858 17.384 10.607 16 9.5c-2-1.6-3.5-4-4-6.5a10.7 10.7 0 0 1-.884 2.586","m2 2 20 20","M8.795 8.797A11 11 0 0 1 8 9.5C6 11.1 5 13 5 15a7 7 0 0 0 13.222 3.208"],"stroke":true},
  "droplets": {"name":"Droplets","viewBox":[0,0,24,24],"paths":["M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z","M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"],"stroke":true},
  "drum": {"name":"Drum","viewBox":[0,0,24,24],"paths":["m2 2 8 8","m22 2-8 8","M 2 9 a 10 5 0 1 0 20 0 a 10 5 0 1 0 -20 0","M7 13.4v7.9","M12 14v8","M17 13.4v7.9","M2 9v8a10 5 0 0 0 20 0V9"],"stroke":true},
  "drumstick": {"name":"Drumstick","viewBox":[0,0,24,24],"paths":["M15.4 15.63a7.875 6 135 1 1 6.23-6.23 4.5 3.43 135 0 0-6.23 6.23","m8.29 12.71-2.6 2.6a2.5 2.5 0 1 0-1.65 4.65A2.5 2.5 0 1 0 8.7 18.3l2.59-2.59"],"stroke":true},
  "dumbbell": {"name":"Dumbbell","viewBox":[0,0,24,24],"paths":["M17.596 12.768a2 2 0 1 0 2.829-2.829l-1.768-1.767a2 2 0 0 0 2.828-2.829l-2.828-2.828a2 2 0 0 0-2.829 2.828l-1.767-1.768a2 2 0 1 0-2.829 2.829z","m2.5 21.5 1.4-1.4","m20.1 3.9 1.4-1.4","M5.343 21.485a2 2 0 1 0 2.829-2.828l1.767 1.768a2 2 0 1 0 2.829-2.829l-6.364-6.364a2 2 0 1 0-2.829 2.829l1.768 1.767a2 2 0 0 0-2.828 2.829z","m9.6 14.4 4.8-4.8"],"stroke":true},
  "ear": {"name":"Ear","viewBox":[0,0,24,24],"paths":["M6 8.5a6.5 6.5 0 1 1 13 0c0 6-6 6-6 10a3.5 3.5 0 1 1-7 0","M15 8.5a2.5 2.5 0 0 0-5 0v1a2 2 0 1 1 0 4"],"stroke":true},
  "ear-off": {"name":"Ear Off","viewBox":[0,0,24,24],"paths":["M6 18.5a3.5 3.5 0 1 0 7 0c0-1.57.92-2.52 2.04-3.46","M6 8.5c0-.75.13-1.47.36-2.14","M8.8 3.15A6.5 6.5 0 0 1 19 8.5c0 1.63-.44 2.81-1.09 3.76","M12.5 6A2.5 2.5 0 0 1 15 8.5M10 13a2 2 0 0 0 1.82-1.18","M 2 2 L 22 22"],"stroke":true},
  "earth": {"name":"Earth","viewBox":[0,0,24,24],"paths":["M21.54 15H17a2 2 0 0 0-2 2v4.54","M7 3.34V5a3 3 0 0 0 3 3a2 2 0 0 1 2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2c0-1.1.9-2 2-2h3.17","M11 21.95V18a2 2 0 0 0-2-2a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05","M 2 12 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0"],"stroke":true},
  "earth-lock": {"name":"Earth Lock","viewBox":[0,0,24,24],"paths":["M7 3.34V5a3 3 0 0 0 3 3","M11 21.95V18a2 2 0 0 0-2-2 2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05","M21.54 15H17a2 2 0 0 0-2 2v4.54","M12 2a10 10 0 1 0 9.54 13","M20 6V4a2 2 0 1 0-4 0v2","M 14 6 h 8 v 5 h -8 z"],"stroke":true},
  "eclipse": {"name":"Eclipse","viewBox":[0,0,24,24],"paths":["M 2 12 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0","M12 2a7 7 0 1 0 10 10"],"stroke":true},
  "edit": {"name":"Edit","viewBox":[0,0,24,24],"paths":["M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7","M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"],"stroke":true},
  "edit-2": {"name":"Edit 2","viewBox":[0,0,24,24],"paths":["M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"],"stroke":true},
  "edit-3": {"name":"Edit 3","viewBox":[0,0,24,24],"paths":["M13 21h8","M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"],"stroke":true},
  "egg": {"name":"Egg","viewBox":[0,0,24,24],"paths":["M12 2C8 2 4 8 4 14a8 8 0 0 0 16 0c0-6-4-12-8-12"],"stroke":true},
  "egg-fried": {"name":"Egg Fried","viewBox":[0,0,24,24],"paths":["M 8 12.5 a 3.5 3.5 0 1 0 7 0 a 3.5 3.5 0 1 0 -7 0","M3 8c0-3.5 2.5-6 6.5-6 5 0 4.83 3 7.5 5s5 2 5 6c0 4.5-2.5 6.5-7 6.5-2.5 0-2.5 2.5-6 2.5s-7-2-7-5.5c0-3 1.5-3 1.5-5C3.5 10 3 9 3 8Z"],"stroke":true},
  "egg-off": {"name":"Egg Off","viewBox":[0,0,24,24],"paths":["m2 2 20 20","M20 14.347V14c0-6-4-12-8-12-1.078 0-2.157.436-3.157 1.19","M6.206 6.21C4.871 8.4 4 11.2 4 14a8 8 0 0 0 14.568 4.568"],"stroke":true},
  "eject": {"name":"Eject","viewBox":[0,0,24,24],"paths":["M4 13a1 1 0 0 1-.72-1.695l7.257-7.668a2 2 0 0 1 2.926 0l7.256 7.668A1 1 0 0 1 20 13z","M 3 17 h 18 v 4 h -18 z"],"stroke":true},
  "ellipse": {"name":"Ellipse","viewBox":[0,0,24,24],"paths":["M 2 12 a 10 6 0 1 0 20 0 a 10 6 0 1 0 -20 0"],"stroke":true},
  "ellipsis": {"name":"Ellipsis","viewBox":[0,0,24,24],"paths":["M 11 12 a 1 1 0 1 0 2 0 a 1 1 0 1 0 -2 0","M 18 12 a 1 1 0 1 0 2 0 a 1 1 0 1 0 -2 0","M 4 12 a 1 1 0 1 0 2 0 a 1 1 0 1 0 -2 0"],"stroke":true},
  "ellipsis-vertical": {"name":"Ellipsis Vertical","viewBox":[0,0,24,24],"paths":["M 11 12 a 1 1 0 1 0 2 0 a 1 1 0 1 0 -2 0","M 11 5 a 1 1 0 1 0 2 0 a 1 1 0 1 0 -2 0","M 11 19 a 1 1 0 1 0 2 0 a 1 1 0 1 0 -2 0"],"stroke":true},
  "engine": {"name":"Engine","viewBox":[0,0,24,24],"paths":["M10 3h6","M13 3v4","M2 10v6","M2 13h4","M6 16a2 2 0 002 2h1a2 2 0 011.6.8l.3.4a2 2 0 001.6.8h2.264a2 2 0 001.789-1.106l1.67-3.341a1 1 0 01.895-.553H21a1 1 0 001-1v-4a1 1 0 00-1-1h-3.5a1 1 0 01-.8-.4l-.9-1.2A1 1 0 0015 7h-4a1 1 0 00-.8.4l-.9 1.2a1 1 0 01-.8.4H7a1 1 0 00-1 1z"],"stroke":true},
  "equal": {"name":"Equal","viewBox":[0,0,24,24],"paths":["M 5 9 L 19 9","M 5 15 L 19 15"],"stroke":true},
  "equal-approximately": {"name":"Equal Approximately","viewBox":[0,0,24,24],"paths":["M5 15a6.5 6.5 0 0 1 7 0 6.5 6.5 0 0 0 7 0","M5 9a6.5 6.5 0 0 1 7 0 6.5 6.5 0 0 0 7 0"],"stroke":true},
  "equal-approximately-not": {"name":"Equal Approximately Not","viewBox":[0,0,24,24],"paths":["M5 15a6.5 6.5 0 0 1 7 0 6.5 6.5 0 0 0 7 0","M5 9a6.5 6.5 0 0 1 7 0 6.5 6.5 0 0 0 7 0","M 19 5 L 5 19"],"stroke":true},
  "equal-not": {"name":"Equal Not","viewBox":[0,0,24,24],"paths":["M 5 9 L 19 9","M 5 15 L 19 15","M 19 5 L 5 19"],"stroke":true},
  "equal-square": {"name":"Equal Square","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","M7 10h10","M7 14h10"],"stroke":true},
  "eraser": {"name":"Eraser","viewBox":[0,0,24,24],"paths":["M21 21H8a2 2 0 0 1-1.42-.587l-3.994-3.999a2 2 0 0 1 0-2.828l10-10a2 2 0 0 1 2.829 0l5.999 6a2 2 0 0 1 0 2.828L12.834 21","m5.082 11.09 8.828 8.828"],"stroke":true},
  "ethernet-port": {"name":"Ethernet Port","viewBox":[0,0,24,24],"paths":["M10 8v1","M14 8v1","M18 8v1","M19 17a2 2 0 00-1.765 1.059l-.47.882A2 2 0 0115 20H9a2 2 0 01-1.765-1.059l-.47-.882A2 2 0 005 17H4a2 2 0 01-2-2V6a2 2 0 012-2h16a2 2 0 012 2v9a2 2 0 01-2 2z","M6 8v1"],"stroke":true},
  "euro": {"name":"Euro","viewBox":[0,0,24,24],"paths":["M4 10h12","M4 14h9","M19 6a7.7 7.7 0 0 0-5.2-2A7.9 7.9 0 0 0 6 12c0 4.4 3.5 8 7.8 8 2 0 3.8-.8 5.2-2"],"stroke":true},
  "ev-charger": {"name":"Ev Charger","viewBox":[0,0,24,24],"paths":["M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 4 0v-6.998a2 2 0 0 0-.59-1.42L18 5","M14 21V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v16","M2 21h13","M3 7h11","m9 11-2 3h3l-2 3"],"stroke":true},
  "expand": {"name":"Expand","viewBox":[0,0,24,24],"paths":["m15 15 6 6","m15 9 6-6","M21 16v5h-5","M21 8V3h-5","M3 16v5h5","m3 21 6-6","M3 8V3h5","M9 9 3 3"],"stroke":true},
  "external-link": {"name":"External Link","viewBox":[0,0,24,24],"paths":["M15 3h6v6","M10 14 21 3","M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"],"stroke":true},
  "eye": {"name":"Eye","viewBox":[0,0,24,24],"paths":["M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0","M 9 12 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0"],"stroke":true},
  "eye-closed": {"name":"Eye Closed","viewBox":[0,0,24,24],"paths":["m15 18-.722-3.25","M2 8a10.645 10.645 0 0 0 20 0","m20 15-1.726-2.05","m4 15 1.726-2.05","m9 18 .722-3.25"],"stroke":true},
  "eye-dashed": {"name":"Eye Dashed","viewBox":[0,0,24,24],"paths":["M13.054 18.946a11 11 0 0 1-2.11 0","M13.054 5.054a11 11 0 0 0-2.11-.001","M17.072 6.274a11 11 0 0 1 1.753 1.173","M18.825 16.552a11 11 0 0 1-1.753 1.174","M2.514 13.303a11 11 0 0 1-.452-.954 1 1 0 0 1 0-.697 11 11 0 0 1 .45-.955","M21.485 10.697a11 11 0 0 1 .453.955 1 1 0 0 1 0 .697 11 11 0 0 1-.453.954","M5.173 7.448a11 11 0 0 1 1.753-1.174","M6.926 17.726a11 11 0 0 1-1.753-1.174","M 9 12 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0"],"stroke":true},
  "eye-off": {"name":"Eye Off","viewBox":[0,0,24,24],"paths":["M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49","M14.084 14.158a3 3 0 0 1-4.242-4.242","M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143","m2 2 20 20"],"stroke":true},
  "face-angry": {"name":"Face Angry","viewBox":[0,0,24,24],"paths":["M15 12v-1.584","M17 10a5 5 0 00-3 1","M7 10a5 5 0 013 1","M9 12v-1.584","M9 17a5 5 0 016.001 0","M 2 12 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0"],"stroke":true},
  "face-expressionless": {"name":"Face Expressionless","viewBox":[0,0,24,24],"paths":["M14 10h2","M8 10h2","M8 16h8","M 2 12 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0"],"stroke":true},
  "face-grinning": {"name":"Face Grinning","viewBox":[0,0,24,24],"paths":["M15 10V9","M7.084 14.302a5.12 5.12 0 009.833 0 .24.24 0 00-.235-.302H7.32a.24.24 0 00-.235.302","M9 10V9","M 2 12 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0"],"stroke":true},
  "face-neutral": {"name":"Face Neutral","viewBox":[0,0,24,24],"paths":["M15 10V9","M8 16h8","M9 10V9","M 2 12 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0"],"stroke":true},
  "face-slightly-frowning": {"name":"Face Slightly Frowning","viewBox":[0,0,24,24],"paths":["M15 10V9","M9 10V9","M9 16a5 5 0 016 0","M 2 12 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0"],"stroke":true},
  "face-slightly-smiling": {"name":"Face Slightly Smiling","viewBox":[0,0,24,24],"paths":["M15 10V9","M16.472 15a6 6 0 01-8.943 0","M9 10V9","M 2 12 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0"],"stroke":true},
  "face-slightly-smiling-plus": {"name":"Face Slightly Smiling Plus","viewBox":[0,0,24,24],"paths":["M13.267 2.08a10 10 0 108.653 8.653","M15 10V9","M16 5h6","M16.472 15a6 6 0 01-8.943 0","M19 2v6","M9 10V9"],"stroke":true},
  "factory": {"name":"Factory","viewBox":[0,0,24,24],"paths":["M12 16h.01","M16 16h.01","M3 19a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.5a.5.5 0 0 0-.769-.422l-4.462 2.844A.5.5 0 0 1 15 10.5v-2a.5.5 0 0 0-.769-.422L9.77 10.922A.5.5 0 0 1 9 10.5V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z","M8 16h.01"],"stroke":true},
  "fan": {"name":"Fan","viewBox":[0,0,24,24],"paths":["M10.827 16.379a6.082 6.082 0 0 1-8.618-7.002l5.412 1.45a6.082 6.082 0 0 1 7.002-8.618l-1.45 5.412a6.082 6.082 0 0 1 8.618 7.002l-5.412-1.45a6.082 6.082 0 0 1-7.002 8.618l1.45-5.412Z","M12 12v.01"],"stroke":true},
  "fast-forward": {"name":"Fast Forward","viewBox":[0,0,24,24],"paths":["M12 6a2 2 0 0 1 3.414-1.414l6 6a2 2 0 0 1 0 2.828l-6 6A2 2 0 0 1 12 18z","M2 6a2 2 0 0 1 3.414-1.414l6 6a2 2 0 0 1 0 2.828l-6 6A2 2 0 0 1 2 18z"],"stroke":true},
  "faucet": {"name":"Faucet","viewBox":[0,0,24,24],"paths":["M10.083 5.428 5.57 4.083a2 2 0 10.001 3.834l4.512-1.345","M12 8v3","m13.917 5.428 4.511-1.345a2 2 0 110 3.834l-4.51-1.345","M18 17v-4.006","M22 11v8","M22 12h-3a1 1 0 00-1 .994h-2.539a4 4 0 00-6.915-.012L7 13a5 5 0 00-5 5v1a1 1 0 001 1h2a1 1 0 001-1v-1a1 1 0 01.995-1l1.552.018a4 4 0 006.907 0L18 17a1 1 0 001 1h3","M 10 6 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0"],"stroke":true},
  "feather": {"name":"Feather","viewBox":[0,0,24,24],"paths":["M14.086 18.412A2 2 0 0112.67 19H5v-7.672a2 2 0 01.586-1.414L11.75 3.75a6 6 0 118.49 8.49z","M16 8 2 22","M17.488 15H9"],"stroke":true},
  "fence": {"name":"Fence","viewBox":[0,0,24,24],"paths":["M4 3 2 5v15c0 .6.4 1 1 1h2c.6 0 1-.4 1-1V5Z","M6 8h4","M6 18h4","m12 3-2 2v15c0 .6.4 1 1 1h2c.6 0 1-.4 1-1V5Z","M14 8h4","M14 18h4","m20 3-2 2v15c0 .6.4 1 1 1h2c.6 0 1-.4 1-1V5Z"],"stroke":true},
  "ferris-wheel": {"name":"Ferris Wheel","viewBox":[0,0,24,24],"paths":["M 10 12 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0","M12 2v4","m6.8 15-3.5 2","m20.7 7-3.5 2","M6.8 9 3.3 7","m20.7 17-3.5-2","m9 22 3-8 3 8","M8 22h8","M18 18.7a9 9 0 1 0-12 0"],"stroke":true},
  "file": {"name":"File","viewBox":[0,0,24,24],"paths":["M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z","M14 2v5a1 1 0 0 0 1 1h5"],"stroke":true},
  "file-archive": {"name":"File Archive","viewBox":[0,0,24,24],"paths":["M13.659 22H18a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v11.5","M14 2v5a1 1 0 0 0 1 1h5","M8 12v-1","M8 18v-2","M8 7V6","M 6 20 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0"],"stroke":true},
  "file-audio": {"name":"File Audio","viewBox":[0,0,24,24],"paths":["M4 6.835V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2h-.343","M14 2v5a1 1 0 0 0 1 1h5","M2 19a2 2 0 0 1 4 0v1a2 2 0 0 1-4 0v-4a6 6 0 0 1 12 0v4a2 2 0 0 1-4 0v-1a2 2 0 0 1 4 0"],"stroke":true},
  "file-audio-2": {"name":"File Audio 2","viewBox":[0,0,24,24],"paths":["M4 6.835V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2h-.343","M14 2v5a1 1 0 0 0 1 1h5","M2 19a2 2 0 0 1 4 0v1a2 2 0 0 1-4 0v-4a6 6 0 0 1 12 0v4a2 2 0 0 1-4 0v-1a2 2 0 0 1 4 0"],"stroke":true},
  "file-axis-3-d": {"name":"File Axis 3 D","viewBox":[0,0,24,24],"paths":["M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z","M14 2v5a1 1 0 0 0 1 1h5","m8 18 4-4","M8 10v8h8"],"stroke":true},
  "file-axis-3d": {"name":"File Axis 3d","viewBox":[0,0,24,24],"paths":["M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z","M14 2v5a1 1 0 0 0 1 1h5","m8 18 4-4","M8 10v8h8"],"stroke":true},
  "file-badge": {"name":"File Badge","viewBox":[0,0,24,24],"paths":["M13 22h5a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v3.3","M14 2v5a1 1 0 0 0 1 1h5","m7.69 16.479 1.29 4.88a.5.5 0 0 1-.698.591l-1.843-.849a1 1 0 0 0-.879.001l-1.846.85a.5.5 0 0 1-.692-.593l1.29-4.88","M 3 14 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0"],"stroke":true},
  "file-badge-2": {"name":"File Badge 2","viewBox":[0,0,24,24],"paths":["M13 22h5a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v3.3","M14 2v5a1 1 0 0 0 1 1h5","m7.69 16.479 1.29 4.88a.5.5 0 0 1-.698.591l-1.843-.849a1 1 0 0 0-.879.001l-1.846.85a.5.5 0 0 1-.692-.593l1.29-4.88","M 3 14 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0"],"stroke":true},
  "file-bar-chart": {"name":"File Bar Chart","viewBox":[0,0,24,24],"paths":["M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z","M14 2v5a1 1 0 0 0 1 1h5","M8 18v-2","M12 18v-4","M16 18v-6"],"stroke":true},
  "file-bar-chart-2": {"name":"File Bar Chart 2","viewBox":[0,0,24,24],"paths":["M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z","M14 2v5a1 1 0 0 0 1 1h5","M8 18v-1","M12 18v-6","M16 18v-3"],"stroke":true},
  "file-box": {"name":"File Box","viewBox":[0,0,24,24],"paths":["M14 2v5a1 1 0 001 1h5","M14.692 22H18a2 2 0 002-2V8a2.4 2.4 0 00-.706-1.706l-3.588-3.588A2.4 2.4 0 0014 2H6a2 2 0 00-2 2v3.804","M2.264 13.752 7 16.5l4.737-2.748","M2.995 13.014A2 2 0 002 14.744v3.516a2 2 0 00.996 1.73l3 1.74a2 2 0 002.008 0l3-1.74A2 2 0 0012 18.26v-3.517a2 2 0 00-.995-1.73l-3-1.742a2 2 0 00-1.892-.064z","M7 16.5V22"],"stroke":true},
  "file-braces": {"name":"File Braces","viewBox":[0,0,24,24],"paths":["M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z","M14 2v5a1 1 0 0 0 1 1h5","M10 12a1 1 0 0 0-1 1v1a1 1 0 0 1-1 1 1 1 0 0 1 1 1v1a1 1 0 0 0 1 1","M14 18a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1 1 1 0 0 1-1-1v-1a1 1 0 0 0-1-1"],"stroke":true},
  "file-braces-corner": {"name":"File Braces Corner","viewBox":[0,0,24,24],"paths":["M14 22h4a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v6","M14 2v5a1 1 0 0 0 1 1h5","M5 14a1 1 0 0 0-1 1v2a1 1 0 0 1-1 1 1 1 0 0 1 1 1v2a1 1 0 0 0 1 1","M9 22a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1 1 1 0 0 1-1-1v-2a1 1 0 0 0-1-1"],"stroke":true},
  "file-chart-column": {"name":"File Chart Column","viewBox":[0,0,24,24],"paths":["M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z","M14 2v5a1 1 0 0 0 1 1h5","M8 18v-1","M12 18v-6","M16 18v-3"],"stroke":true},
  "file-chart-column-increasing": {"name":"File Chart Column Increasing","viewBox":[0,0,24,24],"paths":["M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z","M14 2v5a1 1 0 0 0 1 1h5","M8 18v-2","M12 18v-4","M16 18v-6"],"stroke":true},
  "file-chart-line": {"name":"File Chart Line","viewBox":[0,0,24,24],"paths":["M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z","M14 2v5a1 1 0 0 0 1 1h5","m16 13-3.5 3.5-2-2L8 17"],"stroke":true},
  "file-chart-pie": {"name":"File Chart Pie","viewBox":[0,0,24,24],"paths":["M15.941 22H18a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.704l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v3.512","M14 2v5a1 1 0 0 0 1 1h5","M4.017 11.512a6 6 0 1 0 8.466 8.475","M9 16a1 1 0 0 1-1-1v-4c0-.552.45-1.008.995-.917a6 6 0 0 1 4.922 4.922c.091.544-.365.995-.917.995z"],"stroke":true},
  "file-check": {"name":"File Check","viewBox":[0,0,24,24],"paths":["M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z","M14 2v5a1 1 0 0 0 1 1h5","m9 15 2 2 4-4"],"stroke":true},
  "file-check-2": {"name":"File Check 2","viewBox":[0,0,24,24],"paths":["M10.5 22H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v6","M14 2v5a1 1 0 0 0 1 1h5","m14 20 2 2 4-4"],"stroke":true},
  "file-check-corner": {"name":"File Check Corner","viewBox":[0,0,24,24],"paths":["M10.5 22H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v6","M14 2v5a1 1 0 0 0 1 1h5","m14 20 2 2 4-4"],"stroke":true},
  "file-clock": {"name":"File Clock","viewBox":[0,0,24,24],"paths":["M16 22h2a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v2.85","M14 2v5a1 1 0 0 0 1 1h5","M8 14v2.2l1.6 1","M 2 16 a 6 6 0 1 0 12 0 a 6 6 0 1 0 -12 0"],"stroke":true},
  "file-code": {"name":"File Code","viewBox":[0,0,24,24],"paths":["M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z","M14 2v5a1 1 0 0 0 1 1h5","M10 12.5 8 15l2 2.5","m14 12.5 2 2.5-2 2.5"],"stroke":true},
  "file-code-2": {"name":"File Code 2","viewBox":[0,0,24,24],"paths":["M4 12.15V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2h-3.35","M14 2v5a1 1 0 0 0 1 1h5","m5 16-3 3 3 3","m9 22 3-3-3-3"],"stroke":true},
  "file-code-corner": {"name":"File Code Corner","viewBox":[0,0,24,24],"paths":["M4 12.15V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2h-3.35","M14 2v5a1 1 0 0 0 1 1h5","m5 16-3 3 3 3","m9 22 3-3-3-3"],"stroke":true},
  "file-cog": {"name":"File Cog","viewBox":[0,0,24,24],"paths":["M15 8a1 1 0 0 1-1-1V2a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8z","M20 8v12a2 2 0 0 1-2 2h-4.182","m3.305 19.53.923-.382","M4 10.592V4a2 2 0 0 1 2-2h8","m4.228 16.852-.924-.383","m5.852 15.228-.383-.923","m5.852 20.772-.383.924","m8.148 15.228.383-.923","m8.53 21.696-.382-.924","m9.773 16.852.922-.383","m9.773 19.148.922.383","M 4 18 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0"],"stroke":true},
  "file-cog-2": {"name":"File Cog 2","viewBox":[0,0,24,24],"paths":["M15 8a1 1 0 0 1-1-1V2a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8z","M20 8v12a2 2 0 0 1-2 2h-4.182","m3.305 19.53.923-.382","M4 10.592V4a2 2 0 0 1 2-2h8","m4.228 16.852-.924-.383","m5.852 15.228-.383-.923","m5.852 20.772-.383.924","m8.148 15.228.383-.923","m8.53 21.696-.382-.924","m9.773 16.852.922-.383","m9.773 19.148.922.383","M 4 18 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0"],"stroke":true},
  "file-diff": {"name":"File Diff","viewBox":[0,0,24,24],"paths":["M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z","M9 10h6","M12 13V7","M9 17h6"],"stroke":true},
  "file-digit": {"name":"File Digit","viewBox":[0,0,24,24],"paths":["M4 12V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2","M14 2v5a1 1 0 0 0 1 1h5","M10 16h2v6","M10 22h4","M 2 16 h 4 v 6 h -4 z"],"stroke":true},
  "file-down": {"name":"File Down","viewBox":[0,0,24,24],"paths":["M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z","M14 2v5a1 1 0 0 0 1 1h5","M12 18v-6","m9 15 3 3 3-3"],"stroke":true},
  "file-edit": {"name":"File Edit","viewBox":[0,0,24,24],"paths":["M12.659 22H18a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v9.34","M14 2v5a1 1 0 0 0 1 1h5","M10.378 12.622a1 1 0 0 1 3 3.003L8.36 20.637a2 2 0 0 1-.854.506l-2.867.837a.5.5 0 0 1-.62-.62l.836-2.869a2 2 0 0 1 .506-.853z"],"stroke":true},
  "file-exclamation-point": {"name":"File Exclamation Point","viewBox":[0,0,24,24],"paths":["M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z","M12 9v4","M12 17h.01"],"stroke":true},
  "file-headphone": {"name":"File Headphone","viewBox":[0,0,24,24],"paths":["M4 6.835V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2h-.343","M14 2v5a1 1 0 0 0 1 1h5","M2 19a2 2 0 0 1 4 0v1a2 2 0 0 1-4 0v-4a6 6 0 0 1 12 0v4a2 2 0 0 1-4 0v-1a2 2 0 0 1 4 0"],"stroke":true},
  "file-heart": {"name":"File Heart","viewBox":[0,0,24,24],"paths":["M13 22h5a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v7","M14 2v5a1 1 0 0 0 1 1h5","M3.62 18.8A2.25 2.25 0 1 1 7 15.836a2.25 2.25 0 1 1 3.38 2.966l-2.626 2.856a1 1 0 0 1-1.507 0z"],"stroke":true},
  "file-image": {"name":"File Image","viewBox":[0,0,24,24],"paths":["M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z","M14 2v5a1 1 0 0 0 1 1h5","M 8 12 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0","m20 17-1.296-1.296a2.41 2.41 0 0 0-3.408 0L9 22"],"stroke":true},
  "file-input": {"name":"File Input","viewBox":[0,0,24,24],"paths":["M4 11V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-1","M14 2v5a1 1 0 0 0 1 1h5","M2 15h10","m9 18 3-3-3-3"],"stroke":true},
  "file-json": {"name":"File Json","viewBox":[0,0,24,24],"paths":["M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z","M14 2v5a1 1 0 0 0 1 1h5","M10 12a1 1 0 0 0-1 1v1a1 1 0 0 1-1 1 1 1 0 0 1 1 1v1a1 1 0 0 0 1 1","M14 18a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1 1 1 0 0 1-1-1v-1a1 1 0 0 0-1-1"],"stroke":true},
  "file-json-2": {"name":"File Json 2","viewBox":[0,0,24,24],"paths":["M14 22h4a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v6","M14 2v5a1 1 0 0 0 1 1h5","M5 14a1 1 0 0 0-1 1v2a1 1 0 0 1-1 1 1 1 0 0 1 1 1v2a1 1 0 0 0 1 1","M9 22a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1 1 1 0 0 1-1-1v-2a1 1 0 0 0-1-1"],"stroke":true},
  "file-key": {"name":"File Key","viewBox":[0,0,24,24],"paths":["M14 2v5a1 1 0 0 0 1 1h5","M4 12v6","M4 14h2","M9.65 22H18a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v4","M 2 20 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0"],"stroke":true},
  "file-key-2": {"name":"File Key 2","viewBox":[0,0,24,24],"paths":["M14 2v5a1 1 0 0 0 1 1h5","M4 12v6","M4 14h2","M9.65 22H18a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v4","M 2 20 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0"],"stroke":true},
  "file-line-chart": {"name":"File Line Chart","viewBox":[0,0,24,24],"paths":["M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z","M14 2v5a1 1 0 0 0 1 1h5","m16 13-3.5 3.5-2-2L8 17"],"stroke":true},
  "file-lock": {"name":"File Lock","viewBox":[0,0,24,24],"paths":["M4 9.8V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2h-3","M14 2v5a1 1 0 0 0 1 1h5","M9 17v-2a2 2 0 0 0-4 0v2","M 3 17 h 8 v 5 h -8 z"],"stroke":true},
  "file-lock-2": {"name":"File Lock 2","viewBox":[0,0,24,24],"paths":["M4 9.8V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2h-3","M14 2v5a1 1 0 0 0 1 1h5","M9 17v-2a2 2 0 0 0-4 0v2","M 3 17 h 8 v 5 h -8 z"],"stroke":true},
  "file-minus": {"name":"File Minus","viewBox":[0,0,24,24],"paths":["M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z","M14 2v5a1 1 0 0 0 1 1h5","M9 15h6"],"stroke":true},
  "file-minus-2": {"name":"File Minus 2","viewBox":[0,0,24,24],"paths":["M20 14V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12","M14 2v5a1 1 0 0 0 1 1h5","M14 18h6"],"stroke":true},
  "file-minus-corner": {"name":"File Minus Corner","viewBox":[0,0,24,24],"paths":["M20 14V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12","M14 2v5a1 1 0 0 0 1 1h5","M14 18h6"],"stroke":true},
  "file-music": {"name":"File Music","viewBox":[0,0,24,24],"paths":["M11.65 22H18a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v10.35","M14 2v5a1 1 0 0 0 1 1h5","M8 20v-7l3 1.474","M 4 20 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0"],"stroke":true},
  "file-output": {"name":"File Output","viewBox":[0,0,24,24],"paths":["M4.226 20.925A2 2 0 0 0 6 22h12a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v3.127","M14 2v5a1 1 0 0 0 1 1h5","m5 11-3 3","m5 17-3-3h10"],"stroke":true},
  "file-pen": {"name":"File Pen","viewBox":[0,0,24,24],"paths":["M12.659 22H18a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v9.34","M14 2v5a1 1 0 0 0 1 1h5","M10.378 12.622a1 1 0 0 1 3 3.003L8.36 20.637a2 2 0 0 1-.854.506l-2.867.837a.5.5 0 0 1-.62-.62l.836-2.869a2 2 0 0 1 .506-.853z"],"stroke":true},
  "file-pen-line": {"name":"File Pen Line","viewBox":[0,0,24,24],"paths":["M14.364 13.634a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506l4.013-4.009a1 1 0 0 0-3.004-3.004z","M14.487 7.858A1 1 0 0 1 14 7V2","M20 19.645V20a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l2.516 2.516","M8 18h1"],"stroke":true},
  "file-pie-chart": {"name":"File Pie Chart","viewBox":[0,0,24,24],"paths":["M15.941 22H18a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.704l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v3.512","M14 2v5a1 1 0 0 0 1 1h5","M4.017 11.512a6 6 0 1 0 8.466 8.475","M9 16a1 1 0 0 1-1-1v-4c0-.552.45-1.008.995-.917a6 6 0 0 1 4.922 4.922c.091.544-.365.995-.917.995z"],"stroke":true},
  "file-play": {"name":"File Play","viewBox":[0,0,24,24],"paths":["M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z","M14 2v5a1 1 0 0 0 1 1h5","M15.033 13.44a.647.647 0 0 1 0 1.12l-4.065 2.352a.645.645 0 0 1-.968-.56v-4.704a.645.645 0 0 1 .967-.56z"],"stroke":true},
  "file-plus": {"name":"File Plus","viewBox":[0,0,24,24],"paths":["M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z","M14 2v5a1 1 0 0 0 1 1h5","M9 15h6","M12 18v-6"],"stroke":true},
  "file-plus-2": {"name":"File Plus 2","viewBox":[0,0,24,24],"paths":["M11.35 22H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v5.35","M14 2v5a1 1 0 0 0 1 1h5","M14 19h6","M17 16v6"],"stroke":true},
  "file-plus-corner": {"name":"File Plus Corner","viewBox":[0,0,24,24],"paths":["M11.35 22H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v5.35","M14 2v5a1 1 0 0 0 1 1h5","M14 19h6","M17 16v6"],"stroke":true},
  "file-question": {"name":"File Question","viewBox":[0,0,24,24],"paths":["M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z","M12 17h.01","M9.1 9a3 3 0 0 1 5.82 1c0 2-3 3-3 3"],"stroke":true},
  "file-question-mark": {"name":"File Question Mark","viewBox":[0,0,24,24],"paths":["M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z","M12 17h.01","M9.1 9a3 3 0 0 1 5.82 1c0 2-3 3-3 3"],"stroke":true},
  "file-scan": {"name":"File Scan","viewBox":[0,0,24,24],"paths":["M20 10V8a2.4 2.4 0 0 0-.706-1.704l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h4.35","M14 2v5a1 1 0 0 0 1 1h5","M16 14a2 2 0 0 0-2 2","M16 22a2 2 0 0 1-2-2","M20 14a2 2 0 0 1 2 2","M20 22a2 2 0 0 0 2-2"],"stroke":true},
  "file-search": {"name":"File Search","viewBox":[0,0,24,24],"paths":["M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z","M14 2v5a1 1 0 0 0 1 1h5","M 9 14.5 a 2.5 2.5 0 1 0 5 0 a 2.5 2.5 0 1 0 -5 0","M13.3 16.3 15 18"],"stroke":true},
  "file-search-2": {"name":"File Search 2","viewBox":[0,0,24,24],"paths":["M11.1 22H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.589 3.588A2.4 2.4 0 0 1 20 8v3.25","M14 2v5a1 1 0 0 0 1 1h5","m21 22-2.88-2.88","M 13 17 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0"],"stroke":true},
  "file-search-corner": {"name":"File Search Corner","viewBox":[0,0,24,24],"paths":["M11.1 22H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.589 3.588A2.4 2.4 0 0 1 20 8v3.25","M14 2v5a1 1 0 0 0 1 1h5","m21 22-2.88-2.88","M 13 17 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0"],"stroke":true},
  "file-signal": {"name":"File Signal","viewBox":[0,0,24,24],"paths":["M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z","M14 2v5a1 1 0 0 0 1 1h5","M8 15h.01","M11.5 13.5a2.5 2.5 0 0 1 0 3","M15 12a5 5 0 0 1 0 6"],"stroke":true},
  "file-signature": {"name":"File Signature","viewBox":[0,0,24,24],"paths":["M14.364 13.634a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506l4.013-4.009a1 1 0 0 0-3.004-3.004z","M14.487 7.858A1 1 0 0 1 14 7V2","M20 19.645V20a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l2.516 2.516","M8 18h1"],"stroke":true},
  "file-sliders": {"name":"File Sliders","viewBox":[0,0,24,24],"paths":["M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z","M14 2v5a1 1 0 0 0 1 1h5","M8 12h8","M10 11v2","M8 17h8","M14 16v2"],"stroke":true},
  "file-spreadsheet": {"name":"File Spreadsheet","viewBox":[0,0,24,24],"paths":["M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z","M14 2v5a1 1 0 0 0 1 1h5","M8 13h2","M14 13h2","M8 17h2","M14 17h2"],"stroke":true},
  "file-stack": {"name":"File Stack","viewBox":[0,0,24,24],"paths":["M11 21a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1","M16 16a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1","M21 6a2 2 0 0 0-.586-1.414l-2-2A2 2 0 0 0 17 2h-3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1z"],"stroke":true},
  "file-symlink": {"name":"File Symlink","viewBox":[0,0,24,24],"paths":["M4 11V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h7","M14 2v5a1 1 0 0 0 1 1h5","m10 18 3-3-3-3"],"stroke":true},
  "file-terminal": {"name":"File Terminal","viewBox":[0,0,24,24],"paths":["M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z","M14 2v5a1 1 0 0 0 1 1h5","m8 16 2-2-2-2","M12 18h4"],"stroke":true},
  "file-text": {"name":"File Text","viewBox":[0,0,24,24],"paths":["M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z","M14 2v5a1 1 0 0 0 1 1h5","M10 9H8","M16 13H8","M16 17H8"],"stroke":true},
  "file-type": {"name":"File Type","viewBox":[0,0,24,24],"paths":["M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z","M14 2v5a1 1 0 0 0 1 1h5","M11 18h2","M12 12v6","M9 13v-.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5v.5"],"stroke":true},
  "file-type-2": {"name":"File Type 2","viewBox":[0,0,24,24],"paths":["M12 22h6a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v6","M14 2v5a1 1 0 0 0 1 1h5","M3 16v-1.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5V16","M6 22h2","M7 14v8"],"stroke":true},
  "file-type-corner": {"name":"File Type Corner","viewBox":[0,0,24,24],"paths":["M12 22h6a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v6","M14 2v5a1 1 0 0 0 1 1h5","M3 16v-1.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5V16","M6 22h2","M7 14v8"],"stroke":true},
  "file-up": {"name":"File Up","viewBox":[0,0,24,24],"paths":["M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z","M14 2v5a1 1 0 0 0 1 1h5","M12 12v6","m15 15-3-3-3 3"],"stroke":true},
  "file-user": {"name":"File User","viewBox":[0,0,24,24],"paths":["M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z","M14 2v5a1 1 0 0 0 1 1h5","M16 22a4 4 0 0 0-8 0","M 9 15 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0"],"stroke":true},
  "file-video": {"name":"File Video","viewBox":[0,0,24,24],"paths":["M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z","M14 2v5a1 1 0 0 0 1 1h5","M15.033 13.44a.647.647 0 0 1 0 1.12l-4.065 2.352a.645.645 0 0 1-.968-.56v-4.704a.645.645 0 0 1 .967-.56z"],"stroke":true},
  "file-video-2": {"name":"File Video 2","viewBox":[0,0,24,24],"paths":["M4 12V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2","M14 2v5a1 1 0 0 0 1 1h5","m10 17.843 3.033-1.755a.64.64 0 0 1 .967.56v4.704a.65.65 0 0 1-.967.56L10 20.157","M 3 16 h 7 v 6 h -7 z"],"stroke":true},
  "file-video-camera": {"name":"File Video Camera","viewBox":[0,0,24,24],"paths":["M4 12V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2","M14 2v5a1 1 0 0 0 1 1h5","m10 17.843 3.033-1.755a.64.64 0 0 1 .967.56v4.704a.65.65 0 0 1-.967.56L10 20.157","M 3 16 h 7 v 6 h -7 z"],"stroke":true},
  "file-volume": {"name":"File Volume","viewBox":[0,0,24,24],"paths":["M4 11.55V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2h-1.95","M14 2v5a1 1 0 0 0 1 1h5","M12 15a5 5 0 0 1 0 6","M8 14.502a.5.5 0 0 0-.826-.381l-1.893 1.631a1 1 0 0 1-.651.243H3.5a.5.5 0 0 0-.5.501v3.006a.5.5 0 0 0 .5.501h1.129a1 1 0 0 1 .652.243l1.893 1.633a.5.5 0 0 0 .826-.38z"],"stroke":true},
  "file-volume-2": {"name":"File Volume 2","viewBox":[0,0,24,24],"paths":["M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z","M14 2v5a1 1 0 0 0 1 1h5","M8 15h.01","M11.5 13.5a2.5 2.5 0 0 1 0 3","M15 12a5 5 0 0 1 0 6"],"stroke":true},
  "file-warning": {"name":"File Warning","viewBox":[0,0,24,24],"paths":["M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z","M12 9v4","M12 17h.01"],"stroke":true},
  "file-x": {"name":"File X","viewBox":[0,0,24,24],"paths":["M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z","M14 2v5a1 1 0 0 0 1 1h5","m14.5 12.5-5 5","m9.5 12.5 5 5"],"stroke":true},
  "file-x-2": {"name":"File X 2","viewBox":[0,0,24,24],"paths":["M11 22H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v5","M14 2v5a1 1 0 0 0 1 1h5","m15 17 5 5","m20 17-5 5"],"stroke":true},
  "file-x-corner": {"name":"File X Corner","viewBox":[0,0,24,24],"paths":["M11 22H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v5","M14 2v5a1 1 0 0 0 1 1h5","m15 17 5 5","m20 17-5 5"],"stroke":true},
  "files": {"name":"Files","viewBox":[0,0,24,24],"paths":["M15 2h-4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8","M16.706 2.706A2.4 2.4 0 0 0 15 2v5a1 1 0 0 0 1 1h5a2.4 2.4 0 0 0-.706-1.706z","M5 7a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h8a2 2 0 0 0 1.732-1"],"stroke":true},
  "film": {"name":"Film","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","M7 3v18","M3 7.5h4","M3 12h18","M3 16.5h4","M17 3v18","M17 7.5h4","M17 16.5h4"],"stroke":true},
  "filter": {"name":"Filter","viewBox":[0,0,24,24],"paths":["M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z"],"stroke":true},
  "filter-x": {"name":"Filter X","viewBox":[0,0,24,24],"paths":["M12.531 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14v6a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341l.427-.473","m16.5 3.5 5 5","m21.5 3.5-5 5"],"stroke":true},
  "fingerprint": {"name":"Fingerprint","viewBox":[0,0,24,24],"paths":["M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4","M14 13.12c0 2.38 0 6.38-1 8.88","M17.29 21.02c.12-.6.43-2.3.5-3.02","M2 12a10 10 0 0 1 18-6","M2 16h.01","M21.8 16c.2-2 .131-5.354 0-6","M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2","M8.65 22c.21-.66.45-1.32.57-2","M9 6.8a6 6 0 0 1 9 5.2v2"],"stroke":true},
  "fingerprint-pattern": {"name":"Fingerprint Pattern","viewBox":[0,0,24,24],"paths":["M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4","M14 13.12c0 2.38 0 6.38-1 8.88","M17.29 21.02c.12-.6.43-2.3.5-3.02","M2 12a10 10 0 0 1 18-6","M2 16h.01","M21.8 16c.2-2 .131-5.354 0-6","M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2","M8.65 22c.21-.66.45-1.32.57-2","M9 6.8a6 6 0 0 1 9 5.2v2"],"stroke":true},
  "fire-extinguisher": {"name":"Fire Extinguisher","viewBox":[0,0,24,24],"paths":["M15 6.5V3a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v3.5","M9 18h8","M18 3h-3","M11 3a6 6 0 0 0-6 6v11","M5 13h4","M17 10a4 4 0 0 0-8 0v10a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2Z"],"stroke":true},
  "fish": {"name":"Fish","viewBox":[0,0,24,24],"paths":["M6.5 12c.94-3.46 4.94-6 8.5-6 3.56 0 6.06 2.54 7 6-.94 3.47-3.44 6-7 6s-7.56-2.53-8.5-6Z","M18 12v.5","M16 17.93a9.77 9.77 0 0 1 0-11.86","M7 10.67C7 8 5.58 5.97 2.73 5.5c-1 1.5-1 5 .23 6.5-1.24 1.5-1.24 5-.23 6.5C5.58 18.03 7 16 7 13.33","M10.46 7.26C10.2 5.88 9.17 4.24 8 3h5.8a2 2 0 0 1 1.98 1.67l.23 1.4","m16.01 17.93-.23 1.4A2 2 0 0 1 13.8 21H9.5a5.96 5.96 0 0 0 1.49-3.98"],"stroke":true},
  "fish-off": {"name":"Fish Off","viewBox":[0,0,24,24],"paths":["M18 12.47v.03m0-.5v.47m-.475 5.056A6.744 6.744 0 0 1 15 18c-3.56 0-7.56-2.53-8.5-6 .348-1.28 1.114-2.433 2.121-3.38m3.444-2.088A8.802 8.802 0 0 1 15 6c3.56 0 6.06 2.54 7 6-.309 1.14-.786 2.177-1.413 3.058","M7 10.67C7 8 5.58 5.97 2.73 5.5c-1 1.5-1 5 .23 6.5-1.24 1.5-1.24 5-.23 6.5C5.58 18.03 7 16 7 13.33m7.48-4.372A9.77 9.77 0 0 1 16 6.07m0 11.86a9.77 9.77 0 0 1-1.728-3.618","m16.01 17.93-.23 1.4A2 2 0 0 1 13.8 21H9.5a5.96 5.96 0 0 0 1.49-3.98M8.53 3h5.27a2 2 0 0 1 1.98 1.67l.23 1.4M2 2l20 20"],"stroke":true},
  "fish-symbol": {"name":"Fish Symbol","viewBox":[0,0,24,24],"paths":["M2 16s9-15 20-4C11 23 2 8 2 8"],"stroke":true},
  "fishing-hook": {"name":"Fishing Hook","viewBox":[0,0,24,24],"paths":["m17.586 11.414-5.93 5.93a1 1 0 0 1-8-8l3.137-3.137a.707.707 0 0 1 1.207.5V10","M20.414 8.586 22 7","M 17 10 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0"],"stroke":true},
  "fishing-rod": {"name":"Fishing Rod","viewBox":[0,0,24,24],"paths":["M4 11h1","M8 15a2 2 0 0 1-4 0V3a1 1 0 0 1 1-1h.5C14 2 20 9 20 18v4","M 16 18 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0"],"stroke":true},
  "flag": {"name":"Flag","viewBox":[0,0,24,24],"paths":["M4 22V4a1 1 0 0 1 .4-.8A6 6 0 0 1 8 2c3 0 5 2 7.333 2q2 0 3.067-.8A1 1 0 0 1 20 4v10a1 1 0 0 1-.4.8A6 6 0 0 1 16 16c-3 0-5-2-8-2a6 6 0 0 0-4 1.528"],"stroke":true},
  "flag-off": {"name":"Flag Off","viewBox":[0,0,24,24],"paths":["M16 16c-3 0-5-2-8-2a6 6 0 0 0-4 1.528","m2 2 20 20","M4 22V4","M7.656 2H8c3 0 5 2 7.333 2q2 0 3.067-.8A1 1 0 0 1 20 4v10.347"],"stroke":true},
  "flag-triangle-left": {"name":"Flag Triangle Left","viewBox":[0,0,24,24],"paths":["M18 22V2.8a.8.8 0 0 0-1.17-.71L5.45 7.78a.8.8 0 0 0 0 1.44L18 15.5"],"stroke":true},
  "flag-triangle-right": {"name":"Flag Triangle Right","viewBox":[0,0,24,24],"paths":["M6 22V2.8a.8.8 0 0 1 1.17-.71l11.38 5.69a.8.8 0 0 1 0 1.44L6 15.5"],"stroke":true},
  "flame": {"name":"Flame","viewBox":[0,0,24,24],"paths":["M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4"],"stroke":true},
  "flame-kindling": {"name":"Flame Kindling","viewBox":[0,0,24,24],"paths":["M12 2c1 3 2.5 3.5 3.5 4.5A5 5 0 0 1 17 10a5 5 0 1 1-10 0c0-.3 0-.6.1-.9a2 2 0 1 0 3.3-2C8 4.5 11 2 12 2Z","m5 22 14-4","m5 18 14 4"],"stroke":true},
  "flashlight": {"name":"Flashlight","viewBox":[0,0,24,24],"paths":["M12 13v1","M17 2a1 1 0 0 1 1 1v4a3 3 0 0 1-.6 1.8l-.6.8A4 4 0 0 0 16 12v8a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2v-8a4 4 0 0 0-.8-2.4l-.6-.8A3 3 0 0 1 6 7V3a1 1 0 0 1 1-1z","M6 6h12"],"stroke":true},
  "flashlight-off": {"name":"Flashlight Off","viewBox":[0,0,24,24],"paths":["M11.652 6H18","M12 13v1","M16 16v4a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-8a4 4 0 0 0-.8-2.4l-.6-.8A3 3 0 0 1 6 7V6","m2 2 20 20","M7.649 2H17a1 1 0 0 1 1 1v4a3 3 0 0 1-.6 1.8l-.6.8a4 4 0 0 0-.55 1.007"],"stroke":true},
  "flask-conical": {"name":"Flask Conical","viewBox":[0,0,24,24],"paths":["M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2","M6.453 15h11.094","M8.5 2h7"],"stroke":true},
  "flask-conical-off": {"name":"Flask Conical Off","viewBox":[0,0,24,24],"paths":["M10 2v2.343","M14 2v6.343","m2 2 20 20","M20 20a2 2 0 0 1-2 2H6a2 2 0 0 1-1.755-2.96l5.227-9.563","M6.453 15H15","M8.5 2h7"],"stroke":true},
  "flask-round": {"name":"Flask Round","viewBox":[0,0,24,24],"paths":["M10 2v6.292a7 7 0 1 0 4 0V2","M5 15h14","M8.5 2h7"],"stroke":true},
  "flip-horizontal": {"name":"Flip Horizontal","viewBox":[0,0,24,24],"paths":["M8 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h3","M16 3h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-3","M12 20v2","M12 14v2","M12 8v2","M12 2v2"],"stroke":true},
  "flip-horizontal-2": {"name":"Flip Horizontal 2","viewBox":[0,0,24,24],"paths":["M10 12H8","M16 12h-2","M22 12h-2","M4 12H2","M7.298 20.288A1 1 0 008 22h8a1 1 0 00.703-1.712l-3.991-3.99a1 1 0 00-1.424-.001z","M7.298 3.712A1 1 0 018 2h8a1 1 0 01.703 1.712l-3.991 3.99a1 1 0 01-1.424.001z"],"stroke":true},
  "flip-vertical": {"name":"Flip Vertical","viewBox":[0,0,24,24],"paths":["M21 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v3","M21 16v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3","M4 12H2","M10 12H8","M16 12h-2","M22 12h-2"],"stroke":true},
  "flip-vertical-2": {"name":"Flip Vertical 2","viewBox":[0,0,24,24],"paths":["M12 14v2","M12 20v2","M12 2v2","M12 8v2","M20.288 16.703A1 1 0 0022 16V8a1 1 0 00-1.712-.703l-3.99 3.991a1 1 0 00-.001 1.424z","M3.712 16.703A1 1 0 012 16V8a1 1 0 011.712-.703l3.99 3.991a1 1 0 01.001 1.424z"],"stroke":true},
  "flower": {"name":"Flower","viewBox":[0,0,24,24],"paths":["M 9 12 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0","M12 16.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 1 1 12 7.5a4.5 4.5 0 1 1 4.5 4.5 4.5 4.5 0 1 1-4.5 4.5","M12 7.5V9","M7.5 12H9","M16.5 12H15","M12 16.5V15","m8 8 1.88 1.88","M14.12 9.88 16 8","m8 16 1.88-1.88","M14.12 14.12 16 16"],"stroke":true},
  "flower-2": {"name":"Flower 2","viewBox":[0,0,24,24],"paths":["M12 5a3 3 0 1 1 3 3m-3-3a3 3 0 1 0-3 3m3-3v1M9 8a3 3 0 1 0 3 3M9 8h1m5 0a3 3 0 1 1-3 3m3-3h-1m-2 3v-1","M 10 8 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0","M12 10v12","M12 22c4.2 0 7-1.667 7-5-4.2 0-7 1.667-7 5Z","M12 22c-4.2 0-7-1.667-7-5 4.2 0 7 1.667 7 5Z"],"stroke":true},
  "focus": {"name":"Focus","viewBox":[0,0,24,24],"paths":["M 9 12 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0","M3 7V5a2 2 0 0 1 2-2h2","M17 3h2a2 2 0 0 1 2 2v2","M21 17v2a2 2 0 0 1-2 2h-2","M7 21H5a2 2 0 0 1-2-2v-2"],"stroke":true},
  "fold-horizontal": {"name":"Fold Horizontal","viewBox":[0,0,24,24],"paths":["M2 12h6","M22 12h-6","M12 2v2","M12 8v2","M12 14v2","M12 20v2","m19 9-3 3 3 3","m5 15 3-3-3-3"],"stroke":true},
  "fold-vertical": {"name":"Fold Vertical","viewBox":[0,0,24,24],"paths":["M12 22v-6","M12 8V2","M4 12H2","M10 12H8","M16 12h-2","M22 12h-2","m15 19-3-3-3 3","m15 5-3 3-3-3"],"stroke":true},
  "folder": {"name":"Folder","viewBox":[0,0,24,24],"paths":["M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"],"stroke":true},
  "folder-archive": {"name":"Folder Archive","viewBox":[0,0,24,24],"paths":["M 13 19 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0","M20.9 19.8A2 2 0 0 0 22 18V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h5.1","M15 11v-1","M15 17v-2"],"stroke":true},
  "folder-bookmark": {"name":"Folder Bookmark","viewBox":[0,0,24,24],"paths":["M12 6v7.751a.25.25 0 00.407.195l2.28-1.834a.5.5 0 01.627 0l2.28 1.834a.25.25 0 00.406-.195V6","M20 20a2 2 0 002-2V8a2 2 0 00-2-2h-7.9a2 2 0 01-1.69-.9L9.6 3.9A2 2 0 007.93 3H4a2 2 0 00-2 2v13a2 2 0 002 2z"],"stroke":true},
  "folder-check": {"name":"Folder Check","viewBox":[0,0,24,24],"paths":["M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z","m9 13 2 2 4-4"],"stroke":true},
  "folder-clock": {"name":"Folder Clock","viewBox":[0,0,24,24],"paths":["M16 14v2.2l1.6 1","M7 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2","M 10 16 a 6 6 0 1 0 12 0 a 6 6 0 1 0 -12 0"],"stroke":true},
  "folder-closed": {"name":"Folder Closed","viewBox":[0,0,24,24],"paths":["M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z","M2 10h20"],"stroke":true},
  "folder-code": {"name":"Folder Code","viewBox":[0,0,24,24],"paths":["M10 10.5 8 13l2 2.5","m14 10.5 2 2.5-2 2.5","M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2z"],"stroke":true},
  "folder-cog": {"name":"Folder Cog","viewBox":[0,0,24,24],"paths":["M10.3 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.98a2 2 0 0 1 1.69.9l.66 1.2A2 2 0 0 0 12 6h8a2 2 0 0 1 2 2v3.3","m14.305 19.53.923-.382","m15.228 16.852-.923-.383","m16.852 15.228-.383-.923","m16.852 20.772-.383.924","m19.148 15.228.383-.923","m19.53 21.696-.382-.924","m20.772 16.852.924-.383","m20.772 19.148.924.383","M 15 18 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0"],"stroke":true},
  "folder-cog-2": {"name":"Folder Cog 2","viewBox":[0,0,24,24],"paths":["M10.3 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.98a2 2 0 0 1 1.69.9l.66 1.2A2 2 0 0 0 12 6h8a2 2 0 0 1 2 2v3.3","m14.305 19.53.923-.382","m15.228 16.852-.923-.383","m16.852 15.228-.383-.923","m16.852 20.772-.383.924","m19.148 15.228.383-.923","m19.53 21.696-.382-.924","m20.772 16.852.924-.383","m20.772 19.148.924.383","M 15 18 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0"],"stroke":true},
  "folder-dot": {"name":"Folder Dot","viewBox":[0,0,24,24],"paths":["M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z","M 11 13 a 1 1 0 1 0 2 0 a 1 1 0 1 0 -2 0"],"stroke":true},
  "folder-down": {"name":"Folder Down","viewBox":[0,0,24,24],"paths":["M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z","M12 10v6","m15 13-3 3-3-3"],"stroke":true},
  "folder-edit": {"name":"Folder Edit","viewBox":[0,0,24,24],"paths":["M2 11.5V5a2 2 0 0 1 2-2h3.9c.7 0 1.3.3 1.7.9l.8 1.2c.4.6 1 .9 1.7.9H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-9.5","M11.378 13.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"],"stroke":true},
  "folder-git": {"name":"Folder Git","viewBox":[0,0,24,24],"paths":["M 10 13 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0","M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z","M14 13h3","M7 13h3"],"stroke":true},
  "folder-git-2": {"name":"Folder Git 2","viewBox":[0,0,24,24],"paths":["M18 19a5 5 0 0 1-5-5v8","M9 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v5","M 11 12 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0","M 18 19 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0"],"stroke":true},
  "folder-heart": {"name":"Folder Heart","viewBox":[0,0,24,24],"paths":["M10.638 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v3.417","M14.62 18.8A2.25 2.25 0 1 1 18 15.836a2.25 2.25 0 1 1 3.38 2.966l-2.626 2.856a.998.998 0 0 1-1.507 0z"],"stroke":true},
  "folder-input": {"name":"Folder Input","viewBox":[0,0,24,24],"paths":["M2 9V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-1","M2 13h10","m9 16 3-3-3-3"],"stroke":true},
  "folder-kanban": {"name":"Folder Kanban","viewBox":[0,0,24,24],"paths":["M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z","M8 10v4","M12 10v2","M16 10v6"],"stroke":true},
  "folder-key": {"name":"Folder Key","viewBox":[0,0,24,24],"paths":["M13 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v1.36","M19 12v6","M19 14h2","M 17 20 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0"],"stroke":true},
  "folder-lock": {"name":"Folder Lock","viewBox":[0,0,24,24],"paths":["M 14 17 h 8 v 5 h -8 z","M10 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v2.5","M20 17v-2a2 2 0 1 0-4 0v2"],"stroke":true},
  "folder-minus": {"name":"Folder Minus","viewBox":[0,0,24,24],"paths":["M9 13h6","M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"],"stroke":true},
  "folder-open": {"name":"Folder Open","viewBox":[0,0,24,24],"paths":["m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2"],"stroke":true},
  "folder-open-dot": {"name":"Folder Open Dot","viewBox":[0,0,24,24],"paths":["m6 14 1.45-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.55 6a2 2 0 0 1-1.94 1.5H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H18a2 2 0 0 1 2 2v2","M 13 15 a 1 1 0 1 0 2 0 a 1 1 0 1 0 -2 0"],"stroke":true},
  "folder-output": {"name":"Folder Output","viewBox":[0,0,24,24],"paths":["M2 7.5V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-1.5","M2 13h10","m5 10-3 3 3 3"],"stroke":true},
  "folder-pen": {"name":"Folder Pen","viewBox":[0,0,24,24],"paths":["M2 11.5V5a2 2 0 0 1 2-2h3.9c.7 0 1.3.3 1.7.9l.8 1.2c.4.6 1 .9 1.7.9H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-9.5","M11.378 13.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"],"stroke":true},
  "folder-plus": {"name":"Folder Plus","viewBox":[0,0,24,24],"paths":["M12 10v6","M9 13h6","M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"],"stroke":true},
  "folder-root": {"name":"Folder Root","viewBox":[0,0,24,24],"paths":["M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z","M 10 13 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0","M12 15v5"],"stroke":true},
  "folder-search": {"name":"Folder Search","viewBox":[0,0,24,24],"paths":["M10.7 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v4.1","m21 21-1.9-1.9","M 14 17 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0"],"stroke":true},
  "folder-search-2": {"name":"Folder Search 2","viewBox":[0,0,24,24],"paths":["M 9 12.5 a 2.5 2.5 0 1 0 5 0 a 2.5 2.5 0 1 0 -5 0","M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z","M13.3 14.3 15 16"],"stroke":true},
  "folder-symlink": {"name":"Folder Symlink","viewBox":[0,0,24,24],"paths":["M2 9.35V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h7","m8 16 3-3-3-3"],"stroke":true},
  "folder-sync": {"name":"Folder Sync","viewBox":[0,0,24,24],"paths":["M9 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v.5","M12 10v4h4","m12 14 1.535-1.605a5 5 0 0 1 8 1.5","M22 22v-4h-4","m22 18-1.535 1.605a5 5 0 0 1-8-1.5"],"stroke":true},
  "folder-tree": {"name":"Folder Tree","viewBox":[0,0,24,24],"paths":["M20 10a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-2.5a1 1 0 0 1-.8-.4l-.9-1.2A1 1 0 0 0 15 3h-2a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1Z","M20 21a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-2.9a1 1 0 0 1-.88-.55l-.42-.85a1 1 0 0 0-.92-.6H13a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1Z","M3 5a2 2 0 0 0 2 2h3","M3 3v13a2 2 0 0 0 2 2h3"],"stroke":true},
  "folder-up": {"name":"Folder Up","viewBox":[0,0,24,24],"paths":["M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z","M12 10v6","m9 13 3-3 3 3"],"stroke":true},
  "folder-x": {"name":"Folder X","viewBox":[0,0,24,24],"paths":["M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z","m9.5 10.5 5 5","m14.5 10.5-5 5"],"stroke":true},
  "folders": {"name":"Folders","viewBox":[0,0,24,24],"paths":["M20 5a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h2.5a1.5 1.5 0 0 1 1.2.6l.6.8a1.5 1.5 0 0 0 1.2.6z","M3 8.268a2 2 0 0 0-1 1.738V19a2 2 0 0 0 2 2h11a2 2 0 0 0 1.732-1"],"stroke":true},
  "footprints": {"name":"Footprints","viewBox":[0,0,24,24],"paths":["M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 10 3.8 10 5.5c0 3.11-2 5.66-2 8.68V16a2 2 0 1 1-4 0Z","M20 20v-2.38c0-2.12 1.03-3.12 1-5.62-.03-2.72-1.49-6-4.5-6C14.63 6 14 7.8 14 9.5c0 3.11 2 5.66 2 8.68V20a2 2 0 1 0 4 0Z","M16 17h4","M4 13h4"],"stroke":true},
  "fork-knife": {"name":"Fork Knife","viewBox":[0,0,24,24],"paths":["M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2","M7 2v20","M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"],"stroke":true},
  "fork-knife-crossed": {"name":"Fork Knife Crossed","viewBox":[0,0,24,24],"paths":["m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8","M15 15 3.3 3.3a4.2 4.2 0 0 0 0 6l7.3 7.3c.7.7 2 .7 2.8 0L15 15Zm0 0 7 7","m2.1 21.8 6.4-6.3","m19 5-7 7"],"stroke":true},
  "forklift": {"name":"Forklift","viewBox":[0,0,24,24],"paths":["M12 12H5a2 2 0 0 0-2 2v5","M15 19h7","M16 19V2","M6 12V7a2 2 0 0 1 2-2h2.172a2 2 0 0 1 1.414.586l3.828 3.828A2 2 0 0 1 16 10.828","M7 19h4","M 11 19 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0","M 3 19 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0"],"stroke":true},
  "form": {"name":"Form","viewBox":[0,0,24,24],"paths":["M4 14h6","M4 2h10","M 4 18 h 16 v 4 h -16 z","M 4 6 h 16 v 4 h -16 z"],"stroke":true},
  "form-input": {"name":"Form Input","viewBox":[0,0,24,24],"paths":["M 2 6 h 20 v 12 h -20 z","M12 12h.01","M17 12h.01","M7 12h.01"],"stroke":true},
  "forward": {"name":"Forward","viewBox":[0,0,24,24],"paths":["m15 17 5-5-5-5","M4 18v-2a4 4 0 0 1 4-4h12"],"stroke":true},
  "fragile": {"name":"Fragile","viewBox":[0,0,24,24],"stroke":true,"tags":["iso","handling","packaging","fragil","vidro","cuidado"],"paths":["M7.5 2h9l-.5 7a4.5 4.5 0 0 1-8 0z","M12 13.5V21","M8 21h8","m11 2 1.5 3.5-2 2"]},
  "frame": {"name":"Frame","viewBox":[0,0,24,24],"paths":["M 22 6 L 2 6","M 22 18 L 2 18","M 6 2 L 6 22","M 18 2 L 18 22"],"stroke":true},
  "frown": {"name":"Frown","viewBox":[0,0,24,24],"paths":["M15 10V9","M9 10V9","M9 16a5 5 0 016 0","M 2 12 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0"],"stroke":true},
  "fuel": {"name":"Fuel","viewBox":[0,0,24,24],"paths":["M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 4 0v-6.998a2 2 0 0 0-.59-1.42L18 5","M14 21V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v16","M2 21h13","M3 9h11"],"stroke":true},
  "fullscreen": {"name":"Fullscreen","viewBox":[0,0,24,24],"paths":["M3 7V5a2 2 0 0 1 2-2h2","M17 3h2a2 2 0 0 1 2 2v2","M21 17v2a2 2 0 0 1-2 2h-2","M7 21H5a2 2 0 0 1-2-2v-2","M 7 8 h 10 v 8 h -10 z"],"stroke":true},
  "function-square": {"name":"Function Square","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","M9 17c2 0 2.8-1 2.8-2.8V10c0-2 1-3.3 3.2-3","M9 11.2h5.7"],"stroke":true},
  "funnel": {"name":"Funnel","viewBox":[0,0,24,24],"paths":["M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z"],"stroke":true},
  "funnel-plus": {"name":"Funnel Plus","viewBox":[0,0,24,24],"paths":["M13.354 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14v6a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341l1.218-1.348","M16 6h6","M19 3v6"],"stroke":true},
  "funnel-x": {"name":"Funnel X","viewBox":[0,0,24,24],"paths":["M12.531 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14v6a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341l.427-.473","m16.5 3.5 5 5","m21.5 3.5-5 5"],"stroke":true},
  "galaxy": {"name":"Galaxy","viewBox":[0,0,24,24],"paths":["M16.005 15.108a5.041 6.52 28.25 00-8.008-6.217 5.041 6.52 28.25 008.008 6.217A11.884 7.288-60.76 014.029 7.001","M17 21h.01","M7 3h.01","M7.997 8.891a11.885 7.288-60.756 0111.977 8.107","M 11 12 a 1 1 0 1 0 2 0 a 1 1 0 1 0 -2 0"],"stroke":true},
  "gallery-horizontal": {"name":"Gallery Horizontal","viewBox":[0,0,24,24],"paths":["M2 3v18","M 6 3 h 12 v 18 h -12 z","M22 3v18"],"stroke":true},
  "gallery-horizontal-end": {"name":"Gallery Horizontal End","viewBox":[0,0,24,24],"paths":["M2 7v10","M6 5v14","M 10 3 h 12 v 18 h -12 z"],"stroke":true},
  "gallery-thumbnails": {"name":"Gallery Thumbnails","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 14 h -18 z","M4 21h1","M9 21h1","M14 21h1","M19 21h1"],"stroke":true},
  "gallery-vertical": {"name":"Gallery Vertical","viewBox":[0,0,24,24],"paths":["M3 2h18","M 3 6 h 18 v 12 h -18 z","M3 22h18"],"stroke":true},
  "gallery-vertical-end": {"name":"Gallery Vertical End","viewBox":[0,0,24,24],"paths":["M7 2h10","M5 6h14","M 3 10 h 18 v 12 h -18 z"],"stroke":true},
  "gamepad": {"name":"Gamepad","viewBox":[0,0,24,24],"paths":["M 6 12 L 10 12","M 8 10 L 8 14","M 15 13 L 15.01 13","M 18 11 L 18.01 11","M 2 6 h 20 v 12 h -20 z"],"stroke":true},
  "gamepad-2": {"name":"Gamepad 2","viewBox":[0,0,24,24],"paths":["M 6 11 L 10 11","M 8 9 L 8 13","M 15 12 L 15.01 12","M 18 10 L 18.01 10","M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z"],"stroke":true},
  "gamepad-directional": {"name":"Gamepad Directional","viewBox":[0,0,24,24],"paths":["M11.146 15.854a1.207 1.207 0 0 1 1.708 0l1.56 1.56A2 2 0 0 1 15 18.828V21a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-2.172a2 2 0 0 1 .586-1.414z","M18.828 15a2 2 0 0 1-1.414-.586l-1.56-1.56a1.207 1.207 0 0 1 0-1.708l1.56-1.56A2 2 0 0 1 18.828 9H21a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1z","M6.586 14.414A2 2 0 0 1 5.172 15H3a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h2.172a2 2 0 0 1 1.414.586l1.56 1.56a1.207 1.207 0 0 1 0 1.708z","M9 3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2.172a2 2 0 0 1-.586 1.414l-1.56 1.56a1.207 1.207 0 0 1-1.708 0l-1.56-1.56A2 2 0 0 1 9 5.172z"],"stroke":true},
  "gantt-chart": {"name":"Gantt Chart","viewBox":[0,0,24,24],"paths":["M6 5h12","M4 12h10","M12 19h8"],"stroke":true},
  "gantt-chart-square": {"name":"Gantt Chart Square","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","M9 8h7","M8 12h6","M11 16h5"],"stroke":true},
  "gap-horizontal": {"name":"Gap Horizontal","viewBox":[0,0,24,24],"paths":["M12 2v2","M12 8v2","M12 14v2","M12 20v2","M21 3h-3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3","M3 3h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H3"],"stroke":true},
  "gap-vertical": {"name":"Gap Vertical","viewBox":[0,0,24,24],"paths":["M2 12h2","M8 12h2","M14 12h2","M20 12h2","M3 21v-3a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v3","M3 3v3a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3"],"stroke":true},
  "gas-cylinder": {"name":"Gas Cylinder","viewBox":[0,0,24,24],"stroke":true,"tags":["iso","hazard","ghs","gas","pressao","cilindro"],"paths":["M8 9a4 4 0 0 1 8 0v10a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2z","M10.5 5.3V3h3v2.3","M8 12h8"]},
  "gauge": {"name":"Gauge","viewBox":[0,0,24,24],"paths":["m12 14 4-4","M3.34 19a10 10 0 1 1 17.32 0"],"stroke":true},
  "gauge-circle": {"name":"Gauge Circle","viewBox":[0,0,24,24],"paths":["M15.6 2.7a10 10 0 1 0 5.7 5.7","M 10 12 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0","M13.4 10.6 19 5"],"stroke":true},
  "gavel": {"name":"Gavel","viewBox":[0,0,24,24],"paths":["m14 13-8.381 8.38a1 1 0 0 1-3.001-3l8.384-8.381","m16 16 6-6","m21.5 10.5-8-8","m8 8 6-6","m8.5 7.5 8 8"],"stroke":true},
  "gem": {"name":"Gem","viewBox":[0,0,24,24],"paths":["M10.5 3 8 9l4 13 4-13-2.5-6","M17 3a2 2 0 0 1 1.6.8l3 4a2 2 0 0 1 .013 2.382l-7.99 10.986a2 2 0 0 1-3.247 0l-7.99-10.986A2 2 0 0 1 2.4 7.8l2.998-3.997A2 2 0 0 1 7 3z","M2 9h20"],"stroke":true},
  "georgian-lari": {"name":"Georgian Lari","viewBox":[0,0,24,24],"paths":["M11.5 21a7.5 7.5 0 1 1 7.35-9","M13 12V3","M4 21h16","M9 12V3"],"stroke":true},
  "germ": {"name":"Germ","viewBox":[0,0,24,24],"paths":["m11 2 .925 1.848","M13 15h.01","m16 21-1-2.472","m19 2-1 1.804","m2 19 2.746-1.373","m22 16-2.474-2.13","m22 5-1.804 1","m3 10 2 2","M9 16h.01","M9 20v2","M9.33 7.035c-.51 1.478-1.786 2.93-3.09 3.794A5 5 0 009 20a12.1 12.1 0 0011.902-9.916A6 6 0 009.33 7.035","M 13 9 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0"],"stroke":true},
  "germ-off": {"name":"Germ Off","viewBox":[0,0,24,24],"paths":["m11 2 .925 1.848","M13 15h.01","M13.424 7.768a2 2 0 112.808 2.808","m16 21-1-2.472","M16.988 16.988A12 12 0 019 20a5 5 0 01-2.759-9.171 8.8 8.8 0 002.307-2.28","m19 2-1 1.804","m2 19 2.746-1.373","m2 2 20 20","m22 16-2.474-2.13a12 12 0 001.376-3.786 6 6 0 00-10.313-5.151","m22 5-1.804 1","m3 10 2 2","M9 16h.01","M9 20v2"],"stroke":true},
  "ghost": {"name":"Ghost","viewBox":[0,0,24,24],"paths":["M15 10v1","M7.528 20.472a1.6 1.6 0 012.277 0l1.057 1.056a1.6 1.6 0 002.276 0l1.057-1.056a1.6 1.6 0 012.277 0l1.114 1.114a1.4 1.4 0 002.414-1V10a8 8 0 00-16 0v10.586a1.4 1.4 0 002.414 1z","M9 10v1"],"stroke":true},
  "gift": {"name":"Gift","viewBox":[0,0,24,24],"paths":["M12 7v14","M20 11v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8","M7.5 7a1 1 0 0 1 0-5A4.8 8 0 0 1 12 7a4.8 8 0 0 1 4.5-5 1 1 0 0 1 0 5","M 3 7 h 18 v 4 h -18 z"],"stroke":true},
  "git-branch": {"name":"Git Branch","viewBox":[0,0,24,24],"paths":["M15 6a9 9 0 0 0-9 9V3","M 15 6 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0","M 3 18 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0"],"stroke":true},
  "git-branch-minus": {"name":"Git Branch Minus","viewBox":[0,0,24,24],"paths":["M15 6a9 9 0 0 0-9 9V3","M21 18h-6","M 15 6 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0","M 3 18 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0"],"stroke":true},
  "git-branch-plus": {"name":"Git Branch Plus","viewBox":[0,0,24,24],"paths":["M6 3v12","M18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z","M6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6z","M15 6a9 9 0 0 0-9 9","M18 15v6","M21 18h-6"],"stroke":true},
  "git-commit": {"name":"Git Commit","viewBox":[0,0,24,24],"paths":["M 9 12 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0","M 3 12 L 9 12","M 15 12 L 21 12"],"stroke":true},
  "git-commit-horizontal": {"name":"Git Commit Horizontal","viewBox":[0,0,24,24],"paths":["M 9 12 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0","M 3 12 L 9 12","M 15 12 L 21 12"],"stroke":true},
  "git-commit-vertical": {"name":"Git Commit Vertical","viewBox":[0,0,24,24],"paths":["M12 3v6","M 9 12 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0","M12 15v6"],"stroke":true},
  "git-compare": {"name":"Git Compare","viewBox":[0,0,24,24],"paths":["M 15 18 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0","M 3 6 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0","M13 6h3a2 2 0 0 1 2 2v7","M11 18H8a2 2 0 0 1-2-2V9"],"stroke":true},
  "git-compare-arrows": {"name":"Git Compare Arrows","viewBox":[0,0,24,24],"paths":["M 2 6 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0","M12 6h5a2 2 0 0 1 2 2v7","m15 9-3-3 3-3","M 16 18 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0","M12 18H7a2 2 0 0 1-2-2V9","m9 15 3 3-3 3"],"stroke":true},
  "git-fork": {"name":"Git Fork","viewBox":[0,0,24,24],"paths":["M 9 18 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0","M 3 6 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0","M 15 6 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0","M18 9v2c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V9","M12 12v3"],"stroke":true},
  "git-graph": {"name":"Git Graph","viewBox":[0,0,24,24],"paths":["M 2 6 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0","M5 9v6","M 2 18 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0","M12 3v18","M 16 6 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0","M16 15.7A9 9 0 0 0 19 9"],"stroke":true},
  "git-merge": {"name":"Git Merge","viewBox":[0,0,24,24],"paths":["M 15 18 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0","M 3 6 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0","M6 21V9a9 9 0 0 0 9 9"],"stroke":true},
  "git-merge-conflict": {"name":"Git Merge Conflict","viewBox":[0,0,24,24],"paths":["M12 6h4a2 2 0 0 1 2 2v7","M6 12v9","m8.5 3.5-5 5","m8.5 8.5-5-5","M 15 18 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0"],"stroke":true},
  "git-pull-request": {"name":"Git Pull Request","viewBox":[0,0,24,24],"paths":["M 15 18 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0","M 3 6 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0","M13 6h3a2 2 0 0 1 2 2v7","M 6 9 L 6 21"],"stroke":true},
  "git-pull-request-arrow": {"name":"Git Pull Request Arrow","viewBox":[0,0,24,24],"paths":["M 2 6 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0","M5 9v12","M 16 18 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0","m15 9-3-3 3-3","M12 6h5a2 2 0 0 1 2 2v7"],"stroke":true},
  "git-pull-request-closed": {"name":"Git Pull Request Closed","viewBox":[0,0,24,24],"paths":["m15.5 3.5 5 5","m15.5 8.5 5-5","M18 11.62V15","M6 9v12","M 15 18 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0","M 3 6 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0"],"stroke":true},
  "git-pull-request-create": {"name":"Git Pull Request Create","viewBox":[0,0,24,24],"paths":["M 3 6 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0","M6 9v12","M13 6h3a2 2 0 0 1 2 2v3","M18 15v6","M21 18h-6"],"stroke":true},
  "git-pull-request-create-arrow": {"name":"Git Pull Request Create Arrow","viewBox":[0,0,24,24],"paths":["M 2 6 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0","M5 9v12","m15 9-3-3 3-3","M12 6h5a2 2 0 0 1 2 2v3","M19 15v6","M22 18h-6"],"stroke":true},
  "git-pull-request-draft": {"name":"Git Pull Request Draft","viewBox":[0,0,24,24],"paths":["M 15 18 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0","M 3 6 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0","M18 6V5","M18 11v-1","M 6 9 L 6 21"],"stroke":true},
  "glass-water": {"name":"Glass Water","viewBox":[0,0,24,24],"paths":["M5.116 4.104A1 1 0 0 1 6.11 3h11.78a1 1 0 0 1 .994 1.105L17.19 20.21A2 2 0 0 1 15.2 22H8.8a2 2 0 0 1-2-1.79z","M6 12a5 5 0 0 1 6 0 5 5 0 0 0 6 0"],"stroke":true},
  "glasses": {"name":"Glasses","viewBox":[0,0,24,24],"paths":["M 2 15 a 4 4 0 1 0 8 0 a 4 4 0 1 0 -8 0","M 14 15 a 4 4 0 1 0 8 0 a 4 4 0 1 0 -8 0","M14 15a2 2 0 0 0-2-2 2 2 0 0 0-2 2","M2.5 13 5 7c.7-1.3 1.4-2 3-2","M21.5 13 19 7c-.7-1.3-1.5-2-3-2"],"stroke":true},
  "globe": {"name":"Globe","viewBox":[0,0,24,24],"paths":["M 2 12 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0","M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20","M2 12h20"],"stroke":true},
  "globe-2": {"name":"Globe 2","viewBox":[0,0,24,24],"paths":["M21.54 15H17a2 2 0 0 0-2 2v4.54","M7 3.34V5a3 3 0 0 0 3 3a2 2 0 0 1 2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2c0-1.1.9-2 2-2h3.17","M11 21.95V18a2 2 0 0 0-2-2a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05","M 2 12 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0"],"stroke":true},
  "globe-check": {"name":"Globe Check","viewBox":[0,0,24,24],"paths":["m15 6 2 2 4-4","M2 12h20A10 10 0 1 1 12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 4-10"],"stroke":true},
  "globe-code": {"name":"Globe Code","viewBox":[0,0,24,24],"paths":["M15.5 10 13 7.5 15.5 5","M15.861 14A14.5 14.5 0 0112 22a14.48 14.48 0 010-20 10 10 0 109.888 11.5","M19.5 5 22 7.5 19.5 10","M2 12h8.5"],"stroke":true},
  "globe-lock": {"name":"Globe Lock","viewBox":[0,0,24,24],"paths":["M15.686 15A14.5 14.5 0 0 1 12 22a14.5 14.5 0 0 1 0-20 10 10 0 1 0 9.542 13","M2 12h8.5","M20 6V4a2 2 0 1 0-4 0v2","M 14 6 h 8 v 5 h -8 z"],"stroke":true},
  "globe-off": {"name":"Globe Off","viewBox":[0,0,24,24],"paths":["M10.114 4.462A14.5 14.5 0 0 1 12 2a10 10 0 0 1 9.313 13.643","M15.557 15.556A14.5 14.5 0 0 1 12 22 10 10 0 0 1 4.929 4.929","M15.892 10.234A14.5 14.5 0 0 0 12 2a10 10 0 0 0-3.643.687","M17.656 12H22","M19.071 19.071A10 10 0 0 1 12 22 14.5 14.5 0 0 1 8.44 8.45","M2 12h10","m2 2 20 20"],"stroke":true},
  "globe-x": {"name":"Globe X","viewBox":[0,0,24,24],"paths":["m16 3 5 5","M2 12h20A10 10 0 1 1 12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 4-10","m21 3-5 5"],"stroke":true},
  "goal": {"name":"Goal","viewBox":[0,0,24,24],"paths":["M12 13V2l8 4-8 4","M20.561 10.222a9 9 0 1 1-12.55-5.29","M8.002 9.997a5 5 0 1 0 8.9 2.02"],"stroke":true},
  "gpu": {"name":"Gpu","viewBox":[0,0,24,24],"paths":["M2 17h18a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H2","M2 21V3","M7 17v3a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1v-3","M 14 11 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0","M 6 11 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0"],"stroke":true},
  "grab": {"name":"Grab","viewBox":[0,0,24,24],"paths":["M18 11.5V9a2 2 0 0 0-2-2a2 2 0 0 0-2 2v1.4","M14 10V8a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2","M10 9.9V9a2 2 0 0 0-2-2a2 2 0 0 0-2 2v5","M6 14a2 2 0 0 0-2-2a2 2 0 0 0-2 2","M18 11a2 2 0 1 1 4 0v3a8 8 0 0 1-8 8h-4a8 8 0 0 1-8-8 2 2 0 1 1 4 0"],"stroke":true},
  "graduation-cap": {"name":"Graduation Cap","viewBox":[0,0,24,24],"paths":["M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z","M22 10v6","M6 12.5V16a6 3 0 0 0 12 0v-3.5"],"stroke":true},
  "grape": {"name":"Grape","viewBox":[0,0,24,24],"paths":["M22 5V2l-5.89 5.89","M 13.600000000000001 15.89 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0","M 5.109999999999999 7.4 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0","M 9.35 11.65 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0","M 10.91 5.85 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0","M 15.149999999999999 10.09 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0","M 3.5599999999999996 13.2 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0","M 7.800000000000001 17.44 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0","M 2 19 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0"],"stroke":true},
  "grid": {"name":"Grid","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","M3 9h18","M3 15h18","M9 3v18","M15 3v18"],"stroke":true},
  "grid-2-x-2": {"name":"Grid 2 X 2","viewBox":[0,0,24,24],"paths":["M12 3v18","M3 12h18","M 3 3 h 18 v 18 h -18 z"],"stroke":true},
  "grid-2-x-2-check": {"name":"Grid 2 X 2 Check","viewBox":[0,0,24,24],"paths":["M12 3v17a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a1 1 0 0 1-1 1H3","m16 19 2 2 4-4"],"stroke":true},
  "grid-2-x-2-plus": {"name":"Grid 2 X 2 Plus","viewBox":[0,0,24,24],"paths":["M12 3v17a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a1 1 0 0 1-1 1H3","M16 19h6","M19 22v-6"],"stroke":true},
  "grid-2-x-2-x": {"name":"Grid 2 X 2 X","viewBox":[0,0,24,24],"paths":["M12 3v17a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a1 1 0 0 1-1 1H3","m16.5 16.5 5 5","m16.5 21.5 5-5"],"stroke":true},
  "grid-2x2": {"name":"Grid 2x2","viewBox":[0,0,24,24],"paths":["M12 3v18","M3 12h18","M 3 3 h 18 v 18 h -18 z"],"stroke":true},
  "grid-2x2-check": {"name":"Grid 2x2 Check","viewBox":[0,0,24,24],"paths":["M12 3v17a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a1 1 0 0 1-1 1H3","m16 19 2 2 4-4"],"stroke":true},
  "grid-2x2-plus": {"name":"Grid 2x2 Plus","viewBox":[0,0,24,24],"paths":["M12 3v17a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a1 1 0 0 1-1 1H3","M16 19h6","M19 22v-6"],"stroke":true},
  "grid-2x2-x": {"name":"Grid 2x2 X","viewBox":[0,0,24,24],"paths":["M12 3v17a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a1 1 0 0 1-1 1H3","m16.5 16.5 5 5","m16.5 21.5 5-5"],"stroke":true},
  "grid-3-x-3": {"name":"Grid 3 X 3","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","M3 9h18","M3 15h18","M9 3v18","M15 3v18"],"stroke":true},
  "grid-3x2": {"name":"Grid 3x2","viewBox":[0,0,24,24],"paths":["M15 3v18","M3 12h18","M9 3v18","M 3 3 h 18 v 18 h -18 z"],"stroke":true},
  "grid-3x3": {"name":"Grid 3x3","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","M3 9h18","M3 15h18","M9 3v18","M15 3v18"],"stroke":true},
  "grip": {"name":"Grip","viewBox":[0,0,24,24],"paths":["M 11 5 a 1 1 0 1 0 2 0 a 1 1 0 1 0 -2 0","M 18 5 a 1 1 0 1 0 2 0 a 1 1 0 1 0 -2 0","M 4 5 a 1 1 0 1 0 2 0 a 1 1 0 1 0 -2 0","M 11 12 a 1 1 0 1 0 2 0 a 1 1 0 1 0 -2 0","M 18 12 a 1 1 0 1 0 2 0 a 1 1 0 1 0 -2 0","M 4 12 a 1 1 0 1 0 2 0 a 1 1 0 1 0 -2 0","M 11 19 a 1 1 0 1 0 2 0 a 1 1 0 1 0 -2 0","M 18 19 a 1 1 0 1 0 2 0 a 1 1 0 1 0 -2 0","M 4 19 a 1 1 0 1 0 2 0 a 1 1 0 1 0 -2 0"],"stroke":true},
  "grip-horizontal": {"name":"Grip Horizontal","viewBox":[0,0,24,24],"paths":["M 11 9 a 1 1 0 1 0 2 0 a 1 1 0 1 0 -2 0","M 18 9 a 1 1 0 1 0 2 0 a 1 1 0 1 0 -2 0","M 4 9 a 1 1 0 1 0 2 0 a 1 1 0 1 0 -2 0","M 11 15 a 1 1 0 1 0 2 0 a 1 1 0 1 0 -2 0","M 18 15 a 1 1 0 1 0 2 0 a 1 1 0 1 0 -2 0","M 4 15 a 1 1 0 1 0 2 0 a 1 1 0 1 0 -2 0"],"stroke":true},
  "grip-vertical": {"name":"Grip Vertical","viewBox":[0,0,24,24],"paths":["M 8 12 a 1 1 0 1 0 2 0 a 1 1 0 1 0 -2 0","M 8 5 a 1 1 0 1 0 2 0 a 1 1 0 1 0 -2 0","M 8 19 a 1 1 0 1 0 2 0 a 1 1 0 1 0 -2 0","M 14 12 a 1 1 0 1 0 2 0 a 1 1 0 1 0 -2 0","M 14 5 a 1 1 0 1 0 2 0 a 1 1 0 1 0 -2 0","M 14 19 a 1 1 0 1 0 2 0 a 1 1 0 1 0 -2 0"],"stroke":true},
  "groceries": {"name":"Groceries","viewBox":[0,0,24,24],"paths":["M10 15h4","M19.424 11.095a2.5 2.5 0 00.471-2.309 2 2 0 00.424-3.286 2 2 0 00-2.143-3.322 2 2 0 00-.676.502 2 2 0 00-3.287.424 2.5 2.5 0 00-3.189 2.06A3 3 0 0012 11l4-4","M4 12.006A1 1 0 014.994 11H19a1 1 0 011 1v7a2 2 0 01-2 2H6a2 2 0 01-2-2z","M7 11a4 4 0 01-4-4V5a1 1 0 011-1h2a4 4 0 013.584 2.222"],"stroke":true},
  "group": {"name":"Group","viewBox":[0,0,24,24],"paths":["M3 7V5c0-1.1.9-2 2-2h2","M17 3h2c1.1 0 2 .9 2 2v2","M21 17v2c0 1.1-.9 2-2 2h-2","M7 21H5c-1.1 0-2-.9-2-2v-2","M 7 7 h 7 v 5 h -7 z","M 10 12 h 7 v 5 h -7 z"],"stroke":true},
  "guitar": {"name":"Guitar","viewBox":[0,0,24,24],"paths":["m11.9 12.1 4.514-4.514","M20.1 2.3a1 1 0 0 0-1.4 0l-1.114 1.114A2 2 0 0 0 17 4.828v1.344a2 2 0 0 1-.586 1.414A2 2 0 0 1 17.828 7h1.344a2 2 0 0 0 1.414-.586L21.7 5.3a1 1 0 0 0 0-1.4z","m6 16 2 2","M8.23 9.85A3 3 0 0 1 11 8a5 5 0 0 1 5 5 3 3 0 0 1-1.85 2.77l-.92.38A2 2 0 0 0 12 18a4 4 0 0 1-4 4 6 6 0 0 1-6-6 4 4 0 0 1 4-4 2 2 0 0 0 1.85-1.23z"],"stroke":true},
  "ham": {"name":"Ham","viewBox":[0,0,24,24],"paths":["M13.144 21.144A7.274 10.445 45 1 0 2.856 10.856","M13.144 21.144A7.274 4.365 45 0 0 2.856 10.856a7.274 4.365 45 0 0 10.288 10.288","M16.565 10.435 18.6 8.4a2.501 2.501 0 1 0 1.65-4.65 2.5 2.5 0 1 0-4.66 1.66l-2.024 2.025","m8.5 16.5-1-1"],"stroke":true},
  "hamburger": {"name":"Hamburger","viewBox":[0,0,24,24],"paths":["M12 16H4a2 2 0 1 1 0-4h16a2 2 0 1 1 0 4h-4.25","M5 12a2 2 0 0 1-2-2 9 7 0 0 1 18 0 2 2 0 0 1-2 2","M5 16a2 2 0 0 0-2 2 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 2 2 0 0 0-2-2q0 0 0 0","m6.67 12 6.13 4.6a2 2 0 0 0 2.8-.4l3.15-4.2"],"stroke":true},
  "hammer": {"name":"Hammer","viewBox":[0,0,24,24],"paths":["m15 12-9.373 9.373a1 1 0 0 1-3.001-3L12 9","m18 15 4-4","m21.5 11.5-1.914-1.914A2 2 0 0 1 19 8.172v-.344a2 2 0 0 0-.586-1.414l-1.657-1.657A6 6 0 0 0 12.516 3H9l1.243 1.243A6 6 0 0 1 12 8.485V10l2 2h1.172a2 2 0 0 1 1.414.586L18.5 14.5"],"stroke":true},
  "hand": {"name":"Hand","viewBox":[0,0,24,24],"paths":["M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2","M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2","M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8","M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"],"stroke":true},
  "hand-coins": {"name":"Hand Coins","viewBox":[0,0,24,24],"paths":["M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17","m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9","m2 16 6 6","M 13.1 9 a 2.9 2.9 0 1 0 5.8 0 a 2.9 2.9 0 1 0 -5.8 0","M 3 5 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0"],"stroke":true},
  "hand-fist": {"name":"Hand Fist","viewBox":[0,0,24,24],"paths":["M12.035 17.012a3 3 0 0 0-3-3l-.311-.002a.72.72 0 0 1-.505-1.229l1.195-1.195A2 2 0 0 1 10.828 11H12a2 2 0 0 0 0-4H9.243a3 3 0 0 0-2.122.879l-2.707 2.707A4.83 4.83 0 0 0 3 14a8 8 0 0 0 8 8h2a8 8 0 0 0 8-8V7a2 2 0 1 0-4 0v2a2 2 0 1 0 4 0","M13.888 9.662A2 2 0 0 0 17 8V5A2 2 0 1 0 13 5","M9 5A2 2 0 1 0 5 5V10","M9 7V4A2 2 0 1 1 13 4V7.268"],"stroke":true},
  "hand-grab": {"name":"Hand Grab","viewBox":[0,0,24,24],"paths":["M18 11.5V9a2 2 0 0 0-2-2a2 2 0 0 0-2 2v1.4","M14 10V8a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2","M10 9.9V9a2 2 0 0 0-2-2a2 2 0 0 0-2 2v5","M6 14a2 2 0 0 0-2-2a2 2 0 0 0-2 2","M18 11a2 2 0 1 1 4 0v3a8 8 0 0 1-8 8h-4a8 8 0 0 1-8-8 2 2 0 1 1 4 0"],"stroke":true},
  "hand-heart": {"name":"Hand Heart","viewBox":[0,0,24,24],"paths":["M11 14h2a2 2 0 0 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 16","m14.45 13.39 5.05-4.694C20.196 8 21 6.85 21 5.75a2.75 2.75 0 0 0-4.797-1.837.276.276 0 0 1-.406 0A2.75 2.75 0 0 0 11 5.75c0 1.2.802 2.248 1.5 2.946L16 11.95","m2 15 6 6","m7 20 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a1 1 0 0 0-2.75-2.91"],"stroke":true},
  "hand-helping": {"name":"Hand Helping","viewBox":[0,0,24,24],"paths":["M11 12h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 14","m7 18 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9","m2 13 6 6"],"stroke":true},
  "hand-metal": {"name":"Hand Metal","viewBox":[0,0,24,24],"paths":["M18 12.5V10a2 2 0 0 0-2-2a2 2 0 0 0-2 2v1.4","M14 11V9a2 2 0 1 0-4 0v2","M10 10.5V5a2 2 0 1 0-4 0v9","m7 15-1.76-1.76a2 2 0 0 0-2.83 2.82l3.6 3.6C7.5 21.14 9.2 22 12 22h2a8 8 0 0 0 8-8V7a2 2 0 1 0-4 0v5"],"stroke":true},
  "hand-platter": {"name":"Hand Platter","viewBox":[0,0,24,24],"paths":["M12 3V2","m15.4 17.4 3.2-2.8a2 2 0 1 1 2.8 2.9l-3.6 3.3c-.7.8-1.7 1.2-2.8 1.2h-4c-1.1 0-2.1-.4-2.8-1.2l-1.302-1.464A1 1 0 0 0 6.151 19H5","M2 14h12a2 2 0 0 1 0 4h-2","M4 10h16","M5 10a7 7 0 0 1 14 0","M5 14v6a1 1 0 0 1-1 1H2"],"stroke":true},
  "handbag": {"name":"Handbag","viewBox":[0,0,24,24],"paths":["M2.048 18.566A2 2 0 0 0 4 21h16a2 2 0 0 0 1.952-2.434l-2-9A2 2 0 0 0 18 8H6a2 2 0 0 0-1.952 1.566z","M8 11V6a4 4 0 0 1 8 0v5"],"stroke":true},
  "handle-bottom-right": {"name":"Handle Bottom Right","viewBox":[0,0,24,24],"paths":["M21 8 8 21","m21 15-6 6"],"stroke":true},
  "handshake": {"name":"Handshake","viewBox":[0,0,24,24],"paths":["m11 17 2 2a1 1 0 1 0 3-3","m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4","m21 3 1 11h-2","M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3","M3 4h8"],"stroke":true},
  "hard-drive": {"name":"Hard Drive","viewBox":[0,0,24,24],"paths":["M10 16h.01","M2.212 11.577a2 2 0 0 0-.212.896V18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5.527a2 2 0 0 0-.212-.896L18.55 5.11A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z","M21.946 12.013H2.054","M6 16h.01"],"stroke":true},
  "hard-drive-download": {"name":"Hard Drive Download","viewBox":[0,0,24,24],"paths":["M12 2v8","m16 6-4 4-4-4","M 2 14 h 20 v 8 h -20 z","M6 18h.01","M10 18h.01"],"stroke":true},
  "hard-drive-upload": {"name":"Hard Drive Upload","viewBox":[0,0,24,24],"paths":["m16 6-4-4-4 4","M12 2v8","M 2 14 h 20 v 8 h -20 z","M6 18h.01","M10 18h.01"],"stroke":true},
  "hard-hat": {"name":"Hard Hat","viewBox":[0,0,24,24],"paths":["M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5","M14 6a6 6 0 0 1 6 6v3","M4 15v-3a6 6 0 0 1 6-6","M 2 15 h 20 v 4 h -20 z"],"stroke":true},
  "hash": {"name":"Hash","viewBox":[0,0,24,24],"paths":["M 4 9 L 20 9","M 4 15 L 20 15","M 10 3 L 8 21","M 16 3 L 14 21"],"stroke":true},
  "hat-glasses": {"name":"Hat Glasses","viewBox":[0,0,24,24],"paths":["M14 18a2 2 0 0 0-4 0","m19 11-2.11-6.657a2 2 0 0 0-2.752-1.148l-1.276.61A2 2 0 0 1 12 4H8.5a2 2 0 0 0-1.925 1.456L5 11","M2 11h20","M 14 18 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0","M 4 18 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0"],"stroke":true},
  "haze": {"name":"Haze","viewBox":[0,0,24,24],"paths":["m5.2 6.2 1.4 1.4","M2 13h2","M20 13h2","m17.4 7.6 1.4-1.4","M22 17H2","M22 21H2","M16 13a4 4 0 0 0-8 0","M12 5V2.5"],"stroke":true},
  "hd": {"name":"Hd","viewBox":[0,0,24,24],"paths":["M10 12H6","M10 15V9","M14 14.5a.5.5 0 0 0 .5.5h1a2.5 2.5 0 0 0 2.5-2.5v-1A2.5 2.5 0 0 0 15.5 9h-1a.5.5 0 0 0-.5.5z","M6 15V9","M 2 5 h 20 v 14 h -20 z"],"stroke":true},
  "hdmi-port": {"name":"Hdmi Port","viewBox":[0,0,24,24],"paths":["M22 9a1 1 0 00-1-1H3a1 1 0 00-1 1v4a1 1 0 001 1h.5a2 2 0 011.6.8l.3.4A2 2 0 007 16h10a2 2 0 001.6-.8l.3-.4a2 2 0 011.6-.8h.5a1 1 0 001-1z","M8 12h8"],"stroke":true},
  "heading": {"name":"Heading","viewBox":[0,0,24,24],"paths":["M6 12h12","M6 20V4","M18 20V4"],"stroke":true},
  "heading-1": {"name":"Heading 1","viewBox":[0,0,24,24],"paths":["M4 12h8","M4 18V6","M12 18V6","m17 12 3-2v8"],"stroke":true},
  "heading-2": {"name":"Heading 2","viewBox":[0,0,24,24],"paths":["M4 12h8","M4 18V6","M12 18V6","M21 18h-4c0-4 4-3 4-6 0-1.5-2-2.5-4-1"],"stroke":true},
  "heading-3": {"name":"Heading 3","viewBox":[0,0,24,24],"paths":["M4 12h8","M4 18V6","M12 18V6","M17.5 10.5c1.7-1 3.5 0 3.5 1.5a2 2 0 0 1-2 2","M17 17.5c2 1.5 4 .3 4-1.5a2 2 0 0 0-2-2"],"stroke":true},
  "heading-4": {"name":"Heading 4","viewBox":[0,0,24,24],"paths":["M12 18V6","M17 10v3a1 1 0 0 0 1 1h3","M21 10v8","M4 12h8","M4 18V6"],"stroke":true},
  "heading-5": {"name":"Heading 5","viewBox":[0,0,24,24],"paths":["M4 12h8","M4 18V6","M12 18V6","M17 13v-3h4","M17 17.7c.4.2.8.3 1.3.3 1.5 0 2.7-1.1 2.7-2.5S19.8 13 18.3 13H17"],"stroke":true},
  "heading-6": {"name":"Heading 6","viewBox":[0,0,24,24],"paths":["M4 12h8","M4 18V6","M12 18V6","M 17 16 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0","M20 10c-2 2-3 3.5-3 6"],"stroke":true},
  "headphone-off": {"name":"Headphone Off","viewBox":[0,0,24,24],"paths":["M21 14h-1.343","M9.128 3.47A9 9 0 0 1 21 12v3.343","m2 2 20 20","M20.414 20.414A2 2 0 0 1 19 21h-1a2 2 0 0 1-2-2v-3","M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 2.636-6.364"],"stroke":true},
  "headphones": {"name":"Headphones","viewBox":[0,0,24,24],"paths":["M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"],"stroke":true},
  "headset": {"name":"Headset","viewBox":[0,0,24,24],"paths":["M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Zm0 0a9 9 0 1 1 18 0m0 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3Z","M21 16v2a4 4 0 0 1-4 4h-5"],"stroke":true},
  "heart": {"name":"Heart","viewBox":[0,0,24,24],"paths":["M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"],"stroke":true},
  "heart-crack": {"name":"Heart Crack","viewBox":[0,0,24,24],"paths":["M12.409 5.824c-.702.792-1.15 1.496-1.415 2.166l2.153 2.156a.5.5 0 0 1 0 .707l-2.293 2.293a.5.5 0 0 0 0 .707L12 15","M13.508 20.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5a5.5 5.5 0 0 1 9.591-3.677.6.6 0 0 0 .818.001A5.5 5.5 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5z"],"stroke":true},
  "heart-handshake": {"name":"Heart Handshake","viewBox":[0,0,24,24],"paths":["M19.414 14.414C21 12.828 22 11.5 22 9.5a5.5 5.5 0 0 0-9.591-3.676.6.6 0 0 1-.818.001A5.5 5.5 0 0 0 2 9.5c0 2.3 1.5 4 3 5.5l5.535 5.362a2 2 0 0 0 2.879.052 2.12 2.12 0 0 0-.004-3 2.124 2.124 0 1 0 3-3 2.124 2.124 0 0 0 3.004 0 2 2 0 0 0 0-2.828l-1.881-1.882a2.41 2.41 0 0 0-3.409 0l-1.71 1.71a2 2 0 0 1-2.828 0 2 2 0 0 1 0-2.828l2.823-2.762"],"stroke":true},
  "heart-minus": {"name":"Heart Minus","viewBox":[0,0,24,24],"paths":["m14.876 18.99-1.368 1.323a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5a5.2 5.2 0 0 1-.244 1.572","M15 15h6"],"stroke":true},
  "heart-off": {"name":"Heart Off","viewBox":[0,0,24,24],"paths":["M10.5 4.893a5.5 5.5 0 0 1 1.091.931.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 1.872-1.002 3.356-2.187 4.655","m16.967 16.967-3.459 3.346a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5a5.5 5.5 0 0 1 2.747-4.761","m2 2 20 20"],"stroke":true},
  "heart-plus": {"name":"Heart Plus","viewBox":[0,0,24,24],"paths":["m14.479 19.374-.971.939a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5a5.2 5.2 0 0 1-.219 1.49","M15 15h6","M18 12v6"],"stroke":true},
  "heart-pulse": {"name":"Heart Pulse","viewBox":[0,0,24,24],"paths":["M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5","M3.22 13H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27"],"stroke":true},
  "heart-x": {"name":"Heart X","viewBox":[0,0,24,24],"paths":["m15.5 12.5 5 5","m20.5 12.5-5 5","M21.955 8.774a5.5 5.5 0 0 0-9.546-2.95.6.6 0 0 1-.818 0A5.5 5.5 0 0 0 2 9.5c0 2.3 1.5 4 3 5.5l5.508 5.332a2 2 0 0 0 2.57.352"],"stroke":true},
  "heater": {"name":"Heater","viewBox":[0,0,24,24],"paths":["M11 8c2-3-2-3 0-6","M15.5 8c2-3-2-3 0-6","M6 10h.01","M6 14h.01","M10 16v-4","M14 16v-4","M18 16v-4","M20 6a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3","M5 20v2","M19 20v2"],"stroke":true},
  "helicopter": {"name":"Helicopter","viewBox":[0,0,24,24],"paths":["M11 17v4","M14 3v8a2 2 0 0 0 2 2h5.865","M17 17v4","M18 17a4 4 0 0 0 4-4 8 6 0 0 0-8-6 6 5 0 0 0-6 5v3a2 2 0 0 0 2 2z","M2 10v5","M6 3h16","M7 21h14","M8 13H2"],"stroke":true},
  "help-circle": {"name":"Help Circle","viewBox":[0,0,24,24],"paths":["M 2 12 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0","M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3","M12 17h.01"],"stroke":true},
  "helping-hand": {"name":"Helping Hand","viewBox":[0,0,24,24],"paths":["M11 12h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 14","m7 18 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9","m2 13 6 6"],"stroke":true},
  "hexagon": {"name":"Hexagon","viewBox":[0,0,24,24],"paths":["M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"],"stroke":true},
  "highlighter": {"name":"Highlighter","viewBox":[0,0,24,24],"paths":["m9 11-6 6v3h9l3-3","m22 12-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L14 4"],"stroke":true},
  "hiking-stick": {"name":"Hiking Stick","viewBox":[0,0,24,24],"paths":["M13.5 10.5 2 22","M16.352 11.648a1.205 1.205 0 01-1.704 0l-2.296-2.296a1.205 1.205 0 010-1.704l.72-.72a2 2 0 011.022-.546l.599-.12a2 2 0 001.569-1.57l.12-.598a2 2 0 01.546-1.022l.72-.72a1.205 1.205 0 011.704 0l2.296 2.296a1.205 1.205 0 010 1.704l-6.02 6.02a1 1 0 103 3l.201-.201A7.4 7.4 0 0021 9.93V7","m6 21-3-3"],"stroke":true},
  "history": {"name":"History","viewBox":[0,0,24,24],"paths":["M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8","M3 3v5h5","M12 7v5l4 2"],"stroke":true},
  "home": {"name":"Home","viewBox":[0,0,24,24],"paths":["M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8","M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"],"stroke":true},
  "hop": {"name":"Hop","viewBox":[0,0,24,24],"paths":["M10.82 16.12c1.69.6 3.91.79 5.18.85.55.03 1-.42.97-.97-.06-1.27-.26-3.5-.85-5.18","M11.5 6.5c1.64 0 5-.38 6.71-1.07.52-.2.55-.82.12-1.17A10 10 0 0 0 4.26 18.33c.35.43.96.4 1.17-.12.69-1.71 1.07-5.07 1.07-6.71 1.34.45 3.1.9 4.88.62a.88.88 0 0 0 .73-.74c.3-2.14-.15-3.5-.61-4.88","M15.62 16.95c.2.85.62 2.76.5 4.28a.77.77 0 0 1-.9.7 16.64 16.64 0 0 1-4.08-1.36","M16.13 21.05c1.65.63 3.68.84 4.87.91a.9.9 0 0 0 .96-.96 17.68 17.68 0 0 0-.9-4.87","M16.94 15.62c.86.2 2.77.62 4.29.5a.77.77 0 0 0 .7-.9 16.64 16.64 0 0 0-1.36-4.08","M17.99 5.52a20.82 20.82 0 0 1 3.15 4.5.8.8 0 0 1-.68 1.13c-2.33.2-5.3-.32-8.27-1.57","M4.93 4.93 3 3a.7.7 0 0 1 0-1","M9.58 12.18c1.24 2.98 1.77 5.95 1.57 8.28a.8.8 0 0 1-1.13.68 20.82 20.82 0 0 1-4.5-3.15"],"stroke":true},
  "hop-off": {"name":"Hop Off","viewBox":[0,0,24,24],"paths":["M10.82 16.12c1.69.6 3.91.79 5.18.85.28.01.53-.09.7-.27","M11.14 20.57c.52.24 2.44 1.12 4.08 1.37.46.06.86-.25.9-.71.12-1.52-.3-3.43-.5-4.28","M16.13 21.05c1.65.63 3.68.84 4.87.91a.9.9 0 0 0 .7-.26","M17.99 5.52a20.83 20.83 0 0 1 3.15 4.5.8.8 0 0 1-.68 1.13c-1.17.1-2.5.02-3.9-.25","M20.57 11.14c.24.52 1.12 2.44 1.37 4.08.04.3-.08.59-.31.75","M4.93 4.93a10 10 0 0 0-.67 13.4c.35.43.96.4 1.17-.12.69-1.71 1.07-5.07 1.07-6.71 1.34.45 3.1.9 4.88.62a.85.85 0 0 0 .48-.24","M5.52 17.99c1.05.95 2.91 2.42 4.5 3.15a.8.8 0 0 0 1.13-.68c.2-2.34-.33-5.3-1.57-8.28","M8.35 2.68a10 10 0 0 1 9.98 1.58c.43.35.4.96-.12 1.17-1.5.6-4.3.98-6.07 1.05","m2 2 20 20"],"stroke":true},
  "hospital": {"name":"Hospital","viewBox":[0,0,24,24],"paths":["M12 7v4","M14 21v-3a2 2 0 0 0-4 0v3","M14 9h-4","M18 11h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h2","M18 21V5a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16"],"stroke":true},
  "hotel": {"name":"Hotel","viewBox":[0,0,24,24],"paths":["M10 22v-6.57","M12 11h.01","M12 7h.01","M14 15.43V22","M15 16a5 5 0 0 0-6 0","M16 11h.01","M16 7h.01","M8 11h.01","M8 7h.01","M 4 2 h 16 v 20 h -16 z"],"stroke":true},
  "hourglass": {"name":"Hourglass","viewBox":[0,0,24,24],"paths":["M5 22h14","M5 2h14","M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22","M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"],"stroke":true},
  "hourglass-cog": {"name":"Hourglass Cog","viewBox":[0,0,24,24],"paths":["m14.305 19.53.923-.382","m15.228 16.852-.923-.383","m16.852 15.228-.383-.923","m16.852 20.772-.383.924","M17 2v4.172a2 2 0 0 1-.586 1.414l-8.828 8.828A2 2 0 0 0 7 17.828V22","m19.148 15.228.383-.923","m19.53 21.696-.382-.924","m20.772 16.852.924-.383","m20.772 19.148.924.383","M5 22h6.159","M5 2h14","M7 2v4.172a2 2 0 0 0 .586 1.414l5.188 5.188","M 15 18 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0"],"stroke":true},
  "house": {"name":"House","viewBox":[0,0,24,24],"paths":["M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8","M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"],"stroke":true},
  "house-cog": {"name":"House Cog","viewBox":[0,0,24,24],"paths":["M10.584 21H5a2 2 0 01-2-2v-9a2 2 0 01.709-1.527l7-6a2 2 0 012.582 0l7 6A2 2 0 0121 10.001v.583","M14 12H10a1 1 0 00-1 1v8","m14.305 19.53.923-.382","m15.229 16.852-.924-.383","m16.852 15.228-.383-.923","m16.852 20.773-.383.924","m19.148 15.228.383-.923","m19.53 21.697-.382-.924","m20.773 16.852.922-.383","m20.773 19.148.922.383","M 15 18 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0"],"stroke":true},
  "house-heart": {"name":"House Heart","viewBox":[0,0,24,24],"paths":["M8.62 13.8A2.25 2.25 0 1 1 12 10.836a2.25 2.25 0 1 1 3.38 2.966l-2.626 2.856a.998.998 0 0 1-1.507 0z","M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"],"stroke":true},
  "house-plug": {"name":"House Plug","viewBox":[0,0,24,24],"paths":["M10 12V8.964","M14 12V8.964","M15 12a1 1 0 0 1 1 1v2a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-2a1 1 0 0 1 1-1z","M8.5 21H5a2 2 0 0 1-2-2v-9a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2h-5a2 2 0 0 1-2-2v-2"],"stroke":true},
  "house-plus": {"name":"House Plus","viewBox":[0,0,24,24],"paths":["M12.35 21H5a2 2 0 0 1-2-2v-9a2 2 0 0 1 .71-1.53l7-6a2 2 0 0 1 2.58 0l7 6A2 2 0 0 1 21 10v2.35","M14.8 12.4A1 1 0 0 0 14 12h-4a1 1 0 0 0-1 1v8","M15 18h6","M18 15v6"],"stroke":true},
  "house-wifi": {"name":"House Wifi","viewBox":[0,0,24,24],"paths":["M9.5 13.866a4 4 0 0 1 5 .01","M12 17h.01","M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z","M7 10.754a8 8 0 0 1 10 0"],"stroke":true},
  "houses": {"name":"Houses","viewBox":[0,0,24,24],"paths":["m12.681 4.24.834-.715a1.45 1.45 0 011.88 0l5.09 4.364A1.45 1.45 0 0121 9v6.546a1.45 1.45 0 01-1 1.381","M15.485 11.889A1.45 1.45 0 0116 13v6.546A1.454 1.454 0 0114.546 21H4.364a1.454 1.454 0 01-1.454-1.454V13a1.45 1.45 0 01.515-1.111l5.09-4.364a1.45 1.45 0 011.88 0z","M7.41 20.546v-4a1 1 0 011-1h2a1 1 0 011 1v4"],"stroke":true},
  "ice-cream": {"name":"Ice Cream","viewBox":[0,0,24,24],"paths":["m7 11 4.08 10.35a1 1 0 0 0 1.84 0L17 11","M17 7A5 5 0 0 0 7 7","M17 7a2 2 0 0 1 0 4H7a2 2 0 0 1 0-4"],"stroke":true},
  "ice-cream-2": {"name":"Ice Cream 2","viewBox":[0,0,24,24],"paths":["M12 17c5 0 8-2.69 8-6H4c0 3.31 3 6 8 6m-4 4h8m-4-3v3M5.14 11a3.5 3.5 0 1 1 6.71 0","M12.14 11a3.5 3.5 0 1 1 6.71 0","M15.5 6.5a3.5 3.5 0 1 0-7 0"],"stroke":true},
  "ice-cream-bowl": {"name":"Ice Cream Bowl","viewBox":[0,0,24,24],"paths":["M12 17c5 0 8-2.69 8-6H4c0 3.31 3 6 8 6m-4 4h8m-4-3v3M5.14 11a3.5 3.5 0 1 1 6.71 0","M12.14 11a3.5 3.5 0 1 1 6.71 0","M15.5 6.5a3.5 3.5 0 1 0-7 0"],"stroke":true},
  "ice-cream-cone": {"name":"Ice Cream Cone","viewBox":[0,0,24,24],"paths":["m7 11 4.08 10.35a1 1 0 0 0 1.84 0L17 11","M17 7A5 5 0 0 0 7 7","M17 7a2 2 0 0 1 0 4H7a2 2 0 0 1 0-4"],"stroke":true},
  "id-card": {"name":"Id Card","viewBox":[0,0,24,24],"paths":["M13 19a4 4 0 00-8 0","M16 10h2","M16 14h2","M 6 12 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0","M 2 5 h 20 v 14 h -20 z"],"stroke":true},
  "id-card-lanyard": {"name":"Id Card Lanyard","viewBox":[0,0,24,24],"paths":["M13.5 8h-3","m15 2-1 2h3a2 2 0 012 2v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6a2 2 0 012-2h3","M16 22a4 4 0 00-8 0","m9 2 3 6","M 9 15 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0"],"stroke":true},
  "image": {"name":"Image","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","M 7 9 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0","m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"],"stroke":true},
  "image-down": {"name":"Image Down","viewBox":[0,0,24,24],"paths":["M10.3 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10l-3.1-3.1a2 2 0 0 0-2.814.014L6 21","m14 19 3 3v-5.5","m17 22 3-3","M 7 9 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0"],"stroke":true},
  "image-minus": {"name":"Image Minus","viewBox":[0,0,24,24],"paths":["M21 9v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7","M 16 5 L 22 5","M 7 9 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0","m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"],"stroke":true},
  "image-off": {"name":"Image Off","viewBox":[0,0,24,24],"paths":["M 2 2 L 22 22","M10.41 10.41a2 2 0 1 1-2.83-2.83","M 13.5 13.5 L 6 21","M 18 12 L 21 15","M3.59 3.59A1.99 1.99 0 0 0 3 5v14a2 2 0 0 0 2 2h14c.55 0 1.052-.22 1.41-.59","M21 15V5a2 2 0 0 0-2-2H9"],"stroke":true},
  "image-play": {"name":"Image Play","viewBox":[0,0,24,24],"paths":["M15 15.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997a1 1 0 0 1-1.517-.86z","M21 12.17V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6","m6 21 5-5","M 7 9 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0"],"stroke":true},
  "image-plus": {"name":"Image Plus","viewBox":[0,0,24,24],"paths":["M16 5h6","M19 2v6","M21 11.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7.5","m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21","M 7 9 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0"],"stroke":true},
  "image-up": {"name":"Image Up","viewBox":[0,0,24,24],"paths":["M10.3 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10l-3.1-3.1a2 2 0 0 0-2.814.014L6 21","m14 19.5 3-3 3 3","M17 22v-5.5","M 7 9 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0"],"stroke":true},
  "image-upscale": {"name":"Image Upscale","viewBox":[0,0,24,24],"paths":["M16 3h5v5","M17 21h2a2 2 0 0 0 2-2","M21 12v3","m21 3-5 5","M3 7V5a2 2 0 0 1 2-2","m5 21 4.144-4.144a1.21 1.21 0 0 1 1.712 0L13 19","M9 3h3","M 3 11 h 10 v 10 h -10 z"],"stroke":true},
  "images": {"name":"Images","viewBox":[0,0,24,24],"paths":["m22 11-1.296-1.296a2.4 2.4 0 0 0-3.408 0L11 16","M4 8a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2","M 12 7 a 1 1 0 1 0 2 0 a 1 1 0 1 0 -2 0","M 8 2 h 14 v 14 h -14 z"],"stroke":true},
  "import": {"name":"Import","viewBox":[0,0,24,24],"paths":["M12 3v12","m8 11 4 4 4-4","M8 5H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-4"],"stroke":true},
  "inbox": {"name":"Inbox","viewBox":[0,0,24,24],"paths":["M 22 12 L 16 12 L 14 15 L 10 15 L 8 12 L 2 12","M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"],"stroke":true},
  "indent": {"name":"Indent","viewBox":[0,0,24,24],"paths":["M21 5H11","M21 12H11","M21 19H11","m3 8 4 4-4 4"],"stroke":true},
  "indent-decrease": {"name":"Indent Decrease","viewBox":[0,0,24,24],"paths":["M21 5H11","M21 12H11","M21 19H11","m7 8-4 4 4 4"],"stroke":true},
  "indent-increase": {"name":"Indent Increase","viewBox":[0,0,24,24],"paths":["M21 5H11","M21 12H11","M21 19H11","m3 8 4 4-4 4"],"stroke":true},
  "indian-rupee": {"name":"Indian Rupee","viewBox":[0,0,24,24],"paths":["M6 3h12","M6 8h12","m6 13 8.5 8","M6 13h3","M9 13c6.667 0 6.667-10 0-10"],"stroke":true},
  "infinity": {"name":"Infinity","viewBox":[0,0,24,24],"paths":["M6 16c5 0 7-8 12-8a4 4 0 0 1 0 8c-5 0-7-8-12-8a4 4 0 1 0 0 8"],"stroke":true},
  "info": {"name":"Info","viewBox":[0,0,24,24],"paths":["M 2 12 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0","M12 16v-4","M12 8h.01"],"stroke":true},
  "inspect": {"name":"Inspect","viewBox":[0,0,24,24],"paths":["M12.034 12.681a.498.498 0 0 1 .647-.647l9 3.5a.5.5 0 0 1-.033.943l-3.444 1.068a1 1 0 0 0-.66.66l-1.067 3.443a.5.5 0 0 1-.943.033z","M21 11V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6"],"stroke":true},
  "inspection-panel": {"name":"Inspection Panel","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","M7 7h.01","M17 7h.01","M7 17h.01","M17 17h.01"],"stroke":true},
  "italic": {"name":"Italic","viewBox":[0,0,24,24],"paths":["M 19 4 L 10 4","M 14 20 L 5 20","M 15 4 L 9 20"],"stroke":true},
  "iteration-ccw": {"name":"Iteration Ccw","viewBox":[0,0,24,24],"paths":["m16 14 4 4-4 4","M20 10a8 8 0 1 0-8 8h8"],"stroke":true},
  "iteration-cw": {"name":"Iteration Cw","viewBox":[0,0,24,24],"paths":["M4 10a8 8 0 1 1 8 8H4","m8 22-4-4 4-4"],"stroke":true},
  "iv-bag": {"name":"Iv Bag","viewBox":[0,0,24,24],"paths":["M12 18v2a2 2 0 002 2h6","M6 11c.72.5 1.44 1 3 1 3 0 3-2 6-2 1.56 0 2.28.5 3 1","M9.293 3c.453 0 .887-.18 1.207-.5s.754-.5 1.207-.5h.586c.453 0 .887.18 1.207.5s.754.5 1.207.5H16a2 2 0 012 2v11a2 2 0 01-2 2H8a2 2 0 01-2-2V5a2 2 0 012-2z"],"stroke":true},
  "japanese-yen": {"name":"Japanese Yen","viewBox":[0,0,24,24],"paths":["M12 9.5V21m0-11.5L6 3m6 6.5L18 3","M6 15h12","M6 11h12"],"stroke":true},
  "joystick": {"name":"Joystick","viewBox":[0,0,24,24],"paths":["M21 17a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2Z","M6 15v-2","M12 15V9","M 9 6 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0"],"stroke":true},
  "kanban": {"name":"Kanban","viewBox":[0,0,24,24],"paths":["M5 3v14","M12 3v8","M19 3v18"],"stroke":true},
  "kanban-square": {"name":"Kanban Square","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","M8 7v7","M12 7v4","M16 7v9"],"stroke":true},
  "kanban-square-dashed": {"name":"Kanban Square Dashed","viewBox":[0,0,24,24],"paths":["M8 7v7","M12 7v4","M16 7v9","M5 3a2 2 0 0 0-2 2","M9 3h1","M14 3h1","M19 3a2 2 0 0 1 2 2","M21 9v1","M21 14v1","M21 19a2 2 0 0 1-2 2","M14 21h1","M9 21h1","M5 21a2 2 0 0 1-2-2","M3 14v1","M3 9v1"],"stroke":true},
  "kayak": {"name":"Kayak","viewBox":[0,0,24,24],"paths":["M18 17a1 1 0 0 0-1 1v1a2 2 0 1 0 2-2z","M20.97 3.61a.45.45 0 0 0-.58-.58C10.2 6.6 6.6 10.2 3.03 20.39a.45.45 0 0 0 .58.58C13.8 17.4 17.4 13.8 20.97 3.61","m6.707 6.707 10.586 10.586","M7 5a2 2 0 1 0-2 2h1a1 1 0 0 0 1-1z"],"stroke":true},
  "kazakh-tenge": {"name":"Kazakh Tenge","viewBox":[0,0,24,24],"paths":["M12 8v12","M6 4h12","M6 8h12"],"stroke":true},
  "key": {"name":"Key","viewBox":[0,0,24,24],"paths":["m2 21 9.6-9.6","m7.5 15.5 2.3 2.3a1 1 0 0 1 0 1.4l-2.1 2.1a1 1 0 0 1-1.4 0L4 19","M 10 7.5 a 5.5 5.5 0 1 0 11 0 a 5.5 5.5 0 1 0 -11 0"],"stroke":true},
  "key-round": {"name":"Key Round","viewBox":[0,0,24,24],"paths":["M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z","M 16 7.5 a 0.5 0.5 0 1 0 1 0 a 0.5 0.5 0 1 0 -1 0"],"stroke":true},
  "key-square": {"name":"Key Square","viewBox":[0,0,24,24],"paths":["M12.4 2.7a2.5 2.5 0 0 1 3.4 0l5.5 5.5a2.5 2.5 0 0 1 0 3.4l-3.7 3.7a2.5 2.5 0 0 1-3.4 0L8.7 9.8a2.5 2.5 0 0 1 0-3.4z","m14 7 3 3","m9.4 10.6-6.814 6.814A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814"],"stroke":true},
  "keyboard": {"name":"Keyboard","viewBox":[0,0,24,24],"paths":["M10 8h.01","M12 12h.01","M14 8h.01","M16 12h.01","M18 8h.01","M6 8h.01","M7 16h10","M8 12h.01","M 2 4 h 20 v 16 h -20 z"],"stroke":true},
  "keyboard-music": {"name":"Keyboard Music","viewBox":[0,0,24,24],"paths":["M 2 4 h 20 v 16 h -20 z","M6 8h4","M14 8h.01","M18 8h.01","M2 12h20","M6 12v4","M10 12v4","M14 12v4","M18 12v4"],"stroke":true},
  "keyboard-off": {"name":"Keyboard Off","viewBox":[0,0,24,24],"paths":["M 20 4 A2 2 0 0 1 22 6","M 22 6 L 22 16.41","M 7 16 L 16 16","M 9.69 4 L 20 4","M14 8h.01","M18 8h.01","m2 2 20 20","M20 20H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2","M6 8h.01","M8 12h.01"],"stroke":true},
  "lambda": {"name":"Lambda","viewBox":[0,0,24,24],"paths":["M11.38 10 5 20","M19 18a2 2 0 01-2 2c-4.87-.003-5.052-16-10-16a2 2 0 00-2 2"],"stroke":true},
  "lamp": {"name":"Lamp","viewBox":[0,0,24,24],"paths":["M12 12v6","M4.077 10.615A1 1 0 0 0 5 12h14a1 1 0 0 0 .923-1.385l-3.077-7.384A2 2 0 0 0 15 2H9a2 2 0 0 0-1.846 1.23Z","M8 20a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1z"],"stroke":true},
  "lamp-ceiling": {"name":"Lamp Ceiling","viewBox":[0,0,24,24],"paths":["M12 2v5","M14.829 15.998a3 3 0 1 1-5.658 0","M20.92 14.606A1 1 0 0 1 20 16H4a1 1 0 0 1-.92-1.394l3-7A1 1 0 0 1 7 7h10a1 1 0 0 1 .92.606z"],"stroke":true},
  "lamp-desk": {"name":"Lamp Desk","viewBox":[0,0,24,24],"paths":["M10.293 2.293a1 1 0 0 1 1.414 0l2.5 2.5 5.994 1.227a1 1 0 0 1 .506 1.687l-7 7a1 1 0 0 1-1.687-.506l-1.227-5.994-2.5-2.5a1 1 0 0 1 0-1.414z","m14.207 4.793-3.414 3.414","M3 20a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z","m9.086 6.5-4.793 4.793a1 1 0 0 0-.18 1.17L7 18"],"stroke":true},
  "lamp-floor": {"name":"Lamp Floor","viewBox":[0,0,24,24],"paths":["M12 10v12","M17.929 7.629A1 1 0 0 1 17 9H7a1 1 0 0 1-.928-1.371l2-5A1 1 0 0 1 9 2h6a1 1 0 0 1 .928.629z","M9 22h6"],"stroke":true},
  "lamp-wall-down": {"name":"Lamp Wall Down","viewBox":[0,0,24,24],"paths":["M19.929 18.629A1 1 0 0 1 19 20H9a1 1 0 0 1-.928-1.371l2-5A1 1 0 0 1 11 13h6a1 1 0 0 1 .928.629z","M6 3a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z","M8 6h4a2 2 0 0 1 2 2v5"],"stroke":true},
  "lamp-wall-up": {"name":"Lamp Wall Up","viewBox":[0,0,24,24],"paths":["M19.929 9.629A1 1 0 0 1 19 11H9a1 1 0 0 1-.928-1.371l2-5A1 1 0 0 1 11 4h6a1 1 0 0 1 .928.629z","M6 15a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H5a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1z","M8 18h4a2 2 0 0 0 2-2v-5"],"stroke":true},
  "land-plot": {"name":"Land Plot","viewBox":[0,0,24,24],"paths":["m12 8 6-3-6-3v10","m8 11.99-5.5 3.14a1 1 0 0 0 0 1.74l8.5 4.86a2 2 0 0 0 2 0l8.5-4.86a1 1 0 0 0 0-1.74L16 12","m6.49 12.85 11.02 6.3","M17.51 12.85 6.5 19.15"],"stroke":true},
  "landmark": {"name":"Landmark","viewBox":[0,0,24,24],"paths":["M10 18v-7","M11.119 2.205a2 2 0 0 1 1.762 0l7.84 3.846A.5.5 0 0 1 20.5 7h-17a.5.5 0 0 1-.22-.949z","M14 18v-7","M18 18v-7","M3 22h18","M6 18v-7"],"stroke":true},
  "languages": {"name":"Languages","viewBox":[0,0,24,24],"paths":["m5 8 6 6","m4 14 6-6 2-3","M2 5h12","M7 2h1","m22 22-5-10-5 10","M14 18h6"],"stroke":true},
  "laptop": {"name":"Laptop","viewBox":[0,0,24,24],"paths":["M18 5a2 2 0 0 1 2 2v8.526a2 2 0 0 0 .212.897l1.068 2.127a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45l1.068-2.127A2 2 0 0 0 4 15.526V7a2 2 0 0 1 2-2z","M20.054 15.987H3.946"],"stroke":true},
  "laptop-2": {"name":"Laptop 2","viewBox":[0,0,24,24],"paths":["M 3 4 h 18 v 12 h -18 z","M 2 20 L 22 20"],"stroke":true},
  "laptop-minimal": {"name":"Laptop Minimal","viewBox":[0,0,24,24],"paths":["M 3 4 h 18 v 12 h -18 z","M 2 20 L 22 20"],"stroke":true},
  "laptop-minimal-check": {"name":"Laptop Minimal Check","viewBox":[0,0,24,24],"paths":["M2 20h20","m9 10 2 2 4-4","M 3 4 h 18 v 12 h -18 z"],"stroke":true},
  "lasso": {"name":"Lasso","viewBox":[0,0,24,24],"paths":["M3.704 14.467a10 8 0 1 1 3.115 2.375","M7 22a5 5 0 0 1-2-3.994","M 3 16 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0"],"stroke":true},
  "lasso-select": {"name":"Lasso Select","viewBox":[0,0,24,24],"paths":["M7 22a5 5 0 0 1-2-4","M7 16.93c.96.43 1.96.74 2.99.91","M3.34 14A6.8 6.8 0 0 1 2 10c0-4.42 4.48-8 10-8s10 3.58 10 8a7.19 7.19 0 0 1-.33 2","M5 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4z","M14.33 22h-.09a.35.35 0 0 1-.24-.32v-10a.34.34 0 0 1 .33-.34c.08 0 .15.03.21.08l7.34 6a.33.33 0 0 1-.21.59h-4.49l-2.57 3.85a.35.35 0 0 1-.28.14z"],"stroke":true},
  "laugh": {"name":"Laugh","viewBox":[0,0,24,24],"paths":["M15 10V9","M7.084 14.302a5.12 5.12 0 009.833 0 .24.24 0 00-.235-.302H7.32a.24.24 0 00-.235.302","M9 10V9","M 2 12 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0"],"stroke":true},
  "layer-arrow-down": {"name":"Layer Arrow Down","viewBox":[0,0,24,24],"paths":["M12 10v10","M22 10a1 1 0 01-.59.92l-5.077 2.308","M22.017 10.005a1 1 0 00-.597-.916l-8.59-3.91a2 2 0 00-1.66.001L2.6 9.08a1 1 0 00-.02 1.831l5.093 2.316","m9 17 3 3 3-3"],"stroke":true},
  "layer-arrow-up": {"name":"Layer Arrow Up","viewBox":[0,0,24,24],"paths":["M12 14V4","M7.674 10.774 2.58 13.09a1 1 0 000 1.822l8.6 3.91a2 2 0 001.65 0l8.58-3.9a1 1 0 00.59-.92 1 1 0 00-.59-.922l-5.078-2.308","m9 7 3-3 3 3"],"stroke":true},
  "layers": {"name":"Layers","viewBox":[0,0,24,24],"paths":["M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z","M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12","M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"],"stroke":true},
  "layers-2": {"name":"Layers 2","viewBox":[0,0,24,24],"paths":["M13 13.74a2 2 0 0 1-2 0L2.5 8.87a1 1 0 0 1 0-1.74L11 2.26a2 2 0 0 1 2 0l8.5 4.87a1 1 0 0 1 0 1.74z","m20 14.285 1.5.845a1 1 0 0 1 0 1.74L13 21.74a2 2 0 0 1-2 0l-8.5-4.87a1 1 0 0 1 0-1.74l1.5-.845"],"stroke":true},
  "layers-3": {"name":"Layers 3","viewBox":[0,0,24,24],"paths":["M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z","M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12","M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"],"stroke":true},
  "layers-arrow-down": {"name":"Layers Arrow Down","viewBox":[0,0,24,24],"paths":["M12 7v15","M2 12a1 1 0 00.58.91l5.093 2.316","M22 12a1 1 0 01-.59.92l-5.077 2.308","M8 10.37 2.6 7.91a1 1 0 010-1.831l8.57-3.9a2 2 0 011.66.001l8.59 3.91a1 1 0 010 1.831l-5.392 2.45","m9 19 3 3 3-3"],"stroke":true},
  "layers-arrow-up": {"name":"Layers Arrow Up","viewBox":[0,0,24,24],"paths":["M12 12V2","M2 17.002a1 1 0 00.58.91l8.6 3.91a2 2 0 001.65 0l8.58-3.9a1 1 0 00.59-.92","M7.674 8.774 2.58 11.09a1 1 0 000 1.822l8.6 3.91a2 2 0 001.65 0l8.58-3.9a1 1 0 00.59-.92 1 1 0 00-.59-.922l-5.078-2.308","m9 5 3-3 3 3"],"stroke":true},
  "layers-minus": {"name":"Layers Minus","viewBox":[0,0,24,24],"paths":["M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 .83.18 2 2 0 0 0 .83-.18l8.58-3.9a1 1 0 0 0 0-1.832z","M16 17h6","M2.003 11.995a1 1 0 0 0 .597.915l8.58 3.91a2 2 0 0 0 .83.18","M2.003 16.995a1 1 0 0 0 .597.915l8.58 3.91a2 2 0 0 0 .83.18 2 2 0 0 0 .83-.18l2.11-.96","M22.018 12.004a1 1 0 0 1-.598.916l-.177.08"],"stroke":true},
  "layers-plus": {"name":"Layers Plus","viewBox":[0,0,24,24],"paths":["M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 .83.18 2 2 0 0 0 .83-.18l8.58-3.9a1 1 0 0 0 0-1.831z","M16 17h6","M19 14v6","M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 .825.178","M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l2.116-.962"],"stroke":true},
  "layout": {"name":"Layout","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","M3 9h18","M9 21V9"],"stroke":true},
  "layout-arrow-down": {"name":"Layout Arrow Down","viewBox":[0,0,24,24],"paths":["M 3 3 h 7 v 7 h -7 z","M 3 14 h 7 v 7 h -7 z","M18 3v18","m21 18-3 3-3-3"],"stroke":true},
  "layout-arrow-right": {"name":"Layout Arrow Right","viewBox":[0,0,24,24],"paths":["M 3 3 h 7 v 7 h -7 z","M 14 3 h 7 v 7 h -7 z","M3 18h18","m18 21 3-3-3-3"],"stroke":true},
  "layout-dashboard": {"name":"Layout Dashboard","viewBox":[0,0,24,24],"paths":["M 3 3 h 7 v 9 h -7 z","M 14 3 h 7 v 5 h -7 z","M 14 12 h 7 v 9 h -7 z","M 3 16 h 7 v 5 h -7 z"],"stroke":true},
  "layout-freeform": {"name":"Layout Freeform","viewBox":[0,0,24,24],"paths":["M 3 3 h 7 v 7 h -7 z","M 14 4 h 7 v 7 h -7 z","M 4 14 h 7 v 7 h -7 z"],"stroke":true},
  "layout-grid": {"name":"Layout Grid","viewBox":[0,0,24,24],"paths":["M 3 3 h 7 v 7 h -7 z","M 14 3 h 7 v 7 h -7 z","M 14 14 h 7 v 7 h -7 z","M 3 14 h 7 v 7 h -7 z"],"stroke":true},
  "layout-grid-circles": {"name":"Layout Grid Circles","viewBox":[0,0,24,24],"paths":["M 14 17.5 a 3.5 3.5 0 1 0 7 0 a 3.5 3.5 0 1 0 -7 0","M 14 6.5 a 3.5 3.5 0 1 0 7 0 a 3.5 3.5 0 1 0 -7 0","M 3 17.5 a 3.5 3.5 0 1 0 7 0 a 3.5 3.5 0 1 0 -7 0","M 3 6.5 a 3.5 3.5 0 1 0 7 0 a 3.5 3.5 0 1 0 -7 0"],"stroke":true},
  "layout-list": {"name":"Layout List","viewBox":[0,0,24,24],"paths":["M 3 3 h 7 v 7 h -7 z","M 3 14 h 7 v 7 h -7 z","M14 4h7","M14 9h7","M14 15h7","M14 20h7"],"stroke":true},
  "layout-panel-left": {"name":"Layout Panel Left","viewBox":[0,0,24,24],"paths":["M 3 3 h 7 v 18 h -7 z","M 14 3 h 7 v 7 h -7 z","M 14 14 h 7 v 7 h -7 z"],"stroke":true},
  "layout-panel-top": {"name":"Layout Panel Top","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 7 h -18 z","M 3 14 h 7 v 7 h -7 z","M 14 14 h 7 v 7 h -7 z"],"stroke":true},
  "layout-template": {"name":"Layout Template","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 7 h -18 z","M 3 14 h 9 v 7 h -9 z","M 16 14 h 5 v 7 h -5 z"],"stroke":true},
  "leaf": {"name":"Leaf","viewBox":[0,0,24,24],"paths":["M11 20a10 10 0 0010-10 25.9 25.9 0 00-1.04-7.281 1 1 0 00-1.755-.325C15.833 5.5 13 5.5 9.8 6.1A7 7 0 0011 20","M2 21a5 5 0 012.911-4.544C7.613 15.212 8.351 15.24 11 13"],"stroke":true},
  "leafy-green": {"name":"Leafy Green","viewBox":[0,0,24,24],"paths":["M2 22c1.25-.987 2.27-1.975 3.9-2.2a5.56 5.56 0 0 1 3.8 1.5 4 4 0 0 0 6.187-2.353 3.5 3.5 0 0 0 3.69-5.116A3.5 3.5 0 0 0 20.95 8 3.5 3.5 0 1 0 16 3.05a3.5 3.5 0 0 0-5.831 1.373 3.5 3.5 0 0 0-5.116 3.69 4 4 0 0 0-2.348 6.155C3.499 15.42 4.409 16.712 4.2 18.1 3.926 19.743 3.014 20.732 2 22","M2 22 17 7"],"stroke":true},
  "lectern": {"name":"Lectern","viewBox":[0,0,24,24],"paths":["M15 13h4a2 2 0 001.901-1.38l1.057-4.333A1 1 0 0021 6H3a1 1 0 00-.958 1.287L3.1 11.621A2 2 0 005.001 13h4","M15 22V11a1 1 0 00-1-1h-4a1 1 0 00-1 1v11","M18 22H6","M18 6V3a1 1 0 00-1-1h-3"],"stroke":true},
  "lens": {"name":"Lens","viewBox":[0,0,24,24],"paths":["M15.725 7.296h.01","M6 12a6 6 0 016-6","M 2 12 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0"],"stroke":true},
  "lens-concave": {"name":"Lens Concave","viewBox":[0,0,24,24],"paths":["M7 2a1 1 0 0 0-.8 1.6 14 14 0 0 1 0 16.8A1 1 0 0 0 7 22h10a1 1 0 0 0 .8-1.6 14 14 0 0 1 0-16.8A1 1 0 0 0 17 2z"],"stroke":true},
  "lens-convex": {"name":"Lens Convex","viewBox":[0,0,24,24],"paths":["M13.433 2a1 1 0 0 1 .824.448 18 18 0 0 1 0 19.104 1 1 0 0 1-.824.448h-2.866a1 1 0 0 1-.824-.448 18 18 0 0 1 0-19.104A1 1 0 0 1 10.567 2z"],"stroke":true},
  "letter-text": {"name":"Letter Text","viewBox":[0,0,24,24],"paths":["M15 5h6","M15 12h6","M3 19h18","m3 12 3.553-7.724a.5.5 0 0 1 .894 0L11 12","M3.92 10h6.16"],"stroke":true},
  "letters": {"name":"Letters","viewBox":[0,0,24,24],"paths":["M15 8H9","M21 15.354a4 4 0 100 5.292","M3 18h4a2 2 0 010 4H3.5a.5.5 0 01-.5-.5v-7a.5.5 0 01.5-.5H6a2 2 0 010 4","m8 10 3.453-7.648a.6.6 0 011.094 0L16 10"],"stroke":true},
  "library": {"name":"Library","viewBox":[0,0,24,24],"paths":["m16 6 4 14","M12 6v14","M8 8v12","M4 4v16"],"stroke":true},
  "library-big": {"name":"Library Big","viewBox":[0,0,24,24],"paths":["M 3 3 h 8 v 18 h -8 z","M7 3v18","M20.4 18.9c.2.5-.1 1.1-.6 1.3l-1.9.7c-.5.2-1.1-.1-1.3-.6L11.1 5.1c-.2-.5.1-1.1.6-1.3l1.9-.7c.5-.2 1.1.1 1.3.6Z"],"stroke":true},
  "library-square": {"name":"Library Square","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","M7 7v10","M11 7v10","m15 7 2 10"],"stroke":true},
  "life-buoy": {"name":"Life Buoy","viewBox":[0,0,24,24],"paths":["M 2 12 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0","m4.93 4.93 4.24 4.24","m14.83 9.17 4.24-4.24","m14.83 14.83 4.24 4.24","m9.17 14.83-4.24 4.24","M 8 12 a 4 4 0 1 0 8 0 a 4 4 0 1 0 -8 0"],"stroke":true},
  "ligature": {"name":"Ligature","viewBox":[0,0,24,24],"paths":["M14 12h2v8","M14 20h4","M6 12h4","M6 20h4","M8 20V8a4 4 0 0 1 7.464-2"],"stroke":true},
  "lightbulb": {"name":"Lightbulb","viewBox":[0,0,24,24],"paths":["M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5","M9 18h6","M10 22h4"],"stroke":true},
  "lightbulb-off": {"name":"Lightbulb Off","viewBox":[0,0,24,24],"paths":["M16.8 11.2c.8-.9 1.2-2 1.2-3.2a6 6 0 0 0-9.3-5","m2 2 20 20","M6.3 6.3a4.67 4.67 0 0 0 1.2 5.2c.7.7 1.3 1.5 1.5 2.5","M9 18h6","M10 22h4"],"stroke":true},
  "lighthouse": {"name":"Lighthouse","viewBox":[0,0,24,24],"paths":["M12 3V2","M16.066 16.865 7 22l2-11V6a3 3 0 016 0v5l2 11","m19.792 4.5.866-.5","m19.797 13.5.866.5","M21 9h1","M3 9H2","m4.203 13.5-.866.5","M4.208 4.5 3.342 4","M5.5 22h13","m7.932 16.875 7.377-4.178","M8 11h8","M8 7h8"],"stroke":true},
  "line-chart": {"name":"Line Chart","viewBox":[0,0,24,24],"paths":["M3 3v16a2 2 0 0 0 2 2h16","m19 9-5 5-4-4-3 3"],"stroke":true},
  "line-dot-bottom-vertical": {"name":"Line Dot Bottom Vertical","viewBox":[0,0,24,24],"paths":["M12 3v12","M 9 18 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0"],"stroke":true},
  "line-dot-left-horizontal": {"name":"Line Dot Left Horizontal","viewBox":[0,0,24,24],"paths":["M9 12h12","M 3 12 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0"],"stroke":true},
  "line-dot-right-horizontal": {"name":"Line Dot Right Horizontal","viewBox":[0,0,24,24],"paths":["M 3 12 L 15 12","M 15 12 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0"],"stroke":true},
  "line-dot-top-vertical": {"name":"Line Dot Top Vertical","viewBox":[0,0,24,24],"paths":["M12 9v12","M 9 6 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0"],"stroke":true},
  "line-squiggle": {"name":"Line Squiggle","viewBox":[0,0,24,24],"paths":["M7 3.5c5-2 7 2.5 3 4C1.5 10 2 15 5 16c5 2 9-10 14-7s.5 13.5-4 12c-5-2.5.5-11 6-2"],"stroke":true},
  "line-style": {"name":"Line Style","viewBox":[0,0,24,24],"paths":["M11 5h2","M15 12h6","M19 5h2","M3 12h6","M3 19h18","M3 5h2"],"stroke":true},
  "link": {"name":"Link","viewBox":[0,0,24,24],"paths":["M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71","M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"],"stroke":true},
  "link-2": {"name":"Link 2","viewBox":[0,0,24,24],"paths":["M9 17H7A5 5 0 0 1 7 7h2","M15 7h2a5 5 0 1 1 0 10h-2","M 8 12 L 16 12"],"stroke":true},
  "link-2-off": {"name":"Link 2 Off","viewBox":[0,0,24,24],"paths":["M9 17H7A5 5 0 0 1 7 7","M15 7h2a5 5 0 0 1 4 8","M 8 12 L 12 12","M 2 2 L 22 22"],"stroke":true},
  "list": {"name":"List","viewBox":[0,0,24,24],"paths":["M3 5h.01","M3 12h.01","M3 19h.01","M8 5h13","M8 12h13","M8 19h13"],"stroke":true},
  "list-check": {"name":"List Check","viewBox":[0,0,24,24],"paths":["M16 5H3","M16 12H3","M11 19H3","m15 18 2 2 4-4"],"stroke":true},
  "list-checks": {"name":"List Checks","viewBox":[0,0,24,24],"paths":["M13 5h8","M13 12h8","M13 19h8","m3 17 2 2 4-4","m3 7 2 2 4-4"],"stroke":true},
  "list-chevrons-down-up": {"name":"List Chevrons Down Up","viewBox":[0,0,24,24],"paths":["M3 5h8","M3 12h8","M3 19h8","m15 5 3 3 3-3","m15 19 3-3 3 3"],"stroke":true},
  "list-chevrons-up-down": {"name":"List Chevrons Up Down","viewBox":[0,0,24,24],"paths":["M3 5h8","M3 12h8","M3 19h8","m15 8 3-3 3 3","m15 16 3 3 3-3"],"stroke":true},
  "list-clock": {"name":"List Clock","viewBox":[0,0,24,24],"paths":["M16 13v2.2l1.6 1","M3 12h3.458","M3 19h3.832","M3 5h18","M 10 15 a 6 6 0 1 0 12 0 a 6 6 0 1 0 -12 0"],"stroke":true},
  "list-collapse": {"name":"List Collapse","viewBox":[0,0,24,24],"paths":["M10 5h11","M10 12h11","M10 19h11","m3 10 3-3-3-3","m3 20 3-3-3-3"],"stroke":true},
  "list-end": {"name":"List End","viewBox":[0,0,24,24],"paths":["M16 5H3","M16 12H3","M9 19H3","m16 16-3 3 3 3","M21 5v12a2 2 0 0 1-2 2h-6"],"stroke":true},
  "list-filter": {"name":"List Filter","viewBox":[0,0,24,24],"paths":["M2 5h20","M6 12h12","M9 19h6"],"stroke":true},
  "list-filter-plus": {"name":"List Filter Plus","viewBox":[0,0,24,24],"paths":["M12 5H2","M6 12h12","M9 19h6","M16 5h6","M19 8V2"],"stroke":true},
  "list-indent-decrease": {"name":"List Indent Decrease","viewBox":[0,0,24,24],"paths":["M21 5H11","M21 12H11","M21 19H11","m7 8-4 4 4 4"],"stroke":true},
  "list-indent-increase": {"name":"List Indent Increase","viewBox":[0,0,24,24],"paths":["M21 5H11","M21 12H11","M21 19H11","m3 8 4 4-4 4"],"stroke":true},
  "list-minus": {"name":"List Minus","viewBox":[0,0,24,24],"paths":["M16 5H3","M11 12H3","M16 19H3","M21 12h-6"],"stroke":true},
  "list-music": {"name":"List Music","viewBox":[0,0,24,24],"paths":["M16 5H3","M11 12H3","M11 19H3","M21 16V5","M 15 16 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0"],"stroke":true},
  "list-ordered": {"name":"List Ordered","viewBox":[0,0,24,24],"paths":["M11 5h10","M11 12h10","M11 19h10","M4 4h1v5","M4 9h2","M6.5 20H3.4c0-1 2.6-1.925 2.6-3.5a1.5 1.5 0 0 0-2.6-1.02"],"stroke":true},
  "list-plus": {"name":"List Plus","viewBox":[0,0,24,24],"paths":["M16 5H3","M11 12H3","M16 19H3","M18 9v6","M21 12h-6"],"stroke":true},
  "list-restart": {"name":"List Restart","viewBox":[0,0,24,24],"paths":["M21 5H3","M7 12H3","M7 19H3","M12 18a5 5 0 0 0 9-3 4.5 4.5 0 0 0-4.5-4.5c-1.33 0-2.54.54-3.41 1.41L11 14","M11 10v4h4"],"stroke":true},
  "list-sort-ascending": {"name":"List Sort Ascending","viewBox":[0,0,24,24],"paths":["M3 19h18","M15 12H3","M9 5H3"],"stroke":true},
  "list-sort-descending": {"name":"List Sort Descending","viewBox":[0,0,24,24],"paths":["M15 12H3","M3 5h18","M9 19H3"],"stroke":true},
  "list-start": {"name":"List Start","viewBox":[0,0,24,24],"paths":["M3 5h6","M3 12h13","M3 19h13","m16 8-3-3 3-3","M21 19V7a2 2 0 0 0-2-2h-6"],"stroke":true},
  "list-todo": {"name":"List Todo","viewBox":[0,0,24,24],"paths":["M13 5h8","M13 12h8","M13 19h8","m3 17 2 2 4-4","M 3 4 h 6 v 6 h -6 z"],"stroke":true},
  "list-tree": {"name":"List Tree","viewBox":[0,0,24,24],"paths":["M8 5h13","M13 12h8","M13 19h8","M3 10a2 2 0 0 0 2 2h3","M3 5v12a2 2 0 0 0 2 2h3"],"stroke":true},
  "list-video": {"name":"List Video","viewBox":[0,0,24,24],"paths":["M21 5H3","M10 12H3","M10 19H3","M15 12.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997a1 1 0 0 1-1.517-.86z"],"stroke":true},
  "list-x": {"name":"List X","viewBox":[0,0,24,24],"paths":["M16 5H3","M11 12H3","M16 19H3","m15.5 9.5 5 5","m20.5 9.5-5 5"],"stroke":true},
  "loader": {"name":"Loader","viewBox":[0,0,24,24],"paths":["M12 2v4","m16.2 7.8 2.9-2.9","M18 12h4","m16.2 16.2 2.9 2.9","M12 18v4","m4.9 19.1 2.9-2.9","M2 12h4","m4.9 4.9 2.9 2.9"],"stroke":true},
  "loader-2": {"name":"Loader 2","viewBox":[0,0,24,24],"paths":["M21 12a9 9 0 1 1-6.219-8.56"],"stroke":true},
  "loader-circle": {"name":"Loader Circle","viewBox":[0,0,24,24],"paths":["M21 12a9 9 0 1 1-6.219-8.56"],"stroke":true},
  "loader-pinwheel": {"name":"Loader Pinwheel","viewBox":[0,0,24,24],"paths":["M22 12a1 1 0 0 1-10 0 1 1 0 0 0-10 0","M7 20.7a1 1 0 1 1 5-8.7 1 1 0 1 0 5-8.6","M7 3.3a1 1 0 1 1 5 8.6 1 1 0 1 0 5 8.6","M 2 12 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0"],"stroke":true},
  "locate": {"name":"Locate","viewBox":[0,0,24,24],"paths":["M 2 12 L 5 12","M 19 12 L 22 12","M 12 2 L 12 5","M 12 19 L 12 22","M 5 12 a 7 7 0 1 0 14 0 a 7 7 0 1 0 -14 0"],"stroke":true},
  "locate-fixed": {"name":"Locate Fixed","viewBox":[0,0,24,24],"paths":["M 2 12 L 5 12","M 19 12 L 22 12","M 12 2 L 12 5","M 12 19 L 12 22","M 5 12 a 7 7 0 1 0 14 0 a 7 7 0 1 0 -14 0","M 9 12 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0"],"stroke":true},
  "locate-off": {"name":"Locate Off","viewBox":[0,0,24,24],"paths":["M12 19v3","M12 2v3","M18.89 13.24a7 7 0 0 0-8.13-8.13","M19 12h3","M2 12h3","m2 2 20 20","M7.05 7.05a7 7 0 0 0 9.9 9.9"],"stroke":true},
  "location-edit": {"name":"Location Edit","viewBox":[0,0,24,24],"paths":["M17.97 9.304A8 8 0 0 0 2 10c0 4.69 4.887 9.562 7.022 11.468","M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z","M 7 10 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0"],"stroke":true},
  "lock": {"name":"Lock","viewBox":[0,0,24,24],"paths":["M 3 11 h 18 v 11 h -18 z","M7 11V7a5 5 0 0 1 10 0v4"],"stroke":true},
  "lock-keyhole": {"name":"Lock Keyhole","viewBox":[0,0,24,24],"paths":["M 11 16 a 1 1 0 1 0 2 0 a 1 1 0 1 0 -2 0","M 3 10 h 18 v 12 h -18 z","M7 10V7a5 5 0 0 1 10 0v3"],"stroke":true},
  "lock-keyhole-open": {"name":"Lock Keyhole Open","viewBox":[0,0,24,24],"paths":["M 11 16 a 1 1 0 1 0 2 0 a 1 1 0 1 0 -2 0","M 3 10 h 18 v 12 h -18 z","M7 10V7a5 5 0 0 1 9.33-2.5"],"stroke":true},
  "lock-open": {"name":"Lock Open","viewBox":[0,0,24,24],"paths":["M 3 11 h 18 v 11 h -18 z","M7 11V7a5 5 0 0 1 9.9-1"],"stroke":true},
  "log-in": {"name":"Log In","viewBox":[0,0,24,24],"paths":["m10 17 5-5-5-5","M15 12H3","M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"],"stroke":true},
  "log-out": {"name":"Log Out","viewBox":[0,0,24,24],"paths":["m16 17 5-5-5-5","M21 12H9","M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"],"stroke":true},
  "logs": {"name":"Logs","viewBox":[0,0,24,24],"paths":["M3 5h1","M3 12h1","M3 19h1","M8 5h1","M8 12h1","M8 19h1","M13 5h8","M13 12h8","M13 19h8"],"stroke":true},
  "lollipop": {"name":"Lollipop","viewBox":[0,0,24,24],"paths":["M 3 11 a 8 8 0 1 0 16 0 a 8 8 0 1 0 -16 0","m21 21-4.3-4.3","M11 11a2 2 0 0 0 4 0 4 4 0 0 0-8 0 6 6 0 0 0 12 0"],"stroke":true},
  "luggage": {"name":"Luggage","viewBox":[0,0,24,24],"paths":["M6 20a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2","M8 18V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v14","M10 20h4","M 14 20 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0","M 6 20 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0"],"stroke":true},
  "m-square": {"name":"M Square","viewBox":[0,0,24,24],"paths":["M8 16V8.5a.5.5 0 0 1 .9-.3l2.7 3.599a.5.5 0 0 0 .8 0l2.7-3.6a.5.5 0 0 1 .9.3V16","M 3 3 h 18 v 18 h -18 z"],"stroke":true},
  "magnet": {"name":"Magnet","viewBox":[0,0,24,24],"paths":["m12 15 4 4","M2.352 10.648a1.205 1.205 0 0 0 0 1.704l2.296 2.296a1.205 1.205 0 0 0 1.704 0l6.029-6.029a1 1 0 1 1 3 3l-6.029 6.029a1.205 1.205 0 0 0 0 1.704l2.296 2.296a1.205 1.205 0 0 0 1.704 0l6.365-6.367A1 1 0 0 0 8.716 4.282z","m5 8 4 4"],"stroke":true},
  "mail": {"name":"Mail","viewBox":[0,0,24,24],"paths":["m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7","M 2 4 h 20 v 16 h -20 z"],"stroke":true},
  "mail-badge": {"name":"Mail Badge","viewBox":[0,0,24,24],"paths":["M22 7.7V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8.25","M12 12.996a1.94 1.94 0 0 1-1.03-.296L2 7","m20.69 16.479 1.29 4.88a.5.5 0 0 1-.698.591l-1.843-.849a1 1 0 0 0-.879.001l-1.846.85a.5.5 0 0 1-.692-.593l1.29-4.88","M 16 14 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0"],"stroke":true},
  "mail-check": {"name":"Mail Check","viewBox":[0,0,24,24],"paths":["M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8","m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7","m16 19 2 2 4-4"],"stroke":true},
  "mail-clock": {"name":"Mail Clock","viewBox":[0,0,24,24],"paths":["M16 14v2.2l1.6 1","m22 7-.759.484","M6.835 20H4a2 2 0 01-2-2V6a2 2 0 012-2h16a2 2 0 012 2v2","M7.605 10.567 2 7","M 10 16 a 6 6 0 1 0 12 0 a 6 6 0 1 0 -12 0"],"stroke":true},
  "mail-dot": {"name":"Mail Dot","viewBox":[0,0,24,24],"paths":["M12.674 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4.675","m2 7 9 5.701a2 2 0 0 0 2 0l1.084-.686","M 16 7 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0"],"stroke":true},
  "mail-minus": {"name":"Mail Minus","viewBox":[0,0,24,24],"paths":["M22 15V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8","m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7","M16 19h6"],"stroke":true},
  "mail-open": {"name":"Mail Open","viewBox":[0,0,24,24],"paths":["M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z","m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10"],"stroke":true},
  "mail-pen": {"name":"Mail Pen","viewBox":[0,0,24,24],"paths":["M15.363 17.634a2 2 0 00-.506.854l-.837 2.87a.5.5 0 00.62.62l2.87-.837a2 2 0 00.854-.506l3.013-3.009a1 1 0 10-3.004-3.004z","M22 10.38V6a2 2 0 00-2-2H4a2 2 0 00-2 2v12a2 2 0 002 2h6.25","m22 7-8.991 5.727a2 2 0 01-2.009 0L2 7"],"stroke":true},
  "mail-plus": {"name":"Mail Plus","viewBox":[0,0,24,24],"paths":["M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8","m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7","M19 16v6","M16 19h6"],"stroke":true},
  "mail-question": {"name":"Mail Question","viewBox":[0,0,24,24],"paths":["M22 10.5V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h12.5","m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7","M18 15.28c.2-.4.5-.8.9-1a2.1 2.1 0 0 1 2.6.4c.3.4.5.8.5 1.3 0 1.3-2 2-2 2","M20 22v.01"],"stroke":true},
  "mail-question-mark": {"name":"Mail Question Mark","viewBox":[0,0,24,24],"paths":["M22 10.5V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h12.5","m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7","M18 15.28c.2-.4.5-.8.9-1a2.1 2.1 0 0 1 2.6.4c.3.4.5.8.5 1.3 0 1.3-2 2-2 2","M20 22v.01"],"stroke":true},
  "mail-search": {"name":"Mail Search","viewBox":[0,0,24,24],"paths":["M22 12.5V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h7.5","m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7","M18 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z","M 15 18 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0","m22 22-1.5-1.5"],"stroke":true},
  "mail-warning": {"name":"Mail Warning","viewBox":[0,0,24,24],"paths":["M22 10.5V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h12.5","m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7","M20 14v4","M20 22v.01"],"stroke":true},
  "mail-x": {"name":"Mail X","viewBox":[0,0,24,24],"paths":["M22 12.532V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8.792","m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7","m16.5 16.5 5 5","m21.5 16.5-5 5"],"stroke":true},
  "mailbox": {"name":"Mailbox","viewBox":[0,0,24,24],"paths":["M22 17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.5C2 7 4 5 6.5 5H18c2.2 0 4 1.8 4 4v8Z","M 15 9 L 18 9 L 18 11","M6.5 5C9 5 11 7 11 9.5V17a2 2 0 0 1-2 2","M 6 10 L 7 10"],"stroke":true},
  "mails": {"name":"Mails","viewBox":[0,0,24,24],"paths":["M17 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 1-1.732","m22 5.5-6.419 4.179a2 2 0 0 1-2.162 0L7 5.5","M 7 3 h 15 v 12 h -15 z"],"stroke":true},
  "map": {"name":"Map","viewBox":[0,0,24,24],"paths":["M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z","M15 5.764v15","M9 3.236v15"],"stroke":true},
  "map-minus": {"name":"Map Minus","viewBox":[0,0,24,24],"paths":["m11 19-1.106-.552a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0l4.212 2.106a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619V14","M15 5.764V14","M21 18h-6","M9 3.236v15"],"stroke":true},
  "map-pin": {"name":"Map Pin","viewBox":[0,0,24,24],"paths":["M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0","M 9 10 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0"],"stroke":true},
  "map-pin-check": {"name":"Map Pin Check","viewBox":[0,0,24,24],"paths":["M19.43 12.935c.357-.967.57-1.955.57-2.935a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 1.202 0 32.197 32.197 0 0 0 .813-.728","M 9 10 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0","m16 18 2 2 4-4"],"stroke":true},
  "map-pin-check-inside": {"name":"Map Pin Check Inside","viewBox":[0,0,24,24],"paths":["M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0","m9 10 2 2 4-4"],"stroke":true},
  "map-pin-house": {"name":"Map Pin House","viewBox":[0,0,24,24],"paths":["M15 22a1 1 0 0 1-1-1v-4a1 1 0 0 1 .445-.832l3-2a1 1 0 0 1 1.11 0l3 2A1 1 0 0 1 22 17v4a1 1 0 0 1-1 1z","M18 10a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 .601.2","M18 22v-3","M 7 10 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0"],"stroke":true},
  "map-pin-minus": {"name":"Map Pin Minus","viewBox":[0,0,24,24],"paths":["M18.977 14C19.6 12.701 20 11.343 20 10a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 1.202 0 32 32 0 0 0 .824-.738","M 9 10 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0","M16 18h6"],"stroke":true},
  "map-pin-minus-inside": {"name":"Map Pin Minus Inside","viewBox":[0,0,24,24],"paths":["M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0","M9 10h6"],"stroke":true},
  "map-pin-off": {"name":"Map Pin Off","viewBox":[0,0,24,24],"paths":["M12.75 7.09a3 3 0 0 1 2.16 2.16","M17.072 17.072c-1.634 2.17-3.527 3.912-4.471 4.727a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 1.432-4.568","m2 2 20 20","M8.475 2.818A8 8 0 0 1 20 10c0 1.183-.31 2.377-.81 3.533","M9.13 9.13a3 3 0 0 0 3.74 3.74"],"stroke":true},
  "map-pin-pen": {"name":"Map Pin Pen","viewBox":[0,0,24,24],"paths":["M17.97 9.304A8 8 0 0 0 2 10c0 4.69 4.887 9.562 7.022 11.468","M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z","M 7 10 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0"],"stroke":true},
  "map-pin-plus": {"name":"Map Pin Plus","viewBox":[0,0,24,24],"paths":["M19.914 11.105A7.298 7.298 0 0 0 20 10a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 1.202 0 32 32 0 0 0 .824-.738","M 9 10 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0","M16 18h6","M19 15v6"],"stroke":true},
  "map-pin-plus-inside": {"name":"Map Pin Plus Inside","viewBox":[0,0,24,24],"paths":["M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0","M12 7v6","M9 10h6"],"stroke":true},
  "map-pin-search": {"name":"Map Pin Search","viewBox":[0,0,24,24],"paths":["M 12.248 21.969 a 1 1 0 0 1 -0.849 -0.17 C 9.539 20.193 4 14.993 4 10 a 8 8 0 0 1 16 0 C 20 10.42 19.961 10.841 19.888 11.262","m22 22-1.88-1.88","M 9 10 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0","M 15 18 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0"],"stroke":true},
  "map-pin-x": {"name":"Map Pin X","viewBox":[0,0,24,24],"paths":["M19.752 11.901A7.78 7.78 0 0 0 20 10a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 1.202 0 19 19 0 0 0 .09-.077","M 9 10 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0","m21.5 15.5-5 5","m21.5 20.5-5-5"],"stroke":true},
  "map-pin-x-inside": {"name":"Map Pin X Inside","viewBox":[0,0,24,24],"paths":["M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0","m14.5 7.5-5 5","m9.5 7.5 5 5"],"stroke":true},
  "map-pinned": {"name":"Map Pinned","viewBox":[0,0,24,24],"paths":["M18 8c0 3.613-3.869 7.429-5.393 8.795a1 1 0 01-1.214 0C9.87 15.429 6 11.613 6 8a6 6 0 0112 0","M4.474 15h-.197a1 1 0 00-.969.753l-1.097 4.35a1.5 1.5 0 001.444 1.898L20.344 22a1.5 1.5 0 001.446-1.897l-1.098-4.35a1 1 0 00-.969-.753h-.197","M 10 8 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0"],"stroke":true},
  "map-plus": {"name":"Map Plus","viewBox":[0,0,24,24],"paths":["m11 19-1.106-.552a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0l4.212 2.106a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619V12","M15 5.764V12","M18 15v6","M21 18h-6","M9 3.236v15"],"stroke":true},
  "mars": {"name":"Mars","viewBox":[0,0,24,24],"paths":["M16 3h5v5","m21 3-6.75 6.75","M 4 14 a 6 6 0 1 0 12 0 a 6 6 0 1 0 -12 0"],"stroke":true},
  "mars-stroke": {"name":"Mars Stroke","viewBox":[0,0,24,24],"paths":["m14 6 4 4","M17 3h4v4","m21 3-7.75 7.75","M 3 15 a 6 6 0 1 0 12 0 a 6 6 0 1 0 -12 0"],"stroke":true},
  "martini": {"name":"Martini","viewBox":[0,0,24,24],"paths":["M12 12 4.207 4.207A.707.707 0 0 1 4.707 3h14.586a.707.707 0 0 1 .5 1.207z","M12 12v10","M7 22h10"],"stroke":true},
  "maximize": {"name":"Maximize","viewBox":[0,0,24,24],"paths":["M8 3H5a2 2 0 0 0-2 2v3","M21 8V5a2 2 0 0 0-2-2h-3","M3 16v3a2 2 0 0 0 2 2h3","M16 21h3a2 2 0 0 0 2-2v-3"],"stroke":true},
  "maximize-2": {"name":"Maximize 2","viewBox":[0,0,24,24],"paths":["M15 3h6v6","m21 3-7 7","m3 21 7-7","M9 21H3v-6"],"stroke":true},
  "medal": {"name":"Medal","viewBox":[0,0,24,24],"paths":["M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15","M11 12 5.12 2.2","m13 12 5.88-9.8","M8 7h8","M 7 17 a 5 5 0 1 0 10 0 a 5 5 0 1 0 -10 0","M12 18v-2h-.5"],"stroke":true},
  "megaphone": {"name":"Megaphone","viewBox":[0,0,24,24],"paths":["M11 6a13 13 0 0 0 8.4-2.8A1 1 0 0 1 21 4v12a1 1 0 0 1-1.6.8A13 13 0 0 0 11 14H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z","M6 14a12 12 0 0 0 2.4 7.2 2 2 0 0 0 3.2-2.4A8 8 0 0 1 10 14","M8 6v8"],"stroke":true},
  "megaphone-off": {"name":"Megaphone Off","viewBox":[0,0,24,24],"paths":["M11.636 6A13 13 0 0 0 19.4 3.2 1 1 0 0 1 21 4v11.344","M14.378 14.357A13 13 0 0 0 11 14H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h1","m2 2 20 20","M6 14a12 12 0 0 0 2.4 7.2 2 2 0 0 0 3.2-2.4A8 8 0 0 1 10 14","M8 8v6"],"stroke":true},
  "meh": {"name":"Meh","viewBox":[0,0,24,24],"paths":["M15 10V9","M8 16h8","M9 10V9","M 2 12 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0"],"stroke":true},
  "memory-stick": {"name":"Memory Stick","viewBox":[0,0,24,24],"paths":["M12 12v-2","M12 18v-2","M16 12v-2","M16 18v-2","M2 11h1.5","M20 18v-2","M20.5 11H22","M4 18v-2","M8 12v-2","M8 18v-2","M 2 6 h 20 v 10 h -20 z"],"stroke":true},
  "menu": {"name":"Menu","viewBox":[0,0,24,24],"paths":["M4 5h16","M4 12h16","M4 19h16"],"stroke":true},
  "menu-square": {"name":"Menu Square","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","M7 8h10","M7 12h10","M7 16h10"],"stroke":true},
  "merge": {"name":"Merge","viewBox":[0,0,24,24],"paths":["m8 6 4-4 4 4","M12 2v10.3a4 4 0 0 1-1.172 2.872L4 22","m20 22-5-5"],"stroke":true},
  "message-circle": {"name":"Message Circle","viewBox":[0,0,24,24],"paths":["M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"],"stroke":true},
  "message-circle-check": {"name":"Message Circle Check","viewBox":[0,0,24,24],"paths":["M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719","m16 9-5.5 5.5L8 12"],"stroke":true},
  "message-circle-code": {"name":"Message Circle Code","viewBox":[0,0,24,24],"paths":["m10 9-3 3 3 3","m14 15 3-3-3-3","M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"],"stroke":true},
  "message-circle-dashed": {"name":"Message Circle Dashed","viewBox":[0,0,24,24],"paths":["M10.1 2.182a10 10 0 0 1 3.8 0","M13.9 21.818a10 10 0 0 1-3.8 0","M17.609 3.72a10 10 0 0 1 2.69 2.7","M2.182 13.9a10 10 0 0 1 0-3.8","M20.28 17.61a10 10 0 0 1-2.7 2.69","M21.818 10.1a10 10 0 0 1 0 3.8","M3.721 6.391a10 10 0 0 1 2.7-2.69","m6.163 21.117-2.906.85a1 1 0 0 1-1.236-1.169l.965-2.98"],"stroke":true},
  "message-circle-dashed-check": {"name":"Message Circle Dashed Check","viewBox":[0,0,24,24],"paths":["M10.1 2.182a10 10 0 013.8 0","M13.9 21.818a10 10 0 01-3.8 0","M17.609 3.72a10 10 0 012.69 2.7","M2.182 13.9a10 10 0 010-3.8","M20.28 17.61a10 10 0 01-2.7 2.69","M21.818 10.1a10 10 0 010 3.8","M3.721 6.391a10 10 0 012.7-2.69","m6.163 21.117-2.906.85a1 1 0 01-1.236-1.169l.965-2.98","m16 9-5.5 5.5L8 12"],"stroke":true},
  "message-circle-heart": {"name":"Message Circle Heart","viewBox":[0,0,24,24],"paths":["M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719","M7.828 13.07A3 3 0 0 1 12 8.764a3 3 0 0 1 5.004 2.224 3 3 0 0 1-.832 2.083l-3.447 3.62a1 1 0 0 1-1.45-.001z"],"stroke":true},
  "message-circle-more": {"name":"Message Circle More","viewBox":[0,0,24,24],"paths":["M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719","M8 12h.01","M12 12h.01","M16 12h.01"],"stroke":true},
  "message-circle-off": {"name":"Message Circle Off","viewBox":[0,0,24,24],"paths":["m2 2 20 20","M4.93 4.929a10 10 0 0 0-1.938 11.412 2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 0 0 11.302-1.989","M8.35 2.69A10 10 0 0 1 21.3 15.65"],"stroke":true},
  "message-circle-plus": {"name":"Message Circle Plus","viewBox":[0,0,24,24],"paths":["M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719","M8 12h8","M12 8v8"],"stroke":true},
  "message-circle-question": {"name":"Message Circle Question","viewBox":[0,0,24,24],"paths":["M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719","M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3","M12 17h.01"],"stroke":true},
  "message-circle-question-mark": {"name":"Message Circle Question Mark","viewBox":[0,0,24,24],"paths":["M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719","M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3","M12 17h.01"],"stroke":true},
  "message-circle-reply": {"name":"Message Circle Reply","viewBox":[0,0,24,24],"paths":["M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719","m10 15-3-3 3-3","M7 12h8a2 2 0 0 1 2 2v1"],"stroke":true},
  "message-circle-warning": {"name":"Message Circle Warning","viewBox":[0,0,24,24],"paths":["M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719","M12 8v4","M12 16h.01"],"stroke":true},
  "message-circle-x": {"name":"Message Circle X","viewBox":[0,0,24,24],"paths":["M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719","m15 9-6 6","m9 9 6 6"],"stroke":true},
  "message-square": {"name":"Message Square","viewBox":[0,0,24,24],"paths":["M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"],"stroke":true},
  "message-square-check": {"name":"Message Square Check","viewBox":[0,0,24,24],"paths":["M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.7.7 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z","m9 11 2 2 4-4"],"stroke":true},
  "message-square-code": {"name":"Message Square Code","viewBox":[0,0,24,24],"paths":["M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z","m10 8-3 3 3 3","m14 14 3-3-3-3"],"stroke":true},
  "message-square-dashed": {"name":"Message Square Dashed","viewBox":[0,0,24,24],"paths":["M14 3h2","M16 19h-2","M2 12v-2","M2 16v5.286a.71.71 0 0 0 1.212.502l1.149-1.149","M20 19a2 2 0 0 0 2-2v-1","M22 10v2","M22 6V5a2 2 0 0 0-2-2","M4 3a2 2 0 0 0-2 2v1","M8 19h2","M8 3h2"],"stroke":true},
  "message-square-diff": {"name":"Message Square Diff","viewBox":[0,0,24,24],"paths":["M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z","M10 15h4","M10 9h4","M12 7v4"],"stroke":true},
  "message-square-dot": {"name":"Message Square Dot","viewBox":[0,0,24,24],"paths":["M12.7 3H4a2 2 0 0 0-2 2v16.286a.71.71 0 0 0 1.212.502l2.202-2.202A2 2 0 0 1 6.828 19H20a2 2 0 0 0 2-2v-4.7","M 16 6 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0"],"stroke":true},
  "message-square-heart": {"name":"Message Square Heart","viewBox":[0,0,24,24],"paths":["M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z","M7.5 9.5c0 .687.265 1.383.697 1.844l3.009 3.264a1.14 1.14 0 0 0 .407.314 1 1 0 0 0 .783-.004 1.14 1.14 0 0 0 .398-.31l3.008-3.264A2.77 2.77 0 0 0 16.5 9.5 2.5 2.5 0 0 0 12 8a2.5 2.5 0 0 0-4.5 1.5"],"stroke":true},
  "message-square-lock": {"name":"Message Square Lock","viewBox":[0,0,24,24],"paths":["M22 8.5V5a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v16.286a.71.71 0 0 0 1.212.502l2.202-2.202A2 2 0 0 1 6.828 19H10","M20 15v-2a2 2 0 0 0-4 0v2","M 14 15 h 8 v 5 h -8 z"],"stroke":true},
  "message-square-more": {"name":"Message Square More","viewBox":[0,0,24,24],"paths":["M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z","M12 11h.01","M16 11h.01","M8 11h.01"],"stroke":true},
  "message-square-off": {"name":"Message Square Off","viewBox":[0,0,24,24],"paths":["M19 19H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.7.7 0 0 1 2 21.286V5a2 2 0 0 1 1.184-1.826","m2 2 20 20","M8.656 3H20a2 2 0 0 1 2 2v11.344"],"stroke":true},
  "message-square-plus": {"name":"Message Square Plus","viewBox":[0,0,24,24],"paths":["M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z","M12 8v6","M9 11h6"],"stroke":true},
  "message-square-quote": {"name":"Message Square Quote","viewBox":[0,0,24,24],"paths":["M14 14a2 2 0 0 0 2-2V8h-2","M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z","M8 14a2 2 0 0 0 2-2V8H8"],"stroke":true},
  "message-square-reply": {"name":"Message Square Reply","viewBox":[0,0,24,24],"paths":["M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z","m10 8-3 3 3 3","M17 14v-1a2 2 0 0 0-2-2H7"],"stroke":true},
  "message-square-share": {"name":"Message Square Share","viewBox":[0,0,24,24],"paths":["M12 3H4a2 2 0 0 0-2 2v16.286a.71.71 0 0 0 1.212.502l2.202-2.202A2 2 0 0 1 6.828 19H20a2 2 0 0 0 2-2v-4","M16 3h6v6","m16 9 6-6"],"stroke":true},
  "message-square-text": {"name":"Message Square Text","viewBox":[0,0,24,24],"paths":["M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z","M7 11h10","M7 15h6","M7 7h8"],"stroke":true},
  "message-square-warning": {"name":"Message Square Warning","viewBox":[0,0,24,24],"paths":["M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z","M12 15h.01","M12 7v4"],"stroke":true},
  "message-square-x": {"name":"Message Square X","viewBox":[0,0,24,24],"paths":["M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z","m14.5 8.5-5 5","m9.5 8.5 5 5"],"stroke":true},
  "messages-circle": {"name":"Messages Circle","viewBox":[0,0,24,24],"paths":["M19.95 10.05a7 7 0 011.412 7.872 1 1 0 00-.058.787l.675 2.089a1 1 0 01-1.236 1.168l-2.155-.631a1 1 0 00-.745.06 7 7 0 01-7.793-1.445","M2.696 12.708a1 1 0 00-.058-.785 7 7 0 113.518 3.473 1 1 0 00-.744-.061l-2.155.63a1 1 0 01-1.236-1.167z"],"stroke":true},
  "messages-square": {"name":"Messages Square","viewBox":[0,0,24,24],"paths":["M16 10a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 14.286V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z","M20 9a2 2 0 0 1 2 2v10.286a.71.71 0 0 1-1.212.502l-2.202-2.202A2 2 0 0 0 17.172 19H10a2 2 0 0 1-2-2v-1"],"stroke":true},
  "metronome": {"name":"Metronome","viewBox":[0,0,24,24],"paths":["M12 11.4V9.1","m12 17 6.59-6.59","m15.05 5.7-.218-.691a3 3 0 0 0-5.663 0L4.418 19.695A1 1 0 0 0 5.37 21h13.253a1 1 0 0 0 .951-1.31L18.45 16.2","M 18 9 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0"],"stroke":true},
  "mic": {"name":"Mic","viewBox":[0,0,24,24],"paths":["M12 19v3","M19 10v2a7 7 0 0 1-14 0v-2","M 9 2 h 6 v 13 h -6 z"],"stroke":true},
  "mic-2": {"name":"Mic 2","viewBox":[0,0,24,24],"paths":["m11 7.601-5.994 8.19a1 1 0 0 0 .1 1.298l.817.818a1 1 0 0 0 1.314.087L15.09 12","M16.5 21.174C15.5 20.5 14.372 20 13 20c-2.058 0-3.928 2.356-6 2-2.072-.356-2.775-3.369-1.5-4.5","M 11 7 a 5 5 0 1 0 10 0 a 5 5 0 1 0 -10 0"],"stroke":true},
  "mic-audio-lines": {"name":"Mic Audio Lines","viewBox":[0,0,24,24],"paths":["M10 3v2.341","M12 17v4","M14 5v.341","M18 5v13","M2 10v3","M22 10v3","M6 6v11","M9 21h6","M 10 9 h 4 v 8 h -4 z"],"stroke":true},
  "mic-off": {"name":"Mic Off","viewBox":[0,0,24,24],"paths":["M12 19v3","M15 9.34V5a3 3 0 0 0-5.68-1.33","M16.95 16.95A7 7 0 0 1 5 12v-2","M18.89 13.23A7 7 0 0 0 19 12v-2","m2 2 20 20","M9 9v3a3 3 0 0 0 5.12 2.12"],"stroke":true},
  "mic-signal": {"name":"Mic Signal","viewBox":[0,0,24,24],"paths":["M12 17v4","M18 11a6 6 0 00-3-5.197","M2 11a10 10 0 015-8.662","M22 11a10 10 0 00-5-8.662","M6 11a6 6 0 013-5.197","M9 21h6","M 10 9 h 4 v 8 h -4 z"],"stroke":true},
  "mic-vocal": {"name":"Mic Vocal","viewBox":[0,0,24,24],"paths":["m11 7.601-5.994 8.19a1 1 0 0 0 .1 1.298l.817.818a1 1 0 0 0 1.314.087L15.09 12","M16.5 21.174C15.5 20.5 14.372 20 13 20c-2.058 0-3.928 2.356-6 2-2.072-.356-2.775-3.369-1.5-4.5","M 11 7 a 5 5 0 1 0 10 0 a 5 5 0 1 0 -10 0"],"stroke":true},
  "microchip": {"name":"Microchip","viewBox":[0,0,24,24],"paths":["M10 12h4","M10 17h4","M10 7h4","M18 12h2","M18 18h2","M18 6h2","M4 12h2","M4 18h2","M4 6h2","M 6 2 h 12 v 20 h -12 z"],"stroke":true},
  "microscope": {"name":"Microscope","viewBox":[0,0,24,24],"paths":["M6 18h8","M3 22h18","M14 22a7 7 0 1 0 0-14h-1","M9 14h2","M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z","M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3"],"stroke":true},
  "microwave": {"name":"Microwave","viewBox":[0,0,24,24],"paths":["M 2 4 h 20 v 15 h -20 z","M 6 8 h 8 v 7 h -8 z","M18 8v7","M6 19v2","M18 19v2"],"stroke":true},
  "midi-port": {"name":"Midi Port","viewBox":[0,0,24,24],"paths":["M12 18h.01","M15 2.458V5a1 1 0 01-1 1h-4a1 1 0 01-1-1V2.458","M16 16h.01","M18 12h.01","M6 12h.01","M8 16h.01","M 2 12 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0"],"stroke":true},
  "milestone": {"name":"Milestone","viewBox":[0,0,24,24],"paths":["M12 13v8","M12 3v3","M18.172 6a2 2 0 0 1 1.414.586l2.06 2.06a1.207 1.207 0 0 1 0 1.708l-2.06 2.06a2 2 0 0 1-1.414.586H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z"],"stroke":true},
  "milk": {"name":"Milk","viewBox":[0,0,24,24],"paths":["M8 2h8","M9 2v2.789a4 4 0 0 1-.672 2.219l-.656.984A4 4 0 0 0 7 10.212V20a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-9.789a4 4 0 0 0-.672-2.219l-.656-.984A4 4 0 0 1 15 4.788V2","M7 15a6.472 6.472 0 0 1 5 0 6.47 6.47 0 0 0 5 0"],"stroke":true},
  "milk-off": {"name":"Milk Off","viewBox":[0,0,24,24],"paths":["M8 2h8","M9 2v1.343M15 2v2.789a4 4 0 0 0 .672 2.219l.656.984a4 4 0 0 1 .672 2.22v1.131M7.8 7.8l-.128.192A4 4 0 0 0 7 10.212V20a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-3","M7 15a6.47 6.47 0 0 1 5 0 6.472 6.472 0 0 0 3.435.435","M 2 2 L 22 22"],"stroke":true},
  "minimize": {"name":"Minimize","viewBox":[0,0,24,24],"paths":["M8 3v3a2 2 0 0 1-2 2H3","M21 8h-3a2 2 0 0 1-2-2V3","M3 16h3a2 2 0 0 1 2 2v3","M16 21v-3a2 2 0 0 1 2-2h3"],"stroke":true},
  "minimize-2": {"name":"Minimize 2","viewBox":[0,0,24,24],"paths":["m14 10 7-7","M20 10h-6V4","m3 21 7-7","M4 14h6v6"],"stroke":true},
  "minus": {"name":"Minus","viewBox":[0,0,24,24],"paths":["M5 12h14"],"stroke":true},
  "minus-circle": {"name":"Minus Circle","viewBox":[0,0,24,24],"paths":["M 2 12 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0","M8 12h8"],"stroke":true},
  "minus-square": {"name":"Minus Square","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","M8 12h8"],"stroke":true},
  "mirror-rectangular": {"name":"Mirror Rectangular","viewBox":[0,0,24,24],"paths":["M11 6 8 9","m16 7-8 8","M 4 2 h 16 v 20 h -16 z"],"stroke":true},
  "mirror-round": {"name":"Mirror Round","viewBox":[0,0,24,24],"paths":["M10 6.6 8.6 8","M12 18v4","M15 7.5 9.5 13","M7 22h10","M 4 10 a 8 8 0 1 0 16 0 a 8 8 0 1 0 -16 0"],"stroke":true},
  "monitor": {"name":"Monitor","viewBox":[0,0,24,24],"paths":["M 2 3 h 20 v 14 h -20 z","M 8 21 L 16 21","M 12 17 L 12 21"],"stroke":true},
  "monitor-check": {"name":"Monitor Check","viewBox":[0,0,24,24],"paths":["m9 10 2 2 4-4","M 2 3 h 20 v 14 h -20 z","M12 17v4","M8 21h8"],"stroke":true},
  "monitor-cloud": {"name":"Monitor Cloud","viewBox":[0,0,24,24],"paths":["M11 13a3 3 0 1 1 2.83-4H14a2 2 0 0 1 0 4z","M12 17v4","M8 21h8","M 2 3 h 20 v 14 h -20 z"],"stroke":true},
  "monitor-cog": {"name":"Monitor Cog","viewBox":[0,0,24,24],"paths":["M12 17v4","m14.305 7.53.923-.382","m15.228 4.852-.923-.383","m16.852 3.228-.383-.924","m16.852 8.772-.383.923","m19.148 3.228.383-.924","m19.53 9.696-.382-.924","m20.772 4.852.924-.383","m20.772 7.148.924.383","M22 13v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7","M8 21h8","M 15 6 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0"],"stroke":true},
  "monitor-dot": {"name":"Monitor Dot","viewBox":[0,0,24,24],"paths":["M12 17v4","M22 12.307V15a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h8.693","M8 21h8","M 16 6 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0"],"stroke":true},
  "monitor-down": {"name":"Monitor Down","viewBox":[0,0,24,24],"paths":["M12 13V7","m15 10-3 3-3-3","M 2 3 h 20 v 14 h -20 z","M12 17v4","M8 21h8"],"stroke":true},
  "monitor-off": {"name":"Monitor Off","viewBox":[0,0,24,24],"paths":["M12 17v4","M17 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 1.184-1.826","m2 2 20 20","M8 21h8","M8.656 3H20a2 2 0 0 1 2 2v10a2 2 0 0 1-.293 1.042"],"stroke":true},
  "monitor-pause": {"name":"Monitor Pause","viewBox":[0,0,24,24],"paths":["M10 13V7","M14 13V7","M 2 3 h 20 v 14 h -20 z","M12 17v4","M8 21h8"],"stroke":true},
  "monitor-pc": {"name":"Monitor Pc","viewBox":[0,0,24,24],"paths":["M10 15H4a2 2 0 01-2-2V7a2 2 0 012-2h6","M10 19H5","M14 11h8","M14 7h8","M18 17h.01","M9 19v-4","M 14 3 h 8 v 18 h -8 z"],"stroke":true},
  "monitor-play": {"name":"Monitor Play","viewBox":[0,0,24,24],"paths":["M15.033 9.44a.647.647 0 0 1 0 1.12l-4.065 2.352a.645.645 0 0 1-.968-.56V7.648a.645.645 0 0 1 .967-.56z","M12 17v4","M8 21h8","M 2 3 h 20 v 14 h -20 z"],"stroke":true},
  "monitor-smartphone": {"name":"Monitor Smartphone","viewBox":[0,0,24,24],"paths":["M18 8V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h8","M10 19v-3.96 3.15","M7 19h5","M 16 12 h 6 v 10 h -6 z"],"stroke":true},
  "monitor-speaker": {"name":"Monitor Speaker","viewBox":[0,0,24,24],"paths":["M5.5 20H8","M17 9h.01","M 12 4 h 10 v 16 h -10 z","M8 6H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h4","M 16 15 a 1 1 0 1 0 2 0 a 1 1 0 1 0 -2 0"],"stroke":true},
  "monitor-stop": {"name":"Monitor Stop","viewBox":[0,0,24,24],"paths":["M12 17v4","M8 21h8","M 2 3 h 20 v 14 h -20 z","M 9 7 h 6 v 6 h -6 z"],"stroke":true},
  "monitor-up": {"name":"Monitor Up","viewBox":[0,0,24,24],"paths":["m9 10 3-3 3 3","M12 13V7","M 2 3 h 20 v 14 h -20 z","M12 17v4","M8 21h8"],"stroke":true},
  "monitor-x": {"name":"Monitor X","viewBox":[0,0,24,24],"paths":["m14.5 12.5-5-5","m9.5 12.5 5-5","M 2 3 h 20 v 14 h -20 z","M12 17v4","M8 21h8"],"stroke":true},
  "moon": {"name":"Moon","viewBox":[0,0,24,24],"paths":["M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"],"stroke":true},
  "moon-star": {"name":"Moon Star","viewBox":[0,0,24,24],"paths":["M18 5h4","M20 3v4","M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"],"stroke":true},
  "mop": {"name":"Mop","viewBox":[0,0,24,24],"paths":["M10 22c2.761 0 5-1.79 5-4-4.42 0-4.08-5-8.5-5a1 1 0 100 9za3 3 0 01-3-3","M12.5 11.5 22 2","m6.98 13.02 2.665-2.664a1.21 1.21 0 011.71 0l2.29 2.288a1.21 1.21 0 010 1.712l-2.088 2.087"],"stroke":true},
  "mop-sparkles": {"name":"Mop Sparkles","viewBox":[0,0,24,24],"paths":["M10 22a3 3 0 01-3-3","M10 22c2.761 0 5-1.79 5-4-4.42 0-4.08-5-8.5-5a4.501 4.501 0 000 9z","M10 3H8","M12.5 11.5 22 2","M20 13v4","M22 15h-4","M4 5v4","M6 7H2","m6.98 13.02 2.665-2.664a1.21 1.21 0 011.71 0l2.29 2.288a1.21 1.21 0 010 1.712l-2.088 2.087","M9 2v2"],"stroke":true},
  "more-horizontal": {"name":"More Horizontal","viewBox":[0,0,24,24],"paths":["M 11 12 a 1 1 0 1 0 2 0 a 1 1 0 1 0 -2 0","M 18 12 a 1 1 0 1 0 2 0 a 1 1 0 1 0 -2 0","M 4 12 a 1 1 0 1 0 2 0 a 1 1 0 1 0 -2 0"],"stroke":true},
  "more-vertical": {"name":"More Vertical","viewBox":[0,0,24,24],"paths":["M 11 12 a 1 1 0 1 0 2 0 a 1 1 0 1 0 -2 0","M 11 5 a 1 1 0 1 0 2 0 a 1 1 0 1 0 -2 0","M 11 19 a 1 1 0 1 0 2 0 a 1 1 0 1 0 -2 0"],"stroke":true},
  "mosque": {"name":"Mosque","viewBox":[0,0,24,24],"paths":["M12.268 2a2 2 0 003.465 2","M14 5 L14 8","M16 22v-3a2 2 0 00-4 0v3","M21 13c-.662-1.497-1.666-2.753-2.9-3.63C16.825 8.47 15.422 8 14 8s-2.826.47-4.1 1.37C8.668 10.248 7.663 11.504 7 13z","M3 9h4","M7 22V6a5 5 0 00-2-4 5 5 0 00-2 4v14a2 2 0 002 2h14a2 2 0 002-2v-7"],"stroke":true},
  "motorbike": {"name":"Motorbike","viewBox":[0,0,24,24],"paths":["m18 14-1-3","m3 9 6 2a2 2 0 0 1 2-2h2a2 2 0 0 1 1.99 1.81","M8 17h3a1 1 0 0 0 1-1 6 6 0 0 1 6-6 1 1 0 0 0 1-1v-.75A5 5 0 0 0 17 5","M 16 17 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0","M 2 17 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0"],"stroke":true},
  "mountain": {"name":"Mountain","viewBox":[0,0,24,24],"paths":["m8 3 4 8 5-5 5 15H2L8 3z"],"stroke":true},
  "mountain-snow": {"name":"Mountain Snow","viewBox":[0,0,24,24],"paths":["m8 3 4 8 5-5 5 15H2L8 3z","M4.14 15.08c2.62-1.57 5.24-1.43 7.86.42 2.74 1.94 5.49 2 8.23.19"],"stroke":true},
  "mouse": {"name":"Mouse","viewBox":[0,0,24,24],"paths":["M 5 2 h 14 v 20 h -14 z","M12 6v4"],"stroke":true},
  "mouse-left": {"name":"Mouse Left","viewBox":[0,0,24,24],"paths":["M12 7.318V10","M5 10v5a7 7 0 0 0 14 0V9c0-3.527-2.608-6.515-6-7","M 5 4 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0"],"stroke":true},
  "mouse-off": {"name":"Mouse Off","viewBox":[0,0,24,24],"paths":["M12 6v.343","M18.218 18.218A7 7 0 0 1 5 15V9a7 7 0 0 1 .782-3.218","M19 13.343V9A7 7 0 0 0 8.56 2.902","M22 22 2 2"],"stroke":true},
  "mouse-pointer": {"name":"Mouse Pointer","viewBox":[0,0,24,24],"paths":["M12.586 12.586 19 19","M3.688 3.037a.497.497 0 0 0-.651.651l6.5 15.999a.501.501 0 0 0 .947-.062l1.569-6.083a2 2 0 0 1 1.448-1.479l6.124-1.579a.5.5 0 0 0 .063-.947z"],"stroke":true},
  "mouse-pointer-2": {"name":"Mouse Pointer 2","viewBox":[0,0,24,24],"paths":["M4.037 4.688a.495.495 0 0 1 .651-.651l16 6.5a.5.5 0 0 1-.063.947l-6.124 1.58a2 2 0 0 0-1.438 1.435l-1.579 6.126a.5.5 0 0 1-.947.063z"],"stroke":true},
  "mouse-pointer-2-off": {"name":"Mouse Pointer 2 Off","viewBox":[0,0,24,24],"paths":["m15.55 8.45 5.138 2.087a.5.5 0 0 1-.063.947l-6.124 1.58a2 2 0 0 0-1.438 1.435l-1.579 6.126a.5.5 0 0 1-.947.063L8.45 15.551","M22 2 2 22","m6.816 11.528-2.779-6.84a.495.495 0 0 1 .651-.651l6.84 2.779"],"stroke":true},
  "mouse-pointer-ban": {"name":"Mouse Pointer Ban","viewBox":[0,0,24,24],"paths":["M2.034 2.681a.498.498 0 0 1 .647-.647l9 3.5a.5.5 0 0 1-.033.944L8.204 7.545a1 1 0 0 0-.66.66l-1.066 3.443a.5.5 0 0 1-.944.033z","M 10 16 a 6 6 0 1 0 12 0 a 6 6 0 1 0 -12 0","m11.8 11.8 8.4 8.4"],"stroke":true},
  "mouse-pointer-click": {"name":"Mouse Pointer Click","viewBox":[0,0,24,24],"paths":["M14 4.1 12 6","m5.1 8-2.9-.8","m6 12-1.9 2","M7.2 2.2 8 5.1","M9.037 9.69a.498.498 0 0 1 .653-.653l11 4.5a.5.5 0 0 1-.074.949l-4.349 1.041a1 1 0 0 0-.74.739l-1.04 4.35a.5.5 0 0 1-.95.074z"],"stroke":true},
  "mouse-pointer-square-dashed": {"name":"Mouse Pointer Square Dashed","viewBox":[0,0,24,24],"paths":["M12.034 12.681a.498.498 0 0 1 .647-.647l9 3.5a.5.5 0 0 1-.033.943l-3.444 1.068a1 1 0 0 0-.66.66l-1.067 3.443a.5.5 0 0 1-.943.033z","M5 3a2 2 0 0 0-2 2","M19 3a2 2 0 0 1 2 2","M5 21a2 2 0 0 1-2-2","M9 3h1","M9 21h2","M14 3h1","M3 9v1","M21 9v2","M3 14v1"],"stroke":true},
  "mouse-right": {"name":"Mouse Right","viewBox":[0,0,24,24],"paths":["M12 7.318V10","M19 10v5a7 7 0 0 1-14 0V9c0-3.527 2.608-6.515 6-7","M 15 4 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0"],"stroke":true},
  "mouth": {"name":"Mouth","viewBox":[0,0,24,24],"paths":["M2 12a50.5 50.5 0 0020 0 1 1 0 00-1-1","M2.457 11.159a1 1 0 00-.307 1.369 11.59 11.59 0 0019.7 0 1 1 0 00-.308-1.368c-2.426-1.568-3.65-2.284-5.479-3.644a2.6 2.6 0 00-3.373.208 1 1 0 01-1.38 0 2.62 2.62 0 00-3.373-.208c-1.83 1.36-3.053 2.076-5.48 3.643"],"stroke":true},
  "mouth-off": {"name":"Mouth Off","viewBox":[0,0,24,24],"paths":["M13.074 7.417a2.6 2.6 0 012.989.099c1.829 1.36 3.053 2.076 5.479 3.644a1 1 0 01.308 1.368 11.6 11.6 0 01-1.617 2.05","M2 12a50.5 50.5 0 0010.99.99","m2 2 20 20","M21 11a1 1 0 011 1 51 51 0 01-3.734.61","M7.695 7.695c-1.7 1.247-2.92 1.967-5.238 3.464a1 1 0 00-.307 1.369 11.6 11.6 0 0014.766 4.388"],"stroke":true},
  "move": {"name":"Move","viewBox":[0,0,24,24],"paths":["M12 2v20","m15 19-3 3-3-3","m19 9 3 3-3 3","M2 12h20","m5 9-3 3 3 3","m9 5 3-3 3 3"],"stroke":true},
  "move-3-d": {"name":"Move 3 D","viewBox":[0,0,24,24],"paths":["M5 3v16h16","m5 19 6-6","m2 6 3-3 3 3","m18 16 3 3-3 3"],"stroke":true},
  "move-3d": {"name":"Move 3d","viewBox":[0,0,24,24],"paths":["M5 3v16h16","m5 19 6-6","m2 6 3-3 3 3","m18 16 3 3-3 3"],"stroke":true},
  "move-diagonal": {"name":"Move Diagonal","viewBox":[0,0,24,24],"paths":["M11 19H5v-6","M13 5h6v6","M19 5 5 19"],"stroke":true},
  "move-diagonal-2": {"name":"Move Diagonal 2","viewBox":[0,0,24,24],"paths":["M19 13v6h-6","M5 11V5h6","m5 5 14 14"],"stroke":true},
  "move-down": {"name":"Move Down","viewBox":[0,0,24,24],"paths":["M8 18L12 22L16 18","M12 2V22"],"stroke":true},
  "move-down-left": {"name":"Move Down Left","viewBox":[0,0,24,24],"paths":["M11 19H5V13","M19 5L5 19"],"stroke":true},
  "move-down-right": {"name":"Move Down Right","viewBox":[0,0,24,24],"paths":["M19 13V19H13","M5 5L19 19"],"stroke":true},
  "move-horizontal": {"name":"Move Horizontal","viewBox":[0,0,24,24],"paths":["m18 8 4 4-4 4","M2 12h20","m6 8-4 4 4 4"],"stroke":true},
  "move-left": {"name":"Move Left","viewBox":[0,0,24,24],"paths":["M6 8L2 12L6 16","M2 12H22"],"stroke":true},
  "move-right": {"name":"Move Right","viewBox":[0,0,24,24],"paths":["M18 8L22 12L18 16","M2 12H22"],"stroke":true},
  "move-up": {"name":"Move Up","viewBox":[0,0,24,24],"paths":["M8 6L12 2L16 6","M12 2V22"],"stroke":true},
  "move-up-left": {"name":"Move Up Left","viewBox":[0,0,24,24],"paths":["M5 11V5H11","M5 5L19 19"],"stroke":true},
  "move-up-right": {"name":"Move Up Right","viewBox":[0,0,24,24],"paths":["M13 5H19V11","M19 5L5 19"],"stroke":true},
  "move-vertical": {"name":"Move Vertical","viewBox":[0,0,24,24],"paths":["M12 2v20","m8 18 4 4 4-4","m8 6 4-4 4 4"],"stroke":true},
  "music": {"name":"Music","viewBox":[0,0,24,24],"paths":["M9 18V5l12-2v13","M 3 18 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0","M 15 16 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0"],"stroke":true},
  "music-2": {"name":"Music 2","viewBox":[0,0,24,24],"paths":["M 4 18 a 4 4 0 1 0 8 0 a 4 4 0 1 0 -8 0","M12 18V2l7 4"],"stroke":true},
  "music-3": {"name":"Music 3","viewBox":[0,0,24,24],"paths":["M 8 18 a 4 4 0 1 0 8 0 a 4 4 0 1 0 -8 0","M16 18V2"],"stroke":true},
  "music-4": {"name":"Music 4","viewBox":[0,0,24,24],"paths":["M9 18V5l12-2v13","m9 9 12-2","M 3 18 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0","M 15 16 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0"],"stroke":true},
  "navigation": {"name":"Navigation","viewBox":[0,0,24,24],"paths":["M 3 11 L 22 2 L 13 21 L 11 13 L 3 11 Z"],"stroke":true},
  "navigation-2": {"name":"Navigation 2","viewBox":[0,0,24,24],"paths":["M 12 2 L 19 21 L 12 17 L 5 21 L 12 2 Z"],"stroke":true},
  "navigation-2-off": {"name":"Navigation 2 Off","viewBox":[0,0,24,24],"paths":["M9.31 9.31 5 21l7-4 7 4-1.17-3.17","M14.53 8.88 12 2l-1.17 3.17","M 2 2 L 22 22"],"stroke":true},
  "navigation-off": {"name":"Navigation Off","viewBox":[0,0,24,24],"paths":["M8.43 8.43 3 11l8 2 2 8 2.57-5.43","M17.39 11.73 22 2l-9.73 4.61","M 2 2 L 22 22"],"stroke":true},
  "nepali-rupee": {"name":"Nepali Rupee","viewBox":[0,0,24,24],"paths":["M18 16.173 A4.74 4.74 0 0 0 13.496 8.005","M4 3 L20 3","M5 13 L13.5 21","M5 13 L9 13","M8 13 C15.5 13 14.667 3 8 3"],"stroke":true},
  "network": {"name":"Network","viewBox":[0,0,24,24],"paths":["M 16 16 h 6 v 6 h -6 z","M 2 16 h 6 v 6 h -6 z","M 9 2 h 6 v 6 h -6 z","M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3","M12 12V8"],"stroke":true},
  "newspaper": {"name":"Newspaper","viewBox":[0,0,24,24],"paths":["M15 18h-5","M18 14h-8","M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0v-9a2 2 0 0 1 2-2h2","M 10 6 h 8 v 4 h -8 z"],"stroke":true},
  "nfc": {"name":"Nfc","viewBox":[0,0,24,24],"paths":["M6 8.32a7.43 7.43 0 0 1 0 7.36","M9.46 6.21a11.76 11.76 0 0 1 0 11.58","M12.91 4.1a15.91 15.91 0 0 1 .01 15.8","M16.37 2a20.16 20.16 0 0 1 0 20"],"stroke":true},
  "non-binary": {"name":"Non Binary","viewBox":[0,0,24,24],"paths":["M12 2v10","m8.5 4 7 4","m8.5 8 7-4","M 7 17 a 5 5 0 1 0 10 0 a 5 5 0 1 0 -10 0"],"stroke":true},
  "notebook": {"name":"Notebook","viewBox":[0,0,24,24],"paths":["M2 6h4","M2 10h4","M2 14h4","M2 18h4","M 4 2 h 16 v 20 h -16 z","M16 2v20"],"stroke":true},
  "notebook-dot": {"name":"Notebook Dot","viewBox":[0,0,24,24],"paths":["M16 11.75V22","M2 10h4","M2 14h4","M2 18h4","M2 6h4","M20 11.75V20a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h5.65","M 15 5 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0"],"stroke":true},
  "notebook-pen": {"name":"Notebook Pen","viewBox":[0,0,24,24],"paths":["M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4","M2 6h4","M2 10h4","M2 14h4","M2 18h4","M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"],"stroke":true},
  "notebook-tabs": {"name":"Notebook Tabs","viewBox":[0,0,24,24],"paths":["M2 6h4","M2 10h4","M2 14h4","M2 18h4","M 4 2 h 16 v 20 h -16 z","M15 2v20","M15 7h5","M15 12h5","M15 17h5"],"stroke":true},
  "notebook-text": {"name":"Notebook Text","viewBox":[0,0,24,24],"paths":["M2 6h4","M2 10h4","M2 14h4","M2 18h4","M 4 2 h 16 v 20 h -16 z","M9.5 8h5","M9.5 12H16","M9.5 16H14"],"stroke":true},
  "notepad-text": {"name":"Notepad Text","viewBox":[0,0,24,24],"paths":["M8 2v4","M12 2v4","M16 2v4","M 4 4 h 16 v 18 h -16 z","M8 10h6","M8 14h8","M8 18h5"],"stroke":true},
  "notepad-text-dashed": {"name":"Notepad Text Dashed","viewBox":[0,0,24,24],"paths":["M8 2v4","M12 2v4","M16 2v4","M16 4h2a2 2 0 0 1 2 2v2","M20 12v2","M20 18v2a2 2 0 0 1-2 2h-1","M13 22h-2","M7 22H6a2 2 0 0 1-2-2v-2","M4 14v-2","M4 8V6a2 2 0 0 1 2-2h2","M8 10h6","M8 14h8","M8 18h5"],"stroke":true},
  "nut": {"name":"Nut","viewBox":[0,0,24,24],"paths":["M16.847 5.847 20 9a7.23 7.23 0 011.551 7.516C21.241 17.352 21 17.932 21 19v1a1 1 0 01-1 1h-1c-1.069 0-1.648.242-2.485.552A7.2 7.2 0 019.002 20l-3.155-3.153","M18.21 5.43c-1.71.69-5.07 1.07-6.71 1.07.46 1.38.91 2.74.61 4.88a.88.88 0 01-.73.74c-1.78.28-3.54-.17-4.88-.62 0 1.64-.38 5-1.07 6.71-.21.52-.82.55-1.17.12A10 10 0 0118.33 4.26c.43.35.4.97-.12 1.17","M4.93 4.93 3 3a.7.7 0 010-1"],"stroke":true},
  "nut-off": {"name":"Nut Off","viewBox":[0,0,24,24],"paths":["M11.868 11.868a.88.88 0 01-.488.252c-1.78.28-3.54-.17-4.88-.62 0 1.272-.229 3.578-.653 5.347a10 10 0 01-.417 1.363c-.21.52-.82.55-1.17.12a10 10 0 01.677-13.393","M12.14 6.485a27.4 27.4 0 004.707-.638L20 9a7.23 7.23 0 011.706 7.05","m2 2 20 20","M20.707 20.707A1 1 0 0120 21h-1c-1.069 0-1.648.242-2.485.552A7.2 7.2 0 019.002 20l-3.155-3.153","M8.356 2.7a10 10 0 019.974 1.56c.43.35.4.97-.12 1.17a10 10 0 01-1.363.417"],"stroke":true},
  "octagon": {"name":"Octagon","viewBox":[0,0,24,24],"paths":["M2.586 16.726A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2h6.624a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586z"],"stroke":true},
  "octagon-alert": {"name":"Octagon Alert","viewBox":[0,0,24,24],"paths":["M12 16h.01","M12 8v4","M15.312 2a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586l-4.688-4.688A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2z"],"stroke":true},
  "octagon-minus": {"name":"Octagon Minus","viewBox":[0,0,24,24],"paths":["M2.586 16.726A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2h6.624a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586z","M8 12h8"],"stroke":true},
  "octagon-pause": {"name":"Octagon Pause","viewBox":[0,0,24,24],"paths":["M10 15V9","M14 15V9","M2.586 16.726A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2h6.624a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586z"],"stroke":true},
  "octagon-x": {"name":"Octagon X","viewBox":[0,0,24,24],"paths":["m15 9-6 6","M2.586 16.726A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2h6.624a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586z","m9 9 6 6"],"stroke":true},
  "omega": {"name":"Omega","viewBox":[0,0,24,24],"paths":["M3 20h4.5a.5.5 0 0 0 .5-.5v-.282a.52.52 0 0 0-.247-.437 8 8 0 1 1 8.494-.001.52.52 0 0 0-.247.438v.282a.5.5 0 0 0 .5.5H21"],"stroke":true},
  "option": {"name":"Option","viewBox":[0,0,24,24],"paths":["M14 3h7","M3 3h5.28a1 1 0 0 1 .948.684l5.544 16.632a1 1 0 0 0 .949.684H21"],"stroke":true},
  "orbit": {"name":"Orbit","viewBox":[0,0,24,24],"paths":["M20.341 6.484A10 10 0 0 1 10.266 21.85","M3.659 17.516A10 10 0 0 1 13.74 2.152","M 9 12 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0","M 17 5 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0","M 3 19 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0"],"stroke":true},
  "origami": {"name":"Origami","viewBox":[0,0,24,24],"paths":["M12 12V4a1 1 0 0 1 1-1h6.297a1 1 0 0 1 .651 1.759l-4.696 4.025","m12 21-7.414-7.414A2 2 0 0 1 4 12.172V6.415a1.002 1.002 0 0 1 1.707-.707L20 20.009","m12.214 3.381 8.414 14.966a1 1 0 0 1-.167 1.199l-1.168 1.163a1 1 0 0 1-.706.291H6.351a1 1 0 0 1-.625-.219L3.25 18.8a1 1 0 0 1 .631-1.781l4.165.027"],"stroke":true},
  "outdent": {"name":"Outdent","viewBox":[0,0,24,24],"paths":["M21 5H11","M21 12H11","M21 19H11","m7 8-4 4 4 4"],"stroke":true},
  "package": {"name":"Package","viewBox":[0,0,24,24],"paths":["M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z","M12 22V12","M 3.29 7 L 12 12 L 20.71 7","m7.5 4.27 9 5.15"],"stroke":true},
  "package-2": {"name":"Package 2","viewBox":[0,0,24,24],"paths":["M12 3v6","M16.76 3a2 2 0 0 1 1.8 1.1l2.23 4.479a2 2 0 0 1 .21.891V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9.472a2 2 0 0 1 .211-.894L5.45 4.1A2 2 0 0 1 7.24 3z","M3.054 9.013h17.893"],"stroke":true},
  "package-check": {"name":"Package Check","viewBox":[0,0,24,24],"paths":["M12 22V12","m16 17 2 2 4-4","M21 11.127V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.729l7 4a2 2 0 0 0 2 .001l1.32-.753","M3.29 7 12 12l8.71-5","m7.5 4.27 8.997 5.148"],"stroke":true},
  "package-minus": {"name":"Package Minus","viewBox":[0,0,24,24],"paths":["M12 22V12","M16 17h6","M21 13V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.729l7 4a2 2 0 0 0 2 .001l1.675-.955","M3.29 7 12 12l8.71-5","m7.5 4.27 8.997 5.148"],"stroke":true},
  "package-open": {"name":"Package Open","viewBox":[0,0,24,24],"paths":["M12 22v-9","M15.17 2.21a1.67 1.67 0 0 1 1.63 0L21 4.57a1.93 1.93 0 0 1 0 3.36L8.82 14.79a1.655 1.655 0 0 1-1.64 0L3 12.43a1.93 1.93 0 0 1 0-3.36z","M20 13v3.87a2.06 2.06 0 0 1-1.11 1.83l-6 3.08a1.93 1.93 0 0 1-1.78 0l-6-3.08A2.06 2.06 0 0 1 4 16.87V13","M21 12.43a1.93 1.93 0 0 0 0-3.36L8.83 2.2a1.64 1.64 0 0 0-1.63 0L3 4.57a1.93 1.93 0 0 0 0 3.36l12.18 6.86a1.636 1.636 0 0 0 1.63 0z"],"stroke":true},
  "package-plus": {"name":"Package Plus","viewBox":[0,0,24,24],"paths":["M12 22V12","M16 17h6","M19 14v6","M21 10.535V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.729l7 4a2 2 0 0 0 2 .001l1.675-.955","M3.29 7 12 12l8.71-5","m7.5 4.27 8.997 5.148"],"stroke":true},
  "package-search": {"name":"Package Search","viewBox":[0,0,24,24],"paths":["M12 22V12","M20.27 18.27 22 20","M21 10.498V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.729l7 4a2 2 0 0 0 2 .001l.98-.559","M3.29 7 12 12l8.71-5","m7.5 4.27 8.997 5.148","M 16 16.5 a 2.5 2.5 0 1 0 5 0 a 2.5 2.5 0 1 0 -5 0"],"stroke":true},
  "package-x": {"name":"Package X","viewBox":[0,0,24,24],"paths":["M12 22V12","m16.5 14.5 5 5","m16.5 19.5 5-5","M21 10.5V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.729l7 4a2 2 0 0 0 2 .001l.13-.074","M3.29 7 12 12l8.71-5","m7.5 4.27 8.997 5.148"],"stroke":true},
  "paint-bucket": {"name":"Paint Bucket","viewBox":[0,0,24,24],"paths":["M11 7 6 2","M18.992 12H2.041","M21.145 18.38A3.34 3.34 0 0 1 20 16.5a3.3 3.3 0 0 1-1.145 1.88c-.575.46-.855 1.02-.855 1.595A2 2 0 0 0 20 22a2 2 0 0 0 2-2.025c0-.58-.285-1.13-.855-1.595","m8.5 4.5 2.148-2.148a1.205 1.205 0 0 1 1.704 0l7.296 7.296a1.205 1.205 0 0 1 0 1.704l-7.592 7.592a3.615 3.615 0 0 1-5.112 0l-3.888-3.888a3.615 3.615 0 0 1 0-5.112L5.67 7.33"],"stroke":true},
  "paint-roller": {"name":"Paint Roller","viewBox":[0,0,24,24],"paths":["M 2 2 h 16 v 6 h -16 z","M10 16v-2a2 2 0 0 1 2-2h8a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2","M 8 16 h 4 v 6 h -4 z"],"stroke":true},
  "paintbrush": {"name":"Paintbrush","viewBox":[0,0,24,24],"paths":["m14.622 17.897-10.68-2.913","M18.376 2.622a1 1 0 1 1 3.002 3.002L17.36 9.643a.5.5 0 0 0 0 .707l.944.944a2.41 2.41 0 0 1 0 3.408l-.944.944a.5.5 0 0 1-.707 0L8.354 7.348a.5.5 0 0 1 0-.707l.944-.944a2.41 2.41 0 0 1 3.408 0l.944.944a.5.5 0 0 0 .707 0z","M9 8c-1.804 2.71-3.97 3.46-6.583 3.948a.507.507 0 0 0-.302.819l7.32 8.883a1 1 0 0 0 1.185.204C12.735 20.405 16 16.792 16 15"],"stroke":true},
  "paintbrush-2": {"name":"Paintbrush 2","viewBox":[0,0,24,24],"paths":["M10 2v2","M14 2v4","M17 2a1 1 0 0 1 1 1v9H6V3a1 1 0 0 1 1-1z","M6 12a1 1 0 0 0-1 1v1a2 2 0 0 0 2 2h2a1 1 0 0 1 1 1v2.9a2 2 0 1 0 4 0V17a1 1 0 0 1 1-1h2a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1"],"stroke":true},
  "paintbrush-vertical": {"name":"Paintbrush Vertical","viewBox":[0,0,24,24],"paths":["M10 2v2","M14 2v4","M17 2a1 1 0 0 1 1 1v9H6V3a1 1 0 0 1 1-1z","M6 12a1 1 0 0 0-1 1v1a2 2 0 0 0 2 2h2a1 1 0 0 1 1 1v2.9a2 2 0 1 0 4 0V17a1 1 0 0 1 1-1h2a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1"],"stroke":true},
  "palette": {"name":"Palette","viewBox":[0,0,24,24],"paths":["M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z","M 13 6.5 a 0.5 0.5 0 1 0 1 0 a 0.5 0.5 0 1 0 -1 0","M 17 10.5 a 0.5 0.5 0 1 0 1 0 a 0.5 0.5 0 1 0 -1 0","M 6 12.5 a 0.5 0.5 0 1 0 1 0 a 0.5 0.5 0 1 0 -1 0","M 8 7.5 a 0.5 0.5 0 1 0 1 0 a 0.5 0.5 0 1 0 -1 0"],"stroke":true},
  "palmtree": {"name":"Palmtree","viewBox":[0,0,24,24],"paths":["M13 8c0-2.76-2.46-5-5.5-5S2 5.24 2 8h2l1-1 1 1h4","M13 7.14A5.82 5.82 0 0 1 16.5 6c3.04 0 5.5 2.24 5.5 5h-3l-1-1-1 1h-3","M5.89 9.71c-2.15 2.15-2.3 5.47-.35 7.43l4.24-4.25.7-.7.71-.71 2.12-2.12c-1.95-1.96-5.27-1.8-7.42.35","M11 15.5c.5 2.5-.17 4.5-1 6.5h4c2-5.5-.5-12-1-14"],"stroke":true},
  "panda": {"name":"Panda","viewBox":[0,0,24,24],"paths":["M11.25 17.25h1.5L12 18z","m15 12 2 2","M17.902 6.599a8 8 0 0 0-.5-.5","M2 14.5C2 19.47 6.48 22 12 22s10-2.53 10-7.5a10 10 0 0 0-1.3-4.83 4.5 4.5 0 1 0-7.05-5.5 8 8 0 0 0-3.3 0 4.5 4.5 0 1 0-7.04 5.5A10 10 0 0 0 2 14.5","M6.099 6.599a8 8 0 0 1 .5-.5","m9 12-2 2"],"stroke":true},
  "panel-bottom": {"name":"Panel Bottom","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","M3 15h18"],"stroke":true},
  "panel-bottom-close": {"name":"Panel Bottom Close","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","M3 15h18","m15 8-3 3-3-3"],"stroke":true},
  "panel-bottom-dashed": {"name":"Panel Bottom Dashed","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","M14 15h1","M19 15h2","M3 15h2","M9 15h1"],"stroke":true},
  "panel-bottom-inactive": {"name":"Panel Bottom Inactive","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","M14 15h1","M19 15h2","M3 15h2","M9 15h1"],"stroke":true},
  "panel-bottom-open": {"name":"Panel Bottom Open","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","M3 15h18","m9 10 3-3 3 3"],"stroke":true},
  "panel-left": {"name":"Panel Left","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","M9 3v18"],"stroke":true},
  "panel-left-close": {"name":"Panel Left Close","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","M9 3v18","m16 15-3-3 3-3"],"stroke":true},
  "panel-left-dashed": {"name":"Panel Left Dashed","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","M9 14v1","M9 19v2","M9 3v2","M9 9v1"],"stroke":true},
  "panel-left-inactive": {"name":"Panel Left Inactive","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","M9 14v1","M9 19v2","M9 3v2","M9 9v1"],"stroke":true},
  "panel-left-open": {"name":"Panel Left Open","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","M9 3v18","m14 9 3 3-3 3"],"stroke":true},
  "panel-left-right-dashed": {"name":"Panel Left Right Dashed","viewBox":[0,0,24,24],"paths":["M15 10V9","M15 15v-1","M15 21v-2","M15 5V3","M9 10V9","M9 15v-1","M9 21v-2","M9 5V3","M 3 3 h 18 v 18 h -18 z"],"stroke":true},
  "panel-right": {"name":"Panel Right","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","M15 3v18"],"stroke":true},
  "panel-right-close": {"name":"Panel Right Close","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","M15 3v18","m8 9 3 3-3 3"],"stroke":true},
  "panel-right-dashed": {"name":"Panel Right Dashed","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","M15 14v1","M15 19v2","M15 3v2","M15 9v1"],"stroke":true},
  "panel-right-inactive": {"name":"Panel Right Inactive","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","M15 14v1","M15 19v2","M15 3v2","M15 9v1"],"stroke":true},
  "panel-right-open": {"name":"Panel Right Open","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","M15 3v18","m10 15-3-3 3-3"],"stroke":true},
  "panel-top": {"name":"Panel Top","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","M3 9h18"],"stroke":true},
  "panel-top-bottom-dashed": {"name":"Panel Top Bottom Dashed","viewBox":[0,0,24,24],"paths":["M14 15h1","M14 9h1","M19 15h2","M19 9h2","M3 15h2","M3 9h2","M9 15h1","M9 9h1","M 3 3 h 18 v 18 h -18 z"],"stroke":true},
  "panel-top-close": {"name":"Panel Top Close","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","M3 9h18","m9 16 3-3 3 3"],"stroke":true},
  "panel-top-dashed": {"name":"Panel Top Dashed","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","M14 9h1","M19 9h2","M3 9h2","M9 9h1"],"stroke":true},
  "panel-top-inactive": {"name":"Panel Top Inactive","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","M14 9h1","M19 9h2","M3 9h2","M9 9h1"],"stroke":true},
  "panel-top-open": {"name":"Panel Top Open","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","M3 9h18","m15 14-3 3-3-3"],"stroke":true},
  "panels-left-bottom": {"name":"Panels Left Bottom","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","M9 3v18","M9 15h12"],"stroke":true},
  "panels-left-right": {"name":"Panels Left Right","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","M9 3v18","M15 3v18"],"stroke":true},
  "panels-right-bottom": {"name":"Panels Right Bottom","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","M3 15h12","M15 3v18"],"stroke":true},
  "panels-top-bottom": {"name":"Panels Top Bottom","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","M21 9H3","M21 15H3"],"stroke":true},
  "panels-top-left": {"name":"Panels Top Left","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","M3 9h18","M9 21V9"],"stroke":true},
  "paper-bag": {"name":"Paper Bag","viewBox":[0,0,24,24],"paths":["M5.364 3.848C4 6 3 9.652 3 12.652V19a2 2 0 002 2h14a2 2 0 002-2v-5c0-2.334-1.816-4.668-2.622-7.002","M7 3h11.379a2 2 0 011.789 1.106l.723 1.447A1 1 0 0119.997 7h-8.525a2 2 0 01-1.789-1.106L8.79 4.105a2 2 0 10-3.579 1.789l2.261 4.522A5 5 0 018 12.652V21"],"stroke":true},
  "paperclip": {"name":"Paperclip","viewBox":[0,0,24,24],"paths":["m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551"],"stroke":true},
  "parasol": {"name":"Parasol","viewBox":[0,0,24,24],"paths":["M12.5 11.134 18.196 21","M20.425 5.299a10 10 0 0 0-16.941 9.78c.183.563.843.774 1.355.478L20.16 6.711c.512-.296.66-.973.264-1.413","M21 21H3"],"stroke":true},
  "parentheses": {"name":"Parentheses","viewBox":[0,0,24,24],"paths":["M8 21s-4-3-4-9 4-9 4-9","M16 3s4 3 4 9-4 9-4 9"],"stroke":true},
  "park": {"name":"Park","viewBox":[0,0,24,24],"paths":["M12 18h10","M13.248 9.998A4.5 4.5 0 0 0 11.75 8.6V8a1 1 0 0 0-7.5 0 4.9 4.9 0 0 0 2.25 9H8","m15 14-2 6","m19 14 2 6","M21 14h-8","M8 20v-5.922a2 2 0 0 0-.586-1.414L6.5 11.75","M9.205 12.795 8 14","M 17 6 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0"],"stroke":true},
  "parking-circle": {"name":"Parking Circle","viewBox":[0,0,24,24],"paths":["M 2 12 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0","M9 17V7h4a3 3 0 0 1 0 6H9"],"stroke":true},
  "parking-circle-off": {"name":"Parking Circle Off","viewBox":[0,0,24,24],"paths":["M12.656 7H13a3 3 0 0 1 2.984 3.307","M13 13H9","M19.071 19.071A1 1 0 0 1 4.93 4.93","m2 2 20 20","M8.357 2.687a10 10 0 0 1 12.956 12.956","M9 17V9"],"stroke":true},
  "parking-meter": {"name":"Parking Meter","viewBox":[0,0,24,24],"paths":["M11 15h2","M12 12v3","M12 19v3","M15.282 19a1 1 0 0 0 .948-.68l2.37-6.988a7 7 0 1 0-13.2 0l2.37 6.988a1 1 0 0 0 .948.68z","M9 9a3 3 0 1 1 6 0"],"stroke":true},
  "parking-square": {"name":"Parking Square","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","M9 17V7h4a3 3 0 0 1 0 6H9"],"stroke":true},
  "parking-square-off": {"name":"Parking Square Off","viewBox":[0,0,24,24],"paths":["M3.6 3.6A2 2 0 0 1 5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-.59 1.41","M3 8.7V19a2 2 0 0 0 2 2h10.3","m2 2 20 20","M13 13a3 3 0 1 0 0-6H9v2","M9 17v-2.3"],"stroke":true},
  "party-popper": {"name":"Party Popper","viewBox":[0,0,24,24],"paths":["M5.8 11.3 2 22l10.7-3.79","M4 3h.01","M22 8h.01","M15 2h.01","M22 20h.01","m22 2-2.24.75a2.9 2.9 0 0 0-1.96 3.12c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10","m22 13-.82-.33c-.86-.34-1.82.2-1.98 1.11c-.11.7-.72 1.22-1.43 1.22H17","m11 2 .33.82c.34.86-.2 1.82-1.11 1.98C9.52 4.9 9 5.52 9 6.23V7","M11 13c1.93 1.93 2.83 4.17 2 5-.83.83-3.07-.07-5-2-1.93-1.93-2.83-4.17-2-5 .83-.83 3.07.07 5 2Z"],"stroke":true},
  "pause": {"name":"Pause","viewBox":[0,0,24,24],"paths":["M 14 3 h 5 v 18 h -5 z","M 5 3 h 5 v 18 h -5 z"],"stroke":true},
  "pause-circle": {"name":"Pause Circle","viewBox":[0,0,24,24],"paths":["M 2 12 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0","M 10 15 L 10 9","M 14 15 L 14 9"],"stroke":true},
  "pause-octagon": {"name":"Pause Octagon","viewBox":[0,0,24,24],"paths":["M10 15V9","M14 15V9","M2.586 16.726A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2h6.624a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586z"],"stroke":true},
  "paw-print": {"name":"Paw Print","viewBox":[0,0,24,24],"paths":["M 9 4 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0","M 16 8 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0","M 18 16 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0","M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z"],"stroke":true},
  "pc-case": {"name":"Pc Case","viewBox":[0,0,24,24],"paths":["M 5 2 h 14 v 20 h -14 z","M15 14h.01","M9 6h6","M9 10h6"],"stroke":true},
  "pen": {"name":"Pen","viewBox":[0,0,24,24],"paths":["M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"],"stroke":true},
  "pen-box": {"name":"Pen Box","viewBox":[0,0,24,24],"paths":["M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7","M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"],"stroke":true},
  "pen-line": {"name":"Pen Line","viewBox":[0,0,24,24],"paths":["M13 21h8","M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"],"stroke":true},
  "pen-off": {"name":"Pen Off","viewBox":[0,0,24,24],"paths":["m10 10-6.157 6.162a2 2 0 0 0-.5.833l-1.322 4.36a.5.5 0 0 0 .622.624l4.358-1.323a2 2 0 0 0 .83-.5L14 13.982","m12.829 7.172 4.359-4.346a1 1 0 1 1 3.986 3.986l-4.353 4.353","m2 2 20 20"],"stroke":true},
  "pen-square": {"name":"Pen Square","viewBox":[0,0,24,24],"paths":["M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7","M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"],"stroke":true},
  "pen-tool": {"name":"Pen Tool","viewBox":[0,0,24,24],"paths":["m18 13-.654-4.736a4 4 0 00-2.756-3.266l-9.163-2.9a2 2 0 00-2.017.493l-.82.819a2 2 0 00-.492 2.017l2.9 9.163a4 4 0 003.266 2.756L13 18","M18.648 12.352a1.205 1.205 0 011.704 0l1.296 1.296a1.205 1.205 0 010 1.704l-6.296 6.296a1.205 1.205 0 01-1.704 0l-1.296-1.296a1.205 1.205 0 010-1.704z","m3 3 6.586 6.586","M 9 11 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0"],"stroke":true},
  "pencil": {"name":"Pencil","viewBox":[0,0,24,24],"paths":["M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z","m15 5 4 4"],"stroke":true},
  "pencil-line": {"name":"Pencil Line","viewBox":[0,0,24,24],"paths":["M13 21h8","m15 5 4 4","M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"],"stroke":true},
  "pencil-off": {"name":"Pencil Off","viewBox":[0,0,24,24],"paths":["m10 10-6.157 6.162a2 2 0 0 0-.5.833l-1.322 4.36a.5.5 0 0 0 .622.624l4.358-1.323a2 2 0 0 0 .83-.5L14 13.982","m12.829 7.172 4.359-4.346a1 1 0 1 1 3.986 3.986l-4.353 4.353","m15 5 4 4","m2 2 20 20"],"stroke":true},
  "pencil-ruler": {"name":"Pencil Ruler","viewBox":[0,0,24,24],"paths":["M13 7 8.7 2.7a2.41 2.41 0 0 0-3.4 0L2.7 5.3a2.41 2.41 0 0 0 0 3.4L7 13","m8 6 2-2","m18 16 2-2","m17 11 4.3 4.3c.94.94.94 2.46 0 3.4l-2.6 2.6c-.94.94-2.46.94-3.4 0L11 17","M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z","m15 5 4 4"],"stroke":true},
  "pencil-sparkles": {"name":"Pencil Sparkles","viewBox":[0,0,24,24],"paths":["M10 3H8","m15.007 5.008 3.987 3.986","M20 15v4","M21.174 6.813a2.82 2.82 0 0 0-3.986-3.987L3.842 16.175a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z","M22 17h-4","M4 5v4","M6 7H2","M9 2v2"],"stroke":true},
  "pentagon": {"name":"Pentagon","viewBox":[0,0,24,24],"paths":["M10.83 2.38a2 2 0 0 1 2.34 0l8 5.74a2 2 0 0 1 .73 2.25l-3.04 9.26a2 2 0 0 1-1.9 1.37H7.04a2 2 0 0 1-1.9-1.37L2.1 10.37a2 2 0 0 1 .73-2.25z"],"stroke":true},
  "percent": {"name":"Percent","viewBox":[0,0,24,24],"paths":["M 19 5 L 5 19","M 4 6.5 a 2.5 2.5 0 1 0 5 0 a 2.5 2.5 0 1 0 -5 0","M 15 17.5 a 2.5 2.5 0 1 0 5 0 a 2.5 2.5 0 1 0 -5 0"],"stroke":true},
  "percent-circle": {"name":"Percent Circle","viewBox":[0,0,24,24],"paths":["M 2 12 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0","m15 9-6 6","M9 9h.01","M15 15h.01"],"stroke":true},
  "percent-diamond": {"name":"Percent Diamond","viewBox":[0,0,24,24],"paths":["M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41L13.7 2.71a2.41 2.41 0 0 0-3.41 0Z","M9.2 9.2h.01","m14.5 9.5-5 5","M14.7 14.8h.01"],"stroke":true},
  "percent-square": {"name":"Percent Square","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","m15 9-6 6","M9 9h.01","M15 15h.01"],"stroke":true},
  "person-standing": {"name":"Person Standing","viewBox":[0,0,24,24],"paths":["M 11 5 a 1 1 0 1 0 2 0 a 1 1 0 1 0 -2 0","m9 20 3-6 3 6","m6 8 6 2 6-2","M12 10v4"],"stroke":true},
  "phi": {"name":"Phi","viewBox":[0,0,24,24],"paths":["M12 2v20","M 5 12 a 7 7 0 1 0 14 0 a 7 7 0 1 0 -14 0"],"stroke":true},
  "philippine-peso": {"name":"Philippine Peso","viewBox":[0,0,24,24],"paths":["M20 11H4","M20 7H4","M7 21V4a1 1 0 0 1 1-1h4a1 1 0 0 1 0 12H7"],"stroke":true},
  "phone": {"name":"Phone","viewBox":[0,0,24,24],"paths":["M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"],"stroke":true},
  "phone-call": {"name":"Phone Call","viewBox":[0,0,24,24],"paths":["M13 2a9 9 0 0 1 9 9","M13 6a5 5 0 0 1 5 5","M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"],"stroke":true},
  "phone-forwarded": {"name":"Phone Forwarded","viewBox":[0,0,24,24],"paths":["M14 6h8","m18 2 4 4-4 4","M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"],"stroke":true},
  "phone-incoming": {"name":"Phone Incoming","viewBox":[0,0,24,24],"paths":["M16 2v6h6","m22 2-6 6","M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"],"stroke":true},
  "phone-log": {"name":"Phone Log","viewBox":[0,0,24,24],"paths":["M13.832 16.568a1 1 0 001.213-.303l.355-.465A2 2 0 0117 15h3a2 2 0 012 2v3a2 2 0 01-2 2A18 18 0 012 4a2 2 0 012-2h3a2 2 0 012 2v3a2 2 0 01-.8 1.6l-.468.351a1 1 0 00-.292 1.233 14 14 0 006.392 6.384","M14.396 4.171h7.171","M17.343 8.17h4.224"],"stroke":true},
  "phone-missed": {"name":"Phone Missed","viewBox":[0,0,24,24],"paths":["m16 2 6 6","m22 2-6 6","M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"],"stroke":true},
  "phone-off": {"name":"Phone Off","viewBox":[0,0,24,24],"paths":["M10.1 13.9a14 14 0 0 0 3.732 2.668 1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2 18 18 0 0 1-12.728-5.272","M22 2 2 22","M4.76 13.582A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 .244.473"],"stroke":true},
  "phone-outgoing": {"name":"Phone Outgoing","viewBox":[0,0,24,24],"paths":["m16 8 6-6","M22 8V2h-6","M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"],"stroke":true},
  "pi": {"name":"Pi","viewBox":[0,0,24,24],"paths":["M 9 4 L 9 20","M4 7c0-1.7 1.3-3 3-3h13","M18 20c-1.7 0-3-1.3-3-3V4"],"stroke":true},
  "pi-square": {"name":"Pi Square","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","M7 7h10","M10 7v10","M16 17a2 2 0 0 1-2-2V7"],"stroke":true},
  "piano": {"name":"Piano","viewBox":[0,0,24,24],"paths":["M10 13v4","M14 13v4","M18 13v4","M2 13h20","M22 11.5A3.5 3.5 0 0018.5 8a3.52 3.52 0 01-3.173-2A7 7 0 002 9v10a2 2 0 002 2h16a2 2 0 002-2z","M6 13v4"],"stroke":true},
  "pickaxe": {"name":"Pickaxe","viewBox":[0,0,24,24],"paths":["m14 13-8.381 8.38a1 1 0 0 1-3.001-3L11 9.999","M15.973 4.027A13 13 0 0 0 5.902 2.373c-1.398.342-1.092 2.158.277 2.601a19.9 19.9 0 0 1 5.822 3.024","M16.001 11.999a19.9 19.9 0 0 1 3.024 5.824c.444 1.369 2.26 1.676 2.603.278A13 13 0 0 0 20 8.069","M18.352 3.352a1.205 1.205 0 0 0-1.704 0l-5.296 5.296a1.205 1.205 0 0 0 0 1.704l2.296 2.296a1.205 1.205 0 0 0 1.704 0l5.296-5.296a1.205 1.205 0 0 0 0-1.704z"],"stroke":true},
  "picture-in-picture": {"name":"Picture In Picture","viewBox":[0,0,24,24],"paths":["M2 10h6V4","m2 4 6 6","M21 10V7a2 2 0 0 0-2-2h-7","M3 14v2a2 2 0 0 0 2 2h3","M 12 14 h 10 v 7 h -10 z"],"stroke":true},
  "picture-in-picture-2": {"name":"Picture In Picture 2","viewBox":[0,0,24,24],"paths":["M21 9V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10c0 1.1.9 2 2 2h4","M 12 13 h 10 v 7 h -10 z"],"stroke":true},
  "pie-chart": {"name":"Pie Chart","viewBox":[0,0,24,24],"paths":["M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.998.398-.998.95v8a1 1 0 0 0 1 1z","M21.21 15.89A10 10 0 1 1 8 2.83"],"stroke":true},
  "piggy-bank": {"name":"Piggy Bank","viewBox":[0,0,24,24],"paths":["M11 17h3v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3a3.16 3.16 0 0 0 2-2h1a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1h-1a5 5 0 0 0-2-4V3a4 4 0 0 0-3.2 1.6l-.3.4H11a6 6 0 0 0-6 6v1a5 5 0 0 0 2 4v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1z","M16 10h.01","M2 8v1a2 2 0 0 0 2 2h1"],"stroke":true},
  "pilcrow": {"name":"Pilcrow","viewBox":[0,0,24,24],"paths":["M13 4v16","M17 4v16","M19 4H9.5a4.5 4.5 0 0 0 0 9H13"],"stroke":true},
  "pilcrow-left": {"name":"Pilcrow Left","viewBox":[0,0,24,24],"paths":["M14 3v11","M14 9h-3a3 3 0 0 1 0-6h9","M18 3v11","M22 18H2l4-4","m6 22-4-4"],"stroke":true},
  "pilcrow-right": {"name":"Pilcrow Right","viewBox":[0,0,24,24],"paths":["M10 3v11","M10 9H7a1 1 0 0 1 0-6h8","M14 3v11","m18 14 4 4H2","m22 18-4 4"],"stroke":true},
  "pilcrow-square": {"name":"Pilcrow Square","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","M12 12H9.5a2.5 2.5 0 0 1 0-5H17","M12 7v10","M16 7v10"],"stroke":true},
  "pill": {"name":"Pill","viewBox":[0,0,24,24],"paths":["m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z","m8.5 8.5 7 7"],"stroke":true},
  "pill-bottle": {"name":"Pill Bottle","viewBox":[0,0,24,24],"paths":["M18 11h-4a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h4","M6 7v13a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7","M 4 2 h 16 v 5 h -16 z"],"stroke":true},
  "pin": {"name":"Pin","viewBox":[0,0,24,24],"paths":["M12 17v5","M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"],"stroke":true},
  "pin-off": {"name":"Pin Off","viewBox":[0,0,24,24],"paths":["M12 17v5","M15 9.34V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H7.89","m2 2 20 20","M9 9v1.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h11"],"stroke":true},
  "pipette": {"name":"Pipette","viewBox":[0,0,24,24],"paths":["m12 9-8.414 8.414A2 2 0 0 0 3 18.828v1.344a2 2 0 0 1-.586 1.414A2 2 0 0 1 3.828 21h1.344a2 2 0 0 0 1.414-.586L15 12","m18 9 .4.4a1 1 0 1 1-3 3l-3.8-3.8a1 1 0 1 1 3-3l.4.4 3.4-3.4a1 1 0 1 1 3 3z","m2 22 .414-.414"],"stroke":true},
  "pizza": {"name":"Pizza","viewBox":[0,0,24,24],"paths":["m12 14-1 1","m13.75 18.25-1.25 1.42","M17.775 5.654a15.68 15.68 0 0 0-12.121 12.12","M18.8 9.3a1 1 0 0 0 2.1 7.7","M21.964 20.732a1 1 0 0 1-1.232 1.232l-18-5a1 1 0 0 1-.695-1.232A19.68 19.68 0 0 1 15.732 2.037a1 1 0 0 1 1.232.695z"],"stroke":true},
  "plane": {"name":"Plane","viewBox":[0,0,24,24],"paths":["M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"],"stroke":true},
  "plane-landing": {"name":"Plane Landing","viewBox":[0,0,24,24],"paths":["M2 22h20","M3.77 10.77 2 9l2-4.5 1.1.55c.55.28.9.84.9 1.45s.35 1.17.9 1.45L8 8.5l3-6 1.05.53a2 2 0 0 1 1.09 1.52l.72 5.4a2 2 0 0 0 1.09 1.52l4.4 2.2c.42.22.78.55 1.01.96l.6 1.03c.49.88-.06 1.98-1.06 2.1l-1.18.15c-.47.06-.95-.02-1.37-.24L4.29 11.15a2 2 0 0 1-.52-.38Z"],"stroke":true},
  "plane-takeoff": {"name":"Plane Takeoff","viewBox":[0,0,24,24],"paths":["M2 22h20","M6.36 17.4 4 17l-2-4 1.1-.55a2 2 0 0 1 1.8 0l.17.1a2 2 0 0 0 1.8 0L8 12 5 6l.9-.45a2 2 0 0 1 2.09.2l4.02 3a2 2 0 0 0 2.1.2l4.19-2.06a2.41 2.41 0 0 1 1.73-.17L21 7a1.4 1.4 0 0 1 .87 1.99l-.38.76c-.23.46-.6.84-1.07 1.08L7.58 17.2a2 2 0 0 1-1.22.18Z"],"stroke":true},
  "plant-pot": {"name":"Plant Pot","viewBox":[0,0,24,24],"paths":["M14 8.536V6a4 4 0 014-4h1.5a.5.5 0 01.5.5V4a4 4 0 01-4 4 4 4 0 00-4 4 5 5 0 01-8-4 5 5 0 018 4c0 2 1 3 1 5","m18 17-1.085 3.58A2 2 0 0115 22H9.002a2 2 0 01-1.913-1.418L6 17","M5 17h14"],"stroke":true},
  "play": {"name":"Play","viewBox":[0,0,24,24],"paths":["M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"],"stroke":true},
  "play-circle": {"name":"Play Circle","viewBox":[0,0,24,24],"paths":["M9 9.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997A1 1 0 0 1 9 14.996z","M 2 12 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0"],"stroke":true},
  "play-off": {"name":"Play Off","viewBox":[0,0,24,24],"paths":["m10.215 4.56 9.79 5.71a2 2 0 0 1 .003 3.458l-.393.23","m16.042 16.042-8.034 4.686A2 2 0 0 1 5 19V5","m2 2 20 20"],"stroke":true},
  "play-square": {"name":"Play Square","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","M9 9.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997A1 1 0 0 1 9 14.996z"],"stroke":true},
  "playing-card": {"name":"Playing Card","viewBox":[0,0,24,24],"paths":["M12.832 8.445a1 1 0 00-1.589-.098l-2.075 3.098a1 1 0 000 1.11l2 3a1 1 0 001.664 0l2-3a1 1 0 000-1.11z","M 5 2 h 14 v 20 h -14 z"],"stroke":true},
  "playing-cards": {"name":"Playing Cards","viewBox":[0,0,24,24],"paths":["M14.832 8.445a1 1 0 00-1.589-.098l-2.075 3.098a1 1 0 000 1.11l2 3a1 1 0 001.664 0l2-3a1 1 0 000-1.11z","m7.18 20.827-5-11a2 2 0 01.993-2.647L7 5.44","M 7 2 h 14 v 20 h -14 z"],"stroke":true},
  "playing-cards-fan": {"name":"Playing Cards Fan","viewBox":[0,0,24,24],"paths":["M12.65 7.65a2 2 0 012.629-1.046l5.51 2.374a2 2 0 011.046 2.628l-3.957 9.184a2 2 0 01-2.628 1.046l-5.51-2.374a2 2 0 01-1.046-2.628z","M18 7.777V4a2 2 0 00-2-2h-6a2 2 0 00-2 2v10a2 2 0 001.137 1.805","m8 4.389-4.364.809a2 2 0 00-1.602 2.33l1.822 9.833a2 2 0 002.331 1.602l2.542-.47"],"stroke":true},
  "plug": {"name":"Plug","viewBox":[0,0,24,24],"paths":["M12 22v-5","M15 8V2","M17 8a1 1 0 0 1 1 1v4a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1z","M9 8V2"],"stroke":true},
  "plug-2": {"name":"Plug 2","viewBox":[0,0,24,24],"paths":["M9 2v6","M15 2v6","M12 17v5","M5 8h14","M6 11V8h12v3a6 6 0 1 1-12 0Z"],"stroke":true},
  "plug-zap": {"name":"Plug Zap","viewBox":[0,0,24,24],"paths":["M6.3 20.3a2.4 2.4 0 0 0 3.4 0L12 18l-6-6-2.3 2.3a2.4 2.4 0 0 0 0 3.4Z","m2 22 3-3","M7.5 13.5 10 11","M10.5 16.5 13 14","m18 3-4 4h6l-4 4"],"stroke":true},
  "plug-zap-2": {"name":"Plug Zap 2","viewBox":[0,0,24,24],"paths":["M6.3 20.3a2.4 2.4 0 0 0 3.4 0L12 18l-6-6-2.3 2.3a2.4 2.4 0 0 0 0 3.4Z","m2 22 3-3","M7.5 13.5 10 11","M10.5 16.5 13 14","m18 3-4 4h6l-4 4"],"stroke":true},
  "plus": {"name":"Plus","viewBox":[0,0,24,24],"paths":["M5 12h14","M12 5v14"],"stroke":true},
  "plus-circle": {"name":"Plus Circle","viewBox":[0,0,24,24],"paths":["M 2 12 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0","M8 12h8","M12 8v8"],"stroke":true},
  "plus-square": {"name":"Plus Square","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","M8 12h8","M12 8v8"],"stroke":true},
  "pocket-knife": {"name":"Pocket Knife","viewBox":[0,0,24,24],"paths":["M3 2v1c0 1 2 1 2 2S3 6 3 7s2 1 2 2-2 1-2 2 2 1 2 2","M18 6h.01","M6 18h.01","M20.83 8.83a4 4 0 0 0-5.66-5.66l-12 12a4 4 0 1 0 5.66 5.66Z","M18 11.66V22a4 4 0 0 0 4-4V6"],"stroke":true},
  "podcast": {"name":"Podcast","viewBox":[0,0,24,24],"paths":["M12 17v4","M18 11a6 6 0 00-3-5.197","M2 11a10 10 0 015-8.662","M22 11a10 10 0 00-5-8.662","M6 11a6 6 0 013-5.197","M9 21h6","M 10 9 h 4 v 8 h -4 z"],"stroke":true},
  "podium": {"name":"Podium","viewBox":[0,0,24,24],"paths":["M12 6V2h-1","M9 15a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1","M9 21V11a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v10"],"stroke":true},
  "pointer": {"name":"Pointer","viewBox":[0,0,24,24],"paths":["M22 14a8 8 0 0 1-8 8","M18 11v-1a2 2 0 0 0-2-2a2 2 0 0 0-2 2","M14 10V9a2 2 0 0 0-2-2a2 2 0 0 0-2 2v1","M10 9.5V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v10","M18 11a2 2 0 1 1 4 0v3a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"],"stroke":true},
  "pointer-off": {"name":"Pointer Off","viewBox":[0,0,24,24],"paths":["M10 4.5V4a2 2 0 0 0-2.41-1.957","M13.9 8.4a2 2 0 0 0-1.26-1.295","M21.7 16.2A8 8 0 0 0 22 14v-3a2 2 0 1 0-4 0v-1a2 2 0 0 0-3.63-1.158","m7 15-1.8-1.8a2 2 0 0 0-2.79 2.86L6 19.7a7.74 7.74 0 0 0 6 2.3h2a8 8 0 0 0 5.657-2.343","M6 6v8","m2 2 20 20"],"stroke":true},
  "popcorn": {"name":"Popcorn","viewBox":[0,0,24,24],"paths":["M18 8a2 2 0 0 0 0-4 2 2 0 0 0-4 0 2 2 0 0 0-4 0 2 2 0 0 0-4 0 2 2 0 0 0 0 4","M10 22 9 8","m14 22 1-14","M20 8c.5 0 .9.4.8 1l-2.6 12c-.1.5-.7 1-1.2 1H7c-.6 0-1.1-.4-1.2-1L3.2 9c-.1-.6.3-1 .8-1Z"],"stroke":true},
  "popsicle": {"name":"Popsicle","viewBox":[0,0,24,24],"paths":["M18.6 14.4c.8-.8.8-2 0-2.8l-8.1-8.1a4.95 4.95 0 1 0-7.1 7.1l8.1 8.1c.9.7 2.1.7 2.9-.1Z","m22 22-5.5-5.5"],"stroke":true},
  "pound-sterling": {"name":"Pound Sterling","viewBox":[0,0,24,24],"paths":["M18 7c0-5.333-8-5.333-8 0","M10 7v14","M6 21h12","M6 13h10"],"stroke":true},
  "power": {"name":"Power","viewBox":[0,0,24,24],"paths":["M12 2v10","M18.4 6.6a9 9 0 1 1-12.77.04"],"stroke":true},
  "power-circle": {"name":"Power Circle","viewBox":[0,0,24,24],"paths":["M 2 12 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0","M12 7v4","M7.998 9.003a5 5 0 1 0 8-.005"],"stroke":true},
  "power-off": {"name":"Power Off","viewBox":[0,0,24,24],"paths":["M18.36 6.64A9 9 0 0 1 20.77 15","M6.16 6.16a9 9 0 1 0 12.68 12.68","M12 2v4","m2 2 20 20"],"stroke":true},
  "power-square": {"name":"Power Square","viewBox":[0,0,24,24],"paths":["M12 7v4","M7.998 9.003a5 5 0 1 0 8-.005","M 3 3 h 18 v 18 h -18 z"],"stroke":true},
  "presentation": {"name":"Presentation","viewBox":[0,0,24,24],"paths":["M2 3h20","M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3","m7 21 5-5 5 5"],"stroke":true},
  "printer": {"name":"Printer","viewBox":[0,0,24,24],"paths":["M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2","M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6","M 6 14 h 12 v 8 h -12 z"],"stroke":true},
  "printer-3d": {"name":"Printer 3d","viewBox":[0,0,24,24],"paths":["M10 11v1","M12 8h8","M15 20v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3","M4 20h16","M4 22V4a2 2 0 012-2h12a2 2 0 012 2v18","M4 8h4","M8.635 10.093A2 2 0 018 8.631V7a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-.293.707l-1 1a1 1 0 01-1.414 0z"],"stroke":true},
  "printer-check": {"name":"Printer Check","viewBox":[0,0,24,24],"paths":["M13.5 22H7a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v.5","m16 19 2 2 4-4","M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v2","M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6"],"stroke":true},
  "printer-x": {"name":"Printer X","viewBox":[0,0,24,24],"paths":["M12.531 22H7a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1h6.377","m16.5 16.5 5 5","m16.5 21.5 5-5","M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v1.5","M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6"],"stroke":true},
  "projector": {"name":"Projector","viewBox":[0,0,24,24],"paths":["M5 7 3 5","M9 6V3","m13 7 2-2","M 6 13 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0","M11.83 12H20a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h2.17","M16 16h2"],"stroke":true},
  "proportions": {"name":"Proportions","viewBox":[0,0,24,24],"paths":["M 2 4 h 20 v 16 h -20 z","M12 9v11","M2 9h13a2 2 0 0 1 2 2v9"],"stroke":true},
  "puzzle": {"name":"Puzzle","viewBox":[0,0,24,24],"paths":["M15.39 4.39a1 1 0 0 0 1.68-.474 2.5 2.5 0 1 1 3.014 3.015 1 1 0 0 0-.474 1.68l1.683 1.682a2.414 2.414 0 0 1 0 3.414L19.61 15.39a1 1 0 0 1-1.68-.474 2.5 2.5 0 1 0-3.014 3.015 1 1 0 0 1 .474 1.68l-1.683 1.682a2.414 2.414 0 0 1-3.414 0L8.61 19.61a1 1 0 0 0-1.68.474 2.5 2.5 0 1 1-3.014-3.015 1 1 0 0 0 .474-1.68l-1.683-1.682a2.414 2.414 0 0 1 0-3.414L4.39 8.61a1 1 0 0 1 1.68.474 2.5 2.5 0 1 0 3.014-3.015 1 1 0 0 1-.474-1.68l1.683-1.682a2.414 2.414 0 0 1 3.414 0z"],"stroke":true},
  "pyramid": {"name":"Pyramid","viewBox":[0,0,24,24],"paths":["M2.5 16.88a1 1 0 0 1-.32-1.43l9-13.02a1 1 0 0 1 1.64 0l9 13.01a1 1 0 0 1-.32 1.44l-8.51 4.86a2 2 0 0 1-1.98 0Z","M12 2v20"],"stroke":true},
  "qr-code": {"name":"Qr Code","viewBox":[0,0,24,24],"paths":["M 3 3 h 5 v 5 h -5 z","M 16 3 h 5 v 5 h -5 z","M 3 16 h 5 v 5 h -5 z","M21 16h-3a2 2 0 0 0-2 2v3","M21 21v.01","M12 7v3a2 2 0 0 1-2 2H7","M3 12h.01","M12 3h.01","M12 16v.01","M16 12h1","M21 12v.01","M12 21v-1"],"stroke":true},
  "quote": {"name":"Quote","viewBox":[0,0,24,24],"paths":["M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z","M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"],"stroke":true},
  "rabbit": {"name":"Rabbit","viewBox":[0,0,24,24],"paths":["M13 16a3 3 0 0 1 2.24 5","M18 12h.01","M18 21h-8a4 4 0 0 1-4-4 7 7 0 0 1 7-7h.2L9.6 6.4a1 1 0 1 1 2.8-2.8L15.8 7h.2c3.3 0 6 2.7 6 6v1a2 2 0 0 1-2 2h-1a3 3 0 0 0-3 3","M20 8.54V4a2 2 0 1 0-4 0v3","M7.612 12.524a3 3 0 1 0-1.6 4.3"],"stroke":true},
  "radar": {"name":"Radar","viewBox":[0,0,24,24],"paths":["M19.07 4.93A10 10 0 0 0 6.99 3.34","M4 6h.01","M2.29 9.62A10 10 0 1 0 21.31 8.35","M16.24 7.76A6 6 0 1 0 8.23 16.67","M12 18h.01","M17.99 11.66A6 6 0 0 1 15.77 16.67","M 10 12 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0","m13.41 10.59 5.66-5.66"],"stroke":true},
  "radiation": {"name":"Radiation","viewBox":[0,0,24,24],"paths":["M12 12h.01","M14 15.4641a4 4 0 0 1-4 0L7.52786 19.74597 A 1 1 0 0 0 7.99303 21.16211 10 10 0 0 0 16.00697 21.16211 1 1 0 0 0 16.47214 19.74597z","M16 12a4 4 0 0 0-2-3.464l2.472-4.282a1 1 0 0 1 1.46-.305 10 10 0 0 1 4.006 6.94A1 1 0 0 1 21 12z","M8 12a4 4 0 0 1 2-3.464L7.528 4.254a1 1 0 0 0-1.46-.305 10 10 0 0 0-4.006 6.94A1 1 0 0 0 3 12z"],"stroke":true},
  "radical": {"name":"Radical","viewBox":[0,0,24,24],"paths":["M3 12h3.28a1 1 0 0 1 .948.684l2.298 7.934a.5.5 0 0 0 .96-.044L13.82 4.771A1 1 0 0 1 14.792 4H21"],"stroke":true},
  "radio": {"name":"Radio","viewBox":[0,0,24,24],"paths":["M16.247 7.761a6 6 0 0 1 0 8.478","M19.075 4.933a10 10 0 0 1 0 14.134","M4.925 19.067a10 10 0 0 1 0-14.134","M7.753 16.239a6 6 0 0 1 0-8.478","M 10 12 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0"],"stroke":true},
  "radio-off": {"name":"Radio Off","viewBox":[0,0,24,24],"paths":["M13.414 13.414a2 2 0 1 1-2.828-2.828","M16.247 7.761a6 6 0 0 1 1.744 4.572","M19.075 4.933a10 10 0 0 1 2.234 10.72","m2 2 20 20","M4.925 19.067a10 10 0 0 1 0-14.134","M7.753 16.239a6 6 0 0 1 0-8.478"],"stroke":true},
  "radio-receiver": {"name":"Radio Receiver","viewBox":[0,0,24,24],"paths":["M5 16v2","M19 16v2","M 2 8 h 20 v 8 h -20 z","M18 12h.01"],"stroke":true},
  "radio-tower": {"name":"Radio Tower","viewBox":[0,0,24,24],"paths":["M4.9 16.1C1 12.2 1 5.8 4.9 1.9","M7.8 4.7a6.14 6.14 0 0 0-.8 7.5","M 10 9 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0","M16.2 4.8c2 2 2.26 5.11.8 7.47","M19.1 1.9a9.96 9.96 0 0 1 0 14.1","M9.5 18h5","m8 22 4-11 4 11"],"stroke":true},
  "radius": {"name":"Radius","viewBox":[0,0,24,24],"paths":["M20.34 17.52a10 10 0 1 0-2.82 2.82","M 17 19 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0","m13.41 13.41 4.18 4.18","M 10 12 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0"],"stroke":true},
  "rainbow": {"name":"Rainbow","viewBox":[0,0,24,24],"paths":["M22 17a10 10 0 0 0-20 0","M6 17a6 6 0 0 1 12 0","M10 17a2 2 0 0 1 4 0"],"stroke":true},
  "rat": {"name":"Rat","viewBox":[0,0,24,24],"paths":["M13 22H4a2 2 0 0 1 0-4h12","M13.236 18a3 3 0 0 0-2.2-5","M16 9h.01","M16.82 3.94a3 3 0 1 1 3.237 4.868l1.815 2.587a1.5 1.5 0 0 1-1.5 2.1l-2.872-.453a3 3 0 0 0-3.5 3","M17 4.988a3 3 0 1 0-5.2 2.052A7 7 0 0 0 4 14.015 4 4 0 0 0 8 18"],"stroke":true},
  "ratio": {"name":"Ratio","viewBox":[0,0,24,24],"paths":["M 6 2 h 12 v 20 h -12 z","M 2 6 h 20 v 12 h -20 z"],"stroke":true},
  "receipt": {"name":"Receipt","viewBox":[0,0,24,24],"paths":["M12 17V7","M16 8h-6a2 2 0 0 0 0 4h4a2 2 0 0 1 0 4H8","M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z"],"stroke":true},
  "receipt-cent": {"name":"Receipt Cent","viewBox":[0,0,24,24],"paths":["M12 7v10","M14.828 14.829a4 4 0 0 1-5.656 0 4 4 0 0 1 0-5.657 4 4 0 0 1 5.656 0","M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z"],"stroke":true},
  "receipt-euro": {"name":"Receipt Euro","viewBox":[0,0,24,24],"paths":["M15.828 14.829a4 4 0 0 1-5.656 0 4 4 0 0 1 0-5.657 4 4 0 0 1 5.656 0","M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z","M8 12h5"],"stroke":true},
  "receipt-indian-rupee": {"name":"Receipt Indian Rupee","viewBox":[0,0,24,24],"paths":["M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z","M8 11h8","M8 7h8","M9 7a4 4 0 0 1 0 8H8l3 2"],"stroke":true},
  "receipt-japanese-yen": {"name":"Receipt Japanese Yen","viewBox":[0,0,24,24],"paths":["m12 10 3-3","M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z","M9 11h6","M9 15h6","m9 7 3 3v7"],"stroke":true},
  "receipt-pound-sterling": {"name":"Receipt Pound Sterling","viewBox":[0,0,24,24],"paths":["M10 17V9.5a1 1 0 0 1 5 0","M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z","M8 13h5","M8 17h7"],"stroke":true},
  "receipt-russian-ruble": {"name":"Receipt Russian Ruble","viewBox":[0,0,24,24],"paths":["M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z","M8 11h5a2 2 0 0 0 0-4h-3v10","M8 15h5"],"stroke":true},
  "receipt-swiss-franc": {"name":"Receipt Swiss Franc","viewBox":[0,0,24,24],"paths":["M10 11h4","M10 17V7h5","M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z","M8 15h5"],"stroke":true},
  "receipt-text": {"name":"Receipt Text","viewBox":[0,0,24,24],"paths":["M13 16H8","M14 8H8","M16 12H8","M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z"],"stroke":true},
  "receipt-turkish-lira": {"name":"Receipt Turkish Lira","viewBox":[0,0,24,24],"paths":["M10 7v10a5 5 0 0 0 5-5","m14 8-6 3","M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z"],"stroke":true},
  "rectangle-circle": {"name":"Rectangle Circle","viewBox":[0,0,24,24],"paths":["M14 4v16H3a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z","M 6 12 a 8 8 0 1 0 16 0 a 8 8 0 1 0 -16 0"],"stroke":true},
  "rectangle-ellipsis": {"name":"Rectangle Ellipsis","viewBox":[0,0,24,24],"paths":["M 2 6 h 20 v 12 h -20 z","M12 12h.01","M17 12h.01","M7 12h.01"],"stroke":true},
  "rectangle-goggles": {"name":"Rectangle Goggles","viewBox":[0,0,24,24],"paths":["M20 6a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-4a2 2 0 0 1-1.6-.8l-1.6-2.13a1 1 0 0 0-1.6 0L9.6 17.2A2 2 0 0 1 8 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z"],"stroke":true},
  "rectangle-horizontal": {"name":"Rectangle Horizontal","viewBox":[0,0,24,24],"paths":["M 2 6 h 20 v 12 h -20 z"],"stroke":true},
  "rectangle-vertical": {"name":"Rectangle Vertical","viewBox":[0,0,24,24],"paths":["M 6 2 h 12 v 20 h -12 z"],"stroke":true},
  "recycle": {"name":"Recycle","viewBox":[0,0,24,24],"paths":["M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5","M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12","m14 16-3 3 3 3","M8.293 13.596 7.196 9.5 3.1 10.598","m9.344 5.811 1.093-1.892A1.83 1.83 0 0 1 11.985 3a1.784 1.784 0 0 1 1.546.888l3.943 6.843","m13.378 9.633 4.096 1.098 1.097-4.096"],"stroke":true},
  "redo": {"name":"Redo","viewBox":[0,0,24,24],"paths":["M21 7v6h-6","M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7"],"stroke":true},
  "redo-2": {"name":"Redo 2","viewBox":[0,0,24,24],"paths":["m15 14 5-5-5-5","M20 9H9.5A5.5 5.5 0 0 0 4 14.5A5.5 5.5 0 0 0 9.5 20H13"],"stroke":true},
  "redo-dot": {"name":"Redo Dot","viewBox":[0,0,24,24],"paths":["M 11 17 a 1 1 0 1 0 2 0 a 1 1 0 1 0 -2 0","M21 7v6h-6","M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7"],"stroke":true},
  "refresh-ccw": {"name":"Refresh Ccw","viewBox":[0,0,24,24],"paths":["M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8","M3 3v5h5","M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16","M16 16h5v5"],"stroke":true},
  "refresh-ccw-dot": {"name":"Refresh Ccw Dot","viewBox":[0,0,24,24],"paths":["M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8","M3 3v5h5","M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16","M16 16h5v5","M 11 12 a 1 1 0 1 0 2 0 a 1 1 0 1 0 -2 0"],"stroke":true},
  "refresh-cw": {"name":"Refresh Cw","viewBox":[0,0,24,24],"paths":["M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8","M21 3v5h-5","M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16","M8 16H3v5"],"stroke":true},
  "refresh-cw-off": {"name":"Refresh Cw Off","viewBox":[0,0,24,24],"paths":["M21 8L18.74 5.74A9.75 9.75 0 0 0 12 3C11 3 10.03 3.16 9.13 3.47","M8 16H3v5","M3 12C3 9.51 4 7.26 5.64 5.64","m3 16 2.26 2.26A9.75 9.75 0 0 0 12 21c2.49 0 4.74-1 6.36-2.64","M21 12c0 1-.16 1.97-.47 2.87","M21 3v5h-5","M22 22 2 2"],"stroke":true},
  "refrigerator": {"name":"Refrigerator","viewBox":[0,0,24,24],"paths":["M5 6a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6Z","M5 10h14","M15 7v6"],"stroke":true},
  "regex": {"name":"Regex","viewBox":[0,0,24,24],"paths":["M17 3v10","m12.67 5.5 8.66 5","m12.67 10.5 8.66-5","M9 17a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2z"],"stroke":true},
  "remove-formatting": {"name":"Remove Formatting","viewBox":[0,0,24,24],"paths":["M4 7V4h16v3","M5 20h6","M13 4 8 20","m15 15 5 5","m20 15-5 5"],"stroke":true},
  "repeat": {"name":"Repeat","viewBox":[0,0,24,24],"paths":["m17 2 4 4-4 4","M3 11v-1a4 4 0 0 1 4-4h14","m7 22-4-4 4-4","M21 13v1a4 4 0 0 1-4 4H3"],"stroke":true},
  "repeat-1": {"name":"Repeat 1","viewBox":[0,0,24,24],"paths":["m17 2 4 4-4 4","M3 11v-1a4 4 0 0 1 4-4h14","m7 22-4-4 4-4","M21 13v1a4 4 0 0 1-4 4H3","M11 10h1v4"],"stroke":true},
  "repeat-2": {"name":"Repeat 2","viewBox":[0,0,24,24],"paths":["m2 9 3-3 3 3","M13 18H7a2 2 0 0 1-2-2V6","m22 15-3 3-3-3","M11 6h6a2 2 0 0 1 2 2v10"],"stroke":true},
  "repeat-off": {"name":"Repeat Off","viewBox":[0,0,24,24],"paths":["M11.656 6H21l-4-4","M17.898 17.898A4 4 0 0 1 17 18H3l4-4","m2 2 20 20","M21 13v1a4 4 0 0 1-.171 1.159","m21 6-4 4","M3 11v-1a4 4 0 0 1 3.102-3.898","m7 22-4-4"],"stroke":true},
  "replace": {"name":"Replace","viewBox":[0,0,24,24],"paths":["M14 4a1 1 0 0 1 1-1","M15 10a1 1 0 0 1-1-1","M21 4a1 1 0 0 0-1-1","M21 9a1 1 0 0 1-1 1","m3 7 3 3 3-3","M6 10V5a2 2 0 0 1 2-2h2","M 3 14 h 7 v 7 h -7 z"],"stroke":true},
  "replace-all": {"name":"Replace All","viewBox":[0,0,24,24],"paths":["M14 14a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1","M14 4a1 1 0 0 1 1-1","M15 10a1 1 0 0 1-1-1","M19 14a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1","M21 4a1 1 0 0 0-1-1","M21 9a1 1 0 0 1-1 1","m3 7 3 3 3-3","M6 10V5a2 2 0 0 1 2-2h2","M 3 14 h 7 v 7 h -7 z"],"stroke":true},
  "reply": {"name":"Reply","viewBox":[0,0,24,24],"paths":["M20 18v-2a4 4 0 0 0-4-4H4","m9 17-5-5 5-5"],"stroke":true},
  "reply-all": {"name":"Reply All","viewBox":[0,0,24,24],"paths":["m12 17-5-5 5-5","M22 18v-2a4 4 0 0 0-4-4H7","m7 17-5-5 5-5"],"stroke":true},
  "rewind": {"name":"Rewind","viewBox":[0,0,24,24],"paths":["M12 6a2 2 0 0 0-3.414-1.414l-6 6a2 2 0 0 0 0 2.828l6 6A2 2 0 0 0 12 18z","M22 6a2 2 0 0 0-3.414-1.414l-6 6a2 2 0 0 0 0 2.828l6 6A2 2 0 0 0 22 18z"],"stroke":true},
  "ribbon": {"name":"Ribbon","viewBox":[0,0,24,24],"paths":["M12 11.22C11 9.997 10 9 10 8a2 2 0 0 1 4 0c0 1-.998 2.002-2.01 3.22","m12 18 2.57-3.5","M6.243 9.016a7 7 0 0 1 11.507-.009","M9.35 14.53 12 11.22","M9.35 14.53C7.728 12.246 6 10.221 6 7a6 5 0 0 1 12 0c-.005 3.22-1.778 5.235-3.43 7.5l3.557 4.527a1 1 0 0 1-.203 1.43l-1.894 1.36a1 1 0 0 1-1.384-.215L12 18l-2.679 3.593a1 1 0 0 1-1.39.213l-1.865-1.353a1 1 0 0 1-.203-1.422z"],"stroke":true},
  "road": {"name":"Road","viewBox":[0,0,24,24],"paths":["M12 17v4","M12 5V3","M12 9v3","M2.077 18.449A2 2 0 0 0 4 21h16a2 2 0 0 0 1.924-2.55l-4-14A2 2 0 0 0 16 3H8a2 2 0 0 0-1.924 1.45z"],"stroke":true},
  "robot-arm": {"name":"Robot Arm","viewBox":[0,0,24,24],"paths":["M12 21 7.5 8.322","m14 7 1.75-3.767a.5.5 0 0 1 .662-.172L20 5.005","m20 8.998-3.588 1.944a.5.5 0 0 1-.662-.172L14 7H8","M3.486 21h10","M5 21V8.732","M 4 7 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0"],"stroke":true},
  "robot-vacuum": {"name":"Robot Vacuum","viewBox":[0,0,24,24],"paths":["M11 17h2","M12 12h.01","M17 12a5 5 0 00-10 0","M19 2v2.8","M2 5h2.8","M22 5h-2.8","M5 2v2.8","M 2 12 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0"],"stroke":true},
  "rocket": {"name":"Rocket","viewBox":[0,0,24,24],"paths":["M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5","M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09","M9 12a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.4 22.4 0 0 1-4 2z","M9 12H4s.55-3.03 2-4c1.62-1.08 5 .05 5 .05"],"stroke":true},
  "rocking-chair": {"name":"Rocking Chair","viewBox":[0,0,24,24],"paths":["m15 13 3.708 7.416","M3 19a15 15 0 0 0 18 0","m3 2 3.21 9.633A2 2 0 0 0 8.109 13H18","m9 13-3.708 7.416"],"stroke":true},
  "roller-coaster": {"name":"Roller Coaster","viewBox":[0,0,24,24],"paths":["M6 19V5","M10 19V6.8","M14 19v-7.8","M18 5v4","M18 19v-6","M22 19V9","M2 19V9a4 4 0 0 1 4-4c2 0 4 1.33 6 4s4 4 6 4a4 4 0 1 0-3-6.65"],"stroke":true},
  "rose": {"name":"Rose","viewBox":[0,0,24,24],"paths":["M17 10h-1a4 4 0 1 1 4-4v.534","M17 6h1a4 4 0 0 1 1.42 7.74l-2.29.87a6 6 0 0 1-5.339-10.68l2.069-1.31","M4.5 17c2.8-.5 4.4 0 5.5.8s1.8 2.2 2.3 3.7c-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2","M9.77 12C4 15 2 22 2 22","M 15 8 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0"],"stroke":true},
  "rotate-3-d": {"name":"Rotate 3 D","viewBox":[0,0,24,24],"paths":["m15.194 13.707 3.814 1.86-1.86 3.814","M16.47214 7.52786 A 5 10 0 1 0 13 21.79796","M21.79796 11 A 10 5 0 1 0 19 15.57071"],"stroke":true},
  "rotate-3d": {"name":"Rotate 3d","viewBox":[0,0,24,24],"paths":["m15.194 13.707 3.814 1.86-1.86 3.814","M16.47214 7.52786 A 5 10 0 1 0 13 21.79796","M21.79796 11 A 10 5 0 1 0 19 15.57071"],"stroke":true},
  "rotate-ccw": {"name":"Rotate Ccw","viewBox":[0,0,24,24],"paths":["M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8","M3 3v5h5"],"stroke":true},
  "rotate-ccw-clock": {"name":"Rotate Ccw Clock","viewBox":[0,0,24,24],"paths":["M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8","M3 3v5h5","M12 7v5l4 2"],"stroke":true},
  "rotate-ccw-key": {"name":"Rotate Ccw Key","viewBox":[0,0,24,24],"paths":["M12 7v6","M12 9h2","M3 12a9 9 0 1 0 9-9 9.74 9.74 0 0 0-6.74 2.74L3 8","M3 3v5h5","M 10 15 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0"],"stroke":true},
  "rotate-ccw-square": {"name":"Rotate Ccw Square","viewBox":[0,0,24,24],"paths":["M20 9V7a2 2 0 0 0-2-2h-6","m15 2-3 3 3 3","M20 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2"],"stroke":true},
  "rotate-cw": {"name":"Rotate Cw","viewBox":[0,0,24,24],"paths":["M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8","M21 3v5h-5"],"stroke":true},
  "rotate-cw-clock": {"name":"Rotate Cw Clock","viewBox":[0,0,24,24],"paths":["M12 7v5l4 2","M16 8h5V3","m21 8-2.3-2.3A9.7 9.7 0 0012 3a9 9 0 109 9"],"stroke":true},
  "rotate-cw-fading-clock": {"name":"Rotate Cw Fading Clock","viewBox":[0,0,24,24],"paths":["M12 3a9.75 9.75 0 0 1 6.74 2.74","M18.74 5.74 21 8","M21 8V3","M7.5 19.794c-6-3.464-6-12.124 0-15.588","M7.5 4.206A9 9 0 0 1 12 3","M12 7v5l4 2","M14 20.775A9 9 0 0 1 12 21","M19 17.656a9 9 0 0 1-1.5 1.456","M21 12a9 9 0 0 1-.228 2","M21 8h-5"],"stroke":true},
  "rotate-cw-square": {"name":"Rotate Cw Square","viewBox":[0,0,24,24],"paths":["M12 5H6a2 2 0 0 0-2 2v3","m9 8 3-3-3-3","M4 14v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"],"stroke":true},
  "route": {"name":"Route","viewBox":[0,0,24,24],"paths":["M 3 19 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0","M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15","M 15 5 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0"],"stroke":true},
  "route-off": {"name":"Route Off","viewBox":[0,0,24,24],"paths":["M 3 19 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0","M9 19h8.5c.4 0 .9-.1 1.3-.2","M5.2 5.2A3.5 3.53 0 0 0 6.5 12H12","m2 2 20 20","M21 15.3a3.5 3.5 0 0 0-3.3-3.3","M15 5h-4.3","M 15 5 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0"],"stroke":true},
  "router": {"name":"Router","viewBox":[0,0,24,24],"paths":["M 2 14 h 20 v 8 h -20 z","M6.01 18H6","M10.01 18H10","M15 10v4","M17.84 7.17a4 4 0 0 0-5.66 0","M20.66 4.34a8 8 0 0 0-11.31 0"],"stroke":true},
  "rows": {"name":"Rows","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","M3 12h18"],"stroke":true},
  "rows-2": {"name":"Rows 2","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","M3 12h18"],"stroke":true},
  "rows-3": {"name":"Rows 3","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","M21 9H3","M21 15H3"],"stroke":true},
  "rows-4": {"name":"Rows 4","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","M21 7.5H3","M21 12H3","M21 16.5H3"],"stroke":true},
  "rss": {"name":"Rss","viewBox":[0,0,24,24],"paths":["M4 11a9 9 0 0 1 9 9","M4 4a16 16 0 0 1 16 16","M 4 19 a 1 1 0 1 0 2 0 a 1 1 0 1 0 -2 0"],"stroke":true},
  "rugby-ball": {"name":"Rugby Ball","viewBox":[0,0,24,24],"paths":["m10 10 4 4","m13 7 4 4","M15.34 2.138A15 15 0 002.138 15.34c-.357 2.94.004 4.919.805 5.717.798.8 2.778 1.162 5.718.805A15 15 0 0021.862 8.661c.357-2.94-.004-4.92-.805-5.718-.798-.8-2.778-1.162-5.717-.805","M17 7 7 17","m7 13 4 4"],"stroke":true},
  "ruler": {"name":"Ruler","viewBox":[0,0,24,24],"paths":["M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z","m14.5 12.5 2-2","m11.5 9.5 2-2","m8.5 6.5 2-2","m17.5 15.5 2-2"],"stroke":true},
  "ruler-dimension-line": {"name":"Ruler Dimension Line","viewBox":[0,0,24,24],"paths":["M10 15v-3","M14 15v-3","M18 15v-3","M2 8V4","M22 6H2","M22 8V4","M6 15v-3","M 2 12 h 20 v 8 h -20 z"],"stroke":true},
  "russian-ruble": {"name":"Russian Ruble","viewBox":[0,0,24,24],"paths":["M6 11h8a4 4 0 0 0 0-8H9v18","M6 15h8"],"stroke":true},
  "sailboat": {"name":"Sailboat","viewBox":[0,0,24,24],"paths":["M10 2v15","M7 22a4 4 0 0 1-4-4 1 1 0 0 1 1-1h16a1 1 0 0 1 1 1 4 4 0 0 1-4 4z","M9.159 2.46a1 1 0 0 1 1.521-.193l9.977 8.98A1 1 0 0 1 20 13H4a1 1 0 0 1-.824-1.567z"],"stroke":true},
  "salad": {"name":"Salad","viewBox":[0,0,24,24],"paths":["M19.496 12a2.5 2.5 0 00.399-2.214A2 2 0 0020.32 6.5 2 2 0 0019 3a2 2 0 00-1.5.68 2 2 0 00-3.287.424 2.5 2.5 0 00-3.189 2.06A3 3 0 0012 12l4-4","M4 12a1 1 0 00-.99 1.133A9 9 0 0012 21a9 9 0 008.99-7.867A1 1 0 0020 12z","M7 21h10","M9.85 6.907A3.5 3.5 0 005.05 12"],"stroke":true},
  "sandwich": {"name":"Sandwich","viewBox":[0,0,24,24],"paths":["m2.37 11.223 8.372-6.777a2 2 0 0 1 2.516 0l8.371 6.777","M21 15a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-5.25","M3 15a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h9","m6.67 15 6.13 4.6a2 2 0 0 0 2.8-.4l3.15-4.2","M 2 11 h 20 v 4 h -20 z"],"stroke":true},
  "satellite": {"name":"Satellite","viewBox":[0,0,24,24],"paths":["m13.5 6.5-3.148-3.148a1.205 1.205 0 0 0-1.704 0L6.352 5.648a1.205 1.205 0 0 0 0 1.704L9.5 10.5","M16.5 7.5 19 5","m17.5 10.5 3.148 3.148a1.205 1.205 0 0 1 0 1.704l-2.296 2.296a1.205 1.205 0 0 1-1.704 0L13.5 14.5","M9 21a6 6 0 0 0-6-6","M9.352 10.648a1.205 1.205 0 0 0 0 1.704l2.296 2.296a1.205 1.205 0 0 0 1.704 0l4.296-4.296a1.205 1.205 0 0 0 0-1.704l-2.296-2.296a1.205 1.205 0 0 0-1.704 0z"],"stroke":true},
  "satellite-dish": {"name":"Satellite Dish","viewBox":[0,0,24,24],"paths":["M18 12a6 6 0 00-6-6","M2.824 10.459a8 8 0 0010.717 10.717c.558-.276.623-1.012.183-1.452l-9.448-9.448c-.44-.44-1.176-.375-1.452.183","M22 12A10 10 0 0012 2","m9 15 4-4"],"stroke":true},
  "saudi-riyal": {"name":"Saudi Riyal","viewBox":[0,0,24,24],"paths":["m20 19.5-5.5 1.2","M14.5 4v11.22a1 1 0 0 0 1.242.97L20 15.2","m2.978 19.351 5.549-1.363A2 2 0 0 0 10 16V2","M20 10 4 13.5"],"stroke":true},
  "save": {"name":"Save","viewBox":[0,0,24,24],"paths":["M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z","M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7","M7 3v4a1 1 0 0 0 1 1h7"],"stroke":true},
  "save-all": {"name":"Save All","viewBox":[0,0,24,24],"paths":["M10 2v3a1 1 0 0 0 1 1h5","M18 18v-6a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v6","M18 22H4a2 2 0 0 1-2-2V6","M8 18a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9.172a2 2 0 0 1 1.414.586l2.828 2.828A2 2 0 0 1 22 6.828V16a2 2 0 0 1-2.01 2z"],"stroke":true},
  "save-check": {"name":"Save Check","viewBox":[0,0,24,24],"paths":["M12.5 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h10.2a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4v4.35","m16 19 2 2 4-4","M17 15.13V14a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7","M7 3v4a1 1 0 0 0 1 1h7"],"stroke":true},
  "save-off": {"name":"Save Off","viewBox":[0,0,24,24],"paths":["M13 13H8a1 1 0 0 0-1 1v7","M14 8h1","M17 21v-4","m2 2 20 20","M20.41 20.41A2 2 0 0 1 19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 .59-1.41","M9 3h6.2a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V15"],"stroke":true},
  "save-pen": {"name":"Save Pen","viewBox":[0,0,24,24],"paths":["M13.33 13H8a1 1 0 00-1 1v7","M14.363 17.634a2 2 0 00-.506.854l-.837 2.87a.5.5 0 00.62.62l2.87-.837a2 2 0 00.854-.506l4.013-4.009a1 1 0 10-3.004-3.004z","M7 3v4a1 1 0 001 1h7","M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h10.2a2 2 0 011.4.6l3.8 3.8a2 2 0 01.6 1.4v.3"],"stroke":true},
  "save-plus": {"name":"Save Plus","viewBox":[0,0,24,24],"paths":["M12.5 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h10.2a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V12","M16 13H8a1 1 0 0 0-1 1v7","M19 22v-6","M22 19h-6","M7 3v4a1 1 0 0 0 1 1h7"],"stroke":true},
  "scale": {"name":"Scale","viewBox":[0,0,24,24],"paths":["M12 3v18","m19 8 3 8a5 5 0 0 1-6 0zV7","M3 7h1a17 17 0 0 0 8-2 17 17 0 0 0 8 2h1","m5 8 3 8a5 5 0 0 1-6 0zV7","M7 21h10"],"stroke":true},
  "scale-3-d": {"name":"Scale 3 D","viewBox":[0,0,24,24],"paths":["M5 7v11a1 1 0 0 0 1 1h11","M5.293 18.707 11 13","M 17 19 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0","M 3 5 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0"],"stroke":true},
  "scale-3d": {"name":"Scale 3d","viewBox":[0,0,24,24],"paths":["M5 7v11a1 1 0 0 0 1 1h11","M5.293 18.707 11 13","M 17 19 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0","M 3 5 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0"],"stroke":true},
  "scaling": {"name":"Scaling","viewBox":[0,0,24,24],"paths":["M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7","M14 15H9v-5","M16 3h5v5","M21 3 9 15"],"stroke":true},
  "scan": {"name":"Scan","viewBox":[0,0,24,24],"paths":["M3 7V5a2 2 0 0 1 2-2h2","M17 3h2a2 2 0 0 1 2 2v2","M21 17v2a2 2 0 0 1-2 2h-2","M7 21H5a2 2 0 0 1-2-2v-2"],"stroke":true},
  "scan-barcode": {"name":"Scan Barcode","viewBox":[0,0,24,24],"paths":["M3 7V5a2 2 0 0 1 2-2h2","M17 3h2a2 2 0 0 1 2 2v2","M21 17v2a2 2 0 0 1-2 2h-2","M7 21H5a2 2 0 0 1-2-2v-2","M8 7v10","M12 7v10","M17 7v10"],"stroke":true},
  "scan-box": {"name":"Scan Box","viewBox":[0,0,24,24],"paths":["M12 12v5.5","M17 3h2a2 2 0 012 2v2","M21 17v2a2 2 0 01-2 2h-2","M3 7V5a2 2 0 012-2h2","M7 21H5a2 2 0 01-2-2v-2","M7.264 9.252 12 12l4.737-2.748","M7.995 8.514A2 2 0 007 10.244v3.516a2 2 0 00.996 1.73l3 1.74a2 2 0 002.008 0l3-1.74A2 2 0 0017 13.76v-3.517a2 2 0 00-.995-1.73l-3-1.742a2 2 0 00-1.892-.064z"],"stroke":true},
  "scan-eye": {"name":"Scan Eye","viewBox":[0,0,24,24],"paths":["M3 7V5a2 2 0 0 1 2-2h2","M17 3h2a2 2 0 0 1 2 2v2","M21 17v2a2 2 0 0 1-2 2h-2","M7 21H5a2 2 0 0 1-2-2v-2","M 11 12 a 1 1 0 1 0 2 0 a 1 1 0 1 0 -2 0","M18.944 12.33a1 1 0 0 0 0-.66 7.5 7.5 0 0 0-13.888 0 1 1 0 0 0 0 .66 7.5 7.5 0 0 0 13.888 0"],"stroke":true},
  "scan-face": {"name":"Scan Face","viewBox":[0,0,24,24],"paths":["M3 7V5a2 2 0 0 1 2-2h2","M17 3h2a2 2 0 0 1 2 2v2","M21 17v2a2 2 0 0 1-2 2h-2","M7 21H5a2 2 0 0 1-2-2v-2","M8 14s1.5 2 4 2 4-2 4-2","M9 9h.01","M15 9h.01"],"stroke":true},
  "scan-heart": {"name":"Scan Heart","viewBox":[0,0,24,24],"paths":["M17 3h2a2 2 0 0 1 2 2v2","M21 17v2a2 2 0 0 1-2 2h-2","M3 7V5a2 2 0 0 1 2-2h2","M7 21H5a2 2 0 0 1-2-2v-2","M7.828 13.07A3 3 0 0 1 12 8.764a3 3 0 0 1 4.172 4.306l-3.447 3.62a1 1 0 0 1-1.449 0z"],"stroke":true},
  "scan-line": {"name":"Scan Line","viewBox":[0,0,24,24],"paths":["M3 7V5a2 2 0 0 1 2-2h2","M17 3h2a2 2 0 0 1 2 2v2","M21 17v2a2 2 0 0 1-2 2h-2","M7 21H5a2 2 0 0 1-2-2v-2","M7 12h10"],"stroke":true},
  "scan-qr-code": {"name":"Scan Qr Code","viewBox":[0,0,24,24],"paths":["M17 12v4a1 1 0 0 1-1 1h-4","M17 3h2a2 2 0 0 1 2 2v2","M17 8V7","M21 17v2a2 2 0 0 1-2 2h-2","M3 7V5a2 2 0 0 1 2-2h2","M7 17h.01","M7 21H5a2 2 0 0 1-2-2v-2","M 7 7 h 5 v 5 h -5 z"],"stroke":true},
  "scan-search": {"name":"Scan Search","viewBox":[0,0,24,24],"paths":["M3 7V5a2 2 0 0 1 2-2h2","M17 3h2a2 2 0 0 1 2 2v2","M21 17v2a2 2 0 0 1-2 2h-2","M7 21H5a2 2 0 0 1-2-2v-2","M 9 12 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0","m16 16-1.9-1.9"],"stroke":true},
  "scan-square": {"name":"Scan Square","viewBox":[0,0,24,24],"paths":["M3 7V5a2 2 0 0 1 2-2h2","M17 3h2a2 2 0 0 1 2 2v2","M21 17v2a2 2 0 0 1-2 2h-2","M7 21H5a2 2 0 0 1-2-2v-2","M 8 8 h 8 v 8 h -8 z"],"stroke":true},
  "scan-text": {"name":"Scan Text","viewBox":[0,0,24,24],"paths":["M3 7V5a2 2 0 0 1 2-2h2","M17 3h2a2 2 0 0 1 2 2v2","M21 17v2a2 2 0 0 1-2 2h-2","M7 21H5a2 2 0 0 1-2-2v-2","M7 8h8","M7 12h10","M7 16h6"],"stroke":true},
  "scatter-chart": {"name":"Scatter Chart","viewBox":[0,0,24,24],"paths":["M 7 7.5 a 0.5 0.5 0 1 0 1 0 a 0.5 0.5 0 1 0 -1 0","M 18 5.5 a 0.5 0.5 0 1 0 1 0 a 0.5 0.5 0 1 0 -1 0","M 11 11.5 a 0.5 0.5 0 1 0 1 0 a 0.5 0.5 0 1 0 -1 0","M 7 16.5 a 0.5 0.5 0 1 0 1 0 a 0.5 0.5 0 1 0 -1 0","M 17 14.5 a 0.5 0.5 0 1 0 1 0 a 0.5 0.5 0 1 0 -1 0","M3 3v16a2 2 0 0 0 2 2h16"],"stroke":true},
  "school": {"name":"School","viewBox":[0,0,24,24],"paths":["M14 21v-3a2 2 0 0 0-4 0v3","M18 4.933V21","m4 6 7.106-3.79a2 2 0 0 1 1.788 0L20 6","m6 11-3.52 2.147a1 1 0 0 0-.48.854V19a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a1 1 0 0 0-.48-.853L18 11","M6 4.933V21","M 10 9 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0"],"stroke":true},
  "school-2": {"name":"School 2","viewBox":[0,0,24,24],"paths":["M14 21v-3a2 2 0 0 0-4 0v3","M18 12h.01","M18 16h.01","M22 7a1 1 0 0 0-1-1h-2a2 2 0 0 1-1.143-.359L13.143 2.36a2 2 0 0 0-2.286-.001L6.143 5.64A2 2 0 0 1 5 6H3a1 1 0 0 0-1 1v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2z","M6 12h.01","M6 16h.01","M 10 10 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0"],"stroke":true},
  "scissors": {"name":"Scissors","viewBox":[0,0,24,24],"paths":["M 3 6 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0","M8.12 8.12 12 12","M20 4 8.12 15.88","M 3 18 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0","M14.8 14.8 20 20"],"stroke":true},
  "scissors-line-dashed": {"name":"Scissors Line Dashed","viewBox":[0,0,24,24],"paths":["M5.42 9.42 8 12","M 2 8 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0","m14 6-8.58 8.58","M 2 16 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0","M10.8 14.8 14 18","M16 12h-2","M22 12h-2"],"stroke":true},
  "scissors-square": {"name":"Scissors Square","viewBox":[0,0,24,24],"paths":["m17 17-2.18-2.18","M9.56 14.44 17 7","M9.56 9.56 12 12","M 7 15.5 a 1.5 1.5 0 1 0 3 0 a 1.5 1.5 0 1 0 -3 0","M 7 8.5 a 1.5 1.5 0 1 0 3 0 a 1.5 1.5 0 1 0 -3 0","M 3 3 h 18 v 18 h -18 z"],"stroke":true},
  "scissors-square-dashed-bottom": {"name":"Scissors Square Dashed Bottom","viewBox":[0,0,24,24],"paths":["M14 21h1","m17 17-2.18-2.18","M5 21a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2","M9 21h1","M9.56 14.44 17 7","M9.56 9.56 12 12","M 7 15.5 a 1.5 1.5 0 1 0 3 0 a 1.5 1.5 0 1 0 -3 0","M 7 8.5 a 1.5 1.5 0 1 0 3 0 a 1.5 1.5 0 1 0 -3 0"],"stroke":true},
  "scooter": {"name":"Scooter","viewBox":[0,0,24,24],"paths":["M21 4h-3.5l2 11.05","M6.95 17h5.142c.523 0 .95-.406 1.063-.916a6.5 6.5 0 0 1 5.345-5.009","M 17 17.5 a 2.5 2.5 0 1 0 5 0 a 2.5 2.5 0 1 0 -5 0","M 2 17.5 a 2.5 2.5 0 1 0 5 0 a 2.5 2.5 0 1 0 -5 0"],"stroke":true},
  "scratch-blocks": {"name":"Scratch Blocks","viewBox":[0,0,24,24],"paths":["M19 5a2 2 0 012 2v11a2 2 0 01-2 2h-5.586a1 1 0 00-.707.293l-1.414 1.414a1 1 0 01-.707.293H8.414a1 1 0 01-.707-.293l-1.414-1.414A1 1 0 005.586 20H5a2 2 0 01-2-2V5.286c0-.394.11-.785.36-1.09a6 6 0 019.168-.133C12.996 4.6 13.637 5 14.35 5z","M21 12h-7.586a1 1 0 00-.707.293l-1.414 1.414a1 1 0 01-.707.293H8.414a1 1 0 01-.707-.293l-1.414-1.414A1 1 0 005.586 12H3"],"stroke":true},
  "screen-share": {"name":"Screen Share","viewBox":[0,0,24,24],"paths":["M13 3H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-3","M8 21h8","M12 17v4","m17 8 5-5","M17 3h5v5"],"stroke":true},
  "screen-share-off": {"name":"Screen Share Off","viewBox":[0,0,24,24],"paths":["M13 3H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-3","M8 21h8","M12 17v4","m22 3-5 5","m17 3 5 5"],"stroke":true},
  "screw": {"name":"Screw","viewBox":[0,0,24,24],"paths":["M10 9v10","M14 13v2","M16.5 10.5 5.706 21.294A2.4 2.4 0 014.002 22H2.5a.5.5 0 01-.5-.5v-1.502a2.4 2.4 0 01.706-1.704L13.5 7.5","M20.819 11.575a6 6 0 00.969-5.162.6.6 0 00-.981-.219l-.455.454a1.2 1.2 0 01-1.704 0l-1.296-1.296a1.2 1.2 0 010-1.704l.454-.453a.595.595 0 00-.219-.98 6 6 0 00-5.162.967 2 2 0 00-.222 3.019l5.596 5.597a2 2 0 003.02-.222","M6 13v8"],"stroke":true},
  "scroll": {"name":"Scroll","viewBox":[0,0,24,24],"paths":["M19 17V5a2 2 0 0 0-2-2H4","M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3"],"stroke":true},
  "scroll-text": {"name":"Scroll Text","viewBox":[0,0,24,24],"paths":["M15 12h-5","M15 8h-5","M19 17V5a2 2 0 0 0-2-2H4","M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3"],"stroke":true},
  "search": {"name":"Search","viewBox":[0,0,24,24],"paths":["m21 21-4.34-4.34","M 3 11 a 8 8 0 1 0 16 0 a 8 8 0 1 0 -16 0"],"stroke":true},
  "search-alert": {"name":"Search Alert","viewBox":[0,0,24,24],"paths":["M 3 11 a 8 8 0 1 0 16 0 a 8 8 0 1 0 -16 0","m21 21-4.3-4.3","M11 7v4","M11 15h.01"],"stroke":true},
  "search-check": {"name":"Search Check","viewBox":[0,0,24,24],"paths":["m8 11 2 2 4-4","M 3 11 a 8 8 0 1 0 16 0 a 8 8 0 1 0 -16 0","m21 21-4.3-4.3"],"stroke":true},
  "search-code": {"name":"Search Code","viewBox":[0,0,24,24],"paths":["m13 13.5 2-2.5-2-2.5","m21 21-4.3-4.3","M9 8.5 7 11l2 2.5","M 3 11 a 8 8 0 1 0 16 0 a 8 8 0 1 0 -16 0"],"stroke":true},
  "search-slash": {"name":"Search Slash","viewBox":[0,0,24,24],"paths":["m13.5 8.5-5 5","M 3 11 a 8 8 0 1 0 16 0 a 8 8 0 1 0 -16 0","m21 21-4.3-4.3"],"stroke":true},
  "search-x": {"name":"Search X","viewBox":[0,0,24,24],"paths":["m13.5 8.5-5 5","m8.5 8.5 5 5","M 3 11 a 8 8 0 1 0 16 0 a 8 8 0 1 0 -16 0","m21 21-4.3-4.3"],"stroke":true},
  "section": {"name":"Section","viewBox":[0,0,24,24],"paths":["M16 5a4 3 0 0 0-8 0c0 4 8 3 8 7a4 3 0 0 1-8 0","M8 19a4 3 0 0 0 8 0c0-4-8-3-8-7a4 3 0 0 1 8 0"],"stroke":true},
  "send": {"name":"Send","viewBox":[0,0,24,24],"paths":["M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z","m21.854 2.147-10.94 10.939"],"stroke":true},
  "send-horizonal": {"name":"Send Horizonal","viewBox":[0,0,24,24],"paths":["M3.714 3.048a.498.498 0 0 0-.683.627l2.843 7.627a2 2 0 0 1 0 1.396l-2.842 7.627a.498.498 0 0 0 .682.627l18-8.5a.5.5 0 0 0 0-.904z","M6 12h16"],"stroke":true},
  "send-horizontal": {"name":"Send Horizontal","viewBox":[0,0,24,24],"paths":["M3.714 3.048a.498.498 0 0 0-.683.627l2.843 7.627a2 2 0 0 1 0 1.396l-2.842 7.627a.498.498 0 0 0 .682.627l18-8.5a.5.5 0 0 0 0-.904z","M6 12h16"],"stroke":true},
  "send-to-back": {"name":"Send To Back","viewBox":[0,0,24,24],"paths":["M 14 14 h 8 v 8 h -8 z","M 2 2 h 8 v 8 h -8 z","M7 14v1a2 2 0 0 0 2 2h1","M14 7h1a2 2 0 0 1 2 2v1"],"stroke":true},
  "separator-horizontal": {"name":"Separator Horizontal","viewBox":[0,0,24,24],"paths":["m16 16-4 4-4-4","M3 12h18","m8 8 4-4 4 4"],"stroke":true},
  "separator-vertical": {"name":"Separator Vertical","viewBox":[0,0,24,24],"paths":["M12 3v18","m16 16 4-4-4-4","m8 8-4 4 4 4"],"stroke":true},
  "server": {"name":"Server","viewBox":[0,0,24,24],"paths":["M 2 2 h 20 v 8 h -20 z","M 2 14 h 20 v 8 h -20 z","M 6 6 L 6.01 6","M 6 18 L 6.01 18"],"stroke":true},
  "server-cog": {"name":"Server Cog","viewBox":[0,0,24,24],"paths":["m10.852 14.772-.383.923","M13.148 14.772a3 3 0 1 0-2.296-5.544l-.383-.923","m13.148 9.228.383-.923","m13.53 15.696-.382-.924a3 3 0 1 1-2.296-5.544","m14.772 10.852.923-.383","m14.772 13.148.923.383","M4.5 10H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-.5","M4.5 14H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-.5","M6 18h.01","M6 6h.01","m9.228 10.852-.923-.383","m9.228 13.148-.923.383"],"stroke":true},
  "server-crash": {"name":"Server Crash","viewBox":[0,0,24,24],"paths":["M6 10H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2","M6 14H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-2","M6 6h.01","M6 18h.01","m13 6-4 6h6l-4 6"],"stroke":true},
  "server-off": {"name":"Server Off","viewBox":[0,0,24,24],"paths":["M7 2h13a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-5","M10 10 2.5 2.5C2 2 2 2.5 2 5v3a2 2 0 0 0 2 2h6z","M22 17v-1a2 2 0 0 0-2-2h-1","M4 14a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16.5l1-.5.5.5-8-8H4z","M6 18h.01","m2 2 20 20"],"stroke":true},
  "server-plus": {"name":"Server Plus","viewBox":[0,0,24,24],"paths":["M12.5 10H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v2","M16 12h6","M19 9v6","M22 18v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h8.5","M6 18h.01","M6 6h.01"],"stroke":true},
  "settings": {"name":"Settings","viewBox":[0,0,24,24],"paths":["M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915","M 9 12 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0"],"stroke":true},
  "settings-2": {"name":"Settings 2","viewBox":[0,0,24,24],"paths":["M14 17H5","M19 7h-9","M 14 17 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0","M 4 7 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0"],"stroke":true},
  "shapes": {"name":"Shapes","viewBox":[0,0,24,24],"paths":["M8.3 10a.7.7 0 0 1-.626-1.079L11.4 3a.7.7 0 0 1 1.198-.043L16.3 8.9a.7.7 0 0 1-.572 1.1Z","M 3 14 h 7 v 7 h -7 z","M 14 17.5 a 3.5 3.5 0 1 0 7 0 a 3.5 3.5 0 1 0 -7 0"],"stroke":true},
  "share": {"name":"Share","viewBox":[0,0,24,24],"paths":["M12 2v13","m16 6-4-4-4 4","M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"],"stroke":true},
  "share-2": {"name":"Share 2","viewBox":[0,0,24,24],"paths":["M 15 5 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0","M 3 12 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0","M 15 19 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0","M 8.59 13.51 L 15.42 17.49","M 15.41 6.51 L 8.59 10.49"],"stroke":true},
  "sheet": {"name":"Sheet","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","M 3 9 L 21 9","M 3 15 L 21 15","M 9 9 L 9 21","M 15 9 L 15 21"],"stroke":true},
  "shell": {"name":"Shell","viewBox":[0,0,24,24],"paths":["M14 11a2 2 0 1 1-4 0 4 4 0 0 1 8 0 6 6 0 0 1-12 0 8 8 0 0 1 16 0 10 10 0 1 1-20 0 11.93 11.93 0 0 1 2.42-7.22 2 2 0 1 1 3.16 2.44"],"stroke":true},
  "shelving-unit": {"name":"Shelving Unit","viewBox":[0,0,24,24],"paths":["M12 12V9a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3","M16 20v-3a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v3","M20 22V2","M4 12h16","M4 20h16","M4 2v20","M4 4h16"],"stroke":true},
  "shield": {"name":"Shield","viewBox":[0,0,24,24],"paths":["M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"],"stroke":true},
  "shield-alert": {"name":"Shield Alert","viewBox":[0,0,24,24],"paths":["M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z","M12 8v4","M12 16h.01"],"stroke":true},
  "shield-ban": {"name":"Shield Ban","viewBox":[0,0,24,24],"paths":["M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z","m4.243 5.21 14.39 12.472"],"stroke":true},
  "shield-check": {"name":"Shield Check","viewBox":[0,0,24,24],"paths":["M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z","m9 12 2 2 4-4"],"stroke":true},
  "shield-close": {"name":"Shield Close","viewBox":[0,0,24,24],"paths":["M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z","m14.5 9.5-5 5","m9.5 9.5 5 5"],"stroke":true},
  "shield-cog": {"name":"Shield Cog","viewBox":[0,0,24,24],"paths":["m10.929 14.467-.383.924","M10.929 8.923 10.546 8","M13.225 8.923 13.608 8","m13.607 15.391-.382-.924","m14.849 10.547.923-.383","m14.849 12.843.923.383","M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z","m9.305 10.547-.923-.383","m9.305 12.843-.923.383","M 9.077 11.695 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0"],"stroke":true},
  "shield-cog-corner": {"name":"Shield Cog Corner","viewBox":[0,0,24,24],"paths":["M11 22c-3.806-1.45-7-3.966-7-9V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1v4","M14.923 16.547 14 16.164","m14.923 18.843-.923.383","M16.547 14.923 16.164 14","m16.547 20.467-.383.924","m18.843 14.923.383-.923","m19.225 21.391-.382-.924","m20.467 16.547.923-.383","m20.467 18.843.923.383","M 14.695 17.695 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0"],"stroke":true},
  "shield-ellipsis": {"name":"Shield Ellipsis","viewBox":[0,0,24,24],"paths":["M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z","M8 12h.01","M12 12h.01","M16 12h.01"],"stroke":true},
  "shield-half": {"name":"Shield Half","viewBox":[0,0,24,24],"paths":["M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z","M12 22V2"],"stroke":true},
  "shield-house": {"name":"Shield House","viewBox":[0,0,24,24],"paths":["M15 22a1 1 0 01-1-1v-4a1 1 0 01.445-.832l3-2a1 1 0 011.11 0l3 2A1 1 0 0122 17v4a1 1 0 01-1 1z","M18 22v-3","M20 10.418V6a1 1 0 00-1-1c-2 0-4.49-1.19-6.24-2.72a1.17 1.17 0 00-1.52 0C9.5 3.8 7 5 5 5a1 1 0 00-1 1v7c0 4.602 2.67 7.1 6.037 8.603"],"stroke":true},
  "shield-keyhole": {"name":"Shield Keyhole","viewBox":[0,0,24,24],"paths":["M12 13v3","M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 01-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 011-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 011.52 0C14.51 3.81 17 5 19 5a1 1 0 011 1z","M 10 11 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0"],"stroke":true},
  "shield-lock": {"name":"Shield Lock","viewBox":[0,0,24,24],"paths":["M20 9.807V6a1 1 0 00-1-1c-2 0-4.49-1.19-6.24-2.72a1.17 1.17 0 00-1.52 0C9.5 3.8 7 5 5 5a1 1 0 00-1 1v7c0 3.88 2.107 6.254 5 7.796","M19 17v-2a2 2 0 00-4 0v2","M 13 17 h 8 v 5 h -8 z"],"stroke":true},
  "shield-minus": {"name":"Shield Minus","viewBox":[0,0,24,24],"paths":["M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z","M9 12h6"],"stroke":true},
  "shield-off": {"name":"Shield Off","viewBox":[0,0,24,24],"paths":["m2 2 20 20","M5 5a1 1 0 0 0-1 1v7c0 5 3.5 7.5 7.67 8.94a1 1 0 0 0 .67.01c2.35-.82 4.48-1.97 5.9-3.71","M9.309 3.652A12.252 12.252 0 0 0 11.24 2.28a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1v7a9.784 9.784 0 0 1-.08 1.264"],"stroke":true},
  "shield-plus": {"name":"Shield Plus","viewBox":[0,0,24,24],"paths":["M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z","M9 12h6","M12 9v6"],"stroke":true},
  "shield-question": {"name":"Shield Question","viewBox":[0,0,24,24],"paths":["M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z","M9.1 9a3 3 0 0 1 5.82 1c0 2-3 3-3 3","M12 17h.01"],"stroke":true},
  "shield-question-mark": {"name":"Shield Question Mark","viewBox":[0,0,24,24],"paths":["M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z","M9.1 9a3 3 0 0 1 5.82 1c0 2-3 3-3 3","M12 17h.01"],"stroke":true},
  "shield-user": {"name":"Shield User","viewBox":[0,0,24,24],"paths":["M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z","M6.376 18.91a6 6 0 0 1 11.249.003","M 8 11 a 4 4 0 1 0 8 0 a 4 4 0 1 0 -8 0"],"stroke":true},
  "shield-x": {"name":"Shield X","viewBox":[0,0,24,24],"paths":["M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z","m14.5 9.5-5 5","m9.5 9.5 5 5"],"stroke":true},
  "ship": {"name":"Ship","viewBox":[0,0,24,24],"paths":["M12 2v2","M12 9.189V13","M19 12V6a2 2 0 00-2-2H7a2 2 0 00-2 2v6","M19.38 19A11.6 11.6 0 0021 13l-8.188-3.639a2 2 0 00-1.624 0L3 13.001a11.6 11.6 0 002.81 7.76","M2 20c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1s1.2 1 2.5 1c2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"],"stroke":true},
  "ship-cargo": {"name":"Ship Cargo","viewBox":[0,0,24,24],"paths":["M12 15v-3","M12 2v2","M16.5 12V9a1 1 0 011-1h1a1 1 0 001-1V5a1 1 0 00-1-1h-13a1 1 0 00-1 1v2a1 1 0 001 1h1a1 1 0 011 1v3","M19.38 19c1.076-1.815 1.636-4.89 1.628-6.008a1 1 0 00-1-.992H3.984a1 1 0 00-1 .984c-.03 1.86.97 5.621 2.826 7.776","M2 20c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1s1.2 1 2.5 1c2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"],"stroke":true},
  "ship-wheel": {"name":"Ship Wheel","viewBox":[0,0,24,24],"paths":["M 4 12 a 8 8 0 1 0 16 0 a 8 8 0 1 0 -16 0","M12 2v7.5","m19 5-5.23 5.23","M22 12h-7.5","m19 19-5.23-5.23","M12 14.5V22","M10.23 13.77 5 19","M9.5 12H2","M10.23 10.23 5 5","M 9.5 12 a 2.5 2.5 0 1 0 5 0 a 2.5 2.5 0 1 0 -5 0"],"stroke":true},
  "shirt": {"name":"Shirt","viewBox":[0,0,24,24],"paths":["M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"],"stroke":true},
  "shopping-bag": {"name":"Shopping Bag","viewBox":[0,0,24,24],"paths":["M16 10a4 4 0 0 1-8 0","M3.103 6.034h17.794","M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z"],"stroke":true},
  "shopping-basket": {"name":"Shopping Basket","viewBox":[0,0,24,24],"paths":["m15 11-1 9","m19 11-4-7","M2 11h20","m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6l1.7-7.4","M4.5 15.5h15","m5 11 4-7","m9 11 1 9"],"stroke":true},
  "shopping-cart": {"name":"Shopping Cart","viewBox":[0,0,24,24],"paths":["m2.05 2.05 1.099-.028a1 1 0 0 1 1.008.815l2.69 14.347A1 1 0 0 0 7.83 18H18","M4.563 5h16.435a1 1 0 0 1 .981 1.204l-1.026 6.226A2 2 0 0 1 18.962 14H6.25","M 16 20 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0","M 6 20 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0"],"stroke":true},
  "shopping-cart-minus": {"name":"Shopping Cart Minus","viewBox":[0,0,24,24],"paths":["M16 5h6","m2.05 2.05 1.099-.028a1 1 0 011.008.815l2.69 14.347A1 1 0 007.83 18H18","M4.564 5H12","M6.25 14h12.712a2 2 0 001.991-1.57l.514-3.113","M 16 20 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0","M 6 20 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0"],"stroke":true},
  "shopping-cart-plus": {"name":"Shopping Cart Plus","viewBox":[0,0,24,24],"paths":["M16 5h6","M19 2v6","m2.05 2.05 1.099-.028a1 1 0 011.008.815l2.69 14.347A1 1 0 007.83 18H18","M4.564 5H12","M6.25 14h12.712a2 2 0 001.991-1.57l.172-1.041","M 16 20 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0","M 6 20 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0"],"stroke":true},
  "shovel": {"name":"Shovel","viewBox":[0,0,24,24],"paths":["M21.56 4.56a1.5 1.5 0 0 1 0 2.122l-.47.47a3 3 0 0 1-4.212-.03 3 3 0 0 1 0-4.243l.44-.44a1.5 1.5 0 0 1 2.121 0z","M3 22a1 1 0 0 1-1-1v-3.586a1 1 0 0 1 .293-.707l3.355-3.355a1.205 1.205 0 0 1 1.704 0l3.296 3.296a1.205 1.205 0 0 1 0 1.704l-3.355 3.355a1 1 0 0 1-.707.293z","m9 15 7.879-7.878"],"stroke":true},
  "shower-head": {"name":"Shower Head","viewBox":[0,0,24,24],"paths":["m4 4 2.5 2.5","M13.5 6.5a4.95 4.95 0 0 0-7 7","M15 5 5 15","M14 17v.01","M10 16v.01","M13 13v.01","M16 10v.01","M11 20v.01","M17 14v.01","M20 11v.01"],"stroke":true},
  "shredder": {"name":"Shredder","viewBox":[0,0,24,24],"paths":["M4 13V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v5","M14 2v5a1 1 0 0 0 1 1h5","M10 22v-5","M14 19v-2","M18 20v-3","M2 13h20","M6 20v-3"],"stroke":true},
  "shrimp": {"name":"Shrimp","viewBox":[0,0,24,24],"paths":["M10 2a3.28 3.28 0 003.227 1.798l6.17-.561A1 1 0 1119.614 8H8.5a6.44 6.44 0 00-5.63 9.75A6.5 6.5 0 008.5 21c1.38 0 2-.5 2.5-1","M10 8a8.5 8.5 0 000 8","M11 22c-.5-.5-1.12-1-2.5-1a1 1 0 010-5H12a7 7 0 007-7V8","M13 12h.01","M8 16c-2 0-4.5-4-4-6"],"stroke":true},
  "shrimp-off": {"name":"Shrimp Off","viewBox":[0,0,24,24],"paths":["M10 2a3.28 3.28 0 003.227 1.798l6.17-.561A1 1 0 1119.614 8H13.5","M11 20c-.5.5-1.12 1-2.5 1a1 1 0 010-5H12a7 7 0 003.283-.817","M11 22c-.5-.5-1.12-1-2.5-1a6.5 6.5 0 01-5.63-3.25 6.44 6.44 0 015.236-9.744","M18.04 12.54A7 7 0 0019 9V8","m2 2 20 20","M8 16c-2 0-4.5-4-4-6","M9.43 9.33A8.5 8.5 0 0010 16"],"stroke":true},
  "shrink": {"name":"Shrink","viewBox":[0,0,24,24],"paths":["m15 15 6 6m-6-6v4.8m0-4.8h4.8","M9 19.8V15m0 0H4.2M9 15l-6 6","M15 4.2V9m0 0h4.8M15 9l6-6","M9 4.2V9m0 0H4.2M9 9 3 3"],"stroke":true},
  "shrub": {"name":"Shrub","viewBox":[0,0,24,24],"paths":["M12 22v-5.172a2 2 0 0 0-.586-1.414L9.5 13.5","M14.5 14.5 12 17","M17 8.8A6 6 0 0 1 13.8 20H10A6.5 6.5 0 0 1 7 8a5 5 0 0 1 10 0z"],"stroke":true},
  "shuffle": {"name":"Shuffle","viewBox":[0,0,24,24],"paths":["m18 14 4 4-4 4","m18 2 4 4-4 4","M2 18h1.973a4 4 0 0 0 3.3-1.7l5.454-8.6a4 4 0 0 1 3.3-1.7H22","M2 6h1.972a4 4 0 0 1 3.6 2.2","M22 18h-6.041a4 4 0 0 1-3.3-1.8l-.359-.45"],"stroke":true},
  "sidebar": {"name":"Sidebar","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","M9 3v18"],"stroke":true},
  "sidebar-close": {"name":"Sidebar Close","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","M9 3v18","m16 15-3-3 3-3"],"stroke":true},
  "sidebar-open": {"name":"Sidebar Open","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","M9 3v18","m14 9 3 3-3 3"],"stroke":true},
  "sigma": {"name":"Sigma","viewBox":[0,0,24,24],"paths":["M18 7V5a1 1 0 0 0-1-1H6.5a.5.5 0 0 0-.4.8l4.5 6a2 2 0 0 1 0 2.4l-4.5 6a.5.5 0 0 0 .4.8H17a1 1 0 0 0 1-1v-2"],"stroke":true},
  "sigma-square": {"name":"Sigma Square","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","M16 8.9V7H8l4 5-4 5h8v-1.9"],"stroke":true},
  "signal": {"name":"Signal","viewBox":[0,0,24,24],"paths":["M2 20h.01","M7 20v-4","M12 20v-8","M17 20V8","M22 4v16"],"stroke":true},
  "signal-high": {"name":"Signal High","viewBox":[0,0,24,24],"paths":["M2 20h.01","M7 20v-4","M12 20v-8","M17 20V8"],"stroke":true},
  "signal-low": {"name":"Signal Low","viewBox":[0,0,24,24],"paths":["M2 20h.01","M7 20v-4"],"stroke":true},
  "signal-medium": {"name":"Signal Medium","viewBox":[0,0,24,24],"paths":["M2 20h.01","M7 20v-4","M12 20v-8"],"stroke":true},
  "signal-zero": {"name":"Signal Zero","viewBox":[0,0,24,24],"paths":["M2 20h.01"],"stroke":true},
  "signature": {"name":"Signature","viewBox":[0,0,24,24],"paths":["m21 17-2.156-1.868A.5.5 0 0 0 18 15.5v.5a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1c0-2.545-3.991-3.97-8.5-4a1 1 0 0 0 0 5c4.153 0 4.745-11.295 5.708-13.5a2.5 2.5 0 1 1 3.31 3.284","M3 21h18"],"stroke":true},
  "signpost": {"name":"Signpost","viewBox":[0,0,24,24],"paths":["M12 13v8","M12 3v3","M2.354 10.354a1.207 1.207 0 0 1 0-1.708l2.06-2.06A2 2 0 0 1 5.828 6h12.344a2 2 0 0 1 1.414.586l2.06 2.06a1.207 1.207 0 0 1 0 1.708l-2.06 2.06a2 2 0 0 1-1.414.586H5.828a2 2 0 0 1-1.414-.586z"],"stroke":true},
  "signpost-big": {"name":"Signpost Big","viewBox":[0,0,24,24],"paths":["M10 9H4L2 7l2-2h6","M14 5h6l2 2-2 2h-6","M10 22V4a2 2 0 1 1 4 0v18","M8 22h8"],"stroke":true},
  "siren": {"name":"Siren","viewBox":[0,0,24,24],"paths":["M7 18v-6a5 5 0 1 1 10 0v6","M5 21a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-1a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2z","M21 12h1","M18.5 4.5 18 5","M2 12h1","M12 2v1","m4.929 4.929.707.707","M12 12v6"],"stroke":true},
  "skip-back": {"name":"Skip Back","viewBox":[0,0,24,24],"paths":["M17.971 4.285A2 2 0 0 1 21 6v12a2 2 0 0 1-3.029 1.715l-9.997-5.998a2 2 0 0 1-.003-3.432z","M3 20V4"],"stroke":true},
  "skip-forward": {"name":"Skip Forward","viewBox":[0,0,24,24],"paths":["M21 4v16","M6.029 4.285A2 2 0 0 0 3 6v12a2 2 0 0 0 3.029 1.715l9.997-5.998a2 2 0 0 0 .003-3.432z"],"stroke":true},
  "skull": {"name":"Skull","viewBox":[0,0,24,24],"paths":["m12.5 17-.5-1-.5 1h1z","M15 22a1 1 0 0 0 1-1v-1a2 2 0 0 0 1.56-3.25 8 8 0 1 0-11.12 0A2 2 0 0 0 8 20v1a1 1 0 0 0 1 1z","M 14 12 a 1 1 0 1 0 2 0 a 1 1 0 1 0 -2 0","M 8 12 a 1 1 0 1 0 2 0 a 1 1 0 1 0 -2 0"],"stroke":true},
  "slash": {"name":"Slash","viewBox":[0,0,24,24],"paths":["M22 2 2 22"],"stroke":true},
  "slash-square": {"name":"Slash Square","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","M 9 15 L 15 9"],"stroke":true},
  "slice": {"name":"Slice","viewBox":[0,0,24,24],"paths":["M11 16.586V19a1 1 0 0 1-1 1H2L18.37 3.63a1 1 0 1 1 3 3l-9.663 9.663a1 1 0 0 1-1.414 0L8 14"],"stroke":true},
  "sliders": {"name":"Sliders","viewBox":[0,0,24,24],"paths":["M10 8h4","M12 21v-9","M12 8V3","M17 16h4","M19 12V3","M19 21v-5","M3 14h4","M5 10V3","M5 21v-7"],"stroke":true},
  "sliders-horizontal": {"name":"Sliders Horizontal","viewBox":[0,0,24,24],"paths":["M10 5H3","M12 19H3","M14 3v4","M16 17v4","M21 12h-9","M21 19h-5","M21 5h-7","M8 10v4","M8 12H3"],"stroke":true},
  "sliders-vertical": {"name":"Sliders Vertical","viewBox":[0,0,24,24],"paths":["M10 8h4","M12 21v-9","M12 8V3","M17 16h4","M19 12V3","M19 21v-5","M3 14h4","M5 10V3","M5 21v-7"],"stroke":true},
  "smartphone": {"name":"Smartphone","viewBox":[0,0,24,24],"paths":["M 5 2 h 14 v 20 h -14 z","M12 18h.01"],"stroke":true},
  "smartphone-charging": {"name":"Smartphone Charging","viewBox":[0,0,24,24],"paths":["M 5 2 h 14 v 20 h -14 z","M12.667 8 10 12h4l-2.667 4"],"stroke":true},
  "smartphone-nfc": {"name":"Smartphone Nfc","viewBox":[0,0,24,24],"paths":["M 2 6 h 7 v 12 h -7 z","M13 8.32a7.43 7.43 0 0 1 0 7.36","M16.46 6.21a11.76 11.76 0 0 1 0 11.58","M19.91 4.1a15.91 15.91 0 0 1 .01 15.8"],"stroke":true},
  "smile": {"name":"Smile","viewBox":[0,0,24,24],"paths":["M15 10V9","M16.472 15a6 6 0 01-8.943 0","M9 10V9","M 2 12 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0"],"stroke":true},
  "smile-plus": {"name":"Smile Plus","viewBox":[0,0,24,24],"paths":["M13.267 2.08a10 10 0 108.653 8.653","M15 10V9","M16 5h6","M16.472 15a6 6 0 01-8.943 0","M19 2v6","M9 10V9"],"stroke":true},
  "snail": {"name":"Snail","viewBox":[0,0,24,24],"paths":["M2 13a6 6 0 1 0 12 0 4 4 0 1 0-8 0 2 2 0 0 0 4 0","M 2 13 a 8 8 0 1 0 16 0 a 8 8 0 1 0 -16 0","M2 21h12c4.4 0 8-3.6 8-8V7a2 2 0 1 0-4 0v6","M18 3 19.1 5.2","M22 3 20.9 5.2"],"stroke":true},
  "snowflake": {"name":"Snowflake","viewBox":[0,0,24,24],"paths":["m10 20-1.25-2.5L6 18","M10 4 8.75 6.5 6 6","m14 20 1.25-2.5L18 18","m14 4 1.25 2.5L18 6","m17 21-3-6h-4","m17 3-3 6 1.5 3","M2 12h6.5L10 9","m20 10-1.5 2 1.5 2","M22 12h-6.5L14 15","m4 10 1.5 2L4 14","m7 21 3-6-1.5-3","m7 3 3 6h4"],"stroke":true},
  "soap-dispenser-droplet": {"name":"Soap Dispenser Droplet","viewBox":[0,0,24,24],"paths":["M10.5 2v4","M14 2H7a2 2 0 0 0-2 2","M19.29 14.76A6.67 6.67 0 0 1 17 11a6.6 6.6 0 0 1-2.29 3.76c-1.15.92-1.71 2.04-1.71 3.19 0 2.22 1.8 4.05 4 4.05s4-1.83 4-4.05c0-1.16-.57-2.26-1.71-3.19","M9.607 21H6a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h7V7a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3"],"stroke":true},
  "sofa": {"name":"Sofa","viewBox":[0,0,24,24],"paths":["M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3","M2 16a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v1.5a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5V11a2 2 0 0 0-4 0z","M4 18v2","M20 18v2","M12 4v9"],"stroke":true},
  "solar-panel": {"name":"Solar Panel","viewBox":[0,0,24,24],"paths":["M11 2h2","m14.28 14-4.56 8","m21 22-1.558-4H4.558","M3 10v2","M6.245 15.04A2 2 0 0 1 8 14h12a1 1 0 0 1 .864 1.505l-3.11 5.457A2 2 0 0 1 16 22H4a1 1 0 0 1-.863-1.506z","M7 2a4 4 0 0 1-4 4","m8.66 7.66 1.41 1.41"],"stroke":true},
  "sort-asc": {"name":"Sort Asc","viewBox":[0,0,24,24],"paths":["m3 8 4-4 4 4","M7 4v16","M11 12h4","M11 16h7","M11 20h10"],"stroke":true},
  "sort-desc": {"name":"Sort Desc","viewBox":[0,0,24,24],"paths":["m3 16 4 4 4-4","M7 20V4","M11 4h10","M11 8h7","M11 12h4"],"stroke":true},
  "soup": {"name":"Soup","viewBox":[0,0,24,24],"paths":["M11.248 3c.273.1.808.53.747 1.36-.05.83-.938 1.2-.989 2.02-.06.78.333 1.24.727 1.62","M16.252 3c.268.1.794.53.745 1.36-.06.83-.923 1.2-.993 2.02-.05.78.338 1.24.725 1.62","M19.5 12 22 6","M4 12a1 1 0 00-.99 1.133A9 9 0 0012 21a9 9 0 008.99-7.867A1 1 0 0020 12z","M6.252 3c.268.1.794.53.745 1.36-.06.83-.923 1.2-.993 2.02-.05.78.338 1.24.735 1.62","M7 21h10"],"stroke":true},
  "space": {"name":"Space","viewBox":[0,0,24,24],"paths":["M22 17v1c0 .5-.5 1-1 1H3c-.5 0-1-.5-1-1v-1"],"stroke":true},
  "spade": {"name":"Spade","viewBox":[0,0,24,24],"paths":["M12 18v4","M2 14.499a5.5 5.5 0 0 0 9.591 3.675.6.6 0 0 1 .818.001A5.5 5.5 0 0 0 22 14.5c0-2.29-1.5-4-3-5.5l-5.492-5.312a2 2 0 0 0-3-.02L5 8.999c-1.5 1.5-3 3.2-3 5.5"],"stroke":true},
  "sparkle": {"name":"Sparkle","viewBox":[0,0,24,24],"paths":["M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"],"stroke":true},
  "sparkles": {"name":"Sparkles","viewBox":[0,0,24,24],"paths":["M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z","M20 2v4","M22 4h-4","M 2 20 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0"],"stroke":true},
  "speaker": {"name":"Speaker","viewBox":[0,0,24,24],"paths":["M 4 2 h 16 v 20 h -16 z","M12 6h.01","M 8 14 a 4 4 0 1 0 8 0 a 4 4 0 1 0 -8 0","M12 14h.01"],"stroke":true},
  "speech": {"name":"Speech","viewBox":[0,0,24,24],"paths":["M8.8 20v-4.1l1.9.2a2.3 2.3 0 0 0 2.164-2.1V8.3A5.37 5.37 0 0 0 2 8.25c0 2.8.656 3.054 1 4.55a5.77 5.77 0 0 1 .029 2.758L2 20","M19.8 17.8a7.5 7.5 0 0 0 .003-10.603","M17 15a3.5 3.5 0 0 0-.025-4.975"],"stroke":true},
  "spell-check": {"name":"Spell Check","viewBox":[0,0,24,24],"paths":["m20 15-5.5 5.5L12 18","m4 16 6-12 5.115 10.23","M6 12h8"],"stroke":true},
  "spell-check-2": {"name":"Spell Check 2","viewBox":[0,0,24,24],"paths":["m6 16 6-12 6 12","M8 12h8","M4 21c1.1 0 1.1-1 2.3-1s1.1 1 2.3 1c1.1 0 1.1-1 2.3-1 1.1 0 1.1 1 2.3 1 1.1 0 1.1-1 2.3-1 1.1 0 1.1 1 2.3 1 1.1 0 1.1-1 2.3-1"],"stroke":true},
  "spline": {"name":"Spline","viewBox":[0,0,24,24],"paths":["M 17 5 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0","M 3 19 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0","M5 17A12 12 0 0 1 17 5"],"stroke":true},
  "spline-pointer": {"name":"Spline Pointer","viewBox":[0,0,24,24],"paths":["M12.034 12.681a.498.498 0 0 1 .647-.647l9 3.5a.5.5 0 0 1-.033.943l-3.444 1.068a1 1 0 0 0-.66.66l-1.067 3.443a.5.5 0 0 1-.943.033z","M5 17A12 12 0 0 1 17 5","M 17 5 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0","M 3 19 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0"],"stroke":true},
  "split": {"name":"Split","viewBox":[0,0,24,24],"paths":["M16 3h5v5","M8 3H3v5","M12 22v-8.3a4 4 0 0 0-1.172-2.872L3 3","m15 9 6-6"],"stroke":true},
  "split-square-horizontal": {"name":"Split Square Horizontal","viewBox":[0,0,24,24],"paths":["M12 2v20","M16 3h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-3","M8 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3"],"stroke":true},
  "split-square-vertical": {"name":"Split Square Vertical","viewBox":[0,0,24,24],"paths":["M2 12h20","M21 16v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3","M3 8V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v3"],"stroke":true},
  "spool": {"name":"Spool","viewBox":[0,0,24,24],"paths":["M17 13.44 4.442 17.082A2 2 0 0 0 4.982 21H19a2 2 0 0 0 .558-3.921l-1.115-.32A2 2 0 0 1 17 14.837V7.66","m7 10.56 12.558-3.642A2 2 0 0 0 19.018 3H5a2 2 0 0 0-.558 3.921l1.115.32A2 2 0 0 1 7 9.163v7.178"],"stroke":true},
  "sport-shoe": {"name":"Sport Shoe","viewBox":[0,0,24,24],"paths":["m15 10.42 4.8-5.07","M19 18h3","M9.5 22 21.414 9.415A2 2 0 0 0 21.2 6.4l-5.61-4.208A1 1 0 0 0 14 3v2a2 2 0 0 1-1.394 1.906L8.677 8.053A1 1 0 0 0 8 9c-.155 6.393-2.082 9-4 9a2 2 0 0 0 0 4h14"],"stroke":true},
  "spotlight": {"name":"Spotlight","viewBox":[0,0,24,24],"paths":["M15.295 19.562 16 22","m17 16 3.758 2.098","m19 12.5 3.026-.598","M7.61 6.3a3 3 0 0 0-3.92 1.3l-1.38 2.79a3 3 0 0 0 1.3 3.91l6.89 3.597a1 1 0 0 0 1.342-.447l3.106-6.211a1 1 0 0 0-.447-1.341z","M8 9V2"],"stroke":true},
  "spray-can": {"name":"Spray Can","viewBox":[0,0,24,24],"paths":["M3 3h.01","M7 5h.01","M11 7h.01","M3 7h.01","M7 9h.01","M3 11h.01","M 15 5 h 4 v 4 h -4 z","m19 9 2 2v10c0 .6-.4 1-1 1h-6c-.6 0-1-.4-1-1V11l2-2","m13 14 8-2","m13 19 8-2"],"stroke":true},
  "sprout": {"name":"Sprout","viewBox":[0,0,24,24],"paths":["M14 9.536V7a4 4 0 0 1 4-4h1.5a.5.5 0 0 1 .5.5V5a4 4 0 0 1-4 4 4 4 0 0 0-4 4c0 2 1 3 1 5a5 5 0 0 1-1 3","M4 9a5 5 0 0 1 8 4 5 5 0 0 1-8-4","M5 21h14"],"stroke":true},
  "square": {"name":"Square","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z"],"stroke":true},
  "square-activity": {"name":"Square Activity","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","M17 12h-2l-2 5-2-10-2 5H7"],"stroke":true},
  "square-arrow-down": {"name":"Square Arrow Down","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","M12 8v8","m8 12 4 4 4-4"],"stroke":true},
  "square-arrow-down-left": {"name":"Square Arrow Down Left","viewBox":[0,0,24,24],"paths":["M15 15H9l6-6","M9 15V9","M 3 3 h 18 v 18 h -18 z"],"stroke":true},
  "square-arrow-down-right": {"name":"Square Arrow Down Right","viewBox":[0,0,24,24],"paths":["M15 15 9 9","M9 15h6V9","M 3 3 h 18 v 18 h -18 z"],"stroke":true},
  "square-arrow-left": {"name":"Square Arrow Left","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","m12 8-4 4 4 4","M16 12H8"],"stroke":true},
  "square-arrow-out-down-left": {"name":"Square Arrow Out Down Left","viewBox":[0,0,24,24],"paths":["M13 21h6a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v6","m3 21 9-9","M9 21H3v-6"],"stroke":true},
  "square-arrow-out-down-right": {"name":"Square Arrow Out Down Right","viewBox":[0,0,24,24],"paths":["M21 11V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6","m21 21-9-9","M21 15v6h-6"],"stroke":true},
  "square-arrow-out-up-left": {"name":"Square Arrow Out Up Left","viewBox":[0,0,24,24],"paths":["M13 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6","m3 3 9 9","M3 9V3h6"],"stroke":true},
  "square-arrow-out-up-right": {"name":"Square Arrow Out Up Right","viewBox":[0,0,24,24],"paths":["M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6","m21 3-9 9","M15 3h6v6"],"stroke":true},
  "square-arrow-right": {"name":"Square Arrow Right","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","M8 12h8","m12 16 4-4-4-4"],"stroke":true},
  "square-arrow-right-enter": {"name":"Square Arrow Right Enter","viewBox":[0,0,24,24],"paths":["m10 16 4-4-4-4","M3 12h11","M3 8V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3"],"stroke":true},
  "square-arrow-right-exit": {"name":"Square Arrow Right Exit","viewBox":[0,0,24,24],"paths":["M10 12h11","m17 16 4-4-4-4","M21 6.344V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-1.344"],"stroke":true},
  "square-arrow-up": {"name":"Square Arrow Up","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","m16 12-4-4-4 4","M12 16V8"],"stroke":true},
  "square-arrow-up-left": {"name":"Square Arrow Up Left","viewBox":[0,0,24,24],"paths":["M15 15 9 9","M9 15V9h6","M 3 3 h 18 v 18 h -18 z"],"stroke":true},
  "square-arrow-up-right": {"name":"Square Arrow Up Right","viewBox":[0,0,24,24],"paths":["M15 15V9H9","m9 15 6-6","M 3 3 h 18 v 18 h -18 z"],"stroke":true},
  "square-asterisk": {"name":"Square Asterisk","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","M12 8v8","m8.5 14 7-4","m8.5 10 7 4"],"stroke":true},
  "square-bookmark": {"name":"Square Bookmark","viewBox":[0,0,24,24],"paths":["M11 3v7.751a.25.25 0 00.407.195l2.28-1.834a.5.5 0 01.627 0l2.28 1.834a.25.25 0 00.406-.195V3","M 3 3 h 18 v 18 h -18 z"],"stroke":true},
  "square-bottom-dashed-scissors": {"name":"Square Bottom Dashed Scissors","viewBox":[0,0,24,24],"paths":["M14 21h1","m17 17-2.18-2.18","M5 21a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2","M9 21h1","M9.56 14.44 17 7","M9.56 9.56 12 12","M 7 15.5 a 1.5 1.5 0 1 0 3 0 a 1.5 1.5 0 1 0 -3 0","M 7 8.5 a 1.5 1.5 0 1 0 3 0 a 1.5 1.5 0 1 0 -3 0"],"stroke":true},
  "square-centerline-dashed-horizontal": {"name":"Square Centerline Dashed Horizontal","viewBox":[0,0,24,24],"paths":["M8 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h3","M16 3h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-3","M12 20v2","M12 14v2","M12 8v2","M12 2v2"],"stroke":true},
  "square-centerline-dashed-vertical": {"name":"Square Centerline Dashed Vertical","viewBox":[0,0,24,24],"paths":["M21 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v3","M21 16v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3","M4 12H2","M10 12H8","M16 12h-2","M22 12h-2"],"stroke":true},
  "square-chart-gantt": {"name":"Square Chart Gantt","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","M9 8h7","M8 12h6","M11 16h5"],"stroke":true},
  "square-check": {"name":"Square Check","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","m16 9-5.5 5.5L8 12"],"stroke":true},
  "square-check-big": {"name":"Square Check Big","viewBox":[0,0,24,24],"paths":["M21 10.656V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12.344","m9 11 3 3L22 4"],"stroke":true},
  "square-chevron-down": {"name":"Square Chevron Down","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","m16 10-4 4-4-4"],"stroke":true},
  "square-chevron-left": {"name":"Square Chevron Left","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","m14 16-4-4 4-4"],"stroke":true},
  "square-chevron-right": {"name":"Square Chevron Right","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","m10 8 4 4-4 4"],"stroke":true},
  "square-chevron-up": {"name":"Square Chevron Up","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","m8 14 4-4 4 4"],"stroke":true},
  "square-code": {"name":"Square Code","viewBox":[0,0,24,24],"paths":["m10 9-3 3 3 3","m14 15 3-3-3-3","M 3 3 h 18 v 18 h -18 z"],"stroke":true},
  "square-dashed": {"name":"Square Dashed","viewBox":[0,0,24,24],"paths":["M5 3a2 2 0 0 0-2 2","M19 3a2 2 0 0 1 2 2","M21 19a2 2 0 0 1-2 2","M5 21a2 2 0 0 1-2-2","M9 3h1","M9 21h1","M14 3h1","M14 21h1","M3 9v1","M21 9v1","M3 14v1","M21 14v1"],"stroke":true},
  "square-dashed-bottom": {"name":"Square Dashed Bottom","viewBox":[0,0,24,24],"paths":["M5 21a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2","M9 21h1","M14 21h1"],"stroke":true},
  "square-dashed-bottom-code": {"name":"Square Dashed Bottom Code","viewBox":[0,0,24,24],"paths":["M10 9.5 8 12l2 2.5","M14 21h1","m14 9.5 2 2.5-2 2.5","M5 21a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2","M9 21h1"],"stroke":true},
  "square-dashed-kanban": {"name":"Square Dashed Kanban","viewBox":[0,0,24,24],"paths":["M8 7v7","M12 7v4","M16 7v9","M5 3a2 2 0 0 0-2 2","M9 3h1","M14 3h1","M19 3a2 2 0 0 1 2 2","M21 9v1","M21 14v1","M21 19a2 2 0 0 1-2 2","M14 21h1","M9 21h1","M5 21a2 2 0 0 1-2-2","M3 14v1","M3 9v1"],"stroke":true},
  "square-dashed-mouse-pointer": {"name":"Square Dashed Mouse Pointer","viewBox":[0,0,24,24],"paths":["M12.034 12.681a.498.498 0 0 1 .647-.647l9 3.5a.5.5 0 0 1-.033.943l-3.444 1.068a1 1 0 0 0-.66.66l-1.067 3.443a.5.5 0 0 1-.943.033z","M5 3a2 2 0 0 0-2 2","M19 3a2 2 0 0 1 2 2","M5 21a2 2 0 0 1-2-2","M9 3h1","M9 21h2","M14 3h1","M3 9v1","M21 9v2","M3 14v1"],"stroke":true},
  "square-dashed-plus": {"name":"Square Dashed Plus","viewBox":[0,0,24,24],"paths":["M5 3a2 2 0 0 0-2 2","M19 3a2 2 0 0 1 2 2","M21 19a2 2 0 0 1-2 2","M5 21a2 2 0 0 1-2-2","M9 3h1","M9 21h1","M14 3h1","M14 21h1","M3 9v1","M21 9v1","M3 14v1","M21 14v1","M8 12h8","M12 8v8"],"stroke":true},
  "square-dashed-text": {"name":"Square Dashed Text","viewBox":[0,0,24,24],"paths":["M14 21h1","M14 3h1","M19 3a2 2 0 0 1 2 2","M21 14v1","M21 19a2 2 0 0 1-2 2","M21 9v1","M3 14v1","M3 9v1","M5 21a2 2 0 0 1-2-2","M5 3a2 2 0 0 0-2 2","M7 12h10","M7 16h6","M7 8h8","M9 21h1","M9 3h1"],"stroke":true},
  "square-dashed-top-solid": {"name":"Square Dashed Top Solid","viewBox":[0,0,24,24],"paths":["M14 21h1","M21 14v1","M21 19a2 2 0 0 1-2 2","M21 9v1","M3 14v1","M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2","M3 9v1","M5 21a2 2 0 0 1-2-2","M9 21h1"],"stroke":true},
  "square-dashed-x": {"name":"Square Dashed X","viewBox":[0,0,24,24],"paths":["M14 21h1","M14 3h1","M19 3a2 2 0 012 2","M21 14v1","M21 19a2 2 0 01-2 2","M21 9v1","M3 14v1","M3 9v1","M5 21a2 2 0 01-2-2","M5 3a2 2 0 00-2 2","m9 15 6-6","M9 21h1","M9 3h1","m9 9 6 6"],"stroke":true},
  "square-dashed-x-corner": {"name":"Square Dashed X Corner","viewBox":[0,0,24,24],"paths":["M14 3h1","m16 16 5 5","M19 3a2 2 0 012 2","m21 16-5 5","M21 9v1","M3 14v1","M3 9v1","M5 21a2 2 0 01-2-2","M5 3a2 2 0 00-2 2","M9 21h1","M9 3h1"],"stroke":true},
  "square-dimensions": {"name":"Square Dimensions","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","M12 7H7v5","M12 17h5v-5"],"stroke":true},
  "square-divide": {"name":"Square Divide","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","M 8 12 L 16 12","M 12 16 L 12 16","M 12 8 L 12 8"],"stroke":true},
  "square-dot": {"name":"Square Dot","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","M 11 12 a 1 1 0 1 0 2 0 a 1 1 0 1 0 -2 0"],"stroke":true},
  "square-equal": {"name":"Square Equal","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","M7 10h10","M7 14h10"],"stroke":true},
  "square-exclamation-point": {"name":"Square Exclamation Point","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","M 12 8 L 12 12","M 12 16 L 12.01 16"],"stroke":true},
  "square-function": {"name":"Square Function","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","M9 17c2 0 2.8-1 2.8-2.8V10c0-2 1-3.3 3.2-3","M9 11.2h5.7"],"stroke":true},
  "square-gantt-chart": {"name":"Square Gantt Chart","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","M9 8h7","M8 12h6","M11 16h5"],"stroke":true},
  "square-kanban": {"name":"Square Kanban","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","M8 7v7","M12 7v4","M16 7v9"],"stroke":true},
  "square-library": {"name":"Square Library","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","M7 7v10","M11 7v10","m15 7 2 10"],"stroke":true},
  "square-m": {"name":"Square M","viewBox":[0,0,24,24],"paths":["M8 16V8.5a.5.5 0 0 1 .9-.3l2.7 3.599a.5.5 0 0 0 .8 0l2.7-3.6a.5.5 0 0 1 .9.3V16","M 3 3 h 18 v 18 h -18 z"],"stroke":true},
  "square-menu": {"name":"Square Menu","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","M7 8h10","M7 12h10","M7 16h10"],"stroke":true},
  "square-minus": {"name":"Square Minus","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","M8 12h8"],"stroke":true},
  "square-mouse-pointer": {"name":"Square Mouse Pointer","viewBox":[0,0,24,24],"paths":["M12.034 12.681a.498.498 0 0 1 .647-.647l9 3.5a.5.5 0 0 1-.033.943l-3.444 1.068a1 1 0 0 0-.66.66l-1.067 3.443a.5.5 0 0 1-.943.033z","M21 11V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6"],"stroke":true},
  "square-off": {"name":"Square Off","viewBox":[0,0,24,24],"paths":["M20.4 20.4a2 2 0 01-1.4.6H5a2 2 0 01-2-2V5a2 2 0 01.59-1.41","M21 15.3V5a2 2 0 00-2-2H8.7","M22 22 2 2"],"stroke":true},
  "square-parking": {"name":"Square Parking","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","M9 17V7h4a3 3 0 0 1 0 6H9"],"stroke":true},
  "square-parking-off": {"name":"Square Parking Off","viewBox":[0,0,24,24],"paths":["M3.6 3.6A2 2 0 0 1 5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-.59 1.41","M3 8.7V19a2 2 0 0 0 2 2h10.3","m2 2 20 20","M13 13a3 3 0 1 0 0-6H9v2","M9 17v-2.3"],"stroke":true},
  "square-pause": {"name":"Square Pause","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","M 10 15 L 10 9","M 14 15 L 14 9"],"stroke":true},
  "square-pen": {"name":"Square Pen","viewBox":[0,0,24,24],"paths":["M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7","M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"],"stroke":true},
  "square-percent": {"name":"Square Percent","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","m15 9-6 6","M9 9h.01","M15 15h.01"],"stroke":true},
  "square-pi": {"name":"Square Pi","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","M7 7h10","M10 7v10","M16 17a2 2 0 0 1-2-2V7"],"stroke":true},
  "square-pilcrow": {"name":"Square Pilcrow","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","M12 12H9.5a2.5 2.5 0 0 1 0-5H17","M12 7v10","M16 7v10"],"stroke":true},
  "square-play": {"name":"Square Play","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","M9 9.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997A1 1 0 0 1 9 14.996z"],"stroke":true},
  "square-plus": {"name":"Square Plus","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","M8 12h8","M12 8v8"],"stroke":true},
  "square-power": {"name":"Square Power","viewBox":[0,0,24,24],"paths":["M12 7v4","M7.998 9.003a5 5 0 1 0 8-.005","M 3 3 h 18 v 18 h -18 z"],"stroke":true},
  "square-radical": {"name":"Square Radical","viewBox":[0,0,24,24],"paths":["M7 12h2l2 5 2-10h4","M 3 3 h 18 v 18 h -18 z"],"stroke":true},
  "square-round-corner": {"name":"Square Round Corner","viewBox":[0,0,24,24],"paths":["M21 11a8 8 0 0 0-8-8","M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"],"stroke":true},
  "square-scissors": {"name":"Square Scissors","viewBox":[0,0,24,24],"paths":["m17 17-2.18-2.18","M9.56 14.44 17 7","M9.56 9.56 12 12","M 7 15.5 a 1.5 1.5 0 1 0 3 0 a 1.5 1.5 0 1 0 -3 0","M 7 8.5 a 1.5 1.5 0 1 0 3 0 a 1.5 1.5 0 1 0 -3 0","M 3 3 h 18 v 18 h -18 z"],"stroke":true},
  "square-sigma": {"name":"Square Sigma","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","M16 8.9V7H8l4 5-4 5h8v-1.9"],"stroke":true},
  "square-slash": {"name":"Square Slash","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","M 9 15 L 15 9"],"stroke":true},
  "square-sparkles": {"name":"Square Sparkles","viewBox":[0,0,24,24],"paths":["M11 15H7","M15.41 2.49a.6.6 0 011.18 0l.63 3.334a1.2 1.2 0 00.956.955l3.334.631a.6.6 0 010 1.18l-3.334.63a1.2 1.2 0 00-.955.956l-.631 3.334a.6.6 0 01-1.18 0l-.63-3.334a1.2 1.2 0 00-.956-.955L10.49 8.59a.6.6 0 010-1.18l3.334-.63a1.2 1.2 0 00.955-.956z","M21 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h6","M9 13v4"],"stroke":true},
  "square-split-horizontal": {"name":"Square Split Horizontal","viewBox":[0,0,24,24],"paths":["M12 2v20","M16 3h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-3","M8 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3"],"stroke":true},
  "square-split-vertical": {"name":"Square Split Vertical","viewBox":[0,0,24,24],"paths":["M2 12h20","M21 16v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3","M3 8V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v3"],"stroke":true},
  "square-square": {"name":"Square Square","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","M 8 8 h 8 v 8 h -8 z"],"stroke":true},
  "square-stack": {"name":"Square Stack","viewBox":[0,0,24,24],"paths":["M4 10c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2","M10 16c-1.1 0-2-.9-2-2v-4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2","M 14 14 h 8 v 8 h -8 z"],"stroke":true},
  "square-star": {"name":"Square Star","viewBox":[0,0,24,24],"paths":["M11.035 7.69a1 1 0 0 1 1.909.024l.737 1.452a1 1 0 0 0 .737.535l1.634.256a1 1 0 0 1 .588 1.806l-1.172 1.168a1 1 0 0 0-.282.866l.259 1.613a1 1 0 0 1-1.541 1.134l-1.465-.75a1 1 0 0 0-.912 0l-1.465.75a1 1 0 0 1-1.539-1.133l.258-1.613a1 1 0 0 0-.282-.866l-1.156-1.153a1 1 0 0 1 .572-1.822l1.633-.256a1 1 0 0 0 .737-.535z","M 3 3 h 18 v 18 h -18 z"],"stroke":true},
  "square-stop": {"name":"Square Stop","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","M 9 9 h 6 v 6 h -6 z"],"stroke":true},
  "square-terminal": {"name":"Square Terminal","viewBox":[0,0,24,24],"paths":["m7 11 2-2-2-2","M11 13h4","M 3 3 h 18 v 18 h -18 z"],"stroke":true},
  "square-text": {"name":"Square Text","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","M7 8h8","M7 12h10","M7 16h6"],"stroke":true},
  "square-user": {"name":"Square User","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","M 9 10 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0","M7 21v-2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2"],"stroke":true},
  "square-user-round": {"name":"Square User Round","viewBox":[0,0,24,24],"paths":["M18 21a6 6 0 0 0-12 0","M 8 11 a 4 4 0 1 0 8 0 a 4 4 0 1 0 -8 0","M 3 3 h 18 v 18 h -18 z"],"stroke":true},
  "square-x": {"name":"Square X","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","m15 9-6 6","m9 9 6 6"],"stroke":true},
  "squares-exclude": {"name":"Squares Exclude","viewBox":[0,0,24,24],"paths":["M16 12v2a2 2 0 0 1-2 2H9a1 1 0 0 0-1 1v3a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2h0","M4 16a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3a1 1 0 0 1-1 1h-5a2 2 0 0 0-2 2v2"],"stroke":true},
  "squares-intersect": {"name":"Squares Intersect","viewBox":[0,0,24,24],"paths":["M10 22a2 2 0 0 1-2-2","M14 2a2 2 0 0 1 2 2","M16 22h-2","M2 10V8","M2 4a2 2 0 0 1 2-2","M20 8a2 2 0 0 1 2 2","M22 14v2","M22 20a2 2 0 0 1-2 2","M4 16a2 2 0 0 1-2-2","M8 10a2 2 0 0 1 2-2h5a1 1 0 0 1 1 1v5a2 2 0 0 1-2 2H9a1 1 0 0 1-1-1z","M8 2h2"],"stroke":true},
  "squares-subtract": {"name":"Squares Subtract","viewBox":[0,0,24,24],"paths":["M10 22a2 2 0 0 1-2-2","M16 22h-2","M16 4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-5a2 2 0 0 1 2-2h5a1 1 0 0 0 1-1z","M20 8a2 2 0 0 1 2 2","M22 14v2","M22 20a2 2 0 0 1-2 2"],"stroke":true},
  "squares-unite": {"name":"Squares Unite","viewBox":[0,0,24,24],"paths":["M4 16a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3a1 1 0 0 0 1 1h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2v-3a1 1 0 0 0-1-1z"],"stroke":true},
  "squircle": {"name":"Squircle","viewBox":[0,0,24,24],"paths":["M12 3c7.2 0 9 1.8 9 9s-1.8 9-9 9-9-1.8-9-9 1.8-9 9-9"],"stroke":true},
  "squircle-dashed": {"name":"Squircle Dashed","viewBox":[0,0,24,24],"paths":["M13.77 3.043a34 34 0 0 0-3.54 0","M13.771 20.956a33 33 0 0 1-3.541.001","M20.18 17.74c-.51 1.15-1.29 1.93-2.439 2.44","M20.18 6.259c-.51-1.148-1.291-1.929-2.44-2.438","M20.957 10.23a33 33 0 0 1 0 3.54","M3.043 10.23a34 34 0 0 0 .001 3.541","M6.26 20.179c-1.15-.508-1.93-1.29-2.44-2.438","M6.26 3.82c-1.149.51-1.93 1.291-2.44 2.44"],"stroke":true},
  "squirrel": {"name":"Squirrel","viewBox":[0,0,24,24],"paths":["M15.236 22a3 3 0 0 0-2.2-5","M16 20a3 3 0 0 1 3-3h1a2 2 0 0 0 2-2v-2a4 4 0 0 0-4-4V4","M18 13h.01","M18 6a4 4 0 0 0-4 4 7 7 0 0 0-7 7c0-5 4-5 4-10.5a4.5 4.5 0 1 0-9 0 2.5 2.5 0 0 0 5 0C7 10 3 11 3 17c0 2.8 2.2 5 5 5h10"],"stroke":true},
  "stamp": {"name":"Stamp","viewBox":[0,0,24,24],"paths":["M14 13V8.5C14 7 15 7 15 5a3 3 0 0 0-6 0c0 2 1 2 1 3.5V13","M20 15.5a2.5 2.5 0 0 0-2.5-2.5h-11A2.5 2.5 0 0 0 4 15.5V17a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1z","M5 22h14"],"stroke":true},
  "star": {"name":"Star","viewBox":[0,0,24,24],"paths":["M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"],"stroke":true},
  "star-check": {"name":"Star Check","viewBox":[0,0,24,24],"paths":["m19.06 12.501 2.78-2.707a.53.53 0 0 0-.294-.905l-5.166-.755a2.1 2.1 0 0 1-1.595-1.16l-2.31-4.68a.53.53 0 0 0-.95.001L9.216 6.974a2.1 2.1 0 0 1-1.597 1.16l-5.165.755a.53.53 0 0 0-.294.906l3.736 3.637a2.1 2.1 0 0 1 .611 1.879l-.88 5.139a.53.53 0 0 0 .769.56l4.617-2.428.027-.014","m15 18 2 2 4-4"],"stroke":true},
  "star-half": {"name":"Star Half","viewBox":[0,0,24,24],"paths":["M12 18.338a2.1 2.1 0 0 0-.987.244L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.12 2.12 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.12 2.12 0 0 0 1.597-1.16l2.309-4.679A.53.53 0 0 1 12 2"],"stroke":true},
  "star-minus": {"name":"Star Minus","viewBox":[0,0,24,24],"paths":["M15 18h6","M17.688 14a2.1 2.1 0 0 1 .416-.568l3.736-3.638a.53.53 0 0 0-.294-.905l-5.166-.755a2.1 2.1 0 0 1-1.595-1.16l-2.31-4.68a.53.53 0 0 0-.95.001L9.216 6.974a2.1 2.1 0 0 1-1.597 1.16l-5.165.755a.53.53 0 0 0-.294.906l3.736 3.637a2.1 2.1 0 0 1 .611 1.879l-.88 5.139a.53.53 0 0 0 .769.56l4.617-2.428.027-.014"],"stroke":true},
  "star-off": {"name":"Star Off","viewBox":[0,0,24,24],"paths":["m10.344 4.688 1.181-2.393a.53.53 0 0 1 .95 0l2.31 4.679a2.12 2.12 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.237 3.152","m17.945 17.945.43 2.505a.53.53 0 0 1-.771.56l-4.618-2.428a2.12 2.12 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.12 2.12 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a8 8 0 0 0 .4-.099","m2 2 20 20"],"stroke":true},
  "star-plus": {"name":"Star Plus","viewBox":[0,0,24,24],"paths":["M11.013 18.582 6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.12 2.12 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.12 2.12 0 0 0 1.597-1.16l2.309-4.679a.53.53 0 0 1 .95 0l2.31 4.679a2.12 2.12 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904L20 11.5","M15 18h6","M18 15v6"],"stroke":true},
  "star-x": {"name":"Star X","viewBox":[0,0,24,24],"paths":["m15.5 15.5 5 5","m20.063 11.525 1.777-1.731a.53.53 0 0 0-.294-.905l-5.166-.755a2.1 2.1 0 0 1-1.595-1.16l-2.31-4.68a.53.53 0 0 0-.95.001L9.216 6.974a2.1 2.1 0 0 1-1.597 1.16l-5.165.755a.53.53 0 0 0-.294.906l3.736 3.637a2.1 2.1 0 0 1 .611 1.879l-.88 5.139a.53.53 0 0 0 .769.56l4.617-2.428a2.1 2.1 0 0 1 .987-.243 2 2 0 0 1 .132.004","m20.5 15.5-5 5"],"stroke":true},
  "stars": {"name":"Stars","viewBox":[0,0,24,24],"paths":["M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z","M20 2v4","M22 4h-4","M 2 20 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0"],"stroke":true},
  "step-back": {"name":"Step Back","viewBox":[0,0,24,24],"paths":["M13.971 4.285A2 2 0 0 1 17 6v12a2 2 0 0 1-3.029 1.715l-9.997-5.998a2 2 0 0 1-.003-3.432z","M21 20V4"],"stroke":true},
  "step-forward": {"name":"Step Forward","viewBox":[0,0,24,24],"paths":["M10.029 4.285A2 2 0 0 0 7 6v12a2 2 0 0 0 3.029 1.715l9.997-5.998a2 2 0 0 0 .003-3.432z","M3 4v16"],"stroke":true},
  "stethoscope": {"name":"Stethoscope","viewBox":[0,0,24,24],"paths":["M11 2v2","M5 2v2","M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1","M8 15a6 6 0 0 0 12 0v-3","M 18 10 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0"],"stroke":true},
  "sticker": {"name":"Sticker","viewBox":[0,0,24,24],"paths":["M21 9a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 15 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z","M15 3v5a1 1 0 0 0 1 1h5","M8 13h.01","M16 13h.01","M10 16s.8 1 2 1c1.3 0 2-1 2-1"],"stroke":true},
  "sticky-note": {"name":"Sticky Note","viewBox":[0,0,24,24],"paths":["M21 9a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 15 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z","M15 3v5a1 1 0 0 0 1 1h5"],"stroke":true},
  "sticky-note-check": {"name":"Sticky Note Check","viewBox":[0,0,24,24],"paths":["m15 19 2 2 4-4","M15 3v5a1 1 0 0 0 1 1h5","M21 13V9a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 15 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6.5"],"stroke":true},
  "sticky-note-minus": {"name":"Sticky Note Minus","viewBox":[0,0,24,24],"paths":["M15 3v5a1 1 0 0 0 1 1h5","M21 14V9a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 15 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7.35","M21 18h-6"],"stroke":true},
  "sticky-note-off": {"name":"Sticky Note Off","viewBox":[0,0,24,24],"paths":["M15 3v5a1 1 0 0 0 1 1h5","m2 2 20 20","M3.586 3.586A2 2 0 0 0 3 5v14a2 2 0 0 0 2 2h14a2 2 0 0 0 1.414-.586","M8.656 3H15a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 21 9v6.344"],"stroke":true},
  "sticky-note-plus": {"name":"Sticky Note Plus","viewBox":[0,0,24,24],"paths":["M15 3v5a1 1 0 0 0 1 1h5","M18 15v6","M21 12.356V9a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 15 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7.355","M21 18h-6"],"stroke":true},
  "sticky-note-x": {"name":"Sticky Note X","viewBox":[0,0,24,24],"paths":["M15 3v5a1 1 0 0 0 1 1h5","m16 16 5 5","M21 12V9a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 15 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7","m21 16-5 5"],"stroke":true},
  "sticky-notes": {"name":"Sticky Notes","viewBox":[0,0,24,24],"paths":["M10 8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 16 14v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2z","M10 8v5a1 1 0 0 0 1 1h5","M8 4a2 2 0 0 1 2-2h6a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 22 8v6a2 2 0 0 1-2 2","M16 2v5a1 1 0 0 0 1 1h5"],"stroke":true},
  "stone": {"name":"Stone","viewBox":[0,0,24,24],"paths":["M11.264 2.205A4 4 0 0 0 6.42 4.211l-4 8a4 4 0 0 0 1.359 5.117l6 4a4 4 0 0 0 4.438 0l6-4a4 4 0 0 0 1.576-4.592l-2-6a4 4 0 0 0-2.53-2.53z","M11.99 22 14 12l7.822 3.184","M14 12 8.47 2.302"],"stroke":true},
  "stop-circle": {"name":"Stop Circle","viewBox":[0,0,24,24],"paths":["M 2 12 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0","M 9 9 h 6 v 6 h -6 z"],"stroke":true},
  "store": {"name":"Store","viewBox":[0,0,24,24],"paths":["M15 21v-5a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v5","M17.774 10.31a1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.451 0 1.12 1.12 0 0 0-1.548 0 2.5 2.5 0 0 1-3.452 0 1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.77-3.248l2.889-4.184A2 2 0 0 1 7 2h10a2 2 0 0 1 1.653.873l2.895 4.192a2.5 2.5 0 0 1-3.774 3.244","M4 10.95V19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8.05"],"stroke":true},
  "stretch-horizontal": {"name":"Stretch Horizontal","viewBox":[0,0,24,24],"paths":["M 2 4 h 20 v 6 h -20 z","M 2 14 h 20 v 6 h -20 z"],"stroke":true},
  "stretch-vertical": {"name":"Stretch Vertical","viewBox":[0,0,24,24],"paths":["M 4 2 h 6 v 20 h -6 z","M 14 2 h 6 v 20 h -6 z"],"stroke":true},
  "strikethrough": {"name":"Strikethrough","viewBox":[0,0,24,24],"paths":["M16 4H9a3 3 0 0 0-2.83 4","M14 12a4 4 0 0 1 0 8H6","M 4 12 L 20 12"],"stroke":true},
  "subscript": {"name":"Subscript","viewBox":[0,0,24,24],"paths":["m4 5 8 8","m12 5-8 8","M20 19h-4c0-1.5.44-2 1.5-2.5S20 15.33 20 14c0-.47-.17-.93-.48-1.29a2.11 2.11 0 0 0-2.62-.44c-.42.24-.74.62-.9 1.07"],"stroke":true},
  "subtitles": {"name":"Subtitles","viewBox":[0,0,24,24],"paths":["M 3 5 h 18 v 14 h -18 z","M7 15h4M15 15h2M7 11h2M13 11h4"],"stroke":true},
  "summary": {"name":"Summary","viewBox":[0,0,24,24],"paths":["M15 4H7","m18 16 3 3-3 3","M3 4v13a2 2 0 0 0 2 2h16","M7 14h7","M7 9h12"],"stroke":true},
  "sun": {"name":"Sun","viewBox":[0,0,24,24],"paths":["M 8 12 a 4 4 0 1 0 8 0 a 4 4 0 1 0 -8 0","M12 2v2","M12 20v2","m4.93 4.93 1.41 1.41","m17.66 17.66 1.41 1.41","M2 12h2","M20 12h2","m6.34 17.66-1.41 1.41","m19.07 4.93-1.41 1.41"],"stroke":true},
  "sun-dim": {"name":"Sun Dim","viewBox":[0,0,24,24],"paths":["M 8 12 a 4 4 0 1 0 8 0 a 4 4 0 1 0 -8 0","M12 4h.01","M20 12h.01","M12 20h.01","M4 12h.01","M17.657 6.343h.01","M17.657 17.657h.01","M6.343 17.657h.01","M6.343 6.343h.01"],"stroke":true},
  "sun-medium": {"name":"Sun Medium","viewBox":[0,0,24,24],"paths":["M 8 12 a 4 4 0 1 0 8 0 a 4 4 0 1 0 -8 0","M12 3v1","M12 20v1","M3 12h1","M20 12h1","m18.364 5.636-.707.707","m6.343 17.657-.707.707","m5.636 5.636.707.707","m17.657 17.657.707.707"],"stroke":true},
  "sun-moon": {"name":"Sun Moon","viewBox":[0,0,24,24],"paths":["M12 2v2","M14.837 16.385a6 6 0 1 1-7.223-7.222c.624-.147.97.66.715 1.248a4 4 0 0 0 5.26 5.259c.589-.255 1.396.09 1.248.715","M16 12a4 4 0 0 0-4-4","m19 5-1.256 1.256","M20 12h2"],"stroke":true},
  "sun-snow": {"name":"Sun Snow","viewBox":[0,0,24,24],"paths":["M10 21v-1","M10 4V3","M10 9a3 3 0 0 0 0 6","m14 20 1.25-2.5L18 18","m14 4 1.25 2.5L18 6","m17 21-3-6 1.5-3H22","m17 3-3 6 1.5 3","M2 12h1","m20 10-1.5 2 1.5 2","m3.64 18.36.7-.7","m4.34 6.34-.7-.7"],"stroke":true},
  "sunrise": {"name":"Sunrise","viewBox":[0,0,24,24],"paths":["M12 2v8","m4.93 10.93 1.41 1.41","M2 18h2","M20 18h2","m19.07 10.93-1.41 1.41","M22 22H2","m8 6 4-4 4 4","M16 18a4 4 0 0 0-8 0"],"stroke":true},
  "sunset": {"name":"Sunset","viewBox":[0,0,24,24],"paths":["M12 10V2","m4.93 10.93 1.41 1.41","M2 18h2","M20 18h2","m19.07 10.93-1.41 1.41","M22 22H2","m16 6-4 4-4-4","M16 18a4 4 0 0 0-8 0"],"stroke":true},
  "superscript": {"name":"Superscript","viewBox":[0,0,24,24],"paths":["m4 19 8-8","m12 19-8-8","M20 12h-4c0-1.5.442-2 1.5-2.5S20 8.334 20 7.002c0-.472-.17-.93-.484-1.29a2.105 2.105 0 0 0-2.617-.436c-.42.239-.738.614-.899 1.06"],"stroke":true},
  "swatch-book": {"name":"Swatch Book","viewBox":[0,0,24,24],"paths":["M11 17a4 4 0 0 1-8 0V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2Z","M16.7 13H19a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H7","M 7 17h.01","m11 8 2.3-2.3a2.4 2.4 0 0 1 3.404.004L18.6 7.6a2.4 2.4 0 0 1 .026 3.434L9.9 19.8"],"stroke":true},
  "swiss-franc": {"name":"Swiss Franc","viewBox":[0,0,24,24],"paths":["M10 21V3h8","M6 16h9","M10 9.5h7"],"stroke":true},
  "switch-camera": {"name":"Switch Camera","viewBox":[0,0,24,24],"paths":["M11 19H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5","M13 5h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-5","M 9 12 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0","m18 22-3-3 3-3","m6 2 3 3-3 3"],"stroke":true},
  "sword": {"name":"Sword","viewBox":[0,0,24,24],"paths":["m11 19-6-6","m5 21-2-2","m8 16-4 4","M9.5 17.5 20.414 6.586A2 2 0 0021 5.172V3h-2.172a2 2 0 00-1.414.586L6.5 14.5"],"stroke":true},
  "swords": {"name":"Swords","viewBox":[0,0,24,24],"paths":["m13 19 6-6","M14.5 17.5 3.586 6.586A2 2 0 013 5.172V3h2.172a2 2 0 011.414.586L17.5 14.5","m14.828 6.172 2.586-2.586A2 2 0 0118.828 3H21v2.172a2 2 0 01-.586 1.414l-2.586 2.586","m16 16 4 4","m19 21 2-2","m5 14 4 4","m5 21-2-2","M7.5 16.5 4 20"],"stroke":true},
  "syringe": {"name":"Syringe","viewBox":[0,0,24,24],"paths":["m18 2 4 4","m17 7 3-3","M19 9 8.7 19.3c-1 1-2.5 1-3.4 0l-.6-.6c-1-1-1-2.5 0-3.4L15 5","m9 11 4 4","m5 19-3 3","m14 4 6 6"],"stroke":true},
  "table": {"name":"Table","viewBox":[0,0,24,24],"paths":["M12 3v18","M 3 3 h 18 v 18 h -18 z","M3 9h18","M3 15h18"],"stroke":true},
  "table-2": {"name":"Table 2","viewBox":[0,0,24,24],"paths":["M3 9h18","M9 3v18","M 3 3 h 18 v 18 h -18 z"],"stroke":true},
  "table-cells-merge": {"name":"Table Cells Merge","viewBox":[0,0,24,24],"paths":["M12 21v-6","M12 9V3","M3 15h18","M3 9h18","M 3 3 h 18 v 18 h -18 z"],"stroke":true},
  "table-cells-split": {"name":"Table Cells Split","viewBox":[0,0,24,24],"paths":["M12 15V9","M3 15h18","M3 9h18","M 3 3 h 18 v 18 h -18 z"],"stroke":true},
  "table-columns-split": {"name":"Table Columns Split","viewBox":[0,0,24,24],"paths":["M14 14v2","M14 20v2","M14 2v2","M14 8v2","M2 15h8","M2 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H2","M2 9h8","M22 15h-4","M22 3h-2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h2","M22 9h-4","M5 3v18"],"stroke":true},
  "table-config": {"name":"Table Config","viewBox":[0,0,24,24],"paths":["M10.6 21H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v5.6","m14.305 19.53.923-.382","M15 3v7.6","m15.229 16.852-.924-.383","m16.852 15.228-.383-.923","m16.852 20.772-.383.924","m19.148 15.228.383-.923","m19.53 21.696-.382-.924","m20.773 16.852.922-.383","m20.773 19.148.922.383","M9 3v18","M 15 18 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0"],"stroke":true},
  "table-of-contents": {"name":"Table Of Contents","viewBox":[0,0,24,24],"paths":["M16 5H3","M16 12H3","M16 19H3","M21 5h.01","M21 12h.01","M21 19h.01"],"stroke":true},
  "table-properties": {"name":"Table Properties","viewBox":[0,0,24,24],"paths":["M15 3v18","M 3 3 h 18 v 18 h -18 z","M21 9H3","M21 15H3"],"stroke":true},
  "table-rows-split": {"name":"Table Rows Split","viewBox":[0,0,24,24],"paths":["M14 10h2","M15 22v-8","M15 2v4","M2 10h2","M20 10h2","M3 19h18","M3 22v-6a2 2 135 0 1 2-2h14a2 2 45 0 1 2 2v6","M3 2v2a2 2 45 0 0 2 2h14a2 2 135 0 0 2-2V2","M8 10h2","M9 22v-8","M9 2v4"],"stroke":true},
  "tablet": {"name":"Tablet","viewBox":[0,0,24,24],"paths":["M 4 2 h 16 v 20 h -16 z","M 12 18 L 12.01 18"],"stroke":true},
  "tablet-smartphone": {"name":"Tablet Smartphone","viewBox":[0,0,24,24],"paths":["M 3 8 h 10 v 14 h -10 z","M5 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2h-2.4","M8 18h.01"],"stroke":true},
  "tablets": {"name":"Tablets","viewBox":[0,0,24,24],"paths":["M 2 7 a 5 5 0 1 0 10 0 a 5 5 0 1 0 -10 0","M 12 17 a 5 5 0 1 0 10 0 a 5 5 0 1 0 -10 0","M12 17h10","m3.46 10.54 7.08-7.08"],"stroke":true},
  "tag": {"name":"Tag","viewBox":[0,0,24,24],"paths":["M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z","M 7 7.5 a 0.5 0.5 0 1 0 1 0 a 0.5 0.5 0 1 0 -1 0"],"stroke":true},
  "tag-plus": {"name":"Tag Plus","viewBox":[0,0,24,24],"paths":["M16 13h6","m16.5 6.5-3.914-3.914A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l1.79-1.79","M19 10v6","M 7 7.5 a 0.5 0.5 0 1 0 1 0 a 0.5 0.5 0 1 0 -1 0"],"stroke":true},
  "tag-x": {"name":"Tag X","viewBox":[0,0,24,24],"paths":["m16.5 6.5-3.914-3.914A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.43 2.43 0 0 0 3.42 0l1.79-1.79","m16.5 10.5 5 5","m21.5 10.5-5 5","M 7 7.5 a 0.5 0.5 0 1 0 1 0 a 0.5 0.5 0 1 0 -1 0"],"stroke":true},
  "tags": {"name":"Tags","viewBox":[0,0,24,24],"paths":["M13.172 2a2 2 0 0 1 1.414.586l6.71 6.71a2.4 2.4 0 0 1 0 3.408l-4.592 4.592a2.4 2.4 0 0 1-3.408 0l-6.71-6.71A2 2 0 0 1 6 9.172V3a1 1 0 0 1 1-1z","M2 7v6.172a2 2 0 0 0 .586 1.414l6.71 6.71a2.4 2.4 0 0 0 3.191.193","M 10 6.5 a 0.5 0.5 0 1 0 1 0 a 0.5 0.5 0 1 0 -1 0"],"stroke":true},
  "tally-1": {"name":"Tally 1","viewBox":[0,0,24,24],"paths":["M4 4v16"],"stroke":true},
  "tally-2": {"name":"Tally 2","viewBox":[0,0,24,24],"paths":["M4 4v16","M9 4v16"],"stroke":true},
  "tally-3": {"name":"Tally 3","viewBox":[0,0,24,24],"paths":["M4 4v16","M9 4v16","M14 4v16"],"stroke":true},
  "tally-4": {"name":"Tally 4","viewBox":[0,0,24,24],"paths":["M4 4v16","M9 4v16","M14 4v16","M19 4v16"],"stroke":true},
  "tally-5": {"name":"Tally 5","viewBox":[0,0,24,24],"paths":["M4 4v16","M9 4v16","M14 4v16","M19 4v16","M22 6 2 18"],"stroke":true},
  "tangent": {"name":"Tangent","viewBox":[0,0,24,24],"paths":["M 15 4 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0","M15.59 5.41 5.41 15.59","M 2 17 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0","M12 22s-4-9-1.5-11.5S22 12 22 12"],"stroke":true},
  "target": {"name":"Target","viewBox":[0,0,24,24],"paths":["M 2 12 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0","M 6 12 a 6 6 0 1 0 12 0 a 6 6 0 1 0 -12 0","M 10 12 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0"],"stroke":true},
  "telescope": {"name":"Telescope","viewBox":[0,0,24,24],"paths":["m10.065 12.493-6.18 1.318a.934.934 0 0 1-1.108-.702l-.537-2.15a1.07 1.07 0 0 1 .691-1.265l13.504-4.44","m13.56 11.747 4.332-.924","m16 21-3.105-6.21","M16.485 5.94a2 2 0 0 1 1.455-2.425l1.09-.272a1 1 0 0 1 1.212.727l1.515 6.06a1 1 0 0 1-.727 1.213l-1.09.272a2 2 0 0 1-2.425-1.455z","m6.158 8.633 1.114 4.456","m8 21 3.105-6.21","M 10 13 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0"],"stroke":true},
  "tent": {"name":"Tent","viewBox":[0,0,24,24],"paths":["M3.5 21 14 3","M20.5 21 10 3","M15.5 21 12 15l-3.5 6","M2 21h20"],"stroke":true},
  "tent-tree": {"name":"Tent Tree","viewBox":[0,0,24,24],"paths":["M 2 4 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0","m14 5 3-3 3 3","m14 10 3-3 3 3","M17 14V2","M17 14H7l-5 8h20Z","M8 14v8","m9 14 5 8"],"stroke":true},
  "terminal": {"name":"Terminal","viewBox":[0,0,24,24],"paths":["M12 19h8","m4 17 6-6-6-6"],"stroke":true},
  "terminal-square": {"name":"Terminal Square","viewBox":[0,0,24,24],"paths":["m7 11 2-2-2-2","M11 13h4","M 3 3 h 18 v 18 h -18 z"],"stroke":true},
  "test-tube": {"name":"Test Tube","viewBox":[0,0,24,24],"paths":["M14.5 2v17.5c0 1.4-1.1 2.5-2.5 2.5c-1.4 0-2.5-1.1-2.5-2.5V2","M8.5 2h7","M14.5 16h-5"],"stroke":true},
  "test-tube-2": {"name":"Test Tube 2","viewBox":[0,0,24,24],"paths":["M21 7 6.82 21.18a2.83 2.83 0 0 1-3.99-.01a2.83 2.83 0 0 1 0-4L17 3","m16 2 6 6","M12 16H4"],"stroke":true},
  "test-tube-diagonal": {"name":"Test Tube Diagonal","viewBox":[0,0,24,24],"paths":["M21 7 6.82 21.18a2.83 2.83 0 0 1-3.99-.01a2.83 2.83 0 0 1 0-4L17 3","m16 2 6 6","M12 16H4"],"stroke":true},
  "test-tubes": {"name":"Test Tubes","viewBox":[0,0,24,24],"paths":["M9 2v17.5A2.5 2.5 0 0 1 6.5 22A2.5 2.5 0 0 1 4 19.5V2","M20 2v17.5a2.5 2.5 0 0 1-2.5 2.5a2.5 2.5 0 0 1-2.5-2.5V2","M3 2h7","M14 2h7","M9 16H4","M20 16h-5"],"stroke":true},
  "text": {"name":"Text","viewBox":[0,0,24,24],"paths":["M21 5H3","M15 12H3","M17 19H3"],"stroke":true},
  "text-align-center": {"name":"Text Align Center","viewBox":[0,0,24,24],"paths":["M21 5H3","M17 12H7","M19 19H5"],"stroke":true},
  "text-align-end": {"name":"Text Align End","viewBox":[0,0,24,24],"paths":["M21 5H3","M21 12H9","M21 19H7"],"stroke":true},
  "text-align-justify": {"name":"Text Align Justify","viewBox":[0,0,24,24],"paths":["M3 5h18","M3 12h18","M3 19h18"],"stroke":true},
  "text-align-justify-center": {"name":"Text Align Justify Center","viewBox":[0,0,24,24],"paths":["M3 5h18","M3 12h18","M7 19h10"],"stroke":true},
  "text-align-justify-end": {"name":"Text Align Justify End","viewBox":[0,0,24,24],"paths":["M3 5h18","M3 12h18","M11 19h10"],"stroke":true},
  "text-align-justify-start": {"name":"Text Align Justify Start","viewBox":[0,0,24,24],"paths":["M3 5h18","M3 12h18","M3 19h10"],"stroke":true},
  "text-align-start": {"name":"Text Align Start","viewBox":[0,0,24,24],"paths":["M21 5H3","M15 12H3","M17 19H3"],"stroke":true},
  "text-cursor": {"name":"Text Cursor","viewBox":[0,0,24,24],"paths":["M17 22h-1a4 4 0 0 1-4-4V6a4 4 0 0 1 4-4h1","M7 22h1a4 4 0 0 0 4-4","M7 2h1a4 4 0 0 1 4 4"],"stroke":true},
  "text-cursor-input": {"name":"Text Cursor Input","viewBox":[0,0,24,24],"paths":["M12 20h-1a2 2 0 0 1-2-2 2 2 0 0 1-2 2H6","M13 8h7a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-7","M5 16H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h1","M6 4h1a2 2 0 0 1 2 2 2 2 0 0 1 2-2h1","M9 6v12"],"stroke":true},
  "text-initial": {"name":"Text Initial","viewBox":[0,0,24,24],"paths":["M15 5h6","M15 12h6","M3 19h18","m3 12 3.553-7.724a.5.5 0 0 1 .894 0L11 12","M3.92 10h6.16"],"stroke":true},
  "text-quote": {"name":"Text Quote","viewBox":[0,0,24,24],"paths":["M17 5H3","M21 12H8","M21 19H8","M3 12v7"],"stroke":true},
  "text-search": {"name":"Text Search","viewBox":[0,0,24,24],"paths":["M21 5H3","M10 12H3","M10 19H3","M 14 15 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0","m21 19-1.9-1.9"],"stroke":true},
  "text-select": {"name":"Text Select","viewBox":[0,0,24,24],"paths":["M14 21h1","M14 3h1","M19 3a2 2 0 0 1 2 2","M21 14v1","M21 19a2 2 0 0 1-2 2","M21 9v1","M3 14v1","M3 9v1","M5 21a2 2 0 0 1-2-2","M5 3a2 2 0 0 0-2 2","M7 12h10","M7 16h6","M7 8h8","M9 21h1","M9 3h1"],"stroke":true},
  "text-selection": {"name":"Text Selection","viewBox":[0,0,24,24],"paths":["M14 21h1","M14 3h1","M19 3a2 2 0 0 1 2 2","M21 14v1","M21 19a2 2 0 0 1-2 2","M21 9v1","M3 14v1","M3 9v1","M5 21a2 2 0 0 1-2-2","M5 3a2 2 0 0 0-2 2","M7 12h10","M7 16h6","M7 8h8","M9 21h1","M9 3h1"],"stroke":true},
  "text-wrap": {"name":"Text Wrap","viewBox":[0,0,24,24],"paths":["m16 16-3 3 3 3","M3 12h14.5a1 1 0 0 1 0 7H13","M3 19h6","M3 5h18"],"stroke":true},
  "theater": {"name":"Theater","viewBox":[0,0,24,24],"paths":["M2 10s3-3 3-8","M22 10s-3-3-3-8","M10 2c0 4.4-3.6 8-8 8","M14 2c0 4.4 3.6 8 8 8","M2 10s2 2 2 5","M22 10s-2 2-2 5","M8 15h8","M2 22v-1a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1","M14 22v-1a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1"],"stroke":true},
  "thermometer": {"name":"Thermometer","viewBox":[0,0,24,24],"paths":["M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"],"stroke":true},
  "thermometer-snowflake": {"name":"Thermometer Snowflake","viewBox":[0,0,24,24],"paths":["m10 20-1.25-2.5L6 18","M10 4 8.75 6.5 6 6","M10.585 15H10","M2 12h6.5L10 9","M20 14.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0z","m4 10 1.5 2L4 14","m7 21 3-6-1.5-3","m7 3 3 6h2"],"stroke":true},
  "thermometer-sun": {"name":"Thermometer Sun","viewBox":[0,0,24,24],"paths":["M12 2v2","M12 8a4 4 0 0 0-1.645 7.647","M2 12h2","M20 14.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0z","m4.93 4.93 1.41 1.41","m6.34 17.66-1.41 1.41"],"stroke":true},
  "this-way-up": {"name":"This Way Up","viewBox":[0,0,24,24],"stroke":true,"tags":["iso","handling","packaging","este lado para cima","orientacao"],"paths":["M7 21V9","m3 13 4-4 4 4","M17 21V9","m13 13 4-4 4 4"]},
  "thumbs-down": {"name":"Thumbs Down","viewBox":[0,0,24,24],"paths":["M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z","M17 14V2"],"stroke":true},
  "thumbs-up": {"name":"Thumbs Up","viewBox":[0,0,24,24],"paths":["M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z","M7 10v12"],"stroke":true},
  "tic-tac-toe": {"name":"Tic Tac Toe","viewBox":[0,0,24,24],"paths":["M12 2v20","m21 16-5 5","m21 21-5-5","M22 12H2","M8 3 3 8","M8 8 3 3","M 16 5.5 a 2.5 2.5 0 1 0 5 0 a 2.5 2.5 0 1 0 -5 0","M 3 18.5 a 2.5 2.5 0 1 0 5 0 a 2.5 2.5 0 1 0 -5 0"],"stroke":true},
  "ticket": {"name":"Ticket","viewBox":[0,0,24,24],"paths":["M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z","M13 5v2","M13 17v2","M13 11v2"],"stroke":true},
  "ticket-check": {"name":"Ticket Check","viewBox":[0,0,24,24],"paths":["M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z","m9 12 2 2 4-4"],"stroke":true},
  "ticket-minus": {"name":"Ticket Minus","viewBox":[0,0,24,24],"paths":["M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z","M9 12h6"],"stroke":true},
  "ticket-percent": {"name":"Ticket Percent","viewBox":[0,0,24,24],"paths":["M2 9a3 3 0 1 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 1 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z","M9 9h.01","m15 9-6 6","M15 15h.01"],"stroke":true},
  "ticket-plus": {"name":"Ticket Plus","viewBox":[0,0,24,24],"paths":["M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z","M9 12h6","M12 9v6"],"stroke":true},
  "ticket-slash": {"name":"Ticket Slash","viewBox":[0,0,24,24],"paths":["M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z","m9.5 14.5 5-5"],"stroke":true},
  "ticket-x": {"name":"Ticket X","viewBox":[0,0,24,24],"paths":["M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z","m9.5 14.5 5-5","m9.5 9.5 5 5"],"stroke":true},
  "tickets": {"name":"Tickets","viewBox":[0,0,24,24],"paths":["m3.173 8.18 11-5a2 2 0 0 1 2.647.993L18.56 8","M6 10V8","M6 14v1","M6 19v2","M 2 8 h 20 v 13 h -20 z"],"stroke":true},
  "tickets-plane": {"name":"Tickets Plane","viewBox":[0,0,24,24],"paths":["M10.5 17h1.227a2 2 0 0 0 1.345-.52L18 12","m12 13.5 3.794.506","m3.173 8.18 11-5a2 2 0 0 1 2.647.993L18.56 8","M6 10V8","M6 14v1","M6 19v2","M 2 8 h 20 v 13 h -20 z"],"stroke":true},
  "timeline": {"name":"Timeline","viewBox":[0,0,24,24],"paths":["M4 12h.01","M4 16h.01","M4 20h.01","M4 4h.01","M4 8h.01","M9.414 13.414a2 2 0 0 0 1.414.586H19a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1h-8.172a2 2 0 0 0-1.414.586L8 12z","M9.414 21.414a2 2 0 0 0 1.414.586H19a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1h-8.172a2 2 0 0 0-1.414.586L8 20z","M9.414 5.414A2 2 0 0 0 10.828 6H19a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1h-8.172a2 2 0 0 0-1.414.586L8 4z"],"stroke":true},
  "timer": {"name":"Timer","viewBox":[0,0,24,24],"paths":["M 10 2 L 14 2","M 12 14 L 15 11","M 4 14 a 8 8 0 1 0 16 0 a 8 8 0 1 0 -16 0"],"stroke":true},
  "timer-off": {"name":"Timer Off","viewBox":[0,0,24,24],"paths":["M10 2h4","M4.6 11a8 8 0 0 0 1.7 8.7 8 8 0 0 0 8.7 1.7","M7.4 7.4a8 8 0 0 1 10.3 1 8 8 0 0 1 .9 10.2","m2 2 20 20","M12 12v-2"],"stroke":true},
  "timer-reset": {"name":"Timer Reset","viewBox":[0,0,24,24],"paths":["M10 2h4","M12 14v-4","M4 13a8 8 0 0 1 8-7 8 8 0 1 1-5.3 14L4 17.6","M9 17H4v5"],"stroke":true},
  "toggle-left": {"name":"Toggle Left","viewBox":[0,0,24,24],"paths":["M 6 12 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0","M 2 5 h 20 v 14 h -20 z"],"stroke":true},
  "toggle-right": {"name":"Toggle Right","viewBox":[0,0,24,24],"paths":["M 12 12 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0","M 2 5 h 20 v 14 h -20 z"],"stroke":true},
  "toilet": {"name":"Toilet","viewBox":[0,0,24,24],"paths":["M7 12h13a1 1 0 0 1 1 1 5 5 0 0 1-5 5h-.598a.5.5 0 0 0-.424.765l1.544 2.47a.5.5 0 0 1-.424.765H5.402a.5.5 0 0 1-.424-.765L7 18","M8 18a5 5 0 0 1-5-5V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8"],"stroke":true},
  "tool-case": {"name":"Tool Case","viewBox":[0,0,24,24],"paths":["M10 15h4","m14.5 4.058.571-1.429a1 1 0 011.3-.558l5 2a1 1 0 01.549.534.88.88 0 01.01.765l-2.332 5.83","M15.634 11a2 2 0 00-.186-.34l-1.17-1.757 1.31-1.656a2 2 0 00-2.109-3.165l-2.032.57-1.17-1.758a2 2 0 00-3.664 1.028l-.086 2.11-2.032.568a2 2 0 00-.155 3.8l1.617.6","M4 12.006A1 1 0 014.994 11H19a1 1 0 011 1v7a2 2 0 01-2 2H6a2 2 0 01-2-2z"],"stroke":true},
  "toolbox": {"name":"Toolbox","viewBox":[0,0,24,24],"paths":["M16 12v4","M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2","M17 6a2 2 0 011.414.586l3 3A2 2 0 0122 11v8a2 2 0 01-2 2H4a2 2 0 01-2-2v-8a2 2 0 01.586-1.414l3-3A2 2 0 017 6z","M2 14h20","M8 12v4"],"stroke":true},
  "toothbrush": {"name":"Toothbrush","viewBox":[0,0,24,24],"paths":["M15 11c-2 2-4 2-6 4l-7 7","m22 4-7.414 7.414-2-2A2 2 0 0114 6c0-.512.196-1.024.586-1.414A2 2 0 0116 4a2 2 0 013.262-1.552l2.152 2.138"],"stroke":true},
  "toothbrush-sparkles": {"name":"Toothbrush Sparkles","viewBox":[0,0,24,24],"paths":["M10 3H8","M14.586 11.414 22 4","M15 11a8 8 0 01-.429.4","m2 22 7-7c1.857-1.857 3.714-1.99 5.571-3.6l-1.985-1.986A2 2 0 0114 6a2 2 0 012-2 2 2 0 013.262-1.552l2.152 2.138","M20 15v4","M22 17h-4","M4 5v4","M6 7H2","M9 2v2"],"stroke":true},
  "tornado": {"name":"Tornado","viewBox":[0,0,24,24],"paths":["M21 4H3","M18 8H6","M19 12H9","M16 16h-6","M11 20H9"],"stroke":true},
  "torus": {"name":"Torus","viewBox":[0,0,24,24],"paths":["M 9 11 a 3 2 0 1 0 6 0 a 3 2 0 1 0 -6 0","M 2 12.5 a 10 8.5 0 1 0 20 0 a 10 8.5 0 1 0 -20 0"],"stroke":true},
  "touchpad": {"name":"Touchpad","viewBox":[0,0,24,24],"paths":["M 2 4 h 20 v 16 h -20 z","M2 14h20","M12 20v-6"],"stroke":true},
  "touchpad-off": {"name":"Touchpad Off","viewBox":[0,0,24,24],"paths":["M12 20v-6","M19.656 14H22","M2 14h12","m2 2 20 20","M20 20H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2","M9.656 4H20a2 2 0 0 1 2 2v10.344"],"stroke":true},
  "towel-rack": {"name":"Towel Rack","viewBox":[0,0,24,24],"paths":["M22 7h-2","M6.5 3h11A2.5 2.5 0 0 1 20 5.5V20a1 1 0 0 1-1 1h-9a1 1 0 0 1-1-1V5.5a1 1 0 0 0-5 0V17a1 1 0 0 0 1 1h4","M9 7H2"],"stroke":true},
  "tower-control": {"name":"Tower Control","viewBox":[0,0,24,24],"paths":["M18.2 12.27 20 6H4l1.8 6.27a1 1 0 0 0 .95.73h10.5a1 1 0 0 0 .96-.73Z","M8 13v9","M16 22v-9","m9 6 1 7","m15 6-1 7","M12 6V2","M13 2h-2"],"stroke":true},
  "toy-brick": {"name":"Toy Brick","viewBox":[0,0,24,24],"paths":["M 3 8 h 18 v 12 h -18 z","M10 8V5c0-.6-.4-1-1-1H6a1 1 0 0 0-1 1v3","M19 8V5c0-.6-.4-1-1-1h-3a1 1 0 0 0-1 1v3"],"stroke":true},
  "tractor": {"name":"Tractor","viewBox":[0,0,24,24],"paths":["m10 11 11 .9a1 1 0 0 1 .8 1.1l-.665 4.158a1 1 0 0 1-.988.842H20","M16 18h-5","M18 5a1 1 0 0 0-1 1v5.573","M3 4h8.129a1 1 0 0 1 .99.863L13 11.246","M4 11V4","M7 15h.01","M8 10.1V4","M 16 18 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0","M 2 15 a 5 5 0 1 0 10 0 a 5 5 0 1 0 -10 0"],"stroke":true},
  "traffic-cone": {"name":"Traffic Cone","viewBox":[0,0,24,24],"paths":["M16.05 10.966a5 2.5 0 0 1-8.1 0","m16.923 14.049 4.48 2.04a1 1 0 0 1 .001 1.831l-8.574 3.9a2 2 0 0 1-1.66 0l-8.574-3.91a1 1 0 0 1 0-1.83l4.484-2.04","M16.949 14.14a5 2.5 0 1 1-9.9 0L10.063 3.5a2 2 0 0 1 3.874 0z","M9.194 6.57a5 2.5 0 0 0 5.61 0"],"stroke":true},
  "trailer": {"name":"Trailer","viewBox":[0,0,24,24],"paths":["M10 11.341V10","M14 13v-3","M18 17V8a2 2 0 00-2-2H4a2 2 0 00-2 2v7a2 2 0 002 2h2","M22 15v1a1 1 0 01-1 1H10","M6 11.341V10","M 6 17 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0"],"stroke":true},
  "train": {"name":"Train","viewBox":[0,0,24,24],"paths":["M 4 3 h 16 v 16 h -16 z","M4 11h16","M12 3v8","m8 19-2 3","m18 22-2-3","M8 15h.01","M16 15h.01"],"stroke":true},
  "train-front": {"name":"Train Front","viewBox":[0,0,24,24],"paths":["M8 3.1V7a4 4 0 0 0 8 0V3.1","m9 15-1-1","m15 15 1-1","M9 19c-2.8 0-5-2.2-5-5v-4a8 8 0 0 1 16 0v4c0 2.8-2.2 5-5 5Z","m8 19-2 3","m16 19 2 3"],"stroke":true},
  "train-front-tunnel": {"name":"Train Front Tunnel","viewBox":[0,0,24,24],"paths":["M2 22V12a10 10 0 1 1 20 0v10","M15 6.8v1.4a3 2.8 0 1 1-6 0V6.8","M10 15h.01","M14 15h.01","M10 19a4 4 0 0 1-4-4v-3a6 6 0 1 1 12 0v3a4 4 0 0 1-4 4Z","m9 19-2 3","m15 19 2 3"],"stroke":true},
  "train-track": {"name":"Train Track","viewBox":[0,0,24,24],"paths":["M2 17 17 2","m2 14 8 8","m5 11 8 8","m8 8 8 8","m11 5 8 8","m14 2 8 8","M7 22 22 7"],"stroke":true},
  "tram-front": {"name":"Tram Front","viewBox":[0,0,24,24],"paths":["M 4 3 h 16 v 16 h -16 z","M4 11h16","M12 3v8","m8 19-2 3","m18 22-2-3","M8 15h.01","M16 15h.01"],"stroke":true},
  "transgender": {"name":"Transgender","viewBox":[0,0,24,24],"paths":["M12 16v6","M14 20h-4","M18 2h4v4","m2 2 7.17 7.17","M2 5.355V2h3.357","m22 2-7.17 7.17","M8 5 5 8","M 8 12 a 4 4 0 1 0 8 0 a 4 4 0 1 0 -8 0"],"stroke":true},
  "trash": {"name":"Trash","viewBox":[0,0,24,24],"paths":["M10 11v6","M14 11v6","M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6","M3 6h18","M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"],"stroke":true},
  "trash-2": {"name":"Trash 2","viewBox":[0,0,24,24],"paths":["M10 11v6","M14 11v6","M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6","M3 6h18","M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"],"stroke":true},
  "trash-off": {"name":"Trash Off","viewBox":[0,0,24,24],"paths":["M10 11v6","M14 17v-3","M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-1.576.768","M19 6v7.344","m2 2 20 20","M21 6h-9.344","M3 6h3","M5 6v14a2 2 0 002 2h10a2 2 0 002-2v-1"],"stroke":true},
  "tree-deciduous": {"name":"Tree Deciduous","viewBox":[0,0,24,24],"paths":["M8 19a4 4 0 0 1-2.24-7.32A3.5 3.5 0 0 1 9 6.03V6a3 3 0 1 1 6 0v.04a3.5 3.5 0 0 1 3.24 5.65A4 4 0 0 1 16 19Z","M12 19v3"],"stroke":true},
  "tree-palm": {"name":"Tree Palm","viewBox":[0,0,24,24],"paths":["M13 8c0-2.76-2.46-5-5.5-5S2 5.24 2 8h2l1-1 1 1h4","M13 7.14A5.82 5.82 0 0 1 16.5 6c3.04 0 5.5 2.24 5.5 5h-3l-1-1-1 1h-3","M5.89 9.71c-2.15 2.15-2.3 5.47-.35 7.43l4.24-4.25.7-.7.71-.71 2.12-2.12c-1.95-1.96-5.27-1.8-7.42.35","M11 15.5c.5 2.5-.17 4.5-1 6.5h4c2-5.5-.5-12-1-14"],"stroke":true},
  "tree-pine": {"name":"Tree Pine","viewBox":[0,0,24,24],"paths":["m17 14 3 3.3a1 1 0 0 1-.7 1.7H4.7a1 1 0 0 1-.7-1.7L7 14h-.3a1 1 0 0 1-.7-1.7L9 9h-.2A1 1 0 0 1 8 7.3L12 3l4 4.3a1 1 0 0 1-.8 1.7H15l3 3.3a1 1 0 0 1-.7 1.7H17Z","M12 22v-3"],"stroke":true},
  "trees": {"name":"Trees","viewBox":[0,0,24,24],"paths":["M10 10v.2A3 3 0 0 1 8.9 16H5a3 3 0 0 1-1-5.8V10a3 3 0 0 1 6 0Z","M7 16v6","M13 19v3","M12 19h8.3a1 1 0 0 0 .7-1.7L18 14h.3a1 1 0 0 0 .7-1.7L16 9h.2a1 1 0 0 0 .8-1.7L13 3l-1.4 1.5"],"stroke":true},
  "trending-down": {"name":"Trending Down","viewBox":[0,0,24,24],"paths":["M16 17h6v-6","m22 17-8.5-8.5-5 5L2 7"],"stroke":true},
  "trending-up": {"name":"Trending Up","viewBox":[0,0,24,24],"paths":["M16 7h6v6","m22 7-8.5 8.5-5-5L2 17"],"stroke":true},
  "trending-up-down": {"name":"Trending Up Down","viewBox":[0,0,24,24],"paths":["M14.828 14.828 21 21","M21 16v5h-5","m21 3-9 9-4-4-6 6","M21 8V3h-5"],"stroke":true},
  "triangle": {"name":"Triangle","viewBox":[0,0,24,24],"paths":["M13.73 4a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"],"stroke":true},
  "triangle-alert": {"name":"Triangle Alert","viewBox":[0,0,24,24],"paths":["m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3","M12 9v4","M12 17h.01"],"stroke":true},
  "triangle-dashed": {"name":"Triangle Dashed","viewBox":[0,0,24,24],"paths":["M10.17 4.193a2 2 0 0 1 3.666.013","M14 21h2","m15.874 7.743 1 1.732","m18.849 12.952 1 1.732","M21.824 18.18a2 2 0 0 1-1.835 2.824","M4.024 21a2 2 0 0 1-1.839-2.839","m5.136 12.952-1 1.732","M8 21h2","m8.102 7.743-1 1.732"],"stroke":true},
  "triangle-right": {"name":"Triangle Right","viewBox":[0,0,24,24],"paths":["M22 18a2 2 0 0 1-2 2H3c-1.1 0-1.3-.6-.4-1.3L20.4 4.3c.9-.7 1.6-.4 1.6.7Z"],"stroke":true},
  "triangles-centerline-dashed-horizontal": {"name":"Triangles Centerline Dashed Horizontal","viewBox":[0,0,24,24],"paths":["M10 12H8","M16 12h-2","M22 12h-2","M4 12H2","M7.298 20.288A1 1 0 008 22h8a1 1 0 00.703-1.712l-3.991-3.99a1 1 0 00-1.424-.001z","M7.298 3.712A1 1 0 018 2h8a1 1 0 01.703 1.712l-3.991 3.99a1 1 0 01-1.424.001z"],"stroke":true},
  "triangles-centerline-dashed-vertical": {"name":"Triangles Centerline Dashed Vertical","viewBox":[0,0,24,24],"paths":["M12 14v2","M12 20v2","M12 2v2","M12 8v2","M20.288 16.703A1 1 0 0022 16V8a1 1 0 00-1.712-.703l-3.99 3.991a1 1 0 00-.001 1.424z","M3.712 16.703A1 1 0 012 16V8a1 1 0 011.712-.703l3.99 3.991a1 1 0 01.001 1.424z"],"stroke":true},
  "trophy": {"name":"Trophy","viewBox":[0,0,24,24],"paths":["M10 14.66V17a1 1 0 0 1-1 1 2 2 0 0 0-2 2v2","M14 14.66V17a1 1 0 0 0 1 1 2 2 0 0 1 2 2v2","M17.916 10H19.5A2.5 2.5 0 0 0 22 7.5V5a1 1 0 0 0-1-1h-3","M4 22h16","M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z","M6.084 10H4.5A2.5 2.5 0 0 1 2 7.5V5a1 1 0 0 1 1-1h3"],"stroke":true},
  "truck": {"name":"Truck","viewBox":[0,0,24,24],"paths":["M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2","M15 18H9","M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14","M 15 18 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0","M 5 18 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0"],"stroke":true},
  "truck-electric": {"name":"Truck Electric","viewBox":[0,0,24,24],"paths":["M14 19V7a2 2 0 0 0-2-2H9","M15 19H9","M19 19h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.62L18.3 9.38a1 1 0 0 0-.78-.38H14","M2 13v5a1 1 0 0 0 1 1h2","M4 3 2.15 5.15a.495.495 0 0 0 .35.86h2.15a.47.47 0 0 1 .35.86L3 9.02","M 15 19 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0","M 5 19 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0"],"stroke":true},
  "tube-lotion": {"name":"Tube Lotion","viewBox":[0,0,24,24],"paths":["M15 18v3a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-3","M17 2a2 2 0 0 1 1.6 3.2A8 8 0 0 0 17 10v6a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-6a8 8 0 0 0-1.6-4.8A2 2 0 0 1 7 2z","M7 10a6.47 6.47 0 0 1 5 0 6.47 6.47 0 0 0 5 0"],"stroke":true},
  "turkish-lira": {"name":"Turkish Lira","viewBox":[0,0,24,24],"paths":["M15 4 5 9","m15 8.5-10 5","M18 12a9 9 0 0 1-9 9V3"],"stroke":true},
  "turntable": {"name":"Turntable","viewBox":[0,0,24,24],"paths":["M10 12.01h.01","M18 8v4a8 8 0 0 1-1.07 4","M 6 12 a 4 4 0 1 0 8 0 a 4 4 0 1 0 -8 0","M 2 4 h 20 v 16 h -20 z"],"stroke":true},
  "turtle": {"name":"Turtle","viewBox":[0,0,24,24],"paths":["m12 10 2 4v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3a8 8 0 1 0-16 0v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3l2-4h4Z","M4.82 7.9 8 10","M15.18 7.9 12 10","M16.93 10H20a2 2 0 0 1 0 4H2"],"stroke":true},
  "tv": {"name":"Tv","viewBox":[0,0,24,24],"paths":["m17 2-5 5-5-5","M 2 7 h 20 v 15 h -20 z"],"stroke":true},
  "tv-2": {"name":"Tv 2","viewBox":[0,0,24,24],"paths":["M7 21h10","M 2 3 h 20 v 14 h -20 z"],"stroke":true},
  "tv-minimal": {"name":"Tv Minimal","viewBox":[0,0,24,24],"paths":["M7 21h10","M 2 3 h 20 v 14 h -20 z"],"stroke":true},
  "tv-minimal-play": {"name":"Tv Minimal Play","viewBox":[0,0,24,24],"paths":["M15.033 9.44a.647.647 0 0 1 0 1.12l-4.065 2.352a.645.645 0 0 1-.968-.56V7.648a.645.645 0 0 1 .967-.56z","M7 21h10","M 2 3 h 20 v 14 h -20 z"],"stroke":true},
  "type": {"name":"Type","viewBox":[0,0,24,24],"paths":["M12 4v16","M4 7V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2","M9 20h6"],"stroke":true},
  "type-outline": {"name":"Type Outline","viewBox":[0,0,24,24],"paths":["M14 16.5a.5.5 0 0 0 .5.5h.5a2 2 0 0 1 0 4H9a2 2 0 0 1 0-4h.5a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5V8a2 2 0 0 1-4 0V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v3a2 2 0 0 1-4 0v-.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5Z"],"stroke":true},
  "umbrella": {"name":"Umbrella","viewBox":[0,0,24,24],"paths":["M12 13v7a2 2 0 0 0 4 0","M12 2v2","M20.992 13a1 1 0 0 0 .97-1.274 10.284 10.284 0 0 0-19.923 0A1 1 0 0 0 3 13z"],"stroke":true},
  "umbrella-off": {"name":"Umbrella Off","viewBox":[0,0,24,24],"paths":["M12 13v7a2 2 0 0 0 4 0","M12 2v2","M18.656 13h2.336a1 1 0 0 0 .97-1.274 10.284 10.284 0 0 0-12.07-7.51","m2 2 20 20","M5.961 5.957a10.28 10.28 0 0 0-3.922 5.769A1 1 0 0 0 3 13h10"],"stroke":true},
  "underline": {"name":"Underline","viewBox":[0,0,24,24],"paths":["M6 4v6a6 6 0 0 0 12 0V4","M 4 20 L 20 20"],"stroke":true},
  "undo": {"name":"Undo","viewBox":[0,0,24,24],"paths":["M3 7v6h6","M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"],"stroke":true},
  "undo-2": {"name":"Undo 2","viewBox":[0,0,24,24],"paths":["M9 14 4 9l5-5","M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11"],"stroke":true},
  "undo-dot": {"name":"Undo Dot","viewBox":[0,0,24,24],"paths":["M21 17a9 9 0 0 0-15-6.7L3 13","M3 7v6h6","M 11 17 a 1 1 0 1 0 2 0 a 1 1 0 1 0 -2 0"],"stroke":true},
  "unfold-horizontal": {"name":"Unfold Horizontal","viewBox":[0,0,24,24],"paths":["M16 12h6","M8 12H2","M12 2v2","M12 8v2","M12 14v2","M12 20v2","m19 15 3-3-3-3","m5 9-3 3 3 3"],"stroke":true},
  "unfold-vertical": {"name":"Unfold Vertical","viewBox":[0,0,24,24],"paths":["M12 22v-6","M12 8V2","M4 12H2","M10 12H8","M16 12h-2","M22 12h-2","m15 19-3 3-3-3","m15 5-3-3-3 3"],"stroke":true},
  "ungroup": {"name":"Ungroup","viewBox":[0,0,24,24],"paths":["M 11 14 h 10 v 7 h -10 z","M 3 3 h 10 v 7 h -10 z"],"stroke":true},
  "university": {"name":"University","viewBox":[0,0,24,24],"paths":["M14 21v-3a2 2 0 0 0-4 0v3","M18 12h.01","M18 16h.01","M22 7a1 1 0 0 0-1-1h-2a2 2 0 0 1-1.143-.359L13.143 2.36a2 2 0 0 0-2.286-.001L6.143 5.64A2 2 0 0 1 5 6H3a1 1 0 0 0-1 1v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2z","M6 12h.01","M6 16h.01","M 10 10 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0"],"stroke":true},
  "unlink": {"name":"Unlink","viewBox":[0,0,24,24],"paths":["m18.84 12.25 1.72-1.71h-.02a5.004 5.004 0 0 0-.12-7.07 5.006 5.006 0 0 0-6.95 0l-1.72 1.71","m5.17 11.75-1.71 1.71a5.004 5.004 0 0 0 .12 7.07 5.006 5.006 0 0 0 6.95 0l1.71-1.71","M 8 2 L 8 5","M 2 8 L 5 8","M 16 19 L 16 22","M 19 16 L 22 16"],"stroke":true},
  "unlink-2": {"name":"Unlink 2","viewBox":[0,0,24,24],"paths":["M15 7h2a5 5 0 0 1 0 10h-2m-6 0H7A5 5 0 0 1 7 7h2"],"stroke":true},
  "unlock": {"name":"Unlock","viewBox":[0,0,24,24],"paths":["M 3 11 h 18 v 11 h -18 z","M7 11V7a5 5 0 0 1 9.9-1"],"stroke":true},
  "unlock-keyhole": {"name":"Unlock Keyhole","viewBox":[0,0,24,24],"paths":["M 11 16 a 1 1 0 1 0 2 0 a 1 1 0 1 0 -2 0","M 3 10 h 18 v 12 h -18 z","M7 10V7a5 5 0 0 1 9.33-2.5"],"stroke":true},
  "unplug": {"name":"Unplug","viewBox":[0,0,24,24],"paths":["m19 5 3-3","m2 22 3-3","M6.3 20.3a2.4 2.4 0 0 0 3.4 0L12 18l-6-6-2.3 2.3a2.4 2.4 0 0 0 0 3.4Z","M7.5 13.5 10 11","M10.5 16.5 13 14","m12 6 6 6 2.3-2.3a2.4 2.4 0 0 0 0-3.4l-2.6-2.6a2.4 2.4 0 0 0-3.4 0Z"],"stroke":true},
  "upload": {"name":"Upload","viewBox":[0,0,24,24],"paths":["M12 3v12","m17 8-5-5-5 5","M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"],"stroke":true},
  "upload-cloud": {"name":"Upload Cloud","viewBox":[0,0,24,24],"paths":["M12 13v8","M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242","m8 17 4-4 4 4"],"stroke":true},
  "usb": {"name":"Usb","viewBox":[0,0,24,24],"paths":["M 9 7 a 1 1 0 1 0 2 0 a 1 1 0 1 0 -2 0","M 3 20 a 1 1 0 1 0 2 0 a 1 1 0 1 0 -2 0","M4.7 19.3 19 5","m21 3-3 1 2 2Z","M9.26 7.68 5 12l2 5","m10 14 5 2 3.5-3.5","m18 12 1-1 1 1-1 1Z"],"stroke":true},
  "usb-c-port": {"name":"Usb C Port","viewBox":[0,0,24,24],"paths":["M6 12h12","M 2 8 h 20 v 8 h -20 z"],"stroke":true},
  "user": {"name":"User","viewBox":[0,0,24,24],"paths":["M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2","M 8 7 a 4 4 0 1 0 8 0 a 4 4 0 1 0 -8 0"],"stroke":true},
  "user-2": {"name":"User 2","viewBox":[0,0,24,24],"paths":["M 7 8 a 5 5 0 1 0 10 0 a 5 5 0 1 0 -10 0","M20 21a8 8 0 0 0-16 0"],"stroke":true},
  "user-check": {"name":"User Check","viewBox":[0,0,24,24],"paths":["m16 11 2 2 4-4","M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2","M 5 7 a 4 4 0 1 0 8 0 a 4 4 0 1 0 -8 0"],"stroke":true},
  "user-check-2": {"name":"User Check 2","viewBox":[0,0,24,24],"paths":["M2 21a8 8 0 0 1 13.292-6","M 5 8 a 5 5 0 1 0 10 0 a 5 5 0 1 0 -10 0","m16 19 2 2 4-4"],"stroke":true},
  "user-circle": {"name":"User Circle","viewBox":[0,0,24,24],"paths":["M 2 12 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0","M 9 10 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0","M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"],"stroke":true},
  "user-circle-2": {"name":"User Circle 2","viewBox":[0,0,24,24],"paths":["M17.925 20.056a6 6 0 0 0-11.851.001","M 8 11 a 4 4 0 1 0 8 0 a 4 4 0 1 0 -8 0","M 2 12 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0"],"stroke":true},
  "user-cog": {"name":"User Cog","viewBox":[0,0,24,24],"paths":["M10 15H6a4 4 0 0 0-4 4v2","m14.305 16.53.923-.382","m15.228 13.852-.923-.383","m16.852 12.228-.383-.923","m16.852 17.772-.383.924","m19.148 12.228.383-.923","m19.53 18.696-.382-.924","m20.772 13.852.924-.383","m20.772 16.148.924.383","M 15 15 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0","M 5 7 a 4 4 0 1 0 8 0 a 4 4 0 1 0 -8 0"],"stroke":true},
  "user-cog-2": {"name":"User Cog 2","viewBox":[0,0,24,24],"paths":["m14.305 19.53.923-.382","m15.228 16.852-.923-.383","m16.852 15.228-.383-.923","m16.852 20.772-.383.924","m19.148 15.228.383-.923","m19.53 21.696-.382-.924","M2 21a8 8 0 0 1 10.434-7.62","m20.772 16.852.924-.383","m20.772 19.148.924.383","M 5 8 a 5 5 0 1 0 10 0 a 5 5 0 1 0 -10 0","M 15 18 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0"],"stroke":true},
  "user-group": {"name":"User Group","viewBox":[0,0,24,24],"paths":["M17 21v-1a2 2 0 00-2-2H9a2 2 0 00-2 2v1","M19 10h1a2 2 0 012 2v1","M5 10H4a2 2 0 00-2 2v1","M 9 11 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0","M 16 4 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0","M 4 4 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0"],"stroke":true},
  "user-key": {"name":"User Key","viewBox":[0,0,24,24],"paths":["M20 11v6","M20 13h2","M3 21v-2a4 4 0 0 1 4-4h6a4 4 0 0 1 2.072.578","M 6 7 a 4 4 0 1 0 8 0 a 4 4 0 1 0 -8 0","M 18 19 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0"],"stroke":true},
  "user-lock": {"name":"User Lock","viewBox":[0,0,24,24],"paths":["M19 16v-2a2 2 0 0 0-4 0v2","M9.5 15H7a4 4 0 0 0-4 4v2","M 6 7 a 4 4 0 1 0 8 0 a 4 4 0 1 0 -8 0","M 13 16 h 8 v 5 h -8 z"],"stroke":true},
  "user-minus": {"name":"User Minus","viewBox":[0,0,24,24],"paths":["M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2","M 5 7 a 4 4 0 1 0 8 0 a 4 4 0 1 0 -8 0","M 22 11 L 16 11"],"stroke":true},
  "user-minus-2": {"name":"User Minus 2","viewBox":[0,0,24,24],"paths":["M2 21a8 8 0 0 1 13.292-6","M 5 8 a 5 5 0 1 0 10 0 a 5 5 0 1 0 -10 0","M22 19h-6"],"stroke":true},
  "user-pen": {"name":"User Pen","viewBox":[0,0,24,24],"paths":["M11.5 15H7a4 4 0 0 0-4 4v2","M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z","M 6 7 a 4 4 0 1 0 8 0 a 4 4 0 1 0 -8 0"],"stroke":true},
  "user-plus": {"name":"User Plus","viewBox":[0,0,24,24],"paths":["M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2","M 5 7 a 4 4 0 1 0 8 0 a 4 4 0 1 0 -8 0","M 19 8 L 19 14","M 22 11 L 16 11"],"stroke":true},
  "user-plus-2": {"name":"User Plus 2","viewBox":[0,0,24,24],"paths":["M2 21a8 8 0 0 1 13.292-6","M 5 8 a 5 5 0 1 0 10 0 a 5 5 0 1 0 -10 0","M19 16v6","M22 19h-6"],"stroke":true},
  "user-round": {"name":"User Round","viewBox":[0,0,24,24],"paths":["M 7 8 a 5 5 0 1 0 10 0 a 5 5 0 1 0 -10 0","M20 21a8 8 0 0 0-16 0"],"stroke":true},
  "user-round-arrow-left": {"name":"User Round Arrow Left","viewBox":[0,0,24,24],"paths":["m19 16-3 3","M2 21a8 8 0 0 1 12.664-6.5","M22 19h-6l3 3","M 5 8 a 5 5 0 1 0 10 0 a 5 5 0 1 0 -10 0"],"stroke":true},
  "user-round-check": {"name":"User Round Check","viewBox":[0,0,24,24],"paths":["M2 21a8 8 0 0 1 13.292-6","M 5 8 a 5 5 0 1 0 10 0 a 5 5 0 1 0 -10 0","m16 19 2 2 4-4"],"stroke":true},
  "user-round-cog": {"name":"User Round Cog","viewBox":[0,0,24,24],"paths":["m14.305 19.53.923-.382","m15.228 16.852-.923-.383","m16.852 15.228-.383-.923","m16.852 20.772-.383.924","m19.148 15.228.383-.923","m19.53 21.696-.382-.924","M2 21a8 8 0 0 1 10.434-7.62","m20.772 16.852.924-.383","m20.772 19.148.924.383","M 5 8 a 5 5 0 1 0 10 0 a 5 5 0 1 0 -10 0","M 15 18 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0"],"stroke":true},
  "user-round-group": {"name":"User Round Group","viewBox":[0,0,24,24],"paths":["M17 21a5 5 0 00-10 0","M22 10.5a3.5 3.5 0 00-5.507-2.868","M7.507 7.632A3.5 3.5 0 002 10.5","M 9 13 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0","M 16 4.5 a 2.5 2.5 0 1 0 5 0 a 2.5 2.5 0 1 0 -5 0","M 3 4.5 a 2.5 2.5 0 1 0 5 0 a 2.5 2.5 0 1 0 -5 0"],"stroke":true},
  "user-round-key": {"name":"User Round Key","viewBox":[0,0,24,24],"paths":["M19 11v6","M19 13h2","M2 21a8 8 0 0 1 12.868-6.349","M 5 8 a 5 5 0 1 0 10 0 a 5 5 0 1 0 -10 0","M 17 19 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0"],"stroke":true},
  "user-round-minus": {"name":"User Round Minus","viewBox":[0,0,24,24],"paths":["M2 21a8 8 0 0 1 13.292-6","M 5 8 a 5 5 0 1 0 10 0 a 5 5 0 1 0 -10 0","M22 19h-6"],"stroke":true},
  "user-round-pen": {"name":"User Round Pen","viewBox":[0,0,24,24],"paths":["M2 21a8 8 0 0 1 10.821-7.487","M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z","M 5 8 a 5 5 0 1 0 10 0 a 5 5 0 1 0 -10 0"],"stroke":true},
  "user-round-plus": {"name":"User Round Plus","viewBox":[0,0,24,24],"paths":["M2 21a8 8 0 0 1 13.292-6","M 5 8 a 5 5 0 1 0 10 0 a 5 5 0 1 0 -10 0","M19 16v6","M22 19h-6"],"stroke":true},
  "user-round-search": {"name":"User Round Search","viewBox":[0,0,24,24],"paths":["M 5 8 a 5 5 0 1 0 10 0 a 5 5 0 1 0 -10 0","M2 21a8 8 0 0 1 10.434-7.62","M 15 18 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0","m22 22-1.9-1.9"],"stroke":true},
  "user-round-star": {"name":"User Round Star","viewBox":[0,0,24,24],"paths":["M16.051 12.616a1 1 0 0 1 1.909.024l.737 1.452a1 1 0 0 0 .737.535l1.634.256a1 1 0 0 1 .588 1.806l-1.172 1.168a1 1 0 0 0-.282.866l.259 1.613a1 1 0 0 1-1.541 1.134l-1.465-.75a1 1 0 0 0-.912 0l-1.465.75a1 1 0 0 1-1.539-1.133l.258-1.613a1 1 0 0 0-.282-.867l-1.156-1.152a1 1 0 0 1 .572-1.822l1.633-.256a1 1 0 0 0 .737-.535z","M2 21a8 8 0 0 1 6.778-7.905","M8.927 12.885a5 5 0 1 1 6.061-4.535"],"stroke":true},
  "user-round-x": {"name":"User Round X","viewBox":[0,0,24,24],"paths":["m16.5 16.5 5 5","M2 21a8 8 0 0 1 11.531-7.18","m21.5 16.5-5 5","M 5 8 a 5 5 0 1 0 10 0 a 5 5 0 1 0 -10 0"],"stroke":true},
  "user-search": {"name":"User Search","viewBox":[0,0,24,24],"paths":["M 6 7 a 4 4 0 1 0 8 0 a 4 4 0 1 0 -8 0","M10.3 15H7a4 4 0 0 0-4 4v2","M 14 17 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0","m21 21-1.9-1.9"],"stroke":true},
  "user-shield": {"name":"User Shield","viewBox":[0,0,24,24],"paths":["M10 15H6a4 4 0 0 0-4 4v2","M22 17.5c0 2.499-1.75 3.749-3.83 4.474a.5.5 0 0 1-.335-.005c-2.085-.72-3.835-1.97-3.835-4.47V14a.5.5 0 0 1 .5-.499c1 0 2.25-.6 3.12-1.36a.6.6 0 0 1 .76-.001c.875.765 2.12 1.36 3.12 1.36a.5.5 0 0 1 .5.5z","M 5 7 a 4 4 0 1 0 8 0 a 4 4 0 1 0 -8 0"],"stroke":true},
  "user-square": {"name":"User Square","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","M 9 10 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0","M7 21v-2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2"],"stroke":true},
  "user-square-2": {"name":"User Square 2","viewBox":[0,0,24,24],"paths":["M18 21a6 6 0 0 0-12 0","M 8 11 a 4 4 0 1 0 8 0 a 4 4 0 1 0 -8 0","M 3 3 h 18 v 18 h -18 z"],"stroke":true},
  "user-star": {"name":"User Star","viewBox":[0,0,24,24],"paths":["M16.051 12.616a1 1 0 0 1 1.909.024l.737 1.452a1 1 0 0 0 .737.535l1.634.256a1 1 0 0 1 .588 1.806l-1.172 1.168a1 1 0 0 0-.282.866l.259 1.613a1 1 0 0 1-1.541 1.134l-1.465-.75a1 1 0 0 0-.912 0l-1.465.75a1 1 0 0 1-1.539-1.133l.258-1.613a1 1 0 0 0-.282-.866l-1.156-1.153a1 1 0 0 1 .572-1.822l1.633-.256a1 1 0 0 0 .737-.535z","M8 15H7a4 4 0 0 0-4 4v2","M 6 7 a 4 4 0 1 0 8 0 a 4 4 0 1 0 -8 0"],"stroke":true},
  "user-x": {"name":"User X","viewBox":[0,0,24,24],"paths":["M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2","M 5 7 a 4 4 0 1 0 8 0 a 4 4 0 1 0 -8 0","M 17 8 L 22 13","M 22 8 L 17 13"],"stroke":true},
  "user-x-2": {"name":"User X 2","viewBox":[0,0,24,24],"paths":["m16.5 16.5 5 5","M2 21a8 8 0 0 1 11.531-7.18","m21.5 16.5-5 5","M 5 8 a 5 5 0 1 0 10 0 a 5 5 0 1 0 -10 0"],"stroke":true},
  "users": {"name":"Users","viewBox":[0,0,24,24],"paths":["M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2","M16 3.128a4 4 0 0 1 0 7.744","M22 21v-2a4 4 0 0 0-3-3.87","M 5 7 a 4 4 0 1 0 8 0 a 4 4 0 1 0 -8 0"],"stroke":true},
  "users-2": {"name":"Users 2","viewBox":[0,0,24,24],"paths":["M18 21a8 8 0 0 0-16 0","M 5 8 a 5 5 0 1 0 10 0 a 5 5 0 1 0 -10 0","M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3"],"stroke":true},
  "users-round": {"name":"Users Round","viewBox":[0,0,24,24],"paths":["M18 21a8 8 0 0 0-16 0","M 5 8 a 5 5 0 1 0 10 0 a 5 5 0 1 0 -10 0","M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3"],"stroke":true},
  "utensils": {"name":"Utensils","viewBox":[0,0,24,24],"paths":["M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2","M7 2v20","M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"],"stroke":true},
  "utensils-crossed": {"name":"Utensils Crossed","viewBox":[0,0,24,24],"paths":["m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8","M15 15 3.3 3.3a4.2 4.2 0 0 0 0 6l7.3 7.3c.7.7 2 .7 2.8 0L15 15Zm0 0 7 7","m2.1 21.8 6.4-6.3","m19 5-7 7"],"stroke":true},
  "utility-pole": {"name":"Utility Pole","viewBox":[0,0,24,24],"paths":["M12 2v20","M2 5h20","M3 3v2","M7 3v2","M17 3v2","M21 3v2","m19 5-7 7-7-7"],"stroke":true},
  "van": {"name":"Van","viewBox":[0,0,24,24],"paths":["M13 6v5a1 1 0 0 0 1 1h6.102a1 1 0 0 1 .712.298l.898.91a1 1 0 0 1 .288.702V17a1 1 0 0 1-1 1h-3","M5 18H3a1 1 0 0 1-1-1V8a2 2 0 0 1 2-2h12c1.1 0 2.1.8 2.4 1.8l1.176 4.2","M9 18h5","M 14 18 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0","M 5 18 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0"],"stroke":true},
  "variable": {"name":"Variable","viewBox":[0,0,24,24],"paths":["M8 21s-4-3-4-9 4-9 4-9","M16 3s4 3 4 9-4 9-4 9","M 15 9 L 9 15","M 9 9 L 15 15"],"stroke":true},
  "vault": {"name":"Vault","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","M 7 7.5 a 0.5 0.5 0 1 0 1 0 a 0.5 0.5 0 1 0 -1 0","m7.9 7.9 2.7 2.7","M 16 7.5 a 0.5 0.5 0 1 0 1 0 a 0.5 0.5 0 1 0 -1 0","m13.4 10.6 2.7-2.7","M 7 16.5 a 0.5 0.5 0 1 0 1 0 a 0.5 0.5 0 1 0 -1 0","m7.9 16.1 2.7-2.7","M 16 16.5 a 0.5 0.5 0 1 0 1 0 a 0.5 0.5 0 1 0 -1 0","m13.4 13.4 2.7 2.7","M 10 12 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0"],"stroke":true},
  "vector-polygon": {"name":"Vector Polygon","viewBox":[0,0,24,24],"paths":["m12.828 4.813 5.344 2.375","m15.769 18.153 3.461-8.306","m5.687 14.074 7.625 4.852","M9.772 5.579 5.228 11.42","M 9 4 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0","M 13 20 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0","M 18 8 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0","M 2 13 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0"],"stroke":true},
  "vector-square": {"name":"Vector Square","viewBox":[0,0,24,24],"paths":["M17.055 4.533a24 24 0 00-10.11 0","M19.467 17.055a24 24 0 000-10.11","M4.533 6.945a24 24 0 000 10.11","M6.945 19.467a24 24 0 0010.11 0","M 17 19 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0","M 17 5 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0","M 3 19 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0","M 3 5 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0"],"stroke":true},
  "vegan": {"name":"Vegan","viewBox":[0,0,24,24],"paths":["M16 8q6 0 6-6-6 0-6 6","M17.41 3.59a10 10 0 1 0 3 3","M2 2a26.6 26.6 0 0 1 10 20c.9-6.82 1.5-9.5 4-14"],"stroke":true},
  "venetian-mask": {"name":"Venetian Mask","viewBox":[0,0,24,24],"paths":["M18 11c-1.5 0-2.5.5-3 2","M4 6a2 2 0 0 0-2 2v4a5 5 0 0 0 5 5 8 8 0 0 1 5 2 8 8 0 0 1 5-2 5 5 0 0 0 5-5V8a2 2 0 0 0-2-2h-3a8 8 0 0 0-5 2 8 8 0 0 0-5-2z","M6 11c1.5 0 2.5.5 3 2"],"stroke":true},
  "venus": {"name":"Venus","viewBox":[0,0,24,24],"paths":["M12 15v7","M9 19h6","M 6 9 a 6 6 0 1 0 12 0 a 6 6 0 1 0 -12 0"],"stroke":true},
  "venus-and-mars": {"name":"Venus And Mars","viewBox":[0,0,24,24],"paths":["M10 20h4","M12 16v6","M17 2h4v4","m21 2-5.46 5.46","M 7 11 a 5 5 0 1 0 10 0 a 5 5 0 1 0 -10 0"],"stroke":true},
  "verified": {"name":"Verified","viewBox":[0,0,24,24],"paths":["M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z","m16 9-5.5 5.5L8 12"],"stroke":true},
  "vibrate": {"name":"Vibrate","viewBox":[0,0,24,24],"paths":["m2 8 2 2-2 2 2 2-2 2","m22 8-2 2 2 2-2 2 2 2","M 8 5 h 8 v 14 h -8 z"],"stroke":true},
  "vibrate-off": {"name":"Vibrate Off","viewBox":[0,0,24,24],"paths":["m2 8 2 2-2 2 2 2-2 2","m22 8-2 2 2 2-2 2 2 2","M8 8v10c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2","M16 10.34V6c0-.55-.45-1-1-1h-4.34","M 2 2 L 22 22"],"stroke":true},
  "video": {"name":"Video","viewBox":[0,0,24,24],"paths":["m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5","M 2 6 h 14 v 12 h -14 z"],"stroke":true},
  "video-off": {"name":"Video Off","viewBox":[0,0,24,24],"paths":["M10.66 6H14a2 2 0 0 1 2 2v2.5l5.248-3.062A.5.5 0 0 1 22 7.87v8.196","M16 16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2","m2 2 20 20"],"stroke":true},
  "videotape": {"name":"Videotape","viewBox":[0,0,24,24],"paths":["M 2 4 h 20 v 16 h -20 z","M2 8h20","M 6 14 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0","M8 12h8","M 14 14 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0"],"stroke":true},
  "view": {"name":"View","viewBox":[0,0,24,24],"paths":["M21 17v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2","M21 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2","M 11 12 a 1 1 0 1 0 2 0 a 1 1 0 1 0 -2 0","M18.944 12.33a1 1 0 0 0 0-.66 7.5 7.5 0 0 0-13.888 0 1 1 0 0 0 0 .66 7.5 7.5 0 0 0 13.888 0"],"stroke":true},
  "virus": {"name":"Virus","viewBox":[0,0,24,24],"paths":["M12 14.991h.01","M12 22v-3","M12 2v3","M13 22h-2","M13 2h-2","M13.99 10H14","m16.5 19.794-1-1.733","m16.5 4.205-1 1.732","m19.794 16.5-1.732-1","m19.794 7.5-1.732 1","M2 12h3","M2 13v-2","M22 12h-3","M22 13v-2","m4.206 16.5 1.732-1","m4.206 7.5 1.732 1","m7.5 19.794 1-1.733","m7.5 4.205 1 1.732","M9 12h.01","M 5 12 a 7 7 0 1 0 14 0 a 7 7 0 1 0 -14 0"],"stroke":true},
  "virus-off": {"name":"Virus Off","viewBox":[0,0,24,24],"paths":["M10.01 10h.01","M12 14.991h.01","M12 22v-3","M12 2v3","M13 22h-2","M13 2h-2","m16.5 19.794-1-1.733","m16.5 4.205-1 1.732","M18.891 13.235a7 7 0 00-8.126-8.126","m19.794 7.5-1.732 1","M2 12h3","M2 13v-2","m2 2 20 20","M22 12h-3","M22 13v-2","m4.206 16.5 1.732-1","m4.206 7.5 1.732 1","M7.05 7.05a7 7 0 009.9 9.9","m7.5 19.794 1-1.733","M9 12h.01"],"stroke":true},
  "voicemail": {"name":"Voicemail","viewBox":[0,0,24,24],"paths":["M 2 12 a 4 4 0 1 0 8 0 a 4 4 0 1 0 -8 0","M 14 12 a 4 4 0 1 0 8 0 a 4 4 0 1 0 -8 0","M 6 16 L 18 16"],"stroke":true},
  "volleyball": {"name":"Volleyball","viewBox":[0,0,24,24],"paths":["M11 7a16 16 20 0 1 10.98 4.362","M12 12a13 13 0 0 1-8.66 5","M16.83 13.634a16 16 0 0 1-9.267 7.328","M20.66 17A13 13 0 0 0 12 12a13 13 0 0 1 0-10","M8.17 15.366a16 16 0 0 1-1.713-11.69","M 2 12 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0"],"stroke":true},
  "volume": {"name":"Volume","viewBox":[0,0,24,24],"paths":["M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"],"stroke":true},
  "volume-1": {"name":"Volume 1","viewBox":[0,0,24,24],"paths":["M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z","M16 9a5 5 0 0 1 0 6"],"stroke":true},
  "volume-2": {"name":"Volume 2","viewBox":[0,0,24,24],"paths":["M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z","M16 9a5 5 0 0 1 0 6","M19.364 18.364a9 9 0 0 0 0-12.728"],"stroke":true},
  "volume-off": {"name":"Volume Off","viewBox":[0,0,24,24],"paths":["M16 9a5 5 0 0 1 .95 2.293","M19.364 5.636a9 9 0 0 1 1.889 9.96","m2 2 20 20","m7 7-.587.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298V11","M9.828 4.172A.686.686 0 0 1 11 4.657v.686"],"stroke":true},
  "volume-x": {"name":"Volume X","viewBox":[0,0,24,24],"paths":["M11 4.702a.7.7 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.7.7 0 0 0 11 19.298z","m16.5 14.5 5-5","m16.5 9.5 5 5"],"stroke":true},
  "vote": {"name":"Vote","viewBox":[0,0,24,24],"paths":["m9 12 2 2 4-4","M5 7c0-1.1.9-2 2-2h10a2 2 0 0 1 2 2v12H5V7Z","M22 19H2"],"stroke":true},
  "wallet": {"name":"Wallet","viewBox":[0,0,24,24],"paths":["M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1","M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"],"stroke":true},
  "wallet-2": {"name":"Wallet 2","viewBox":[0,0,24,24],"paths":["M17 14h.01","M7 7h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14"],"stroke":true},
  "wallet-cards": {"name":"Wallet Cards","viewBox":[0,0,24,24],"paths":["M3 11h3.75a2 2 0 0 1 1.6.8l.45.6a4 4 0 0 0 6.4 0l.45-.6a2 2 0 0 1 1.6-.8H21","M3 7h18","M 3 3 h 18 v 18 h -18 z"],"stroke":true},
  "wallet-minimal": {"name":"Wallet Minimal","viewBox":[0,0,24,24],"paths":["M17 14h.01","M7 7h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14"],"stroke":true},
  "wallpaper": {"name":"Wallpaper","viewBox":[0,0,24,24],"paths":["M12 17v4","M8 21h8","m9 17 6.1-6.1a2 2 0 0 1 2.81.01L22 15","M 6 9 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0","M 2 3 h 20 v 14 h -20 z"],"stroke":true},
  "wand": {"name":"Wand","viewBox":[0,0,24,24],"paths":["M15 4V2","M15 16v-2","M8 9h2","M20 9h2","M17.8 11.8 19 13","M15 9h.01","M17.8 6.2 19 5","m3 21 9-9","M12.2 6.2 11 5"],"stroke":true},
  "wand-2": {"name":"Wand 2","viewBox":[0,0,24,24],"paths":["m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72","m14 7 3 3","M5 6v4","M19 14v4","M10 2v2","M7 8H3","M21 16h-4","M11 3H9"],"stroke":true},
  "wand-sparkles": {"name":"Wand Sparkles","viewBox":[0,0,24,24],"paths":["m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72","m14 7 3 3","M5 6v4","M19 14v4","M10 2v2","M7 8H3","M21 16h-4","M11 3H9"],"stroke":true},
  "warehouse": {"name":"Warehouse","viewBox":[0,0,24,24],"paths":["M18 21V10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v11","M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 1.132-1.803l7.95-3.974a2 2 0 0 1 1.837 0l7.948 3.974A2 2 0 0 1 22 8z","M6 13h12","M6 17h12"],"stroke":true},
  "washing-machine": {"name":"Washing Machine","viewBox":[0,0,24,24],"paths":["M3 6h3","M17 6h.01","M 3 2 h 18 v 20 h -18 z","M 7 13 a 5 5 0 1 0 10 0 a 5 5 0 1 0 -10 0","M12 18a2.5 2.5 0 0 0 0-5 2.5 2.5 0 0 1 0-5"],"stroke":true},
  "watch": {"name":"Watch","viewBox":[0,0,24,24],"paths":["M12 10v2.2l1.6 1","m16.13 7.66-.81-4.05a2 2 0 0 0-2-1.61h-2.68a2 2 0 0 0-2 1.61l-.78 4.05","m7.88 16.36.8 4a2 2 0 0 0 2 1.61h2.72a2 2 0 0 0 2-1.61l.81-4.05","M 6 12 a 6 6 0 1 0 12 0 a 6 6 0 1 0 -12 0"],"stroke":true},
  "waves": {"name":"Waves","viewBox":[0,0,24,24],"paths":["M2 12q2.5 2 5 0t5 0 5 0 5 0","M2 19q2.5 2 5 0t5 0 5 0 5 0","M2 5q2.5 2 5 0t5 0 5 0 5 0"],"stroke":true},
  "waves-arrow-down": {"name":"Waves Arrow Down","viewBox":[0,0,24,24],"paths":["M12 10L12 2","M16 6L12 10L8 6","M2 15C2.6 15.5 3.2 16 4.5 16C7 16 7 14 9.5 14C12.1 14 11.9 16 14.5 16C17 16 17 14 19.5 14C20.8 14 21.4 14.5 22 15","M2 21C2.6 21.5 3.2 22 4.5 22C7 22 7 20 9.5 20C12.1 20 11.9 22 14.5 22C17 22 17 20 19.5 20C20.8 20 21.4 20.5 22 21"],"stroke":true},
  "waves-arrow-up": {"name":"Waves Arrow Up","viewBox":[0,0,24,24],"paths":["M12 2v8","M2 15c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1","M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1","m8 6 4-4 4 4"],"stroke":true},
  "waves-horizontal": {"name":"Waves Horizontal","viewBox":[0,0,24,24],"paths":["M2 12q2.5 2 5 0t5 0 5 0 5 0","M2 19q2.5 2 5 0t5 0 5 0 5 0","M2 5q2.5 2 5 0t5 0 5 0 5 0"],"stroke":true},
  "waves-ladder": {"name":"Waves Ladder","viewBox":[0,0,24,24],"paths":["M19 5a2 2 0 0 0-2 2v11","M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1","M7 13h10","M7 9h10","M9 5a2 2 0 0 0-2 2v11"],"stroke":true},
  "waves-vertical": {"name":"Waves Vertical","viewBox":[0,0,24,24],"paths":["M12 2q2 2.5 0 5t0 5 0 5 0 5","M19 2q2 2.5 0 5t0 5 0 5 0 5","M5 2q2 2.5 0 5t0 5 0 5 0 5"],"stroke":true},
  "waypoints": {"name":"Waypoints","viewBox":[0,0,24,24],"paths":["m10.586 5.414-5.172 5.172","m18.586 13.414-5.172 5.172","M6 12h12","M 10 20 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0","M 10 4 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0","M 18 12 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0","M 2 12 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0"],"stroke":true},
  "webcam": {"name":"Webcam","viewBox":[0,0,24,24],"paths":["M 4 10 a 8 8 0 1 0 16 0 a 8 8 0 1 0 -16 0","M 9 10 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0","M7 22h10","M12 22v-4"],"stroke":true},
  "webcam-off": {"name":"Webcam Off","viewBox":[0,0,24,24],"paths":["M12 22v-4","M12.754 7.096a3 3 0 0 1 2.15 2.15","M12.863 12.873a3 3 0 0 1-3.736-3.735","M16.566 16.57A8 8 0 0 1 5.43 5.433","m2 2 20 20","M7 22h10","M8.478 2.817a8 8 0 0 1 10.705 10.705"],"stroke":true},
  "webhook": {"name":"Webhook","viewBox":[0,0,24,24],"paths":["M18 16.98h-5.99c-1.1 0-1.95.94-2.48 1.9A4 4 0 0 1 2 17c.01-.7.2-1.4.57-2","m6 17 3.13-5.78c.53-.97.1-2.18-.5-3.1a4 4 0 1 1 6.89-4.06","m12 6 3.13 5.73C15.66 12.7 16.9 13 18 13a4 4 0 0 1 0 8"],"stroke":true},
  "webhook-off": {"name":"Webhook Off","viewBox":[0,0,24,24],"paths":["M17 17h-5c-1.09-.02-1.94.92-2.5 1.9A3 3 0 1 1 2.57 15","M9 3.4a4 4 0 0 1 6.52.66","m6 17 3.1-5.8a2.5 2.5 0 0 0 .057-2.05","M20.3 20.3a4 4 0 0 1-2.3.7","M18.6 13a4 4 0 0 1 3.357 3.414","m12 6 .6 1","m2 2 20 20"],"stroke":true},
  "weee": {"name":"WEEE","viewBox":[0,0,24,24],"stroke":true,"tags":["certification","europe","recycling","descarte","eletronico","lixo"],"paths":["M9 6V4h6v2","M4 6h16","M6 6l1 14h10l1-14","M3 3l18 18"]},
  "weight": {"name":"Weight","viewBox":[0,0,24,24],"paths":["M 9 5 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0","M6.5 8a2 2 0 0 0-1.905 1.46L2.1 18.5A2 2 0 0 0 4 21h16a2 2 0 0 0 1.925-2.54L19.4 9.5A2 2 0 0 0 17.48 8Z"],"stroke":true},
  "weight-tilde": {"name":"Weight Tilde","viewBox":[0,0,24,24],"paths":["M6.5 8a2 2 0 0 0-1.906 1.46L2.1 18.5A2 2 0 0 0 4 21h16a2 2 0 0 0 1.925-2.54L19.4 9.5A2 2 0 0 0 17.48 8z","M7.999 15a2.5 2.5 0 0 1 4 0 2.5 2.5 0 0 0 4 0","M 9 5 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0"],"stroke":true},
  "wheat": {"name":"Wheat","viewBox":[0,0,24,24],"paths":["M2 22 16 8","M3.47 12.53 5 11l1.53 1.53a3.5 3.5 0 0 1 0 4.94L5 19l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z","M7.47 8.53 9 7l1.53 1.53a3.5 3.5 0 0 1 0 4.94L9 15l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z","M11.47 4.53 13 3l1.53 1.53a3.5 3.5 0 0 1 0 4.94L13 11l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z","M20 2h2v2a4 4 0 0 1-4 4h-2V6a4 4 0 0 1 4-4Z","M11.47 17.47 13 19l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L5 19l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z","M15.47 13.47 17 15l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L9 15l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z","M19.47 9.47 21 11l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L13 11l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z"],"stroke":true},
  "wheat-off": {"name":"Wheat Off","viewBox":[0,0,24,24],"paths":["m2 22 10-10","m16 8-1.17 1.17","M3.47 12.53 5 11l1.53 1.53a3.5 3.5 0 0 1 0 4.94L5 19l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z","m8 8-.53.53a3.5 3.5 0 0 0 0 4.94L9 15l1.53-1.53c.55-.55.88-1.25.98-1.97","M10.91 5.26c.15-.26.34-.51.56-.73L13 3l1.53 1.53a3.5 3.5 0 0 1 .28 4.62","M20 2h2v2a4 4 0 0 1-4 4h-2V6a4 4 0 0 1 4-4Z","M11.47 17.47 13 19l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L5 19l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z","m16 16-.53.53a3.5 3.5 0 0 1-4.94 0L9 15l1.53-1.53a3.49 3.49 0 0 1 1.97-.98","M18.74 13.09c.26-.15.51-.34.73-.56L21 11l-1.53-1.53a3.5 3.5 0 0 0-4.62-.28","M 2 2 L 22 22"],"stroke":true},
  "whistle": {"name":"Whistle","viewBox":[0,0,24,24],"paths":["M10 6v4","M21 6a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-5.675A7 7 0 1 1 9 6z"],"stroke":true},
  "whole-word": {"name":"Whole Word","viewBox":[0,0,24,24],"paths":["M 4 12 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0","M10 9v6","M 14 12 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0","M14 7v8","M22 17v1c0 .5-.5 1-1 1H3c-.5 0-1-.5-1-1v-1"],"stroke":true},
  "wifi": {"name":"Wifi","viewBox":[0,0,24,24],"paths":["M12 20h.01","M2 8.82a15 15 0 0 1 20 0","M5 12.859a10 10 0 0 1 14 0","M8.5 16.429a5 5 0 0 1 7 0"],"stroke":true},
  "wifi-cog": {"name":"Wifi Cog","viewBox":[0,0,24,24],"paths":["m14.305 19.53.923-.382","m15.228 16.852-.923-.383","m16.852 15.228-.383-.923","m16.852 20.772-.383.924","m19.148 15.228.383-.923","m19.53 21.696-.382-.924","M2 8.82a15 15 0 0120 0","m20.772 16.852.924-.383","m20.772 19.148.924.383","M5 12.859a10 10 0 0110.18-2.342","M8.5 16.429a5 5 0 011.998-1.2","M 15 18 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0"],"stroke":true},
  "wifi-high": {"name":"Wifi High","viewBox":[0,0,24,24],"paths":["M12 20h.01","M5 12.859a10 10 0 0 1 14 0","M8.5 16.429a5 5 0 0 1 7 0"],"stroke":true},
  "wifi-lock": {"name":"Wifi Lock","viewBox":[0,0,24,24],"paths":["M2 8.82a15 15 0 0120 0","M20 16v-2a2 2 0 00-4 0v2","M5 12.859a10 10 0 018.436-2.756","M8.5 16.429a5 5 0 011.794-1.13","M 14 16 h 8 v 5 h -8 z"],"stroke":true},
  "wifi-low": {"name":"Wifi Low","viewBox":[0,0,24,24],"paths":["M12 20h.01","M8.5 16.429a5 5 0 0 1 7 0"],"stroke":true},
  "wifi-off": {"name":"Wifi Off","viewBox":[0,0,24,24],"paths":["M12 20h.01","M8.5 16.429a5 5 0 0 1 7 0","M5 12.859a10 10 0 0 1 5.17-2.69","M19 12.859a10 10 0 0 0-2.007-1.523","M2 8.82a15 15 0 0 1 4.177-2.643","M22 8.82a15 15 0 0 0-11.288-3.764","m2 2 20 20"],"stroke":true},
  "wifi-pen": {"name":"Wifi Pen","viewBox":[0,0,24,24],"paths":["M2 8.82a15 15 0 0 1 20 0","M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z","M5 12.859a10 10 0 0 1 10.5-2.222","M8.5 16.429a5 5 0 0 1 3-1.406"],"stroke":true},
  "wifi-sync": {"name":"Wifi Sync","viewBox":[0,0,24,24],"paths":["M11.965 10.105v4L13.5 12.5a5 5 0 0 1 8 1.5","M11.965 14.105h4","M17.965 18.105h4L20.43 19.71a5 5 0 0 1-8-1.5","M2 8.82a15 15 0 0 1 20 0","M21.965 22.105v-4","M5 12.86a10 10 0 0 1 3-2.032","M8.5 16.429h.01"],"stroke":true},
  "wifi-zero": {"name":"Wifi Zero","viewBox":[0,0,24,24],"paths":["M12 20h.01"],"stroke":true},
  "wind": {"name":"Wind","viewBox":[0,0,24,24],"paths":["M12.8 19.6A2 2 0 1 0 14 16H2","M17.5 8a2.5 2.5 0 1 1 2 4H2","M9.8 4.4A2 2 0 1 1 11 8H2"],"stroke":true},
  "wind-arrow-down": {"name":"Wind Arrow Down","viewBox":[0,0,24,24],"paths":["M10 2v8","M12.8 21.6A2 2 0 1 0 14 18H2","M17.5 10a2.5 2.5 0 1 1 2 4H2","m6 6 4 4 4-4"],"stroke":true},
  "wind-arrow-up": {"name":"Wind Arrow Up","viewBox":[0,0,24,24],"paths":["M10 2v8","M12.8 21.6A2 2 0 1 0 14 18H2","M17.5 10a2.5 2.5 0 1 1 2 4H2","m6 6 4 -4 4 4"],"stroke":true},
  "wine": {"name":"Wine","viewBox":[0,0,24,24],"paths":["M8 22h8","M7 10h10","M12 15v7","M12 15a5 5 0 0 0 5-5c0-2-.5-4-2-8H9c-1.5 4-2 6-2 8a5 5 0 0 0 5 5Z"],"stroke":true},
  "wine-off": {"name":"Wine Off","viewBox":[0,0,24,24],"paths":["M8 22h8","M7 10h3m7 0h-1.343","M12 15v7","M7.307 7.307A12.33 12.33 0 0 0 7 10a5 5 0 0 0 7.391 4.391M8.638 2.981C8.75 2.668 8.872 2.34 9 2h6c1.5 4 2 6 2 8 0 .407-.05.809-.145 1.198","M 2 2 L 22 22"],"stroke":true},
  "workflow": {"name":"Workflow","viewBox":[0,0,24,24],"paths":["M 3 3 h 8 v 8 h -8 z","M7 11v4a2 2 0 0 0 2 2h4","M 13 13 h 8 v 8 h -8 z"],"stroke":true},
  "worm": {"name":"Worm","viewBox":[0,0,24,24],"paths":["m19 12-1.5 3","M19.63 18.81 22 20","M6.47 8.23a1.68 1.68 0 0 1 2.44 1.93l-.64 2.08a6.76 6.76 0 0 0 10.16 7.67l.42-.27a1 1 0 1 0-2.73-4.21l-.42.27a1.76 1.76 0 0 1-2.63-1.99l.64-2.08A6.66 6.66 0 0 0 3.94 3.9l-.7.4a1 1 0 1 0 2.55 4.34z"],"stroke":true},
  "wrap-text": {"name":"Wrap Text","viewBox":[0,0,24,24],"paths":["m16 16-3 3 3 3","M3 12h14.5a1 1 0 0 1 0 7H13","M3 19h6","M3 5h18"],"stroke":true},
  "wrench": {"name":"Wrench","viewBox":[0,0,24,24],"paths":["M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-8.259 7.057l-7.91 7.91a1 1 0 0 1-2.999-3l7.91-7.91a6 6 0 0 1 7.057-8.259c.438.12.54.662.219.984z"],"stroke":true},
  "wrench-off": {"name":"Wrench Off","viewBox":[0,0,24,24],"paths":["M10.747 5.093a6 6 0 0 1 6.841-2.882c.438.12.54.662.219.984L14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-2.882 6.842","m13.5 13.5-7.88 7.88a1 1 0 0 1-2.999-3l7.88-7.88","m2 2 20 20"],"stroke":true},
  "x": {"name":"X","viewBox":[0,0,24,24],"paths":["M18 6 6 18","m6 6 12 12"],"stroke":true},
  "x-circle": {"name":"X Circle","viewBox":[0,0,24,24],"paths":["M 2 12 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0","m15 9-6 6","m9 9 6 6"],"stroke":true},
  "x-line-top": {"name":"X Line Top","viewBox":[0,0,24,24],"paths":["M18 4H6","M18 8 6 20","m6 8 12 12"],"stroke":true},
  "x-octagon": {"name":"X Octagon","viewBox":[0,0,24,24],"paths":["m15 9-6 6","M2.586 16.726A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2h6.624a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586z","m9 9 6 6"],"stroke":true},
  "x-square": {"name":"X Square","viewBox":[0,0,24,24],"paths":["M 3 3 h 18 v 18 h -18 z","m15 9-6 6","m9 9 6 6"],"stroke":true},
  "zap": {"name":"Zap","viewBox":[0,0,24,24],"paths":["M15.914 4a1.5 1.5 0 00-2.474-1.561l-9 9A1.5 1.5 0 005.5 14h4.002a.5.5 0 01.471.666L8.086 20a1.5 1.5 0 002.475 1.56l9-9A1.5 1.5 0 0018.5 10h-3.997a.5.5 0 01-.472-.667z"],"stroke":true},
  "zap-off": {"name":"Zap Off","viewBox":[0,0,24,24],"paths":["M10.768 5.111 13.44 2.44a1.5 1.5 0 012.474 1.561l-1.633 4.625","m18.889 13.232.672-.672A1.5 1.5 0 0018.5 10h-2.844","m2 2 20 20","m7.94 7.94-3.5 3.499A1.5 1.5 0 005.5 14h4.002a.5.5 0 01.471.666L8.086 20a1.5 1.5 0 002.475 1.56l5.5-5.5"],"stroke":true},
  "zodiac-aquarius": {"name":"Zodiac Aquarius","viewBox":[0,0,24,24],"paths":["m2 10 2.456-3.684a.7.7 0 0 1 1.106-.013l2.39 3.413a.7.7 0 0 0 1.096-.001l2.402-3.432a.7.7 0 0 1 1.098 0l2.402 3.432a.7.7 0 0 0 1.098 0l2.389-3.413a.7.7 0 0 1 1.106.013L22 10","m2 18.002 2.456-3.684a.7.7 0 0 1 1.106-.013l2.39 3.413a.7.7 0 0 0 1.097 0l2.402-3.432a.7.7 0 0 1 1.098 0l2.402 3.432a.7.7 0 0 0 1.098 0l2.389-3.413a.7.7 0 0 1 1.106.013L22 18.002"],"stroke":true},
  "zodiac-aries": {"name":"Zodiac Aries","viewBox":[0,0,24,24],"paths":["M12 7.5a4.5 4.5 0 1 1 5 4.5","M7 12a4.5 4.5 0 1 1 5-4.5V21"],"stroke":true},
  "zodiac-cancer": {"name":"Zodiac Cancer","viewBox":[0,0,24,24],"paths":["M21 14.5A9 6.5 0 0 1 5.5 19","M3 9.5A9 6.5 0 0 1 18.5 5","M 14 14.5 a 3.5 3.5 0 1 0 7 0 a 3.5 3.5 0 1 0 -7 0","M 3 9.5 a 3.5 3.5 0 1 0 7 0 a 3.5 3.5 0 1 0 -7 0"],"stroke":true},
  "zodiac-capricorn": {"name":"Zodiac Capricorn","viewBox":[0,0,24,24],"paths":["M11 21a3 3 0 0 0 3-3V6.5a1 1 0 0 0-7 0","M7 19V6a3 3 0 0 0-3-3h0","M 14 17 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0"],"stroke":true},
  "zodiac-gemini": {"name":"Zodiac Gemini","viewBox":[0,0,24,24],"paths":["M16 4.525v14.948","M20 3A17 17 0 0 1 4 3","M4 21a17 17 0 0 1 16 0","M8 4.525v14.948"],"stroke":true},
  "zodiac-leo": {"name":"Zodiac Leo","viewBox":[0,0,24,24],"paths":["M10 16c0-4-3-4.5-3-8a5 5 0 0 1 10 0c0 3.466-3 6.196-3 10a3 3 0 0 0 6 0","M 4 16 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0"],"stroke":true},
  "zodiac-libra": {"name":"Zodiac Libra","viewBox":[0,0,24,24],"paths":["M3 16h6.857c.162-.012.19-.323.038-.38a6 6 0 1 1 4.212 0c-.153.057-.125.368.038.38H21","M3 20h18"],"stroke":true},
  "zodiac-ophiuchus": {"name":"Zodiac Ophiuchus","viewBox":[0,0,24,24],"paths":["M3 10A6.06 6.06 0 0 1 12 10 A6.06 6.06 0 0 0 21 10","M6 3v12a6 6 0 0 0 12 0V3"],"stroke":true},
  "zodiac-pisces": {"name":"Zodiac Pisces","viewBox":[0,0,24,24],"paths":["M19 21a15 15 0 0 1 0-18","M20 12H4","M5 3a15 15 0 0 1 0 18"],"stroke":true},
  "zodiac-sagittarius": {"name":"Zodiac Sagittarius","viewBox":[0,0,24,24],"paths":["M15 3h6v6","M21 3 3 21","m9 9 6 6"],"stroke":true},
  "zodiac-scorpio": {"name":"Zodiac Scorpio","viewBox":[0,0,24,24],"paths":["M10 19V5.5a1 1 0 0 1 5 0V17a2 2 0 0 0 2 2h5l-3-3","m22 19-3 3","M5 19V5.5a1 1 0 0 1 5 0","M5 5.5A2.5 2.5 0 0 0 2.5 3"],"stroke":true},
  "zodiac-taurus": {"name":"Zodiac Taurus","viewBox":[0,0,24,24],"paths":["M 6 15 a 6 6 0 1 0 12 0 a 6 6 0 1 0 -12 0","M18 3A6 6 0 0 1 6 3"],"stroke":true},
  "zodiac-virgo": {"name":"Zodiac Virgo","viewBox":[0,0,24,24],"paths":["M11 5.5a1 1 0 0 1 5 0V16a5 5 0 0 0 5 5","M16 11.5a1 1 0 0 1 5 0V16a5 5 0 0 1-5 5","M6 19V6a3 3 0 0 0-3-3h0","M6 5.5a1 1 0 0 1 5 0V19"],"stroke":true},
  "zoom-in": {"name":"Zoom In","viewBox":[0,0,24,24],"paths":["M 3 11 a 8 8 0 1 0 16 0 a 8 8 0 1 0 -16 0","M 21 21 L 16.65 16.65","M 11 8 L 11 14","M 8 11 L 14 11"],"stroke":true},
  "zoom-out": {"name":"Zoom Out","viewBox":[0,0,24,24],"paths":["M 3 11 a 8 8 0 1 0 16 0 a 8 8 0 1 0 -16 0","M 21 21 L 16.65 16.65","M 8 11 L 14 11"],"stroke":true}
};

// Índice invertido: token → chaves. Gerado em build time para busca O(tokens) em vez de O(22k).
export const ICON_TOKEN_INDEX: Record<string, string[]> = {
  "a-arrow-down": [
    "a-arrow-down"
  ],
  "a arrow down": [
    "a-arrow-down"
  ],
  "a-arrow-up": [
    "a-arrow-up"
  ],
  "a arrow up": [
    "a-arrow-up"
  ],
  "a-large-small": [
    "a-large-small"
  ],
  "a large small": [
    "a-large-small"
  ],
  "accessibility": [
    "accessibility"
  ],
  "activity": [
    "activity"
  ],
  "activity-square": [
    "activity-square"
  ],
  "activity square": [
    "activity-square"
  ],
  "ad": [
    "ad"
  ],
  "air-vent": [
    "air-vent"
  ],
  "air vent": [
    "air-vent"
  ],
  "airplay": [
    "airplay"
  ],
  "alarm-check": [
    "alarm-check"
  ],
  "alarm check": [
    "alarm-check"
  ],
  "alarm-clock": [
    "alarm-clock"
  ],
  "alarm clock": [
    "alarm-clock"
  ],
  "alarm-clock-check": [
    "alarm-clock-check"
  ],
  "alarm clock check": [
    "alarm-clock-check"
  ],
  "alarm-clock-minus": [
    "alarm-clock-minus"
  ],
  "alarm clock minus": [
    "alarm-clock-minus"
  ],
  "alarm-clock-off": [
    "alarm-clock-off"
  ],
  "alarm clock off": [
    "alarm-clock-off"
  ],
  "alarm-clock-plus": [
    "alarm-clock-plus"
  ],
  "alarm clock plus": [
    "alarm-clock-plus"
  ],
  "alarm-minus": [
    "alarm-minus"
  ],
  "alarm minus": [
    "alarm-minus"
  ],
  "alarm-plus": [
    "alarm-plus"
  ],
  "alarm plus": [
    "alarm-plus"
  ],
  "alarm-smoke": [
    "alarm-smoke"
  ],
  "alarm smoke": [
    "alarm-smoke"
  ],
  "album": [
    "album"
  ],
  "alert-circle": [
    "alert-circle"
  ],
  "alert circle": [
    "alert-circle"
  ],
  "alert-octagon": [
    "alert-octagon"
  ],
  "alert octagon": [
    "alert-octagon"
  ],
  "alert-triangle": [
    "alert-triangle"
  ],
  "alert triangle": [
    "alert-triangle"
  ],
  "align-center": [
    "align-center"
  ],
  "align center": [
    "align-center"
  ],
  "align-center-horizontal": [
    "align-center-horizontal"
  ],
  "align center horizontal": [
    "align-center-horizontal"
  ],
  "align-center-vertical": [
    "align-center-vertical"
  ],
  "align center vertical": [
    "align-center-vertical"
  ],
  "align-end-horizontal": [
    "align-end-horizontal"
  ],
  "align end horizontal": [
    "align-end-horizontal"
  ],
  "align-end-vertical": [
    "align-end-vertical"
  ],
  "align end vertical": [
    "align-end-vertical"
  ],
  "align-horizontal-distribute-center": [
    "align-horizontal-distribute-center"
  ],
  "align horizontal distribute center": [
    "align-horizontal-distribute-center"
  ],
  "align-horizontal-distribute-end": [
    "align-horizontal-distribute-end"
  ],
  "align horizontal distribute end": [
    "align-horizontal-distribute-end"
  ],
  "align-horizontal-distribute-start": [
    "align-horizontal-distribute-start"
  ],
  "align horizontal distribute start": [
    "align-horizontal-distribute-start"
  ],
  "align-horizontal-justify-center": [
    "align-horizontal-justify-center"
  ],
  "align horizontal justify center": [
    "align-horizontal-justify-center"
  ],
  "align-horizontal-justify-end": [
    "align-horizontal-justify-end"
  ],
  "align horizontal justify end": [
    "align-horizontal-justify-end"
  ],
  "align-horizontal-justify-start": [
    "align-horizontal-justify-start"
  ],
  "align horizontal justify start": [
    "align-horizontal-justify-start"
  ],
  "align-horizontal-space-around": [
    "align-horizontal-space-around"
  ],
  "align horizontal space around": [
    "align-horizontal-space-around"
  ],
  "align-horizontal-space-between": [
    "align-horizontal-space-between"
  ],
  "align horizontal space between": [
    "align-horizontal-space-between"
  ],
  "align-justify": [
    "align-justify"
  ],
  "align justify": [
    "align-justify"
  ],
  "align-left": [
    "align-left"
  ],
  "align left": [
    "align-left"
  ],
  "align-right": [
    "align-right"
  ],
  "align right": [
    "align-right"
  ],
  "align-start-horizontal": [
    "align-start-horizontal"
  ],
  "align start horizontal": [
    "align-start-horizontal"
  ],
  "align-start-vertical": [
    "align-start-vertical"
  ],
  "align start vertical": [
    "align-start-vertical"
  ],
  "align-vertical-distribute-center": [
    "align-vertical-distribute-center"
  ],
  "align vertical distribute center": [
    "align-vertical-distribute-center"
  ],
  "align-vertical-distribute-end": [
    "align-vertical-distribute-end"
  ],
  "align vertical distribute end": [
    "align-vertical-distribute-end"
  ],
  "align-vertical-distribute-start": [
    "align-vertical-distribute-start"
  ],
  "align vertical distribute start": [
    "align-vertical-distribute-start"
  ],
  "align-vertical-justify-center": [
    "align-vertical-justify-center"
  ],
  "align vertical justify center": [
    "align-vertical-justify-center"
  ],
  "align-vertical-justify-end": [
    "align-vertical-justify-end"
  ],
  "align vertical justify end": [
    "align-vertical-justify-end"
  ],
  "align-vertical-justify-start": [
    "align-vertical-justify-start"
  ],
  "align vertical justify start": [
    "align-vertical-justify-start"
  ],
  "align-vertical-space-around": [
    "align-vertical-space-around"
  ],
  "align vertical space around": [
    "align-vertical-space-around"
  ],
  "align-vertical-space-between": [
    "align-vertical-space-between"
  ],
  "align vertical space between": [
    "align-vertical-space-between"
  ],
  "ambulance": [
    "ambulance"
  ],
  "ampersand": [
    "ampersand"
  ],
  "ampersands": [
    "ampersands"
  ],
  "amphora": [
    "amphora"
  ],
  "anchor": [
    "anchor"
  ],
  "angle": [
    "angle"
  ],
  "angry": [
    "angry"
  ],
  "annoyed": [
    "annoyed"
  ],
  "antenna": [
    "antenna"
  ],
  "anvil": [
    "anvil"
  ],
  "aperture": [
    "aperture"
  ],
  "app-window": [
    "app-window"
  ],
  "app window": [
    "app-window"
  ],
  "app-window-mac": [
    "app-window-mac"
  ],
  "app window mac": [
    "app-window-mac"
  ],
  "apple": [
    "apple"
  ],
  "archive": [
    "archive"
  ],
  "archive-restore": [
    "archive-restore"
  ],
  "archive restore": [
    "archive-restore"
  ],
  "archive-x": [
    "archive-x"
  ],
  "archive x": [
    "archive-x"
  ],
  "area-chart": [
    "area-chart"
  ],
  "area chart": [
    "area-chart"
  ],
  "armchair": [
    "armchair"
  ],
  "armenian-dram": [
    "armenian-dram"
  ],
  "armenian dram": [
    "armenian-dram"
  ],
  "arrow-big-down": [
    "arrow-big-down"
  ],
  "arrow big down": [
    "arrow-big-down"
  ],
  "arrow-big-down-dash": [
    "arrow-big-down-dash"
  ],
  "arrow big down dash": [
    "arrow-big-down-dash"
  ],
  "arrow-big-left": [
    "arrow-big-left"
  ],
  "arrow big left": [
    "arrow-big-left"
  ],
  "arrow-big-left-dash": [
    "arrow-big-left-dash"
  ],
  "arrow big left dash": [
    "arrow-big-left-dash"
  ],
  "arrow-big-right": [
    "arrow-big-right"
  ],
  "arrow big right": [
    "arrow-big-right"
  ],
  "arrow-big-right-dash": [
    "arrow-big-right-dash"
  ],
  "arrow big right dash": [
    "arrow-big-right-dash"
  ],
  "arrow-big-up": [
    "arrow-big-up"
  ],
  "arrow big up": [
    "arrow-big-up"
  ],
  "arrow-big-up-dash": [
    "arrow-big-up-dash"
  ],
  "arrow big up dash": [
    "arrow-big-up-dash"
  ],
  "arrow-down": [
    "arrow-down"
  ],
  "arrow down": [
    "arrow-down"
  ],
  "arrow-down-0-1": [
    "arrow-down-0-1"
  ],
  "arrow down 0 1": [
    "arrow-down-0-1"
  ],
  "arrow-down-01": [
    "arrow-down-01"
  ],
  "arrow down 01": [
    "arrow-down-01"
  ],
  "arrow-down-1-0": [
    "arrow-down-1-0"
  ],
  "arrow down 1 0": [
    "arrow-down-1-0"
  ],
  "arrow-down-10": [
    "arrow-down-10"
  ],
  "arrow down 10": [
    "arrow-down-10"
  ],
  "arrow-down-a-z": [
    "arrow-down-a-z"
  ],
  "arrow down a z": [
    "arrow-down-a-z"
  ],
  "arrow-down-az": [
    "arrow-down-az"
  ],
  "arrow down az": [
    "arrow-down-az"
  ],
  "arrow-down-circle": [
    "arrow-down-circle"
  ],
  "arrow down circle": [
    "arrow-down-circle"
  ],
  "arrow-down-from-line": [
    "arrow-down-from-line"
  ],
  "arrow down from line": [
    "arrow-down-from-line"
  ],
  "arrow-down-left": [
    "arrow-down-left"
  ],
  "arrow down left": [
    "arrow-down-left"
  ],
  "arrow-down-left-from-circle": [
    "arrow-down-left-from-circle"
  ],
  "arrow down left from circle": [
    "arrow-down-left-from-circle"
  ],
  "arrow-down-left-from-square": [
    "arrow-down-left-from-square"
  ],
  "arrow down left from square": [
    "arrow-down-left-from-square"
  ],
  "arrow-down-left-square": [
    "arrow-down-left-square"
  ],
  "arrow down left square": [
    "arrow-down-left-square"
  ],
  "arrow-down-narrow-wide": [
    "arrow-down-narrow-wide"
  ],
  "arrow down narrow wide": [
    "arrow-down-narrow-wide"
  ],
  "arrow-down-right": [
    "arrow-down-right"
  ],
  "arrow down right": [
    "arrow-down-right"
  ],
  "arrow-down-right-from-circle": [
    "arrow-down-right-from-circle"
  ],
  "arrow down right from circle": [
    "arrow-down-right-from-circle"
  ],
  "arrow-down-right-from-square": [
    "arrow-down-right-from-square"
  ],
  "arrow down right from square": [
    "arrow-down-right-from-square"
  ],
  "arrow-down-right-square": [
    "arrow-down-right-square"
  ],
  "arrow down right square": [
    "arrow-down-right-square"
  ],
  "arrow-down-square": [
    "arrow-down-square"
  ],
  "arrow down square": [
    "arrow-down-square"
  ],
  "arrow-down-to-dot": [
    "arrow-down-to-dot"
  ],
  "arrow down to dot": [
    "arrow-down-to-dot"
  ],
  "arrow-down-to-line": [
    "arrow-down-to-line"
  ],
  "arrow down to line": [
    "arrow-down-to-line"
  ],
  "arrow-down-up": [
    "arrow-down-up"
  ],
  "arrow down up": [
    "arrow-down-up"
  ],
  "arrow-down-wide-narrow": [
    "arrow-down-wide-narrow"
  ],
  "arrow down wide narrow": [
    "arrow-down-wide-narrow"
  ],
  "arrow-down-z-a": [
    "arrow-down-z-a"
  ],
  "arrow down z a": [
    "arrow-down-z-a"
  ],
  "arrow-down-za": [
    "arrow-down-za"
  ],
  "arrow down za": [
    "arrow-down-za"
  ],
  "arrow-left": [
    "arrow-left"
  ],
  "arrow left": [
    "arrow-left"
  ],
  "arrow-left-circle": [
    "arrow-left-circle"
  ],
  "arrow left circle": [
    "arrow-left-circle"
  ],
  "arrow-left-from-line": [
    "arrow-left-from-line"
  ],
  "arrow left from line": [
    "arrow-left-from-line"
  ],
  "arrow-left-right": [
    "arrow-left-right"
  ],
  "arrow left right": [
    "arrow-left-right"
  ],
  "arrow-left-square": [
    "arrow-left-square"
  ],
  "arrow left square": [
    "arrow-left-square"
  ],
  "arrow-left-to-line": [
    "arrow-left-to-line"
  ],
  "arrow left to line": [
    "arrow-left-to-line"
  ],
  "arrow-right": [
    "arrow-right"
  ],
  "arrow right": [
    "arrow-right"
  ],
  "arrow-right-circle": [
    "arrow-right-circle"
  ],
  "arrow right circle": [
    "arrow-right-circle"
  ],
  "arrow-right-from-line": [
    "arrow-right-from-line"
  ],
  "arrow right from line": [
    "arrow-right-from-line"
  ],
  "arrow-right-left": [
    "arrow-right-left"
  ],
  "arrow right left": [
    "arrow-right-left"
  ],
  "arrow-right-square": [
    "arrow-right-square"
  ],
  "arrow right square": [
    "arrow-right-square"
  ],
  "arrow-right-to-line": [
    "arrow-right-to-line"
  ],
  "arrow right to line": [
    "arrow-right-to-line"
  ],
  "arrow-up": [
    "arrow-up"
  ],
  "arrow up": [
    "arrow-up"
  ],
  "arrow-up-0-1": [
    "arrow-up-0-1"
  ],
  "arrow up 0 1": [
    "arrow-up-0-1"
  ],
  "arrow-up-01": [
    "arrow-up-01"
  ],
  "arrow up 01": [
    "arrow-up-01"
  ],
  "arrow-up-1-0": [
    "arrow-up-1-0"
  ],
  "arrow up 1 0": [
    "arrow-up-1-0"
  ],
  "arrow-up-10": [
    "arrow-up-10"
  ],
  "arrow up 10": [
    "arrow-up-10"
  ],
  "arrow-up-a-z": [
    "arrow-up-a-z"
  ],
  "arrow up a z": [
    "arrow-up-a-z"
  ],
  "arrow-up-az": [
    "arrow-up-az"
  ],
  "arrow up az": [
    "arrow-up-az"
  ],
  "arrow-up-circle": [
    "arrow-up-circle"
  ],
  "arrow up circle": [
    "arrow-up-circle"
  ],
  "arrow-up-down": [
    "arrow-up-down"
  ],
  "arrow up down": [
    "arrow-up-down"
  ],
  "arrow-up-from-dot": [
    "arrow-up-from-dot"
  ],
  "arrow up from dot": [
    "arrow-up-from-dot"
  ],
  "arrow-up-from-line": [
    "arrow-up-from-line"
  ],
  "arrow up from line": [
    "arrow-up-from-line"
  ],
  "arrow-up-left": [
    "arrow-up-left"
  ],
  "arrow up left": [
    "arrow-up-left"
  ],
  "arrow-up-left-from-circle": [
    "arrow-up-left-from-circle"
  ],
  "arrow up left from circle": [
    "arrow-up-left-from-circle"
  ],
  "arrow-up-left-from-square": [
    "arrow-up-left-from-square"
  ],
  "arrow up left from square": [
    "arrow-up-left-from-square"
  ],
  "arrow-up-left-square": [
    "arrow-up-left-square"
  ],
  "arrow up left square": [
    "arrow-up-left-square"
  ],
  "arrow-up-narrow-wide": [
    "arrow-up-narrow-wide"
  ],
  "arrow up narrow wide": [
    "arrow-up-narrow-wide"
  ],
  "arrow-up-right": [
    "arrow-up-right"
  ],
  "arrow up right": [
    "arrow-up-right"
  ],
  "arrow-up-right-from-circle": [
    "arrow-up-right-from-circle"
  ],
  "arrow up right from circle": [
    "arrow-up-right-from-circle"
  ],
  "arrow-up-right-from-square": [
    "arrow-up-right-from-square"
  ],
  "arrow up right from square": [
    "arrow-up-right-from-square"
  ],
  "arrow-up-right-square": [
    "arrow-up-right-square"
  ],
  "arrow up right square": [
    "arrow-up-right-square"
  ],
  "arrow-up-square": [
    "arrow-up-square"
  ],
  "arrow up square": [
    "arrow-up-square"
  ],
  "arrow-up-to-line": [
    "arrow-up-to-line"
  ],
  "arrow up to line": [
    "arrow-up-to-line"
  ],
  "arrow-up-wide-narrow": [
    "arrow-up-wide-narrow"
  ],
  "arrow up wide narrow": [
    "arrow-up-wide-narrow"
  ],
  "arrow-up-z-a": [
    "arrow-up-z-a"
  ],
  "arrow up z a": [
    "arrow-up-z-a"
  ],
  "arrow-up-za": [
    "arrow-up-za"
  ],
  "arrow up za": [
    "arrow-up-za"
  ],
  "arrows-up-from-line": [
    "arrows-up-from-line"
  ],
  "arrows up from line": [
    "arrows-up-from-line"
  ],
  "asterisk": [
    "asterisk"
  ],
  "asterisk-square": [
    "asterisk-square"
  ],
  "asterisk square": [
    "asterisk-square"
  ],
  "astroid": [
    "astroid"
  ],
  "at-sign": [
    "at-sign"
  ],
  "at sign": [
    "at-sign"
  ],
  "atom": [
    "atom"
  ],
  "audio-lines": [
    "audio-lines"
  ],
  "audio lines": [
    "audio-lines"
  ],
  "audio-lines-off": [
    "audio-lines-off"
  ],
  "audio lines off": [
    "audio-lines-off"
  ],
  "audio-lines-x": [
    "audio-lines-x"
  ],
  "audio lines x": [
    "audio-lines-x"
  ],
  "audio-waveform": [
    "audio-waveform"
  ],
  "audio waveform": [
    "audio-waveform"
  ],
  "award": [
    "award"
  ],
  "axe": [
    "axe"
  ],
  "axis-3-d": [
    "axis-3-d"
  ],
  "axis 3 d": [
    "axis-3-d"
  ],
  "axis-3d": [
    "axis-3d"
  ],
  "axis 3d": [
    "axis-3d"
  ],
  "baby": [
    "baby"
  ],
  "backpack": [
    "backpack"
  ],
  "badge": [
    "badge"
  ],
  "badge-alert": [
    "badge-alert"
  ],
  "badge alert": [
    "badge-alert"
  ],
  "badge-cent": [
    "badge-cent"
  ],
  "badge cent": [
    "badge-cent"
  ],
  "badge-check": [
    "badge-check"
  ],
  "badge check": [
    "badge-check"
  ],
  "badge-dollar-sign": [
    "badge-dollar-sign"
  ],
  "badge dollar sign": [
    "badge-dollar-sign"
  ],
  "badge-euro": [
    "badge-euro"
  ],
  "badge euro": [
    "badge-euro"
  ],
  "badge-help": [
    "badge-help"
  ],
  "badge help": [
    "badge-help"
  ],
  "badge-indian-rupee": [
    "badge-indian-rupee"
  ],
  "badge indian rupee": [
    "badge-indian-rupee"
  ],
  "badge-info": [
    "badge-info"
  ],
  "badge info": [
    "badge-info"
  ],
  "badge-japanese-yen": [
    "badge-japanese-yen"
  ],
  "badge japanese yen": [
    "badge-japanese-yen"
  ],
  "badge-minus": [
    "badge-minus"
  ],
  "badge minus": [
    "badge-minus"
  ],
  "badge-percent": [
    "badge-percent"
  ],
  "badge percent": [
    "badge-percent"
  ],
  "badge-plus": [
    "badge-plus"
  ],
  "badge plus": [
    "badge-plus"
  ],
  "badge-pound-sterling": [
    "badge-pound-sterling"
  ],
  "badge pound sterling": [
    "badge-pound-sterling"
  ],
  "badge-question-mark": [
    "badge-question-mark"
  ],
  "badge question mark": [
    "badge-question-mark"
  ],
  "badge-russian-ruble": [
    "badge-russian-ruble"
  ],
  "badge russian ruble": [
    "badge-russian-ruble"
  ],
  "badge-swiss-franc": [
    "badge-swiss-franc"
  ],
  "badge swiss franc": [
    "badge-swiss-franc"
  ],
  "badge-turkish-lira": [
    "badge-turkish-lira"
  ],
  "badge turkish lira": [
    "badge-turkish-lira"
  ],
  "badge-x": [
    "badge-x"
  ],
  "badge x": [
    "badge-x"
  ],
  "baggage-claim": [
    "baggage-claim"
  ],
  "baggage claim": [
    "baggage-claim"
  ],
  "balloon": [
    "balloon"
  ],
  "ban": [
    "ban"
  ],
  "banana": [
    "banana"
  ],
  "bandage": [
    "bandage"
  ],
  "bangladeshi-taka": [
    "bangladeshi-taka"
  ],
  "bangladeshi taka": [
    "bangladeshi-taka"
  ],
  "banknote": [
    "banknote"
  ],
  "banknote-arrow-down": [
    "banknote-arrow-down"
  ],
  "banknote arrow down": [
    "banknote-arrow-down"
  ],
  "banknote-arrow-up": [
    "banknote-arrow-up"
  ],
  "banknote arrow up": [
    "banknote-arrow-up"
  ],
  "banknote-check": [
    "banknote-check"
  ],
  "banknote check": [
    "banknote-check"
  ],
  "banknote-x": [
    "banknote-x"
  ],
  "banknote x": [
    "banknote-x"
  ],
  "bar-chart": [
    "bar-chart"
  ],
  "bar chart": [
    "bar-chart"
  ],
  "bar-chart-2": [
    "bar-chart-2"
  ],
  "bar chart 2": [
    "bar-chart-2"
  ],
  "bar-chart-3": [
    "bar-chart-3"
  ],
  "bar chart 3": [
    "bar-chart-3"
  ],
  "bar-chart-4": [
    "bar-chart-4"
  ],
  "bar chart 4": [
    "bar-chart-4"
  ],
  "bar-chart-big": [
    "bar-chart-big"
  ],
  "bar chart big": [
    "bar-chart-big"
  ],
  "bar-chart-horizontal": [
    "bar-chart-horizontal"
  ],
  "bar chart horizontal": [
    "bar-chart-horizontal"
  ],
  "bar-chart-horizontal-big": [
    "bar-chart-horizontal-big"
  ],
  "bar chart horizontal big": [
    "bar-chart-horizontal-big"
  ],
  "barcode": [
    "barcode"
  ],
  "barrel": [
    "barrel"
  ],
  "baseline": [
    "baseline"
  ],
  "bath": [
    "bath"
  ],
  "battery": [
    "battery"
  ],
  "battery-charging": [
    "battery-charging"
  ],
  "battery charging": [
    "battery-charging"
  ],
  "battery-full": [
    "battery-full"
  ],
  "battery full": [
    "battery-full"
  ],
  "battery-low": [
    "battery-low"
  ],
  "battery low": [
    "battery-low"
  ],
  "battery-medium": [
    "battery-medium"
  ],
  "battery medium": [
    "battery-medium"
  ],
  "battery-plus": [
    "battery-plus"
  ],
  "battery plus": [
    "battery-plus"
  ],
  "battery-warning": [
    "battery-warning"
  ],
  "battery warning": [
    "battery-warning"
  ],
  "beaker": [
    "beaker"
  ],
  "bean": [
    "bean"
  ],
  "bean-off": [
    "bean-off"
  ],
  "bean off": [
    "bean-off"
  ],
  "bed": [
    "bed"
  ],
  "bed-double": [
    "bed-double"
  ],
  "bed double": [
    "bed-double"
  ],
  "bed-single": [
    "bed-single"
  ],
  "bed single": [
    "bed-single"
  ],
  "beef": [
    "beef"
  ],
  "beef-off": [
    "beef-off"
  ],
  "beef off": [
    "beef-off"
  ],
  "beer": [
    "beer"
  ],
  "beer-off": [
    "beer-off"
  ],
  "beer off": [
    "beer-off"
  ],
  "bell": [
    "bell"
  ],
  "bell-check": [
    "bell-check"
  ],
  "bell check": [
    "bell-check"
  ],
  "bell-dot": [
    "bell-dot"
  ],
  "bell dot": [
    "bell-dot"
  ],
  "bell-electric": [
    "bell-electric"
  ],
  "bell electric": [
    "bell-electric"
  ],
  "bell-minus": [
    "bell-minus"
  ],
  "bell minus": [
    "bell-minus"
  ],
  "bell-off": [
    "bell-off"
  ],
  "bell off": [
    "bell-off"
  ],
  "bell-plus": [
    "bell-plus"
  ],
  "bell plus": [
    "bell-plus"
  ],
  "bell-ring": [
    "bell-ring"
  ],
  "bell ring": [
    "bell-ring"
  ],
  "between-horizonal-end": [
    "between-horizonal-end"
  ],
  "between horizonal end": [
    "between-horizonal-end"
  ],
  "between-horizonal-start": [
    "between-horizonal-start"
  ],
  "between horizonal start": [
    "between-horizonal-start"
  ],
  "between-horizontal-end": [
    "between-horizontal-end"
  ],
  "between horizontal end": [
    "between-horizontal-end"
  ],
  "between-horizontal-start": [
    "between-horizontal-start"
  ],
  "between horizontal start": [
    "between-horizontal-start"
  ],
  "between-vertical-end": [
    "between-vertical-end"
  ],
  "between vertical end": [
    "between-vertical-end"
  ],
  "between-vertical-start": [
    "between-vertical-start"
  ],
  "between vertical start": [
    "between-vertical-start"
  ],
  "biceps-flexed": [
    "biceps-flexed"
  ],
  "biceps flexed": [
    "biceps-flexed"
  ],
  "bike": [
    "bike"
  ],
  "binary": [
    "binary"
  ],
  "binoculars": [
    "binoculars"
  ],
  "biohazard": [
    "biohazard"
  ],
  "iso": [
    "biohazard",
    "ce-mark",
    "center-of-gravity",
    "do-not-stack",
    "fragile",
    "gas-cylinder",
    "this-way-up"
  ],
  "hazard": [
    "biohazard",
    "gas-cylinder"
  ],
  "safety": [
    "biohazard"
  ],
  "biologico": [
    "biohazard"
  ],
  "risco": [
    "biohazard"
  ],
  "bird": [
    "bird"
  ],
  "birdhouse": [
    "birdhouse"
  ],
  "bitcoin": [
    "bitcoin"
  ],
  "blend": [
    "blend"
  ],
  "blender": [
    "blender"
  ],
  "blinds": [
    "blinds"
  ],
  "blocks": [
    "blocks"
  ],
  "bluetooth": [
    "bluetooth"
  ],
  "bluetooth-connected": [
    "bluetooth-connected"
  ],
  "bluetooth connected": [
    "bluetooth-connected"
  ],
  "bluetooth-off": [
    "bluetooth-off"
  ],
  "bluetooth off": [
    "bluetooth-off"
  ],
  "bluetooth-searching": [
    "bluetooth-searching"
  ],
  "bluetooth searching": [
    "bluetooth-searching"
  ],
  "bold": [
    "bold"
  ],
  "bolt": [
    "bolt"
  ],
  "bomb": [
    "bomb"
  ],
  "bone": [
    "bone"
  ],
  "bone-fracture": [
    "bone-fracture"
  ],
  "bone fracture": [
    "bone-fracture"
  ],
  "book": [
    "book"
  ],
  "book-a": [
    "book-a"
  ],
  "book a": [
    "book-a"
  ],
  "book-alert": [
    "book-alert"
  ],
  "book alert": [
    "book-alert"
  ],
  "book-audio": [
    "book-audio"
  ],
  "book audio": [
    "book-audio"
  ],
  "book-bookmark": [
    "book-bookmark"
  ],
  "book bookmark": [
    "book-bookmark"
  ],
  "book-check": [
    "book-check"
  ],
  "book check": [
    "book-check"
  ],
  "book-copy": [
    "book-copy"
  ],
  "book copy": [
    "book-copy"
  ],
  "book-dashed": [
    "book-dashed"
  ],
  "book dashed": [
    "book-dashed"
  ],
  "book-down": [
    "book-down"
  ],
  "book down": [
    "book-down"
  ],
  "book-headphones": [
    "book-headphones"
  ],
  "book headphones": [
    "book-headphones"
  ],
  "book-heart": [
    "book-heart"
  ],
  "book heart": [
    "book-heart"
  ],
  "book-image": [
    "book-image"
  ],
  "book image": [
    "book-image"
  ],
  "book-key": [
    "book-key"
  ],
  "book key": [
    "book-key"
  ],
  "book-lock": [
    "book-lock"
  ],
  "book lock": [
    "book-lock"
  ],
  "book-marked": [
    "book-marked"
  ],
  "book marked": [
    "book-marked"
  ],
  "book-minus": [
    "book-minus"
  ],
  "book minus": [
    "book-minus"
  ],
  "book-open": [
    "book-open"
  ],
  "book open": [
    "book-open"
  ],
  "book-open-check": [
    "book-open-check"
  ],
  "book open check": [
    "book-open-check"
  ],
  "book-open-text": [
    "book-open-text"
  ],
  "book open text": [
    "book-open-text"
  ],
  "book-plus": [
    "book-plus"
  ],
  "book plus": [
    "book-plus"
  ],
  "book-search": [
    "book-search"
  ],
  "book search": [
    "book-search"
  ],
  "book-template": [
    "book-template"
  ],
  "book template": [
    "book-template"
  ],
  "book-text": [
    "book-text"
  ],
  "book text": [
    "book-text"
  ],
  "book-type": [
    "book-type"
  ],
  "book type": [
    "book-type"
  ],
  "book-up": [
    "book-up"
  ],
  "book up": [
    "book-up"
  ],
  "book-up-2": [
    "book-up-2"
  ],
  "book up 2": [
    "book-up-2"
  ],
  "book-user": [
    "book-user"
  ],
  "book user": [
    "book-user"
  ],
  "book-x": [
    "book-x"
  ],
  "book x": [
    "book-x"
  ],
  "bookmark": [
    "bookmark"
  ],
  "bookmark-check": [
    "bookmark-check"
  ],
  "bookmark check": [
    "bookmark-check"
  ],
  "bookmark-minus": [
    "bookmark-minus"
  ],
  "bookmark minus": [
    "bookmark-minus"
  ],
  "bookmark-off": [
    "bookmark-off"
  ],
  "bookmark off": [
    "bookmark-off"
  ],
  "bookmark-plus": [
    "bookmark-plus"
  ],
  "bookmark plus": [
    "bookmark-plus"
  ],
  "bookmark-x": [
    "bookmark-x"
  ],
  "bookmark x": [
    "bookmark-x"
  ],
  "boom-box": [
    "boom-box"
  ],
  "boom box": [
    "boom-box"
  ],
  "bot": [
    "bot"
  ],
  "bot-message-square": [
    "bot-message-square"
  ],
  "bot message square": [
    "bot-message-square"
  ],
  "bot-off": [
    "bot-off"
  ],
  "bot off": [
    "bot-off"
  ],
  "bottle-wine": [
    "bottle-wine"
  ],
  "bottle wine": [
    "bottle-wine"
  ],
  "bow-arrow": [
    "bow-arrow"
  ],
  "bow arrow": [
    "bow-arrow"
  ],
  "box": [
    "box"
  ],
  "box-select": [
    "box-select"
  ],
  "box select": [
    "box-select"
  ],
  "boxes": [
    "boxes"
  ],
  "braces": [
    "braces"
  ],
  "brackets": [
    "brackets"
  ],
  "brain": [
    "brain"
  ],
  "brain-circuit": [
    "brain-circuit"
  ],
  "brain circuit": [
    "brain-circuit"
  ],
  "brain-cog": [
    "brain-cog"
  ],
  "brain cog": [
    "brain-cog"
  ],
  "brick-wall": [
    "brick-wall"
  ],
  "brick wall": [
    "brick-wall"
  ],
  "brick-wall-fire": [
    "brick-wall-fire"
  ],
  "brick wall fire": [
    "brick-wall-fire"
  ],
  "brick-wall-shield": [
    "brick-wall-shield"
  ],
  "brick wall shield": [
    "brick-wall-shield"
  ],
  "bridge": [
    "bridge"
  ],
  "briefcase": [
    "briefcase"
  ],
  "briefcase-business": [
    "briefcase-business"
  ],
  "briefcase business": [
    "briefcase-business"
  ],
  "briefcase-conveyor-belt": [
    "briefcase-conveyor-belt"
  ],
  "briefcase conveyor belt": [
    "briefcase-conveyor-belt"
  ],
  "briefcase-medical": [
    "briefcase-medical"
  ],
  "briefcase medical": [
    "briefcase-medical"
  ],
  "briefcase-plus": [
    "briefcase-plus"
  ],
  "briefcase plus": [
    "briefcase-plus"
  ],
  "bring-to-front": [
    "bring-to-front"
  ],
  "bring to front": [
    "bring-to-front"
  ],
  "broccoli": [
    "broccoli"
  ],
  "broom": [
    "broom"
  ],
  "broom-sparkles": [
    "broom-sparkles"
  ],
  "broom sparkles": [
    "broom-sparkles"
  ],
  "brush": [
    "brush"
  ],
  "brush-cleaning": [
    "brush-cleaning"
  ],
  "brush cleaning": [
    "brush-cleaning"
  ],
  "bubbles": [
    "bubbles"
  ],
  "bug": [
    "bug"
  ],
  "bug-off": [
    "bug-off"
  ],
  "bug off": [
    "bug-off"
  ],
  "bug-play": [
    "bug-play"
  ],
  "bug play": [
    "bug-play"
  ],
  "building": [
    "building"
  ],
  "building-2": [
    "building-2"
  ],
  "building 2": [
    "building-2"
  ],
  "building-complex": [
    "building-complex"
  ],
  "building complex": [
    "building-complex"
  ],
  "building-complex-plus": [
    "building-complex-plus"
  ],
  "building complex plus": [
    "building-complex-plus"
  ],
  "bus": [
    "bus"
  ],
  "bus-front": [
    "bus-front"
  ],
  "bus front": [
    "bus-front"
  ],
  "cable": [
    "cable"
  ],
  "cable-car": [
    "cable-car"
  ],
  "cable car": [
    "cable-car"
  ],
  "cake": [
    "cake"
  ],
  "cake-slice": [
    "cake-slice"
  ],
  "cake slice": [
    "cake-slice"
  ],
  "calculator": [
    "calculator"
  ],
  "calendar": [
    "calendar"
  ],
  "calendar-1": [
    "calendar-1"
  ],
  "calendar 1": [
    "calendar-1"
  ],
  "calendar-arrow-down": [
    "calendar-arrow-down"
  ],
  "calendar arrow down": [
    "calendar-arrow-down"
  ],
  "calendar-arrow-up": [
    "calendar-arrow-up"
  ],
  "calendar arrow up": [
    "calendar-arrow-up"
  ],
  "calendar-check": [
    "calendar-check"
  ],
  "calendar check": [
    "calendar-check"
  ],
  "calendar-check-2": [
    "calendar-check-2"
  ],
  "calendar check 2": [
    "calendar-check-2"
  ],
  "calendar-chevrons-right": [
    "calendar-chevrons-right"
  ],
  "calendar chevrons right": [
    "calendar-chevrons-right"
  ],
  "calendar-clock": [
    "calendar-clock"
  ],
  "calendar clock": [
    "calendar-clock"
  ],
  "calendar-cog": [
    "calendar-cog"
  ],
  "calendar cog": [
    "calendar-cog"
  ],
  "calendar-days": [
    "calendar-days"
  ],
  "calendar days": [
    "calendar-days"
  ],
  "calendar-fold": [
    "calendar-fold"
  ],
  "calendar fold": [
    "calendar-fold"
  ],
  "calendar-heart": [
    "calendar-heart"
  ],
  "calendar heart": [
    "calendar-heart"
  ],
  "calendar-minus": [
    "calendar-minus"
  ],
  "calendar minus": [
    "calendar-minus"
  ],
  "calendar-minus-2": [
    "calendar-minus-2"
  ],
  "calendar minus 2": [
    "calendar-minus-2"
  ],
  "calendar-off": [
    "calendar-off"
  ],
  "calendar off": [
    "calendar-off"
  ],
  "calendar-plus": [
    "calendar-plus"
  ],
  "calendar plus": [
    "calendar-plus"
  ],
  "calendar-plus-2": [
    "calendar-plus-2"
  ],
  "calendar plus 2": [
    "calendar-plus-2"
  ],
  "calendar-range": [
    "calendar-range"
  ],
  "calendar range": [
    "calendar-range"
  ],
  "calendar-search": [
    "calendar-search"
  ],
  "calendar search": [
    "calendar-search"
  ],
  "calendar-sync": [
    "calendar-sync"
  ],
  "calendar sync": [
    "calendar-sync"
  ],
  "calendar-x": [
    "calendar-x"
  ],
  "calendar x": [
    "calendar-x"
  ],
  "calendar-x-2": [
    "calendar-x-2"
  ],
  "calendar x 2": [
    "calendar-x-2"
  ],
  "calendars": [
    "calendars"
  ],
  "camera": [
    "camera"
  ],
  "camera-off": [
    "camera-off"
  ],
  "camera off": [
    "camera-off"
  ],
  "can": [
    "can"
  ],
  "can-soda": [
    "can-soda"
  ],
  "can soda": [
    "can-soda"
  ],
  "candlestick-chart": [
    "candlestick-chart"
  ],
  "candlestick chart": [
    "candlestick-chart"
  ],
  "candy": [
    "candy"
  ],
  "candy-cane": [
    "candy-cane"
  ],
  "candy cane": [
    "candy-cane"
  ],
  "candy-off": [
    "candy-off"
  ],
  "candy off": [
    "candy-off"
  ],
  "cannabis": [
    "cannabis"
  ],
  "cannabis-off": [
    "cannabis-off"
  ],
  "cannabis off": [
    "cannabis-off"
  ],
  "captions": [
    "captions"
  ],
  "captions-off": [
    "captions-off"
  ],
  "captions off": [
    "captions-off"
  ],
  "car": [
    "car"
  ],
  "car-battery": [
    "car-battery"
  ],
  "car battery": [
    "car-battery"
  ],
  "car-front": [
    "car-front"
  ],
  "car front": [
    "car-front"
  ],
  "car-taxi-front": [
    "car-taxi-front"
  ],
  "car taxi front": [
    "car-taxi-front"
  ],
  "caravan": [
    "caravan"
  ],
  "card-sim": [
    "card-sim"
  ],
  "card sim": [
    "card-sim"
  ],
  "carrot": [
    "carrot"
  ],
  "carton": [
    "carton"
  ],
  "carton-off": [
    "carton-off"
  ],
  "carton off": [
    "carton-off"
  ],
  "case-lower": [
    "case-lower"
  ],
  "case lower": [
    "case-lower"
  ],
  "case-sensitive": [
    "case-sensitive"
  ],
  "case sensitive": [
    "case-sensitive"
  ],
  "case-upper": [
    "case-upper"
  ],
  "case upper": [
    "case-upper"
  ],
  "cassette-tape": [
    "cassette-tape"
  ],
  "cassette tape": [
    "cassette-tape"
  ],
  "cast": [
    "cast"
  ],
  "castle": [
    "castle"
  ],
  "cat": [
    "cat"
  ],
  "cctv": [
    "cctv"
  ],
  "cctv-off": [
    "cctv-off"
  ],
  "cctv off": [
    "cctv-off"
  ],
  "ce-mark": [
    "ce-mark"
  ],
  "ce mark": [
    "ce-mark"
  ],
  "certification": [
    "ce-mark",
    "weee"
  ],
  "europe": [
    "ce-mark",
    "weee"
  ],
  "certificacao": [
    "ce-mark"
  ],
  "conformidade": [
    "ce-mark"
  ],
  "center-of-gravity": [
    "center-of-gravity"
  ],
  "center of gravity": [
    "center-of-gravity"
  ],
  "handling": [
    "center-of-gravity",
    "do-not-stack",
    "fragile",
    "this-way-up"
  ],
  "packaging": [
    "center-of-gravity",
    "do-not-stack",
    "fragile",
    "this-way-up"
  ],
  "centro de gravidade": [
    "center-of-gravity"
  ],
  "peso": [
    "center-of-gravity"
  ],
  "chart-area": [
    "chart-area"
  ],
  "chart area": [
    "chart-area"
  ],
  "chart-bar": [
    "chart-bar"
  ],
  "chart bar": [
    "chart-bar"
  ],
  "chart-bar-big": [
    "chart-bar-big"
  ],
  "chart bar big": [
    "chart-bar-big"
  ],
  "chart-bar-decreasing": [
    "chart-bar-decreasing"
  ],
  "chart bar decreasing": [
    "chart-bar-decreasing"
  ],
  "chart-bar-increasing": [
    "chart-bar-increasing"
  ],
  "chart bar increasing": [
    "chart-bar-increasing"
  ],
  "chart-bar-stacked": [
    "chart-bar-stacked"
  ],
  "chart bar stacked": [
    "chart-bar-stacked"
  ],
  "chart-candlestick": [
    "chart-candlestick"
  ],
  "chart candlestick": [
    "chart-candlestick"
  ],
  "chart-column": [
    "chart-column"
  ],
  "chart column": [
    "chart-column"
  ],
  "chart-column-big": [
    "chart-column-big"
  ],
  "chart column big": [
    "chart-column-big"
  ],
  "chart-column-decreasing": [
    "chart-column-decreasing"
  ],
  "chart column decreasing": [
    "chart-column-decreasing"
  ],
  "chart-column-increasing": [
    "chart-column-increasing"
  ],
  "chart column increasing": [
    "chart-column-increasing"
  ],
  "chart-column-stacked": [
    "chart-column-stacked"
  ],
  "chart column stacked": [
    "chart-column-stacked"
  ],
  "chart-gantt": [
    "chart-gantt"
  ],
  "chart gantt": [
    "chart-gantt"
  ],
  "chart-line": [
    "chart-line"
  ],
  "chart line": [
    "chart-line"
  ],
  "chart-network": [
    "chart-network"
  ],
  "chart network": [
    "chart-network"
  ],
  "chart-no-axes-column": [
    "chart-no-axes-column"
  ],
  "chart no axes column": [
    "chart-no-axes-column"
  ],
  "chart-no-axes-column-decreasing": [
    "chart-no-axes-column-decreasing"
  ],
  "chart no axes column decreasing": [
    "chart-no-axes-column-decreasing"
  ],
  "chart-no-axes-column-increasing": [
    "chart-no-axes-column-increasing"
  ],
  "chart no axes column increasing": [
    "chart-no-axes-column-increasing"
  ],
  "chart-no-axes-combined": [
    "chart-no-axes-combined"
  ],
  "chart no axes combined": [
    "chart-no-axes-combined"
  ],
  "chart-no-axes-gantt": [
    "chart-no-axes-gantt"
  ],
  "chart no axes gantt": [
    "chart-no-axes-gantt"
  ],
  "chart-pie": [
    "chart-pie"
  ],
  "chart pie": [
    "chart-pie"
  ],
  "chart-scatter": [
    "chart-scatter"
  ],
  "chart scatter": [
    "chart-scatter"
  ],
  "chart-spline": [
    "chart-spline"
  ],
  "chart spline": [
    "chart-spline"
  ],
  "check": [
    "check"
  ],
  "check-check": [
    "check-check"
  ],
  "check check": [
    "check-check"
  ],
  "check-circle": [
    "check-circle"
  ],
  "check circle": [
    "check-circle"
  ],
  "check-circle-2": [
    "check-circle-2"
  ],
  "check circle 2": [
    "check-circle-2"
  ],
  "check-line": [
    "check-line"
  ],
  "check line": [
    "check-line"
  ],
  "check-square": [
    "check-square"
  ],
  "check square": [
    "check-square"
  ],
  "check-square-2": [
    "check-square-2"
  ],
  "check square 2": [
    "check-square-2"
  ],
  "chef-hat": [
    "chef-hat"
  ],
  "chef hat": [
    "chef-hat"
  ],
  "cherry": [
    "cherry"
  ],
  "chess-bishop": [
    "chess-bishop"
  ],
  "chess bishop": [
    "chess-bishop"
  ],
  "chess-king": [
    "chess-king"
  ],
  "chess king": [
    "chess-king"
  ],
  "chess-knight": [
    "chess-knight"
  ],
  "chess knight": [
    "chess-knight"
  ],
  "chess-pawn": [
    "chess-pawn"
  ],
  "chess pawn": [
    "chess-pawn"
  ],
  "chess-queen": [
    "chess-queen"
  ],
  "chess queen": [
    "chess-queen"
  ],
  "chess-rook": [
    "chess-rook"
  ],
  "chess rook": [
    "chess-rook"
  ],
  "chevron-down": [
    "chevron-down"
  ],
  "chevron down": [
    "chevron-down"
  ],
  "chevron-down-circle": [
    "chevron-down-circle"
  ],
  "chevron down circle": [
    "chevron-down-circle"
  ],
  "chevron-down-square": [
    "chevron-down-square"
  ],
  "chevron down square": [
    "chevron-down-square"
  ],
  "chevron-first": [
    "chevron-first"
  ],
  "chevron first": [
    "chevron-first"
  ],
  "chevron-last": [
    "chevron-last"
  ],
  "chevron last": [
    "chevron-last"
  ],
  "chevron-left": [
    "chevron-left"
  ],
  "chevron left": [
    "chevron-left"
  ],
  "chevron-left-circle": [
    "chevron-left-circle"
  ],
  "chevron left circle": [
    "chevron-left-circle"
  ],
  "chevron-left-square": [
    "chevron-left-square"
  ],
  "chevron left square": [
    "chevron-left-square"
  ],
  "chevron-right": [
    "chevron-right"
  ],
  "chevron right": [
    "chevron-right"
  ],
  "chevron-right-circle": [
    "chevron-right-circle"
  ],
  "chevron right circle": [
    "chevron-right-circle"
  ],
  "chevron-right-square": [
    "chevron-right-square"
  ],
  "chevron right square": [
    "chevron-right-square"
  ],
  "chevron-up": [
    "chevron-up"
  ],
  "chevron up": [
    "chevron-up"
  ],
  "chevron-up-circle": [
    "chevron-up-circle"
  ],
  "chevron up circle": [
    "chevron-up-circle"
  ],
  "chevron-up-square": [
    "chevron-up-square"
  ],
  "chevron up square": [
    "chevron-up-square"
  ],
  "chevrons-down": [
    "chevrons-down"
  ],
  "chevrons down": [
    "chevrons-down"
  ],
  "chevrons-down-up": [
    "chevrons-down-up"
  ],
  "chevrons down up": [
    "chevrons-down-up"
  ],
  "chevrons-left": [
    "chevrons-left"
  ],
  "chevrons left": [
    "chevrons-left"
  ],
  "chevrons-left-right": [
    "chevrons-left-right"
  ],
  "chevrons left right": [
    "chevrons-left-right"
  ],
  "chevrons-left-right-ellipsis": [
    "chevrons-left-right-ellipsis"
  ],
  "chevrons left right ellipsis": [
    "chevrons-left-right-ellipsis"
  ],
  "chevrons-right": [
    "chevrons-right"
  ],
  "chevrons right": [
    "chevrons-right"
  ],
  "chevrons-right-left": [
    "chevrons-right-left"
  ],
  "chevrons right left": [
    "chevrons-right-left"
  ],
  "chevrons-up": [
    "chevrons-up"
  ],
  "chevrons up": [
    "chevrons-up"
  ],
  "chevrons-up-down": [
    "chevrons-up-down"
  ],
  "chevrons up down": [
    "chevrons-up-down"
  ],
  "church": [
    "church"
  ],
  "cigarette": [
    "cigarette"
  ],
  "cigarette-off": [
    "cigarette-off"
  ],
  "cigarette off": [
    "cigarette-off"
  ],
  "circle": [
    "circle"
  ],
  "circle-alert": [
    "circle-alert"
  ],
  "circle alert": [
    "circle-alert"
  ],
  "circle-arrow-down": [
    "circle-arrow-down"
  ],
  "circle arrow down": [
    "circle-arrow-down"
  ],
  "circle-arrow-left": [
    "circle-arrow-left"
  ],
  "circle arrow left": [
    "circle-arrow-left"
  ],
  "circle-arrow-out-down-left": [
    "circle-arrow-out-down-left"
  ],
  "circle arrow out down left": [
    "circle-arrow-out-down-left"
  ],
  "circle-arrow-out-down-right": [
    "circle-arrow-out-down-right"
  ],
  "circle arrow out down right": [
    "circle-arrow-out-down-right"
  ],
  "circle-arrow-out-up-left": [
    "circle-arrow-out-up-left"
  ],
  "circle arrow out up left": [
    "circle-arrow-out-up-left"
  ],
  "circle-arrow-out-up-right": [
    "circle-arrow-out-up-right"
  ],
  "circle arrow out up right": [
    "circle-arrow-out-up-right"
  ],
  "circle-arrow-right": [
    "circle-arrow-right"
  ],
  "circle arrow right": [
    "circle-arrow-right"
  ],
  "circle-arrow-up": [
    "circle-arrow-up"
  ],
  "circle arrow up": [
    "circle-arrow-up"
  ],
  "circle-check": [
    "circle-check"
  ],
  "circle check": [
    "circle-check"
  ],
  "circle-check-big": [
    "circle-check-big"
  ],
  "circle check big": [
    "circle-check-big"
  ],
  "circle-chevron-down": [
    "circle-chevron-down"
  ],
  "circle chevron down": [
    "circle-chevron-down"
  ],
  "circle-chevron-left": [
    "circle-chevron-left"
  ],
  "circle chevron left": [
    "circle-chevron-left"
  ],
  "circle-chevron-right": [
    "circle-chevron-right"
  ],
  "circle chevron right": [
    "circle-chevron-right"
  ],
  "circle-chevron-up": [
    "circle-chevron-up"
  ],
  "circle chevron up": [
    "circle-chevron-up"
  ],
  "circle-dashed": [
    "circle-dashed"
  ],
  "circle dashed": [
    "circle-dashed"
  ],
  "circle-dashed-check": [
    "circle-dashed-check"
  ],
  "circle dashed check": [
    "circle-dashed-check"
  ],
  "circle-divide": [
    "circle-divide"
  ],
  "circle divide": [
    "circle-divide"
  ],
  "circle-dollar-sign": [
    "circle-dollar-sign"
  ],
  "circle dollar sign": [
    "circle-dollar-sign"
  ],
  "circle-dot": [
    "circle-dot"
  ],
  "circle dot": [
    "circle-dot"
  ],
  "circle-dot-dashed": [
    "circle-dot-dashed"
  ],
  "circle dot dashed": [
    "circle-dot-dashed"
  ],
  "circle-ellipsis": [
    "circle-ellipsis"
  ],
  "circle ellipsis": [
    "circle-ellipsis"
  ],
  "circle-equal": [
    "circle-equal"
  ],
  "circle equal": [
    "circle-equal"
  ],
  "circle-euro": [
    "circle-euro"
  ],
  "circle euro": [
    "circle-euro"
  ],
  "circle-fading-arrow-up": [
    "circle-fading-arrow-up"
  ],
  "circle fading arrow up": [
    "circle-fading-arrow-up"
  ],
  "circle-fading-plus": [
    "circle-fading-plus"
  ],
  "circle fading plus": [
    "circle-fading-plus"
  ],
  "circle-gauge": [
    "circle-gauge"
  ],
  "circle gauge": [
    "circle-gauge"
  ],
  "circle-help": [
    "circle-help"
  ],
  "circle help": [
    "circle-help"
  ],
  "circle-minus": [
    "circle-minus"
  ],
  "circle minus": [
    "circle-minus"
  ],
  "circle-off": [
    "circle-off"
  ],
  "circle off": [
    "circle-off"
  ],
  "circle-parking": [
    "circle-parking"
  ],
  "circle parking": [
    "circle-parking"
  ],
  "circle-parking-off": [
    "circle-parking-off"
  ],
  "circle parking off": [
    "circle-parking-off"
  ],
  "circle-pause": [
    "circle-pause"
  ],
  "circle pause": [
    "circle-pause"
  ],
  "circle-percent": [
    "circle-percent"
  ],
  "circle percent": [
    "circle-percent"
  ],
  "circle-pile": [
    "circle-pile"
  ],
  "circle pile": [
    "circle-pile"
  ],
  "circle-play": [
    "circle-play"
  ],
  "circle play": [
    "circle-play"
  ],
  "circle-plus": [
    "circle-plus"
  ],
  "circle plus": [
    "circle-plus"
  ],
  "circle-pound-sterling": [
    "circle-pound-sterling"
  ],
  "circle pound sterling": [
    "circle-pound-sterling"
  ],
  "circle-power": [
    "circle-power"
  ],
  "circle power": [
    "circle-power"
  ],
  "circle-question-mark": [
    "circle-question-mark"
  ],
  "circle question mark": [
    "circle-question-mark"
  ],
  "circle-slash": [
    "circle-slash"
  ],
  "circle slash": [
    "circle-slash"
  ],
  "circle-slash-2": [
    "circle-slash-2"
  ],
  "circle slash 2": [
    "circle-slash-2"
  ],
  "circle-slashed": [
    "circle-slashed"
  ],
  "circle slashed": [
    "circle-slashed"
  ],
  "circle-small": [
    "circle-small"
  ],
  "circle small": [
    "circle-small"
  ],
  "circle-star": [
    "circle-star"
  ],
  "circle star": [
    "circle-star"
  ],
  "circle-stop": [
    "circle-stop"
  ],
  "circle stop": [
    "circle-stop"
  ],
  "circle-user": [
    "circle-user"
  ],
  "circle user": [
    "circle-user"
  ],
  "circle-user-round": [
    "circle-user-round"
  ],
  "circle user round": [
    "circle-user-round"
  ],
  "circle-x": [
    "circle-x"
  ],
  "circle x": [
    "circle-x"
  ],
  "circuit-board": [
    "circuit-board"
  ],
  "circuit board": [
    "circuit-board"
  ],
  "citrus": [
    "citrus"
  ],
  "clapperboard": [
    "clapperboard"
  ],
  "clef-alto": [
    "clef-alto"
  ],
  "clef alto": [
    "clef-alto"
  ],
  "clef-bass": [
    "clef-bass"
  ],
  "clef bass": [
    "clef-bass"
  ],
  "clef-treble": [
    "clef-treble"
  ],
  "clef treble": [
    "clef-treble"
  ],
  "clipboard": [
    "clipboard"
  ],
  "clipboard-check": [
    "clipboard-check"
  ],
  "clipboard check": [
    "clipboard-check"
  ],
  "clipboard-clock": [
    "clipboard-clock"
  ],
  "clipboard clock": [
    "clipboard-clock"
  ],
  "clipboard-copy": [
    "clipboard-copy"
  ],
  "clipboard copy": [
    "clipboard-copy"
  ],
  "clipboard-edit": [
    "clipboard-edit"
  ],
  "clipboard edit": [
    "clipboard-edit"
  ],
  "clipboard-list": [
    "clipboard-list"
  ],
  "clipboard list": [
    "clipboard-list"
  ],
  "clipboard-minus": [
    "clipboard-minus"
  ],
  "clipboard minus": [
    "clipboard-minus"
  ],
  "clipboard-paste": [
    "clipboard-paste"
  ],
  "clipboard paste": [
    "clipboard-paste"
  ],
  "clipboard-pen": [
    "clipboard-pen"
  ],
  "clipboard pen": [
    "clipboard-pen"
  ],
  "clipboard-pen-line": [
    "clipboard-pen-line"
  ],
  "clipboard pen line": [
    "clipboard-pen-line"
  ],
  "clipboard-plus": [
    "clipboard-plus"
  ],
  "clipboard plus": [
    "clipboard-plus"
  ],
  "clipboard-signature": [
    "clipboard-signature"
  ],
  "clipboard signature": [
    "clipboard-signature"
  ],
  "clipboard-type": [
    "clipboard-type"
  ],
  "clipboard type": [
    "clipboard-type"
  ],
  "clipboard-x": [
    "clipboard-x"
  ],
  "clipboard x": [
    "clipboard-x"
  ],
  "clock": [
    "clock"
  ],
  "clock-1": [
    "clock-1"
  ],
  "clock 1": [
    "clock-1"
  ],
  "clock-10": [
    "clock-10"
  ],
  "clock 10": [
    "clock-10"
  ],
  "clock-11": [
    "clock-11"
  ],
  "clock 11": [
    "clock-11"
  ],
  "clock-12": [
    "clock-12"
  ],
  "clock 12": [
    "clock-12"
  ],
  "clock-2": [
    "clock-2"
  ],
  "clock 2": [
    "clock-2"
  ],
  "clock-3": [
    "clock-3"
  ],
  "clock 3": [
    "clock-3"
  ],
  "clock-4": [
    "clock-4"
  ],
  "clock 4": [
    "clock-4"
  ],
  "clock-5": [
    "clock-5"
  ],
  "clock 5": [
    "clock-5"
  ],
  "clock-6": [
    "clock-6"
  ],
  "clock 6": [
    "clock-6"
  ],
  "clock-7": [
    "clock-7"
  ],
  "clock 7": [
    "clock-7"
  ],
  "clock-8": [
    "clock-8"
  ],
  "clock 8": [
    "clock-8"
  ],
  "clock-9": [
    "clock-9"
  ],
  "clock 9": [
    "clock-9"
  ],
  "clock-alert": [
    "clock-alert"
  ],
  "clock alert": [
    "clock-alert"
  ],
  "clock-arrow-down": [
    "clock-arrow-down"
  ],
  "clock arrow down": [
    "clock-arrow-down"
  ],
  "clock-arrow-left": [
    "clock-arrow-left"
  ],
  "clock arrow left": [
    "clock-arrow-left"
  ],
  "clock-arrow-right": [
    "clock-arrow-right"
  ],
  "clock arrow right": [
    "clock-arrow-right"
  ],
  "clock-arrow-up": [
    "clock-arrow-up"
  ],
  "clock arrow up": [
    "clock-arrow-up"
  ],
  "clock-check": [
    "clock-check"
  ],
  "clock check": [
    "clock-check"
  ],
  "clock-fading": [
    "clock-fading"
  ],
  "clock fading": [
    "clock-fading"
  ],
  "clock-plus": [
    "clock-plus"
  ],
  "clock plus": [
    "clock-plus"
  ],
  "closed-caption": [
    "closed-caption"
  ],
  "closed caption": [
    "closed-caption"
  ],
  "cloud": [
    "cloud"
  ],
  "cloud-alert": [
    "cloud-alert"
  ],
  "cloud alert": [
    "cloud-alert"
  ],
  "cloud-backup": [
    "cloud-backup"
  ],
  "cloud backup": [
    "cloud-backup"
  ],
  "cloud-check": [
    "cloud-check"
  ],
  "cloud check": [
    "cloud-check"
  ],
  "cloud-cog": [
    "cloud-cog"
  ],
  "cloud cog": [
    "cloud-cog"
  ],
  "cloud-download": [
    "cloud-download"
  ],
  "cloud download": [
    "cloud-download"
  ],
  "cloud-drizzle": [
    "cloud-drizzle"
  ],
  "cloud drizzle": [
    "cloud-drizzle"
  ],
  "cloud-fog": [
    "cloud-fog"
  ],
  "cloud fog": [
    "cloud-fog"
  ],
  "cloud-hail": [
    "cloud-hail"
  ],
  "cloud hail": [
    "cloud-hail"
  ],
  "cloud-lightning": [
    "cloud-lightning"
  ],
  "cloud lightning": [
    "cloud-lightning"
  ],
  "cloud-moon": [
    "cloud-moon"
  ],
  "cloud moon": [
    "cloud-moon"
  ],
  "cloud-moon-rain": [
    "cloud-moon-rain"
  ],
  "cloud moon rain": [
    "cloud-moon-rain"
  ],
  "cloud-off": [
    "cloud-off"
  ],
  "cloud off": [
    "cloud-off"
  ],
  "cloud-rain": [
    "cloud-rain"
  ],
  "cloud rain": [
    "cloud-rain"
  ],
  "cloud-rain-wind": [
    "cloud-rain-wind"
  ],
  "cloud rain wind": [
    "cloud-rain-wind"
  ],
  "cloud-snow": [
    "cloud-snow"
  ],
  "cloud snow": [
    "cloud-snow"
  ],
  "cloud-sun": [
    "cloud-sun"
  ],
  "cloud sun": [
    "cloud-sun"
  ],
  "cloud-sun-rain": [
    "cloud-sun-rain"
  ],
  "cloud sun rain": [
    "cloud-sun-rain"
  ],
  "cloud-sync": [
    "cloud-sync"
  ],
  "cloud sync": [
    "cloud-sync"
  ],
  "cloud-upload": [
    "cloud-upload"
  ],
  "cloud upload": [
    "cloud-upload"
  ],
  "cloudy": [
    "cloudy"
  ],
  "clover": [
    "clover"
  ],
  "club": [
    "club"
  ],
  "code": [
    "code"
  ],
  "code-2": [
    "code-2"
  ],
  "code 2": [
    "code-2"
  ],
  "code-square": [
    "code-square"
  ],
  "code square": [
    "code-square"
  ],
  "code-xml": [
    "code-xml"
  ],
  "code xml": [
    "code-xml"
  ],
  "coffee": [
    "coffee"
  ],
  "cog": [
    "cog"
  ],
  "coins": [
    "coins"
  ],
  "columns": [
    "columns"
  ],
  "columns-2": [
    "columns-2"
  ],
  "columns 2": [
    "columns-2"
  ],
  "columns-3": [
    "columns-3"
  ],
  "columns 3": [
    "columns-3"
  ],
  "columns-3-cog": [
    "columns-3-cog"
  ],
  "columns 3 cog": [
    "columns-3-cog"
  ],
  "columns-4": [
    "columns-4"
  ],
  "columns 4": [
    "columns-4"
  ],
  "columns-settings": [
    "columns-settings"
  ],
  "columns settings": [
    "columns-settings"
  ],
  "combine": [
    "combine"
  ],
  "command": [
    "command"
  ],
  "compass": [
    "compass"
  ],
  "component": [
    "component"
  ],
  "computer": [
    "computer"
  ],
  "concierge-bell": [
    "concierge-bell"
  ],
  "concierge bell": [
    "concierge-bell"
  ],
  "cone": [
    "cone"
  ],
  "construction": [
    "construction"
  ],
  "contact": [
    "contact"
  ],
  "contact-2": [
    "contact-2"
  ],
  "contact 2": [
    "contact-2"
  ],
  "contact-round": [
    "contact-round"
  ],
  "contact round": [
    "contact-round"
  ],
  "container": [
    "container"
  ],
  "contrast": [
    "contrast"
  ],
  "cookie": [
    "cookie"
  ],
  "cooking-pot": [
    "cooking-pot"
  ],
  "cooking pot": [
    "cooking-pot"
  ],
  "copy": [
    "copy"
  ],
  "copy-check": [
    "copy-check"
  ],
  "copy check": [
    "copy-check"
  ],
  "copy-minus": [
    "copy-minus"
  ],
  "copy minus": [
    "copy-minus"
  ],
  "copy-plus": [
    "copy-plus"
  ],
  "copy plus": [
    "copy-plus"
  ],
  "copy-slash": [
    "copy-slash"
  ],
  "copy slash": [
    "copy-slash"
  ],
  "copy-x": [
    "copy-x"
  ],
  "copy x": [
    "copy-x"
  ],
  "copyleft": [
    "copyleft"
  ],
  "copyright": [
    "copyright"
  ],
  "corner-down-left": [
    "corner-down-left"
  ],
  "corner down left": [
    "corner-down-left"
  ],
  "corner-down-right": [
    "corner-down-right"
  ],
  "corner down right": [
    "corner-down-right"
  ],
  "corner-left-down": [
    "corner-left-down"
  ],
  "corner left down": [
    "corner-left-down"
  ],
  "corner-left-up": [
    "corner-left-up"
  ],
  "corner left up": [
    "corner-left-up"
  ],
  "corner-right-down": [
    "corner-right-down"
  ],
  "corner right down": [
    "corner-right-down"
  ],
  "corner-right-up": [
    "corner-right-up"
  ],
  "corner right up": [
    "corner-right-up"
  ],
  "corner-up-left": [
    "corner-up-left"
  ],
  "corner up left": [
    "corner-up-left"
  ],
  "corner-up-right": [
    "corner-up-right"
  ],
  "corner up right": [
    "corner-up-right"
  ],
  "cpu": [
    "cpu"
  ],
  "creative-commons": [
    "creative-commons"
  ],
  "creative commons": [
    "creative-commons"
  ],
  "credit-card": [
    "credit-card"
  ],
  "credit card": [
    "credit-card"
  ],
  "credit-card-check": [
    "credit-card-check"
  ],
  "credit card check": [
    "credit-card-check"
  ],
  "credit-card-minus": [
    "credit-card-minus"
  ],
  "credit card minus": [
    "credit-card-minus"
  ],
  "credit-card-plus": [
    "credit-card-plus"
  ],
  "credit card plus": [
    "credit-card-plus"
  ],
  "credit-card-reader": [
    "credit-card-reader"
  ],
  "credit card reader": [
    "credit-card-reader"
  ],
  "credit-card-x": [
    "credit-card-x"
  ],
  "credit card x": [
    "credit-card-x"
  ],
  "croissant": [
    "croissant"
  ],
  "crop": [
    "crop"
  ],
  "cross": [
    "cross"
  ],
  "crosshair": [
    "crosshair"
  ],
  "crown": [
    "crown"
  ],
  "cuboid": [
    "cuboid"
  ],
  "cup-soda": [
    "cup-soda"
  ],
  "cup soda": [
    "cup-soda"
  ],
  "cupcake": [
    "cupcake"
  ],
  "curly-braces": [
    "curly-braces"
  ],
  "curly braces": [
    "curly-braces"
  ],
  "currency": [
    "currency"
  ],
  "cylinder": [
    "cylinder"
  ],
  "dam": [
    "dam"
  ],
  "database": [
    "database"
  ],
  "database-arrow-down": [
    "database-arrow-down"
  ],
  "database arrow down": [
    "database-arrow-down"
  ],
  "database-arrow-up": [
    "database-arrow-up"
  ],
  "database arrow up": [
    "database-arrow-up"
  ],
  "database-backup": [
    "database-backup"
  ],
  "database backup": [
    "database-backup"
  ],
  "database-check": [
    "database-check"
  ],
  "database check": [
    "database-check"
  ],
  "database-minus": [
    "database-minus"
  ],
  "database minus": [
    "database-minus"
  ],
  "database-plus": [
    "database-plus"
  ],
  "database plus": [
    "database-plus"
  ],
  "database-search": [
    "database-search"
  ],
  "database search": [
    "database-search"
  ],
  "database-x": [
    "database-x"
  ],
  "database x": [
    "database-x"
  ],
  "database-zap": [
    "database-zap"
  ],
  "database zap": [
    "database-zap"
  ],
  "decimals-arrow-left": [
    "decimals-arrow-left"
  ],
  "decimals arrow left": [
    "decimals-arrow-left"
  ],
  "decimals-arrow-right": [
    "decimals-arrow-right"
  ],
  "decimals arrow right": [
    "decimals-arrow-right"
  ],
  "delete": [
    "delete"
  ],
  "dessert": [
    "dessert"
  ],
  "diameter": [
    "diameter"
  ],
  "diamond": [
    "diamond"
  ],
  "diamond-minus": [
    "diamond-minus"
  ],
  "diamond minus": [
    "diamond-minus"
  ],
  "diamond-percent": [
    "diamond-percent"
  ],
  "diamond percent": [
    "diamond-percent"
  ],
  "diamond-plus": [
    "diamond-plus"
  ],
  "diamond plus": [
    "diamond-plus"
  ],
  "dice-1": [
    "dice-1"
  ],
  "dice 1": [
    "dice-1"
  ],
  "dice-2": [
    "dice-2"
  ],
  "dice 2": [
    "dice-2"
  ],
  "dice-3": [
    "dice-3"
  ],
  "dice 3": [
    "dice-3"
  ],
  "dice-4": [
    "dice-4"
  ],
  "dice 4": [
    "dice-4"
  ],
  "dice-5": [
    "dice-5"
  ],
  "dice 5": [
    "dice-5"
  ],
  "dice-6": [
    "dice-6"
  ],
  "dice 6": [
    "dice-6"
  ],
  "dices": [
    "dices"
  ],
  "diff": [
    "diff"
  ],
  "disc": [
    "disc"
  ],
  "disc-2": [
    "disc-2"
  ],
  "disc 2": [
    "disc-2"
  ],
  "disc-3": [
    "disc-3"
  ],
  "disc 3": [
    "disc-3"
  ],
  "disc-album": [
    "disc-album"
  ],
  "disc album": [
    "disc-album"
  ],
  "divide": [
    "divide"
  ],
  "divide-circle": [
    "divide-circle"
  ],
  "divide circle": [
    "divide-circle"
  ],
  "divide-square": [
    "divide-square"
  ],
  "divide square": [
    "divide-square"
  ],
  "dna": [
    "dna"
  ],
  "dna-off": [
    "dna-off"
  ],
  "dna off": [
    "dna-off"
  ],
  "do-not-stack": [
    "do-not-stack"
  ],
  "do not stack": [
    "do-not-stack"
  ],
  "nao empilhar": [
    "do-not-stack"
  ],
  "empilhamento": [
    "do-not-stack"
  ],
  "dock": [
    "dock"
  ],
  "dog": [
    "dog"
  ],
  "dollar-sign": [
    "dollar-sign"
  ],
  "dollar sign": [
    "dollar-sign"
  ],
  "dome": [
    "dome"
  ],
  "donut": [
    "donut"
  ],
  "door-closed": [
    "door-closed"
  ],
  "door closed": [
    "door-closed"
  ],
  "door-closed-cog": [
    "door-closed-cog"
  ],
  "door closed cog": [
    "door-closed-cog"
  ],
  "door-closed-locked": [
    "door-closed-locked"
  ],
  "door closed locked": [
    "door-closed-locked"
  ],
  "door-closed-package": [
    "door-closed-package"
  ],
  "door closed package": [
    "door-closed-package"
  ],
  "door-open": [
    "door-open"
  ],
  "door open": [
    "door-open"
  ],
  "door-stairwell": [
    "door-stairwell"
  ],
  "door stairwell": [
    "door-stairwell"
  ],
  "dot": [
    "dot"
  ],
  "dot-square": [
    "dot-square"
  ],
  "dot square": [
    "dot-square"
  ],
  "download": [
    "download"
  ],
  "download-cloud": [
    "download-cloud"
  ],
  "download cloud": [
    "download-cloud"
  ],
  "drafting-compass": [
    "drafting-compass"
  ],
  "drafting compass": [
    "drafting-compass"
  ],
  "drama": [
    "drama"
  ],
  "drill": [
    "drill"
  ],
  "drone": [
    "drone"
  ],
  "droplet": [
    "droplet"
  ],
  "droplet-off": [
    "droplet-off"
  ],
  "droplet off": [
    "droplet-off"
  ],
  "droplets": [
    "droplets"
  ],
  "drum": [
    "drum"
  ],
  "drumstick": [
    "drumstick"
  ],
  "dumbbell": [
    "dumbbell"
  ],
  "ear": [
    "ear"
  ],
  "ear-off": [
    "ear-off"
  ],
  "ear off": [
    "ear-off"
  ],
  "earth": [
    "earth"
  ],
  "earth-lock": [
    "earth-lock"
  ],
  "earth lock": [
    "earth-lock"
  ],
  "eclipse": [
    "eclipse"
  ],
  "edit": [
    "edit"
  ],
  "edit-2": [
    "edit-2"
  ],
  "edit 2": [
    "edit-2"
  ],
  "edit-3": [
    "edit-3"
  ],
  "edit 3": [
    "edit-3"
  ],
  "egg": [
    "egg"
  ],
  "egg-fried": [
    "egg-fried"
  ],
  "egg fried": [
    "egg-fried"
  ],
  "egg-off": [
    "egg-off"
  ],
  "egg off": [
    "egg-off"
  ],
  "eject": [
    "eject"
  ],
  "ellipse": [
    "ellipse"
  ],
  "ellipsis": [
    "ellipsis"
  ],
  "ellipsis-vertical": [
    "ellipsis-vertical"
  ],
  "ellipsis vertical": [
    "ellipsis-vertical"
  ],
  "engine": [
    "engine"
  ],
  "equal": [
    "equal"
  ],
  "equal-approximately": [
    "equal-approximately"
  ],
  "equal approximately": [
    "equal-approximately"
  ],
  "equal-approximately-not": [
    "equal-approximately-not"
  ],
  "equal approximately not": [
    "equal-approximately-not"
  ],
  "equal-not": [
    "equal-not"
  ],
  "equal not": [
    "equal-not"
  ],
  "equal-square": [
    "equal-square"
  ],
  "equal square": [
    "equal-square"
  ],
  "eraser": [
    "eraser"
  ],
  "ethernet-port": [
    "ethernet-port"
  ],
  "ethernet port": [
    "ethernet-port"
  ],
  "euro": [
    "euro"
  ],
  "ev-charger": [
    "ev-charger"
  ],
  "ev charger": [
    "ev-charger"
  ],
  "expand": [
    "expand"
  ],
  "external-link": [
    "external-link"
  ],
  "external link": [
    "external-link"
  ],
  "eye": [
    "eye"
  ],
  "eye-closed": [
    "eye-closed"
  ],
  "eye closed": [
    "eye-closed"
  ],
  "eye-dashed": [
    "eye-dashed"
  ],
  "eye dashed": [
    "eye-dashed"
  ],
  "eye-off": [
    "eye-off"
  ],
  "eye off": [
    "eye-off"
  ],
  "face-angry": [
    "face-angry"
  ],
  "face angry": [
    "face-angry"
  ],
  "face-expressionless": [
    "face-expressionless"
  ],
  "face expressionless": [
    "face-expressionless"
  ],
  "face-grinning": [
    "face-grinning"
  ],
  "face grinning": [
    "face-grinning"
  ],
  "face-neutral": [
    "face-neutral"
  ],
  "face neutral": [
    "face-neutral"
  ],
  "face-slightly-frowning": [
    "face-slightly-frowning"
  ],
  "face slightly frowning": [
    "face-slightly-frowning"
  ],
  "face-slightly-smiling": [
    "face-slightly-smiling"
  ],
  "face slightly smiling": [
    "face-slightly-smiling"
  ],
  "face-slightly-smiling-plus": [
    "face-slightly-smiling-plus"
  ],
  "face slightly smiling plus": [
    "face-slightly-smiling-plus"
  ],
  "factory": [
    "factory"
  ],
  "fan": [
    "fan"
  ],
  "fast-forward": [
    "fast-forward"
  ],
  "fast forward": [
    "fast-forward"
  ],
  "faucet": [
    "faucet"
  ],
  "feather": [
    "feather"
  ],
  "fence": [
    "fence"
  ],
  "ferris-wheel": [
    "ferris-wheel"
  ],
  "ferris wheel": [
    "ferris-wheel"
  ],
  "file": [
    "file"
  ],
  "file-archive": [
    "file-archive"
  ],
  "file archive": [
    "file-archive"
  ],
  "file-audio": [
    "file-audio"
  ],
  "file audio": [
    "file-audio"
  ],
  "file-audio-2": [
    "file-audio-2"
  ],
  "file audio 2": [
    "file-audio-2"
  ],
  "file-axis-3-d": [
    "file-axis-3-d"
  ],
  "file axis 3 d": [
    "file-axis-3-d"
  ],
  "file-axis-3d": [
    "file-axis-3d"
  ],
  "file axis 3d": [
    "file-axis-3d"
  ],
  "file-badge": [
    "file-badge"
  ],
  "file badge": [
    "file-badge"
  ],
  "file-badge-2": [
    "file-badge-2"
  ],
  "file badge 2": [
    "file-badge-2"
  ],
  "file-bar-chart": [
    "file-bar-chart"
  ],
  "file bar chart": [
    "file-bar-chart"
  ],
  "file-bar-chart-2": [
    "file-bar-chart-2"
  ],
  "file bar chart 2": [
    "file-bar-chart-2"
  ],
  "file-box": [
    "file-box"
  ],
  "file box": [
    "file-box"
  ],
  "file-braces": [
    "file-braces"
  ],
  "file braces": [
    "file-braces"
  ],
  "file-braces-corner": [
    "file-braces-corner"
  ],
  "file braces corner": [
    "file-braces-corner"
  ],
  "file-chart-column": [
    "file-chart-column"
  ],
  "file chart column": [
    "file-chart-column"
  ],
  "file-chart-column-increasing": [
    "file-chart-column-increasing"
  ],
  "file chart column increasing": [
    "file-chart-column-increasing"
  ],
  "file-chart-line": [
    "file-chart-line"
  ],
  "file chart line": [
    "file-chart-line"
  ],
  "file-chart-pie": [
    "file-chart-pie"
  ],
  "file chart pie": [
    "file-chart-pie"
  ],
  "file-check": [
    "file-check"
  ],
  "file check": [
    "file-check"
  ],
  "file-check-2": [
    "file-check-2"
  ],
  "file check 2": [
    "file-check-2"
  ],
  "file-check-corner": [
    "file-check-corner"
  ],
  "file check corner": [
    "file-check-corner"
  ],
  "file-clock": [
    "file-clock"
  ],
  "file clock": [
    "file-clock"
  ],
  "file-code": [
    "file-code"
  ],
  "file code": [
    "file-code"
  ],
  "file-code-2": [
    "file-code-2"
  ],
  "file code 2": [
    "file-code-2"
  ],
  "file-code-corner": [
    "file-code-corner"
  ],
  "file code corner": [
    "file-code-corner"
  ],
  "file-cog": [
    "file-cog"
  ],
  "file cog": [
    "file-cog"
  ],
  "file-cog-2": [
    "file-cog-2"
  ],
  "file cog 2": [
    "file-cog-2"
  ],
  "file-diff": [
    "file-diff"
  ],
  "file diff": [
    "file-diff"
  ],
  "file-digit": [
    "file-digit"
  ],
  "file digit": [
    "file-digit"
  ],
  "file-down": [
    "file-down"
  ],
  "file down": [
    "file-down"
  ],
  "file-edit": [
    "file-edit"
  ],
  "file edit": [
    "file-edit"
  ],
  "file-exclamation-point": [
    "file-exclamation-point"
  ],
  "file exclamation point": [
    "file-exclamation-point"
  ],
  "file-headphone": [
    "file-headphone"
  ],
  "file headphone": [
    "file-headphone"
  ],
  "file-heart": [
    "file-heart"
  ],
  "file heart": [
    "file-heart"
  ],
  "file-image": [
    "file-image"
  ],
  "file image": [
    "file-image"
  ],
  "file-input": [
    "file-input"
  ],
  "file input": [
    "file-input"
  ],
  "file-json": [
    "file-json"
  ],
  "file json": [
    "file-json"
  ],
  "file-json-2": [
    "file-json-2"
  ],
  "file json 2": [
    "file-json-2"
  ],
  "file-key": [
    "file-key"
  ],
  "file key": [
    "file-key"
  ],
  "file-key-2": [
    "file-key-2"
  ],
  "file key 2": [
    "file-key-2"
  ],
  "file-line-chart": [
    "file-line-chart"
  ],
  "file line chart": [
    "file-line-chart"
  ],
  "file-lock": [
    "file-lock"
  ],
  "file lock": [
    "file-lock"
  ],
  "file-lock-2": [
    "file-lock-2"
  ],
  "file lock 2": [
    "file-lock-2"
  ],
  "file-minus": [
    "file-minus"
  ],
  "file minus": [
    "file-minus"
  ],
  "file-minus-2": [
    "file-minus-2"
  ],
  "file minus 2": [
    "file-minus-2"
  ],
  "file-minus-corner": [
    "file-minus-corner"
  ],
  "file minus corner": [
    "file-minus-corner"
  ],
  "file-music": [
    "file-music"
  ],
  "file music": [
    "file-music"
  ],
  "file-output": [
    "file-output"
  ],
  "file output": [
    "file-output"
  ],
  "file-pen": [
    "file-pen"
  ],
  "file pen": [
    "file-pen"
  ],
  "file-pen-line": [
    "file-pen-line"
  ],
  "file pen line": [
    "file-pen-line"
  ],
  "file-pie-chart": [
    "file-pie-chart"
  ],
  "file pie chart": [
    "file-pie-chart"
  ],
  "file-play": [
    "file-play"
  ],
  "file play": [
    "file-play"
  ],
  "file-plus": [
    "file-plus"
  ],
  "file plus": [
    "file-plus"
  ],
  "file-plus-2": [
    "file-plus-2"
  ],
  "file plus 2": [
    "file-plus-2"
  ],
  "file-plus-corner": [
    "file-plus-corner"
  ],
  "file plus corner": [
    "file-plus-corner"
  ],
  "file-question": [
    "file-question"
  ],
  "file question": [
    "file-question"
  ],
  "file-question-mark": [
    "file-question-mark"
  ],
  "file question mark": [
    "file-question-mark"
  ],
  "file-scan": [
    "file-scan"
  ],
  "file scan": [
    "file-scan"
  ],
  "file-search": [
    "file-search"
  ],
  "file search": [
    "file-search"
  ],
  "file-search-2": [
    "file-search-2"
  ],
  "file search 2": [
    "file-search-2"
  ],
  "file-search-corner": [
    "file-search-corner"
  ],
  "file search corner": [
    "file-search-corner"
  ],
  "file-signal": [
    "file-signal"
  ],
  "file signal": [
    "file-signal"
  ],
  "file-signature": [
    "file-signature"
  ],
  "file signature": [
    "file-signature"
  ],
  "file-sliders": [
    "file-sliders"
  ],
  "file sliders": [
    "file-sliders"
  ],
  "file-spreadsheet": [
    "file-spreadsheet"
  ],
  "file spreadsheet": [
    "file-spreadsheet"
  ],
  "file-stack": [
    "file-stack"
  ],
  "file stack": [
    "file-stack"
  ],
  "file-symlink": [
    "file-symlink"
  ],
  "file symlink": [
    "file-symlink"
  ],
  "file-terminal": [
    "file-terminal"
  ],
  "file terminal": [
    "file-terminal"
  ],
  "file-text": [
    "file-text"
  ],
  "file text": [
    "file-text"
  ],
  "file-type": [
    "file-type"
  ],
  "file type": [
    "file-type"
  ],
  "file-type-2": [
    "file-type-2"
  ],
  "file type 2": [
    "file-type-2"
  ],
  "file-type-corner": [
    "file-type-corner"
  ],
  "file type corner": [
    "file-type-corner"
  ],
  "file-up": [
    "file-up"
  ],
  "file up": [
    "file-up"
  ],
  "file-user": [
    "file-user"
  ],
  "file user": [
    "file-user"
  ],
  "file-video": [
    "file-video"
  ],
  "file video": [
    "file-video"
  ],
  "file-video-2": [
    "file-video-2"
  ],
  "file video 2": [
    "file-video-2"
  ],
  "file-video-camera": [
    "file-video-camera"
  ],
  "file video camera": [
    "file-video-camera"
  ],
  "file-volume": [
    "file-volume"
  ],
  "file volume": [
    "file-volume"
  ],
  "file-volume-2": [
    "file-volume-2"
  ],
  "file volume 2": [
    "file-volume-2"
  ],
  "file-warning": [
    "file-warning"
  ],
  "file warning": [
    "file-warning"
  ],
  "file-x": [
    "file-x"
  ],
  "file x": [
    "file-x"
  ],
  "file-x-2": [
    "file-x-2"
  ],
  "file x 2": [
    "file-x-2"
  ],
  "file-x-corner": [
    "file-x-corner"
  ],
  "file x corner": [
    "file-x-corner"
  ],
  "files": [
    "files"
  ],
  "film": [
    "film"
  ],
  "filter": [
    "filter"
  ],
  "filter-x": [
    "filter-x"
  ],
  "filter x": [
    "filter-x"
  ],
  "fingerprint": [
    "fingerprint"
  ],
  "fingerprint-pattern": [
    "fingerprint-pattern"
  ],
  "fingerprint pattern": [
    "fingerprint-pattern"
  ],
  "fire-extinguisher": [
    "fire-extinguisher"
  ],
  "fire extinguisher": [
    "fire-extinguisher"
  ],
  "fish": [
    "fish"
  ],
  "fish-off": [
    "fish-off"
  ],
  "fish off": [
    "fish-off"
  ],
  "fish-symbol": [
    "fish-symbol"
  ],
  "fish symbol": [
    "fish-symbol"
  ],
  "fishing-hook": [
    "fishing-hook"
  ],
  "fishing hook": [
    "fishing-hook"
  ],
  "fishing-rod": [
    "fishing-rod"
  ],
  "fishing rod": [
    "fishing-rod"
  ],
  "flag": [
    "flag"
  ],
  "flag-off": [
    "flag-off"
  ],
  "flag off": [
    "flag-off"
  ],
  "flag-triangle-left": [
    "flag-triangle-left"
  ],
  "flag triangle left": [
    "flag-triangle-left"
  ],
  "flag-triangle-right": [
    "flag-triangle-right"
  ],
  "flag triangle right": [
    "flag-triangle-right"
  ],
  "flame": [
    "flame"
  ],
  "flame-kindling": [
    "flame-kindling"
  ],
  "flame kindling": [
    "flame-kindling"
  ],
  "flashlight": [
    "flashlight"
  ],
  "flashlight-off": [
    "flashlight-off"
  ],
  "flashlight off": [
    "flashlight-off"
  ],
  "flask-conical": [
    "flask-conical"
  ],
  "flask conical": [
    "flask-conical"
  ],
  "flask-conical-off": [
    "flask-conical-off"
  ],
  "flask conical off": [
    "flask-conical-off"
  ],
  "flask-round": [
    "flask-round"
  ],
  "flask round": [
    "flask-round"
  ],
  "flip-horizontal": [
    "flip-horizontal"
  ],
  "flip horizontal": [
    "flip-horizontal"
  ],
  "flip-horizontal-2": [
    "flip-horizontal-2"
  ],
  "flip horizontal 2": [
    "flip-horizontal-2"
  ],
  "flip-vertical": [
    "flip-vertical"
  ],
  "flip vertical": [
    "flip-vertical"
  ],
  "flip-vertical-2": [
    "flip-vertical-2"
  ],
  "flip vertical 2": [
    "flip-vertical-2"
  ],
  "flower": [
    "flower"
  ],
  "flower-2": [
    "flower-2"
  ],
  "flower 2": [
    "flower-2"
  ],
  "focus": [
    "focus"
  ],
  "fold-horizontal": [
    "fold-horizontal"
  ],
  "fold horizontal": [
    "fold-horizontal"
  ],
  "fold-vertical": [
    "fold-vertical"
  ],
  "fold vertical": [
    "fold-vertical"
  ],
  "folder": [
    "folder"
  ],
  "folder-archive": [
    "folder-archive"
  ],
  "folder archive": [
    "folder-archive"
  ],
  "folder-bookmark": [
    "folder-bookmark"
  ],
  "folder bookmark": [
    "folder-bookmark"
  ],
  "folder-check": [
    "folder-check"
  ],
  "folder check": [
    "folder-check"
  ],
  "folder-clock": [
    "folder-clock"
  ],
  "folder clock": [
    "folder-clock"
  ],
  "folder-closed": [
    "folder-closed"
  ],
  "folder closed": [
    "folder-closed"
  ],
  "folder-code": [
    "folder-code"
  ],
  "folder code": [
    "folder-code"
  ],
  "folder-cog": [
    "folder-cog"
  ],
  "folder cog": [
    "folder-cog"
  ],
  "folder-cog-2": [
    "folder-cog-2"
  ],
  "folder cog 2": [
    "folder-cog-2"
  ],
  "folder-dot": [
    "folder-dot"
  ],
  "folder dot": [
    "folder-dot"
  ],
  "folder-down": [
    "folder-down"
  ],
  "folder down": [
    "folder-down"
  ],
  "folder-edit": [
    "folder-edit"
  ],
  "folder edit": [
    "folder-edit"
  ],
  "folder-git": [
    "folder-git"
  ],
  "folder git": [
    "folder-git"
  ],
  "folder-git-2": [
    "folder-git-2"
  ],
  "folder git 2": [
    "folder-git-2"
  ],
  "folder-heart": [
    "folder-heart"
  ],
  "folder heart": [
    "folder-heart"
  ],
  "folder-input": [
    "folder-input"
  ],
  "folder input": [
    "folder-input"
  ],
  "folder-kanban": [
    "folder-kanban"
  ],
  "folder kanban": [
    "folder-kanban"
  ],
  "folder-key": [
    "folder-key"
  ],
  "folder key": [
    "folder-key"
  ],
  "folder-lock": [
    "folder-lock"
  ],
  "folder lock": [
    "folder-lock"
  ],
  "folder-minus": [
    "folder-minus"
  ],
  "folder minus": [
    "folder-minus"
  ],
  "folder-open": [
    "folder-open"
  ],
  "folder open": [
    "folder-open"
  ],
  "folder-open-dot": [
    "folder-open-dot"
  ],
  "folder open dot": [
    "folder-open-dot"
  ],
  "folder-output": [
    "folder-output"
  ],
  "folder output": [
    "folder-output"
  ],
  "folder-pen": [
    "folder-pen"
  ],
  "folder pen": [
    "folder-pen"
  ],
  "folder-plus": [
    "folder-plus"
  ],
  "folder plus": [
    "folder-plus"
  ],
  "folder-root": [
    "folder-root"
  ],
  "folder root": [
    "folder-root"
  ],
  "folder-search": [
    "folder-search"
  ],
  "folder search": [
    "folder-search"
  ],
  "folder-search-2": [
    "folder-search-2"
  ],
  "folder search 2": [
    "folder-search-2"
  ],
  "folder-symlink": [
    "folder-symlink"
  ],
  "folder symlink": [
    "folder-symlink"
  ],
  "folder-sync": [
    "folder-sync"
  ],
  "folder sync": [
    "folder-sync"
  ],
  "folder-tree": [
    "folder-tree"
  ],
  "folder tree": [
    "folder-tree"
  ],
  "folder-up": [
    "folder-up"
  ],
  "folder up": [
    "folder-up"
  ],
  "folder-x": [
    "folder-x"
  ],
  "folder x": [
    "folder-x"
  ],
  "folders": [
    "folders"
  ],
  "footprints": [
    "footprints"
  ],
  "fork-knife": [
    "fork-knife"
  ],
  "fork knife": [
    "fork-knife"
  ],
  "fork-knife-crossed": [
    "fork-knife-crossed"
  ],
  "fork knife crossed": [
    "fork-knife-crossed"
  ],
  "forklift": [
    "forklift"
  ],
  "form": [
    "form"
  ],
  "form-input": [
    "form-input"
  ],
  "form input": [
    "form-input"
  ],
  "forward": [
    "forward"
  ],
  "fragile": [
    "fragile"
  ],
  "fragil": [
    "fragile"
  ],
  "vidro": [
    "fragile"
  ],
  "cuidado": [
    "fragile"
  ],
  "frame": [
    "frame"
  ],
  "frown": [
    "frown"
  ],
  "fuel": [
    "fuel"
  ],
  "fullscreen": [
    "fullscreen"
  ],
  "function-square": [
    "function-square"
  ],
  "function square": [
    "function-square"
  ],
  "funnel": [
    "funnel"
  ],
  "funnel-plus": [
    "funnel-plus"
  ],
  "funnel plus": [
    "funnel-plus"
  ],
  "funnel-x": [
    "funnel-x"
  ],
  "funnel x": [
    "funnel-x"
  ],
  "galaxy": [
    "galaxy"
  ],
  "gallery-horizontal": [
    "gallery-horizontal"
  ],
  "gallery horizontal": [
    "gallery-horizontal"
  ],
  "gallery-horizontal-end": [
    "gallery-horizontal-end"
  ],
  "gallery horizontal end": [
    "gallery-horizontal-end"
  ],
  "gallery-thumbnails": [
    "gallery-thumbnails"
  ],
  "gallery thumbnails": [
    "gallery-thumbnails"
  ],
  "gallery-vertical": [
    "gallery-vertical"
  ],
  "gallery vertical": [
    "gallery-vertical"
  ],
  "gallery-vertical-end": [
    "gallery-vertical-end"
  ],
  "gallery vertical end": [
    "gallery-vertical-end"
  ],
  "gamepad": [
    "gamepad"
  ],
  "gamepad-2": [
    "gamepad-2"
  ],
  "gamepad 2": [
    "gamepad-2"
  ],
  "gamepad-directional": [
    "gamepad-directional"
  ],
  "gamepad directional": [
    "gamepad-directional"
  ],
  "gantt-chart": [
    "gantt-chart"
  ],
  "gantt chart": [
    "gantt-chart"
  ],
  "gantt-chart-square": [
    "gantt-chart-square"
  ],
  "gantt chart square": [
    "gantt-chart-square"
  ],
  "gap-horizontal": [
    "gap-horizontal"
  ],
  "gap horizontal": [
    "gap-horizontal"
  ],
  "gap-vertical": [
    "gap-vertical"
  ],
  "gap vertical": [
    "gap-vertical"
  ],
  "gas-cylinder": [
    "gas-cylinder"
  ],
  "gas cylinder": [
    "gas-cylinder"
  ],
  "ghs": [
    "gas-cylinder"
  ],
  "gas": [
    "gas-cylinder"
  ],
  "pressao": [
    "gas-cylinder"
  ],
  "cilindro": [
    "gas-cylinder"
  ],
  "gauge": [
    "gauge"
  ],
  "gauge-circle": [
    "gauge-circle"
  ],
  "gauge circle": [
    "gauge-circle"
  ],
  "gavel": [
    "gavel"
  ],
  "gem": [
    "gem"
  ],
  "georgian-lari": [
    "georgian-lari"
  ],
  "georgian lari": [
    "georgian-lari"
  ],
  "germ": [
    "germ"
  ],
  "germ-off": [
    "germ-off"
  ],
  "germ off": [
    "germ-off"
  ],
  "ghost": [
    "ghost"
  ],
  "gift": [
    "gift"
  ],
  "git-branch": [
    "git-branch"
  ],
  "git branch": [
    "git-branch"
  ],
  "git-branch-minus": [
    "git-branch-minus"
  ],
  "git branch minus": [
    "git-branch-minus"
  ],
  "git-branch-plus": [
    "git-branch-plus"
  ],
  "git branch plus": [
    "git-branch-plus"
  ],
  "git-commit": [
    "git-commit"
  ],
  "git commit": [
    "git-commit"
  ],
  "git-commit-horizontal": [
    "git-commit-horizontal"
  ],
  "git commit horizontal": [
    "git-commit-horizontal"
  ],
  "git-commit-vertical": [
    "git-commit-vertical"
  ],
  "git commit vertical": [
    "git-commit-vertical"
  ],
  "git-compare": [
    "git-compare"
  ],
  "git compare": [
    "git-compare"
  ],
  "git-compare-arrows": [
    "git-compare-arrows"
  ],
  "git compare arrows": [
    "git-compare-arrows"
  ],
  "git-fork": [
    "git-fork"
  ],
  "git fork": [
    "git-fork"
  ],
  "git-graph": [
    "git-graph"
  ],
  "git graph": [
    "git-graph"
  ],
  "git-merge": [
    "git-merge"
  ],
  "git merge": [
    "git-merge"
  ],
  "git-merge-conflict": [
    "git-merge-conflict"
  ],
  "git merge conflict": [
    "git-merge-conflict"
  ],
  "git-pull-request": [
    "git-pull-request"
  ],
  "git pull request": [
    "git-pull-request"
  ],
  "git-pull-request-arrow": [
    "git-pull-request-arrow"
  ],
  "git pull request arrow": [
    "git-pull-request-arrow"
  ],
  "git-pull-request-closed": [
    "git-pull-request-closed"
  ],
  "git pull request closed": [
    "git-pull-request-closed"
  ],
  "git-pull-request-create": [
    "git-pull-request-create"
  ],
  "git pull request create": [
    "git-pull-request-create"
  ],
  "git-pull-request-create-arrow": [
    "git-pull-request-create-arrow"
  ],
  "git pull request create arrow": [
    "git-pull-request-create-arrow"
  ],
  "git-pull-request-draft": [
    "git-pull-request-draft"
  ],
  "git pull request draft": [
    "git-pull-request-draft"
  ],
  "glass-water": [
    "glass-water"
  ],
  "glass water": [
    "glass-water"
  ],
  "glasses": [
    "glasses"
  ],
  "globe": [
    "globe"
  ],
  "globe-2": [
    "globe-2"
  ],
  "globe 2": [
    "globe-2"
  ],
  "globe-check": [
    "globe-check"
  ],
  "globe check": [
    "globe-check"
  ],
  "globe-code": [
    "globe-code"
  ],
  "globe code": [
    "globe-code"
  ],
  "globe-lock": [
    "globe-lock"
  ],
  "globe lock": [
    "globe-lock"
  ],
  "globe-off": [
    "globe-off"
  ],
  "globe off": [
    "globe-off"
  ],
  "globe-x": [
    "globe-x"
  ],
  "globe x": [
    "globe-x"
  ],
  "goal": [
    "goal"
  ],
  "gpu": [
    "gpu"
  ],
  "grab": [
    "grab"
  ],
  "graduation-cap": [
    "graduation-cap"
  ],
  "graduation cap": [
    "graduation-cap"
  ],
  "grape": [
    "grape"
  ],
  "grid": [
    "grid"
  ],
  "grid-2-x-2": [
    "grid-2-x-2"
  ],
  "grid 2 x 2": [
    "grid-2-x-2"
  ],
  "grid-2-x-2-check": [
    "grid-2-x-2-check"
  ],
  "grid 2 x 2 check": [
    "grid-2-x-2-check"
  ],
  "grid-2-x-2-plus": [
    "grid-2-x-2-plus"
  ],
  "grid 2 x 2 plus": [
    "grid-2-x-2-plus"
  ],
  "grid-2-x-2-x": [
    "grid-2-x-2-x"
  ],
  "grid 2 x 2 x": [
    "grid-2-x-2-x"
  ],
  "grid-2x2": [
    "grid-2x2"
  ],
  "grid 2x2": [
    "grid-2x2"
  ],
  "grid-2x2-check": [
    "grid-2x2-check"
  ],
  "grid 2x2 check": [
    "grid-2x2-check"
  ],
  "grid-2x2-plus": [
    "grid-2x2-plus"
  ],
  "grid 2x2 plus": [
    "grid-2x2-plus"
  ],
  "grid-2x2-x": [
    "grid-2x2-x"
  ],
  "grid 2x2 x": [
    "grid-2x2-x"
  ],
  "grid-3-x-3": [
    "grid-3-x-3"
  ],
  "grid 3 x 3": [
    "grid-3-x-3"
  ],
  "grid-3x2": [
    "grid-3x2"
  ],
  "grid 3x2": [
    "grid-3x2"
  ],
  "grid-3x3": [
    "grid-3x3"
  ],
  "grid 3x3": [
    "grid-3x3"
  ],
  "grip": [
    "grip"
  ],
  "grip-horizontal": [
    "grip-horizontal"
  ],
  "grip horizontal": [
    "grip-horizontal"
  ],
  "grip-vertical": [
    "grip-vertical"
  ],
  "grip vertical": [
    "grip-vertical"
  ],
  "groceries": [
    "groceries"
  ],
  "group": [
    "group"
  ],
  "guitar": [
    "guitar"
  ],
  "ham": [
    "ham"
  ],
  "hamburger": [
    "hamburger"
  ],
  "hammer": [
    "hammer"
  ],
  "hand": [
    "hand"
  ],
  "hand-coins": [
    "hand-coins"
  ],
  "hand coins": [
    "hand-coins"
  ],
  "hand-fist": [
    "hand-fist"
  ],
  "hand fist": [
    "hand-fist"
  ],
  "hand-grab": [
    "hand-grab"
  ],
  "hand grab": [
    "hand-grab"
  ],
  "hand-heart": [
    "hand-heart"
  ],
  "hand heart": [
    "hand-heart"
  ],
  "hand-helping": [
    "hand-helping"
  ],
  "hand helping": [
    "hand-helping"
  ],
  "hand-metal": [
    "hand-metal"
  ],
  "hand metal": [
    "hand-metal"
  ],
  "hand-platter": [
    "hand-platter"
  ],
  "hand platter": [
    "hand-platter"
  ],
  "handbag": [
    "handbag"
  ],
  "handle-bottom-right": [
    "handle-bottom-right"
  ],
  "handle bottom right": [
    "handle-bottom-right"
  ],
  "handshake": [
    "handshake"
  ],
  "hard-drive": [
    "hard-drive"
  ],
  "hard drive": [
    "hard-drive"
  ],
  "hard-drive-download": [
    "hard-drive-download"
  ],
  "hard drive download": [
    "hard-drive-download"
  ],
  "hard-drive-upload": [
    "hard-drive-upload"
  ],
  "hard drive upload": [
    "hard-drive-upload"
  ],
  "hard-hat": [
    "hard-hat"
  ],
  "hard hat": [
    "hard-hat"
  ],
  "hash": [
    "hash"
  ],
  "hat-glasses": [
    "hat-glasses"
  ],
  "hat glasses": [
    "hat-glasses"
  ],
  "haze": [
    "haze"
  ],
  "hd": [
    "hd"
  ],
  "hdmi-port": [
    "hdmi-port"
  ],
  "hdmi port": [
    "hdmi-port"
  ],
  "heading": [
    "heading"
  ],
  "heading-1": [
    "heading-1"
  ],
  "heading 1": [
    "heading-1"
  ],
  "heading-2": [
    "heading-2"
  ],
  "heading 2": [
    "heading-2"
  ],
  "heading-3": [
    "heading-3"
  ],
  "heading 3": [
    "heading-3"
  ],
  "heading-4": [
    "heading-4"
  ],
  "heading 4": [
    "heading-4"
  ],
  "heading-5": [
    "heading-5"
  ],
  "heading 5": [
    "heading-5"
  ],
  "heading-6": [
    "heading-6"
  ],
  "heading 6": [
    "heading-6"
  ],
  "headphone-off": [
    "headphone-off"
  ],
  "headphone off": [
    "headphone-off"
  ],
  "headphones": [
    "headphones"
  ],
  "headset": [
    "headset"
  ],
  "heart": [
    "heart"
  ],
  "heart-crack": [
    "heart-crack"
  ],
  "heart crack": [
    "heart-crack"
  ],
  "heart-handshake": [
    "heart-handshake"
  ],
  "heart handshake": [
    "heart-handshake"
  ],
  "heart-minus": [
    "heart-minus"
  ],
  "heart minus": [
    "heart-minus"
  ],
  "heart-off": [
    "heart-off"
  ],
  "heart off": [
    "heart-off"
  ],
  "heart-plus": [
    "heart-plus"
  ],
  "heart plus": [
    "heart-plus"
  ],
  "heart-pulse": [
    "heart-pulse"
  ],
  "heart pulse": [
    "heart-pulse"
  ],
  "heart-x": [
    "heart-x"
  ],
  "heart x": [
    "heart-x"
  ],
  "heater": [
    "heater"
  ],
  "helicopter": [
    "helicopter"
  ],
  "help-circle": [
    "help-circle"
  ],
  "help circle": [
    "help-circle"
  ],
  "helping-hand": [
    "helping-hand"
  ],
  "helping hand": [
    "helping-hand"
  ],
  "hexagon": [
    "hexagon"
  ],
  "highlighter": [
    "highlighter"
  ],
  "hiking-stick": [
    "hiking-stick"
  ],
  "hiking stick": [
    "hiking-stick"
  ],
  "history": [
    "history"
  ],
  "home": [
    "home"
  ],
  "hop": [
    "hop"
  ],
  "hop-off": [
    "hop-off"
  ],
  "hop off": [
    "hop-off"
  ],
  "hospital": [
    "hospital"
  ],
  "hotel": [
    "hotel"
  ],
  "hourglass": [
    "hourglass"
  ],
  "hourglass-cog": [
    "hourglass-cog"
  ],
  "hourglass cog": [
    "hourglass-cog"
  ],
  "house": [
    "house"
  ],
  "house-cog": [
    "house-cog"
  ],
  "house cog": [
    "house-cog"
  ],
  "house-heart": [
    "house-heart"
  ],
  "house heart": [
    "house-heart"
  ],
  "house-plug": [
    "house-plug"
  ],
  "house plug": [
    "house-plug"
  ],
  "house-plus": [
    "house-plus"
  ],
  "house plus": [
    "house-plus"
  ],
  "house-wifi": [
    "house-wifi"
  ],
  "house wifi": [
    "house-wifi"
  ],
  "houses": [
    "houses"
  ],
  "ice-cream": [
    "ice-cream"
  ],
  "ice cream": [
    "ice-cream"
  ],
  "ice-cream-2": [
    "ice-cream-2"
  ],
  "ice cream 2": [
    "ice-cream-2"
  ],
  "ice-cream-bowl": [
    "ice-cream-bowl"
  ],
  "ice cream bowl": [
    "ice-cream-bowl"
  ],
  "ice-cream-cone": [
    "ice-cream-cone"
  ],
  "ice cream cone": [
    "ice-cream-cone"
  ],
  "id-card": [
    "id-card"
  ],
  "id card": [
    "id-card"
  ],
  "id-card-lanyard": [
    "id-card-lanyard"
  ],
  "id card lanyard": [
    "id-card-lanyard"
  ],
  "image": [
    "image"
  ],
  "image-down": [
    "image-down"
  ],
  "image down": [
    "image-down"
  ],
  "image-minus": [
    "image-minus"
  ],
  "image minus": [
    "image-minus"
  ],
  "image-off": [
    "image-off"
  ],
  "image off": [
    "image-off"
  ],
  "image-play": [
    "image-play"
  ],
  "image play": [
    "image-play"
  ],
  "image-plus": [
    "image-plus"
  ],
  "image plus": [
    "image-plus"
  ],
  "image-up": [
    "image-up"
  ],
  "image up": [
    "image-up"
  ],
  "image-upscale": [
    "image-upscale"
  ],
  "image upscale": [
    "image-upscale"
  ],
  "images": [
    "images"
  ],
  "import": [
    "import"
  ],
  "inbox": [
    "inbox"
  ],
  "indent": [
    "indent"
  ],
  "indent-decrease": [
    "indent-decrease"
  ],
  "indent decrease": [
    "indent-decrease"
  ],
  "indent-increase": [
    "indent-increase"
  ],
  "indent increase": [
    "indent-increase"
  ],
  "indian-rupee": [
    "indian-rupee"
  ],
  "indian rupee": [
    "indian-rupee"
  ],
  "infinity": [
    "infinity"
  ],
  "info": [
    "info"
  ],
  "inspect": [
    "inspect"
  ],
  "inspection-panel": [
    "inspection-panel"
  ],
  "inspection panel": [
    "inspection-panel"
  ],
  "italic": [
    "italic"
  ],
  "iteration-ccw": [
    "iteration-ccw"
  ],
  "iteration ccw": [
    "iteration-ccw"
  ],
  "iteration-cw": [
    "iteration-cw"
  ],
  "iteration cw": [
    "iteration-cw"
  ],
  "iv-bag": [
    "iv-bag"
  ],
  "iv bag": [
    "iv-bag"
  ],
  "japanese-yen": [
    "japanese-yen"
  ],
  "japanese yen": [
    "japanese-yen"
  ],
  "joystick": [
    "joystick"
  ],
  "kanban": [
    "kanban"
  ],
  "kanban-square": [
    "kanban-square"
  ],
  "kanban square": [
    "kanban-square"
  ],
  "kanban-square-dashed": [
    "kanban-square-dashed"
  ],
  "kanban square dashed": [
    "kanban-square-dashed"
  ],
  "kayak": [
    "kayak"
  ],
  "kazakh-tenge": [
    "kazakh-tenge"
  ],
  "kazakh tenge": [
    "kazakh-tenge"
  ],
  "key": [
    "key"
  ],
  "key-round": [
    "key-round"
  ],
  "key round": [
    "key-round"
  ],
  "key-square": [
    "key-square"
  ],
  "key square": [
    "key-square"
  ],
  "keyboard": [
    "keyboard"
  ],
  "keyboard-music": [
    "keyboard-music"
  ],
  "keyboard music": [
    "keyboard-music"
  ],
  "keyboard-off": [
    "keyboard-off"
  ],
  "keyboard off": [
    "keyboard-off"
  ],
  "lambda": [
    "lambda"
  ],
  "lamp": [
    "lamp"
  ],
  "lamp-ceiling": [
    "lamp-ceiling"
  ],
  "lamp ceiling": [
    "lamp-ceiling"
  ],
  "lamp-desk": [
    "lamp-desk"
  ],
  "lamp desk": [
    "lamp-desk"
  ],
  "lamp-floor": [
    "lamp-floor"
  ],
  "lamp floor": [
    "lamp-floor"
  ],
  "lamp-wall-down": [
    "lamp-wall-down"
  ],
  "lamp wall down": [
    "lamp-wall-down"
  ],
  "lamp-wall-up": [
    "lamp-wall-up"
  ],
  "lamp wall up": [
    "lamp-wall-up"
  ],
  "land-plot": [
    "land-plot"
  ],
  "land plot": [
    "land-plot"
  ],
  "landmark": [
    "landmark"
  ],
  "languages": [
    "languages"
  ],
  "laptop": [
    "laptop"
  ],
  "laptop-2": [
    "laptop-2"
  ],
  "laptop 2": [
    "laptop-2"
  ],
  "laptop-minimal": [
    "laptop-minimal"
  ],
  "laptop minimal": [
    "laptop-minimal"
  ],
  "laptop-minimal-check": [
    "laptop-minimal-check"
  ],
  "laptop minimal check": [
    "laptop-minimal-check"
  ],
  "lasso": [
    "lasso"
  ],
  "lasso-select": [
    "lasso-select"
  ],
  "lasso select": [
    "lasso-select"
  ],
  "laugh": [
    "laugh"
  ],
  "layer-arrow-down": [
    "layer-arrow-down"
  ],
  "layer arrow down": [
    "layer-arrow-down"
  ],
  "layer-arrow-up": [
    "layer-arrow-up"
  ],
  "layer arrow up": [
    "layer-arrow-up"
  ],
  "layers": [
    "layers"
  ],
  "layers-2": [
    "layers-2"
  ],
  "layers 2": [
    "layers-2"
  ],
  "layers-3": [
    "layers-3"
  ],
  "layers 3": [
    "layers-3"
  ],
  "layers-arrow-down": [
    "layers-arrow-down"
  ],
  "layers arrow down": [
    "layers-arrow-down"
  ],
  "layers-arrow-up": [
    "layers-arrow-up"
  ],
  "layers arrow up": [
    "layers-arrow-up"
  ],
  "layers-minus": [
    "layers-minus"
  ],
  "layers minus": [
    "layers-minus"
  ],
  "layers-plus": [
    "layers-plus"
  ],
  "layers plus": [
    "layers-plus"
  ],
  "layout": [
    "layout"
  ],
  "layout-arrow-down": [
    "layout-arrow-down"
  ],
  "layout arrow down": [
    "layout-arrow-down"
  ],
  "layout-arrow-right": [
    "layout-arrow-right"
  ],
  "layout arrow right": [
    "layout-arrow-right"
  ],
  "layout-dashboard": [
    "layout-dashboard"
  ],
  "layout dashboard": [
    "layout-dashboard"
  ],
  "layout-freeform": [
    "layout-freeform"
  ],
  "layout freeform": [
    "layout-freeform"
  ],
  "layout-grid": [
    "layout-grid"
  ],
  "layout grid": [
    "layout-grid"
  ],
  "layout-grid-circles": [
    "layout-grid-circles"
  ],
  "layout grid circles": [
    "layout-grid-circles"
  ],
  "layout-list": [
    "layout-list"
  ],
  "layout list": [
    "layout-list"
  ],
  "layout-panel-left": [
    "layout-panel-left"
  ],
  "layout panel left": [
    "layout-panel-left"
  ],
  "layout-panel-top": [
    "layout-panel-top"
  ],
  "layout panel top": [
    "layout-panel-top"
  ],
  "layout-template": [
    "layout-template"
  ],
  "layout template": [
    "layout-template"
  ],
  "leaf": [
    "leaf"
  ],
  "leafy-green": [
    "leafy-green"
  ],
  "leafy green": [
    "leafy-green"
  ],
  "lectern": [
    "lectern"
  ],
  "lens": [
    "lens"
  ],
  "lens-concave": [
    "lens-concave"
  ],
  "lens concave": [
    "lens-concave"
  ],
  "lens-convex": [
    "lens-convex"
  ],
  "lens convex": [
    "lens-convex"
  ],
  "letter-text": [
    "letter-text"
  ],
  "letter text": [
    "letter-text"
  ],
  "letters": [
    "letters"
  ],
  "library": [
    "library"
  ],
  "library-big": [
    "library-big"
  ],
  "library big": [
    "library-big"
  ],
  "library-square": [
    "library-square"
  ],
  "library square": [
    "library-square"
  ],
  "life-buoy": [
    "life-buoy"
  ],
  "life buoy": [
    "life-buoy"
  ],
  "ligature": [
    "ligature"
  ],
  "lightbulb": [
    "lightbulb"
  ],
  "lightbulb-off": [
    "lightbulb-off"
  ],
  "lightbulb off": [
    "lightbulb-off"
  ],
  "lighthouse": [
    "lighthouse"
  ],
  "line-chart": [
    "line-chart"
  ],
  "line chart": [
    "line-chart"
  ],
  "line-dot-bottom-vertical": [
    "line-dot-bottom-vertical"
  ],
  "line dot bottom vertical": [
    "line-dot-bottom-vertical"
  ],
  "line-dot-left-horizontal": [
    "line-dot-left-horizontal"
  ],
  "line dot left horizontal": [
    "line-dot-left-horizontal"
  ],
  "line-dot-right-horizontal": [
    "line-dot-right-horizontal"
  ],
  "line dot right horizontal": [
    "line-dot-right-horizontal"
  ],
  "line-dot-top-vertical": [
    "line-dot-top-vertical"
  ],
  "line dot top vertical": [
    "line-dot-top-vertical"
  ],
  "line-squiggle": [
    "line-squiggle"
  ],
  "line squiggle": [
    "line-squiggle"
  ],
  "line-style": [
    "line-style"
  ],
  "line style": [
    "line-style"
  ],
  "link": [
    "link"
  ],
  "link-2": [
    "link-2"
  ],
  "link 2": [
    "link-2"
  ],
  "link-2-off": [
    "link-2-off"
  ],
  "link 2 off": [
    "link-2-off"
  ],
  "list": [
    "list"
  ],
  "list-check": [
    "list-check"
  ],
  "list check": [
    "list-check"
  ],
  "list-checks": [
    "list-checks"
  ],
  "list checks": [
    "list-checks"
  ],
  "list-chevrons-down-up": [
    "list-chevrons-down-up"
  ],
  "list chevrons down up": [
    "list-chevrons-down-up"
  ],
  "list-chevrons-up-down": [
    "list-chevrons-up-down"
  ],
  "list chevrons up down": [
    "list-chevrons-up-down"
  ],
  "list-clock": [
    "list-clock"
  ],
  "list clock": [
    "list-clock"
  ],
  "list-collapse": [
    "list-collapse"
  ],
  "list collapse": [
    "list-collapse"
  ],
  "list-end": [
    "list-end"
  ],
  "list end": [
    "list-end"
  ],
  "list-filter": [
    "list-filter"
  ],
  "list filter": [
    "list-filter"
  ],
  "list-filter-plus": [
    "list-filter-plus"
  ],
  "list filter plus": [
    "list-filter-plus"
  ],
  "list-indent-decrease": [
    "list-indent-decrease"
  ],
  "list indent decrease": [
    "list-indent-decrease"
  ],
  "list-indent-increase": [
    "list-indent-increase"
  ],
  "list indent increase": [
    "list-indent-increase"
  ],
  "list-minus": [
    "list-minus"
  ],
  "list minus": [
    "list-minus"
  ],
  "list-music": [
    "list-music"
  ],
  "list music": [
    "list-music"
  ],
  "list-ordered": [
    "list-ordered"
  ],
  "list ordered": [
    "list-ordered"
  ],
  "list-plus": [
    "list-plus"
  ],
  "list plus": [
    "list-plus"
  ],
  "list-restart": [
    "list-restart"
  ],
  "list restart": [
    "list-restart"
  ],
  "list-sort-ascending": [
    "list-sort-ascending"
  ],
  "list sort ascending": [
    "list-sort-ascending"
  ],
  "list-sort-descending": [
    "list-sort-descending"
  ],
  "list sort descending": [
    "list-sort-descending"
  ],
  "list-start": [
    "list-start"
  ],
  "list start": [
    "list-start"
  ],
  "list-todo": [
    "list-todo"
  ],
  "list todo": [
    "list-todo"
  ],
  "list-tree": [
    "list-tree"
  ],
  "list tree": [
    "list-tree"
  ],
  "list-video": [
    "list-video"
  ],
  "list video": [
    "list-video"
  ],
  "list-x": [
    "list-x"
  ],
  "list x": [
    "list-x"
  ],
  "loader": [
    "loader"
  ],
  "loader-2": [
    "loader-2"
  ],
  "loader 2": [
    "loader-2"
  ],
  "loader-circle": [
    "loader-circle"
  ],
  "loader circle": [
    "loader-circle"
  ],
  "loader-pinwheel": [
    "loader-pinwheel"
  ],
  "loader pinwheel": [
    "loader-pinwheel"
  ],
  "locate": [
    "locate"
  ],
  "locate-fixed": [
    "locate-fixed"
  ],
  "locate fixed": [
    "locate-fixed"
  ],
  "locate-off": [
    "locate-off"
  ],
  "locate off": [
    "locate-off"
  ],
  "location-edit": [
    "location-edit"
  ],
  "location edit": [
    "location-edit"
  ],
  "lock": [
    "lock"
  ],
  "lock-keyhole": [
    "lock-keyhole"
  ],
  "lock keyhole": [
    "lock-keyhole"
  ],
  "lock-keyhole-open": [
    "lock-keyhole-open"
  ],
  "lock keyhole open": [
    "lock-keyhole-open"
  ],
  "lock-open": [
    "lock-open"
  ],
  "lock open": [
    "lock-open"
  ],
  "log-in": [
    "log-in"
  ],
  "log in": [
    "log-in"
  ],
  "log-out": [
    "log-out"
  ],
  "log out": [
    "log-out"
  ],
  "logs": [
    "logs"
  ],
  "lollipop": [
    "lollipop"
  ],
  "luggage": [
    "luggage"
  ],
  "m-square": [
    "m-square"
  ],
  "m square": [
    "m-square"
  ],
  "magnet": [
    "magnet"
  ],
  "mail": [
    "mail"
  ],
  "mail-badge": [
    "mail-badge"
  ],
  "mail badge": [
    "mail-badge"
  ],
  "mail-check": [
    "mail-check"
  ],
  "mail check": [
    "mail-check"
  ],
  "mail-clock": [
    "mail-clock"
  ],
  "mail clock": [
    "mail-clock"
  ],
  "mail-dot": [
    "mail-dot"
  ],
  "mail dot": [
    "mail-dot"
  ],
  "mail-minus": [
    "mail-minus"
  ],
  "mail minus": [
    "mail-minus"
  ],
  "mail-open": [
    "mail-open"
  ],
  "mail open": [
    "mail-open"
  ],
  "mail-pen": [
    "mail-pen"
  ],
  "mail pen": [
    "mail-pen"
  ],
  "mail-plus": [
    "mail-plus"
  ],
  "mail plus": [
    "mail-plus"
  ],
  "mail-question": [
    "mail-question"
  ],
  "mail question": [
    "mail-question"
  ],
  "mail-question-mark": [
    "mail-question-mark"
  ],
  "mail question mark": [
    "mail-question-mark"
  ],
  "mail-search": [
    "mail-search"
  ],
  "mail search": [
    "mail-search"
  ],
  "mail-warning": [
    "mail-warning"
  ],
  "mail warning": [
    "mail-warning"
  ],
  "mail-x": [
    "mail-x"
  ],
  "mail x": [
    "mail-x"
  ],
  "mailbox": [
    "mailbox"
  ],
  "mails": [
    "mails"
  ],
  "map": [
    "map"
  ],
  "map-minus": [
    "map-minus"
  ],
  "map minus": [
    "map-minus"
  ],
  "map-pin": [
    "map-pin"
  ],
  "map pin": [
    "map-pin"
  ],
  "map-pin-check": [
    "map-pin-check"
  ],
  "map pin check": [
    "map-pin-check"
  ],
  "map-pin-check-inside": [
    "map-pin-check-inside"
  ],
  "map pin check inside": [
    "map-pin-check-inside"
  ],
  "map-pin-house": [
    "map-pin-house"
  ],
  "map pin house": [
    "map-pin-house"
  ],
  "map-pin-minus": [
    "map-pin-minus"
  ],
  "map pin minus": [
    "map-pin-minus"
  ],
  "map-pin-minus-inside": [
    "map-pin-minus-inside"
  ],
  "map pin minus inside": [
    "map-pin-minus-inside"
  ],
  "map-pin-off": [
    "map-pin-off"
  ],
  "map pin off": [
    "map-pin-off"
  ],
  "map-pin-pen": [
    "map-pin-pen"
  ],
  "map pin pen": [
    "map-pin-pen"
  ],
  "map-pin-plus": [
    "map-pin-plus"
  ],
  "map pin plus": [
    "map-pin-plus"
  ],
  "map-pin-plus-inside": [
    "map-pin-plus-inside"
  ],
  "map pin plus inside": [
    "map-pin-plus-inside"
  ],
  "map-pin-search": [
    "map-pin-search"
  ],
  "map pin search": [
    "map-pin-search"
  ],
  "map-pin-x": [
    "map-pin-x"
  ],
  "map pin x": [
    "map-pin-x"
  ],
  "map-pin-x-inside": [
    "map-pin-x-inside"
  ],
  "map pin x inside": [
    "map-pin-x-inside"
  ],
  "map-pinned": [
    "map-pinned"
  ],
  "map pinned": [
    "map-pinned"
  ],
  "map-plus": [
    "map-plus"
  ],
  "map plus": [
    "map-plus"
  ],
  "mars": [
    "mars"
  ],
  "mars-stroke": [
    "mars-stroke"
  ],
  "mars stroke": [
    "mars-stroke"
  ],
  "martini": [
    "martini"
  ],
  "maximize": [
    "maximize"
  ],
  "maximize-2": [
    "maximize-2"
  ],
  "maximize 2": [
    "maximize-2"
  ],
  "medal": [
    "medal"
  ],
  "megaphone": [
    "megaphone"
  ],
  "megaphone-off": [
    "megaphone-off"
  ],
  "megaphone off": [
    "megaphone-off"
  ],
  "meh": [
    "meh"
  ],
  "memory-stick": [
    "memory-stick"
  ],
  "memory stick": [
    "memory-stick"
  ],
  "menu": [
    "menu"
  ],
  "menu-square": [
    "menu-square"
  ],
  "menu square": [
    "menu-square"
  ],
  "merge": [
    "merge"
  ],
  "message-circle": [
    "message-circle"
  ],
  "message circle": [
    "message-circle"
  ],
  "message-circle-check": [
    "message-circle-check"
  ],
  "message circle check": [
    "message-circle-check"
  ],
  "message-circle-code": [
    "message-circle-code"
  ],
  "message circle code": [
    "message-circle-code"
  ],
  "message-circle-dashed": [
    "message-circle-dashed"
  ],
  "message circle dashed": [
    "message-circle-dashed"
  ],
  "message-circle-dashed-check": [
    "message-circle-dashed-check"
  ],
  "message circle dashed check": [
    "message-circle-dashed-check"
  ],
  "message-circle-heart": [
    "message-circle-heart"
  ],
  "message circle heart": [
    "message-circle-heart"
  ],
  "message-circle-more": [
    "message-circle-more"
  ],
  "message circle more": [
    "message-circle-more"
  ],
  "message-circle-off": [
    "message-circle-off"
  ],
  "message circle off": [
    "message-circle-off"
  ],
  "message-circle-plus": [
    "message-circle-plus"
  ],
  "message circle plus": [
    "message-circle-plus"
  ],
  "message-circle-question": [
    "message-circle-question"
  ],
  "message circle question": [
    "message-circle-question"
  ],
  "message-circle-question-mark": [
    "message-circle-question-mark"
  ],
  "message circle question mark": [
    "message-circle-question-mark"
  ],
  "message-circle-reply": [
    "message-circle-reply"
  ],
  "message circle reply": [
    "message-circle-reply"
  ],
  "message-circle-warning": [
    "message-circle-warning"
  ],
  "message circle warning": [
    "message-circle-warning"
  ],
  "message-circle-x": [
    "message-circle-x"
  ],
  "message circle x": [
    "message-circle-x"
  ],
  "message-square": [
    "message-square"
  ],
  "message square": [
    "message-square"
  ],
  "message-square-check": [
    "message-square-check"
  ],
  "message square check": [
    "message-square-check"
  ],
  "message-square-code": [
    "message-square-code"
  ],
  "message square code": [
    "message-square-code"
  ],
  "message-square-dashed": [
    "message-square-dashed"
  ],
  "message square dashed": [
    "message-square-dashed"
  ],
  "message-square-diff": [
    "message-square-diff"
  ],
  "message square diff": [
    "message-square-diff"
  ],
  "message-square-dot": [
    "message-square-dot"
  ],
  "message square dot": [
    "message-square-dot"
  ],
  "message-square-heart": [
    "message-square-heart"
  ],
  "message square heart": [
    "message-square-heart"
  ],
  "message-square-lock": [
    "message-square-lock"
  ],
  "message square lock": [
    "message-square-lock"
  ],
  "message-square-more": [
    "message-square-more"
  ],
  "message square more": [
    "message-square-more"
  ],
  "message-square-off": [
    "message-square-off"
  ],
  "message square off": [
    "message-square-off"
  ],
  "message-square-plus": [
    "message-square-plus"
  ],
  "message square plus": [
    "message-square-plus"
  ],
  "message-square-quote": [
    "message-square-quote"
  ],
  "message square quote": [
    "message-square-quote"
  ],
  "message-square-reply": [
    "message-square-reply"
  ],
  "message square reply": [
    "message-square-reply"
  ],
  "message-square-share": [
    "message-square-share"
  ],
  "message square share": [
    "message-square-share"
  ],
  "message-square-text": [
    "message-square-text"
  ],
  "message square text": [
    "message-square-text"
  ],
  "message-square-warning": [
    "message-square-warning"
  ],
  "message square warning": [
    "message-square-warning"
  ],
  "message-square-x": [
    "message-square-x"
  ],
  "message square x": [
    "message-square-x"
  ],
  "messages-circle": [
    "messages-circle"
  ],
  "messages circle": [
    "messages-circle"
  ],
  "messages-square": [
    "messages-square"
  ],
  "messages square": [
    "messages-square"
  ],
  "metronome": [
    "metronome"
  ],
  "mic": [
    "mic"
  ],
  "mic-2": [
    "mic-2"
  ],
  "mic 2": [
    "mic-2"
  ],
  "mic-audio-lines": [
    "mic-audio-lines"
  ],
  "mic audio lines": [
    "mic-audio-lines"
  ],
  "mic-off": [
    "mic-off"
  ],
  "mic off": [
    "mic-off"
  ],
  "mic-signal": [
    "mic-signal"
  ],
  "mic signal": [
    "mic-signal"
  ],
  "mic-vocal": [
    "mic-vocal"
  ],
  "mic vocal": [
    "mic-vocal"
  ],
  "microchip": [
    "microchip"
  ],
  "microscope": [
    "microscope"
  ],
  "microwave": [
    "microwave"
  ],
  "midi-port": [
    "midi-port"
  ],
  "midi port": [
    "midi-port"
  ],
  "milestone": [
    "milestone"
  ],
  "milk": [
    "milk"
  ],
  "milk-off": [
    "milk-off"
  ],
  "milk off": [
    "milk-off"
  ],
  "minimize": [
    "minimize"
  ],
  "minimize-2": [
    "minimize-2"
  ],
  "minimize 2": [
    "minimize-2"
  ],
  "minus": [
    "minus"
  ],
  "minus-circle": [
    "minus-circle"
  ],
  "minus circle": [
    "minus-circle"
  ],
  "minus-square": [
    "minus-square"
  ],
  "minus square": [
    "minus-square"
  ],
  "mirror-rectangular": [
    "mirror-rectangular"
  ],
  "mirror rectangular": [
    "mirror-rectangular"
  ],
  "mirror-round": [
    "mirror-round"
  ],
  "mirror round": [
    "mirror-round"
  ],
  "monitor": [
    "monitor"
  ],
  "monitor-check": [
    "monitor-check"
  ],
  "monitor check": [
    "monitor-check"
  ],
  "monitor-cloud": [
    "monitor-cloud"
  ],
  "monitor cloud": [
    "monitor-cloud"
  ],
  "monitor-cog": [
    "monitor-cog"
  ],
  "monitor cog": [
    "monitor-cog"
  ],
  "monitor-dot": [
    "monitor-dot"
  ],
  "monitor dot": [
    "monitor-dot"
  ],
  "monitor-down": [
    "monitor-down"
  ],
  "monitor down": [
    "monitor-down"
  ],
  "monitor-off": [
    "monitor-off"
  ],
  "monitor off": [
    "monitor-off"
  ],
  "monitor-pause": [
    "monitor-pause"
  ],
  "monitor pause": [
    "monitor-pause"
  ],
  "monitor-pc": [
    "monitor-pc"
  ],
  "monitor pc": [
    "monitor-pc"
  ],
  "monitor-play": [
    "monitor-play"
  ],
  "monitor play": [
    "monitor-play"
  ],
  "monitor-smartphone": [
    "monitor-smartphone"
  ],
  "monitor smartphone": [
    "monitor-smartphone"
  ],
  "monitor-speaker": [
    "monitor-speaker"
  ],
  "monitor speaker": [
    "monitor-speaker"
  ],
  "monitor-stop": [
    "monitor-stop"
  ],
  "monitor stop": [
    "monitor-stop"
  ],
  "monitor-up": [
    "monitor-up"
  ],
  "monitor up": [
    "monitor-up"
  ],
  "monitor-x": [
    "monitor-x"
  ],
  "monitor x": [
    "monitor-x"
  ],
  "moon": [
    "moon"
  ],
  "moon-star": [
    "moon-star"
  ],
  "moon star": [
    "moon-star"
  ],
  "mop": [
    "mop"
  ],
  "mop-sparkles": [
    "mop-sparkles"
  ],
  "mop sparkles": [
    "mop-sparkles"
  ],
  "more-horizontal": [
    "more-horizontal"
  ],
  "more horizontal": [
    "more-horizontal"
  ],
  "more-vertical": [
    "more-vertical"
  ],
  "more vertical": [
    "more-vertical"
  ],
  "mosque": [
    "mosque"
  ],
  "motorbike": [
    "motorbike"
  ],
  "mountain": [
    "mountain"
  ],
  "mountain-snow": [
    "mountain-snow"
  ],
  "mountain snow": [
    "mountain-snow"
  ],
  "mouse": [
    "mouse"
  ],
  "mouse-left": [
    "mouse-left"
  ],
  "mouse left": [
    "mouse-left"
  ],
  "mouse-off": [
    "mouse-off"
  ],
  "mouse off": [
    "mouse-off"
  ],
  "mouse-pointer": [
    "mouse-pointer"
  ],
  "mouse pointer": [
    "mouse-pointer"
  ],
  "mouse-pointer-2": [
    "mouse-pointer-2"
  ],
  "mouse pointer 2": [
    "mouse-pointer-2"
  ],
  "mouse-pointer-2-off": [
    "mouse-pointer-2-off"
  ],
  "mouse pointer 2 off": [
    "mouse-pointer-2-off"
  ],
  "mouse-pointer-ban": [
    "mouse-pointer-ban"
  ],
  "mouse pointer ban": [
    "mouse-pointer-ban"
  ],
  "mouse-pointer-click": [
    "mouse-pointer-click"
  ],
  "mouse pointer click": [
    "mouse-pointer-click"
  ],
  "mouse-pointer-square-dashed": [
    "mouse-pointer-square-dashed"
  ],
  "mouse pointer square dashed": [
    "mouse-pointer-square-dashed"
  ],
  "mouse-right": [
    "mouse-right"
  ],
  "mouse right": [
    "mouse-right"
  ],
  "mouth": [
    "mouth"
  ],
  "mouth-off": [
    "mouth-off"
  ],
  "mouth off": [
    "mouth-off"
  ],
  "move": [
    "move"
  ],
  "move-3-d": [
    "move-3-d"
  ],
  "move 3 d": [
    "move-3-d"
  ],
  "move-3d": [
    "move-3d"
  ],
  "move 3d": [
    "move-3d"
  ],
  "move-diagonal": [
    "move-diagonal"
  ],
  "move diagonal": [
    "move-diagonal"
  ],
  "move-diagonal-2": [
    "move-diagonal-2"
  ],
  "move diagonal 2": [
    "move-diagonal-2"
  ],
  "move-down": [
    "move-down"
  ],
  "move down": [
    "move-down"
  ],
  "move-down-left": [
    "move-down-left"
  ],
  "move down left": [
    "move-down-left"
  ],
  "move-down-right": [
    "move-down-right"
  ],
  "move down right": [
    "move-down-right"
  ],
  "move-horizontal": [
    "move-horizontal"
  ],
  "move horizontal": [
    "move-horizontal"
  ],
  "move-left": [
    "move-left"
  ],
  "move left": [
    "move-left"
  ],
  "move-right": [
    "move-right"
  ],
  "move right": [
    "move-right"
  ],
  "move-up": [
    "move-up"
  ],
  "move up": [
    "move-up"
  ],
  "move-up-left": [
    "move-up-left"
  ],
  "move up left": [
    "move-up-left"
  ],
  "move-up-right": [
    "move-up-right"
  ],
  "move up right": [
    "move-up-right"
  ],
  "move-vertical": [
    "move-vertical"
  ],
  "move vertical": [
    "move-vertical"
  ],
  "music": [
    "music"
  ],
  "music-2": [
    "music-2"
  ],
  "music 2": [
    "music-2"
  ],
  "music-3": [
    "music-3"
  ],
  "music 3": [
    "music-3"
  ],
  "music-4": [
    "music-4"
  ],
  "music 4": [
    "music-4"
  ],
  "navigation": [
    "navigation"
  ],
  "navigation-2": [
    "navigation-2"
  ],
  "navigation 2": [
    "navigation-2"
  ],
  "navigation-2-off": [
    "navigation-2-off"
  ],
  "navigation 2 off": [
    "navigation-2-off"
  ],
  "navigation-off": [
    "navigation-off"
  ],
  "navigation off": [
    "navigation-off"
  ],
  "nepali-rupee": [
    "nepali-rupee"
  ],
  "nepali rupee": [
    "nepali-rupee"
  ],
  "network": [
    "network"
  ],
  "newspaper": [
    "newspaper"
  ],
  "nfc": [
    "nfc"
  ],
  "non-binary": [
    "non-binary"
  ],
  "non binary": [
    "non-binary"
  ],
  "notebook": [
    "notebook"
  ],
  "notebook-dot": [
    "notebook-dot"
  ],
  "notebook dot": [
    "notebook-dot"
  ],
  "notebook-pen": [
    "notebook-pen"
  ],
  "notebook pen": [
    "notebook-pen"
  ],
  "notebook-tabs": [
    "notebook-tabs"
  ],
  "notebook tabs": [
    "notebook-tabs"
  ],
  "notebook-text": [
    "notebook-text"
  ],
  "notebook text": [
    "notebook-text"
  ],
  "notepad-text": [
    "notepad-text"
  ],
  "notepad text": [
    "notepad-text"
  ],
  "notepad-text-dashed": [
    "notepad-text-dashed"
  ],
  "notepad text dashed": [
    "notepad-text-dashed"
  ],
  "nut": [
    "nut"
  ],
  "nut-off": [
    "nut-off"
  ],
  "nut off": [
    "nut-off"
  ],
  "octagon": [
    "octagon"
  ],
  "octagon-alert": [
    "octagon-alert"
  ],
  "octagon alert": [
    "octagon-alert"
  ],
  "octagon-minus": [
    "octagon-minus"
  ],
  "octagon minus": [
    "octagon-minus"
  ],
  "octagon-pause": [
    "octagon-pause"
  ],
  "octagon pause": [
    "octagon-pause"
  ],
  "octagon-x": [
    "octagon-x"
  ],
  "octagon x": [
    "octagon-x"
  ],
  "omega": [
    "omega"
  ],
  "option": [
    "option"
  ],
  "orbit": [
    "orbit"
  ],
  "origami": [
    "origami"
  ],
  "outdent": [
    "outdent"
  ],
  "package": [
    "package"
  ],
  "package-2": [
    "package-2"
  ],
  "package 2": [
    "package-2"
  ],
  "package-check": [
    "package-check"
  ],
  "package check": [
    "package-check"
  ],
  "package-minus": [
    "package-minus"
  ],
  "package minus": [
    "package-minus"
  ],
  "package-open": [
    "package-open"
  ],
  "package open": [
    "package-open"
  ],
  "package-plus": [
    "package-plus"
  ],
  "package plus": [
    "package-plus"
  ],
  "package-search": [
    "package-search"
  ],
  "package search": [
    "package-search"
  ],
  "package-x": [
    "package-x"
  ],
  "package x": [
    "package-x"
  ],
  "paint-bucket": [
    "paint-bucket"
  ],
  "paint bucket": [
    "paint-bucket"
  ],
  "paint-roller": [
    "paint-roller"
  ],
  "paint roller": [
    "paint-roller"
  ],
  "paintbrush": [
    "paintbrush"
  ],
  "paintbrush-2": [
    "paintbrush-2"
  ],
  "paintbrush 2": [
    "paintbrush-2"
  ],
  "paintbrush-vertical": [
    "paintbrush-vertical"
  ],
  "paintbrush vertical": [
    "paintbrush-vertical"
  ],
  "palette": [
    "palette"
  ],
  "palmtree": [
    "palmtree"
  ],
  "panda": [
    "panda"
  ],
  "panel-bottom": [
    "panel-bottom"
  ],
  "panel bottom": [
    "panel-bottom"
  ],
  "panel-bottom-close": [
    "panel-bottom-close"
  ],
  "panel bottom close": [
    "panel-bottom-close"
  ],
  "panel-bottom-dashed": [
    "panel-bottom-dashed"
  ],
  "panel bottom dashed": [
    "panel-bottom-dashed"
  ],
  "panel-bottom-inactive": [
    "panel-bottom-inactive"
  ],
  "panel bottom inactive": [
    "panel-bottom-inactive"
  ],
  "panel-bottom-open": [
    "panel-bottom-open"
  ],
  "panel bottom open": [
    "panel-bottom-open"
  ],
  "panel-left": [
    "panel-left"
  ],
  "panel left": [
    "panel-left"
  ],
  "panel-left-close": [
    "panel-left-close"
  ],
  "panel left close": [
    "panel-left-close"
  ],
  "panel-left-dashed": [
    "panel-left-dashed"
  ],
  "panel left dashed": [
    "panel-left-dashed"
  ],
  "panel-left-inactive": [
    "panel-left-inactive"
  ],
  "panel left inactive": [
    "panel-left-inactive"
  ],
  "panel-left-open": [
    "panel-left-open"
  ],
  "panel left open": [
    "panel-left-open"
  ],
  "panel-left-right-dashed": [
    "panel-left-right-dashed"
  ],
  "panel left right dashed": [
    "panel-left-right-dashed"
  ],
  "panel-right": [
    "panel-right"
  ],
  "panel right": [
    "panel-right"
  ],
  "panel-right-close": [
    "panel-right-close"
  ],
  "panel right close": [
    "panel-right-close"
  ],
  "panel-right-dashed": [
    "panel-right-dashed"
  ],
  "panel right dashed": [
    "panel-right-dashed"
  ],
  "panel-right-inactive": [
    "panel-right-inactive"
  ],
  "panel right inactive": [
    "panel-right-inactive"
  ],
  "panel-right-open": [
    "panel-right-open"
  ],
  "panel right open": [
    "panel-right-open"
  ],
  "panel-top": [
    "panel-top"
  ],
  "panel top": [
    "panel-top"
  ],
  "panel-top-bottom-dashed": [
    "panel-top-bottom-dashed"
  ],
  "panel top bottom dashed": [
    "panel-top-bottom-dashed"
  ],
  "panel-top-close": [
    "panel-top-close"
  ],
  "panel top close": [
    "panel-top-close"
  ],
  "panel-top-dashed": [
    "panel-top-dashed"
  ],
  "panel top dashed": [
    "panel-top-dashed"
  ],
  "panel-top-inactive": [
    "panel-top-inactive"
  ],
  "panel top inactive": [
    "panel-top-inactive"
  ],
  "panel-top-open": [
    "panel-top-open"
  ],
  "panel top open": [
    "panel-top-open"
  ],
  "panels-left-bottom": [
    "panels-left-bottom"
  ],
  "panels left bottom": [
    "panels-left-bottom"
  ],
  "panels-left-right": [
    "panels-left-right"
  ],
  "panels left right": [
    "panels-left-right"
  ],
  "panels-right-bottom": [
    "panels-right-bottom"
  ],
  "panels right bottom": [
    "panels-right-bottom"
  ],
  "panels-top-bottom": [
    "panels-top-bottom"
  ],
  "panels top bottom": [
    "panels-top-bottom"
  ],
  "panels-top-left": [
    "panels-top-left"
  ],
  "panels top left": [
    "panels-top-left"
  ],
  "paper-bag": [
    "paper-bag"
  ],
  "paper bag": [
    "paper-bag"
  ],
  "paperclip": [
    "paperclip"
  ],
  "parasol": [
    "parasol"
  ],
  "parentheses": [
    "parentheses"
  ],
  "park": [
    "park"
  ],
  "parking-circle": [
    "parking-circle"
  ],
  "parking circle": [
    "parking-circle"
  ],
  "parking-circle-off": [
    "parking-circle-off"
  ],
  "parking circle off": [
    "parking-circle-off"
  ],
  "parking-meter": [
    "parking-meter"
  ],
  "parking meter": [
    "parking-meter"
  ],
  "parking-square": [
    "parking-square"
  ],
  "parking square": [
    "parking-square"
  ],
  "parking-square-off": [
    "parking-square-off"
  ],
  "parking square off": [
    "parking-square-off"
  ],
  "party-popper": [
    "party-popper"
  ],
  "party popper": [
    "party-popper"
  ],
  "pause": [
    "pause"
  ],
  "pause-circle": [
    "pause-circle"
  ],
  "pause circle": [
    "pause-circle"
  ],
  "pause-octagon": [
    "pause-octagon"
  ],
  "pause octagon": [
    "pause-octagon"
  ],
  "paw-print": [
    "paw-print"
  ],
  "paw print": [
    "paw-print"
  ],
  "pc-case": [
    "pc-case"
  ],
  "pc case": [
    "pc-case"
  ],
  "pen": [
    "pen"
  ],
  "pen-box": [
    "pen-box"
  ],
  "pen box": [
    "pen-box"
  ],
  "pen-line": [
    "pen-line"
  ],
  "pen line": [
    "pen-line"
  ],
  "pen-off": [
    "pen-off"
  ],
  "pen off": [
    "pen-off"
  ],
  "pen-square": [
    "pen-square"
  ],
  "pen square": [
    "pen-square"
  ],
  "pen-tool": [
    "pen-tool"
  ],
  "pen tool": [
    "pen-tool"
  ],
  "pencil": [
    "pencil"
  ],
  "pencil-line": [
    "pencil-line"
  ],
  "pencil line": [
    "pencil-line"
  ],
  "pencil-off": [
    "pencil-off"
  ],
  "pencil off": [
    "pencil-off"
  ],
  "pencil-ruler": [
    "pencil-ruler"
  ],
  "pencil ruler": [
    "pencil-ruler"
  ],
  "pencil-sparkles": [
    "pencil-sparkles"
  ],
  "pencil sparkles": [
    "pencil-sparkles"
  ],
  "pentagon": [
    "pentagon"
  ],
  "percent": [
    "percent"
  ],
  "percent-circle": [
    "percent-circle"
  ],
  "percent circle": [
    "percent-circle"
  ],
  "percent-diamond": [
    "percent-diamond"
  ],
  "percent diamond": [
    "percent-diamond"
  ],
  "percent-square": [
    "percent-square"
  ],
  "percent square": [
    "percent-square"
  ],
  "person-standing": [
    "person-standing"
  ],
  "person standing": [
    "person-standing"
  ],
  "phi": [
    "phi"
  ],
  "philippine-peso": [
    "philippine-peso"
  ],
  "philippine peso": [
    "philippine-peso"
  ],
  "phone": [
    "phone"
  ],
  "phone-call": [
    "phone-call"
  ],
  "phone call": [
    "phone-call"
  ],
  "phone-forwarded": [
    "phone-forwarded"
  ],
  "phone forwarded": [
    "phone-forwarded"
  ],
  "phone-incoming": [
    "phone-incoming"
  ],
  "phone incoming": [
    "phone-incoming"
  ],
  "phone-log": [
    "phone-log"
  ],
  "phone log": [
    "phone-log"
  ],
  "phone-missed": [
    "phone-missed"
  ],
  "phone missed": [
    "phone-missed"
  ],
  "phone-off": [
    "phone-off"
  ],
  "phone off": [
    "phone-off"
  ],
  "phone-outgoing": [
    "phone-outgoing"
  ],
  "phone outgoing": [
    "phone-outgoing"
  ],
  "pi": [
    "pi"
  ],
  "pi-square": [
    "pi-square"
  ],
  "pi square": [
    "pi-square"
  ],
  "piano": [
    "piano"
  ],
  "pickaxe": [
    "pickaxe"
  ],
  "picture-in-picture": [
    "picture-in-picture"
  ],
  "picture in picture": [
    "picture-in-picture"
  ],
  "picture-in-picture-2": [
    "picture-in-picture-2"
  ],
  "picture in picture 2": [
    "picture-in-picture-2"
  ],
  "pie-chart": [
    "pie-chart"
  ],
  "pie chart": [
    "pie-chart"
  ],
  "piggy-bank": [
    "piggy-bank"
  ],
  "piggy bank": [
    "piggy-bank"
  ],
  "pilcrow": [
    "pilcrow"
  ],
  "pilcrow-left": [
    "pilcrow-left"
  ],
  "pilcrow left": [
    "pilcrow-left"
  ],
  "pilcrow-right": [
    "pilcrow-right"
  ],
  "pilcrow right": [
    "pilcrow-right"
  ],
  "pilcrow-square": [
    "pilcrow-square"
  ],
  "pilcrow square": [
    "pilcrow-square"
  ],
  "pill": [
    "pill"
  ],
  "pill-bottle": [
    "pill-bottle"
  ],
  "pill bottle": [
    "pill-bottle"
  ],
  "pin": [
    "pin"
  ],
  "pin-off": [
    "pin-off"
  ],
  "pin off": [
    "pin-off"
  ],
  "pipette": [
    "pipette"
  ],
  "pizza": [
    "pizza"
  ],
  "plane": [
    "plane"
  ],
  "plane-landing": [
    "plane-landing"
  ],
  "plane landing": [
    "plane-landing"
  ],
  "plane-takeoff": [
    "plane-takeoff"
  ],
  "plane takeoff": [
    "plane-takeoff"
  ],
  "plant-pot": [
    "plant-pot"
  ],
  "plant pot": [
    "plant-pot"
  ],
  "play": [
    "play"
  ],
  "play-circle": [
    "play-circle"
  ],
  "play circle": [
    "play-circle"
  ],
  "play-off": [
    "play-off"
  ],
  "play off": [
    "play-off"
  ],
  "play-square": [
    "play-square"
  ],
  "play square": [
    "play-square"
  ],
  "playing-card": [
    "playing-card"
  ],
  "playing card": [
    "playing-card"
  ],
  "playing-cards": [
    "playing-cards"
  ],
  "playing cards": [
    "playing-cards"
  ],
  "playing-cards-fan": [
    "playing-cards-fan"
  ],
  "playing cards fan": [
    "playing-cards-fan"
  ],
  "plug": [
    "plug"
  ],
  "plug-2": [
    "plug-2"
  ],
  "plug 2": [
    "plug-2"
  ],
  "plug-zap": [
    "plug-zap"
  ],
  "plug zap": [
    "plug-zap"
  ],
  "plug-zap-2": [
    "plug-zap-2"
  ],
  "plug zap 2": [
    "plug-zap-2"
  ],
  "plus": [
    "plus"
  ],
  "plus-circle": [
    "plus-circle"
  ],
  "plus circle": [
    "plus-circle"
  ],
  "plus-square": [
    "plus-square"
  ],
  "plus square": [
    "plus-square"
  ],
  "pocket-knife": [
    "pocket-knife"
  ],
  "pocket knife": [
    "pocket-knife"
  ],
  "podcast": [
    "podcast"
  ],
  "podium": [
    "podium"
  ],
  "pointer": [
    "pointer"
  ],
  "pointer-off": [
    "pointer-off"
  ],
  "pointer off": [
    "pointer-off"
  ],
  "popcorn": [
    "popcorn"
  ],
  "popsicle": [
    "popsicle"
  ],
  "pound-sterling": [
    "pound-sterling"
  ],
  "pound sterling": [
    "pound-sterling"
  ],
  "power": [
    "power"
  ],
  "power-circle": [
    "power-circle"
  ],
  "power circle": [
    "power-circle"
  ],
  "power-off": [
    "power-off"
  ],
  "power off": [
    "power-off"
  ],
  "power-square": [
    "power-square"
  ],
  "power square": [
    "power-square"
  ],
  "presentation": [
    "presentation"
  ],
  "printer": [
    "printer"
  ],
  "printer-3d": [
    "printer-3d"
  ],
  "printer 3d": [
    "printer-3d"
  ],
  "printer-check": [
    "printer-check"
  ],
  "printer check": [
    "printer-check"
  ],
  "printer-x": [
    "printer-x"
  ],
  "printer x": [
    "printer-x"
  ],
  "projector": [
    "projector"
  ],
  "proportions": [
    "proportions"
  ],
  "puzzle": [
    "puzzle"
  ],
  "pyramid": [
    "pyramid"
  ],
  "qr-code": [
    "qr-code"
  ],
  "qr code": [
    "qr-code"
  ],
  "quote": [
    "quote"
  ],
  "rabbit": [
    "rabbit"
  ],
  "radar": [
    "radar"
  ],
  "radiation": [
    "radiation"
  ],
  "radical": [
    "radical"
  ],
  "radio": [
    "radio"
  ],
  "radio-off": [
    "radio-off"
  ],
  "radio off": [
    "radio-off"
  ],
  "radio-receiver": [
    "radio-receiver"
  ],
  "radio receiver": [
    "radio-receiver"
  ],
  "radio-tower": [
    "radio-tower"
  ],
  "radio tower": [
    "radio-tower"
  ],
  "radius": [
    "radius"
  ],
  "rainbow": [
    "rainbow"
  ],
  "rat": [
    "rat"
  ],
  "ratio": [
    "ratio"
  ],
  "receipt": [
    "receipt"
  ],
  "receipt-cent": [
    "receipt-cent"
  ],
  "receipt cent": [
    "receipt-cent"
  ],
  "receipt-euro": [
    "receipt-euro"
  ],
  "receipt euro": [
    "receipt-euro"
  ],
  "receipt-indian-rupee": [
    "receipt-indian-rupee"
  ],
  "receipt indian rupee": [
    "receipt-indian-rupee"
  ],
  "receipt-japanese-yen": [
    "receipt-japanese-yen"
  ],
  "receipt japanese yen": [
    "receipt-japanese-yen"
  ],
  "receipt-pound-sterling": [
    "receipt-pound-sterling"
  ],
  "receipt pound sterling": [
    "receipt-pound-sterling"
  ],
  "receipt-russian-ruble": [
    "receipt-russian-ruble"
  ],
  "receipt russian ruble": [
    "receipt-russian-ruble"
  ],
  "receipt-swiss-franc": [
    "receipt-swiss-franc"
  ],
  "receipt swiss franc": [
    "receipt-swiss-franc"
  ],
  "receipt-text": [
    "receipt-text"
  ],
  "receipt text": [
    "receipt-text"
  ],
  "receipt-turkish-lira": [
    "receipt-turkish-lira"
  ],
  "receipt turkish lira": [
    "receipt-turkish-lira"
  ],
  "rectangle-circle": [
    "rectangle-circle"
  ],
  "rectangle circle": [
    "rectangle-circle"
  ],
  "rectangle-ellipsis": [
    "rectangle-ellipsis"
  ],
  "rectangle ellipsis": [
    "rectangle-ellipsis"
  ],
  "rectangle-goggles": [
    "rectangle-goggles"
  ],
  "rectangle goggles": [
    "rectangle-goggles"
  ],
  "rectangle-horizontal": [
    "rectangle-horizontal"
  ],
  "rectangle horizontal": [
    "rectangle-horizontal"
  ],
  "rectangle-vertical": [
    "rectangle-vertical"
  ],
  "rectangle vertical": [
    "rectangle-vertical"
  ],
  "recycle": [
    "recycle"
  ],
  "redo": [
    "redo"
  ],
  "redo-2": [
    "redo-2"
  ],
  "redo 2": [
    "redo-2"
  ],
  "redo-dot": [
    "redo-dot"
  ],
  "redo dot": [
    "redo-dot"
  ],
  "refresh-ccw": [
    "refresh-ccw"
  ],
  "refresh ccw": [
    "refresh-ccw"
  ],
  "refresh-ccw-dot": [
    "refresh-ccw-dot"
  ],
  "refresh ccw dot": [
    "refresh-ccw-dot"
  ],
  "refresh-cw": [
    "refresh-cw"
  ],
  "refresh cw": [
    "refresh-cw"
  ],
  "refresh-cw-off": [
    "refresh-cw-off"
  ],
  "refresh cw off": [
    "refresh-cw-off"
  ],
  "refrigerator": [
    "refrigerator"
  ],
  "regex": [
    "regex"
  ],
  "remove-formatting": [
    "remove-formatting"
  ],
  "remove formatting": [
    "remove-formatting"
  ],
  "repeat": [
    "repeat"
  ],
  "repeat-1": [
    "repeat-1"
  ],
  "repeat 1": [
    "repeat-1"
  ],
  "repeat-2": [
    "repeat-2"
  ],
  "repeat 2": [
    "repeat-2"
  ],
  "repeat-off": [
    "repeat-off"
  ],
  "repeat off": [
    "repeat-off"
  ],
  "replace": [
    "replace"
  ],
  "replace-all": [
    "replace-all"
  ],
  "replace all": [
    "replace-all"
  ],
  "reply": [
    "reply"
  ],
  "reply-all": [
    "reply-all"
  ],
  "reply all": [
    "reply-all"
  ],
  "rewind": [
    "rewind"
  ],
  "ribbon": [
    "ribbon"
  ],
  "road": [
    "road"
  ],
  "robot-arm": [
    "robot-arm"
  ],
  "robot arm": [
    "robot-arm"
  ],
  "robot-vacuum": [
    "robot-vacuum"
  ],
  "robot vacuum": [
    "robot-vacuum"
  ],
  "rocket": [
    "rocket"
  ],
  "rocking-chair": [
    "rocking-chair"
  ],
  "rocking chair": [
    "rocking-chair"
  ],
  "roller-coaster": [
    "roller-coaster"
  ],
  "roller coaster": [
    "roller-coaster"
  ],
  "rose": [
    "rose"
  ],
  "rotate-3-d": [
    "rotate-3-d"
  ],
  "rotate 3 d": [
    "rotate-3-d"
  ],
  "rotate-3d": [
    "rotate-3d"
  ],
  "rotate 3d": [
    "rotate-3d"
  ],
  "rotate-ccw": [
    "rotate-ccw"
  ],
  "rotate ccw": [
    "rotate-ccw"
  ],
  "rotate-ccw-clock": [
    "rotate-ccw-clock"
  ],
  "rotate ccw clock": [
    "rotate-ccw-clock"
  ],
  "rotate-ccw-key": [
    "rotate-ccw-key"
  ],
  "rotate ccw key": [
    "rotate-ccw-key"
  ],
  "rotate-ccw-square": [
    "rotate-ccw-square"
  ],
  "rotate ccw square": [
    "rotate-ccw-square"
  ],
  "rotate-cw": [
    "rotate-cw"
  ],
  "rotate cw": [
    "rotate-cw"
  ],
  "rotate-cw-clock": [
    "rotate-cw-clock"
  ],
  "rotate cw clock": [
    "rotate-cw-clock"
  ],
  "rotate-cw-fading-clock": [
    "rotate-cw-fading-clock"
  ],
  "rotate cw fading clock": [
    "rotate-cw-fading-clock"
  ],
  "rotate-cw-square": [
    "rotate-cw-square"
  ],
  "rotate cw square": [
    "rotate-cw-square"
  ],
  "route": [
    "route"
  ],
  "route-off": [
    "route-off"
  ],
  "route off": [
    "route-off"
  ],
  "router": [
    "router"
  ],
  "rows": [
    "rows"
  ],
  "rows-2": [
    "rows-2"
  ],
  "rows 2": [
    "rows-2"
  ],
  "rows-3": [
    "rows-3"
  ],
  "rows 3": [
    "rows-3"
  ],
  "rows-4": [
    "rows-4"
  ],
  "rows 4": [
    "rows-4"
  ],
  "rss": [
    "rss"
  ],
  "rugby-ball": [
    "rugby-ball"
  ],
  "rugby ball": [
    "rugby-ball"
  ],
  "ruler": [
    "ruler"
  ],
  "ruler-dimension-line": [
    "ruler-dimension-line"
  ],
  "ruler dimension line": [
    "ruler-dimension-line"
  ],
  "russian-ruble": [
    "russian-ruble"
  ],
  "russian ruble": [
    "russian-ruble"
  ],
  "sailboat": [
    "sailboat"
  ],
  "salad": [
    "salad"
  ],
  "sandwich": [
    "sandwich"
  ],
  "satellite": [
    "satellite"
  ],
  "satellite-dish": [
    "satellite-dish"
  ],
  "satellite dish": [
    "satellite-dish"
  ],
  "saudi-riyal": [
    "saudi-riyal"
  ],
  "saudi riyal": [
    "saudi-riyal"
  ],
  "save": [
    "save"
  ],
  "save-all": [
    "save-all"
  ],
  "save all": [
    "save-all"
  ],
  "save-check": [
    "save-check"
  ],
  "save check": [
    "save-check"
  ],
  "save-off": [
    "save-off"
  ],
  "save off": [
    "save-off"
  ],
  "save-pen": [
    "save-pen"
  ],
  "save pen": [
    "save-pen"
  ],
  "save-plus": [
    "save-plus"
  ],
  "save plus": [
    "save-plus"
  ],
  "scale": [
    "scale"
  ],
  "scale-3-d": [
    "scale-3-d"
  ],
  "scale 3 d": [
    "scale-3-d"
  ],
  "scale-3d": [
    "scale-3d"
  ],
  "scale 3d": [
    "scale-3d"
  ],
  "scaling": [
    "scaling"
  ],
  "scan": [
    "scan"
  ],
  "scan-barcode": [
    "scan-barcode"
  ],
  "scan barcode": [
    "scan-barcode"
  ],
  "scan-box": [
    "scan-box"
  ],
  "scan box": [
    "scan-box"
  ],
  "scan-eye": [
    "scan-eye"
  ],
  "scan eye": [
    "scan-eye"
  ],
  "scan-face": [
    "scan-face"
  ],
  "scan face": [
    "scan-face"
  ],
  "scan-heart": [
    "scan-heart"
  ],
  "scan heart": [
    "scan-heart"
  ],
  "scan-line": [
    "scan-line"
  ],
  "scan line": [
    "scan-line"
  ],
  "scan-qr-code": [
    "scan-qr-code"
  ],
  "scan qr code": [
    "scan-qr-code"
  ],
  "scan-search": [
    "scan-search"
  ],
  "scan search": [
    "scan-search"
  ],
  "scan-square": [
    "scan-square"
  ],
  "scan square": [
    "scan-square"
  ],
  "scan-text": [
    "scan-text"
  ],
  "scan text": [
    "scan-text"
  ],
  "scatter-chart": [
    "scatter-chart"
  ],
  "scatter chart": [
    "scatter-chart"
  ],
  "school": [
    "school"
  ],
  "school-2": [
    "school-2"
  ],
  "school 2": [
    "school-2"
  ],
  "scissors": [
    "scissors"
  ],
  "scissors-line-dashed": [
    "scissors-line-dashed"
  ],
  "scissors line dashed": [
    "scissors-line-dashed"
  ],
  "scissors-square": [
    "scissors-square"
  ],
  "scissors square": [
    "scissors-square"
  ],
  "scissors-square-dashed-bottom": [
    "scissors-square-dashed-bottom"
  ],
  "scissors square dashed bottom": [
    "scissors-square-dashed-bottom"
  ],
  "scooter": [
    "scooter"
  ],
  "scratch-blocks": [
    "scratch-blocks"
  ],
  "scratch blocks": [
    "scratch-blocks"
  ],
  "screen-share": [
    "screen-share"
  ],
  "screen share": [
    "screen-share"
  ],
  "screen-share-off": [
    "screen-share-off"
  ],
  "screen share off": [
    "screen-share-off"
  ],
  "screw": [
    "screw"
  ],
  "scroll": [
    "scroll"
  ],
  "scroll-text": [
    "scroll-text"
  ],
  "scroll text": [
    "scroll-text"
  ],
  "search": [
    "search"
  ],
  "search-alert": [
    "search-alert"
  ],
  "search alert": [
    "search-alert"
  ],
  "search-check": [
    "search-check"
  ],
  "search check": [
    "search-check"
  ],
  "search-code": [
    "search-code"
  ],
  "search code": [
    "search-code"
  ],
  "search-slash": [
    "search-slash"
  ],
  "search slash": [
    "search-slash"
  ],
  "search-x": [
    "search-x"
  ],
  "search x": [
    "search-x"
  ],
  "section": [
    "section"
  ],
  "send": [
    "send"
  ],
  "send-horizonal": [
    "send-horizonal"
  ],
  "send horizonal": [
    "send-horizonal"
  ],
  "send-horizontal": [
    "send-horizontal"
  ],
  "send horizontal": [
    "send-horizontal"
  ],
  "send-to-back": [
    "send-to-back"
  ],
  "send to back": [
    "send-to-back"
  ],
  "separator-horizontal": [
    "separator-horizontal"
  ],
  "separator horizontal": [
    "separator-horizontal"
  ],
  "separator-vertical": [
    "separator-vertical"
  ],
  "separator vertical": [
    "separator-vertical"
  ],
  "server": [
    "server"
  ],
  "server-cog": [
    "server-cog"
  ],
  "server cog": [
    "server-cog"
  ],
  "server-crash": [
    "server-crash"
  ],
  "server crash": [
    "server-crash"
  ],
  "server-off": [
    "server-off"
  ],
  "server off": [
    "server-off"
  ],
  "server-plus": [
    "server-plus"
  ],
  "server plus": [
    "server-plus"
  ],
  "settings": [
    "settings"
  ],
  "settings-2": [
    "settings-2"
  ],
  "settings 2": [
    "settings-2"
  ],
  "shapes": [
    "shapes"
  ],
  "share": [
    "share"
  ],
  "share-2": [
    "share-2"
  ],
  "share 2": [
    "share-2"
  ],
  "sheet": [
    "sheet"
  ],
  "shell": [
    "shell"
  ],
  "shelving-unit": [
    "shelving-unit"
  ],
  "shelving unit": [
    "shelving-unit"
  ],
  "shield": [
    "shield"
  ],
  "shield-alert": [
    "shield-alert"
  ],
  "shield alert": [
    "shield-alert"
  ],
  "shield-ban": [
    "shield-ban"
  ],
  "shield ban": [
    "shield-ban"
  ],
  "shield-check": [
    "shield-check"
  ],
  "shield check": [
    "shield-check"
  ],
  "shield-close": [
    "shield-close"
  ],
  "shield close": [
    "shield-close"
  ],
  "shield-cog": [
    "shield-cog"
  ],
  "shield cog": [
    "shield-cog"
  ],
  "shield-cog-corner": [
    "shield-cog-corner"
  ],
  "shield cog corner": [
    "shield-cog-corner"
  ],
  "shield-ellipsis": [
    "shield-ellipsis"
  ],
  "shield ellipsis": [
    "shield-ellipsis"
  ],
  "shield-half": [
    "shield-half"
  ],
  "shield half": [
    "shield-half"
  ],
  "shield-house": [
    "shield-house"
  ],
  "shield house": [
    "shield-house"
  ],
  "shield-keyhole": [
    "shield-keyhole"
  ],
  "shield keyhole": [
    "shield-keyhole"
  ],
  "shield-lock": [
    "shield-lock"
  ],
  "shield lock": [
    "shield-lock"
  ],
  "shield-minus": [
    "shield-minus"
  ],
  "shield minus": [
    "shield-minus"
  ],
  "shield-off": [
    "shield-off"
  ],
  "shield off": [
    "shield-off"
  ],
  "shield-plus": [
    "shield-plus"
  ],
  "shield plus": [
    "shield-plus"
  ],
  "shield-question": [
    "shield-question"
  ],
  "shield question": [
    "shield-question"
  ],
  "shield-question-mark": [
    "shield-question-mark"
  ],
  "shield question mark": [
    "shield-question-mark"
  ],
  "shield-user": [
    "shield-user"
  ],
  "shield user": [
    "shield-user"
  ],
  "shield-x": [
    "shield-x"
  ],
  "shield x": [
    "shield-x"
  ],
  "ship": [
    "ship"
  ],
  "ship-cargo": [
    "ship-cargo"
  ],
  "ship cargo": [
    "ship-cargo"
  ],
  "ship-wheel": [
    "ship-wheel"
  ],
  "ship wheel": [
    "ship-wheel"
  ],
  "shirt": [
    "shirt"
  ],
  "shopping-bag": [
    "shopping-bag"
  ],
  "shopping bag": [
    "shopping-bag"
  ],
  "shopping-basket": [
    "shopping-basket"
  ],
  "shopping basket": [
    "shopping-basket"
  ],
  "shopping-cart": [
    "shopping-cart"
  ],
  "shopping cart": [
    "shopping-cart"
  ],
  "shopping-cart-minus": [
    "shopping-cart-minus"
  ],
  "shopping cart minus": [
    "shopping-cart-minus"
  ],
  "shopping-cart-plus": [
    "shopping-cart-plus"
  ],
  "shopping cart plus": [
    "shopping-cart-plus"
  ],
  "shovel": [
    "shovel"
  ],
  "shower-head": [
    "shower-head"
  ],
  "shower head": [
    "shower-head"
  ],
  "shredder": [
    "shredder"
  ],
  "shrimp": [
    "shrimp"
  ],
  "shrimp-off": [
    "shrimp-off"
  ],
  "shrimp off": [
    "shrimp-off"
  ],
  "shrink": [
    "shrink"
  ],
  "shrub": [
    "shrub"
  ],
  "shuffle": [
    "shuffle"
  ],
  "sidebar": [
    "sidebar"
  ],
  "sidebar-close": [
    "sidebar-close"
  ],
  "sidebar close": [
    "sidebar-close"
  ],
  "sidebar-open": [
    "sidebar-open"
  ],
  "sidebar open": [
    "sidebar-open"
  ],
  "sigma": [
    "sigma"
  ],
  "sigma-square": [
    "sigma-square"
  ],
  "sigma square": [
    "sigma-square"
  ],
  "signal": [
    "signal"
  ],
  "signal-high": [
    "signal-high"
  ],
  "signal high": [
    "signal-high"
  ],
  "signal-low": [
    "signal-low"
  ],
  "signal low": [
    "signal-low"
  ],
  "signal-medium": [
    "signal-medium"
  ],
  "signal medium": [
    "signal-medium"
  ],
  "signal-zero": [
    "signal-zero"
  ],
  "signal zero": [
    "signal-zero"
  ],
  "signature": [
    "signature"
  ],
  "signpost": [
    "signpost"
  ],
  "signpost-big": [
    "signpost-big"
  ],
  "signpost big": [
    "signpost-big"
  ],
  "siren": [
    "siren"
  ],
  "skip-back": [
    "skip-back"
  ],
  "skip back": [
    "skip-back"
  ],
  "skip-forward": [
    "skip-forward"
  ],
  "skip forward": [
    "skip-forward"
  ],
  "skull": [
    "skull"
  ],
  "slash": [
    "slash"
  ],
  "slash-square": [
    "slash-square"
  ],
  "slash square": [
    "slash-square"
  ],
  "slice": [
    "slice"
  ],
  "sliders": [
    "sliders"
  ],
  "sliders-horizontal": [
    "sliders-horizontal"
  ],
  "sliders horizontal": [
    "sliders-horizontal"
  ],
  "sliders-vertical": [
    "sliders-vertical"
  ],
  "sliders vertical": [
    "sliders-vertical"
  ],
  "smartphone": [
    "smartphone"
  ],
  "smartphone-charging": [
    "smartphone-charging"
  ],
  "smartphone charging": [
    "smartphone-charging"
  ],
  "smartphone-nfc": [
    "smartphone-nfc"
  ],
  "smartphone nfc": [
    "smartphone-nfc"
  ],
  "smile": [
    "smile"
  ],
  "smile-plus": [
    "smile-plus"
  ],
  "smile plus": [
    "smile-plus"
  ],
  "snail": [
    "snail"
  ],
  "snowflake": [
    "snowflake"
  ],
  "soap-dispenser-droplet": [
    "soap-dispenser-droplet"
  ],
  "soap dispenser droplet": [
    "soap-dispenser-droplet"
  ],
  "sofa": [
    "sofa"
  ],
  "solar-panel": [
    "solar-panel"
  ],
  "solar panel": [
    "solar-panel"
  ],
  "sort-asc": [
    "sort-asc"
  ],
  "sort asc": [
    "sort-asc"
  ],
  "sort-desc": [
    "sort-desc"
  ],
  "sort desc": [
    "sort-desc"
  ],
  "soup": [
    "soup"
  ],
  "space": [
    "space"
  ],
  "spade": [
    "spade"
  ],
  "sparkle": [
    "sparkle"
  ],
  "sparkles": [
    "sparkles"
  ],
  "speaker": [
    "speaker"
  ],
  "speech": [
    "speech"
  ],
  "spell-check": [
    "spell-check"
  ],
  "spell check": [
    "spell-check"
  ],
  "spell-check-2": [
    "spell-check-2"
  ],
  "spell check 2": [
    "spell-check-2"
  ],
  "spline": [
    "spline"
  ],
  "spline-pointer": [
    "spline-pointer"
  ],
  "spline pointer": [
    "spline-pointer"
  ],
  "split": [
    "split"
  ],
  "split-square-horizontal": [
    "split-square-horizontal"
  ],
  "split square horizontal": [
    "split-square-horizontal"
  ],
  "split-square-vertical": [
    "split-square-vertical"
  ],
  "split square vertical": [
    "split-square-vertical"
  ],
  "spool": [
    "spool"
  ],
  "sport-shoe": [
    "sport-shoe"
  ],
  "sport shoe": [
    "sport-shoe"
  ],
  "spotlight": [
    "spotlight"
  ],
  "spray-can": [
    "spray-can"
  ],
  "spray can": [
    "spray-can"
  ],
  "sprout": [
    "sprout"
  ],
  "square": [
    "square"
  ],
  "square-activity": [
    "square-activity"
  ],
  "square activity": [
    "square-activity"
  ],
  "square-arrow-down": [
    "square-arrow-down"
  ],
  "square arrow down": [
    "square-arrow-down"
  ],
  "square-arrow-down-left": [
    "square-arrow-down-left"
  ],
  "square arrow down left": [
    "square-arrow-down-left"
  ],
  "square-arrow-down-right": [
    "square-arrow-down-right"
  ],
  "square arrow down right": [
    "square-arrow-down-right"
  ],
  "square-arrow-left": [
    "square-arrow-left"
  ],
  "square arrow left": [
    "square-arrow-left"
  ],
  "square-arrow-out-down-left": [
    "square-arrow-out-down-left"
  ],
  "square arrow out down left": [
    "square-arrow-out-down-left"
  ],
  "square-arrow-out-down-right": [
    "square-arrow-out-down-right"
  ],
  "square arrow out down right": [
    "square-arrow-out-down-right"
  ],
  "square-arrow-out-up-left": [
    "square-arrow-out-up-left"
  ],
  "square arrow out up left": [
    "square-arrow-out-up-left"
  ],
  "square-arrow-out-up-right": [
    "square-arrow-out-up-right"
  ],
  "square arrow out up right": [
    "square-arrow-out-up-right"
  ],
  "square-arrow-right": [
    "square-arrow-right"
  ],
  "square arrow right": [
    "square-arrow-right"
  ],
  "square-arrow-right-enter": [
    "square-arrow-right-enter"
  ],
  "square arrow right enter": [
    "square-arrow-right-enter"
  ],
  "square-arrow-right-exit": [
    "square-arrow-right-exit"
  ],
  "square arrow right exit": [
    "square-arrow-right-exit"
  ],
  "square-arrow-up": [
    "square-arrow-up"
  ],
  "square arrow up": [
    "square-arrow-up"
  ],
  "square-arrow-up-left": [
    "square-arrow-up-left"
  ],
  "square arrow up left": [
    "square-arrow-up-left"
  ],
  "square-arrow-up-right": [
    "square-arrow-up-right"
  ],
  "square arrow up right": [
    "square-arrow-up-right"
  ],
  "square-asterisk": [
    "square-asterisk"
  ],
  "square asterisk": [
    "square-asterisk"
  ],
  "square-bookmark": [
    "square-bookmark"
  ],
  "square bookmark": [
    "square-bookmark"
  ],
  "square-bottom-dashed-scissors": [
    "square-bottom-dashed-scissors"
  ],
  "square bottom dashed scissors": [
    "square-bottom-dashed-scissors"
  ],
  "square-centerline-dashed-horizontal": [
    "square-centerline-dashed-horizontal"
  ],
  "square centerline dashed horizontal": [
    "square-centerline-dashed-horizontal"
  ],
  "square-centerline-dashed-vertical": [
    "square-centerline-dashed-vertical"
  ],
  "square centerline dashed vertical": [
    "square-centerline-dashed-vertical"
  ],
  "square-chart-gantt": [
    "square-chart-gantt"
  ],
  "square chart gantt": [
    "square-chart-gantt"
  ],
  "square-check": [
    "square-check"
  ],
  "square check": [
    "square-check"
  ],
  "square-check-big": [
    "square-check-big"
  ],
  "square check big": [
    "square-check-big"
  ],
  "square-chevron-down": [
    "square-chevron-down"
  ],
  "square chevron down": [
    "square-chevron-down"
  ],
  "square-chevron-left": [
    "square-chevron-left"
  ],
  "square chevron left": [
    "square-chevron-left"
  ],
  "square-chevron-right": [
    "square-chevron-right"
  ],
  "square chevron right": [
    "square-chevron-right"
  ],
  "square-chevron-up": [
    "square-chevron-up"
  ],
  "square chevron up": [
    "square-chevron-up"
  ],
  "square-code": [
    "square-code"
  ],
  "square code": [
    "square-code"
  ],
  "square-dashed": [
    "square-dashed"
  ],
  "square dashed": [
    "square-dashed"
  ],
  "square-dashed-bottom": [
    "square-dashed-bottom"
  ],
  "square dashed bottom": [
    "square-dashed-bottom"
  ],
  "square-dashed-bottom-code": [
    "square-dashed-bottom-code"
  ],
  "square dashed bottom code": [
    "square-dashed-bottom-code"
  ],
  "square-dashed-kanban": [
    "square-dashed-kanban"
  ],
  "square dashed kanban": [
    "square-dashed-kanban"
  ],
  "square-dashed-mouse-pointer": [
    "square-dashed-mouse-pointer"
  ],
  "square dashed mouse pointer": [
    "square-dashed-mouse-pointer"
  ],
  "square-dashed-plus": [
    "square-dashed-plus"
  ],
  "square dashed plus": [
    "square-dashed-plus"
  ],
  "square-dashed-text": [
    "square-dashed-text"
  ],
  "square dashed text": [
    "square-dashed-text"
  ],
  "square-dashed-top-solid": [
    "square-dashed-top-solid"
  ],
  "square dashed top solid": [
    "square-dashed-top-solid"
  ],
  "square-dashed-x": [
    "square-dashed-x"
  ],
  "square dashed x": [
    "square-dashed-x"
  ],
  "square-dashed-x-corner": [
    "square-dashed-x-corner"
  ],
  "square dashed x corner": [
    "square-dashed-x-corner"
  ],
  "square-dimensions": [
    "square-dimensions"
  ],
  "square dimensions": [
    "square-dimensions"
  ],
  "square-divide": [
    "square-divide"
  ],
  "square divide": [
    "square-divide"
  ],
  "square-dot": [
    "square-dot"
  ],
  "square dot": [
    "square-dot"
  ],
  "square-equal": [
    "square-equal"
  ],
  "square equal": [
    "square-equal"
  ],
  "square-exclamation-point": [
    "square-exclamation-point"
  ],
  "square exclamation point": [
    "square-exclamation-point"
  ],
  "square-function": [
    "square-function"
  ],
  "square function": [
    "square-function"
  ],
  "square-gantt-chart": [
    "square-gantt-chart"
  ],
  "square gantt chart": [
    "square-gantt-chart"
  ],
  "square-kanban": [
    "square-kanban"
  ],
  "square kanban": [
    "square-kanban"
  ],
  "square-library": [
    "square-library"
  ],
  "square library": [
    "square-library"
  ],
  "square-m": [
    "square-m"
  ],
  "square m": [
    "square-m"
  ],
  "square-menu": [
    "square-menu"
  ],
  "square menu": [
    "square-menu"
  ],
  "square-minus": [
    "square-minus"
  ],
  "square minus": [
    "square-minus"
  ],
  "square-mouse-pointer": [
    "square-mouse-pointer"
  ],
  "square mouse pointer": [
    "square-mouse-pointer"
  ],
  "square-off": [
    "square-off"
  ],
  "square off": [
    "square-off"
  ],
  "square-parking": [
    "square-parking"
  ],
  "square parking": [
    "square-parking"
  ],
  "square-parking-off": [
    "square-parking-off"
  ],
  "square parking off": [
    "square-parking-off"
  ],
  "square-pause": [
    "square-pause"
  ],
  "square pause": [
    "square-pause"
  ],
  "square-pen": [
    "square-pen"
  ],
  "square pen": [
    "square-pen"
  ],
  "square-percent": [
    "square-percent"
  ],
  "square percent": [
    "square-percent"
  ],
  "square-pi": [
    "square-pi"
  ],
  "square pi": [
    "square-pi"
  ],
  "square-pilcrow": [
    "square-pilcrow"
  ],
  "square pilcrow": [
    "square-pilcrow"
  ],
  "square-play": [
    "square-play"
  ],
  "square play": [
    "square-play"
  ],
  "square-plus": [
    "square-plus"
  ],
  "square plus": [
    "square-plus"
  ],
  "square-power": [
    "square-power"
  ],
  "square power": [
    "square-power"
  ],
  "square-radical": [
    "square-radical"
  ],
  "square radical": [
    "square-radical"
  ],
  "square-round-corner": [
    "square-round-corner"
  ],
  "square round corner": [
    "square-round-corner"
  ],
  "square-scissors": [
    "square-scissors"
  ],
  "square scissors": [
    "square-scissors"
  ],
  "square-sigma": [
    "square-sigma"
  ],
  "square sigma": [
    "square-sigma"
  ],
  "square-slash": [
    "square-slash"
  ],
  "square slash": [
    "square-slash"
  ],
  "square-sparkles": [
    "square-sparkles"
  ],
  "square sparkles": [
    "square-sparkles"
  ],
  "square-split-horizontal": [
    "square-split-horizontal"
  ],
  "square split horizontal": [
    "square-split-horizontal"
  ],
  "square-split-vertical": [
    "square-split-vertical"
  ],
  "square split vertical": [
    "square-split-vertical"
  ],
  "square-square": [
    "square-square"
  ],
  "square square": [
    "square-square"
  ],
  "square-stack": [
    "square-stack"
  ],
  "square stack": [
    "square-stack"
  ],
  "square-star": [
    "square-star"
  ],
  "square star": [
    "square-star"
  ],
  "square-stop": [
    "square-stop"
  ],
  "square stop": [
    "square-stop"
  ],
  "square-terminal": [
    "square-terminal"
  ],
  "square terminal": [
    "square-terminal"
  ],
  "square-text": [
    "square-text"
  ],
  "square text": [
    "square-text"
  ],
  "square-user": [
    "square-user"
  ],
  "square user": [
    "square-user"
  ],
  "square-user-round": [
    "square-user-round"
  ],
  "square user round": [
    "square-user-round"
  ],
  "square-x": [
    "square-x"
  ],
  "square x": [
    "square-x"
  ],
  "squares-exclude": [
    "squares-exclude"
  ],
  "squares exclude": [
    "squares-exclude"
  ],
  "squares-intersect": [
    "squares-intersect"
  ],
  "squares intersect": [
    "squares-intersect"
  ],
  "squares-subtract": [
    "squares-subtract"
  ],
  "squares subtract": [
    "squares-subtract"
  ],
  "squares-unite": [
    "squares-unite"
  ],
  "squares unite": [
    "squares-unite"
  ],
  "squircle": [
    "squircle"
  ],
  "squircle-dashed": [
    "squircle-dashed"
  ],
  "squircle dashed": [
    "squircle-dashed"
  ],
  "squirrel": [
    "squirrel"
  ],
  "stamp": [
    "stamp"
  ],
  "star": [
    "star"
  ],
  "star-check": [
    "star-check"
  ],
  "star check": [
    "star-check"
  ],
  "star-half": [
    "star-half"
  ],
  "star half": [
    "star-half"
  ],
  "star-minus": [
    "star-minus"
  ],
  "star minus": [
    "star-minus"
  ],
  "star-off": [
    "star-off"
  ],
  "star off": [
    "star-off"
  ],
  "star-plus": [
    "star-plus"
  ],
  "star plus": [
    "star-plus"
  ],
  "star-x": [
    "star-x"
  ],
  "star x": [
    "star-x"
  ],
  "stars": [
    "stars"
  ],
  "step-back": [
    "step-back"
  ],
  "step back": [
    "step-back"
  ],
  "step-forward": [
    "step-forward"
  ],
  "step forward": [
    "step-forward"
  ],
  "stethoscope": [
    "stethoscope"
  ],
  "sticker": [
    "sticker"
  ],
  "sticky-note": [
    "sticky-note"
  ],
  "sticky note": [
    "sticky-note"
  ],
  "sticky-note-check": [
    "sticky-note-check"
  ],
  "sticky note check": [
    "sticky-note-check"
  ],
  "sticky-note-minus": [
    "sticky-note-minus"
  ],
  "sticky note minus": [
    "sticky-note-minus"
  ],
  "sticky-note-off": [
    "sticky-note-off"
  ],
  "sticky note off": [
    "sticky-note-off"
  ],
  "sticky-note-plus": [
    "sticky-note-plus"
  ],
  "sticky note plus": [
    "sticky-note-plus"
  ],
  "sticky-note-x": [
    "sticky-note-x"
  ],
  "sticky note x": [
    "sticky-note-x"
  ],
  "sticky-notes": [
    "sticky-notes"
  ],
  "sticky notes": [
    "sticky-notes"
  ],
  "stone": [
    "stone"
  ],
  "stop-circle": [
    "stop-circle"
  ],
  "stop circle": [
    "stop-circle"
  ],
  "store": [
    "store"
  ],
  "stretch-horizontal": [
    "stretch-horizontal"
  ],
  "stretch horizontal": [
    "stretch-horizontal"
  ],
  "stretch-vertical": [
    "stretch-vertical"
  ],
  "stretch vertical": [
    "stretch-vertical"
  ],
  "strikethrough": [
    "strikethrough"
  ],
  "subscript": [
    "subscript"
  ],
  "subtitles": [
    "subtitles"
  ],
  "summary": [
    "summary"
  ],
  "sun": [
    "sun"
  ],
  "sun-dim": [
    "sun-dim"
  ],
  "sun dim": [
    "sun-dim"
  ],
  "sun-medium": [
    "sun-medium"
  ],
  "sun medium": [
    "sun-medium"
  ],
  "sun-moon": [
    "sun-moon"
  ],
  "sun moon": [
    "sun-moon"
  ],
  "sun-snow": [
    "sun-snow"
  ],
  "sun snow": [
    "sun-snow"
  ],
  "sunrise": [
    "sunrise"
  ],
  "sunset": [
    "sunset"
  ],
  "superscript": [
    "superscript"
  ],
  "swatch-book": [
    "swatch-book"
  ],
  "swatch book": [
    "swatch-book"
  ],
  "swiss-franc": [
    "swiss-franc"
  ],
  "swiss franc": [
    "swiss-franc"
  ],
  "switch-camera": [
    "switch-camera"
  ],
  "switch camera": [
    "switch-camera"
  ],
  "sword": [
    "sword"
  ],
  "swords": [
    "swords"
  ],
  "syringe": [
    "syringe"
  ],
  "table": [
    "table"
  ],
  "table-2": [
    "table-2"
  ],
  "table 2": [
    "table-2"
  ],
  "table-cells-merge": [
    "table-cells-merge"
  ],
  "table cells merge": [
    "table-cells-merge"
  ],
  "table-cells-split": [
    "table-cells-split"
  ],
  "table cells split": [
    "table-cells-split"
  ],
  "table-columns-split": [
    "table-columns-split"
  ],
  "table columns split": [
    "table-columns-split"
  ],
  "table-config": [
    "table-config"
  ],
  "table config": [
    "table-config"
  ],
  "table-of-contents": [
    "table-of-contents"
  ],
  "table of contents": [
    "table-of-contents"
  ],
  "table-properties": [
    "table-properties"
  ],
  "table properties": [
    "table-properties"
  ],
  "table-rows-split": [
    "table-rows-split"
  ],
  "table rows split": [
    "table-rows-split"
  ],
  "tablet": [
    "tablet"
  ],
  "tablet-smartphone": [
    "tablet-smartphone"
  ],
  "tablet smartphone": [
    "tablet-smartphone"
  ],
  "tablets": [
    "tablets"
  ],
  "tag": [
    "tag"
  ],
  "tag-plus": [
    "tag-plus"
  ],
  "tag plus": [
    "tag-plus"
  ],
  "tag-x": [
    "tag-x"
  ],
  "tag x": [
    "tag-x"
  ],
  "tags": [
    "tags"
  ],
  "tally-1": [
    "tally-1"
  ],
  "tally 1": [
    "tally-1"
  ],
  "tally-2": [
    "tally-2"
  ],
  "tally 2": [
    "tally-2"
  ],
  "tally-3": [
    "tally-3"
  ],
  "tally 3": [
    "tally-3"
  ],
  "tally-4": [
    "tally-4"
  ],
  "tally 4": [
    "tally-4"
  ],
  "tally-5": [
    "tally-5"
  ],
  "tally 5": [
    "tally-5"
  ],
  "tangent": [
    "tangent"
  ],
  "target": [
    "target"
  ],
  "telescope": [
    "telescope"
  ],
  "tent": [
    "tent"
  ],
  "tent-tree": [
    "tent-tree"
  ],
  "tent tree": [
    "tent-tree"
  ],
  "terminal": [
    "terminal"
  ],
  "terminal-square": [
    "terminal-square"
  ],
  "terminal square": [
    "terminal-square"
  ],
  "test-tube": [
    "test-tube"
  ],
  "test tube": [
    "test-tube"
  ],
  "test-tube-2": [
    "test-tube-2"
  ],
  "test tube 2": [
    "test-tube-2"
  ],
  "test-tube-diagonal": [
    "test-tube-diagonal"
  ],
  "test tube diagonal": [
    "test-tube-diagonal"
  ],
  "test-tubes": [
    "test-tubes"
  ],
  "test tubes": [
    "test-tubes"
  ],
  "text": [
    "text"
  ],
  "text-align-center": [
    "text-align-center"
  ],
  "text align center": [
    "text-align-center"
  ],
  "text-align-end": [
    "text-align-end"
  ],
  "text align end": [
    "text-align-end"
  ],
  "text-align-justify": [
    "text-align-justify"
  ],
  "text align justify": [
    "text-align-justify"
  ],
  "text-align-justify-center": [
    "text-align-justify-center"
  ],
  "text align justify center": [
    "text-align-justify-center"
  ],
  "text-align-justify-end": [
    "text-align-justify-end"
  ],
  "text align justify end": [
    "text-align-justify-end"
  ],
  "text-align-justify-start": [
    "text-align-justify-start"
  ],
  "text align justify start": [
    "text-align-justify-start"
  ],
  "text-align-start": [
    "text-align-start"
  ],
  "text align start": [
    "text-align-start"
  ],
  "text-cursor": [
    "text-cursor"
  ],
  "text cursor": [
    "text-cursor"
  ],
  "text-cursor-input": [
    "text-cursor-input"
  ],
  "text cursor input": [
    "text-cursor-input"
  ],
  "text-initial": [
    "text-initial"
  ],
  "text initial": [
    "text-initial"
  ],
  "text-quote": [
    "text-quote"
  ],
  "text quote": [
    "text-quote"
  ],
  "text-search": [
    "text-search"
  ],
  "text search": [
    "text-search"
  ],
  "text-select": [
    "text-select"
  ],
  "text select": [
    "text-select"
  ],
  "text-selection": [
    "text-selection"
  ],
  "text selection": [
    "text-selection"
  ],
  "text-wrap": [
    "text-wrap"
  ],
  "text wrap": [
    "text-wrap"
  ],
  "theater": [
    "theater"
  ],
  "thermometer": [
    "thermometer"
  ],
  "thermometer-snowflake": [
    "thermometer-snowflake"
  ],
  "thermometer snowflake": [
    "thermometer-snowflake"
  ],
  "thermometer-sun": [
    "thermometer-sun"
  ],
  "thermometer sun": [
    "thermometer-sun"
  ],
  "this-way-up": [
    "this-way-up"
  ],
  "this way up": [
    "this-way-up"
  ],
  "este lado para cima": [
    "this-way-up"
  ],
  "orientacao": [
    "this-way-up"
  ],
  "thumbs-down": [
    "thumbs-down"
  ],
  "thumbs down": [
    "thumbs-down"
  ],
  "thumbs-up": [
    "thumbs-up"
  ],
  "thumbs up": [
    "thumbs-up"
  ],
  "tic-tac-toe": [
    "tic-tac-toe"
  ],
  "tic tac toe": [
    "tic-tac-toe"
  ],
  "ticket": [
    "ticket"
  ],
  "ticket-check": [
    "ticket-check"
  ],
  "ticket check": [
    "ticket-check"
  ],
  "ticket-minus": [
    "ticket-minus"
  ],
  "ticket minus": [
    "ticket-minus"
  ],
  "ticket-percent": [
    "ticket-percent"
  ],
  "ticket percent": [
    "ticket-percent"
  ],
  "ticket-plus": [
    "ticket-plus"
  ],
  "ticket plus": [
    "ticket-plus"
  ],
  "ticket-slash": [
    "ticket-slash"
  ],
  "ticket slash": [
    "ticket-slash"
  ],
  "ticket-x": [
    "ticket-x"
  ],
  "ticket x": [
    "ticket-x"
  ],
  "tickets": [
    "tickets"
  ],
  "tickets-plane": [
    "tickets-plane"
  ],
  "tickets plane": [
    "tickets-plane"
  ],
  "timeline": [
    "timeline"
  ],
  "timer": [
    "timer"
  ],
  "timer-off": [
    "timer-off"
  ],
  "timer off": [
    "timer-off"
  ],
  "timer-reset": [
    "timer-reset"
  ],
  "timer reset": [
    "timer-reset"
  ],
  "toggle-left": [
    "toggle-left"
  ],
  "toggle left": [
    "toggle-left"
  ],
  "toggle-right": [
    "toggle-right"
  ],
  "toggle right": [
    "toggle-right"
  ],
  "toilet": [
    "toilet"
  ],
  "tool-case": [
    "tool-case"
  ],
  "tool case": [
    "tool-case"
  ],
  "toolbox": [
    "toolbox"
  ],
  "toothbrush": [
    "toothbrush"
  ],
  "toothbrush-sparkles": [
    "toothbrush-sparkles"
  ],
  "toothbrush sparkles": [
    "toothbrush-sparkles"
  ],
  "tornado": [
    "tornado"
  ],
  "torus": [
    "torus"
  ],
  "touchpad": [
    "touchpad"
  ],
  "touchpad-off": [
    "touchpad-off"
  ],
  "touchpad off": [
    "touchpad-off"
  ],
  "towel-rack": [
    "towel-rack"
  ],
  "towel rack": [
    "towel-rack"
  ],
  "tower-control": [
    "tower-control"
  ],
  "tower control": [
    "tower-control"
  ],
  "toy-brick": [
    "toy-brick"
  ],
  "toy brick": [
    "toy-brick"
  ],
  "tractor": [
    "tractor"
  ],
  "traffic-cone": [
    "traffic-cone"
  ],
  "traffic cone": [
    "traffic-cone"
  ],
  "trailer": [
    "trailer"
  ],
  "train": [
    "train"
  ],
  "train-front": [
    "train-front"
  ],
  "train front": [
    "train-front"
  ],
  "train-front-tunnel": [
    "train-front-tunnel"
  ],
  "train front tunnel": [
    "train-front-tunnel"
  ],
  "train-track": [
    "train-track"
  ],
  "train track": [
    "train-track"
  ],
  "tram-front": [
    "tram-front"
  ],
  "tram front": [
    "tram-front"
  ],
  "transgender": [
    "transgender"
  ],
  "trash": [
    "trash"
  ],
  "trash-2": [
    "trash-2"
  ],
  "trash 2": [
    "trash-2"
  ],
  "trash-off": [
    "trash-off"
  ],
  "trash off": [
    "trash-off"
  ],
  "tree-deciduous": [
    "tree-deciduous"
  ],
  "tree deciduous": [
    "tree-deciduous"
  ],
  "tree-palm": [
    "tree-palm"
  ],
  "tree palm": [
    "tree-palm"
  ],
  "tree-pine": [
    "tree-pine"
  ],
  "tree pine": [
    "tree-pine"
  ],
  "trees": [
    "trees"
  ],
  "trending-down": [
    "trending-down"
  ],
  "trending down": [
    "trending-down"
  ],
  "trending-up": [
    "trending-up"
  ],
  "trending up": [
    "trending-up"
  ],
  "trending-up-down": [
    "trending-up-down"
  ],
  "trending up down": [
    "trending-up-down"
  ],
  "triangle": [
    "triangle"
  ],
  "triangle-alert": [
    "triangle-alert"
  ],
  "triangle alert": [
    "triangle-alert"
  ],
  "triangle-dashed": [
    "triangle-dashed"
  ],
  "triangle dashed": [
    "triangle-dashed"
  ],
  "triangle-right": [
    "triangle-right"
  ],
  "triangle right": [
    "triangle-right"
  ],
  "triangles-centerline-dashed-horizontal": [
    "triangles-centerline-dashed-horizontal"
  ],
  "triangles centerline dashed horizontal": [
    "triangles-centerline-dashed-horizontal"
  ],
  "triangles-centerline-dashed-vertical": [
    "triangles-centerline-dashed-vertical"
  ],
  "triangles centerline dashed vertical": [
    "triangles-centerline-dashed-vertical"
  ],
  "trophy": [
    "trophy"
  ],
  "truck": [
    "truck"
  ],
  "truck-electric": [
    "truck-electric"
  ],
  "truck electric": [
    "truck-electric"
  ],
  "tube-lotion": [
    "tube-lotion"
  ],
  "tube lotion": [
    "tube-lotion"
  ],
  "turkish-lira": [
    "turkish-lira"
  ],
  "turkish lira": [
    "turkish-lira"
  ],
  "turntable": [
    "turntable"
  ],
  "turtle": [
    "turtle"
  ],
  "tv": [
    "tv"
  ],
  "tv-2": [
    "tv-2"
  ],
  "tv 2": [
    "tv-2"
  ],
  "tv-minimal": [
    "tv-minimal"
  ],
  "tv minimal": [
    "tv-minimal"
  ],
  "tv-minimal-play": [
    "tv-minimal-play"
  ],
  "tv minimal play": [
    "tv-minimal-play"
  ],
  "type": [
    "type"
  ],
  "type-outline": [
    "type-outline"
  ],
  "type outline": [
    "type-outline"
  ],
  "umbrella": [
    "umbrella"
  ],
  "umbrella-off": [
    "umbrella-off"
  ],
  "umbrella off": [
    "umbrella-off"
  ],
  "underline": [
    "underline"
  ],
  "undo": [
    "undo"
  ],
  "undo-2": [
    "undo-2"
  ],
  "undo 2": [
    "undo-2"
  ],
  "undo-dot": [
    "undo-dot"
  ],
  "undo dot": [
    "undo-dot"
  ],
  "unfold-horizontal": [
    "unfold-horizontal"
  ],
  "unfold horizontal": [
    "unfold-horizontal"
  ],
  "unfold-vertical": [
    "unfold-vertical"
  ],
  "unfold vertical": [
    "unfold-vertical"
  ],
  "ungroup": [
    "ungroup"
  ],
  "university": [
    "university"
  ],
  "unlink": [
    "unlink"
  ],
  "unlink-2": [
    "unlink-2"
  ],
  "unlink 2": [
    "unlink-2"
  ],
  "unlock": [
    "unlock"
  ],
  "unlock-keyhole": [
    "unlock-keyhole"
  ],
  "unlock keyhole": [
    "unlock-keyhole"
  ],
  "unplug": [
    "unplug"
  ],
  "upload": [
    "upload"
  ],
  "upload-cloud": [
    "upload-cloud"
  ],
  "upload cloud": [
    "upload-cloud"
  ],
  "usb": [
    "usb"
  ],
  "usb-c-port": [
    "usb-c-port"
  ],
  "usb c port": [
    "usb-c-port"
  ],
  "user": [
    "user"
  ],
  "user-2": [
    "user-2"
  ],
  "user 2": [
    "user-2"
  ],
  "user-check": [
    "user-check"
  ],
  "user check": [
    "user-check"
  ],
  "user-check-2": [
    "user-check-2"
  ],
  "user check 2": [
    "user-check-2"
  ],
  "user-circle": [
    "user-circle"
  ],
  "user circle": [
    "user-circle"
  ],
  "user-circle-2": [
    "user-circle-2"
  ],
  "user circle 2": [
    "user-circle-2"
  ],
  "user-cog": [
    "user-cog"
  ],
  "user cog": [
    "user-cog"
  ],
  "user-cog-2": [
    "user-cog-2"
  ],
  "user cog 2": [
    "user-cog-2"
  ],
  "user-group": [
    "user-group"
  ],
  "user group": [
    "user-group"
  ],
  "user-key": [
    "user-key"
  ],
  "user key": [
    "user-key"
  ],
  "user-lock": [
    "user-lock"
  ],
  "user lock": [
    "user-lock"
  ],
  "user-minus": [
    "user-minus"
  ],
  "user minus": [
    "user-minus"
  ],
  "user-minus-2": [
    "user-minus-2"
  ],
  "user minus 2": [
    "user-minus-2"
  ],
  "user-pen": [
    "user-pen"
  ],
  "user pen": [
    "user-pen"
  ],
  "user-plus": [
    "user-plus"
  ],
  "user plus": [
    "user-plus"
  ],
  "user-plus-2": [
    "user-plus-2"
  ],
  "user plus 2": [
    "user-plus-2"
  ],
  "user-round": [
    "user-round"
  ],
  "user round": [
    "user-round"
  ],
  "user-round-arrow-left": [
    "user-round-arrow-left"
  ],
  "user round arrow left": [
    "user-round-arrow-left"
  ],
  "user-round-check": [
    "user-round-check"
  ],
  "user round check": [
    "user-round-check"
  ],
  "user-round-cog": [
    "user-round-cog"
  ],
  "user round cog": [
    "user-round-cog"
  ],
  "user-round-group": [
    "user-round-group"
  ],
  "user round group": [
    "user-round-group"
  ],
  "user-round-key": [
    "user-round-key"
  ],
  "user round key": [
    "user-round-key"
  ],
  "user-round-minus": [
    "user-round-minus"
  ],
  "user round minus": [
    "user-round-minus"
  ],
  "user-round-pen": [
    "user-round-pen"
  ],
  "user round pen": [
    "user-round-pen"
  ],
  "user-round-plus": [
    "user-round-plus"
  ],
  "user round plus": [
    "user-round-plus"
  ],
  "user-round-search": [
    "user-round-search"
  ],
  "user round search": [
    "user-round-search"
  ],
  "user-round-star": [
    "user-round-star"
  ],
  "user round star": [
    "user-round-star"
  ],
  "user-round-x": [
    "user-round-x"
  ],
  "user round x": [
    "user-round-x"
  ],
  "user-search": [
    "user-search"
  ],
  "user search": [
    "user-search"
  ],
  "user-shield": [
    "user-shield"
  ],
  "user shield": [
    "user-shield"
  ],
  "user-square": [
    "user-square"
  ],
  "user square": [
    "user-square"
  ],
  "user-square-2": [
    "user-square-2"
  ],
  "user square 2": [
    "user-square-2"
  ],
  "user-star": [
    "user-star"
  ],
  "user star": [
    "user-star"
  ],
  "user-x": [
    "user-x"
  ],
  "user x": [
    "user-x"
  ],
  "user-x-2": [
    "user-x-2"
  ],
  "user x 2": [
    "user-x-2"
  ],
  "users": [
    "users"
  ],
  "users-2": [
    "users-2"
  ],
  "users 2": [
    "users-2"
  ],
  "users-round": [
    "users-round"
  ],
  "users round": [
    "users-round"
  ],
  "utensils": [
    "utensils"
  ],
  "utensils-crossed": [
    "utensils-crossed"
  ],
  "utensils crossed": [
    "utensils-crossed"
  ],
  "utility-pole": [
    "utility-pole"
  ],
  "utility pole": [
    "utility-pole"
  ],
  "van": [
    "van"
  ],
  "variable": [
    "variable"
  ],
  "vault": [
    "vault"
  ],
  "vector-polygon": [
    "vector-polygon"
  ],
  "vector polygon": [
    "vector-polygon"
  ],
  "vector-square": [
    "vector-square"
  ],
  "vector square": [
    "vector-square"
  ],
  "vegan": [
    "vegan"
  ],
  "venetian-mask": [
    "venetian-mask"
  ],
  "venetian mask": [
    "venetian-mask"
  ],
  "venus": [
    "venus"
  ],
  "venus-and-mars": [
    "venus-and-mars"
  ],
  "venus and mars": [
    "venus-and-mars"
  ],
  "verified": [
    "verified"
  ],
  "vibrate": [
    "vibrate"
  ],
  "vibrate-off": [
    "vibrate-off"
  ],
  "vibrate off": [
    "vibrate-off"
  ],
  "video": [
    "video"
  ],
  "video-off": [
    "video-off"
  ],
  "video off": [
    "video-off"
  ],
  "videotape": [
    "videotape"
  ],
  "view": [
    "view"
  ],
  "virus": [
    "virus"
  ],
  "virus-off": [
    "virus-off"
  ],
  "virus off": [
    "virus-off"
  ],
  "voicemail": [
    "voicemail"
  ],
  "volleyball": [
    "volleyball"
  ],
  "volume": [
    "volume"
  ],
  "volume-1": [
    "volume-1"
  ],
  "volume 1": [
    "volume-1"
  ],
  "volume-2": [
    "volume-2"
  ],
  "volume 2": [
    "volume-2"
  ],
  "volume-off": [
    "volume-off"
  ],
  "volume off": [
    "volume-off"
  ],
  "volume-x": [
    "volume-x"
  ],
  "volume x": [
    "volume-x"
  ],
  "vote": [
    "vote"
  ],
  "wallet": [
    "wallet"
  ],
  "wallet-2": [
    "wallet-2"
  ],
  "wallet 2": [
    "wallet-2"
  ],
  "wallet-cards": [
    "wallet-cards"
  ],
  "wallet cards": [
    "wallet-cards"
  ],
  "wallet-minimal": [
    "wallet-minimal"
  ],
  "wallet minimal": [
    "wallet-minimal"
  ],
  "wallpaper": [
    "wallpaper"
  ],
  "wand": [
    "wand"
  ],
  "wand-2": [
    "wand-2"
  ],
  "wand 2": [
    "wand-2"
  ],
  "wand-sparkles": [
    "wand-sparkles"
  ],
  "wand sparkles": [
    "wand-sparkles"
  ],
  "warehouse": [
    "warehouse"
  ],
  "washing-machine": [
    "washing-machine"
  ],
  "washing machine": [
    "washing-machine"
  ],
  "watch": [
    "watch"
  ],
  "waves": [
    "waves"
  ],
  "waves-arrow-down": [
    "waves-arrow-down"
  ],
  "waves arrow down": [
    "waves-arrow-down"
  ],
  "waves-arrow-up": [
    "waves-arrow-up"
  ],
  "waves arrow up": [
    "waves-arrow-up"
  ],
  "waves-horizontal": [
    "waves-horizontal"
  ],
  "waves horizontal": [
    "waves-horizontal"
  ],
  "waves-ladder": [
    "waves-ladder"
  ],
  "waves ladder": [
    "waves-ladder"
  ],
  "waves-vertical": [
    "waves-vertical"
  ],
  "waves vertical": [
    "waves-vertical"
  ],
  "waypoints": [
    "waypoints"
  ],
  "webcam": [
    "webcam"
  ],
  "webcam-off": [
    "webcam-off"
  ],
  "webcam off": [
    "webcam-off"
  ],
  "webhook": [
    "webhook"
  ],
  "webhook-off": [
    "webhook-off"
  ],
  "webhook off": [
    "webhook-off"
  ],
  "weee": [
    "weee"
  ],
  "recycling": [
    "weee"
  ],
  "descarte": [
    "weee"
  ],
  "eletronico": [
    "weee"
  ],
  "lixo": [
    "weee"
  ],
  "weight": [
    "weight"
  ],
  "weight-tilde": [
    "weight-tilde"
  ],
  "weight tilde": [
    "weight-tilde"
  ],
  "wheat": [
    "wheat"
  ],
  "wheat-off": [
    "wheat-off"
  ],
  "wheat off": [
    "wheat-off"
  ],
  "whistle": [
    "whistle"
  ],
  "whole-word": [
    "whole-word"
  ],
  "whole word": [
    "whole-word"
  ],
  "wifi": [
    "wifi"
  ],
  "wifi-cog": [
    "wifi-cog"
  ],
  "wifi cog": [
    "wifi-cog"
  ],
  "wifi-high": [
    "wifi-high"
  ],
  "wifi high": [
    "wifi-high"
  ],
  "wifi-lock": [
    "wifi-lock"
  ],
  "wifi lock": [
    "wifi-lock"
  ],
  "wifi-low": [
    "wifi-low"
  ],
  "wifi low": [
    "wifi-low"
  ],
  "wifi-off": [
    "wifi-off"
  ],
  "wifi off": [
    "wifi-off"
  ],
  "wifi-pen": [
    "wifi-pen"
  ],
  "wifi pen": [
    "wifi-pen"
  ],
  "wifi-sync": [
    "wifi-sync"
  ],
  "wifi sync": [
    "wifi-sync"
  ],
  "wifi-zero": [
    "wifi-zero"
  ],
  "wifi zero": [
    "wifi-zero"
  ],
  "wind": [
    "wind"
  ],
  "wind-arrow-down": [
    "wind-arrow-down"
  ],
  "wind arrow down": [
    "wind-arrow-down"
  ],
  "wind-arrow-up": [
    "wind-arrow-up"
  ],
  "wind arrow up": [
    "wind-arrow-up"
  ],
  "wine": [
    "wine"
  ],
  "wine-off": [
    "wine-off"
  ],
  "wine off": [
    "wine-off"
  ],
  "workflow": [
    "workflow"
  ],
  "worm": [
    "worm"
  ],
  "wrap-text": [
    "wrap-text"
  ],
  "wrap text": [
    "wrap-text"
  ],
  "wrench": [
    "wrench"
  ],
  "wrench-off": [
    "wrench-off"
  ],
  "wrench off": [
    "wrench-off"
  ],
  "x": [
    "x"
  ],
  "x-circle": [
    "x-circle"
  ],
  "x circle": [
    "x-circle"
  ],
  "x-line-top": [
    "x-line-top"
  ],
  "x line top": [
    "x-line-top"
  ],
  "x-octagon": [
    "x-octagon"
  ],
  "x octagon": [
    "x-octagon"
  ],
  "x-square": [
    "x-square"
  ],
  "x square": [
    "x-square"
  ],
  "zap": [
    "zap"
  ],
  "zap-off": [
    "zap-off"
  ],
  "zap off": [
    "zap-off"
  ],
  "zodiac-aquarius": [
    "zodiac-aquarius"
  ],
  "zodiac aquarius": [
    "zodiac-aquarius"
  ],
  "zodiac-aries": [
    "zodiac-aries"
  ],
  "zodiac aries": [
    "zodiac-aries"
  ],
  "zodiac-cancer": [
    "zodiac-cancer"
  ],
  "zodiac cancer": [
    "zodiac-cancer"
  ],
  "zodiac-capricorn": [
    "zodiac-capricorn"
  ],
  "zodiac capricorn": [
    "zodiac-capricorn"
  ],
  "zodiac-gemini": [
    "zodiac-gemini"
  ],
  "zodiac gemini": [
    "zodiac-gemini"
  ],
  "zodiac-leo": [
    "zodiac-leo"
  ],
  "zodiac leo": [
    "zodiac-leo"
  ],
  "zodiac-libra": [
    "zodiac-libra"
  ],
  "zodiac libra": [
    "zodiac-libra"
  ],
  "zodiac-ophiuchus": [
    "zodiac-ophiuchus"
  ],
  "zodiac ophiuchus": [
    "zodiac-ophiuchus"
  ],
  "zodiac-pisces": [
    "zodiac-pisces"
  ],
  "zodiac pisces": [
    "zodiac-pisces"
  ],
  "zodiac-sagittarius": [
    "zodiac-sagittarius"
  ],
  "zodiac sagittarius": [
    "zodiac-sagittarius"
  ],
  "zodiac-scorpio": [
    "zodiac-scorpio"
  ],
  "zodiac scorpio": [
    "zodiac-scorpio"
  ],
  "zodiac-taurus": [
    "zodiac-taurus"
  ],
  "zodiac taurus": [
    "zodiac-taurus"
  ],
  "zodiac-virgo": [
    "zodiac-virgo"
  ],
  "zodiac virgo": [
    "zodiac-virgo"
  ],
  "zoom-in": [
    "zoom-in"
  ],
  "zoom in": [
    "zoom-in"
  ],
  "zoom-out": [
    "zoom-out"
  ],
  "zoom out": [
    "zoom-out"
  ]
};
