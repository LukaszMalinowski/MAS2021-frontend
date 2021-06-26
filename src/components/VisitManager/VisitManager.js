import {Component} from "react";
import {Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import AuthService from "../../services/auth-service";
import GarageService from "../../services/garage-service";
import RepairService from "../../services/repair-service";
import EditRepairDialog from "../EditRepairDialog/EditRepairDialog";
import TimelapseIcon from "@material-ui/icons/Timelapse";
import SettingsIcon from "@material-ui/icons/Settings";
import DoneIcon from "@material-ui/icons/Done";

class VisitManager extends Component {

    constructor(props) {
        super(props);

        const user = AuthService.getCurrentUser();

        this.state = {
            currentUser: user,
            repairs: []
        }
    }

    getRepairStatus = status => {
        let statusHtml;

        switch (status) {
            case 'REGISTERED':
                statusHtml = <div><TimelapseIcon />Registered</div>
                break;
            case 'STARTED':
                statusHtml = <div><SettingsIcon />Started</div>
                break;
            case 'COMPLETED':
                statusHtml = <div><DoneIcon />Completed</div>
                break;
            default:
                statusHtml = <div>Status unknown. Contact service owner</div>
        }
        return statusHtml;
    }

    completeRepair = repair => {
        RepairService.completeVisit(repair.repairId)
            .then(() => {
                const repairs = this.state.repairs;
                const filtered = repairs.filter(value => value.repairId !== repair.repairId);

                this.setState({repairs: filtered});
            })
            .catch(err => console.log(err));
    }

    changeStatus = repairId => {
        let repairs = this.state.repairs;

        repairs.filter(repair => repair.repairId === parseInt(repairId))
            .forEach(repair => repair.status = "STARTED");

        this.setState({repairs: repairs});
    }

    componentDidMount() {
        GarageService.fetchAllGarageRepairs(this.state.currentUser.garageId)
            .then(response => this.setState({repairs: response}));
    }

    render() {
        const repairs = this.state.repairs;

        return (
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Client</TableCell>
                            <TableCell>Car</TableCell>
                            <TableCell>Start date</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Complete</TableCell>
                            <TableCell>Edit</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {repairs.map(repair => (
                            <TableRow key={repair.repairId}>
                                <TableCell>{repair.repairId}</TableCell>
                                <TableCell>{repair.car.user.firstName} {repair.car.user.lastName}</TableCell>
                                <TableCell>{repair.car.brand} {repair.car.model}</TableCell>
                                <TableCell>{new Date(repair.receiveDateTime).toLocaleString()}</TableCell>
                                <TableCell>{this.getRepairStatus(repair.status)}</TableCell>
                                <TableCell>
                                    <Button color="primary"
                                            variant="contained"
                                            onClick={() => this.completeRepair(repair)}>Complete repair</Button>
                                </TableCell>
                                <TableCell>
                                    <EditRepairDialog repair={repair} changeStatus={this.changeStatus}/>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }

}

export default VisitManager;