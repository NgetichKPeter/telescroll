import { supabase } from "./config.js";

document.addEventListener("click", async (e) => {

    const button = e.target.closest(".like-btn");

    if (!button) return;

    const scriptId = button.dataset.id;

    const {
        data: { user }
    } = await supabase.auth.getUser();

    if (!user) {
        alert("Please sign in first.");
        return;
    }

    const { data: existing } = await supabase
        .from("likes")
        .select("id")
        .eq("script_id", scriptId)
        .eq("scribe_id", user.id)
        .maybeSingle();

    if (existing) {

        await supabase
            .from("likes")
            .delete()
            .eq("id", existing.id);

        alert("Like removed.");

    } else {

        const { error } = await supabase
            .from("likes")
            .insert({
                script_id: scriptId,
                scribe_id: user.id
            });

        if (error) {
            alert(error.message);
            return;
        }

        alert("Script liked!");

    }

    location.reload();

});