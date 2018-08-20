import React from 'react';
import SubFolderItem from './SubFolderItem';

const SubFoldersList = ({listData, onAddBookmark, onNextBookmark}) => {
    return (
        <div>
            { listData.map((data)=>{
                return <SubFolderItem onAdd={onAddBookmark} onNext={onNextBookmark} />
            }) }
        </div>
    );
}
 
export default SubFoldersList;