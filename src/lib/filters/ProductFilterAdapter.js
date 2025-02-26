/**
 * Adaptador para el sistema de filtros de productos
 * Maneja la lógica de filtrado, ordenamiento y persistencia de filtros
 */
export class ProductFilterAdapter {
  /**
   * Constructor
   * @param {Object} options - Opciones de configuración
   * @param {boolean} options.persistInUrl - Si debe persistir los filtros en la URL
   * @param {string} options.defaultSorting - Ordenamiento predeterminado
   * @param {Object} options.initialFilters - Filtros iniciales
   */
  constructor(options = {}) {
    this.options = {
      persistInUrl: false,
      defaultSorting: 'featured',
      initialFilters: {},
      ...options
    };

    // Estado interno
    this._items = [];
    this._filters = {
      category: '',
      minPrice: null,
      maxPrice: null,
      searchTerm: '',
      attributes: {},
      onlyActive: true,
      onlyInStock: false,
      sorting: this.options.defaultSorting,
      ...this.options.initialFilters
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
    
    // Mapear parámetros de URL a filtros
    if (params.has('categoria')) {
      filters.category = params.get('categoria');
    }
    if (params.has('precio_min')) {
      filters.minPrice = parseFloat(params.get('precio_min'));
    }
    if (params.has('precio_max')) {
      filters.maxPrice = parseFloat(params.get('precio_max'));
    }
    if (params.has('buscar')) {
      filters.searchTerm = params.get('buscar');
    }
    if (params.has('ordenar')) {
      filters.sorting = params.get('ordenar');
    }
    if (params.has('en_stock')) {
      filters.onlyInStock = params.get('en_stock') === 'true';
    }
    
    // Extraer atributos adicionales (colores, tamaños, etc.)
    const attributes = {};
    for (const [key, value] of params.entries()) {
      if (key.startsWith('atr_')) {
        const attrName = key.replace('atr_', '');
        attributes[attrName] = value.split(',');
      }
    }
    
    if (Object.keys(attributes).length > 0) {
      filters.attributes = attributes;
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
    if (filters.searchTerm) {
      params.set('buscar', filters.searchTerm);
    }
    if (filters.sorting !== this.options.defaultSorting) {
      params.set('ordenar', filters.sorting);
    }
    if (filters.onlyInStock) {
      params.set('en_stock', 'true');
    }
    
    // Añadir atributos
    Object.entries(filters.attributes || {}).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length > 0) {
        params.set(`atr_${key}`, value.join(','));
      }
    });
    
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
    
    // Filtrar por activación
    if (filters.onlyActive) {
      result = result.filter(item => item.active !== false);
    }
    
    // Filtrar por stock
    if (filters.onlyInStock) {
      result = result.filter(item => item.inStock !== false);
    }
    
    // Filtrar por precio
    if (filters.minPrice !== null) {
      result = result.filter(item => parseFloat(item.price) >= filters.minPrice);
    }
    if (filters.maxPrice !== null) {
      result = result.filter(item => parseFloat(item.price) <= filters.maxPrice);
    }
    
    // Filtrar por término de búsqueda
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      result = result.filter(item => 
        (item.name && item.name.toLowerCase().includes(searchLower)) ||
        (item.description && item.description.toLowerCase().includes(searchLower)) ||
        (item.sku && item.sku.toLowerCase().includes(searchLower))
      );
    }
    
    // Filtrar por atributos
    if (filters.attributes && Object.keys(filters.attributes).length > 0) {
      Object.entries(filters.attributes).forEach(([key, values]) => {
        if (Array.isArray(values) && values.length > 0) {
          result = result.filter(item => {
            // Verifica si el item tiene el atributo y alguno de sus valores coincide
            return item.attributes && 
                   item.attributes[key] && 
                   values.some(val => {
                     if (Array.isArray(item.attributes[key])) {
                       return item.attributes[key].some(itemVal => 
                         itemVal.toLowerCase() === val.toLowerCase()
                       );
                     } else {
                       return item.attributes[key].toLowerCase() === val.toLowerCase();
                     }
                   });
          });
        }
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
        return sortedItems.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
      case 'price_desc':
        return sortedItems.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
      case 'name_asc':
        return sortedItems.sort((a, b) => a.name.localeCompare(b.name));
      case 'name_desc':
        return sortedItems.sort((a, b) => b.name.localeCompare(a.name));
      case 'newest':
        return sortedItems.sort((a, b) => {
          const dateA = a.createdAt ? new Date(a.createdAt) : new Date(0);
          const dateB = b.createdAt ? new Date(b.createdAt) : new Date(0);
          return dateB - dateA;
        });
      case 'featured':
      default:
        // Primero los destacados, luego por orden alfabético
        return sortedItems.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return a.name.localeCompare(b.name);
        });
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
      category: '',
      minPrice: null,
      maxPrice: null,
      searchTerm: '',
      attributes: {},
      onlyActive: true,
      onlyInStock: false,
      sorting: this.options.defaultSorting,
      ...this.options.initialFilters
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
