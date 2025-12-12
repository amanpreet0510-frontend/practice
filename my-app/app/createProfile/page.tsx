"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";
import { User } from "../../types/user.types";

const CreateProfile = () => {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  console.log("user", user);

  const [name, setName] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (!user) return;

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

    
    const {error: updateError } = await supabase
      .from("profiles")
      .update({
        name,
        image: publicUrl,
        first_time: false,
      })
      .eq("id", user.id);

    if (updateError) {
      alert(updateError.message);
      setLoading(false);
      return;
    }

    
    router.replace("/roleBasedDashboard");

    setLoading(false);
  };

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

              <Button
                type="submit"
                className="w-full mt-2"
                onSubmit={handleSubmit}
              >
                Create Profile
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default CreateProfile;
