const API_BASE = 'https://ai-resume-builder-taxr.onrender.com';

export async function loginUser(username, password) {
  const res = await fetch(`${API_BASE}/auth/login/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Login failed' }));
    throw new Error(error.message || 'Login failed');
  }

  return res.json();
}

export async function registerUser(username, email, password, confirmPassword) {
  const res = await fetch(`${API_BASE}/auth/register/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password, confirm_password: confirmPassword })
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Registration failed' }));
    throw new Error(error.message || 'Registration failed');
  }

  return res.json();
}

export async function logoutUser(accessToken) {
  const res = await fetch(`${API_BASE}/auth/logout/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    }
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Logout failed' }));
    throw new Error(error.message || 'Logout failed');
  }

  return res.json();
}

export async function resetPassword(email) {
  const res = await fetch(`${API_BASE}/auth/password-reset/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Password reset failed' }));
    throw new Error(error.message || 'Password reset failed');
  }

  return res.json();
}

export async function enhanceResume(prompt) {
  const accessToken = localStorage.getItem('accessToken');

  const res = await fetch(`${API_BASE}/resume/enhance/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify({ prompt })
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Enhancement failed' }));
    throw new Error(error.message || 'Enhancement failed');
  }

  return res.json();
}

export async function getResumes() {
  const accessToken = localStorage.getItem('accessToken');

  const res = await fetch(`${API_BASE}/resume/resumes/`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Failed to fetch resumes' }));
    throw new Error(error.message || 'Failed to fetch resumes');
  }

  return res.json();
}

export async function createResume(resumeData) {
  const accessToken = localStorage.getItem('accessToken');

  const res = await fetch(`${API_BASE}/resume/resumes/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify(resumeData)
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Failed to create resume' }));
    throw new Error(error.message || 'Failed to create resume');
  }

  return res.json();
}

export async function getResume(id) {
  const accessToken = localStorage.getItem('accessToken');

  const res = await fetch(`${API_BASE}/resume/resumes/${id}/`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Failed to fetch resume' }));
    throw new Error(error.message || 'Failed to fetch resume');
  }

  return res.json();
}

export async function updateResume(id, resumeData) {
  const accessToken = localStorage.getItem('accessToken');

  const res = await fetch(`${API_BASE}/resume/resumes/${id}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify(resumeData)
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Failed to update resume' }));
    throw new Error(error.message || 'Failed to update resume');
  }

  return res.json();
}

export async function deleteResume(id) {
  const accessToken = localStorage.getItem('accessToken');

  const res = await fetch(`${API_BASE}/resume/resumes/${id}/`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Failed to delete resume' }));
    throw new Error(error.message || 'Failed to delete resume');
  }

  return res.json();
}
