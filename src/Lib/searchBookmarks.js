// const FuzzySet = require('fuzzyset.js');

// function searchFactory(){
//     let oldList = [];
//     let oldSearch;
//     return function searchString(keyword, list){
//         let search;
//         if(list === oldList){
//             search = oldSearch;
//         }else{
//             console.log("FuzzySet is called~~~");
//             search = FuzzySet(list);
//             oldSearch = search;
//             oldList = list;
//         }
//         var result = search.get(keyword);
//         return result ? result.sort(function (a, b) {
//                             return b[0] - a[0]
//                         }).map(function (r) {
//                             return r[1]
//                         }) 
//                     : [];

//     }
// }

// module.exports = searchFactory();

import FuzzySet from 'fuzzyset.js';

export default function searchString(keyword, list) {
    let search = FuzzySet(list);
    var result = search.get(keyword, undefined, 0.1);
    return result ? result.sort(function (a, b) {
            return b[0] - a[0]
        }).map(function (r) {
            return r[1]
        }) :
        [];

}