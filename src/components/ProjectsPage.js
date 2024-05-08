import React,{useEffect, useState} from 'react';
import Navbar from './NavBar';
import '../styles/ProjectPage.css';
import { useNavigate } from 'react-router-dom'
import AddProjectModal from './AddProjectModal';
import client from './api/client';


// Sample data for projects
// const projectsData = [
//   {
//     id: 1,
//     title: "Project 1",
//     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tincidunt neque nec lacus ultrices, ac semper quam fringilla."
//   },
//   {
//     id: 2,
//     title: "Project 2",
//     description: "Nullam vel eleifend nisl. Cras nec mauris non nunc fermentum aliquet. Vivamus ultricies sed lacus ac eleifend."
//   },
//   {
//     id: 3,
//     title: "Project 3",
//     description: "Pellentesque nec risus a tellus tincidunt fringilla. Fusce laoreet sem at eros tristique, vitae fringilla leo tristique."
//   },
//   {
//     id: 4,
//     title: "Project 3",
//     description: "Pellentesque nec risus a tellus tincidunt fringilla. Fusce laoreet sem at eros tristique, vitae fringilla leo tristique."
//   },
//   {
//     id: 5,
//     title: "Project 3",
//     description: "Pellentesque nec risus a tellus tincidunt fringilla. Fusce laoreet sem at eros tristique, vitae fringilla leo tristique."
//   }
// ];

function ProjectsPage() {
    const navigate=useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [data,setData] = useState([]);
    const [userName,setUserName]=useState('');
    const [uid,setUid]=useState('');
    const [token,setToken]=useState('');
    

    const fetchProjects=async()=>{
        const id= JSON.parse(localStorage.getItem('uid'))
        const tokens = JSON.parse(localStorage.getItem('token'))
        // console.log("All projects",id);
        // console.log("All projects",tokens);
        try{
          const response= await client.get(`/project/all/${id}`,{
            headers: {
                Authorization: `Bearer ${tokens}`
              }
        })
        if(response.data){
            setData(response.data);
            // console.log("checking response", response.data);
            // console.log("response",data);
            console.log("title", response.data[0].todoList);
            


            
        }
        // console.log("All projects ", response.data);
        }
        catch(error){
          console.log(error);
        }
          
      }

    const openModal = () => {
        setIsModalOpen(true);
      };
    
      const closeModal = () => {
        setIsModalOpen(false);
      };
    
      const addProject = async (title) => {
        console.log("project",uid);
        console.log("project",title);
        console.log("project",token);
        // Implement logic to add project here
        try{
            const response = await client.post("/project/create", {
               
                userId: uid,
                title: title
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                  }
            }
            ) 
            if(response.data){
                fetchProjects();
            }
        } catch(error){
            console.log("Error in creating project: ",error);
        }
        console.log('Adding project with title:', title);
        closeModal();
      };

    

    useEffect(()=>{
        const id= JSON.parse(localStorage.getItem('uid'))
        const tokens = JSON.parse(localStorage.getItem('token'))

    if( id && tokens){
        setUid(JSON.parse(localStorage.getItem('uid')));
        setUserName(JSON.parse(localStorage.getItem('userName')));
        setToken(JSON.parse(localStorage.getItem('token')));
        console.log(uid);
        console.log(userName);
        console.log(token);
        // console.log("hello");
        
        
          fetchProjects();
        }
        }, []);
        

        useEffect(() => {
            // Perform any side effects based on the updated 'data' state here
            data.map(item => console.log("map title", item.title));
        }, [data]);

  return (
    <div className='outer-container'>
    <Navbar username={userName} />
    <div className="projects-container" >
      <div className="header">
        <h1>My Projects</h1>
        <button className="add-project-btn" onClick={openModal}>Add New Project</button>
      </div>
      <div className="project-tiles">
        {
            data?(
                data.map(project => (
                    <div key={project.id} className="project-tile" onClick={()=>navigate(`/projects/todo/${project.id}`)}>
                      <h2>{project.title}</h2>
                      <p>{`${project.todoList.length} todos`}</p>
                    </div>

            )
        
        )):
        <div>Nothing to show</div>
        
        }
      </div>
    </div>
    <AddProjectModal open={isModalOpen} onClose={closeModal} onAddProject={addProject} title={'Add New Project'} />
  </div>
  );
}

export default ProjectsPage;
