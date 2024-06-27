import React from "react";
import { usePagination, DOTS } from "../hook/usePagination.js";
import styled from "styled-components";

const Pagination = ({
  onPageChange,
  currentPage,
  siblingCount = 1,
  totalPageCount,
  limit,
}) => {
  const paginationRange = usePagination({
    currentPage,
    siblingCount,
    totalPageCount,
  });

  if (currentPage === 0 || paginationRange.length < 1) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };
  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = totalPageCount / limit;

  return (
    <Container>
      <div className="container">
        <button
          disabled={currentPage === 1}
          type="button"
          className="btn"
          onClick={onPrevious}
        >
          <svg
            width="9"
            fill="currentColor"
            height="8"
            className=""
            viewBox="0 0 1792 1792"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z"></path>
          </svg>
        </button>
        {paginationRange.map((pageNumber) => {
          if (pageNumber === DOTS) {
            return <button className="btn2">&#8230;</button>;
          }

          return (
            <button
              key={pageNumber}
              type="button"
              className={`btnA1 ${
                pageNumber === currentPage ? "btnA2" : "btnA3"
              }`}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          );
        })}

        <button
          disabled={currentPage > lastPage}
          type="button"
          className="last"
          onClick={onNext}
        >
          <svg
            width="9"
            fill="currentColor"
            height="8"
            className=""
            viewBox="0 0 1792 1792"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z"></path>
          </svg>
        </button>
      </div>
    </Container>
  );
};

export default Pagination;

const Container = styled.div`
  display: flex;
  padding-top: 1.25rem;
  padding-bottom: 1.25rem;
  padding-left: 1.25rem;
  padding-right: 1.25rem;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;

  .container {
    display: flex;
    align-items: center;
  }
  .btn {
    padding: 1rem;
    border-top-left-radius: 0.75rem;
    border-bottom-left-radius: 0.75rem;
    border-width: 1px;
    width: 100%;
    font-size: 1rem;
    line-height: 1.5rem;
    color: #4b5563;
    background-color: #ffffff;
  }

  .btn:hover {
    background-color: #f3f4f6;
  }

  .btn2 {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    padding-left: 1rem;
    padding-right: 1rem;
    border-width: 1px;
    width: 100%;
    font-size: 1rem;
    line-height: 1.5rem;
    background-color: #ffffff;
    cursor: default;
  }

  .btnA1 {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    padding-left: 1rem;
    padding-right: 1rem;
    border-width: 1px;
    width: 100%;
    font-size: 1rem;
    line-height: 1.5rem;
  }

  .btnA2 {
    color: #ffffff;
    background-color: #3b82f6;
  }

  .btnA3 {
    color: #4b5563;
    background-color: #ffffff;
  }
  .btnA3:hover {
    background-color: #f3f4f6;
  }

  .last {
    padding: 1rem;
    border-top-right-radius: 0.75rem;
    border-bottom-right-radius: 0.75rem;
    border-top-width: 1px;
    border-right-width: 1px;
    border-bottom-width: 1px;
    width: 100%;
    font-size: 1rem;
    line-height: 1.5rem;
    color: #4b5563;
    background-color: #ffffff;
  }

  .last:hover {
    background-color: #f3f4f6;
  }
`;
