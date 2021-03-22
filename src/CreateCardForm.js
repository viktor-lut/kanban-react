import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {MenuItem} from "@material-ui/core";

const currencies = [
  {
    value: '1',
    label: '1',
  },
  {
    value: '2',
    label: '2',
  },
  {
    value: '3',
    label: '3',
  },
  {
    value: '4',
    label: '4',
  },
  {
    value: '5',
    label: '5',
  },
];

const currenciesS = [
  {
    value: 'todo',
    label: 'todo',
  },
  {
    value: 'progress',
    label: 'progress',
  },
  {
    value: 'review',
    label: 'review',
  },
  {
    value: 'done',
    label: 'done',
  }
];

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
}));

export default function CreateCardForm() {
  const classes = useStyles();
  const [currency, setCurrency] = useState('1');

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Crete Card Form
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} >
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="Card Name"
                autoFocus
              />
            </Grid>

            <Grid item xs={12} >
            <TextField
              id="description"
              label="Description"
              multiline
              rows={4}
              defaultValue="Description"
              variant="outlined"
              required
              fullWidth
            />
            </Grid>

            <Grid item xs={12}>
              <TextField
                id="outlined-select-currency"
                select
                label="Priority"
                value={currency}
                onChange={handleChange}
                helperText="Please select priority of new task"
                variant="outlined"
              >
                {currencies.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="status"
                label="Status"
                name="status"
                autoComplete="todo"
              />
            </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Create new task
          </Button>

          <Button
            type="cancel"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.cancel}
          >
            Cancel and exit
          </Button>
          </Grid>
        </form>
      </div>

    </Container>
  );
}
