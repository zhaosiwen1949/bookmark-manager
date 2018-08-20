import React from 'react';

const CreateFolder = ({onSearch, onCreate}) => {
    return (
        <div>
            <input type="text" onInput={onSearch} />
            <span onClick={onCreate} >创建</span>
        </div>
    );
}
 
export default CreateFolder;