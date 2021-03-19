import {useEffect} from "react";
import axios from "axios";
import {useState} from "react";
import Column from "./Column";


function App() {

  const [list, setList] = useState([])
  const [flag, setFlag] = useState(true)


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
      })

    }, [flag]);


  const onMoveRight = (id) => {
    let currtStatus = (list.find(el => el._id === id)).status;
    console.log('===== ' + flag)
    let nextStatus;
    if(currtStatus === 'todo') nextStatus = 'progress'
    if(currtStatus === 'progress') nextStatus = 'review'
    if(currtStatus === 'review') nextStatus = 'done'

    // const newList = list.map(el => el._id === id ? ({...el, status: nextStatus}) : el);
    // setList(newList);

    let data = JSON.stringify({"status": nextStatus});
    let config = {
      method: 'patch',
      url: 'https://nazarov-kanban-server.herokuapp.com/card/' + id,
      headers: {
        'Content-Type': 'application/json'
      },
      data : data
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        const newFlaf = !flag
        setFlag(newFlaf)
      })
      .catch(function (error) {
        console.log(error);
      });

  }

  const onMoveLeft = (id) => {
    let currtStatus = (list.find(el => el._id === id)).status;
    // console.log('===== ' + currtStatus)
    let prevStatus;
    if(currtStatus === 'progress') prevStatus = 'todo'
    if(currtStatus === 'review') prevStatus = 'progress'
    if(currtStatus === 'done') prevStatus = 'review'

    // const newList = list.map(el => el._id === id ? ({...el, status: prevStatus}) : el);
    // setList(newList);

    let data = JSON.stringify({"status": prevStatus});
    let config = {
      method: 'patch',
      url: 'https://nazarov-kanban-server.herokuapp.com/card/' + id,
      headers: {
        'Content-Type': 'application/json'
      },
      data : data
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        const newFlaf = !flag
        setFlag(newFlaf)
      })
      .catch(function (error) {
        console.log(error);
      });

  }

  const Delete = (id) => {
    // const newList = list.filter(el => el._id !== id);
    // setList(newList);
    let config = {
      method: 'delete',
      url: 'https://nazarov-kanban-server.herokuapp.com/card/' + id,
      headers: {}
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        const newFlaf = !flag
        setFlag(newFlaf)
      })
      .catch(function (error) {
        console.log(error);
      });


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
