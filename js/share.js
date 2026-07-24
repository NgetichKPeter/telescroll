const shareMenu = document.getElementById("share-menu");
const quoteComposer = document.getElementById("quote-composer");
const quotedScript = document.getElementById("quoted-script");

let selectedScript = null;

// Open Share Menu
document.addEventListener("click", (e) => {

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
document.getElementById("share-quote").onclick = () => {

    shareMenu.classList.add("hidden");

    quoteComposer.classList.remove("hidden");

    quotedScript.innerHTML = `
        <p><strong>Original Script</strong></p>
        <p>Loading...</p>
    `;

};

// Copy Link
document.getElementById("copy-link").onclick = async () => {

    const link = `${window.location.origin}/script.html?id=${selectedScript}`;

    await navigator.clipboard.writeText(link);

    alert("Script link copied.");

};

// Share Outside Telescroll
document.getElementById("share-external").onclick = async () => {

    const url = `${window.location.origin}/script.html?id=${selectedScript}`;

    if (navigator.share) {

        await navigator.share({
            title: "Telescroll",
            text: "Read this Script on Telescroll.",
            url
        });

    } else {

        await navigator.clipboard.writeText(url);

        alert("Link copied.");

    }

};