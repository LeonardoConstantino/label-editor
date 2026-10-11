import { MelodyOptions, NotePreset } from '../core/UISoundManager';

export const forgeOSBoot: { notes: NotePreset[]; options: MelodyOptions } = {
  notes: [
    // 1. VAZIO CÓSMICO — O som emerge do silêncio
    {
      sound: {
        freq: [55, 82.41],
        duration: 0.82,
        type: 'sine',
        volume: 0.065,
        envelope: {
          attack: 0.16,
          decay: 0.2,
          sustain: 0.42,
          release: 0.3,
        },
        noise: {
          amount: 0.006,
          type: 'brown',
          duration: 0.65,
        },
        filter: {
          type: 'lowpass',
          frequency: 300,
          Q: 0.7,
        },
      },
      beats: 0.18,
    },

    // 2. DESPERTAR — O campo harmônico se expande
    {
      sound: {
        freq: [55, 82.41, 110, 123.47],
        duration: 0.86,
        type: 'sine',
        volume: 0.055,
        envelope: {
          attack: 0.17,
          decay: 0.22,
          sustain: 0.45,
          release: 0.32,
        },
        noise: {
          amount: 0.005,
          type: 'brown',
          duration: 0.65,
        },
        filter: {
          type: 'lowpass',
          frequency: 460,
          Q: 0.75,
        },
      },
      beats: 0.18,
    },

    // 3. TRANSCENDÊNCIA — O cluster ganha corpo e luminosidade
    {
      sound: {
        freq: [82.41, 110, 123.47, 146.83, 164.81],
        duration: 0.9,
        type: 'triangle',
        volume: 0.05,
        envelope: {
          attack: 0.18,
          decay: 0.23,
          sustain: 0.46,
          release: 0.35,
        },
        noise: {
          amount: 0.004,
          type: 'brown',
          duration: 0.65,
        },
        filter: {
          type: 'lowpass',
          frequency: 800,
          Q: 0.8,
        },
      },
      beats: 0.18,
    },

    // 4. MONÓLITO — Abertura sonora, sem um golpe de clímax
    {
      sound: {
        freq: [55, 82.41, 110, 164.81, 220, 329.63],
        duration: 0.92,
        type: 'sine',
        volume: 0.045,
        envelope: {
          attack: 0.2,
          decay: 0.25,
          sustain: 0.4,
          release: 0.42,
        },
        noise: {
          amount: 0.003,
          type: 'brown',
          duration: 0.6,
        },
        filter: {
          type: 'lowpass',
          frequency: 1400,
          Q: 0.7,
        },
      },
      beats: 0.18,
    },
  ],
  options: { bpm: 60, loop: false },
};
