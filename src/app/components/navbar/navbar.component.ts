import { Component, OnInit } from '@angular/core';
import { User } from "../../models/user/user";
import { AuthenticationService } from "../../services/authentication/authentication.service";

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {
  isCollapsed:boolean;
  currentUser: User;
  bsModalRef: BsModalRef;
  
  /**
   * Crea la instancia de la barra de navegacion
   * @param authenticationService 
   * @param modalService 
   */
  constructor(
    private authenticationService: AuthenticationService,
    private modalService: BsModalService
  ) { 
    this.isCollapsed = true
    this.authenticationService.currentUser.subscribe(user => this.currentUser = user);
  }

  ngOnInit() {
  }

  /**
   * Funcion que llama el servicio para cerrar sesion
   */
  logout(){
    this.authenticationService.logout();
  }

  /**
   * Abre el modal para el registro de un usuario
   */
  openModalSignup() {
    // Envia el titulo del modal
    const initialState = {
      title: 'Registro'
    };
    this.bsModalRef = this.modalService.show(SignupComponent, {initialState});
  }

}
