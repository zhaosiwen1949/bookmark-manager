import React from 'react';
const HeaderBtn = ({title,onDelete}) => {
    return (
        <div class="header">
            <div class="header-cover">
                <span>{title}</span>
                <span onClick={onDelete} ></span>
            </div>
        </div>
    );
}
 
export default HeaderBtn;