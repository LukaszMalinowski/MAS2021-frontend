import {Component} from "react";
import {Button, Dialog, Typography} from "@material-ui/core";
import GarageService from "../../services/garage-service"
import AuthService from "../../services/auth-service";

class EditRepairDialog extends Component {

    constructor(props) {
        super(props);

        const user = AuthService.getCurrentUser();

        this.state = {
            open: false,
            currentUser: user,
            garageMechanics: []
        }
    }

    toggleOpen = () => this.setState(state => state.open = !state.open)

    componentDidMount() {
        GarageService.fetchAllGarageMechanics(this.state.currentUser.garageId)
            .then(response => this.setState({garageMechanics: response}));
    }

    render() {
        const open = this.state.open;

        return (
            <div>
                <Button color="primary" variant="contained" onClick={this.toggleOpen}>Edit</Button>
                <Dialog open={open} onClose={this.toggleOpen}>
                    <Typography variant="subtitle2" id="category-label">
                        Hello
                    </Typography>
                </Dialog>
            </div>
        );
    }

}

export default EditRepairDialog;