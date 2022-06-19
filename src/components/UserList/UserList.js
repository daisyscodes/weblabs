import React from "react";
import UserService from "../../services/user.service"

class UserList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            content: []
        };
    }

    componentDidMount() {
        UserService.getAllUsers()
            .then(response => {
                    const users = response.data;
                    this.setState({
                        content: users
                    });
                },
                error => {
                    this.setState({
                        content:
                            (error.response &&
                                error.response.data &&
                                error.response.data.message) ||
                            error.message ||
                            error.toString()
                    });
            });
    }

    render() {
        return (
            <div className="row align-content-center">
                <div className="col-12" style={{top: "50px"}}>
                    <h1 className="text-center">Users List</h1>
                    <ul className="list-group">
                        {this.state.content.map((content, i) => <li key={i}>
                            username: {content.username}
                            <br/>
                            email: {content.email}
                            <br/>
                            first name: {content.first_name}
                            <br/>
                            last name: {content.last_name}
                        </li>)}
                    </ul>
                </div>
            </div>
        );
    }
}

export default UserList;
