import React from 'react';
import pure from 'recompose/pure';
import SubFolderItem from './SubFolderItem';

const SubFoldersList = ({listData, onAddBookmark, onNextBookmark}) => {
    return (
        <div class="sub-folder-list">
            { listData.map((data)=>{
                return <SubFolderItem key={data.id} title={data.title} data={data} onAdd={onAddBookmark} onNext={onNextBookmark} />
            }) }
        </div>
    );
}
 
export default pure(SubFoldersList);