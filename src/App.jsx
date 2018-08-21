import React, { Component } from 'react';
import HeaderBtn from './Components/HeaderBtn';
import Instruction from './Components/Instruction';
import AddFolderBtn from './Components/AddFolderBtn';
import CurrentFolder from './Components/CurrentFolder';
import CreateFolder from './Components/CreateFolder';
import SubFoldersList from './Components/SubFoldersList';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentFolderData: {},
            currentSubFolderList: [],
        }
    }
    setFolderData = (currentFolderId) => {
        chrome.bookmarks.get(currentFolderId, (folderData) => {
            chrome.bookmarks.getChildren(currentFolderId, (subFoldersList) => {
                this.setState({
                    currentFolderData: folderData[0],
                    currentSubFolderList: subFoldersList.filter(function(data){
                        return !data.url
                    })
                });
            })
        });
    };
    componentDidMount() {
        this.setFolderData('1');
    }
    render() { 
        const currentFolderData = this.state.currentFolderData;
        const currentSubFolderList = this.state.currentSubFolderList;
        const { title, url } = currentFolderData;
        console.log(currentSubFolderList);
        console.log(currentFolderData);
        return (
            <div>
                {
                    !currentFolderData.id ? 
                    null :
                    <div>
                        <HeaderBtn title={title} />
                        <Instruction title={title} url={url} />
                        <AddFolderBtn title={title} />
                        <CurrentFolder title={title} />
                        <CreateFolder />
                        <SubFoldersList listData={currentSubFolderList} />
                    </div>
                }
            </div>
        )
    }
}
 
export default App;