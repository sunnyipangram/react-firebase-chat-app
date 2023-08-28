import React from 'react'
import { auth,provider } from '../FirebaseConfig'
import {signInWithPopup} from 'firebase/auth'
import Cookies from 'universal-cookie';
const cookies= new Cookies()
const Auth = (props) => {
    const {setIsAuth}=props





    const SignInWithGoogle=async(props)=>{


        try{
            let result= await signInWithPopup(auth,provider)
            cookies.set('auth-token',result.user.refreshToken)
            setIsAuth(true)
             console.log(result)
        }
        catch(err){
            console.log(err)
        }

    }
  return (
    <div className='auth'>
        <p>Sign In With Google To Continue</p>
        <button onClick={SignInWithGoogle}>Sign In WIth Google</button>
    </div>
  )
}

export default Auth