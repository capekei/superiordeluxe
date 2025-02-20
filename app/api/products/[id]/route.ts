import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function PUT(request: Request, { params }: { params: { id: string } }): Promise<NextResponse> {
  const { descripcion } = await request.json();
  await new Promise((resolve, reject) => {
    db.run("UPDATE products SET descripcion = ? WHERE id = ?", 
      [descripcion, params.id], (err) => (err ? reject(err) : resolve(null)));
  });
  return NextResponse.json({ message: "Producto actualizado" });
}

export async function DELETE(request: Request, { params }: { params: { id: string } }): Promise<NextResponse> {
  await new Promise((resolve, reject) => {
    db.run("DELETE FROM products WHERE id = ?", [params.id], (err) => (err ? reject(err) : resolve(null)));
  });
  return NextResponse.json({ message: "Producto eliminado" });
}
