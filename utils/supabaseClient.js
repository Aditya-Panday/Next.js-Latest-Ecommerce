import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);
// console.log("supabaseUrl",supabaseUrl);
// console.log("supabaseAnonKey",supabaseAnonKey);
export default supabase;
