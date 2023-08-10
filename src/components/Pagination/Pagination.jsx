import React from 'react';
import second from './Pagination.module.scss';
import ReactPaginate from 'react-paginate';

const Pagination = ({ currentPage, onChangePage }) => {
  return (
    <ReactPaginate
      className={second.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(e) => onChangePage(e.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={3}
      forcePage={currentPage - 1}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
