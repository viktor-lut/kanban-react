import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import axios from "axios";
import {Link} from "react-router-dom";
import { withRouter } from 'react-router';


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
}));

//===================================================

function EditCardForm(props) {
  const classes = useStyles();

  const [card, setCard] = useState({
    name: '',
    description: '',
    priority: '',
    status: ''
  });

  useEffect(() => {
    axios({
      method: 'GET',
      url: `https://nazarov-kanban-server.herokuapp.com/card/${props.match.params.cardId}`
    }).then(({ data }) => {
      setCard(data);
    });

  }, [props.match.params.cardId]);

  const onChange = e => {
    const name = e.target.name;
    let newCount;
    switch(name) {
      case "name":        newCount = {...card, name: e.target.value};
        setCard(newCount);
        break;
      case "description": newCount = {...card, description: e.target.value};
        setCard(newCount);
        break;
      case "priority":    newCount = {...card, priority: e.target.value};
        setCard(newCount);
        break;
      case "status":      newCount = {...card, status: e.target.value};
        setCard(newCount);
        break;
      default:
        setCard("");
        break;
    }
  };


  const updateTask = () =>{
    axios.patch(`https://nazarov-kanban-server.herokuapp.com/card/${props.match.params.cardId}`,{
        name: card.name,
        description: card.description,
        priority: card.priority,
        status: card.status,
      }
    ).catch (error =>  console.log('error'))
  };

  ///////////////////////////////////////////
  return (
    <div>
      {/*<Header />*/}
      <br/>
      <Container maxWidth="xs">
        <CssBaseline/>
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Edit Task
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="name"
                  value={card.name}
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
                  value={card.description}
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
                    value={card.priority}
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
                    value={card.status}
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
              <div>
                <Link to="/kanban">
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    // onClick={() => props.addToList(taskName, taskDescription, taskPriority, taskStatus)}
                    onClick={updateTask}

                  >
                    Update task
                  </Button>
                </Link>


                <Link to="/home">
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
          </form>
        </div>

      </Container>
    </div>
  );
}

export default withRouter(EditCardForm);