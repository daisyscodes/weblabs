import * as React from "react";
import MusicService from "../../services/music.service"
import "./home.css"

function card(img, title, ref) {
    return (
        <div className="responsive">
            <div className="gallery">
                <a href={ref}>
                    <img src={process.env.PUBLIC_URL+"/"+img} alt="s1" width="600" height="400"/>
                </a>
                <div className="desc">{title}</div>
            </div>
        </div>
    )
}


class Home extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            albums: [],
            bands: [],
            artists: []
        };
    }

    componentDidMount() {
        MusicService.getAlbums(5)
            .then(response => {
                    const pl = response.data;
                    this.setState({
                        albums: pl
                    });
                },
                error => {
                    this.setState({
                        albums:
                            (error.response &&
                                error.response.data &&
                                error.response.data.message) ||
                            error.message ||
                            error.toString()
                    });
                });
        MusicService.getBands(5)
            .then(response => {
                    const pl = response.data;
                    this.setState({
                        bands: pl
                    });
                },
                error => {
                    this.setState({
                        bands:
                            (error.response &&
                                error.response.data &&
                                error.response.data.message) ||
                            error.message ||
                            error.toString()
                    });
                });

        MusicService.getArtists()
            .then(response => {
                    const pl = response.data;
                    this.setState({
                        artists: pl
                    });
                },
                error => {
                    this.setState({
                        artists:
                            (error.response &&
                                error.response.data &&
                                error.response.data.message) ||
                            error.message ||
                            error.toString()
                    });
                });
    }

    render() {
        return  (
            <div>
                <div className="row row-content" style={{marginTop: "50px"}}>
                    <div className="col-12" >
                        <div className="col text-center">
                            <h1>Popular albums</h1>
                        </div>
                        {this.state.albums.map((content, i) => <div>
                        {
                            card(content.cover, content.name, "/album/"+content.id+"/")
                        }
                        </div>)}
                    </div>
                </div>

                <div className="row row-content" >
                    <div className="col-12" >
                        <div className="col text-center">
                            <h1>Popular bands</h1>
                        </div>
                        {this.state.bands.map((content, i) => <div>
                            {
                                card(content.cover, content.name, "pr/1/"+content.id+"/")
                            }
                        </div>)}
                    </div>
                </div>

                <div className="row row-content" >
                    <div className="col-12" >
                        <div className="col text-center">
                            <h1>Popular artist</h1>
                        </div>
                        {this.state.artists.map((content, i) => <div>
                            {
                                card(content.photo, content.nick_name, "pr/2/"+content.id+"/")
                            }
                        </div>)}
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
