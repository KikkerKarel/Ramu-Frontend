import { Table } from "react-bootstrap";
import '../../molecules/Search/OffCanvas/End/index.css';

export function SearchBar({ keyword, onChange }) {
    const BarStyle = { width: "20rem", background: "#F0F0F0", border: "none", padding: "0.5rem" };
    return (
        <input
            style={BarStyle}
            key="search-bar"
            value={keyword}
            placeholder="...search"
            onChange={(e) => onChange(e.target.value)}
        />
    );
}


export function ArtistSearchList(props) {

    var newList = props.artistList;

    return (
        <div className="search-result-container">
            <Table responsive hover>
                {newList.map((item) => {
                    return (
                        <tbody style={{ border: 'none' }} id="box-shadow" onClick={(e) => props.onClick(e)}>
                            <tr>
                                <td style={{ border: 'none' }}><img src={item.image} loading="lazy" width="50" alt="" /></td>
                                <td style={{ border: 'none' }}>{item.name}</td>
                            </tr>
                        </tbody>
                    )
                })}
            </Table>
        </div>
    )
};


export function SongSearchList(props) {

    var newList = props.songList;

    return (
        <div className="search-result-container">
            <Table responsive hover>
                {newList.map((item) => {
                    return (
                        <tbody style={{ border: 'none' }} id="box-shadow" onClick={(e) => props.onClick(e)}>
                            <tr>
                                <td style={{ border: 'none' }}><img src={item.image} loading="lazy" width="50" alt="" /></td>
                                <td style={{ border: 'none' }}>{item.name}</td>
                            </tr>
                        </tbody>
                    )
                })}
            </Table>
        </div>
    )
};