import React from 'react';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import ProjectsPage from './components/ProjectsPage';
import TodoListPage from './components/TodoListPage';
import { TodoWrapper } from './components/TodoWrapper';

function App() {
  return (
    <div>
      <Router>
        <Routes>
        <Route exact path='/signup' element={<SignupPage/>}/>
        <Route exact path='/' element={<LoginPage/>}/>
        <Route exact path='/projects' element={<ProjectsPage/>}/>
        <Route exact path='/projects/todo/:id' element={<TodoWrapper/>}/>
        {/* <Route path='/login' element={<Login/>}/>
        <Route  path='/home' element={<Home2/>}/>
        <Route  path='/details/:id' element={<Details/>}/>
        <Route  path='/addDetails/:id' element={<AddDetails/>}/>
        <Route  path='/patientDetails/:id' element={<PatientDetails/>}/> */}

        </Routes>
      </Router>
    </div>
    
   
  );
}

export default App;
