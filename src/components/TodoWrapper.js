import React, { useState,useEffect } from "react";
import { Todo } from "./Todo";
import { TodoForm } from "./TodoForm";
import { v4 as uuidv4 } from "uuid";
import { EditTodoForm } from "./EditTodoForm";
import '../styles/Todo.css'
import Navbar from "./NavBar";
import { useParams } from 'react-router-dom';
import client from './api/client';




export const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);
  const [datas,setData]=useState([]);
  const [uid,setUid]=useState('');
  const [userName,setUserName]=useState('');
  const [token,setToken]=useState('');

  const {id}=useParams;
  const projectId=useParams().id;

  const fetchAllProjects= async()=>{
    const tokens = JSON.parse(localStorage.getItem('token'))
    try{
      console.log("token",token);
      console.log('projectid',projectId);
      const response = await client.get(`project/${projectId}`,
      {
          headers: {
              Authorization: `Bearer ${tokens}`
            }
      }
      ) 
      if (response.data){
        const updatedTodos = response.data.todoList.map(todo => ({
          ...todo,
          isEditing: false  // Adding the isEditing field with a default value
      }));
      setTodos(updatedTodos);
        // setTodos(response.data.todoList);
        console.log("todo data ",todos);
        console.log(response.data.todoList);
      }
  } catch(error){
      console.log("Error in creating project: ",error);
  }
  }
  useEffect(()=>{
    
    setUid(JSON.parse(localStorage.getItem('uid')));
    setUserName(JSON.parse(localStorage.getItem('userName')));
    setToken(JSON.parse(localStorage.getItem('token')));

    

    fetchAllProjects();

  },[])
  

  const addTodo =async (todo) => {
    // setTodos([
    //   ...todos,
    //   { id: uuidv4(), task: todo, completed: false, isEditing: false },
    // ]);
    
    console.log(todo);
    try{
      console.log("token",token);
      console.log('projectid',projectId);
      const response = await client.post("/todo/create", {
         
        projectId: projectId,
        description:'',
        title: todo
      },
      {
          headers: {
              Authorization: `Bearer ${token}`
            }
      }
      ) 
      if (response.data){
       fetchAllProjects();
      }
  } catch(error){
      console.log("Error in creating project: ",error);
  }

  }

  const deleteTodo = async (id) =>{
    console.log("delete");
    try{
     console.log("delete",token);
     const response = await client.delete(`todo/delete/${id}`,
      {
          headers: {
              Authorization: `Bearer ${token}`
            }
      }
      )  
      if (response.data){
       fetchAllProjects();
      }
  } catch(error){
      console.log("Error in deleting project: ",error);
  }
  }
  //  setTodos(todos.filter((todo) => todo.id !== id));

  const toggleComplete = async (id) => {
    // setTodos(
    //   todos.map((todo) =>
    //     todo.id === id ? { ...todo, completed: !todo.completed } : todo
    //   )
    // );
    const tokens = JSON.parse(localStorage.getItem('token'))
    try{
      console.log("token",token);
      console.log('projectid',projectId);

      const response = await client.post(`todo/status/${id}`,
      {
          headers: {
              Authorization: `Bearer ${token}`
            }
      }
      )  
      if (response.data){
       fetchAllProjects();
      }
  } catch(error){
      console.log("Error in updating task: ",error);
  }

  }

  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  }

  const editTask =async (task, id) => {
    // setTodos(
    //   todos.map((todo) =>
    //     todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
    //   )
    // );
    
    try{
      console.log("token",token);
      console.log('projectid',projectId);

      const response = await client.post(`/todo/update/${id}`, {
         
        title: task,
        description:'',
        projectId: projectId,
        
        
      },
      {
          headers: {
              Authorization: `Bearer ${token}`
            }
      }
      ) 
      if (response.data){
       fetchAllProjects();
      }
  } catch(error){
      console.log("Error in updating task: ",error);
  }

  };
  return (
    <div className="" >
      <Navbar username={userName} />    <div className="try">
      <div className="TodoWrapper">
      <h1>Get Things Done !</h1>
      <TodoForm addTodo={addTodo} />
      {/* display todos */}
      {todos.map((todo) =>
        todo.isEditing ? (
          <EditTodoForm editTodo={editTask} task={todo} />
        ) : (
          <Todo
            key={todo.id}
            task={todo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
            toggleComplete={toggleComplete}
          />
        )
      )}
      </div>
    </div>
    </div>
  );
};
