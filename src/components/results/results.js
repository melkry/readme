import Portal from '../portal/portal';

import React, { useEffect } from "react";
//import { useDispatch, useSelector } from "react-redux";
//import { selectComments } from "../../features/comments/commentsSlice";
//import { getComments } from "../../features/comments/commentsSlice";

function Results() {
    //const comments = useSelector(selectComments);


    return (
        <div>
            <Portal />
            <h2> Display Results Here </h2>
        </div>
    );
}

export default Results;