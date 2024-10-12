import { useEffect } from 'react';
import React, { useState } from 'react';
import '/src/styles/index.css'

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleAddTask = (e) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      setTasks([...tasks, inputValue]);
      console.log(inputValue);
      
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                "label": inputValue,
                "is_done": false
             })
        };
        fetch('https://playground.4geeks.com/todo/todos/diegocruzzz', requestOptions)
            .then(response => response.json())
            .then(data => console.log(data.id));

     setInputValue('');
    }
  };

  const handleDeleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);

    fetch('https://playground.4geeks.com/todo/users/diegocruzzz')
      .then(response => response.json())
      .then(data => {
        console.log(data.todos[index].id);
        let idToDelete = data.todos[index].id;
        
        fetch('https://playground.4geeks.com/todo/todos/'+idToDelete, { method: 'DELETE' })
        .then(response => console.log("Se borro " + idToDelete));
      });
  };

  const handleDeleteList = () => {
    setTasks([]);
    async function deletePost() {
      await fetch('https://playground.4geeks.com/todo/users/diegocruzzz', { method: 'DELETE' })
      .then(response => console.log("Se borro toda la lista"));

    const raw = "";

    const requestOptions = {
      method: "POST",
      body: raw,
      redirect: "follow"
    };

    await fetch("https://playground.4geeks.com/todo/users/diegocruzzz", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  }

  deletePost();
    
   
  }

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      <h2>To-Do List</h2>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleAddTask}
        placeholder="Nueva tarea..."
        style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
      />
      <ul style={{ listStyleType: 'none', padding: '0' }}>
        {tasks.map((task, index) => (
          <li key={index} style={{ position: 'relative', padding: '10px', border: '1px solid black', borderRadius: '4px' }} className="d-flex justify-content-between">
            <p>{task}</p>
            <button onClick={() => handleDeleteTask(index)} className="delete-icon" type="button" class="btn btn-danger">X</button>
          </li>
        ))}
      </ul>
      <button onClick={() => handleDeleteList()} type="button" className="btn btn-danger">Borrar lista</button>
    </div>
  );
};

export default TodoList;