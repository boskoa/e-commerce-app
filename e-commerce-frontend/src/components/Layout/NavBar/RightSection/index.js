import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectLoggedUser } from "../../../../features/login/loginSlice";
import LoggedInItems from "./LoggedInItems";
import LoggedOutItems from "./LoggedOutItems";

const Right = styled.div`
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  overflow: hidden;
  gap: 25px;
  transition: ${({ inputActive }) =>
    inputActive ? "all 0.4s" : "all 0.5s 0.2s"};

  @media (max-width: 360px) {
    max-width: ${({ inputActive }) => (inputActive ? "0px" : "200px")};
  }
`;

export const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
`;

function RightSection({ inputActive }) {
  const loggedUser = useSelector(selectLoggedUser);

  return (
    <Right inputActive={inputActive}>
      {loggedUser ? <LoggedInItems /> : <LoggedOutItems />}
    </Right>
  );
}

export default RightSection;
