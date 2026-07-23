import { createClient } from "https://esm.sh/@supabase/supabase-js";

const supabaseUrl = "https://ydagguthswsyhexrgwgb.supabase.co";
const supabaseAnonKey = "PASTE_YOUR_PUBLISHABLE_ANON_KEY_HERE";

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);