import axios from "axios";
import BASE_URL from "../constants/URL_BASE";
import getAuthHeader from "./auth-header";

class GarageService {

    fetchAllGarages() {
        return axios.get(`${BASE_URL}garages`,
            {
                headers: getAuthHeader()
            })
            .then(response => response.data);
    }

    fetchAllGarageDates(garageId) {
        return axios.get(`${BASE_URL}garages/${garageId}/dates`,
            {
                headers: getAuthHeader()
            })
            .then(response => response.data);
    }

    fetchAllGarageRepairs(garageId) {
        return axios.get(`${BASE_URL}garages/${garageId}/repairs`,
            {
                headers: getAuthHeader()
            })
            .then(response => response.data);
    }

    fetchAllGarageMechanics(garageId) {
        return axios.get(`${BASE_URL}garages/${garageId}/mechanics`,
            {
                headers: getAuthHeader()
            })
            .then(response => response.data);
    }

    addGarage(garageId, date) {
        return axios.post(`${BASE_URL}garages/${garageId}/dates`, JSON.stringify(date),
            {
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).accessToken}`,
                    'Content-Type': "application/json"
                }
            })
            .then(response => response.status);
    }
}

export default new GarageService();