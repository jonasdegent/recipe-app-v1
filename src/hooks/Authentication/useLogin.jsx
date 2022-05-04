import { useState, useEffect } from "react";

//firebase imports
import { auth } from '../../firebase/config'
import { signInWithEmailAndPassword } from 'firebase/auth'

// custom hooks
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [ isCancelled, setIsCancelled ] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext()
  
  const login = async (email, password) => {
    setError(null)
    setIsPending(true)

    // log the user in
    try {
      const res = await signInWithEmailAndPassword(auth, email, password)
      dispatch({ type: 'LOGIN', payload: res.user})

      setIsPending(false)
      if (!isCancelled) {
        setIsPending(false)
        setError(null)
      }
    }
    
    catch(err) {
      setError(err.message)
      setIsPending(false)
      if (!isCancelled) {
        console.log(err.message)
        setError(err.message)
        setIsPending(false)
      }
    }
  }

  // Clean-up functie, zie uitleg bij useLogout en useSignup
  useEffect(() => {
    return () => setIsCancelled(true)
  },[])

  return { error, isPending, login }
}