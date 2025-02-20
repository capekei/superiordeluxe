'use client';

import { useState, useEffect } from 'react';
import ProductCard from '@/components/ProductCard';
import { store } from '@/lib/store';
import { useInventory } from '@/contexts/InventoryContext';

export default function ProductsPage() {
  const { inventory } = useInventory();
  const [category, setCategory] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('Inventory:', inventory);
    setIsLoading(false);
  }, [inventory]);

  const filteredProducts = category 
    ? inventory.filter((p) => p.category === category) 
    : inventory;

  console.log('Filtered Products:', filteredProducts);

  const categories = ['Neveras', 'Congeladores', 'Exhibidores', 'Heladeros', 'Estufas', 'Lavadoras'];

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
          <p className="text-slate-600 dark:text-slate-400">Cargando productos...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 space-y-6">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-slate-400/20 via-zinc-300/20 to-slate-400/20 border border-slate-300/30 dark:border-slate-600/30">
              <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
                Catálogo Completo 2025
              </span>
            </div>

            <div className="relative">
              <h1 className="text-6xl sm:text-7xl font-black tracking-tight">
                <span className="relative inline-block">
                  <span className="relative z-10 text-slate-800 dark:text-slate-200">
                    Productos
                  </span>
                  <div className="absolute -inset-2 bg-gradient-to-r from-slate-400 via-zinc-300 to-slate-400 opacity-20 blur-xl dark:opacity-30"></div>
                </span>
                <br />
                <span className="relative inline-block mt-2">
                  <span className="relative z-10 text-blue-600 dark:text-blue-400">
                    Superior Deluxe
                  </span>
                  <div className="absolute -inset-2 bg-gradient-to-r from-blue-400 via-sky-300 to-blue-400 opacity-20 blur-xl dark:opacity-30"></div>
                </span>
              </h1>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <aside className="md:w-1/4">
              <div className="sticky top-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-400/20 via-zinc-300/20 to-slate-400/20 rounded-2xl blur-xl opacity-50"></div>
                  <select 
                    className="relative w-full p-4 bg-white/80 dark:bg-black/80 backdrop-blur-sm rounded-2xl border border-slate-300/30 dark:border-slate-600/30 text-slate-900 dark:text-slate-100 appearance-none cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">Todas las categorías</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat} className="bg-white dark:bg-gray-900">
                        {cat}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </aside>

            {/* Products Grid */}
            <div className="md:w-3/4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts && filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    modelo={product.modelo}
                    descripcion={product.descripcion}
                    precio={product.precio}
                    stock={product.stock}
                    whatsappLink={`https://wa.me/${store.whatsapp}?text=Quiero comprar ${product.modelo}`}
                  />
                ))
              ) : (
                <div className="col-span-3 text-center py-12">
                  <p className="text-slate-600 dark:text-slate-400">
                    No hay productos disponibles en esta categoría
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
