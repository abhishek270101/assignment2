import React from 'react';

const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
    return (
        <div>
            <button onClick={() => handlePageChange(1)} disabled={currentPage === 1}>
                First
            </button>
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                Previous
            </button>
            <span>{`Page ${currentPage} of ${totalPages}`}</span>
            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                Next
            </button>
            <button onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages}>
                Last
            </button>
        </div>
    );
};

export default Pagination;
