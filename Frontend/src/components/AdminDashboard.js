import React, { useState, useEffect } from 'react';
import AdminTable from './AdminTable';
import SearchBar from './SearchBar';
import Pagination from './Pagination';
import '../styles/Styles.css';

const AdminDashboard = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage] = useState(10);

    useEffect(() => {
        // Fetch data from the API
        fetch('http://localhost:8080/user-get')
            .then(response => response.json())
            .then(data => {
                setData(data);
                setFilteredData(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleSearch = query => {
        const filtered = data.filter(item =>
            Object.values(item).some(val =>
                val.toLowerCase().includes(query.toLowerCase())
            )
        );
        setFilteredData(filtered);
        setCurrentPage(1);
    };

    const handleDelete = () => {
        const updatedData = data.filter(item => !selectedRows.includes(item.id));
        setData(updatedData);
        setFilteredData(updatedData);
        setSelectedRows([]);
    };

    const handleSelectAll = () => {
        if (selectedRows.length === rowsPerPage * (currentPage - 1)) {
            setSelectedRows([]);
        } else {
            const pageRows = filteredData.slice(
                (currentPage - 1) * rowsPerPage,
                currentPage * rowsPerPage
            );
            const pageRowIds = pageRows.map(row => row.id);
            setSelectedRows(pageRowIds);
        }
    };

    const handleSelect = id => {
        setSelectedRows(prevSelected =>
            prevSelected.includes(id)
                ? prevSelected.filter(rowId => rowId !== id)
                : [...prevSelected, id]
        );
    };

    const handlePageChange = page => {
        setCurrentPage(page);
    };

    const totalPages = Math.ceil(filteredData.length / rowsPerPage);

    return (
        <div>
            <h1 className="text-2xl font-bold my-4">User Portal</h1>
            {/* <SearchBar handleSearch={handleSearch} /> */}
            <AdminTable
                data={filteredData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)}
                selectedRows={selectedRows}
                setData={setData}
                handleSelect={handleSelect}
                handleDelete={handleDelete}
                handleSelectAll={handleSelectAll}
            />
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                handlePageChange={handlePageChange}
            />
        </div>
    );
};

export default AdminDashboard;
