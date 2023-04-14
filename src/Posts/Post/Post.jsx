import React from 'react'
import useStyles from "./styles"
import { CardActions, CardContent, CardMedia, Button, Typography, Card } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import DeleteIcon from '@material-ui/icons/Delete'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../redux/slice/postSlice';
const Post = ({ posts, setCurrentId }) => {
  const classes = useStyles();
  const Dispatch = useDispatch()
  const handleDelete = () => {
    Dispatch(deletePost(posts._id))
  }
  const handleLike = () => {
    Dispatch(likePost(posts._id))
  }
  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} image={posts.selectedFile} title={posts.title} />
      <div className={classes.overlay}>
        <Typography variant='h6'>{posts.creator}</Typography>
        <Typography variant='body2'>{moment(posts.createdAt).fromNow()}</Typography>
      </div>
      <div className={classes.overlay2}>
        <Button style={{ color: 'white' }} size="small" onClick={(e) => setCurrentId(posts._id)}><MoreHorizIcon fontSize="medium" /></Button>
      </div>
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary" component="h2">{posts.tags.map((tag) => `#${tag} `)}</Typography>
      </div>
      <Typography className={classes.title} gutterBottom variant="h5" component="h2">{posts.title}</Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">{posts.message}</Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" onClick={handleLike}><ThumbUpAltIcon fontSize="small" /> &nbsp; Like {posts.likeCount} </Button>
        <Button size="small" color="primary" onClick={handleDelete}><DeleteIcon fontSize="small" /> Delete</Button>
      </CardActions>
    </Card>
  )
}

export default Post