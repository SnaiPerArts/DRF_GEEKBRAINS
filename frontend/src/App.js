import React from 'react'
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import axios from 'axios'
import UserList from './components/UserList.js'
import ProjectList from './components/Project.js'
import NoteList from './components/Note.js'
import Menu from './components/Menu.js'
import Footer from './components/Footer.js'

const apiUrl = 'http://localhost:8000/api/';
const getUrl = (name) => `${apiUrl}${name}`;

const notFound404 = ({location}) => {
    return (
        <div className='d-flex align-items-center justify-content-center' style={{'height': '30em'}}>
            <h1 className='d-inline-block'>Страница '{location.pathname}' не найдена</h1>
        </div>

    )
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'user': [],
            'projects': [],
            'notes': []
        }
    }

    componentDidMount() {
        axios
            .get(getUrl('userinfo'))
            .then(response => {
                let user = response.data.results
                this.setState({
                    'user': user
                })
            })
            .catch(error => console.log(error));

        axios
            .get(getUrl('projects'))
            .then(response => {
                let projects = response.data.results
                this.setState({
                    'projects': projects
                })
            })
            .catch(error => console.log(error))

        axios
            .get(getUrl('notes'))
            .then(response => {
                let notes = response.data.results
                this.setState({
                    'notes': notes
                })
                console.log(notes)
            })
            .catch(error => console.log(error))

    }

    render() {
        return (
            <Router>
                <Menu/>
                <br/>
                <Switch>
                    <Route exact path='/users' component={() => <UserList user={this.state.user} /> }/>
                    <Route exact path='/projects' component={() => <ProjectList projects={this.state.projects} /> }/>
                    <Route path='/projects/:projectId' component={() => <NoteList notes={this.state.notes} /> }/>
                    <Route exact path='/notes' component={() => <NoteList notes={this.state.notes} /> }/>
                    <Redirect from='/' to='/projects'/>
                    <Route component={notFound404}/>
                </Switch>
                <Footer/>
            </Router>
        )
    }
}

export default App;
