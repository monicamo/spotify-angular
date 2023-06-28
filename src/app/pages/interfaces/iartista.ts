import { IMusica } from "./imusica";

export interface IArtista {
  id: string,
  nome: string,
  imagemUrl: string,
	musicas?: IMusica[]
}