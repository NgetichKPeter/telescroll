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
                        alt="Profile">

                    <div>
                        <h3>${script.profiles?.full_name ?? "Unknown Scribe"}</h3>
                        <small>@${script.profiles?.username ?? "unknown"}</small>
                    </div>

                </div>

                <p class="script-content">
                    ${script.content}
                </p>

                <div class="script-actions">

                    <button>❤️ Like (${script.likes_count})</button>

                    <button>💬 Comment (${script.comments_count})</button>

                    <button>📤 Share (${script.shares_count})</button>

                    <button>🪙 Bestow Gold (${script.gold_received})</button>

                </div>

            </article>
        `;
    });

}

loadFeed();