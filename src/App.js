import React, { useEffect, useState } from "react";
import { Container, AppBar, Typography, Grow, Grid } from "@material-ui/core";
import memories from "./images/memories.png";
import Posts from "./Posts/Posts";
import Form from "./From/Form";
import useStyles from "./styles"
import { useDispatch, useSelector } from "react-redux";
import { fetchPost } from "./redux/slice/postSlice";
function App() {
  const classes = useStyles();
  const Dispatch = useDispatch();
  const state = useSelector((post) => post)
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    Dispatch(fetchPost())
  }, [])

  return (
    <Container maxidth="lg">
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography className={classes.heading} variant="h2" align="center">Memories</Typography>
        <img className={classes.image} src={memories} alt="memories" height="60" />
      </AppBar>
      <Grow in>
        <Container>
          <Grid container className={classes.mainContainer} justifyContent="space-between" alignItems="stretch" spacing={3} >
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
}

export default App;
