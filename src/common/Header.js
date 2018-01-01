import React, { Component } from 'react';
import { Row, Col } from "react-bootstrap";

class Header extends Component {
    render() {
        return (
            <Row>
                <Col lg={12}>
                    <h1>Weather App</h1>
                </Col>
            </Row>
        );
    }
}

export default Header;