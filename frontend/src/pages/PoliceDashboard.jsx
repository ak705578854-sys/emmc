import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LiveMap from "../policeReal/LiveMap";
import TrafficPoliceTracker from "../policeReal/TrafficPoliceTracker";
import "../policeReal/App.css";
import "./PoliceDashboard.css";

export default function PoliceDashboard() {
  const navigate = useNavigate();
  const [mapOpen, setMapOpen] = useState(false);
  const [logoutNonce, setLogoutNonce] = useState(0);
  const [policeLocation, setPoliceLocation] = useState(null);

  const handleStartMap = () => setMapOpen(true);
  const handleStopMap = () => setMapOpen(false);
  const handlePoliceLogout = () => {
    // EXIT from the real police map must return to the original
    // Police ID + Password login page, not the TP001 GPS page.
    setMapOpen(false);
    setLogoutNonce((n) => n + 1);
    navigate("/login", { replace: true });
  };

  return (
    <main className="app">
      <header>
        <h1>🚔 EMMC — Traffic Police</h1>
        <p>Authorized Police Login • Real GPS • Live Ambulance Distance • 1 KM Alert</p>
      </header>

      <div style={{ display: mapOpen ? "none" : "block" }}>
        <TrafficPoliceTracker
          onStartMap={handleStartMap}
          onPoliceLocationChange={setPoliceLocation}
          mapOpen={mapOpen}
          logoutNonce={logoutNonce}
        />
      </div>

      {mapOpen && (
        <LiveMap
          ambulanceMode={false}
          gpsEnabled={false}
          onStopGPS={handleStopMap}
          onLogout={handlePoliceLogout}
          policeLocation={policeLocation}
          policeLive={!!policeLocation}
        />
      )}
    </main>
  );
}
