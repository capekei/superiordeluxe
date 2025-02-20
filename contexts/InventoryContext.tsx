'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface InventoryItem {
  id: number;
  modelo: string;
  descripcion: string;
  precio: number;
  stock: number;
  category: string;
  imageUrl?: string;
}

interface InventoryContextType {
  inventory: InventoryItem[];
  updateStock: (id: number, quantity: number) => void;
  getStock: (modelo: string) => number;
  addProduct: (product: Omit<InventoryItem, 'id'>) => void;
  deleteProduct: (id: number) => void;
  editProduct: (id: number, updates: Partial<Omit<InventoryItem, 'id'>>) => void;
}

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

// Datos iniciales de ejemplo
const initialInventory: InventoryItem[] = [
  { 
    id: 1, 
    modelo: 'Nevera Inteligente Pro', 
    descripcion: 'Sistema de enfriamiento dual con IA',
    precio: 12999.99,
    stock: 10,
    category: 'Neveras'
  },
  { 
    id: 2, 
    modelo: 'Lavadora EcoSmart', 
    descripcion: 'Tecnología de lavado eficiente',
    precio: 8999.99,
    stock: 15,
    category: 'Lavadoras'
  },
  { 
    id: 3, 
    modelo: 'Estufa Digital Plus', 
    descripcion: 'Control táctil y cocción precisa',
    precio: 6999.99,
    stock: 8,
    category: 'Estufas'
  },
  { 
    id: 4, 
    modelo: 'Congelador MaxFrost', 
    descripcion: 'Capacidad extra grande con control de temperatura',
    precio: 9999.99,
    stock: 12,
    category: 'Congeladores'
  },
  { 
    id: 5, 
    modelo: 'Exhibidor Comercial Pro', 
    descripcion: 'Ideal para negocios, con iluminación LED',
    precio: 15999.99,
    stock: 6,
    category: 'Exhibidores'
  },
  { 
    id: 6, 
    modelo: 'Heladero Compact', 
    descripcion: 'Perfecto para heladerías pequeñas',
    precio: 7999.99,
    stock: 20,
    category: 'Heladeros'
  }
];

export function InventoryProvider({ children }: { children: ReactNode }) {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    console.log('Initializing inventory...');
    // Cargar inventario desde localStorage o usar datos iniciales
    const savedInventory = localStorage.getItem('inventory');
    if (savedInventory) {
      console.log('Loading saved inventory:', JSON.parse(savedInventory));
      setInventory(JSON.parse(savedInventory));
    } else {
      console.log('Using initial inventory:', initialInventory);
      setInventory(initialInventory);
      localStorage.setItem('inventory', JSON.stringify(initialInventory));
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      console.log('Saving inventory to localStorage:', inventory);
      localStorage.setItem('inventory', JSON.stringify(inventory));
    }
  }, [inventory, isInitialized]);

  const updateStock = (id: number, quantity: number) => {
    setInventory(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, stock: Math.max(0, item.stock - quantity) };
      }
      return item;
    }));
  };

  const getStock = (modelo: string): number => {
    const item = inventory.find(item => item.modelo === modelo);
    return item?.stock || 0;
  };

  const addProduct = (product: Omit<InventoryItem, 'id'>) => {
    const newProduct = {
      ...product,
      id: Date.now()
    };
    setInventory(prev => [...prev, newProduct]);
  };

  const deleteProduct = (id: number) => {
    setInventory(prev => prev.filter(item => item.id !== id));
  };

  const editProduct = (id: number, updates: Partial<Omit<InventoryItem, 'id'>>) => {
    setInventory(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, ...updates };
      }
      return item;
    }));
  };

  if (!isInitialized) {
    return null;
  }

  return (
    <InventoryContext.Provider value={{ 
      inventory, 
      updateStock, 
      getStock, 
      addProduct,
      deleteProduct,
      editProduct
    }}>
      {children}
    </InventoryContext.Provider>
  );
}

export function useInventory() {
  const context = useContext(InventoryContext);
  if (context === undefined) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  return context;
} 