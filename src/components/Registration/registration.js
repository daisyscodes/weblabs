import React from "react";
import AuthService from "../../services/auth.service"

import { isEmail } from "validator"
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import "./registration.css"


const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        )
    }
}

const email = value => {
    if (!isEmail(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                This is not a valid email.
            </div>
        )
    }
}

const vusername = value => {
    if (value.length < 3 || value.length > 20) {
        return (
            <div className="alert alert-danger" role="alert">
                The username must be between 3 and 20 characters.
            </div>
        );
    }
};

const vpassword = value => {
    if (value.length < 8 || value.length > 40) {
        return (
            <div className="alert alert-danger" role="alert">
                The password must be between 8 and 40 characters.
            </div>
        );
    }
};

class Registration extends React.Component{
    constructor(props) {
        super(props);

        this.handleRegister = this.handleRegister.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword1 = this.onChangePassword1.bind(this);
        this.onChangePassword2 = this.onChangePassword2.bind(this);

        this.state = {
            username: "",
            email: "",
            password1: "",
            password2: "",
            successful: false,
            message: ""
        }
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    };

    onChangePassword1(e) {
        this.setState({
            password1: e.target.value
        });
    };

    onChangePassword2(e) {
        this.setState({
            password2: e.target.value
        });
    };

    handleRegister(e) {
        e.preventDefault();

        this.setState({
            message: "",
            successful: false
        });

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            AuthService.registration(
                this.state.username,
                this.state.email,
                this.state.password1,
                this.state.password2
            )
                .then(
                response => {
                    this.setState({
                        message: response.statusText,
                        successful: true
                    });
                },
                error => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    this.setState({
                        successful: false,
                        message: resMessage
                    });
                }
            );
        }
    }

    render() {
        return (
            <div className="col-sm-12 col-md-9 col-lg-6 mx-auto">
                <div className="card" style={{
                        backgroundColor: "#1F222E",
                        top: "250px",
                        border: 0,
                        color: "#e2e2e2",
                    }}>
                    <div className="card-body" style={{padding: "2rem"}}>
                        <h5 className="text-center" style={{
                            color: "#afb1be",
                            marginBottom: "2rem",
                            fontWeight: "bold",
                            fontSize: "1.5rem",
                        }}>SingUp</h5>

                        <Form onSubmit={this.handleRegister}
                              ref={c=>{
                                  this.form = c;
                              }}
                        >

                            {!this.state.successful && (
                                <div className="form-signin">
                                    <div className="form-group">
                                        <label htmlFor="username">Username</label>
                                        <Input type="text"
                                               className="form-control"
                                               name="username"
                                               value={this.state.username}
                                               onChange={this.onChangeUsername}
                                               style={{backgroundColor: "#afb1be",
                                                        borderColor: "#1F222E"}}
                                               validations={[required, vusername]}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            name="email"
                                            value={this.state.email}
                                            onChange={this.onChangeEmail}
                                            style={{backgroundColor: "#afb1be",
                                                borderColor: "#1F222E"}}
                                            validations={[required, email]}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="password1">Password1</label>
                                        <Input
                                            type="password1"
                                            className="form-control"
                                            name="password1"
                                            value={this.state.password1}
                                            onChange={this.onChangePassword1}
                                            style={{backgroundColor: "#afb1be",
                                                borderColor: "#1F222E"}}
                                            validations={[required, vpassword]}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="password2">Password2</label>
                                        <Input
                                            type="password2"
                                            className="form-control"
                                            name="password2"
                                            value={this.state.password2}
                                            onChange={this.onChangePassword2}
                                            style={{backgroundColor: "#afb1be",
                                                borderColor: "#1F222E"}}
                                            validations={[required, vpassword]}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <button className="btn btn-primary btn-block">Sign Up</button>
                                    </div>
                                </div>
                            )}

                            {this.state.message && this.state.message!=="400" && (
                                alert(this.state.message),
                                <div className="form-group">
                                    <h7 className="text-center" style={{
                                        color: "#afb1be",
                                        marginBottom: "2rem",
                                        fontWeight: "bold",
                                        fontSize: "1.5rem",
                                    }}>Account created. Please login to use service.</h7>
                                </div>
                            )}

                            <CheckButton style={{display: "none"}}
                                         ref={c => {
                                             this.checkBtn = c;
                                         }}
                            />

                        </Form>

                    </div>
                </div>
            </div>
        );
    }

}

export default Registration;
