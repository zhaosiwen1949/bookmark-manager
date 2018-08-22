import React from 'react';
import pure from 'recompose/pure';

const AddFolderBtn = ({title, onAddFolder}) => {
    return (
        <div class="add-folder-btn" onClick={onAddFolder} > 
            <div class="add-folder-btn-grpt add-folder-btn-text">{`添加到文件夹${title}`}</div>
            <div class="add-folder-btn-arw"></div>
        </div>
    );
}
 
export default pure(AddFolderBtn);