import Link from 'next/link';

export default function Hero() {
  return (
    <section className="min-h-[calc(100vh-5rem)]">
      <div className="container mx-auto px-4 h-[calc(100vh-5rem)] flex items-center">
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Text */}
            <div className="space-y-8">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-slate-400/20 via-zinc-300/20 to-slate-400/20 border border-slate-300/30 dark:border-slate-600/30">
                <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
                  Electrodomésticos Premium 2025
                </span>
              </div>

              <div className="relative">
                <h1 className="text-7xl sm:text-8xl lg:text-9xl font-black tracking-tight">
                  <span className="relative inline-block">
                    <span className="relative z-10 text-slate-800 dark:text-slate-200">
                      Superior
                    </span>
                    <div className="absolute -inset-2 bg-gradient-to-r from-slate-400 via-zinc-300 to-slate-400 opacity-20 blur-xl dark:opacity-30"></div>
                  </span>
                  <br />
                  <span className="relative inline-block mt-2">
                    <span className="relative z-10 text-blue-600 dark:text-blue-400">
                      Deluxe
                    </span>
                    <div className="absolute -inset-2 bg-gradient-to-r from-blue-400 via-sky-300 to-blue-400 opacity-20 blur-xl dark:opacity-30"></div>
                  </span>
                </h1>
              </div>

              <p className="text-xl text-slate-600 dark:text-slate-300 max-w-xl font-light">
                Descubre nuestra colección de electrodomésticos de alta calidad. 
                Diseño innovador y tecnología avanzada para tu hogar.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                {/* Primary Button */}
                <Link 
                  href="/products"
                  className="group relative inline-flex items-center px-6 py-3 font-medium rounded-full overflow-hidden transition-all duration-300 bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 hover:border-blue-500 dark:hover:border-blue-400 shadow-sm hover:shadow-lg hover:shadow-blue-500/10 dark:hover:shadow-blue-400/10"
                >
                  <span className="relative flex items-center text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    Explorar Productos
                    <svg className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </Link>

                {/* Secondary Button */}
                <Link 
                  href="/contacto"
                  className="group relative inline-flex items-center px-6 py-3 font-medium rounded-full overflow-hidden transition-all duration-300 bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 hover:border-blue-500 dark:hover:border-blue-400 shadow-sm hover:shadow-lg hover:shadow-blue-500/10 dark:hover:shadow-blue-400/10"
                >
                  <span className="relative flex items-center text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    Contactar
                    <svg className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </Link>
              </div>
            </div>

            {/* Right Column - Product Preview */}
            <div className="relative aspect-square">
              <div className="absolute inset-0 rounded-3xl overflow-hidden border border-slate-300/30 dark:border-slate-600/30 backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-400/20 via-zinc-300/20 to-slate-400/20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-full bg-[url('/images/product-preview.png')] bg-contain bg-center bg-no-repeat" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 