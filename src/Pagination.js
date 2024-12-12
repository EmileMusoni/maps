const Pagination = ({ currentPage, itemsPerPage, totalItems, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
  
    const handlePageClick = (pageNumber) => {
      if (pageNumber >= 1 && pageNumber <= totalPages) {
        onPageChange(pageNumber);
      }
    };
  
    const renderPageNumbers = () => {
      const pageNumbers = [];
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <li
            key={i}
            className={`page-item ${currentPage === i ? 'active' : ''}`}
            onClick={() => handlePageClick(i)}
          >
            <a className="page-link">{i}</a>
          </li>
        );
      }
      return pageNumbers;
    };
  
    return (
      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`} onClick={() => handlePageClick(currentPage - 1)}>
            <a className="page-link" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          {renderPageNumbers()}
          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`} onClick={() => handlePageClick(currentPage + 1)}>
            <a className="page-link" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    );
  };
  
  export default Pagination;
  