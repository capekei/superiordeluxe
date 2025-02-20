'use client';

import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function FloatingCart() {
  const [isOpen, setIsOpen] = useState(false);
  const { cart, removeFromCart } = useCart();

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.precio * (item.quantity || 1)), 0);
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 p-4 rounded-full shadow-lg z-50 bg-blue-600 hover:bg-blue-500 text-white transition-colors"
      >
        <div className="relative">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          {cart.length > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
            >
              {cart.length}
            </motion.span>
          )}
        </div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-28 right-8 w-96 z-50"
          >
            <div className="relative p-6 rounded-2xl bg-white dark:bg-slate-800 shadow-xl border border-slate-200/50 dark:border-slate-700/50">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">
                  Carrito
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors"
                >
                  <svg className="w-5 h-5 text-slate-600 dark:text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {cart.length === 0 ? (
                <p className="text-slate-600 dark:text-slate-400 text-center py-4">
                  El carrito está vacío
                </p>
              ) : (
                <>
                  <div className="space-y-4 max-h-[40vh] overflow-y-auto">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-700/50"
                      >
                        <div>
                          <h3 className="font-medium text-slate-800 dark:text-slate-200">
                            {item.modelo}
                          </h3>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            ${item.precio?.toLocaleString()}
                          </p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-medium text-slate-800 dark:text-slate-200">
                        Total
                      </span>
                      <span className="text-xl font-bold text-slate-800 dark:text-slate-200">
                        ${calculateTotal().toLocaleString()}
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 