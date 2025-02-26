import React, { useState, useEffect } from 'react';

/**
 * Componente de UI para los filtros del panel de administración
 * 
 * @param {Object} props - Propiedades del componente
 * @param {Object} props.filterEngine - Instancia del motor de filtrado (AdminFilterAdapter)
 * @param {Array} props.categories - Lista de categorías disponibles
 * @param {Function} props.onApplyFilters - Función a ejecutar cuando se aplican los filtros
 */
const AdminFilterUI = ({ filterEngine, categories = [], onApplyFilters }) => {
  // Estado local para los filtros
  const [filters, setFilters] = useState(filterEngine.getFilters());
  
  // Actualizar estado local cuando cambian los filtros en el motor
  useEffect(() => {
    setFilters(filterEngine.getFilters());
  }, [filterEngine]);
  
  // Manejar cambios en los inputs
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Para inputs de tipo checkbox, usar el valor de checked
    const newValue = type === 'checkbox' ? checked : value;
    
    setFilters(prev => ({
      ...prev,
      [name]: newValue
    }));
  };
  
  // Manejar cambios en los inputs de fecha
  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value || null
    }));
  };
  
  // Aplicar filtros
  const handleApplyFilters = () => {
    filterEngine.updateFilters(filters);
    if (onApplyFilters) {
      onApplyFilters(filters);
    }
  };
  
  // Resetear filtros
  const handleResetFilters = () => {
    const resetFilters = filterEngine.resetFilters().getFilters();
    setFilters(resetFilters);
    if (onApplyFilters) {
      onApplyFilters(resetFilters);
    }
  };
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium text-gray-800">Filtros de Inventario</h2>
        <button 
          onClick={handleResetFilters}
          className="text-sm text-red-600 hover:text-red-800 transition-colors"
        >
          Limpiar filtros
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Búsqueda */}
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
            Buscar
          </label>
          <input
            type="text"
            id="search"
            name="search"
            value={filters.search || ''}
            onChange={handleInputChange}
            placeholder="Nombre, descripción..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
          />
        </div>
        
        {/* Categoría */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Categoría
          </label>
          <select
            id="category"
            name="category"
            value={filters.category || ''}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
          >
            <option value="">Todas las categorías</option>
            {categories.map((category) => (
              <option key={category} value={category.toLowerCase()}>
                {category}
              </option>
            ))}
          </select>
        </div>
        
        {/* Estado del producto */}
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
            Estado
          </label>
          <select
            id="status"
            name="status"
            value={filters.status || ''}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
          >
            <option value="">Todos los estados</option>
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
            <option value="borrador">Borrador</option>
          </select>
        </div>
        
        {/* Nivel de stock */}
        <div>
          <label htmlFor="stockLevel" className="block text-sm font-medium text-gray-700 mb-1">
            Nivel de stock
          </label>
          <select
            id="stockLevel"
            name="stockLevel"
            value={filters.stockLevel || ''}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
          >
            <option value="">Todos los niveles</option>
            <option value="normal">Normal</option>
            <option value="bajo">Bajo</option>
            <option value="agotado">Agotado</option>
          </select>
        </div>
        
        {/* Rango de precios */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Rango de precios
          </label>
          <div className="flex space-x-2">
            <input
              type="number"
              id="priceMin"
              name="priceMin"
              value={filters.priceMin || ''}
              onChange={handleInputChange}
              placeholder="Mínimo"
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
            />
            <input
              type="number"
              id="priceMax"
              name="priceMax"
              value={filters.priceMax || ''}
              onChange={handleInputChange}
              placeholder="Máximo"
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
            />
          </div>
        </div>
        
        {/* SKU */}
        <div>
          <label htmlFor="sku" className="block text-sm font-medium text-gray-700 mb-1">
            SKU
          </label>
          <input
            type="text"
            id="sku"
            name="sku"
            value={filters.sku || ''}
            onChange={handleInputChange}
            placeholder="Código SKU"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
          />
        </div>
        
        {/* Rango de fechas */}
        <div>
          <label htmlFor="dateFrom" className="block text-sm font-medium text-gray-700 mb-1">
            Fecha desde
          </label>
          <input
            type="date"
            id="dateFrom"
            name="dateFrom"
            value={filters.dateFrom || ''}
            onChange={handleDateChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
          />
        </div>
        
        <div>
          <label htmlFor="dateTo" className="block text-sm font-medium text-gray-700 mb-1">
            Fecha hasta
          </label>
          <input
            type="date"
            id="dateTo"
            name="dateTo"
            value={filters.dateTo || ''}
            onChange={handleDateChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
          />
        </div>
        
        {/* Ordenación */}
        <div>
          <label htmlFor="sortBy" className="block text-sm font-medium text-gray-700 mb-1">
            Ordenar por
          </label>
          <select
            id="sortBy"
            name="sortBy"
            value={filters.sortBy || 'newest'}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
          >
            <option value="newest">Más recientes primero</option>
            <option value="oldest">Más antiguos primero</option>
            <option value="name-asc">Nombre (A-Z)</option>
            <option value="name-desc">Nombre (Z-A)</option>
            <option value="price-asc">Precio (menor a mayor)</option>
            <option value="price-desc">Precio (mayor a menor)</option>
          </select>
        </div>
      </div>
      
      {/* Botones de acción */}
      <div className="mt-4 flex justify-end">
        <button
          onClick={handleApplyFilters}
          className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          Aplicar filtros
        </button>
      </div>
    </div>
  );
};

export default AdminFilterUI; 