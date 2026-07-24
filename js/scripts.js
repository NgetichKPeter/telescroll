import { supabase } from "./config.js";

const postButton = document.getElementById("post-script");
const scriptInput = document.getElementById("script-content");

if (postButton) {

    postButton.addEventListener("click", async () => {

        const content = scriptInput.value.trim();

        if (!content) {
            alert("Write a Script first.");
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

        scriptInput.value = "";

        alert("Script posted successfully!");

        location.reload();

    });

}