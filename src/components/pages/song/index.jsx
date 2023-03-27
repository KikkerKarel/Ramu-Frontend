import { Component } from "react";
import SongPage from "../../molecules/Container/PageContainer/Song/index";
import NewSongPage from "../../molecules/Container/PageContainer/Song/newIndex";
import NavBarComponent from "../../organisms/NavBar";

class SongComponent extends Component {
    render() {
        return <>
            <NavBarComponent />
            {/* <SongPage /> */}
            <NewSongPage />
        </>
    }
}

export default SongComponent;