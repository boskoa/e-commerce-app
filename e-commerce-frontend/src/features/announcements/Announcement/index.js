import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectActiveAnnouncements } from "../announcementsSlice";
import styled from "styled-components";
import CloseButton from "./CloseButton";
import Message from "./Message";
import { ButtonContainer } from "./CloseButton";

const Container = styled.div`
  height: ${({ show, content }) => (show && content ? "30px" : "0px")};
  background-color: teal;
  position: relative;
  overflow: hidden;
  color: white;
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: bold;
  width: 100%;
  transition: height 0.3s;

  &:hover ${ButtonContainer} {
    display: flex;
  }
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  transform: translateX(${({ currentMessage }) => currentMessage * -100}vw);
  transition: all 1s;
`;

function Announcement() {
  const [show, setShow] = useState(true);
  const [currentMessage, setCurrentMessage] = useState(0);
  const announcements = useSelector(selectActiveAnnouncements);

  useEffect(() => {
    let index;
    if (show) {
      index = setTimeout(
        () =>
          setCurrentMessage((prev) =>
            prev < announcements.length - 1 ? prev + 1 : 0
          ),
        10000
      );
    }

    return () => clearTimeout(index);
  }, [currentMessage, announcements.length, show]);

  return (
    <Container show={show} content={announcements?.length}>
      <Wrapper currentMessage={currentMessage}>
        {announcements.map((a) => (
          <Message key={a.id} text={a?.content} />
        ))}
      </Wrapper>
      <CloseButton setShow={setShow} />
    </Container>
  );
}

export default Announcement;
