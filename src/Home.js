import {Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Dialogv from "./Dialogv";
import {useState} from "react";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: "50px"
  },

}))

function Home() {
  const classes = useStyles()
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  function handleClose() {
    setOpen(false);
  }

  //////////////////////////////////////////////////
  return (

    <div>

      <div className={classes.root}>
        {/*<Container fixed>*/}
        <Typography variant="h2" align="center" color="textPrimary" gutterBottom> My kanban
          project</Typography><br/>
        {/*</Container>*/}
      </div>

      <button onClick={handleClickOpen}

      > dialog
      </button>
      <Dialogv
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        open={open}
      />
    </div>

  )
}

export default Home;
