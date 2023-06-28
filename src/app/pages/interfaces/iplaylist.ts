import { IMusica } from "./imusica";

export interface IPlaylist {
	id: string,
	nome: string,
	imagemUrl: string,
	musicas?: IMusica[]
}