import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'
import RecipeDetail from './pages/RecipeDetail';
import Signup from './components/Authentication/Signup'
import Login from './components/Authentication/Login'

// Custom hooks
import { useAuthContext } from "../src/hooks/Authentication/useAuthContext";

function App() {
  const { authIsReady } = useAuthContext()
  
  return (
    <>
      {authIsReady && (
        <BrowserRouter>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/recipe/:id" element={<RecipeDetail />} />
              <Route path="/signup" element={<Signup />}/>
              <Route path="/login" element={<Login />}/>
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
