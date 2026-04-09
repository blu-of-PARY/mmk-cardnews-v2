// Magazine style palettes — import in Card components
// Usage: import { BRUTUS } from '../magazine-styles'

export type MagazineStyle = 'brutus' | 'popeye' | 'casa' | 'olive' | 'switch' | 'pen';

export const BRUTUS = {
  colors: {
    primary: '#1A1A1A',
    background: '#F5F0E8',
    accent: '#D62B2B',
  },
  typography: {
    headline: { fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900 as const, letterSpacing: '-0.03em', textTransform: 'uppercase' as const },
    body: { fontFamily: "'Noto Sans KR', sans-serif", fontWeight: 400 as const },
  },
  overlay: {
    cover: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.6) 100%)',
    content: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.85) 100%)',
    closing: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.6) 100%)',
  },
};

export const POPEYE = {
  colors: {
    primary: '#1A1A1A',
    background: '#F7F4EE',
    cream: '#E8E0D0',
    muted: '#B5A89A',
  },
  typography: {
    headline: { fontFamily: "'DM Sans', sans-serif", fontWeight: 700 as const, letterSpacing: '0.05em', textTransform: 'uppercase' as const },
    body: { fontFamily: "'Noto Sans KR', sans-serif", fontWeight: 400 as const },
  },
  overlay: {
    cover: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.45) 100%)',
    content: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.75) 100%)',
    closing: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.45) 100%)',
  },
};

export const CASA_BRUTUS = {
  colors: {
    primary: '#2C2C2C',
    background: '#F2EDE5',
    concrete: '#8B9EA8',
    stone: '#C4B49A',
    plant: '#6B8E7A',
    blueprint: '#1C4E8A',
  },
  typography: {
    headline: { fontFamily: "'Noto Serif KR', serif", fontWeight: 700 as const, letterSpacing: '0.01em' },
    body: { fontFamily: "'Noto Sans KR', sans-serif", fontWeight: 400 as const },
  },
  overlay: {
    cover: 'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.55) 100%)',
    content: 'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.8) 100%)',
    closing: 'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.55) 100%)',
  },
};

export const OLIVE = {
  colors: {
    primary: '#8B7B6B',
    background: '#F0E8D5',
    accent: '#7B9E6B',
    warm: '#D4A574',
    skin: '#E8D5C4',
    rust: '#B5704A',
  },
  typography: {
    headline: { fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 as const, fontStyle: 'italic' as const },
    body: { fontFamily: "'Noto Sans KR', sans-serif", fontWeight: 400 as const },
  },
  overlay: {
    cover: 'linear-gradient(to bottom, rgba(64,48,32,0.15) 0%, rgba(64,48,32,0.5) 100%)',
    content: 'linear-gradient(to bottom, rgba(64,48,32,0.3) 0%, rgba(64,48,32,0.75) 100%)',
    closing: 'linear-gradient(to bottom, rgba(64,48,32,0.15) 0%, rgba(64,48,32,0.5) 100%)',
  },
};

export const SWITCH_MAG = {
  colors: {
    primary: '#1A1A1A',
    background: '#F5F2EC',
    secondary: '#6B6B6B',
    muted: '#A89880',
  },
  typography: {
    headline: { fontFamily: "'Noto Sans KR', sans-serif", fontWeight: 400 as const },
    body: { fontFamily: "'Noto Sans KR', sans-serif", fontWeight: 300 as const },
  },
  overlay: {
    cover: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 100%)',
    content: 'linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.7) 100%)',
    closing: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 100%)',
  },
};

export const PEN = {
  colors: {
    primary: '#111111',
    background: '#FAFAF7',
    paper: '#E8E4DC',
    gray: '#9C9C9C',
    accent: '#C4381E',
  },
  typography: {
    headline: { fontFamily: "'Noto Sans KR', sans-serif", fontWeight: 300 as const, letterSpacing: '-0.01em' },
    body: { fontFamily: "'Noto Sans KR', sans-serif", fontWeight: 300 as const },
  },
  overlay: {
    cover: 'linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.35) 100%)',
    content: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.65) 100%)',
    closing: 'linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.35) 100%)',
  },
};

export const MAGAZINE_STYLES = {
  brutus: BRUTUS,
  popeye: POPEYE,
  casa: CASA_BRUTUS,
  olive: OLIVE,
  switch: SWITCH_MAG,
  pen: PEN,
} as const;
