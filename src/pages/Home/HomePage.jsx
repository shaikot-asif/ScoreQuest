import React from "react";
import MainLayout from "../../components/MainLayout";
import styled from "styled-components";
const HomePage = () => {
  return (
    <MainLayout>
      <Container>
        <h1>Home page will be here</h1>
      </Container>
    </MainLayout>
  );
};

export default HomePage;

const Container = styled.div`
  margin-top: 6rem;
`;
