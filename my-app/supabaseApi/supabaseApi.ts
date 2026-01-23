import { supabase } from "@/lib/supabaseClient";


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




export async function updateUserRole(
  userId: string,
  role: "admin" | "hr" | "employee"
) {
  const { error } = await supabase
    .from("profiles")
    .update({ role })
    .eq("id", userId)

  if (error) throw error
}

export async function deleteUserProfile(userId: string) {
  const { error } = await supabase
    .from("profiles")
    .delete()
    .eq("id", userId)

  if (error) throw error
}


export async function updateUserStatus(
  userId: string,
  isActive: boolean
) {
  const { error } = await supabase
    .from("profiles")
    .update({ is_active: isActive })
    .eq("id", userId)

  if (error) throw error
}

