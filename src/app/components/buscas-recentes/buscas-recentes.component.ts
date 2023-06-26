import { Component } from '@angular/core';

@Component({
  selector: 'app-buscas-recentes',
  templateUrl: './buscas-recentes.component.html',
  styleUrls: ['./buscas-recentes.component.scss']
})
export class BuscasRecentesComponent {
  public campoPesquisa = "";

  public pesquisasRecentes: string[] = [
    'Top Global',
    'Top Brasil',
    'Esquenta Sertanejo',
    'Funk Hits',
    'Romanticos'
  ];

  definirPesquisa(pesquisa: string) {
    this.campoPesquisa = pesquisa;
  }

  buscar() {
    console.log('Buscando...', this.campoPesquisa);
  }
}
