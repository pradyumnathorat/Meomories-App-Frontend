import React, { useState, useEffect } from 'react'
import useStyles from "./styles"
import { TextField, Button, Typography, Paper } from "@material-ui/core"
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../redux/slice/postSlice";
const Form = ({ currentId, setCurrentId }) => {
  const dispatch = useDispatch()
  const [postData, setPostData] = useState({
    creator: "", title: "", message: "", tags: "", selectedFile: ""
  })
  const classes = useStyles();

  const post = useSelector(state => currentId ? state.post.data.find(p => p._id == currentId) : null)

  useEffect(() => {
    if (post) {
      setPostData(post)
    }
  }, [post])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentId) {
      dispatch(updatePost(postData))
    } else {
      dispatch(createPost(postData))
    }
    clear();
  }
  const clear = () => {
    setCurrentId(null)
    setPostData({
      creator: "", title: "", message: "", tags: "", selectedFile: ""
    })
  }

  return (
    <>
      <Paper className={classes.paper}>
        <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
          <Typography variant='h6'>
            {
              currentId ? "Editing a Memory" : 'Creating a Memory'
            }
          </Typography>
          <TextField variant='outlined' name='creator' label="Creator" fullWidth value={postData.creator} onChange={(e) => setPostData({ ...postData, creator: e.target.value })} />
          <TextField variant='outlined' name='title' label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
          <TextField variant='outlined' name='message' label="Message" fullWidth value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
          <TextField variant='outlined' name='tags' label="Tags" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
          <div className={classes.fileInput}>
            <FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
          </div>
          <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>
            Submit
          </Button>
          <Button className={classes.buttonSubmit} variant="contained" color="secondary" size="small" onClick={clear} fullWidth>
            Clear
          </Button>
        </form>
      </Paper>
    </>
  )
}

export default Form