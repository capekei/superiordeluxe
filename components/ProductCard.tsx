'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';
import { useInventory } from '@/contexts/InventoryContext';
import { useState } from 'react';

interface ProductCardProps {
  id: number;
  modelo: string;
  descripcion: string;
  whatsappLink: string;
  precio: number;
  stock?: number;
}

export default function ProductCard({ id, modelo, descripcion, whatsappLink, precio, stock = 0 }: ProductCardProps) {
  const { addToCart } = useCart();
  const { updateStock } = useInventory();
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState<'success' | 'error'>('success');

  const handleAddToCart = () => {
    if (stock <= 0) {
      setNotificationMessage('No hay stock disponible');
      setNotificationType('error');
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 2000);
      return;
    }

    addToCart({ id, modelo, descripcion, precio, quantity: 1 });
    updateStock(id, 1);
    setNotificationMessage('¡Agregado al carrito!');
    setNotificationType('success');
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };

  return (
    <div className="group relative mt-6 rounded-3xl overflow-visible border border-slate-300/30 dark:border-slate-600/30 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10">
      {/* Success/Error Notification */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute -top-12 left-1/2 -translate-x-1/2 z-20"
          >
            <div className={`px-4 py-2 rounded-full ${
              notificationType === 'success' ? 'bg-green-500' : 'bg-red-500'
            } text-white text-sm font-medium shadow-lg`}>
              {notificationMessage}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Card Content */}
      <div className="relative p-8">
        {/* Stock Badge */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-10 w-auto">
          <div className="relative px-6 py-2 rounded-full bg-gradient-to-r from-slate-400/20 via-zinc-300/20 to-slate-400/20 border border-slate-300/30 dark:border-slate-600/30 backdrop-blur-sm">
            <span className={`text-sm font-medium whitespace-nowrap ${
              stock > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
            }`}>
              {stock > 0 ? `${stock} unidades disponibles` : 'Sin stock'}
            </span>
          </div>
        </div>

        {/* Product Info */}
        <div className="pt-4">
          <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">
            {modelo}
          </h3>
          <p className="text-slate-600 dark:text-slate-300 font-light mb-2">
            {descripcion}
          </p>
          <p className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-6">
            ${typeof precio === 'number' ? precio.toLocaleString() : '0'}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            <motion.a 
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group/btn relative inline-flex items-center px-6 py-3 text-slate-800 dark:text-slate-200 font-medium rounded-full overflow-hidden transition-all duration-300 border-2 border-slate-200 dark:border-slate-700 hover:border-green-500 dark:hover:border-green-500"
            >
              <span className="relative flex items-center">
                Consultar por WhatsApp
                <svg 
                  className="w-5 h-5 ml-2 transition-transform duration-300 group-hover/btn:translate-x-1 text-slate-600 dark:text-slate-400 group-hover/btn:text-green-500" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </span>
            </motion.a>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddToCart}
              disabled={stock <= 0}
              className={`group/btn relative inline-flex items-center px-6 py-3 text-slate-800 dark:text-slate-200 font-medium rounded-full overflow-hidden transition-all duration-300 border-2 ${
                stock > 0 
                  ? 'border-slate-200 dark:border-slate-700 hover:border-slate-800 dark:hover:border-slate-200' 
                  : 'border-red-200 dark:border-red-700 opacity-50 cursor-not-allowed'
              }`}
            >
              <span className="relative flex items-center">
                {stock > 0 ? 'Agregar al Carrito' : 'Sin Stock'}
                {stock > 0 && (
                  <svg 
                    className="w-5 h-5 ml-2 transition-transform duration-300 group-hover/btn:translate-x-1 text-slate-600 dark:text-slate-400 group-hover/btn:text-slate-800 dark:group-hover/btn:text-slate-200" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                )}
              </span>
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
