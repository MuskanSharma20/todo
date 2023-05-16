import React, { useState, useEffect } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import Todo from './components/todoList';
import todoImg from './images/todo.png';
import './index.css'



function App() {
  const [todos, setTodos] = useState([]);  
  const [newTodo, setNewTodo] = useState('');  



  //creating todo item
  function addTodoItem() {
    const todoItem = { todoItem: newTodo };
    console.log(todoItem);
    fetch('http://localhost:5001/api/create_item/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(todoItem)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('data sent to backend');
        setTodos([...todos, data]);
        setNewTodo(''); // clear the input field
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
      window.location.reload();
  }

  //fetch data
  useEffect(() => {
    fetch('http://localhost:5001/api/items/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('data fetched from backend');
        setTodos(data.todoItem);
        console.log(data.todoItem);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }, []);

  return (
    <div className='bg h-screen flex w-screen p-4 bg-gradient-to-r from-[#020024] to-[#090979] to-[#00d4ff]'>
<div className=" bgImage content-center  max-w-[400px] w-full m-auto rounded-md ">
  <img src={todoImg} alt="not found" />
</div>

      <div className='container bg-slate-100 max-w-[600px] w-full m-auto rounded-md shadow-xl p-4'>
        <h3 className='text-3xl font-bold text-center p-2'>Todos</h3>
        <form className='flex justify-between'>
          <input className='border  rounded-lg p-2 w-full text-xl' type='text' placeholder='Add Your Todo Here...' value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
          <button className='border rounded-lg p-5 ml-3 bg-blue-500' type='button' onClick={addTodoItem}> <AiOutlinePlus size={30} /></button>
        </form>
        <div className='todoList' style={{ maxHeight: '400px', overflow: 'scroll' }}>
  <ul>
    {todos.map((todo) => (
      <Todo key={todo.id} todo={todo} />
    ))}
  </ul>
</div>

        <p className='counter text-center p-2   ' >
          You Have {todos.length} todos
        </p>
      </div>
  
    </div>
  );
}

export default App;

