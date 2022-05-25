import { useState } from "react";
import { Link } from "react-router-dom";

//Firebase Firestore database
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

//Material UI imports
//Card
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
//Icons
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";
//Menu
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const RecipeCard = ({ recipe }) => {
  //Basic menu Material UI code
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async (id) => {
    const docRef = doc(db, "recipes", id);
    await deleteDoc(docRef);
    handleClose();
  };

  return (
    <Card sx={{ maxWidth: 345 }} elevation={3} key={recipe.id}>
      <CardHeader
        avatar={<Avatar>{recipe.category.charAt(0)}</Avatar>}
        action={
          <>
            <IconButton
              id="recipe-card-button"
              aria-controls={open ? "recipe-card-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="recipe-card-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "recipe-card-button",
              }}
            >
              <MenuItem onClick={handleClose}>Bewerk</MenuItem>
              <MenuItem onClick={() => handleDelete(recipe.id)}>
                Verwijder
              </MenuItem>
            </Menu>
          </>
        }
        title={
          <Typography variant="h6" component="div">
            {recipe.title}
          </Typography>
        }
        subheader={
          <Typography variant="subtitle">{recipe.subtitle}</Typography>
        }
      />
      <Link to={`/recipe/${recipe.id}`}>
        <CardMedia
          component="img"
          height="240"
          image={recipe.imageUrl}
          alt={recipe.title}
        />
      </Link>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default RecipeCard;
