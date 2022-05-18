import React, { Component } from "react";
import { Modal, Table } from "react-bootstrap";
import './index.css';
import axios from 'axios';

const scoreList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

class MusicListComponent extends Component {

    state = {
        open: false,
        show: Boolean,
        personalList: [],
    }

    constructor(props) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
        this.state.show = props.show;
    }

    async componentDidMount() {
        await axios.get('ramu/list/get').then(response => this.setState(
            {
                personalList: response.data
            }
        ));
    }

    handleClose () {
        if (this.state.show === false) {
            this.setState({ open: false });
        }
    }

    handleShow() {
        if (this.state.show) {
            this.setState({ open: true });
        }
    }

    render () {
        return <Modal {...this.props } size="lg">
            <Modal.Header className="musiclist-modal-header">
                <Modal.Title id="modal-title">MyMusicList</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-body">
                <Table className="musiclist-table" responsive striped hover>
                    <thead id="centered">
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Artist</th>
                                <th>Score</th>
                            </tr>
                        </thead>
                    { this.state.personalList.map((entry, index) => {
                        return ( 
                        <tbody id="centered">
                            <tr>
                                <td>{index + 1}</td>
                                <td>{entry.songName}</td>
                                <td>{entry.artist}</td>
                                <td>
                                    <select id="score-select" defaultValue={entry.rating}>
                                        { scoreList.map(score => {
                                            return <option>{score}</option>
                                        })}
                                    </select>
                                </td>
                            </tr>
                        </tbody>
                        )
                    })}
                </Table>
            </Modal.Body>
        </Modal>
    }
}

export default MusicListComponent;