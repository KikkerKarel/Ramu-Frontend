import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import './logo.css';

class SmallLogoComponent extends Component {
    render () {
        return <Container fluid>
            <Row>
                <Col>
                    <header className="small-logo">RAMU</header>
                </Col>
            </Row>
        </Container>
    }
}

export default SmallLogoComponent;