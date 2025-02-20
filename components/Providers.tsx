'use client';

import { ThemeProvider } from 'next-themes';
import { CartProvider } from '@/contexts/CartContext';
import { InventoryProvider } from '@/contexts/InventoryContext';
import { ReactNode } from 'react';

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <InventoryProvider>
        <CartProvider>
          {children}
        </CartProvider>
      </InventoryProvider>
    </ThemeProvider>
  );
} 