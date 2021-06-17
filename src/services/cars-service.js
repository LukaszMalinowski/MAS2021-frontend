import axios from "axios";
import URL_BASE from "../constants/URL_BASE";
import getAuthHeader from "./auth-header";

class CarsService {

    fetchUserCars(userId) {
        return axios.get(`${URL_BASE}users/${userId}/cars`,
            {
                headers: getAuthHeader()
            })
            .then(response => response.data)
    }

    addCar(userId, car) {
        return axios.post(`${URL_BASE}users/${userId}/cars`, car,
            {
                headers: getAuthHeader()
            }
        )
    }

}

export default new CarsService();