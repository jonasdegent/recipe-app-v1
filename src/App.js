import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import RecipeDetail from "./pages/RecipeDetail";
import Signup from "./components/Authentication/Signup";
import Login from "./components/Authentication/Login";
import AddRecipe from "./pages/AddRecipe";
import RecipeCategories from "./components/Recipes/RecipeCategories";
import EditRecipe from "./components/Recipes/EditRecipe";
import ShoppingList from "./components/Recipes/ShoppingList";

// Custom hooks
import { useAuthContext } from "../src/hooks/Authentication/useAuthContext";

function App() {
  const { authIsReady, user } = useAuthContext();

  return (
    <>
      {authIsReady && (
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={!user ? <Navigate to="/signup" /> : <Home />}
            />
            <Route
              path="/recipe/:id"
              element={!user ? <Navigate to="/signup" /> : <RecipeDetail />}
            />
            <Route
              path="/signup"
              element={user ? <Navigate to="/" /> : <Signup />}
            />
            <Route
              path="/login"
              element={user ? <Navigate to="/" /> : <Login />}
            />
            <Route
              path="/recepttoevoegen"
              element={!user ? <Navigate to="/login" /> : <AddRecipe />}
            />
            <Route
              path="/receptbewerken/:id"
              element={!user ? <Navigate to="/login" /> : <EditRecipe />}
            />
            <Route
              path="/categories/:category"
              element={!user ? <Navigate to="/login" /> : <RecipeCategories />}
            />
            <Route
              path="/shoppinglist"
              element={!user ? <Navigate to="/login" /> : <ShoppingList />}
            />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
