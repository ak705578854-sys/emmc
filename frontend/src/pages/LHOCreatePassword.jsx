import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LHOCreatePassword() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // Temporary ID coming from LHO registration.
  // Later the backend-generated ID will be stored here.
  const lhoId =
    localStorage.getItem("pendingLHOId") ||
    localStorage.getItem("lhoId") ||
    "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!lhoId) {
      setError(
        "LHO ID not found. Please complete the LHO registration again."
      );
      return;
    }

    if (!password || !confirmPassword) {
      setError("Please enter and confirm your password.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      /*
       * Backend endpoint to be connected:
       * POST /api/lho/create-password
       *
       * Body:
       * {
       *   lhoId,
       *   password
       * }
       */

      const response = await fetch("https://emmc-push-backend.onrender.com/api/lho/create-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          lhoId,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Unable to create password."
        );
      }

      // Remove temporary registration ID after successful password creation.
      localStorage.removeItem("pendingLHOId");
      localStorage.removeItem("lhoId");

      setSuccess(true);
    } catch (err) {
      console.error("LHO password creation error:", err);

      setError(
        err.message ||
          "Unable to create password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div style={styles.page}>
        <div style={styles.container}>
          <div style={styles.logoWrapper}>
            <img
              src="/logo.png"
              alt="EMMC Logo"
              style={styles.logo}
            />
          </div>

          <div style={styles.card}>
            <div style={styles.successIcon}>✓</div>

            <h1 style={styles.title}>Password Created Successfully</h1>

            <p style={styles.subtitle}>
              Your Local Health Organization account has been
              successfully created.
            </p>

            <div style={styles.idBox}>
              <span style={styles.idLabel}>Your LHO ID</span>
              <strong style={styles.idValue}>{lhoId}</strong>
            </div>

            <div style={styles.infoBox}>
              <strong>Next Step</strong>
              <p>
                Use your LHO ID and the password you created to
                log in to EMMC.
              </p>
            </div>

            <button
              type="button"
              style={styles.primaryButton}
              onClick={() => navigate("/login")}
            >
              Continue to Login
            </button>
          </div>

          <div style={styles.footer}>
            <strong>Emergency Mobility Management & Coordination System</strong>
            <br />
            Authorized Access Only
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.logoWrapper}>
          <img
            src="/logo.png"
            alt="EMMC Logo"
            style={styles.logo}
          />
        </div>

        <div style={styles.card}>
          <div style={styles.lockIcon}>🔐</div>

          <h1 style={styles.title}>Create Password</h1>

          <p style={styles.subtitle}>
            Create a secure password for your Local Health
            Organization account.
          </p>

          {!lhoId && (
            <div style={styles.warningBox}>
              LHO ID was not found. Please complete registration
              first.
            </div>
          )}

          {lhoId && (
            <div style={styles.idBox}>
              <span style={styles.idLabel}>LHO ID</span>
              <strong style={styles.idValue}>{lhoId}</strong>
            </div>
          )}

          {error && (
            <div style={styles.errorBox}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={styles.formGroup}>
              <label style={styles.label}>
                Create Password
              </label>

              <div style={styles.passwordWrapper}>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  style={styles.input}
                  autoComplete="new-password"
                />

                <button
                  type="button"
                  style={styles.showButton}
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>
                Confirm Password
              </label>

              <div style={styles.passwordWrapper}>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(e.target.value)
                  }
                  placeholder="Re-enter your password"
                  style={styles.input}
                  autoComplete="new-password"
                />

                <button
                  type="button"
                  style={styles.showButton}
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div style={styles.passwordRules}>
              <div>✓ Minimum 6 characters</div>
              <div>✓ Both passwords must match</div>
              <div>✓ Keep your password confidential</div>
            </div>

            <button
              type="submit"
              disabled={loading || !lhoId}
              style={{
                ...styles.primaryButton,
                opacity:
                  loading || !lhoId ? 0.6 : 1,
                cursor:
                  loading || !lhoId
                    ? "not-allowed"
                    : "pointer",
              }}
            >
              {loading
                ? "Creating Password..."
                : "Create Password"}
            </button>
          </form>

          <button
            type="button"
            style={styles.backButton}
            onClick={() => navigate("/signin")}
          >
            ← Back to Sign In
          </button>
        </div>

        <div style={styles.footer}>
          <strong>Emergency Mobility Management & Coordination System</strong>
          <br />
          Authorized Access Only
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg, #eef6fb 0%, #f8fafc 50%, #eaf4fa 100%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px 20px",
    fontFamily:
      "Inter, Arial, Helvetica, sans-serif",
    boxSizing: "border-box",
  },

  container: {
    width: "100%",
    maxWidth: "560px",
    textAlign: "center",
  },

  logoWrapper: {
    marginBottom: "22px",
  },

  logo: {
    width: "115px",
    height: "auto",
    objectFit: "contain",
  },

  card: {
    background: "#ffffff",
    borderRadius: "18px",
    padding: "38px",
    boxShadow:
      "0 15px 45px rgba(11, 30, 54, 0.12)",
    border: "1px solid #e2e8f0",
    textAlign: "left",
  },

  lockIcon: {
    width: "58px",
    height: "58px",
    borderRadius: "50%",
    background: "#e8f3fa",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "26px",
    margin: "0 auto 18px",
  },

  successIcon: {
    width: "62px",
    height: "62px",
    borderRadius: "50%",
    background: "#d1fae5",
    color: "#059669",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "32px",
    fontWeight: "800",
    margin: "0 auto 18px",
  },

  title: {
    margin: "0 0 10px",
    textAlign: "center",
    color: "#0b1e36",
    fontSize: "27px",
    fontWeight: "800",
  },

  subtitle: {
    margin: "0 auto 25px",
    maxWidth: "430px",
    textAlign: "center",
    color: "#64748b",
    fontSize: "14px",
    lineHeight: "1.6",
  },

  idBox: {
    background: "#f8fafc",
    border: "1px solid #dbe4ec",
    borderRadius: "10px",
    padding: "14px 16px",
    marginBottom: "22px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "15px",
  },

  idLabel: {
    color: "#64748b",
    fontSize: "13px",
    fontWeight: "600",
  },

  idValue: {
    color: "#0b1e36",
    fontSize: "17px",
    fontFamily: "monospace",
    letterSpacing: "0.5px",
  },

  formGroup: {
    marginBottom: "20px",
  },

  label: {
    display: "block",
    marginBottom: "8px",
    color: "#1e293b",
    fontSize: "14px",
    fontWeight: "700",
  },

  passwordWrapper: {
    position: "relative",
    width: "100%",
  },

  input: {
    width: "100%",
    height: "48px",
    boxSizing: "border-box",
    border: "1px solid #cbd5e1",
    borderRadius: "9px",
    padding: "0 72px 0 14px",
    fontSize: "14px",
    outline: "none",
    color: "#0f172a",
    background: "#ffffff",
  },

  showButton: {
    position: "absolute",
    right: "8px",
    top: "50%",
    transform: "translateY(-50%)",
    border: "none",
    background: "transparent",
    color: "#1b649d",
    fontWeight: "700",
    fontSize: "12px",
    cursor: "pointer",
  },

  passwordRules: {
    background: "#f8fafc",
    borderRadius: "9px",
    padding: "12px 15px",
    marginBottom: "22px",
    color: "#64748b",
    fontSize: "12px",
    lineHeight: "1.8",
  },

  primaryButton: {
    width: "100%",
    height: "50px",
    border: "none",
    borderRadius: "9px",
    background: "#1b649d",
    color: "#ffffff",
    fontSize: "15px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "0.2s",
  },

  backButton: {
    width: "100%",
    marginTop: "15px",
    height: "44px",
    border: "1px solid #cbd5e1",
    borderRadius: "9px",
    background: "#ffffff",
    color: "#475569",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
  },

  errorBox: {
    background: "#fef2f2",
    border: "1px solid #fecaca",
    color: "#b91c1c",
    borderRadius: "8px",
    padding: "12px 14px",
    marginBottom: "18px",
    fontSize: "13px",
    lineHeight: "1.5",
  },

  warningBox: {
    background: "#fffbeb",
    border: "1px solid #fde68a",
    color: "#92400e",
    borderRadius: "8px",
    padding: "12px 14px",
    marginBottom: "18px",
    fontSize: "13px",
    lineHeight: "1.5",
  },

  infoBox: {
    background: "#eff6ff",
    border: "1px solid #bfdbfe",
    borderRadius: "9px",
    padding: "14px",
    marginBottom: "20px",
    color: "#1e40af",
    fontSize: "13px",
    lineHeight: "1.5",
  },

  footer: {
    marginTop: "22px",
    color: "#64748b",
    fontSize: "11px",
    lineHeight: "1.7",
  },
};
