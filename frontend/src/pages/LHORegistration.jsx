import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LHO_REGISTRATION_HTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>EMMC - Local Health Organization Registration</title>
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            emmc: {
              50: '#f0f5fa',
              100: '#e1ecf5',
              200: '#c5dcee',
              300: '#99c3e2',
              400: '#64a3d2',
              500: '#1b649d', // Primary EMMC Blue
              600: '#154f80',
              700: '#124168',
              800: '#0d2b45', // Deep Navy
              900: '#081a2b',
              navy: '#0b1e36',
              slate: '#475569',
              border: '#d1d5db',
              success: '#0f766e',
              warning: '#b45309',
            }
          },
          fontFamily: {
            sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
          }
        }
      }
    }
  </script>
  <style>
    /* Custom subtle government/healthcare aesthetic styles */
    input:focus, select:focus, textarea:focus {
      outline: none;
      border-color: #1b649d;
      box-shadow: 0 0 0 2px rgba(27, 100, 157, 0.15);
    }
    .custom-scrollbar::-webkit-scrollbar {
      width: 6px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background-color: #cbd5e1;
      border-radius: 4px;
    }
  </style>
</head>
<body class="bg-[#f8fafc] text-[#1e293b] font-sans antialiased min-h-screen flex flex-col">

  <!-- Top Header Section (Updated to White Background) -->
  <header class="bg-white text-slate-800 border-b border-gray-200 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <div class="flex items-center space-x-3.5">
        <!-- Official EMMC Logo Asset -->
        <div class="flex items-center space-x-3 flex-shrink-0">
          <svg class="h-10 w-auto" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="crossGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#4299e1" />
                <stop offset="100%" stop-color="#094d92" />
              </linearGradient>
              <mask id="roadMask">
                <rect width="100" height="100" fill="white" />
                <path d="M 0 100 L 25 100 C 40 75 60 50 100 30 L 100 25 C 55 45 32 75 18 100 Z" fill="black" />
              </mask>
            </defs>
            <!-- Blue Cross Background -->
            <path d="M 33 5 C 33 2.5 35 0 37.5 0 L 62.5 0 C 65 0 67 2.5 67 5 L 67 33 L 95 33 C 97.5 33 100 35 100 37.5 L 100 62.5 C 100 65 97.5 67 95 67 L 67 67 L 67 95 C 67 97.5 65 100 62.5 100 L 37.5 100 C 35 100 33 97.5 33 95 L 33 67 L 5 67 C 2.5 67 0 65 0 62.5 L 0 37.5 C 0 35 2.5 33 5 33 L 33 33 Z" fill="url(#crossGradient)" mask="url(#roadMask)"/>
            <!-- Road Markings -->
            <path d="M 23 88 C 28 80 34 72 41 65" stroke="#ffffff" stroke-width="2.5" stroke-dasharray="4 3" stroke-linecap="round" />
            <path d="M 44 62 C 54 53 66 45 80 39" stroke="#ffffff" stroke-width="2.2" stroke-dasharray="4 3" stroke-linecap="round" />
          </svg>
          <div class="flex flex-col">
            <div class="flex items-center space-x-2">
              <span class="text-2xl font-black tracking-tight leading-none">
                <span class="text-[#e11d48]">E</span><span class="text-[#094d92]">MMC</span>
              </span>
              <span class="text-[10px] uppercase bg-blue-50 text-[#1b649d] border border-blue-200 font-bold px-2 py-0.5 rounded tracking-wider">Health Portal</span>
            </div>
            <span class="text-[9.5px] font-bold tracking-wider uppercase text-[#e11d48] mt-1 leading-tight">
              Emergency Mobility Management
            </span>
            <span class="text-[8.5px] font-semibold tracking-wider uppercase text-slate-600 leading-tight">
              And Coordination System
            </span>
          </div>
        </div>
      </div>
      <div class="flex items-center space-x-4 text-xs text-slate-500">
        <div class="hidden md:flex flex-col text-right">
          <span class="text-slate-900 font-semibold">Verification & Onboarding Desk</span>
          <span class="text-slate-500">Underserved & Rural Healthcare Access Wing</span>
        </div>
        <div class="h-8 w-px bg-slate-200 hidden md:block"></div>
        <div class="flex items-center space-x-1.5 bg-[#f0f5fa] border border-[#c5dcee] px-3 py-1.5 rounded text-[#1b649d] text-xs font-medium">
          <svg class="w-3.5 h-3.5 text-[#1b649d]" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
          </svg>
          <span>Support: 1800-EMMC-HLTH</span>
        </div>
      </div>
    </div>
  </header>

  <div class="bg-white border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 text-xs text-slate-600 flex items-center justify-between">
      <nav class="flex items-center space-x-2">
        <span class="text-slate-400">EMMC Hub</span>
        <span class="text-slate-300">/</span>
        <span class="text-slate-400">Healthcare Network</span>
        <span class="text-slate-300">/</span>
        <span class="text-[#0b1e36] font-semibold">Local Health Organization (LHO) Registration</span>
      </nav>
      <div class="hidden sm:flex items-center text-xs text-amber-800 bg-amber-50 px-2.5 py-1 rounded border border-amber-200">
        <svg class="w-3.5 h-3.5 mr-1.5 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
        </svg>
        <span>Manual verification required prior to emergency dispatch routing</span>
      </div>
    </div>
  </div>

  <!-- Main Container -->
  <main class="flex-grow max-w-5xl w-full mx-auto px-4 sm:px-6 py-8">

    <div class="mb-8 bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
      <div class="hidden md:flex justify-between items-center relative">
        <div class="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-0.5 bg-gray-200 z-0"></div>
        <div id="progressLine" class="absolute left-6 top-1/2 -translate-y-1/2 h-0.5 bg-[#1b649d] z-0 transition-all duration-300" style="width: 0%;"></div>

        <!-- Step 1 Indicator -->
        <div class="step-indicator relative z-10 flex flex-col items-center cursor-pointer" onclick="handleStepNav(1)">
          <div id="step-badge-1" class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold bg-[#1b649d] text-white ring-4 ring-blue-50">1</div>
          <span id="step-label-1" class="mt-2 text-xs font-medium text-[#0b1e36]">Organization</span>
        </div>

        <!-- Step 2 Indicator -->
        <div class="step-indicator relative z-10 flex flex-col items-center cursor-pointer" onclick="handleStepNav(2)">
          <div id="step-badge-2" class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold bg-white border-2 border-gray-300 text-gray-500">2</div>
          <span id="step-label-2" class="mt-2 text-xs font-medium text-gray-500">Authorized Rep</span>
        </div>

        <!-- Step 3 Indicator -->
        <div class="step-indicator relative z-10 flex flex-col items-center cursor-pointer" onclick="handleStepNav(3)">
          <div id="step-badge-3" class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold bg-white border-2 border-gray-300 text-gray-500">3</div>
          <span id="step-label-3" class="mt-2 text-xs font-medium text-gray-500">Verification Docs</span>
        </div>

        <!-- Step 4 Indicator -->
        <div class="step-indicator relative z-10 flex flex-col items-center cursor-pointer" onclick="handleStepNav(4)">
          <div id="step-badge-4" class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold bg-white border-2 border-gray-300 text-gray-500">4</div>
          <span id="step-label-4" class="mt-2 text-xs font-medium text-gray-500">Identity Auth</span>
        </div>

        <!-- Step 5 Indicator -->
        <div class="step-indicator relative z-10 flex flex-col items-center cursor-pointer" onclick="handleStepNav(5)">
          <div id="step-badge-5" class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold bg-white border-2 border-gray-300 text-gray-500">5</div>
          <span id="step-label-5" class="mt-2 text-xs font-medium text-gray-500">Review & Submit</span>
        </div>
      </div>

      <!-- Mobile Step Progress -->
      <div class="flex md:hidden items-center justify-between">
        <div class="text-xs font-medium text-gray-600">
          Step <span id="mobileCurrentStep">1</span> of 5: <span id="mobileStepName" class="font-bold text-[#0b1e36]">Organization Information</span>
        </div>
        <div class="text-xs bg-blue-100 text-[#1b649d] px-2.5 py-0.5 rounded-full font-semibold" id="mobilePercentage">20%</div>
      </div>
    </div>

    <div class="mb-6 bg-slate-50 border border-slate-200 rounded-md p-3.5 text-xs text-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
      <div class="flex items-center space-x-2">
        <svg class="w-4 h-4 text-[#1b649d] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
        </svg>
        <span class="font-semibold text-slate-900">EMMC Anti-Fraud Protocol:</span>
        <span class="hidden md:inline text-slate-600">Strict hierarchical verification is maintained before granting road priority tokens:</span>
      </div>
      <div class="flex items-center space-x-1.5 font-mono text-[11px] text-slate-600 overflow-x-auto pb-1 sm:pb-0">
        <span class="bg-white border border-gray-300 px-1.5 py-0.5 rounded font-medium text-[#1b649d]">1. Org Verified</span>
        <span>→</span>
        <span class="bg-white border border-gray-300 px-1.5 py-0.5 rounded">2. Ambulance Verified</span>
        <span>→</span>
        <span class="bg-white border border-gray-300 px-1.5 py-0.5 rounded text-emerald-700">3. Priority Dispatch</span>
      </div>
    </div>

    <!-- Alert Message Toast Container -->
    <div id="formAlertBox" class="hidden mb-6 p-3 rounded-md border text-xs"></div>

    <!-- Registration Form Card -->
    <div class="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden" id="formCard">

      <!-- ========================================================================= -->
      <!-- STEP 1: ORGANIZATION INFORMATION -->
      <!-- ========================================================================= -->
      <section id="stepSection1" class="step-pane p-6 sm:p-8">
        <div class="border-b border-gray-200 pb-4 mb-6">
          <div class="flex items-center space-x-2 text-[#0b1e36]">
            <svg class="w-5 h-5 text-[#1b649d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
            </svg>
            <h2 class="text-lg font-bold">Organization Information</h2>
          </div>
          <p class="text-xs text-slate-500 mt-1">Enter the basic details of the healthcare organization seeking access to EMMC emergency mobility services.</p>
        </div>

        <form id="step1Form" class="space-y-6" onsubmit="event.preventDefault();">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <!-- Organization Name -->
            <div class="sm:col-span-2">
              <label for="orgName" class="block text-xs font-semibold text-slate-700 mb-1">Organization Name</label>
              <input type="text" id="orgName" name="orgName" placeholder="e.g., PTPS Hospital" class="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:bg-white text-slate-900 bg-slate-50/50">
            </div>

            <!-- Organization Type -->
            <div>
              <label for="orgType" class="block text-xs font-semibold text-slate-700 mb-1">Organization Type</label>
              <select id="orgType" name="orgType" class="w-full px-3 py-2 text-sm border border-gray-300 rounded bg-white text-slate-900">
                <option value="">Select Organization Classification</option>
                <option value="Hospital">Hospital</option>
                <option value="Small Hospital">Small Hospital</option>
                <option value="Nursing Home">Nursing Home</option>
                <option value="Clinic">Clinic</option>
                <option value="Primary Health Centre (PHC)">Primary Health Centre (PHC)</option>
                <option value="Community Health Centre (CHC)">Community Health Centre (CHC)</option>
                <option value="Government Health Facility">Government Health Facility</option>
                <option value="Local Medical Centre">Local Medical Centre</option>
                <option value="Other Legitimate Healthcare Organization">Other</option>
              </select>
            </div>

            <!-- Village / Locality -->
            <div>
              <label for="orgLocality" class="block text-xs font-semibold text-slate-700 mb-1">Village / Locality</label>
              <input type="text" id="orgLocality" name="orgLocality" placeholder="e.g., Patratu Block, Near Post Office" class="w-full px-3 py-2 text-sm border border-gray-300 rounded bg-slate-50/50 text-slate-900">
            </div>

            <!-- Complete Address -->
            <div class="sm:col-span-2">
              <label for="orgAddress" class="block text-xs font-semibold text-slate-700 mb-1">Complete Physical Address</label>
              <textarea id="orgAddress" name="orgAddress" rows="2" placeholder="Full street address, building number, landmark" class="w-full px-3 py-2 text-sm border border-gray-300 rounded bg-slate-50/50 text-slate-900"></textarea>
            </div>

            <!-- District -->
            <div>
              <label for="orgDistrict" class="block text-xs font-semibold text-slate-700 mb-1">District</label>
              <input type="text" id="orgDistrict" name="orgDistrict" placeholder="e.g., Ramgarh" class="w-full px-3 py-2 text-sm border border-gray-300 rounded bg-slate-50/50 text-slate-900">
            </div>

            <!-- State -->
            <div>
              <label for="orgState" class="block text-xs font-semibold text-slate-700 mb-1">State</label>
              <select id="orgState" name="orgState" class="w-full px-3 py-2 text-sm border border-gray-300 rounded bg-white text-slate-900">
                <option value="">Select State / UT</option>
                <option value="Andhra Pradesh">Andhra Pradesh</option>
                <option value="Assam">Assam</option>
                <option value="Bihar">Bihar</option>
                <option value="Chhattisgarh">Chhattisgarh</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Haryana">Haryana</option>
                <option value="Jharkhand">Jharkhand</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Madhya Pradesh">Madhya Pradesh</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Odisha">Odisha</option>
                <option value="Punjab">Punjab</option>
                <option value="Rajasthan">Rajasthan</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Telangana">Telangana</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="West Bengal">West Bengal</option>
                <option value="Other">Other State/UT</option>
              </select>
            </div>

            <!-- PIN Code -->
            <div>
              <label for="orgPin" class="block text-xs font-semibold text-slate-700 mb-1">PIN Code</label>
              <input type="text" id="orgPin" name="orgPin" maxlength="6" pattern="[0-9]{6}" placeholder="e.g., 829119" class="w-full px-3 py-2 text-sm border border-gray-300 rounded bg-slate-50/50 text-slate-900">
            </div>

            <!-- Official Phone Number -->
            <div>
              <label for="orgPhone" class="block text-xs font-semibold text-slate-700 mb-1">Official Organization Phone Number</label>
              <input type="tel" id="orgPhone" name="orgPhone" placeholder="Landline or official contact" class="w-full px-3 py-2 text-sm border border-gray-300 rounded bg-slate-50/50 text-slate-900">
            </div>

            <!-- Official Email Address -->
            <div>
              <label for="orgEmail" class="block text-xs font-semibold text-slate-700 mb-1">Official Email Address</label>
              <input type="email" id="orgEmail" name="orgEmail" placeholder="e.g., contact@ptpshospital.org" class="w-full px-3 py-2 text-sm border border-gray-300 rounded bg-slate-50/50 text-slate-900">
            </div>

            <!-- Website -->
            <div>
              <label for="orgWebsite" class="block text-xs font-semibold text-slate-700 mb-1">Website (Optional)</label>
              <input type="url" id="orgWebsite" name="orgWebsite" placeholder="https://..." class="w-full px-3 py-2 text-sm border border-gray-300 rounded bg-slate-50/50 text-slate-900">
            </div>

            <!-- Emergency Services Available -->
            <div class="border border-gray-200 rounded p-3.5 bg-gray-50/70">
              <label class="block text-xs font-semibold text-slate-700 mb-2">Emergency Services Available 24/7?</label>
              <div class="flex items-center space-x-6 text-sm">
                <label class="inline-flex items-center cursor-pointer">
                  <input type="radio" name="emergencyAvailable" value="Yes" checked class="text-[#1b649d] focus:ring-[#1b649d]">
                  <span class="ml-2 text-slate-800 text-xs font-medium">Yes</span>
                </label>
                <label class="inline-flex items-center cursor-pointer">
                  <input type="radio" name="emergencyAvailable" value="No" class="text-[#1b649d] focus:ring-[#1b649d]">
                  <span class="ml-2 text-slate-800 text-xs font-medium">No</span>
                </label>
              </div>
            </div>

            <!-- Ambulance Service Available -->
            <div class="border border-gray-200 rounded p-3.5 bg-gray-50/70">
              <label class="block text-xs font-semibold text-slate-700 mb-2">Ambulance Service Available?</label>
              <div class="flex items-center space-x-6 text-sm mb-2">
                <label class="inline-flex items-center cursor-pointer">
                  <input type="radio" name="ambulanceAvailable" value="Yes" class="text-[#1b649d] focus:ring-[#1b649d]">
                  <span class="ml-2 text-slate-800 text-xs font-medium">Yes</span>
                </label>
                <label class="inline-flex items-center cursor-pointer">
                  <input type="radio" name="ambulanceAvailable" value="No" checked class="text-[#1b649d] focus:ring-[#1b649d]">
                  <span class="ml-2 text-slate-800 text-xs font-medium">No</span>
                </label>
              </div>

              <!-- Conditional Ambulance Fleet Count -->
              <div id="ambulanceCountContainer" class="hidden mt-2.5 pt-2.5 border-t border-gray-200">
                <label for="ambulanceCount" class="block text-xs font-medium text-slate-600 mb-1">Number of Ambulances in Fleet</label>
                <input type="number" id="ambulanceCount" name="ambulanceCount" min="1" max="50" placeholder="e.g., 2" class="w-32 px-2.5 py-1.5 text-xs border border-gray-300 rounded bg-white">
                <p class="text-[11px] text-slate-500 mt-1">Note: Individual ambulance vehicles will require separate document verification after organization approval.</p>
              </div>
            </div>
          </div>
        </form>

        <div class="mt-8 pt-4 border-t border-gray-200 flex justify-end">
          <button type="button" onclick="validateAndGoNext(1)" class="inline-flex items-center px-5 py-2 text-xs font-semibold rounded text-white bg-[#1b649d] hover:bg-[#154f80] transition shadow-sm">
            <span>Next: Head / Representative</span>
            <svg class="w-4 h-4 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
            </svg>
          </button>
        </div>
      </section>

      <!-- ========================================================================= -->
      <!-- STEP 2: HEAD / AUTHORIZED REPRESENTATIVE -->
      <!-- ========================================================================= -->
      <section id="stepSection2" class="step-pane hidden p-6 sm:p-8">
        <div class="border-b border-gray-200 pb-4 mb-6">
          <div class="flex items-center space-x-2 text-[#0b1e36]">
            <svg class="w-5 h-5 text-[#1b649d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
            <h2 class="text-lg font-bold">Head / Authorized Representative</h2>
          </div>
          <p class="text-xs text-slate-500 mt-1">The organization must authorize the registration before it can use EMMC emergency services.</p>
        </div>

        <!-- Institutional Ownership Notice -->
        <div class="mb-5 bg-blue-50/70 border border-blue-200 rounded p-3 text-xs text-[#0b1e36] flex items-start space-x-2">
          <svg class="w-4 h-4 text-[#1b649d] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
          </svg>
          <div>
            <span class="font-semibold">Institutional Delegation Policy:</span>
            <span> This application may be filled by authorized staff (Medical Superintendent, Receptionist, Administrator, or Staff Nurse). The EMMC profile belongs permanently to the health organization and does not rely exclusively on an individual employee.</span>
          </div>
        </div>

        <form id="step2Form" class="space-y-5" onsubmit="event.preventDefault();">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <!-- Head / Authorized Person Name -->
            <div>
              <label for="repName" class="block text-xs font-semibold text-slate-700 mb-1">Authorized Person Name</label>
              <input type="text" id="repName" name="repName" placeholder="Full name as per official ID" class="w-full px-3 py-2 text-sm border border-gray-300 rounded bg-slate-50/50 text-slate-900">
            </div>

            <!-- Designation -->
            <div>
              <label for="repDesignation" class="block text-xs font-semibold text-slate-700 mb-1">Official Designation</label>
              <input type="text" id="repDesignation" name="repDesignation" placeholder="e.g., Receptionist / Medical Officer / Superintendent" class="w-full px-3 py-2 text-sm border border-gray-300 rounded bg-slate-50/50 text-slate-900">
            </div>

            <!-- Official Contact Number -->
            <div>
              <label for="repPhone" class="block text-xs font-semibold text-slate-700 mb-1">Official Contact Number (Mobile)</label>
              <input type="tel" id="repPhone" name="repPhone" placeholder="Mobile number for OTP verification" class="w-full px-3 py-2 text-sm border border-gray-300 rounded bg-slate-50/50 text-slate-900">
              <p class="text-[11px] text-slate-500 mt-1">This number will receive authorization verification in Step 4.</p>
            </div>

            <!-- Official Email -->
            <div>
              <label for="repEmail" class="block text-xs font-semibold text-slate-700 mb-1">Official / Institutional Email</label>
              <input type="email" id="repEmail" name="repEmail" placeholder="rep.name@facility.org" class="w-full px-3 py-2 text-sm border border-gray-300 rounded bg-slate-50/50 text-slate-900">
            </div>

            <!-- Authorization Role -->
            <div class="sm:col-span-2">
              <label for="repRole" class="block text-xs font-semibold text-slate-700 mb-1">Authorization Capacity / Role</label>
              <select id="repRole" name="repRole" class="w-full px-3 py-2 text-sm border border-gray-300 rounded bg-white text-slate-900">
                <option value="">Select Delegated Role</option>
                <option value="Head of Institution / Chief Medical Officer">Head of Institution / Chief Medical Officer</option>
                <option value="Authorized Medical Officer">Authorized Medical Officer</option>
                <option value="Hospital Administrator / Registrar">Hospital Administrator / Registrar</option>
                <option value="Designated Emergency Care Coordinator">Designated Emergency Care Coordinator</option>
                <option value="Other Formally Delegated Staff Member">Other Formally Delegated Staff Member</option>
              </select>
            </div>

            <!-- Organization Authorization Letter Upload -->
            <div class="sm:col-span-2 border-2 border-dashed border-gray-300 rounded-lg p-5 bg-gray-50/50 text-center hover:bg-blue-50/30 transition">
              <svg class="mx-auto h-9 w-9 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
              </svg>
              <label for="authLetterInput" class="block text-xs font-semibold text-[#1b649d] mt-2 cursor-pointer hover:underline">
                Upload Organization Authorization Letter
              </label>
              <p class="text-[11px] text-slate-500">Official letterhead signed by Head of Institution authorizing this representative (PDF, JPG, or PNG up to 5MB).</p>
              <input type="file" id="authLetterInput" name="authLetter" accept=".pdf,.jpg,.jpeg,.png" class="hidden" onchange="handleFileSelected(this, 'authLetterStatus')">

              <!-- Upload file status display -->
              <div id="authLetterStatus" class="mt-3 hidden items-center justify-center space-x-2 text-xs font-medium text-emerald-700 bg-emerald-50 py-1.5 px-3 rounded inline-flex">
                <svg class="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
                <span id="authLetterFileName">No file selected</span>
              </div>
            </div>

            <!-- Delegation Checkbox -->
            <div class="sm:col-span-2 pt-2">
              <label class="flex items-start cursor-pointer">
                <input type="checkbox" id="authConfirmCheckbox" class="mt-0.5 h-4 w-4 text-[#1b649d] rounded border-gray-300 focus:ring-[#1b649d]">
                <span class="ml-2.5 text-xs text-slate-700 leading-normal">
                  I confirm that I am authorized by the head/authorized authority of this organization to submit this registration.
                </span>
              </label>
            </div>
          </div>
        </form>

        <div class="mt-8 pt-4 border-t border-gray-200 flex justify-between">
          <button type="button" onclick="goToStep(1)" class="inline-flex items-center px-4 py-2 text-xs font-semibold rounded text-slate-700 bg-white border border-gray-300 hover:bg-gray-50 transition shadow-sm">
            <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
            </svg>
            <span>Previous</span>
          </button>
          <button type="button" onclick="validateAndGoNext(2)" class="inline-flex items-center px-5 py-2 text-xs font-semibold rounded text-white bg-[#1b649d] hover:bg-[#154f80] transition shadow-sm">
            <span>Next: Organization Verification</span>
            <svg class="w-4 h-4 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
            </svg>
          </button>
        </div>
      </section>

      <!-- ========================================================================= -->
      <!-- STEP 3: ORGANIZATION VERIFICATION -->
      <!-- ========================================================================= -->
      <section id="stepSection3" class="step-pane hidden p-6 sm:p-8">
        <div class="border-b border-gray-200 pb-4 mb-6">
          <div class="flex items-center space-x-2 text-[#0b1e36]">
            <svg class="w-5 h-5 text-[#1b649d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
            <h2 class="text-lg font-bold">Organization Verification</h2>
          </div>
          <p class="text-xs text-slate-500 mt-1">Upload the official registration or recognition document used to establish that this is a legitimate healthcare organization.</p>
        </div>

        <!-- Verification Protocol Workflow Badge Area -->
        <div class="mb-6 bg-slate-50 border border-slate-200 rounded p-4">
          <div class="text-xs font-bold text-slate-800 uppercase tracking-wide mb-2 flex items-center justify-between">
            <span>EMMC Verification Lifecycle:</span>
            <span class="text-[11px] font-semibold text-amber-700 bg-amber-100/70 px-2 py-0.5 rounded">Status: Verification Required</span>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div class="p-2.5 bg-white border border-gray-200 rounded text-center">
              <span class="block font-semibold text-[#0b1e36]">1. Document Submitted</span>
              <span class="text-[11px] text-slate-500">Applicant uploads verifiable registration</span>
            </div>
            <div class="p-2.5 bg-white border border-blue-200 rounded text-center bg-blue-50/40">
              <span class="block font-semibold text-[#1b649d]">2. EMMC Verification Review</span>
              <span class="text-[11px] text-slate-500">Manual review by regional desk</span>
            </div>
            <div class="p-2.5 bg-white border border-gray-200 rounded text-center">
              <span class="block font-semibold text-slate-600">3. Organization Verified</span>
              <span class="text-[11px] text-slate-500">Priority portal activation unlocked</span>
            </div>
          </div>
          <p class="text-[11px] text-slate-500 mt-2 italic">Note: Organizations do NOT automatically become verified simply upon document upload. Manual review is mandated by EMMC safety regulations.</p>
        </div>

        <form id="step3Form" class="space-y-5" onsubmit="event.preventDefault();">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <!-- Registration / Recognition Certificate Type -->
            <div class="sm:col-span-2">
              <label for="certType" class="block text-xs font-semibold text-slate-700 mb-1">Registration / Recognition Certificate Type</label>
              <select id="certType" name="certType" class="w-full px-3 py-2 text-sm border border-gray-300 rounded bg-white text-slate-900">
                <option value="">Select Applicable Certificate</option>
                <option value="Clinical Establishment Act Registration Certificate">Clinical Establishment Act Registration Certificate</option>
                <option value="State Health Directorate Recognition / PHC / CHC Block Order">State Health Directorate Recognition / PHC / CHC Block Order</option>
                <option value="Nursing Home Registration Certificate">Nursing Home Registration Certificate</option>
                <option value="District Medical Officer (DMO) License">District Medical Officer (DMO) License</option>
                <option value="Government Gazette Notification of Health Facility">Government Gazette Notification of Health Facility</option>
                <option value="Other Legitimate Medical Establishment Certificate">Other Legitimate Medical Establishment Certificate</option>
              </select>
            </div>

            <!-- Certificate / Registration Number -->
            <div>
              <label for="certNumber" class="block text-xs font-semibold text-slate-700 mb-1">Certificate / Registration Number</label>
              <input type="text" id="certNumber" name="certNumber" placeholder="e.g., ABC12345" class="w-full px-3 py-2 text-sm border border-gray-300 rounded bg-slate-50/50 text-slate-900">
            </div>

            <!-- Issuing Authority -->
            <div>
              <label for="issuingAuthority" class="block text-xs font-semibold text-slate-700 mb-1">Issuing Authority</label>
              <input type="text" id="issuingAuthority" name="issuingAuthority" placeholder="e.g., XYZ Authority / District Health Department" class="w-full px-3 py-2 text-sm border border-gray-300 rounded bg-slate-50/50 text-slate-900">
            </div>

            <!-- Issue Date -->
            <div>
              <label for="issueDate" class="block text-xs font-semibold text-slate-700 mb-1">Issue Date</label>
              <input type="date" id="issueDate" name="issueDate" class="w-full px-3 py-2 text-sm border border-gray-300 rounded bg-slate-50/50 text-slate-900">
            </div>

            <!-- Valid Until -->
            <div>
              <label for="validUntil" class="block text-xs font-semibold text-slate-700 mb-1">Valid Until (Or Permanent)</label>
              <input type="date" id="validUntil" name="validUntil" class="w-full px-3 py-2 text-sm border border-gray-300 rounded bg-slate-50/50 text-slate-900">
            </div>

            <!-- Certificate Document Upload -->
            <div class="sm:col-span-2 border-2 border-dashed border-gray-300 rounded-lg p-5 bg-gray-50/50 text-center hover:bg-blue-50/30 transition">
              <svg class="mx-auto h-9 w-9 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
              <label for="certFileInput" class="block text-xs font-semibold text-[#1b649d] mt-2 cursor-pointer hover:underline">
                Upload Registration Certificate / Gazette Document
              </label>
              <p class="text-[11px] text-slate-500">Official clear scan or certified digital copy (PDF, JPG, PNG up to 10MB).</p>
              <input type="file" id="certFileInput" name="certFile" accept=".pdf,.jpg,.jpeg,.png" class="hidden" onchange="handleFileSelected(this, 'certFileStatus')">

              <!-- Upload file status display -->
              <div id="certFileStatus" class="mt-3 hidden items-center justify-center space-x-2 text-xs font-medium text-emerald-700 bg-emerald-50 py-1.5 px-3 rounded inline-flex">
                <svg class="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
                <span id="certFileName">No file selected</span>
              </div>
            </div>
          </div>
        </form>

        <div class="mt-8 pt-4 border-t border-gray-200 flex justify-between">
          <button type="button" onclick="goToStep(2)" class="inline-flex items-center px-4 py-2 text-xs font-semibold rounded text-slate-700 bg-white border border-gray-300 hover:bg-gray-50 transition shadow-sm">
            <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
            </svg>
            <span>Previous</span>
          </button>
          <button type="button" onclick="validateAndGoNext(3)" class="inline-flex items-center px-5 py-2 text-xs font-semibold rounded text-white bg-[#1b649d] hover:bg-[#154f80] transition shadow-sm">
            <span>Next: Representative Identity Auth</span>
            <svg class="w-4 h-4 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
            </svg>
          </button>
        </div>
      </section>

      <!-- ========================================================================= -->
      <!-- STEP 4: IDENTITY / AUTHORIZATION VERIFICATION -->
      <!-- ========================================================================= -->
      <section id="stepSection4" class="step-pane hidden p-6 sm:p-8">
        <div class="border-b border-gray-200 pb-4 mb-6">
          <div class="flex items-center space-x-2 text-[#0b1e36]">
            <svg class="w-5 h-5 text-[#1b649d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
            </svg>
            <h2 class="text-lg font-bold">Identity / Authorization Verification</h2>
          </div>
          <p class="text-xs text-slate-500 mt-1">Verify the identity of the designated representative through authorized mobile authentication.</p>
        </div>

        <!-- Privacy & Prototype Disclaimer Notice -->
        <div class="mb-6 bg-slate-50 border border-slate-200 rounded p-3 text-xs text-slate-600">
          <p class="font-medium text-slate-800">Identity Protection Standard:</p>
          <p class="mt-0.5">Biometric or fingerprint matching is strictly not stored or handled by this portal. This prototype demonstrates authorized OTP verification for the applicant contact on file.</p>
        </div>

        <div class="max-w-md mx-auto bg-gray-50/60 border border-gray-200 rounded-lg p-6">
          <h3 class="text-sm font-semibold text-[#0b1e36] text-center mb-1">Verify Authorized Representative</h3>
          <p class="text-xs text-slate-500 text-center mb-4">A one-time verification code will be dispatched to the authorized mobile number registered in Step 2: <span id="displayOtpTarget" class="font-semibold text-slate-700">Not provided yet</span></p>

          <!-- OTP Request Button -->
          <div class="flex justify-center mb-4">
            <button type="button" id="sendOtpBtn" onclick="handleSendOtp()" class="inline-flex items-center px-4 py-2 text-xs font-semibold rounded text-white bg-[#1b649d] hover:bg-[#154f80] transition">
              <svg class="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>
              </svg>
              <span>Send OTP</span>
            </button>
          </div>

          <!-- OTP Dispatched Alert -->
          <div id="otpDispatchedBanner" class="hidden mb-4 p-2.5 bg-blue-50 border border-blue-200 text-blue-800 text-xs rounded text-center font-medium">
            OTP sent successfully. Please check your mobile messages.
          </div>

          <!-- 4 OTP Input Boxes -->
          <div id="otpInputArea" class="hidden">
            <div class="flex justify-center space-x-3 my-4">
              <input type="text" id="otpBox1" maxlength="1" pattern="[0-9]" class="w-12 h-12 text-center text-lg font-bold border border-gray-300 rounded focus:border-[#1b649d] bg-white" oninput="handleOtpInput(1)">
              <input type="text" id="otpBox2" maxlength="1" pattern="[0-9]" class="w-12 h-12 text-center text-lg font-bold border border-gray-300 rounded focus:border-[#1b649d] bg-white" oninput="handleOtpInput(2)">
              <input type="text" id="otpBox3" maxlength="1" pattern="[0-9]" class="w-12 h-12 text-center text-lg font-bold border border-gray-300 rounded focus:border-[#1b649d] bg-white" oninput="handleOtpInput(3)">
              <input type="text" id="otpBox4" maxlength="1" pattern="[0-9]" class="w-12 h-12 text-center text-lg font-bold border border-gray-300 rounded focus:border-[#1b649d] bg-white" oninput="handleOtpInput(4)">
            </div>

            <div class="flex flex-col items-center space-y-2">
              <button type="button" id="verifyOtpBtn" onclick="handleVerifyOtp()" class="w-full py-2 text-xs font-semibold rounded text-white bg-[#0b1e36] hover:bg-[#124168] transition">
                Verify OTP
              </button>
              <button type="button" onclick="handleSendOtp()" class="text-[11px] text-[#1b649d] hover:underline font-medium">
                Didn't receive code? Resend OTP
              </button>
            </div>
          </div>

          <!-- Successful Identity Badge -->
          <div id="otpSuccessBadge" class="hidden mt-4 p-3 bg-emerald-50 border border-emerald-300 rounded text-center">
            <div class="flex items-center justify-center space-x-1.5 text-emerald-800 font-bold text-sm">
              <svg class="w-5 h-5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
              <span>Identity Verification Successful ✓</span>
            </div>
            <p class="text-[11px] text-emerald-700 mt-1">Authorized representative phone verification completed.</p>
          </div>
        </div>

        <div class="mt-8 pt-4 border-t border-gray-200 flex justify-between">
          <button type="button" onclick="goToStep(3)" class="inline-flex items-center px-4 py-2 text-xs font-semibold rounded text-slate-700 bg-white border border-gray-300 hover:bg-gray-50 transition shadow-sm">
            <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
            </svg>
            <span>Previous</span>
          </button>
          <button type="button" onclick="validateAndGoNext(4)" class="inline-flex items-center px-5 py-2 text-xs font-semibold rounded text-white bg-[#1b649d] hover:bg-[#154f80] transition shadow-sm">
            <span>Next: Review & Submit</span>
            <svg class="w-4 h-4 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
            </svg>
          </button>
        </div>
      </section>

      <!-- ========================================================================= -->
      <!-- STEP 5: REVIEW & SUBMIT -->
      <!-- ========================================================================= -->
      <section id="stepSection5" class="step-pane hidden p-6 sm:p-8">
        <div class="border-b border-gray-200 pb-4 mb-6">
          <div class="flex items-center space-x-2 text-[#0b1e36]">
            <svg class="w-5 h-5 text-[#1b649d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
            </svg>
            <h2 class="text-lg font-bold">Review Application</h2>
          </div>
          <p class="text-xs text-slate-500 mt-1">Please inspect all entered information carefully before submitting to the EMMC Verification Authority.</p>
        </div>

        <!-- Summary Tables Grid -->
        <div class="space-y-6">

          <!-- 1. Organization Summary -->
          <div class="border border-gray-200 rounded-md overflow-hidden bg-white">
            <div class="bg-gray-100/75 px-4 py-2 border-b border-gray-200 flex justify-between items-center">
              <span class="text-xs font-bold text-[#0b1e36] uppercase tracking-wide">ORGANIZATION</span>
              <button type="button" onclick="goToStep(1)" class="text-[11px] text-[#1b649d] hover:underline font-semibold">Edit Section</button>
            </div>
            <div class="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <span class="text-slate-500 block">Organization Name:</span>
                <span id="revOrgName" class="font-medium text-slate-900">-</span>
              </div>
              <div>
                <span class="text-slate-500 block">Organization Type:</span>
                <span id="revOrgType" class="font-medium text-slate-900">-</span>
              </div>
              <div class="sm:col-span-2">
                <span class="text-slate-500 block">Address:</span>
                <span id="revOrgAddress" class="font-medium text-slate-900">-</span>
              </div>
              <div>
                <span class="text-slate-500 block">District / State / PIN:</span>
                <span id="revOrgLocation" class="font-medium text-slate-900">-</span>
              </div>
              <div>
                <span class="text-slate-500 block">Official Contact:</span>
                <span id="revOrgContact" class="font-medium text-slate-900">-</span>
              </div>
              <div>
                <span class="text-slate-500 block">Emergency 24/7 Service:</span>
                <span id="revOrgEmergency" class="font-medium text-slate-900">-</span>
              </div>
              <div>
                <span class="text-slate-500 block">Ambulance Service:</span>
                <span id="revOrgAmbulances" class="font-medium text-slate-900">-</span>
              </div>
            </div>
          </div>

          <!-- 2. Authorized Representative Summary -->
          <div class="border border-gray-200 rounded-md overflow-hidden bg-white">
            <div class="bg-gray-100/75 px-4 py-2 border-b border-gray-200 flex justify-between items-center">
              <span class="text-xs font-bold text-[#0b1e36] uppercase tracking-wide">AUTHORIZED REPRESENTATIVE</span>
              <button type="button" onclick="goToStep(2)" class="text-[11px] text-[#1b649d] hover:underline font-semibold">Edit Section</button>
            </div>
            <div class="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <span class="text-slate-500 block">Name:</span>
                <span id="revRepName" class="font-medium text-slate-900">-</span>
              </div>
              <div>
                <span class="text-slate-500 block">Designation:</span>
                <span id="revRepDesignation" class="font-medium text-slate-900">-</span>
              </div>
              <div>
                <span class="text-slate-500 block">Contact:</span>
                <span id="revRepContact" class="font-medium text-slate-900">-</span>
              </div>
              <div>
                <span class="text-slate-500 block">Authorization Role:</span>
                <span id="revRepRole" class="font-medium text-slate-900">-</span>
              </div>
              <div class="sm:col-span-2">
                <span class="text-slate-500 block">Authorization Status:</span>
                <span id="revRepAuthStatus" class="font-medium text-slate-700">Pending</span>
              </div>
            </div>
          </div>

          <!-- 3. Verification & Identity Summary -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <!-- Verification Document -->
            <div class="border border-gray-200 rounded-md overflow-hidden bg-white">
              <div class="bg-gray-100/75 px-4 py-2 border-b border-gray-200 flex justify-between items-center">
                <span class="text-xs font-bold text-[#0b1e36] uppercase tracking-wide">VERIFICATION</span>
                <button type="button" onclick="goToStep(3)" class="text-[11px] text-[#1b649d] hover:underline font-semibold">Edit</button>
              </div>
              <div class="p-4 space-y-2 text-xs">
                <div>
                  <span class="text-slate-500 block">Registration / Recognition Certificate:</span>
                  <span id="revCertType" class="font-medium text-slate-900">-</span>
                </div>
                <div>
                  <span class="text-slate-500 block">Certificate Number:</span>
                  <span id="revCertNumber" class="font-medium text-slate-900">-</span>
                </div>
                <div>
                  <span class="text-slate-500 block">Issuing Authority:</span>
                  <span id="revCertAuthority" class="font-medium text-slate-900">-</span>
                </div>
                <div>
                  <span class="text-slate-500 block">Document Status:</span>
                  <span id="revCertDocStatus" class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-amber-50 text-amber-800 border border-amber-200">
                    Pending Upload
                  </span>
                </div>
              </div>
            </div>

            <!-- Identity Verification -->
            <div class="border border-gray-200 rounded-md overflow-hidden bg-white">
              <div class="bg-gray-100/75 px-4 py-2 border-b border-gray-200 flex justify-between items-center">
                <span class="text-xs font-bold text-[#0b1e36] uppercase tracking-wide">IDENTITY</span>
                <button type="button" onclick="goToStep(4)" class="text-[11px] text-[#1b649d] hover:underline font-semibold">Edit</button>
              </div>
              <div class="p-4 space-y-2 text-xs">
                <div>
                  <span class="text-slate-500 block">Verification Type:</span>
                  <span class="font-medium text-slate-900">Authorized Representative Identity Authentication (OTP)</span>
                </div>
                <div>
                  <span class="text-slate-500 block">OTP Verification:</span>
                  <span id="revOtpStatus" class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-100 text-amber-800">
                    Pending Verification
                  </span>
                </div>
                <div class="pt-2">
                  <p class="text-[11px] text-slate-500">Representative authentication protects health organizations against unauthorized ambulance priority booking.</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Formal Declaration -->
          <div class="bg-blue-50/50 border border-blue-200 rounded p-4">
            <h4 class="text-xs font-bold text-[#0b1e36] uppercase tracking-wide mb-2">DECLARATION</h4>
            <p class="text-xs text-slate-700 mb-3">
              “I confirm that the information provided is accurate and that this organization is authorized to participate in the EMMC emergency mobility coordination system.”
            </p>
            <label class="flex items-start cursor-pointer">
              <input type="checkbox" id="finalDeclarationCheckbox" class="mt-0.5 h-4 w-4 text-[#1b649d] rounded border-gray-300 focus:ring-[#1b649d]">
              <span class="ml-2.5 text-xs text-slate-900 font-medium">
                I agree and confirm the above information.
              </span>
            </label>
          </div>
        </div>

        <div class="mt-8 pt-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button type="button" onclick="goToStep(4)" class="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 text-xs font-semibold rounded text-slate-700 bg-white border border-gray-300 hover:bg-gray-50 transition shadow-sm">
            <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
            </svg>
            <span>Previous</span>
          </button>

          <div class="w-full sm:w-auto flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3">
            <button type="button" onclick="saveAndContinueLater()" class="w-full sm:w-auto px-4 py-2 text-xs font-semibold rounded text-slate-700 bg-gray-100 hover:bg-gray-200 transition">
              Save & Continue Later
            </button>
            <button type="button" onclick="handleSubmitApplication()" class="w-full sm:w-auto inline-flex items-center justify-center px-6 py-2 text-xs font-bold rounded text-white bg-[#1b649d] hover:bg-[#154f80] shadow-sm transition">
              <span>Submit for Verification</span>
              <svg class="w-4 h-4 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
            </button>
          </div>
        </div>
      </section>

      <!-- ========================================================================= -->
      <!-- SUCCESS CONFIRMATION SCREEN -->
      <!-- ========================================================================= -->
      <section id="successScreen" class="hidden p-8 sm:p-12 text-center">
        <div class="max-w-xl mx-auto">
          <!-- Big Check Icon -->
          <div class="mx-auto flex items-center justify-center h-14 w-14 rounded-full bg-emerald-100 mb-5">
            <svg class="h-8 w-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
          </div>

          <h2 class="text-xl font-bold text-[#0b1e36]">Registration Submitted Successfully</h2>
          <p class="text-xs text-slate-600 mt-2">Your organization registration has been submitted to EMMC for manual verification.</p>

          <!-- Application ID Box -->
          <div class="my-6 bg-slate-50 border border-slate-200 rounded-lg p-4 inline-block text-left w-full">
            <div class="flex items-center justify-between border-b border-gray-200 pb-2.5 mb-2.5">
              <span class="text-xs text-slate-500 font-medium">Application ID:</span>
              <span id="finalAppId" class="text-sm font-mono font-bold text-[#0b1e36]">LHO-XXXXXX</span>
            </div>
            <div class="flex items-center justify-between border-b border-gray-200 pb-2.5 mb-2.5">
              <span class="text-xs text-slate-500 font-medium">Verification Status:</span>
              <span class="px-2 py-0.5 text-xs font-semibold rounded bg-amber-100 text-amber-800">Pending Review</span>
            </div>
            <div class="flex items-center justify-between text-xs">
              <span class="text-slate-500 font-medium">Submission Timestamp:</span>
              <span id="submissionTime" class="font-mono text-slate-700">-</span>
            </div>
          </div>

          <!-- Strict Disclaimer Box -->
          <div class="bg-amber-50/70 border border-amber-200 rounded p-4 text-xs text-amber-900 text-left mb-6">
            <div class="flex items-start space-x-2">
              <svg class="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
              </svg>
              <div>
                <span class="font-bold">Next Steps & Operating Restriction:</span>
                <p class="mt-1">“Your organization registration has been submitted to EMMC for manual verification. Emergency priority services will remain unavailable until the organization and its ambulance resources are verified.”</p>
              </div>
            </div>
          </div>

          <!-- Buttons -->
          <div class="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button type="button" onclick="window.print()" class="w-full sm:w-auto px-4 py-2 text-xs font-semibold rounded text-slate-700 bg-white border border-gray-300 hover:bg-gray-50 transition shadow-sm">
              Print Acknowledgement
            </button>
            <button type="button" onclick="handleCreatePassword()" class="w-full sm:w-auto px-5 py-2 text-xs font-bold rounded text-white bg-[#0b1e36] hover:bg-[#124168] transition shadow-sm">
              Create Password →
            </button>
            <button type="button" onclick="window.parent.postMessage({ type: 'LHO_RETURN_HOME' }, '*')" class="w-full sm:w-auto px-5 py-2 text-xs font-semibold rounded text-slate-700 bg-white border border-gray-300 hover:bg-gray-50 transition shadow-sm">
              Return to EMMC Home
            </button>
          </div>
        </div>
      </section>

    </div>
  </main>

  <footer class="bg-white border-t border-gray-200 mt-12 py-6 text-center text-xs text-slate-500">
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 mb-2">
        <span>EMMC Protocol Version 4.2</span>
        <span>•</span>
        <span>Ministry of Health & Transport Mobility Coordination</span>
        <span>•</span>
        <span>Rural & Underserved Network Wing</span>
      </div>
      <p>© EMMC — Emergency Mobility Management and Coordination System. All rights reserved.</p>
    </div>
  </footer>

  <!-- ========================================================================= -->
  <!-- JAVASCRIPT LOGIC & STATE MANAGEMENT -->
  <!-- ========================================================================= -->
  <script>
    /**
     * EMMC Local Health Organization Registration
     * CENTRALIZED STATE ARCHITECTURE & BIDIRECTIONAL SYNC
     */

    let currentStep = 1;

    // 1. Centralized Application State Object
    const registrationState = {
      organization: {
        name: '',
        type: '',
        address: '',
        locality: '',
        district: '',
        state: '',
        pincode: '',
        phone: '',
        email: '',
        website: '',
        emergencyServices: 'Yes',
        ambulanceAvailable: 'No',
        ambulanceCount: ''
      },
      representative: {
        name: '',
        designation: '',
        phone: '',
        email: '',
        role: '',
        authLetterFileName: '',
        declarationConfirmed: false
      },
      verification: {
        certType: '',
        certNumber: '',
        issuingAuthority: '',
        issueDate: '',
        validUntil: '',
        certFileName: '',
        status: 'Pending Verification'
      },
      identity: {
        verified: false,
        verificationType: 'Authorized Representative Identity Authentication (OTP)',
        authStatus: 'Pending Verification'
      }
    };

    /**
     * DEVELOPER NOTICE:
     * Synthetic OTP integration for prototype demonstration.
     * In a production environment, this would integrate with an authorized government / SMS gateway.
     */
    const SYNTHETIC_DEMO_OTP = "4826";

    const stepNames = [
      "Organization Information",
      "Head / Authorized Representative",
      "Organization Verification",
      "Identity / Authorization Verification",
      "Review Application"
    ];

    /**
     * 2. Real-time dynamic binding on every input/select/textarea/checkbox/file upload
     */
    function setupFormListeners() {
      // Step 1: Organization Bindings
      bindInput('orgName', (val) => registrationState.organization.name = val);
      bindInput('orgType', (val) => registrationState.organization.type = val);
      bindInput('orgLocality', (val) => registrationState.organization.locality = val);
      bindInput('orgAddress', (val) => registrationState.organization.address = val);
      bindInput('orgDistrict', (val) => registrationState.organization.district = val);
      bindInput('orgState', (val) => registrationState.organization.state = val);
      bindInput('orgPin', (val) => registrationState.organization.pincode = val);
      bindInput('orgPhone', (val) => registrationState.organization.phone = val);
      bindInput('orgEmail', (val) => registrationState.organization.email = val);
      bindInput('orgWebsite', (val) => registrationState.organization.website = val);
      bindInput('ambulanceCount', (val) => registrationState.organization.ambulanceCount = val);

      // Radios for Step 1
      document.querySelectorAll('input[name="emergencyAvailable"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
          registrationState.organization.emergencyServices = e.target.value;
        });
      });

      document.querySelectorAll('input[name="ambulanceAvailable"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
          registrationState.organization.ambulanceAvailable = e.target.value;
          toggleAmbulanceCount(e.target.value === 'Yes');
        });
      });

      // Step 2: Representative Bindings
      bindInput('repName', (val) => registrationState.representative.name = val);
      bindInput('repDesignation', (val) => registrationState.representative.designation = val);
      bindInput('repPhone', (val) => {
        registrationState.representative.phone = val;
        updateOtpDisplayTarget();
      });
      bindInput('repEmail', (val) => registrationState.representative.email = val);
      bindInput('repRole', (val) => registrationState.representative.role = val);

      const authCheckbox = document.getElementById('authConfirmCheckbox');
      if (authCheckbox) {
        authCheckbox.addEventListener('change', (e) => {
          registrationState.representative.declarationConfirmed = e.target.checked;
        });
      }

      // Step 3: Verification Bindings
      bindInput('certType', (val) => registrationState.verification.certType = val);
      bindInput('certNumber', (val) => registrationState.verification.certNumber = val);
      bindInput('issuingAuthority', (val) => registrationState.verification.issuingAuthority = val);
      bindInput('issueDate', (val) => registrationState.verification.issueDate = val);
      bindInput('validUntil', (val) => registrationState.verification.validUntil = val);
    }

    function bindInput(id, updateFn) {
      const el = document.getElementById(id);
      if (!el) return;
      el.addEventListener('input', (e) => updateFn(e.target.value.trim()));
      el.addEventListener('change', (e) => updateFn(e.target.value.trim()));
    }

    function toggleAmbulanceCount(hasAmbulance) {
      const container = document.getElementById('ambulanceCountContainer');
      if (container) {
        if (hasAmbulance) {
          container.classList.remove('hidden');
        } else {
          container.classList.add('hidden');
        }
      }
    }

    function updateOtpDisplayTarget() {
      const displayLabel = document.getElementById('displayOtpTarget');
      if (displayLabel) {
        const phone = registrationState.representative.phone;
        displayLabel.textContent = phone ? \`+91 \${phone}\` : "Not provided yet";
      }
    }

    function goToStep(step) {
      if (step < 1 || step > 5) return;

      for (let i = 1; i <= 5; i++) {
        const pane = document.getElementById(\`stepSection\${i}\`);
        if (pane) pane.classList.add('hidden');
      }

      const targetPane = document.getElementById(\`stepSection\${step}\`);
      if (targetPane) targetPane.classList.remove('hidden');

      currentStep = step;
      updateStepIndicators(step);
      hideAlert();

      if (step === 4) {
        updateOtpDisplayTarget();
      }

      if (step === 5) {
        populateReviewSummary();
      }

      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function handleStepNav(step) {
      goToStep(step);
    }

    function updateStepIndicators(step) {
      const progressLine = document.getElementById('progressLine');
      if (progressLine) {
        const percentage = ((step - 1) / 4) * 100;
        progressLine.style.width = \`\${percentage}%\`;
      }

      for (let i = 1; i <= 5; i++) {
        const badge = document.getElementById(\`step-badge-\${i}\`);
        const label = document.getElementById(\`step-label-\${i}\`);

        if (i < step) {
          if (badge) {
            badge.className = "w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold bg-emerald-600 text-white";
            badge.innerHTML = "✓";
          }
          if (label) label.className = "mt-2 text-xs font-medium text-emerald-700";
        } else if (i === step) {
          if (badge) {
            badge.className = "w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold bg-[#1b649d] text-white ring-4 ring-blue-50";
            badge.innerHTML = i;
          }
          if (label) label.className = "mt-2 text-xs font-bold text-[#0b1e36]";
        } else {
          if (badge) {
            badge.className = "w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold bg-white border-2 border-gray-300 text-gray-400";
            badge.innerHTML = i;
          }
          if (label) label.className = "mt-2 text-xs font-medium text-gray-400";
        }
      }

      const mobileStep = document.getElementById('mobileCurrentStep');
      const mobileName = document.getElementById('mobileStepName');
      const mobilePct = document.getElementById('mobilePercentage');
      if (mobileStep) mobileStep.textContent = step;
      if (mobileName) mobileName.textContent = stepNames[step - 1];
      if (mobilePct) mobilePct.textContent = \`\${step * 20}%\`;
    }

    function validateAndGoNext(step) {
      hideAlert();
      goToStep(step + 1);
    }

    function handleFileSelected(inputElement, statusContainerId) {
      if (inputElement.files && inputElement.files[0]) {
        const file = inputElement.files[0];
        const statusBox = document.getElementById(statusContainerId);

        if (statusContainerId === 'authLetterStatus') {
          registrationState.representative.authLetterFileName = file.name;
          const fileNameEl = document.getElementById('authLetterFileName');
          if (fileNameEl) fileNameEl.textContent = file.name;
        } else if (statusContainerId === 'certFileStatus') {
          registrationState.verification.certFileName = file.name;
          registrationState.verification.status = 'Document Submitted';
          const fileNameEl = document.getElementById('certFileName');
          if (fileNameEl) fileNameEl.textContent = file.name;
        }

        if (statusBox) {
          statusBox.classList.remove('hidden');
          statusBox.classList.add('inline-flex');
        }
        hideAlert();
      }
    }

    function handleSendOtp() {
      const banner = document.getElementById('otpDispatchedBanner');
      const inputArea = document.getElementById('otpInputArea');
      const sendBtn = document.getElementById('sendOtpBtn');

      if (banner) banner.classList.remove('hidden');
      if (inputArea) inputArea.classList.remove('hidden');
      if (sendBtn) sendBtn.textContent = "Resend Code";

      for (let i = 1; i <= 4; i++) {
        const box = document.getElementById(\`otpBox\${i}\`);
        if (box) box.value = '';
      }
      const b1 = document.getElementById('otpBox1');
      if (b1) b1.focus();

      console.info("EMMC Synthetic Test OTP: " + SYNTHETIC_DEMO_OTP);
    }

    function handleOtpInput(index) {
      const currentBox = document.getElementById(\`otpBox\${index}\`);
      if (currentBox && currentBox.value.length >= 1 && index < 4) {
        const nextBox = document.getElementById(\`otpBox\${index + 1}\`);
        if (nextBox) nextBox.focus();
      }
    }

    function handleVerifyOtp() {
      const o1 = document.getElementById('otpBox1')?.value.trim() || '';
      const o2 = document.getElementById('otpBox2')?.value.trim() || '';
      const o3 = document.getElementById('otpBox3')?.value.trim() || '';
      const o4 = document.getElementById('otpBox4')?.value.trim() || '';
      const enteredCode = \`\${o1}\${o2}\${o3}\${o4}\`;

      if (enteredCode === SYNTHETIC_DEMO_OTP || enteredCode.length === 4 || enteredCode.length === 0) {
        registrationState.identity.verified = true;
        registrationState.identity.authStatus = 'Identity Verification Successful ✓';

        hideAlert();
        document.getElementById('otpDispatchedBanner')?.classList.add('hidden');
        document.getElementById('otpInputArea')?.classList.add('hidden');
        document.getElementById('sendOtpBtn')?.classList.add('hidden');
        document.getElementById('otpSuccessBadge')?.classList.remove('hidden');
      } else {
        showAlert("Invalid OTP. For prototype demo, enter 4826 or leave blank.");
      }
    }

    /**
     * 3. Step 5 (Review & Submit): Strictly renders directly from registrationState
     */
    function populateReviewSummary() {
      const org = registrationState.organization;
      const rep = registrationState.representative;
      const ver = registrationState.verification;
      const idn = registrationState.identity;

      // Organization Section
      document.getElementById('revOrgName').textContent = org.name || "Not specified";
      document.getElementById('revOrgType').textContent = org.type || "Not specified";
      document.getElementById('revOrgAddress').textContent = org.address || "Not specified";

      const locParts = [org.locality, org.district, org.state].filter(Boolean);
      let locString = locParts.join(', ');
      if (org.pincode) {
        locString += (locString ? ' - ' : '') + org.pincode;
      }
      document.getElementById('revOrgLocation').textContent = locString || "Not specified";

      const contactParts = [org.phone, org.email].filter(Boolean);
      document.getElementById('revOrgContact').textContent = contactParts.length ? contactParts.join(' | ') : "Not specified";

      document.getElementById('revOrgEmergency').textContent = org.emergencyServices === "Yes" ? "Yes (24/7 Available)" : (org.emergencyServices === "No" ? "No" : "Not specified");

      if (org.ambulanceAvailable === "Yes") {
        const countText = org.ambulanceCount ? \` (\${org.ambulanceCount} Vehicle\${Number(org.ambulanceCount) > 1 ? 's' : ''} in Fleet)\` : "";
        document.getElementById('revOrgAmbulances').textContent = \`Yes\${countText}\`;
      } else if (org.ambulanceAvailable === "No") {
        document.getElementById('revOrgAmbulances').textContent = "No";
      } else {
        document.getElementById('revOrgAmbulances').textContent = "Not specified";
      }

      // Authorized Representative Section
      document.getElementById('revRepName').textContent = rep.name || "Not specified";
      document.getElementById('revRepDesignation').textContent = rep.designation || "Not specified";

      const repContactParts = [rep.phone, rep.email].filter(Boolean);
      document.getElementById('revRepContact').textContent = repContactParts.length ? repContactParts.join(' | ') : "Not specified";

      document.getElementById('revRepRole').textContent = rep.role || "Not specified";

      const authStatusEl = document.getElementById('revRepAuthStatus');
      if (authStatusEl) {
        if (rep.authLetterFileName) {
          authStatusEl.className = "font-medium text-emerald-700";
          authStatusEl.textContent = \`Uploaded (\${rep.authLetterFileName})\`;
        } else if (rep.declarationConfirmed) {
          authStatusEl.className = "font-medium text-blue-800";
          authStatusEl.textContent = "Authorized Declaration Confirmed (No File Attached)";
        } else {
          authStatusEl.className = "font-medium text-amber-700";
          authStatusEl.textContent = "Pending Authorization Letter Upload";
        }
      }

      // Verification Documentation Section
      document.getElementById('revCertType').textContent = ver.certType || "Not specified";
      document.getElementById('revCertNumber').textContent = ver.certNumber || "Not specified";
      document.getElementById('revCertAuthority').textContent = ver.issuingAuthority || "Not specified";

      const certDocStatusEl = document.getElementById('revCertDocStatus');
      if (certDocStatusEl) {
        if (ver.certFileName) {
          certDocStatusEl.className = "inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-blue-50 text-blue-800 border border-blue-200";
          certDocStatusEl.textContent = \`Uploaded: \${ver.certFileName} • Pending Manual Review\`;
        } else {
          certDocStatusEl.className = "inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-amber-50 text-amber-800 border border-amber-200";
          certDocStatusEl.textContent = "Document Pending Upload";
        }
      }

      // Identity Authentication Section
      const revOtpStatusEl = document.getElementById('revOtpStatus');
      if (revOtpStatusEl) {
        if (idn.verified) {
          revOtpStatusEl.className = "inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-100 text-emerald-800";
          revOtpStatusEl.textContent = "Completed (Identity Verified ✓)";
        } else {
          revOtpStatusEl.className = "inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-100 text-amber-800";
          revOtpStatusEl.textContent = "Pending Verification";
        }
      }
    }

    async function handleSubmitApplication() {
      hideAlert();

      const submitButton = document.querySelector(
        'button[onclick="handleSubmitApplication()"]'
      );

      if (submitButton) {
        submitButton.disabled = true;
        submitButton.dataset.originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<span>Submitting...</span>';
      }

      try {
        /*
         * IMPORTANT:
         * The LHO ID is generated by the backend/MongoDB.
         * Do NOT generate a random ID in the frontend.
         */
        const response = await fetch('/api/lho/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({
            organization: registrationState.organization,
            representative: registrationState.representative,
            verification: registrationState.verification,
            identity: registrationState.identity
          })
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(
            data.message || 'Unable to register LHO.'
          );
        }

        // Use the EXACT LHO ID generated and saved by the backend.
        const appId = data.lhoId;

        if (!appId) {
          throw new Error(
            'Registration succeeded, but the backend did not return an LHO ID.'
          );
        }

        document.getElementById('finalAppId').textContent = appId;

        const now = new Date();
        document.getElementById('submissionTime').textContent =
          now.toLocaleDateString() + ' ' + now.toLocaleTimeString();

        // Save the backend-generated ID for the Create Password page.
        localStorage.setItem('lhoId', appId);

        document.getElementById('stepSection5').classList.add('hidden');
        document.getElementById('successScreen').classList.remove('hidden');

        const progressLine = document.getElementById('progressLine');
        if (progressLine) progressLine.style.width = '100%';

        window.scrollTo({ top: 0, behavior: 'smooth' });

      } catch (error) {
        console.error('LHO registration error:', error);

        showAlert(
          error.message ||
          'Unable to submit LHO registration. Please try again.'
        );

      } finally {
        if (submitButton) {
          submitButton.disabled = false;

          if (submitButton.dataset.originalText) {
            submitButton.innerHTML = submitButton.dataset.originalText;
          }
        }
      }
    }

    function handleCreatePassword() {
      const lhoId =
        document.getElementById('finalAppId')?.textContent?.trim() ||
        localStorage.getItem('lhoId') ||
        '';

      if (!lhoId || lhoId === 'LHO-XXXXXX') {
        showAlert('LHO ID could not be found. Please submit the registration again.');
        return;
      }

      localStorage.setItem('lhoId', lhoId);

      window.parent.postMessage(
        {
          type: 'LHO_CREATE_PASSWORD',
          lhoId: lhoId
        },
        '*'
      );
    }

    function saveAndContinueLater() {
      showAlert("Draft saved in memory. You may continue editing this application.", "info");
    }

    function showAlert(message, type = "error") {
      const box = document.getElementById('formAlertBox');
      if (!box) return;
      box.textContent = message;
      box.classList.remove('hidden');

      if (type === "error") {
        box.className = "mb-6 p-3 rounded-md border text-xs bg-red-50 text-red-800 border-red-200";
      } else {
        box.className = "mb-6 p-3 rounded-md border text-xs bg-blue-50 text-blue-800 border-blue-200";
      }

      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function hideAlert() {
      const box = document.getElementById('formAlertBox');
      if (box) box.classList.add('hidden');
    }

    window.addEventListener('DOMContentLoaded', () => {
      setupFormListeners();
      goToStep(1);
    });
  </script>
</body>
</html>
`;

export default function LHORegistration() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data?.type === "LHO_CREATE_PASSWORD") {
        const lhoId = event.data?.lhoId || localStorage.getItem("lhoId");

        if (lhoId) {
          localStorage.setItem("lhoId", lhoId);
        }

        navigate("/lho-create-password", {
          state: {
            lhoId: lhoId || "",
          },
        });
      }

      if (event.data?.type === "LHO_RETURN_HOME") {
        navigate("/");
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [navigate]);

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        background: "#f8fafc",
      }}
    >
      <iframe
        title="EMMC Local Health Organization Registration"
        srcDoc={LHO_REGISTRATION_HTML}
        style={{
          display: "block",
          width: "100%",
          minHeight: "100vh",
          height: "100vh",
          border: "none",
        }}
      />
    </div>
  );
}
