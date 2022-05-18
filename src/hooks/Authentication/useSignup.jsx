import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

//firebase imports
import { doc, setDoc } from "firebase/firestore";
import { db, auth } from '../../firebase/config'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'

export const useSignup = () => {
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext()
  
  const signup = async (email, password, displayName) => {
    setError(null)
    setIsPending(true)

    try {
      //signup user
      const res = await createUserWithEmailAndPassword(auth, email, password)

      if (!res) {
        throw new Error('Could not complete signup')
      }

      // add display name to the user
      await updateProfile(res.user, {displayName})

      // create document for each user for favorites
      await setDoc(doc(db, 'users', res.user.uid), {
        displayName
      })

      //dispatch LOGIN action, we gebruiken hier ook de login action omdat Firebase automatisch inlogged bij signup
      dispatch({ type: 'LOGIN', payload: res.user})
      
      setIsPending(false)
      setError(null)
    }

    catch (err) {
      console.log(err.message)
      setError(err.message)
      setIsPending(false)
    }
  }

  return { error, isPending, signup }
}