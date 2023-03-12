import { MenuItem } from "./index";
import { ShoppingCartOutlined } from "@mui/icons-material";
import { Badge } from "@mui/material";
import { useDispatch } from "react-redux";
import { logout } from "../../../../features/login/loginSlice";
import { useNavigate } from "react-router-dom";

function LoggedInItems() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    window.localStorage.removeItem("loggedECommerceAppser");
    dispatch(logout());
    navigate("/");
  }

  return (
    <>
      <MenuItem>
        <Badge badgeContent={4} color="primary">
          <ShoppingCartOutlined
            style={{ color: "grey", fontSize: "18px" }}
            color="action"
          />
        </Badge>
      </MenuItem>
      <MenuItem onClick={handleLogout}>Log out</MenuItem>
    </>
  );
}

export default LoggedInItems;
