import React from 'react'
import axios from 'axios'
import UserList from './components/UserList.js'
import Menu from './components/Menu.js'
import Footer from './components/Footer.js'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'user': []
        }
    }

    componentDidMount() {
        axios
            .get('http://127.0.0.1:8000/api/userinfo/')
            .then(response => {
                let user = response.data
                this.setState({
                    'user': user
                })
            })
            .catch(error => console.log(error))
    }

    render() {
        return (
            <div>
                <Menu/>
                <br/>
                <UserList user={this.state.user} />
                <Footer/>
            </div>
        )
    }
}

export default App;