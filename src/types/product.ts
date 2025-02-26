export interface Product {
  id: string;
  name: string;
  description: string;
  shortDesc?: string;
  category: 'Neveras' | 'Congeladores' | 'Exhibidores' | 'Heladeros' | 'Estufas' | 'Lavadoras';
  features?: string[];
  keyFeature?: string;
  imageUrl?: string;
  price?: number;
  badge?: 'Nuevo' | 'Oferta';
  featured?: boolean;
}
