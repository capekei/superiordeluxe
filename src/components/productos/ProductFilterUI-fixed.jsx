import React, { useState, useEffect, useRef } from 'react';

/**
 * Componente de UI para los filtros de productos
 * 
 * @param {Object} props - Propiedades del componente
 * @param {Array} props.categories - Lista de categorías disponibles
 * @param {Object} props.attributes - Atributos disponibles para filtrar (ej: {colors: ['rojo', 'azul'], sizes: ['S', 'M', 'L']})
 */
const ProductFilterUI = ({ categories = [], attributes = {} }) => {
  // Estado local para los filtros
  const [filters, setFilters] = useState({});
  // Estado para controlar la visibilidad en móvil
  const [isOpen, setIsOpen] = useState(false);
  // Estado para mostrar indicador de carga durante filtrado
  const [isFiltering, setIsFiltering] = useState(false);
  // Estado para mostrar un error si no se puede inicializar el filtro
  const [filterError, setFilterError] = useState(false);
  // Estado para almacenar el motor de filtros
  const [filterEngine, setFilterEngine] = useState(null);
  // Referencia para el intervalo de verificación
  const checkIntervalRef = useRef(null);
  
  // Obtener el filterEngine desde la variable global window.filterEngine
  useEffect(() => {
    let attempts = 0;
    const maxAttempts = 50; // Máximo número de intentos (5 segundos)
    
    // Función para verificar si el motor de filtros está disponible
    const checkFilterEngine = () => {
      if (typeof window !== 'undefined' && window.filterEngine) {
        // Motor de filtros encontrado
        console.log("React: Motor de filtros encontrado");
        setFilterEngine(window.filterEngine);
        setFilters(window.filterEngine.getFilters());
        setFilterError(false);
        
        // Limpiar el intervalo
        if (checkIntervalRef.current) {
          clearInterval(checkIntervalRef.current);
          checkIntervalRef.current = null;
        }
      } else {
        attempts++;
        console.log(`React: Esperando motor de filtros... (intento ${attempts}/${maxAttempts})`);
        
        // Si excedemos el número máximo de intentos, detenemos la búsqueda
        if (attempts >= maxAttempts) {
          console.error("React: No se pudo encontrar el motor de filtros después de múltiples intentos");
          setFilterError(true);
          if (checkIntervalRef.current) {
            clearInterval(checkIntervalRef.current);
            checkIntervalRef.current = null;
          }
        }
      }
    };
    
    // Iniciar un intervalo para verificar la disponibilidad del motor de filtros
    checkIntervalRef.current = setInterval(checkFilterEngine, 100);
    
    // Verificar inmediatamente si filterEngine ya está disponible
    checkFilterEngine();
    
    // Añadir listener para detectar cambios en la URL
    const handlePopState = () => {
      if (window.filterEngine) {
        console.log("React: Cambio en URL detectado");
        setFilters(window.filterEngine.loadFiltersFromUrl());
        applyFiltersGlobal();
      }
    };
    
    // Exponer función para resetear la UI desde el script global
    window.resetFilterUI = () => {
      if (window.filterEngine) {
        setFilters(window.filterEngine.getFilters());
      }
    };
    
    window.addEventListener('popstate', handlePopState);
    
    // Limpiar eventos e intervalos al desmontar
    return () => {
      if (checkIntervalRef.current) {
        clearInterval(checkIntervalRef.current);
      }
      window.removeEventListener('popstate', handlePopState);
      delete window.resetFilterUI;
    };
  }, []);
  
  // Referencia a la función global de aplicar filtros
  const applyFiltersGlobal = () => {
    // Usar la función global si está disponible
    if (typeof window.applyFilters === 'function') {
      console.log("React: Llamando a window.applyFilters()");
      setIsFiltering(true);
      try {
        window.applyFilters();
      } catch (error) {
        console.error("Error al aplicar filtros:", error);
        setFilterError(true);
      } finally {
        // Asegurar que el indicador de carga se oculta incluso en caso de error
        setTimeout(() => setIsFiltering(false), 300);
      }
    } else {
      console.error("Error: window.applyFilters no está disponible");
      setFilterError(true);
    }
  };
  
  // Manejador para cambios en categoría
  const handleCategoryChange = (category) => {
    if (!window.filterEngine) {
      console.error("Error: filterEngine no disponible");
      return;
    }
    
    const newFilters = { ...filters, category };
    setFilters(newFilters);
    if (window.filterEngine) {
      window.filterEngine.setFilters(newFilters);
      applyFiltersGlobal();
    }
  };
  
  // Manejador para cambios en precio mínimo
  const handleMinPriceChange = (e) => {
    if (!window.filterEngine) return;
    
    const value = e.target.value !== '' ? parseInt(e.target.value, 10) : null;
    const newFilters = { ...filters, minPrice: value };
    setFilters(newFilters);
    
    if (window.filterEngine) {
      window.filterEngine.setFilters(newFilters);
      applyFiltersGlobal();
    }
  };
  
  // Manejador para cambios en precio máximo
  const handleMaxPriceChange = (e) => {
    if (!window.filterEngine) return;
    
    const value = e.target.value !== '' ? parseInt(e.target.value, 10) : null;
    const newFilters = { ...filters, maxPrice: value };
    setFilters(newFilters);
    
    if (window.filterEngine) {
      window.filterEngine.setFilters(newFilters);
      applyFiltersGlobal();
    }
  };
  
  // Manejador para cambios en atributos
  const handleAttributeChange = (attrName, value, isChecked) => {
    if (!window.filterEngine) return;
    
    const attrFilters = { ...filters.attributes };
    if (!attrFilters[attrName]) {
      attrFilters[attrName] = [];
    }
    
    if (isChecked) {
      // Añadir el valor si no existe
      if (!attrFilters[attrName].includes(value)) {
        attrFilters[attrName].push(value);
      }
    } else {
      // Eliminar el valor
      attrFilters[attrName] = attrFilters[attrName].filter(v => v !== value);
      // Si está vacío, eliminar la entrada
      if (attrFilters[attrName].length === 0) {
        delete attrFilters[attrName];
      }
    }
    
    const newFilters = { ...filters, attributes: attrFilters };
    setFilters(newFilters);
    
    if (window.filterEngine) {
      window.filterEngine.setFilters(newFilters);
      applyFiltersGlobal();
    }
  };
  
  // Verificar si un atributo está seleccionado
  const isAttributeSelected = (attrName, value) => {
    return (
      filters.attributes &&
      filters.attributes[attrName] &&
      filters.attributes[attrName].includes(value)
    );
  };
  
  // Manejador para cambios en filtro de stock
  const handleStockChange = (e) => {
    if (!window.filterEngine) return;
    
    const isChecked = e.target.checked;
    const newFilters = { ...filters, onlyInStock: isChecked };
    setFilters(newFilters);
    
    if (window.filterEngine) {
      window.filterEngine.setFilters(newFilters);
      applyFiltersGlobal();
    }
  };
  
  // Manejador para resetear filtros
  const handleResetFilters = () => {
    if (!window.filterEngine) return;
    
    if (window.filterEngine) {
      window.filterEngine.resetFilters();
      setFilters(window.filterEngine.getFilters());
      applyFiltersGlobal();
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
        {/* Indicador de carga durante el filtrado */}
        {isFiltering && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-[1px] z-10 flex items-center justify-center">
            <div className="w-10 h-10 border-2 border-accent border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        
        {/* Mensaje de error si no se puede inicializar el filtro */}
        {filterError && (
          <div className="p-4 bg-red-50 border border-red-100 rounded-md m-4">
            <p className="text-sm text-red-600">
              No se pudo inicializar el sistema de filtros. Por favor recarga la página.
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-2 text-sm bg-red-100 text-red-700 px-3 py-1 rounded-md hover:bg-red-200"
            >
              Recargar página
            </button>
          </div>
        )}
        
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
        
        {/* Filtro por atributos */}
        {Object.entries(attributes).map(([attrName, attrValues]) => (
          <div className="p-4 border-b border-gray-100" key={attrName}>
            <h4 className="text-sm font-medium text-gray-800 mb-3">
              {attrName.charAt(0).toUpperCase() + attrName.slice(1)}
            </h4>
            <div className="space-y-2">
              {attrValues.map((value) => (
                <div className="flex items-center" key={`${attrName}-${value}`}>
                  <input
                    type="checkbox"
                    id={`attr-${attrName}-${value}`}
                    className="form-checkbox h-4 w-4 text-accent rounded"
                    checked={isAttributeSelected(attrName, value)}
                    onChange={(e) => handleAttributeChange(attrName, value, e.target.checked)}
                  />
                  <label htmlFor={`attr-${attrName}-${value}`} className="ml-2 text-sm text-gray-700">
                    {value}
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}
        
        {/* Filtro de disponibilidad */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="filter-in-stock"
              className="form-checkbox h-4 w-4 text-accent rounded"
              checked={filters.onlyInStock}
              onChange={handleStockChange}
            />
            <label htmlFor="filter-in-stock" className="ml-2 text-sm text-gray-700">
              Solo productos en stock
            </label>
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

export default ProductFilterUI;
