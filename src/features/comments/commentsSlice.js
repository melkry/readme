import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getComments = createAsyncThunk(
  "comments/getComments",
  async (user, thunkAPI) => {
    const response = await fetch(
      `https://www.reddit.com/u/${user}/.json?limit=1000`
    ).then((data) => data.json());
    return response[1].data.children;
  }
);

export const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    isLoading: false,
    isError: false,
    comments: []
  },
  extraReducers: {
    [getComments.pending]: (state) => {
      state.isLoading = true;
      state.isError = false;
    },
    [getComments.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      /*state.comments = action.payload.map((comm) => ({
        id: comm.data.id,
        body: comm.data.body_html,
        postId: comm.data.parent_id.slice(3),
        userId: comm.data.author_fullname,
        author: comm.data.author,
        score: comm.data.score,
        created: comm.data.created_utc,
        replies: comm.data.replies === "" ? [] : comm.data.replies.data.children
      }));*/
      console.log(action.payload);
    },
    [getComments.rejected]: (state) => {
      state.isLoading = false;
      state.isError = true;
    }
  }
});

export const selectComments = (state) => state.comments.comments;

export const selectCommentStatus = (state) => ({
  isCommentsLoading: state.comments.isLoading,
  isCommentsError: state.comments.isError
});

export default commentsSlice.reducer;
