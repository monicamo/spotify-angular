import { IArtista } from "../pages/interfaces/iartista";

export function newArtista(): IArtista {
    return {
        id: '',
        nome: '',
        imagemUrl: ''
    }
}