import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Box, FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import axios from "axios";
import {Link} from "react-router-dom";
import {Redirect, withRouter} from 'react-router';




const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),

  },
  submit: {
    margin: theme.spacing(2, 0, 1),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  box: {
    border: 1,
    borderColor: "Gainsboro",
    borderRadius: 8,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    padding: '20px 20px 20px 20px',
    backgroundColor: "white"
  }
}));

//====================================================

function CreateCardForm(props) {

  const classes = useStyles();


  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskPriority, setTaskPriority] = useState("1");
  const [taskStatus, setTaskStatus] = useState("todo");

  const onChange = (e) => {
    const name = e.target.name;
    switch(name) {
      case "name": setTaskName(e.target.value);
        break;
      case "description": setTaskDescription(e.target.value);
        break;
      case "priority": setTaskPriority(e.target.value);
        break;
      case "status": setTaskStatus(e.target.value);
        break;
      default: setTaskStatus(e.target.value);
        break;

    }
  };

  // const goEct = () => {
  //   return <Redirect to="/kanban"/>;
  // }

  const addToList = () => {
    axios.post('https://nazarov-kanban-server.herokuapp.com/card', {
      _id: Math.random(),
      name: taskName,
      description: taskDescription,
      priority: taskPriority,
      status: taskStatus,
    }).then((res) => {
      console.log(res.data);
      props.getCards();
      console.log('Task is added');
      // customHistory.push("/kanban")
    }).catch((err) => {
      console.log(err)
    })
  };

  const [saveToggle, setSaveToggle] = useState(false)
  const saveButtonHandler = () => {
    setSaveToggle(true);
    addToList();
  }

  ///////////////////////////////////////////
  return (
    <div>
      {/*<Header />*/}
      <br/>
      <Container maxWidth="xs">
        <CssBaseline />
        <Box className={classes.box} >
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              Crete New Task
            </Typography>
            <form className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="name"
                    defaultValue="New task"
                    name="name"
                    variant="outlined"
                    required
                    fullWidth
                    id="name"
                    label="Card Name"
                    autoFocus
                    onChange={onChange}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    name="description"
                    id="description"
                    label="Description"
                    multiline
                    rows={4}
                    defaultValue="Description"
                    variant="outlined"
                    required
                    fullWidth
                    onChange={onChange}
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label">Priority</InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      name="priority"
                      defaultValue="1"
                      value={taskPriority}
                      onChange={onChange}
                      label="Priority"

                    >
                      <MenuItem value={"1"}>1</MenuItem>
                      <MenuItem value={"2"}>2</MenuItem>
                      <MenuItem value={"3"}>3</MenuItem>
                      <MenuItem value={"4"}>4</MenuItem>
                      <MenuItem value={"5"}>5</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label">Status</InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={taskStatus}
                      onChange={onChange}
                      label="Status"
                      name="status"
                      defaultValue="todo"
                    >
                      {/*<MenuItem value="">*/}
                      {/*  <em>None</em>*/}
                      {/*</MenuItem>*/}
                      <MenuItem value={'todo'}>Todo</MenuItem>
                      <MenuItem value={'progress'}>Progress</MenuItem>
                      <MenuItem value={'review'}>Review</MenuItem>
                      <MenuItem value={'done'}>Done</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={6}>
                  <div>
                    {/*<Link to="/kanban">*/}
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={saveButtonHandler}
                        // onClick={() => props.addToList(taskName, taskDescription, taskPriority, taskStatus)}
                        // onClick={addToList}
                      >
                        Create new task
                      </Button>
                    {saveToggle && <Redirect to="/kanban"/>}
                    {/*</Link>*/}

                    <Link to="/kanban">
                      <Button
                        type="cancel"
                        fullWidth
                        variant="contained"
                        color="secondary"
                        className={classes.cancel}
                      >
                        Cancel and exit
                      </Button>
                    </Link>
                  </div>
                </Grid>

              </Grid>
            </form>
          </div>
        </Box>
      </Container>
    </div>
  );
}

export default withRouter(CreateCardForm);