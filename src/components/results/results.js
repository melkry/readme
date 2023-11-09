import './results.css';
import React from "react";
import { useSelector } from "react-redux";
import { selectWords, selectUser, selectCommentStatus } from "../../features/comments/commentsSlice";
function Results() {
    let words = useSelector(selectWords);
    let user = useSelector(selectUser);
    let status = useSelector(selectCommentStatus);
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

    let topWords = wordScoreArray.slice(0,30);

    let shuffledTop = topWords.sort((a, b) => 0.5 - Math.random());

    // Calculating bubble size and colours

    const calculateBubbleSize = (count) => {
        const scaleFactor = topWords[0].count <  30 ? .4 : .1;
        return `${count * scaleFactor}%`;
    };

    const calculateBubbleColour = (count) => {
        const scaleFactor = 10;
        return `hue-rotate(${count * scaleFactor}deg)`;
    }

    return (
        <div id="results" className="d-flex justify-content-center">
            <div id="loadingScreen" className={status.isCommentsLoading && !status.isCommentsError ? "visible noScroll fade" : "hidden fade"}>
                <img src="https://www.autopoint.com/wp-content/uploads/2022/07/autopoint-loading-svg.gif" alt="loading" className="my-5"/>
            </div>
            <div id="content" className={status.isCommentsLoading && !status.isCommentsError ? "hidden fade" : "visible container text-center fade"}>
                <h2 className="my-4 display-1">u/<text className="animatedTitle">{user}</text>'s Statistics</h2>
                <h3 className="my-4 display-5">Favourite Words</h3>
                <div id="bubbleWrapper" className="d-flex justify-content-center align-items-center flex-wrap container my-4">
                    {
                        shuffledTop.map((word) => (
                            <div 
                                key={word.word} 
                                className="wordBubble" 
                                title={word.count} 
                                style={{ 
                                    padding: calculateBubbleSize(word.count),
                                    filter: calculateBubbleColour(word.count) 
                                }}
                            >   
                                <div className="bubbleWord">
                                    {word.word}
                                </div>
                                <div className="bubbleCount">
                                    {word.count}
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default Results;