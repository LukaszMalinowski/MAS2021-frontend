import {Component} from "react";
import AuthService from "../../services/auth-service";
import CarsService from "../../services/cars-service";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";


class CarList extends Component {

    constructor(props) {
        super(props);

        const user = AuthService.getCurrentUser();

        this.state = {
            currentUser: user,
            cars: undefined
        }
    }

    componentDidMount() {
        CarsService.fetchUserCars(this.state.currentUser.id)
            .then(response => this.setState(state => state.cars = response))
            .catch(err => {
                console.log(err)
            });
    }

    render() {
        const cars = this.state.cars;
        return (
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Mark</TableCell>
                            <TableCell>Model</TableCell>
                            <TableCell>Production year</TableCell>
                            <TableCell>Registration number</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cars && cars.map(car => (
                            <TableRow key={car.id}>
                                <TableCell>{car.mark}</TableCell>
                                <TableCell>{car.model}</TableCell>
                                <TableCell>{car.productionYear}</TableCell>
                                <TableCell>{car.registrationNumber}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
}

export default CarList;
