"use client";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { fetchProfile, updateProfile } from "@/slices/profileSlice";
import { Card, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Plus, X } from "lucide-react";
import { Mail, Phone, MapPin } from "lucide-react";
import { Lock } from "lucide-react";
import { getSupabaseClient } from "@/lib/supabaseClient";
import { changePassword } from "@/slices/changePasswordSlice";
import { toast } from "sonner";


export default function ProfileSettings() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((s) => s.profile.data);
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [oldPassword, setOldPassword] = useState<string>('')
  const [newPassword, setNewPassword] = useState<string>('')
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>('')

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    image: "",
  });

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name,
        mobile: user.mobile ?? "",
        image: user.image ?? "",

      });
    }
  }, [user]);

  const onSave = async () => {
    if (!user) return

    let imageUrl = form.image || null


    if (imageFile) {
      const supabase = getSupabaseClient()

      const fileExt = imageFile.name.split(".").pop()
      const filePath = `avatars/${user.id}.${fileExt}`

      const { error: uploadError } = await supabase.storage
        .from("profile_pictures")
        .upload(filePath, imageFile, {
          upsert: true,
          contentType: imageFile.type,
        })

      if (uploadError) {
        console.error("Image upload failed:", uploadError)
        return
      }

      const { data } = supabase.storage
        .from("profile_pictures")
        .getPublicUrl(filePath)

      imageUrl = data.publicUrl
    }


    await dispatch(
      updateProfile({
        name: form.name,
        email: user.email,
        image: imageUrl,
        mobile: form.mobile || null,
        is_active: user.is_active,
      })
    )
    setImagePreview(null)
    setImageFile(null)

    toast('Profile updated', {
      position: "top-center",
      action: {
        label: <X />,
        onClick: () => console.log(''),
      },
    }
    )


  }
  if (!user) return null;


  const handleSubmit = () => {
    if (!oldPassword || !newPassword || !confirmNewPassword) {
      toast('Please fill all password fields', {
        position: "top-center",
        action: {
          label: <X />,
          onClick: () => console.log(''),
        },
      })
      return
    }

    if (newPassword !== confirmNewPassword) {
      toast('New passwords do not match', {
        position: "top-center",
        action: {
          label: <X />,
          onClick: () => console.log(''),
        },
      })
      return
    }

    dispatch(
      changePassword({
        oldPassword,
        newPassword,
      })
    );

    setOldPassword('');
    setNewPassword('');
    setConfirmNewPassword('');

    toast('Password changed', {
      position: "top-center",
      action: {
        label: <X />,
        onClick: () => console.log(''),
      },
    }
    )

  }

  return (
    <>
      <div className="">
        <div className="p-6 bg-gradient-to-b  from-[#0D091E] to-[#0D091E] rounded-2xl m-10 mt-8 sticky top-0 z-50">
          <h1 className="font-playfair text-5xl font-bold text-white">My Profile</h1>
          <p className="text-xl mt-3 text-zinc-400">
            View and manage your profile and account settings
          </p>
        </div>
        <Card className="flex justify-center w-350 mb-15 mx-auto rounded-2xl shadow-xl bg-zinc-200 border border-zinc-300">
          <CardContent className="p-10 space-y-14">
            <div className="flex flex-col lg:flex-row items-center gap-10">
              <div className="relative w-20 h-20">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Profile Preview"
                    className="rounded-full object-cover w-20 h-20"
                  />
                ) : (
                  <Image
                    src={form.image || "/logo.png"}
                    alt="Profile Image"
                    fill
                    className="rounded-full border-4 shadow"
                  />
                )}
                <label className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-primary flex items-center justify-center text-white cursor-pointer">
                  <Plus className="text-black" size={30} />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return
                      setImagePreview(URL.createObjectURL(file))
                      setImageFile(file)
                    }}
                  />
                </label>
              </div>
              <div className="text-center lg:text-left space-y-2">
                <h2 className="text-purple-950 text-3xl font-bold">{form.name}</h2>
                {/* <p className="text-gray-500">{form.mobile || "N/A"}</p> */}
                <span className="inline-block mt-2 px-5 py-1 rounded-full bg-zinc-100 text-green-800 text-sm">
                  {user.role}
                </span>
              </div>
            </div>

            <h3 className="text-zinc-600 text-2xl mb-4">
              Contact Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="shadow-lg shadow-zinc-700 flex gap-4 p-0 py-3 rounded-xl border mt-1 w-full bg-zinc-100  border-zinc-400 px-4 focus:outline-none focus:ring-2 focus:ring-purple-600">
                <Mail className="text-gray-400 mt-1" />
                <div className="">
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-zinc-500 font-medium">{user.email}</p>
                </div>
              </div>
              <div className="shadow-lg shadow-zinc-700 flex gap-4 p-5 rounded-xl border mt-1 w-full bg-zinc-100  border-zinc-400 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600">
                <Phone className="text-gray-400 mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="text-zinc-500 font-medium">{form.mobile || "N/A"}</p>
                </div>
              </div>
              <div className="shadow-lg shadow-zinc-700 flex gap-4 p-5 rounded-xl border mt-1 w-full bg-zinc-100  border-zinc-400 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600">
                <MapPin className="text-gray-400 mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="text-zinc-500 font-medium">N/A</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl  text-zinc-600">
                Profile Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-zinc-700 m-5">
                <div>
                  <Label className="text-zinc-600 text-lg">Name</Label>
                  <Input
                    value={form.name}
                    onChange={(e) =>
                      setForm({ ...form, name: e.target.value })
                    }
                    className='mt-5 shadow-lg shadow-zinc-700 flex gap-4 rounded-xl border p-[30px] w-full bg-zinc-100  border-zinc-400 focus:outline-none focus:ring-2 focus:ring-purple-600'
                  />
                </div>
                <div>
                  <Label className="text-zinc-600 text-lg">Email</Label>
                  <Input value={user.email} disabled className='mt-5 shadow-lg shadow-zinc-700 flex gap-4 rounded-xl border p-[30px] w-full bg-zinc-100  border-zinc-400 focus:outline-none focus:ring-2 focus:ring-purple-600' />
                </div>
                <div>
                  <Label className="text-zinc-600 text-lg">Mobile</Label>
                  <Input
                    placeholder="mobile no."
                    value={form.mobile}
                    onChange={(e) =>
                      setForm({ ...form, mobile: e.target.value })
                    }
                    className='mt-5 shadow-lg shadow-zinc-700 flex gap-4 rounded-xl border p-[30px] w-full bg-zinc-100  border-zinc-400 focus:outline-none focus:ring-2 focus:ring-purple-600'
                  />
                </div>
                <div>
                  <Label className="text-zinc-600 text-lg">Role</Label>
                  <Input value={user.role} disabled
                    className='mt-5 shadow-lg shadow-zinc-700 flex gap-4 rounded-xl border p-[30px] w-full bg-zinc-100  border-zinc-400 focus:outline-none focus:ring-2 focus:ring-purple-600' />
                </div>
              </div>

              <div className="flex justify-end mt-3">
                <Button onClick={onSave} className="mt-10 px-10 py-6 text-base text-zinc-300 bg-[#2C1655]">
                  Save Profile Changes
                </Button>
              </div>
            </div>
            <div>
              <h3 className="text-2xl mb-3 flex items-center gap-3 text-zinc-600">
                <Lock />
                Account Settings
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-zinc-600">
                <div>
                  <Label className="text-lg m-5">Current Password</Label>
                  <Input value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} type="password" placeholder="Enter current password" className='mt-5 shadow-lg shadow-zinc-700 flex gap-4 rounded-xl border p-[30px] w-full bg-zinc-100  border-zinc-400 focus:outline-none focus:ring-2 focus:ring-purple-600' />
                </div>

                <div>
                  <Label className="text-lg m-5">New Password</Label>
                  <Input value={newPassword} onChange={(e) => setNewPassword(e.target.value)} type="password" placeholder="Enter new password" className='mt-5 shadow-lg shadow-zinc-700 flex gap-4 rounded-xl border p-[30px] w-full bg-zinc-100  border-zinc-400 focus:outline-none focus:ring-2 focus:ring-purple-600' />
                </div>

                <div>
                  <Label className="text-lg m-5">Confirm New Password</Label>
                  <Input
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    type="password"
                    placeholder="Confirm new password"
                    className='mt-5 shadow-lg shadow-zinc-700 flex gap-4 rounded-xl border p-[30px] w-full bg-zinc-100  border-zinc-400 focus:outline-none focus:ring-2 focus:ring-purple-600'
                  />
                </div>
              </div>
              <div className="flex justify-end mt-8">
                <Button className="mt-10  px-10 py-6 text-base text-zinc-300 bg-[#2C1655]" onClick={(handleSubmit)}>
                  Update Password
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

    </>
  );
}  
