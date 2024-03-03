// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: process.env.FIREBASE,
	authDomain: "blog-app-f9945.firebaseapp.com",
	projectId: "blog-app-f9945",
	storageBucket: "blog-app-f9945.appspot.com",
	messagingSenderId: "136304944754",
	appId: "1:136304944754:web:6fea3f85c7be9f1f7284eb",
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
