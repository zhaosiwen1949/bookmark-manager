import React from 'react';

const Instruction = ({title, url}) => {
    return (
        <div>
            <div>{title}</div>
            <div>{url}</div>
        </div>
    );
}
 
export default Instruction;