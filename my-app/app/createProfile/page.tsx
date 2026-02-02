"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "next/navigation";
import { getSupabaseClient } from "../../lib/supabaseClient";

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
            role: "employee",     // SAFE DEFAULT
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
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <Card className="w-full max-w-md shadow-md">
          <CardHeader>
            <CardTitle>Create Your Profile</CardTitle>
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
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="avatar">Avatar</Label>
                <Input
                  id="avatar"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files?.[0] || null)}
                />
              </div>
              {/* <div>
                <Label htmlFor="avatar">Role</Label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as "admin" | "hr" | "employee")}
                  className="mb-3 p-2 border rounded w-full"
                >
                  <option value="admin">Admin</option>
                  <option value="hr">HR</option>
                  <option value="employee">Employee</option>
                </select>
              </div> */}
              <Button
                type="submit"
                className="w-full mt-2"
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
