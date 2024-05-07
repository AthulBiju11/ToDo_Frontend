import React, { useState } from 'react';
import NavBar from './NavBar';
import '../styles/TodoListPage.css';

function TodoListPage() {
  const [todos, setTodos] = useState([]);
  const [newTodoText, setNewTodoText] = useState('');
  const [editTodoText, setEditTodoText] = useState('');
  const [editTodoId, setEditTodoId] = useState(null);

  const handleAddTodo = () => {
    if (newTodoText.trim() !== '') {
      setTodos([...todos, { id: Date.now(), text: newTodoText, completed: false }]);
      setNewTodoText('');
    }
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleToggleTodo = (id) => {
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    }));
  };

  const handleEditTodo = (id) => {
    const todo = todos.find(todo => todo.id === id);
    setEditTodoId(id);
    setEditTodoText(todo.text);
  };

  const handleSaveEditedTodo = () => {
    if (editTodoText.trim() !== '') {
      setTodos(todos.map(todo => {
        if (todo.id === editTodoId) {
          return { ...todo, text: editTodoText };
        }
        return todo;
      }));
      setEditTodoId(null);
      setEditTodoText('');
    }
  };

  return (
    <div className="todo-list-page">
      <NavBar />
      <div className="todo-container">
        <h1>Todo List</h1>
        <input
          type="text"
          placeholder="Add todo..."
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
        />
        <button onClick={handleAddTodo}>Add</button>
        <ul>
          {todos.map(todo => (
            <li key={todo.id}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggleTodo(todo.id)}
              />
              {editTodoId === todo.id ? (
                <input
                  type="text"
                  value={editTodoText}
                  onChange={(e) => setEditTodoText(e.target.value)}
                  onBlur={handleSaveEditedTodo}
                />
              ) : (
                <span className={todo.completed ? 'completed' : ''}>{todo.text}</span>
              )}
              <button onClick={() => handleEditTodo(todo.id)}>Edit</button>
              <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoListPage;
