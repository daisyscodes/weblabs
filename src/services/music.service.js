import axios from "axios"

const API_URL = "http://localhost:8000/api/"

class MusicService {

    getAlbum(id) {
        return axios.get(API_URL+"albums/"+id+"/");
    }

    getAlbums (count) {
        if (count===0){
            return axios.get(API_URL+"albums");
        }else{
            return axios.get(API_URL+"albums/?count="+count);
        }
    }

    getBand(id) {
        return axios.get(API_URL+"bands/"+id+"/");
    }

    getBands (count) {
        if (count===0){
            return axios.get(API_URL+"bands/");
        }else{
            return axios.get(API_URL+"bands/?count="+count);
        }
    }

    getArtist(id) {
        return axios.get(API_URL+"artists/"+id+"/");
    }

    getArtists () {
        return axios.get(API_URL+"artists/");
    }
}

export default new MusicService();
