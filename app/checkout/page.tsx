'use client';

import { useCart } from '@/contexts/CartContext';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function CheckoutPage() {
  const { cart } = useCart();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular un pequeño retraso para asegurar que el carrito se ha cargado
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.precio, 0);
  };

  const paymentMethods = [
    {
      id: 'azul',
      name: 'Azul',
      description: 'Próximamente - Pago con tarjeta a través de Azul',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
      status: 'coming_soon'
    },
    {
      id: 'cardnet',
      name: 'CardNet',
      description: 'Próximamente - Pago seguro con CardNet',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      status: 'coming_soon'
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      description: 'Coordinar el pago directamente por WhatsApp',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      ),
      status: 'available',
      href: `https://wa.me/+1234567890?text=Hola, me interesa comprar los siguientes productos:%0A${cart.map(item => `- ${item.modelo}: $${item.precio}`).join('%0A')}%0A%0ATotal: $${calculateTotal()}`
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
          <p className="text-slate-600 dark:text-slate-400">Cargando...</p>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
            Tu carrito está vacío
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Agrega algunos productos antes de proceder al pago
          </p>
          <Link
            href="/products"
            className="inline-block px-6 py-3 text-white font-medium rounded-xl bg-blue-600 hover:bg-blue-500 transition-colors"
          >
            Ver Productos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-5rem)] py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-slate-800 dark:text-slate-200 mb-4">
              Finalizar Compra
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Selecciona tu método de pago preferido
            </p>
          </div>

          {/* Order Summary */}
          <div className="mb-8 p-6 rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50">
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              Resumen del Pedido
            </h2>
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-slate-900 dark:text-slate-100">
                      {item.modelo}
                    </h3>
                    <p className="text-sm text-slate-800 dark:text-slate-200">
                      {item.descripcion}
                    </p>
                  </div>
                  <span className="font-medium text-slate-900 dark:text-slate-100">
                    ${item.precio.toLocaleString()}
                  </span>
                </div>
              ))}
              <div className="pt-4 border-t border-slate-200/50 dark:border-slate-700/50">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-900 dark:text-slate-100">
                    Total
                  </span>
                  <span className="text-xl font-bold text-slate-900 dark:text-slate-100">
                    ${calculateTotal().toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="grid gap-4">
            {paymentMethods.map((method) => (
              <motion.div
                key={method.id}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="relative"
              >
                {method.status === 'coming_soon' ? (
                  <div className="p-6 rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 opacity-50 cursor-not-allowed">
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                        Próximamente
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-400">
                        {method.icon}
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100">
                          {method.name}
                        </h3>
                        <p className="text-slate-800 dark:text-slate-200">
                          {method.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <a
                    href={method.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-6 rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 hover:border-green-500/50 dark:hover:border-green-400/50 transition-colors"
                  >
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-xl bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                        {method.icon}
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100">
                          {method.name}
                        </h3>
                        <p className="text-slate-800 dark:text-slate-200">
                          {method.description}
                        </p>
                      </div>
                      <div className="ml-auto">
                        <svg 
                          className="w-6 h-6 text-green-600 dark:text-green-400" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                    </div>
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 