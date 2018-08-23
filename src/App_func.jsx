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
        currentPageData: {},
        currentState: "Added",
        folderName: "",
    },{
        setFolderData: () => ({folderData, folderList}) => ({
            currentFolderData: folderData,
            currentFolderList: folderList,
        }),
        setPageData: () => (pageData) => ({
            currentPageData: pageData,
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
        onAddFolder: ({ setState, changeFolderData, currentFolderData }) => () => {
            setState("Adding");
            if (currentFolderData.parentId !== "0" && currentFolderData.parentId !== undefined) {
                changeFolderData(currentFolderData.parentId);
            }
        },
        onSearchFolder: ({ setFolderName }) => (e) => {
            const folderName = e.target.value;
            setFolderName(folderName);
        },
        onCreateFolder: ({ setFolderName, setState, changeFolderData, folderName, currentFolderData, currentPageData }) => () => {
            chrome.bookmarks.create({
                parentId: currentFolderData.id,
                title: folderName,
                index: 0
            }, (newFolder) => {
                console.log("文件夹添加成功");
                console.log(newFolder);
                chrome.bookmarks.create({
                    parentId: newFolder.id,
                    title: currentPageData.title,
                    url: currentPageData.url
                },(newBookmark) => {
                    console.log("书签添加成功");
                    console.log(newBookmark);
                    changeFolderData(newFolder.id);
                });
            });
            setFolderName("");
            setState("Added");
        },
        onNextBookmark: ({ changeFolderData, setFolderName }) => (bookmarkData) => {
            changeFolderData(bookmarkData.id);
            setFolderName("");
        },
        onPreBookmark: ({ changeFolderData, currentFolderData, setFolderName }) => () => {
            if(currentFolderData.parentId !== "0" && currentFolderData.parentId !== undefined){
                changeFolderData(currentFolderData.parentId);
                setFolderName("");
            }
        },
        onAddBookmark: ({ setState, changeFolderData, currentPageData }) => (data) => {
            console.log("添加到文件夹");
            console.log(data);
            const { title, url } = currentPageData;
            chrome.bookmarks.create({
                parentId: data.id,
                title: title,
                url: url
            },(newBookmark) => {
                console.log("书签添加成功");
                console.log(newBookmark);
                changeFolderData(data.id);
                setState("Added");
            });
        }
    }),
    lifecycle({
        componentDidMount() {
            chrome.tabs.query({
                active: true,
                currentWindow: true
            }, (tabs) => {
                console.log("TAB:");
                console.log(tabs);
                const { title, url } = tabs.length > 0 ? tabs[0] : { title: "baidu111", url: "https://www.baidu.com" }
                this.props.setPageData({
                    title,
                    url
                })
                this.props.changeFolderData("1");
            });
        }
    })
)(({ currentFolderData, currentPageData, currentState, folderName, showingFolderList, onAddFolder, onSearchFolder, onCreateFolder, onNextBookmark, onPreBookmark, onAddBookmark}) => {
    const { title: folderTitle } = currentFolderData;
    const { title: pageTitle, url: pageUrl } = currentPageData;
    console.log(showingFolderList);
    console.log(currentFolderData);
    return (
        <div>
            {
                !currentFolderData.id ?
                    null :
                    <div>
                        <HeaderBtn title={folderTitle} />
                        <Instruction title={pageTitle} url={pageUrl} />
                        {
                            currentState === "Added" ?
                                <AddFolderBtn title={folderTitle} onAddFolder={onAddFolder} /> :
                                <div>
                                    <CurrentFolder title={folderTitle} onPreBookmark={onPreBookmark} />
                                    <CreateFolder folderName={folderName} onSearchFolder={onSearchFolder} onCreateFolder={onCreateFolder} />
                                    <SubFoldersList listData={showingFolderList} onNextBookmark={onNextBookmark} onAddBookmark={onAddBookmark} />
                                </div>
                        }
                    </div>
            }
        </div>
    )
})

export default App;