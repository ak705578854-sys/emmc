import { useState, useEffect, useMemo } from "react";
import "./PatientDashboard.css";

const DEFAULT_AVATAR = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80";

    const INITIAL_FACILITIES = [
      {
        id: 1,
        name: "Patratu Seva Nursing Home",
        type: "Nursing Home",
        distance: "1.2 km",
        available: true,
        phone: "+91 70000 12001",
        beds: "8 Available",
        oxygen: "Stable",
        ambulances: "1 On Duty",
        address: "Main Road, Patratu, Ramgarh, Jharkhand"
      },
      {
        id: 2,
        name: "Damodar Care Nursing Home",
        type: "Nursing Home",
        distance: "2.1 km",
        available: true,
        phone: "+91 70000 12002",
        beds: "12 Available",
        oxygen: "Stable",
        ambulances: "1 On Duty",
        address: "Near Patratu Market, Patratu, Ramgarh, Jharkhand"
      },
      {
        id: 3,
        name: "Patratu Lifeline Nursing Home",
        type: "Nursing Home",
        distance: "3.4 km",
        available: true,
        phone: "+91 70000 12003",
        beds: "10 Available",
        oxygen: "Sufficient",
        ambulances: "2 On Duty",
        address: "Lake Road, Patratu, Ramgarh, Jharkhand"
      },
      {
        id: 4,
        name: "Ramgarh Rural Care Nursing Home",
        type: "Nursing Home",
        distance: "5.2 km",
        available: false,
        phone: "+91 70000 12004",
        beds: "Full Capacity",
        oxygen: "Reserved",
        ambulances: "0 Available",
        address: "Patratu-Ramgarh Road, Ramgarh, Jharkhand"
      }
    ];

    const INITIAL_RECORDS = [
      {
        id: "REC-2026-091",
        title: "General Physician Prescription",
        category: "Prescription",
        doctor: "Dr. K. S. Rao, MD",
        date: "Sep 08, 2026",
        badgeType: "rx",
        typeLabel: "Rx",
        findings: "Diagnosed with mild seasonal flu and bronchial congestion. Prescribed hydration, paracetamol, and cough syrup.",
        isUploaded: false,
        image: null,
        tests: [
          { name: "Blood Pressure", result: "120/80 mmHg", status: "Normal" },
          { name: "Pulse Rate", result: "74 bpm", status: "Normal" },
          { name: "SPO2", result: "98%", status: "Normal" }
        ]
      },
      {
        id: "REC-2026-084",
        title: "Complete Blood Picture (CBP)",
        category: "Lab",
        doctor: "Vijaya Diagnostic Centre",
        date: "Aug 29, 2026",
        badgeType: "lab",
        typeLabel: "LAB",
        findings: "Complete blood count analysis within healthy baseline parameters. Platelets and hemoglobin normal.",
        isUploaded: false,
        image: null,
        tests: [
          { name: "Hemoglobin", result: "14.2 g/dL", status: "Normal" },
          { name: "WBC Count", result: "6,800 /uL", status: "Normal" },
          { name: "Platelets", result: "2.4 Lakhs/uL", status: "Normal" }
        ]
      },
      {
        id: "REC-2026-062",
        title: "Abdominal Ultrasound Scan",
        category: "Scans",
        doctor: "Dr. Ananya Reddy (Radiologist)",
        date: "Jul 15, 2026",
        badgeType: "ultrasound",
        typeLabel: "USG",
        findings: "Liver, gallbladder, and kidneys appear normal in size, shape, and acoustic texture. No calculus detected.",
        isUploaded: false,
        image: null,
        tests: [
          { name: "Liver Echo Pattern", result: "Homogeneous", status: "Normal" },
          { name: "Gallbladder", result: "Acalculous", status: "Normal" },
          { name: "Both Kidneys", result: "Corticomedullary OK", status: "Normal" }
        ]
      },
      {
        id: "REC-2026-041",
        title: "Chest X-Ray (PA View)",
        category: "Scans",
        doctor: "District TB & Chest Hospital",
        date: "May 10, 2026",
        badgeType: "xray",
        typeLabel: "X-RAY",
        findings: "Both lung fields are clear. Costophrenic angles normal. Heart size within normal limits.",
        isUploaded: false,
        image: null,
        tests: [
          { name: "Trachea", result: "Central", status: "Normal" },
          { name: "Diaphragm", result: "Smooth contours", status: "Normal" }
        ]
      }
    ];


    const EMMC_LANGUAGES = [
      { code: "en", label: "English", native: "English" },
      { code: "hi", label: "Hindi", native: "हिंदी" },
      { code: "bn", label: "Bengali", native: "বাংলা" },
      { code: "mr", label: "Marathi", native: "मराठी" },
      { code: "te", label: "Telugu", native: "తెలుగు" },
      { code: "ta", label: "Tamil", native: "தமிழ்" },
      { code: "gu", label: "Gujarati", native: "ગુજરાતી" },
      { code: "kn", label: "Kannada", native: "ಕನ್ನಡ" },
      { code: "ml", label: "Malayalam", native: "മലയാളം" },
      { code: "pa", label: "Punjabi", native: "ਪੰਜਾਬੀ" },
      { code: "or", label: "Odia", native: "ଓଡ଼ିଆ" },
      { code: "as", label: "Assamese", native: "অসমীয়া" },
      { code: "ur", label: "Urdu", native: "اردو" }
    ];

    const EMMC_TRANSLATIONS = {
      en: {
        dashboard:"Dashboard", tracking:"Live Tracking", records:"Medical Records",
        facilities:"Nearby Facilities", settings:"Settings & Profile", logout:"Logout",
        ruralDashboard:"Rural Patient Dashboard", urbanDashboard:"Urban Patient Dashboard",
        trackAmbulance:"Track Active Ambulance", nearby:"Nearby Healthcare Centres & Hospitals",
        directory:"View Full Directory", recordsTitle:"Recent Health Records & Consultations",
        upload:"Upload Record", settingsTitle:"Patient Settings & Profile",
        personal:"Personal Identification", emergency:"Emergency & Clinical Profile",
        language:"Preferred Language", service:"Preferred Service", save:"Save Changes",
        rural:"Rural Service", urban:"Urban Service", changeService:"Change Service",
        languageDesc:"Choose the language for your dashboard.",
        serviceDesc:"Switch between Rural and Urban patient services. Your profile remains the same.",
        english:"English", hindi:"Hindi"
      },
      hi: {
        dashboard:"डैशबोर्ड", tracking:"लाइव ट्रैकिंग", records:"मेडिकल रिकॉर्ड",
        facilities:"नज़दीकी स्वास्थ्य केंद्र", settings:"सेटिंग्स और प्रोफ़ाइल", logout:"लॉगआउट",
        ruralDashboard:"ग्रामीण मरीज डैशबोर्ड", urbanDashboard:"शहरी मरीज डैशबोर्ड",
        trackAmbulance:"सक्रिय एम्बुलेंस ट्रैक करें", nearby:"नज़दीकी स्वास्थ्य केंद्र और अस्पताल",
        directory:"पूरी सूची देखें", recordsTitle:"हाल के स्वास्थ्य रिकॉर्ड और परामर्श",
        upload:"रिकॉर्ड अपलोड करें", settingsTitle:"मरीज सेटिंग्स और प्रोफ़ाइल",
        personal:"व्यक्तिगत पहचान", emergency:"आपातकालीन और क्लिनिकल प्रोफ़ाइल",
        language:"पसंदीदा भाषा", service:"पसंदीदा सेवा", save:"बदलाव सेव करें",
        rural:"ग्रामीण सेवा", urban:"शहरी सेवा", changeService:"सेवा बदलें",
        languageDesc:"अपने डैशबोर्ड की भाषा चुनें।",
        serviceDesc:"ग्रामीण और शहरी मरीज सेवाओं के बीच बदलें। आपकी प्रोफ़ाइल वही रहेगी।",
        english:"अंग्रेज़ी", hindi:"हिंदी"
      }
    };

    function AppIcon({name, size=20}) {
      const paths = {
        dashboard:<><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
        tracking:<><path d="M5 17h14"/><path d="M7 17V8l5-4 5 4v9"/><path d="M10 17v-5h4v5"/></>,
        records:<><path d="M6 3h9l3 3v15H6z"/><path d="M15 3v4h4"/><path d="M9 11h6M9 15h6"/></>,
        facilities:<><path d="M4 21V9l8-5 8 5v12"/><path d="M8 21v-5h8v5M9 11h.01M15 11h.01"/></>,
        settings:<><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.4 1.4-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-2v-.2a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1-1.4-1.4.1-.1A1.7 1.7 0 0 0 7.5 15a1.7 1.7 0 0 0-1.6-1H5.7v-2h.2a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1 1.4-1.4.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.6v-.2h2v.2a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1 1.4 1.4-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v2h-.2a1.7 1.7 0 0 0-1.6 1z"/></>,
        logout:<><path d="M10 17l5-5-5-5"/><path d="M15 12H3"/><path d="M21 3v18h-8"/></>
      };
      return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
    }

    const URBAN_FACILITIES = [
      {
        id: 101,
        name: "Maa Ram Pyari SuperSpeciality Hospital",
        type: "Super Speciality Hospital",
        distance: "1.4 km",
        available: true,
        phone: "+91 651 000 1400",
        beds: "Available",
        oxygen: "Stable",
        ambulances: "2 On Duty",
        address: "Ranchi, Jharkhand"
      },
      {
        id: 102,
        name: "Ranchi Urology Centre",
        type: "Speciality Hospital",
        distance: "1.5 km",
        available: true,
        phone: "+91 651 000 1500",
        beds: "Available",
        oxygen: "Stable",
        ambulances: "1 On Duty",
        address: "Ranchi, Jharkhand"
      },
      {
        id: 103,
        name: "Vananchal Hospital and Research Centre",
        type: "Hospital & Research Centre",
        distance: "1.6 km",
        available: true,
        phone: "+91 651 000 1600",
        beds: "Available",
        oxygen: "Stable",
        ambulances: "2 On Duty",
        address: "Near VVP School, Chiraundi, Ranchi, Jharkhand"
      },
      {
        id: 104,
        name: "Pulse Super Speciality Hospital",
        type: "Super Speciality Hospital",
        distance: "3.2 km",
        available: true,
        phone: "+91 651 000 3200",
        beds: "Available",
        oxygen: "Stable",
        ambulances: "3 On Duty",
        address: "Via Harihar Singh Road, Ranchi, Jharkhand"
      },
      {
        id: 105,
        name: "Santevita Hospital",
        type: "Multi-Speciality Hospital",
        distance: "3.5 km",
        available: true,
        phone: "+91 651 000 3500",
        beds: "Available",
        oxygen: "Stable",
        ambulances: "2 On Duty",
        address: "Ranchi, Jharkhand"
      }
    ];

    function getOrCreatePatientId() {
      const key = "emmcPatientId";
      const saved = localStorage.getItem(key);
      if (saved && /^PAT-\\d{6}$/.test(saved)) return saved;
      const generated = `PAT-${Math.floor(100000 + Math.random() * 900000)}`;
      localStorage.setItem(key, generated);
      return generated;
    }

    function PatientDashboard() {
      const [isLoggedIn, setIsLoggedIn] = useState(true);
      const [activeTab, setActiveTab] = useState("dashboard");
      const [serviceMode, setServiceMode] = useState(() => localStorage.getItem("emmcService") || "rural");
      const [language, setLanguage] = useState(() => localStorage.getItem("emmcLanguage") || "en");

      const [patient, setPatient] = useState({
        name: "Aman Kumar",
        role: `Patient ID: ${getOrCreatePatientId()}`,
        system: "Emergency Mobility Management Coordination System (EMMC)",
        location: "Patratu, Ramgarh, Jharkhand",
        age: "24",
        gender: "Male",
        bloodGroup: "O+ Positive",
        phone: "+91 98765 43210",
        emergencyContact: "+91 98480 12345 (Elder Brother)",
        allergies: "Penicillin, Sulfa drugs",
        chronicConditions: "None",
        address: "Ranchi, Jharkhand",
        avatar: DEFAULT_AVATAR
      });

      const [facilities, setFacilities] = useState(INITIAL_FACILITIES);
      const [records, setRecords] = useState(INITIAL_RECORDS);

      const [recordSearch, setRecordSearch] = useState("");
      const [recordFilter, setRecordFilter] = useState("All");

      const [selectedFacility, setSelectedFacility] = useState(null);
      const [selectedRecord, setSelectedRecord] = useState(null);
      const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
      const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
      const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

      const [viewerImage, setViewerImage] = useState(null);
      const [viewerZoom, setViewerZoom] = useState(1);
      const [viewerTitle, setViewerTitle] = useState("");

      const [isMapFullscreen, setIsMapFullscreen] = useState(false);

      const [toastMessage, setToastMessage] = useState("");
      const [toastVisible, setToastVisible] = useState(false);

      const [uploadTitle, setUploadTitle] = useState("");
      const [uploadDoctor, setUploadDoctor] = useState("");
      const [uploadCategory, setUploadCategory] = useState("Prescription");
      const [uploadImageFile, setUploadImageFile] = useState(null);

      const [settingsForm, setSettingsForm] = useState({ ...patient });

      const t = (key) => (EMMC_TRANSLATIONS[language] || EMMC_TRANSLATIONS.en)[key] || EMMC_TRANSLATIONS.en[key] || key;
      const isUrban = serviceMode === "urban";
      const activeFacilities = isUrban ? URBAN_FACILITIES : facilities;

      useEffect(() => {
        localStorage.setItem("emmcLanguage", language);
      }, [language]);

      useEffect(() => {
        localStorage.setItem("emmcService", serviceMode);
      }, [serviceMode]);

      const changeLanguage = (code) => {
        setLanguage(code);
        const lang = EMMC_LANGUAGES.find((item) => item.code === code);
        showToast(code === "hi" ? "भाषा हिंदी में बदल दी गई" : `Language changed to ${lang ? lang.label : "English"}`);
      };

      const changeService = (mode) => {
        setServiceMode(mode);
        setActiveTab("dashboard");
        showToast(mode === "urban" ? "Urban patient dashboard activated" : "Rural patient dashboard activated");
      };

      const showToast = (msg) => {
        setToastMessage(msg);
        setToastVisible(true);
        setTimeout(() => setToastVisible(false), 2800);
      };

      useEffect(() => {
        if (isMapFullscreen && activeTab === "tracking") {
          document.body.classList.add("map-fullscreen");
        } else {
          document.body.classList.remove("map-fullscreen");
        }
      }, [isMapFullscreen, activeTab]);

      const filteredRecords = useMemo(() => {
        return records.filter((r) => {
          const matchFilter = recordFilter === "All" || r.category.toLowerCase() === recordFilter.toLowerCase();
          const matchSearch =
            r.title.toLowerCase().includes(recordSearch.toLowerCase()) ||
            r.doctor.toLowerCase().includes(recordSearch.toLowerCase()) ||
            r.id.toLowerCase().includes(recordSearch.toLowerCase());
          return matchFilter && matchSearch;
        });
      }, [records, recordFilter, recordSearch]);

      const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => setUploadImageFile(reader.result);
          reader.readAsDataURL(file);
        }
      };

      const submitUploadRecord = (e) => {
        e.preventDefault();
        if (!uploadTitle.trim()) {
          showToast("Please provide document title");
          return;
        }

        const newRecord = {
          id: `REC-2026-0${Math.floor(100 + Math.random() * 900)}`,
          title: uploadTitle,
          category: uploadCategory,
          doctor: uploadDoctor || "Self Uploaded / General",
          date: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
          badgeType: uploadCategory === "Prescription" ? "rx" : uploadCategory === "Scans" ? "ultrasound" : "lab",
          typeLabel: uploadCategory.toUpperCase(),
          findings: "Document uploaded by patient. Stored securely on EMMC Rural Health Cloud.",
          isUploaded: true,
          image: uploadImageFile || null,
          tests: [
            { name: "Verification Status", result: "Uploaded", status: "Normal" },
            { name: "Cloud Sync", result: "Encrypted", status: "Normal" }
          ]
        };

        setRecords([newRecord, ...records]);
        setUploadTitle("");
        setUploadDoctor("");
        setUploadCategory("Prescription");
        setUploadImageFile(null);
        setIsUploadModalOpen(false);
        showToast("Medical document uploaded successfully!");
      };

      const deleteRecord = (id, e) => {
        if (e) e.stopPropagation();
        setRecords((prev) => prev.filter((item) => item.id !== id));
        if (selectedRecord && selectedRecord.id === id) setSelectedRecord(null);
        if (viewerImage) setViewerImage(null);
        showToast("Record removed from dashboard");
      };

      const handleProfilePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setPatient((prev) => ({ ...prev, avatar: reader.result }));
            setSettingsForm((prev) => ({ ...prev, avatar: reader.result }));
            showToast("Profile photo updated!");
          };
          reader.readAsDataURL(file);
        }
      };

      const handleSaveSettings = (e) => {
        e.preventDefault();
        setPatient({ ...settingsForm });
        showToast("Profile & Settings saved successfully!");
      };

      return (
        <>

          <div className="app">
            {!isLoggedIn ? (
              <div className="login-screen">
                <div className="login-box">
                  <div style={{ color: "#fff", fontSize: 32, fontWeight: "900", letterSpacing: 1.5, marginBottom: 16 }}>
                    EMMC
                  </div>
                  <div className="login-card">
                    <h2>{isUrban ? "Urban Patient Portal" : "Rural Patient Portal"}</h2>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        setIsLoggedIn(true);
                        setActiveTab("dashboard");
                        showToast("Welcome back to EMMC Patient Portal!");
                      }}
                    >
                      <div className="form-group">
                        <label>Patient ID / Aadhaar / Mobile</label>
                        <input
                          type="text"
                          className="form-control"
                          defaultValue={patient.phone}
                          placeholder="e.g. +91 98765 43210"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Security PIN / OTP</label>
                        <input
                          type="password"
                          className="form-control"
                          defaultValue="123456"
                          placeholder="Enter 6-digit PIN"
                          required
                        />
                      </div>
                      <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: 8 }}>
                        Sign In to Dashboard
                      </button>
                    </form>
                  </div>
                  <div className="login-note">Emergency Medical Management Coordination System for Rural & Urban Communities</div>
                </div>
              </div>
            ) : (
              <>
                <header className="header">
                  <div className="brand">
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div
                        style={{
                          width: 44,
                          height: 44,
                          background: "linear-gradient(135deg, #1976e5, #071d3a)",
                          borderRadius: 10,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#fff",
                          fontWeight: "900",
                          fontSize: 22
                        }}
                      >
                        +
                      </div>
                      <div style={{ lineHeight: 1.1 }}>
                        <div style={{ fontSize: 20, fontWeight: "900", color: "#071d3a", letterSpacing: -0.5 }}>EMMC</div>
                        <div style={{ fontSize: 11, color: "#667085", fontWeight: 700 }}>{isUrban ? "URBAN HEALTHCARE" : "RURAL HEALTHCARE"}</div>
                      </div>
                    </div>
                    <div className="divider"></div>
                    <div className="greeting">
                      <strong>Welcome, {patient.name}</strong>
                      <div className="role">{patient.role}</div>
                      <div className="system">{patient.system}</div>
                    </div>
                  </div>

                  <div className="header-right">
                    <div className="location">
                      <span className="location-icon">📍</span>
                      <span>{patient.location}</span>
                    </div>
                    <button
                      className="avatar-btn"
                      title="View Profile"
                      onClick={() => setIsProfileModalOpen(true)}
                    >
                      <img src={patient.avatar} alt="Patient Avatar" />
                    </button>
                  </div>
                </header>

                <aside className="sidebar">
                  <nav className="nav-list">
                    <button
                      className={`nav-btn ${activeTab === "dashboard" ? "active" : ""}`}
                      onClick={() => setActiveTab("dashboard")}
                    >
                      <span className="nav-icon"><AppIcon name="dashboard" /></span>
                      <span className="nav-text">{t("dashboard")}</span>
                    </button>

                    <button
                      className={`nav-btn ${activeTab === "tracking" ? "active" : ""}`}
                      onClick={() => setActiveTab("tracking")}
                    >
                      <span className="nav-icon"><AppIcon name="tracking" /></span>
                      <span className="nav-text">{t("tracking")}</span>
                    </button>

                    <button
                      className={`nav-btn ${activeTab === "records" ? "active" : ""}`}
                      onClick={() => setActiveTab("records")}
                    >
                      <span className="nav-icon"><AppIcon name="records" /></span>
                      <span className="nav-text">{t("records")}</span>
                    </button>

                    <button
                      className={`nav-btn ${activeTab === "facilities" ? "active" : ""}`}
                      onClick={() => setActiveTab("facilities")}
                    >
                      <span className="nav-icon"><AppIcon name="facilities" /></span>
                      <span className="nav-text">{t("facilities")}</span>
                    </button>

                    <button
                      className={`nav-btn ${activeTab === "settings" ? "active" : ""}`}
                      onClick={() => {
                        setSettingsForm({ ...patient });
                        setActiveTab("settings");
                      }}
                    >
                      <span className="nav-icon"><AppIcon name="settings" /></span>
                      <span className="nav-text">{t("settings")}</span>
                    </button>
                  </nav>

                  <div className="logout-wrap">
                    <button
                      className="nav-btn"
                      style={{ color: "#ff8b8b" }}
                      onClick={() => setIsLogoutModalOpen(true)}
                    >
                      <span className="nav-icon"><AppIcon name="logout" /></span>
                      <span className="nav-text">{t("logout")}</span>
                    </button>
                  </div>
                </aside>

                <main className="main">
                  {activeTab === "dashboard" && (
                    <div className="dynamic">
                      <div className="page-head">
                        <div>
                          <h1>{isUrban ? t("urbanDashboard") : t("ruralDashboard")}</h1>
                          <div className="page-date">
                            {new Date().toLocaleDateString("en-US", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric"
                            })}
                          </div>
                        </div>
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            setActiveTab("tracking");
                            showToast("Switched to Live Ambulance Tracking View");
                          }}
                        >
                          Track Active Ambulance
                        </button>
                      </div>

                      <div className="stats">
                        <div className="stat-card">
                          <div className="stat-label">{isUrban ? "Nearest Urban Emergency Dispatch" : "Nearest Emergency Dispatch"}</div>
                          <div className="stat-value" style={{ color: "var(--green)" }}>
                            {activeFacilities[0].distance}
                          </div>
                          <div className="stat-sub">
                            {activeFacilities[0].name} • Nearest emergency facility
                          </div>
                        </div>

                        <div className="stat-card">
                          <div className="stat-label">Verified Medical Records</div>
                          <div className="stat-value">{records.length} Documents</div>
                          <div className="stat-sub">Digital prescriptions & diagnostic scans</div>
                        </div>

                        <div className="stat-card">
                          <div className="stat-label">Emergency SOS Hotline</div>
                          <div className="stat-value" style={{ color: "var(--blue)" }}>
                            108
                          </div>
                          <div className="stat-sub">Direct satellite linkage enabled</div>
                        </div>
                      </div>

                      <div className="panel">
                        <div className="panel-head">
                          <div>
                            <h2>{t("nearby")}</h2>
                            <p>{isUrban ? "Real-time bed, oxygen, and ambulance availability across the city" : "Real-time bed, oxygen, and ambulance availability near Patratu, Ramgarh, Jharkhand"}</p>
                          </div>
                          <button
                            className="btn btn-secondary"
                            onClick={() => setActiveTab("facilities")}
                          >
                            View Full Directory
                          </button>
                        </div>

                        <div className="org-list">
                          {activeFacilities.map((fac, idx) => (
                            <div
                              key={fac.id}
                              className={`org-row ${fac.available ? "available" : "unavailable"}`}
                              onClick={() => setSelectedFacility(fac)}
                            >
                              <div className="org-num">#{idx + 1}</div>
                              <div className="org-name">
                                {fac.name}
                                <div style={{ fontSize: 12, color: "#667085", fontWeight: "normal" }}>
                                  {fac.type} • {fac.beds}
                                </div>
                              </div>
                              <div className="distance">{fac.distance}</div>
                              <div>
                                <span className={`status-pill ${fac.available ? "available" : "unavailable"}`}>
                                  {fac.available ? "Ambulance Ready" : "Occupied"}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="notice">
                          💡 <strong>Rural Tele-Assistance Note:</strong> If your cellular connection drops in hilly zones, your SOS request will automatically route through rural HAM/satellite repeater towers.
                        </div>
                      </div>

                      <div className="panel" style={{ marginTop: 22 }}>
                        <div className="panel-head">
                          <div>
                            <h2>{t("recordsTitle")}</h2>
                            <p>Uploaded prescriptions and reports automatically synced to your digital health locker</p>
                          </div>
                          <button
                            className="btn btn-green"
                            onClick={() => setIsUploadModalOpen(true)}
                          >
                            + Upload Record
                          </button>
                        </div>

                        <div className="records-list">
                          {records.slice(0, 3).map((r) => (
                            <div
                              key={r.id}
                              className="record-card"
                              onClick={() => setSelectedRecord(r)}
                              style={{ cursor: "pointer" }}
                            >
                              <div className="record-id">{r.id}</div>
                              <div>
                                <div className="record-title">{r.title}</div>
                                <div className="record-meta">
                                  {r.doctor} • {r.date}
                                </div>
                              </div>
                              <div>
                                <span className="type-badge">{r.typeLabel}</span>
                              </div>
                              <div style={{ textAlign: "right" }}>
                                <button
                                  className="btn btn-secondary"
                                  style={{ padding: "6px 12px", fontSize: 12 }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedRecord(r);
                                  }}
                                >
                                  View
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "tracking" && (
                    <div className="dynamic">
                      <div className="page-head">
                        <div>
                          <h1>Live Emergency Ambulance Tracking</h1>
                          <div className="page-date">Real-time GPS dispatch telemetry</div>
                        </div>
                        <button
                          className="btn btn-danger"
                          onClick={() => showToast("EMERGENCY SIGNAL SENT! Priority dispatch alerted.")}
                        >
                          🚨 Trigger SOS
                        </button>
                      </div>

                      <div className="tracking-grid">
                        <div className="map-card">
                          <div className="map">
                            <div className="road r1"></div>
                            <div className="road r2"></div>
                            <div className="road r3"></div>
                            <div className="road r4"></div>

                            <div className="map-label label1">Moinabad Junction</div>
                            <div className="map-label label2">Vikarabad State Highway</div>
                            <div className="map-label label3">Venkatapur Rural PHC</div>
                            <div className="map-label label4">Chevella Hospital Bypass</div>

                            <div className="route"></div>

                            <div className="marker patient">
                              <div className="pin">
                                <span>P</span>
                              </div>
                              <div className="marker-label">You: {patient.name}</div>
                            </div>

                            <div className="marker ambulance">
                              <div className="pin">
                                <span>🚑</span>
                              </div>
                              <div className="marker-label">EMMC Ambulance #108-A</div>
                            </div>

                            <div className="map-toolbar">
                              <button
                                className="btn btn-secondary"
                                onClick={() => {
                                  setIsMapFullscreen(!isMapFullscreen);
                                  showToast(isMapFullscreen ? "Exited Fullscreen" : "Fullscreen Map Active");
                                }}
                              >
                                {isMapFullscreen ? "Exit Fullscreen" : "⛶ Fullscreen"}
                              </button>
                              <button
                                className="btn btn-primary"
                                onClick={() => showToast("Map centered on coordinates")}
                              >
                                Recenter
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="panel tracking-side">
                          <div className="tracking-status">
                            <div className="dot"></div>
                            <span>Ambulance En Route — 8 Mins Away</span>
                          </div>

                          <div className="detail-line">
                            <span className="label">DISPATCHED VEHICLE</span>
                            <strong>ALS Advanced Ambulance (TS-07-EA-1088)</strong>
                          </div>

                          <div className="detail-line">
                            <span className="label">LEAD PARAMEDIC / DRIVER</span>
                            <strong>B. Ramesh (Govt. Certified EMT-B)</strong>
                          </div>

                          <div className="detail-line">
                            <span className="label">CURRENT SPEED & BEARING</span>
                            <strong>58 km/h • Heading South-West on SH-4</strong>
                          </div>

                          <div className="detail-line">
                            <span className="label">DESTINATION ASSIGNED</span>
                            <strong>Area Hospital Vikarabad (ICU Bed 04 Ready)</strong>
                          </div>

                          <div className="detail-line">
                            <span className="label">ONBOARD EQUIPMENT</span>
                            <strong>Ventilator, Defibrillator, 2000L O2 Tank</strong>
                          </div>

                          <div className="side-actions">
                            <button
                              className="btn btn-green"
                              onClick={() => showToast("Dialing Driver Ramesh (+91 98490 00108)...")}
                            >
                              📞 Call Paramedic
                            </button>
                            <button
                              className="btn btn-secondary"
                              onClick={() => showToast("SMS location sent to family emergency contacts.")}
                            >
                              Share Live Link with Family
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "records" && (
                    <div className="dynamic emmc-records-page">
                      <div className="emmc-records-top-area">
                        <div className="emmc-stat-card">
                          <div className="emmc-stat-icon">📄</div>
                          <div>
                            <div className="emmc-stat-number">{records.length}</div>
                            <div className="emmc-stat-label">Total Health Documents</div>
                          </div>
                        </div>

                        <div className="emmc-stat-card">
                          <div className="emmc-stat-icon green">💊</div>
                          <div>
                            <div className="emmc-stat-number">
                              {records.filter((r) => r.category === "Prescription").length}
                            </div>
                            <div className="emmc-stat-label">Prescriptions</div>
                          </div>
                        </div>

                        <div className="emmc-stat-card">
                          <div className="emmc-stat-icon purple">🔬</div>
                          <div>
                            <div className="emmc-stat-number">
                              {records.filter((r) => r.category !== "Prescription").length}
                            </div>
                            <div className="emmc-stat-label">Diagnostic Scans</div>
                          </div>
                        </div>

                        <div style={{ display: "flex", gap: 8 }}>
                          {["All", "Prescription", "Lab", "Scans"].map((cat) => (
                            <button
                              key={cat}
                              className={`emmc-filter-btn ${recordFilter === cat ? "active" : ""}`}
                              onClick={() => setRecordFilter(cat)}
                            >
                              {cat}
                            </button>
                          ))}
                        </div>

                        <div className="emmc-search-box">
                          <span className="emmc-search-icon">🔍</span>
                          <input
                            type="text"
                            placeholder="Search doctor, test, or ID..."
                            value={recordSearch}
                            onChange={(e) => setRecordSearch(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="emmc-record-section">
                        <div className="emmc-section-header">
                          <div className="emmc-section-icon">📑</div>
                          <div className="emmc-section-title">
                            <h2>Digital Health Records & Case Sheets</h2>
                            <p>Click any document to inspect full parameters, lab data, or downloaded images</p>
                          </div>
                          <button
                            className="emmc-upload-btn"
                            onClick={() => setIsUploadModalOpen(true)}
                          >
                            + Upload Medical File
                          </button>
                        </div>

                        <div className="emmc-card-grid">
                          {filteredRecords.map((r) => (
                            <div
                              key={r.id}
                              className="emmc-document-card"
                              onClick={() => setSelectedRecord(r)}
                            >
                              <div className="emmc-document-top">
                                <div className={`emmc-document-image ${r.badgeType} ${r.image ? "uploaded-photo" : ""}`}>
                                  {r.image ? (
                                    <img src={r.image} alt={r.title} />
                                  ) : r.badgeType === "rx" ? (
                                    "Rx"
                                  ) : r.badgeType === "lab" ? (
                                    "🔬"
                                  ) : (
                                    "☢"
                                  )}
                                </div>
                                <div className="emmc-document-info">
                                  <div className="emmc-document-name" title={r.title}>
                                    {r.title}
                                  </div>
                                  <div className="emmc-document-doctor">{r.doctor}</div>
                                  <div className="emmc-document-date">{r.date}</div>
                                </div>
                              </div>

                              <div className="emmc-more">⋮</div>
                              <div className="emmc-uploaded">
                                <span className="emmc-upload-icon">✓</span>
                                Verified
                              </div>

                              <div className="emmc-upload-actions">
                                {r.image && (
                                  <button
                                    className="emmc-save-btn"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setViewerImage(r.image);
                                      setViewerTitle(r.title);
                                      setViewerZoom(1);
                                    }}
                                  >
                                    Zoom Image
                                  </button>
                                )}
                                <button
                                  className="emmc-delete-btn"
                                  onClick={(e) => deleteRecord(r.id, e)}
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>

                        {filteredRecords.length === 0 && (
                          <div className="empty">No medical documents matching your current criteria.</div>
                        )}
                      </div>
                    </div>
                  )}

                  {activeTab === "facilities" && (
                    <div className="dynamic">
                      <div className="page-head">
                        <div>
                          <h1>Regional Healthcare Facilities & PHCs</h1>
                          <div className="page-date">{isUrban ? "Hyderabad Urban Healthcare Cluster" : "Patratu and Ramgarh Rural Healthcare Cluster"}</div>
                        </div>
                        <button
                          className="btn btn-primary"
                          onClick={() => showToast("Synchronizing with State Health Server...")}
                        >
                          Refresh Bed Status
                        </button>
                      </div>

                      <div className="panel">
                        <div className="panel-head">
                          <div>
                            <h2>Government and Empanelled Rural Nursing Homes</h2>
                            <p>Direct priority line available for EMMC registered rural cards</p>
                          </div>
                        </div>

                        <div className="org-list" style={{ maxHeight: 600 }}>
                          {activeFacilities.map((fac, idx) => (
                            <div
                              key={fac.id}
                              className={`org-row ${fac.available ? "available" : "unavailable"}`}
                              style={{ gridTemplateColumns: "40px 1.5fr 100px 120px 130px" }}
                              onClick={() => setSelectedFacility(fac)}
                            >
                              <div className="org-num">#{idx + 1}</div>
                              <div className="org-name">
                                {fac.name}
                                <div style={{ fontSize: 12, color: "#667085", fontWeight: "normal" }}>
                                  {fac.address}
                                </div>
                              </div>
                              <div className="distance">{fac.distance}</div>
                              <div style={{ fontSize: 13, fontWeight: "bold", color: "#174a9d" }}>
                                {fac.beds}
                              </div>
                              <div>
                                <button
                                  className="btn btn-primary"
                                  style={{ padding: "6px 12px", fontSize: 12 }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedFacility(fac);
                                  }}
                                >
                                  Book / Details
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "settings" && (
                    <div className="dynamic">
                      <div className="page-head">
                        <div>
                          <h1>{t("settingsTitle")}</h1>
                          <div className="page-date">Manage personal data, emergency contacts, and notifications</div>
                        </div>
                      </div>

                      <form onSubmit={handleSaveSettings}>
                        <div className="setting-layout">
                          <div className="setting-card">
                            <h3>{t("personal")}</h3>
                            <p className="desc">Information stored on the EMMC Smart Health Card</p>

                            <div className="profile-avatar-large">
                              <img src={patient.avatar} alt="Avatar" />
                            </div>

                            <div className="photo-controls">
                              <label className="file-label" htmlFor="photoUpload">
                                Change Profile Photo
                              </label>
                              <input
                                type="file"
                                id="photoUpload"
                                className="file-input"
                                accept="image/*"
                                onChange={handleProfilePhotoChange}
                              />
                            </div>

                            <div className="form-group">
                              <label>Full Name</label>
                              <input
                                type="text"
                                className="form-control"
                                value={settingsForm.name}
                                onChange={(e) => setSettingsForm({ ...settingsForm, name: e.target.value })}
                                required
                              />
                            </div>

                            <div className="fixed-grid">
                              <div className="form-group">
                                <label>Age</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={settingsForm.age}
                                  onChange={(e) => setSettingsForm({ ...settingsForm, age: e.target.value })}
                                />
                              </div>
                              <div className="form-group">
                                <label>Blood Group</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={settingsForm.bloodGroup}
                                  onChange={(e) => setSettingsForm({ ...settingsForm, bloodGroup: e.target.value })}
                                />
                              </div>
                            </div>

                            <div className="form-group">
                              <label>Phone Number (SMS Alert linked)</label>
                              <input
                                type="text"
                                className="form-control"
                                value={settingsForm.phone}
                                onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                              />
                            </div>
                          </div>

                          <div className="setting-card full" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
                            <div>
                              <h3>{t("service")}</h3>
                              <p className="desc">{t("serviceDesc")}</p>
                              <select
                                className="form-control"
                                value={serviceMode}
                                onChange={(e) => changeService(e.target.value)}
                              >
                                <option value="rural">{t("rural")} — Rural Patient Dashboard</option>
                                <option value="urban">{t("urban")} — Urban Patient Dashboard</option>
                              </select>
                            </div>
                            <div>
                              <h3>{t("language")}</h3>
                              <p className="desc">{t("languageDesc")}</p>
                              <select
                                className="form-control"
                                value={language}
                                onChange={(e) => changeLanguage(e.target.value)}
                              >
                                <optgroup label="Priority Languages">
                                  <option value="en">English — English</option>
                                  <option value="hi">हिंदी — Hindi</option>
                                </optgroup>
                                <optgroup label="Regional Indian Languages">
                                  {EMMC_LANGUAGES.filter((l) => l.code !== "en" && l.code !== "hi").map((l) => (
                                    <option key={l.code} value={l.code}>{l.native} — {l.label}</option>
                                  ))}
                                </optgroup>
                              </select>
                            </div>
                          </div>

                          <div className="setting-card">
                            <h3>{t("emergency")}</h3>
                            <p className="desc">Vital data shared with dispatched ambulance paramedics</p>

                            <div className="form-group">
                              <label>Primary Emergency Contact</label>
                              <input
                                type="text"
                                className="form-control"
                                value={settingsForm.emergencyContact}
                                onChange={(e) => setSettingsForm({ ...settingsForm, emergencyContact: e.target.value })}
                              />
                            </div>

                            <div className="form-group">
                              <label>Known Allergies</label>
                              <input
                                type="text"
                                className="form-control"
                                value={settingsForm.allergies}
                                onChange={(e) => setSettingsForm({ ...settingsForm, allergies: e.target.value })}
                              />
                            </div>

                            <div className="form-group">
                              <label>Permanent Rural Address</label>
                              <textarea
                                className="form-control"
                                value={settingsForm.address}
                                onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value })}
                              />
                            </div>

                            <div className="form-group">
                              <label>Rural Mandals / Landmark Navigation</label>
                              <input
                                type="text"
                                className="form-control"
                                value={settingsForm.location}
                                onChange={(e) => setSettingsForm({ ...settingsForm, location: e.target.value })}
                              />
                            </div>

                            <div className="settings-actions">
                              <button type="submit" className="btn btn-primary">
                                Save Changes
                              </button>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  )}
                </main>
              </>
            )}
          </div>

          {/* FACILITY MODAL */}
          <div className={`modal-backdrop ${selectedFacility ? "open" : ""}`} aria-hidden={!selectedFacility}>
            <div className="modal wide">
              {selectedFacility && (
                <>
                  <div className="modal-head">
                    <h2>{selectedFacility.name}</h2>
                    <button className="close" onClick={() => setSelectedFacility(null)}>
                      ×
                    </button>
                  </div>

                  <div className="info-grid">
                    <div className="info-item">
                      <span className="info-label">CATEGORY</span>
                      <span className="info-value">{selectedFacility.type}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">ROAD DISTANCE</span>
                      <span className="info-value">{selectedFacility.distance}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">BED AVAILABILITY</span>
                      <span className="info-value" style={{ color: "var(--green)" }}>
                        {selectedFacility.beds}
                      </span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">OXYGEN SUPPLY</span>
                      <span className="info-value">{selectedFacility.oxygen}</span>
                    </div>
                    <div className="info-item full">
                      <span className="info-label">ADDRESS & ACCESS</span>
                      <span className="info-value">{selectedFacility.address}</span>
                    </div>
                    <div className="info-item full">
                      <span className="info-label">OFFICIAL HELPLINE</span>
                      <span className="info-value">{selectedFacility.phone}</span>
                    </div>
                  </div>

                  <div className="modal-actions">
                    <button
                      className="btn btn-secondary"
                      onClick={() => setSelectedFacility(null)}
                    >
                      Close
                    </button>
                    <button
                      className="btn btn-green"
                      onClick={() => {
                        showToast(`Ambulance request dispatched to ${selectedFacility.name}!`);
                        setSelectedFacility(null);
                        setActiveTab("tracking");
                      }}
                    >
                      Request Dispatch to Facility
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* PROFILE MODAL */}
          <div className={`modal-backdrop ${isProfileModalOpen ? "open" : ""}`} aria-hidden={!isProfileModalOpen}>
            <div className="modal wide">
              <div className="modal-head">
                <h2>Government Rural Health ID Profile</h2>
                <button className="close" onClick={() => setIsProfileModalOpen(false)}>
                  ×
                </button>
              </div>

              <div className="profile-avatar-large">
                <img src={patient.avatar} alt="Patient Large" />
              </div>

              <div className="info-grid">
                <div className="info-item">
                  <span className="info-label">PATIENT NAME</span>
                  <span className="info-value">{patient.name}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">AGE / GENDER</span>
                  <span className="info-value">
                    {patient.age} Yrs • {patient.gender}
                  </span>
                </div>
                <div className="info-item">
                  <span className="info-label">BLOOD GROUP</span>
                  <span className="info-value" style={{ color: "var(--red)" }}>
                    {patient.bloodGroup}
                  </span>
                </div>
                <div className="info-item">
                  <span className="info-label">CONTACT NUMBER</span>
                  <span className="info-value">{patient.phone}</span>
                </div>
                <div className="info-item full">
                  <span className="info-label">EMERGENCY KIN CONTACT</span>
                  <span className="info-value">{patient.emergencyContact}</span>
                </div>
                <div className="info-item full">
                  <span className="info-label">KNOWN ALLERGIES & CONTRAINDICATIONS</span>
                  <span className="info-value">{patient.allergies}</span>
                </div>
                <div className="info-item full">
                  <span className="info-label">REGISTERED HOME ADDRESS</span>
                  <span className="info-value">{patient.address}</span>
                </div>
              </div>

              <div className="modal-actions">
                <button
                  className="btn btn-secondary"
                  onClick={() => setIsProfileModalOpen(false)}
                >
                  Close
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setIsProfileModalOpen(false);
                    setActiveTab("settings");
                  }}
                >
                  Edit in Settings
                </button>
              </div>
            </div>
          </div>

          {/* MEDICAL RECORD DETAIL MODAL */}
          <div className={`modal-backdrop ${selectedRecord ? "open" : ""}`} aria-hidden={!selectedRecord}>
            <div className="modal wide" style={{ padding: 0 }}>
              {selectedRecord && (
                <>
                  <div className="emmc-modal-header">
                    <div className="emmc-modal-header-icon">
                      {selectedRecord.badgeType === "rx" ? "💊" : selectedRecord.badgeType === "lab" ? "🔬" : "☢"}
                    </div>
                    <div>
                      <h2>{selectedRecord.title}</h2>
                      <p>
                        {selectedRecord.id} • {selectedRecord.doctor} • {selectedRecord.date}
                      </p>
                    </div>
                    <button className="emmc-close-btn" onClick={() => setSelectedRecord(null)}>
                      ×
                    </button>
                  </div>

                  <div className="emmc-modal-body">
                    {selectedRecord.image && (
                      <div
                        className="emmc-detail-image uploaded-photo"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setViewerImage(selectedRecord.image);
                          setViewerTitle(selectedRecord.title);
                          setViewerZoom(1);
                        }}
                      >
                        <img src={selectedRecord.image} alt={selectedRecord.title} />
                      </div>
                    )}

                    <div className="emmc-detail-grid">
                      <div className="emmc-detail-box">
                        <span>RECORD CATEGORY</span>
                        <strong>{selectedRecord.category}</strong>
                      </div>
                      <div className="emmc-detail-box">
                        <span>ISSUING MEDICAL AUTHORITY</span>
                        <strong>{selectedRecord.doctor}</strong>
                      </div>
                    </div>

                    <div className="emmc-report-content">
                      <h3>Clinical Findings & Remarks</h3>
                      <div className="emmc-detail-box">
                        <p>{selectedRecord.findings}</p>
                      </div>

                      {selectedRecord.tests && selectedRecord.tests.length > 0 && (
                        <table className="emmc-report-table">
                          <thead>
                            <tr>
                              <th>Parameter / Test</th>
                              <th>Recorded Value</th>
                              <th>Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {selectedRecord.tests.map((t, idx) => (
                              <tr key={idx}>
                                <td>{t.name}</td>
                                <td>{t.result}</td>
                                <td className="emmc-normal">{t.status}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}

                      <div className="emmc-note">
                        🔒 Digitally signed and cryptographically stored under the National Digital Health Mission (ABDM) guidelines.
                      </div>
                    </div>
                  </div>

                  <div className="emmc-modal-footer">
                    <button
                      className="btn btn-danger"
                      style={{ marginRight: "auto" }}
                      onClick={() => deleteRecord(selectedRecord.id)}
                    >
                      Delete Record
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={() => setSelectedRecord(null)}
                    >
                      Close
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={() => showToast("Health Locker download started.")}
                    >
                      Download PDF
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* UPLOAD MODAL */}
          <div className={`modal-backdrop ${isUploadModalOpen ? "open" : ""}`} aria-hidden={!isUploadModalOpen}>
            <div className="modal">
              <div className="modal-head">
                <h2>Upload Medical Document</h2>
                <button className="close" onClick={() => setIsUploadModalOpen(false)}>
                  ×
                </button>
              </div>

              <form onSubmit={submitUploadRecord}>
                <div className="form-group">
                  <label>Document Title</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Apollo Blood Test, Village PHC Rx"
                    value={uploadTitle}
                    onChange={(e) => setUploadTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Doctor / Health Centre Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Dr. Ramesh Kumar / CHC Chevella"
                    value={uploadDoctor}
                    onChange={(e) => setUploadDoctor(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Document Type</label>
                  <select
                    className="form-control"
                    value={uploadCategory}
                    onChange={(e) => setUploadCategory(e.target.value)}
                  >
                    <option value="Prescription">Doctor Prescription</option>
                    <option value="Lab">Laboratory Report</option>
                    <option value="Scans">Ultrasound / X-Ray / Scan</option>
                  </select>
                </div>

                <div className="emmc-file-box">
                  <div>📸 Select or Photograph Document</div>
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleFileUpload}
                  />
                  {uploadImageFile && (
                    <div style={{ marginTop: 12, width: 80, height: 80, margin: "12px auto 0", borderRadius: 8, overflow: "hidden" }}>
                      <img src={uploadImageFile} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                  )}
                </div>

                <div className="modal-actions">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setIsUploadModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-green">
                    Save to Health Locker
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* LOGOUT CONFIRMATION MODAL */}
          <div className={`modal-backdrop ${isLogoutModalOpen ? "open" : ""}`} aria-hidden={!isLogoutModalOpen}>
            <div className="modal">
              <div className="modal-head">
                <h2>Confirm Logout</h2>
                <button className="close" onClick={() => setIsLogoutModalOpen(false)}>
                  ×
                </button>
              </div>
              <p style={{ color: "var(--muted)", fontSize: 14 }}>
                Are you sure you want to end your session? Your location telemetry will stop tracking until you sign in again.
              </p>
              <div className="modal-actions">
                <button
                  className="btn btn-secondary"
                  onClick={() => setIsLogoutModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    setIsLogoutModalOpen(false);
                    setIsLoggedIn(false);
                  }}
                >
                  Logout Now
                </button>
              </div>
            </div>
          </div>

          {/* FULL IMAGE VIEWER (ZOOM / PAN) */}
          <div className={`emmc-image-viewer ${viewerImage ? "show" : ""}`}>
            {viewerImage && (
              <>
                <button className="emmc-viewer-close" onClick={() => setViewerImage(null)}>
                  ×
                </button>
                <div className="emmc-viewer-toolbar">
                  <button onClick={() => setViewerZoom((z) => Math.min(z + 0.25, 3))}>Zoom In (+)</button>
                  <button onClick={() => setViewerZoom((z) => Math.max(z - 0.25, 0.5))}>Zoom Out (-)</button>
                  <button onClick={() => setViewerZoom(1)}>Reset</button>
                  <button
                    className="emmc-viewer-delete"
                    onClick={() => {
                      setViewerImage(null);
                      showToast("Image closed");
                    }}
                  >
                    Close Viewer
                  </button>
                </div>
                <div className="emmc-image-viewer-content">
                  <img
                    src={viewerImage}
                    alt={viewerTitle}
                    style={{ transform: `scale(${viewerZoom})` }}
                  />
                </div>
                <div className="emmc-viewer-name">{viewerTitle}</div>
              </>
            )}
          </div>

          {/* TOAST NOTIFICATION */}
          <div className={`toast ${toastVisible ? "show" : ""}`}>{toastMessage}</div>
        </>
      );
    }


export default PatientDashboard;
