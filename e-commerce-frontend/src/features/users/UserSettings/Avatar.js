import axios from "axios";
import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  flex: 3;
`;

export const Form = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 5px;
  width: 100%;
`;

export const PseudoButton = styled.div`
  background-color: ${({ theme }) => theme.secondary};
  font-size: 14px;
  padding: 5px;
  min-width: 50px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: black;
  }

  &:active {
    background-color: ${({ theme }) => theme.secondary};
  }
`;

export const Button = styled.div`
  background-color: ${({ theme }) => theme.primary};
  font-size: 14px;
  padding: 5px;
  min-width: 50px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: black;
  }

  &:active {
    background-color: ${({ theme }) => theme.primary};
  }
`;

const Image = styled.img`
  border-radius: 50%;
  height: 200px;
  width: 200px;
  display: block;
  margin: 20px auto;
  object-fit: cover;
`;

function Avatar({ loggedUser }) {
  const [name, setName] = useState("Choose avatar");
  const [file, setFile] = useState();

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("file", file);

    await axios.post(`/api/avatars/${loggedUser.id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `bearer ${loggedUser.token}`,
      },
    });

    window.location.reload();
  }

  return (
    <Container>
      <Form id="avatar-form" encType="multipart/form-data">
        <label htmlFor="avatar" style={{ maxWidth: "70%" }}>
          <input
            style={{
              display: "none",
            }}
            id="avatar"
            type="file"
            name="avatar"
            onChange={(e) => {
              setName(loggedUser.id);
              setFile(e.target.files[0]);
            }}
          />
          <PseudoButton>Choose avatar</PseudoButton>
        </label>
        <Button disabled={!file} onClick={(e) => handleSubmit(e)}>
          Set
        </Button>
      </Form>
      {file && (
        <Image alt="chosen avatar" src={file && URL.createObjectURL(file)} />
      )}
    </Container>
  );
}

export default Avatar;
