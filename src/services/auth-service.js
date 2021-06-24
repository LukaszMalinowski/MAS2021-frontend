import axios from "axios";

import jwtDecode from "jwt-decode";
import URL_BASE from "../constants/URL_BASE";

class AuthService {
    async login(username, password) {
        return await axios.post(`${URL_BASE}auth/login`, {
            email: username,
            password: password
        }).then(response => {
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response.data;
        });
    }

    logout() {
        localStorage.removeItem("user");
    }

    register(user) {
        return axios.post(`${URL_BASE}auth/register`, {
            password: user.password,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            address: user.address
        })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }

                return response.status;
            })
    }

    getCurrentUser() {
        const user = localStorage.getItem('user')

        if (user) {
            return jwtDecode(localStorage.getItem('user'));
        }

        return null;
    }
}

export default new AuthService();