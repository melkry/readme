import Portal from '../portal/portal';

import React from "react";
import { useSelector } from "react-redux";
import { selectWords } from "../../features/comments/commentsSlice";
function Results() {
    let words = useSelector(selectWords);
    let wordScore = {};

    // Count the frequency of each word
    for (let i = 0; i < words.length; i++) {
        let word = words[i];
        if (wordScore[word]) {
            wordScore[word] += 1;
        } else {
            wordScore[word] = 1;
        }
    }

    // Convert the word frequencies into an array of objects for easier sorting
    let wordScoreArray = [];
    for (let word in wordScore) {
        wordScoreArray.push({ word: word, count: wordScore[word] });
    }

    // Sort the array in descending order of word frequency
    wordScoreArray.sort((a, b) => b.count - a.count);

    console.log(wordScoreArray);

    return (
        <div>
            <Portal />
            <h2> Display Results Here </h2>
            <div>
                {
                    
                }
            </div>
        </div>
    );
}

export default Results;