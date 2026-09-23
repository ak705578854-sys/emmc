import React, { useEffect, useRef, useState } from "react";
import LiveMap from "../ambulanceReal/LiveMap";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./DrDashboard.css";

export default function DriverDashboard() {
      const [isReady, setIsReady] = useState(false);
      const [activeTab, setActiveTab] = useState("dash");
      const [gpsOn, setGpsOn] = useState(false);
      const [priorityLevel, setPriorityLevel] = useState(null); 
      const [isMapFs, setIsMapFs] = useState(false);
      const [isLogoutOpen, setIsLogoutOpen] = useState(false);
      const [isCrewOpen, setIsCrewOpen] = useState(false);

      // Messaging states
      const [activeReason, setActiveReason] = useState("Standing Traffic");
      const [inCooldown, setInCooldown] = useState(false);
      const [secondsLeft, setSecondsLeft] = useState(60);
      const [auditRequests, setAuditRequests] = useState([
        { type: "Standing Traffic", time: "09:14 AM", booth: "Booth #04", status: "Sent" }
      ]);
      const [trafficClearanceNonce, setTrafficClearanceNonce] = useState(0);

      // Trip Details Interactive State Machine
      const [tripStage, setTripStage] = useState(0);
      const [tripTimes, setTripTimes] = useState({ pickup: "Pending", enroute: "Pending", complete: "Pending" });
      const [lastUpdated, setLastUpdated] = useState("09:14 AM");

      const mapInstanceRef = useRef(null);
      const ambMarkerRef = useRef(null);

      // Pure Embedded Vector EMMC Logo Component
      const EMMCLogo = () => (
        <svg viewBox="0 0 310 65" height="42" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g>
            <path d="M22 6C22 2.68629 24.6863 0 28 0H44C47.3137 0 50 2.68629 50 6V18H62C65.3137 18 68 20.6863 68 24V40C68 43.3137 65.3137 46 62 46H50V58C50 61.3137 47.3137 64 44 64H28C24.6863 64 22 61.3137 22 58V46H10C6.68629 46 4 43.3137 4 40V24C4 20.6863 6.68629 18 10 18H22V6Z" fill="url(#logo_grad)"/>
            <path d="M28 58C28 58 24 38 38 26C52 14 62 6 62 6" stroke="white" stroke-width="8" stroke-linecap="round"/>
            <path d="M33 54C33 54 30 40 40 29C50 18 60 10 60 10" stroke="#2563eb" stroke-width="2.5" stroke-dasharray="4 4" stroke-linecap="round"/>
          </g>
          <text x="82" y="44" font-family="Inter, sans-serif" font-weight="800" font-size="38" fill="#1d4ed8" letter-spacing="-1">
            <tspan fill="#dc2626">E</tspan>MMC
          </text>
          <text x="82" y="55" font-family="Inter, sans-serif" font-weight="700" font-size="7.5" fill="#dc2626" letter-spacing="0.3">
            EMERGENCY MOBILITY MANAGEMENT
          </text>
          <text x="187" y="55" font-family="Inter, sans-serif" font-weight="700" font-size="7.5" fill="#334155" letter-spacing="0.3">
             AND COORDINATION SYSTEM
          </text>
          <defs>
            <linearGradient id="logo_grad" x1="36" y1="0" x2="36" y2="64" gradientUnits="userSpaceOnUse">
              <stop stop-color="#3b82f6"/>
              <stop offset="1" stop-color="#1d4ed8"/>
            </linearGradient>
          </defs>
        </svg>
      );

      useEffect(() => {
        let timer;
        if (inCooldown && secondsLeft > 0) {
          timer = setInterval(() => {
            setSecondsLeft((prev) => {
              if (prev <= 1) {
                setInCooldown(false);
                return 60;
              }
              return prev - 1;
            });
          }, 1000);
        }
        return () => clearInterval(timer);
      }, [inCooldown, secondsLeft]);

      const triggerClearance = () => {
        if (inCooldown) return;
        setInCooldown(true);
        setSecondsLeft(60);

        const now = new Date();
        const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const newReq = { type: activeReason, time: timeStr, booth: "Booth #04", status: "Sent" };
        setAuditRequests([newReq, ...auditRequests]);
        setTrafficClearanceNonce((n) => n + 1);
      };

      const getAmbIcon = (col) => {
        if (!L) return null;
        return L.divIcon({
          className: '',
          html: `<div style="position:relative;width:44px;height:44px;display:flex;align-items:center;justify-content:center;filter:drop-shadow(0 3px 6px rgba(0,0,0,.35))"><svg width="44" height="44" viewBox="0 0 44 44" fill="none" style="transform:rotate(45deg)"><path d="M22 2 L38 38 L22 28 L6 38 Z" fill="${col}" stroke="#fff" stroke-width="2.5" stroke-linejoin="round"/></svg><div style="position:absolute;width:14px;height:14px;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center;"><div style="width:7px;height:7px;border-radius:50%;background:${col}"></div></div></div>`,
          iconSize: [44,44], iconAnchor: [22,22]
        });
      };

      useEffect(() => {
        if (ambMarkerRef.current && L) {
          const colors = { red: '#dc2626', orange: '#ea580c', green: '#16a34a' };
          const activeCol = colors[priorityLevel] || '#dc2626';
          ambMarkerRef.current.setIcon(getAmbIcon(activeCol));
        }
      }, [priorityLevel]);

      const handleTripAction = () => {
        const now = new Date();
        const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        setLastUpdated(timeStr);

        if (tripStage === 0) {
          setTripTimes(prev => ({ ...prev, pickup: timeStr }));
          setTripStage(1);
        } else if (tripStage === 1) {
          setTripTimes(prev => ({ ...prev, enroute: timeStr }));
          setTripStage(2);
        } else if (tripStage === 2) {
          setTripTimes(prev => ({ ...prev, complete: timeStr }));
          setTripStage(3);
        } else if (tripStage === 3) {
          setIsReady(false);
          setTripStage(0);
          setTripTimes({ pickup: "Pending", enroute: "Pending", complete: "Pending" });
          setActiveTab("dash");
        }
      };

      const handleLogout = () => {
        setIsLogoutOpen(false);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("emmcSession");
        localStorage.removeItem("patientAccount");
        window.location.replace("/login");
      };

      return (
        <div>
          {!isReady ? (
            <div id="assignment-screen">
              <div className="assignment-top">
                <EMMCLogo />
              </div>
              <main className="assignment-main">
                <section className="assignment-card">
                  <div className="assignment-alert">
                    <div style={{ fontSize: 32 }}>🚨</div>
                    <div>
                      <h1 style={{ fontSize: "1.3rem", fontWeight: "800" }}>YOU ARE ASSIGNED TO A PATIENT, RAHUL KUMAR</h1>
                      <p style={{ color: "#ffe4e4", fontSize: "0.9rem" }}>Please review pickup location and vehicle info before starting.</p>
                    </div>
                  </div>
                  <div className="assignment-body">
                    <div style={{ background: "#fff7f7", border: "1px solid #fecaca", padding: 18, borderRadius: 12, marginBottom: 24 }}>
                      <span style={{ fontSize: "0.7rem", fontWeight: 800, color: "#991b1b", textTransform: "uppercase" }}>Patient Location</span>
                      <div style={{ fontSize: "1rem", fontWeight: 700, color: "#0f172a" }}>MECON Colony, Doranda, Ranchi, Jharkhand 834002</div>
                    </div>
                    <div className="ready-row" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div>
                        <h2 style={{ fontSize: "1.08rem", fontWeight: 800, color: "#0f172a" }}>Ready to start the emergency trip?</h2>
                        <p style={{ color: "#64748b", fontSize: "0.82rem" }}>Switch this on to open your full functional driver dashboard.</p>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 13 }}>
                        <span style={{ fontSize: "0.82rem", fontWeight: 800, color: "#8f1111" }}>DRIVER IS READY TO GO</span>
                        <label className="ready-switch">
                          <input type="checkbox" onChange={(e) => { if(e.target.checked) setIsReady(true); }} />
                          <span className="ready-slider"></span>
                        </label>
                      </div>
                    </div>
                  </div>
                </section>
              </main>
            </div>
          ) : (
            <div className="app-shell">
              <header className="app-header">
                <div className="app-brand">
                  <EMMCLogo />
                </div>
                <div className="app-title">
                  <div className="ht-name">Hello, Rahul Kumar</div>
                  <div className="ht-role">Ambulance Driver &bull; Unit 04 &bull; AMB-1042</div>
                </div>
                <div className="app-hdr-right">
                  <div className="app-avatar">RK</div>
                </div>
              </header>

              <div className="app-body">
                <aside className="app-sidebar">
                  <nav className="app-nav">
                    <div className={`app-nav-item ${activeTab === 'dash' ? 'active' : ''}`} onClick={() => setActiveTab('dash')}>
                      <svg className="ni" viewBox="0 0 24 24"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>
                      <span className="nl">Dashboard</span>
                      {activeTab === 'dash' && <span className="nav-tag">Active</span>}
                    </div>
                    <div className={`app-nav-item ${activeTab === 'msg' ? 'active' : ''}`} onClick={() => setActiveTab('msg')}>
                      <svg className="ni" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                      <span className="nl">Messages</span>
                      <span className="nav-cnt">2</span>
                    </div>
                    <div className={`app-nav-item ${activeTab === 'trip' ? 'active' : ''}`} onClick={() => setActiveTab('trip')}>
                      <svg className="ni" viewBox="0 0 24 24"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>
                      <span className="nl">Trip Details</span>
                      {activeTab === 'trip' && <span className="nav-tag">Active</span>}
                    </div>
                    <div className={`app-nav-item ${activeTab === 'history' ? 'active' : ''}`} onClick={() => setActiveTab('history')}>
                      <svg className="ni" viewBox="0 0 24 24"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/></svg>
                      <span className="nl">History</span>
                      {activeTab === 'history' && <span className="nav-tag">Active</span>}
                    </div>
                    <div className={`app-nav-item ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => setActiveTab('settings')}>
                      <svg className="ni" viewBox="0 0 24 24"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
                      <span className="nl">Settings</span>
                      {activeTab === 'settings' && <span className="nav-tag">Active</span>}
                    </div>
                  </nav>
                  <div className="app-sidebar-foot">
                    <div className="app-logout" onClick={() => setIsLogoutOpen(true)}>
                      <svg className="ni" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
                      <span>Logout</span>
                    </div>
                  </div>
                </aside>

                <div className="app-content">
                  {activeTab === 'dash' && (
                    <div className="sec-pane active" id="sec-dash">
                      <div className="ds-top-grid">
                        <div className={`ds-gps-banner ${gpsOn ? 'gps-on' : 'gps-off'}`}>
                          <div>
                            <h3>{gpsOn ? "GPS is ON" : "GPS is OFF"}</h3>
                            <p>{gpsOn ? "Real-time tracking is enabled." : "Location tracking is disabled. Turn on GPS."}</p>
                          </div>
                          <button onClick={() => setGpsOn(!gpsOn)}>{gpsOn ? "Turn Off GPS" : "Turn On GPS"}</button>
                        </div>
                        <div className="ds-gps-card">
                          <div><h4>GPS Status</h4><span className={`ds-pill ${gpsOn ? 'on' : 'off'}`}>{gpsOn ? 'ON' : 'OFF'}</span></div>
                          <label className="ds-sw">
                            <input type="checkbox" checked={gpsOn} onChange={() => setGpsOn(!gpsOn)} />
                            <span className="ds-sl"></span>
                          </label>
                        </div>
                      </div>

                      <div className="ds-info-grid">
                        <div className="ds-ic">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/></svg>
                          <div><small>Ambulance No.</small><h4>JH 12 AB 4567</h4></div>
                        </div>
                        <div className="ds-ic">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="M9 12h6"/><path d="M12 9v6"/></svg>
                          <div><small>Vehicle Type</small><h4>ICU Ambulance</h4></div>
                        </div>
                        <div className="ds-ic">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                          <div><small>Driver</small><h4>Rahul Kumar</h4></div>
                        </div>
                        <div className="ds-ic ds-crew" onClick={() => setIsCrewOpen(true)}>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                          <div><small>Crew Members</small><h4>2</h4><span className="ds-crew-hint">View Details &rarr;</span></div>
                        </div>
                      </div>

                      <div className={`ds-pri ${priorityLevel ? 'pr-' + priorityLevel : ''}`}>
                        <div className="ds-pri-hd"><h3 style={{color: '#0f172a'}}>Priority Request Level</h3></div>
                        <div className="ds-pri-opts">
                          <div className={`ds-pb red ${priorityLevel === 'red' ? 'sel' : ''}`} onClick={() => setPriorityLevel('red')}><strong>Red (Critical)</strong></div>
                          <div className={`ds-pb orange ${priorityLevel === 'orange' ? 'sel' : ''}`} onClick={() => setPriorityLevel('orange')}><strong>Orange (Serious)</strong></div>
                          <div className={`ds-pb green ${priorityLevel === 'green' ? 'sel' : ''}`} onClick={() => setPriorityLevel('green')}><strong>Green (Stable)</strong></div>
                        </div>
                      </div>

                      <div className="ds-content">
                        <div className={`ds-map-wrap ${isMapFs ? 'ds-map-fs' : ''}`}>
                          <div className="ds-map-head">
                            <span>Live Route Navigation (Destination: Raj Hospital and Research Center, Ranchi)</span>
                            <button className="ds-map-fsBtn" onClick={() => setIsMapFs(!isMapFs)}>⛶</button>
                          </div>
                          <div className="ds-map-box">
                            <LiveMap
                              embedded
                              gpsEnabled={gpsOn}
                              ambulanceId={localStorage.getItem("emmc_ambulance_id") || "AMB-1042"}
                              priorityLevel={priorityLevel}
                              tripStage={tripStage}
                              trafficClearanceNonce={trafficClearanceNonce}
                              onStopGPS={() => setGpsOn(false)}
                              onLogout={() => setIsLogoutOpen(true)}
                            />
                          </div>
                        </div>
                        <div className="ds-rp">
                          <div className="ds-vc">
                            <h3>Vehicle Summary</h3>
                            <div className="ds-vr"><span>Ambulance</span>JH 12 AB 4567</div>
                            <div className="ds-vr"><span>Type</span>ICU Ambulance</div>
                            <div className="ds-vr"><span>Driver</span>Rahul Kumar</div>
                          </div>
                          <div className="ds-tc">
                            <h3>Live Tracking</h3>
                            <span className={`ds-tp ${gpsOn ? 'on' : 'off'}`}>{gpsOn ? 'Tracking' : 'Not Tracking'}</span>
                            <p>{gpsOn ? 'GPS updates every 2 seconds.' : 'GPS is OFF. Location will not update.'}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'msg' && (
                    <div className="sec-pane active" id="sec-msg">
                      <div className="msg-wrap" style={{padding: '0'}}>
                        <div className="mb-1">
                          <h2 className="text-[1.55srem] font-extrabold text-slate-900 tracking-tight" style={{fontSize: '1.55rem'}}>Messaging</h2>
                          <p className="text-slate-500 text-sm font-medium mt-1">Communicate with nearby traffic officers when emergency traffic clearance is required.</p>
                        </div>

                        {/* Automatic Alert Banner */}
                        <div className="msg-card msg-alert bg-white border border-slate-200 rounded-2xl" style={{background: '#fff', padding: '18px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderRadius: 16, border: '1px solid #e2e8f0'}}>
                          <div className="flex items-center gap-3" style={{display: 'flex', alignItems: 'center', gap: 12}}>
                            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 flex-shrink-0" style={{width: 10, height: 10, borderRadius: '50%', background: '#10b981'}}></div>
                            <div>
                              <span className="text-[0.68rem] font-extrabold uppercase tracking-wider text-emerald-600 block mb-0.5" style={{fontSize: '0.68rem', fontWeight: 800, color: '#059669', textTransform: 'uppercase', display: 'block', marginBottom: 2}}>Automatic Alert</span>
                              <span className="text-sm font-semibold text-slate-800" style={{fontSize: '0.84rem', fontWeight: 600, color: '#1e293b'}}>Ambulance within 1 KM zone. All local Traffic Officers at Booth #04 notified.</span>
                            </div>
                          </div>
                          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 rounded-full whitespace-nowrap" style={{fontSize: '0.72rem', fontWeight: 700, color: '#15803d', background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '4px 14px', borderRadius: 999}}>Status: Delivered</span>
                        </div>

                        {/* Grid */}
                        <div className="msg-grid" style={{display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20}}>
                          {/* Action Card */}
                          <div className="msg-card msg-action-card bg-white rounded-2xl border border-slate-200 p-6 flex flex-col gap-5" style={{background: '#fff', borderRadius: 16, border: '1px solid #e2e8f0', padding: 24, display: 'flex', flexDirection: 'column', gap: 18}}>
                            <div>
                              <h3 className="text-base font-bold text-slate-900 mb-1" style={{fontSize: '1.05rem', fontWeight: 700, color: '#0f172a', marginBottom: 4}}>Need Traffic Clearance?</h3>
                              <p className="text-xs text-slate-500" style={{fontSize: '0.76rem', color: '#64748b'}}>If the ambulance is unexpectedly stopped or blocked, request immediate traffic officer assistance.</p>
                            </div>

                            <div>
                              <button 
                                onClick={triggerClearance}
                                disabled={inCooldown}
                                style={{width: '100%', padding: '16px 20px', border: 'none', borderRadius: 12, background: inCooldown ? '#94a3b8' : '#2563eb', color: '#fff', fontSize: '0.86rem', fontWeight: 700, textTransform: 'uppercase', cursor: inCooldown ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, boxShadow: inCooldown ? 'none' : '0 4px 14px rgba(37,99,235,0.35)'}}
                              >
                                <span>🚨</span>
                                <span>{inCooldown ? `NEXT REQUEST IN ${secondsLeft} SECONDS` : 'REQUEST TRAFFIC CLEARANCE'}</span>
                              </button>
                            </div>

                            <div>
                              <span className="text-[0.68rem] font-bold uppercase tracking-wider text-slate-400 block mb-2.5" style={{fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', color: '#94a3b8', marginBottom: 10, display: 'block'}}>Predefined Reasons</span>
                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5" style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10}}>
                                {['Standing Traffic', 'Road Blocked', 'Accident / Obstruction', 'Emergency Assistance'].map((reason) => (
                                  <button
                                    key={reason}
                                    onClick={() => !inCooldown && setActiveReason(reason)}
                                    className={`py-2.5 px-3 rounded-lg text-xs font-semibold text-center border transition-all ${activeReason === reason ? 'bg-blue-50 border-blue-300 text-blue-700 font-bold' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'}`}
                                    style={{padding: '10px 12px', borderRadius: 8, fontSize: '0.74rem', fontWeight: 600, textAlign: 'center', cursor: 'pointer', border: '1.5px solid ' + (activeReason === reason ? '#60a5fa' : '#e2e8f0'), background: activeReason === reason ? '#eff6ff' : '#f8fafc', color: activeReason === reason ? '#1d4ed8' : '#475569'}}
                                  >
                                    {reason}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Current Ambulance Status */}
                          <div className="msg-card msg-status-card bg-white rounded-2xl border border-slate-200 p-6 flex flex-col" style={{background: '#fff', borderRadius: 16, border: '1px solid #e2e8f0', padding: 22}}>
                            <h3 className="text-[0.68rem] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-3 mb-4" style={{fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', color: '#94a3b8', borderBottom: '1px solid #f1f5f9', paddingBottom: 12, marginBottom: 14}}>Current Ambulance Status</h3>
                            <div className="flex flex-col gap-4 text-sm" style={{display: 'flex', flexDirection: 'column', gap: 14}}>
                              <div><span className="text-xs text-slate-400 block mb-0.5" style={{fontSize: '0.7rem', color: '#94a3b8', marginBottom: 2}}>Vehicle ID</span><strong className="text-slate-900 font-bold" style={{fontSize: '0.9rem', color: '#1e293b', fontWeight: 700}}>AMB-1042</strong></div>
                              <div><span className="text-xs text-slate-400 block mb-0.5" style={{fontSize: '0.7rem', color: '#94a3b8', marginBottom: 2}}>Location</span><strong className="text-slate-900 font-bold" style={{fontSize: '0.9rem', color: '#1e293b', fontWeight: 700}}>Central Road</strong></div>
                              <div><span className="text-xs text-slate-400 block mb-0.5" style={{fontSize: '0.7rem', color: '#94a3b8', marginBottom: 2}}>Status</span><strong className="text-amber-600 font-bold" style={{fontSize: '0.9rem', color: '#d97706', fontWeight: 700}}>Delayed / Stationary</strong></div>
                              <div><span className="text-xs text-slate-400 block mb-0.5" style={{fontSize: '0.7rem', color: '#94a3b8', marginBottom: 2}}>Approaching</span><strong className="text-slate-900 font-bold" style={{fontSize: '0.9rem', color: '#1e293b', fontWeight: 700}}>Booth #04 (0.7 km away)</strong></div>
                            </div>
                          </div>
                        </div>

                        {/* Recent Requests Table */}
                        <div className="msg-card msg-table-card bg-white rounded-2xl border border-slate-200 p-6" style={{background: '#fff', borderRadius: 16, border: '1px solid #e2e8f0', padding: '22px 24px'}}>
                          <h3 className="text-[0.68rem] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-3 mb-2" style={{fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', color: '#94a3b8', borderBottom: '1px solid #f1f5f9', paddingBottom: 12, marginBottom: 4}}>Recent Traffic Clearance Requests</h3>
                          <div className="overflow-x-auto" style={{overflowX: 'auto'}}>
                            <table className="w-full text-xs text-left" style={{width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem'}}>
                              <thead>
                                <tr className="text-slate-400 border-b border-slate-100" style={{borderBottom: '1px solid #f1f5f9', color: '#94a3b8'}}>
                                  <th className="py-3 font-semibold" style={{padding: '10px 8px', textAlign: 'left'}}>Request Type</th>
                                  <th className="py-3 font-semibold" style={{padding: '10px 8px', textAlign: 'left'}}>Time</th>
                                  <th className="py-3 font-semibold" style={{padding: '10px 8px', textAlign: 'left'}}>Receiving Booth</th>
                                  <th className="py-3 font-semibold text-right" style={{padding: '10px 8px', textAlign: 'right'}}>Status</th>
                                </tr>
                              </thead>
                              <tbody>
                                {auditRequests.map((req, idx) => (
                                  <tr key={idx} className="border-b border-slate-50 text-slate-600 font-medium" style={{borderBottom: '1px solid #f8fafc', color: '#475569'}}>
                                    <td className="py-3 font-bold text-slate-900" style={{padding: '12px 8px', fontWeight: 700, color: '#0f172a'}}>{req.type}</td>
                                    <td className="py-3" style={{padding: '12px 8px'}}>{req.time}</td>
                                    <td className="py-3" style={{padding: '12px 8px'}}>{req.booth}</td>
                                    <td className="py-3 text-right font-bold text-emerald-600 flex items-center justify-end gap-1" style={{padding: '12px 8px', textAlign: 'right', fontWeight: 700, color: '#16a34a'}}>
                                      <svg className="w-4 h-4 stroke-emerald-600 fill-none stroke-[2.5]" style={{width: 15, height: 15, stroke: '#16a34a', fill: 'none', strokeWidth: 2.5, display: 'inline', marginRight: 4}} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                                      Sent
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>

                      </div>
                    </div>
                  )}

                  {activeTab === 'trip' && (
                    <div className="sec-pane active" id="sec-trip" style={{ background: '#f1f3f7', padding: '36px 38px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
                        <h1 style={{ fontSize: 34, fontWeight: 700, color: '#111827', margin: 0 }}>Trip Details</h1>
                        <div style={{ fontSize: 18, color: '#111827' }}>14 May 2024, 09:15 AM</div>
                      </div>

                      <div style={{ background: 'white', border: '1px solid #d8dce3', borderRadius: 17, padding: '25px 28px 30px', marginBottom: 20 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#111827', margin: 0 }}>LIVE TRIP TIMELINE</h2>
                          <div style={{ minWidth: 440, borderLeft: '1px solid #ddd', paddingLeft: 22 }}>
                            <h3 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 8px 0', color: '#111827' }}>Current Trip Status</h3>
                            <p style={{ fontSize: 18, color: '#111827', margin: '0 0 4px 0', display: 'flex', alignItems: 'center', gap: 8 }}>
                              <span style={{ display: 'inline-block', width: 13, height: 13, background: '#31a861', borderRadius: '50%' }}></span>
                              {tripStage === 0 ? "Driver Accepted — Ready for Patient Pickup" : tripStage === 1 ? "Patient Picked Up — En Route to Hospital" : tripStage === 2 ? "En Route to Hospital" : "Trip Completed ✔"}
                            </p>
                            <p style={{ fontSize: 16, color: '#444', margin: 0 }}>Last Updated: {lastUpdated}</p>
                          </div>
                        </div>

                        {/* Timeline Steps Visual */}
                        <div style={{ display: 'flex', marginTop: 35, position: 'relative' }}>
                          {/* Step 1 */}
                          <div style={{ flex: 1, textAlign: 'center', position: 'relative' }}>
                            <div style={{ width: 38, height: 38, margin: 'auto', marginBottom: 17, borderRadius: '50%', background: '#35a25d', color: 'white', fontSize: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2, position: 'relative' }}>✓</div>
                            <h3 style={{ fontSize: 15, fontWeight: 700, margin: '0 0 4px 0', color: '#111827' }}>1. REQUEST<br/>CREATED</h3>
                            <p style={{ margin: 0, fontSize: 15, color: '#6b7280' }}>09:12 AM</p>
                            <div style={{ position: 'absolute', top: 19, left: '57%', width: '86%', height: 4, background: '#35a25d', zIndex: 0 }}></div>
                          </div>

                          {/* Step 2 */}
                          <div style={{ flex: 1, textAlign: 'center', position: 'relative' }}>
                            <div style={{ width: 38, height: 38, margin: 'auto', marginBottom: 17, borderRadius: '50%', background: '#35a25d', color: 'white', fontSize: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2, position: 'relative' }}>✓</div>
                            <h3 style={{ fontSize: 15, fontWeight: 700, margin: '0 0 4px 0', color: '#111827' }}>2. AMBULANCE<br/>ASSIGNED</h3>
                            <p style={{ margin: 0, fontSize: 15, color: '#6b7280' }}>09:13 AM</p>
                            <div style={{ position: 'absolute', top: 19, left: '57%', width: '86%', height: 4, background: tripStage >= 1 ? '#35a25d' : '#d0d4da', zIndex: 0 }}></div>
                          </div>

                          {/* Step 3 */}
                          <div style={{ flex: 1, textAlign: 'center', position: 'relative' }}>
                            <div style={{ width: 38, height: 38, margin: 'auto', marginBottom: 17, borderRadius: '50%', background: '#35a25d', color: 'white', fontSize: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2, position: 'relative' }}>✓</div>
                            <h3 style={{ fontSize: 15, fontWeight: 700, margin: '0 0 4px 0', color: '#111827' }}>3. DRIVER<br/>ACCEPTED</h3>
                            <p style={{ margin: 0, fontSize: 15, color: '#6b7280' }}>09:14 AM</p>
                            <div style={{ position: 'absolute', top: 19, left: '57%', width: '86%', height: 4, background: tripStage >= 1 ? '#35a25d' : '#d0d4da', zIndex: 0 }}></div>
                          </div>

                          {/* Step 4 */}
                          <div style={{ flex: 1, textAlign: 'center', position: 'relative' }}>
                            <div style={{ width: 38, height: 38, margin: 'auto', marginBottom: 17, borderRadius: '50%', background: tripStage >= 1 ? '#35a25d' : '#d2d6de', color: 'white', fontSize: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2, position: 'relative' }}>{tripStage >= 1 ? '✓' : ''}</div>
                            <h3 style={{ fontSize: 15, fontWeight: 700, margin: '0 0 4px 0', color: '#111827' }}>4. PATIENT<br/>PICKUP</h3>
                            <p style={{ margin: 0, fontSize: 15, color: '#6b7280' }}>{tripTimes.pickup}</p>
                            <div style={{ position: 'absolute', top: 19, left: '57%', width: '86%', height: 4, background: tripStage >= 2 ? '#35a25d' : '#d0d4da', zIndex: 0 }}></div>
                          </div>

                          {/* Step 5 */}
                          <div style={{ flex: 1, textAlign: 'center', position: 'relative' }}>
                            <div style={{ width: 38, height: 38, margin: 'auto', marginBottom: 17, borderRadius: '50%', background: tripStage >= 2 ? '#35a25d' : '#d2d6de', color: 'white', fontSize: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2, position: 'relative' }}>{tripStage >= 2 ? '✓' : ''}</div>
                            <h3 style={{ fontSize: 15, fontWeight: 700, margin: '0 0 4px 0', color: '#111827' }}>5. EN ROUTE TO<br/>HOSPITAL</h3>
                            <p style={{ margin: 0, fontSize: 15, color: '#6b7280' }}>{tripTimes.enroute}</p>
                            <div style={{ position: 'absolute', top: 19, left: '57%', width: '86%', height: 4, background: tripStage >= 3 ? '#35a25d' : '#d0d4da', zIndex: 0 }}></div>
                          </div>

                          {/* Step 6 */}
                          <div style={{ flex: 1, textAlign: 'center', position: 'relative' }}>
                            <div style={{ width: 38, height: 38, margin: 'auto', marginBottom: 17, borderRadius: '50%', background: tripStage >= 3 ? '#35a25d' : '#d2d6de', color: 'white', fontSize: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2, position: 'relative' }}>{tripStage >= 3 ? '✓' : ''}</div>
                            <h3 style={{ fontSize: 15, fontWeight: 700, margin: '0 0 4px 0', color: '#111827' }}>6. TRIP<br/>COMPLETION</h3>
                            <p style={{ margin: 0, fontSize: 15, color: '#6b7280' }}>{tripTimes.complete}</p>
                          </div>
                        </div>
                      </div>

                      {/* Bottom Grid Cards */}
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                        {/* Trip Actions */}
                        <div style={{ background: 'white', border: '1px solid #d8dce3', borderRadius: 17, padding: '24px 27px', minHeight: 310, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                          <div>
                            <h2 style={{ fontSize: 24, fontWeight: 700, color: '#111827', margin: '0 0 24px 0' }}>Trip Actions</h2>
                            <div style={{ width: 60, height: 60, margin: 'auto', borderRadius: '50%', background: '#32a55e', color: 'white', fontSize: 36, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✓</div>
                            <div style={{ textAlign: 'center', fontSize: 17, color: '#111827', margin: '13px 0 26px 0', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                              <span style={{ background: '#35a25d', color: 'white', borderRadius: '50%', width: 22, height: 22, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>✓</span> Trip Accepted
                            </div>
                          </div>
                          <button 
                            onClick={handleTripAction}
                            style={{ width: '100%', height: 63, border: 'none', borderRadius: 35, background: tripStage === 0 ? 'linear-gradient(90deg,#376ee8,#3564d8)' : tripStage === 1 ? 'linear-gradient(90deg,#f59e0b,#d97706)' : tripStage === 2 ? 'linear-gradient(90deg,#10b981,#059669)' : '#35a25d', color: 'white', fontSize: 20, fontWeight: 'bold', cursor: 'pointer' }}
                          >
                            {tripStage === 0 ? "Mark Patient Picked Up" : tripStage === 1 ? "Mark En Route to Hospital" : tripStage === 2 ? "Mark Trip Completed" : "Trip Successfully Completed ✔"}
                          </button>
                        </div>

                        {/* Trip Information */}
                        <div style={{ background: 'white', border: '1px solid #d8dce3', borderRadius: 17, padding: '24px 27px', minHeight: 310 }}>
                          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#111827', margin: '0 0 24px 0' }}>Trip Information</h2>
                          <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', marginBottom: 14, fontSize: 18 }}><span style={{ color: '#4b5563' }}>Trip ID</span><b style={{ color: '#111827' }}>EMMS-TRP-00177</b></div>
                          <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', marginBottom: 14, fontSize: 18 }}><span style={{ color: '#4b5563' }}>Ambulance ID</span><b style={{ color: '#111827' }}>JH 12 AB 4567</b></div>
                          <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', marginBottom: 14, fontSize: 18 }}><span style={{ color: '#4b5563' }}>Driver</span><b style={{ color: '#111827' }}>Rahul Kumar</b></div>
                          <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', marginBottom: 14, fontSize: 18 }}><span style={{ color: '#4b5563' }}>Crew</span><b style={{ color: '#111827' }}>2 Members</b></div>
                          <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', marginBottom: 14, fontSize: 18 }}><span style={{ color: '#4b5563' }}>Patient Pickup Location</span><b style={{ color: '#111827' }}>Near Sumitra Niwas / Kamaljal, Argora</b></div>
                          <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', marginBottom: 14, fontSize: 18 }}><span style={{ color: '#4b5563' }}>Destination</span><b style={{ color: '#111827' }}>Raj Hospital and Research Center, Ranchi</b></div>
                          <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', marginBottom: 14, fontSize: 18 }}><span style={{ color: '#4b5563' }}>Emergency Priority</span><b><span style={{ display: 'inline-block', background: '#dc2626', color: 'white', padding: '4px 12px', borderRadius: 12, fontSize: 14, fontWeight: 'bold' }}>RED — Critical</span></b></div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'history' && (
                    <div className="sec-pane active" style={{ padding: 24, background: '#fff', color: '#0f172a' }}>
                      <h2 style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 6 }}>Trip History</h2>
                      <p style={{ color: '#64748b' }}>Past completed trips and manifests.</p>
                    </div>
                  )}

                  {activeTab === 'settings' && (
                    <div className="sec-pane active" style={{ padding: 24, background: '#fff', color: '#0f172a' }}>
                      <h2 style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 6 }}>Settings</h2>
                      <p style={{ color: '#64748b' }}>Configure application preferences.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* CREW MODAL */}
          <div className={`crew-backdrop ${isCrewOpen ? "open" : ""}`} onClick={() => setIsCrewOpen(false)}>
            <div className="crew-modal" onClick={(e) => e.stopPropagation()}>
              <div className="crew-hdr">
                <div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a' }}>Active Crew Members</h3>
                  <p style={{ fontSize: '.76rem', color: '#64748b' }}>Ambulance JH 12 AB 4567 &bull; ICU Shift</p>
                </div>
                <button onClick={() => setIsCrewOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18 }}>&times;</button>
              </div>
              <div className="crew-body">
                <div className="crew-row">
                  <div className="crew-avt">PS</div>
                  <div className="crew-info">
                    <div className="crew-name">Priya Sharma <span className="crew-rtag">Nurse</span></div>
                    <div className="crew-sub">Senior ICU Specialist &bull; Critical Care</div>
                    <div className="crew-id">Service ID: EMMC-NR-2041</div>
                  </div>
                </div>
                <div className="crew-row">
                  <div className="crew-avt">AV</div>
                  <div className="crew-info">
                    <div className="crew-name">Anjali Verma <span className="crew-rtag">Nurse</span></div>
                    <div className="crew-sub">Staff Nurse &bull; Emergency Response</div>
                    <div className="crew-id">Service ID: EMMC-NR-3185</div>
                  </div>
                </div>
              </div>
              <div className="crew-ftr">
                <button style={{ background: '#1e293b', color: '#fff', border: 'none', padding: '8px 18px', borderRadius: 8, fontSize: '.84rem', fontWeight: 600, cursor: 'pointer' }} onClick={() => setIsCrewOpen(false)}>Close</button>
              </div>
            </div>
          </div>

          {/* LOGOUT CONFIRMATION MODAL */}
          <div className={`logout-backdrop ${isLogoutOpen ? "open" : ""}`} onClick={(e) => { if(e.target.className.includes('logout-backdrop')) setIsLogoutOpen(false); }}>
            <div className="logout-card">
              <button 
                onClick={() => setIsLogoutOpen(false)}
                style={{ position: 'absolute', top: 16, right: 16, width: 32, height: 32, borderRadius: '50%', background: '#f1f5f9', border: 'none', color: '#475569', fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                &times;
              </button>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', margin: '0 0 12px 0' }}>Confirm Logout</h3>
              <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.5, margin: '0 0 24px 0' }}>
                Are you sure you want to end your session? Your location telemetry will stop tracking until you sign in again.
              </p>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
                <button 
                  onClick={() => setIsLogoutOpen(false)}
                  style={{ padding: '10px 20px', borderRadius: 10, border: '1px solid #cbd5e1', background: '#f8fafc', color: '#1e293b', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button 
                  onClick={handleLogout}
                  style={{ padding: '10px 20px', borderRadius: 10, border: 'none', background: '#dc2626', color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 12px rgba(220,38,38,0.35)' }}
                >
                  Logout Now
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
