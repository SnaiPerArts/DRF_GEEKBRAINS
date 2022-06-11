import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from "react-router-dom";

const ProjectItem = ({users, project, deleteProject}) => {
    let projectUsers = users.filter((user) => project.users.filter((prjUserId) => user.id === prjUserId));
    let projectUsersDispatched = [];
    for (let i = 0; i < project.users.length; i++) {
        projectUsersDispatched.push({
            first_name: projectUsers?.[i].first_name,
            last_name: projectUsers?.[i].last_name,
            id: projectUsers?.[i].id
        })
    }
    return (
        <tr>
            <td>
                <Link to={`/projects/${project.id}`} className='text-decoration-none'>{project.name}</Link>
            </td>
            <td>
                {project.repository_url}
            </td>
             <td>
                {projectUsersDispatched.map((user) => `${user.first_name} ${user.last_name}, ` )}
            </td>
            <td>
                <button type="button" className="btn btn-danger" onClick={()=>deleteProject(project.id)}>Delete</button>
            </td>
        </tr>
    )
};

const ProjectList = ({users, projects, deleteProject}) => {
    return (
    <div>
    <Link to={`/projects/create`} className='text-decoration-none'><button type="button" className="btn btn-success">Add project</button></Link>

        <table className='table table-striped table-borderless mx-auto w-auto' style={{'width': '20%'}}>
            <thead>
            <tr>
                <th scope='col' style={{'width': '30%'}}>Project name</th>
                <th scope='col' style={{'width': '30%'}}>Project url</th>
                <th scope='col' style={{'width': '30%'}}>Users</th>
                <th scope='col' style={{'width': '10%'}}>Action</th>
            </tr>
            </thead>
            <tbody>
            {projects.map((project) => <ProjectItem users={users} project={project} deleteProject={deleteProject}/>)}
            </tbody>
        </table>
    </div>
    )
};

export default ProjectList;