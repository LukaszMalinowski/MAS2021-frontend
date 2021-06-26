import {Component} from "react";
import GarageService from "../../services/garage-service"
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import "./GarageList.css"

class GarageList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            garages: []
        }
    }

    componentDidMount() {
        GarageService.fetchAllGarages()
            .then(response => this.setState({garages: response}))
    }

    render() {
        const garages = this.state.garages;

        return (
            <div>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    Service
                                </TableCell>
                                <TableCell>
                                    Address
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {garages.map(garage => (
                                <TableRow key={garage.id}>
                                    <TableCell>
                                        {garage.name}
                                    </TableCell>
                                    <TableCell className="GarageList">
                                        <p>{garage.address.street} {garage.address.houseNumber} {garage.address.apartmentNumber}</p>
                                        <p>{garage.address.city} {garage.address.zipcode}</p>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        );
    }

}

export default GarageList;