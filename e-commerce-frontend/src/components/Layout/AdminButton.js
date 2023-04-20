import styled from "styled-components";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { Link } from "react-router-dom";

const IconContainer = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 10px;
  left: 10px;
  border-radius: 50%;
  padding: 5px;
  background-color: red;
  z-index: 1000;
  box-shadow: 0 0 5px 0 black;
  transition: all 0.2s;

  &:active {
    transform: scale(0.97);
    box-shadow: none;
  }
`;

function AdminButton({ admin }) {
  return (
    <Link to={`/${admin.id}/admin-panel`} onClick={() => window.scroll(0, 0)}>
      <IconContainer>
        <AdminPanelSettingsIcon style={{ fontSize: "30px", color: "white" }} />
      </IconContainer>
    </Link>
  );
}

export default AdminButton;
