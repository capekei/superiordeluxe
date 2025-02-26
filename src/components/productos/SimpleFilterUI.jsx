import React, { useState, useEffect } from 'react';

/**
 * Componente simplificado de UI para los filtros de productos
 * 
 * @param {Object} props - Propiedades del componente
 * @param {Array} props.categories - Lista de categorías disponibles
 */
const SimpleFilterUI = ({ categories = [] }) => {
  // Estado local para los filtros
  const [filters, setFilters] = useState({
    category: null,
    minPrice: null,
    maxPrice: null
  });
  // Estado para controlar la visibilidad en móvil
  const [isOpen, setIsOpen] = useState(false);
  
  // Inicializar filtros cuando se carga el componente
  useEffect(() => {
    if (typeof window !== 'undefined' && window.filterEngine) {
      setFilters(window.filterEngine.getFilters());
      
      // Función para resetear la UI desde el script global
      window.resetFilterUI = () => {
        if (window.filterEngine) {
          setFilters(window.filterEngine.getFilters());
        }
      };
    }
    
    return () => {
      if (typeof window !== 'undefined') {
        delete window.resetFilterUI;
      }
    };
  }, []);
  
  // Aplicar filtros globalmente
  const applyFilters = () => {
    if (typeof window !== 'undefined' && typeof window.applyFilters === 'function') {
      window.applyFilters();
    }
  };
  
  // Manejador para cambios en categoría
  const handleCategoryChange = (category) => {
    const newFilters = { ...filters, category };
    setFilters(newFilters);
    
    if (typeof window !== 'undefined' && window.filterEngine) {
      window.filterEngine.setFilters(newFilters);
      applyFilters();
    }
  };
  
  // Manejador para cambios en precio mínimo
  const handleMinPriceChange = (e) => {
    const value = e.target.value !== '' ? parseInt(e.target.value, 10) : null;
    const newFilters = { ...filters, minPrice: value };
    setFilters(newFilters);
    
    if (typeof window !== 'undefined' && window.filterEngine) {
      window.filterEngine.setFilters(newFilters);
      applyFilters();
    }
  };
  
  // Manejador para cambios en precio máximo
  const handleMaxPriceChange = (e) => {
    const value = e.target.value !== '' ? parseInt(e.target.value, 10) : null;
    const newFilters = { ...filters, maxPrice: value };
    setFilters(newFilters);
    
    if (typeof window !== 'undefined' && window.filterEngine) {
      window.filterEngine.setFilters(newFilters);
      applyFilters();
    }
  };
  
  // Manejador para resetear filtros
  const handleResetFilters = () => {
    if (typeof window !== 'undefined' && window.filterEngine) {
      window.filterEngine.resetFilters();
      setFilters(window.filterEngine.getFilters());
      applyFilters();
    }
  };
  
  return (
    <div>
      {/* Botón para mostrar/ocultar filtros en móvil */}
      <div className="lg:hidden p-4 -mt-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full bg-gray-50 hover:bg-gray-100 py-2 px-4 rounded-lg text-gray-700 transition-colors"
        >
          <span className="font-medium">
            {isOpen ? 'Ocultar filtros' : 'Mostrar filtros'}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
      
      {/* Contenido de filtros (visible en desktop, condicional en móvil) */}
      <div className={`${!isOpen && 'hidden lg:block'}`}>
        {/* Filtros por categoría */}
        <div className="p-4 border-b border-gray-100">
          <h4 className="text-sm font-medium text-gray-800 mb-3">Categoría</h4>
          <div className="space-y-2">
            <div className="flex items-center">
              <input
                type="radio"
                id="category-all"
                name="category"
                className="form-radio h-4 w-4 text-accent"
                checked={!filters.category}
                onChange={() => handleCategoryChange(null)}
              />
              <label htmlFor="category-all" className="ml-2 text-sm text-gray-700">
                Todas las categorías
              </label>
            </div>
            
            {categories.map((category) => (
              <div className="flex items-center" key={category}>
                <input
                  type="radio"
                  id={`category-${category.toLowerCase()}`}
                  name="category"
                  className="form-radio h-4 w-4 text-accent"
                  checked={filters.category === category.toLowerCase()}
                  onChange={() => handleCategoryChange(category.toLowerCase())}
                />
                <label htmlFor={`category-${category.toLowerCase()}`} className="ml-2 text-sm text-gray-700">
                  {category}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        {/* Filtro de precio */}
        <div className="p-4 border-b border-gray-100">
          <h4 className="text-sm font-medium text-gray-800 mb-3">Precio</h4>
          <div className="flex space-x-2">
            <div className="w-1/2">
              <label htmlFor="min-price" className="block text-xs text-gray-500 mb-1">
                Mínimo
              </label>
              <input
                type="number"
                id="min-price"
                className="w-full px-2 py-1 border border-gray-200 rounded text-sm"
                placeholder="0"
                min="0"
                value={filters.minPrice !== null ? filters.minPrice : ''}
                onChange={handleMinPriceChange}
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="max-price" className="block text-xs text-gray-500 mb-1">
                Máximo
              </label>
              <input
                type="number"
                id="max-price"
                className="w-full px-2 py-1 border border-gray-200 rounded text-sm"
                placeholder="99999"
                min="0"
                value={filters.maxPrice !== null ? filters.maxPrice : ''}
                onChange={handleMaxPriceChange}
              />
            </div>
          </div>
        </div>
        
        {/* Botón para resetear filtros */}
        <div className="p-4">
          <button
            onClick={handleResetFilters}
            className="w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm rounded transition-colors"
          >
            Resetear filtros
          </button>
        </div>
      </div>
    </div>
  );
};

export default SimpleFilterUI;
