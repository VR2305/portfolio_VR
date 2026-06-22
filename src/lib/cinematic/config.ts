/**
 * Configuration for cinematic frame sequences.
 * 
 * PLACEHOLDER WEBP FRAMES LOCATION:
 * - /public/sequences/hero-about/[0001-0100].webp
 * - /public/sequences/about-workstation/[0001-0100].webp
 * 
 * Note: Frames should be extracted from Flow-generated videos.
 */

export interface SequenceConfig {
  id: string;
  folder: string;
  frameCount: number;
  description: string;
}

export const CINEMATIC_SEQUENCES: Record<string, SequenceConfig> = {
  heroAbout: {
    id: 'hero-about',
    folder: 'hero-about',
    frameCount: 240,
    description: 'Front portrait drifting left transition',
  },
  aboutWorkstation: {
    id: 'about-workstation',
    folder: 'about-workstation',
    frameCount: 240,
    description: 'Side profile rotating into workstation composition',
  },
};

export const getFramePath = (sequence: SequenceConfig, index: number) => {
  const paddedIndex = String(index).padStart(4, '0');
  return `/sequences/${sequence.folder}/${paddedIndex}.webp`;
};

export const getAllFramePaths = (sequence: SequenceConfig) => {
  return Array.from({ length: sequence.frameCount }, (_, i) => 
    getFramePath(sequence, i + 1)
  );
};
