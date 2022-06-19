import React from 'react';
import './App.css';
import AuthService from "./services/auth.service"
import {Route, Switch, BrowserRouter, Link} from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login"
import Album from "./components/Album/album"
import UserList from "./components/UserList/UserList"
import Registration from "./components/Registration/registration"
import UserProfile from "./components/UserProfile/userprofile"
import "bootstrap/dist/css/bootstrap.min.css";
import Profile from "./components/ABProfile/profile";

class App extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            currentUser: undefined
        }
    }

    componentDidMount() {
        const UserToken = AuthService.getUserToken();
        const UserName = AuthService.getUserName();
        if (UserToken) {
            this.setState({
                UserToken: UserToken,
                UserName: UserName
            });
        }
    }

    logout () {
        AuthService.logout();
    }

    render() {
        const {UserToken, UserName} = this.state;
        return (

            <BrowserRouter>
                <div>
                    <nav className="navbar navbar-expand-md navbar-dark fixed-top">
                        <div className="navbar-brand logo">
                            <Link to="/">
                                Music Service
                            </Link>
                        </div>

                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggler"
                                aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"/>
                        </button>

                        <div className="collapse navbar-collapse custom-link" id="navbarToggler">
                            {UserToken && (
                                <ul className="nav navbar-nav navbar-center">
                                    <li className="nav-item text-center">
                                        <div className="nav-link text-center">
                                            <Link to="/">
                                                Main
                                            </Link>
                                        </div>
                                    </li>
                                    <li className="nav-item text-center">
                                        {/*<a className="nav-link text-center" href="./playlists.html">Library</a>*/}
                                        <div className="nav-link text-center">
                                            <Link to="/userlist">UserList</Link>
                                        </div>
                                    </li>
                                </ul>
                            )}

                            {UserToken ? (
                                <ul className="nav navbar-nav ml-auto">
                                    <li className="nav-item text-center">
                                        <div className="nav-link text-center">
                                            <Link to="/profile">
                                                {UserName}
                                            </Link>
                                        </div>
                                    </li>
                                    <li className="nav-item text-center">
                                        {/*<a className="nav-link text-center" href="./playlists.html">Library</a>*/}
                                        <div className="nav-link text-center">
                                            <a href="/" onClick={this.logout}>Logout</a>
                                        </div>
                                    </li>
                                </ul>
                            ):(
                                <ul className="nav navbar-nav ml-auto">
                                    <li className="nav-item text-center">
                                        <div className="nav-link text-center">
                                            <Link to="/login">
                                                SingIn
                                            </Link>
                                        </div>
                                    </li>
                                    <li className="nav-item text-center">
                                        <div className="nav-link text-center">
                                            <Link to="/registration">SingUp</Link>
                                        </div>
                                    </li>
                                </ul>
                            )}
                        </div>
                    </nav>
                    <div className="container-xl ">
                            <Switch>
                                <Route exact path="/login" component={Login}/>
                                <Route exact path="/registration" component={Registration}/>
                                <Route exact path="/" component={Home}/>
                                <Route exact path="/userlist" component={UserList}/>
                                <Route exact path="/profile" component={UserProfile}/>
                                <Route exact path="/album/:albumId" component={Album}/>
                                <Route exact path="/pr/:t/:artistId" component={Profile}/>
                            </Switch>
                    </div>

                </div>
                {/*<footer className="footer">*/}
                {/*    <div className="container">*/}
                {/*        <div className="row justify-content-center ">*/}
                {/*            <p className="footer-des">© Copyright 2020 Ilchyshyn Bohdan</p>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</footer>*/}
            </BrowserRouter>
        );
    }
}

export default App;
