import {AppBar, Box, Button, Container, IconButton, Toolbar, Typography} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
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
  }
}))

function Header() {
  const classes = useStyles()

  return(

  <>
  <AppBar position="fixed">
    <Container fixed>
      <Toolbar>
        <IconButton edge="start" className={classes.menuButton}
                    color="inherit" aria-label="menu" >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>My kanban project</Typography>
        <Box mr={3}>
          <Button color="inherit" variant="outlined">Log In</Button>
        </Box>
        <Button color="secondary" variant="contained">Sign Up</Button>
      </Toolbar>
    </Container>

  </AppBar>
</>
)
}

export default Header;