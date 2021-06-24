import {Component} from "react";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import "./RegistrationPage.css"

class RegistrationPage extends Component {

    handleChange = evt => {
        this.setState({[evt.target.id]: evt.target.value})
    }

    render() {
        console.log(this.state)

        return (
            <Form className="Registration-page">
                <Container style={{marginTop: "20px", marginBottom: "20px"}}>
                    <Row>
                        <Col>
                            <Form.Label>Email</Form.Label>
                            <Form.Control id="email" type="email" placeholder="Enter email" onChange={this.handleChange}/>
                        </Col>
                        <Col>
                            <Form.Label>Password</Form.Label>
                            <Form.Control id="password" type="password" placeholder="Password" onChange={this.handleChange}/>
                        </Col>
                    </Row>
                </Container>

                <Container style={{marginTop: "20px", marginBottom: "20px"}}>
                    <Row>
                        <Col>
                            <Form.Label>First name</Form.Label>
                            <Form.Control id="firstName" type="text" placeholder="First name" onChange={this.handleChange}/>
                        </Col>
                        <Col>
                            <Form.Label>Last name</Form.Label>
                            <Form.Control id="lastName" type="text" placeholder="Last name" onChange={this.handleChange}/>
                        </Col>
                        <Col>
                            <Form.Label>Phone number</Form.Label>
                            <Form.Control id="phoneNumber" type="text" placeholder="Phone number" onChange={this.handleChange}/>
                        </Col>
                    </Row>
                </Container>

                <Container style={{marginTop: "20px", marginBottom: "20px"}}>
                    <Row>
                        <Col>
                            <Form.Label>Street</Form.Label>
                            <Form.Control id="street" type="text" onChange={this.handleChange}/>
                        </Col>
                        <Col>
                            <Form.Label>House number</Form.Label>
                            <Form.Control id="houseNumber" type="text" onChange={this.handleChange}/>
                        </Col>
                        <Col>
                            <Form.Label>Apartment number</Form.Label>
                            <Form.Control id="apartmentNumber" type="text" onChange={this.handleChange}/>
                        </Col>
                    </Row>
                </Container>
                <Container style={{marginTop: "20px", marginBottom: "20px", width: "70%"}}>
                    <Row>
                        <Col>
                            <Form.Label>City</Form.Label>
                            <Form.Control id="city" type="text" onChange={this.handleChange}/>
                        </Col>
                        <Col>
                            <Form.Label>Zip-code</Form.Label>
                            <Form.Control id="zipcode" type="text" onChange={this.handleChange}/>
                        </Col>
                    </Row>
                </Container>
                <div style={{textAlign: "center"}}>
                    <Button style={{textAlign: "center", margin: "auto"}} variant="primary" type="submit">
                        Submit
                    </Button>
                </div>
            </Form>
        )
    }
}

export default RegistrationPage;