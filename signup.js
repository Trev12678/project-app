import { registerUser } from "./js/api.js"; 

document.getElementById("signup").addEventListener("submit", async function(event) {
  event.preventDefault(); 

  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("password2").value;

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  try {
    const data = await registerUser(username, email, password, confirmPassword);
	
    alert(data.message || "Registration successful!");
    window.location.href = "homepage.html";
  } catch (error) {
    console.error("Registration error:", error);
    alert(error.message || "Error registering user.");
  }
});