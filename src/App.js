import {useEffect} from "react";
import axios from "axios";
import {useState} from "react";
import Column from "./Column";


function App() {

  const [list, setList] = useState([])

  useEffect(() => {

    console.log('GET ALL CARDS')

    axios({
      metod: 'GET',
      url: 'https://nazarov-kanban-server.herokuapp.com/card'
    }).then(res => {
      console.log(res.data)
      setList(res.data)
    }).catch(err => {
      console.log(err);
      }
    )

      return () => {}
    }, []);

  const onMoveRight = (id) => {

    let currtStatus = (list.find(el => el._id === id)).status;
    // console.log('===== ' + currtStatus)
    let nextStatus;
    if(currtStatus === 'todo') nextStatus = 'progress'
    if(currtStatus === 'progress') nextStatus = 'review'
    if(currtStatus === 'review') nextStatus = 'done'

    const newList = list.map(el => el._id === id ? ({...el, status: nextStatus}) : el);
    setList(newList);
  }

  const onMoveLeft = (id) => {
    let currtStatus = (list.find(el => el._id === id)).status;
    // console.log('===== ' + currtStatus)
    let prevStatus;
    if(currtStatus === 'progress') prevStatus = 'todo'
    if(currtStatus === 'review') prevStatus = 'progress'
    if(currtStatus === 'done') prevStatus = 'review'

    const newList = list.map(el => el._id === id ? ({...el, status: prevStatus}) : el);
    setList(newList);
  }

  const Delete = (id) => {

    const newList = list.filter(el => el._id !== id);
    setList(newList);
    // updateLocalStorage(newList);
  };

  return (
    <div className="App">



      <div className="columns">
        <Column list={list} status='todo' onMoveLeft={onMoveLeft} onMoveRight={onMoveRight}/>
        <Column list={list} status='progress' onMoveLeft={onMoveLeft} onMoveRight={onMoveRight}/>
        <Column list={list} status='review' onMoveLeft={onMoveLeft} onMoveRight={onMoveRight}/>
        <Column list={list} status='done' onMoveLeft={onMoveLeft} onMoveRight={onMoveRight} Delete={Delete}/>
      </div>



    </div>
  );
}

export default App;
