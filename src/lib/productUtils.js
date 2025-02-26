/**
 * Utilidades para productos y serialización JSON segura
 */

/**
 * Formatea un producto para su uso seguro en el carrito
 * @param {Object} product - Objeto de producto a formatear
 * @returns {Object} Producto formateado con solo los campos necesarios
 */
export function formatProductForCart(product) {
  // Solo incluimos los campos necesarios para el carrito
  return {
    id: product.id,
    name: product.name,
    price: product.price || 0,
    imageUrl: product.imageUrl || '',
    category: product.category
  };
}

/**
 * Serializa un producto de forma segura para su almacenamiento en el DOM
 * @param {Object} product - Objeto de producto a serializar
 * @returns {string} JSON string seguro
 */
export function safeStringifyProduct(product) {
  try {
    // Formatea el producto para el carrito
    const formattedProduct = formatProductForCart(product);
    
    // Serializa con formato y escapa caracteres especiales
    const jsonString = JSON.stringify(formattedProduct, null, 2)
      .replace(/</g, '\\u003c')
      .replace(/>/g, '\\u003e');
    
    return jsonString;
  } catch (error) {
    console.error('Error al serializar producto:', error);
    return JSON.stringify({
      id: product.id || 'unknown',
      name: product.name || 'Producto sin nombre',
      price: 0
    });
  }
}
