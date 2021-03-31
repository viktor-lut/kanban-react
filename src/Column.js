import React from 'react';
import {Card, CardActions, CardContent, Divider, IconButton, Typography} from "@material-ui/core";
// import MoreVertIcon from '@material-ui/icons/MoreVert';
import {withStyles, makeStyles} from "@material-ui/core/styles";
// import Menu from '@material-ui/core/Menu';
// import MenuItem from '@material-ui/core/MenuItem';
import {useState} from "react";
import {Link} from "react-router-dom";
import Tooltip from '@material-ui/core/Tooltip';
// import Button from '@material-ui/core/Button';
import ConfirmDialog from "./ConfirmDialog";
import {v4 as uuidv4} from 'uuid';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';
import Dialogv from './Dialogv'


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: '14px 4px 10px 4px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  card: {
    display: "flex",
    backgroundColor: "#f5f5f5",
    marginTop: '12px',
    width: "95%",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 6

  },
  margin: {
    margin: theme.spacing(-1),
  },
  mainContent: {
    display: 'box',
    lineClamp: 1,
    boxOrient: 'vertical',
    overflow: 'hidden',
    padding: "4px 4px 4px 4px",
    maxWidth: 202,

  },
  fab: {
    margin: theme.spacing(2),
  },
  absolute: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(3),
  },
  cardac: {
    marginTop: "2px",
    marginBottom: "2px",
    maxWidth: '60px',
    display: "flex",
   justifyContent: "flex-end"
  }
}))

//========================================================//

function Column(props) {
  const classes = useStyles()

  const sortCollumn = (a, b) => {
    return a.priority - b.priority;
  }

  //============dialog options========================
  const [open, setOpen] = useState(false);
  const [elId, setElId] = useState('');

  const handleClickOpen = (eid) => {
    setOpen(true);
    setElId(eid)
  };

  function handleClose() {
    setOpen(false);
  }

  //====================================

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
        {props.status.[0].toUpperCase() + props.status.slice(1)}
      </Typography>

      {
        props.list
          .filter(el => el.status === props.status)
          .sort(sortCollumn)
          .map((el) => (
              <Card
                className={classes.card} key={uuidv4()}>
                {/*<CardContent>*/}
                  <Typography className={classes.mainContent}>
                    {el.name}
                  </Typography>
                  <Divider/>
                {/*</CardContent>*/}

                {/*<CardActions>*/}
                  <div className={classes.cardac}>
                    {(props.status !== props.statuses[0]) &&
                    // <Button variant="outlined" size="small" color="primary" className={classes.margin}
                    //         style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}}
                    //         onClick={() => props.onMoveCard(el._id, 'left')}>⇽</Button>}
                    <Tooltip title="Move left">
                      <IconButton aria-label="back" className={classes.margin}>
                        <ArrowBackIcon fontSize="small"
                                       onClick={() => props.onMoveCard(el._id, 'left')}
                        />
                      </IconButton>
                    </Tooltip>
                    }

                    {(props.status !== props.statuses[props.statuses.length - 1]) &&
                    // <Button variant="outlined" size="small" color="primary" className={classes.margin}
                    //         style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}}
                    //         onClick={() => props.onMoveCard(el._id, 'right')}>⇾</Button>}
                    <Tooltip title="Move right">
                      <IconButton aria-label="forvar" className={classes.margin}>
                        <ArrowForwardIcon fontSize="small"
                                          onClick={() => props.onMoveCard(el._id, 'right')}
                        />
                      </IconButton>
                    </Tooltip>
                    }

                    {<Tooltip title="View task">
                      <IconButton aria-label="view" className={classes.margin}>
                        <RemoveRedEyeIcon color="action" fontSize="small"
                                          onClick={()=>handleClickOpen(el._id)}/>
                      </IconButton>
                    </Tooltip>}

                  {(props.status === props.statuses[props.statuses.length - 1]) &&
                  <Tooltip title="Delete task">
                    <IconButton aria-label="delete" className={classes.margin}>
                      <DeleteIcon color="action" fontSize="small"
                                  onClick={() => {
                                    props.setConfirmDiaqlog({
                                      isOpen: true,
                                      title: 'Are you sure to delete this record?',
                                      subTitle: "You can't undo this operation",
                                      onConfirm: () => {
                                        props.Delete(el._id);
                                      }
                                    })

                                  }}
                      />
                    </IconButton>
                  </Tooltip>
                  }
                  </div>

                {/*</CardActions>*/}
              </Card>

            )
          )
      }
      <ConfirmDialog
        confirmDialog={props.confirmDialog}
        setConfirmDialog={props.setConfirmDiaqlog}
      />
      <Dialogv
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        open={open}
        elId={elId}
      />
    </div>

  )
}

export default Column;