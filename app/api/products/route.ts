import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET(): Promise<NextResponse> {
  const products = await new Promise<any[]>((resolve, reject) => {
    db.all("SELECT * FROM products", (err, rows) => (err ? reject(err) : resolve(rows)));
  });
  return NextResponse.json(products);
}

export async function POST(request: Request): Promise<NextResponse> {
  const { category, modelo, descripcion } = await request.json();
  await new Promise((resolve, reject) => {
    db.run("INSERT INTO products (category, modelo, descripcion) VALUES (?, ?, ?)", 
      [category, modelo, descripcion], (err) => (err ? reject(err) : resolve(null)));
  });
  return NextResponse.json({ message: "Producto agregado" }, { status: 201 });
}
