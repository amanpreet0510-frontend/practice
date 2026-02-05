"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "next/navigation";
import { getSupabaseClient } from "../../lib/supabaseClient";
import Image from "next/image";


import { User } from "../../types/user.types";

const CreateProfile = () => {
  const router = useRouter();
  const supabase = getSupabaseClient();
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  console.log('user', user)

  const [name, setName] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [role, setRole] = useState<"admin" | "hr" | "employee">("employee");

  const handleSubmit = async () => {
    if (!user) return;
    setLoading(true);

    let publicUrl = null;

    if (image) {
      const storagePath = `${user.id}/avatar.png`;

      const { data, error } = await supabase.storage
        .from("profile_pictures")
        .upload(storagePath, image, { upsert: true });

      if (error) {
        alert(error.message);
        setLoading(false);
        return;
      }


      publicUrl = supabase.storage
        .from("profile_pictures")
        .getPublicUrl(storagePath).data.publicUrl;
    }

    // Use upsert so first-time Google users (no row yet) still work
    const { error: updateError } = await supabase
      .from("profiles")
      .upsert({
        id: user.id,
        name,
        image: publicUrl,
        first_time: false,
        // keep these stable if your table requires them / for store completeness
        email: user.email,
        role: user.role ?? "",
        is_active: user.is_active ?? true,
      })
      .select();

    console.log('user.id', user.id)
    if (updateError) {
      alert(updateError.message);
      setLoading(false);
      return;
    }
    //
    await supabase.auth.refreshSession();

    const { data: updatedProfile, error } = await supabase
      .from("profiles")
      .select("id, email, name, role, first_time, image, mobile, is_active, position, department, reports_to")
      .eq("id", user.id)
      .single();

    if (error || !updatedProfile) {
      console.error("Failed to refetch profile:", error);
      setLoading(false);
      return;
    }
    //
    const nextUser: User = {
      id: updatedProfile.id,
      email: updatedProfile.email ?? user.email ?? "",
      name: updatedProfile.name ?? "",
      role: updatedProfile.role ?? "",
      first_time: Boolean(updatedProfile.first_time),
      image: updatedProfile.image ?? null,
      mobile: updatedProfile.mobile ?? null,
      is_active: Boolean(updatedProfile.is_active),
      position: updatedProfile.position ?? null,
      department: updatedProfile.department ?? null,
      reports_to: updatedProfile.reports_to ?? null,
    };

    setUser(nextUser);

    router.replace("/roleBasedDashboard");

    setLoading(false);
  };

  useEffect(() => {
    async function hydrate() {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (!authUser) return;

      let { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", authUser.id)
        .maybeSingle();

      // 👇 Google user first login
      if (!profile) {
        const { data: newProfile, error } = await supabase
          .from("profiles")
          .insert({
            id: authUser.id,
            email: authUser.email,
            role: "employee",
            first_time: false,
            is_active: true,
          })
          .select()
          .single();

        if (error) {
          console.error(error);
          return;
        }

        profile = newProfile;
      }

      setUser(profile);
    }

    hydrate();
  }, []);



  return (
    <>
      <div className="min-h-screen bg-black text-white flex flex-col  items-center justify-center">
        
        <div className="flex gap-2"><img src="/logo w 2.jpg" alt="logo" className="w-25 h-20 rounded-2xl" />
          <h1 className="font-cursive text-6xl font-bold mt-5">WorkFlow</h1>
          <img src='/image.png' className="h-20 w-20"/>
          </div>
        <Card className="relative
  bg-zinc-900/70
  backdrop-blur-xl
  rounded-3xl
  border
  border-purple-500/30
   w-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600 p-6  max-w-sm mt-10">
          <CardHeader>
            <CardTitle className="text-white font-bold text-2xl">Create Your Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <div>
                <Label htmlFor="name" className="text-white pb-5">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="p-6 file:text-zinc-500 file:pb-10 text-zinc-500 border-purple-700 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  required
                />
              </div>
              <div>
                <Label htmlFor="avatar" className="text-white pt-2 pb-4">Profile Image</Label>
                <Input
                  id="avatar"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files?.[0] || null)}
                  className="p-6 border-purple-700 file:text-zinc-500 file:pb-10 text-zinc-500 placeholder:text-white"
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full mt-5 p-6  rounded-xl border border-zinc-500 hover:bg-zinc-900 transition"
                disabled={loading}
              >
                {loading ? "Saving..." : "Create Profile"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>


    </>
  );
};

export default CreateProfile;
