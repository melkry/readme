import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { unixToDateStr, dictionary } from "../../helpers.js";

export const getComments = createAsyncThunk(
  "comments/getComments",
  async (user, thunkAPI) => {
    const posts = await fetch(
      `https://api.reddit.com/u/${user}/submitted.json?limit=1000`
    ).then((data) => data.json());
    const responses = await fetch(
      `https://api.reddit.com/u/${user}/comments.json?limit=100`
    ).then((data) => data.json());

    console.log(posts);
    
    return {
      responses: responses.data.children,
      posts: posts.data.children
    };
  }
);


export const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    isLoading: false,
    isError: false,
    isFulfilled: false,
    user: "n/a",
    comments: [],
    posts: [],
    words: []
  },
  extraReducers: {
    [getComments.pending]: (state) => {
      state.isLoading = true;
      state.isError = false;
    },
    [getComments.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isFulfilled = true;

      state.user = action.payload.responses[0].data.author;

      state.comments = action.payload.responses.map((comm) => ({
        id: comm.data.id,
        body: comm.data.body,
        postId: comm.data.parent_id.slice(3),
        userId: comm.data.author_fullname.slice(3),
        author: comm.data.author,
        score: comm.data.score,
        created: unixToDateStr(comm.data.created_utc),
        replies: comm.data.replies === "" ? [] : comm.data.replies.data.children
      }));

      state.posts = action.payload.posts.map((post) => ({
        id: post.data.id,
        title: post.data.title,
        selftext: post.data.selftext,
        subreddit: post.data.subreddit,
        score: post.data.score,
        created: unixToDateStr(post.data.created_utc)
      }));

      state.words = [];

      let allText = [];

      state.comments.forEach((comm) => {
        allText.push(comm.body);
      });
      state.posts.forEach((post) => {
        allText.push(post.selftext);
        allText.push(post.title);
      });
      allText.forEach((str) => {
        let strArr = str.split(' ');
        strArr.forEach((word) => {
          if (dictionary.includes(word.toLowerCase())) {
              state.words.push(word.toLowerCase());
          }
      });
    });
    },
    [getComments.rejected]: (state) => {
      state.isLoading = false;
      state.isError = true;
      console.log('error');
    }
  }
});

export const selectComments = (state) => state.comments.comments;

export const selectPosts = (state) => state.comments.posts;

export const selectWords = (state) => state.comments.words;

export const selectUser = (state) => state.comments.user;

export const selectCommentStatus = (state) => ({
  isCommentsLoading: state.comments.isLoading,
  isCommentsFulfilled: state.comments,
  isCommentsError: state.comments.isError
});

export default commentsSlice.reducer;
