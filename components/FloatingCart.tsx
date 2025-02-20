'use client';

import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function FloatingCart() {
  const [isOpen, setIsOpen] = useState(false);
  const { cart, removeFromCart, addToCart } = useCart();

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.precio * (item.quantity || 1)), 0);
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 p-4 rounded-2xl shadow-lg z-50 bg-gradient-to-br from-slate-100 via-zinc-100 to-slate-200 dark:from-slate-700 dark:via-zinc-800 dark:to-slate-900 backdrop-blur-lg border border-white/20 dark:border-white/10"
      >
        <div className="relative">
          <svg 
            className="w-6 h-6 text-slate-700 dark:text-slate-200" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
            />
          </svg>
          {cart.length > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-2 -right-2 bg-gradient-to-r from-slate-900 to-slate-800 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-lg shadow-slate-500/30"
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
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-slate-100/80 via-zinc-100/80 to-slate-200/80 dark:from-slate-800/80 dark:via-zinc-900/80 dark:to-slate-950/80 backdrop-blur-xl rounded-3xl" />
              
              <div className="relative p-6 rounded-3xl border border-white/20 dark:border-white/10 overflow-hidden">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">
                    Carrito
                  </h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-xl hover:bg-slate-200/50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <svg className="w-5 h-5 text-slate-600 dark:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-600">
                  {cart.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-slate-800 dark:text-slate-100">El carrito está vacío</p>
                    </div>
                  ) : (
                    cart.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="group flex items-center justify-between p-4 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-white/10 dark:border-white/5 hover:border-blue-500/20 dark:hover:border-blue-400/20 transition-colors"
                      >
                        <div className="flex-1 min-w-0">
                          <h3 className="text-slate-900 dark:text-slate-100 font-medium truncate">
                            {item.modelo}
                          </h3>
                          <p className="text-slate-800 dark:text-slate-200">
                            ${item.precio?.toLocaleString()}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() => {
                                if (item.quantity > 1) {
                                  const newItem = { ...item, quantity: item.quantity - 1 };
                                  removeFromCart(item.id);
                                  addToCart(newItem);
                                }
                              }}
                              className="p-1 rounded-lg bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                            >
                              <svg className="w-4 h-4 text-slate-700 dark:text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                              </svg>
                            </button>
                            <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
                              {item.quantity || 1}
                            </span>
                            <button
                              onClick={() => {
                                const newItem = { ...item, quantity: (item.quantity || 1) + 1 };
                                removeFromCart(item.id);
                                addToCart(newItem);
                              }}
                              className="p-1 rounded-lg bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                            >
                              <svg className="w-4 h-4 text-slate-700 dark:text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                              </svg>
                            </button>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="ml-4 p-2 rounded-xl opacity-0 group-hover:opacity-100 hover:bg-red-500/10 transition-all"
                        >
                          <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </motion.div>
                    ))
                  )}
                </div>

                {cart.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-6 pt-6 border-t border-slate-200/50 dark:border-slate-700/50"
                  >
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                          Total
                        </span>
                        <span className="text-lg font-bold text-slate-900 dark:text-slate-100">
                          ${calculateTotal().toLocaleString()}
                        </span>
                      </div>
                      
                      <div className="flex flex-col gap-3">
                        <a
                          href="/checkout"
                          className="w-full group relative inline-flex items-center justify-center px-6 py-3 text-white font-medium rounded-xl overflow-hidden transition-all duration-300"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 transition-all duration-300 group-hover:scale-[1.02] shadow-lg shadow-slate-500/25 dark:shadow-slate-400/25"></div>
                          <span className="relative flex items-center">
                            Proceder al Pago
                            <svg 
                              className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" 
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </span>
                        </a>

                        <a
                          href={`https://wa.me/+1234567890?text=Hola, me interesa comprar los siguientes productos:%0A${cart.map(item => `- ${item.modelo}: $${item.precio}`).join('%0A')}%0A%0ATotal: $${calculateTotal()}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full group relative inline-flex items-center justify-center px-6 py-3 text-white font-medium rounded-xl overflow-hidden transition-all duration-300"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-green-600 via-green-500 to-green-600 transition-all duration-300 group-hover:scale-[1.02] shadow-lg shadow-green-500/25 dark:shadow-green-400/25"></div>
                          <span className="relative flex items-center">
                            Consultar por WhatsApp
                            <svg 
                              className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" 
                              fill="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                            </svg>
                          </span>
                        </a>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 