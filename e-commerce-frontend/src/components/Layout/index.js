import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Announcement from "../../features/announcements/Announcement";
import Footer from "./Footer";
import NavBar from "./NavBar";
import Newsletter from "./Newsletter";
import { useSelector } from "react-redux";
import { selectLoggedUser } from "../../features/login/loginSlice";
import AdminButton from "./AdminButton";

const Container = styled.div`
  min-height: 100vh;
  min-width: 320px;
  background-image: ${({ theme }) =>
    `linear-gradient(to bottom right, ${theme.base[0]} 20%, ${theme.base[1]} 50%)`};
  color: ${({ theme }) => theme.color};
  transition: all 0.3s;
`;

function Layout({ handleTheme }) {
  const admin = useSelector(selectLoggedUser);

  return (
    <Container>
      <NavBar handleTheme={handleTheme} />
      <Announcement />
      <Outlet />
      <Newsletter />
      <Footer />
      {admin?.admin && <AdminButton admin={admin} />}
    </Container>
  );
}

export default Layout;
