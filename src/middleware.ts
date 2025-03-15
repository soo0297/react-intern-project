import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname === "/service-worker.js") {
    return new NextResponse(null, { status: 404 });
  }
  return NextResponse.next();
}
