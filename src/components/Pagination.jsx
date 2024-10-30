import React from "react";
import { usePagination, DOTS } from "../hook/usePagination.js";
import styled from "styled-components";

const Pagination = ({
  onPageChange,
  currentPage = 1,
  siblingCount = 1,
  totalPageCount,
  limit,
}) => {
  const paginationRange = usePagination({
    currentPage,
    siblingCount,
    totalPageCount,
  });

  if (currentPage === 0 || paginationRange?.length < 1) {
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
    <div className="flex p-5 flex-col items-center">
      <div className="flex items-center">
        <button
          disabled={currentPage === 1}
          type="button"
          className="p-4 rounded-tl-xl rounded-bl-xl border w-full text-[1rem] leading-6 text-[#4b5563] bg-[#ffffff]"
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
        {paginationRange?.map((pageNumber) => {
          if (pageNumber === DOTS) {
            return (
              <button
                key={pageNumber}
                className="pt-2 pb-2 pl-4 pr-4 border w-full text-[1rem] leading-6 bg-[#ffffff] cursor-default"
              >
                &#8230;
              </button>
            );
          }

          return (
            <button
              key={pageNumber}
              type="button"
              className={`pt-2 pb-2 pl-4 pr-4 border w-full text-[1rem] leading-6 ${
                pageNumber === currentPage
                  ? "text-[#ffffff] bg-[#3b82f6]"
                  : "text-[#4b5563] bg-[#ffffff]"
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
          className="p-4 rounded-tr-xl rounded-br-xl border-t border-r border-b w-full text-[1rem] leading-6 text-[#4b5563] bg-[#ffffff]"
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
    </div>
  );
};

export default Pagination;
