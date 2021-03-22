import {AppBar, Box, Button, Card, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {makeStyles} from "@material-ui/core/styles";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {useState} from "react";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  card: {
    display: "flex",
    backgroundColor: "#f5f5f5",
    marginBottom: 8,
    marginLeft: 6,
    width: "95%",
    justifyContent: "space-between",
    alignItems: "center"

  }
}))

function Column(props) {
  const classes = useStyles()

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };



  return (
    <div className={classes.root}>
      <Typography
        component="h1"
        variant="h5"
        color="inherit"
        gutterBottom
        align="center"

      >
        {props.status}
      </Typography>


      {
        props.list
          .filter(el => el.status === props.status)
          .map(el => (
            <Card className={classes.card} key={el._id}>
              <Typography variant="body2" color="textSecondary" margin-left="10px">
                {(props.status !== props.statuses[0]) &&
                <button onClick={() => props.onMoveCard(el._id, 'left')}>⇽</button>}
                {el.name}
                {(props.status !== props.statuses[props.statuses.length - 1]) &&
                <button onClick={() => props.onMoveCard(el._id, 'right')}>⇾</button>}
                {(props.status === props.statuses[props.statuses.length - 1]) &&
                <button onClick={() => props.Delete(el._id)}>✘</button>}

              </Typography>
              <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                Menu
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
              </Menu>
            </Card>))
      }

    </div>

  )
}

export default Column;