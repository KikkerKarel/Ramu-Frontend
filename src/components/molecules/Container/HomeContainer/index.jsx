import axios from "axios";
import Cookies from "js-cookie";
import React, { Component } from "react";
import { Container, Row, Table, Col, Button, Image } from 'react-bootstrap';
import './index.css';
import jwt from 'jwt-decode';
import { Buffer } from 'buffer';
import ArrowRight from "../../../atoms/Icons/ArrowRight";
import trySampleRequest from "../../../../service/googleAuth";
import queryString from 'query-string';

class HomeContainer extends Component {

    state = {
        artistId: '',
        artistName: '',
        artistImage: '',
        about: '',
        spotifyUrlL: '',
        songId: '',
        songName: '',
        songImage: ''
    }

    constructor(props) {
        super(props)
        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleWebScrapeCall = this.handleWebScrapeCall.bind(this);
        this.handleToSong = this.handleToSong.bind(this);
        this.handleToArtist = this.handleToArtist.bind(this);
    }

    async componentDidMount() {
        const name = "Dreamcatcher";
        // const token = Cookies.get("SpotifyToken");
        // const tokenHash = Buffer.from(token, 'utf8').toString('base64');
        // console.log(tokenHash);
        await axios.get(`/ramu/spotify/db/artist/${name}`).then(response => {
            console.log(response.data);
            this.setState({
                artistId: response.data.id,
                artistName: response.data.name,
                artistImage: response.data.image,
                spotifyUrl: response.data.spotifyUrl,
                about: response.data.about
            });
        });

        this.setState({ songId: '7uvW1F97LfVbOF6bzHs3nO' });

        await axios.get(`/ramu/api/db/song/get/id/${this.state.songId}`).then(response => {
            this.setState({
                songName: response.data.name,
                songImage: response.data.image
            });
        });
    }

    async handleClick() {

    };

    async handleWebScrapeCall() {
        const json = JSON.stringify({ url: this.state.spotifyUrl });
        console.log(json);
        await axios.post('/ramu/webscraper/scrape/about', json, { headers: { 'Content-Type': 'application/json' } })
            .then(response => {
                console.log(response.data.payload);
                this.setState({ about: response.data.payload });
            });

        await axios.put('/ramu/api/db/artist/add/about', null, {
            params: {
                artistId: this.state.artistId,
                about: this.state.about
            }
        })
            .then(response => {
                console.log(response.data);
            });
    }

    handleToSong() {
        window.location.href = `/song/id=${this.state.songId}`;
    }

    handleToArtist() {
        window.location.href = `/artist/id=${this.state.artistId}`;
    }

    render() {
        return <Container className="home-container" fluid>
            <Row>
                <header className="header">
                    <h1>This weeks #1</h1>
                </header>
            </Row>
            <Row className="card-row">
                <Col id='card-col' md={2}>
                    <Row><h4 id="azonix">Song</h4></Row>
                    <Row className="home-image-row" style={{ backgroundImage: `url(${this.state.songImage})`, backgroundRepeat: "no-repeat" }}></Row>
                    <Row>
                        <header className="card-header">
                            <h1 style={{ fontSize: '20px' }}>{this.state.songName}</h1>
                        </header>
                        <p style={{ textAlign: 'start', marginTop: '5%' }}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi a ipsum arcu. Fusce id tristique tellus. Pellentesque vehicula fermentum accumsan. Morbi tincidunt metus sed tempus vestibulum.
                            Phasellus faucibus cursus lacus vel laoreet. Duis luctus massa diam, at volutpat massa pulvinar sit amet. Fusce pretium quam massa, nec tincidunt nisi auctor et. Fusce quam quam, pretium vel dui ac, elementum ultrices leo.
                            Nullam non dictum erat, ac tincidunt dolor. Praesent aliquet placerat venenatis.
                        </p>
                    </Row>
                    <Row>
                        <Button className="card-btn" onClick={this.handleToSong}>
                            Check it out !
                            <div id="card-btn-arrow">
                                <ArrowRight />
                            </div>
                        </Button>
                    </Row>
                </Col>
                <Col id='card-col' md={2} style={{ marginLeft: '30px', marginRight: '30px' }}>
                    <Row><h4 id="azonix">Artist</h4></Row>
                    <Row className="home-image-row" style={{ backgroundImage: `url(${this.state.artistImage})`, backgroundRepeat: "no-repeat" }}></Row>
                    <Row className="about-p">
                        <header className="card-header">
                            <h1 style={{ fontSize: '20px' }}>{this.state.artistName}</h1>
                        </header>
                        <p style={{ textAlign: 'start', marginTop: '5%' }}>
                            {this.state.about}
                        </p>
                    </Row>
                    <Row>
                        <Button className="card-btn" onClick={this.handleToArtist}>
                            Check it out !
                            <div id="card-btn-arrow">
                                <ArrowRight />
                            </div>
                        </Button>
                    </Row>
                </Col>
                <Col id='card-col' md={2}>
                    <Row><h4 id="azonix">Album</h4></Row>
                    <Row className="home-image-row" style={{ backgroundImage: `url(${this.state.songImage})`, backgroundRepeat: "no-repeat" }}></Row>
                    <Row>
                        <header className="card-header">
                            <h1 style={{ fontSize: '20px' }}>{this.state.songName}</h1>
                        </header>
                        <p style={{ textAlign: 'start', marginTop: '5%' }}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi a ipsum arcu. Fusce id tristique tellus. Pellentesque vehicula fermentum accumsan. Morbi tincidunt metus sed tempus vestibulum.
                            Phasellus faucibus cursus lacus vel laoreet. Duis luctus massa diam, at volutpat massa pulvinar sit amet. Fusce pretium quam massa, nec tincidunt nisi auctor et. Fusce quam quam, pretium vel dui ac, elementum ultrices leo.
                            Nullam non dictum erat, ac tincidunt dolor. Praesent aliquet placerat venenatis.
                        </p>
                    </Row>
                    <Row>
                        <Button className="card-btn">
                            Check it out !
                            <div id="card-btn-arrow">
                                <ArrowRight />
                            </div>
                        </Button>
                    </Row>
                </Col>
            </Row>

            {/* <Button onClick={this.handleClick}>Get Artist From Database</Button> */}
            {/* <Button onClick={this.handleWebScrapeCall}>Get About From the Webscraper With The API Gateway</Button> */}
        </Container>
    }
}

export default HomeContainer;