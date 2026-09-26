// 1. Replace handleSignupSubmit inside EMMCApp.jsx:
const handleSignupSubmit = async (e) => {
  e.preventDefault();
  const name = signupForm.name.trim();
  const email = signupForm.email.trim().toLowerCase();
  const password = signupForm.password;
  const role = signupForm.role;

  if (password.length < 6) {
    alert("Password must be at least 6 characters.");
    return;
  }

  try {
    const response = await fetch("https://emmc.onrender.com/api/patients/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // sends and receives the HTTP-only cookie
      body: JSON.stringify({ name, email, password, role }),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Registration failed.");
      return;
    }

    // Store minimal session info & automatically open the dashboard
    const sessionData = {
      patientId: data.patient.patientId,
      name: data.patient.name,
      email: data.patient.email,
      role: data.patient.role,
    };
    localStorage.setItem("emmcSession", JSON.stringify(sessionData));
    setCurrentUser(sessionData);

    // Reset Form & Close Modal
    setSignupForm({ name: "", email: "", password: "", role: "Patient" });
    handleCloseModal();
  } catch (error) {
    alert("Could not connect to the EMMC backend service. Please check if the server is running.");
  }
};

// 2. Replace handleLoginSubmit inside EMMCApp.jsx:
const handleLoginSubmit = async (e) => {
  e.preventDefault();
  const email = loginForm.email.trim().toLowerCase();
  const password = loginForm.password;

  try {
    const response = await fetch("https://emmc.onrender.com/api/patients/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password, role: selectedRole }),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Invalid credentials.");
      return;
    }

    const sessionData = {
      patientId: data.patient.patientId,
      name: data.patient.name,
      email: data.patient.email,
      role: data.patient.role,
    };
    localStorage.setItem("emmcSession", JSON.stringify(sessionData));
    setCurrentUser(sessionData);
    setLoginForm({ email: "", password: "" });
    handleCloseModal();
  } catch (error) {
    alert("Server error during login. Please try again.");
  }
};

// 3. Replace handleLogout inside EMMCApp.jsx:
const handleLogout = async () => {
  try {
    await fetch("https://emmc.onrender.com/api/patients/logout", {
      method: "POST",
      credentials: "include",
    });
  } catch (err) {
    console.error("Logout error:", err);
  }
  localStorage.removeItem("emmcSession");
  setCurrentUser(null);
  setLoginForm({ email: "", password: "" });
};

const res = await fetch("https://emmc.onrender.com/api/auth/signin", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    name: signupForm.name.trim(),
    email: signupForm.email.trim().toLowerCase(),
    password: signupForm.password,
    role: signupForm.role.toLowerCase(),
  }),
});
