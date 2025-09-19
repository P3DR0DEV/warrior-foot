import { type NextRequest, NextResponse } from "next/server";
import { logout } from "@/infra/auth";

export async function GET(request: NextRequest) {
  const redirectUrl = request.nextUrl.clone();
  redirectUrl.pathname = "/";

  await logout();

  return NextResponse.redirect(redirectUrl);
}
