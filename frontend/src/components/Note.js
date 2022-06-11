import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link, useParams} from "react-router-dom";

const NoteItem = ({project, author, note,updateNote}) => {
    return (
        <tr>
            <td>
                <Link to={`/projects/${project.id}`} className='text-decoration-none'>{project.name}</Link>
            </td>
            <td>
                {`${author.first_name} ${author.last_name}`}
            </td>
            <td>
                {note.body}
            </td>
            <td>
                {note.created_at}
            </td>
            <td>
                {note.updated_at}
            </td>
            <td>
                <input type='checkbox' defaultChecked={note.is_active} onChange={() => updateNote(note.id)}/>
            </td>
        </tr>
    )
};

const NoteList = ({projects, users, notes, updateNote}) => {
    let projectNotes = notes;
    let projectNotesTemplate = '';
    let {projectId} = useParams();
    if (projectId){
        projectNotes = notes.filter((note) => note.project === +projectId)
    }

    if (projectNotes.length > 0) {
        projectNotesTemplate = projectNotes.map((note) => {
        let project = projects?.find((project) => project.id === note.project);
        let author = users?.find((user) => user.id === note.author);
        return <NoteItem project={project} author={author} note={note} updateNote={updateNote}/>
        }
        )
    } else {
        projectNotesTemplate = "Заметок нет"
    }
    return (
    <div>
    <Link to={`/notes/create`} className='text-decoration-none'><button type="button" className="btn btn-success">Add note</button></Link>
        <table className='table table-striped table-borderless mx-auto w-auto' style={{'width': '20%'}}>
            <thead>
            <tr>
                <th scope='col' style={{'width': '25%'}}>Project</th>
                <th scope='col' style={{'width': '25%'}}>Author</th>
                <th scope='col' style={{'width': '25%'}}>Body</th>
                <th scope='col' style={{'width': '10%'}}>Created</th>
                <th scope='col' style={{'width': '10%'}}>Updated</th>
                <th scope='col' style={{'width': '5%'}}>Active</th>
            </tr>
            </thead>
            <tbody>
            {projectNotesTemplate}
            </tbody>
        </table>
    </div>
    )
};

export default NoteList;