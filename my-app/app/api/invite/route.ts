import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function inviteUserWithProfile(payload: {
  name: string;
  email: string;
  role: string;
  position?: string | null;
  department?: string | null;
  reports_to?: string | null;
}) {
  console.log("🔥 LIB CALLED");

  const { name, email, role, position, department, reports_to } = payload;



    const {  data: inviteData, error: inviteError  } =
  await supabaseAdmin.auth.admin.inviteUserByEmail(email,{redirectTo: "https://practice-qug7exrpy-amanpreet-frontends-projects.vercel.app/setPassword"});

  

  if (inviteError) throw inviteError;

  const userId = inviteData.user?.id;

  const { data: existingUser } = await supabaseAdmin
  .from("profiles")
  .select("id")
  .eq("id", userId)
  .maybeSingle();

// if(existingUser){ console.log("user exist")
//   return existingUser;
// };
if (existingUser) {
  return {
    "success": true,
    "data": {
      "message": "User already invited",
      "alreadyExists": true
    }
  };
}

  const { data, error } = await supabaseAdmin
  
    .from("profiles")
    .insert([
      {
        id: userId, 
        name,
        email,
        role,
        position,
        department,
        reports_to: reports_to || null,
        first_time: true,
        is_active: true,
      },
    ])
    .select()
    .single();

  if (error) throw error;

  return data;
  }


  export async function POST(req: Request) {
    try {
      console.log("🔥 API HIT");
  
      const body = await req.json();
  
      const result = await inviteUserWithProfile(body);
  
      return NextResponse.json({
        success: true,
        data: result,
      });
    } catch (err: any) {
      return NextResponse.json(
        { error: err.message || "Internal Server Error" },
        { status: 500 }
      );
    }
  }

  //   return NextResponse.json({ success: true, message: "User invited successfully" });
  // } catch (err: any) {
  //   return NextResponse.json({ error: err.message || "Internal Server Error" }, { status: 500 });
  // }

