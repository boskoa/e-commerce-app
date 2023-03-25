import { MenuItem } from "./index";
import { ShoppingCartOutlined } from "@mui/icons-material";
import { Badge } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  logout,
  selectLoggedUser,
} from "../../../../features/login/loginSlice";
import { Link, useNavigate } from "react-router-dom";
import {
  getUsersOrderedProducts,
  selectOrderedProductIds,
} from "../../../../features/orderedProducts/orderedProductsSlice";
import { useEffect } from "react";

function LoggedInItems({ id }) {
  const cartItems = useSelector(selectOrderedProductIds).length;
  const currentUser = useSelector(selectLoggedUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    window.localStorage.removeItem("loggedECommerceAppUser");
    dispatch(logout());
    navigate("/");
  }

  useEffect(() => {
    dispatch(
      getUsersOrderedProducts({ id: currentUser.id, token: currentUser.token })
    );
  }, [currentUser, dispatch]);

  return (
    <>
      <MenuItem>
        <Link to={`/cart/${id}`}>
          <Badge max={99} badgeContent={<p>{cartItems}</p>} color="info">
            <ShoppingCartOutlined
              style={{ color: "grey", fontSize: "18px" }}
              color="action"
            />
          </Badge>
        </Link>
      </MenuItem>
      <MenuItem onClick={handleLogout}>Log out</MenuItem>
    </>
  );
}

export default LoggedInItems;
