import { Component } from "react";
import { Container, Row, Image, Table } from "react-bootstrap";
import './newSong.css';
import chanmina from '../../../../../images/Chanmina-for-Rolling-Stone-Japan-September-2022-documents-1.jpeg'
import chanminaSong from '../../../../../images/chanminaNGU.png';

class NewSongPage extends Component {


    render() {
        return <Container fluid>
            <Row>
                <div style={{ height: '30%', textAlign: 'center', position: 'absolute' }} id="bg-color">
                    {/* <Table style={{ tableLayout: 'fixed' }} responsive>
                        <tbody >
                            <tr>
                                <td>My Score</td>
                                <td>Scoreboard</td>
                                <td>Ranked</td>
                            </tr>
                            <tr>
                                <td>9</td>
                                <td>9.36</td>
                                <td>41</td>
                            </tr>
                        </tbody>
                    </Table> */}
                    <div style={{display: 'flex', justifyContent: 'space-evenly', marginTop: '2%'}}>
                        <div style={{ marginTop: '2%' }}>
                            <h1>Score</h1>
                            <h1>10</h1>
                        </div>
                        <div id="info-div" style={{height: 'fit-content'}}>
                            <h1>Scoreboard</h1>
                            <h1>10</h1>
                        </div>
                        <div style={{ marginTop: '2%' }}>
                            <h1>Ranked</h1>
                            <h1>10</h1>
                        </div>
                    </div>

                    <div style={{ marginTop: '2%', lineHeight: '5px' }}>
                        <header style={{ fontSize: '30px' }}>Chanmina</header>
                        <h1 style={{ fontSize: '70px', fontWeight: 'bold' }}>Never Grow Up</h1>
                    </div>

                    <div id="centered">
                        <Image src={chanminaSong} style={{ height: '500px', width: '500px' }} />
                    </div>
                </div>
            </Row>
        </Container>
    }
}

export default NewSongPage;