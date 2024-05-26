import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  postsLoading: true,
  userPosts: [],
  userPostsLoading: true,
  popularPosts: [],
  popularPostsLoading: [],
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setAllPosts: (state, action) => {
      state.posts = action.payload;
    },

    addPostCreatedToPosts: (state, action) => {
      state.posts = [action.payload, ...state.posts];
    },

    replacePost: (state, { payload: { postIndex, newPost } }) => {
      if (postIndex !== -1) {
        state.posts[postIndex] = newPost;
      }
    },

    setPostsLoading: (state, action) => {
      state.postsLoading = action.payload;
    },

    setUserPosts: (state, action) => {
      state.userPosts = action.payload;
    },

    addUserPostCreatedToUserPosts: (state, action) => {
      state.userPosts = [action.payload, ...state.userPosts];
    },

    setUserPostsLoading: (state, action) => {
      state.userPostsLoading = action.payload;
    },

    setPopularPosts: (state, action) => {
      state.popularPosts = action.payload;
    },

    setPopularPostsLoading: (state, action) => {
      state.popularPostsLoading = action.payload;
    },
  },
});

export const {
  setAllPosts,
  addPostCreatedToPosts,
  replacePost,
  setPostsLoading,
  setUserPosts,
  addUserPostCreatedToUserPosts,
  setUserPostsLoading,
  setPopularPosts,
  setPopularPostsLoading,
} = postSlice.actions;

export default postSlice.reducer;
