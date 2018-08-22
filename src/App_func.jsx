import React, { Component } from 'react';
import compose from 'recompose/compose';
import withStateHandlers from 'recompose/withStateHandlers';
import withHandlers from 'recompose/withHandlers';
import mapProps from 'recompose/mapProps';
import lifecycle from 'recompose/lifecycle';

import HeaderBtn from './Components/HeaderBtn';
import Instruction from './Components/Instruction';
import AddFolderBtn from './Components/AddFolderBtn';
import CurrentFolder from './Components/CurrentFolder';
import CreateFolder from './Components/CreateFolder';
import SubFoldersList from './Components/SubFoldersList';

import searchString from './Lib/searchBookmarks';

const App = compose(
    withStateHandlers({
        currentFolderData: {},
        currentFolderList: [],
        currentState: "Added",
        folderName: "",
    },{
        setFolderData: () => ({folderData, folderList}) => ({
            currentFolderData: folderData,
            currentFolderList: folderList,
        }),
        setState: () => (state) => ({
            currentState: state,
        }),
        setFolderName: () => (name) => ({
            folderName: name,
        }),
    }),
    // mapProps((props) => ({ currentFolderNameList: props.currentFolderList.map((folder) => folder.title), ...props})),
    mapProps((props) => {
        // const { currentFolderList, currentFolderNameList, folderName} = props;
        const { currentFolderList, folderName } = props;
        const currentFolderNameList = currentFolderList.map((folder) => folder.title);
        const showingFolderNameList = searchString(folderName, currentFolderNameList);
        const showingFolderList = currentFolderList.filter((folder) => (showingFolderNameList.indexOf(folder.title) > -1));
        return {
            showingFolderList: showingFolderList.length > 0 ? showingFolderList : currentFolderList,
            ...props
        }
    }),
    withHandlers({
        changeFolderData: ({ setFolderData }) => (currentFolderId) => {
            chrome.bookmarks.get(currentFolderId, (folderData) => {
                chrome.bookmarks.getChildren(currentFolderId, (folderList) => {
                    setFolderData({
                        folderData: folderData[0],
                        folderList: folderList.filter(function (data) {
                            return !data.url
                        })
                    })
                })
            });
        },
    }),
    withHandlers({
        onAddFolder: ({ setState }) => () => {
            setState("Adding");
        },
        onNextBookmark: ({ changeFolderData }) => (bookmarkData) => {
            changeFolderData(bookmarkData.id);
        },
        onPreBookmark: ({ changeFolderData, currentFolderData }) => () => {
            if(currentFolderData.parentId !== "0" && currentFolderData.parentId !== undefined){
                changeFolderData(currentFolderData.parentId);
            }
        },
        onSearchFolder: ({ setFolderName }) => (e) => {
            const folderName = e.target.value;
            setFolderName(folderName);

        }
    }),
    lifecycle({
        componentDidMount() {
            this.props.changeFolderData("1");
        }
    })
)(({ currentFolderData, currentState, folderName, showingFolderList, onAddFolder, onNextBookmark, onPreBookmark, onSearchFolder}) => {
    const { title, url } = currentFolderData;
    console.log(showingFolderList);
    console.log(currentFolderData);
    return (
        <div>
            {
                !currentFolderData.id ?
                    null :
                    <div>
                        <HeaderBtn title={title} />
                        <Instruction title={title} url={url} />
                        {
                            currentState === "Added" ?
                                <AddFolderBtn title={title} onAddFolder={onAddFolder} /> :
                                <div>
                                    <CurrentFolder title={title} onPreBookmark={onPreBookmark} />
                                    <CreateFolder folderName={folderName} onSearchFolder={onSearchFolder} />
                                    <SubFoldersList listData={showingFolderList} onNextBookmark={onNextBookmark} />
                                </div>
                        }
                    </div>
            }
        </div>
    )
})

export default App;