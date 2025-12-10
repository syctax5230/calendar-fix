/* ============================================
   Firebase Realtime Database - Initialize Default Data
   ============================================
   Run this script in browser console after Firebase is initialized
   Or import and call initializeFirebaseData()
   ============================================ */

import { ref, set, get } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-database.js";

// Get Firebase Database
function getDatabase() {
  return window.firebaseDatabase;
}

// Default packages data
const DEFAULT_PACKAGES = {
  "full-basic": {
    id: "full-basic",
    name: "✂️ Full Package · Basic",
    type: "any",
    duration: 75,
    includes: [
      "Bath & Dry",
      "Brush / De-Shedding",
      "Hair Cut (Basic)",
      "Nail Trim",
      "Ear Clean",
      "Foot Pad Clean",
      "Cologne"
    ],
    tiers: [
      { label: "5kg & below", price: 530 },
      { label: "5.1 – 8kg", price: 630 },
      { label: "8.1 – 15kg", price: 750 },
      { label: "15.1 – 30kg", price: 800 },
      { label: "30kg & above", price: 920 }
    ]
  },
  "full-styled": {
    id: "full-styled",
    name: "✂️ Full Package · Trimming & Styling",
    type: "any",
    duration: 90,
    includes: [
      "Bath & Dry",
      "Brush / De-Shedding",
      "Hair Cut (Styled)",
      "Nail Trim",
      "Ear Clean",
      "Foot Pad Clean",
      "Cologne"
    ],
    tiers: [
      { label: "5kg & below", price: 630 },
      { label: "5.1 – 8kg", price: 730 },
      { label: "8.1 – 15kg", price: 880 },
      { label: "15.1 – 30kg", price: 930 },
      { label: "30kg & above", price: 1050 }
    ]
  },
  "bubble-bath": {
    id: "bubble-bath",
    name: "🧴 Shampoo Bath 'n Bubble",
    type: "any",
    duration: 60,
    includes: [
      "Bath & Dry",
      "Brush / De-Shedding",
      "Hygiene Trim",
      "Nail Trim",
      "Ear Clean",
      "Foot Pad Clean",
      "Cologne"
    ],
    tiers: [
      { label: "5kg & below", price: 350 },
      { label: "5.1 – 8kg", price: 450 },
      { label: "8.1 – 15kg", price: 550 },
      { label: "15.1 – 30kg", price: 600 },
      { label: "30kg & above", price: 700 }
    ]
  },
  "single-service": {
    id: "single-service",
    name: "🚿 Single Service · Mix & Match",
    type: "any",
    duration: 15,
    includes: [
      "Choose from Nail Trim, Ear Clean, or Hygiene Focus",
      "Add to any package as needed"
    ],
    tiers: [
      { label: "Nail Cutting (N/C)", price: 50 },
      { label: "Ear Cleaning (E/C)", price: 70 },
      { label: "Facial Cut & Clean 5kg & below", price: 120 },
      { label: "Facial Cut & Clean 30kg & above", price: 170 }
    ]
  },
  "addon-toothbrush": {
    id: "addon-toothbrush",
    name: "🛁 Add-on · Toothbrush",
    type: "addon",
    duration: 5,
    includes: ["Individual toothbrush to bring home"],
    tiers: [
      { label: "Per item", price: 25 }
    ]
  },
  "addon-dematting": {
    id: "addon-dematting",
    name: "🛁 Add-on · De-matting",
    type: "addon",
    duration: 25,
    includes: ["Targeted de-matting service"],
    tiers: [
      { label: "Light tangles", price: 80 },
      { label: "Heavy tangles", price: 250 }
    ]
  },
  "addon-normal-cut": {
    id: "addon-normal-cut",
    name: "Trim · Normal Cut",
    type: "addon",
    duration: 30,
    includes: ["Basic trim"],
    tiers: [
      { label: "Small", price: 180 },
      { label: "Large", price: 220 }
    ]
  },
  "addon-styling": {
    id: "addon-styling",
    name: "Trim · Trimming & Styling",
    type: "addon",
    duration: 45,
    includes: ["Detailed styling"],
    tiers: [
      { label: "Small", price: 280 },
      { label: "Large", price: 350 }
    ]
  },
  "addon-tick-flea": {
    id: "addon-tick-flea",
    name: "Treatment · Tick & Flea",
    type: "addon",
    duration: 15,
    includes: ["Price depends on vials used"],
    tiers: [
      { label: "Base", price: 0 }
    ]
  }
};

// Default groomers data
const DEFAULT_GROOMERS = {
  "groomer-sam": {
    id: "groomer-sam",
    name: "Sam",
    specialty: "Small breed specialist",
    maxDailyBookings: 3,
    reserve: false
  },
  "groomer-jom": {
    id: "groomer-jom",
    name: "Jom",
    specialty: "Double-coat care",
    maxDailyBookings: 3,
    reserve: false
  },
  "groomer-botchoy": {
    id: "groomer-botchoy",
    name: "Botchoy",
    specialty: "Creative trims & styling",
    maxDailyBookings: 3,
    reserve: false
  },
  "groomer-jinold": {
    id: "groomer-jinold",
    name: "Jinold",
    specialty: "Senior pet handler",
    maxDailyBookings: 3,
    reserve: false
  },
  "groomer-ejay": {
    id: "groomer-ejay",
    name: "Ejay",
    specialty: "Cat whisperer",
    maxDailyBookings: 3,
    reserve: false
  }
};

// Initialize Firebase with default data
async function initializeFirebaseData() {
  const db = getDatabase();

  if (!db) {
    console.error('Firebase Database not initialized!');
    alert('Firebase Database not initialized. Make sure Firebase is loaded.');
    return;
  }

  try {
    console.log('Starting Firebase data initialization...');

    // Check and update packages
    const packagesRef = ref(db, 'packages');
    const packagesSnapshot = await get(packagesRef);
    const existingPackages = packagesSnapshot.exists() ? packagesSnapshot.val() : {};

    console.log('Checking packages...');
    for (const [key, pkgData] of Object.entries(DEFAULT_PACKAGES)) {
      // FORCE FIX: Always update single-service to ensure it shows up
      if (!existingPackages[key] || key === 'single-service') {
        console.log(`Repairing/Adding package: ${key}`);
        await set(ref(db, `packages/${key}`), pkgData);
      }
    }
    console.log('✅ Packages check complete');

    // Check and update groomers
    const groomersRef = ref(db, 'groomers');
    const groomersSnapshot = await get(groomersRef);
    const existingGroomers = groomersSnapshot.exists() ? groomersSnapshot.val() : {};

    console.log('Checking groomers...');
    for (const [key, groomerData] of Object.entries(DEFAULT_GROOMERS)) {
      if (!existingGroomers[key]) {
        console.log(`Adding missing groomer: ${key}`);
        await set(ref(db, `groomers/${key}`), groomerData);
      }
    }
    console.log('✅ Groomers check complete');

    // Removed collection initialization loop to avoid Permission Denied on restricted roots (e.g. customerProfiles)
    console.log('✅ Collections check skipped (safe)');

    console.log('🎉 Firebase data initialization complete!');
    alert('Firebase data initialized successfully!');

  } catch (error) {
    console.error('Error initializing Firebase data:', error);
    alert('Error initializing data: ' + error.message);
  }
}

// Make function globally available
window.initializeFirebaseData = initializeFirebaseData;

// Export for module use
export { initializeFirebaseData, DEFAULT_PACKAGES, DEFAULT_GROOMERS };

