import React from 'react';
import {Card, CardActions, CardContent, Divider, IconButton, Typography} from "@material-ui/core";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {withStyles, makeStyles} from "@material-ui/core/styles";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {useState} from "react";
import {Link} from "react-router-dom";
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import ConfirmDialog from "./ConfirmDialog";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,

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
  margin: {
    margin: theme.spacing(0.1),
  },
}))

const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: '#ffffff',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(13),
    border: '1px solid #dadde9',
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

  const sortCollumn = (a, b) => {
    return a.priority - b.priority;
  }


  //////////////////////////////////////
  return (
    <div style={{boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)'}} className={classes.root}>
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
          .sort(sortCollumn)
          .map((el) => (
              <HtmlTooltip placement="bottom-start" title={
                <React.Fragment>
                  <Typography color="inherit">DESCRIPTION: {el.description}</Typography>
                  <b>{`Priority: ${el.priority}`}</b>
                </React.Fragment>
              }>
                <Card
                  className={classes.card} key={el._id}>
                  <CardContent>
                    <Typography>
                      {el.name}
                    </Typography>
                    <Divider/>
                    {/*{el._id}<br/>*/}
                    {/*<Typography variant="body2" color="textPrimary" margin-left="10px">*/}
                    {/*{el.description}<br/>*/}
                    <div style={{marginTop: 10}}>
                      {(props.status !== props.statuses[0]) &&
                      <Button variant="outlined" size="small" color="primary" className={classes.margin}
                              style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}}
                              onClick={() => props.onMoveCard(el._id, 'left')}>⇽</Button>}

                      {(props.status !== props.statuses[props.statuses.length - 1]) &&
                      <Button variant="outlined" size="small" color="primary" className={classes.margin}
                              style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}}
                              onClick={() => props.onMoveCard(el._id, 'right')}>⇾</Button>}

                      <Link to={`/edit/${el._id}`}>
                        <Button variant="contained" size="small" color="primary" className={classes.margin}
                                style={{
                                  maxWidth: '30px',
                                  maxHeight: '30px',
                                  minWidth: '30px',
                                  minHeight: '30px'
                                }}>✎</Button>
                      </Link>

                      {(props.status === props.statuses[props.statuses.length - 1]) &&
                      <Button variant="contained" size="small" color="secondary" className={classes.margin}
                              style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}}
                              onClick={() => {
                                props.setConfirmDiaqlog({
                                  isOpen: true,
                                  title: 'Are you sure to delete this record?',
                                  subTitle: "You can't undo this operation",
                                  onConfirm: () => {
                                    props.Delete(el._id);
                                  }
                                })
                                // props.Delete(el._id)
                              }}>✘</Button>}
                      {/*</Typography>*/}
                    </div>
                  </CardContent>
                  {/*</HtmlTooltip>*/}

                  <CardActions>
                    <IconButton
                      aria-label="display more actions" edge="end" color="inherit"
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
                      {/*<MenuItem>{el._id}</MenuItem>*/}
                      <MenuItem disabled={props.status === props.statuses[0]} onClick={() => {
                        console.log(el._id);
                        props.onMoveCard(el._id, 'left');
                        handleClose();
                      }}>⇽ Move Left </MenuItem>
                      <MenuItem disabled={props.status === props.statuses[props.statuses.length - 1]} onClick={() => {
                        props.onMoveCard(el._id, 'right');
                        handleClose();
                      }}>⇾ Move Right</MenuItem>
                      <Link to={`/edit/${el._id}`}>
                        <MenuItem onClick={handleClose}>✎ Edit</MenuItem>
                      </Link>
                      <MenuItem disabled={props.status !== props.statuses[props.statuses.length - 1]} onClick={() => {
                        props.setConfirmDiaqlog({
                          isOpen: true,
                          title: 'Are you sure to delete ALL records?',
                          subTitle: "You can't undo this operation",
                          onConfirm: () => {
                            props.Delete(el._id);
                          }
                        })
                        // props.Delete(el._id);
                        handleClose()
                      }}>✘
                        Delete</MenuItem>
                    </Menu>
                  </CardActions>
                </Card>
              </HtmlTooltip>
            )
          )
      }
      <ConfirmDialog
        confirmDialog={props.confirmDialog}
        setConfirmDialog={props.setConfirmDiaqlog}
      />
    </div>

  )
}

export default Column;