import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth, db } from '../FirebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { getMessaging, getToken } from 'firebase/messaging';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const Auth = (props) => {
  const { setIsAuth } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const auth = getAuth();

  // Sign In With Google
  const SignInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      cookies.set('auth-token', result.user.refreshToken);
      setIsAuth(true);

      // Fetch the FCM token and store it in Firestore
      const messaging = getMessaging();
      const token = await getToken(messaging);

      if (token) {
        const userDocRef = doc(db, 'users', result.user.uid);
        await setDoc(userDocRef, { fcmToken: token }, { merge: true });
      }

      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };

  // Sign In or Sign Up With Email/Password
  const SignInWithEmailPassword = async () => {
    try {
      if (isSignUp) {
        // Sign Up
        const result = await createUserWithEmailAndPassword(auth, email, password);
        // Perform additional actions if needed
        setIsAuth(true);
        console.log('Signed up:', result.user.email);
      } else {
        // Sign In
        const result = await signInWithEmailAndPassword(auth, email, password);
        cookies.set('auth-token', result.user.refreshToken);
        setIsAuth(true);

        // Fetch the FCM token and store it in Firestore (if needed)
        // ...

        console.log('Signed in:', result.user.email);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='auth'>
    <p className='auth-header'>{isSignUp ? 'Sign Up' : 'Sign In'} With Email:</p>
    <input
      type='email'
      className='auth-input'
      placeholder='Email'
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
    <input
      type='password'
      className='auth-input'
      placeholder='Password'
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />
    <button className='auth-button' onClick={SignInWithEmailPassword}>
      {isSignUp ? 'Sign Up' : 'Log In'}
    </button>

    <p className='auth-divider'>Or Sign In With Google:</p>
    <button className='auth-button auth-google' onClick={SignInWithGoogle}>
      Sign In With Google
    </button>

    <p className='auth-switch' onClick={() => setIsSignUp(!isSignUp)}>
      {isSignUp ? 'Already have an account? Log In' : "Don't have an account? Sign Up"}
    </p>
  </div>
  
  );
};

export default Auth;
