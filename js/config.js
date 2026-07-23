import { createClient } from "https://esm.sh/@supabase/supabase-js";

const supabaseUrl = "https://ydagguthswsyhexrgwgb.supabase.co";

const supabaseAnonKey = "sb_publishable_I7mg_iLZYJkGRgJ-ax0UKg_I9cX-BML";

export const supabase = createClient(
    supabaseUrl,
    supabaseAnonKey
);