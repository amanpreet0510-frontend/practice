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

        // First, verify the recovery token from the URL
        const { error: verifyError } = await supabase.auth.verifyOtp({
          token_hash: token as string,
          type: 'invite',
        });

        if (verifyError) {
          console.error(verifyError.message);
          alert("The recovery link is invalid or has expired.");
          return;
        }

        // After successful verification, update the user's password
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
            <div>
                <Card className='fixed inset-0 z-50 flex items-center justify-center bg-black/50  '>
                    <div className='bg-white w-[600px]  h-110 rounded-xl p-6 shadow-xl'>
                        <div className='flex justify-between mb-5 pb-5'>
                            <div>
                                <h3 className='text-2xl font-bold'>SetPassword</h3>
                            </div>
                        </div>
                        <div className="relative">
                            <CardTitle className='mt-5 text-lg'>Password</CardTitle>
                            <Input
                                type={show ? "text" : "password"}
                                placeholder="Enter password"
                                className="pr-10 mt-5 p-7"
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
                            className="pr-10 mt-5 p-7"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}

                        />
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => setShow(!show)}
                            className="absolute  translate-y-10  -translate-x-10 h-7 w-7"
                        >
                            {show ? <EyeOff size={16} /> : <Eye size={16} />}
                        </Button>
                        <Button onClick={handleSubmit} className='w-full p-7 mt-8'>Set Password</Button>
                    </div>
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