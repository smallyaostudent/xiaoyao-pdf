/**
 * xiaoyao-pdf Design Tokens
 * Fork of Stirling-PDF v2.14.0
 *
 * Single source of truth for design system primitives (colors, spacing,
 * radius, typography). Mantine theme and Tailwind config both import from
 * here. NO business logic, NO component-specific values.
 *
 * Brand color: deep teal #0F3D3E (matches xiaoyao-pdf logo).
 */

export const colors = {
  brand: {
    50: '#E6F0F0',
    100: '#B8D4D5',
    200: '#7FAFAF',
    300: '#4A8989',
    400: '#1F6465',
    500: '#0F3D3E', // primary
    600: '#0C3132',
    700: '#0A2A2B',
    800: '#072021',
    900: '#051516',
  },
  neutral: {
    0: '#FFFFFF',
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#E5E5E5',
    300: '#D4D4D4',
    400: '#A3A3A3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
  },
  semantic: {
    success: '#16A34A',
    warning: '#D97706',
    error: '#DC2626',
    info: '#0F3D3E',
  },
} as const;

export const spacing = {
  0: '0',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  6: '24px',
  8: '32px',
  12: '48px',
  16: '64px',
} as const;

export const radius = {
  none: '0',
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  full: '9999px',
} as const;

export const fontFamily = {
  sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "PingFang SC", "Microsoft YaHei", "Noto Sans CJK SC", sans-serif',
  mono: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", monospace',
} as const;

export const fontSize = {
  xs: '12px',
  sm: '13px',
  base: '14px',
  md: '15px',
  lg: '17px',
  xl: '20px',
  '2xl': '24px',
  '3xl': '30px',
  '4xl': '36px',
} as const;

export const fontWeight = {
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

export const shadow = {
  none: 'none',
  sm: '0 1px 2px rgba(0, 0, 0, 0.04)',
  md: '0 2px 4px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04)',
  lg: '0 4px 8px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.04)',
  xl: '0 8px 16px rgba(0, 0, 0, 0.10), 0 4px 8px rgba(0, 0, 0, 0.06)',
} as const;

export const transition = {
  fast: '120ms ease',
  normal: '200ms ease',
  slow: '320ms ease',
} as const;

export const zIndex = {
  base: 0,
  dropdown: 1000,
  sticky: 1100,
  fixed: 1200,
  modalBackdrop: 1300,
  modal: 1400,
  popover: 1500,
  tooltip: 1600,
} as const;