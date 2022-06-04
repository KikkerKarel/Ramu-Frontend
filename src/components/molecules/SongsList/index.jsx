import { Component } from 'react';
import { Image, Modal, Table } from 'react-bootstrap';
import axios from 'axios';

function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}

class SongsList extends Component {

    state = {
        show: false,
        songs: [],
        artistName: '',
        artistId: ''
    }

    constructor(props) {
        super(props);
        this.state.artistName = props.artistname;
        this.state.artistId = props.artistid;
    }

    async componentDidMount() {
        await axios.get(`/ramu/api/db/song/get/artist/${this.state.artistId}`).then(response => {
            this.setState({ songs: response.data });
        });
    }

    render(){
        return <Modal {...this.props} size='lg'>
            <Modal.Header>
                <Modal.Title id="modal-title">{this.state.artistName}'s songs</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Table>
                    <thead id='centered'>
                        <tr>
                            <th>Image</th>
                            <th>Song</th>
                            <th>Duration</th>
                        </tr>
                    </thead>
                    { this.state.songs.map((song) => {
                        return (
                            <tbody id='centered'>
                                <tr className='table-rows'>
                                    <td><Image className='song-image' src={song.image} /></td>
                                    <td className="td-hz-align">{song.name}</td>
                                    <td className="td-hz-align">{millisToMinutesAndSeconds(song.duration)}</td>
                                </tr>
                            </tbody>
                        );
                    })}
                </Table>
            </Modal.Body>
        </Modal>
    }
}

export default SongsList;