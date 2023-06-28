import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { IMusica } from '../interfaces/imusica';
import { newMusica } from 'src/app/common/factories';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';

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

  constructor(private activedRoute: ActivatedRoute) {}

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
    if (tipo === 'playlist')
      await this.obterDadosPlaylist(id);
    else if (tipo === "artista")
      await this.obterDadosArtista(id);
  }

  async obterDadosPlaylist(playlistId: string) {

  }

  async obterDadosArtista(artistaId: string) {

  }

}
