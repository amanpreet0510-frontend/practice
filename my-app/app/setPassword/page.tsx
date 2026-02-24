"use client"
import React, { Suspense, useState } from 'react';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { EyeOff, Eye } from 'lucide-react';
import { useSearchParams, useRouter } from "next/navigation";
import { getSupabaseClient } from '@/lib/supabaseClient';


const SetPassword = () => {

  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [show, setShow] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async () => {
    if (!token) return;
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const supabase = getSupabaseClient();


    const { error: verifyError } = await supabase.auth.verifyOtp({
      token_hash: token as string,
      type: 'invite',
    });

    if (verifyError) {
      console.error(verifyError.message);
      alert("The recovery link is invalid or has expired.");
      return;
    }

    const { error: updateError } = await supabase.auth.updateUser({
      password,
    });

    if (updateError) {
      console.error(updateError.message);
      alert("Failed to update password. Please try again.");
      return;
    }

    alert("Password set successfully!");
    router.push("/login");
  };

  return (
    <>
      <div className='min-h-screen bg-black text-white flex flex-col  items-center justify-center'>

       
          <div className="flex gap-2 ms-20 me-20 lg:ms-10 m-10">
            <img src="/logo w 2.jpg" alt="logo" className="w-10 h-8 md:w-15 md:h-15 lg:w-25 lg:h-20 rounded-2xl" />
            <h1 className="font-cursive text-4xl lg:text-6xl font-bold md:mt-5">WorkFlow</h1>
            <img src='/reset-password.png' className="w-10 h-8 md:h-15 md:w-15 lg:h-25 lg:w-25" />
          </div>
          <Card className='relative
  bg-zinc-900/70
  backdrop-blur-xl
  rounded-3xl
  border
  border-purple-500/30 max-h-[90vh] w-full max-w-[95vw] sm:max-w-[400px] md:max-w-[440px] lg:w-[440px] lg:max-w-none  p-6 shadow-xl'>
              <div>
                <h3 className='text-4xl font-bold text-purple-100 text-center mt-5 mb-10'>SetPassword</h3>
              </div>
              <div className="relative">
                <CardTitle className='mt-5 text-lg'>Password</CardTitle>
                <Input
                  type={show ? "text" : "password"}
                  placeholder="Enter password"
                  className="mt-5 w-full rounded-xl p-7 bg-zinc-900 border border-zinc-800 focus:outline-none focus:ring-2 focus:ring-purple-900"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setShow(!show)}
                  className="absolute right-2 top-1/2 translate-y-2 h-7 w-7"
                >
                  {show ? <EyeOff size={16} /> : <Eye size={16} />}
                </Button>
              </div>
              <CardTitle className='mt-5 text-lg'>Confirm Password</CardTitle>
              <Input
                type={show ? "text" : "password"}
                placeholder="Confirm password"
                className="mt-5 w-full p-7 rounded-xl bg-zinc-900 border border-zinc-800 focus:outline-none focus:ring-2 focus:ring-purple-900"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setShow(!show)}
                className="absolute right-2 top-1/2 translate-y-2 h-7 w-7"
              >
                {show ? <EyeOff size={16} /> : <Eye size={16} />}
              </Button>
              <Button onClick={handleSubmit}
                className="w-full p-7 mt-15 mb-5 rounded-xl border border-zinc-700 hover:bg-zinc-300 hover:text-black font-bold transition "
              //className='w-full p-7 mt-8'
              >
                Set Password</Button>
            
          </Card>
        </div>
    
    </>
  )
}

const SetPasswordPage = () => (
  <Suspense fallback={null}>
    <SetPassword />
  </Suspense>
)

export default SetPasswordPage; 