import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import './logo.css';

class BigLogoComponent extends Component {
    render () {
        return <Container fluid>
            <Row>
                <Col>
                    <header className="logo">RAMU</header>
                </Col>
            </Row>
        </Container>
    }
}

export default BigLogoComponent;