import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config'

export function useDocument(col, d) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getDocument = async () => {
      setLoading(true);

      try {
        const docRef = doc(db, col, d);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setData(docSnap.data());
        } else {
          setData(undefined);
          console.log('No document!');
        }
      } catch (e) {
        setError(e.message);
      }
      setLoading(false);
    };
    getDocument();
  }, [col, d]);

  return { data, loading, error };
}