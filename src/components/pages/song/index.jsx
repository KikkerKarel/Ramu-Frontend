import { Component } from "react";
import SongPage from "../../molecules/Container/PageContainer/Song";
import NavBarComponent from "../../organisms/NavBar";

class SongComponent extends Component {
    render() {
        return <>
            <NavBarComponent />
            <SongPage />
        </>
    }
}

export default SongComponent;