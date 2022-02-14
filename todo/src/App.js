import React from 'react';
import './App.css';
import Todos from './Todo.jsx'

function App() {
  const todoItems = [];
  todoItems.push({index: 1, value: "learn react", done: false});
  todoItems.push({index: 2, value: "Go shopping", done: true});
  todoItems.push({index: 3, value: "buy flowers", done: true});

  return (
    <Todos initItems={todoItems}/>
  );
}

export default App;
