import { useState, useEffect } from 'react'
import { useAuthContext } from './useAuthContext'

//firebase imports
import { auth } from '../../firebase/config'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'

export const useSignup = () => {
  const [ isCancelled, setIsCancelled ] = useState(false)
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

      //dispatch LOGIN action, we gebruiken hier ook de login action omdat Firebase automatisch inlogged bij signup
      dispatch({ type: 'LOGIN', payload: res.user})

      //Part of the cleanup useEffect function, zie uitleg onderaan useLogout
      if (!isCancelled) {
        setIsPending(false)
        setError(null)
      }
    }

    catch (err) {
      if (!isCancelled) {
        console.log(err.message)
        setError(err.message)
        setIsPending(false)
      }
    }
  }
  
  useEffect(() => {
    return () => setIsCancelled(true)
  },[])

  return { error, isPending, signup }
}