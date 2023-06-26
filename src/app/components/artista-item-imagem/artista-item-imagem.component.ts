import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-artista-item-imagem',
  templateUrl: './artista-item-imagem.component.html',
  styleUrls: ['./artista-item-imagem.component.scss']
})
export class ArtistaItemImagemComponent {
  @Input() imagemSrc = '';

  @Input() artistaName = '';

  @Output() click = new EventEmitter();

  onClick() {
    this.click.emit();
  }

}
