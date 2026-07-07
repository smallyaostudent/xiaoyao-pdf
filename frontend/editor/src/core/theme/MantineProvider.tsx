/**
 * xiaoyao-pdf MantineProvider wrapper
 * Drop-in replacement for MantineProvider that injects xiaoyao-pdf brand theme.
 */
import { MantineProvider as MantineProviderBase } from '@mantine/core';
import { mantineTheme } from './mantineTheme';
import type { ReactNode } from 'react';

interface XyaoyaoMantineProviderProps {
  children: ReactNode;
}

export function MantineProvider({ children }: XyaoyaoMantineProviderProps) {
  return (
    <MantineProviderBase theme={mantineTheme} defaultColorScheme="light">
      {children}
    </MantineProviderBase>
  );
}

export { mantineTheme };