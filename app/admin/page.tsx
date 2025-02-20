'use client';

import { useState, useEffect } from 'react';

export default function AdminPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [category, setCategory] = useState('');
  const [modelo, setModelo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState('');

  useEffect(() => {
    const pass = prompt('Ingrese la contraseña:');
    if (pass !== 'admin123') {
      alert('Contraseña incorrecta');
      window.location.href = '/';
    } else {
      fetch('/api/products').then((res) => res.json()).then((data) => setProducts(data));
    }
  }, []);

  const addProduct = async () => {
    const res = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ category, modelo, descripcion, imagen }),
    });
    if (res.ok) {
      const newProduct = await res.json();
      setProducts([...products, { id: Date.now(), category, modelo, descripcion, imagen }]);
      setCategory(''); setModelo(''); setDescripcion(''); setImagen('');
    }
  };

  const updateProduct = async (id: number, newData: { descripcion?: string; imagen?: string }) => {
    const res = await fetch(`/api/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newData),
    });
    if (res.ok) setProducts(products.map((p) => (p.id === id ? { ...p, ...newData } : p)));
  };

  const deleteProduct = async (id: number) => {
    if (confirm('¿Eliminar este producto?')) {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      if (res.ok) setProducts(products.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Administración - Superior Deluxe</h1>
        <button 
          onClick={() => {
            if (confirm('¿Desea cerrar sesión?')) {
              window.location.href = '/';
            }
          }}
          className="px-6 py-2 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-medium transition-all duration-300 shadow-md hover:shadow-lg border-2 border-slate-800 hover:border-slate-700"
        >
          Cerrar Sesión
        </button>
      </div>
      <div className="mb-8 space-y-4 md:space-y-0 md:flex md:gap-4">
        <select 
          className="w-full md:w-auto px-4 py-2 rounded-full bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-all duration-300" 
          value={category} 
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Seleccionar Categoría</option>
          {['Neveras', 'Congeladores', 'Exhibidores', 'Heladeros', 'Estufas', 'Lavadoras'].map((cat) => (
            <option key={cat} value={cat} className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">{cat}</option>
          ))}
        </select>
        <input 
          className="w-full md:w-auto px-4 py-2 rounded-full bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-all duration-300" 
          placeholder="Modelo" 
          value={modelo} 
          onChange={(e) => setModelo(e.target.value)} 
        />
        <input 
          className="w-full md:w-auto px-4 py-2 rounded-full bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-all duration-300" 
          placeholder="Descripción" 
          value={descripcion} 
          onChange={(e) => setDescripcion(e.target.value)} 
        />
        <input 
          className="w-full md:w-auto px-4 py-2 rounded-full bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-all duration-300" 
          placeholder="URL de la imagen" 
          value={imagen} 
          onChange={(e) => setImagen(e.target.value)} 
        />
        <button 
          className="w-full md:w-auto bg-white hover:bg-slate-50 text-slate-900 px-6 py-2 rounded-full transition-all duration-300 shadow-md hover:shadow-lg border-2 border-slate-800 hover:border-slate-700 font-bold" 
          onClick={addProduct}
        >
          Agregar Producto
        </button>
      </div>
      <div className="overflow-x-auto rounded-2xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 shadow-sm">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/50">
              <th className="border-b border-slate-300 dark:border-slate-600 p-4 text-left text-slate-900 dark:text-white font-semibold">Categoría</th>
              <th className="border-b border-slate-300 dark:border-slate-600 p-4 text-left text-slate-900 dark:text-white font-semibold">Modelo</th>
              <th className="border-b border-slate-300 dark:border-slate-600 p-4 text-left text-slate-900 dark:text-white font-semibold">Descripción</th>
              <th className="border-b border-slate-300 dark:border-slate-600 p-4 text-left text-slate-900 dark:text-white font-semibold">Imagen</th>
              <th className="border-b border-slate-300 dark:border-slate-600 p-4 text-left text-slate-900 dark:text-white font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                <td className="p-4 text-slate-900 dark:text-white">{product.category}</td>
                <td className="p-4 text-slate-900 dark:text-white">{product.modelo}</td>
                <td className="p-4">
                  <input 
                    className="w-full px-3 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-all duration-300" 
                    value={product.descripcion} 
                    onChange={(e) => updateProduct(product.id, { descripcion: e.target.value })} 
                  />
                </td>
                <td className="p-4">
                  <input 
                    className="w-full px-3 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-all duration-300" 
                    value={product.imagen} 
                    onChange={(e) => updateProduct(product.id, { imagen: e.target.value })} 
                    placeholder="URL de la imagen"
                  />
                </td>
                <td className="p-4 flex gap-2">
                  <button 
                    className="w-full md:w-auto bg-white hover:bg-slate-50 text-slate-900 px-6 py-2 rounded-full transition-all duration-300 shadow-md hover:shadow-lg border-2 border-slate-800 hover:border-slate-700 font-bold"
                    onClick={() => {
                      const newDesc = prompt('Nueva descripción:', product.descripcion);
                      if (newDesc) updateProduct(product.id, { descripcion: newDesc });
                    }}
                  >
                    Editar
                  </button>
                  <button 
                    className="w-full md:w-auto bg-red-600 hover:bg-red-500 text-slate-900 dark:text-white px-6 py-2 rounded-full transition-all duration-300 shadow-md hover:shadow-lg border-2 border-red-500 hover:border-red-400 font-bold"
                    onClick={() => deleteProduct(product.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
