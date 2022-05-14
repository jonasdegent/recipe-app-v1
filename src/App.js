import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home'
import RecipeDetail from './pages/RecipeDetail';
import Signup from './components/Authentication/Signup'
import Login from './components/Authentication/Login'
import AddRecipe from './pages/AddRecipe'

// Custom hooks
import { useAuthContext } from "../src/hooks/Authentication/useAuthContext";

function App() {
  const { authIsReady, user } = useAuthContext()
  
  return (
    <>
      {authIsReady && (
        <BrowserRouter>
          <Routes>
              <Route path="/" element={!user ? <Navigate to="/signup" /> : <Home />}/>
              <Route path="/recipe/:id" element={!user ? <Navigate to="/signup" /> : <RecipeDetail />} />
              <Route path="/signup" element={user ? <Navigate to="/" /> : <Signup />}/>
              <Route path="/login" element={user ? <Navigate to="/" /> : <Login />}/>
              <Route path="/recepttoevoegen" element={!user ? <Navigate to="/login" /> : <AddRecipe />} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;