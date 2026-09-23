import React from "react";
import { useNavigate } from "react-router-dom";

import "./signin.css";

export default function SignInPage() {
  const navigate = useNavigate();

  return (
    <div className="signin-page">

      {/* EMMC LOGO */}
      <div className="signin-logo-container">
        <img
          src="/logo.png"
          alt="EMMC Logo"
          className="signin-logo"
        />
      </div>

      {/* ACCESS CARD */}
      <div className="signin-card">

        <h2>Sign in as</h2>

        <div className="signin-options">

          {/* PATIENT */}
          <button
            type="button"
            className="signin-option"
            onClick={() => navigate("/patient-registration")}
          >
            <div className="option-icon patient-icon">
              P
            </div>

            <span>
              Sign in as Patient
            </span>

            <div className="option-arrow">
              →
            </div>
          </button>

          {/* LHO */}
          <button
            type="button"
            className="signin-option"
            onClick={() => navigate("/lho-registration")}
          >
            <div className="option-icon lho-icon">
              L
            </div>

            <span>
              Sign in as Local Health Organization
            </span>

            <div className="option-arrow">
              →
            </div>
          </button>

          {/* HOSPITAL */}
          <button
            type="button"
            className="signin-option"
            onClick={() => navigate("/hospital-registration")}
          >
            <div className="option-icon hospital-icon">
              H
            </div>

            <span>
              Sign in as Hospital
            </span>

            <div className="option-arrow">
              →
            </div>
          </button>

        </div>

      </div>

    </div>
  );
}