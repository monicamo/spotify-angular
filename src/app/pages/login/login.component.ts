import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { SpotifyService } from "src/app/services/spotify.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private spotifyService: SpotifyService) {}

  ngOnInit(): void {
    this.verificarTokenUrlCallback();
  }

  private verificarTokenUrlCallback() {
    const token = this.spotifyService.obterTokenUrlCallback();

    if (!!token) {
      this.spotifyService.definirAccessToken(token);
      this.router.navigate(['/player/home']);
    } else {
      console.log("nao rolou");
      console.log("nao rolou");
      console.log("nao rolou");
      console.log("nao rolou");
      console.log("nao rolou");
      
    }
  }

  public abrirPaginaLogin() {
    window.location.href = this.spotifyService.obterUrlLogin();
  }
}
