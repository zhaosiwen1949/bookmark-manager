import React from 'react';

const Instruction = ({title, url}) => {
    return (
        <div class="instruction">
            <div class="instruction-editable-elt instruction-editable-elt-enabled instruction-title">{title}</div>
            <div class="instruction-editable-elt instruction-editable-elt-enabled instruction-url">{url}</div>
        </div>
    );
}
 
export default Instruction;