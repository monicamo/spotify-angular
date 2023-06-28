import { IArtista } from "../pages/interfaces/iartista";
import { IMusica } from "../pages/interfaces/imusica";
import { IPlaylist } from "../pages/interfaces/iplaylist";

export function newArtista(): IArtista {
    return {
        id: '',
        nome: '',
        imagemUrl: '',
        musicas: []
    }
}

export function newPlaylist(): IPlaylist {
    return {
        id: '',
        nome: '',
        imagemUrl: '',
        musicas: []
    }
}

export function newMusica(): IMusica {
    return {
        id: '',
        titulo: '',
        album: {
            id: '',
            imagemUrl: '',
            nome: ''
        }, 
        artistas : [],
        tempo: ''
    }
}