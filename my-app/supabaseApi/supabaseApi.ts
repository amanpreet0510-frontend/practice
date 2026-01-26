import { getSupabaseClient } from "@/lib/supabaseClient";


const supabase = getSupabaseClient();
const { data:authUser } = await supabase.auth.getUser();
 const user = authUser;


console.log('authUser', authUser?.user?.id)


export const { data:authProfile, error } = await supabase
  .from("profiles")
  .select("id, email,name,role")
  .eq("id", authUser?.user?.id)
  .single();
  
  console.log('authProfile', authProfile)

if (error) {
  console.error("Error fetching profile:", error);
} else {
  console.log("User profile:", authProfile);
}

export const getLoginHourWithUser = async (userId: string) => {
  return supabase
    .from("attendance")
    .select(`*`)
    .eq("user_id", userId)
    .order("login_time", { ascending: false });
};



