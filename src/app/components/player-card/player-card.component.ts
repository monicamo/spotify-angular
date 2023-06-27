import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { faStepBackward, faStepForward } from '@fortawesome/free-solid-svg-icons';
import { newMusica } from 'src/app/common/factories';
import { IMusica } from 'src/app/pages/interfaces/imusica';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.scss']
})
export class PlayerCardComponent implements OnInit, OnDestroy {
  musica: IMusica = newMusica();
  subs: Subscription[] = [];

  // Icones
  anteriorIcone = faStepBackward;
  proximoIcone = faStepForward;

  constructor(private playerService: PlayerService) {}

  ngOnDestroy(): void {
    this.subs.forEach( xx => xx.unsubscribe());
  }

  ngOnInit(): void {
    this.obterMusicaTocando();
  }

  obterMusicaTocando() {
    const sub = this.playerService.musicaAtual.subscribe( musica => {
      console.log(musica)
      this.musica = musica;
    });

    this.subs.push(sub);
  }

  voltarMusica() {
    this.playerService.voltarMusica();
  }

  proximaMusica() {
    this.playerService.proximaMusica();
  }

}
