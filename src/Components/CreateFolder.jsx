import React from 'react';
import pure from 'recompose/pure';

const CreateFolder = ({folderName, onSearchFolder, onCreateFolder}) => {
    return (
        <div class="create-folder">
            <input class="create-folder-inpf create-folder-text" type="text" onChange={onSearchFolder} value={folderName} />
            <span class="create-folder-cref create-folder-text" onClick={onCreateFolder} >创建</span>
        </div>
    );
}
 
export default pure(CreateFolder);