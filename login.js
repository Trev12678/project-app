import { loginUser } from "./js/api.js"; 

document.getElementById("signin").addEventListener("submit", async (event) => {
  event.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;

  if (!username || !password) {
    alert("Please fill in both username and password.");
    return;
  }

  try {
    const data = await loginUser(username, password);

    alert("Login successful!");

    localStorage.setItem("accessToken", data.access);
    localStorage.setItem("refreshToken", data.refresh);

    window.location.href = "homepage.html";
  } catch (error) {
    console.error("Login error:", error);
    alert(error.message || "Login failed");
  }
});