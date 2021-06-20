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

}

export default new GarageService();