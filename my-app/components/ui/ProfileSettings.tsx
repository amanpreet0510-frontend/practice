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
      <div className="flex flex-col gap-2 p-5">
        <h1 className="text-5xl font-bold">My Profile</h1>
        <p className="text-xl mt-5  text-gray-500 ">
          View and manage your profile information
        </p>
      </div>
      <div className="flex justify-around">
      <div className="m-15 w-full max-w-md">
        <div className="bg-[#BBC863]  h-50 rounded-t-2xl  p-5">
          <Image
            src={form.image ? form.image : "/avatar.png"}
            alt="Profile Image"
            width={150}
            height={150}
            className=" z-index-100 absolute border-2 border-white  bg-blue-500 w-full max-w-[150px] h-40 items-center justify-center rounded-[100%]"
          />
        </div>
        <div className="w-full h-100 rounded-b-2xl bg-gray-100 p-5">
          <div className="flex flex-col items-center justify-center h-50">
            <h1 className="text-4xl font-bold">{form.name}</h1>
            <p className="text-gray-500">{user.mobile}</p>
            <p className="rounded-2xl bg-green-200 ps-5 pt-2 pb-2 pe-5 mt-4 text-green-800">
              {user.role}
            </p>
            <hr className="mt-5 border-gray-300 w-full max-w-75" />
          </div>
          <div className="flex justify-between">
            <p className="ms-10">Department</p>
            <p className="me-10">N/A</p>
          </div>
          <Button
            onClick={() => setOpen(true)}
            className="bg-[#BBC863] mt-15 p-7 w-full"
          >
            <LucidePen />
            Edit profile
          </Button>
        </div>
      </div>
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-transparent backdrop-blur-sm w-full"
          onClick={() => setOpen(false)}
        >
          <Card
            className="w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Profile Image</Label>

                <div className="relative w-24 h-24">
                  <Image
                    src={form.image ? form.image : "/avatar.png"}
                    alt="Profile Image"
                    fill
                    className="rounded-full object-cover border"
                  />

                  <label className="absolute bottom-0 right-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white cursor-pointer hover:scale-105 transition">
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
                            image: URL.createObjectURL(file) as string,
                          }));
                        }
                      }}
                    />
                  </label>
                </div>

                <p className="text-xs text-muted-foreground">
                  Click + to upload new image
                </p>
              </div>

              <div>
                <Label>Name</Label>
                <Input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>

              <div>
                <Label>Email</Label>
                <Input value={user.email} disabled />
              </div>

              <div>
                <Label>Mobile</Label>
                <Input
                  value={form.mobile}
                  onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                />
              </div>

              <div>
                <Label>Role</Label>
                <Input value={user.role} disabled />
              </div>
              <div className="flex justify-between">
                <Button onClick={onSave}>Save Changes</Button>
                <Button onClick={() => setOpen(false)}>Close</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      <div className="bg-white rounded-2xl shadow-md p-6 w-full max-w-lg h-min">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-100">
            <Mail className="text-blue-600" />
          </div>
          <h2 className="text-xl font-semibold">Contact Information</h2>
        </div>

        <div className="flex items-start gap-4 mb-4">
          <Mail className="text-gray-400 mt-1" />
          <div>
            <p className="text-gray-500 text-sm">Email Address</p>
            <p className="font-medium">{user?.email || "N/A"}</p>
          </div>
        </div>

        <div className="flex items-start gap-4 mb-4">
          <Phone className="text-gray-400 mt-1" />
          <div>
            <p className="text-gray-500 text-sm">Phone Number</p>
            <p className="font-medium">{form.mobile || "N/A"}</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <MapPin className="text-gray-400 mt-1" />
          <div>
            <p className="text-gray-500 text-sm">Location</p>
            <p className="font-medium">{"N/A"}</p>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
