import React from 'react'
import Post from './Post/Post'
import useStyles from "./styles"
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from "react-redux";
const Posts = ({ setCurrentId }) => {
    const posts = useSelector((state) => state.post);
    const classes = useStyles();
    return (
        !posts.data ? <CircularProgress /> : (
            <Grid className={classes.container} justifyContent="center" container alignItems='stretch' spacing={3} >
                {
                    posts.data.map((post) => (
                        <Grid key={post._id} item xs={12} sm={6} >
                            <Post posts={post} setCurrentId={setCurrentId}></Post>
                        </Grid>
                    ))
                }
            </Grid>
        )

    )
}

export default Posts