// pages/api/invite.ts
import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,      // your Supabase URL
  process.env.SUPABASE_SERVICE_ROLE_KEY!      // service role key
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, role } = req.body;

  if (!name || !email || !role) {
    return res.status(400).json({ error: "Missing name, email, or role" });
  }

  try {
    const { data, error } = await supabaseAdmin
      .from("profiles")
      .insert([{ name, email, role, first_time: true, is_active: true }])
      .select()
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json(data); // return the inserted user
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}
