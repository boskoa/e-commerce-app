import { useSelector } from "react-redux";
import { selectLoggedUser } from "../../login/loginSlice";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import UserData from "./UserData";
import Avatar from "./Avatar";

const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 60vh;
  padding: 20px;
  gap: 20px;
`;

const AllData = styled.div`
  display: flex;
  width: 80%;
  justify-content: space-around;
  gap: 10px;

  @media only screen and (max-width: 520px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Title = styled.h3``;

function UserSettings() {
  const loggedUser = useSelector(selectLoggedUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedUser) {
      navigate("/login");
    }
  }, [loggedUser, navigate]);

  return (
    <UserContainer>
      <Title>Update profile</Title>
      <AllData>
        <UserData user={loggedUser} />
        <Avatar
          loggedUser={loggedUser}
          style={{ width: "50%", border: "1px solid white" }}
        >
          avatar
        </Avatar>
      </AllData>
    </UserContainer>
  );
}

export default UserSettings;
