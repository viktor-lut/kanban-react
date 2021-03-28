import List from "./List";
import Home from "./Home";
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import CreateCardForm from "./CreateCardForm";
import EditCardForm from "./EditCardForm"
import Typography from "@material-ui/core/Typography";
import { makeStyles } from '@material-ui/core/styles';
import {Box} from "@material-ui/core";
import axios from "axios";
import {useState} from "react";



const useStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      marginLeft: theme.spacing(2),

    },
  },
}));

///////////////////////////////////////////////
function App() {
  const classes = useStyles();
  // const customHistory = createBrowserHistory();
  const [list, setList] = useState([])
  let [isLoading, setIsloading] = useState(false)


  const getCards = () => {
    console.log('GET ALL CARDS')

    axios({
      metod: 'GET',
      url: 'https://nazarov-kanban-server.herokuapp.com/card'
    }).then(res => {
      console.log(res.data)
      setList(res.data)

    }).catch(err => {
      console.log(err);
    }).finally(()=>{
      isLoading = setIsloading(false);
    })
  }

  return (

        <Router >
          <Box  height="40px" justifyContent="center" alignItems="center">
            <nav style={{ backgroundColor: "#CECEF6", height: "100%"}}>
              <Typography className={classes.root}>
                  <Link to="/home">Home</Link>
                  <Link to="/kanban">Kanban</Link>
                  <Link to="/create">Create new task</Link>
                {/*<div style={{textAlign: "center"}}>*/}
                {/*  <Link to="/edit">Edit</Link>*/}
                {/*</div>*/}
              </Typography>
            </nav>
        </Box>
            <Switch>
              <Route path="/home">
                <Home/>
              </Route>
              <Route path="/kanban">
                <List getCards={getCards} list={list} isLoading={isLoading}/>
              </Route>
              <Route path="/create">
                <CreateCardForm getCards={getCards} list={list}/>
              </Route>
              <Route path="/edit/:cardId" >
                <EditCardForm getCards={getCards} list={list}/>
              </Route>
            </Switch>

        </Router>

)
}

export default App;
