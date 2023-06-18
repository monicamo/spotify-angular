import { Injectable } from "@angular/core";
import { CanLoad, Route, Router, UrlSegment, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { SpotifyService } from "src/app/services/spotify.service";

@Injectable({
  providedIn: "root",
})
export class AutenticadoGuard implements CanLoad {
  constructor(private router: Router,
    private spotifyService: SpotifyService) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {

    const token = localStorage.getItem("token");
  
    if (!token) {
      return this.naoAutenticado();
    }
    
    return new Promise(async (res) => {
      // const teste = new Promise( (res) => {
      //   setTimeout(() => {
      //     res(true);
      //   }, 5000);
      // });
      // teste.then(x => {
      //   console.log(x);  // é o retorno true da linha 32
      // });
      // // se for async, bloqueia e espera ate a promise ser resolvida
      // const mon = await teste() // mon vai ser true
      const usuarioCriado = await this.spotifyService.inicializarUsuario();
      if (usuarioCriado)
        return res(true);
      else {
        this.naoAutenticado(); // TODO rever
        return res(false);
      }
    });
  }

  naoAutenticado() {
    localStorage.clear();
    this.router.navigate(["/login"]);
    return false;
  }
}
