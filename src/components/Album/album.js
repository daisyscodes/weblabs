import * as React from "react";
import MusicService from "../../services/music.service"
import "./album.css"
class Album extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            album: "",
            music: ""
        }
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        MusicService.getAlbum(params.albumId)
            .then(response => {
                    const pl = response.data;
                    this.setState({
                        album: pl
                    });
                });
    }

    render() {
        const elements = [1, 2, 3, 4, 5,6, 7, 8, 9];
        return (
        <div className="alb">
            <div class="row row-content" style={{marginTop: "50px"}}>
                <div className="col-12">
                <div class="card mb-3 album" style={{backgroundColor: "#1F222E", color: "#e2e2e2"}}>
                    <div class="row no-gutters">
                        <div class="col-md-4">
                            <img src={process.env.PUBLIC_URL+"/"+this.state.album.cover} className="card-img" alt="..."/>
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h1 class="card-title">{this.state.album.name}</h1>
                                <p class="card-text">{this.state.album.description}</p>
                                <a href="#" class="btn btn-primary btn-album">Add to library</a>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>

            <div class="row row-content">
                <div class="col-12">
                    <div class="list-group" >
                        {elements.map((el) =>
                            <a href="#" className="list-group-item list-group-item-action music-list"
                               style={{backgroundColor: "#1F222E", color: "#e2e2e2"}}>
                                <div className="row">
                                    <div className="col-1">
                                        <img src={process.env.PUBLIC_URL+"/"+this.state.album.cover} alt="p" height="40" width="40"/>
                                    </div>
                                    <div className="col-9 ml-2">
                                        <h3>Music {el}</h3>
                                    </div>
                                </div>
                            </a>
                        )}
                    </div>
                </div>
            </div>
    </div>
    )}
}

export default Album;
