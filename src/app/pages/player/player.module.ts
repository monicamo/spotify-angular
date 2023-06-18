import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './player.component';
import { RouterModule } from '@angular/router';
import { PlayerRotas } from './player.routes';
import { FormsModule } from '@angular/forms';
import { PainelEsquerdoComponent } from 'src/app/components/painel-esquerdo/painel-esquerdo.component';

@NgModule({
  declarations: [
    PlayerComponent, 
    PainelEsquerdoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(PlayerRotas)
  ]
})
export class PlayerModule { }
