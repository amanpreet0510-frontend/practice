import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    console.log('email', email)
    if (!email) return NextResponse.json({ error: "Email is required" }, { status: 400 });

    const { data, error } =
  await supabaseAdmin.auth.admin.inviteUserByEmail(email,{redirectTo: "https://4d2bcd737489.ngrok-free.app/setPassword"});


if (error) {
  throw error;
}

    // if (users?.users?.length) {
    //   const userId = users.users[0].id;
    //   await supabaseAdmin.auth.admin.deleteUser(userId);
    // }

    // Create new user → this will send the invite email via SMTP
    // const { error: createError } = await supabaseAdmin.auth.admin.createUser({
    //   email,
    //   email_confirm: true,
    // });

    // if (createError) return NextResponse.json({ error: createError.message }, { status: 400 });

    return NextResponse.json({ success: true, message: "User invited successfully" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Internal Server Error" }, { status: 500 });
  }
}
