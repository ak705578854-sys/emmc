import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreatePatientPassword() {
  const navigate = useNavigate();

  const [patientId, setPatientId] = useState("");
  const [patientName, setPatientName] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedPatientId =
      localStorage.getItem("pendingPatientId");

    const savedPatientData =
      localStorage.getItem(
        "pendingPatientData"
      );

    if (savedPatientId) {
      setPatientId(savedPatientId);
    }

    if (savedPatientData) {
      try {
        const data =
          JSON.parse(savedPatientData);

        if (data?.name) {
          setPatientName(data.name);
        }
      } catch (error) {
        console.error(
          "Unable to read patient data:",
          error
        );
      }
    }
  }, []);

  const validate = () => {
    setError("");

    if (!patientId) {
      setError(
        "Patient ID is missing. Please complete patient registration again."
      );

      return false;
    }

    if (!password) {
      setError(
        "Please enter a password."
      );

      return false;
    }

    if (password.length < 6) {
      setError(
        "Password must be at least 6 characters."
      );

      return false;
    }

    if (!confirmPassword) {
      setError(
        "Please confirm your password."
      );

      return false;
    }

    if (password !== confirmPassword) {
      setError(
        "Password and confirm password do not match."
      );

      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccess("");

    if (!validate()) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/patients/create-password",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          credentials: "include",

          body: JSON.stringify({
            patientId,
            password,
            confirmPassword,
          }),
        }
      );

      const responseText =
        await response.text();

      let data = {};

      try {
        data = responseText
          ? JSON.parse(responseText)
          : {};
      } catch (error) {
        console.error(
          "Invalid backend response:",
          responseText
        );
      }

      if (!response.ok) {
        setLoading(false);

        setError(
          data.message ||
          data.error ||
          "Unable to create password."
        );

        return;
      }

      setLoading(false);

      setSuccess(
        "Password created successfully."
      );

      /*
       * Registration is now complete.
       *
       * Remove temporary registration data.
       */

      localStorage.removeItem(
        "pendingPatientId"
      );

      localStorage.removeItem(
        "pendingPatientData"
      );

      /*
       * Give user a small success message,
       * then go to MAIN LOGIN PAGE.
       */

      setTimeout(() => {
        navigate("/login", {
          replace: true,
        });
      }, 1200);

    } catch (error) {
      console.error(
        "CREATE PASSWORD ERROR:",
        error
      );

      setLoading(false);

      setError(
        "Cannot connect to backend. Please make sure the backend is running on port 5000."
      );
    }
  };

  return (
    <div className="password-page">

      {/* ================= BACKGROUND ================= */}

      <div className="password-overlay" />

      {/* ================= HEADER ================= */}

      <header className="password-header">

        <img
          src="/logo.png"
          alt="EMMC Logo"
          className="password-logo"
        />

        <div className="secure-badge">
          🔒 Secure Account Setup
        </div>

      </header>

      {/* ================= CONTENT ================= */}

      <main className="password-container">

        <div className="password-card">

          {/* ICON */}

          <div className="password-icon">
            🔐
          </div>

          {/* HEADING */}

          <div className="password-heading">

            <span className="eyebrow">
              FINAL STEP
            </span>

            <h1>
              Create Your Password
            </h1>

            <p>
              Your patient registration is complete.
              Create a password to access your EMMC
              account.
            </p>

          </div>

          {/* ================= PATIENT ID ================= */}

          <div className="patient-id-box">

            <div className="patient-id-label">
              PATIENT ID
            </div>

            <div className="patient-id-value">
              {patientId || "Loading..."}
            </div>

            {patientName && (
              <div className="patient-name">
                {patientName}
              </div>
            )}

          </div>

          {/* ================= FORM ================= */}

          <form
            onSubmit={handleSubmit}
            className="password-form"
          >

            {/* PASSWORD */}

            <div className="password-field">

              <label>
                Password
              </label>

              <div className="input-wrapper">

                <input
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
                />

                <button
                  type="button"
                  className="show-button"
                  onClick={() =>
                    setShowPassword(
                      (prev) => !prev
                    )
                  }
                >
                  {showPassword
                    ? "Hide"
                    : "Show"}
                </button>

              </div>

              <small>
                Minimum 6 characters
              </small>

            </div>

            {/* CONFIRM PASSWORD */}

            <div className="password-field">

              <label>
                Confirm Password
              </label>

              <div className="input-wrapper">

                <input
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
                />

                <button
                  type="button"
                  className="show-button"
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

            </div>

            {/* ERROR */}

            {error && (

              <div className="message error-message">

                <span>!</span>

                <div>
                  {error}
                </div>

              </div>

            )}

            {/* SUCCESS */}

            {success && (

              <div className="message success-message">

                <span>✓</span>

                <div>
                  {success}
                  <br />
                  <small>
                    Redirecting to login...
                  </small>
                </div>

              </div>

            )}

            {/* BUTTON */}

            <button
              type="submit"
              className="create-password-button"
              disabled={loading}
            >

              {loading ? (

                <>
                  <span className="spinner" />
                  Creating Password...
                </>

              ) : (

                <>
                  Create Password
                  <span>
                    →
                  </span>
                </>

              )}

            </button>

          </form>

          {/* SECURITY NOTE */}

          <div className="security-note">

            <span>
              🛡️
            </span>

            <div>

              <strong>
                Your account is secure
              </strong>

              <p>
                Your password is encrypted and
                securely stored.
              </p>

            </div>

          </div>

        </div>

        {/* FOOTER */}

        <footer className="password-footer">

          <strong>
            EMMC — Emergency Mobility Management &
            Coordination System
          </strong>

          <span>
            People | Technology | Faster Response |
            Safer Lives
          </span>

        </footer>

      </main>

      {/* ================= CSS ================= */}

      <style>{`

        * {
          box-sizing: border-box;
        }

        html,
        body,
        #root {
          margin: 0;
          min-height: 100%;
        }

        body {
          margin: 0;
        }

        .password-page {
          min-height: 100vh;

          position: relative;

          display: flex;

          flex-direction: column;

          background:
            linear-gradient(
              rgba(227, 242, 255, 0.72),
              rgba(244, 249, 255, 0.86)
            ),
            url("/background.jpeg")
              center / cover no-repeat;

          background-attachment: fixed;

          font-family:
            Inter,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            Arial,
            sans-serif;

          color: #172033;
        }

        .password-overlay {
          position: fixed;

          inset: 0;

          z-index: 0;

          pointer-events: none;

          background:
            linear-gradient(
              90deg,
              rgba(231, 245, 255, 0.55),
              rgba(248, 252, 255, 0.35),
              rgba(229, 244, 255, 0.55)
            );
        }

        /* ================= HEADER ================= */

        .password-header {
          position: relative;

          z-index: 5;

          height: 76px;

          display: flex;

          align-items: center;

          justify-content: space-between;

          padding: 0 6%;

          background:
            rgba(255,255,255,0.95);

          border-bottom:
            1px solid #dce5ef;

          box-shadow:
            0 4px 20px
            rgba(22,55,90,0.07);

          backdrop-filter: blur(14px);
        }

        .password-logo {
          width: 150px;

          height: 55px;

          object-fit: contain;

          filter:
            drop-shadow(
              0 2px 4px
              rgba(24,63,103,0.15)
            );
        }

        .secure-badge {
          padding: 8px 14px;

          border-radius: 20px;

          background: #f0f7ff;

          border:
            1px solid #d6e8fb;

          color: #1769c2;

          font-size: 12px;

          font-weight: 700;
        }

        /* ================= CONTAINER ================= */

        .password-container {
          position: relative;

          z-index: 2;

          width: 100%;

          max-width: 520px;

          margin:
            55px auto 0;

          padding:
            0 20px 40px;
        }

        /* ================= CARD ================= */

        .password-card {
          background:
            rgba(255,255,255,0.97);

          border:
            1px solid
            rgba(219,228,239,0.95);

          border-radius: 22px;

          padding: 35px;

          box-shadow:
            0 24px 65px
            rgba(24,53,87,0.14);
        }

        /* ================= ICON ================= */

        .password-icon {
          width: 60px;

          height: 60px;

          display: flex;

          align-items: center;

          justify-content: center;

          margin: 0 auto 18px;

          border-radius: 18px;

          background: #edf5ff;

          border:
            1px solid #dcecff;

          font-size: 28px;
        }

        /* ================= HEADING ================= */

        .password-heading {
          text-align: center;
        }

        .eyebrow {
          color: #176ed1;

          font-size: 11px;

          font-weight: 800;

          letter-spacing: 2px;
        }

        .password-heading h1 {
          margin:
            8px 0 10px;

          color: #15213a;

          font-size: 30px;

          line-height: 1.15;

          font-weight: 800;
        }

        .password-heading p {
          margin: 0;

          color: #6d7a8d;

          font-size: 13px;

          line-height: 1.6;
        }

        /* ================= PATIENT ID ================= */

        .patient-id-box {
          margin:
            25px 0;

          padding:
            17px 18px;

          border-radius: 13px;

          background:
            linear-gradient(
              135deg,
              #f1f7ff,
              #f8fbff
            );

          border:
            1px solid #d9e9fa;

          text-align: center;
        }

        .patient-id-label {
          color: #718096;

          font-size: 10px;

          font-weight: 800;

          letter-spacing: 1.5px;

          margin-bottom: 5px;
        }

        .patient-id-value {
          color: #176ed1;

          font-size: 24px;

          font-weight: 900;

          letter-spacing: 1px;
        }

        .patient-name {
          margin-top: 5px;

          color: #69788d;

          font-size: 12px;

          font-weight: 600;
        }

        /* ================= FORM ================= */

        .password-form {
          display: flex;

          flex-direction: column;

          gap: 20px;
        }

        .password-field {
          display: flex;

          flex-direction: column;
        }

        .password-field label {
          margin-bottom: 8px;

          color: #465267;

          font-size: 12px;

          font-weight: 750;
        }

        .input-wrapper {
          position: relative;

          display: flex;

          align-items: center;
        }

        .input-wrapper input {
          width: 100%;

          height: 48px;

          padding:
            0 65px 0 14px;

          border:
            1px solid #d9e1eb;

          border-radius: 10px;

          background: #fbfdff;

          color: #1e293b;

          font-family: inherit;

          font-size: 13px;

          outline: none;

          transition:
            border-color 0.2s ease,
            box-shadow 0.2s ease;
        }

        .input-wrapper input:focus {
          border-color: #4b93ed;

          background: #fff;

          box-shadow:
            0 0 0 3px
            rgba(75,147,237,0.11);
        }

        .input-wrapper input::placeholder {
          color: #a1aab8;
        }

        .show-button {
          position: absolute;

          right: 10px;

          border: none;

          background: transparent;

          color: #176ed1;

          font-size: 11px;

          font-weight: 800;

          cursor: pointer;
        }

        .password-field small {
          margin-top: 6px;

          color: #8b96a7;

          font-size: 10px;
        }

        /* ================= MESSAGES ================= */

        .message {
          display: flex;

          align-items: flex-start;

          gap: 10px;

          padding:
            12px 14px;

          border-radius: 10px;

          font-size: 12px;

          font-weight: 600;

          line-height: 1.45;
        }

        .message > span {
          width: 21px;

          height: 21px;

          flex-shrink: 0;

          display: flex;

          align-items: center;

          justify-content: center;

          border-radius: 50%;

          color: #fff;

          font-weight: 800;
        }

        .error-message {
          background: #fff2f2;

          border:
            1px solid #ffd8d8;

          color: #c33c3c;
        }

        .error-message > span {
          background: #e15a5a;
        }

        .success-message {
          background: #eefbf3;

          border:
            1px solid #ccefd8;

          color: #25804a;
        }

        .success-message > span {
          background: #36a966;
        }

        .success-message small {
          font-weight: 500;
        }

        /* ================= BUTTON ================= */

        .create-password-button {
          width: 100%;

          height: 49px;

          border: none;

          border-radius: 10px;

          background:
            linear-gradient(
              135deg,
              #176fe4,
              #348cff
            );

          color: #fff;

          font-size: 13px;

          font-weight: 800;

          cursor: pointer;

          display: flex;

          align-items: center;

          justify-content: center;

          gap: 12px;

          box-shadow:
            0 9px 22px
            rgba(23,111,228,0.22);

          transition:
            transform 0.2s ease,
            box-shadow 0.2s ease;
        }

        .create-password-button:hover:not(:disabled) {
          transform:
            translateY(-1px);

          box-shadow:
            0 12px 28px
            rgba(23,111,228,0.30);
        }

        .create-password-button:disabled {
          opacity: 0.65;

          cursor: not-allowed;
        }

        .create-password-button span:last-child {
          font-size: 18px;
        }

        /* ================= SPINNER ================= */

        .spinner {
          width: 17px;

          height: 17px;

          border:
            2px solid
            rgba(255,255,255,0.4);

          border-top-color: #fff;

          border-radius: 50%;

          animation:
            password-spin
            0.7s linear infinite;
        }

        @keyframes password-spin {

          to {
            transform:
              rotate(360deg);
          }

        }

        /* ================= SECURITY ================= */

        .security-note {
          display: flex;

          align-items: center;

          gap: 11px;

          margin-top: 25px;

          padding-top: 20px;

          border-top:
            1px solid #e8edf3;
        }

        .security-note > span {
          width: 38px;

          height: 38px;

          flex-shrink: 0;

          display: flex;

          align-items: center;

          justify-content: center;

          border-radius: 10px;

          background: #edf6ff;

          font-size: 17px;
        }

        .security-note strong {
          display: block;

          margin-bottom: 2px;

          color: #334155;

          font-size: 12px;
        }

        .security-note p {
          margin: 0;

          color: #7a8697;

          font-size: 11px;
        }

        /* ================= FOOTER ================= */

        .password-footer {
          display: flex;

          flex-direction: column;

          align-items: center;

          gap: 6px;

          margin-top: 20px;

          text-align: center;

          color: #7890aa;

          font-size: 11px;
        }

        .password-footer strong {
          color: #294564;

          font-size: 12px;
        }

        /* ================= MOBILE ================= */

        @media (max-width: 600px) {

          .password-header {
            height: 68px;

            padding: 0 18px;
          }

          .password-logo {
            width: 125px;

            height: 48px;
          }

          .secure-badge {
            display: none;
          }

          .password-container {
            margin-top: 30px;
          }

          .password-card {
            padding: 25px 20px;

            border-radius: 18px;
          }

          .password-heading h1 {
            font-size: 26px;
          }

        }

      `}</style>

    </div>
  );
}