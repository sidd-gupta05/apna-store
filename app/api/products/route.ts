import { NextResponse } from "next/server";

// This would typically connect to your database
let products: any[] = [];

export async function GET() {
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  const product = await request.json();
  const newProduct = {
    ...product,
    id: Date.now().toString(),
    createdAt: new Date(),
  };
  products.push(newProduct);
  return NextResponse.json(newProduct);
}
