import { supabase } from "./config.js";

const postButton = document.querySelector(".btn-primary");
const textarea = document.querySelector(".script-composer textarea");

if (postButton && textarea) {

    postButton.addEventListener("click", async () => {

        const content = textarea.value.trim();

        if (!content) {
            alert("Write your Script first.");
            return;
        }

        const {
            data: { user }
        } = await supabase.auth.getUser();

        if (!user) {
            alert("Please sign in first.");
            window.location.href = "auth.html";
            return;
        }

        const { error } = await supabase
            .from("scripts")
            .insert({
                scribe_id: user.id,
                content: content
            });

        if (error) {
            alert(error.message);
            return;
        }

        alert("Script published successfully!");

        textarea.value = "";

        location.reload();

    });

}