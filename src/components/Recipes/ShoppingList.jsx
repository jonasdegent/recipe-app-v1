import { useLocation, useNavigate } from "react-router-dom";
// Material UI
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";

const ShoppingList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const shoppingList = location.state?.shoppingList;

  if (!shoppingList) {
    <>
      <p>there is no shopping list</p>
      <IconButton color="primary" onClick={() => navigate(-1)}>
        <ArrowBackIcon />
      </IconButton>
    </>;
  }

  return (
    <div className="shoppinglist">
      <p>Print je lijstje!</p>
      {shoppingList.map((item, i) => (
        <ul>
          <li key={i}>{item}</li>
        </ul>
      ))}
      <IconButton color="primary" onClick={() => navigate(-1)}>
        <ArrowBackIcon />
      </IconButton>
    </div>
  );
};

export default ShoppingList;
