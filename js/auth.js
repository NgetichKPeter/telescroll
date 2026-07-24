import { supabase } from "./config.js";

// -----------------------------
// SIGN UP
// -----------------------------

const signupForm = document.getElementById("signup-form");

if (signupForm) {

    signupForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const fullName = document.getElementById("full-name").value.trim();
        const username = document.getElementById("username").value.trim().toLowerCase();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirm-password").value;

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        const { error } = await supabase.auth.signUp({

            email,
            password,

            options: {

                data: {
                    full_name: fullName,
                    username: username
                }

            }

        });

        if (error) {
            alert(error.message);
            return;
        }

        alert("Account created successfully!");

        window.location.href = "auth.html";

    });

}

// -----------------------------
// LOGIN
// -----------------------------

const loginForm = document.getElementById("login-form");

if (loginForm) {

    loginForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        const { error } = await supabase.auth.signInWithPassword({

            email,
            password

        });

        if (error) {
            alert(error.message);
            return;
        }

        window.location.href = "index.html";

    });

}