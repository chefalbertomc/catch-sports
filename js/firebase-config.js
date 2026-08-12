// ============================================
// CATCH SPORTS — Firebase Config
// Proyecto: steelers-nation-queretaro
// ============================================
const firebaseConfig = {
  apiKey: "AIzaSyDZAD_rAdj8OvuoswoU3Tqdj8sGgNaaOwg",
  authDomain: "steelers-nation-queretaro.firebaseapp.com",
  projectId: "steelers-nation-queretaro",
  storageBucket: "steelers-nation-queretaro.firebasestorage.app",
  messagingSenderId: "120474707665",
  appId: "1:120474707665:web:e8ef34f21110732293c7f0"
};

firebase.initializeApp(firebaseConfig);

window.db      = firebase.firestore ? firebase.firestore() : null;
window.auth    = firebase.auth ? firebase.auth() : null;
window.storage = firebase.storage ? firebase.storage() : null;
