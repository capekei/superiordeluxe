'use client';

import { useState } from 'react';
import { store } from '@/lib/store';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 space-y-6">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-slate-400/20 via-zinc-300/20 to-slate-400/20 border border-slate-300/30 dark:border-slate-600/30">
              <span className="text-sm font-medium bg-gradient-to-r from-slate-600 via-zinc-500 to-slate-600 bg-clip-text text-transparent">
                Estamos para Ayudarte
              </span>
            </div>

            <div className="relative">
              <h1 className="text-6xl sm:text-7xl font-black tracking-tight">
                <span className="relative inline-block">
                  <span className="relative z-10 bg-gradient-to-r from-slate-700 via-zinc-600 to-slate-700 dark:from-slate-200 dark:via-zinc-300 dark:to-slate-200 bg-clip-text text-transparent">
                    Contacta con
                  </span>
                  <div className="absolute -inset-2 bg-gradient-to-r from-slate-400 via-zinc-300 to-slate-400 opacity-20 blur-xl dark:opacity-30"></div>
                </span>
                <br />
                <span className="relative inline-block mt-2">
                  <span className="relative z-10 bg-gradient-to-r from-blue-600 via-sky-500 to-blue-600 bg-clip-text text-transparent">
                    Superior Deluxe
                  </span>
                  <div className="absolute -inset-2 bg-gradient-to-r from-blue-400 via-sky-300 to-blue-400 opacity-20 blur-xl dark:opacity-30"></div>
                </span>
              </h1>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-start">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="relative">
                <div className="space-y-6">
                  {/* Location */}
                  <div className="group relative">
                    <div className="absolute -inset-2 bg-gradient-to-r from-slate-400/20 via-zinc-300/20 to-slate-400/20 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity"></div>
                    <div className="relative p-6 rounded-2xl border border-slate-300/30 dark:border-slate-600/30 bg-white/50 dark:bg-black/50 backdrop-blur-sm">
                      <h3 className="text-xl font-bold bg-gradient-to-r from-slate-700 via-zinc-600 to-slate-700 dark:from-slate-200 dark:via-zinc-300 dark:to-slate-200 bg-clip-text text-transparent mb-2">
                        Ubicación
                      </h3>
                      <p className="text-slate-600 dark:text-slate-300 font-light">
                        {store.address}
                      </p>
                    </div>
                  </div>

                  {/* WhatsApp */}
                  <div className="group relative">
                    <div className="absolute -inset-2 bg-gradient-to-r from-slate-400/20 via-zinc-300/20 to-slate-400/20 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity"></div>
                    <div className="relative p-6 rounded-2xl border border-slate-300/30 dark:border-slate-600/30 bg-white/50 dark:bg-black/50 backdrop-blur-sm">
                      <h3 className="text-xl font-bold bg-gradient-to-r from-slate-700 via-zinc-600 to-slate-700 dark:from-slate-200 dark:via-zinc-300 dark:to-slate-200 bg-clip-text text-transparent mb-2">
                        WhatsApp
                      </h3>
                      <a 
                        href={`https://wa.me/${store.whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-600 dark:text-slate-300 font-light hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                      >
                        +{store.whatsapp}
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="group relative">
                    <div className="absolute -inset-2 bg-gradient-to-r from-slate-400/20 via-zinc-300/20 to-slate-400/20 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity"></div>
                    <div className="relative p-6 rounded-2xl border border-slate-300/30 dark:border-slate-600/30 bg-white/50 dark:bg-black/50 backdrop-blur-sm">
                      <h3 className="text-xl font-bold bg-gradient-to-r from-slate-700 via-zinc-600 to-slate-700 dark:from-slate-200 dark:via-zinc-300 dark:to-slate-200 bg-clip-text text-transparent mb-2">
                        Email
                      </h3>
                      <a 
                        href={`mailto:${store.email}`}
                        className="text-slate-600 dark:text-slate-300 font-light hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                      >
                        {store.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-slate-400/20 via-zinc-300/20 to-slate-400/20 rounded-3xl blur-xl opacity-50"></div>
              <form onSubmit={handleSubmit} className="relative space-y-6 p-8 rounded-3xl border border-slate-300/30 dark:border-slate-600/30 bg-white/50 dark:bg-black/50 backdrop-blur-sm">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium bg-gradient-to-r from-slate-700 via-zinc-600 to-slate-700 dark:from-slate-200 dark:via-zinc-300 dark:to-slate-200 bg-clip-text text-transparent mb-2">
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-black/50 border border-slate-300/30 dark:border-slate-600/30 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    placeholder="Tu nombre"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium bg-gradient-to-r from-slate-700 via-zinc-600 to-slate-700 dark:from-slate-200 dark:via-zinc-300 dark:to-slate-200 bg-clip-text text-transparent mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-black/50 border border-slate-300/30 dark:border-slate-600/30 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    placeholder="tu@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium bg-gradient-to-r from-slate-700 via-zinc-600 to-slate-700 dark:from-slate-200 dark:via-zinc-300 dark:to-slate-200 bg-clip-text text-transparent mb-2">
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-black/50 border border-slate-300/30 dark:border-slate-600/30 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    placeholder="¿En qué podemos ayudarte?"
                  />
                </div>

                <button
                  type="submit"
                  className="group relative w-full inline-flex items-center justify-center px-6 py-3 text-white font-medium rounded-xl overflow-hidden transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-sky-500 to-blue-600 transition-all duration-300 group-hover:scale-[1.02]"></div>
                  <span className="relative flex items-center">
                    Enviar Mensaje
                    <svg 
                      className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
