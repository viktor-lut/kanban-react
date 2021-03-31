import React, {useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import {Link} from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";

export default function Dialogv(props) {
  // const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));


  // const handleClickOpen = () => {
  //   setOpen(props.open);
  // };
  //
  // function handleClose() {
  //   setOpen(false);
  // }

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
        <DialogTitle id="responsive-dialog-title">{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Let Google help apps determine location. This means sending anonymous location data to
            Google, even when no apps are running.
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