"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import AdminSidebar from "@/components/layout/AdminSidebar";
import { useUserStore } from "@/store/userStore";
import { useRouter, usePathname } from "next/navigation";
import { getSupabaseClient } from "@/lib/supabaseClient";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, setUser } = useUserStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const syncUser = async () => {
      const supabase = getSupabaseClient();


      const { data: { user: authUser } } = await supabase.auth.getUser();

      if (!authUser) {
        router.replace("/login");
        return;
      }


      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", authUser.id)
        .single();

      if (profile) {

        setUser({
          id: profile.id,
          email: profile.email,
          name: profile.name,
          role: profile.role,
          first_time: profile.first_time,
          image: profile.image,
          mobile: profile.mobile,
          is_active: profile.is_active
        });


        if (profile.first_time) {
          router.replace("/createProfile");
        }

      }

      setIsLoading(false);
    };

    syncUser();
  }, [setUser, router]);


  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-zinc-900 text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      {/* 5. Now 'user.role' is fresh, so this switches correctly */}
      {user?.role === "admin" ? <AdminSidebar /> : <Sidebar />}

      <div className="flex flex-col flex-1">
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}
