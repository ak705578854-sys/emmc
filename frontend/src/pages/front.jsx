import { useNavigate } from "react-router-dom";
import "./front.css";

export default function FrontPage() {
  const navigate = useNavigate();

  return (
    <div className="front-page">
      <div className="front-box">

        <div className="logo-container">
          <img
            src="/logo.png"
            alt="EMMC Logo"
            className="front-logo"
          />
        </div>

        <div className="front-card">
          <h2>Select your access</h2>

          <div className="action-buttons">

            <button
              type="button"
              className="auth-btn"
              onClick={() => navigate("/login")}
            >
              Log in
            </button>

            <button
              type="button"
              className="auth-btn"
              onClick={() => navigate("/signin")}
            >
              Sign in
            </button>

          </div>
        </div>

        <div className="front-footer">
          <b>Authorized Access Only</b>
          <br />
          Hospitals | Ambulance Crew | Police Officers | Patients
        </div>

      </div>
    </div>
  );
}
