import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

class Menu extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        };
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link to='/' className="ms-2 navbar-brand mb-0 h1">
                    Навигация
                </Link>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link to='/users' className="nav-item nav-link active">
                            Список пользователей
                        </Link>
                        <Link to='/projects' className="nav-item nav-link active">
                            Проекты
                        </Link>
                        <Link to='/notes' className="nav-item nav-link active">
                            Заметки
                         </Link>

                         {this.props.isAuthenticated ?
                        <a href="/" onClick={() => { this.props.logout() }} className='nav-item nav-link active'>{`Привет, ${this.props.username} | Выйти`}</a>
                        :
                        <Link to='/login' className='nav-item nav-link active'>
                            Авторизация
                        </Link>
                         }
                    </div>
                </div>
            </nav>
        )
    }
}

export default Menu