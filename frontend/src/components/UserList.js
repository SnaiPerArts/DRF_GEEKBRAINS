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
        <table class='table'>
        <th scope='col'>
            Username
        </th>
        <th scope='col'>
            First name
        </th>
        <th scope='col'>
            First name
        </th>
        <th scope='col'>
            E-mail
        </th>
        {user.map((user) => <UserItem user={user} />)}
        </table>
    )
}

export default UserList