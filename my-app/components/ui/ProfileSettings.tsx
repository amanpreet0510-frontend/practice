"use client";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { fetchProfile, updateProfile } from "@/slices/profileSlice";
import { Card, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { LucidePen, Plus } from "lucide-react";
import { Mail, Phone, MapPin } from "lucide-react";
import { Lock } from "lucide-react";

export default function ProfileSettings() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((s) => s.profile.data);
  const [open, setOpen] = useState(false);

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

  const onSave = () => {
    dispatch(
      updateProfile({
        name: form.name,
        email: user?.email ?? "",
        image: form.image || null,
        mobile: form.mobile || null,
      })
    );
  };

  if (!user) return null;

  return (
    <>
     
      <div className="p-6">
        <h1 className="text-5xl font-bold">My Profile</h1>
        <p className="text-xl mt-3 text-gray-500">
          View and manage your profile and account settings
        </p>
      </div>
  
      
      <Card className="max-w-7xl mx-auto rounded-3xl shadow-xl">
        <CardContent className="p-10 space-y-14">
  
          
          <div className="flex flex-col lg:flex-row items-center gap-10">
            <div className="relative w-40 h-40">
              <Image
                src={form.image || "/avatar.png"}
                alt="Profile Image"
                fill
                className="rounded-full object-cover border-4 border-white shadow"
              />
  
              <label className="absolute bottom-2 right-2 w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white cursor-pointer">
                <Plus size={18} />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setForm((prev) => ({
                        ...prev,
                        image: URL.createObjectURL(file),
                      }));
                    }
                  }}
                />
              </label>
            </div>
  
            <div className="text-center lg:text-left space-y-2">
              <h2 className="text-3xl font-bold">{form.name}</h2>
              <p className="text-gray-500">{form.mobile || "N/A"}</p>
  
              <span className="inline-block mt-2 px-5 py-1 rounded-full bg-green-200 text-green-800 text-sm">
                {user.role}
              </span>
            </div>
          </div>
  
          
          <div>
            <h3 className="text-2xl font-semibold mb-6">
              Contact Information
            </h3>
  
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex gap-4 p-5 rounded-xl border">
                <Mail className="text-gray-400 mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{user.email}</p>
                </div>
              </div>
  
              <div className="flex gap-4 p-5 rounded-xl border">
                <Phone className="text-gray-400 mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{form.mobile || "N/A"}</p>
                </div>
              </div>
  
              <div className="flex gap-4 p-5 rounded-xl border">
                <MapPin className="text-gray-400 mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium">N/A</p>
                </div>
              </div>
            </div>
          </div>
  
          
          <div>
            <h3 className="text-2xl font-semibold mb-6">
              Profile Details
            </h3>
  
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label>Name</Label>
                <Input
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                  className='mt-5'
                />
              </div>
  
              <div>
                <Label>Email</Label>
                <Input value={user.email} disabled className='mt-5' />
              </div>
  
              <div>
                <Label>Mobile</Label>
                <Input
                  value={form.mobile}
                  onChange={(e) =>
                    setForm({ ...form, mobile: e.target.value })
                  }
                  className='mt-5'
                />
              </div>
  
              <div>
                <Label>Role</Label>
                <Input value={user.role} disabled 
                className='mt-5'/>
              </div>
            </div>
  
            <div className="flex justify-end mt-8">
              <Button onClick={onSave} className="px-10 py-6 text-base">
                Save Profile Changes
              </Button>
            </div>
          </div>
  
          
          <div>
            <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3">
              <Lock />
              Account Settings
            </h3>
  
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Label>Current Password</Label>
                <Input type="password" placeholder="Enter current password" className='mt-5'/>
              </div>
  
              <div>
                <Label>New Password</Label>
                <Input type="password" placeholder="Enter new password" className='mt-5'/>
              </div>
  
              <div>
                <Label>Confirm New Password</Label>
                <Input
                  type="password"
                  placeholder="Confirm new password"
                  className='mt-5'
                />
              </div>
            </div>
  
            <div className="flex justify-end mt-8">
              <Button className="px-10 py-6 text-base">
                Update Password
              </Button>
            </div>
          </div>
  
        </CardContent>
      </Card>
    </>
  );
}  