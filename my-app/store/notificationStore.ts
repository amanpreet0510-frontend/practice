import { create } from "zustand";
import { supabase } from "../lib/supabaseClient";
import { persist } from "zustand/middleware";
import {Notifications} from "../types/notifications";



interface NotificationStore {
 notifications: Notifications[];
  unreadCount: number;
  loading: boolean;
  fetchNotifications: (userId: string, role: string) => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
}

export const useNotificationsStore = create<NotificationStore>(set({loading:true}))({

  notifications: [],
  unreadCount: 0,
  loading: false,

  fetchNotifications: async (userId, role) => {
    set({ loading: true });

    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .or(`user_id.eq.${userId},role.eq.${role},role.eq.all`)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      set({ loading: false });
      return;
    }

    set({
      notifications: data ?? [],
      unreadCount: data?.filter((n) => !n.is_read).length ?? 0,
      loading: false,
    });
  },

  markAsRead: async (id) => {
    await supabase
      .from("notifications")
      .update({ is_read: true })
      .eq("id", id);

    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, is_read: true } : n
      ),
      unreadCount: Math.max(0, state.unreadCount - 1),
    }));
  },



});