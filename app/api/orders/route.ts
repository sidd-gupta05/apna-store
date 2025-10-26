import { NextResponse } from "next/server";

let orders: any[] = [];

export async function GET() {
  return NextResponse.json(orders);
}

export async function POST(request: Request) {
  const order = await request.json();
  const newOrder = {
    ...order,
    id: Date.now().toString(),
    createdAt: new Date(),
  };
  orders.push(newOrder);
  return NextResponse.json(newOrder);
}
