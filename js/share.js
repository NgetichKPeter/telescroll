import { supabase } from "./config.js";

const shareMenu = document.getElementById("share-menu");
const quoteComposer = document.getElementById("quote-composer");
const quotedScript = document.getElementById("quoted-script");
const postQuote = document.getElementById("post-quote");
const quoteText = document.getElementById("quote-text");

let selectedScript = null;

// Open Share Menu
document.addEventListener("click", async (e) => {

    const button = e.target.closest(".share-btn");

    if (!button) return;

    selectedScript = button.dataset.id;

    shareMenu.classList.remove("hidden");

});

// Close Share Menu
document.getElementById("close-share").onclick = () => {

    shareMenu.classList.add("hidden");

};

// Share with Quote
document.getElementById("share-quote").onclick = async () => {

    shareMenu.classList.add("hidden");

    quoteComposer.classList.remove("hidden");

    const { data } = await supabase
        .from("scripts")
        .select("content")
        .eq("id", selectedScript)
        .single();

    quotedScript.innerHTML = `
        <div class="card">
            <strong>Original Script</strong>
            <p>${data.content}</p>
        </div>
    `;

};

// Post Quote
postQuote.onclick = async () => {

    const content = quoteText.value.trim();

    if (!content) {
        alert("Write something first.");
        return;
    }

    const {
        data: { user }
    } = await supabase.auth.getUser();

    if (!user) {
        alert("Please sign in first.");
        return;
    }

    const { error } = await supabase
        .from("scripts")
        .insert({

            scribe_id: user.id,
            content: content,
            quoted_script_id: selectedScript

        });

    if (error) {
        alert(error.message);
        return;
    }

    alert("Quote shared successfully!");

    quoteText.value = "";

    quoteComposer.classList.add("hidden");

    location.reload();

};

// Copy Link
document.getElementById("copy-link").onclick = async () => {

    const link = `${location.origin}/script.html?id=${selectedScript}`;

    await navigator.clipboard.writeText(link);

    alert("Link copied.");

};

// Share Outside
document.getElementById("share-external").onclick = async () => {

    const url = `${location.origin}/script.html?id=${selectedScript}`;

    if (navigator.share) {

        await navigator.share({

            title: "Telescroll",
            text: "Read this Script",
            url

        });

    } else {

        await navigator.clipboard.writeText(url);

        alert("Link copied.");

    }

};