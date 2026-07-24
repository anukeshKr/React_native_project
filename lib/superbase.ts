import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const superbaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_KEY!;

export const supabase = createClient(supabaseUrl,superbaseAnonKey);

export function createClerkSuperBaseClient(getToken:()=>Promise<string | null>){
    return createClient(supabaseUrl,superbaseAnonKey,{
        async accessToken(){
            return getToken();
        }
    })
}