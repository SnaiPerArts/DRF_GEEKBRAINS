import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserItem = ({user}) => {
    return (
    <tr>
        <td>{user.username}</td>
        <td>{user.first_name}</td>
        <td>{user.last_name}</td>
        <td>{user.email}</td>
    </tr>
    )
}

const UserList = ({user}) =>  {
    return (
        <table class='table table-striped table-borderless mx-auto w-auto' style={{'width': '20%'}}>
        <thead>
        <th scope='col' style={{'width': '10%'}}>
            Username
        </th>
        <th scope='col' style={{'width': '10%'}}>
            First name
        </th>
        <th scope='col' style={{'width': '10%'}}>
            First name
        </th>
        <th scope='col' style={{'width': '10%'}}>
            E-mail
        </th>
        </thead>
        <tbody>
        {user.map((user) => <UserItem user={user} />)}
        </tbody>
        </table>
    )
}

export default UserList