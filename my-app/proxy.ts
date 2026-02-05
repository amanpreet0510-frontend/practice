import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Get the authenticated user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // If no user → redirect to login
  if (!user) {
    if (request.nextUrl.pathname.startsWith("/roleBasedDashboard")) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return response;
  }

  // Fetch the profile row for the user
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

    const protectedRoutes = ["/roleBasedDashboard"];
    const isProtected = protectedRoutes.some((r) =>
      request.nextUrl.pathname.startsWith(r)
    );

  // If user has no profile → first-time login → redirect to createProfile
  // If user has no profile → first-time login
if ((!profile || profile.first_time) && request.nextUrl.pathname.startsWith("/roleBasedDashboard") && isProtected) {
  return NextResponse.redirect(new URL("/createProfile", request.url));
}


  // If user is inactive → redirect to login
 // Only block protected routes
if (!profile?.is_active && request.nextUrl.pathname.startsWith("/roleBasedDashboard") && isProtected) {
  return NextResponse.redirect(new URL("/login", request.url));
}


  // If user has a role → allow access to roleBasedDashboard
  if (request.nextUrl.pathname.startsWith("/roleBasedDashboard")&& isProtected) {
    return response; // user allowed
  }

  // Optional: other routes can be protected similarly

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
