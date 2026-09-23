import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CURRENT_ORG = {
  name: "Community Health Centre (CHC) Burmu",
  shortName: "CHC Burmu",
  type: "Government Health Facility",
  address: "Burmu Block, Near Burmu Bazar, Ranchi",
  district: "Ranchi",
  state: "Jharkhand",
  pin: "835202",
  contact: "+91 651 220 1010",
  emergency: "Available 24×7",
  ambulanceService: "3 vehicles stationed",
};

const INITIAL_REFERRALS = [
  {
    id: "PAT1042",
    patient: "Sunita Devi",
    to: "Orchid Hospital, Ranchi",
    days: 4,
    status: "pending",
  },
  {
    id: "PAT1045",
    patient: "Ram Prasad",
    to: "City Care Hospital, Ranchi",
    days: 1,
    status: "transit",
  },
  {
    id: "PAT1039",
    patient: "Meena Kumari",
    to: "RIMS, Ranchi",
    days: 6,
    status: "overdue",
  },
  {
    id: "PAT1031",
    patient: "G. Prasad",
    to: "City Care Hospital, Ranchi",
    days: 0,
    status: "completed",
  },
];

const INITIAL_FOLLOWUPS = [
  {
    patient: "Sunita Devi",
    category: "High-risk pregnancy",
    due: "10 Sep",
    status: "overdue",
  },
  {
    patient: "Ram Prasad",
    category: "Diabetes follow-up",
    due: "12 Sep",
    status: "overdue",
  },
  {
    patient: "N. Bano",
    category: "Hypertension follow-up",
    due: "16 Sep",
    status: "upcoming",
  },
  {
    patient: "Meena Kumari",
    category: "High-risk pregnancy",
    due: "18 Sep",
    status: "upcoming",
  },
];

const INITIAL_AMBULANCES = [
  {
    vehicle: "BR-01 AB 4021",
    driver: "S. Yadav",
    type: "Basic Life Support",
    status: "available",
    patient: "—",
    location: "CHC Burmu (base)",
    eta: "—",
  },
  {
    vehicle: "BR-01 AB 4022",
    driver: "V. Kumar",
    type: "Advanced Life Support",
    status: "trip",
    patient: "Meena Kumari",
    location: "Ranchi–Burmu Road, 6 km from Orchid Hospital",
    eta: "12 min",
  },
  {
    vehicle: "BR-01 AB 4023",
    driver: "—",
    type: "Patient Transport",
    status: "maintenance",
    patient: "—",
    location: "Workshop, brake repair",
    eta: "—",
  },
];

const OXYGEN_LEVEL = 78;

const STATUS_LABELS = {
  pending: "Pending",
  transit: "In transit",
  completed: "Completed",
  overdue: "Overdue",
};

const AMBULANCE_STATUS_LABELS = {
  available: "Available",
  trip: "On Trip",
  maintenance: "Maintenance",
};

function Icon({ type, size = 20 }) {
  const icons = {
    dashboard: "▦",
    referral: "↔",
    ambulance: "♨",
    logout: "⇥",
    alert: "!",
    check: "✓",
    truck: "▰",
    wrench: "⚒",
    oxygen: "◌",
    close: "×",
    arrow: "→",
  };

  return (
    <span
      style={{
        width: size,
        height: size,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: size * 0.9,
        lineHeight: 1,
        fontWeight: 700,
      }}
    >
      {icons[type] || "•"}
    </span>
  );
}

export default function LHODashboard() {
  const navigate = useNavigate();

  const [activePage, setActivePage] = useState("dashboard");
  const [referrals, setReferrals] = useState(INITIAL_REFERRALS);
  const [followups, setFollowups] = useState(INITIAL_FOLLOWUPS);
  const [ambulances, setAmbulances] = useState(INITIAL_AMBULANCES);

  const [referralFilter, setReferralFilter] = useState("all");

  const [dispatchIndex, setDispatchIndex] = useState(null);
  const [showOrgModal, setShowOrgModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const overdueReferrals = referrals.filter(
    (item) => item.status === "overdue"
  ).length;

  const overdueFollowups = followups.filter(
    (item) => item.status === "overdue"
  ).length;

  const availableAmbulances = ambulances.filter(
    (item) => item.status === "available"
  ).length;

  const tripAmbulances = ambulances.filter(
    (item) => item.status === "trip"
  ).length;

  const maintenanceAmbulances = ambulances.filter(
    (item) => item.status === "maintenance"
  ).length;

  const attentionCount = overdueReferrals + overdueFollowups;

  const filteredReferrals = referrals.filter((item) => {
    if (referralFilter === "all") return true;
    return item.status === referralFilter;
  });

  const dispatchAmbulance =
    dispatchIndex !== null ? ambulances[dispatchIndex] : null;

  const handleLogout = () => {
    /*
      Clear all EMMC login/session information
    */
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("emmcSession");
    localStorage.removeItem("lho");
    localStorage.removeItem("lhoUser");
    localStorage.removeItem("lhoId");
    localStorage.removeItem("pendingLhoId");
    localStorage.removeItem("pendingLHOId");

    sessionStorage.removeItem("lho");
    sessionStorage.removeItem("lhoUser");
    sessionStorage.removeItem("lhoId");

    /*
      Directly return to EMMC front page.
      No alert is shown.
    */
    navigate("/", { replace: true });
  };

  const markContacted = (index) => {
    setFollowups((previous) =>
      previous.map((item, i) =>
        i === index
          ? {
              ...item,
              status: "upcoming",
            }
          : item
      )
    );
  };

  const confirmDispatch = () => {
    if (dispatchIndex === null) return;

    setAmbulances((previous) =>
      previous.map((ambulance, index) =>
        index === dispatchIndex
          ? {
              ...ambulance,
              status: "trip",
              patient: "New referral case",
              location: "Leaving CHC Burmu",
              eta: "25 min",
            }
          : ambulance
      )
    );

    setDispatchIndex(null);
  };

  const getStatusClass = (status) => {
    if (status === "completed" || status === "available") {
      return "status status-success";
    }

    if (status === "transit" || status === "trip") {
      return "status status-blue";
    }

    if (status === "maintenance") {
      return "status status-orange";
    }

    if (status === "overdue") {
      return "status status-danger";
    }

    return "status status-warning";
  };

  return (
    <div className="lho-dashboard">
      <style>{`
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
        }

        .lho-dashboard {
          min-height: 100vh;
          background: #f5f7fb;
          color: #172033;
          font-family:
            Inter,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            Arial,
            sans-serif;
        }

        /* ================= SIDEBAR ================= */

        .lho-sidebar {
          position: fixed;
          left: 0;
          top: 0;
          bottom: 0;
          width: 268px;
          background: #050914;
          color: white;
          z-index: 50;
          display: flex;
          flex-direction: column;
          box-shadow: 4px 0 20px rgba(15, 23, 42, 0.08);
        }

        .lho-logo-area {
          height: 142px;
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          border-bottom: 1px solid #e5e7eb;
        }

        .lho-logo {
          width: 210px;
          max-width: 100%;
          height: auto;
          object-fit: contain;
        }

        .lho-menu-title {
          padding: 34px 28px 14px;
          color: #64748b;
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.7px;
        }

        .lho-menu {
          padding: 0 14px;
        }

        .lho-menu-item {
          width: 100%;
          border: 0;
          background: transparent;
          color: #aab3c5;
          padding: 14px 16px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          gap: 13px;
          cursor: pointer;
          font-size: 14px;
          text-align: left;
          margin-bottom: 5px;
          transition: 0.2s;
        }

        .lho-menu-item:hover {
          background: #111827;
          color: white;
        }

        .lho-menu-item.active {
          background: #1459d9;
          color: white;
          box-shadow: 0 6px 18px rgba(20, 89, 217, 0.22);
        }

        .lho-menu-icon {
          width: 25px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .lho-menu-count {
          margin-left: auto;
          min-width: 22px;
          height: 22px;
          padding: 0 6px;
          border-radius: 999px;
          background: #ef4444;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 800;
        }

        .lho-sidebar-bottom {
          margin-top: auto;
          padding: 14px;
          border-top: 1px solid #171d2b;
        }

        .lho-logout-button {
          color: #ef4444;
        }

        .lho-logout-button:hover {
          background: rgba(239, 68, 68, 0.1);
          color: #ff6b6b;
        }

        /* ================= MAIN ================= */

        .lho-main {
          margin-left: 268px;
          min-height: 100vh;
        }

        .lho-header {
          height: 118px;
          background: white;
          border-bottom: 1px solid #e5e7eb;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 34px;
        }

        .lho-header-title h1 {
          margin: 0;
          font-size: 25px;
          color: #101828;
          font-weight: 750;
        }

        .lho-header-title p {
          margin: 7px 0 0;
          color: #64748b;
          font-size: 13px;
        }

        .lho-profile {
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          padding: 8px 12px;
          border-radius: 12px;
          transition: 0.2s;
        }

        .lho-profile:hover {
          background: #f8fafc;
        }

        .lho-profile-avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: #1459d9;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 15px;
        }

        .lho-profile-info strong {
          display: block;
          color: #172033;
          font-size: 14px;
        }

        .lho-profile-info span {
          display: block;
          color: #64748b;
          font-size: 12px;
          margin-top: 3px;
        }

        .lho-content {
          padding: 30px 34px 50px;
        }

        .lho-page {
          display: none;
        }

        .lho-page.active {
          display: block;
        }

        /* ================= CARDS ================= */

        .lho-cards {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 18px;
        }

        .lho-card {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 14px;
          padding: 21px;
          box-shadow: 0 3px 12px rgba(15, 23, 42, 0.035);
        }

        .lho-card-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 15px;
        }

        .lho-card p {
          margin: 0;
          color: #64748b;
          font-size: 12px;
          line-height: 1.5;
        }

        .lho-card h3 {
          margin: 8px 0 0;
          color: #111827;
          font-size: 27px;
        }

        .lho-card-bottom {
          margin-top: 18px !important;
        }

        .lho-card-icon {
          width: 42px;
          height: 42px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .lho-card-icon.red {
          background: #fef2f2;
          color: #dc2626;
        }

        .lho-card-icon.green {
          background: #ecfdf5;
          color: #059669;
        }

        .lho-card-icon.blue {
          background: #eff6ff;
          color: #2563eb;
        }

        .lho-card-icon.orange {
          background: #fff7ed;
          color: #ea580c;
        }

        /* ================= SECTIONS ================= */

        .lho-section {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 14px;
          margin-top: 22px;
          overflow: hidden;
          box-shadow: 0 3px 12px rgba(15, 23, 42, 0.035);
        }

        .lho-section-header {
          padding: 19px 21px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          border-bottom: 1px solid #eef0f4;
        }

        .lho-section-header h2 {
          margin: 0;
          font-size: 16px;
          color: #111827;
        }

        .lho-section-header button,
        .lho-view-button {
          border: 0;
          background: transparent;
          color: #1459d9;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
        }

        /* ================= TABLE ================= */

        .lho-table-wrap {
          width: 100%;
          overflow-x: auto;
        }

        .lho-table {
          width: 100%;
          border-collapse: collapse;
          min-width: 650px;
        }

        .lho-table th {
          background: #f8fafc;
          color: #64748b;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.4px;
          font-weight: 750;
          padding: 13px 18px;
          text-align: left;
          white-space: nowrap;
        }

        .lho-table td {
          padding: 15px 18px;
          border-top: 1px solid #eef0f4;
          color: #334155;
          font-size: 13px;
        }

        .lho-table tbody tr:hover {
          background: #fafcff;
        }

        .status {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 5px 10px;
          border-radius: 999px;
          font-size: 11px;
          font-weight: 750;
          white-space: nowrap;
        }

        .status-success {
          background: #dcfce7;
          color: #166534;
        }

        .status-blue {
          background: #dbeafe;
          color: #1d4ed8;
        }

        .status-orange {
          background: #ffedd5;
          color: #c2410c;
        }

        .status-danger {
          background: #fee2e2;
          color: #b91c1c;
        }

        .status-warning {
          background: #fef3c7;
          color: #92400e;
        }

        /* ================= STATS ================= */

        .lho-stats {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 15px;
          padding: 20px;
        }

        .lho-stat {
          background: #f8fafc;
          border: 1px solid #e5e7eb;
          border-radius: 11px;
          padding: 17px;
        }

        .lho-stat p {
          margin: 0;
          font-size: 12px;
          color: #64748b;
        }

        .lho-stat strong {
          display: block;
          margin-top: 9px;
          font-size: 21px;
          color: #111827;
        }

        /* ================= AMBULANCE ================= */

        .lho-ambulance-grid {
          padding: 20px;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 17px;
        }

        .lho-ambulance {
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 19px;
          background: #fff;
        }

        .lho-ambulance h3 {
          margin: 0 0 13px;
          font-size: 15px;
          color: #111827;
        }

        .lho-ambulance p {
          margin: 7px 0;
          font-size: 12px;
          color: #64748b;
          line-height: 1.45;
        }

        .lho-action {
          border: 0;
          border-radius: 7px;
          padding: 8px 13px;
          font-size: 11px;
          font-weight: 700;
          cursor: pointer;
          margin-top: 12px;
        }

        .lho-action-green {
          background: #dcfce7;
          color: #166534;
        }

        .lho-action-green:hover {
          background: #bbf7d0;
        }

        .lho-action-red {
          background: #fee2e2;
          color: #b91c1c;
        }

        .lho-action-blue {
          background: #dbeafe;
          color: #1d4ed8;
        }

        /* ================= FILTER ================= */

        .lho-select {
          border: 1px solid #d1d5db;
          background: white;
          border-radius: 8px;
          padding: 8px 11px;
          font-size: 12px;
          color: #334155;
          outline: none;
        }

        .lho-select:focus {
          border-color: #2563eb;
        }

        /* ================= MODAL ================= */

        .lho-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(15, 23, 42, 0.52);
          display: none;
          align-items: center;
          justify-content: center;
          padding: 20px;
          z-index: 100;
        }

        .lho-modal-overlay.show {
          display: flex;
        }

        .lho-modal {
          width: 100%;
          max-width: 510px;
          background: white;
          border-radius: 16px;
          padding: 25px;
          position: relative;
          box-shadow: 0 25px 70px rgba(15, 23, 42, 0.25);
          animation: lhoModalIn 0.18s ease-out;
        }

        @keyframes lhoModalIn {
          from {
            opacity: 0;
            transform: translateY(10px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .lho-modal-close {
          position: absolute;
          right: 15px;
          top: 15px;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          border: 0;
          background: #f1f5f9;
          color: #475569;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
        }

        .lho-modal h2 {
          margin: 0 0 12px;
          font-size: 20px;
          color: #111827;
        }

        .lho-modal > p {
          color: #64748b;
          font-size: 13px;
          line-height: 1.6;
        }

        .lho-modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          margin-top: 22px;
        }

        .lho-modal-button {
          border: 0;
          border-radius: 8px;
          padding: 10px 17px;
          cursor: pointer;
          font-size: 12px;
          font-weight: 750;
        }

        .lho-modal-cancel {
          background: #eff6ff;
          color: #1d4ed8;
        }

        .lho-modal-confirm {
          background: #fee2e2;
          color: #b91c1c;
        }

        .lho-modal-confirm:hover {
          background: #fecaca;
        }

        /* ================= PROFILE ================= */

        .lho-profile-main {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 20px;
        }

        .lho-profile-big {
          width: 58px;
          height: 58px;
          border-radius: 50%;
          background: #2563eb;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
        }

        .lho-profile-main strong {
          font-size: 15px;
          color: #111827;
        }

        .lho-profile-main span {
          display: block;
          color: #64748b;
          font-size: 12px;
          margin-top: 4px;
        }

        .lho-info-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 10px;
        }

        .lho-info-box {
          padding: 13px;
          background: #f8fafc;
          border: 1px solid #e5e7eb;
          border-radius: 9px;
        }

        .lho-info-box.full {
          grid-column: 1 / -1;
        }

        .lho-info-box label {
          display: block;
          color: #64748b;
          font-size: 10px;
          margin-bottom: 5px;
          text-transform: uppercase;
          font-weight: 700;
        }

        .lho-info-box strong {
          color: #334155;
          font-size: 12px;
          line-height: 1.5;
        }

        /* ================= RESPONSIVE ================= */

        @media (max-width: 1150px) {
          .lho-cards {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .lho-stats {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .lho-ambulance-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 800px) {
          .lho-sidebar {
            width: 215px;
          }

          .lho-main {
            margin-left: 215px;
          }

          .lho-header {
            padding: 0 20px;
          }

          .lho-content {
            padding: 20px;
          }

          .lho-logo-area {
            height: 115px;
          }

          .lho-logo {
            width: 165px;
          }

          .lho-profile-info {
            display: none;
          }
        }

        @media (max-width: 620px) {
          .lho-sidebar {
            position: relative;
            width: 100%;
            height: auto;
            min-height: auto;
          }

          .lho-main {
            margin-left: 0;
          }

          .lho-dashboard {
            display: block;
          }

          .lho-sidebar-bottom {
            margin-top: 10px;
          }

          .lho-header {
            height: auto;
            min-height: 100px;
            padding: 18px;
          }

          .lho-header-title h1 {
            font-size: 19px;
          }

          .lho-cards {
            grid-template-columns: 1fr;
          }

          .lho-stats {
            grid-template-columns: 1fr;
          }

          .lho-info-grid {
            grid-template-columns: 1fr;
          }

          .lho-info-box.full {
            grid-column: auto;
          }

          .lho-section-header {
            align-items: flex-start;
            flex-direction: column;
          }
        }
      `}</style>

      {/* ================= SIDEBAR ================= */}

      <aside className="lho-sidebar">
        <div className="lho-logo-area">
          <img
            src="/logo.png"
            alt="EMMC Logo"
            className="lho-logo"
          />
        </div>

        <div className="lho-menu-title">
          Facility Dashboard
        </div>

        <nav className="lho-menu">
          <button
            type="button"
            className={`lho-menu-item ${
              activePage === "dashboard" ? "active" : ""
            }`}
            onClick={() => setActivePage("dashboard")}
          >
            <span className="lho-menu-icon">
              <Icon type="dashboard" />
            </span>

            <span>Overview</span>
          </button>

          <button
            type="button"
            className={`lho-menu-item ${
              activePage === "referrals" ? "active" : ""
            }`}
            onClick={() => setActivePage("referrals")}
          >
            <span className="lho-menu-icon">
              <Icon type="referral" />
            </span>

            <span>Referrals & Follow-up</span>

            {attentionCount > 0 && (
              <span className="lho-menu-count">
                {attentionCount}
              </span>
            )}
          </button>

          <button
            type="button"
            className={`lho-menu-item ${
              activePage === "ambulance" ? "active" : ""
            }`}
            onClick={() => setActivePage("ambulance")}
          >
            <span className="lho-menu-icon">
              <Icon type="ambulance" />
            </span>

            <span>Ambulances</span>
          </button>
        </nav>

        <div className="lho-sidebar-bottom">
          <button
            type="button"
            className="lho-menu-item lho-logout-button"
            onClick={() => setShowLogoutModal(true)}
          >
            <span className="lho-menu-icon">
              <Icon type="logout" />
            </span>

            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* ================= MAIN ================= */}

      <main className="lho-main">

        {/* HEADER */}

        <header className="lho-header">
          <div className="lho-header-title">
            {activePage === "dashboard" && (
              <>
                <h1>Facility Overview</h1>
                <p>
                  Community Health Centre (CHC) Burmu · today
                </p>
              </>
            )}

            {activePage === "referrals" && (
              <>
                <h1>Referrals & Follow-up</h1>
                <p>
                  Referral pipeline and high-risk care register
                </p>
              </>
            )}

            {activePage === "ambulance" && (
              <>
                <h1>Ambulance Tracking</h1>
                <p>
                  Vehicles provided for rural patient transport
                </p>
              </>
            )}
          </div>

          <div
            className="lho-profile"
            onClick={() => setShowOrgModal(true)}
          >
            <div className="lho-profile-avatar">
              CB
            </div>

            <div className="lho-profile-info">
              <strong>{CURRENT_ORG.shortName}</strong>
              <span>{CURRENT_ORG.type}</span>
            </div>
          </div>
        </header>

        <div className="lho-content">

          {/* =====================================================
              OVERVIEW
          ===================================================== */}

          <section
            className={`lho-page ${
              activePage === "dashboard" ? "active" : ""
            }`}
          >
            <div className="lho-cards">

              <div className="lho-card">
                <div className="lho-card-top">
                  <div>
                    <p>Referrals Overdue</p>
                    <h3>{overdueReferrals}</h3>
                  </div>

                  <div className="lho-card-icon red">
                    <Icon type="referral" />
                  </div>
                </div>

                <p className="lho-card-bottom">
                  Needs follow-up with receiving facility
                </p>
              </div>

              <div className="lho-card">
                <div className="lho-card-top">
                  <div>
                    <p>Follow-ups Overdue</p>
                    <h3>{overdueFollowups}</h3>
                  </div>

                  <div className="lho-card-icon red">
                    <Icon type="alert" />
                  </div>
                </div>

                <p className="lho-card-bottom">
                  High-risk pregnancy & chronic care
                </p>
              </div>

              <div className="lho-card">
                <div className="lho-card-top">
                  <div>
                    <p>Ambulances Available</p>
                    <h3>
                      {availableAmbulances}/{ambulances.length}
                    </h3>
                  </div>

                  <div className="lho-card-icon green">
                    <Icon type="ambulance" />
                  </div>
                </div>

                <p className="lho-card-bottom">
                  Ready for dispatch
                </p>
              </div>

              <div className="lho-card">
                <div className="lho-card-top">
                  <div>
                    <p>Oxygen Level</p>
                    <h3>{OXYGEN_LEVEL}%</h3>
                  </div>

                  <div className="lho-card-icon blue">
                    <Icon type="oxygen" />
                  </div>
                </div>

                <p className="lho-card-bottom">
                  Cylinder reserve across facility
                </p>
              </div>

            </div>

            {/* Ambulance Status */}

            <div className="lho-section">
              <div className="lho-section-header">
                <h2>Ambulance Status</h2>

                <button
                  type="button"
                  onClick={() => setActivePage("ambulance")}
                >
                  View All
                </button>
              </div>

              <div className="lho-cards" style={{ padding: 20 }}>

                <div className="lho-card">
                  <div className="lho-card-top">
                    <div>
                      <p>Available</p>
                      <h3>{availableAmbulances}</h3>
                    </div>

                    <div className="lho-card-icon green">
                      <Icon type="check" />
                    </div>
                  </div>
                </div>

                <div className="lho-card">
                  <div className="lho-card-top">
                    <div>
                      <p>On Trip</p>
                      <h3>{tripAmbulances}</h3>
                    </div>

                    <div className="lho-card-icon blue">
                      <Icon type="truck" />
                    </div>
                  </div>
                </div>

                <div className="lho-card">
                  <div className="lho-card-top">
                    <div>
                      <p>Maintenance</p>
                      <h3>{maintenanceAmbulances}</h3>
                    </div>

                    <div className="lho-card-icon orange">
                      <Icon type="wrench" />
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Needs Attention */}

            <div className="lho-section">
              <div className="lho-section-header">
                <h2>Needs Attention</h2>
              </div>

              <div className="lho-table-wrap">
                <table className="lho-table">
                  <thead>
                    <tr>
                      <th>Issue</th>
                      <th>Detail</th>
                      <th>Severity</th>
                    </tr>
                  </thead>

                  <tbody>

                    {referrals
                      .filter((item) => item.status === "overdue")
                      .map((item) => (
                        <tr key={item.id}>
                          <td>Referral overdue</td>

                          <td>
                            {item.id} ({item.patient}) —{" "}
                            {item.days} days pending
                          </td>

                          <td>
                            <span className="status status-danger">
                              Critical
                            </span>
                          </td>
                        </tr>
                      ))}

                    {followups
                      .filter((item) => item.status === "overdue")
                      .map((item, index) => (
                        <tr key={`followup-${index}`}>
                          <td>Follow-up overdue</td>

                          <td>
                            {item.patient} — {item.category},{" "}
                            due {item.due}
                          </td>

                          <td>
                            <span className="status status-warning">
                              Watch
                            </span>
                          </td>
                        </tr>
                      ))}

                    {ambulances
                      .filter(
                        (item) =>
                          item.status === "maintenance"
                      )
                      .map((item, index) => (
                        <tr key={`ambulance-${index}`}>
                          <td>Ambulance down</td>

                          <td>
                            {item.vehicle} — {item.location}
                          </td>

                          <td>
                            <span className="status status-warning">
                              Watch
                            </span>
                          </td>
                        </tr>
                      ))}

                  </tbody>
                </table>
              </div>
            </div>

            {/* Today's Statistics */}

            <div className="lho-section">
              <div className="lho-section-header">
                <h2>Today's Statistics</h2>
              </div>

              <div className="lho-stats">

                <div className="lho-stat">
                  <p>Bed occupancy, General ward</p>
                  <strong>14 / 20</strong>
                </div>

                <div className="lho-stat">
                  <p>Bed occupancy, Isolation</p>
                  <strong>5 / 6</strong>
                </div>

                <div className="lho-stat">
                  <p>Referrals issued this week</p>
                  <strong>17</strong>
                </div>

                <div className="lho-stat">
                  <p>Referrals completed</p>
                  <strong>12</strong>
                </div>

              </div>
            </div>
          </section>

          {/* =====================================================
              REFERRALS
          ===================================================== */}

          <section
            className={`lho-page ${
              activePage === "referrals" ? "active" : ""
            }`}
          >

            <div className="lho-section">
              <div className="lho-section-header">
                <h2>Referral Pipeline</h2>

                <select
                  className="lho-select"
                  value={referralFilter}
                  onChange={(event) =>
                    setReferralFilter(event.target.value)
                  }
                >
                  <option value="all">All</option>
                  <option value="pending">Pending</option>
                  <option value="transit">In transit</option>
                  <option value="completed">
                    Completed
                  </option>
                  <option value="overdue">Overdue</option>
                </select>
              </div>

              <div className="lho-table-wrap">
                <table className="lho-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Patient</th>
                      <th>To</th>
                      <th>Days Pending</th>
                      <th>Status</th>
                    </tr>
                  </thead>

                  <tbody>

                    {filteredReferrals.map((item) => (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.patient}</td>
                        <td>{item.to}</td>
                        <td>{item.days}</td>
                        <td>
                          <span
                            className={getStatusClass(
                              item.status
                            )}
                          >
                            {STATUS_LABELS[item.status]}
                          </span>
                        </td>
                      </tr>
                    ))}

                  </tbody>
                </table>
              </div>
            </div>

            <div className="lho-section">
              <div className="lho-section-header">
                <h2>
                  High-Risk Follow-up Register
                </h2>
              </div>

              <div className="lho-table-wrap">
                <table className="lho-table">
                  <thead>
                    <tr>
                      <th>Patient</th>
                      <th>Category</th>
                      <th>Due Date</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>

                    {followups.map((item, index) => (
                      <tr key={index}>
                        <td>{item.patient}</td>

                        <td>{item.category}</td>

                        <td>{item.due}</td>

                        <td>
                          <span
                            className={
                              item.status === "overdue"
                                ? "status status-danger"
                                : "status status-success"
                            }
                          >
                            {item.status === "overdue"
                              ? "Overdue"
                              : "Upcoming"}
                          </span>
                        </td>

                        <td>
                          {item.status === "overdue" ? (
                            <button
                              type="button"
                              className="lho-action lho-action-green"
                              onClick={() =>
                                markContacted(index)
                              }
                            >
                              Mark contacted
                            </button>
                          ) : (
                            "—"
                          )}
                        </td>
                      </tr>
                    ))}

                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* =====================================================
              AMBULANCE
          ===================================================== */}

          <section
            className={`lho-page ${
              activePage === "ambulance" ? "active" : ""
            }`}
          >

            <div className="lho-section">
              <div className="lho-section-header">
                <h2>Ambulance Details</h2>
              </div>

              <div className="lho-ambulance-grid">

                {ambulances.map((ambulance, index) => (
                  <div
                    className="lho-ambulance"
                    key={index}
                  >
                    <h3>{ambulance.vehicle}</h3>

                    <p>
                      <strong>Driver:</strong>{" "}
                      {ambulance.driver}
                    </p>

                    <p>
                      <strong>Type:</strong>{" "}
                      {ambulance.type}
                    </p>

                    <p>
                      <strong>Assigned:</strong>{" "}
                      {ambulance.patient}
                    </p>

                    <p>
                      <strong>Location:</strong>{" "}
                      {ambulance.location}
                    </p>

                    <p>
                      <strong>ETA:</strong>{" "}
                      {ambulance.eta}
                    </p>

                    <div style={{ marginTop: 12 }}>
                      <span
                        className={getStatusClass(
                          ambulance.status
                        )}
                      >
                        {
                          AMBULANCE_STATUS_LABELS[
                            ambulance.status
                          ]
                        }
                      </span>
                    </div>

                    {ambulance.status === "available" && (
                      <button
                        type="button"
                        className="lho-action lho-action-green"
                        onClick={() =>
                          setDispatchIndex(index)
                        }
                      >
                        Dispatch
                      </button>
                    )}
                  </div>
                ))}

              </div>
            </div>
          </section>
        </div>
      </main>

      {/* =========================================================
          DISPATCH MODAL
      ========================================================= */}

      <div
        className={`lho-modal-overlay ${
          dispatchAmbulance ? "show" : ""
        }`}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            setDispatchIndex(null);
          }
        }}
      >
        <div className="lho-modal">

          <button
            type="button"
            className="lho-modal-close"
            onClick={() => setDispatchIndex(null)}
          >
            ×
          </button>

          <h2>Dispatch Ambulance</h2>

          {dispatchAmbulance && (
            <>
              <p>
                <strong>Vehicle:</strong>{" "}
                {dispatchAmbulance.vehicle}
              </p>

              <p>
                <strong>Driver:</strong>{" "}
                {dispatchAmbulance.driver}
              </p>

              <p>
                <strong>Type:</strong>{" "}
                {dispatchAmbulance.type}
              </p>

              <p>
                Confirm dispatch for the next referral
                case awaiting transport.
              </p>
            </>
          )}

          <div className="lho-modal-actions">

            <button
              type="button"
              className="lho-modal-button lho-modal-confirm"
              onClick={confirmDispatch}
            >
              Confirm Dispatch
            </button>

            <button
              type="button"
              className="lho-modal-button lho-modal-cancel"
              onClick={() => setDispatchIndex(null)}
            >
              Cancel
            </button>

          </div>
        </div>
      </div>

      {/* =========================================================
          ORGANIZATION PROFILE MODAL
      ========================================================= */}

      <div
        className={`lho-modal-overlay ${
          showOrgModal ? "show" : ""
        }`}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            setShowOrgModal(false);
          }
        }}
      >
        <div className="lho-modal">

          <button
            type="button"
            className="lho-modal-close"
            onClick={() => setShowOrgModal(false)}
          >
            ×
          </button>

          <h2>Organization Profile</h2>

          <div className="lho-profile-main">
            <div className="lho-profile-big">
              CB
            </div>

            <div>
              <strong>
                {CURRENT_ORG.name}
              </strong>

              <span>
                {CURRENT_ORG.type}
              </span>
            </div>
          </div>

          <div className="lho-info-grid">

            <div className="lho-info-box full">
              <label>Organization Name</label>
              <strong>
                {CURRENT_ORG.name}
              </strong>
            </div>

            <div className="lho-info-box full">
              <label>Organization Type</label>
              <strong>
                {CURRENT_ORG.type}
              </strong>
            </div>

            <div className="lho-info-box full">
              <label>Address</label>
              <strong>
                {CURRENT_ORG.address}
              </strong>
            </div>

            <div className="lho-info-box full">
              <label>District / State / PIN</label>
              <strong>
                {CURRENT_ORG.district} /{" "}
                {CURRENT_ORG.state} /{" "}
                {CURRENT_ORG.pin}
              </strong>
            </div>

            <div className="lho-info-box">
              <label>Official Contact</label>
              <strong>
                {CURRENT_ORG.contact}
              </strong>
            </div>

            <div className="lho-info-box">
              <label>Emergency Service</label>
              <strong>
                {CURRENT_ORG.emergency}
              </strong>
            </div>

            <div className="lho-info-box full">
              <label>Ambulance Service</label>
              <strong>
                {CURRENT_ORG.ambulanceService}
              </strong>
            </div>

          </div>
        </div>
      </div>

      {/* =========================================================
          LOGOUT CONFIRMATION MODAL
      ========================================================= */}

      <div
        className={`lho-modal-overlay ${
          showLogoutModal ? "show" : ""
        }`}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            setShowLogoutModal(false);
          }
        }}
      >
        <div className="lho-modal">

          <button
            type="button"
            className="lho-modal-close"
            onClick={() => setShowLogoutModal(false)}
          >
            ×
          </button>

          <h2>Logout</h2>

          <p>
            Are you sure you want to logout from the
            facility dashboard?
          </p>

          <div className="lho-modal-actions">

            <button
              type="button"
              className="lho-modal-button lho-modal-confirm"
              onClick={handleLogout}
            >
              Yes, Logout
            </button>

            <button
              type="button"
              className="lho-modal-button lho-modal-cancel"
              onClick={() => setShowLogoutModal(false)}
            >
              Cancel
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}