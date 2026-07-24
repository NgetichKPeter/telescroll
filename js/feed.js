import { supabase } from "./config.js";

const feed = document.getElementById("feed");

async function loadFeed() {

    if (!feed) return;

    const { data, error } = await supabase
        .from("scripts")
        .select(`
            *,
            profiles (
                full_name,
                username
            )
        `)
        .order("created_at", { ascending: false });

    if (error) {
        console.error(error);
        feed.innerHTML = `
            <div class="card">
                <p>Unable to load Scripts.</p>
            </div>
        `;
        return;
    }

    if (!data.length) {
        feed.innerHTML = `
            <div class="card">
                <h3>No Scripts yet 📜</h3>
                <p>Be the first Scribe to tell a story.</p>
            </div>
        `;
        return;
    }

    feed.innerHTML = "";

    data.forEach(script => {

        feed.innerHTML += `
            <article class="card script-card">

                <div class="script-header">

                    <img
                        src="assets/images/default-avatar.png"
                        class="avatar"
                        alt="Avatar">

                    <div>

                        <h3>${script.profiles?.full_name ?? "Unknown Scribe"}</h3>

                        <small>@${script.profiles?.username ?? "unknown"}</small>

                    </div>

                </div>

                <p class="script-content">
                    ${script.content}
                </p>

                <div class="script-actions">

                    <button class="like-btn">
                        ❤️ Like (${script.likes_count})
                    </button>

                    <button class="comment-btn">
                        💬 Comment (${script.comments_count})
                    </button>

                    <button class="share-btn" data-id="${script.id}">
                        📤 Share (${script.shares_count})
                    </button>

                    <button class="gold-btn">
                        🪙 Bestow Gold (${script.gold_received})
                    </button>

                </div>

            </article>
        `;

    });

}

loadFeed();