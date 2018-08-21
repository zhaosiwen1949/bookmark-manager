import React from 'react';
import SubFolderItem from './SubFolderItem';

const SubFoldersList = ({listData, onAddBookmark, onNextBookmark}) => {
    return (
        <div class="sub-folder-list">
            { listData.map((data)=>{
                return <SubFolderItem title={data.title} data={data} onAdd={onAddBookmark} onNext={onNextBookmark} />
            }) }
        </div>
    );
}
 
export default SubFoldersList;