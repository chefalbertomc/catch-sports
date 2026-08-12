// ============================================
// CATCH SPORTS — Firebase Config
// Proyecto: catch-sports-qro
// ============================================
const firebaseConfig = {
  apiKey: "AIzaSyBQydqYrIvvILGFgn30_C5WjPMjju_6dBA",
  authDomain: "catch-sports-qro.firebaseapp.com",
  projectId: "catch-sports-qro",
  storageBucket: "catch-sports-qro.firebasestorage.app",
  messagingSenderId: "621758448454",
  appId: "1:621758448454:web:ef6789882269e924195b47"
};

firebase.initializeApp(firebaseConfig);

window.db      = firebase.firestore ? firebase.firestore() : null;
window.auth    = firebase.auth ? firebase.auth() : null;
window.storage = firebase.storage ? firebase.storage() : null;
