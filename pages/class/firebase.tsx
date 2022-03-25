import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"

const firebaseConfig = {
  apiKey: "AIzaSyB224mCJaSnX8DvsFq_ApvDHErAugYbcZc",
  authDomain: "easyhash-df75c.firebaseapp.com",
  projectId: "easyhash-df75c",
  storageBucket: "easyhash-df75c.appspot.com",
  messagingSenderId: "84780745407",
  appId: "1:84780745407:web:e6c3b7d962487f7860bc0a",
  measurementId: "G-TLZQC3NJRF"
}

const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)