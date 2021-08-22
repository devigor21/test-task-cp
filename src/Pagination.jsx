import React from 'react'

export default function Pagination({ page, count, total, paginate, prevPage, nextPage }) {
  const pagesCount = Math.ceil(total / count);

  const pageNumber = [];
  for (let i = 1; i <= pagesCount; i++) {
    pageNumber.push(i);
  }

  return (
    <ul className="pagination">
      <li className={page === 1 ? "disabled" : "waves-effect"}>
        <a href="#!" onClick={page === 1 ? (() => { }) : prevPage}>
          <i className="material-icons">chevron_left</i>
        </a>
      </li>
      {pageNumber.map(num => <li key={num} className={`waves-effect ${page === num && "active"}`}>
        <a href="#!" onClick={() => paginate(num)}>{num}</a>
      </li>)}
      <li className={page === pagesCount ? "disabled" : "waves-effect"}>
        <a href="#!" onClick={page === pagesCount ? (() => { }) : nextPage}>
          <i className="material-icons">chevron_right</i>
        </a>
      </li>
    </ul>
  );
}
