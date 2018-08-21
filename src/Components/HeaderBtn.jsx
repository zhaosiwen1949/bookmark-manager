import React from 'react';
const HeaderBtn = ({title,onDelete}) => {
    return (
        <div class="header-btn">
            <div class="header-btn-cover">
                <div class="header-btn-innero">
                    <div class="header-btn-conft header-btn-text">{title}</div>
                    <div class="header-btn-vers"></div>
                    <div class="header-btn-confi header-btn-icon" onClick={onDelete}></div>
                </div>
            </div>
        </div>
    );
}
 
export default HeaderBtn;