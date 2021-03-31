import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {useTheme} from '@material-ui/core/styles';
import {Link} from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
import axios from "axios";
import Typography from "@material-ui/core/Typography";

export default function Dialogv(props) {

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [card, setCard] = useState({
    name: '',
    description: '',
    priority: '',
    status: '',
    _id: '',
    createdAt: '',
    updatedAt: ''
  });

  useEffect(() => {
    axios({
      method: 'GET',
      url: `https://nazarov-kanban-server.herokuapp.com/card/${props.elId}`
    }).then(({data}) => {
      setCard(data)
    }).catch((err) => {
      console.log(err)
    })

  }, [props.elId]);

  return (
    <div>
      {/*<Button variant="outlined" color="primary" onClick={handleClickOpen}>*/}
      {/*  Open responsive dialog*/}
      {/*</Button>*/}
      <Dialog
        fullScreen={fullScreen}
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"INFORMATION OF TASK " + props.elId}</DialogTitle>
        <DialogContent>
              <DialogContentText>
                <Typography variant="h5" color="inherit">{card.name}</Typography><br/>
                <Typography color="inherit"><i><u>{card.description}</u></i></Typography><br/>
                <b>{`Priority: `}</b> <i>{card.priority}</i><br/>
                <b>{`Status: `}</b> <i>{card.status}</i><br/>
                {/*<b>{`ID: `}</b> <i>{card._id}</i><br/>*/}
                <b>{`Create data: `}</b> <i>{card.createdAt}</i><br/>
                <b>{`Udate data: `}</b> <i>{card.updatedAt}</i>
              </DialogContentText>
        </DialogContent>
        <DialogActions>

          <Link to={`/edit/${props.elId}`}>
            {<Tooltip title="Edit task">
              <Button color="primary">
                Edit
              </Button>
            </Tooltip>}
          </Link>
          <Button onClick={props.handleClose} color="primary" autoFocus>
            Exit
          </Button>


          {/*<Button onClick={props.handleClose} color="primary">*/}
          {/*  Disagree*/}
          {/*</Button>*/}
          {/*<Button onClick={props.handleClose} color="primary" autoFocus>*/}
          {/*  Agree*/}
          {/*</Button>*/}

        </DialogActions>
      </Dialog>
    </div>
  );
}