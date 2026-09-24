import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

/*
=========================================================
FIXED AMBULANCE CREDENTIALS
=========================================================

ID:
AMB123456

PASSWORD:
AMB@123
*/

const FIXED_AMBULANCE_ID = "AMB123456";
const FIXED_AMBULANCE_PASSWORD = "AMB@123";


/*
=========================================================
FIXED POLICE CREDENTIALS
=========================================================

ID:
POL123456

PASSWORD:
POL@123
*/

const FIXED_POLICE_ID = "POL123456";
const FIXED_POLICE_PASSWORD = "POL@123";


/*
=========================================================
DETECT ROLE FROM ID
=========================================================
*/

const detectRole = (id) => {
  const value = id.trim().toUpperCase();

  if (value.startsWith("PAT")) {
    return "patient";
  }

  if (value.startsWith("LHO")) {
    return "lho";
  }

  if (value.startsWith("HOS")) {
    return "hospital";
  }

  if (value.startsWith("AMB")) {
    return "ambulance";
  }

  if (value.startsWith("DOC")) {
    return "doctor";
  }

  if (value.startsWith("POL")) {
    return "police";
  }

  return "";
};


/*
=========================================================
ROLE DISPLAY NAME
=========================================================
*/

const getRoleName = (role) => {
  switch (role) {
    case "patient":
      return "Patient";

    case "lho":
      return "Local Health Organization";

    case "hospital":
      return "Hospital";

    case "ambulance":
      return "Ambulance Crew";

    case "doctor":
      return "Doctor";

    case "police":
      return "Police";

    default:
      return "";
  }
};


/*
=========================================================
NORMALIZE ID

Accepts:

PAT123456
PAT-123456

LHO123456
LHO-123456

HOS123456
HOS-123456

AMB123456
AMB-123456

DOC123456
DOC-123456

POL123456
POL-123456
=========================================================
*/

const normalizeId = (id) => {
  let value = id.trim().toUpperCase();


  if (/^PAT\d{6}$/.test(value)) {
    value = `PAT-${value.slice(3)}`;
  }


  if (/^LHO\d{6}$/.test(value)) {
    value = `LHO-${value.slice(3)}`;
  }


  if (/^HOS\d{6}$/.test(value)) {
    value = `HOS-${value.slice(3)}`;
  }


  if (/^AMB\d{6}$/.test(value)) {
    value = `AMB-${value.slice(3)}`;
  }


  if (/^DOC\d{6}$/.test(value)) {
    value = `DOC-${value.slice(3)}`;
  }


  if (/^POL\d{6}$/.test(value)) {
    value = `POL-${value.slice(3)}`;
  }


  return value;
};


/*
=========================================================
BACKEND LOGIN ENDPOINT
=========================================================
*/

const getLoginEndpoint = (role) => {
  switch (role) {

    case "patient":
      return "/api/patients/login";

    case "lho":
      return "/api/lho/login";

    case "hospital":
      return "/api/hospitals/login";

    case "doctor":
      return "/api/auth/login";

    default:
      return "";
  }
};


/*
=========================================================
DASHBOARD ROUTE
=========================================================
*/

const getDashboard = (role) => {
  switch (role) {

    case "patient":
      return "/patient";

    case "lho":
      return "/lho";

    case "hospital":
      return "/hospital";

    case "ambulance":
      return "/driver";

    case "doctor":
      return "/doctor";

    case "police":
      return "/police";

    default:
      return "/";
  }
};


/*
=========================================================
LOGIN PAGE
=========================================================
*/

export default function LoginPage() {

  const navigate = useNavigate();


  const [loginId, setLoginId] =
    useState("");


  const [password, setPassword] =
    useState("");


  const [showPassword, setShowPassword] =
    useState(false);


  const [loading, setLoading] =
    useState(false);


  const [error, setError] =
    useState("");


  const detectedRole =
    detectRole(loginId);


  /*
  =======================================================
  HANDLE LOGIN
  =======================================================
  */

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");


    /*
    -------------------------------------------------------
    CLEAN ID
    -------------------------------------------------------
    */

    const cleanId =
      normalizeId(loginId);


    const role =
      detectRole(cleanId);


    /*
    -------------------------------------------------------
    BASIC VALIDATION
    -------------------------------------------------------
    */

    if (!cleanId) {

      setError(
        "Please enter your Login ID."
      );

      return;
    }


    if (!password) {

      setError(
        "Please enter your password."
      );

      return;
    }


    if (!role) {

      setError(
        "Invalid Login ID. Use PAT, LHO, HOS, AMB, DOC or POL."
      );

      return;
    }


    /*
    =======================================================
    FIXED AMBULANCE LOGIN
    =======================================================
    */

    if (role === "ambulance") {

      /*
      IMPORTANT:
      normalizeId converts AMB123456
      into AMB-123456.

      Therefore compare both forms.
      */

      const enteredAmbulanceId =
        cleanId.replace("-", "");


      const fixedAmbulanceId =
        FIXED_AMBULANCE_ID.replace("-", "");


      if (
        enteredAmbulanceId ===
          fixedAmbulanceId &&
        password ===
          FIXED_AMBULANCE_PASSWORD
      ) {

        /*
        SAVE SESSION
        */

        const ambulanceUser = {
          id: FIXED_AMBULANCE_ID,
          userId: FIXED_AMBULANCE_ID,
          role: "ambulance",
          name: "Ambulance Crew",
        };


        localStorage.setItem(
          "user",
          JSON.stringify(
            ambulanceUser
          )
        );


        localStorage.setItem(
          "emmcSession",
          JSON.stringify({
            loginId:
              FIXED_AMBULANCE_ID,

            role:
              "ambulance",

            loggedIn:
              true,

            user:
              ambulanceUser,
          })
        );


        /*
        GO TO AMBULANCE DASHBOARD
        */

        navigate(
          "/driver",
          {
            replace: true,
          }
        );


        return;
      }


      /*
      WRONG AMB CREDENTIALS
      */

      setError(
        "Invalid Ambulance ID or password."
      );

      return;
    }


    /*
    =======================================================
    FIXED POLICE LOGIN
    =======================================================
    */

    if (role === "police") {

      const enteredPoliceId =
        cleanId.replace("-", "");


      const fixedPoliceId =
        FIXED_POLICE_ID.replace("-", "");


      if (
        enteredPoliceId ===
          fixedPoliceId &&
        password ===
          FIXED_POLICE_PASSWORD
      ) {

        /*
        SAVE SESSION
        */

        const policeUser = {
          id: FIXED_POLICE_ID,
          userId: FIXED_POLICE_ID,
          role: "police",
          name: "Police Officer",
        };


        localStorage.setItem(
          "user",
          JSON.stringify(
            policeUser
          )
        );


        localStorage.setItem(
          "emmcSession",
          JSON.stringify({
            loginId:
              FIXED_POLICE_ID,

            role:
              "police",

            loggedIn:
              true,

            user:
              policeUser,
          })
        );


        /*
        GO TO POLICE DASHBOARD
        */

        navigate(
          "/police",
          {
            replace: true,
          }
        );


        return;
      }


      /*
      WRONG POLICE CREDENTIALS
      */

      setError(
        "Invalid Police ID or password."
      );

      return;
    }


    /*
    =======================================================
    PATIENT / LHO / HOSPITAL / DOCTOR
    BACKEND LOGIN
    =======================================================
    */

    try {

      setLoading(true);


      /*
      -----------------------------------------------------
      GET API ENDPOINT
      -----------------------------------------------------
      */

      const endpoint =
        getLoginEndpoint(role);


      if (!endpoint) {

        setError(
          "Login service is not available."
        );

        return;
      }


      /*
      -----------------------------------------------------
      REQUEST BODY
      -----------------------------------------------------
      */

      let body;


      /*
      PATIENT
      */

      if (role === "patient") {

        body = {

          patientId:
            cleanId,

          userId:
            cleanId,

          password:
            password,

          role:
            "Patient",
        };
      }


      /*
      LHO
      */

      else if (role === "lho") {

        body = {

          lhoId:
            cleanId,

          userId:
            cleanId,

          password:
            password,
        };
      }


      /*
      HOSPITAL
      */

      else if (role === "hospital") {

        body = {

          hospitalId:
            cleanId,

          userId:
            cleanId,

          password:
            password,
        };
      }


      /*
      DOCTOR
      */

      else if (role === "doctor") {

        body = {

          userId:
            cleanId,

          password:
            password,

          role:
            "doctor",
        };
      }


      /*
      -----------------------------------------------------
      DEBUG
      -----------------------------------------------------
      */

      console.log(
        "[EMMC LOGIN]",
        {
          role,
          loginId:
            cleanId,
          endpoint,
        }
      );


      /*
      -----------------------------------------------------
      API REQUEST
      -----------------------------------------------------
      */

      const response =
        await fetch(
          endpoint.startsWith("http") ? endpoint : `https://emmc-push-backend.onrender.com${endpoint}`,
          {

            method:
              "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            credentials:
              "include",

            body:
              JSON.stringify(
                body
              ),
          }
        );


      /*
      -----------------------------------------------------
      READ RESPONSE
      -----------------------------------------------------
      */

      let data = {};


      try {

        data =
          await response.json();

      } catch {

        data = {};

      }


      console.log(
        "[EMMC LOGIN RESPONSE]",
        data
      );


      /*
      -----------------------------------------------------
      LOGIN FAILED
      -----------------------------------------------------
      */

      if (!response.ok) {

        throw new Error(
          data?.message ||
          data?.error ||
          "Invalid Login ID or password."
        );
      }


      /*
      =====================================================
      SAVE TOKEN
      =====================================================
      */

      if (data?.token) {

        localStorage.setItem(
          "token",
          data.token
        );
      }


      /*
      =====================================================
      SAVE USER
      =====================================================
      */

      if (data?.user) {

        localStorage.setItem(
          "user",
          JSON.stringify(
            data.user
          )
        );
      }


      /*
      =====================================================
      SAVE SESSION
      =====================================================
      */

      localStorage.setItem(
        "emmcSession",
        JSON.stringify({

          loginId:
            cleanId,

          role:
            role,

          loggedIn:
            true,

          user:
            data?.user || null,
        })
      );


      /*
      =====================================================
      ROLE SPECIFIC DATA
      =====================================================
      */

      if (
        role === "patient" &&
        data?.user
      ) {

        localStorage.setItem(
          "patientAccount",

          JSON.stringify(
            data.user
          )
        );
      }


      if (
        role === "lho" &&
        data?.user
      ) {

        localStorage.setItem(
          "lhoAccount",

          JSON.stringify(
            data.user
          )
        );
      }


      if (
        role === "hospital" &&
        data?.user
      ) {

        localStorage.setItem(
          "hospitalAccount",

          JSON.stringify(
            data.user
          )
        );
      }


      /*
      =====================================================
      OPEN DASHBOARD
      =====================================================
      */

      const dashboard =
        getDashboard(role);


      console.log(
        `[EMMC] Login successful → ${dashboard}`
      );


      navigate(
        dashboard,
        {
          replace:
            true,
        }
      );

    }


    /*
    =======================================================
    ERROR
    =======================================================
    */

    catch (err) {

      console.error(
        "[EMMC LOGIN ERROR]",
        err
      );


      setError(
        err?.message ||
        "Unable to connect to EMMC server."
      );

    }


    /*
    =======================================================
    FINALLY
    =======================================================
    */

    finally {

      setLoading(false);

    }

  };


  /*
  =========================================================
  UI
  =========================================================
  */

  return (

    <div className="login-page">


      {/* BACKGROUND */}

      <div className="login-overlay" />

      <div className="login-glow login-glow-one" />

      <div className="login-glow login-glow-two" />


      {/* =================================================
          HEADER
      ================================================= */}

      <header className="login-header">

        <button
          type="button"

          className=
            "header-logo-button"

          onClick={() =>
            navigate("/")
          }

          aria-label=
            "Go to EMMC home"
        >

          <div
            className=
              "header-logo-container"
          >

            <img
              src="/logo.png"

              alt="EMMC"

              className=
                "header-logo"
            />

          </div>

        </button>


        <div
          className=
            "secure-network"
        >

          <span
            className=
              "secure-dot"
          />

          SECURE EMERGENCY NETWORK

        </div>

      </header>


      {/* =================================================
          MAIN
      ================================================= */}

      <main
        className=
          "login-main"
      >

        <section
          className=
            "login-card"
        >


          {/* CARD HEADER */}

          <div
            className=
              "card-header"
          >

            <div
              className=
                "card-logo-box"
            >

              <img
                src="/logo.png"

                alt="EMMC"

                className=
                  "card-logo"
              />

            </div>


            <div>

              <div
                className=
                  "portal-label"
              >
                EMMC ACCESS PORTAL
              </div>


              <h1>
                Welcome Back
              </h1>


              <p>
                Sign in to your EMMC account
              </p>

            </div>

          </div>


          <div
            className=
              "divider"
          />


          {/* =================================================
              LOGIN FORM
          ================================================= */}

          <form
            className=
              "login-form"

            onSubmit=
              {handleSubmit}
          >


            {/* LOGIN ID */}

            <div
              className=
                "field-group"
            >

              <label
                htmlFor="loginId"
              >
                Login ID
              </label>


              <div
                className=
                  "input-container"
              >

                <span
                  className=
                    "input-icon"
                >
                  ID
                </span>


                <input
                  id="loginId"

                  type="text"

                  value=
                    {loginId}

                  onChange={(e) => {

                    setLoginId(
                      e.target.value
                    );

                    setError("");

                  }}

                  placeholder=
                    "Enter your EMMC ID"

                  autoComplete=
                    "username"

                  disabled=
                    {loading}
                />

              </div>


              <small>
                PAT / LHO / HOS / AMB / DOC / POL
              </small>

            </div>


            {/* =================================================
                DETECTED ROLE
            ================================================= */}

            {detectedRole && (

              <div
                className=
                  "detected-role"
              >

                <div
                  className=
                    "role-check"
                >
                  ✓
                </div>


                <div
                  className=
                    "role-info"
                >

                  <span>
                    Detected Service
                  </span>


                  <strong>
                    {getRoleName(
                      detectedRole
                    )}
                  </strong>

                </div>

              </div>

            )}


            {/* =================================================
                PASSWORD
            ================================================= */}

            <div
              className=
                "field-group"
            >

              <label
                htmlFor="password"
              >
                Password
              </label>


              <div
                className=
                  "input-container"
              >

                <span
                  className=
                    "input-icon password-icon"
                >
                  ••
                </span>


                <input
                  id="password"

                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }

                  value=
                    {password}

                  onChange={(e) => {

                    setPassword(
                      e.target.value
                    );

                    setError("");

                  }}

                  placeholder=
                    "Enter your password"

                  autoComplete=
                    "current-password"

                  disabled=
                    {loading}
                />


                <button
                  type="button"

                  className=
                    "show-password"

                  onClick={() =>
                    setShowPassword(
                      (previous) =>
                        !previous
                    )
                  }
                >

                  {showPassword
                    ? "Hide"
                    : "Show"}

                </button>

              </div>

            </div>


            {/* =================================================
                ERROR
            ================================================= */}

            {error && (

              <div
                className=
                  "login-error"
              >

                <span
                  className=
                    "error-icon"
                >
                  !
                </span>


                <span>
                  {error}
                </span>

              </div>

            )}


            {/* =================================================
                LOGIN BUTTON
            ================================================= */}

            <button
              type="submit"

              className=
                "login-button"

              disabled=
                {loading}
            >

              {loading ? (

                <>

                  <span
                    className=
                      "spinner"
                  />

                  Signing In...

                </>

              ) : (

                <>

                  Sign In

                  <span
                    className=
                      "arrow"
                  >
                    →
                  </span>

                </>

              )}

            </button>

          </form>


          {/* BACK */}

          <button
            type="button"

            className=
              "back-button"

            onClick={() =>
              navigate("/")
            }
          >
            ← Back to Access Page
          </button>


          {/* SECURITY */}

          <div
            className=
              "security-note"
          >
            🔒 Secure EMMC Network
          </div>

        </section>

      </main>
      {/* QUICK ACCESS CREDENTIALS */}
<div className="quick-credentials">
  <div className="quick-credentials-title">
    DEMO ID/PASSWORD
  </div>

  <div className="credential-row">
    <span className="credential-role">🚑 Ambulance</span>
    <span>ID: AMB123456</span>
    <span>Password: AMB@123</span>
  </div>

  <div className="credential-row">
    <span className="credential-role">👮 Police</span>
    <span>ID: POL123456</span>
    <span>Password: POL@123</span>
  </div>
</div>

    </div>
  );
}
