import React from 'react';

const CreateFolder = ({onSearch, onCreate}) => {
    return (
        <div class="create-folder">
            <input class="create-folder-inpf create-folder-text" type="text" onInput={onSearch} />
            <span class="create-folder-cref create-folder-text" onClick={onCreate} >创建</span>
        </div>
    );
}
 
export default CreateFolder;