import { useState, useEffect } from 'react'
import { db } from '../firebase/config'

//firebase imports
//onSnapshot is using realtime data, so every time something changes in the database this gets updated
import { collection, onSnapshot } from 'firebase/firestore'

//using c instead of 'recipes' for using this hook more re-usuable
export const useCollection = (c) => {
  const  [documents, setDocuments] = useState(null)

  useEffect(() => {
    let ref = collection(db, c)
    //when we setup a realtime listener we get a onsubscribe function, we need to do that when a component unmounts
    const unsub = onSnapshot(ref, (snapshot) => {
      let results = []
      snapshot.docs.forEach(doc => {
        results.push({...doc.data(), id: doc.id})
      })
      setDocuments(results)
    })
    //we need a cleanup function to unsubcribe from the realtime data when a component unmounts

    return () => unsub()
  }, [c])

  return { documents }
}