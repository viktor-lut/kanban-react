import {useEffect} from "react";
import axios from "axios";
import {useState} from "react";
import Column from "./Column";
import Header from "./Header";
import {AppBar, Box, Button, Card, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";

import {makeStyles} from "@material-ui/core/styles";
import EditCardForm from "./EditCardForm";
import CreateCardForm from "./CreateCardForm";



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
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
    justifyItems: "center"
  }
}))

function App() {
  const classes = useStyles()

  const [list, setList] = useState([])
  const [flag, setFlag] = useState(true)
  const statuses = ['todo', 'progress', 'review', 'done']

  useEffect(() => {

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
  const Delete = (id) => {
    // const newList = list.filter(el => el._id !== id);
    // setList(newList);
    let config = {
      method: 'delete',
      url: 'https://nazarov-kanban-server.herokuapp.com/card/' + id,
      headers: {}
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
  };

  //////////////////////////////////////////////////
  return (
    <main>

      <Header/>
      <br/>
      <br/>
      <br/>
      <br/>
      <div className={classes.mainContent}>
        <Container fixed>
          <Typography variant="h2" align="center" color="textPrimary" gutterBottom> My kanban project</Typography><br/>

          {/*<div className="columns">*/}
          {/*  {statuses.map(el =>*/}
          {/*    <Column key={statuses.indexOf(el)}*/}
          {/*            list={list}*/}
          {/*            status={el}*/}
          {/*            onMoveCard={onMoveCard}*/}
          {/*            Delete={Delete}*/}
          {/*            statuses={statuses}*/}
          {/*    />*/}
          {/*  )}*/}
          {/*</div>*/}

        </Container>
      </div>

      <Container className={classes.cardGrid} fixed>
        <Grid container spacing={4}>


          {statuses.map(el =>
           ( <Grid item xs={12} sm={6} lg={3} >
             <Card className={classes.card} >
             <Column key={statuses.indexOf(el)}
                    list={list}
                    status={el}
                    onMoveCard={onMoveCard}
                    Delete={Delete}
                    statuses={statuses}
            />
             </Card>
            </Grid>
            )
          )}

        </Grid>

      </Container>
      <CreateCardForm />
    </main>


  )
}

export default App;
