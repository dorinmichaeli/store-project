import {initializeApp} from 'firebase-admin/app';
import {getAuth} from 'firebase-admin/auth';

// The [userAuth] service provides functionality
// for authenticating incoming HTTP requests.
export function createUserAuthService(config) {
  const firebaseApp = initializeApp(config.firebase);
  const auth = getAuth(firebaseApp);
  return {
    firebaseAuth: auth,
  };
}

