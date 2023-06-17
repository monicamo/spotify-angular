import { Component } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent {
  backgroundColor = '#ff44ff'; // Cor de fundo inicial
  colorInput: string;

  constructor(private firebaseService: FirebaseService) {
    this.firebaseService.onValue('background-color', (snapshot) => {
      const color = snapshot.val();
      this.backgroundColor = color || '#ffffff'; // Defina a cor de fundo recebida ou padrão
    });
  }

 changeBackgroundColor() {
    if (this.colorInput) {
      this.firebaseService.setValue('background-color', this.colorInput);
      this.colorInput = ''; // Limpa a caixa de input após enviar a cor
    }
  }

}
