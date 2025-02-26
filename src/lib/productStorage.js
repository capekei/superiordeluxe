// Utilidad para manejar el almacenamiento de productos
import productsData from '../data/products.json';

// Obtener productos del localStorage o usar los predeterminados
export function getProducts() {
  if (typeof window !== 'undefined') {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      return JSON.parse(storedProducts);
    }
  }
  
  // Si no hay productos almacenados, usar los predeterminados
  return productsData.products;
}

// Guardar productos en localStorage
export function saveProducts(products) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('products', JSON.stringify(products));
  }
  return products;
}

// Obtener un producto por ID
export function getProductById(id) {
  const products = getProducts();
  return products.find(product => product.id === id);
}

// Añadir un nuevo producto
export function addProduct(product) {
  const products = getProducts();
  // Asegurarse de que el ID sea único
  const newId = Math.max(...products.map(p => parseInt(p.id)), 0) + 1;
  const newProduct = { ...product, id: newId.toString() };
  
  const updatedProducts = [...products, newProduct];
  saveProducts(updatedProducts);
  return newProduct;
}

// Actualizar un producto existente
export function updateProduct(id, updatedData) {
  const products = getProducts();
  const updatedProducts = products.map(product => 
    product.id === id ? { ...product, ...updatedData } : product
  );
  
  saveProducts(updatedProducts);
  return updatedProducts.find(p => p.id === id);
}

// Eliminar un producto
export function deleteProduct(id) {
  const products = getProducts();
  const updatedProducts = products.filter(product => product.id !== id);
  saveProducts(updatedProducts);
  return updatedProducts;
}
