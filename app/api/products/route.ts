import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import db from '@/lib/db';

interface Product {
  id: number;
  modelo: string;
  descripcion: string;
  precio: number;
  stock: number;
  category: string;
  imageUrl?: string;
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const products = await new Promise<any[]>((resolve, reject) => {
      db.all("SELECT * FROM products", (err, rows) => (err ? reject(err) : resolve(rows)));
    });
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const data = await request.json() as Product;
    const { category, modelo, descripcion } = data;
    await new Promise((resolve, reject) => {
      db.run("INSERT INTO products (category, modelo, descripcion) VALUES (?, ?, ?)", 
        [category, modelo, descripcion], (err) => (err ? reject(err) : resolve(null)));
    });
    return NextResponse.json({ message: "Producto agregado" }, { status: 201 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
