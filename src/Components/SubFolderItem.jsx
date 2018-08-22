import React from 'react';
import pure from 'recompose/pure';

const SubFolderItem = ({title, data, onNext, onAdd}) => {
    const onNextClick = (e) => {
        onNext(data);
    } 

    const onAddClick = (e) => {
        onAdd(data);
    }

    return (
        <div class="sub-folder-item">
            <div class="sub-folder-item-folw">
                <div class="sub-folder-item-foli"></div>
                <div class="sub-folder-item-folt sub-folder-item-text" onClick={onAddClick} >{title}</div>
            </div>
            <div class="sub-folder-item-fold" onClick={onNextClick} ></div>
        </div>
    );
}
 
export default pure(SubFolderItem);