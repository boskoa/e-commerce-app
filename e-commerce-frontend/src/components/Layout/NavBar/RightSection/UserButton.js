import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../../features/login/loginSlice";
import styled from "styled-components";
import { resetOrderedProducts } from "../../../../features/orderedProducts/orderedProductsSlice";
import { resetOrders } from "../../../../features/orders/ordersSlice";

const MenuContainer = styled.div`
  position: absolute;
  top: 2px;
  right: 0;
  display: flex;
  justify-content: end;
  gap: 5px;
  align-items: center;
  width: 34px;
  height: 34px;
  border-radius: 17px;
  overflow: hidden;
  background-color: rgb(100, 100, 100);
  color: white;
  transition: all 0.3s;

  &:hover {
    width: 120px;
    border-radius: 0px 17px 17px 0px;
    z-index: 10;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s;

  &:active {
    transform: scale(0.98);
  }
`;

const Image = styled.img`
  object-fit: cover;
  border-radius: 17px;
`;

const UserMenuItem = styled.div`
  font-size: 12px;
  cursor: pointer;

  &:hover {
    color: #59eb68;
  }
`;

function UserButton({ currentUser }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    window.localStorage.removeItem("loggedECommerceAppUser");
    dispatch(logout());
    dispatch(resetOrderedProducts());
    dispatch(resetOrders());
    navigate("/");
  }

  return (
    <MenuContainer>
      <UserMenuItem onClick={() => navigate("/users-orders")}>
        orders
      </UserMenuItem>
      <UserMenuItem onClick={handleLogout}>logout</UserMenuItem>
      <ImageContainer onClick={() => navigate("/user-settings")}>
        <Image
          height={34}
          width={34}
          alt="user avatar"
          src={`/public/data/uploads/avatars/${currentUser?.id}.webp`}
          onError={(e) =>
            (e.currentTarget.src = "/data/defaults/user_avatar.webp")
          }
        />
      </ImageContainer>
    </MenuContainer>
  );
}

export default UserButton;
