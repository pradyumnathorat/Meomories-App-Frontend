import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios';

const URL = 'https://memories-app-tpi0.onrender.com'

export const fetchPost = createAsyncThunk(
    'fetchPosts',
    async () => {
        const response = await axios.get(`${URL}/post`);
        return response.data;
    }
);

export const createPost = createAsyncThunk("createPost", async (object, { rejectWithValue }) => {
    const response = await fetch(`${URL}/post`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(object)
    });
    try {
        const data = await response.json();
        return data;
    } catch (err) {
        return rejectWithValue(err)
    }
})

export const updatePost = createAsyncThunk("updatePost", async (object, { rejectWithValue }) => {
    try {
        const response = await fetch(`${URL}/post/${object._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(object)
        });
        const data = await response.json();
        return data;
    } catch (err) {
        return rejectWithValue(err)
    }
})

export const deletePost = createAsyncThunk("deletePost", async (_id, { rejectWithValue }) => {
    try {
        await fetch(`${URL}/post/${_id}`, {
            method: 'DELETE'
        })
        return _id;
    } catch (err) {
        return rejectWithValue(err)
    }
})

export const likePost = createAsyncThunk("likePost", async (_id, { rejectWithValue }) => {
    try {
        const data  = await fetch(`${URL}/post/${_id}/likePost` , { 
            method : "PATCH"
        })
        const updatedData = await data.json();
        return updatedData;
    } catch (err) {
        return rejectWithValue(err)
    }
})



const postSlice = createSlice({
    name: 'post',
    initialState: {
        isloading: false,
        data: [],
        isError: false
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPost.pending, (state, action) => {
            state.isloading = true;
            state.data = action.payload;
        })
        builder.addCase(fetchPost.fulfilled, (state, action) => {
            state.isloading = false;
            state.data = action.payload;
        })
        builder.addCase(fetchPost.rejected, (state, action) => {
            console.log(Error, action.payload);
            state.isError = true;
        })
        builder.addCase(createPost.pending, (state, action) => {
            state.isloading = true;
        })
        builder.addCase(createPost.fulfilled, (state, action) => {
            state.data.push(action.payload);
            state.isloading = false;
        })
        builder.addCase(createPost.rejected, (state, action) => {
            console.log(Error, action.payload);
            state.isError = true;
        })
        builder.addCase(updatePost.pending, (state, action) => {
            state.isloading = true;
        })
        builder.addCase(updatePost.fulfilled, (state, action) => {
            state.data = state.data.map((ele) => (
                ele._id == action.payload._id ? action.payload : ele
            ))
            state.isloading = false;
        })
        builder.addCase(updatePost.rejected, (state, action) => {
            console.log(Error, action.payload);
            state.isError = true;
        })
        builder.addCase(deletePost.pending, (state, action) => {
            state.isloading = true;
        })
        builder.addCase(deletePost.fulfilled, (state, action) => {
            state.data = state.data.filter(ele => ele._id != action.payload)
            state.isloading = false;
        })
        builder.addCase(deletePost.rejected, (state, action) => {
            console.log(Error, action.payload);
            state.isError = true;
        })
        builder.addCase(likePost.pending, (state, action) => {
            state.isloading = true;
        })
        builder.addCase(likePost.fulfilled, (state, action) => {
            state.data = state.data.map( ele => ele._id == action.payload._id ? action.payload : ele )
            state.isloading = false;
        })
        builder.addCase(likePost.rejected, (state, action) => {
            console.log(Error, action.payload);
            state.isError = true;
        })
    }

})

export default postSlice.reducer;