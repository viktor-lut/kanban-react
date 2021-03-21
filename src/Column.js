function Column(props) {

  return <div className='task-column'>

    <h1>{props.status}</h1>

    <ul>
      {
        props.list
          .filter(el => el.status === props.status)
          .map(el =>
            <li className="element" key={el._id}>
              {(props.status !== 'todo') && <button onClick={() => props.onMoveCard(el._id, 'left')}>{'<'}</button>}
              {el.name}
              {(props.status !== 'done') && <button onClick={() => props.onMoveCard(el._id, 'right')}>{'>'}</button>}
              {(props.status === 'done') && <button onClick={() => props.Delete(el._id)}>X</button>}
            </li>)
      }
    </ul>

  </div>
}

export default Column;