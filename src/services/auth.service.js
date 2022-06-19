import axios from "axios";
const API_URL = "http://localhost:8000/auth/"

class AuthService {

    login (username, password) {
        return axios
            .post(API_URL + "login/", {
                username,
                password
            })
            .then(response => {
                this.setUserName(username);
                this.setUserToken(response.data.key);
                return response.data;
            });
    }

    logout (){
        localStorage.removeItem('user_token');
        localStorage.removeItem('username');
    }

    registration (username, email, password1, password2) {
        return axios.post(API_URL + "registration/", {
            username,
            email,
            password1,
            password2
        });
    }

    setUserToken(token) {
        localStorage.setItem('user_token', token);
    }

    setUserName (username) {
        localStorage.setItem('username', username);
    }

    getUserToken() {
        return localStorage.getItem('user_token');
    }

    getUserName() {
        return localStorage.getItem('username');
    }

    getUser () {
        let token = this.getUserToken();
        token = "Token " + token;
        return axios.get(API_URL+"user/", {
            headers: {'Authorization': token}
        });
    }

    putUser (username, firstname, lastname, email) {
        let token = this.getUserToken();
        token = "Token " + token;
        return axios( {
            method: "PUT",
            url: API_URL+"user/",
            headers: {'Authorization': token},
            data: {
                username: username,
                email: email,
                first_name: firstname,
                last_name: lastname
            }
        })
    }

    changePassword (password1, password2) {
        let token = this.getUserToken();
        token = "Token " + token;
        return axios({
            method: "POST",
            url: API_URL+"password/change/",
            headers: {'Authorization': token},
            data: {
                new_password1: password1,
                new_password2: password2
            }
        })
    }
}

export default new AuthService();
