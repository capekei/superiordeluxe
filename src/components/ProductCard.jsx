import React from 'react';
import { addToCart } from '../stores/cartStore.ts';

const ProductCard = ({ product }) => {
  const { id, name, shortDesc, category, keyFeature, imageUrl, price, badge } = product;
  
  // Determinar la URL de la imagen
  let productImage;
  if (imageUrl && imageUrl !== '/images/placeholder.jpg') {
    productImage = imageUrl;
  } else if (category) {
    // Usar imagen específica de la categoría si está disponible
    productImage = `/images/${category.toLowerCase()}.jpg`;
  } else {
    // Fallback a una imagen predeterminada
    productImage = '/images/product-1.jpg';
  }
  
  const handleAddToCart = () => {
    addToCart(product, 1);
    
    // Mostrar notificación
    const notification = document.getElementById('cart-notification');
    if (notification) {
      notification.textContent = `${name} agregado al carrito`;
      notification.classList.remove('hidden');
      notification.classList.add('flex');
      
      // Ocultar después de 3 segundos
      setTimeout(() => {
        notification.classList.remove('flex');
        notification.classList.add('hidden');
      }, 3000);
    }
  };
  
  return (
    <div className="product-card bg-white rounded-lg border border-gray-200 overflow-hidden flex flex-col h-full shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="relative">
        <img 
          src={productImage} 
          alt={name}
          className="w-full h-48 object-contain bg-gray-50 p-4"
          onError={(e) => { e.target.onerror = null; e.target.src = '/images/product-1.jpg'; }}
        />
        {badge && (
          <span className={`absolute top-2 right-2 px-2 py-1 text-xs font-medium rounded-sm ${
            badge === 'Nuevo' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
          }`}>
            {badge}
          </span>
        )}
      </div>
      
      <div className="p-4 flex-grow flex flex-col">
        <div className="mb-2">
          <h3 className="text-lg font-medium text-gray-800">{name}</h3>
          <p className="text-sm text-gray-500">{category}</p>
        </div>
        
        <p className="text-sm text-gray-600 mb-4 flex-grow">{shortDesc}</p>
        
        <div className="mt-auto">
          {keyFeature && (
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-medium">{keyFeature}</span>
            </p>
          )}
          
          {price && (
            <p className="text-xl font-bold text-gray-800 mb-3">${price}</p>
          )}
          
          <div className="flex space-x-2">
            <button 
              onClick={handleAddToCart}
              className="flex-1 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Agregar al carrito
            </button>
            
            <a 
              href={`/producto/${id}`} 
              className="flex-1 px-4 py-2 bg-gray-100 text-gray-800 text-sm font-medium rounded hover:bg-gray-200 transition-colors text-center"
            >
              Ver detalles
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 