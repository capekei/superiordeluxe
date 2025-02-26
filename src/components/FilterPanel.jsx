import React, { useState, useEffect } from 'react';
import { CATEGORIES } from '../consts';

const FilterPanel = ({ categories = CATEGORIES, activeFilters = {} }) => {
  const [filters, setFilters] = useState({
    categoria: activeFilters.categoria || 'todos',
    precioMin: activeFilters.precioMin || '',
    precioMax: activeFilters.precioMax || '',
    busqueda: activeFilters.busqueda || ''
  });

  // Actualizar los filtros cuando cambien las props
  useEffect(() => {
    setFilters({
      categoria: activeFilters.categoria || 'todos',
      precioMin: activeFilters.precioMin || '',
      precioMax: activeFilters.precioMax || '',
      busqueda: activeFilters.busqueda || ''
    });
  }, [activeFilters]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newFilters = {
      ...filters,
      [name]: value
    };
    setFilters(newFilters);
  };

  const handleApplyFilters = () => {
    // Llamar a la función global applyFilters
    if (typeof window !== 'undefined' && window.applyFilters) {
      window.applyFilters(filters);
    } else {
      console.error('La función applyFilters no está disponible en el objeto window');
    }
  };

  const handleReset = () => {
    const resetFilters = {
      categoria: 'todos',
      precioMin: '',
      precioMax: '',
      busqueda: ''
    };
    setFilters(resetFilters);
    
    // Aplicar los filtros reseteados
    if (typeof window !== 'undefined' && window.applyFilters) {
      window.applyFilters(resetFilters);
    } else {
      console.error('La función applyFilters no está disponible en el objeto window');
    }
  };

  // Verificar que categories sea un array
  const categoryOptions = Array.isArray(categories) ? categories : [];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium text-gray-800">Filtros</h2>
        <button 
          onClick={handleReset}
          className="text-sm text-red-600 hover:text-red-800 transition-colors"
        >
          Limpiar filtros
        </button>
      </div>
      
      <div className="space-y-4">
        {/* Búsqueda */}
        <div>
          <label htmlFor="busqueda" className="block text-sm font-medium text-gray-700 mb-1">
            Buscar productos
          </label>
          <input
            type="text"
            id="busqueda"
            name="busqueda"
            value={filters.busqueda}
            onChange={handleInputChange}
            placeholder="Nombre del producto..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
          />
        </div>
        
        {/* Categoría */}
        <div>
          <label htmlFor="categoria" className="block text-sm font-medium text-gray-700 mb-1">
            Categoría
          </label>
          <select
            id="categoria"
            name="categoria"
            value={filters.categoria}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
          >
            <option value="todos">Todas las categorías</option>
            {categoryOptions.map((category) => (
              <option key={category} value={category.toLowerCase()}>
                {category}
              </option>
            ))}
          </select>
        </div>
        
        {/* Rango de precios */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Rango de precios
          </label>
          <div className="flex space-x-2">
            <div className="flex-1">
              <input
                type="number"
                id="precioMin"
                name="precioMin"
                value={filters.precioMin}
                onChange={handleInputChange}
                placeholder="Mínimo"
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
              />
            </div>
            <div className="flex-1">
              <input
                type="number"
                id="precioMax"
                name="precioMax"
                value={filters.precioMax}
                onChange={handleInputChange}
                placeholder="Máximo"
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
              />
            </div>
          </div>
        </div>
        
        {/* Botón para aplicar filtros */}
        <button
          onClick={handleApplyFilters}
          className="w-full px-4 py-2 bg-red-600 text-white text-sm font-medium rounded hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          Aplicar filtros
        </button>
      </div>
    </div>
  );
};

export default FilterPanel; 