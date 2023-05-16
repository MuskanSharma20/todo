import React, { useState } from 'react'
import { FaRegTrashAlt } from 'react-icons/fa'
import { FaEdit } from 'react-icons/fa'
import { FaCheck } from 'react-icons/fa';



const style = {
  li: `flex justify-between bg-slate-200 p-4 my-2 capitalize rounded-lg`,
  liComplete: `flex justify-between bg-slate-400 p-4 my-2 capitalize`,
  row: `flex`,
  text: `ml-2 cursor-pointer `,
  textComplete: `ml-2 cursor-pointer line-through`,
}

const Todo = ({ todo }) => {

  const [editingMode, setEditingMode] = useState(false);
  const [updateTodoItem, setUpdatedTodoItem] = useState(todo.todoItem);
  const [checked, setChecked] = useState(false);


  const update = (id) => {
    console.log('update clicked')
    console.log(todo.todoItem)
    console.log(updateTodoItem)
    console.log(id)


    fetch(`http://localhost:5001/api/update_item`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                id:id,
                todoItem: updateTodoItem,
                
              }),
            })
             .then((response) => {
      if (response.ok) {
        console.log('Todo item updated on the server')
        setEditingMode(false)
        setUpdatedTodoItem({...todo, todoItem: updateTodoItem})

      } else {
        console.log('Error updating todo item on the server')
      }
    })
    .catch((error) => {
      console.error('Error updating todo item on the server:', error)
    })
    window.location.reload();
}




  function delItem(id) {
    console.log('del clicked')
    console.log(id);
    fetch('http://localhost:5001/api/delete_item/', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ _id: id })
    })
      .then((response) => {
        if (response.ok) {
          console.log('Event data deleted at backend');
        } else {
          console.error('Failed to delete event data:', response.statusText);
        }
      })
      .catch((error) => {
        console.error('Failed to delete event data:', error);
      });
    window.location.reload();
  };


  return (

    <div>
      {editingMode ?
       
<li className={style.li}>
<div className={style.row}>
  <input type='text' value={updateTodoItem} onChange={(e) => setUpdatedTodoItem(e.target.value)} />
</div>
<div className='btns  flex ' >
  <button className='cursor-pointer flex items-center ml-2' onClick={() => update(todo._id)} >  <FaCheck /></button>
</div>
</li>
        :
        <li className={style.li}>
        <div className={style.row}>
          <input type="checkbox" checked={checked} onChange={() => setChecked(!checked)} />
          <p className={checked ? style.textComplete : style.text} >{todo.todoItem}</p>
        </div>
        <div className='btns  flex ' >
        {!checked && (
              <button className='cursor-pointer flex items-center' onClick={() => setEditingMode(true)}>
                <FaEdit />
              </button>
            )}
         <button className='cursor-pointer ml-2 flex items-center' onClick={() => { delItem(todo._id) }}>{<FaRegTrashAlt />}</button>

                  </div>
      </li>

      }



    </div>
  )
}

export default Todo;



