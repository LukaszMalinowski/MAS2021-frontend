import {Component} from "react";
import {Button, Dialog, DialogContent, Typography} from "@material-ui/core";
import GarageService from "../../services/garage-service"
import AuthService from "../../services/auth-service";
import RepairService from "../../services/repair-service";
import {Col, Form, FormControl, FormLabel, Row} from "react-bootstrap";

class EditRepairDialog extends Component {

    constructor(props) {
        super(props);

        const user = AuthService.getCurrentUser();

        console.log(this.props.repair.parts)

        this.state = {
            open: false,
            currentUser: user,
            repairMechanics: props.repair.mechanics,
            garageMechanics: [],
            chosenMechanic: null,
            hours: null,
            showNoMechanics: false,
            notes: null,
            parts: props.repair.parts,
        }
    }

    toggleOpen = () => this.setState(state => state.open = !state.open)

    async componentDidMount() {
        const garageMechanics = await GarageService.fetchAllGarageMechanics(this.state.currentUser.garageId);

        if (garageMechanics.length !== 0) {
            this.setState({
                garageMechanics: garageMechanics,
                chosenMechanic: garageMechanics[0].id
            })
        } else {
            this.setState({
                showNoMechanics: true
            })
        }
    }

    handleAddMechanic = evt => {
        evt.preventDefault();

        const garageMechanics = this.state.garageMechanics;

        const mechanic = garageMechanics.find(garageMechanic =>
            garageMechanic.id === parseInt(this.state.chosenMechanic));

        const mechanicRepair = {
            mechanicId: this.state.chosenMechanic,
            notes: this.state.notes,
            hours: this.state.hours
        };

        const newRepairMechanic = {
            mechanicId: mechanic.id,
            name: mechanic.name,
            surname: mechanic.surname,
            hourlyRate: mechanic.hourlyRate,
            hours: this.state.hours,
            notes: this.state.notes
        }


        RepairService.addMechanic(this.props.repair.repairId, mechanicRepair)
            .then(() => this.props.changeStatus(this.props.repair.repairId))
            .then(() => this.setState({repairMechanics: [...this.state.repairMechanics, newRepairMechanic]}));

    }

    handleChange = evt => {
        this.setState({[evt.target.id]: evt.target.value})
    }

    render() {
        const {open, garageMechanics, repairMechanics, parts} = this.state;

        return (
            <div>
                <Button color="primary" variant="contained" onClick={this.toggleOpen}>Edit</Button>
                <Dialog open={open} onClose={this.toggleOpen} maxWidth="xl">
                    <DialogContent>
                        <Typography variant="h5">Mechanics:</Typography>
                        <ul>
                            {repairMechanics.map(mechanic => <Typography key={mechanic.mechanicId} variant="h6">
                                {mechanic.name} {mechanic.surname} - {mechanic.hours} hours
                            </Typography>)}
                        </ul>
                        <Form onSubmit={this.handleAddMechanic}>
                            <FormLabel>
                                Add mechanic
                            </FormLabel>
                            <Row>
                                <Col>
                                    <FormControl as="select" id="chosenMechanic" onChange={this.handleChange}>
                                        {garageMechanics.map(garageMechanic =>
                                            <option
                                                value={garageMechanic.id}
                                                key={garageMechanic.id}
                                                onChange={this.handleChange}>
                                                {garageMechanic.name} {garageMechanic.surname}
                                            </option>)}
                                    </FormControl>
                                </Col>
                                <Col>
                                    <FormControl placeholder="Hours" id="hours" onChange={this.handleChange}/>
                                </Col>
                                <Col>
                                    <FormControl as="textarea" placeholder="Notes" id="notes"
                                                 onChange={this.handleChange}/>
                                </Col>
                                <Col>
                                    <Button type="submit" variant="outlined" color="primary">Add mechanic</Button>
                                </Col>
                            </Row>
                        </Form>
                        <Typography variant="h5">Parts:</Typography>
                        <ul>
                            {parts.map(part => <Typography key={part.id} variant="h6">
                                {part.name} -  {part.producer}: {part.price} zł
                            </Typography>)}
                        </ul>
                        <Form>
                            <FormLabel>
                                Add part
                            </FormLabel>
                            <Row>
                                <Col>

                                </Col>
                            </Row>
                        </Form>
                    </DialogContent>
                </Dialog>
            </div>
        );
    }

}

export default EditRepairDialog;