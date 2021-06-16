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

    register(email, firstName, lastName, password, phoneNumber, address) {
        return axios.post(`${BASE_URL}auth/register`,
            {
                email,
                firstName,
                lastName,
                password,
                phoneNumber,
                address
            })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }

                return response.data;
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