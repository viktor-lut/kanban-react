import {AppBar, Box, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";


function Column(props) {

  return (
   <div>
        <Typography
          component="h1"
          variant="h5"
          color="inherit"
          gutterBottom
        align="center">
          {props.status}
        </Typography>

        <ul>
          {
            props.list
              .filter(el => el.status === props.status)
              .map(el =>
                <li className="element" key={el._id}>
                  <Typography>
                    {(props.status !== props.statuses[0]) &&
                    <button onClick={() => props.onMoveCard(el._id, 'left')}>⇽</button>}
                    {el.name}
                    {(props.status !== props.statuses[props.statuses.length - 1]) &&
                    <button onClick={() => props.onMoveCard(el._id, 'right')}>⇾</button>}
                    {(props.status === props.statuses[props.statuses.length - 1]) &&
                    <button onClick={() => props.Delete(el._id)}>✘</button>}
                  </Typography>
                </li>)
          }
        </ul>
      </div>

  )
}

export default Column;