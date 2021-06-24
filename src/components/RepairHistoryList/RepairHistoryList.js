import {Component} from "react";
import RepairService from "../../services/repair-service"
import AuthService from "../../services/auth-service";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import DoneIcon from '@material-ui/icons/Done';
import TimelapseIcon from '@material-ui/icons/Timelapse';
import SettingsIcon from '@material-ui/icons/Settings';
import "./RepairHistoryList.css"

class RepairHistoryList extends Component {

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

    componentDidMount() {
        RepairService.getAllVisits(this.state.currentUser.id)
            .then(response => this.setState({repairs: response}))
    }

    render() {
        const repairs = this.state.repairs;

        console.log(repairs);

        return (
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Car</TableCell>
                            <TableCell>Receive date</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Parts</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {repairs.map(repair => (
                            <TableRow key={repair.repairId}>
                                <TableCell>
                                    {repair.car.mark} {repair.car.model}
                                </TableCell>
                                <TableCell>
                                    {new Date(repair.receiveDateTime).toLocaleString()}
                                </TableCell>
                                <TableCell>
                                    {repair.description}
                                </TableCell>
                                <TableCell>
                                    <ul className="RepairHistoryList-parts">
                                        {repair.parts.map(part =>
                                            <li key={part.id}>
                                                {part.name} - {part.price}zł
                                            </li>)}
                                    </ul>
                                </TableCell>
                                <TableCell>
                                    {this.getRepairStatus(repair.status)}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }

}

export default RepairHistoryList;