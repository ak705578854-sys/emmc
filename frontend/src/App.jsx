// import {
//   BrowserRouter,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";

// import FrontPage from "./pages/front.jsx";
// import LoginPage from "./pages/login.jsx";
// import SignInPage from "./pages/signin.jsx";

// import RegisterPatient from "./pages/RegisterPatient.jsx";
// import CreatePatientPassword from "./pages/CreatePatientPassword.jsx";

// import HospitalRegistration from "./pages/HospitalRegistration.jsx";
// import HospitalCreatePassword from "./pages/HospitalCreatePassword.jsx";

// import LHORegistration from "./pages/LHORegistration.jsx";
// import LHOCreatePassword from "./pages/LHOCreatePassword.jsx";

// import PatientDashboard from "./pages/PatientDashboard.jsx";
// import HospitalDashboard from "./pages/HospitalDashboard.jsx";
// import DrDashboard from "./pages/DrDashboard.jsx";
// import PoliceDashboard from "./pages/PoliceDashboard.jsx";

// export default function App() {
//   return (
//     <BrowserRouter>
//       <Routes>

//         {/* ================= HOME ================= */}

//         <Route
//           path="/"
//           element={<FrontPage />}
//         />

//         {/* ================= AUTH ================= */}

//         <Route
//           path="/login"
//           element={<LoginPage />}
//         />

//         <Route
//           path="/signin"
//           element={<SignInPage />}
//         />

//         {/* ================= PATIENT ================= */}

//         <Route
//           path="/patient-registration"
//           element={<RegisterPatient />}
//         />

//         <Route
//           path="/register-patient"
//           element={<RegisterPatient />}
//         />

//         <Route
//           path="/create-password"
//           element={<CreatePatientPassword />}
//         />

//         {/* ================= HOSPITAL ================= */}

//         <Route
//           path="/hospital-registration"
//           element={<HospitalRegistration />}
//         />

//         <Route
//           path="/hospital-create-password"
//           element={<HospitalCreatePassword />}
//         />

//         {/* ================= LHO ================= */}

//         <Route
//           path="/lho-registration"
//           element={<LHORegistration />}
//         />

//         <Route
//           path="/lho-create-password"
//           element={<LHOCreatePassword />}
//         />

//         {/* ================= DASHBOARDS ================= */}

//         <Route
//           path="/patient"
//           element={<PatientDashboard />}
//         />

//         <Route
//           path="/patient-dashboard"
//           element={<PatientDashboard />}
//         />

//         <Route
//           path="/driver"
//           element={<DrDashboard />}
//         />

//         <Route
//           path="/ambulance"
//           element={<DrDashboard />}
//         />

//         <Route
//           path="/hospital"
//           element={<HospitalDashboard />}
//         />

//         <Route
//           path="/police"
//           element={<PoliceDashboard />}
//         />

//         <Route
//           path="/doctor"
//           element={
//             <div
//               style={{
//                 minHeight: "100vh",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 fontFamily: "Arial, sans-serif",
//                 fontSize: "30px",
//                 fontWeight: "700",
//               }}
//             >
//               Doctor Dashboard
//             </div>
//           }
//         />

//         {/* ================= FALLBACK ================= */}

//         <Route
//           path="*"
//           element={<Navigate to="/" replace />}
//         />

//       </Routes>
//     </BrowserRouter>
//   );
// }


import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// ===============================
// MAIN PAGES
// ===============================
import FrontPage from "./pages/front.jsx";
import LoginPage from "./pages/login.jsx";
import SignInPage from "./pages/signin.jsx";

// ===============================
// PATIENT
// ===============================
import RegisterPatient from "./pages/RegisterPatient.jsx";
import CreatePatientPassword from "./pages/CreatePatientPassword.jsx";
import PatientDashboard from "./pages/PatientDashboard.jsx";

// ===============================
// HOSPITAL
// ===============================
import HospitalRegistration from "./pages/HospitalRegistration.jsx";
import HospitalCreatePassword from "./pages/HospitalCreatePassword.jsx";
import HospitalDashboard from "./pages/HospitalDashboard.jsx";

// ===============================
// LHO
// ===============================
import LHORegistration from "./pages/LHORegistration.jsx";
import LHOCreatePassword from "./pages/LHOCreatePassword.jsx";
import LHODashboard from "./pages/LHODashboard.jsx";

// ===============================
// OTHER DASHBOARDS
// ===============================
import DrDashboard from "./pages/DrDashboard.jsx";
import PoliceDashboard from "./pages/PoliceDashboard.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* =========================================
            HOME
        ========================================= */}
        <Route
          path="/"
          element={<FrontPage />}
        />

        {/* =========================================
            LOGIN / SIGN IN
        ========================================= */}
        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/signin"
          element={<SignInPage />}
        />

        {/* =========================================
            PATIENT REGISTRATION
        ========================================= */}
        <Route
          path="/patient-registration"
          element={<RegisterPatient />}
        />

        <Route
          path="/register-patient"
          element={<RegisterPatient />}
        />

        <Route
          path="/create-password"
          element={<CreatePatientPassword />}
        />

        {/* =========================================
            PATIENT DASHBOARD
        ========================================= */}
        <Route
          path="/patient"
          element={<PatientDashboard />}
        />

        <Route
          path="/patient-dashboard"
          element={<PatientDashboard />}
        />

        {/* =========================================
            HOSPITAL REGISTRATION
        ========================================= */}
        <Route
          path="/hospital-registration"
          element={<HospitalRegistration />}
        />

        <Route
          path="/hospital-create-password"
          element={<HospitalCreatePassword />}
        />

        {/* =========================================
            HOSPITAL DASHBOARD
        ========================================= */}
        <Route
          path="/hospital"
          element={<HospitalDashboard />}
        />

        {/* =========================================
            LHO REGISTRATION
        ========================================= */}
        <Route
          path="/lho-registration"
          element={<LHORegistration />}
        />

        {/* =========================================
            LHO CREATE PASSWORD
        ========================================= */}
        <Route
          path="/lho-create-password"
          element={<LHOCreatePassword />}
        />

        {/* =========================================
            LHO DASHBOARD
        ========================================= */}
        <Route
          path="/lho"
          element={<LHODashboard />}
        />

        <Route
          path="/lho-dashboard"
          element={<LHODashboard />}
        />

        {/* =========================================
            AMBULANCE / DRIVER
        ========================================= */}
        <Route
          path="/driver"
          element={<DrDashboard />}
        />

        <Route
          path="/ambulance"
          element={<DrDashboard />}
        />

        {/* =========================================
            POLICE
        ========================================= */}
        <Route
          path="/police"
          element={<PoliceDashboard />}
        />

        {/* =========================================
            DOCTOR
        ========================================= */}
        <Route
          path="/doctor"
          element={
            <div
              style={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "Arial, sans-serif",
                fontSize: "30px",
                fontWeight: "700",
              }}
            >
              Doctor Dashboard
            </div>
          }
        />

        {/* =========================================
            UNKNOWN ROUTE
        ========================================= */}
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}
