import  React from "react";
import AuthService from "../../services/auth.service"
import Input from "react-validation/build/input";
import Form from "react-validation/build/form";
import "./userprofile.css"
import CheckButton from "react-validation/build/button";


const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

class UserProfile extends React.Component{

    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeFirstname = this.onChangeFirstname.bind(this);
        this.onChangeLastname = this.onChangeLastname.bind(this);
        this.onChangePass1 = this.onChangePass1.bind(this);
        this.onChangePass2 = this.onChangePass2.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleChangePass = this.handleChangePass.bind(this);
        this.state = {
            username: "",
            firstname: "",
            lastname: "",
            email: "",
            password1: "",
            password2: ""
        }
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangeFirstname(e) {
        this.setState({
            firstname: e.target.value
        });
    }

    onChangeLastname(e) {
        this.setState({
            lastname: e.target.value
        });
    }

    onChangePass1 (e) {
        this.setState({
            password1: e.target.value
        })
    }

    onChangePass2 (e) {
        this.setState({
            password2: e.target.value
        })
    }

    handleSave (e){
        e.preventDefault();
        AuthService.putUser(
            this.state.username,
            this.state.firstname,
            this.state.lastname,
            this.state.email,
        ).then(response => {
            AuthService.setUserName(this.state.username);
            window.location.reload();
        })
    }

    handleChangePass (e) {
        AuthService.changePassword(
            this.state.password1,
            this.state.password2
        )
    }

    componentDidMount() {
        AuthService.getUser()
            .then(
                response => {
                    const user = response.data;
                    this.setState({
                        username: user.username,
                        firstname: user.first_name,
                        lastname: user.last_name,
                        email: user.email
                    });
                    },
                error => {
                    alert(JSON.stringify(error.response))
                })
    }

    render() {
        return (

            <div className="row justify-content-center" >
                <div className="col-sm-12 col-md-9 col-lg-8" style={{top: "100px"}}>

                    <div className="panel panel-default">
                        <div className="panel-body text-center">
                            <img src="https://bootdey.com/img/Content/avatar/avatar6.png"
                                 className="img-circle profile-avatar" alt="User avatar"/>
                        </div>
                    </div>

                    <Form
                        onSubmit={this.handleSave}
                        ref={c=>{
                            this.form = c;
                        }}>
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h2 className="panel-title">User info</h2>
                            </div>

                            <div className="panel-body">
                                <div className="form-group">
                                    <label>Nickname</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="username"
                                        value={this.state.username}
                                        onChange={this.onChangeUsername}
                                        style={{backgroundColor: "#afb1be",
                                                borderColor: "#1F222E",
                                                color: "#1f222e"}}
                                        validations={[required]}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>First name</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="username"
                                        value={this.state.firstname}
                                        onChange={this.onChangeFirstname}
                                        style={{backgroundColor: "#afb1be",
                                            borderColor: "#1F222E",
                                            color: "#1f222e"}}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Last name</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="username"
                                        value={this.state.lastname}
                                        onChange={this.onChangeLastname}
                                        style={{backgroundColor: "#afb1be",
                                            borderColor: "#1F222E",
                                            color: "#1f222e"}}
                                    />
                                </div>

                                <div className="form-group custom-btn">
                                    <button
                                        className="btn btn-primary btn-block"
                                        disabled={this.state.loading}
                                    >
                                        {this.state.loading && (
                                            <span className="spinner-border spinner-border-sm"/>
                                        )}
                                        <span>Save</span>
                                    </button>
                                </div>

                                <CheckButton
                                    style={{ display: "none" }}
                                    ref={c => {
                                        this.checkBtn = c;
                                    }}
                                />

                            </div>
                        </div>
                    </Form>

                    <Form
                        onSubmit={this.handleChangePass}
                        ref={b=>{
                            this.form = b;
                        }}>
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h2 className="panel-title">Security</h2>
                            </div>

                            <div className="panel-body">
                                <div className="form-group">
                                    <label>New password</label>
                                    <Input
                                        type="password"
                                        className="form-control"
                                        name="password1"
                                        // value={this.state.username}
                                        onChange={this.onChangePass1}
                                        style={{backgroundColor: "#afb1be",
                                            borderColor: "#1F222E",
                                            color: "#1f222e"}}
                                        validations={[required]}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Repeat password</label>
                                    <Input
                                        type="password"
                                        className="form-control"
                                        name="newpassword"
                                        // value={this.state.username}
                                        onChange={this.onChangePass2}
                                        style={{backgroundColor: "#afb1be",
                                            borderColor: "#1F222E",
                                            color: "#1f222e"}}
                                        validations={[required]}
                                    />
                                </div>

                                <div className="form-group custom-btn">
                                    <button
                                        className="btn btn-primary btn-block"
                                    >
                                        {this.state.loading && (
                                            <span className="spinner-border spinner-border-sm"></span>
                                        )}
                                        <span>Change password</span>
                                    </button>
                                </div>

                                <CheckButton
                                    style={{ display: "none" }}
                                    ref={b => {
                                        this.checkBtn = b;
                                    }}
                                />
                            </div>
                        </div>
                    </Form>

                </div>
            </div>
        );
    }
}

export default UserProfile;
