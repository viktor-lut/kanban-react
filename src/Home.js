import {Container, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: "50px"
  },

}))

function Home() {
  const classes = useStyles()

  //////////////////////////////////////////////////
  return (

    <div >

      <div className={classes.root}>
        {/*<Container fixed>*/}
          <Typography variant="h2" align="center" color="textPrimary" gutterBottom> My kanban
            project</Typography><br/>
        {/*</Container>*/}
      </div>
</div>

  )
}

export default Home;
