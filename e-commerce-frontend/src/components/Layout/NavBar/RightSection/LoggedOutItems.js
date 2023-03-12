import { Link } from "react-router-dom";
import { MenuItem } from "./index";

function LoggedOutItems() {
  return (
    <>
      <MenuItem>
        <Link
          to="register"
          style={{ color: "inherit", textDecoration: "none" }}
        >
          Register
        </Link>
      </MenuItem>
      <MenuItem>
        <Link style={{ color: "inherit", textDecoration: "none" }} to="login">
          Log in
        </Link>
      </MenuItem>
    </>
  );
}

export default LoggedOutItems;
