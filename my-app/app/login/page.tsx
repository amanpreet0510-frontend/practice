"use client";

import { useEffect, useState } from "react";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";
import { User } from "../../types/user.types";

export default function LoginPage() {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);
  const {user,fetchUser}=useUserStore();


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email && !password) {
      alert("enter valid email and password");
      return;
    }
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) return alert(error.message);

    if (!data.user) return;

    const { data: profile,error:profileError } = await supabase
      .from("profiles")
      .select("name, role, email, first_time,image,mobile")
      .eq("id", data.user.id)
      .single();
     

    if (!profile) return console.error("No profile found for this user");

    const user: User = {
      id: data.user.id,
      email: profile.email ?? data.user.email ?? "",
      name: profile.name ?? "",
      role: profile.role ?? "",
      first_time:profile.first_time ?? "",
      image:profile.image || null,
      mobile:profile.mobile || null
    };

    setUser(user);
    if(profile?.first_time){
       router.replace("/createProfile");
    }
    else{
      router.replace("/roleBasedDashboard");
    }
    //router.replace("/roleBasedDashboard");
  };

  const handleGoogleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) {
      console.error("Google login error:", error.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm"
      >
        <h1 className="text-2xl font-semibold mb-4 text-center">Login</h1>

        <label className="block mb-2 text-sm font-medium">Email</label>
        <input
          type="email"
          placeholder="Enter email"
          className="w-full p-2 border rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="block mb-2 text-sm font-medium">Password</label>
        <input
          type="password"
          placeholder="Enter password"
          className="w-full p-2 border rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
        <button
          className="w-full bg-blue-600 text-white p-1 rounded mt-2 hover:bg-blue-700"
          onClick={handleGoogleSignIn}
        >
          GoogleLogin
        </button>
      </form>
    </div>
  );
}
