import React, { Component } from "react";
import { Button, Row, Col, Image, Modal, Table } from "react-bootstrap";
import './index.css';
import axios from 'axios';
import jwtDecode from "jwt-decode";
import Cookies from 'js-cookie';

const scoreList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

class MusicListComponent extends Component {

    state = {
        open: false,
        show: Boolean,
        personalList: [],
        edit: false,
    }

    constructor(props) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
        this.state.show = props.show;
        this.handleScoreChange = this.handleScoreChange.bind(this);
    }

    async componentDidMount() {
        const token = Cookies.get("Jwt");
        const user = jwtDecode(token);
        await axios.get(`/ramu/list/get/${user.UserId}`).then(response => this.setState(
            {
                personalList: response.data
            }
        ));
    }

    handleClose() {
        if (this.state.show === false) {
            this.setState({ open: false });
        }
    }

    handleShow() {
        if (this.state.show) {
            this.setState({ open: true });
        }
    }

    async handleScoreChange(e) {
        const selectedIndex = e.target.options.selectedIndex;

        await axios.put('/ramu/list/update/rating', null, {
            params: {
                id: e.target.options[selectedIndex].getAttribute('data-key'),
                rating: e.target.value
            }
        }).then(response => {
            console.log(response);
            window.location.reload(true);
        });
    }

    async handleRemove(event) {
        // console.log(event.target.attributes[1].value);
        const id = event.target.attributes[1].value;
        console.log(id);
        await axios.delete(`/ramu/list/delete/${id}`).then(response => {
            console.log(response.data);
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            window.location.reload(true);
        });
    }

    render() {
        let edit;
        if (this.state.edit) {
            edit = <th onClick={() => this.setState({ edit: false })} className='edit'>Cancel</th>
        } else {
            edit = <th onClick={() => this.setState({ edit: true })} className='edit'>Edit</th>
        }
        return <Modal {...this.props} size="lg">
            <Modal.Header className="musiclist-modal-header">
                <Modal.Title id="modal-title">MyMusicList</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-body">
                <Table className="musiclist-table" responsive striped hover>
                    <thead id="centered">
                        <tr>
                            {edit}
                        </tr>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th id='align-start'>Name</th>
                            <th>Artist</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    {this.state.personalList.map((entry, index) => {
                        return (
                            <tbody id="centered">
                                <tr className="table-rows">
                                    <td className="td-hz-align">{index + 1}</td>
                                    <td><Image className="song-image" src={entry.songImage} /></td>
                                    <td id='align-start' className="td-hz-align">
                                        <Row>
                                            <Col>
                                                {entry.songName}
                                            </Col>
                                            { this.state.edit
                                                ? <Col style={{ display: 'flex', justifyContent: 'center'}}>
                                                    <Button className="remove-btn" onClick={this.handleRemove} entryid={entry.id}>Remove</Button>
                                                  </Col>
                                                : null
                                            }
                                        </Row>
                                    </td>
                                    <td className="td-hz-align">
                                        <div style={{ backgroundImage: `url(${entry.artistImage})`, backgroundRepeat: 'no-repeat' }} className="artist-image-div">
                                            {entry.artist}
                                        </div>
                                    </td>
                                    <td className="td-hz-align">
                                        <select onChange={this.handleScoreChange} id="score-select" defaultValue={entry.rating}>
                                            {scoreList.map(score => {
                                                return <option value={score} data-key={entry.id}>{score}</option>
                                            })}
                                        </select>
                                    </td>
                                </tr>
                            </tbody>
                        );
                    })}
                </Table>
            </Modal.Body>
        </Modal>
    }
}

export default MusicListComponent;