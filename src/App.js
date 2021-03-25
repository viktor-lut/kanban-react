import List from "./List";
import Home from "./Home";
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import CreateCardForm from "./CreateCardForm";
import EditCardForm from "./EditCardForm"
import Typography from "@material-ui/core/Typography";
import { makeStyles } from '@material-ui/core/styles';

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

  return (

        <Router>
            <nav  style={{ backgroundColor: "#CECEF6"}}>
              <Typography className={classes.root}>
                  <Link to="/home">Home</Link>
                  <Link to="/kanban">Kanban</Link>
                  <Link to="/create">Create new task</Link>
                {/*<div style={{textAlign: "center"}}>*/}
                {/*  <Link to="/edit">Edit</Link>*/}
                {/*</div>*/}
              </Typography>
            </nav>

            <Switch>
              <Route path="/home">
                <Home/>
              </Route>
              <Route path="/kanban">
                <List />
              </Route>
              <Route path="/create">
                <CreateCardForm />
              </Route>
              {/*<Route path="/edit/:cardId" >*/}
              {/*  <EditCardForm />*/}
              {/*</Route>*/}
            </Switch>

        </Router>

)
}

export default App;
