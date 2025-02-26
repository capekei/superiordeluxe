import React, { useState, useEffect } from 'react';

const CartNotification = () => {
  const [visible, setVisible] = useState(false);
  const [product, setProduct] = useState('');
  const [animation, setAnimation] = useState('');

  // Función para mostrar la notificación
  const showNotification = (productName) => {
    setProduct(productName);
    setVisible(true);
    setAnimation('slide-in');
    
    // Ocultar después de 3 segundos
    setTimeout(() => {
      setAnimation('slide-out');
      setTimeout(() => {
        setVisible(false);
      }, 500); // Coincidir con la duración de la animación de salida
    }, 3000);
  };

  // Exponer la función al objeto window para poder llamarla desde cualquier parte
  useEffect(() => {
    // Asegurarse de que estamos en el cliente
    if (typeof window !== 'undefined') {
      window.showCartNotification = showNotification;
      
      return () => {
        delete window.showCartNotification;
      };
    }
  }, []);

  // Manejar cierre manual
  const handleClose = () => {
    setAnimation('slide-out');
    setTimeout(() => {
      setVisible(false);
    }, 500);
  };

  if (!visible) return null;

  return (
    <div 
      className="fixed bottom-6 right-6 z-50 max-w-md"
      style={{
        animation: animation === 'slide-in' ? 'slideInRight 0.5s ease forwards' : animation === 'slide-out' ? 'slideOut 0.5s ease forwards' : ''
      }}
    >
      <div className="bg-white/90 backdrop-blur-md rounded-lg shadow-lg border-l-4 border-accent p-4 flex items-center gap-4">
        <div className="flex-shrink-0 bg-accent/10 rounded-full p-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <div className="flex-grow">
          <h4 className="font-medium text-gray-900">Añadido al carrito</h4>
          {product && <p className="text-sm text-gray-600 mt-0.5">{product}</p>}
        </div>
        
        <button 
          onClick={handleClose}
          className="text-gray-400 hover:text-accent transition-colors p-1 rounded-full hover:bg-gray-100"
          aria-label="Cerrar notificación"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      
      <style jsx>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOut {
          from { transform: translateX(0); opacity: 1; }
          to { transform: translateX(100%); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default CartNotification; 