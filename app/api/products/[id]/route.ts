import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

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

type RouteContext = {
  params: {
    id: string;
  };
};

export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  const id = parseInt(context.params.id);
  const product = products.find(p => p.id === id);
  
  if (!product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }
  
  return NextResponse.json(product);
}

export async function PUT(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const id = parseInt(context.params.id);
    const data = await request.json() as Product;
    const index = products.findIndex(p => p.id === id);
    
    if (index === -1) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    
    products[index] = { ...data, id };
    return NextResponse.json(products[index]);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const id = parseInt(context.params.id);
    const initialLength = products.length;
    products = products.filter(p => p.id !== id);
    
    if (products.length === initialLength) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Product deleted' });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 