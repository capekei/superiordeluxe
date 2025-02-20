import Link from 'next/link';
import Image from 'next/image';

const products = [
  {
    id: 1,
    category: 'Refrigeración',
    name: 'Nevera Inteligente Pro',
    description: 'Sistema de enfriamiento dual con IA',
    image: '/images/fridge.jpg',
    link: '/productos/nevera-inteligente-pro'
  },
  {
    id: 2,
    category: 'Lavado',
    name: 'Lavadora EcoSmart',
    description: 'Tecnología de lavado eficiente',
    image: '/images/washer.jpg',
    link: '/productos/lavadora-ecosmart'
  },
  {
    id: 3,
    category: 'Cocina',
    name: 'Estufa Digital Plus',
    description: 'Control táctil y cocción precisa',
    image: '/images/stove.jpg',
    link: '/productos/estufa-digital-plus'
  }
];

export default function FeaturedProducts() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 space-y-6">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-slate-400/20 via-zinc-300/20 to-slate-400/20 border border-slate-300/30 dark:border-slate-600/30">
              <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
                Descubre Nuestra Colección 2025
              </span>
            </div>

            <div className="relative">
              <h2 className="text-6xl sm:text-7xl font-black tracking-tight">
                <span className="relative inline-block">
                  <span className="relative z-10 text-slate-800 dark:text-slate-200">
                    Productos
                  </span>
                  <div className="absolute -inset-2 bg-gradient-to-r from-slate-400 via-zinc-300 to-slate-400 opacity-20 blur-xl dark:opacity-30"></div>
                </span>
                <br />
                <span className="relative inline-block mt-2">
                  <span className="relative z-10 text-blue-600 dark:text-blue-400">
                    Destacados
                  </span>
                  <div className="absolute -inset-2 bg-gradient-to-r from-blue-400 via-sky-300 to-blue-400 opacity-20 blur-xl dark:opacity-30"></div>
                </span>
              </h2>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product.id}>
                <Link href={product.link} className="group block">
                  <div className="relative rounded-3xl overflow-hidden border border-slate-300/30 dark:border-slate-600/30 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10">
                    {/* Card Top - Image */}
                    <div className="relative h-64 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-slate-400/20 via-zinc-300/20 to-slate-400/20 group-hover:opacity-50 transition-opacity duration-300"></div>
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={400}
                        height={300}
                        className="object-cover w-full h-full transform transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    {/* Card Content */}
                    <div className="relative p-8">
                      {/* Category Badge */}
                      <div className="absolute -top-4 left-8">
                        <span className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-slate-400/20 via-zinc-300/20 to-slate-400/20 border border-slate-300/30 dark:border-slate-600/30">
                          <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
                            {product.category}
                          </span>
                        </span>
                      </div>

                      {/* Product Info */}
                      <div className="pt-4">
                        <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">
                          {product.name}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-300 font-light mb-6">
                          {product.description}
                        </p>

                        {/* View Details Link */}
                        <div className="inline-flex items-center">
                          <span className="relative flex items-center font-medium text-blue-600 dark:text-blue-400 group-hover:opacity-80 transition-opacity">
                            Ver detalles
                            <svg 
                              className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" 
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 