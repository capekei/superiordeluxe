export interface Product {
  id: string;
  name: string;
  description: string;
  shortDesc?: string;
  category: ProductCategory;
  features?: string[];
  keyFeature?: string;
  imageUrl?: string;
  price?: number;
  badge?: 'Nuevo' | 'Oferta';
  featured?: boolean;
}

export enum ProductCategory {
  NEVERAS = 'Neveras',
  CONGELADORES = 'Congeladores',
  EXHIBIDORES = 'Exhibidores',
  HELADEROS = 'Heladeros',
  ESTUFAS = 'Estufas',
  LAVADORAS = 'Lavadoras',
}

// Productos destacados para la página principal
export const featuredProducts: Product[] = [
  // Un producto destacado de cada categoría
  { 
    id: 'PM2205S', 
    name: 'Nevera Auto Frost 08 Pie', 
    description: 'Auto Frost, 08 Pie', 
    category: ProductCategory.NEVERAS, 
    featured: true,
    keyFeature: 'Auto Frost',
    badge: 'Nuevo'
  },
  { 
    id: 'PM200', 
    name: 'Congelador 7.1 Pie', 
    description: '7.1 Pie', 
    category: ProductCategory.CONGELADORES, 
    featured: true,
    keyFeature: 'Eficiente'
  },
  { 
    id: 'PMEF309', 
    name: 'Exhibidor 11 Pie Frost', 
    description: '11 Pie, Frost', 
    category: ProductCategory.EXHIBIDORES, 
    featured: true,
    keyFeature: 'Frost'
  },
  { 
    id: 'PMMHEL2254', 
    name: 'Heladero 9 Pie', 
    description: '9 Pie', 
    category: ProductCategory.HELADEROS, 
    featured: true,
    keyFeature: 'Compacto'
  },
  { 
    id: 'PMH741HFN', 
    name: 'Estufa 20" Negra', 
    description: '20", NEGRA', 
    category: ProductCategory.ESTUFAS, 
    featured: true,
    keyFeature: 'Moderna'
  },
  { 
    id: 'PM0820', 
    name: 'Lavadora 20 Libras', 
    description: '20 Libs', 
    category: ProductCategory.LAVADORAS, 
    featured: true,
    keyFeature: 'Eficiente'
  }
];

// Inventario completo
export const inventory: Product[] = [
  // Neveras
  { id: 'PM2205S', name: 'Nevera Auto Frost 08 Pie', description: 'Auto Frost, 08 Pie', category: ProductCategory.NEVERAS, featured: true, keyFeature: 'Auto Frost' },
  { id: 'PM2262S', name: 'Nevera Auto Frost 11 Pie', description: 'Auto Frost, 11 Pie', category: ProductCategory.NEVERAS, keyFeature: 'Auto Frost' },
  { id: 'PM2262DS', name: 'Nevera Auto Frost 11 Pie Disp', description: 'Auto Frost, 11 Pie, Disp', category: ProductCategory.NEVERAS, keyFeature: 'Dispensador' },
  { id: 'PMFF2197S', name: 'Nevera No Frost 8 Pie', description: 'No Frost, 8 pie', category: ProductCategory.NEVERAS, keyFeature: 'No Frost' },
  { id: 'PMFF2245DS', name: 'Nevera No Frost 9 Pie', description: 'No Frost, 9 pie', category: ProductCategory.NEVERAS, keyFeature: 'No Frost' },
  { id: 'PMFF2333SNF', name: 'Nevera No Frost 13 Pie', description: 'No Frost, 13 pie', category: ProductCategory.NEVERAS, keyFeature: 'No Frost' },
  { id: 'PMFF2415DS', name: 'Nevera No Frost 15 Pie Dispensador', description: 'No Frost, 15 pie, Disp', category: ProductCategory.NEVERAS, keyFeature: 'Dispensador' },
  
  // Congeladores
  { id: 'PM145', name: 'Congelador 5.1 Pie', description: '5.1 Pie', category: ProductCategory.CONGELADORES, keyFeature: 'Compacto' },
  { id: 'PM200', name: 'Congelador 7.1 Pie', description: '7.1 Pie', category: ProductCategory.CONGELADORES, featured: true, keyFeature: 'Eficiente' },
  { id: 'PM290', name: 'Congelador 10.2 Pie', description: '10.2 Pie', category: ProductCategory.CONGELADORES, keyFeature: 'Espacioso' },
  { id: 'PM380', name: 'Congelador 13.4 Pie', description: '13.4 Pie', category: ProductCategory.CONGELADORES, keyFeature: 'Gran capacidad' },
  { id: 'PM508', name: 'Congelador 18 Pie', description: '18 Pie', category: ProductCategory.CONGELADORES, keyFeature: 'Industrial' },
  { id: 'PM708', name: 'Congelador 25 Pie', description: '25 Pie', category: ProductCategory.CONGELADORES, keyFeature: 'Comercial' },
  
  // Exhibidores
  { id: 'PMEF211', name: 'Exhibidor 8 Pie Frost', description: '8 Pie, Frost', category: ProductCategory.EXHIBIDORES, keyFeature: 'Frost' },
  { id: 'PMEF309', name: 'Exhibidor 11 Pie Frost', description: '11 Pie, Frost', category: ProductCategory.EXHIBIDORES, featured: true, keyFeature: 'Frost' },
  { id: 'PMEFF416', name: 'Exhibidor 15 Pie No Frost', description: '15 Pie, No Frost', category: ProductCategory.EXHIBIDORES, keyFeature: 'No Frost' },
  
  // Heladeros
  { id: 'PMMHEL2254', name: 'Heladero 9 Pie', description: '9 Pie', category: ProductCategory.HELADEROS, featured: true, keyFeature: 'Compacto' },
  
  // Estufas
  { id: 'PMH741HFN', name: 'Estufa 20" Negra', description: '20", NEGRA', category: ProductCategory.ESTUFAS, featured: true, keyFeature: 'Moderna' },
  { id: 'PMH741HFS', name: 'Estufa 20" Silver', description: '20", SILVER', category: ProductCategory.ESTUFAS, keyFeature: 'Elegante' },
  { id: 'PM2165N/B', name: 'Estufa 21" Negra/Blanca', description: '21", NEGRA, BLANCA', category: ProductCategory.ESTUFAS, keyFeature: 'Versátil' },
  { id: 'PM2165G', name: 'Estufa 21" Gris', description: '21", GRIS', category: ProductCategory.ESTUFAS, keyFeature: 'Contemporánea' },
  { id: 'PM740HFS', name: 'Estufa 20" Silver', description: '20", SILVER', category: ProductCategory.ESTUFAS, keyFeature: 'Compacta' },
  { id: 'PM840HFS', name: 'Estufa 24" Silver', description: '24", SILVER', category: ProductCategory.ESTUFAS, keyFeature: 'Amplia' },
  { id: 'PM950HFS', name: 'Estufa 30" Silver', description: '30", SILVER', category: ProductCategory.ESTUFAS, keyFeature: 'Profesional' },
  { id: 'PM1060HFS', name: 'Estufa 30" Silver Premium', description: '30", SILVER', category: ProductCategory.ESTUFAS, keyFeature: 'Premium', badge: 'Nuevo' },
  
  // Lavadoras
  { id: 'PM0615', name: 'Lavadora 15 Libras', description: '15 Libs', category: ProductCategory.LAVADORAS, keyFeature: 'Compacta' },
  { id: 'PM0820', name: 'Lavadora 20 Libras', description: '20 Libs', category: ProductCategory.LAVADORAS, featured: true, keyFeature: 'Eficiente' },
  { id: 'PM1025', name: 'Lavadora 25 Libras', description: '25 Libs', category: ProductCategory.LAVADORAS, keyFeature: 'Familiar' },
  { id: 'PM1229', name: 'Lavadora 29 Libras', description: '29 Lbs', category: ProductCategory.LAVADORAS, keyFeature: 'Gran capacidad', badge: 'Oferta' }
];

// Función para filtrar por categoría
export function getProductsByCategory(category: ProductCategory): Product[] {
  return inventory.filter(product => product.category === category);
}

// Función para obtener productos destacados
export function getFeaturedProducts(): Product[] {
  return inventory.filter(product => product.featured);
}

// Función para obtener un producto por ID
export function getProductById(id: string): Product | undefined {
  return inventory.find(product => product.id === id);
}
