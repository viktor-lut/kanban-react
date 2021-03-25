import {Container, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },

}))

function Home() {
  const classes = useStyles()

  //////////////////////////////////////////////////
  return (

    <main>

      <br/>
      <br/>

      <div className={classes.mainContent}>
        <Container fixed>
          <Typography variant="h2" align="center" color="textPrimary" gutterBottom> My kanban
            project</Typography><br/>
        </Container>
      </div>

    </main>
  )
}

export default Home;
