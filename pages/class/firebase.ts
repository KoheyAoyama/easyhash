import { initializeApp } from "firebase/app"
import { getAuth, signInWithPopup, TwitterAuthProvider, signOut, deleteUser } from "firebase/auth"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
}

export class Firebase {
  app: any
  provider: TwitterAuthProvider
  auth: any
  user: any
  token: any
  secret: any

  constructor() {
    this.app = initializeApp(firebaseConfig)
    this.provider = new TwitterAuthProvider()
    this.auth = getAuth()
    this.user
    this.token
    this.secret
  }

  public async signIn() {
    await signInWithPopup(this.auth, this.provider)
    .then((result) => {
      // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
      // You can use these server side with your app's credentials to access the Twitter API.
      const credential: any = TwitterAuthProvider.credentialFromResult(result)
      this.token = credential.accessToken
      this.secret = credential.secret
      // The signed-in user info.
      this.user = result.user
    }).catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      console.log(`Error!! Code: ${errorCode}, Message: ${errorMessage}`)
    })
    return [this.user, this.token, this.secret]
  }

  public signOut() {
    signOut(this.auth)
    .then(() => {
      return
    }).catch((error) => {
      console.log(`Error!! ${error}`)
    })
  }

  public deleteUser() {
    const currentUser = this.auth.currentUser
    deleteUser(currentUser)
    .then(() => {
      // User deleted.
      return
    }).catch((error) => {
      console.log(`Error!! ${error}`)
    })
  }
}