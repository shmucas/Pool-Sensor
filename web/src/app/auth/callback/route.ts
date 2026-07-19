import { NextRequest, NextResponse } from "next/server";
import { supabaseServerClient } from "@/lib/supabase-server";

const ALLOWED_EMAIL = "lvcaspf@gmail.com";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");

  if (code) {
    const supabase = await supabaseServerClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && data.user?.email !== ALLOWED_EMAIL) {
      await supabase.auth.signOut();
      return NextResponse.redirect(new URL("/login?error=not_allowed", request.url));
    }
  }

  return NextResponse.redirect(new URL("/", request.url));
}
