import { useEffect, useState }  from 'react'

//Firebase imports
import { auth } from '../../firebase/config'
import { signOut } from 'firebase/auth'

//Custom hooks
import { useAuthContext } from './useAuthContext'

export const useLogout = () => {
  const [ isCancelled, setIsCancelled ] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext()
  
  const logout = async () => {
    setError(null)
    setIsPending(true)

    // sign the user out
    try {
      await signOut(auth)

      //dispatch logout action, we moeten hier geen payload invoeren, we hebben geen user meer nodig -> null
      dispatch({ type: 'LOGOUT'})

      // update state
      if (!isCancelled) {
        setIsPending(false)
        setError(null)
      }
    }
    
    catch(err) {
      setError(err.message)
      if (!isCancelled) {
        console.log(err.message)
        setError(err.message)
        setIsPending(false)
      }
    }
  }
  
  // cleanup functie, stel dat we deze useLogout functie gebruiken en middenin wordt deze component ge-unmount, dan wordt deze cleanUp functie gecalled. Dit om errors te voorkomen. Voorbeeld: op inloggen klikken en dan meteen naar signup gaan -> inloggen is nog bezig terwijl dit ge-unmount wordt
  useEffect(() => {
    return () => setIsCancelled(true)
  },[])

  return { error, isPending, logout }   
}
