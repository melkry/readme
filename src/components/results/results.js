import Portal from '../portal/portal';

import React from "react";
import { useSelector } from "react-redux";
import { selectWords, selectUser } from "../../features/comments/commentsSlice";
function Results() {
    let words = useSelector(selectWords);
    let user = useSelector(selectUser);
    let wordScore = {};

    // Calculating Word Frequency Score
    for (let i = 0; i < words.length; i++) {
        let word = words[i];
        if (wordScore[word]) {
            wordScore[word] += 1;
        } else {
            wordScore[word] = 1;
        }
    }

    let wordScoreArray = [];
    for (let word in wordScore) {
        wordScoreArray.push({ word: word, count: wordScore[word] });
    }

    wordScoreArray.sort((a, b) => b.count - a.count);

    let top20 = wordScoreArray.slice(0,19);

    return (
        <div>
            <Portal />
            <h2> Welcome, {user}! Here is your results. </h2>
            <div>
                {
                    top20.map((word) => <p>{word.word} -- {word.count}</p>)
                }
            </div>
        </div>
    );
}

export default Results;