import React, { Component } from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import './song.css';
import chan from "../../../../../images/chan.png";
import axios from 'axios';
import queryString from 'query-string';


function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}

class SongPageContainer extends Component {

    state = {
        id: '',
        artistId: '',
        artistName: '',
        name: '',
        popularity: 0,
        duration: 0,
        image: ''
    }

    async componentDidMount() {
        const urlParams = queryString.parse(window.location.pathname);
        const params = new URLSearchParams(urlParams);
        const idFromUrl = params.get('/song/id');
        await axios.get(`/ramu/api/db/song/get/id/${idFromUrl}`).then(response => {
            this.setState({
                id: response.data.id,
                artistId: response.data.artistId,
                name: response.data.name,
                popularity: response.data.popularity,
                duration: response.data.duration,
                image: response.data.image
            });
        });
        
        await axios.get(`/ramu/spotify/db/artist/id/${this.state.artistId}`).then(response => {
            this.setState({
                artistName: response.data.name
            });
        });
    }

    render() {
        const durationMin = millisToMinutesAndSeconds(this.state.duration);
        return <Container className='song-container' fluid>
            <Row className='song-title-row'>
                <h1 className='song-title'>{this.state.name}</h1>
            </Row>
            <Row className='song-info-row'>
                <Col md={2}>
                    <Row className='artist-info-image-row' style={{ backgroundImage: `url(${this.state.image})`, backgroundRepeat: 'no-repeat'}}></Row>
                    <Row className='artist-info-row-info'>
                        <Col>
                            <h3 id='center-h3'>{this.state.name}</h3>
                            <h5 id='left-h5'>Artist: {this.state.artistName}</h5>
                            <h5 id='left-h5'>Album: note-book -u.-</h5>
                            <h5 id='left-h5'>Label: </h5>
                            <h5 id='left-h5'>Duration: {durationMin}</h5>
                            <Button className='fav-button'>+ Fav</Button>
                        </Col>
                    </Row>
                </Col>
                <Col>
                    <Row className='song-score-info-row'>
                        <Col className='col-border-right' id='center'>
                            <Col>
                                <div className='song-score-div'>
                                    <h3>Score</h3>
                                </div>
                                <div className='song-score'>10</div>
                            </Col>
                            <Col id="vl-center" md={1} sm={1} lg={1}>
                                <div className='vl'></div>
                            </Col>
                        </Col>
                        <Col className='col-border-right' id='center'>
                            <Col>
                                <div className='song-score-div'>
                                    <h3>Scoreboard</h3>
                                </div>
                                <div className='song-score'>9.34</div>
                            </Col>
                            <Col id="vl-center" md={1} sm={1} lg={1}>
                                <div className='vl'></div>
                            </Col>
                        </Col>
                        <Col className='col-border-right' id='center'>
                            <Col>
                                <h3 id='Azonix'>Ranked</h3>
                                <div className='song-score'>#36</div>
                            </Col>
                            <Col id="vl-center" md={1} sm={1} lg={1}>
                                <div className='vl'></div>
                            </Col>
                        </Col>
                        <Col className='col-border-right' id='center'>
                            <Col>
                                <h3 id='Azonix'>Popularity</h3>
                                <div className='song-score'>#64</div>
                            </Col>
                            <Col id="vl-center" md={1} sm={1} lg={1}>
                                <div className='vl'></div>
                            </Col>
                        </Col>
                        <Col className='col-border-right' id='center'>
                            <Col>
                                <h3 id='Azonix'>Users</h3>
                                <div className='song-score'>#35,876</div>
                            </Col>
                        </Col>
                    </Row>
                    <Row className='song-score-button-row'>
                        <Col className='add-button-col'>
                            <Button className='add-button'>+ Add</Button>
                        </Col>
                    </Row>
                    <Row className='song-score-about-row'>
                        <Col>
                            <Row className='hl'>
                                <Col>About</Col>
                                <Col className='edit-end'>Edit</Col>
                            </Row>
                            <Row>
                                <Col>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi a ipsum arcu. Fusce id tristique tellus. Pellentesque vehicula fermentum accumsan. Morbi tincidunt metus sed tempus vestibulum.
                                        Phasellus faucibus cursus lacus vel laoreet. Duis luctus massa diam, at volutpat massa pulvinar sit amet. Fusce pretium quam massa, nec tincidunt nisi auctor et. Fusce quam quam, pretium vel dui ac, elementum ultrices leo.
                                        Nullam non dictum erat, ac tincidunt dolor. Praesent aliquet placerat venenatis.
                                        Mauris accumsan sapien urna, vel volutpat augue tempor ut. Phasellus porttitor sem sed ligula posuere aliquam. Pellentesque gravida neque vel eros malesuada, id placerat est convallis. Donec volutpat gravida ante, sed bibendum nulla feugiat vitae.
                                        Duis auctor dictum nulla, sit amet eleifend est. Mauris in turpis sed libero ultricies sodales vel et tortor. Maecenas quis ex viverra, placerat diam nec, congue sem. Donec non dolor finibus, facilisis nibh eu, fringilla quam. Suspendisse dignissim ut tortor vel vestibulum.
                                        Aliquam sollicitudin, justo vitae eleifend elementum, dui dolor sodales eros, ac venenatis est ligula ac nisl. Ut porttitor consectetur felis ut convallis.
                                    </p>
                                </Col>
                                <Col sm={2}></Col>
                            </Row>
                        </Col>
                        <Col sm={3}></Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    }
}

export default SongPageContainer;