'use client';

import { useState, useEffect } from 'react';
import ProductCard from '@/components/ProductCard';
import { store } from '@/lib/store';

// Datos de ejemplo para productos
const dummyProducts = [
  {
    id: 1,
    category: 'Neveras',
    modelo: 'Nevera Inteligente Pro',
    descripcion: 'Sistema de enfriamiento dual con IA',
    precio: 12999.99
  },
  {
    id: 2,
    category: 'Lavadoras',
    modelo: 'Lavadora EcoSmart',
    descripcion: 'Tecnología de lavado eficiente',
    precio: 8999.99
  },
  {
    id: 3,
    category: 'Estufas',
    modelo: 'Estufa Digital Plus',
    descripcion: 'Control táctil y cocción precisa',
    precio: 6999.99
  },
  {
    id: 4,
    category: 'Congeladores',
    modelo: 'Congelador MaxFrost',
    descripcion: 'Capacidad extra grande con control de temperatura',
    precio: 9999.99
  },
  {
    id: 5,
    category: 'Exhibidores',
    modelo: 'Exhibidor Comercial Pro',
    descripcion: 'Ideal para negocios, con iluminación LED',
    precio: 15999.99
  },
  {
    id: 6,
    category: 'Heladeros',
    modelo: 'Heladero Compact',
    descripcion: 'Perfecto para heladerías pequeñas',
    precio: 7999.99
  }
];

export default function ProductsPage() {
  const [products, setProducts] = useState(dummyProducts);
  const [category, setCategory] = useState<string>('');

  const filteredProducts = category 
    ? products.filter((p) => p.category === category) 
    : products;

  const categories = ['Neveras', 'Congeladores', 'Exhibidores', 'Heladeros', 'Estufas', 'Lavadoras'];

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
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  modelo={product.modelo}
                  descripcion={product.descripcion}
                  precio={product.precio}
                  whatsappLink={`https://wa.me/${store.whatsapp}?text=Quiero comprar ${product.modelo}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
