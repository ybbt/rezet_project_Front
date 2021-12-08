import { useState } from "react";

export function PostDropdown({ onEdit, onDelete }) {
    const [componentCondition, setComponentCondition] = useState(false);

    function handleDropdownClick() {
        setComponentCondition(!componentCondition);
    }

    function handleEditClick() {
        onEdit();
        handleDropdownClick();
    }

    function handleDeleteClick() {
        onDelete();
        handleDropdownClick();
    }

    const dropdownMenu = componentCondition ? (
        <>
            <div>
                <button onClick={handleEditClick}>Edit</button>
                <button onClick={handleDeleteClick}>Delite</button>
            </div>
        </>
    ) : null;

    return (
        <>
            <button onClick={handleDropdownClick}>...</button>
            {dropdownMenu}
        </>
    );
}
