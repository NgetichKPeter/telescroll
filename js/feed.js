import { supabase } from "./config.js";

const feed = document.getElementById("feed");

async function loadFeed() {

    const { data, error } = await supabase
        .from("scripts")
        .select(`
            *,
            profiles!scribe_id(
                full_name,
                username
            ),
            quoted:scripts(
                id,
                content,
                profiles!scribe_id(
                    full_name,
                    username
                )
            )
        `)
        .order("created_at", { ascending: false });

    if (error) {
        console.error(error);
        return;
    }

    feed.innerHTML = "";

    if (!data.length) {

        feed.innerHTML = `
            <div class="card">
                <h3>No Scripts Yet 📜</h3>
                <p>Be the first Scribe to tell a story.</p>
            </div>
        `;

        return;
    }

    data.forEach(script => {

        let quotedHTML = "";

        if (script.quoted) {

            quotedHTML = `
                <div class="card quoted-script">

                    <strong>
                        ${script.quoted.profiles.full_name}
                    </strong>

                    <small>
                        @${script.quoted.profiles.username}
                    </small>

                    <p>
                        ${script.quoted.content}
                    </p>

                </div>
            `;

        }

        feed.innerHTML += `

        <article class="card script-card">

            <div class="script-header">

                <img
                    src="assets/images/default-avatar.png"
                    class="avatar"
                    alt="Avatar">

                <div>

                    <h3>
                        ${script.profiles.full_name}
                    </h3>

                    <small>
                        @${script.profiles.username}
                    </small>

                </div>

            </div>

            <p class="script-content">
                ${script.content}
            </p>

            ${quotedHTML}

            <div class="script-actions">

                <button class="like-btn">
                    ❤️ Like
                </button>

                <button
    class="comment-btn"
    data-id="${script.id}">
    💬 Comment (${script.comments_count})
</button>

                <button
                    class="share-btn"
                    data-id="${script.id}">
                    📤 Share
                </button>

                <button class="gold-btn">
                    🪙 Bestow Gold
                </button>

            </div>

        </article>

        `;

    });

}

loadFeed();