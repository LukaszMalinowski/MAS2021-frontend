import axios from "axios";
import URL_BASE from "../constants/URL_BASE";
import getAuthHeader from "./auth-header";

class RepairService {

    registerVisit(visitRequest) {
        return axios.post(`${URL_BASE}repairs`, visitRequest,
            {
                headers: getAuthHeader()
            })
            .then(response => response.status);
    }

}

export default new RepairService();