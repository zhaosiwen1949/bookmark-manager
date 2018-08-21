import React from 'react';

const CurrentFolder = ({title, onPre}) => {
    return (
        <div class="current-folder">
            <span class="current-folder-dup" onClick={onPre} >---</span>
            <span class="current-folder-ntit">{title}</span>
        </div>
    );
}
 
export default CurrentFolder;