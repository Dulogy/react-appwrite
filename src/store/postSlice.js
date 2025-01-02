import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    postId : "",
    userId : "",
    title : "",
    content : "",
    blog_image :"",
    status : "inactive" 
}
const postService = createSlice({
    name:"post",
    initialState,
    reducers : {
        createPost : (state,action) => {

        },
        updatePost : (state,action) => {

        },
        deletePost : (state,action) => {

        },
        getPost : (state,action) => {

        },
        postList : (state,action) => {

        }
    }
})

export const { createPost,updatePost,deletePost,getPost,postList} = postService.actions;
export default postService.reducer;