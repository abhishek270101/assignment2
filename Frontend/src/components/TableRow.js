import React, { useState } from 'react';


const TableRow = ({
    data,
    setData,
    isSelected,
    onDelete,
    onSelect,
}) => {
    const [editedName, setEditedName] = useState(data.name);
    const [editedRole, setEditedRole] = useState(data.role);
    const [editedPhoneNumber, setEditedPhoneNumber] = useState(data.phoneNumber);
    const [editedPosition, setEditedPosition] = useState(data.position);
    const [editedPassword, setEditedPassword] = useState(data.password);

    const [editedEmail, setEditedEmail] = useState(data.email);
    const [editableRows, setEditableRows] = useState({});
    const [currentlyEditing, setCurrentlyEditing] = useState(null);
    const [tempData, setTempData] = useState(data);

    const handleSaveClick = () => {
        handleSave(data.id);
    };

    const handleCancelClick = () => {
        handleCancelEdit(data.id);
    };

    const handleNameChange = (e) => {
        setEditedName(e.target.value);
        handleEdit(data.id, 'name', e.target.value);
    };

    const handleEmailChange = (e) => {
        setEditedEmail(e.target.value);
        handleEdit(data.id, 'email', e.target.value);
    };

    const handleEdit = (id, field, value) => {
        setEditableRows((prevRows) => ({
            ...prevRows,
            [id]: {
                ...prevRows[id],
                [field]: value,
            },
        }));
    };

    const handleSave = async (id) => {
        var x
        setData((prevData) => {
            const updatedData = prevData.map((item) =>
                item.id === id
                    ? { ...item, name: editableRows[id]?.name || item.name, email: editableRows[id]?.email || item.email, role: editableRows[id]?.role || item.role, phoneNumber: editableRows[id]?.phoneNumber || item.phoneNumber, position: editableRows[id]?.position || item.position, password: editableRows[id]?.password || item.password }
                    : item
            );
            // console.log(updatedData);
            x = updatedData;
            setTempData(updatedData[id - 1]);
            return updatedData;
        });
        console.log(x);
        const response = await fetch(
            "http://localhost:8080/user-update", {
            method: "PUT", headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(x)
        }
        )
        console.log(response);
        setEditableRows((prevRows) => {
            const updatedRows = { ...prevRows };
            delete updatedRows[id];
            return updatedRows;
        });

        setCurrentlyEditing(null);
    };


    const handleCancelEdit = (id) => {
        setEditableRows((prevRows) => {
            const updatedRows = { ...prevRows };
            delete updatedRows[id];
            return updatedRows;
        });
        setCurrentlyEditing(null);
    };

    const handleRoleChange = (e) => {
        setEditedRole(e.target.value);
        handleEdit(data.id, 'role', e.target.value);
    }

    const handlePhoneNumberChange = (e) => {
        setEditedPhoneNumber(e.target.value);
        handleEdit(data.id, 'phoneNumber', e.target.value);
    }
    const handlePositionChange = (e) => {
        setEditedPosition(e.target.value);
        handleEdit(data.id, 'position', e.target.value);
    }
    const handlePasswordChange = (e) => {
        setEditedPassword(e.target.value);
        handleEdit(data.id, 'password', e.target.value);
    }
    const isEditing = currentlyEditing === data.id;

    return (
        <tr className={`${isSelected ? 'bg-gray-200' : ''} ${isEditing ? 'bg-yellow-100' : ''}`}>
            <td>
                <input type="checkbox" checked={isSelected} onChange={() => onSelect(data.id)} />
            </td>
            <td>{tempData.id}</td>
            <td>
                {isEditing ? (
                    <input
                        type="text"
                        value={editedName}
                        onChange={handleNameChange}
                        className="p-2"
                    />
                ) : (
                    tempData.name
                )}
            </td>
            <td>
                {isEditing ? (
                    <input
                        type="text"
                        value={editedEmail}
                        onChange={handleEmailChange}
                        className="p-2"
                    />
                ) : (
                    tempData.email
                )}
            </td>
            <td>
                {isEditing ? (<input type="text"
                    value={editedRole}
                    onChange={handleRoleChange}
                    className="p-2" />) : (tempData.role)}
            </td>
            <td>
                {isEditing ? (<input value={editedPhoneNumber}
                    onChange={handlePhoneNumberChange}
                    className="p-2" />) : (tempData.phoneNumber)}
            </td>
            <td>
                {isEditing ? (<input value={editedPosition}
                    onChange={handlePositionChange}
                    className="p-2" />) : (tempData.position)}
            </td>
            <td className='obscured-password'>
                {isEditing ? (<input value={editedPassword} onChange={handlePasswordChange} className='p-2' />)
                    : (tempData.password.replace(/./g, '.'))}</td>
            <td>
                {isEditing ? (
                    <>
                        <button className="bg-green-500 text-white px-2 py-1 mr-1" onClick={() => handleSaveClick(data.id)}>
                            Save
                        </button>
                        <button className="bg-red-500 text-white px-2 py-1" onClick={handleCancelClick}>
                            Cancel
                        </button>
                    </>
                ) : (
                    <button className="bg-blue-500 text-white px-2 py-1 mr-1" onClick={() => setCurrentlyEditing(data.id)}>
                        Edit
                    </button>
                )}
                <button className="bg-red-500 text-white px-2 py-1" onClick={() => onDelete(data.id)}>
                    Delete
                </button>
            </td>

        </tr>
    );
};

export default TableRow;
