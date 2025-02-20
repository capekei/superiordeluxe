import { NextRequest, NextResponse } from 'next/server';

interface Product {
  id: number;
  modelo: string;
  descripcion: string;
  precio: number;
  stock: number;
  category: string;
  imageUrl?: string;
}

// In-memory storage (shared with the main products route)
let products: Product[] = [];

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);
  const product = products.find(p => p.id === id);
  
  return product 
    ? NextResponse.json(product) 
    : NextResponse.json({ error: "Product not found" }, { status: 404 });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const updates = await request.json();
    const index = products.findIndex(p => p.id === id);
    
    if (index === -1) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    
    products[index] = { ...products[index], ...updates };
    return NextResponse.json({ message: "Producto actualizado", product: products[index] });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const initialLength = products.length;
    products = products.filter(p => p.id !== id);
    
    if (products.length === initialLength) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    
    return NextResponse.json({ message: "Producto eliminado" });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
} 