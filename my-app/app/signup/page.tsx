"use client";

import { useState } from "react";
import { getSupabaseClient } from '@/lib/supabaseClient'
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/userStore";
import { User } from "@/types/user.types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
      mobile: profile.mobile,
      is_active: profile.is_active
    };

    console.log('profile.first_time', profile.first_time)
    setUser(user);
    router.replace("/commonLayout/roleBasedDashboard");

  };

 

  const handleGoogleSignIn = async () => {
    const supabase = getSupabaseClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) {
      console.error("Google login error:", error.message);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center py-6 sm:py-8 overflow-x-hidden">
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 px-4 sm:px-6">
        <div className="flex flex-col justify-center w-full min-w-0">
          <div className="flex gap-2 items-center"><img src="/logo w 2.jpg" alt="logo" className="w-16 h-14 sm:w-20 sm:h-16 md:w-24 md:h-20 rounded-2xl shrink-0 object-cover" />
            <h1 className="font-cursive text-4xl sm:text-5xl md:text-6xl font-bold mt-2 sm:mt-5">WorkFlow</h1></div>
          <div className="flex items-center gap-2 mb-6 sm:mb-10">
            <div className="min-w-0">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 pt-6 sm:pt-10">Create Account</h1>
              <p className="text-gray-400 text-sm sm:text-base max-w-md">
                Manage your team, track productivity, and streamline workflows with ease.
              </p>
            </div>
          </div>
          <form onSubmit={handleSignup} className="relative bg-zinc-900/70 backdrop-blur-xl rounded-3xl border border-purple-500/30 mt-1 w-full px-4 sm:px-6 py-6 sm:py-10 focus:outline-none focus:ring-2 focus:ring-purple-600 max-w-sm">
            <h1 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 text-center">Create Account</h1>
            <Input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-3 h-12 w-full rounded-xl bg-zinc-900 border  border-purple-900 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600"
              required            
            />
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-3  h-12 w-full rounded-xl bg-zinc-900 border  border-purple-900   px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600"
              required            
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-3  h-12 w-full rounded-xl bg-zinc-900 border border-purple-900 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600"
              required            
            />
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as "admin" | "hr" | "employee")}
              className="mt-3 w-full rounded-xl bg-zinc-900 border border-purple-900 px-3 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600"
            >
              <option value="admin">Admin</option>
              <option value="hr">HR</option>
              <option value="employee">Employee</option>
            </select>

            <Button type="submit" className="w-full mt-2 bg-zinc-900 border border-zinc-500">
              Create Account
            </Button>
            <Button type="button" onClick={() => router.push("/login")} className="w-full mt-2 bg-zinc-900 border border-zinc-500">
              Login
            </Button>
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-zinc-800" />
              <span className="text-sm text-gray-500">OR</span>
              <div className="h-px flex-1 bg-zinc-800" />
            </div>
            <button
              className="w-full py-3 rounded-xl border border-zinc-700 hover:bg-zinc-900 transition"
              type="button"
              onClick={handleGoogleSignIn}
            >
              <div className='flex justify-center'>
                <div>
                  <svg
                    width="30"
                    height="20"
                    viewBox="0 0 256 262"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                      fill="#4285F4"
                    />
                    <path
                      d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                      fill="#34A853"
                    />
                    <path
                      d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73-40.803-31.688-1.335.635C5.077 89.644 0 109.517 0 130.55c0 21.033 5.077 40.905 13.925 58.602l42.356-32.782"
                      fill="#FBBC05"
                    />
                    <path
                      d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                      fill="#EA4335"
                    />
                  </svg></div>
                <div>
                  <p className='ps-2'>Continue with Google</p></div>
              </div>
            </button>
          </form>
        </div>
        <div className="hidden lg:flex items-center justify-center relative">

          <div className="absolute rounded-2xl  inset-0 bg-[radial-gradient(circle_at_center,_rgba(168,85,247,0.55),_transparent_150%)]" />


          <div className="relative bg-zinc-900/70 backdrop-blur-xl border border-zinc-800 rounded-3xl p-6 sm:p-8 max-w-xl shadow-2xl">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-2">Boost Employee Productivity</h2>
            <p className="text-gray-400 text-sm sm:text-base mb-6 sm:mb-10 pt-4 sm:pt-5">
              Optimize your team’s performance and efficiency with our all‑in‑one
              employee management platform.
            </p>
            <img src="/Login platform.png" alt="login-image" className="w-full h-full object-cover rounded-2xl mb-15" />
            <p className="text-lg text-gray-400 text-center">
              Don’t have an account?{" "}
              <span className="text-purple-400 hover:underline cursor-pointer"><Link href="/signup">Sign up</Link></span>
            </p>
          </div>
        </div>
      </div>
    </div>

  );
}
