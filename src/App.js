import List from "./List";
import Home from "./Home";
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import CreateCardForm from "./CreateCardForm";
import EditCardForm from "./EditCardForm"
import Typography from "@material-ui/core/Typography";




function App() {

  return (


      <div>
        {/*<Header />*/}
        {/*<br/>*/}
        {/*<br/>*/}
        {/*<br/>*/}
        {/*<br/>*/}

        <Router>
          <div>
            <nav style={{ backgroundColor: "#CECEF6"}}>

              <Typography >

                <div style={{textAlign: "center"}}>
                  <Link to="/home">Home</Link>
                </div>
                <div style={{textAlign: "center"}}>
                  <Link to="/kanban">Kanban</Link>
                </div>
                <div style={{textAlign: "center"}}>
                  <Link to="/create">Create new task</Link>
                </div>
                {/*<div style={{textAlign: "center"}}>*/}
                {/*  <Link to="/edit">Edit</Link>*/}
                {/*</div>*/}
              </Typography>
            </nav>

            {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
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
              <Route path="/edit/:cardId" >
                <EditCardForm />
              </Route>
            </Switch>
          </div>
        </Router>

        </div>

)
}

export default App;
