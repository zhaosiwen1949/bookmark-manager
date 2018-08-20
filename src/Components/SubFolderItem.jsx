import React from 'react';

const SubFolderItem = ({title, data, onNext, onAdd}) => {
    const onNextClick = (e) => {
        onNext(data);
    } 

    const onAddClick = (e) => {
        onAdd(data);
    }

    return (
        <div>
            <span onClick={onAddClick} >{title}</span>
            <span onClick={onNextClick} >+++</span>
        </div>
    );
}
 
export default SubFolderItem;