import { supabase } from "./config.js";

document.addEventListener("click", async (e) => {

    const button = e.target.closest(".comment-btn");

    if (!button) return;

    const scriptId = button.dataset.id;

    const comment = prompt("Write your comment:");

    if (!comment) return;

    const {
        data: { user }
    } = await supabase.auth.getUser();

    if (!user) {
        alert("Please sign in first.");
        return;
    }

    const { error } = await supabase
        .from("comments")
        .insert({
            script_id: scriptId,
            scribe_id: user.id,
            content: comment
        });

    if (error) {
        alert(error.message);
        return;
    }

    alert("Comment added!");

    location.reload();

});