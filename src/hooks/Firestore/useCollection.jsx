import { useState, useEffect, useRef } from 'react'

//firebase imports
import { db } from '../../firebase/config'
import { collection, onSnapshot, where, query } from 'firebase/firestore'

export const useCollection = (col, _q) => {
  const  [documents, setDocuments] = useState(null)
  const q = useRef(_q).current

  useEffect(() => {  
    let ref = collection(db, col)
  
    if (q) {
      ref = query(ref, where(...q))
    }

    const unsub = onSnapshot(ref, (snapshot) => {
      let results = []
      snapshot.docs.forEach(doc => {
        results.push({...doc.data(), id: doc.id})
      })
      setDocuments(results)
    })
    
    return () => unsub()
  
  }, [col, q])
  
  return { documents }
}

//onSnapshot is using realtime data, so every time something changes in the database this gets updated
//using c instead of 'recipes' for using this hook more re-usuable, we are using _q for the query argument

//we need to use useRef hook because otherwise the useEffect wil ifinite loop because we're using a reference type as a dependancy

//when we setup a realtime listener we get a onsubscribe function, we need to do that when a component unmounts

//we check if there's a query passed in or not, we spread the different arguments

//we need a cleanup function to unsubcribe from the realtime data when a component unmounts