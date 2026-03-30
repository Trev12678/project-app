const API_BASE_URL = "https://ai-resume-builder-taxr.onrender.com/api";

async function registerUser(username, email, password, confirmPassword) {
  const response = await fetch(`${API_BASE_URL}/auth/register/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username,
      email,
      password,
      password2: confirmPassword,
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Registration failed");
  }
  return data;
}

async function loginUser(username, password) {
  const response = await fetch(`${API_BASE_URL}/auth/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.detail || data.message || "Login failed");
  }
  return data;
}

async function enhanceResume(resumeText) {
  const token = localStorage.getItem("accessToken");

  const response = await fetch(`${API_BASE_URL}/resume/enhance/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { "Authorization": `Bearer ${token}` } : {})
    },
    body: JSON.stringify({
      prompt: "Please enhance my resume with the following details:\n" + resumeText,
      history: []
    })
  });

  // If token is expired or invalid, response status should be 401
  if (response.status === 401) {
    localStorage.removeItem("accessToken");
    window.location.href = "login.html";
    return;
  }

  const data = await response.json();
  if (!response.ok) {
    throw new Error("Enhance resume request failed, please try again3");
  }
  return data;
}

export { registerUser, loginUser, enhanceResume };
