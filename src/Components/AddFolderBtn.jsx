import React from 'react';

const AddFolderBtn = ({title, onAddFolder}) => {
    return (
        <div class="add-folder-btn">
            <div class="add-folder-btn-grpt add-folder-btn-text">{`添加到文件夹${title}`}</div>
            <div class="add-folder-btn-arw" onClick={onAddFolder} ></div>
        </div>
    );
}
 
export default AddFolderBtn;