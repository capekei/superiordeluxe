import { persistentAtom } from '@nanostores/persistent';

// Crear store persistente (se guarda en localStorage)
export const cartStore = persistentAtom(
  'cart',
  { items: [] },
  {
    encode: JSON.stringify,
    decode: JSON.parse,
  }
);

// Funciones para manipular el carrito
export function addToCart(product, quantity = 1) {
  const cart = cartStore.get();
  const existingItem = cart.items.find(item => item.product.id === product.id);
  
  if (existingItem) {
    // Actualizar cantidad si el producto ya está en el carrito
    cartStore.set({
      items: cart.items.map(item => 
        item.product.id === product.id 
          ? { ...item, quantity: item.quantity + quantity }
          : item
      )
    });
  } else {
    // Añadir nuevo producto al carrito
    cartStore.set({
      items: [...cart.items, { product, quantity }]
    });
  }
}

export function removeFromCart(productId) {
  const cart = cartStore.get();
  cartStore.set({
    items: cart.items.filter(item => item.product.id !== productId)
  });
}

export function updateQuantity(productId, quantity) {
  const cart = cartStore.get();
  cartStore.set({
    items: cart.items.map(item => 
      item.product.id === productId 
        ? { ...item, quantity: quantity }
        : item
    )
  });
}

export function clearCart() {
  cartStore.set({ items: [] });
}

export function getCartTotal() {
  const cart = cartStore.get();
  return cart.items.reduce((total, item) => {
    return total + (Number(item.product.price) * item.quantity);
  }, 0);
}

export function getCartItemsCount() {
  const cart = cartStore.get();
  return cart.items.reduce((count, item) => count + item.quantity, 0);
}