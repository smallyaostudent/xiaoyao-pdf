/**
 * xiaoyao-pdf Mantine theme configuration
 * Wraps @mantine/core MantineTheme with xiaoyao-pdf brand tokens.
 */
import { createTheme, MantineColorsTuple } from '@mantine/core';
import { colors } from './tokens';

// Build brand color tuple (10 shades) from our tokens
const brandTuple: MantineColorsTuple = [
  colors.brand[50],
  colors.brand[100],
  colors.brand[200],
  colors.brand[300],
  colors.brand[400],
  colors.brand[500],
  colors.brand[600],
  colors.brand[700],
  colors.brand[800],
  colors.brand[900],
];

const neutralTuple: MantineColorsTuple = [
  colors.neutral[0],
  colors.neutral[50],
  colors.neutral[100],
  colors.neutral[200],
  colors.neutral[300],
  colors.neutral[400],
  colors.neutral[500],
  colors.neutral[600],
  colors.neutral[700],
  colors.neutral[800],
];

export const mantineTheme = createTheme({
  primaryColor: 'brand',
  primaryShade: { light: 5, dark: 4 },
  colors: {
    brand: brandTuple,
    neutral: neutralTuple,
  },
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "PingFang SC", "Microsoft YaHei", "Noto Sans CJK SC", sans-serif',
  fontFamilyMonospace: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, monospace',
  headings: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontWeight: '600',
  },
  defaultRadius: 'md',
  radius: {
    xs: '4px',
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
  },
  spacing: {
    xs: '8px',
    sm: '12px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
  shadows: {
    xs: '0 1px 2px rgba(0, 0, 0, 0.04)',
    sm: '0 1px 2px rgba(0, 0, 0, 0.04)',
    md: '0 2px 4px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04)',
    lg: '0 4px 8px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.04)',
    xl: '0 8px 16px rgba(0, 0, 0, 0.10), 0 4px 8px rgba(0, 0, 0, 0.06)',
  },
  other: {
    xiaoyaoBrand: '#0F3D3E',
    xiaoyaoFontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "PingFang SC", "Microsoft YaHei", "Noto Sans CJK SC", sans-serif',
  },
});