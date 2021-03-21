import {useEffect} from "react";
import axios from "axios";
import {useState} from "react";
import Column from "./Column";
import Header from "./Header";


function App() {

  const [list, setList] = useState([])
  const [flag, setFlag] = useState(true)
  const statuses = ['todo', 'progress', 'review', 'done']

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

//===========================================================
  const onMoveCard = (id, direction) => {
    let currtStatus = (list.find(el => el._id === id)).status;
    console.log(currtStatus);
    let corrector = direction==='right' ? +1 : -1;
    let nextStatus = statuses[statuses.indexOf(currtStatus) + corrector];

    // const newList = list.map(el => el._id === id ? ({...el, status: nextStatus}) : el);
    // setList(newList);

    let data = JSON.stringify({"status": nextStatus});
    let config = {
      method: 'patch',
      url: `https://nazarov-kanban-server.herokuapp.com/card/${id}`,
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

  //=======================================================
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

  //////////////////////////////////////////////////
  return (
    <div>

      <Header />

       <div className="columns">
        {statuses.map(el =>
        <Column key={statuses.indexOf(el)}
          list={list}
          status={el}
                onMoveCard={onMoveCard}
                Delete={Delete}
          />
        )}

      </div>


    </div>
  );
}

export default App;
