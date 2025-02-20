'use client';

import { useCart } from '@/contexts/CartContext';
import FloatingCart from '@/components/FloatingCart';

export default function CartWrapper() {
  const { cart, removeFromCart } = useCart();

  return <FloatingCart />;
} 