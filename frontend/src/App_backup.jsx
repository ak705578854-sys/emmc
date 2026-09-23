import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import FrontPage from "./pages/front";
import LoginPage from "./pages/login";
import SignInPage from "./pages/signin";

import DriverDashboard from "./pages/DriverDashboard";
import PoliceDashboard from "./pages/PoliceDashboard";
import ControlRoom from "./pages/ControlRoom";
import EmergencyRequest from "./pages/EmergencyRequest";
import RegisterPatient from "./pages/RegisterPatient";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<FrontPage />}
        />

        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/signin"
          element={<SignInPage />}
        />

        <Route
          path="/driver"
          element={<DriverDashboard />}
        />

        <Route
          path="/police"
          element={<PoliceDashboard />}
        />

        <Route
          path="/control-room"
          element={<ControlRoom />}
        />

        <Route
          path="/emergency"
          element={<EmergencyRequest />}
        />

        <Route
          path="/patient-registration"
          element={<RegisterPatient />}
        />

        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />

      </Routes>
    </BrowserRouter>
  );
}