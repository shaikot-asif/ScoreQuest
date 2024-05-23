import React from "react";
import styled from "styled-components";

const Search = () => {
  return (
    <Container>
      <div className="searchArea">
        <div className="input">
          <input type="text" placeholder="Search match by club name" />
          <div className="btn">
            <button type="button">search</button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Search;

const Container = styled.div`
  .searchArea {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 9rem;
  }
  .input {
    display: flex;
    position: relative;
  }
  .searchArea input {
    width: 530px;
    height: 60px;
    border-radius: 30px;
    outline: none;
    background: inherit;
    border: 1px solid #041434;
    font-size: 18px;
    padding: 0 20px;
    color: white;
    position: relative;
  }
  .searchArea input::placeholder {
    font-weight: 200;
  }

  .searchArea button {
    height: 60px;
    width: 130px;
    border-radius: 30px;
    outline: none;
    background: transparent;
    border: 1px solid #041434;

    font-size: 18px;
    padding: 0 20px;
    color: #041434;
    text-transform: capitalize;
    position: absolute;
    right: 0;
    cursor: pointer;
  }
`;
