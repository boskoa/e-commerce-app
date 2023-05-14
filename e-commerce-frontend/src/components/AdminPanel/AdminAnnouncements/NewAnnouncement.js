import { Input } from "../styledElements";
import { TopButton } from "../../../features/orderedProducts/Cart/ShoppingBag/TopComponent";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createAnnouncement } from "../../../features/announcements/announcementsSlice";
import { selectLoggedUser } from "../../../features/login/loginSlice";
import { Container } from "./Announcement";
import styled from "styled-components";

export const NewContainer = styled(Container)`
  box-shadow: 0px 0px 4px 0px rgba(255, 0, 0, 0.7);
`;

function NewAnnouncement() {
  const [content, setContent] = useState("");
  const [active, setActive] = useState(false);
  const admin = useSelector(selectLoggedUser);
  const dispatch = useDispatch();

  function handleCreate() {
    if (content) {
      dispatch(
        createAnnouncement({
          token: admin.token,
          newData: { content, active },
        })
      );
      setContent("");
      setActive(false);
    }
  }

  return (
    <NewContainer>
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
        <label htmlFor="active">Active</label>
      </div>
      <TopButton onClick={handleCreate}>create announcement</TopButton>
    </NewContainer>
  );
}

export default NewAnnouncement;
