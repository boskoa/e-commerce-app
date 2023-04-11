import { MenuItem } from "./index";
import { ShoppingCartOutlined } from "@mui/icons-material";
import { Badge } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedUser } from "../../../../features/login/loginSlice";
import { Link } from "react-router-dom";
import {
  getUsersOrderedProducts,
  selectOrderedProductIds,
} from "../../../../features/orderedProducts/orderedProductsSlice";
import { useEffect } from "react";
import UserButton from "./UserButton";

function LoggedInItems({ id }) {
  const cartItems = useSelector(selectOrderedProductIds).length;
  const currentUser = useSelector(selectLoggedUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getUsersOrderedProducts({ id: currentUser.id, token: currentUser.token })
    );
  }, [currentUser, dispatch]);

  return (
    <>
      <MenuItem style={{ position: "absolute", right: "60px" }}>
        <Link to={`/cart/${id}`}>
          <Badge max={99} badgeContent={<p>{cartItems}</p>} color="info">
            <ShoppingCartOutlined
              style={{ color: "grey", fontSize: "18px" }}
              color="action"
            />
          </Badge>
        </Link>
      </MenuItem>
      <UserButton currentUser={currentUser} />
    </>
  );
}

export default LoggedInItems;
