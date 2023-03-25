import axios from "axios";
import Cookies from "js-cookie";
import React, { Component } from "react";
import { Container, Row, Image } from 'react-bootstrap';
import './index.css';
import chanmina from '../../../../images/Chanmina-for-Rolling-Stone-Japan-September-2022-documents-1.jpeg';


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
            <Row>
                <div className="home-container">
                    <div className="background-div-container" style={{ backgroundImage: `url(${chanmina})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
                        <div className="backgroundFilter-div"></div>
                        {/* <div className="background-div" style={{ backgroundImage: `url(${chanmina})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}></div> */}
                    </div>

                    <div>
                        <div className="image-div">
                            <Image src={chanmina} style={{ height: '100%' }} />
                        </div>

                        <div className="home-info-div">
                            <div className="video-div" id="info-div">
                                <iframe width="100%" height="225" src="https://www.youtube-nocookie.com/embed/qw7oS1FBHyI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                            </div>
                            <div className="main-info-div" id="info-div">
                                <h1 id="center">Chanmina</h1>
                                <text>Chanmina is a Japanese-Korean singer/songwriter. She is most known for her hit singles Doctor and Never Grow Up.</text>
                            </div>
                            <div className="video-div" id="info-div">
                                <iframe width="100%" height="225" src="https://www.youtube-nocookie.com/embed/xlX8EzRdMl8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                            </div>
                        </div>
                    </div>
                </div>

            </Row>
            <Row>

            </Row>
        </Container>
    }
}

export default HomeContainer;