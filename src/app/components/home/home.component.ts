import { Component, OnInit } from '@angular/core';
import { User } from "../../models/user/user";
import { AuthenticationService } from "../../services/authentication/authentication.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  currentUser: User;

  /**
   * Crea la instancia del componente home
   * @param authenticationService Servicio para validar si un usuario esta logueado
   */
  constructor(
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(user => this.currentUser = user);
  }

  ngOnInit() {
    console.log("Se ha cargado el componente home.component.ts");
    
  }

}
