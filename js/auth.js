import { supabase } from "./config.js";

const signupForm = document.getElementById("signup-form");
const loginForm = document.getElementById("login-form");

// Sign Up
if (signupForm) {

    signupForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const fullName = document.getElementById("full-name").value;
        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const { data, error } = await supabase.auth.signUp({
            email,
            password
        });

        if (error) {
            alert(error.message);
            return;
        }

        await supabase.from("profiles").insert({
            id: data.user.id,
            full_name: fullName,
            username: username
        });

        alert("Account created successfully!");

        window.location.href = "index.html";

    });

}

// Login
if (loginForm) {

    loginForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const email = document.getElementById("email").value;
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