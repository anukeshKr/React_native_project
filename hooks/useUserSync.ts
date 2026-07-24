import { useUserStore } from "@/store/userStore"; 
import { useUser } from "@clerk/expo";
import { useSuperBase } from "./useSuperBase"; 
import { useEffect } from "react"; 

// 1. Define a quick interface for your database row shape
interface UserRow {
  clerk_id: string;
  is_admin: boolean;
}

export const useUserSync = () => { 
  const { user } = useUser(); 
  const setIsAdmin = useUserStore((state) => state.setIsAdmin); 
  const authSuperbase = useSuperBase(); 

  useEffect(() => { 
    if (!user) return; 
    syncUser(); 
  }, [user]);

  const syncUser = async () => { 
    try {
      const { data } = await authSuperbase 
        .from("users") 
        .select("clerk_id, is_admin")
        .eq("clerk_id", user!.id) 
        .maybeSingle<UserRow>();

      if (data) { 
        setIsAdmin(data.is_admin ?? false); 
        return; 
      } 

      const { data: newUser, error: insertError } = await authSuperbase 
        .from("users")
        .insert({ 
          clerk_id: user!.id, 
          email: user!.emailAddresses[0].emailAddress, 
          first_name: user!.firstName, 
          last_name: user!.lastName, 
          avatar_url: user!.imageUrl 
        })
        .select("is_admin") 
        .single<Pick<UserRow, "is_admin">>(); 

      if (insertError) throw insertError;

      setIsAdmin(newUser?.is_admin ?? false); 
    } catch (err) {
      console.error("Sync error:", err);
    }
  }; 
};
