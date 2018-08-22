import React from 'react';
import pure from 'recompose/pure';

const CurrentFolder = ({title, onPreBookmark}) => {
    return (
        <div class="current-folder">
            <span class="current-folder-dup" onClick={onPreBookmark} ></span>
            <span class="current-folder-ntit">{title}</span>
        </div>
    );
}
 
export default pure(CurrentFolder);