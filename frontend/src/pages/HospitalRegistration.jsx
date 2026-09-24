import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const STEPS = [
  "Organization",
  "Legal Registration",
  "Authorized Representative",
  "Supporting Details",
  "Emergency Services",
  "Review & Submit",
];

const initialForm = {
  // STEP 1
  organizationName: "",
  organizationType: "",
  address: "",
  state: "",
  district: "",
  pincode: "",
  website: "",
  phone1: "",
  phone2: "",
  email: "",

  // STEP 2
  registrationNumber: "",
  registrationAuthority: "",
  registrationDate: "",
  registrationValidityDate: "",

  // STEP 3
  representativeName: "",
  representativeDesignation: "",
  representativePhone: "",
  representativeEmail: "",
  representativeRole: "",
  representativeAuthorized: false,

  // STEP 4
  gstRegistered: "",
  gstNumber: "",
  panNumber: "",
  panLegalName: "",

  // STEP 5
  emergencyPhone: "",
  emergencyContactPerson: "",
  triagePhone: "",
  ambulanceFleetSize: "",
};

export default function HospitalRegistration() {
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(0);

  const [form, setForm] = useState(initialForm);

  const [files, setFiles] = useState({
    registrationCertificate: null,
    authorizationLetter: null,
  });

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const [registrationSuccess, setRegistrationSuccess] =
    useState(false);

  const [hospitalId, setHospitalId] = useState("");

  const [hospitalData, setHospitalData] = useState(null);

  // =====================================================
  // HANDLE INPUT
  // =====================================================

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setError("");
  };

  // =====================================================
  // HANDLE FILE
  // =====================================================

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files?.[0] || null;

    setFiles((prev) => ({
      ...prev,
      [fieldName]: file,
    }));

    setError("");
  };

  // =====================================================
  // VALIDATE CURRENT STEP
  // =====================================================

  const validateStep = () => {
    // DEMO MODE: every field is optional.
    // The user can move through all six steps without
    // filling any field. Production validation can be
    // enabled later when the final form is ready.
    setError("");
    return true;
  };

  // =====================================================
  // NEXT
  // =====================================================

  const handleNext = () => {
    if (!validateStep()) {
      return;
    }

    if (currentStep < STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  // =====================================================
  // BACK
  // =====================================================

  const handleBack = () => {
    setError("");

    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  // =====================================================
  // SUBMIT REGISTRATION
  // =====================================================

  const handleSubmit = async () => {
    if (loading) {
      return;
    }

    setError("");
    setLoading(true);

    try {
      const payload = {
        ...form,

        ambulanceFleetSize: form.ambulanceFleetSize
          ? Number(form.ambulanceFleetSize)
          : 0,

        authorizedRepresentative: {
          name: form.representativeName,
          designation: form.representativeDesignation,
          phone: form.representativePhone,
          email: form.representativeEmail,
          role: form.representativeRole,
        },
      };

      const response = await fetch("https://emmc-push-backend.onrender.com/api/hospitals/register", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message ||
            data?.error ||
            "Hospital registration failed."
        );
      }

      const generatedId =
        data?.hospital?.hospitalId ||
        data?.hospitalId ||
        data?.data?.hospitalId;

      if (!generatedId) {
        throw new Error(
          "Registration completed but Hospital ID was not received."
        );
      }

      // Save data for Create Password page
      localStorage.setItem(
        "pendingHospitalId",
        generatedId
      );

      localStorage.setItem(
        "pendingHospitalData",
        JSON.stringify(data?.hospital || {})
      );

      // Store success information
      setHospitalId(generatedId);

      setHospitalData(data?.hospital || {});

      /*
        IMPORTANT:
        We do NOT navigate automatically here.

        The success screen stays visible until
        the user clicks "Continue to Create Password".
      */
      setRegistrationSuccess(true);
    } catch (err) {
      console.error(
        "Hospital registration error:",
        err
      );

      setError(
        err?.message ||
          "Unable to submit hospital registration."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // CREATE PASSWORD BUTTON
  // =====================================================

  const handleCreatePassword = () => {
    navigate("/hospital-create-password", {
      replace: true,
    });
  };

  // =====================================================
  // SUCCESS SCREEN
  // =====================================================

  if (registrationSuccess) {
    return (
      <>
        <style>{styles}</style>

        <div className="hospital-page">
          <header className="hospital-header">
            <div className="hospital-brand">
              <img
                src="/logo.png"
                alt="EMMC Logo"
                className="hospital-logo"
              />

              <div>
                <div className="brand-title">
                  EMMC
                </div>

                <div className="brand-subtitle">
                  Emergency Mobility Management &
                  Coordination System
                </div>
              </div>
            </div>

            <div className="header-secure">
              🔒 Secure Registration
            </div>
          </header>

          <main className="success-wrapper">
            <div className="success-card">
              <div className="success-icon">
                ✓
              </div>

              <div className="success-label">
                REGISTRATION COMPLETE
              </div>

              <h1>
                Hospital Registration Successful
              </h1>

              <p className="success-message">
                Your hospital registration has been
                successfully submitted.
              </p>

              <div className="hospital-id-box">
                <span>
                  Your Hospital ID
                </span>

                <strong>
                  {hospitalId}
                </strong>

                <small>
                  Keep this ID safe. You will use it
                  to create your password and login.
                </small>
              </div>

              <div className="success-info">
                <div className="info-row">
                  <span>
                    Organization
                  </span>

                  <strong>
                    {hospitalData?.organizationName ||
                      form.organizationName}
                  </strong>
                </div>

                <div className="info-row">
                  <span>
                    Email
                  </span>

                  <strong>
                    {hospitalData?.email ||
                      form.email}
                  </strong>
                </div>

                <div className="info-row">
                  <span>
                    Status
                  </span>

                  <strong className="status">
                    Registration Submitted
                  </strong>
                </div>
              </div>

              <div className="next-step-box">
                <div className="next-step-icon">
                  2
                </div>

                <div>
                  <h3>
                    Next: Create Your Password
                  </h3>

                  <p>
                    Your Hospital ID has been generated.
                    Continue to the next page to create
                    your secure account password.
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="primary-button success-button"
                onClick={handleCreatePassword}
              >
                Continue to Create Password
                <span>→</span>
              </button>
            </div>
          </main>
        </div>
      </>
    );
  }

  // =====================================================
  // REGISTRATION PAGE
  // =====================================================

  return (
    <>
      <style>{styles}</style>

      <div className="hospital-page">
        {/* HEADER */}

        <header className="hospital-header">
          <div className="hospital-brand">
            <button
              type="button"
              className="logo-button"
              onClick={() => navigate("/")}
            >
              <img
                src="/logo.png"
                alt="EMMC Logo"
                className="hospital-logo"
              />
            </button>

            <div>
              <div className="brand-title">
                EMMC
              </div>

              <div className="brand-subtitle">
                Emergency Mobility Management &
                Coordination System
              </div>
            </div>
          </div>

          <div className="header-secure">
            🔒 Secure Registration
          </div>
        </header>

        {/* MAIN */}

        <main className="registration-container">
          <div className="registration-card">
            {/* HEADING */}

            <div className="registration-heading">
              <div className="heading-badge">
                HOSPITAL PORTAL
              </div>

              <h1>
                Hospital Organization Registration
              </h1>

              <p>
                Register your hospital or healthcare
                organization with EMMC.
              </p>
            </div>

            {/* PROGRESS */}

            <div className="progress-container">
              {STEPS.map((step, index) => (
                <div
                  key={step}
                  className={`progress-item ${
                    index === currentStep
                      ? "active"
                      : index < currentStep
                      ? "completed"
                      : ""
                  }`}
                >
                  <div className="progress-circle">
                    {index < currentStep
                      ? "✓"
                      : index + 1}
                  </div>

                  <span>
                    {step}
                  </span>
                </div>
              ))}
            </div>

            {/* STEP COUNTER */}

            <div className="step-counter">
              Step {currentStep + 1} of {STEPS.length}
            </div>

            {/* ERROR */}

            {error && (
              <div className="error-box">
                <span>⚠</span>

                <span>{error}</span>
              </div>
            )}

            {/* =================================================
                STEP 1
            ================================================= */}

            {currentStep === 0 && (
              <section>
                <SectionTitle
                  number="01"
                  title="Organization Details"
                />

                <div className="form-grid">
                  <Input
                    label="Hospital / Organization Name"
                    name="organizationName"
                    value={form.organizationName}
                    onChange={handleChange}
                    placeholder="Enter hospital name"
                  />

                  <Select
                    label="Organization Type"
                    name="organizationType"
                    value={form.organizationType}
                    onChange={handleChange}
                    options={[
                      "Government Hospital",
                      "Private Hospital",
                      "Public Hospital",
                      "Medical College Hospital",
                      "Clinic",
                      "Diagnostic Centre",
                      "Other",
                    ]}
                  />

                  <div className="form-group full-width">
                    <label>
                      Full Address
                    </label>

                    <textarea
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      rows="4"
                      placeholder="Enter complete hospital address"
                    />
                  </div>

                  <Input
                    label="State"
                    name="state"
                    value={form.state}
                    onChange={handleChange}
                    placeholder="Enter state"
                  />

                  <Input
                    label="District"
                    name="district"
                    value={form.district}
                    onChange={handleChange}
                    placeholder="Enter district"
                  />

                  <Input
                    label="PIN Code"
                    name="pincode"
                    value={form.pincode}
                    onChange={handleChange}
                    placeholder="Enter PIN code"
                  />

                  <Input
                    label="Official Website"
                    name="website"
                    value={form.website}
                    onChange={handleChange}
                    placeholder="https://example.com"
                  />

                  <Input
                    label="Official Phone"
                    name="phone1"
                    value={form.phone1}
                    onChange={handleChange}
                    placeholder="Enter official phone"
                  />

                  <Input
                    label="Alternate Phone"
                    name="phone2"
                    value={form.phone2}
                    onChange={handleChange}
                    placeholder="Enter alternate phone"
                  />

                  <Input
                    label="Official Email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="hospital@example.com"
                  />
                </div>
              </section>
            )}

            {/* =================================================
                STEP 2
            ================================================= */}

            {currentStep === 1 && (
              <section>
                <SectionTitle
                  number="02"
                  title="Legal Registration"
                />

                <div className="form-grid">
                  <Input
                    label="Registration Number"
                    name="registrationNumber"
                    value={form.registrationNumber}
                    onChange={handleChange}
                    placeholder="Enter registration number"
                  />

                  <Input
                    label="Registration Authority"
                    name="registrationAuthority"
                    value={form.registrationAuthority}
                    onChange={handleChange}
                    placeholder="Enter registration authority"
                  />

                  <Input
                    label="Registration Date"
                    name="registrationDate"
                    type="date"
                    value={form.registrationDate}
                    onChange={handleChange}
                  />

                  <Input
                    label="Registration Validity Date"
                    name="registrationValidityDate"
                    type="date"
                    value={form.registrationValidityDate}
                    onChange={handleChange}
                  />

                  <div className="upload-box full-width">
                    <label>
                      Registration Certificate
                    </label>

                    <div className="file-input-wrapper">
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) =>
                          handleFileChange(
                            e,
                            "registrationCertificate"
                          )
                        }
                      />
                    </div>

                    {files.registrationCertificate && (
                      <small>
                        ✓{" "}
                        {
                          files.registrationCertificate
                            .name
                        }
                      </small>
                    )}
                  </div>
                </div>
              </section>
            )}

            {/* =================================================
                STEP 3
            ================================================= */}

            {currentStep === 2 && (
              <section>
                <SectionTitle
                  number="03"
                  title="Authorized Representative"
                />

                <div className="form-grid">
                  <Input
                    label="Representative Name"
                    name="representativeName"
                    value={form.representativeName}
                    onChange={handleChange}
                    placeholder="Full name"
                  />

                  <Input
                    label="Designation"
                    name="representativeDesignation"
                    value={form.representativeDesignation}
                    onChange={handleChange}
                    placeholder="e.g. Hospital Administrator"
                  />

                  <Input
                    label="Phone Number"
                    name="representativePhone"
                    value={form.representativePhone}
                    onChange={handleChange}
                    placeholder="Phone number"
                  />

                  <Input
                    label="Email"
                    name="representativeEmail"
                    type="email"
                    value={form.representativeEmail}
                    onChange={handleChange}
                    placeholder="Representative email"
                  />

                  <Input
                    label="Role"
                    name="representativeRole"
                    value={form.representativeRole}
                    onChange={handleChange}
                    placeholder="Role / authority"
                  />

                  <div className="upload-box">
                    <label>
                      Authorization Letter
                    </label>

                    <div className="file-input-wrapper">
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) =>
                          handleFileChange(
                            e,
                            "authorizationLetter"
                          )
                        }
                      />
                    </div>

                    {files.authorizationLetter && (
                      <small>
                        ✓{" "}
                        {
                          files.authorizationLetter
                            .name
                        }
                      </small>
                    )}
                  </div>

                  <label className="checkbox-row full-width">
                    <input
                      type="checkbox"
                      name="representativeAuthorized"
                      checked={
                        form.representativeAuthorized
                      }
                      onChange={handleChange}
                    />

                    <span>
                      I confirm that I am authorized
                      to register this organization
                      with EMMC.
                    </span>
                  </label>
                </div>
              </section>
            )}

            {/* =================================================
                STEP 4
            ================================================= */}

            {currentStep === 3 && (
              <section>
                <SectionTitle
                  number="04"
                  title="Supporting Details"
                />

                <div className="form-grid">
                  <Select
                    label="GST Registered"
                    name="gstRegistered"
                    value={form.gstRegistered}
                    onChange={handleChange}
                    options={[
                      "Yes",
                      "No",
                    ]}
                  />

                  <Input
                    label="GST Number"
                    name="gstNumber"
                    value={form.gstNumber}
                    onChange={handleChange}
                    placeholder="Enter GST number"
                  />

                  <Input
                    label="PAN Number"
                    name="panNumber"
                    value={form.panNumber}
                    onChange={handleChange}
                    placeholder="Enter PAN number"
                  />

                  <Input
                    label="PAN Legal Name"
                    name="panLegalName"
                    value={form.panLegalName}
                    onChange={handleChange}
                    placeholder="Name as per PAN"
                  />
                </div>
              </section>
            )}

            {/* =================================================
                STEP 5
            ================================================= */}

            {currentStep === 4 && (
              <section>
                <SectionTitle
                  number="05"
                  title="Emergency Services"
                />

                <div className="form-grid">
                  <Input
                    label="Emergency / Control Room Phone"
                    name="emergencyPhone"
                    value={form.emergencyPhone}
                    onChange={handleChange}
                    placeholder="Emergency phone"
                  />

                  <Input
                    label="Emergency Contact Person"
                    name="emergencyContactPerson"
                    value={form.emergencyContactPerson}
                    onChange={handleChange}
                    placeholder="Contact person"
                  />

                  <Input
                    label="Triage Phone"
                    name="triagePhone"
                    value={form.triagePhone}
                    onChange={handleChange}
                    placeholder="Triage contact number"
                  />

                  <Input
                    label="Ambulance Fleet Size"
                    name="ambulanceFleetSize"
                    type="number"
                    min="0"
                    value={form.ambulanceFleetSize}
                    onChange={handleChange}
                    placeholder="Number of ambulances"
                  />
                </div>
              </section>
            )}

            {/* =================================================
                STEP 6 - REVIEW
            ================================================= */}

            {currentStep === 5 && (
              <section>
                <SectionTitle
                  number="06"
                  title="Review & Submit"
                />

                <div className="review-grid">
                  <ReviewItem
                    label="Organization"
                    value={form.organizationName}
                  />

                  <ReviewItem
                    label="Organization Type"
                    value={form.organizationType}
                  />

                  <ReviewItem
                    label="Address"
                    value={form.address}
                  />

                  <ReviewItem
                    label="State"
                    value={form.state}
                  />

                  <ReviewItem
                    label="District"
                    value={form.district}
                  />

                  <ReviewItem
                    label="PIN Code"
                    value={form.pincode}
                  />

                  <ReviewItem
                    label="Official Phone"
                    value={form.phone1}
                  />

                  <ReviewItem
                    label="Official Email"
                    value={form.email}
                  />

                  <ReviewItem
                    label="Registration Number"
                    value={form.registrationNumber}
                  />

                  <ReviewItem
                    label="Registration Authority"
                    value={form.registrationAuthority}
                  />

                  <ReviewItem
                    label="Representative"
                    value={form.representativeName}
                  />

                  <ReviewItem
                    label="Representative Designation"
                    value={
                      form.representativeDesignation
                    }
                  />

                  <ReviewItem
                    label="Representative Phone"
                    value={form.representativePhone}
                  />

                  <ReviewItem
                    label="Emergency Phone"
                    value={form.emergencyPhone}
                  />

                  <ReviewItem
                    label="Emergency Contact"
                    value={
                      form.emergencyContactPerson
                    }
                  />

                  <ReviewItem
                    label="Ambulance Fleet"
                    value={
                      form.ambulanceFleetSize ||
                      "0"
                    }
                  />
                </div>

                <div className="final-note">
                  <div className="final-note-icon">
                    ✓
                  </div>

                  <div>
                    <strong>
                      Ready to Submit
                    </strong>

                    <p>
                      Please verify all the information
                      above before submitting. After
                      successful registration, EMMC will
                      generate your Hospital ID. You will
                      then be taken to the Create Password
                      page.
                    </p>
                  </div>
                </div>
              </section>
            )}

            {/* NAVIGATION */}

            <div className="navigation-buttons">
              {currentStep > 0 && (
                <button
                  type="button"
                  className="secondary-button"
                  onClick={handleBack}
                  disabled={loading}
                >
                  ← Back
                </button>
              )}

              {currentStep < STEPS.length - 1 && (
                <button
                  type="button"
                  className="primary-button"
                  onClick={handleNext}
                  disabled={loading}
                >
                  Continue
                  <span>→</span>
                </button>
              )}

              {currentStep === STEPS.length - 1 && (
                <button
                  type="button"
                  className="primary-button submit-button"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading
                    ? "Submitting..."
                    : "Submit Registration"}

                  {!loading && <span>→</span>}
                </button>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

// =====================================================
// SECTION TITLE
// =====================================================

function SectionTitle({ number, title }) {
  return (
    <div className="section-title">
      <div className="section-number">
        {number}
      </div>

      <div>
        <h2>{title}</h2>

        <div className="section-line" />
      </div>
    </div>
  );
}

// =====================================================
// INPUT
// =====================================================

function Input({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder = "",
  min,
}) {
  return (
    <div className="form-group">
      <label htmlFor={name}>
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        min={min}
      />
    </div>
  );
}

// =====================================================
// SELECT
// =====================================================

function Select({
  label,
  name,
  value,
  onChange,
  options,
}) {
  return (
    <div className="form-group">
      <label htmlFor={name}>
        {label}
      </label>

      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
      >
        <option value="">
          Select {label}
        </option>

        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

// =====================================================
// REVIEW ITEM
// =====================================================

function ReviewItem({ label, value }) {
  return (
    <div className="review-item">
      <span>{label}</span>

      <strong>
        {value || "Not provided"}
      </strong>
    </div>
  );
}

// =====================================================
// CSS
// =====================================================

const styles = `
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family:
    Inter,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;
}

.hospital-page {
  min-height: 100vh;

  background:
    linear-gradient(
      rgba(5, 25, 55, 0.72),
      rgba(5, 25, 55, 0.72)
    ),
    url("/background.jpeg") center / cover fixed no-repeat;

  color: #0f172a;
}

/* =====================================================
   HEADER
===================================================== */

.hospital-header {
  min-height: 78px;

  padding: 0 35px;

  background: rgba(255, 255, 255, 0.97);

  border-bottom: 1px solid #e2e8f0;

  display: flex;
  align-items: center;
  justify-content: space-between;

  box-shadow:
    0 2px 10px rgba(0, 0, 0, 0.08);
}

.hospital-brand {
  display: flex;
  align-items: center;
  gap: 14px;
}

.logo-button {
  border: none;
  background: transparent;
  padding: 0;
  cursor: pointer;
}

.hospital-logo {
  width: 150px;
  height: 48px;

  object-fit: contain;
  object-position: left center;

  filter:
    drop-shadow(
      0 2px 4px rgba(0, 0, 0, 0.14)
    );
}

.brand-title {
  font-size: 14px;
  font-weight: 900;
  color: #0f172a;
}

.brand-subtitle {
  font-size: 10px;
  color: #94a3b8;
  font-weight: 600;
  margin-top: 2px;
}

.header-secure {
  color: #047857;

  background: #ecfdf5;

  border: 1px solid #a7f3d0;

  border-radius: 999px;

  padding: 7px 13px;

  font-size: 10px;

  font-weight: 800;
}

/* =====================================================
   CONTAINER
===================================================== */

.registration-container {
  width: 100%;
  max-width: 1180px;

  margin: 35px auto;

  padding: 0 20px 50px;
}

.registration-card {
  background: rgba(255, 255, 255, 0.98);

  border: 1px solid #e2e8f0;

  border-radius: 20px;

  padding: 32px;

  box-shadow:
    0 15px 50px rgba(0, 0, 0, 0.20);
}

/* =====================================================
   HEADING
===================================================== */

.registration-heading {
  text-align: center;

  margin-bottom: 30px;
}

.heading-badge {
  display: inline-block;

  padding: 5px 10px;

  border-radius: 999px;

  background: #eff6ff;

  border: 1px solid #bfdbfe;

  color: #2563eb;

  font-size: 9px;

  font-weight: 900;

  letter-spacing: 0.08em;

  margin-bottom: 10px;
}

.registration-heading h1 {
  margin: 0;

  color: #0f172a;

  font-size: 27px;

  font-weight: 900;
}

.registration-heading p {
  margin: 8px 0 0;

  color: #64748b;

  font-size: 12px;
}

/* =====================================================
   PROGRESS
===================================================== */

.progress-container {
  display: grid;

  grid-template-columns:
    repeat(6, 1fr);

  gap: 10px;

  margin-bottom: 10px;
}

.progress-item {
  text-align: center;

  color: #94a3b8;

  font-size: 10px;

  font-weight: 700;
}

.progress-circle {
  width: 36px;
  height: 36px;

  margin: 0 auto 7px;

  border-radius: 50%;

  border: 2px solid #cbd5e1;

  background: white;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 12px;

  font-weight: 900;
}

.progress-item.active {
  color: #2563eb;
}

.progress-item.active .progress-circle {
  background: #2563eb;

  border-color: #2563eb;

  color: white;

  box-shadow:
    0 4px 12px rgba(37, 99, 235, 0.25);
}

.progress-item.completed {
  color: #16a34a;
}

.progress-item.completed .progress-circle {
  background: #16a34a;

  border-color: #16a34a;

  color: white;
}

.step-counter {
  text-align: right;

  color: #94a3b8;

  font-size: 10px;

  margin-bottom: 25px;
}

/* =====================================================
   ERROR
===================================================== */

.error-box {
  display: flex;

  align-items: center;

  gap: 9px;

  padding: 12px 14px;

  margin-bottom: 22px;

  border-radius: 9px;

  background: #fef2f2;

  border: 1px solid #fecaca;

  color: #b91c1c;

  font-size: 11px;

  font-weight: 700;
}

/* =====================================================
   SECTION
===================================================== */

.section-title {
  display: flex;

  align-items: center;

  gap: 12px;

  margin-bottom: 24px;

  padding-bottom: 15px;

  border-bottom: 1px solid #e2e8f0;
}

.section-number {
  width: 40px;
  height: 40px;

  flex-shrink: 0;

  border-radius: 10px;

  background: #eff6ff;

  border: 1px solid #bfdbfe;

  color: #2563eb;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 12px;

  font-weight: 900;
}

.section-title h2 {
  margin: 0;

  font-size: 19px;

  color: #0f172a;

  font-weight: 900;
}

.section-line {
  width: 35px;

  height: 2px;

  background: #2563eb;

  margin-top: 5px;
}

/* =====================================================
   FORM
===================================================== */

.form-grid {
  display: grid;

  grid-template-columns:
    repeat(2, 1fr);

  gap: 20px;
}

.full-width {
  grid-column: 1 / -1;
}

.form-group {
  display: flex;

  flex-direction: column;

  gap: 7px;
}

.form-group label,
.upload-box label {
  color: #334155;

  font-size: 11px;

  font-weight: 800;
}

.form-group label span {
  color: #ef4444;

  margin-left: 3px;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;

  border: 1px solid #cbd5e1;

  border-radius: 9px;

  background: white;

  color: #0f172a;

  padding: 11px 12px;

  font-size: 12px;

  outline: none;

  transition: 0.2s;
}

.form-group textarea {
  resize: vertical;
  min-height: 110px;
}

.full-width textarea {
  width: 100%;
  min-height: 110px;
  resize: vertical;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  border-color: #2563eb;

  box-shadow:
    0 0 0 3px rgba(37, 99, 235, 0.10);
}

/* =====================================================
   UPLOAD
===================================================== */

.upload-box {
  display: flex;

  flex-direction: column;

  gap: 9px;

  padding: 16px;

  border: 1px dashed #94a3b8;

  border-radius: 10px;

  background: #f8fafc;
}

.file-input-wrapper {
  padding: 10px;

  border-radius: 8px;

  background: white;

  border: 1px solid #e2e8f0;
}

.upload-box input[type="file"] {
  width: 100%;

  font-size: 11px;
}

.upload-box small {
  color: #16a34a;

  font-size: 10px;

  font-weight: 700;
}

/* =====================================================
   CHECKBOX
===================================================== */

.checkbox-row {
  display: flex;

  align-items: flex-start;

  gap: 10px;

  padding: 14px;

  border-radius: 10px;

  background: #f8fafc;

  border: 1px solid #e2e8f0;

  color: #475569;

  font-size: 11px;

  line-height: 1.5;

  cursor: pointer;
}

.checkbox-row input {
  margin-top: 2px;
}

/* =====================================================
   REVIEW
===================================================== */

.review-grid {
  display: grid;

  grid-template-columns:
    repeat(2, 1fr);

  gap: 12px;
}

.review-item {
  display: flex;

  flex-direction: column;

  gap: 5px;

  padding: 13px;

  border-radius: 9px;

  background: #f8fafc;

  border: 1px solid #e2e8f0;
}

.review-item span {
  color: #94a3b8;

  font-size: 9px;

  font-weight: 800;

  text-transform: uppercase;

  letter-spacing: 0.05em;
}

.review-item strong {
  color: #0f172a;

  font-size: 11px;

  line-height: 1.5;

  word-break: break-word;
}

.final-note {
  display: flex;

  gap: 12px;

  margin-top: 20px;

  padding: 15px;

  border-radius: 10px;

  background: #eff6ff;

  border: 1px solid #bfdbfe;
}

.final-note-icon {
  width: 28px;
  height: 28px;

  flex-shrink: 0;

  border-radius: 50%;

  background: #2563eb;

  color: white;

  display: flex;

  align-items: center;
  justify-content: center;

  font-size: 12px;

  font-weight: 900;
}

.final-note strong {
  color: #1e40af;

  font-size: 11px;
}

.final-note p {
  margin: 4px 0 0;

  color: #475569;

  font-size: 10px;

  line-height: 1.6;
}

/* =====================================================
   NAVIGATION
===================================================== */

.navigation-buttons {
  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 12px;

  margin-top: 30px;

  padding-top: 20px;

  border-top: 1px solid #e2e8f0;
}

.primary-button,
.secondary-button {
  min-height: 42px;

  border-radius: 9px;

  padding: 0 20px;

  border: none;

  font-size: 11px;

  font-weight: 800;

  cursor: pointer;

  display: flex;

  align-items: center;

  justify-content: center;

  gap: 8px;

  transition: 0.2s;
}

.primary-button {
  margin-left: auto;

  background: #2563eb;

  color: white;
}

.primary-button:hover:not(:disabled) {
  background: #1d4ed8;

  box-shadow:
    0 5px 14px rgba(37, 99, 235, 0.25);
}

.secondary-button {
  background: #f1f5f9;

  color: #475569;

  border: 1px solid #e2e8f0;
}

.secondary-button:hover:not(:disabled) {
  background: #e2e8f0;
}

.primary-button:disabled,
.secondary-button:disabled {
  opacity: 0.6;

  cursor: not-allowed;
}

/* =====================================================
   SUCCESS
===================================================== */

.success-wrapper {
  min-height: calc(100vh - 78px);

  display: flex;

  align-items: center;

  justify-content: center;

  padding: 40px 20px;
}

.success-card {
  width: 100%;

  max-width: 580px;

  background: rgba(255, 255, 255, 0.98);

  border: 1px solid #e2e8f0;

  border-radius: 20px;

  padding: 38px 32px;

  text-align: center;

  box-shadow:
    0 15px 50px rgba(0, 0, 0, 0.20);
}

.success-icon {
  width: 65px;
  height: 65px;

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

.success-label {
  display: inline-block;

  padding: 5px 10px;

  border-radius: 999px;

  background: #ecfdf5;

  border: 1px solid #a7f3d0;

  color: #047857;

  font-size: 8px;

  font-weight: 900;

  letter-spacing: 0.08em;

  margin-bottom: 10px;
}

.success-card h1 {
  margin: 0;

  color: #0f172a;

  font-size: 24px;

  font-weight: 900;
}

.success-message {
  color: #64748b;

  font-size: 12px;

  margin: 8px 0 20px;

  line-height: 1.5;
}

.hospital-id-box {
  padding: 18px;

  border-radius: 12px;

  background: #eff6ff;

  border: 1px solid #bfdbfe;

  display: flex;

  flex-direction: column;

  gap: 5px;
}

.hospital-id-box span {
  color: #64748b;

  font-size: 9px;

  font-weight: 800;

  text-transform: uppercase;

  letter-spacing: 0.06em;
}

.hospital-id-box strong {
  color: #2563eb;

  font-family: monospace;

  font-size: 27px;

  letter-spacing: 0.10em;
}

.hospital-id-box small {
  color: #64748b;

  font-size: 9px;

  margin-top: 3px;
}

.success-info {
  margin-top: 15px;

  border: 1px solid #e2e8f0;

  border-radius: 10px;

  overflow: hidden;
}

.info-row {
  display: flex;

  justify-content: space-between;

  align-items: center;

  gap: 15px;

  padding: 12px 14px;

  border-bottom: 1px solid #e2e8f0;

  text-align: left;
}

.info-row:last-child {
  border-bottom: none;
}

.info-row span {
  color: #94a3b8;

  font-size: 9px;

  font-weight: 700;
}

.info-row strong {
  color: #334155;

  font-size: 10px;

  text-align: right;

  max-width: 65%;

  word-break: break-word;
}

.info-row .status {
  color: #16a34a;
}

.next-step-box {
  display: flex;

  gap: 12px;

  align-items: flex-start;

  text-align: left;

  margin-top: 15px;

  padding: 14px;

  border-radius: 10px;

  background: #f8fafc;

  border: 1px solid #e2e8f0;
}

.next-step-icon {
  width: 30px;
  height: 30px;

  flex-shrink: 0;

  border-radius: 50%;

  background: #2563eb;

  color: white;

  display: flex;

  align-items: center;
  justify-content: center;

  font-size: 11px;

  font-weight: 900;
}

.next-step-box h3 {
  margin: 0;

  color: #334155;

  font-size: 11px;
}

.next-step-box p {
  margin: 4px 0 0;

  color: #64748b;

  font-size: 10px;

  line-height: 1.5;
}

.success-button {
  width: 100%;

  margin-top: 18px;

  min-height: 45px;

  font-size: 12px;
}

/* =====================================================
   MOBILE
===================================================== */

@media (max-width: 800px) {
  .hospital-header {
    padding: 0 18px;
  }

  .brand-subtitle {
    display: none;
  }

  .header-secure {
    font-size: 9px;
    padding: 6px 9px;
  }

  .registration-card {
    padding: 22px;
  }

  .registration-container {
    margin-top: 20px;
  }

  .progress-container {
    grid-template-columns:
      repeat(3, 1fr);

    row-gap: 15px;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }

  .full-width {
    grid-column: auto;
  }

  .review-grid {
    grid-template-columns: 1fr;
  }

  .registration-heading h1 {
    font-size: 22px;
  }

  .hospital-logo {
    width: 120px;
  }

  .success-card {
    padding: 28px 20px;
  }

  .success-card h1 {
    font-size: 21px;
  }

  .hospital-id-box strong {
    font-size: 23px;
  }
}

@media (max-width: 500px) {
  .header-secure {
    display: none;
  }

  .registration-card {
    padding: 18px;
  }

  .progress-item {
    font-size: 8px;
  }

  .progress-circle {
    width: 32px;
    height: 32px;
  }

  .navigation-buttons {
    flex-direction: column-reverse;
  }

  .primary-button,
  .secondary-button {
    width: 100%;
  }

  .primary-button {
    margin-left: 0;
  }

  .info-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }

  .info-row strong {
    text-align: left;
    max-width: 100%;
  }
}
`;
