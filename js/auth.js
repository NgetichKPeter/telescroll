import { supabase } from "./config.js";

const signupForm = document.getElementById("signup-form");
const loginForm = document.getElementById("login-form");

// ========================
// Sign Up
// ========================

if (signupForm) {

    signupForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const fullName = document.getElementById("full-name").value.trim();
        const username = document.getElementById("username").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirm-password").value;

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        const { data, error } = await supabase.auth.signUp({
            email,
            password
        });

        if (error) {
            alert(error.message);
            return;
        }

        const { error: profileError } = await supabase
            .from("profiles")
            .insert({
                id: data.user.id,
                full_name: fullName,
                username: username
            });

        if (profileError) {
            alert(profileError.message);
            return;
        }

        alert("Account created successfully! Please check your email to verify your account.");

        window.location.href = "auth.html";

    });

}

// ========================
// Login
// ========================

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

        alert("Welcome back!");

        window.location.href = "index.html";

    });

}