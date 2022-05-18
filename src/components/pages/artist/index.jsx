import { Component } from "react";
import ArtistPage from "../../molecules/Container/PageContainer/Artist";
import OGArtistComponent from "../../molecules/Container/PageContainer/Artist/ogArtist";
import NavBar from "../../organisms/NavBar";
import '../Page.css';

class ArtistComponent extends Component {
    render() {
        return <div className="all-page-div">
            <NavBar />
            <ArtistPage />
            {/* <OGArtistComponent /> */}
        </div>
    }
}

export default ArtistComponent;