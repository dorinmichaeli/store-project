import {
  getAuth,
  getRedirectResult,
  GoogleAuthProvider,
  signInWithRedirect,
  setPersistence,
  browserLocalPersistence,
} from 'firebase/auth';
import {initializeApp} from 'firebase/app';

export async function authenticateUserWithFirebase(firebaseConfig) {
  // We'll use this to authenticate a user via a Google account id.
  const provider = new GoogleAuthProvider();

  // Initialize a firebase app.
  const app = initializeApp(firebaseConfig);
  // Get the authentication service for the app.
  const auth = getAuth(app);

  // Set the persistence to local storage.
  await setPersistence(auth, browserLocalPersistence);

  // If the user is already authenticated, return the user.
  if (auth.currentUser) {
    return auth.currentUser;
  }

  // No token. We need to authenticate the user.
  const result = await getRedirectResult(auth);
  if (!result) {
    // No result. Redirect the user to the Google authentication page.
    await signInWithRedirect(auth, provider);
    // The above line of code will change the page's location.
  }

  // The user has returned from our redirect, and we have a result.
  return new Promise((resolve, reject) => {
    auth.onAuthStateChanged(user => {
      if (user) {
        resolve(user);
      } else {
        reject(new Error('Could not authenticate user.'));
      }
    });
  });
}
