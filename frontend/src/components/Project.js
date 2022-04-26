import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from "react-router-dom";

const ProjectItem = ({project}) => {
    let projectUsers = project.users;
    return (
        <tr>
            <td>
                <Link to={`/projects/${project.id}`} className='text-decoration-none'>{project.name}</Link>
            </td>
            <td>
                {project.repository_url}
            </td>
             <td>
                {projectUsers.map((user_inf) => `${user_inf.first_name} ${user_inf.last_name}, ` )}
            </td>
        </tr>
    )
};

const ProjectList = ({projects}) => {
    return (
        <table className='table table-striped table-borderless mx-auto w-auto' style={{'width': '20%'}}>
            <thead>
            <tr>
                <th scope='col' style={{'width': '30%'}}>Project name</th>
                <th scope='col' style={{'width': '30%'}}>Project url</th>
                <th scope='col' style={{'width': '40%'}}>Users</th>
            </tr>
            </thead>
            <tbody>
            {projects.map((project) => <ProjectItem project={project}/>)}
            </tbody>
        </table>
    )
};

export default ProjectList;