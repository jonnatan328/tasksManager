import { Component, OnInit } from '@angular/core';
import { User } from "../../models/user/user";
import { AuthenticationService } from "../../services/authentication/authentication.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  public title: string;
  currentUser: User;

  constructor(
    private authenticationService: AuthenticationService
  ) {
    this.title = 'Página principal';
    this.authenticationService.currentUser.subscribe(user => this.currentUser = user);
  }

  ngOnInit() {
    console.log("Se ha cargado el componente home.component.ts");
    
  }

}
