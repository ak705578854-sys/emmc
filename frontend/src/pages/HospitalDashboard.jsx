// import { useState, useEffect, useMemo, useRef } from "react";
// import "./HospitalDashboard.css";


//         const INITIAL_PRIORITY_REQUESTS = [
//       { 
//         id: "PR-001", 
//         ambulanceId: "AMB 104", 
//         case: "Road Accident Case", 
//         priority: "Critical", 
//         status: "Active", 
//         created: "09:12 AM",
//         pickupLocation: "Main Road, Ranchi",
//         destinationHospital: "City Care Hospital",
//         driverName: "Rahul Kumar",
//         driverContact: "98XXXXXX21",
//         timelineStep: 4
//       },
//       { 
//         id: "PR-002", 
//         ambulanceId: "AMB 108", 
//         case: "Cardiac Emergency", 
//         priority: "Critical", 
//         status: "Active", 
//         created: "09:25 AM",
//         pickupLocation: "Bariatu, Ranchi",
//         destinationHospital: "City Care Hospital",
//         driverName: "Amit Kumar",
//         driverContact: "98XXXXXX28",
//         timelineStep: 3
//       },
//       { 
//         id: "PR-003", 
//         ambulanceId: "AMB 102", 
//         case: "Trauma Case", 
//         priority: "Urgent", 
//         status: "Pending", 
//         created: "09:41 AM",
//         pickupLocation: "Lalpur, Ranchi",
//         destinationHospital: "City Care Hospital",
//         driverName: "Sanjay Kumar",
//         driverContact: "98XXXXXX22",
//         timelineStep: 1
//       },
//       { 
//         id: "PR-004", 
//         ambulanceId: "AMB 101", 
//         case: "Medical Emergency", 
//         priority: "Urgent", 
//         status: "Completed", 
//         created: "10:05 AM",
//         pickupLocation: "Kanke Road, Ranchi",
//         destinationHospital: "City Care Hospital",
//         driverName: "Vikas Kumar",
//         driverContact: "98XXXXXX20",
//         timelineStep: 6
//       },
//       { 
//         id: "PR-005", 
//         ambulanceId: "AMB 109", 
//         case: "Patient Transfer", 
//         priority: "Normal", 
//         status: "Completed", 
//         created: "10:32 AM",
//         pickupLocation: "Doranda, Ranchi",
//         destinationHospital: "City Care Hospital",
//         driverName: "Rohit Kumar",
//         driverContact: "98XXXXXX29",
//         timelineStep: 6
//       },
//       { 
//         id: "PR-006", 
//         ambulanceId: "AMB 103", 
//         case: "Accident Case", 
//         priority: "Critical", 
//         status: "Completed", 
//         created: "10:48 AM",
//         pickupLocation: "Ratu Road, Ranchi",
//         destinationHospital: "City Care Hospital",
//         driverName: "Deepak Kumar",
//         driverContact: "98XXXXXX23",
//         timelineStep: 6
//       },
//       { 
//         id: "PR-007", 
//         ambulanceId: "AMB 105", 
//         case: "Medical Emergency", 
//         priority: "Urgent", 
//         status: "Completed", 
//         created: "11:10 AM",
//         pickupLocation: "Hinoo, Ranchi",
//         destinationHospital: "City Care Hospital",
//         driverName: "Manoj Kumar",
//         driverContact: "98XXXXXX25",
//         timelineStep: 6
//       },
//       { 
//         id: "PR-008", 
//         ambulanceId: "AMB 106", 
//         case: "Patient Transfer", 
//         priority: "Normal", 
//         status: "Completed", 
//         created: "11:34 AM",
//         pickupLocation: "Namkum, Ranchi",
//         destinationHospital: "City Care Hospital",
//         driverName: "Ajay Kumar",
//         driverContact: "98XXXXXX26",
//         timelineStep: 6
//       }
//     ];

//     const INITIAL_AMBULANCES = [
//       { id: "AMB 101", registration: "JH-01-AB-2101", makeModel: "Mahindra Bolero", type: "Basic Life Support (BLS)", driver: "Vikas Kumar", mobile: "9876543201", status: "Available" },
//       { id: "AMB 102", registration: "JH-01-AB-2102", makeModel: "Force Traveller", type: "Advanced Life Support (ALS)", driver: "Sanjay Kumar", mobile: "9876543202", status: "Available" },
//       { id: "AMB 103", registration: "JH-01-AB-2103", makeModel: "Tata Winger", type: "Patient Transport Ambulance (PTA)", driver: "Deepak Kumar", mobile: "9876543203", status: "Available" },
//       { id: "AMB 104", registration: "JH-01-AB-2104", makeModel: "Mahindra Bolero", type: "ICU Ambulance", driver: "Rahul Kumar", mobile: "9876543204", status: "Busy" },
//       { id: "AMB 105", registration: "JH-01-AB-2105", makeModel: "Force Traveller", type: "Basic Life Support (BLS)", driver: "Manoj Kumar", mobile: "9876543205", status: "Available" },
//       { id: "AMB 106", registration: "JH-01-AB-2106", makeModel: "Tata Winger", type: "Patient Transport Ambulance (PTA)", driver: "Ajay Kumar", mobile: "9876543206", status: "Available" },
//       { id: "AMB 108", registration: "JH-01-AB-2108", makeModel: "Mahindra Bolero", type: "Advanced Life Support (ALS)", driver: "Amit Kumar", mobile: "9876543208", status: "Busy" },
//       { id: "AMB 109", registration: "JH-01-AB-2109", makeModel: "Force Traveller", type: "Basic Life Support (BLS)", driver: "Rohit Kumar", mobile: "9876543209", status: "Available" }
//     ];

//     export default function HospitalDashboard() {
//       const [activeTab, setActiveTab] = useState("dashboard");

//       const [admin] = useState({
//         name: "City Care Hospital",
//         role: "Admin Authentication",
//         initials: "CC"
//       });

//       const [priorityRequests, setPriorityRequests] = useState(INITIAL_PRIORITY_REQUESTS);
//       const [ambulances, setAmbulances] = useState(INITIAL_AMBULANCES);

//       const [prioritySearch, setPrioritySearch] = useState("");
//       const [priorityFilter, setPriorityFilter] = useState("All Priority");
//       const [priorityStatusFilter, setPriorityStatusFilter] = useState("All Status");
//       const [ambulanceSearch, setAmbulanceSearch] = useState("");

//       // Drawer and Modals State
//       const [selectedPriorityRequest, setSelectedPriorityRequest] = useState(null);
//       const [drawerSelectedAmbulance, setDrawerSelectedAmbulance] = useState("");
//       const [isCreatePriorityModalOpen, setIsCreatePriorityModalOpen] = useState(false);
//       const [isNewEmergencyModalOpen, setIsNewEmergencyModalOpen] = useState(false);
//       const [isRegisterAmbulanceModalOpen, setIsRegisterAmbulanceModalOpen] = useState(false);
//       const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

//       const getCurrentFormattedDateTime = () => {
//         const now = new Date();
//         const day = now.getDate();
//         const month = now.toLocaleString("default", { month: "short" });
//         const year = now.getFullYear();
//         const hours = String(now.getHours()).padStart(2, "0");
//         const minutes = String(now.getMinutes()).padStart(2, "0");
//         return `${day} ${month} ${year}, ${hours}:${minutes}`;
//       };

//       // Form: New Emergency Request
//       const [newEmergencyForm, setNewEmergencyForm] = useState({
//         patientName: "",
//         contactNumber: "",
//         pickupAddress: "",
//         emergencyDescription: "",
//         priorityLevel: "Urgent",
//         ambulanceType: "Patient Transport Ambulance (PTA)",
//         requestTime: getCurrentFormattedDateTime()
//       });

//       // Form: Create Priority Request (Dark Modal)
//       const [priorityForm, setPriorityForm] = useState({
//         patientCaseName: "",
//         pickupLocation: "",
//         destinationHospital: "City Care Hospital",
//         priority: "Critical",
//         ambulanceId: "AMB 104"
//       });

//       // Form: Register Ambulance (Document-based Modal)
//       const initialAmbulanceState = {
//         registrationNumber: "",
//         makeModel: "",
//         ambulanceType: "",
//         rcNumber: "",
//         rcValidUntil: "",
//         rcFileName: "",
//         fitnessNumber: "",
//         fitnessValidUntil: "",
//         fitnessFileName: "",
//         pucNumber: "",
//         pucValidUntil: "",
//         pucFileName: "",
//         driverName: "",
//         driverMobile: "",
//         aadhaarNumber: ""
//       };
//       const [ambulanceForm, setAmbulanceForm] = useState(initialAmbulanceState);

//       const rcFileRef = useRef(null);
//       const fitnessFileRef = useRef(null);
//       const pucFileRef = useRef(null);

//       const [toastMessage, setToastMessage] = useState("");
//       const [toastVisible, setToastVisible] = useState(false);

//       const showToast = (msg) => {
//         setToastMessage(msg);
//         setToastVisible(true);
//         setTimeout(() => setToastVisible(false), 2800);
//       };

//       // Openers
//       const handleOpenNewEmergencyModal = () => {
//         setNewEmergencyForm({
//           patientName: "",
//           contactNumber: "",
//           pickupAddress: "",
//           emergencyDescription: "",
//           priorityLevel: "Urgent",
//           ambulanceType: "Patient Transport Ambulance (PTA)",
//           requestTime: getCurrentFormattedDateTime()
//         });
//         setIsNewEmergencyModalOpen(true);
//       };

//       const handleOpenCreatePriorityModal = () => {
//         setPriorityForm({
//           patientCaseName: "",
//           pickupLocation: "",
//           destinationHospital: "City Care Hospital",
//           priority: "Critical",
//           ambulanceId: ambulances[0]?.id || "AMB 104"
//         });
//         setIsCreatePriorityModalOpen(true);
//       };

//       const handleOpenRegisterAmbulanceModal = () => {
//         setAmbulanceForm(initialAmbulanceState);
//         setIsRegisterAmbulanceModalOpen(true);
//       };

//       const handleOpenDrawer = (pr) => {
//         setSelectedPriorityRequest(pr);
//         setDrawerSelectedAmbulance(pr.ambulanceId);
//       };

//       // Filtered views
//       const filteredPriorityRequests = useMemo(() => {
//         return priorityRequests.filter((pr) => {
//           const matchPriority = priorityFilter === "All Priority" || pr.priority.toLowerCase() === priorityFilter.toLowerCase();
//           const matchStatus = priorityStatusFilter === "All Status" || pr.status.toLowerCase() === priorityStatusFilter.toLowerCase();
//           const matchSearch =
//             pr.id.toLowerCase().includes(prioritySearch.toLowerCase()) ||
//             pr.ambulanceId.toLowerCase().includes(prioritySearch.toLowerCase()) ||
//             pr.case.toLowerCase().includes(prioritySearch.toLowerCase());
//           return matchPriority && matchStatus && matchSearch;
//         });
//       }, [priorityRequests, priorityFilter, priorityStatusFilter, prioritySearch]);

//       const filteredAmbulances = useMemo(() => {
//         return ambulances.filter((amb) => {
//           const query = ambulanceSearch.toLowerCase();
//           return (
//             amb.id.toLowerCase().includes(query) ||
//             amb.registration.toLowerCase().includes(query) ||
//             amb.driver.toLowerCase().includes(query) ||
//             amb.makeModel.toLowerCase().includes(query)
//           );
//         });
//       }, [ambulances, ambulanceSearch]);

//       // Submissions
//       const submitNewEmergencyRequest = (e) => {
//         e.preventDefault();
//         if (!newEmergencyForm.patientName.trim()) {
//           showToast("Please enter patient name");
//           return;
//         }

//         const matchedAmb = ambulances.find(a => a.status === "Available") || ambulances[0];
//         const newReq = {
//           id: `PR-00${priorityRequests.length + 1}`,
//           ambulanceId: matchedAmb ? matchedAmb.id : "AMB 101",
//           case: newEmergencyForm.patientName + (newEmergencyForm.emergencyDescription ? ` - ${newEmergencyForm.emergencyDescription.slice(0, 24)}...` : ""),
//           priority: newEmergencyForm.priorityLevel,
//           status: "Pending",
//           created: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//           pickupLocation: newEmergencyForm.pickupAddress || "Reported Location",
//           destinationHospital: "City Care Hospital",
//           driverName: matchedAmb ? matchedAmb.driver : "Assigned Driver",
//           driverContact: matchedAmb ? `98XXXXXX${matchedAmb.mobile.slice(-2)}` : "98XXXXXX21",
//           timelineStep: 1
//         };

//         setPriorityRequests([newReq, ...priorityRequests]);
//         setIsNewEmergencyModalOpen(false);
//         showToast("Emergency request created and queued!");
//       };

//       const submitCreatePriorityRequest = (e) => {
//         e.preventDefault();
//         if (!priorityForm.patientCaseName.trim()) {
//           showToast("Please enter patient / case name");
//           return;
//         }

//         const chosenAmb = ambulances.find(a => a.id === priorityForm.ambulanceId);
//         const newReq = {
//           id: `PR-00${priorityRequests.length + 1}`,
//           ambulanceId: priorityForm.ambulanceId,
//           case: priorityForm.patientCaseName,
//           priority: priorityForm.priority,
//           status: "Active",
//           created: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//           pickupLocation: priorityForm.pickupLocation,
//           destinationHospital: priorityForm.destinationHospital,
//           driverName: chosenAmb ? chosenAmb.driver : "Assigned Driver",
//           driverContact: chosenAmb ? `98XXXXXX${chosenAmb.mobile.slice(-2)}` : "98XXXXXX11",
//           timelineStep: 2
//         };

//         setPriorityRequests([newReq, ...priorityRequests]);
//         setIsCreatePriorityModalOpen(false);
//         showToast("Priority request dispatched successfully!");
//       };

//       const submitRegisterAmbulance = (e) => {
//         e.preventDefault();
//         if (!ambulanceForm.ambulanceType) {
//           showToast("Please select ambulance type");
//           return;
//         }

//         const nextNum = ambulances.length + 1;
//         const newEntry = {
//           id: `AMB ${100 + nextNum}`,
//           registration: ambulanceForm.registrationNumber.toUpperCase(),
//           makeModel: ambulanceForm.makeModel,
//           type: ambulanceForm.ambulanceType,
//           driver: ambulanceForm.driverName,
//           mobile: ambulanceForm.driverMobile,
//           status: "Available"
//         };

//         setAmbulances([...ambulances, newEntry]);
//         setIsRegisterAmbulanceModalOpen(false);
//         showToast("New ambulance verified and registered!");
//       };

//       // Priority Updater from inside the horizontal drawer
//       const handleSetPriority = (requestId, newPriority) => {
//         setPriorityRequests(priorityRequests.map(r => r.id === requestId ? { ...r, priority: newPriority } : r));
//         if (selectedPriorityRequest && selectedPriorityRequest.id === requestId) {
//           setSelectedPriorityRequest({ ...selectedPriorityRequest, priority: newPriority });
//         }
//         showToast(`Priority updated to ${newPriority} for ${requestId}`);
//       };

//       // Reassign Ambulance from inside the horizontal drawer
//       const handleAssignAmbulanceFromDrawer = () => {
//         if (!selectedPriorityRequest || !drawerSelectedAmbulance) return;
//         const chosenAmb = ambulances.find(a => a.id === drawerSelectedAmbulance);
//         const updatedDriver = chosenAmb ? chosenAmb.driver : selectedPriorityRequest.driverName;
//         const updatedContact = chosenAmb ? `98XXXXXX${chosenAmb.mobile.slice(-2)}` : selectedPriorityRequest.driverContact;

//         const updated = {
//           ...selectedPriorityRequest,
//           ambulanceId: drawerSelectedAmbulance,
//           driverName: updatedDriver,
//           driverContact: updatedContact,
//           status: selectedPriorityRequest.status === "Pending" ? "Active" : selectedPriorityRequest.status,
//           timelineStep: selectedPriorityRequest.timelineStep < 2 ? 2 : selectedPriorityRequest.timelineStep
//         };

//         setPriorityRequests(priorityRequests.map(r => r.id === selectedPriorityRequest.id ? updated : r));
//         setSelectedPriorityRequest(updated);
//         showToast(`${drawerSelectedAmbulance} assigned to ${selectedPriorityRequest.id}`);
//       };

//       const handleMarkCompleted = (id) => {
//         setPriorityRequests(priorityRequests.map(r => r.id === id ? { ...r, status: "Completed", timelineStep: 6 } : r));
//         if (selectedPriorityRequest && selectedPriorityRequest.id === id) {
//           setSelectedPriorityRequest({ ...selectedPriorityRequest, status: "Completed", timelineStep: 6 });
//         }
//         showToast(`Request ${id} marked completed`);
//       };

//       const handleCancelRequest = (id) => {
//         setPriorityRequests(priorityRequests.filter(r => r.id !== id));
//         setSelectedPriorityRequest(null);
//         showToast(`Request ${id} cancelled`);
//       };

//       return (
//         <>
          

//           <div className="app">
//             <header className="header">
//               <div className="brand">
//                 <div style={{ display: "flex", alignItems: "center" }}>
//                   <svg width="250" height="52" viewBox="0 0 450 95" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', height: '46px', width: 'auto' }}>
//                     <defs>
//                       <linearGradient id="logoCross" x1="15" y1="5" x2="70" y2="80" gradientUnits="userSpaceOnUse">
//                         <stop offset="0%" stopColor="#4ea8ff"/>
//                         <stop offset="50%" stopColor="#1d72ec"/>
//                         <stop offset="100%" stopColor="#0b55cc"/>
//                       </linearGradient>
//                       <linearGradient id="logoRoad" x1="18" y1="75" x2="75" y2="18" gradientUnits="userSpaceOnUse">
//                         <stop offset="0%" stopColor="#ffffff"/>
//                         <stop offset="100%" stopColor="#f1f5f9"/>
//                       </linearGradient>
//                     </defs>
//                     <path d="M28 6H54C57.3137 6 60 8.68629 60 12V30H78C81.3137 30 84 32.6863 84 36V60C84 63.3137 81.3137 66 78 66H60V84C60 87.3137 57.3137 90 54 90H28C24.6863 90 22 87.3137 22 84V66H4C0.686291 66 -2 63.3137 -2 60V36C-2 32.6863 0.686291 30 4 30H22V12C22 8.68629 24.6863 6 28 6Z" fill="url(#logoCross)" transform="translate(4, -2)"/>
//                     <path d="M12 82C12 82 34 50 74 30C76.5 28.8 77.5 26 76 23.5C74.5 21 71.5 20.5 69 22C31 41 8 74 8 74L12 82Z" fill="url(#logoRoad)"/>
//                     <path d="M16 78C16 78 37 49 72 27" stroke="#1d4ed8" strokeWidth="3" strokeDasharray="5 5" strokeLinecap="round"/>
//                     <text x="105" y="50" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="52" fill="#dc2626" letterSpacing="1.5">E</text>
//                     <text x="145" y="50" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="52" fill="#1d4ed8" letterSpacing="1.5">MMC</text>
//                     <text x="106" y="70" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="10.5" fill="#dc2626" letterSpacing="0.8">EMERGENCY</text>
//                     <text x="187" y="70" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="10.5" fill="#27272a" letterSpacing="0.8">MOBILITY MANAGEMENT</text>
//                     <text x="106" y="85" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="10.5" fill="#27272a" letterSpacing="0.8">AND COORDINATION SYSTEM</text>
//                   </svg>
//                 </div>
//                 <div className="divider"></div>
//                 <div className="greeting">
//                   <strong style={{ fontSize: 22 }}>
//                     {activeTab === "dashboard" && "Hospital Dashboard"}
//                     {activeTab === "priority" && "Priority Requests"}
//                     {activeTab === "ambulances" && "Ambulances (Active)"}
//                     {activeTab === "hospital" && "Hospital Profile"}
//                     {activeTab === "settings" && "Settings"}
//                   </strong>
//                   <div style={{ fontSize: 12, color: "#667085", marginTop: 2 }}>
//                     {activeTab === "dashboard" && "Monitor emergency mobility, ambulances and requests."}
//                     {activeTab === "priority" && "Manage and coordinate emergency ambulance requests quickly and efficiently."}
//                     {activeTab === "ambulances" && "View, monitor and manage hospital ambulances."}
//                     {activeTab === "hospital" && "Manage hospital information, verification and emergency resources."}
//                     {activeTab === "settings" && "System administration settings."}
//                   </div>
//                 </div>
//               </div>

//               <div className="header-right">
//                 <div style={{ display: "flex", alignItems: "center", gap: 12, textAlign: "right" }}>
//                   <div>
//                     <div style={{ fontWeight: 700, fontSize: 14, color: "#111827" }}>{admin.name}</div>
//                     <div style={{ fontSize: 12, color: "var(--muted)" }}>{admin.role}</div>
//                   </div>
//                   <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#e5eaf2", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: 13, color: "#334155" }}>
//                     {admin.initials}
//                   </div>
//                 </div>
//               </div>
//             </header>

//             <aside className="sidebar">
//               <div style={{ fontSize: 11, fontWeight: "bold", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.8px", padding: "0 16px 12px" }}>Navigation</div>
//               <nav className="nav-list">
//                 <button
//                   className={`nav-btn ${activeTab === "dashboard" ? "active" : ""}`}
//                   onClick={() => setActiveTab("dashboard")}
//                 >
//                   <span className="nav-icon">⏱</span>
//                   <span className="nav-text">Dashboard</span>
//                 </button>

//                 <button
//                   className={`nav-btn ${activeTab === "priority" ? "active" : ""}`}
//                   onClick={() => setActiveTab("priority")}
//                 >
//                   <span className="nav-icon">☤</span>
//                   <span className="nav-text">Priority Request</span>
//                 </button>

//                 <button
//                   className={`nav-btn ${activeTab === "ambulances" ? "active" : ""}`}
//                   onClick={() => setActiveTab("ambulances")}
//                 >
//                   <span className="nav-icon">☤</span>
//                   <span className="nav-text">Ambulances (Active)</span>
//                 </button>

//                 <button
//                   className={`nav-btn ${activeTab === "hospital" ? "active" : ""}`}
//                   onClick={() => setActiveTab("hospital")}
//                 >
//                   <span className="nav-icon">🏛</span>
//                   <span className="nav-text">Hospital Profile</span>
//                 </button>

//                 <button
//                   className={`nav-btn ${activeTab === "settings" ? "active" : ""}`}
//                   onClick={() => setActiveTab("settings")}
//                 >
//                   <span className="nav-icon">⚙</span>
//                   <span className="nav-text">Settings</span>
//                 </button>
//               </nav>

//               <div className="logout-wrap">
//                 <button
//                   className="nav-btn"
//                   style={{ color: "#ff8b8b" }}
//                   onClick={() => setIsLogoutModalOpen(true)}
//                 >
//                   <span className="nav-icon">↩</span>
//                   <span className="nav-text">Logout</span>
//                 </button>
//               </div>
//             </aside>

//             <main className="main">
//               {activeTab === "dashboard" && (
//                 <div className="dynamic">
//                   <div className="dash-stats-grid">
//                     <div className="dash-stat-card blue">
//                       <div className="dash-stat-label">Active Emergencies</div>
//                       <div className="dash-stat-value">
//                         {priorityRequests.filter(r => r.status === "Active").length}
//                       </div>
//                       <span className="dash-stat-link" onClick={() => setActiveTab("priority")}>
//                         View Details →
//                       </span>
//                     </div>

//                     <div className="dash-stat-card orange">
//                       <div className="dash-stat-label">On The Way</div>
//                       <div className="dash-stat-value">
//                         {priorityRequests.filter(r => r.status === "Pending" || r.status === "Active").length}
//                       </div>
//                       <span className="dash-stat-link" onClick={() => setActiveTab("priority")}>
//                         View Details →
//                       </span>
//                     </div>

//                     <div className="dash-stat-card red">
//                       <div className="dash-stat-label">Completed Today</div>
//                       <div className="dash-stat-value">
//                         {priorityRequests.filter(r => r.status === "Completed").length}
//                       </div>
//                       <span className="dash-stat-link" onClick={() => setActiveTab("priority")}>
//                         View Details →
//                       </span>
//                     </div>

//                     <div className="dash-stat-card green">
//                       <div className="dash-stat-label">Total Ambulances</div>
//                       <div className="dash-stat-value">{ambulances.length}</div>
//                       <span className="dash-stat-link" onClick={() => setActiveTab("ambulances")}>
//                         View Details →
//                       </span>
//                     </div>
//                   </div>

//                   <div className="dash-panel">
//                     <div className="dash-panel-head">
//                       <h2 style={{ margin: 0, fontSize: 18, color: "#102d5b" }}>Recent Emergency Requests</h2>
//                       <button
//                         className="btn btn-secondary"
//                         style={{ padding: "6px 14px", fontSize: 12 }}
//                         onClick={() => setActiveTab("priority")}
//                       >
//                         View All
//                       </button>
//                     </div>

//                     <table className="dash-table">
//                       <thead>
//                         <tr>
//                           <th>Request ID</th>
//                           <th>Patient Name</th>
//                           <th>Priority</th>
//                           <th>Status</th>
//                           <th>Ambulance</th>
//                           <th>Created At</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {priorityRequests.slice(0, 4).map((pr) => (
//                           <tr key={pr.id}>
//                             <td style={{ fontWeight: 700, color: "#102d5b" }}>{pr.id}</td>
//                             <td>{pr.case}</td>
//                             <td>
//                               <span className={`priority-pill ${pr.priority.toLowerCase()}`}>
//                                 ● {pr.priority}
//                               </span>
//                             </td>
//                             <td>
//                               <span className={`status-badge ${pr.status.toLowerCase()}`}>
//                                 {pr.status}
//                               </span>
//                             </td>
//                             <td style={{ fontWeight: 700, color: "#2563eb" }}>{pr.ambulanceId}</td>
//                             <td style={{ color: "#6b7280" }}>{pr.created}</td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>

//                   <div className="dash-panel" style={{ padding: "20px 22px" }}>
//                     <h2 style={{ margin: "0 0 15px 0", fontSize: 18, color: "#102d5b" }}>Quick Actions</h2>
//                     <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
//                       <button
//                         className="btn btn-primary"
//                         style={{ padding: "14px", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}
//                         onClick={handleOpenNewEmergencyModal}
//                       >
//                         + New Emergency Request
//                       </button>
//                       <button
//                         className="btn btn-primary"
//                         style={{ padding: "14px", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}
//                         onClick={handleOpenRegisterAmbulanceModal}
//                       >
//                         Register Ambulance
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {activeTab === "priority" && (
//                 <div className="dynamic">
//                   <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "22px" }}>
//                     <button
//                       className="btn btn-primary"
//                       style={{ display: "flex", alignItems: "center", gap: "6px" }}
//                       onClick={handleOpenCreatePriorityModal}
//                     >
//                       + Create Priority Request
//                     </button>
//                   </div>

//                   <div className="pr-stats-grid">
//                     <div className="pr-stat-card">
//                       <div className="pr-stat-label">TOTAL REQUESTS TODAY</div>
//                       <div className="pr-stat-row">
//                         <div className="pr-stat-value">{priorityRequests.length}</div>
//                         <div className="pr-stat-icon-badge">📋</div>
//                       </div>
//                     </div>

//                     <div className="pr-stat-card">
//                       <div className="pr-stat-label">PENDING</div>
//                       <div className="pr-stat-row">
//                         <div className="pr-stat-value" style={{ color: "#f59e0b" }}>
//                           {priorityRequests.filter(r => r.status === "Pending").length}
//                         </div>
//                         <div className="pr-stat-icon-badge" style={{ color: "#f59e0b", background: "#fef3c7" }}>⏳</div>
//                       </div>
//                     </div>

//                     <div className="pr-stat-card">
//                       <div className="pr-stat-label">ACTIVE TRIPS</div>
//                       <div className="pr-stat-row">
//                         <div className="pr-stat-value" style={{ color: "#3b82f6" }}>
//                           {priorityRequests.filter(r => r.status === "Active").length}
//                         </div>
//                         <div className="pr-stat-icon-badge">✈️</div>
//                       </div>
//                     </div>

//                     <div className="pr-stat-card">
//                       <div className="pr-stat-label">COMPLETED</div>
//                       <div className="pr-stat-row">
//                         <div className="pr-stat-value" style={{ color: "#10b981" }}>
//                           {priorityRequests.filter(r => r.status === "Completed").length}
//                         </div>
//                         <div className="pr-stat-icon-badge" style={{ color: "#10b981", background: "#d1fae5" }}>✓</div>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="workflow-banner">
//                     <div className="workflow-title">
//                       <span>⚡</span> DISPATCH WORKFLOW:
//                     </div>
//                     <div className="workflow-steps">
//                       <div className="workflow-step active">1. Create Request</div>
//                       <span>›</span>
//                       <div className="workflow-step active">2. Select Priority</div>
//                       <span>›</span>
//                       <div className="workflow-step active">3. Assign Ambulance</div>
//                       <span>›</span>
//                       <div className="workflow-step active">4. Start Trip</div>
//                       <span>›</span>
//                       <div className="workflow-step active">5. Complete Trip</div>
//                     </div>
//                   </div>

//                   <div className="pr-filter-bar">
//                     <div className="pr-search-box">
//                       <span style={{ fontSize: 16, color: "#9ca3af" }}>🔍</span>
//                       <input
//                         type="text"
//                         placeholder="Search Request ID / Ambulance ID / Case"
//                         value={prioritySearch}
//                         onChange={(e) => setPrioritySearch(e.target.value)}
//                       />
//                     </div>
//                     <select
//                       className="pr-select"
//                       value={priorityFilter}
//                       onChange={(e) => setPriorityFilter(e.target.value)}
//                     >
//                       <option>All Priority</option>
//                       <option>Critical</option>
//                       <option>Urgent</option>
//                       <option>Normal</option>
//                     </select>
//                     <select
//                       className="pr-select"
//                       value={priorityStatusFilter}
//                       onChange={(e) => setPriorityStatusFilter(e.target.value)}
//                     >
//                       <option>All Status</option>
//                       <option>Active</option>
//                       <option>Pending</option>
//                       <option>Completed</option>
//                     </select>
//                     <button
//                       className="btn btn-primary"
//                       style={{ padding: "11px 20px" }}
//                       onClick={() => showToast("Filters applied successfully")}
//                     >
//                       Apply
//                     </button>
//                     <button
//                       className="btn btn-secondary"
//                       style={{ padding: "11px 16px" }}
//                       onClick={() => {
//                         setPrioritySearch("");
//                         setPriorityFilter("All Priority");
//                         setPriorityStatusFilter("All Status");
//                         showToast("Filters reset");
//                       }}
//                     >
//                       Reset
//                     </button>
//                   </div>

//                   <div className="pr-table-wrap">
//                     <div className="pr-table-header">
//                       <h2 style={{ margin: 0, fontSize: 18, color: "#102d5b" }}>Recent Priority Requests</h2>
//                       <div style={{ background: "#e6f4ea", color: "#137333", border: "1px solid #ceead6", padding: "4px 12px", borderRadius: "999px", fontSize: 12, fontWeight: 700 }}>
//                         Showing {filteredPriorityRequests.length} requests
//                       </div>
//                     </div>

//                     <table className="pr-table">
//                       <thead>
//                         <tr>
//                           <th>Request ID</th>
//                           <th>Ambulance ID</th>
//                           <th>Patient / Case</th>
//                           <th>Priority</th>
//                           <th>Status</th>
//                           <th>Created</th>
//                           <th>Action</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {filteredPriorityRequests.map((pr) => (
//                           <tr key={pr.id}>
//                             <td style={{ fontWeight: 700, color: "#102d5b" }}>{pr.id}</td>
//                             <td style={{ fontWeight: 700, color: "#2563eb" }}>{pr.ambulanceId}</td>
//                             <td>{pr.case}</td>
//                             <td>
//                               <span className={`priority-pill ${pr.priority.toLowerCase()}`}>
//                                 ● {pr.priority}
//                               </span>
//                             </td>
//                             <td>
//                               <span className={`status-badge ${pr.status.toLowerCase()}`}>
//                                 {pr.status}
//                               </span>
//                             </td>
//                             <td style={{ color: "#6b7280" }}>{pr.created}</td>
//                             <td>
//                               <button
//                                 className="btn btn-secondary"
//                                 style={{ padding: "6px 14px", fontSize: 12 }}
//                                 onClick={() => handleOpenDrawer(pr)}
//                               >
//                                 View
//                               </button>
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//               )}

//               {activeTab === "ambulances" && (
//                 <div className="dynamic">
//                   <div className="amb-stats-grid">
//                     <div className="amb-stat-card">
//                       <div className="amb-stat-label">TOTAL AMBULANCES</div>
//                       <div className="amb-stat-value" style={{ color: "#102d5b" }}>{ambulances.length}</div>
//                     </div>
//                     <div className="amb-stat-card">
//                       <div className="amb-stat-label">AVAILABLE</div>
//                       <div className="amb-stat-value" style={{ color: "#10b981" }}>
//                         {ambulances.filter(a => a.status === "Available").length}
//                       </div>
//                     </div>
//                     <div className="amb-stat-card">
//                       <div className="amb-stat-label">ON TRIP</div>
//                       <div className="amb-stat-value" style={{ color: "#3b82f6" }}>
//                         {ambulances.filter(a => a.status === "Busy").length}
//                       </div>
//                     </div>
//                     <div className="amb-stat-card">
//                       <div className="amb-stat-label">ACTIVE</div>
//                       <div className="amb-stat-value" style={{ color: "#f59e0b" }}>
//                         {ambulances.length}
//                       </div>
//                     </div>
//                   </div>

//                   <div className="amb-panel">
//                     <div className="amb-panel-head">
//                       <div>
//                         <h2 style={{ margin: 0, fontSize: 18, color: "#102d5b" }}>Ambulances</h2>
//                         <p style={{ margin: "4px 0 0", fontSize: 13, color: "#667085" }}>Registered ambulances associated with City Care Hospital.</p>
//                       </div>
//                       <button
//                         className="btn btn-primary"
//                         style={{ display: "flex", alignItems: "center", gap: "6px" }}
//                         onClick={handleOpenRegisterAmbulanceModal}
//                       >
//                         Register Ambulance
//                       </button>
//                     </div>

//                     <div className="amb-search-bar">
//                       <div className="amb-search-input-box">
//                         <span style={{ fontSize: 16, color: "#9ca3af" }}>🔍</span>
//                         <input
//                           type="text"
//                           placeholder="Search ambulance, registration or driver"
//                           value={ambulanceSearch}
//                           onChange={(e) => setAmbulanceSearch(e.target.value)}
//                         />
//                       </div>
//                     </div>

//                     <table className="amb-table">
//                       <thead>
//                         <tr>
//                           <th>Ambulance ID</th>
//                           <th>Registration</th>
//                           <th>Make / Model</th>
//                           <th>Type</th>
//                           <th>Driver</th>
//                           <th>Mobile</th>
//                           <th>Status</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {filteredAmbulances.map((amb) => (
//                           <tr key={amb.id}>
//                             <td style={{ fontWeight: 700, color: "#102d5b" }}>{amb.id}</td>
//                             <td>{amb.registration}</td>
//                             <td>{amb.makeModel}</td>
//                             <td>{amb.type}</td>
//                             <td>{amb.driver}</td>
//                             <td>{amb.mobile}</td>
//                             <td>
//                               <span className={`status-badge ${amb.status.toLowerCase()}`}>
//                                 {amb.status}
//                               </span>
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//               )}

//               {activeTab === "hospital" && (
//                 <div className="dynamic" style={{ background: "#fff", padding: "40px", borderRadius: "15px" }}>
//                   <h2>City Care Hospital Profile</h2>
//                   <p style={{ color: "var(--muted)" }}>Hospital details and verified emergency resources.</p>
//                 </div>
//               )}

//               {activeTab === "settings" && (
//                 <div className="dynamic" style={{ background: "#fff", padding: "40px", borderRadius: "15px" }}>
//                   <h2>Settings</h2>
//                   <p style={{ color: "var(--muted)" }}>System preferences and administrative controls.</p>
//                 </div>
//               )}
//             </main>
//           </div>

//           {/* 1. NEW EMERGENCY REQUEST MODAL */}
//           <div className={`modal-backdrop ${isNewEmergencyModalOpen ? "open" : ""}`} aria-hidden={!isNewEmergencyModalOpen}>
//             <div className="em-modal">
//               <div className="em-modal-header">
//                 <div>
//                   <h2 className="em-modal-title">New Emergency Request</h2>
//                   <p className="em-modal-subtitle">Create a new ambulance request for a patient.</p>
//                 </div>
//                 <button className="em-modal-close" onClick={() => setIsNewEmergencyModalOpen(false)}>×</button>
//               </div>
//               <form onSubmit={submitNewEmergencyRequest}>
//                 <div className="em-modal-body">
//                   <div className="em-form-row-2">
//                     <div>
//                       <label className="em-form-label">
//                         Patient Name <span className="req">*</span>
//                       </label>
//                       <input
//                         type="text"
//                         className="em-input"
//                         placeholder="aman"
//                         value={newEmergencyForm.patientName}
//                         onChange={(e) => setNewEmergencyForm({ ...newEmergencyForm, patientName: e.target.value })}
//                         required
//                       />
//                     </div>
//                     <div>
//                       <label className="em-form-label">
//                         Patient Contact Number <span className="req">*</span>
//                       </label>
//                       <input
//                         type="tel"
//                         className="em-input"
//                         placeholder="0987654321"
//                         value={newEmergencyForm.contactNumber}
//                         onChange={(e) => setNewEmergencyForm({ ...newEmergencyForm, contactNumber: e.target.value })}
//                         required
//                       />
//                     </div>
//                   </div>

//                   <div className="em-form-group">
//                     <label className="em-form-label">
//                       Pickup Address <span className="req">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       className="em-input"
//                       placeholder="qwertyuiop"
//                       value={newEmergencyForm.pickupAddress}
//                       onChange={(e) => setNewEmergencyForm({ ...newEmergencyForm, pickupAddress: e.target.value })}
//                       required
//                     />
//                   </div>

//                   <div className="em-form-group">
//                     <label className="em-form-label">
//                       Emergency Description / Patient Condition <span className="req">*</span>
//                     </label>
//                     <textarea
//                       className="em-textarea"
//                       placeholder="ASDCVFBNM"
//                       maxLength={500}
//                       value={newEmergencyForm.emergencyDescription}
//                       onChange={(e) => setNewEmergencyForm({ ...newEmergencyForm, emergencyDescription: e.target.value })}
//                       required
//                     ></textarea>
//                     <div className="em-char-count">{newEmergencyForm.emergencyDescription.length}/500</div>
//                   </div>

//                   <div className="em-form-row-2">
//                     <div>
//                       <label className="em-form-label">
//                         Priority Level <span className="req">*</span>
//                       </label>
//                       <div className="em-priority-grid">
//                         <button
//                           type="button"
//                           className={`em-priority-btn normal ${newEmergencyForm.priorityLevel === "Normal" ? "active" : ""}`}
//                           onClick={() => setNewEmergencyForm({ ...newEmergencyForm, priorityLevel: "Normal" })}
//                         >
//                           <span className="p-dot"></span>
//                           <span>GreenNormal</span>
//                         </button>
//                         <button
//                           type="button"
//                           className={`em-priority-btn urgent ${newEmergencyForm.priorityLevel === "Urgent" ? "active" : ""}`}
//                           onClick={() => setNewEmergencyForm({ ...newEmergencyForm, priorityLevel: "Urgent" })}
//                         >
//                           <span className="p-dot"></span>
//                           <span>OrangeUrgent</span>
//                         </button>
//                         <button
//                           type="button"
//                           className={`em-priority-btn critical ${newEmergencyForm.priorityLevel === "Critical" ? "active" : ""}`}
//                           onClick={() => setNewEmergencyForm({ ...newEmergencyForm, priorityLevel: "Critical" })}
//                         >
//                           <span className="p-dot"></span>
//                           <span>RedCritical</span>
//                         </button>
//                       </div>
//                     </div>

//                     <div>
//                       <label className="em-form-label">
//                         Type of Ambulance <span className="req">*</span>
//                       </label>
//                       <select
//                         className="em-select"
//                         value={newEmergencyForm.ambulanceType}
//                         onChange={(e) => setNewEmergencyForm({ ...newEmergencyForm, ambulanceType: e.target.value })}
//                       >
//                         <option value="Patient Transport Ambulance (PTA)">Patient Transport Ambulance (PTA)</option>
//                         <option value="Basic Life Support (BLS)">Basic Life Support (BLS)</option>
//                         <option value="Advanced Life Support (ALS)">Advanced Life Support (ALS)</option>
//                       </select>
//                     </div>
//                   </div>

//                   <div className="em-form-group" style={{ marginBottom: 0 }}>
//                     <label className="em-form-label">
//                       Request Time <span className="req">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       className="em-input readonly-input"
//                       value={newEmergencyForm.requestTime}
//                       readOnly
//                     />
//                   </div>
//                 </div>

//                 <div className="em-modal-footer">
//                   <button
//                     type="button"
//                     className="btn btn-secondary"
//                     onClick={() => setIsNewEmergencyModalOpen(false)}
//                   >
//                     Cancel
//                   </button>
//                   <button type="submit" className="btn btn-primary">
//                     Submit Emergency Request
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>

//           {/* 2. REGISTER AMBULANCE MODAL */}
//           <div className={`modal-backdrop ${isRegisterAmbulanceModalOpen ? "open" : ""}`} aria-hidden={!isRegisterAmbulanceModalOpen}>
//             <div className="em-modal reg-modal-lg">
//               <div className="em-modal-header">
//                 <div>
//                   <h2 className="em-modal-title">Register Ambulance</h2>
//                   <p className="em-modal-subtitle">Add and verify an ambulance before it can be used for emergency mobility services.</p>
//                 </div>
//                 <button className="em-modal-close" onClick={() => setIsRegisterAmbulanceModalOpen(false)}>×</button>
//               </div>

//               <form onSubmit={submitRegisterAmbulance}>
//                 <div className="em-modal-body">
//                   <div className="reg-section-block">
//                     <h3 className="reg-section-title">Vehicle information</h3>
//                     <p className="reg-section-desc">Enter the basic details of the ambulance.</p>

//                     <div className="em-form-row-3">
//                       <div>
//                         <label className="em-form-label">
//                           Ambulance registration number <span className="req">*</span>
//                         </label>
//                         <input
//                           type="text"
//                           className="em-input"
//                           placeholder="e.g. JH01AB2468"
//                           value={ambulanceForm.registrationNumber}
//                           onChange={(e) => setAmbulanceForm({ ...ambulanceForm, registrationNumber: e.target.value })}
//                           required
//                         />
//                       </div>
//                       <div>
//                         <label className="em-form-label">
//                           Vehicle make and model <span className="req">*</span>
//                         </label>
//                         <input
//                           type="text"
//                           className="em-input"
//                           placeholder="Enter make and model"
//                           value={ambulanceForm.makeModel}
//                           onChange={(e) => setAmbulanceForm({ ...ambulanceForm, makeModel: e.target.value })}
//                           required
//                         />
//                       </div>
//                       <div>
//                         <label className="em-form-label">
//                           Ambulance type <span className="req">*</span>
//                         </label>
//                         <select
//                           className="em-select"
//                           value={ambulanceForm.ambulanceType}
//                           onChange={(e) => setAmbulanceForm({ ...ambulanceForm, ambulanceType: e.target.value })}
//                           required
//                         >
//                           <option value="">Select ambulance type</option>
//                           <option value="Basic Life Support (BLS)">Basic Life Support (BLS)</option>
//                           <option value="Advanced Life Support (ALS)">Advanced Life Support (ALS)</option>
//                           <option value="Patient Transport Ambulance (PTA)">Patient Transport Ambulance (PTA)</option>
//                         </select>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="reg-section-block">
//                     <h3 className="reg-section-title">Required documents</h3>
//                     <p className="reg-section-desc">Provide valid documents to verify the ambulance.</p>

//                     <div className="doc-row-grid">
//                       <div className="doc-label-cell">
//                         Registration certificate (RC) <span className="doc-req-pill">Required</span>
//                       </div>
//                       <div>
//                         <label className="em-form-label">RC number <span className="req">*</span></label>
//                         <input
//                           type="text"
//                           className="em-input"
//                           placeholder="Enter RC number"
//                           value={ambulanceForm.rcNumber}
//                           onChange={(e) => setAmbulanceForm({ ...ambulanceForm, rcNumber: e.target.value })}
//                           required
//                         />
//                       </div>
//                       <div>
//                         <label className="em-form-label">Valid until <span className="req">*</span></label>
//                         <input
//                           type="date"
//                           className="em-input"
//                           value={ambulanceForm.rcValidUntil}
//                           onChange={(e) => setAmbulanceForm({ ...ambulanceForm, rcValidUntil: e.target.value })}
//                           required
//                         />
//                       </div>
//                       <div>
//                         <label className="em-form-label">Upload file</label>
//                         <input
//                           type="file"
//                           ref={rcFileRef}
//                           style={{ display: "none" }}
//                           accept=".pdf,.png,.jpg,.jpeg"
//                           onChange={(e) => {
//                             if (e.target.files && e.target.files[0]) {
//                               setAmbulanceForm({ ...ambulanceForm, rcFileName: e.target.files[0].name });
//                               showToast(`Attached RC: ${e.target.files[0].name}`);
//                             }
//                           }}
//                         />
//                         <div
//                           className={`upload-dropzone ${ambulanceForm.rcFileName ? "uploaded" : ""}`}
//                           onClick={() => rcFileRef.current && rcFileRef.current.click()}
//                           title={ambulanceForm.rcFileName || "Upload RC"}
//                         >
//                           <span>📁</span>
//                           <span>{ambulanceForm.rcFileName ? ambulanceForm.rcFileName.slice(0, 14) + "..." : "Upload RC"}</span>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="doc-row-grid">
//                       <div className="doc-label-cell">
//                         Fitness certificate <span className="doc-req-pill">Required</span>
//                       </div>
//                       <div>
//                         <label className="em-form-label">Certificate number <span className="req">*</span></label>
//                         <input
//                           type="text"
//                           className="em-input"
//                           placeholder="Enter certificate number"
//                           value={ambulanceForm.fitnessNumber}
//                           onChange={(e) => setAmbulanceForm({ ...ambulanceForm, fitnessNumber: e.target.value })}
//                           required
//                         />
//                       </div>
//                       <div>
//                         <label className="em-form-label">Valid until <span className="req">*</span></label>
//                         <input
//                           type="date"
//                           className="em-input"
//                           value={ambulanceForm.fitnessValidUntil}
//                           onChange={(e) => setAmbulanceForm({ ...ambulanceForm, fitnessValidUntil: e.target.value })}
//                           required
//                         />
//                       </div>
//                       <div>
//                         <label className="em-form-label">Upload file</label>
//                         <input
//                           type="file"
//                           ref={fitnessFileRef}
//                           style={{ display: "none" }}
//                           accept=".pdf,.png,.jpg,.jpeg"
//                           onChange={(e) => {
//                             if (e.target.files && e.target.files[0]) {
//                               setAmbulanceForm({ ...ambulanceForm, fitnessFileName: e.target.files[0].name });
//                               showToast(`Attached Fitness: ${e.target.files[0].name}`);
//                             }
//                           }}
//                         />
//                         <div
//                           className={`upload-dropzone ${ambulanceForm.fitnessFileName ? "uploaded" : ""}`}
//                           onClick={() => fitnessFileRef.current && fitnessFileRef.current.click()}
//                           title={ambulanceForm.fitnessFileName || "Upload Fitness"}
//                         >
//                           <span>📁</span>
//                           <span>{ambulanceForm.fitnessFileName ? ambulanceForm.fitnessFileName.slice(0, 14) + "..." : "Upload Fitness"}</span>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="doc-row-grid">
//                       <div className="doc-label-cell">
//                         Pollution under control (PUC) <span className="doc-req-pill">Required</span>
//                       </div>
//                       <div>
//                         <label className="em-form-label">PUC number <span className="req">*</span></label>
//                         <input
//                           type="text"
//                           className="em-input"
//                           placeholder="Enter PUC number"
//                           value={ambulanceForm.pucNumber}
//                           onChange={(e) => setAmbulanceForm({ ...ambulanceForm, pucNumber: e.target.value })}
//                           required
//                         />
//                       </div>
//                       <div>
//                         <label className="em-form-label">Valid until <span className="req">*</span></label>
//                         <input
//                           type="date"
//                           className="em-input"
//                           value={ambulanceForm.pucValidUntil}
//                           onChange={(e) => setAmbulanceForm({ ...ambulanceForm, pucValidUntil: e.target.value })}
//                           required
//                         />
//                       </div>
//                       <div>
//                         <label className="em-form-label">Upload file</label>
//                         <input
//                           type="file"
//                           ref={pucFileRef}
//                           style={{ display: "none" }}
//                           accept=".pdf,.png,.jpg,.jpeg"
//                           onChange={(e) => {
//                             if (e.target.files && e.target.files[0]) {
//                               setAmbulanceForm({ ...ambulanceForm, pucFileName: e.target.files[0].name });
//                               showToast(`Attached PUC: ${e.target.files[0].name}`);
//                             }
//                           }}
//                         />
//                         <div
//                           className={`upload-dropzone ${ambulanceForm.pucFileName ? "uploaded" : ""}`}
//                           onClick={() => pucFileRef.current && pucFileRef.current.click()}
//                           title={ambulanceForm.pucFileName || "Upload PUC"}
//                         >
//                           <span>📁</span>
//                           <span>{ambulanceForm.pucFileName ? ambulanceForm.pucFileName.slice(0, 14) + "..." : "Upload PUC"}</span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="reg-section-block" style={{ marginBottom: 0 }}>
//                     <h3 className="reg-section-title">Driver details</h3>
//                     <p className="reg-section-desc">Associate a verified driver with this ambulance.</p>

//                     <div className="em-form-row-3" style={{ marginBottom: 0 }}>
//                       <div>
//                         <label className="em-form-label">
//                           Driver name <span className="req">*</span>
//                         </label>
//                         <input
//                           type="text"
//                           className="em-input"
//                           placeholder="Enter driver's full name"
//                           value={ambulanceForm.driverName}
//                           onChange={(e) => setAmbulanceForm({ ...ambulanceForm, driverName: e.target.value })}
//                           required
//                         />
//                       </div>
//                       <div>
//                         <label className="em-form-label">
//                           Driver mobile number <span className="req">*</span>
//                         </label>
//                         <input
//                           type="tel"
//                           className="em-input"
//                           placeholder="Enter mobile number"
//                           value={ambulanceForm.driverMobile}
//                           onChange={(e) => setAmbulanceForm({ ...ambulanceForm, driverMobile: e.target.value })}
//                           required
//                         />
//                       </div>
//                       <div>
//                         <label className="em-form-label">
//                           Aadhaar card number <span className="req">*</span>
//                         </label>
//                         <input
//                           type="text"
//                           className="em-input"
//                           placeholder="Enter Aadhaar number"
//                           value={ambulanceForm.aadhaarNumber}
//                           onChange={(e) => setAmbulanceForm({ ...ambulanceForm, aadhaarNumber: e.target.value })}
//                           required
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="em-modal-footer">
//                   <button type="button" className="btn btn-secondary" onClick={() => setIsRegisterAmbulanceModalOpen(false)}>
//                     Cancel
//                   </button>
//                   <button type="submit" className="btn btn-primary">
//                     Register Ambulance
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>

//           {/* 3. CREATE PRIORITY REQUEST MODAL */}
//           <div className={`modal-backdrop ${isCreatePriorityModalOpen ? "open" : ""}`} aria-hidden={!isCreatePriorityModalOpen}>
//             <div className="dark-modal">
//               <div className="dark-modal-header">
//                 <h3 className="dark-modal-title">
//                   <span>🚨</span> New Priority Request
//                 </h3>
//                 <button className="dark-modal-close" onClick={() => setIsCreatePriorityModalOpen(false)}>×</button>
//               </div>

//               <form onSubmit={submitCreatePriorityRequest}>
//                 <div className="dark-modal-body">
//                   <div style={{ marginBottom: "18px" }}>
//                     <label className="field-label">PATIENT / CASE NAME *</label>
//                     <input
//                       type="text"
//                       className="em-input"
//                       placeholder="e.g. Cardiac Emergency / John Doe"
//                       value={priorityForm.patientCaseName}
//                       onChange={(e) => setPriorityForm({ ...priorityForm, patientCaseName: e.target.value })}
//                       required
//                     />
//                   </div>

//                   <div style={{ marginBottom: "18px" }}>
//                     <label className="field-label">PICKUP LOCATION *</label>
//                     <input
//                       type="text"
//                       className="em-input"
//                       placeholder="e.g. Main Road, Ranchi"
//                       value={priorityForm.pickupLocation}
//                       onChange={(e) => setPriorityForm({ ...priorityForm, pickupLocation: e.target.value })}
//                       required
//                     />
//                   </div>

//                   <div style={{ marginBottom: "18px" }}>
//                     <label className="field-label">DESTINATION HOSPITAL</label>
//                     <input
//                       type="text"
//                       className="em-input readonly-input"
//                       value={priorityForm.destinationHospital}
//                       readOnly
//                     />
//                   </div>

//                   <div style={{ marginBottom: "18px" }}>
//                     <label className="field-label">EMERGENCY PRIORITY *</label>
//                     <div className="priority-grid-3">
//                       <div
//                         className={`priority-box-choice normal ${priorityForm.priority === "Normal" ? "active" : ""}`}
//                         onClick={() => setPriorityForm({ ...priorityForm, priority: "Normal" })}
//                       >
//                         <span className="p-dot"></span>
//                         <span>Green — Normal</span>
//                       </div>
//                       <div
//                         className={`priority-box-choice urgent ${priorityForm.priority === "Urgent" ? "active" : ""}`}
//                         onClick={() => setPriorityForm({ ...priorityForm, priority: "Urgent" })}
//                       >
//                         <span className="p-dot"></span>
//                         <span>Orange — Urgent</span>
//                       </div>
//                       <div
//                         className={`priority-box-choice critical ${priorityForm.priority === "Critical" ? "active" : ""}`}
//                         onClick={() => setPriorityForm({ ...priorityForm, priority: "Critical" })}
//                       >
//                         <span className="p-dot"></span>
//                         <span>Red — Critical</span>
//                       </div>
//                     </div>
//                   </div>

//                   <div>
//                     <label className="field-label">ASSIGN AMBULANCE *</label>
//                     <select
//                       className="em-select"
//                       value={priorityForm.ambulanceId}
//                       onChange={(e) => setPriorityForm({ ...priorityForm, ambulanceId: e.target.value })}
//                     >
//                       {ambulances.map((amb) => (
//                         <option key={amb.id} value={amb.id}>
//                           {amb.id} ({amb.type})
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>

//                 <div className="dark-modal-footer">
//                   <button
//                     type="button"
//                     className="btn btn-secondary"
//                     onClick={() => setIsCreatePriorityModalOpen(false)}
//                   >
//                     Cancel
//                   </button>
//                   <button type="submit" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
//                     ✓ Create Priority Request
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>

//           {/* 4. SLIDE-OUT HORIZONTAL DRAWER WITH VERTICAL 'SET PRIORITY' & 'ASSIGN AMBULANCE' BUTTONS */}
//           {selectedPriorityRequest && (
//             <div className="drawer-overlay" onClick={() => setSelectedPriorityRequest(null)}>
//               <div className="side-drawer" onClick={(e) => e.stopPropagation()}>
//                 <div className="drawer-header">
//                   <div>
//                     <div className="drawer-title-row">
//                       <h2 className="drawer-title">Priority Request {selectedPriorityRequest.id}</h2>
//                       <span className={`priority-pill ${selectedPriorityRequest.priority.toLowerCase()}`}>
//                         {selectedPriorityRequest.priority}
//                       </span>
//                     </div>
//                     <div style={{ color: "#64748b", fontSize: "13px", marginTop: "4px" }}>
//                       {selectedPriorityRequest.case}
//                     </div>
//                   </div>
//                   <button
//                     style={{ background: "none", border: 0, fontSize: "22px", color: "#94a3b8", cursor: "pointer" }}
//                     onClick={() => setSelectedPriorityRequest(null)}
//                   >
//                     ×
//                   </button>
//                 </div>

//                 <div className="drawer-body">
//                   <div className="drawer-meta-card">
//                     <div>
//                       <div className="drawer-meta-label">Driver Name:</div>
//                       <div className="drawer-meta-val">{selectedPriorityRequest.driverName}</div>
//                     </div>
//                     <div>
//                       <div className="drawer-meta-label">Contact:</div>
//                       <div className="drawer-meta-val">{selectedPriorityRequest.driverContact}</div>
//                     </div>
//                   </div>

//                   <div className="drawer-section-heading">Route Info</div>
//                   <div className="route-info-box">
//                     <div className="route-point">
//                       <div className="route-dot pickup"></div>
//                       <div className="route-sub">Pickup Location</div>
//                       <div className="route-val">{selectedPriorityRequest.pickupLocation}</div>
//                     </div>
//                     <div className="route-point">
//                       <div className="route-dot dest"></div>
//                       <div className="route-sub">Destination Hospital</div>
//                       <div className="route-val">{selectedPriorityRequest.destinationHospital}</div>
//                     </div>
//                   </div>

//                   <div className="drawer-section-heading">Live Trip Timeline</div>
//                   <div className="timeline-wrap">
//                     <div className="timeline-item">
//                       <div className={`timeline-left ${selectedPriorityRequest.timelineStep >= 1 ? "done" : "inactive"}`}>
//                         <div className={`timeline-icon ${selectedPriorityRequest.timelineStep >= 1 ? "done" : "pending"}`}>✓</div>
//                         <span>Request Created</span>
//                       </div>
//                       <div className="timeline-time">{selectedPriorityRequest.created}</div>
//                     </div>

//                     <div className="timeline-item">
//                       <div className={`timeline-left ${selectedPriorityRequest.timelineStep >= 2 ? "done" : "inactive"}`}>
//                         <div className={`timeline-icon ${selectedPriorityRequest.timelineStep >= 2 ? "done" : "pending"}`}>✓</div>
//                         <span>Ambulance Assigned</span>
//                       </div>
//                       <div className="timeline-time">{selectedPriorityRequest.timelineStep >= 2 ? "09:13 AM" : "--:--"}</div>
//                     </div>

//                     <div className="timeline-item">
//                       <div className={`timeline-left ${selectedPriorityRequest.timelineStep >= 3 ? "done" : "inactive"}`}>
//                         <div className={`timeline-icon ${selectedPriorityRequest.timelineStep >= 3 ? "done" : "pending"}`}>✓</div>
//                         <span>Driver Accepted</span>
//                       </div>
//                       <div className="timeline-time">{selectedPriorityRequest.timelineStep >= 3 ? "09:14 AM" : "--:--"}</div>
//                     </div>

//                     <div className="timeline-item">
//                       <div className={`timeline-left ${selectedPriorityRequest.timelineStep === 4 ? "done" : selectedPriorityRequest.timelineStep > 4 ? "done" : "inactive"}`}>
//                         <div className={`timeline-icon ${selectedPriorityRequest.timelineStep > 4 ? "done" : selectedPriorityRequest.timelineStep === 4 ? "current" : "pending"}`}>
//                           {selectedPriorityRequest.timelineStep > 4 ? "✓" : "●"}
//                         </div>
//                         <span>Patient Picked Up</span>
//                       </div>
//                       <div className="timeline-time">{selectedPriorityRequest.timelineStep >= 4 ? "09:21 AM" : "--:--"}</div>
//                     </div>

//                     <div className="timeline-item">
//                       <div className={`timeline-left ${selectedPriorityRequest.timelineStep >= 5 ? "done" : "inactive"}`}>
//                         <div className={`timeline-icon ${selectedPriorityRequest.timelineStep > 5 ? "done" : selectedPriorityRequest.timelineStep === 5 ? "current" : "pending"}`}>
//                           {selectedPriorityRequest.timelineStep > 5 ? "✓" : "○"}
//                         </div>
//                         <span>En Route to Hospital</span>
//                       </div>
//                       <div className="timeline-time">{selectedPriorityRequest.timelineStep >= 5 ? "09:28 AM" : "--:--"}</div>
//                     </div>

//                     <div className="timeline-item">
//                       <div className={`timeline-left ${selectedPriorityRequest.timelineStep === 6 ? "done" : "inactive"}`}>
//                         <div className={`timeline-icon ${selectedPriorityRequest.timelineStep === 6 ? "done" : "pending"}`}>
//                           {selectedPriorityRequest.timelineStep === 6 ? "✓" : "○"}
//                         </div>
//                         <span>Trip Completed</span>
//                       </div>
//                       <div className="timeline-time">{selectedPriorityRequest.timelineStep === 6 ? "09:40 AM" : "--:--"}</div>
//                     </div>
//                   </div>

//                   {/* VERTICAL SET PRIORITY BUTTONS SECTION */}
//                   <div className="vertical-priority-section">
//                     <div className="drawer-section-heading">Set Priority</div>
//                     <div className="vertical-priority-list">
//                       <button
//                         type="button"
//                         className={`vertical-priority-btn critical ${selectedPriorityRequest.priority === "Critical" ? "active" : ""}`}
//                         onClick={() => handleSetPriority(selectedPriorityRequest.id, "Critical")}
//                       >
//                         <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
//                           <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#ef4444" }}></span>
//                           <span>Set Critical Priority</span>
//                         </div>
//                         {selectedPriorityRequest.priority === "Critical" ? <span>✓ Active</span> : <span style={{ color: "#94a3b8", fontSize: "12px" }}>Set</span>}
//                       </button>

//                       <button
//                         type="button"
//                         className={`vertical-priority-btn urgent ${selectedPriorityRequest.priority === "Urgent" ? "active" : ""}`}
//                         onClick={() => handleSetPriority(selectedPriorityRequest.id, "Urgent")}
//                       >
//                         <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
//                           <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#f59e0b" }}></span>
//                           <span>Set Urgent Priority</span>
//                         </div>
//                         {selectedPriorityRequest.priority === "Urgent" ? <span>✓ Active</span> : <span style={{ color: "#94a3b8", fontSize: "12px" }}>Set</span>}
//                       </button>

//                       <button
//                         type="button"
//                         className={`vertical-priority-btn normal ${selectedPriorityRequest.priority === "Normal" ? "active" : ""}`}
//                         onClick={() => handleSetPriority(selectedPriorityRequest.id, "Normal")}
//                       >
//                         <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
//                           <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981" }}></span>
//                           <span>Set Normal Priority</span>
//                         </div>
//                         {selectedPriorityRequest.priority === "Normal" ? <span>✓ Active</span> : <span style={{ color: "#94a3b8", fontSize: "12px" }}>Set</span>}
//                       </button>
//                     </div>
//                   </div>

//                   {/* VERTICAL ASSIGN AMBULANCE SECTION (Placed just below Set Priority) */}
//                   <div className="vertical-assign-section">
//                     <div className="drawer-section-heading">Assign Ambulance</div>
//                     <div className="vertical-assign-wrap">
//                       <select
//                         className="em-select"
//                         value={drawerSelectedAmbulance}
//                         onChange={(e) => setDrawerSelectedAmbulance(e.target.value)}
//                       >
//                         {ambulances.map((amb) => (
//                           <option key={amb.id} value={amb.id}>
//                             {amb.id} — {amb.driver} ({amb.type}) [{amb.status}]
//                           </option>
//                         ))}
//                       </select>
//                       <button
//                         type="button"
//                         className="btn-vertical-assign"
//                         onClick={handleAssignAmbulanceFromDrawer}
//                       >
//                         <span>🚑</span>
//                         <span>Assign Ambulance</span>
//                       </button>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="drawer-footer">
//                   <button
//                     type="button"
//                     className="btn btn-secondary"
//                     onClick={() => handleCancelRequest(selectedPriorityRequest.id)}
//                   >
//                     Cancel Request
//                   </button>
//                   <button
//                     type="button"
//                     className="btn btn-primary"
//                     style={{ background: "#059669", display: "inline-flex", alignItems: "center", gap: "6px" }}
//                     onClick={() => handleMarkCompleted(selectedPriorityRequest.id)}
//                   >
//                     ✓ Mark Completed
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* LOGOUT MODAL */}
//           <div className={`modal-backdrop ${isLogoutModalOpen ? "open" : ""}`} aria-hidden={!isLogoutModalOpen}>
//             <div style={{ padding: "24px", maxWidth: "420px", background: "#fff", borderRadius: "14px" }}>
//               <h2 style={{ margin: "0 0 10px 0", fontSize: 18, color: "#0f172a" }}>Confirm Logout</h2>
//               <p style={{ color: "var(--muted)", fontSize: 14, margin: "0 0 20px 0" }}>Are you sure you want to end your admin session?</p>
//               <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
//                 <button className="btn btn-secondary" onClick={() => setIsLogoutModalOpen(false)}>Cancel</button>
//                 <button className="btn btn-danger" onClick={() => {
//                       setIsLogoutModalOpen(false);
//                       localStorage.removeItem("token");
//                       localStorage.removeItem("user");
//                       localStorage.removeItem("emmcSession");
//                       localStorage.removeItem("patientAccount");
//                       window.location.replace("/login");
//                     }}>Logout Now</button>
//               </div>
//             </div>
//           </div>

//           {/* TOAST NOTIFICATION */}
//           <div className={`toast ${toastVisible ? "show" : ""}`}>{toastMessage}</div>
//         </>
//       );
//     }












import { useState, useEffect, useMemo, useRef } from "react";
import "./HospitalDashboard.css";



        const INITIAL_PRIORITY_REQUESTS = [
      { 
        id: "PR-001", 
        ambulanceId: "AMB 104", 
        case: "Road Accident Case", 
        priority: "Critical", 
        status: "Active", 
        created: "09:12 AM",
        pickupLocation: "Main Road, Ranchi",
        destinationHospital: "City Care Hospital",
        driverName: "Rahul Kumar",
        driverContact: "9876543204",
        timelineStep: 4
      },
      { 
        id: "PR-002", 
        ambulanceId: "AMB 108", 
        case: "Cardiac Emergency", 
        priority: "Critical", 
        status: "Active", 
        created: "09:25 AM",
        pickupLocation: "Bariatu, Ranchi",
        destinationHospital: "City Care Hospital",
        driverName: "Amit Kumar",
        driverContact: "9876543208",
        timelineStep: 3
      },
      { 
        id: "PR-003", 
        ambulanceId: "AMB 102", 
        case: "Trauma Case", 
        priority: "Urgent", 
        status: "Pending", 
        created: "09:41 AM",
        pickupLocation: "Lalpur, Ranchi",
        destinationHospital: "City Care Hospital",
        driverName: "Sanjay Kumar",
        driverContact: "9876543202",
        timelineStep: 1
      },
      { 
        id: "PR-004", 
        ambulanceId: "AMB 101", 
        case: "Medical Emergency", 
        priority: "Urgent", 
        status: "Completed", 
        created: "10:05 AM",
        pickupLocation: "Kanke Road, Ranchi",
        destinationHospital: "City Care Hospital",
        driverName: "Vikas Kumar",
        driverContact: "9876543201",
        timelineStep: 6
      },
      { 
        id: "PR-005", 
        ambulanceId: "AMB 109", 
        case: "Patient Transfer", 
        priority: "Normal", 
        status: "Completed", 
        created: "10:32 AM",
        pickupLocation: "Doranda, Ranchi",
        destinationHospital: "City Care Hospital",
        driverName: "Rohit Kumar",
        driverContact: "9876543209",
        timelineStep: 6
      },
      { 
        id: "PR-006", 
        ambulanceId: "AMB 103", 
        case: "Accident Case", 
        priority: "Critical", 
        status: "Completed", 
        created: "10:48 AM",
        pickupLocation: "Ratu Road, Ranchi",
        destinationHospital: "City Care Hospital",
        driverName: "Deepak Kumar",
        driverContact: "9876543203",
        timelineStep: 6
      },
      { 
        id: "PR-007", 
        ambulanceId: "AMB 105", 
        case: "Medical Emergency", 
        priority: "Urgent", 
        status: "Completed", 
        created: "11:10 AM",
        pickupLocation: "Hinoo, Ranchi",
        destinationHospital: "City Care Hospital",
        driverName: "Manoj Kumar",
        driverContact: "9876543205",
        timelineStep: 6
      },
      { 
        id: "PR-008", 
        ambulanceId: "AMB 106", 
        case: "Patient Transfer", 
        priority: "Normal", 
        status: "Completed", 
        created: "11:34 AM",
        pickupLocation: "Namkum, Ranchi",
        destinationHospital: "City Care Hospital",
        driverName: "Ajay Kumar",
        driverContact: "9876543206",
        timelineStep: 6
      }
    ];

    const INITIAL_AMBULANCES = [
      { id: "AMB 101", registration: "JH-01-AB-2101", makeModel: "Mahindra Bolero", type: "Basic Life Support (BLS)", driver: "Vikas Kumar", mobile: "9876543201", status: "Available" },
      { id: "AMB 102", registration: "JH-01-AB-2102", makeModel: "Force Traveller", type: "Advanced Life Support (ALS)", driver: "Sanjay Kumar", mobile: "9876543202", status: "Available" },
      { id: "AMB 103", registration: "JH-01-AB-2103", makeModel: "Tata Winger", type: "Patient Transport Ambulance (PTA)", driver: "Deepak Kumar", mobile: "9876543203", status: "Available" },
      { id: "AMB 104", registration: "JH-01-AB-2104", makeModel: "Mahindra Bolero", type: "ICU Ambulance", driver: "Rahul Kumar", mobile: "9876543204", status: "Busy" },
      { id: "AMB 105", registration: "JH-01-AB-2105", makeModel: "Force Traveller", type: "Basic Life Support (BLS)", driver: "Manoj Kumar", mobile: "9876543205", status: "Available" },
      { id: "AMB 106", registration: "JH-01-AB-2106", makeModel: "Tata Winger", type: "Patient Transport Ambulance (PTA)", driver: "Ajay Kumar", mobile: "9876543206", status: "Available" },
      { id: "AMB 108", registration: "JH-01-AB-2108", makeModel: "Mahindra Bolero", type: "Advanced Life Support (ALS)", driver: "Amit Kumar", mobile: "9876543208", status: "Busy" },
      { id: "AMB 109", registration: "JH-01-AB-2109", makeModel: "Force Traveller", type: "Basic Life Support (BLS)", driver: "Rohit Kumar", mobile: "9876543209", status: "Available" }
    ];

    const INITIAL_ATTENDANTS = [
      { id: "ATT-001", name: "Neha Sharma", serviceId: "SVC-2201", designation: "Senior Nursing Attendant", mobile: "9876501234", status: "On Duty" },
      { id: "ATT-002", name: "Ramesh Yadav", serviceId: "SVC-2202", designation: "Ward Attendant", mobile: "9876501235", status: "On Duty" },
      { id: "ATT-003", name: "Priya Singh", serviceId: "SVC-2203", designation: "ICU Attendant", mobile: "9876501236", status: "Off Duty" },
      { id: "ATT-004", name: "Suresh Prasad", serviceId: "SVC-2204", designation: "Emergency Ward Attendant", mobile: "9876501237", status: "On Duty" },
      { id: "ATT-005", name: "Anjali Devi", serviceId: "SVC-2205", designation: "OT Attendant", mobile: "9876501238", status: "On Duty" },
      { id: "ATT-006", name: "Manish Kumar", serviceId: "SVC-2206", designation: "Patient Care Attendant", mobile: "9876501239", status: "Off Duty" },
      { id: "ATT-007", name: "Kavita Kumari", serviceId: "SVC-2207", designation: "Ward Attendant", mobile: "9876501240", status: "On Duty" },
      { id: "ATT-008", name: "Deepak Oraon", serviceId: "SVC-2208", designation: "Ambulance Attendant", mobile: "9876501241", status: "On Duty" },
      { id: "ATT-009", name: "Sunita Kumari", serviceId: "SVC-2209", designation: "OPD Attendant", mobile: "9876501242", status: "On Duty" },
      { id: "ATT-010", name: "Ajit Kumar", serviceId: "SVC-2210", designation: "Ward Attendant", mobile: "9876501243", status: "Off Duty" }
    ];

    export default function HospitalDashboard() {
      const [activeTab, setActiveTab] = useState("dashboard");

      const [admin] = useState({
        name: "City Care Hospital",
        role: "Admin Authentication",
        initials: "CC"
      });

      const [priorityRequests, setPriorityRequests] = useState(INITIAL_PRIORITY_REQUESTS);
      const [ambulances, setAmbulances] = useState(INITIAL_AMBULANCES);
      const [attendants] = useState(INITIAL_ATTENDANTS);

      const [prioritySearch, setPrioritySearch] = useState("");
      const [priorityFilter, setPriorityFilter] = useState("All Priority");
      const [priorityStatusFilter, setPriorityStatusFilter] = useState("All Status");
      const [ambulanceSearch, setAmbulanceSearch] = useState("");

      // Drawer and Modals State
      const [selectedPriorityRequest, setSelectedPriorityRequest] = useState(null);
      const [drawerSelectedAmbulance, setDrawerSelectedAmbulance] = useState("");
      const [drawerSelectedAttendant1, setDrawerSelectedAttendant1] = useState("");
      const [drawerSelectedAttendant2, setDrawerSelectedAttendant2] = useState("");
      const [isCreatePriorityModalOpen, setIsCreatePriorityModalOpen] = useState(false);
      const [isNewEmergencyModalOpen, setIsNewEmergencyModalOpen] = useState(false);
      const [isRegisterAmbulanceModalOpen, setIsRegisterAmbulanceModalOpen] = useState(false);
      const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

      const getCurrentFormattedDateTime = () => {
        const now = new Date();
        const day = now.getDate();
        const month = now.toLocaleString("default", { month: "short" });
        const year = now.getFullYear();
        const hours = String(now.getHours()).padStart(2, "0");
        const minutes = String(now.getMinutes()).padStart(2, "0");
        return `${day} ${month} ${year}, ${hours}:${minutes}`;
      };

      // Form: New Emergency Request
      const [newEmergencyForm, setNewEmergencyForm] = useState({
        patientName: "",
        contactNumber: "",
        pickupAddress: "",
        emergencyDescription: "",
        priorityLevel: "Urgent",
        ambulanceType: "Patient Transport Ambulance (PTA)",
        requestTime: getCurrentFormattedDateTime()
      });

      // Form: Create Priority Request (Dark Modal)
      const [priorityForm, setPriorityForm] = useState({
        patientCaseName: "",
        pickupLocation: "",
        destinationHospital: "City Care Hospital",
        priority: "Critical",
        ambulanceId: "AMB 104"
      });

      // Form: Register Ambulance (Document-based Modal)
      const initialAmbulanceState = {
        registrationNumber: "",
        makeModel: "",
        ambulanceType: "",
        rcNumber: "",
        rcValidUntil: "",
        rcFileName: "",
        fitnessNumber: "",
        fitnessValidUntil: "",
        fitnessFileName: "",
        pucNumber: "",
        pucValidUntil: "",
        pucFileName: "",
        driverName: "",
        driverMobile: "",
        aadhaarNumber: ""
      };
      const [ambulanceForm, setAmbulanceForm] = useState(initialAmbulanceState);

      const rcFileRef = useRef(null);
      const fitnessFileRef = useRef(null);
      const pucFileRef = useRef(null);

      const [toastMessage, setToastMessage] = useState("");
      const [toastVisible, setToastVisible] = useState(false);

      const showToast = (msg) => {
        setToastMessage(msg);
        setToastVisible(true);
        setTimeout(() => setToastVisible(false), 2800);
      };

      // Openers
      const handleOpenNewEmergencyModal = () => {
        setNewEmergencyForm({
          patientName: "",
          contactNumber: "",
          pickupAddress: "",
          emergencyDescription: "",
          priorityLevel: "Urgent",
          ambulanceType: "Patient Transport Ambulance (PTA)",
          requestTime: getCurrentFormattedDateTime()
        });
        setIsNewEmergencyModalOpen(true);
      };

      const handleOpenCreatePriorityModal = () => {
        setPriorityForm({
          patientCaseName: "",
          pickupLocation: "",
          destinationHospital: "City Care Hospital",
          priority: "Critical",
          ambulanceId: ambulances[0]?.id || "AMB 104"
        });
        setIsCreatePriorityModalOpen(true);
      };

      const handleOpenRegisterAmbulanceModal = () => {
        setAmbulanceForm(initialAmbulanceState);
        setIsRegisterAmbulanceModalOpen(true);
      };

      const handleOpenDrawer = (pr) => {
        setSelectedPriorityRequest(pr);
        setDrawerSelectedAmbulance(pr.ambulanceId);
        setDrawerSelectedAttendant1(pr.attendant1Id || (attendants[0] ? attendants[0].id : ""));
        setDrawerSelectedAttendant2(pr.attendant2Id || (attendants[1] ? attendants[1].id : ""));
      };

      // Filtered views
      const filteredPriorityRequests = useMemo(() => {
        return priorityRequests.filter((pr) => {
          const matchPriority = priorityFilter === "All Priority" || pr.priority.toLowerCase() === priorityFilter.toLowerCase();
          const matchStatus = priorityStatusFilter === "All Status" || pr.status.toLowerCase() === priorityStatusFilter.toLowerCase();
          const matchSearch =
            pr.id.toLowerCase().includes(prioritySearch.toLowerCase()) ||
            pr.ambulanceId.toLowerCase().includes(prioritySearch.toLowerCase()) ||
            pr.case.toLowerCase().includes(prioritySearch.toLowerCase());
          return matchPriority && matchStatus && matchSearch;
        });
      }, [priorityRequests, priorityFilter, priorityStatusFilter, prioritySearch]);

      const filteredAmbulances = useMemo(() => {
        return ambulances.filter((amb) => {
          const query = ambulanceSearch.toLowerCase();
          return (
            amb.id.toLowerCase().includes(query) ||
            amb.registration.toLowerCase().includes(query) ||
            amb.driver.toLowerCase().includes(query) ||
            amb.makeModel.toLowerCase().includes(query)
          );
        });
      }, [ambulances, ambulanceSearch]);

      // Submissions
      const submitNewEmergencyRequest = (e) => {
        e.preventDefault();
        if (!newEmergencyForm.patientName.trim()) {
          showToast("Please enter patient name");
          return;
        }

        const matchedAmb = ambulances.find(a => a.status === "Available") || ambulances[0];
        const newReq = {
          id: `PR-00${priorityRequests.length + 1}`,
          ambulanceId: matchedAmb ? matchedAmb.id : "AMB 101",
          case: newEmergencyForm.patientName + (newEmergencyForm.emergencyDescription ? ` - ${newEmergencyForm.emergencyDescription.slice(0, 24)}...` : ""),
          priority: newEmergencyForm.priorityLevel,
          status: "Pending",
          created: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          pickupLocation: newEmergencyForm.pickupAddress || "Reported Location",
          destinationHospital: "City Care Hospital",
          driverName: matchedAmb ? matchedAmb.driver : "Assigned Driver",
          driverContact: matchedAmb ? matchedAmb.mobile : "9876543211",
          timelineStep: 1
        };

        setPriorityRequests([newReq, ...priorityRequests]);
        setIsNewEmergencyModalOpen(false);
        showToast("Emergency request created and queued!");
      };

      const submitCreatePriorityRequest = (e) => {
        e.preventDefault();
        if (!priorityForm.patientCaseName.trim()) {
          showToast("Please enter patient / case name");
          return;
        }

        const chosenAmb = ambulances.find(a => a.id === priorityForm.ambulanceId);
        const newReq = {
          id: `PR-00${priorityRequests.length + 1}`,
          ambulanceId: priorityForm.ambulanceId,
          case: priorityForm.patientCaseName,
          priority: priorityForm.priority,
          status: "Active",
          created: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          pickupLocation: priorityForm.pickupLocation,
          destinationHospital: priorityForm.destinationHospital,
          driverName: chosenAmb ? chosenAmb.driver : "Assigned Driver",
          driverContact: chosenAmb ? chosenAmb.mobile : "9876543211",
          timelineStep: 2
        };

        setPriorityRequests([newReq, ...priorityRequests]);
        setIsCreatePriorityModalOpen(false);
        showToast("Priority request dispatched successfully!");
      };

      const submitRegisterAmbulance = (e) => {
        e.preventDefault();
        if (!ambulanceForm.ambulanceType) {
          showToast("Please select ambulance type");
          return;
        }

        const nextNum = ambulances.length + 1;
        const newEntry = {
          id: `AMB ${100 + nextNum}`,
          registration: ambulanceForm.registrationNumber.toUpperCase(),
          makeModel: ambulanceForm.makeModel,
          type: ambulanceForm.ambulanceType,
          driver: ambulanceForm.driverName,
          mobile: ambulanceForm.driverMobile,
          status: "Available"
        };

        setAmbulances([...ambulances, newEntry]);
        setIsRegisterAmbulanceModalOpen(false);
        showToast("New ambulance verified and registered!");
      };

      // Priority Updater from inside the horizontal drawer
      const handleSetPriority = (requestId, newPriority) => {
        setPriorityRequests(priorityRequests.map(r => r.id === requestId ? { ...r, priority: newPriority } : r));
        if (selectedPriorityRequest && selectedPriorityRequest.id === requestId) {
          setSelectedPriorityRequest({ ...selectedPriorityRequest, priority: newPriority });
        }
        showToast(`Priority updated to ${newPriority} for ${requestId}`);
      };

      // Reassign Ambulance from inside the horizontal drawer
      const handleAssignAmbulanceFromDrawer = () => {
        if (!selectedPriorityRequest || !drawerSelectedAmbulance) return;
        const chosenAmb = ambulances.find(a => a.id === drawerSelectedAmbulance);
        const updatedDriver = chosenAmb ? chosenAmb.driver : selectedPriorityRequest.driverName;
        const updatedContact = chosenAmb ? chosenAmb.mobile : selectedPriorityRequest.driverContact;

        const updated = {
          ...selectedPriorityRequest,
          ambulanceId: drawerSelectedAmbulance,
          driverName: updatedDriver,
          driverContact: updatedContact,
          status: selectedPriorityRequest.status === "Pending" ? "Active" : selectedPriorityRequest.status,
          timelineStep: selectedPriorityRequest.timelineStep < 2 ? 2 : selectedPriorityRequest.timelineStep
        };

        setPriorityRequests(priorityRequests.map(r => r.id === selectedPriorityRequest.id ? updated : r));
        setSelectedPriorityRequest(updated);
        showToast(`${drawerSelectedAmbulance} assigned to ${selectedPriorityRequest.id}`);
      };

      // Assign Attendants (two attendants) from inside the horizontal drawer
      const handleAssignAttendantsFromDrawer = () => {
        if (!selectedPriorityRequest || !drawerSelectedAttendant1 || !drawerSelectedAttendant2) return;
        if (drawerSelectedAttendant1 === drawerSelectedAttendant2) {
          showToast("Please select two different attendants");
          return;
        }

        const att1 = attendants.find(a => a.id === drawerSelectedAttendant1);
        const att2 = attendants.find(a => a.id === drawerSelectedAttendant2);

        const updated = {
          ...selectedPriorityRequest,
          attendant1Id: drawerSelectedAttendant1,
          attendant2Id: drawerSelectedAttendant2,
          attendant1Name: att1 ? att1.name : "",
          attendant2Name: att2 ? att2.name : "",
          attendant1Mobile: att1 ? att1.mobile : "",
          attendant2Mobile: att2 ? att2.mobile : ""
        };

        setPriorityRequests(priorityRequests.map(r => r.id === selectedPriorityRequest.id ? updated : r));
        setSelectedPriorityRequest(updated);
        showToast(`${att1 ? att1.name : ""} & ${att2 ? att2.name : ""} assigned to ${selectedPriorityRequest.id}`);
      };

      const handleMarkCompleted = (id) => {
        setPriorityRequests(priorityRequests.map(r => r.id === id ? { ...r, status: "Completed", timelineStep: 6 } : r));
        if (selectedPriorityRequest && selectedPriorityRequest.id === id) {
          setSelectedPriorityRequest({ ...selectedPriorityRequest, status: "Completed", timelineStep: 6 });
        }
        showToast(`Request ${id} marked completed`);
      };

      const handleCancelRequest = (id) => {
        setPriorityRequests(priorityRequests.filter(r => r.id !== id));
        setSelectedPriorityRequest(null);
        showToast(`Request ${id} cancelled`);
      };

      return (
        <>
          

          <div className="app">
            <header className="header">
              <div className="brand">
                <div style={{ display: "flex", alignItems: "center" }}>
                  <svg width="250" height="52" viewBox="0 0 450 95" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', height: '46px', width: 'auto' }}>
                    <defs>
                      <linearGradient id="logoCross" x1="15" y1="5" x2="70" y2="80" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#4ea8ff"/>
                        <stop offset="50%" stopColor="#1d72ec"/>
                        <stop offset="100%" stopColor="#0b55cc"/>
                      </linearGradient>
                      <linearGradient id="logoRoad" x1="18" y1="75" x2="75" y2="18" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#ffffff"/>
                        <stop offset="100%" stopColor="#f1f5f9"/>
                      </linearGradient>
                    </defs>
                    <path d="M28 6H54C57.3137 6 60 8.68629 60 12V30H78C81.3137 30 84 32.6863 84 36V60C84 63.3137 81.3137 66 78 66H60V84C60 87.3137 57.3137 90 54 90H28C24.6863 90 22 87.3137 22 84V66H4C0.686291 66 -2 63.3137 -2 60V36C-2 32.6863 0.686291 30 4 30H22V12C22 8.68629 24.6863 6 28 6Z" fill="url(#logoCross)" transform="translate(4, -2)"/>
                    <path d="M12 82C12 82 34 50 74 30C76.5 28.8 77.5 26 76 23.5C74.5 21 71.5 20.5 69 22C31 41 8 74 8 74L12 82Z" fill="url(#logoRoad)"/>
                    <path d="M16 78C16 78 37 49 72 27" stroke="#1d4ed8" strokeWidth="3" strokeDasharray="5 5" strokeLinecap="round"/>
                    <text x="105" y="50" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="52" fill="#dc2626" letterSpacing="1.5">E</text>
                    <text x="145" y="50" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="52" fill="#1d4ed8" letterSpacing="1.5">MMC</text>
                    <text x="106" y="70" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="10.5" fill="#dc2626" letterSpacing="0.8">EMERGENCY</text>
                    <text x="187" y="70" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="10.5" fill="#27272a" letterSpacing="0.8">MOBILITY MANAGEMENT</text>
                    <text x="106" y="85" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="10.5" fill="#27272a" letterSpacing="0.8">AND COORDINATION SYSTEM</text>
                  </svg>
                </div>
                <div className="divider"></div>
                <div className="greeting">
                  <strong style={{ fontSize: 22 }}>
                    {activeTab === "dashboard" && "Hospital Dashboard"}
                    {activeTab === "priority" && "Priority Requests"}
                    {activeTab === "ambulances" && "Ambulances (Active)"}
                    {activeTab === "hospital" && "Hospital Profile"}
                    {activeTab === "settings" && "Settings"}
                  </strong>
                  <div style={{ fontSize: 12, color: "#667085", marginTop: 2 }}>
                    {activeTab === "dashboard" && "Monitor emergency mobility, ambulances and requests."}
                    {activeTab === "priority" && "Manage and coordinate emergency ambulance requests quickly and efficiently."}
                    {activeTab === "ambulances" && "View, monitor and manage hospital ambulances."}
                    {activeTab === "hospital" && "Manage hospital information, verification and emergency resources."}
                    {activeTab === "settings" && "System administration settings."}
                  </div>
                </div>
              </div>

              <div className="header-right">
                <div style={{ display: "flex", alignItems: "center", gap: 12, textAlign: "right" }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: "#111827" }}>{admin.name}</div>
                    <div style={{ fontSize: 12, color: "var(--muted)" }}>{admin.role}</div>
                  </div>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#e5eaf2", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: 13, color: "#334155" }}>
                    {admin.initials}
                  </div>
                </div>
              </div>
            </header>

            <aside className="sidebar">
              <div style={{ fontSize: 11, fontWeight: "bold", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.8px", padding: "0 16px 12px" }}>Navigation</div>
              <nav className="nav-list">
                <button
                  className={`nav-btn ${activeTab === "dashboard" ? "active" : ""}`}
                  onClick={() => setActiveTab("dashboard")}
                >
                  <span className="nav-icon">⏱</span>
                  <span className="nav-text">Dashboard</span>
                </button>

                <button
                  className={`nav-btn ${activeTab === "priority" ? "active" : ""}`}
                  onClick={() => setActiveTab("priority")}
                >
                  <span className="nav-icon">☤</span>
                  <span className="nav-text">Priority Request</span>
                </button>

                <button
                  className={`nav-btn ${activeTab === "ambulances" ? "active" : ""}`}
                  onClick={() => setActiveTab("ambulances")}
                >
                  <span className="nav-icon">☤</span>
                  <span className="nav-text">Ambulances (Active)</span>
                </button>

                <button
                  className={`nav-btn ${activeTab === "hospital" ? "active" : ""}`}
                  onClick={() => setActiveTab("hospital")}
                >
                  <span className="nav-icon">🏛</span>
                  <span className="nav-text">Hospital Profile</span>
                </button>

                <button
                  className={`nav-btn ${activeTab === "settings" ? "active" : ""}`}
                  onClick={() => setActiveTab("settings")}
                >
                  <span className="nav-icon">⚙</span>
                  <span className="nav-text">Settings</span>
                </button>
              </nav>

              <div className="logout-wrap">
                <button
                  className="nav-btn"
                  style={{ color: "#ff8b8b" }}
                  onClick={() => setIsLogoutModalOpen(true)}
                >
                  <span className="nav-icon">↩</span>
                  <span className="nav-text">Logout</span>
                </button>
              </div>
            </aside>

            <main className="main">
              {activeTab === "dashboard" && (
                <div className="dynamic">
                  <div className="dash-stats-grid">
                    <div className="dash-stat-card blue">
                      <div className="dash-stat-label">Active Emergencies</div>
                      <div className="dash-stat-value">
                        {priorityRequests.filter(r => r.status === "Active").length}
                      </div>
                      <span className="dash-stat-link" onClick={() => setActiveTab("priority")}>
                        View Details →
                      </span>
                    </div>

                    <div className="dash-stat-card orange">
                      <div className="dash-stat-label">On The Way</div>
                      <div className="dash-stat-value">
                        {priorityRequests.filter(r => r.status === "Pending" || r.status === "Active").length}
                      </div>
                      <span className="dash-stat-link" onClick={() => setActiveTab("priority")}>
                        View Details →
                      </span>
                    </div>

                    <div className="dash-stat-card red">
                      <div className="dash-stat-label">Completed Today</div>
                      <div className="dash-stat-value">
                        {priorityRequests.filter(r => r.status === "Completed").length}
                      </div>
                      <span className="dash-stat-link" onClick={() => setActiveTab("priority")}>
                        View Details →
                      </span>
                    </div>

                    <div className="dash-stat-card green">
                      <div className="dash-stat-label">Total Ambulances</div>
                      <div className="dash-stat-value">{ambulances.length}</div>
                      <span className="dash-stat-link" onClick={() => setActiveTab("ambulances")}>
                        View Details →
                      </span>
                    </div>
                  </div>

                  <div className="dash-panel">
                    <div className="dash-panel-head">
                      <h2 style={{ margin: 0, fontSize: 18, color: "#102d5b" }}>Recent Emergency Requests</h2>
                      <button
                        className="btn btn-secondary"
                        style={{ padding: "6px 14px", fontSize: 12 }}
                        onClick={() => setActiveTab("priority")}
                      >
                        View All
                      </button>
                    </div>

                    <table className="dash-table">
                      <thead>
                        <tr>
                          <th>Request ID</th>
                          <th>Patient Name</th>
                          <th>Priority</th>
                          <th>Status</th>
                          <th>Ambulance</th>
                          <th>Created At</th>
                        </tr>
                      </thead>
                      <tbody>
                        {priorityRequests.slice(0, 4).map((pr) => (
                          <tr key={pr.id}>
                            <td style={{ fontWeight: 700, color: "#102d5b" }}>{pr.id}</td>
                            <td>{pr.case}</td>
                            <td>
                              <span className={`priority-pill ${pr.priority.toLowerCase()}`}>
                                ● {pr.priority}
                              </span>
                            </td>
                            <td>
                              <span className={`status-badge ${pr.status.toLowerCase()}`}>
                                {pr.status}
                              </span>
                            </td>
                            <td style={{ fontWeight: 700, color: "#2563eb" }}>{pr.ambulanceId}</td>
                            <td style={{ color: "#6b7280" }}>{pr.created}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="dash-panel" style={{ padding: "20px 22px" }}>
                    <h2 style={{ margin: "0 0 15px 0", fontSize: 18, color: "#102d5b" }}>Quick Actions</h2>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
                      <button
                        className="btn btn-primary"
                        style={{ padding: "14px", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}
                        onClick={handleOpenNewEmergencyModal}
                      >
                        + New Emergency Request
                      </button>
                      <button
                        className="btn btn-primary"
                        style={{ padding: "14px", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}
                        onClick={handleOpenRegisterAmbulanceModal}
                      >
                        Register Ambulance
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "priority" && (
                <div className="dynamic">
                  <div className="pr-stats-grid">
                    <div className="pr-stat-card">
                      <div className="pr-stat-label">TOTAL REQUESTS TODAY</div>
                      <div className="pr-stat-row">
                        <div className="pr-stat-value">{priorityRequests.length}</div>
                        <div className="pr-stat-icon-badge">📋</div>
                      </div>
                    </div>

                    <div className="pr-stat-card">
                      <div className="pr-stat-label">PENDING</div>
                      <div className="pr-stat-row">
                        <div className="pr-stat-value" style={{ color: "#f59e0b" }}>
                          {priorityRequests.filter(r => r.status === "Pending").length}
                        </div>
                        <div className="pr-stat-icon-badge" style={{ color: "#f59e0b", background: "#fef3c7" }}>⏳</div>
                      </div>
                    </div>

                    <div className="pr-stat-card">
                      <div className="pr-stat-label">ACTIVE TRIPS</div>
                      <div className="pr-stat-row">
                        <div className="pr-stat-value" style={{ color: "#3b82f6" }}>
                          {priorityRequests.filter(r => r.status === "Active").length}
                        </div>
                        <div className="pr-stat-icon-badge">✈️</div>
                      </div>
                    </div>

                    <div className="pr-stat-card">
                      <div className="pr-stat-label">COMPLETED</div>
                      <div className="pr-stat-row">
                        <div className="pr-stat-value" style={{ color: "#10b981" }}>
                          {priorityRequests.filter(r => r.status === "Completed").length}
                        </div>
                        <div className="pr-stat-icon-badge" style={{ color: "#10b981", background: "#d1fae5" }}>✓</div>
                      </div>
                    </div>
                  </div>

                  <div className="workflow-banner">
                    <div className="workflow-title">
                      <span>⚡</span> DISPATCH WORKFLOW:
                    </div>
                    <div className="workflow-steps">
                      <div className="workflow-step active">1. Create Request</div>
                      <span>›</span>
                      <div className="workflow-step active">2. Select Priority</div>
                      <span>›</span>
                      <div className="workflow-step active">3. Assign Ambulance</div>
                      <span>›</span>
                      <div className="workflow-step active">4. Start Trip</div>
                      <span>›</span>
                      <div className="workflow-step active">5. Complete Trip</div>
                    </div>
                  </div>

                  <div className="pr-filter-bar">
                    <div className="pr-search-box">
                      <span style={{ fontSize: 16, color: "#9ca3af" }}>🔍</span>
                      <input
                        type="text"
                        placeholder="Search Request ID / Ambulance ID / Case"
                        value={prioritySearch}
                        onChange={(e) => setPrioritySearch(e.target.value)}
                      />
                    </div>
                    <select
                      className="pr-select"
                      value={priorityFilter}
                      onChange={(e) => setPriorityFilter(e.target.value)}
                    >
                      <option>All Priority</option>
                      <option>Critical</option>
                      <option>Urgent</option>
                      <option>Normal</option>
                    </select>
                    <select
                      className="pr-select"
                      value={priorityStatusFilter}
                      onChange={(e) => setPriorityStatusFilter(e.target.value)}
                    >
                      <option>All Status</option>
                      <option>Active</option>
                      <option>Pending</option>
                      <option>Completed</option>
                    </select>
                    <button
                      className="btn btn-primary"
                      style={{ padding: "11px 20px" }}
                      onClick={() => showToast("Filters applied successfully")}
                    >
                      Apply
                    </button>
                    <button
                      className="btn btn-secondary"
                      style={{ padding: "11px 16px" }}
                      onClick={() => {
                        setPrioritySearch("");
                        setPriorityFilter("All Priority");
                        setPriorityStatusFilter("All Status");
                        showToast("Filters reset");
                      }}
                    >
                      Reset
                    </button>
                  </div>

                  <div className="pr-table-wrap">
                    <div className="pr-table-header">
                      <h2 style={{ margin: 0, fontSize: 18, color: "#102d5b" }}>Recent Priority Requests</h2>
                      <div style={{ background: "#e6f4ea", color: "#137333", border: "1px solid #ceead6", padding: "4px 12px", borderRadius: "999px", fontSize: 12, fontWeight: 700 }}>
                        Showing {filteredPriorityRequests.length} requests
                      </div>
                    </div>

                    <table className="pr-table">
                      <thead>
                        <tr>
                          <th>Request ID</th>
                          <th>Ambulance ID</th>
                          <th>Patient / Case</th>
                          <th>Priority</th>
                          <th>Status</th>
                          <th>Created</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredPriorityRequests.map((pr) => (
                          <tr key={pr.id}>
                            <td style={{ fontWeight: 700, color: "#102d5b" }}>{pr.id}</td>
                            <td style={{ fontWeight: 700, color: "#2563eb" }}>{pr.ambulanceId}</td>
                            <td>{pr.case}</td>
                            <td>
                              <span className={`priority-pill ${pr.priority.toLowerCase()}`}>
                                ● {pr.priority}
                              </span>
                            </td>
                            <td>
                              <span className={`status-badge ${pr.status.toLowerCase()}`}>
                                {pr.status}
                              </span>
                            </td>
                            <td style={{ color: "#6b7280" }}>{pr.created}</td>
                            <td>
                              <button
                                className="btn btn-secondary"
                                style={{ padding: "6px 14px", fontSize: 12 }}
                                onClick={() => handleOpenDrawer(pr)}
                              >
                                View
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === "ambulances" && (
                <div className="dynamic">
                  <div className="amb-stats-grid">
                    <div className="amb-stat-card">
                      <div className="amb-stat-label">TOTAL AMBULANCES</div>
                      <div className="amb-stat-value" style={{ color: "#102d5b" }}>{ambulances.length}</div>
                    </div>
                    <div className="amb-stat-card">
                      <div className="amb-stat-label">AVAILABLE</div>
                      <div className="amb-stat-value" style={{ color: "#10b981" }}>
                        {ambulances.filter(a => a.status === "Available").length}
                      </div>
                    </div>
                    <div className="amb-stat-card">
                      <div className="amb-stat-label">ON TRIP</div>
                      <div className="amb-stat-value" style={{ color: "#3b82f6" }}>
                        {ambulances.filter(a => a.status === "Busy").length}
                      </div>
                    </div>
                    <div className="amb-stat-card">
                      <div className="amb-stat-label">ACTIVE</div>
                      <div className="amb-stat-value" style={{ color: "#f59e0b" }}>
                        {ambulances.length}
                      </div>
                    </div>
                  </div>

                  <div className="amb-panel">
                    <div className="amb-panel-head">
                      <div>
                        <h2 style={{ margin: 0, fontSize: 18, color: "#102d5b" }}>Ambulances</h2>
                        <p style={{ margin: "4px 0 0", fontSize: 13, color: "#667085" }}>Registered ambulances associated with City Care Hospital.</p>
                      </div>
                      <button
                        className="btn btn-primary"
                        style={{ display: "flex", alignItems: "center", gap: "6px" }}
                        onClick={handleOpenRegisterAmbulanceModal}
                      >
                        Register Ambulance
                      </button>
                    </div>

                    <div className="amb-search-bar">
                      <div className="amb-search-input-box">
                        <span style={{ fontSize: 16, color: "#9ca3af" }}>🔍</span>
                        <input
                          type="text"
                          placeholder="Search ambulance, registration or driver"
                          value={ambulanceSearch}
                          onChange={(e) => setAmbulanceSearch(e.target.value)}
                        />
                      </div>
                    </div>

                    <table className="amb-table">
                      <thead>
                        <tr>
                          <th>Ambulance ID</th>
                          <th>Registration</th>
                          <th>Make / Model</th>
                          <th>Type</th>
                          <th>Driver</th>
                          <th>Mobile</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredAmbulances.map((amb) => (
                          <tr key={amb.id}>
                            <td style={{ fontWeight: 700, color: "#102d5b" }}>{amb.id}</td>
                            <td>{amb.registration}</td>
                            <td>{amb.makeModel}</td>
                            <td>{amb.type}</td>
                            <td>{amb.driver}</td>
                            <td>{amb.mobile}</td>
                            <td>
                              <span className={`status-badge ${amb.status.toLowerCase()}`}>
                                {amb.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === "hospital" && (
                <div className="dynamic" style={{ background: "#fff", padding: "40px", borderRadius: "15px" }}>
                  <h2>City Care Hospital Profile</h2>
                  <p style={{ color: "var(--muted)" }}>Hospital details and verified emergency resources.</p>
                </div>
              )}

              {activeTab === "settings" && (
                <div className="dynamic" style={{ background: "#fff", padding: "40px", borderRadius: "15px" }}>
                  <h2>Settings</h2>
                  <p style={{ color: "var(--muted)" }}>System preferences and administrative controls.</p>
                </div>
              )}
            </main>
          </div>

          {/* 1. NEW EMERGENCY REQUEST MODAL */}
          <div className={`modal-backdrop ${isNewEmergencyModalOpen ? "open" : ""}`} aria-hidden={!isNewEmergencyModalOpen}>
            <div className="em-modal">
              <div className="em-modal-header">
                <div>
                  <h2 className="em-modal-title">New Emergency Request</h2>
                  <p className="em-modal-subtitle">Create a new ambulance request for a patient.</p>
                </div>
                <button className="em-modal-close" onClick={() => setIsNewEmergencyModalOpen(false)}>×</button>
              </div>
              <form onSubmit={submitNewEmergencyRequest}>
                <div className="em-modal-body">
                  <div className="em-form-row-2">
                    <div>
                      <label className="em-form-label">
                        Patient Name <span className="req">*</span>
                      </label>
                      <input
                        type="text"
                        className="em-input"
                        placeholder="aman"
                        value={newEmergencyForm.patientName}
                        onChange={(e) => setNewEmergencyForm({ ...newEmergencyForm, patientName: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <label className="em-form-label">
                        Patient Contact Number <span className="req">*</span>
                      </label>
                      <input
                        type="tel"
                        className="em-input"
                        placeholder="0987654321"
                        value={newEmergencyForm.contactNumber}
                        onChange={(e) => setNewEmergencyForm({ ...newEmergencyForm, contactNumber: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="em-form-group">
                    <label className="em-form-label">
                      Pickup Address <span className="req">*</span>
                    </label>
                    <input
                      type="text"
                      className="em-input"
                      placeholder="qwertyuiop"
                      value={newEmergencyForm.pickupAddress}
                      onChange={(e) => setNewEmergencyForm({ ...newEmergencyForm, pickupAddress: e.target.value })}
                      required
                    />
                  </div>

                  <div className="em-form-group">
                    <label className="em-form-label">
                      Emergency Description / Patient Condition <span className="req">*</span>
                    </label>
                    <textarea
                      className="em-textarea"
                      placeholder="ASDCVFBNM"
                      maxLength={500}
                      value={newEmergencyForm.emergencyDescription}
                      onChange={(e) => setNewEmergencyForm({ ...newEmergencyForm, emergencyDescription: e.target.value })}
                      required
                    ></textarea>
                    <div className="em-char-count">{newEmergencyForm.emergencyDescription.length}/500</div>
                  </div>

                  <div className="em-form-row-2">
                    <div>
                      <label className="em-form-label">
                        Priority Level <span className="req">*</span>
                      </label>
                      <div className="em-priority-grid">
                        <button
                          type="button"
                          className={`em-priority-btn normal ${newEmergencyForm.priorityLevel === "Normal" ? "active" : ""}`}
                          onClick={() => setNewEmergencyForm({ ...newEmergencyForm, priorityLevel: "Normal" })}
                        >
                          <span className="p-dot"></span>
                          <span>GreenNormal</span>
                        </button>
                        <button
                          type="button"
                          className={`em-priority-btn urgent ${newEmergencyForm.priorityLevel === "Urgent" ? "active" : ""}`}
                          onClick={() => setNewEmergencyForm({ ...newEmergencyForm, priorityLevel: "Urgent" })}
                        >
                          <span className="p-dot"></span>
                          <span>OrangeUrgent</span>
                        </button>
                        <button
                          type="button"
                          className={`em-priority-btn critical ${newEmergencyForm.priorityLevel === "Critical" ? "active" : ""}`}
                          onClick={() => setNewEmergencyForm({ ...newEmergencyForm, priorityLevel: "Critical" })}
                        >
                          <span className="p-dot"></span>
                          <span>RedCritical</span>
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="em-form-label">
                        Type of Ambulance <span className="req">*</span>
                      </label>
                      <select
                        className="em-select"
                        value={newEmergencyForm.ambulanceType}
                        onChange={(e) => setNewEmergencyForm({ ...newEmergencyForm, ambulanceType: e.target.value })}
                      >
                        <option value="Patient Transport Ambulance (PTA)">Patient Transport Ambulance (PTA)</option>
                        <option value="Basic Life Support (BLS)">Basic Life Support (BLS)</option>
                        <option value="Advanced Life Support (ALS)">Advanced Life Support (ALS)</option>
                      </select>
                    </div>
                  </div>

                  <div className="em-form-group" style={{ marginBottom: 0 }}>
                    <label className="em-form-label">
                      Request Time <span className="req">*</span>
                    </label>
                    <input
                      type="text"
                      className="em-input readonly-input"
                      value={newEmergencyForm.requestTime}
                      readOnly
                    />
                  </div>
                </div>

                <div className="em-modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setIsNewEmergencyModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Submit Emergency Request
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* 2. REGISTER AMBULANCE MODAL */}
          <div className={`modal-backdrop ${isRegisterAmbulanceModalOpen ? "open" : ""}`} aria-hidden={!isRegisterAmbulanceModalOpen}>
            <div className="em-modal reg-modal-lg">
              <div className="em-modal-header">
                <div>
                  <h2 className="em-modal-title">Register Ambulance</h2>
                  <p className="em-modal-subtitle">Add and verify an ambulance before it can be used for emergency mobility services.</p>
                </div>
                <button className="em-modal-close" onClick={() => setIsRegisterAmbulanceModalOpen(false)}>×</button>
              </div>

              <form onSubmit={submitRegisterAmbulance}>
                <div className="em-modal-body">
                  <div className="reg-section-block">
                    <h3 className="reg-section-title">Vehicle information</h3>
                    <p className="reg-section-desc">Enter the basic details of the ambulance.</p>

                    <div className="em-form-row-3">
                      <div>
                        <label className="em-form-label">
                          Ambulance registration number <span className="req">*</span>
                        </label>
                        <input
                          type="text"
                          className="em-input"
                          placeholder="e.g. JH01AB2468"
                          value={ambulanceForm.registrationNumber}
                          onChange={(e) => setAmbulanceForm({ ...ambulanceForm, registrationNumber: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <label className="em-form-label">
                          Vehicle make and model <span className="req">*</span>
                        </label>
                        <input
                          type="text"
                          className="em-input"
                          placeholder="Enter make and model"
                          value={ambulanceForm.makeModel}
                          onChange={(e) => setAmbulanceForm({ ...ambulanceForm, makeModel: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <label className="em-form-label">
                          Ambulance type <span className="req">*</span>
                        </label>
                        <select
                          className="em-select"
                          value={ambulanceForm.ambulanceType}
                          onChange={(e) => setAmbulanceForm({ ...ambulanceForm, ambulanceType: e.target.value })}
                          required
                        >
                          <option value="">Select ambulance type</option>
                          <option value="Basic Life Support (BLS)">Basic Life Support (BLS)</option>
                          <option value="Advanced Life Support (ALS)">Advanced Life Support (ALS)</option>
                          <option value="Patient Transport Ambulance (PTA)">Patient Transport Ambulance (PTA)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="reg-section-block">
                    <h3 className="reg-section-title">Required documents</h3>
                    <p className="reg-section-desc">Provide valid documents to verify the ambulance.</p>

                    <div className="doc-row-grid">
                      <div className="doc-label-cell">
                        Registration certificate (RC) <span className="doc-req-pill">Required</span>
                      </div>
                      <div>
                        <label className="em-form-label">RC number <span className="req">*</span></label>
                        <input
                          type="text"
                          className="em-input"
                          placeholder="Enter RC number"
                          value={ambulanceForm.rcNumber}
                          onChange={(e) => setAmbulanceForm({ ...ambulanceForm, rcNumber: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <label className="em-form-label">Valid until <span className="req">*</span></label>
                        <input
                          type="date"
                          className="em-input"
                          value={ambulanceForm.rcValidUntil}
                          onChange={(e) => setAmbulanceForm({ ...ambulanceForm, rcValidUntil: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <label className="em-form-label">Upload file</label>
                        <input
                          type="file"
                          ref={rcFileRef}
                          style={{ display: "none" }}
                          accept=".pdf,.png,.jpg,.jpeg"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              setAmbulanceForm({ ...ambulanceForm, rcFileName: e.target.files[0].name });
                              showToast(`Attached RC: ${e.target.files[0].name}`);
                            }
                          }}
                        />
                        <div
                          className={`upload-dropzone ${ambulanceForm.rcFileName ? "uploaded" : ""}`}
                          onClick={() => rcFileRef.current && rcFileRef.current.click()}
                          title={ambulanceForm.rcFileName || "Upload RC"}
                        >
                          <span>📁</span>
                          <span>{ambulanceForm.rcFileName ? ambulanceForm.rcFileName.slice(0, 14) + "..." : "Upload RC"}</span>
                        </div>
                      </div>
                    </div>

                    <div className="doc-row-grid">
                      <div className="doc-label-cell">
                        Fitness certificate <span className="doc-req-pill">Required</span>
                      </div>
                      <div>
                        <label className="em-form-label">Certificate number <span className="req">*</span></label>
                        <input
                          type="text"
                          className="em-input"
                          placeholder="Enter certificate number"
                          value={ambulanceForm.fitnessNumber}
                          onChange={(e) => setAmbulanceForm({ ...ambulanceForm, fitnessNumber: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <label className="em-form-label">Valid until <span className="req">*</span></label>
                        <input
                          type="date"
                          className="em-input"
                          value={ambulanceForm.fitnessValidUntil}
                          onChange={(e) => setAmbulanceForm({ ...ambulanceForm, fitnessValidUntil: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <label className="em-form-label">Upload file</label>
                        <input
                          type="file"
                          ref={fitnessFileRef}
                          style={{ display: "none" }}
                          accept=".pdf,.png,.jpg,.jpeg"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              setAmbulanceForm({ ...ambulanceForm, fitnessFileName: e.target.files[0].name });
                              showToast(`Attached Fitness: ${e.target.files[0].name}`);
                            }
                          }}
                        />
                        <div
                          className={`upload-dropzone ${ambulanceForm.fitnessFileName ? "uploaded" : ""}`}
                          onClick={() => fitnessFileRef.current && fitnessFileRef.current.click()}
                          title={ambulanceForm.fitnessFileName || "Upload Fitness"}
                        >
                          <span>📁</span>
                          <span>{ambulanceForm.fitnessFileName ? ambulanceForm.fitnessFileName.slice(0, 14) + "..." : "Upload Fitness"}</span>
                        </div>
                      </div>
                    </div>

                    <div className="doc-row-grid">
                      <div className="doc-label-cell">
                        Pollution under control (PUC) <span className="doc-req-pill">Required</span>
                      </div>
                      <div>
                        <label className="em-form-label">PUC number <span className="req">*</span></label>
                        <input
                          type="text"
                          className="em-input"
                          placeholder="Enter PUC number"
                          value={ambulanceForm.pucNumber}
                          onChange={(e) => setAmbulanceForm({ ...ambulanceForm, pucNumber: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <label className="em-form-label">Valid until <span className="req">*</span></label>
                        <input
                          type="date"
                          className="em-input"
                          value={ambulanceForm.pucValidUntil}
                          onChange={(e) => setAmbulanceForm({ ...ambulanceForm, pucValidUntil: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <label className="em-form-label">Upload file</label>
                        <input
                          type="file"
                          ref={pucFileRef}
                          style={{ display: "none" }}
                          accept=".pdf,.png,.jpg,.jpeg"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              setAmbulanceForm({ ...ambulanceForm, pucFileName: e.target.files[0].name });
                              showToast(`Attached PUC: ${e.target.files[0].name}`);
                            }
                          }}
                        />
                        <div
                          className={`upload-dropzone ${ambulanceForm.pucFileName ? "uploaded" : ""}`}
                          onClick={() => pucFileRef.current && pucFileRef.current.click()}
                          title={ambulanceForm.pucFileName || "Upload PUC"}
                        >
                          <span>📁</span>
                          <span>{ambulanceForm.pucFileName ? ambulanceForm.pucFileName.slice(0, 14) + "..." : "Upload PUC"}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="reg-section-block" style={{ marginBottom: 0 }}>
                    <h3 className="reg-section-title">Driver details</h3>
                    <p className="reg-section-desc">Associate a verified driver with this ambulance.</p>

                    <div className="em-form-row-3" style={{ marginBottom: 0 }}>
                      <div>
                        <label className="em-form-label">
                          Driver name <span className="req">*</span>
                        </label>
                        <input
                          type="text"
                          className="em-input"
                          placeholder="Enter driver's full name"
                          value={ambulanceForm.driverName}
                          onChange={(e) => setAmbulanceForm({ ...ambulanceForm, driverName: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <label className="em-form-label">
                          Driver mobile number <span className="req">*</span>
                        </label>
                        <input
                          type="tel"
                          className="em-input"
                          placeholder="Enter mobile number"
                          value={ambulanceForm.driverMobile}
                          onChange={(e) => setAmbulanceForm({ ...ambulanceForm, driverMobile: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <label className="em-form-label">
                          Aadhaar card number <span className="req">*</span>
                        </label>
                        <input
                          type="text"
                          className="em-input"
                          placeholder="Enter Aadhaar number"
                          value={ambulanceForm.aadhaarNumber}
                          onChange={(e) => setAmbulanceForm({ ...ambulanceForm, aadhaarNumber: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="em-modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setIsRegisterAmbulanceModalOpen(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Register Ambulance
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* 3. CREATE PRIORITY REQUEST MODAL */}
          <div className={`modal-backdrop ${isCreatePriorityModalOpen ? "open" : ""}`} aria-hidden={!isCreatePriorityModalOpen}>
            <div className="dark-modal">
              <div className="dark-modal-header">
                <h3 className="dark-modal-title">
                  <span>🚨</span> New Priority Request
                </h3>
                <button className="dark-modal-close" onClick={() => setIsCreatePriorityModalOpen(false)}>×</button>
              </div>

              <form onSubmit={submitCreatePriorityRequest}>
                <div className="dark-modal-body">
                  <div style={{ marginBottom: "18px" }}>
                    <label className="field-label">PATIENT / CASE NAME *</label>
                    <input
                      type="text"
                      className="em-input"
                      placeholder="e.g. Cardiac Emergency / John Doe"
                      value={priorityForm.patientCaseName}
                      onChange={(e) => setPriorityForm({ ...priorityForm, patientCaseName: e.target.value })}
                      required
                    />
                  </div>

                  <div style={{ marginBottom: "18px" }}>
                    <label className="field-label">PICKUP LOCATION *</label>
                    <input
                      type="text"
                      className="em-input"
                      placeholder="e.g. Main Road, Ranchi"
                      value={priorityForm.pickupLocation}
                      onChange={(e) => setPriorityForm({ ...priorityForm, pickupLocation: e.target.value })}
                      required
                    />
                  </div>

                  <div style={{ marginBottom: "18px" }}>
                    <label className="field-label">DESTINATION HOSPITAL</label>
                    <input
                      type="text"
                      className="em-input readonly-input"
                      value={priorityForm.destinationHospital}
                      readOnly
                    />
                  </div>

                  <div style={{ marginBottom: "18px" }}>
                    <label className="field-label">EMERGENCY PRIORITY *</label>
                    <div className="priority-grid-3">
                      <div
                        className={`priority-box-choice normal ${priorityForm.priority === "Normal" ? "active" : ""}`}
                        onClick={() => setPriorityForm({ ...priorityForm, priority: "Normal" })}
                      >
                        <span className="p-dot"></span>
                        <span>Green — Normal</span>
                      </div>
                      <div
                        className={`priority-box-choice urgent ${priorityForm.priority === "Urgent" ? "active" : ""}`}
                        onClick={() => setPriorityForm({ ...priorityForm, priority: "Urgent" })}
                      >
                        <span className="p-dot"></span>
                        <span>Orange — Urgent</span>
                      </div>
                      <div
                        className={`priority-box-choice critical ${priorityForm.priority === "Critical" ? "active" : ""}`}
                        onClick={() => setPriorityForm({ ...priorityForm, priority: "Critical" })}
                      >
                        <span className="p-dot"></span>
                        <span>Red — Critical</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="field-label">ASSIGN AMBULANCE *</label>
                    <select
                      className="em-select"
                      value={priorityForm.ambulanceId}
                      onChange={(e) => setPriorityForm({ ...priorityForm, ambulanceId: e.target.value })}
                    >
                      {ambulances.map((amb) => (
                        <option key={amb.id} value={amb.id}>
                          {amb.id} ({amb.type})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="dark-modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setIsCreatePriorityModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    ✓ Create Priority Request
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* 4. SLIDE-OUT HORIZONTAL DRAWER WITH VERTICAL 'SET PRIORITY' & 'ASSIGN AMBULANCE' BUTTONS */}
          {selectedPriorityRequest && (
            <div className="drawer-overlay" onClick={() => setSelectedPriorityRequest(null)}>
              <div className="side-drawer" onClick={(e) => e.stopPropagation()}>
                <div className="drawer-header">
                  <div>
                    <div className="drawer-title-row">
                      <h2 className="drawer-title">Priority Request {selectedPriorityRequest.id}</h2>
                      <span className={`priority-pill ${selectedPriorityRequest.priority.toLowerCase()}`}>
                        {selectedPriorityRequest.priority}
                      </span>
                    </div>
                    <div style={{ color: "#64748b", fontSize: "13px", marginTop: "4px" }}>
                      {selectedPriorityRequest.case}
                    </div>
                  </div>
                  <button
                    style={{ background: "none", border: 0, fontSize: "22px", color: "#94a3b8", cursor: "pointer" }}
                    onClick={() => setSelectedPriorityRequest(null)}
                  >
                    ×
                  </button>
                </div>

                <div className="drawer-body">
                  <div className="drawer-meta-card">
                    <div>
                      <div className="drawer-meta-label">Driver Name:</div>
                      <div className="drawer-meta-val">{selectedPriorityRequest.driverName}</div>
                    </div>
                    <div>
                      <div className="drawer-meta-label">Contact:</div>
                      <div className="drawer-meta-val">{selectedPriorityRequest.driverContact}</div>
                    </div>
                  </div>

                  {selectedPriorityRequest.attendant1Name && selectedPriorityRequest.attendant2Name && (
                    <div className="drawer-meta-card">
                      <div>
                        <div className="drawer-meta-label">Attendant 1:</div>
                        <div className="drawer-meta-val">{selectedPriorityRequest.attendant1Name}</div>
                      </div>
                      <div>
                        <div className="drawer-meta-label">Contact:</div>
                        <div className="drawer-meta-val">{selectedPriorityRequest.attendant1Mobile}</div>
                      </div>
                      <div>
                        <div className="drawer-meta-label">Attendant 2:</div>
                        <div className="drawer-meta-val">{selectedPriorityRequest.attendant2Name}</div>
                      </div>
                      <div>
                        <div className="drawer-meta-label">Contact:</div>
                        <div className="drawer-meta-val">{selectedPriorityRequest.attendant2Mobile}</div>
                      </div>
                    </div>
                  )}

                  <div className="drawer-section-heading">Route Info</div>
                  <div className="route-info-box">
                    <div className="route-point">
                      <div className="route-dot pickup"></div>
                      <div className="route-sub">Pickup Location</div>
                      <div className="route-val">{selectedPriorityRequest.pickupLocation}</div>
                    </div>
                    <div className="route-point">
                      <div className="route-dot dest"></div>
                      <div className="route-sub">Destination Hospital</div>
                      <div className="route-val">{selectedPriorityRequest.destinationHospital}</div>
                    </div>
                  </div>

                  <div className="drawer-section-heading">Live Trip Timeline</div>
                  <div className="timeline-wrap">
                    <div className="timeline-item">
                      <div className={`timeline-left ${selectedPriorityRequest.timelineStep >= 1 ? "done" : "inactive"}`}>
                        <div className={`timeline-icon ${selectedPriorityRequest.timelineStep >= 1 ? "done" : "pending"}`}>✓</div>
                        <span>Request Created</span>
                      </div>
                      <div className="timeline-time">{selectedPriorityRequest.created}</div>
                    </div>

                    <div className="timeline-item">
                      <div className={`timeline-left ${selectedPriorityRequest.timelineStep >= 2 ? "done" : "inactive"}`}>
                        <div className={`timeline-icon ${selectedPriorityRequest.timelineStep >= 2 ? "done" : "pending"}`}>✓</div>
                        <span>Ambulance Assigned</span>
                      </div>
                      <div className="timeline-time">{selectedPriorityRequest.timelineStep >= 2 ? "09:13 AM" : "--:--"}</div>
                    </div>

                    <div className="timeline-item">
                      <div className={`timeline-left ${selectedPriorityRequest.timelineStep >= 3 ? "done" : "inactive"}`}>
                        <div className={`timeline-icon ${selectedPriorityRequest.timelineStep >= 3 ? "done" : "pending"}`}>✓</div>
                        <span>Driver Accepted</span>
                      </div>
                      <div className="timeline-time">{selectedPriorityRequest.timelineStep >= 3 ? "09:14 AM" : "--:--"}</div>
                    </div>

                    <div className="timeline-item">
                      <div className={`timeline-left ${selectedPriorityRequest.timelineStep === 4 ? "done" : selectedPriorityRequest.timelineStep > 4 ? "done" : "inactive"}`}>
                        <div className={`timeline-icon ${selectedPriorityRequest.timelineStep > 4 ? "done" : selectedPriorityRequest.timelineStep === 4 ? "current" : "pending"}`}>
                          {selectedPriorityRequest.timelineStep > 4 ? "✓" : "●"}
                        </div>
                        <span>Patient Picked Up</span>
                      </div>
                      <div className="timeline-time">{selectedPriorityRequest.timelineStep >= 4 ? "09:21 AM" : "--:--"}</div>
                    </div>

                    <div className="timeline-item">
                      <div className={`timeline-left ${selectedPriorityRequest.timelineStep >= 5 ? "done" : "inactive"}`}>
                        <div className={`timeline-icon ${selectedPriorityRequest.timelineStep > 5 ? "done" : selectedPriorityRequest.timelineStep === 5 ? "current" : "pending"}`}>
                          {selectedPriorityRequest.timelineStep > 5 ? "✓" : "○"}
                        </div>
                        <span>En Route to Hospital</span>
                      </div>
                      <div className="timeline-time">{selectedPriorityRequest.timelineStep >= 5 ? "09:28 AM" : "--:--"}</div>
                    </div>

                    <div className="timeline-item">
                      <div className={`timeline-left ${selectedPriorityRequest.timelineStep === 6 ? "done" : "inactive"}`}>
                        <div className={`timeline-icon ${selectedPriorityRequest.timelineStep === 6 ? "done" : "pending"}`}>
                          {selectedPriorityRequest.timelineStep === 6 ? "✓" : "○"}
                        </div>
                        <span>Trip Completed</span>
                      </div>
                      <div className="timeline-time">{selectedPriorityRequest.timelineStep === 6 ? "09:40 AM" : "--:--"}</div>
                    </div>
                  </div>

                  {/* VERTICAL SET PRIORITY BUTTONS SECTION */}
                  <div className="vertical-priority-section">
                    <div className="drawer-section-heading">Set Priority</div>
                    <div className="vertical-priority-list">
                      <button
                        type="button"
                        className={`vertical-priority-btn critical ${selectedPriorityRequest.priority === "Critical" ? "active" : ""}`}
                        onClick={() => handleSetPriority(selectedPriorityRequest.id, "Critical")}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#ef4444" }}></span>
                          <span>Set Critical Priority</span>
                        </div>
                        {selectedPriorityRequest.priority === "Critical" ? <span>✓ Active</span> : <span style={{ color: "#94a3b8", fontSize: "12px" }}>Set</span>}
                      </button>

                      <button
                        type="button"
                        className={`vertical-priority-btn urgent ${selectedPriorityRequest.priority === "Urgent" ? "active" : ""}`}
                        onClick={() => handleSetPriority(selectedPriorityRequest.id, "Urgent")}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#f59e0b" }}></span>
                          <span>Set Urgent Priority</span>
                        </div>
                        {selectedPriorityRequest.priority === "Urgent" ? <span>✓ Active</span> : <span style={{ color: "#94a3b8", fontSize: "12px" }}>Set</span>}
                      </button>

                      <button
                        type="button"
                        className={`vertical-priority-btn normal ${selectedPriorityRequest.priority === "Normal" ? "active" : ""}`}
                        onClick={() => handleSetPriority(selectedPriorityRequest.id, "Normal")}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981" }}></span>
                          <span>Set Normal Priority</span>
                        </div>
                        {selectedPriorityRequest.priority === "Normal" ? <span>✓ Active</span> : <span style={{ color: "#94a3b8", fontSize: "12px" }}>Set</span>}
                      </button>
                    </div>
                  </div>

                  {/* VERTICAL ASSIGN AMBULANCE SECTION (Placed just below Set Priority) */}
                  <div className="vertical-assign-section">
                    <div className="drawer-section-heading">Assign Ambulance</div>
                    <div className="vertical-assign-wrap">
                      <select
                        className="em-select"
                        value={drawerSelectedAmbulance}
                        onChange={(e) => setDrawerSelectedAmbulance(e.target.value)}
                      >
                        {ambulances.map((amb) => (
                          <option key={amb.id} value={amb.id}>
                            {amb.id} — {amb.driver} ({amb.type}) [{amb.status}]
                          </option>
                        ))}
                      </select>
                      <button
                        type="button"
                        className="btn-vertical-assign"
                        onClick={handleAssignAmbulanceFromDrawer}
                      >
                        <span>🚑</span>
                        <span>Assign Ambulance</span>
                      </button>
                    </div>
                  </div>

                  {/* VERTICAL ASSIGN ATTENDANTS SECTION (Placed just below Assign Ambulance) */}
                  <div className="vertical-assign-section">
                    <div className="drawer-section-heading">Assign Attendants</div>
                    <div className="vertical-assign-wrap">
                      <select
                        className="em-select"
                        value={drawerSelectedAttendant1}
                        onChange={(e) => setDrawerSelectedAttendant1(e.target.value)}
                      >
                        {attendants.map((att) => (
                          <option key={att.id} value={att.id}>
                            {att.name} — {att.designation} [{att.serviceId}]
                          </option>
                        ))}
                      </select>
                      <select
                        className="em-select"
                        value={drawerSelectedAttendant2}
                        onChange={(e) => setDrawerSelectedAttendant2(e.target.value)}
                      >
                        {attendants.map((att) => (
                          <option key={att.id} value={att.id}>
                            {att.name} — {att.designation} [{att.serviceId}]
                          </option>
                        ))}
                      </select>
                      <button
                        type="button"
                        className="btn-vertical-assign"
                        onClick={handleAssignAttendantsFromDrawer}
                      >
                        <span>👥</span>
                        <span>Assign Attendants</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="drawer-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => handleCancelRequest(selectedPriorityRequest.id)}
                  >
                    Cancel Request
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    style={{ background: "#059669", display: "inline-flex", alignItems: "center", gap: "6px" }}
                    onClick={() => handleMarkCompleted(selectedPriorityRequest.id)}
                  >
                    ✓ Mark Completed
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* LOGOUT MODAL */}
          <div className={`modal-backdrop ${isLogoutModalOpen ? "open" : ""}`} aria-hidden={!isLogoutModalOpen}>
            <div style={{ padding: "24px", maxWidth: "420px", background: "#fff", borderRadius: "14px" }}>
              <h2 style={{ margin: "0 0 10px 0", fontSize: 18, color: "#0f172a" }}>Confirm Logout</h2>
              <p style={{ color: "var(--muted)", fontSize: 14, margin: "0 0 20px 0" }}>Are you sure you want to end your admin session?</p>
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                <button className="btn btn-secondary" onClick={() => setIsLogoutModalOpen(false)}>Cancel</button>
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    setIsLogoutModalOpen(false);

                    // Clear hospital login/session data
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    localStorage.removeItem("hospital");
                    localStorage.removeItem("hospitalUser");
                    localStorage.removeItem("hospitalId");
                    localStorage.removeItem("emmcSession");

                    sessionStorage.removeItem("hospital");
                    sessionStorage.removeItem("hospitalUser");
                    sessionStorage.removeItem("hospitalId");

                    // Redirect directly to the EMMC front page
                    window.location.replace("/");
                  }}
                >
                  Logout Now
                </button>
              </div>
            </div>
          </div>

          {/* TOAST NOTIFICATION */}
          <div className={`toast ${toastVisible ? "show" : ""}`}>{toastMessage}</div>
        </>
      );
    }
