import * as React from "react";
import MusicService from "../../services/music.service";


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


class Profile extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            history: "",
            albums: [],
            content: []
        }

    }

    componentDidMount() {
        const { match: { params } } = this.props;
        if (params.t==='1'){
            MusicService.getBand(params.artistId)

                .then(response => {
                    const band = response.data;
                    this.setState({
                        cover: band.cover,
                        name: band.name,
                        albums: band.album_band
                    });
                    for (let i=0; i < this.state.albums.length;i++){
                        MusicService.getAlbum(this.state.albums[i])
                            .then(response => {
                                this.setState( {
                                    content: this.state.content.concat([response.data])
                                })
                            })
                    }

                });
        }else{
            MusicService.getArtist(params.artistId)
                .then(response => {
                    const artist = response.data;
                    this.setState({
                        cover: artist.photo,
                        name: artist.nick_name,
                        albums: artist.album_artist,
                        history: artist.history
                    });
                    for (let i=0; i < this.state.albums.length;i++){
                        MusicService.getAlbum(this.state.albums[i])
                            .then(response => {
                                this.setState( {
                                    content: this.state.content.concat([response.data])
                                })
                            })
                    }
                })
        }
    }

    render() {

        return (
            <div className="alb">
                <div class="row row-content" style={{marginTop: "50px"}}>
                    <div className="col-12">
                        <div class="card mb-3 album" style={{backgroundColor: "#1F222E", color: "#e2e2e2"}}>
                            <div class="row no-gutters">
                                <div class="col-md-4">
                                    <img src={process.env.PUBLIC_URL+"/"+this.state.cover} className="card-img" alt="..."/>
                                </div>
                                <div class="col-md-8">
                                    <div class="card-body">
                                        <h1 class="card-title">{this.state.name}</h1>
                                        <p class="card-text">{this.state.history}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row row-content">
                    <div className="col-12" >
                        <div className="col text-center">
                            <h1>Albums</h1>
                        </div>
                        {this.state.content.map((content, i) => <div>
                            {
                                card(content.cover, content.name, "/album/"+content.id+"/")
                            }
                        </div>)}
                    </div>
                </div>

            </div>


        )}
}

export default Profile;
