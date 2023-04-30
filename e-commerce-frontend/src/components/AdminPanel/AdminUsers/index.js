import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { ButtonsContainer, Container } from "../AdminProducts";
import { Button } from "../styledElements";

function AdminUsers() {
  const navigate = useNavigate();
  const locationArray = useLocation().pathname.split("/");
  const location = isNaN(locationArray[locationArray.length - 1])
    ? locationArray[locationArray.length - 1]
    : locationArray[locationArray.length - 2];

  return (
    <Container>
      <ButtonsContainer>
        <Button active={location === "all"} onClick={() => navigate("all")}>
          Browse users
        </Button>
        <Button
          active={location === "single"}
          onClick={() => navigate("single")}
        >
          Change user profile
        </Button>
        <Button
          active={location === "statistics"}
          onClick={() => navigate("statistics")}
        >
          Users statistics
        </Button>
        <Button
          active={location === "single-stats"}
          onClick={() => navigate("single-stats")}
        >
          Single user stats
        </Button>
      </ButtonsContainer>
      <Outlet />
    </Container>
  );
}

export default AdminUsers;
