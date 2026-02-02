import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabaseServer";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const supabase = await getSupabaseServerClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return NextResponse.redirect(new URL("/roleBasedDashboard", request.url));
    }
  }

  // No code or exchange failed - redirect to login
  return NextResponse.redirect(new URL("/login", request.url));
}
