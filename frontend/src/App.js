import React from 'react'
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import axios from 'axios'
import UserList from './components/UserList.js'
import ProjectList from './components/Project.js'
import NoteList from './components/Note.js'
import Menu from './components/Menu.js'
import Footer from './components/Footer.js'
import LoginForm from './components/Auth.js';
import Cookies from 'universal-cookie/es6';
import ProjectForm from './components/ProjectForm.js';
import NoteForm from "./components/NoteForm.js";

const baseUrl = 'http://127.0.0.1:8000';
const apiUrl = `${baseUrl}/api`;
const getUrl = (path) => `${baseUrl}/${path}/`;
const getApiUrl = (path) => `${apiUrl}/${path}/`;

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
            'notes': [],
            'token': '',
            'username': ''
        }
    }

    logout() {
        this.setTokenAndUser('', '');
        this.setState({
            'user': [],
            'projects': [],
            'notes': []
        });
    }

    isAuthenticated() {
        return !!this.state?.token;
    }

    getHeaders() {
        let headers = {
            'Content-Type': 'application/json'
        }
        if (this.isAuthenticated()) {
            headers['Authorization'] = `Token ${this.state.token}`;
        }
        return headers;
    }

    loadData() {
        if (!this.isAuthenticated()) return;
        const headers = this.getHeaders();
        axios.all(
            [
                axios.get(getApiUrl('userinfo'), {headers}),
                axios.get(getApiUrl('projects'), {headers}),
                axios.get(getApiUrl('notes'), {headers})
            ]
        )
            .then(axios.spread((user, projects, notes) => {
                this.setState(
                    {
                        'user': user.data.results,
                        'projects': projects.data.results,
                        'notes': notes.data.results,
                    }
                )
            }))
            .catch(error => console.error(error));
    }

    setTokenAndUser(token, username) {
        const cookies = new Cookies();
        cookies.set('token', token);
        cookies.set('username', username);
        this.setState({token, username}, () => this.loadData());
    }

    getTokenAndUser(username, password) {
        axios.post(getUrl('api-token-auth'), {username, password})
            .then(response => {
            this.setTokenAndUser(response.data['token'], username);
            }).catch(err => alert('Invalid login or password'))
    }

    getTokenAndUserFromStorage() {
        const cookies = new Cookies();
        const token = cookies.get('token');
        const username = cookies.get('username');
        this.setState({token, username}, () => this.loadData());
    }

    componentDidMount() {
        this.getTokenAndUserFromStorage();
    }

    deleteProject(id) {
        if (!this.isAuthenticated()) return;
        const headers = this.getHeaders();
        axios.delete(getApiUrl(`projects/${id}`), {headers})
            .then(response => {
                this.setState({projects: this.state.projects.filter((project) => project.id !== id)})
            })
            .catch(error => console.error(error));
    }

    createProject(props) {
        if (!this.isAuthenticated()) return;
        const headers = this.getHeaders();
        props.users = [props.users,];
        axios.post(getApiUrl(`projects`), {...props}, {headers})
            .then(response => {
                this.setState({projects: [...this.state.projects, response.data]})
            })
            .catch(error => console.log(error))
    }

    deleteNote(id) {
        if (!this.isAuthenticated()) return;
        const headers = this.getHeaders();
        axios.delete(getApiUrl(`notes/${id}`), {headers})
            .then(response => {
                this.setState({
                    notes: this.state.notes.map((note) => {
                        if (note.id === id) {
                            note.is_active = false;
                        }
                        return note;
                    })
                })
            })
            .catch(error => console.error(error));
    }

    restoreNote(id) {
        const headers = this.getHeaders();
        axios.patch(getApiUrl(`notes/${id}`), {is_active: true}, {headers})
            .then(response => {
                this.setState({
                    notes: this.state.notes.map((note) => {
                        if (note.id === id) {
                            note.is_active = true;
                        }
                        return note;
                    })
                })
            })
            .catch(error => console.error(error));
    }

    updateNote(id) {
        this.state.notes.find((note) => {
            let condition = note.id === id;
            if (condition) {
                if (note.is_active) {
                    this.deleteNote(id);
                } else {
                    this.restoreNote(id);
                }
            }
            return condition;
        });
    }

    createNote(props) {
        if (!this.isAuthenticated()) return;
        const headers = this.getHeaders();
        props.isActive = true;
        props.author = this.state.user.find((user) => user.username === this.state.username).id;
        axios.post(getApiUrl(`notes`), {...props}, {headers})
            .then(response => {
                this.setState({notes: [...this.state.notes, response.data]})
            })
            .catch(error => console.log(error))
    }

    render() {
        return (
            <Router>
                <Menu isAuthenticated={this.isAuthenticated()}
                      logout={() => this.logout()}
                      username={this.state.username}/>
                <br/>
                <Switch>
                    <Route exact path='/users' component={() => { if (!this.isAuthenticated()) return <Redirect to='/login'/>; return <UserList user={this.state.user} /> } }/>
                    <Route exact path='/projects' component={() => { if (!this.isAuthenticated()) return <Redirect to='/login'/>; return <ProjectList users={this.state.user} projects={this.state.projects} deleteProject={(id) => this.deleteProject(id)} /> } }/>
                    <Route exact path='/projects/create' component={() => { if (!this.isAuthenticated()) return <Redirect to='/login'/>; return <ProjectForm users={this.state.user} createProject={(props) => this.createProject(props)}/>  }}/>
                    <Route path='/projects/:projectId' component={() => { if (!this.isAuthenticated()) return <Redirect to='/login'/>; return <NoteList projects={this.state.projects} users={this.state.user} notes={this.state.notes} updateNote={(id) => this.updateNote(id)} /> } }/>
                    <Route exact path='/notes' component={() => { if (!this.isAuthenticated()) return <Redirect to='/login'/>; return <NoteList projects={this.state.projects} users={this.state.user} notes={this.state.notes} updateNote={(id) => this.updateNote(id)} /> } }/>
                    <Route exact path='/notes/create' component={() => {
                        return <NoteForm projects={this.state.projects}
                                         createNote={(props) => this.createNote(props)}/>
                    }}/>
                    <Route exact path='/login' component={() => {
                        if (this.isAuthenticated()) return <Redirect to='/'/>;
                        return <LoginForm getToken={(username, password) => this.getTokenAndUser(username, password)}/>
                    }}/>
                    <Redirect from='/' to='/projects'/>
                    <Route component={notFound404}/>
                </Switch>
                <Footer/>
            </Router>
        )
    }
}

export default App;
