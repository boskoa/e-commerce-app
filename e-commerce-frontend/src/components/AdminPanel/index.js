import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectLoggedUser } from "../../features/login/loginSlice";
import SidePanel from "./SidePanel";
import { Outlet } from "react-router-dom";

const Container = styled.div`
  display: flex;
  min-height: 60vh;
  align-items: stretch;
`;

const Message = styled.p`
  text-align: center;
`;

function AdminPanel() {
  const user = useSelector(selectLoggedUser);

  return !user || !user.admin ? (
    <Message>"You are not authorized"</Message>
  ) : (
    <Container>
      <SidePanel user={user} />
      <Outlet />
    </Container>
  );
}

export default AdminPanel;
