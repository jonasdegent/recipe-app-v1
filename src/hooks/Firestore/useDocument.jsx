import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/config'

export function useDocument(col, docu) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getDocument = async () => {
      setLoading(true);

      try {
        const docRef = doc(db, col, docu);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setData(docSnap.data());
        } else {
          setData(undefined);
          setError(true)
          console.log('No document!');
        }
      } catch (e) {
        setError(e.message);
      }
      setLoading(false);
    };
    getDocument();
  }, [col, docu]);

  return { data, loading, error };
}