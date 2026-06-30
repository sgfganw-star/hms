// 1. بننادي على إعدادات قاعدة البيانات من الملف التاني
import { auth, db } from "./firebase-config.js";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { doc, getDoc, updateDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// متغيرات عامة عشان الموقع كله يشوفها
window.currentUser = null;
window.userData = null;
window.isAppReady = false;
window.isLoginInProgress = false;

// 2. كود تسجيل الدخول الخاص بالجامعة
document.getElementById('btn-primary-auth')?.addEventListener('click', async () => {
    const email = document.getElementById('auth-email').value.trim();
    const password = document.getElementById('auth-password').value;

    if(!email || !password) return window.showToast("الرجاء إدخال البريد الإلكتروني وكلمة المرور.", "error");

    try {
        window.isLoginInProgress = true; 
        const btn = document.getElementById('btn-primary-auth');
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> جاري التحقق...';
        
        await signInWithEmailAndPassword(auth, email, password);
        
        const newSessionId = 'sess_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('hms_session_id', newSessionId);
        await updateDoc(doc(db, "users", auth.currentUser.uid), { sessionId: newSessionId });
        
        setTimeout(() => { window.isLoginInProgress = false; }, 2000); 
    } catch(e) {
        window.isLoginInProgress = false;
        window.showToast("بيانات الدخول غير صحيحة، أو الحساب غير مسجل بالجامعة.", "error");
        document.getElementById('btn-primary-auth').innerHTML = `<span id="primary-auth-text">تسجيل الدخول الموحد</span> <i class="fa-solid fa-arrow-right-to-bracket"></i>`;
    }
});

// 3. كود تسجيل الخروج
document.getElementById('btn-logout')?.addEventListener('click', () => signOut(auth));
window.forceLogout = () => signOut(auth);

// 4. كود بيراقب الطالب دخل ولا خرج وبيفتحله الشاشات
onAuthStateChanged(auth, async (user) => {
    const initLoader = document.getElementById('init-loader');
    
    if (user) {
        window.currentUser = user;
        const uDoc = await getDoc(doc(db, "users", user.uid));
        
        if(uDoc.exists()) {
            window.userData = uDoc.data();
            
            if (window.unsubscribeSession) window.unsubscribeSession();
            window.unsubscribeSession = onSnapshot(doc(db, "users", user.uid), (docSnap) => {
                if (docSnap.exists()) window.userData = docSnap.data();
            });

            if (!window.isAppReady) {
                if(initLoader) { initLoader.classList.add('opacity-0'); setTimeout(() => initLoader.classList.add('hidden'), 500); }
                document.getElementById('main-layout').classList.remove('hidden');
                document.getElementById('login-view').classList.remove('active');
                
                // جلب الكورسات أول ما يدخل
                if(window.syncCourses) await window.syncCourses();
                
                let defaultView = window.userData.role === 'superadmin' ? 'super-dashboard' : 'student-dashboard';
                window.navTo(defaultView);
                window.isAppReady = true;
            }
        } else {
            signOut(auth);
        }
    } else {
        if(initLoader) { initLoader.classList.add('opacity-0'); setTimeout(() => initLoader.classList.add('hidden'), 500); }
        window.isAppReady = false; window.currentUser = null; window.userData = null;
        document.getElementById('main-layout').classList.add('hidden');
        document.getElementById('login-view').classList.remove('hidden');
        document.getElementById('login-view').classList.add('active');
    }
});