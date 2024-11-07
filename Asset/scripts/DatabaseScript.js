import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import {
    getFirestore, collection, getDoc,
    addDoc, deleteDoc, doc, onSnapshot,
    query, where,
    orderBy, serverTimestamp
} from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js';
import {
    getAuth, createUserWithEmailAndPassword,
    signInWithEmailAndPassword, signOut, onAuthStateChanged
} from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js';

const firebaseConfig = {
    apiKey: "AIzaSyAlHJSqNHyPtkrEpGcALIYKvBXIuCMYS9E",
    authDomain: "replit40.firebaseapp.com",
    databaseURL: "https://replit40-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "replit40",
    storageBucket: "replit40.appspot.com",
    messagingSenderId: "425549666219",
    appId: "1:425549666219:web:5c651d20453169db6be4ee",
    measurementId: "G-5PT5M9VYW1"
};

// Initialize Firebase
initializeApp(firebaseConfig);

// init Services
const db = getFirestore();
const auth = getAuth();

// collection from FS by collection
const colRef = collection(db, "Micro-doppler");

// queries by quary and where and orderBy 
const q = query(colRef, orderBy('createdAt', 'asc'));

// Get a single doc by getDoc
// const docRef = doc(db, 'Micro-doppler', 'oY789gvyRuiWbiQVI6Nl')
// onSnapshot(docRef, (doc) => {
//     console.log(doc.data());
// })
//****************/ OR ****************//
// getDoc(docRef).then((doc) => {
//     console.log(doc.data(), doc.id);
// })


// Auth SignUp...User....by Auth
const addSignUpForm = document.querySelector('.SignUp');
addSignUpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = addSignUpForm.email.value
    const password = addSignUpForm.password.value
    createUserWithEmailAndPassword(auth, email, password).then((cred) => {
        // console.log('user created : ', cred.user);
        addDoc(colRef, {
            Username: addSignUpForm.Username.value,
            email: addSignUpForm.email.value,
            password: addSignUpForm.password.value,
            createdAt: serverTimestamp(),
        }).then(() => {
            addSignUpForm.reset();
            window.location.href = 'SelectAnalys.html';
        })
    }).catch((err) => {
        const errorMessage = document.createElement('p');
        errorMessage.style.cssText = `color: red;
  font-weight: bold;
  font-size: 18px;
  margin-top: 10px;
  padding: 10px;
  border: 1px solid red;
  border-radius: 5px;
  background: rgba(255, 0, 0, 0.1);
  position: fixed;
  top : 10%;
`;
        switch (err.code) {
            case 'auth/weak-password':
                errorMessage.textContent = 'Password is too weak. Please use a stronger password.';
                break;
            case 'auth/wrong-password':
                errorMessage.textContent = 'Wrong password. Please try again.';
                break;
            case 'auth/invalid-login-credentials':
                errorMessage.textContent = 'Invalid login credentials. Please check your email and password.';
                break;
            case 'auth/email-already-in-use':
                errorMessage.textContent = 'Email is already in use. Please try a different email address.';
                break;
            default:
                errorMessage.textContent = err.message;
        }
        addSignUpForm.reset();
        document.body.appendChild(errorMessage);
        setTimeout(() => {
            errorMessage.remove();
        }, 6000); // remove the error message after 3 seconds
    })
})
// ON SignUp... add data to firebase data in cloud   by serverTimestamp

// addSignUpForm.addEventListener('submit', (e) => {
//     e.preventDefault();
//     addDoc(colRef, {
//         Username: addSignUpForm.Username.value,
//         email: addSignUpForm.email.value,
//         password: addSignUpForm.password.value,
//         createdAt: serverTimestamp(),
//     }).then(() => {
//         addSignUpForm.reset()
//     })
// })


// for  logining-in
const loginForm = document.querySelector('.Login');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const Username = loginForm.Username.value
    const password = loginForm.password.value
    signInWithEmailAndPassword(auth, Username, password).then((cred) => {
        console.log('user logged in : ', cred.user);
        window.location.href = 'SelectAnalys.html';
    }).catch((err) => {
        const errorMessage = document.createElement('p');
        errorMessage.style.cssText = `color: red;
  font-weight: bold;
  font-size: 18px;
  margin-top: 10px;
  padding: 10px;
  border: 1px solid red;
  border-radius: 5px;
  background: rgba(255, 0, 0, 0.1);
  position: fixed;
  top : 10%;
`;
        switch (err.code) {
            case 'auth/weak-password':
                errorMessage.textContent = 'Password is too weak. Please use a stronger password.';
                break;
            case 'auth/wrong-password':
                errorMessage.textContent = 'Wrong password. Please try again.';
                break;
            case 'auth/invalid-login-credentials':
                errorMessage.textContent = 'Invalid login credentials. Please check your email and password.';
                break;
            case 'auth/email-already-in-use':
                errorMessage.textContent = 'Email is already in use. Please try a different email address.';
                break;
            default:
                errorMessage.textContent = err.message;
        }
        addSignUpForm.reset();
        document.body.appendChild(errorMessage);
        setTimeout(() => {
            errorMessage.remove();
        }, 6000); // remove the error message after 3 seconds
    })
})


// for auto- logining-OUT when page is closed

window.addEventListener('beforeunload', () => {
    signOut(auth).then(() => {
        console.log('user logged out');
    }).catch((err) => {
        console.log(err.message);
    })
})

// Subscribing to auth changes
onAuthStateChanged(auth, (user) => {
    console.log('user status  changed : ', user);
})

// Real-Time ....get the collection data  by onsnapshort
onSnapshot(q, (snapshot) => {
    let ALLData = [];
    snapshot.docs.forEach(element => {
        ALLData.push({ ...element.data(), id: element.id });
    });
    console.log(ALLData);
})
// ********* OR ************//
// get the collection data
// getDocs(colRef).then((snapshot) => {
//     let ALLData = [];
//     snapshot.docs.forEach(element => {
//         ALLData.push({ ...element.data(), id: element.id });
//     });
//     console.log(ALLData);
// });


// before sine up end
// const handleSubmit = e => {
//     e.preventDefault();
//     try {
//         const url = new URL("SelectAnalys.html", window.location);
//         window.location.href = url.toString();
//     } catch (error) {
//         console.error(error);
//     }
// };
