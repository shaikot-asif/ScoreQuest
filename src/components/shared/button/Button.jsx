import React from "react";
import styled from "styled-components";

const Button = ({ btnName, type = "button" }) => {
  return (
    <Container>
      <button type={type}>{btnName}</button>
    </Container>
  );
};

export default Button;

const Container = styled.div`
  width: 360px;
  button {
    width: 100%;
    height: 56px;
    color: white;
    font-weight: 600;
    font-size: 18px;
    background: #041434;
    border-radius: 6px;
    border: 1px solid #041434;
    cursor: pointer;
  }
`;
