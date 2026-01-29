"use client";

import { useState } from "react";
import { getSupabaseClient } from '@/lib/supabaseClient'
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/userStore";
import { User } from "@/types/user.types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SignupPage() {
  const supabase = getSupabaseClient()
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<"admin" | "hr" | "employee">("employee");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) return alert(error.message);

   
    
    if (!data.user) return;

   const { error: updateError } = await supabase
  .from("profiles")
  .update({
    name,
    role,        
  })
  .eq("id", data.user.id);

if (updateError) {
  console.error(updateError);
  return;
}


 const { data: profile, error: fetchError } = await supabase
  .from("profiles")
  .select("id, email, name, role, first_time, image,mobile,is_active")
  .eq("id", data.user.id)
  .single();

if (fetchError || !profile) {
  console.error(fetchError);
  return;
}


  const user: User = {
  id: profile.id,
  email: profile.email,
  name: profile.name,
  role: profile.role,
  first_time: profile.first_time,
  image: profile.image,
  mobile:profile.mobile,
  is_active:profile.is_active
};


      setUser(user);
      router.replace("/login");
    
  };

  return (
    <form onSubmit={handleSignup} className="max-w-md mx-auto mt-20 p-6 border rounded-lg shadow">
      <h1 className="text-2xl font-semibold mb-4 text-center">Create Account</h1>

      <Input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="mb-3"
      />
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mb-3"
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mb-3"
      />
      <select
        value={role}
        onChange={(e) => setRole(e.target.value as "admin" | "hr" | "employee")}
        className="mb-3 p-2 border rounded w-full"
      >
        <option value="admin">Admin</option>
        <option value="hr">HR</option>
        <option value="employee">Employee</option>
      </select>

      <Button type="submit" className="w-full mt-2">
        Create Account
      </Button>
      <Button  onClick={() => router.push("/login")} className="w-full mt-2">
        Login
      </Button>
    </form>
  );
}
