import React, { useState, useEffect } from "react";
import { Todo } from "./Todo";
import { TodoForm } from "./TodoForm";
import { v4 as uuidv4 } from "uuid";
import { EditTodoForm } from "./EditTodoForm";
import '../styles/Todo.css'
import Navbar from "./NavBar";
import { useParams } from 'react-router-dom';
import client from './api/client';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AddProjectModal from "./AddProjectModal";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';





export const TodoWrapper = () => {

  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [todos, setTodos] = useState([]);
  const [datas, setData] = useState([]);
  const [uid, setUid] = useState('');
  const [userName, setUserName] = useState('');
  const [token, setToken] = useState('');
  const [projectName,setProjectname]=useState('');
  const [action,setAction]=useState('');

  const { id } = useParams;
  const projectId = useParams().id;


  const openModal = (value) => {
    setIsModalOpen(true);
    setAction(value);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const fetchAllProjects = async () => {
    const tokens = JSON.parse(localStorage.getItem('token'))
    try {
      console.log("token", token);
      console.log('projectid', projectId);
      const response = await client.get(`project/${projectId}`,
        {
          headers: {
            Authorization: `Bearer ${tokens}`
          }
        }
      )
      if (response.data) {
        setProjectname(response.data.title);
        const updatedTodos = response.data.todoList.map(todo => ({
          ...todo,
          isEditing: false  // Adding the isEditing field with a default value
        }));
        setTodos(updatedTodos);
        // setTodos(response.data.todoList);
        console.log("todo data ", todos);
        console.log(response.data.todoList);
      }
    } catch (error) {
      console.log("Error in creating project: ", error);
    }
  }
  useEffect(() => {

    setUid(JSON.parse(localStorage.getItem('uid')));
    setUserName(JSON.parse(localStorage.getItem('userName')));
    setToken(JSON.parse(localStorage.getItem('token')));



    fetchAllProjects();

  }, [])


  const addTodo = async (todo) => {
    // setTodos([
    //   ...todos,
    //   { id: uuidv4(), task: todo, completed: false, isEditing: false },
    // ]);

    console.log(todo);
    try {
      console.log("token", token);
      console.log('projectid', projectId);
      const response = await client.post("/todo/create", {

        projectId: projectId,
        description: '',
        title: todo
      },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      if (response.data) {
        fetchAllProjects();
      }
    } catch (error) {
      console.log("Error in creating project: ", error);
    }

  }

  const deleteTodo = async (id) => {
    console.log("delete");
    try {
      console.log("delete", token);
      const response = await client.delete(`todo/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      if (response.data) {
        console.log("response",response.data);
        fetchAllProjects();
      }
    } catch (error) {
      console.log("Error in deleting project: ", error);
    }
  }
  //  setTodos(todos.filter((todo) => todo.id !== id));

  const toggleComplete = async (id) => {
    const token = await JSON.parse(localStorage.getItem('token'));
    

    try {
      console.log("token", token);
      console.log('projectid', id);
      const response = await client.put(`/todo/status/${id}`,null, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data) {
        fetchAllProjects();
      }
    } catch (error) {
      console.log("Error in updating task: ", error);
    }
  }

  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  }

  const editTask = async (task, id) => {
    // setTodos(
    //   todos.map((todo) =>
    //     todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
    //   )
    // );

    try {
      console.log("token", token);
      console.log('projectid', projectId);

      const response = await client.post(`/todo/update/${id}`, {

        title: task,
        description: '',
        projectId: projectId,


      },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      if (response.data) {
        fetchAllProjects();
      }
    } catch (error) {
      console.log("Error in updating project: ", error);
    }

  };

const editProject = async (title) =>{
  console.log('title',title);
  try {
    console.log("token", token);
    console.log('projectid', projectId);
    const response = await client.post(`/project/update/${projectId}`, 
    title,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    closeModal();
    if (response.data) {
      fetchAllProjects();
    }
  } catch (error) {
    console.log("Error in creating project: ", error);
  }

}

const deleteProject = async(title) =>{
  
  try {
    
    const response = await client.delete(`/project/delete/${projectId}`, 
    
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    closeModal();
    if (response.data) {
      navigate("/projects")
    }
  } catch (error) {
    console.log("Error in creating project: ", error);
  }
}

const exportProject = async() =>{

  try {
    
    const response = await client.post(`/project/export/${projectId}`,null, 
    
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    const exportUrl = response.data; 
    console.log(exportUrl);
    toast.success(
      <>
        Project exported successfully.{" "}
        <a href={exportUrl} target="_blank" rel="noopener noreferrer">
          Click here to see
        </a>
      </>,
      {
        autoClose: false 
      }
    );
    
  } catch (error) {
    console.log("Error in exporting project: ", error);
    toast.error('Failed to export project');
  }
}

  return (
    <div className="" >
      <Navbar username={userName} />    <div className="try">
        <div className="TodoWrapper">
        <Button 
          variant="outlined" 
          sx={{
            borderColor: '#8758ff',
            boxShadow: '0px 2px 4px rgba(0, 0, 0,1)',
            textTransform: 'none'
            
          }}
          onClick={exportProject}
          >
            Export Project
        </Button>
          <div className="title" >

          <h1>{projectName}</h1>
          <div className="icons">
            <FontAwesomeIcon className="edit-icon" icon={faPenToSquare} style={{marginTop:'30px',color:'white'}} onClick={()=>openModal('update')} />
            <FontAwesomeIcon className="delete-icon" icon={faTrash} style={{marginTop:'30px',color:'white'}} onClick={()=>openModal('delete')} />
          </div>
          </div>
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
      <AddProjectModal open={isModalOpen} onClose={closeModal} onAddProject={action ==='update'? editProject : deleteProject} title={ action === 'update' ? 'Update Project' : 'Delete Project'} />
      <ToastContainer />
    </div>
  );
};
