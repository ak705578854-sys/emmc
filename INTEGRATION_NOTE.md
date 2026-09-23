EMMC dashboard integration

Base project: emmc (5).zip

Changed only:
- /frontend/src/pages/PoliceDashboard.jsx -> real Police GPS dashboard implementation
- /frontend/src/policeReal/* -> real Police GPS map/tracker/config
- /frontend/src/pages/DrDashboard.jsx -> hosted/real Ambulance dashboard implementation
- /frontend/src/ambulanceReal/* -> real Ambulance GPS map/config
- /frontend/src/pages/DrDashboard.css -> matching Ambulance dashboard CSS
- /frontend/public/sw.js -> push notification service worker used by the real dashboard

The existing login, patient, hospital, LHO and other project files were kept from the base project.
Police TP001 authorization/login flow is provided by the real Traffic Police tracker.
Backend URL used by the real dashboards: https://emmc-push-backend.onrender.com
