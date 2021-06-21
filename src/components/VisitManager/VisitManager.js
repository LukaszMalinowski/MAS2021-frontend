import {Component} from "react";
import {Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import AuthService from "../../services/auth-service";
import GarageService from "../../services/garage-service";

class VisitManager extends Component {

    constructor(props) {
        super(props);

        const user = AuthService.getCurrentUser();

        this.state = {
            currentUser: user,
            repairs: []
        }
    }

    completeRepair = repair => {
        console.log(repair);
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
                                <TableCell>{repair.car.mark} {repair.car.model}</TableCell>
                                <TableCell>{new Date(repair.receiveDateTime).toLocaleString()}</TableCell>
                                <TableCell>{repair.status}</TableCell>
                                <TableCell>
                                    <Button color="primary"
                                            variant="contained"
                                            onClick={() => this.completeRepair(repair)}>Complete repair</Button>
                                </TableCell>
                                <TableCell>
                                    <Button color="primary"
                                            variant="contained">Edit</Button>
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