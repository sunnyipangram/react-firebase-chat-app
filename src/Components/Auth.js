import { signInWithPopup } from 'firebase/auth';
import { auth, provider, db } from '../FirebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { getMessaging,getToken } from 'firebase/messaging';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const Auth = (props) => {
  const { setIsAuth } = props;

  const SignInWithGoogle = async () => {
    try {
      let result = await signInWithPopup(auth, provider);
      cookies.set('auth-token', result.user.refreshToken);
      setIsAuth(true);

     
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='auth'>
      <p>Sign In With Google To Continue</p>
      <button onClick={SignInWithGoogle}>Sign In With Google</button>
    </div>
  );
};

export default Auth;
