import {AppBar, Container, IconButton, Toolbar, Typography} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import {makeStyles} from "@material-ui/core/styles";




const useStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      marginLeft: theme.spacing(2),
      flexGrow: 1,

    }
  },
  menuButton: {
    marginRight: theme.spacing(1)
  },
  title: {
    flexGrow: 1
  },
  mainFeaturePost: {
    position: "relative",
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),

    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center"
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,.3)"
  },
  mainFeaturePostContent: {
    position: "relative",
    padding: theme.spacing(6),
    marginTop: theme.spacing(8)  }
}))

function Header() {
  const classes = useStyles()


  return (

    <>
      <AppBar position="fixed">
        <Container fixed>
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton}
                        color="inherit" aria-label="menu">
              <MenuIcon/>
            </IconButton>
            <Typography variant="h6" className={classes.title}>My kanban project</Typography>
            {/*<Typography className={classes.root}>*/}
            {/*  /!*<Link href="/home" color="inherit">Home</Link>*!/*/}
            {/*  /!*<Link href="/kanban" color="inherit">Kanban</Link>*!/*/}
            {/*  /!*<Link href="/create" color="inherit">Create new task</Link>*!/*/}

            {/*</Typography>*/}

          </Toolbar>
        </Container>
      </AppBar>

      {/*<main>*/}
        {/*<Paper className={classes.mainFeaturesPost}*/}
        {/*       style={{backgroundImage: `url(https://source.unsplash.com/random)`}}>*/}

        {/*  <Container fixed>*/}
        {/*    <div className={classes.overlay}/>*/}
        {/*    <Grid container>*/}
        {/*      <Grid item md={6}>*/}
        {/*        <div className={classes.mainFeaturesPostContent}>*/}
        {/*          <Typography*/}
        {/*            component="h1"*/}
        {/*            variant="h3"*/}
        {/*            color="inherit"*/}
        {/*            gutterBottom>*/}
        {/*            My Kanban Project*/}
        {/*          </Typography>*/}
        {/*          <Typography*/}
        {/*            variant="h5"*/}
        {/*            color="inherit"*/}
        {/*            paragraph>*/}
        {/*            Lorem Ipsum is simply dummy text of the printing and typesetting industry.*/}
        {/*            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,*/}
        {/*            when an unknown printer took a galley of type and scrambled it to make a type specimen book.*/}
        {/*          </Typography>*/}
        {/*          <Button variant="contained" color="secondary">*/}
        {/*            Learn more*/}
        {/*          </Button>*/}
        {/*        </div>*/}
        {/*      </Grid>*/}
        {/*    </Grid>*/}
        {/*  </Container>*/}

        {/*</Paper>*/}
      {/*</main>*/}
</>
  )
}

export default Header;