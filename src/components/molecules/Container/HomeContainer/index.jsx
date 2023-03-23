import axios from "axios";
import Cookies from "js-cookie";
import React, { Component } from "react";
import { Container, Row, Col, Button, Image, Stack } from 'react-bootstrap';
import './index.css';
import chanmina from '../../../../images/Chanmina-for-Rolling-Stone-Japan-September-2022-documents-1.jpeg';
import chanmina2 from '../../../../images/ChanminaHeader.png';


class HomeContainer extends Component {

    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this);
    }

    async handleClick() {
        const name = "Dreamcatcher";
        const token = Cookies.get("SpotifyToken");
        const tokenHash = btoa(token);
        console.log(tokenHash);
        await axios.get("/ramu/spotify/api/search/artist", { params: { name: name, tokenHash: tokenHash } }).then(response => {
            console.log(response.data);
        });
    };

    render() {
        return <Container fluid>
            {/* <Row className="home-container-row">
                <Col className="home-container-row-col">
                    <header>This weeks</header>
                </Col>
            </Row>
            <Row className="home-container-row-2">
                <Col>
                    <div className="numberOne-div">
                        <header>#1</header>
                        <Button onClick={this.handleClick}>Get Artist From Database</Button>
                        <Image src={chanmina} style={{height: '60%'}} />
                    </div>
                </Col>
            </Row> */}
            {/* <Row  className="home-row-col layer parallax" style={{ backgroundImage: `url(${chanmina})`, backgroundRepeat: "no-repeat", height: '100%', backgroundPosition: 'center'}}>
            </Row> */}
            {/* <Row style={{backgroundColor: 'red'}}>
                <div className="center-image-div layer parallax" style={{ backgroundImage: `url(${chanmina})`, backgroundRepeat: "no-repeat", backgroundPosition: 'center'}}>
                    <text>test</text>
                </div>
            </Row>
            <Row style={{backgroundColor: 'blue'}}>
                
            </Row> */}
            <Row>
                <div className="image-div-container" style={{ backgroundImage: `url(${chanmina2})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}></div>
                <div className="image-div">
                    <Image src={chanmina} style={{ height: '50%', marginTop: '5%' }} />
                    <text>test</text>
                </div>
            </Row>
            <Row>

            </Row>
        </Container>
    }
}

export default HomeContainer;