'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface InventoryItem {
  id: number;
  modelo: string;
  stock: number;
}

interface InventoryContextType {
  inventory: InventoryItem[];
  updateStock: (modelo: string, quantity: number) => void;
  getStock: (modelo: string) => number;
}

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

// Datos iniciales de ejemplo
const initialInventory: InventoryItem[] = [
  { id: 1, modelo: 'Nevera Inteligente Pro', stock: 10 },
  { id: 2, modelo: 'Lavadora EcoSmart', stock: 15 },
  { id: 3, modelo: 'Estufa Digital Plus', stock: 8 },
  { id: 4, modelo: 'Congelador MaxFrost', stock: 12 },
  { id: 5, modelo: 'Exhibidor Comercial Pro', stock: 6 },
  { id: 6, modelo: 'Heladero Compact', stock: 20 }
];

export function InventoryProvider({ children }: { children: ReactNode }) {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Cargar inventario desde localStorage o usar datos iniciales
    const savedInventory = localStorage.getItem('inventory');
    if (savedInventory) {
      setInventory(JSON.parse(savedInventory));
    } else {
      setInventory(initialInventory);
      localStorage.setItem('inventory', JSON.stringify(initialInventory));
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('inventory', JSON.stringify(inventory));
    }
  }, [inventory, isInitialized]);

  const updateStock = (modelo: string, quantity: number) => {
    setInventory(prev => prev.map(item => {
      if (item.modelo === modelo) {
        return { ...item, stock: Math.max(0, item.stock - quantity) };
      }
      return item;
    }));
  };

  const getStock = (modelo: string): number => {
    const item = inventory.find(item => item.modelo === modelo);
    return item?.stock || 0;
  };

  if (!isInitialized) {
    return null;
  }

  return (
    <InventoryContext.Provider value={{ inventory, updateStock, getStock }}>
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