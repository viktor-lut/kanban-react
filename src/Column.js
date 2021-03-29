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
import {v4 as uuidv4} from 'uuid';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {useTheme} from '@material-ui/core/styles';
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';


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

  },
  margin: {
    margin: theme.spacing(-1),
  },
  mainContent: {
    display: 'box',
    lineClamp: 1,
    boxOrient: 'vertical',
    overflow: 'hidden',
  },
  fab: {
    margin: theme.spacing(2),
  },
  absolute: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(3),
  },
}))

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

  //============dialog options========================
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  function handleClickOpen() {
    setOpen(true);
  }

  function handleCloseD() {
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
                <CardContent>
                  <Typography className={classes.mainContent}>
                    {el.name}
                  </Typography>
                  <Divider/>
                  <div style={{marginTop: 10}}>
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

                    <Tooltip title="View task">
                    <IconButton aria-label="view" className={classes.margin}>
                      <RemoveRedEyeIcon color="action" fontSize="small"
                                        onClick={handleClickOpen}/>
                    </IconButton>
                    </Tooltip>
                    <Dialog
                      fullScreen={fullScreen}
                      open={open}
                      onClose={handleCloseD}
                      aria-labelledby="responsive-dialog-title"
                    >
                      <DialogTitle id="responsive-dialog-title">{"INFORMATION OF TASK"}</DialogTitle>
                      <DialogContent>
                        <DialogContentText>
                          <Typography variant="h5" color="inherit">{el.name}</Typography><br/>
                          <Typography color="inherit"><i><u>{el.description}</u></i></Typography><br/>
                          <b>{`Priority: `}</b> <i>{el.priority}</i><br/>
                          <b>{`Status: `}</b> <i>{el.status}</i><br/>
                          {/*<b>{`ID: `}</b> <i>{el._id}</i><br/>*/}
                          <b>{`Create data: `}</b> <i>{el.createdAt}</i><br/>
                          <b>{`Udate data: `}</b> <i>{el.updatedAt}</i>
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        {/*<Button onClick={handleCloseD} color="primary">*/}
                        {/*  Disagree*/}
                        {/*</Button>*/}
                        <Button onClick={handleCloseD} color="primary" autoFocus>
                          Exit
                        </Button>
                      </DialogActions>
                    </Dialog>


                    <Link to={`/edit/${el._id}`}>
                      {/*<Button variant="contained" size="small" color="primary" className={classes.margin}*/}
                      {/*        style={{*/}
                      {/*          maxWidth: '30px',*/}
                      {/*          maxHeight: '30px',*/}
                      {/*          minWidth: '30px',*/}
                      {/*          minHeight: '30px'*/}
                      {/*        }}>✎</Button>*/}
                      <Tooltip title="Edit task">
                      <IconButton aria-label="edit" className={classes.margin}>
                        <EditIcon fontSize="small"/>
                      </IconButton>
                      </Tooltip>
                    </Link>


                    {(props.status === props.statuses[props.statuses.length - 1]) &&
                    // <Button variant="contained" size="small" color="secondary" className={classes.margin}
                    //         style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}}
                    //         onClick={() => {
                    //           props.setConfirmDiaqlog({
                    //             isOpen: true,
                    //             title: 'Are you sure to delete this record?',
                    //             subTitle: "You can't undo this operation",
                    //             onConfirm: () => {
                    //               props.Delete(el._id);
                    //             }
                    //           })
                    //           // props.Delete(el._id)
                    //         }}>✘</Button>}

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
                </CardContent>

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
              // </HtmlTooltip>
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