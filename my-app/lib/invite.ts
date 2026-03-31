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

  const { name, email, role, position, department, reports_to } = req.body;

  console.log("value",req.body);

  if (!name || !email || !role) {
    return res.status(400).json({ error: "Missing name, email, or role" });
  }

  const cleanReportsTo =
  reports_to && reports_to !== "undefined" ? reports_to : null;

  try {
    const { data, error } = await supabaseAdmin
      .from("profiles")
      .insert([{
        name,
        email,
        role,
        position,
        department,
        reports_to: cleanReportsTo,
        first_time: true,
        is_active: true
      }])
      .select()
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}
