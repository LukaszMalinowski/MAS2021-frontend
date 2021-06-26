import axios from "axios";
import URL_BASE from "../constants/URL_BASE";
import BASE_URL from "../constants/URL_BASE";
import getAuthHeader from "./auth-header";

class RepairService {

    registerVisit(visitRequest) {
        return axios.post(`${URL_BASE}repairs`, visitRequest,
            {
                headers: getAuthHeader()
            })
            .then(response => response.status);
    }

    completeVisit(repairId) {
        return axios.post(`${URL_BASE}repairs/${repairId}`, {},
            {
                headers: getAuthHeader()
            })
            .then(response => response.status);
    }

    getAllVisits(userId) {
        return axios.get(`${URL_BASE}users/${userId}/repairs`, {
            headers: getAuthHeader()
        })
            .then(response => response.data);
    }

    addMechanic(repairId, mechanicRepair) {
        return axios.post(`${BASE_URL}repairs/${repairId}/mechanics`, mechanicRepair,
            {
                headers: getAuthHeader()
            })
            .then(response => response.status);
    }

    addPart(repairId, part) {
        return axios.post(`${BASE_URL}repairs/${repairId}/parts`, part,
            {
                headers: getAuthHeader()
            })
            .then(response => response.status);
    }
}

export default new RepairService();