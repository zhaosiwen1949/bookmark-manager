// chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
//     console.log(message);
//     if(message === "getPageData"){
//         console.log("getPageData");
//         console.log({
//             title: document.title,
//             url: location.href
//         });
//         sendResponse({
//             title: document.title,
//             url: location.href
//         });
//     }
// });
// console.log("content script is running");
// console.log({
//     title: document.title,
//     url: location.href
// });