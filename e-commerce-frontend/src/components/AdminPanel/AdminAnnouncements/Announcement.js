import styled from "styled-components";
import { Input } from "../styledElements";
import { TopButton } from "../../../features/orderedProducts/Cart/ShoppingBag/TopComponent";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAnnouncement,
  updateAnnouncement,
} from "../../../features/announcements/announcementsSlice";
import { selectLoggedUser } from "../../../features/login/loginSlice";
import { ButtonsContainer } from "../AdminProducts";

export const Container = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  flex-wrap: wrap;
  gap: 10px;
  max-width: 320px;
  min-width: 260px;
  padding: 5px;
  overflow: hidden;
  color: ${({ theme }) => theme.color};
  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.7);
  transition: all 0.3s;
`;

export const AnnouncementsButtonsContainer = styled(ButtonsContainer)`
  justify-content: space-between;
`;

function Announcement({ a }) {
  const [content, setContent] = useState("");
  const [active, setActive] = useState(false);
  const admin = useSelector(selectLoggedUser);
  const dispatch = useDispatch();

  useEffect(() => {
    setContent(a.content);
    setActive(a.active);
  }, [a]);

  function handleUpdate() {
    dispatch(
      updateAnnouncement({
        token: admin.token,
        newData: { content, active },
        id: a.id,
      })
    );
  }

  function handleDelete() {
    dispatch(
      deleteAnnouncement({
        token: admin.token,
        id: a.id,
      })
    );
  }

  return (
    <Container>
      <Input value={content} onChange={(e) => setContent(e.target.value)} />
      <div>
        <input
          id="active"
          checked={active}
          onChange={(e) => {
            setActive(e.target.checked);
          }}
          type="checkbox"
          style={{ marginRight: 5 }}
        />
        <label
          title={`Created at ${a.createdAt.slice(0, 10)}`}
          htmlFor="active"
        >
          Active
        </label>
      </div>
      <AnnouncementsButtonsContainer>
        <TopButton type="checkout" onClick={handleDelete}>
          delete
        </TopButton>
        <TopButton onClick={handleUpdate}>update</TopButton>
      </AnnouncementsButtonsContainer>
    </Container>
  );
}

export default Announcement;
