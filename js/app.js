import { supabase } from "./config.js";

// Check if user is logged in
const {
    data: { session }
} = await supabase.auth.getSession();

if (!session) {
    window.location.href = "auth.html";
}

// Logout function
window.logout = async function () {

    const { error } = await supabase.auth.signOut();

    if (error) {
        alert(error.message);
        return;
    }

    window.location.href = "auth.html";

};

// Load current user
async function loadCurrentUser() {

    const {
        data: { user }
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

    if (!profile) return;

    console.log("Logged in as:", profile.username);

}

loadCurrentUser();