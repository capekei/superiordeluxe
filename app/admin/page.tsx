'use client';

import { useState, useEffect } from 'react';
import { useInventory } from '@/contexts/InventoryContext';

export default function AdminPage() {
  const { inventory, updateStock, addProduct, deleteProduct: removeProduct, editProduct } = useInventory();
  const [category, setCategory] = useState('');
  const [modelo, setModelo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [editingProduct, setEditingProduct] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const pass = prompt('Ingrese la contraseña:');
    if (pass !== 'admin123') {
      alert('Contraseña incorrecta');
      window.location.href = '/';
    }
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Por ahora usamos URL.createObjectURL, pero en producción deberías usar un servicio de almacenamiento
      const url = URL.createObjectURL(file);
      setImageUrl(url);
    }
  };

  const handleEdit = (product: typeof inventory[0]) => {
    setEditingProduct(product.id);
    setCategory(product.category);
    setModelo(product.modelo);
    setDescripcion(product.descripcion);
    setPrecio(product.precio.toString());
    setStock(product.stock.toString());
    setImageUrl(product.imageUrl || '');
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    if (!editingProduct) return;

    const precioNum = parseFloat(precio);
    const stockNum = parseInt(stock);

    if (isNaN(precioNum) || precioNum <= 0) {
      alert('Por favor ingrese un precio válido');
      return;
    }

    if (isNaN(stockNum) || stockNum < 0) {
      alert('Por favor ingrese una cantidad válida de stock');
      return;
    }

    editProduct(editingProduct, {
      category,
      modelo,
      descripcion,
      precio: precioNum,
      stock: stockNum,
      imageUrl
    });

    // Limpiar el formulario
    setEditingProduct(null);
    setCategory('');
    setModelo('');
    setDescripcion('');
    setPrecio('');
    setStock('');
    setImageUrl('');
    setIsEditing(false);
  };

  const handleAddProduct = () => {
    if (!category || !modelo || !descripcion || !precio || !stock) {
      alert('Por favor complete todos los campos');
      return;
    }

    const precioNum = parseFloat(precio);
    const stockNum = parseInt(stock);

    if (isNaN(precioNum) || precioNum <= 0) {
      alert('Por favor ingrese un precio válido');
      return;
    }

    if (isNaN(stockNum) || stockNum < 0) {
      alert('Por favor ingrese una cantidad válida de stock');
      return;
    }

    const newProduct = {
      category,
      modelo,
      descripcion,
      precio: precioNum,
      stock: stockNum,
      imageUrl
    };

    addProduct(newProduct);

    // Limpiar el formulario
    setCategory('');
    setModelo('');
    setDescripcion('');
    setPrecio('');
    setStock('');
    setImageUrl('');
  };

  const handleDeleteProduct = (id: number) => {
    if (confirm('¿Está seguro de eliminar este producto?')) {
      removeProduct(id);
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

      {/* Formulario de Agregar/Editar Producto */}
      <div className="mb-8 space-y-4 max-w-4xl mx-auto bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
          {isEditing ? 'Editar Producto' : 'Agregar Nuevo Producto'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select 
            className="w-full px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-all duration-300" 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Seleccionar Categoría</option>
            {['Neveras', 'Congeladores', 'Exhibidores', 'Heladeros', 'Estufas', 'Lavadoras'].map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <input 
            className="w-full px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-all duration-300" 
            placeholder="Modelo" 
            value={modelo} 
            onChange={(e) => setModelo(e.target.value)} 
          />

          <input 
            className="w-full px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-all duration-300" 
            placeholder="Descripción" 
            value={descripcion} 
            onChange={(e) => setDescripcion(e.target.value)} 
          />

          <input 
            type="number"
            min="0"
            step="0.01"
            className="w-full px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-all duration-300" 
            placeholder="Precio" 
            value={precio} 
            onChange={(e) => setPrecio(e.target.value)} 
          />

          <input 
            type="number"
            min="0"
            className="w-full px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-all duration-300" 
            placeholder="Stock Inicial" 
            value={stock} 
            onChange={(e) => setStock(e.target.value)} 
          />

          {/* Campo de imagen */}
          <div className="col-span-full">
            <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
              Imagen del Producto
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-all duration-300"
            />
            {imageUrl && (
              <div className="mt-2">
                <img
                  src={imageUrl}
                  alt="Vista previa"
                  className="w-32 h-32 object-cover rounded-lg"
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-4">
          <button 
            className="w-full md:w-auto mt-4 bg-blue-600 hover:bg-blue-500 text-slate-900 px-6 py-2 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg font-bold" 
            onClick={isEditing ? handleSaveEdit : handleAddProduct}
          >
            {isEditing ? 'Guardar Cambios' : 'Agregar Producto'}
          </button>
          {isEditing && (
            <button 
              className="w-full md:w-auto mt-4 bg-slate-600 hover:bg-slate-500 text-white px-6 py-2 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg font-bold"
              onClick={() => {
                setEditingProduct(null);
                setCategory('');
                setModelo('');
                setDescripcion('');
                setPrecio('');
                setStock('');
                setImageUrl('');
                setIsEditing(false);
              }}
            >
              Cancelar
            </button>
          )}
        </div>
      </div>

      {/* Lista de Productos */}
      <div className="overflow-x-auto rounded-2xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 shadow-sm">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/50">
              <th className="border-b border-slate-300 dark:border-slate-600 p-4 text-left text-slate-900 dark:text-white font-semibold">Imagen</th>
              <th className="border-b border-slate-300 dark:border-slate-600 p-4 text-left text-slate-900 dark:text-white font-semibold">Categoría</th>
              <th className="border-b border-slate-300 dark:border-slate-600 p-4 text-left text-slate-900 dark:text-white font-semibold">Modelo</th>
              <th className="border-b border-slate-300 dark:border-slate-600 p-4 text-left text-slate-900 dark:text-white font-semibold">Descripción</th>
              <th className="border-b border-slate-300 dark:border-slate-600 p-4 text-left text-slate-900 dark:text-white font-semibold">Precio</th>
              <th className="border-b border-slate-300 dark:border-slate-600 p-4 text-left text-slate-900 dark:text-white font-semibold">Stock</th>
              <th className="border-b border-slate-300 dark:border-slate-600 p-4 text-left text-slate-900 dark:text-white font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((product) => (
              <tr key={product.id} className="border-b border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                <td className="p-4">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.modelo}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-slate-200 dark:bg-slate-700 rounded-lg flex items-center justify-center">
                      <span className="text-slate-400 dark:text-slate-500">Sin imagen</span>
                    </div>
                  )}
                </td>
                <td className="p-4 text-slate-900 dark:text-white">{product.category}</td>
                <td className="p-4 text-slate-900 dark:text-white">{product.modelo}</td>
                <td className="p-4 text-slate-900 dark:text-white">{product.descripcion}</td>
                <td className="p-4 text-slate-900 dark:text-white">
                  ${typeof product.precio === 'number' ? product.precio.toLocaleString() : '0'}
                </td>
                <td className="p-4 text-slate-900 dark:text-white">
                  {typeof product.stock === 'number' ? product.stock : '0'}
                </td>
                <td className="p-4 flex gap-2">
                  <button 
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-slate-900 transition-all duration-300 shadow-md hover:shadow-lg"
                    onClick={() => handleEdit(product)}
                  >
                    Editar
                  </button>
                  <button 
                    className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-slate-900 transition-all duration-300 shadow-md hover:shadow-lg"
                    onClick={() => handleDeleteProduct(product.id)}
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
