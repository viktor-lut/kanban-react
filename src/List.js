import React, {useEffect} from "react";
import axios from "axios";
import {useState} from "react";
import Column from "./Column";
import {Box, Card, Container, Grid} from "@material-ui/core";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import LinearProgress from '@material-ui/core/LinearProgress';


const ColorLinearProgress = withStyles({
  colorPrimary: {
    backgroundColor: '#b2dfdb',
  },
  barColorPrimary: {
    backgroundColor: '#00695c',
  },
})(LinearProgress);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    height: "40px"
  },
  menuButton: {
    marginRight: theme.spacing(1)
  },
  title: {
    flexGrow: 1
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,.3)"
  },
  card: {
    display: "flex",
    flexDirection: "column",
    justifyItems: "center",
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
  progress: {
    margin: theme.spacing(2),
    flexGrow: 1
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}))

//=============================================//

function List() {

  const classes = useStyles()

  const [list, setList] = useState([])
  const [flag, setFlag] = useState(true)
  const statuses = ['todo', 'progress', 'review', 'done']
  const [confirmDialog, setConfirmDiaqlog] = useState({isOpen: false, title: '', subTitle: ''})
  const [isLoading, setIsloading] = useState(false)

  useEffect(() => {
    setIsloading(true)
    console.log('GET ALL CARDS')

    axios({
      metod: 'GET',
      url: 'https://nazarov-kanban-server.herokuapp.com/card'
    }).then(res => {
      console.log(res.data)
      setList(res.data)
    }).catch(err => {
      console.log(err);
    })
      .finally(() => {
        setIsloading(false)
      })
  }, [flag]);

//===========================================================
  const onMoveCard = (id, direction) => {
    let currtStatus = (list.find(el => el._id === id)).status;
    console.log(currtStatus);
    console.log(id);
    console.log(direction);

    let corrector = direction === 'right' ? +1 : -1;
    let nextStatus = statuses[statuses.indexOf(currtStatus) + corrector];

    // const newList = list.map(el => el._id === id ? ({...el, status: nextStatus}) : el);
    // setList(newList);
    setConfirmDiaqlog({
      ...confirmDialog,
      isOpen: false
    })

    let data = JSON.stringify({"status": nextStatus});
    let config = {
      method: 'patch',
      url: `https://nazarov-kanban-server.herokuapp.com/card/${id}`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios(config)
      .then(function(response) {
        console.log(JSON.stringify(response.data));
        const newFlaf = !flag
        setFlag(newFlaf)
      })
      .catch(function(error) {
        console.log(error);
      });
  }
//=======================================================
//   const addToList = (taskName, taskDescription, taskPriority, taskStatus) => {
//     axios.post('https://nazarov-kanban-server.herokuapp.com/card', {
//       _id: Math.random(),
//       name: taskName,
//       description: taskDescription,
//       priority: taskPriority,
//       status: taskStatus,
//     }).then((res) => {
//       const newFlaf = !flag
//       setFlag(newFlaf)
//       console.log(res.data);
//     })
//   };

  //=======================================================
  const Delete = (id) => {
    // const newList = list.filter(el => el._id !== id);
    // setList(newList);
    setConfirmDiaqlog({
      ...confirmDialog,
      isOpen: false
    })
    let config = {
      method: 'delete',
      url: 'https://nazarov-kanban-server.herokuapp.com/card/' + id,
      headers: {}
    };

    axios(config)
      .then(function(response) {
        console.log(JSON.stringify(response.data));
        const newFlag = !flag
        setFlag(newFlag)
      })
      .catch(function(error) {
        console.log(error);
      });
  };


  //////////////////////////////////////////////////
  return (
    <div>
      <br/>
      <br/>

      <Container className={classes.cardGrid} fixed>
        <CssBaseline />
        <Grid container spacing={4}>
          {/*<Box   justifyContent="center" alignItems="center">*/}
          {/*  { isLoading ?*/}
          {/*    <CircularProgress className={classes.progress} /> : null}*/}
          {/*</Box>*/}
          <div className={classes.root}>
              { isLoading ?
                <ColorLinearProgress className={classes.margin} />   : null}

          </div>
          {statuses.map(el =>
            (<Grid item xs={12} sm={6} lg={3}>


                <Card className={classes.card}>
                  {/*<Column key={statuses.indexOf(el)}*/}

                  <Column key={el}
                          list={list}
                          status={el}
                          onMoveCard={onMoveCard}
                          Delete={Delete}
                          statuses={statuses}
                          confirmDialog={confirmDialog}
                          setConfirmDiaqlog={setConfirmDiaqlog}

                  />
                </Card>
              </Grid>

            )
          )}
        </Grid>
      </Container>
      {/*  <div style={{display: "none"}}>*/}
      {/*  <CreateCardForm*/}
      {/*    addToList={addToList}*/}
      {/*  />*/}
      {/*</div>*/}

      {/*<ConfirmDialog*/}
      {/*  confirmDialog={confirmDialog}*/}
      {/*  setConfirmDialog={setConfirmDiaqlog}*/}
      {/*/>*/}
    </div>
  )
}

export default List;
