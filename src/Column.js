import {Card, CardActions, CardContent, Divider, IconButton, Typography} from "@material-ui/core";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {withStyles, makeStyles} from "@material-ui/core/styles";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {useState} from "react";
import {Link} from "react-router-dom";
import Tooltip from '@material-ui/core/Tooltip';


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
    alignItems: "center",
  },

}))

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 14,
  },
}))(Tooltip);

//========================================================//

function Column(props) {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  //////////////////////////////////////
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

            <Card
              className={classes.card} key={el._id}>
              <LightTooltip title={`DESCRIPTION: ${el.description}`} >
              <CardContent>
                <Typography>
                  {el.name}
                </Typography>
                <Divider />
                <Typography variant="body2" color="textPrimary" margin-left="10px">
                  {/*{el.description}<br/>*/}
                  {(props.status !== props.statuses[0]) &&
                  <button onClick={() => props.onMoveCard(el._id, 'left')}>⇽</button>}

                  {(props.status !== props.statuses[props.statuses.length - 1]) &&
                  <button onClick={() => props.onMoveCard(el._id, 'right')}>⇾</button>}
                  <Link to= {`/edit/${el._id}`}>
                    <button >✎</button>
                  </Link>
                  {(props.status === props.statuses[props.statuses.length - 1]) &&
                  <button onClick={() => props.Delete(el._id)}>✘</button>}

                </Typography>
              </CardContent>
              </LightTooltip>
              <CardActions>

                <IconButton
                  aria-label="more"
                  aria-controls="long-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  <MoreVertIcon/>
                </IconButton>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem>{el._id}</MenuItem>
                  <MenuItem disabled={props.status === props.statuses[0]} onClick={() => {
                    console.log(el._id);
                    props.onMoveCard(el._id, 'left');
                    handleClose();
                  }}>⇽ Move Left </MenuItem>
                  <MenuItem disabled={props.status === props.statuses[props.statuses.length - 1]} onClick={() => {
                    props.onMoveCard(el._id, 'right');
                    handleClose();
                  }}>⇾ Move Right</MenuItem>
                  <MenuItem disabled={props.status !== props.statuses[0]} onClick={handleClose}>✎ Edit</MenuItem>
                  <MenuItem disabled={props.status !== props.statuses[props.statuses.length - 1]} onClick={handleClose}>✘
                    Delete</MenuItem>
                </Menu>
              </CardActions>
            </Card>))

      }

    </div>

  )
}

export default Column;