import {Container, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";


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

function Home() {
  const classes = useStyles()

  //////////////////////////////////////////////////
  return (

    <main>
      {/*<Header/>*/}

      {/*<br/>*/}
      {/*<br/>*/}
      <br/>
      <br/>

      <div className={classes.mainContent}>
        <Container fixed>
          <Typography variant="h2" align="center" color="textPrimary" gutterBottom> My kanban
            project</Typography><br/>
        </Container>
      </div>

      <br/>
      <br/>

    </main>
  )
}

export default Home;
