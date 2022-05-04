import { createContext, useReducer } from 'react'

export const AuthContext = createContext()

// deze functie is verantwoordlijk voor het updaten van onze state
export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload }
    case 'LOGOUT':
      return { ...state, user: null }
    default:
      return state
  }
}

export const AuthContextProvider = ({ children }) => {
  // we gebruiken de useReducer hook om de functie authReducer toe te laten de state up te daten, de initial state is een user null. Wanneer we de state willen updaten ahv die functie, gebruiken we een dispatch actie
  const [ state, dispatch ] = useReducer(authReducer, {
    user: null
  })
  console.log('AuthContext state:', state)


  return (
    // hier wil ik de state returnen in deze provider als een value, state wordt gespread, de dispatch functie: je doet dit op deze manier om de dispatch methode direct in de custom hooks te kunnen gebruiken om de context value up te daten
    <AuthContext.Provider value={{...state, dispatch}}>
      {children}
    </AuthContext.Provider>
  )
}