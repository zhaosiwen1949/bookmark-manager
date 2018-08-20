import React from 'react';

const AddFolderBtn = ({onAddFolder}) => {
    return (
        <div>
            <span>添加文件夹</span>
            <span onClick={onAddFolder} >^_^</span>
        </div>
    );
}
 
export default AddFolderBtn;