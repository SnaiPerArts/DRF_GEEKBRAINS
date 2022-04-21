import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link, useParams} from "react-router-dom";

const NoteItem = ({note}) => {
    return (
        <tr>
            <td>
                <Link to={`/projects/${note.project.id}`} className='text-decoration-none'>{note.project.name}</Link>
            </td>
            <td>
                {`${note.author.first_name} ${note.author.last_name}`}
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
                <input type='checkbox' defaultChecked={note.is_active} disabled/>
            </td>
        </tr>
    )
};

const NoteList = ({notes}) => {
    let projectNotes = notes;
    let projectNotesTemplate = '';
    let {projectId} = useParams();
    if (projectId){
        projectNotes = notes.filter((note) => note.project.id === +projectId)
    }

    if (projectNotes.length > 0) {
        projectNotesTemplate = projectNotes.map((note) => <NoteItem note={note}/>)
    } else {
        projectNotesTemplate = "Заметок нет"
    }
    return (
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
    )
};

export default NoteList;