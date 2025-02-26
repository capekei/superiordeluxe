/**
 * Adaptador simple para el sistema de filtros de productos
 * Versión optimizada con funcionalidad básica para mejorar rendimiento
 */
export class ProductFilterAdapter {
  /**
   * Constructor
   * @param {Object} options - Opciones de configuración
   * @param {boolean} options.persistInUrl - Si debe persistir los filtros en la URL
   * @param {string} options.defaultSorting - Ordenamiento predeterminado
   */
  constructor(options = {}) {
    this.options = {
      persistInUrl: false,
      defaultSorting: 'featured',
      ...options
    };

    // Estado interno simplificado
    this._items = [];
    this._filters = {
      category: null,
      minPrice: null,
      maxPrice: null,
      sorting: this.options.defaultSorting
    };

    // Inicializar desde URL si es necesario
    if (typeof window !== 'undefined' && this.options.persistInUrl) {
      this._filters = {
        ...this._filters,
        ...this.loadFiltersFromUrl()
      };
    }
  }

  /**
   * Inicializa el adaptador con los datos
   * @param {Object} data - Datos para inicializar
   * @param {Array} data.items - Elementos a filtrar
   */
  initialize(data = {}) {
    if (Array.isArray(data.items)) {
      this._items = [...data.items];
    }
    return this;
  }

  /**
   * Carga los filtros desde la URL
   * @returns {Object} Filtros extraídos de la URL
   */
  loadFiltersFromUrl() {
    if (typeof window === 'undefined') return {};
    
    const params = new URLSearchParams(window.location.search);
    const filters = {};
    
    // Mapear parámetros de URL a filtros (versión simplificada)
    if (params.has('categoria')) {
      filters.category = params.get('categoria');
    }
    if (params.has('precio_min')) {
      filters.minPrice = parseFloat(params.get('precio_min'));
    }
    if (params.has('precio_max')) {
      filters.maxPrice = parseFloat(params.get('precio_max'));
    }
    if (params.has('ordenar')) {
      filters.sorting = params.get('ordenar');
    }
    
    return filters;
  }

  /**
   * Actualiza la URL basándose en los filtros actuales
   */
  updateUrl() {
    if (typeof window === 'undefined' || !this.options.persistInUrl) return;
    
    const params = new URLSearchParams();
    const filters = this._filters;
    
    // Solo añadir parámetros significativos
    if (filters.category) {
      params.set('categoria', filters.category);
    }
    if (filters.minPrice !== null) {
      params.set('precio_min', filters.minPrice);
    }
    if (filters.maxPrice !== null) {
      params.set('precio_max', filters.maxPrice);
    }
    if (filters.sorting !== this.options.defaultSorting) {
      params.set('ordenar', filters.sorting);
    }
    
    // Actualizar URL sin recargar la página
    const newUrl = params.toString() 
      ? `${window.location.pathname}?${params.toString()}`
      : window.location.pathname;
      
    window.history.pushState({}, '', newUrl);
  }

  /**
   * Aplica los filtros a los elementos
   * @returns {Array} Elementos filtrados
   */
  applyFilters() {
    const filters = this._filters;
    let result = [...this._items];
    
    // Filtrar por categoría
    if (filters.category) {
      result = result.filter(item => 
        item.category && item.category.toLowerCase() === filters.category.toLowerCase()
      );
    }
    
    // Filtrar por precio
    if (filters.minPrice !== null) {
      result = result.filter(item => {
        const price = parseFloat(item.price);
        return !isNaN(price) && price >= filters.minPrice;
      });
    }
    
    if (filters.maxPrice !== null) {
      result = result.filter(item => {
        const price = parseFloat(item.price);
        return !isNaN(price) && price <= filters.maxPrice;
      });
    }
    
    // Ordenar resultados
    result = this.sortItems(result, filters.sorting);
    
    // Persistir filtros en URL si es necesario
    if (this.options.persistInUrl && typeof window !== 'undefined') {
      this.updateUrl();
    }
    
    return result;
  }

  /**
   * Ordena los elementos según el criterio especificado
   * @param {Array} items - Elementos a ordenar
   * @param {string} sortBy - Criterio de ordenación
   * @returns {Array} Elementos ordenados
   */
  sortItems(items, sortBy = 'featured') {
    const sortedItems = [...items];
    
    switch (sortBy) {
      case 'price_asc':
        return sortedItems.sort((a, b) => {
          const priceA = parseFloat(a.price) || 0;
          const priceB = parseFloat(b.price) || 0;
          return priceA - priceB;
        });
      case 'price_desc':
        return sortedItems.sort((a, b) => {
          const priceA = parseFloat(a.price) || 0;
          const priceB = parseFloat(b.price) || 0;
          return priceB - priceA;
        });
      case 'name_asc':
        return sortedItems.sort((a, b) => 
          (a.name || '').localeCompare(b.name || '')
        );
      case 'name_desc':
        return sortedItems.sort((a, b) => 
          (b.name || '').localeCompare(a.name || '')
        );
      case 'featured':
      default:
        return sortedItems;
    }
  }

  /**
   * Establece un filtro específico
   * @param {string} key - Clave del filtro
   * @param {any} value - Valor del filtro
   * @returns {ProductFilterAdapter} Esta instancia para encadenamiento
   */
  setFilter(key, value) {
    if (key in this._filters) {
      this._filters[key] = value;
    }
    return this;
  }

  /**
   * Establece múltiples filtros
   * @param {Object} filtersObj - Objeto con los filtros a establecer
   * @returns {ProductFilterAdapter} Esta instancia para encadenamiento
   */
  setFilters(filtersObj = {}) {
    Object.entries(filtersObj).forEach(([key, value]) => {
      this.setFilter(key, value);
    });
    return this;
  }

  /**
   * Resetea todos los filtros a sus valores por defecto
   * @returns {ProductFilterAdapter} Esta instancia para encadenamiento
   */
  resetFilters() {
    this._filters = {
      category: null,
      minPrice: null,
      maxPrice: null,
      sorting: this.options.defaultSorting
    };
    return this;
  }

  /**
   * Retorna los filtros actuales
   * @returns {Object} Filtros actuales
   */
  getFilters() {
    return { ...this._filters };
  }

  /**
   * Retorna los elementos actuales
   * @returns {Array} Elementos actuales
   */
  getItems() {
    return [...this._items];
  }
}
