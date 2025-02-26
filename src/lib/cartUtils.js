// Importar el store del carrito
import { cartStore, addToCart as addToCartStore, removeFromCart, updateQuantity, clearCart, getCartTotal, getCartItemsCount } from '../stores/cartStore';

// Función segura para añadir al carrito desde componentes no-React
export function addToCart(product, quantity = 1) {
  if (typeof window === 'undefined') return;
  
  try {
    addToCartStore(product, quantity);
    
    // Emitir evento para actualizar contadores y UI
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('cart-updated', { 
        detail: { productId: product.id }
      }));
    }
    
    return true;
  } catch (error) {
    console.error('Error al añadir al carrito:', error);
    return false;
  }
}

// Función segura para obtener el total del carrito
export function getTotal() {
  if (typeof window === 'undefined') return 0;
  return getCartTotal();
}

// Función segura para obtener el número de items en el carrito
export function getItemsCount() {
  if (typeof window === 'undefined') return 0;
  return getCartItemsCount();
}

// Función segura para eliminar un producto del carrito
export function removeItem(productId) {
  if (typeof window === 'undefined') return;
  removeFromCart(productId);
  
  // Emitir evento para actualizar contadores y UI
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('cart-updated', { 
      detail: { productId }
    }));
  }
}

// Función segura para actualizar la cantidad de un producto
export function updateItemQuantity(productId, quantity) {
  if (typeof window === 'undefined') return;
  updateQuantity(productId, quantity);
  
  // Emitir evento para actualizar contadores y UI
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('cart-updated', { 
      detail: { productId }
    }));
  }
}

// Función segura para vaciar el carrito
export function emptyCart() {
  if (typeof window === 'undefined') return;
  clearCart();
  
  // Emitir evento para actualizar contadores y UI
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('cart-updated'));
  }
}

// Función para obtener el contenido actual del carrito
export function getCartContents() {
  if (typeof window === 'undefined') return { items: [] };
  return cartStore.get();
}

// Exportar todo el store para componentes React
export { cartStore }; 