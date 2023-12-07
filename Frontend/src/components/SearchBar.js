import React from 'react';

const SearchBar = ({ handleSearch }) => {
    return (
        <div className="m-auto flex items-center w-[50%] ">
            <input
                type="text"
                placeholder="Search"
                onChange={(e) => handleSearch(e.target.value)}
                className="p-2 w-full "
            />
        </div>
    );
};

export default SearchBar;
