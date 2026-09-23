import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HospitalCreatePassword() {
  const navigate = useNavigate();

  const [hospitalId, setHospitalId] = useState("");
  const [hospitalData, setHospitalData] = useState(null);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const savedHospitalId =
      localStorage.getItem("pendingHospitalId");

    const savedHospitalData =
      localStorage.getItem("pendingHospitalData");

    if (!savedHospitalId) {
      navigate("/hospital-registration", {
        replace: true,
      });

      return;
    }

    setHospitalId(savedHospitalId);

    if (savedHospitalData) {
      try {
        setHospitalData(JSON.parse(savedHospitalData));
      } catch {
        setHospitalData(null);
      }
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!hospitalId) {
      setError("Hospital ID not found.");
      return;
    }

    if (!password) {
      setError("Please enter a password.");
      return;
    }

    if (password.length < 6) {
      setError(
        "Password must be at least 6 characters long."
      );
      return;
    }

    if (!confirmPassword) {
      setError("Please confirm your password.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "/api/hospitals/create-password",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            hospitalId,
            password,
            confirmPassword,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message ||
            data?.error ||
            "Unable to create password."
        );
      }

      setSuccess(true);

      // Remove temporary registration data.
      localStorage.removeItem("pendingHospitalId");
      localStorage.removeItem("pendingHospitalData");
    } catch (err) {
      console.error(
        "Hospital password creation error:",
        err
      );

      setError(
        err?.message ||
          "Unable to create hospital password."
      );
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="hospital-password-page">
        <style>{styles}</style>

        <header className="password-header">
          <img
            src="/logo.png"
            alt="EMMC Logo"
            className="password-logo"
          />

          <div className="header-right">
            <span>🔒 Secure Registration</span>
          </div>
        </header>

        <main className="password-main">
          <div className="success-card">
            <div className="success-icon">
              ✓
            </div>

            <h1>Password Created Successfully</h1>

            <p>
              Your hospital account password has been created
              successfully.
            </p>

            <div className="id-display">
              <span>Hospital ID</span>

              <strong>{hospitalId}</strong>
            </div>

            <div className="success-info">
              You can now use your Hospital ID and password to
              access the EMMC Hospital Portal.
            </div>

            <button
              type="button"
              className="login-button"
              onClick={() =>
                navigate("/login", {
                  replace: true,
                })
              }
            >
              Continue to Login →
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="hospital-password-page">
      <style>{styles}</style>

      {/* HEADER */}
      <header className="password-header">
        <div className="brand-area">
          <button
            type="button"
            className="logo-button"
            onClick={() => navigate("/")}
          >
            <img
              src="/logo.png"
              alt="EMMC Logo"
              className="password-logo"
            />
          </button>

          <div className="brand-text">
            <strong>EMMC</strong>

            <span>
              Emergency Mobility Management &amp; Coordination
              System
            </span>
          </div>
        </div>

        <div className="header-right">
          <span>🔒 Secure Registration</span>

          <button
            type="button"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>
      </header>

      {/* MAIN */}
      <main className="password-main">
        <div className="password-card">
          {/* TOP */}
          <div className="card-top">
            <button
              type="button"
              className="back-button"
              onClick={() =>
                navigate("/hospital-registration")
              }
            >
              ← Back
            </button>
          </div>

          <div className="heading">
            <div className="lock-icon">
              🔐
            </div>

            <h1>Create Hospital Password</h1>

            <p>
              Set a secure password for your EMMC Hospital
              account.
            </p>
          </div>

          {/* HOSPITAL INFO */}
          <div className="hospital-info">
            <div className="hospital-info-icon">
              H
            </div>

            <div>
              <span>Hospital ID</span>

              <strong>{hospitalId}</strong>

              {hospitalData?.organizationName && (
                <small>
                  {hospitalData.organizationName}
                </small>
              )}
            </div>
          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="password-form"
          >
            {error && (
              <div className="error-message">
                <span>⚠️</span>
                <span>{error}</span>
              </div>
            )}

            {/* PASSWORD */}
            <div className="field">
              <label htmlFor="hospital-password">
                Create Password
                <span>*</span>
              </label>

              <div className="password-input-wrapper">
                <input
                  id="hospital-password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  placeholder="Enter password"
                  autoComplete="new-password"
                  disabled={loading}
                />

                <button
                  type="button"
                  className="show-password"
                  onClick={() =>
                    setShowPassword(
                      (prev) => !prev
                    )
                  }
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              <small>
                Password must contain at least 6 characters.
              </small>
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="field">
              <label htmlFor="confirm-hospital-password">
                Confirm Password
                <span>*</span>
              </label>

              <div className="password-input-wrapper">
                <input
                  id="confirm-hospital-password"
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(
                      e.target.value
                    );
                    setError("");
                  }}
                  placeholder="Re-enter password"
                  autoComplete="new-password"
                  disabled={loading}
                />

                <button
                  type="button"
                  className="show-password"
                  onClick={() =>
                    setShowConfirmPassword(
                      (prev) => !prev
                    )
                  }
                >
                  {showConfirmPassword
                    ? "Hide"
                    : "Show"}
                </button>
              </div>

              {confirmPassword && (
                <small
                  className={
                    password === confirmPassword
                      ? "match"
                      : "not-match"
                  }
                >
                  {password === confirmPassword
                    ? "✓ Passwords match"
                    : "✕ Passwords do not match"}
                </small>
              )}
            </div>

            {/* PASSWORD RULES */}
            <div className="password-rules">
              <strong>Password Requirements</strong>

              <div
                className={
                  password.length >= 6
                    ? "rule valid"
                    : "rule"
                }
              >
                <span>
                  {password.length >= 6
                    ? "✓"
                    : "○"}
                </span>
                At least 6 characters
              </div>

              <div
                className={
                  password === confirmPassword &&
                  confirmPassword.length > 0
                    ? "rule valid"
                    : "rule"
                }
              >
                <span>
                  {password === confirmPassword &&
                  confirmPassword.length > 0
                    ? "✓"
                    : "○"}
                </span>
                Passwords must match
              </div>
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              className="create-button"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner" />
                  Creating Password...
                </>
              ) : (
                "Create Password →"
              )}
            </button>
          </form>

          <div className="security-note">
            🔒 Your password is securely encrypted and will
            never be stored in plain text.
          </div>
        </div>
      </main>
    </div>
  );
}

const styles = `
* {
  box-sizing: border-box;
}

.hospital-password-page {
  min-height: 100vh;

  background:
    linear-gradient(
      rgba(5, 35, 80, 0.72),
      rgba(5, 35, 80, 0.72)
    ),
    url("/background.jpeg") center / cover fixed no-repeat;

  font-family:
    Inter,
    Arial,
    Helvetica,
    sans-serif;

  color: #0f172a;
}

.password-header {
  height: 78px;

  background: rgba(255,255,255,.97);

  border-bottom: 1px solid #e2e8f0;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 30px;

  box-shadow:
    0 2px 10px rgba(0,0,0,.08);
}

.brand-area {
  display: flex;
  align-items: center;
  gap: 15px;
}

.logo-button {
  border: none;
  background: transparent;
  padding: 0;
  cursor: pointer;
}

.password-logo {
  width: 150px;
  height: 48px;

  object-fit: contain;
  object-position: left center;

  filter:
    drop-shadow(0 2px 4px rgba(0,0,0,.16))
    drop-shadow(0 4px 8px rgba(0,0,0,.10));
}

.brand-text {
  border-left: 1px solid #e2e8f0;
  padding-left: 15px;

  display: flex;
  flex-direction: column;
  gap: 3px;
}

.brand-text strong {
  font-size: 14px;
}

.brand-text span {
  font-size: 10px;
  color: #94a3b8;
  font-weight: 600;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 18px;
}

.header-right span {
  color: #047857;

  background: #ecfdf5;

  border: 1px solid #a7f3d0;

  border-radius: 999px;

  padding: 7px 12px;

  font-size: 10px;
  font-weight: 700;
}

.header-right button {
  border: none;
  background: transparent;

  color: #2563eb;

  font-size: 12px;
  font-weight: 800;

  cursor: pointer;
}

.password-main {
  min-height: calc(100vh - 78px);

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 40px 20px;
}

.password-card {
  width: 100%;
  max-width: 520px;

  background: rgba(255,255,255,.98);

  border: 1px solid #e2e8f0;

  border-radius: 20px;

  padding: 30px;

  box-shadow:
    0 10px 35px rgba(0,0,0,.18);
}

.card-top {
  display: flex;
  justify-content: flex-start;
}

.back-button {
  border: none;
  background: transparent;

  color: #64748b;

  font-size: 11px;
  font-weight: 700;

  cursor: pointer;

  padding: 0;
}

.back-button:hover {
  color: #2563eb;
}

.heading {
  text-align: center;

  margin-top: 8px;
}

.lock-icon {
  width: 55px;
  height: 55px;

  margin: 0 auto 12px;

  border-radius: 50%;

  background: #eff6ff;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 25px;
}

.heading h1 {
  margin: 0;

  font-size: 23px;
  font-weight: 900;

  color: #0f172a;
}

.heading p {
  margin: 7px 0 0;

  font-size: 12px;

  color: #64748b;
}

.hospital-info {
  margin-top: 25px;

  display: flex;
  align-items: center;

  gap: 12px;

  padding: 15px;

  border-radius: 12px;

  background: #f8fafc;

  border: 1px solid #e2e8f0;
}

.hospital-info-icon {
  width: 40px;
  height: 40px;

  flex-shrink: 0;

  border-radius: 10px;

  background: #2563eb;

  color: white;

  display: flex;
  align-items: center;
  justify-content: center;

  font-weight: 900;
}

.hospital-info div:last-child {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.hospital-info span {
  color: #94a3b8;

  text-transform: uppercase;

  letter-spacing: .06em;

  font-size: 9px;
  font-weight: 800;
}

.hospital-info strong {
  font-family: monospace;

  font-size: 17px;

  letter-spacing: .1em;

  color: #0f172a;
}

.hospital-info small {
  color: #64748b;

  font-size: 10px;
}

.password-form {
  margin-top: 22px;

  display: flex;
  flex-direction: column;

  gap: 18px;
}

.field label {
  display: block;

  margin-bottom: 6px;

  color: #334155;

  font-size: 12px;
  font-weight: 800;
}

.field label span {
  color: #ef4444;

  margin-left: 3px;
}

.password-input-wrapper {
  position: relative;
}

.password-input-wrapper input {
  width: 100%;

  height: 45px;

  padding: 0 65px 0 13px;

  border: 1px solid #cbd5e1;

  border-radius: 9px;

  background: white;

  color: #0f172a;

  font-size: 13px;

  outline: none;
}

.password-input-wrapper input:focus {
  border-color: #2563eb;

  box-shadow:
    0 0 0 3px rgba(37,99,235,.10);
}

.password-input-wrapper input:disabled {
  background: #f8fafc;
}

.show-password {
  position: absolute;

  right: 10px;
  top: 50%;

  transform: translateY(-50%);

  border: none;

  background: transparent;

  color: #2563eb;

  font-size: 10px;
  font-weight: 800;

  cursor: pointer;
}

.field > small {
  display: block;

  margin-top: 5px;

  font-size: 10px;

  color: #94a3b8;
}

.field > small.match {
  color: #16a34a;
  font-weight: 700;
}

.field > small.not-match {
  color: #dc2626;
  font-weight: 700;
}

.password-rules {
  padding: 14px;

  border-radius: 10px;

  background: #f8fafc;

  border: 1px solid #e2e8f0;
}

.password-rules strong {
  display: block;

  margin-bottom: 8px;

  color: #475569;

  font-size: 10px;

  text-transform: uppercase;

  letter-spacing: .06em;
}

.rule {
  display: flex;

  align-items: center;

  gap: 7px;

  margin-top: 6px;

  color: #94a3b8;

  font-size: 10px;
}

.rule.valid {
  color: #16a34a;

  font-weight: 700;
}

.rule span {
  width: 14px;
  text-align: center;
}

.error-message {
  display: flex;

  gap: 8px;

  padding: 11px 13px;

  border-radius: 9px;

  background: #fef2f2;

  border: 1px solid #fecaca;

  color: #b91c1c;

  font-size: 11px;

  font-weight: 700;
}

.create-button {
  width: 100%;

  height: 46px;

  border: none;

  border-radius: 9px;

  background: #2563eb;

  color: white;

  font-size: 12px;

  font-weight: 800;

  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  transition: .2s ease;
}

.create-button:hover:not(:disabled) {
  background: #1d4ed8;

  box-shadow:
    0 5px 14px rgba(37,99,235,.25);
}

.create-button:disabled {
  opacity: .7;

  cursor: not-allowed;
}

.spinner {
  width: 15px;
  height: 15px;

  border-radius: 50%;

  border: 2px solid rgba(255,255,255,.4);

  border-top-color: white;

  animation: spin .7s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.security-note {
  margin-top: 18px;

  padding-top: 15px;

  border-top: 1px solid #e2e8f0;

  text-align: center;

  color: #94a3b8;

  font-size: 9px;

  line-height: 1.5;
}

.success-card {
  width: 100%;
  max-width: 520px;

  background: rgba(255,255,255,.98);

  border: 1px solid #e2e8f0;

  border-radius: 20px;

  padding: 40px 30px;

  text-align: center;

  box-shadow:
    0 10px 35px rgba(0,0,0,.18);
}

.success-icon {
  width: 64px;
  height: 64px;

  margin: 0 auto 15px;

  border-radius: 50%;

  background: #dcfce7;

  color: #16a34a;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 30px;
  font-weight: 900;
}

.success-card h1 {
  margin: 0;

  font-size: 23px;
  font-weight: 900;
}

.success-card > p {
  margin: 8px 0 0;

  color: #64748b;

  font-size: 12px;
}

.id-display {
  display: inline-flex;

  flex-direction: column;

  gap: 4px;

  margin: 22px 0;

  padding: 13px 24px;

  border-radius: 10px;

  background: #f1f5f9;

  border: 1px solid #cbd5e1;
}

.id-display span {
  color: #64748b;

  font-size: 9px;

  font-weight: 800;

  text-transform: uppercase;
}

.id-display strong {
  font-family: monospace;

  font-size: 19px;

  letter-spacing: .1em;
}

.success-info {
  padding: 13px;

  border-radius: 10px;

  background: #eff6ff;

  border: 1px solid #bfdbfe;

  color: #1e40af;

  font-size: 11px;

  line-height: 1.6;

  margin-bottom: 18px;
}

.login-button {
  width: 100%;

  height: 45px;

  border: none;

  border-radius: 9px;

  background: #2563eb;

  color: white;

  font-size: 12px;

  font-weight: 800;

  cursor: pointer;
}

.login-button:hover {
  background: #1d4ed8;
}

@media (max-width: 700px) {
  .password-header {
    padding: 0 15px;
  }

  .brand-text {
    display: none;
  }

  .header-right span {
    display: none;
  }

  .password-main {
    padding: 25px 12px;
  }

  .password-card {
    padding: 22px;
  }
}
`;