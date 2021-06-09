import axios from "axios";
import BASE_URL from "../constants/BASE_URL";
import jwtDecode from "jwt-decode";

class AuthService {
    login(username, password) {
        return axios.post(`${BASE_URL}auth/login`, {
            email: username,
            password: password
        })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }

                return response.data;
            })
    }

    logout() {
        localStorage.removeItem("user");
    }

    register(email, firstName, lastName, password, phoneNumber, address) {
        return axios.post(`${BASE_URL}/auth/register`,
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
        return jwtDecode(localStorage.getItem('user'));
    }
}

export default new AuthService();