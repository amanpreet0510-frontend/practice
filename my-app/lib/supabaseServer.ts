import { createServerClient } from "@supabase/ssr";

export const createServerSupabase = (req: any) => {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: req.cookies // Pass the middleware request cookies
    }
  );
};
