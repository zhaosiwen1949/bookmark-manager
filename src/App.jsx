import React, { Component } from 'react';
import HeaderBtn from './Components/HeaderBtn';
import Instruction from './Components/Instruction';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentFolderData: {}
        }
    }
    componentDidMount() {
        chrome.bookmarks.get('1', (data) =>{
            this.setState({currentFolderData: data});
        });
    }
    render() { 
        const { title, url } = this.state.currentFolderData;
        return (
            <div>
                {
                    !currentFolderData.id ? 
                    <div></div> :
                    <div>
                        <HeaderBtn title={title} />
                        <Instruction title={title} url={url} />
                    </div>
                }
            </div>
        )
    }
}
 
export default App;