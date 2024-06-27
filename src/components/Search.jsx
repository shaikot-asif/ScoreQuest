import React from "react";
import { useState } from "react";
import styled from "styled-components";

const Search = ({ placeholder = "", setSearchKeywords }) => {
  const [search, setSearch] = useState();
  const handleClick = (e) => {
    e.preventDefault();
    setSearchKeywords(search);
  };

  const handleChange = (e) => {
    const { value } = e.target;

    setSearch(value);
  };

  return (
    <Container>
      <div className="searchArea">
        <form onSubmit={handleClick} className="input">
          <input
            name="search"
            value={search}
            onChange={handleChange}
            type="text"
            placeholder={placeholder}
          />
          <div className="btn">
            <button type="submit">search</button>
          </div>
        </form>
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
    color: #041434 !important;
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
