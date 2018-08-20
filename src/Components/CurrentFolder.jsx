import React from 'react';

const CurrentFolder = ({title, onPre}) => {
    return (
        <div>
            <span onClick={onPre} >---</span>
            <span>{title}</span>
        </div>
    );
}
 
export default CurrentFolder;