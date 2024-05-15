import React from "react";
import "./Paginator.css";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

export default function Paginator({
  nextPage,
  prevPage,
  page,
  totalPages,
  setPage,
}) {
  return (
    <div className="paginador">
      <button onClick={prevPage}>
        <IoIosArrowBack />
      </button>
      <span>
        {page} de {totalPages}{" "}
      </span>
      <button onClick={nextPage}>
        <IoIosArrowForward />
      </button>
    </div>
  );
}
