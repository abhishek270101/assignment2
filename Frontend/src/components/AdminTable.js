import React from 'react';
import TableRow from './TableRow';

const AdminTable = ({
    data,
    setData,
    selectedRows,
    handleSelect,
    handleDelete,
    handleSelectAll,
}) => {
    return (
        <table className="w-full border-collapse mt-4">
            <thead>
                <tr>
                    <th>
                        <input type="checkbox" onChange={handleSelectAll} />
                    </th>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Phone Number</th>
                    <th>Position</th>
                    <th>Password</th>
                    <th>Options</th>
                </tr>
            </thead>
            <tbody>
                {data.map(row => (

                    <TableRow
                        key={row.id}
                        data={row}
                        setData={setData}
                        isSelected={selectedRows.includes(row.id)}
                        onDelete={handleDelete}
                        onSelect={handleSelect}
                    />
                ))}
            </tbody>
        </table>
    );
};

export default AdminTable;
