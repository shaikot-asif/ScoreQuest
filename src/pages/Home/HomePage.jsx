import React from "react";
import MainLayout from "../../components/MainLayout";
import styled from "styled-components";
import Search from "../../components/Search";
const HomePage = () => {
  return (
    <MainLayout>
      <Container>
        <Search />
        <h1>Home page will be here</h1>
      </Container>
    </MainLayout>
  );
};

export default HomePage;

const Container = styled.div`
  margin-top: 6rem;
`;
