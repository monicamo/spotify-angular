import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { IMusica } from '../interfaces/imusica';
import { newMusica } from 'src/app/common/factories';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-lista-musicas',
  templateUrl: './lista-musicas.component.html',
  styleUrls: ['./lista-musicas.component.scss']
})
export class ListaMusicasComponent implements OnInit, OnDestroy {

  bannerImagemUrl = '';
  bannerTexto = '';

  musicas: IMusica[];
  musicaAtual: IMusica = newMusica();
  playIcone = faPlay;
  subsRoute: Subscription[] = [];

  constructor(private activedRoute: ActivatedRoute, private spotifyService: SpotifyService) {}

  ngOnInit(): void {
    this.obterMusicas();
  }

  ngOnDestroy(): void {
    this.subsRoute.forEach( sub => sub.unsubscribe() );
  }

  obterMusicas() {
    const subRoute = this.activedRoute.paramMap.subscribe( async params => {
      const  tipo = params.get('tipo');
      const id = params.get('id');

      await this.obterDadosDaPagina(tipo, id);
    });

    this.subsRoute.push(subRoute);
  }

  async obterDadosDaPagina(tipo: string, id: string) {
    console.log(tipo)
    console.log(id)
    if (tipo === 'playlist')
      await this.obterDadosPlaylist(id);
    else if (tipo === "artista")
      await this.obterDadosArtista(id);
  }

  async obterDadosPlaylist(playlistId: string) {
    console.log(playlistId)
    const playlistMusicas = await this.spotifyService.buscarMusicasPlaylist(playlistId);
    this.musicas = playlistMusicas.musicas;

    console.log(playlistMusicas)

    this.bannerImagemUrl = playlistMusicas.imagemUrl;
    this.bannerTexto = playlistMusicas.nome;
  }

  async obterDadosArtista(artistaId: string) {

  }

}
