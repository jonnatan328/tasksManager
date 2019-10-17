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
  
  constructor(
    private authenticationService: AuthenticationService,
    private modalService: BsModalService
  ) { 
    this.isCollapsed = true
    this.authenticationService.currentUser.subscribe(user => this.currentUser = user);
  }

  ngOnInit() {
  }

  logout(){
    this.authenticationService.logout();
  }

  openModalSignup() {
    const initialState = {
      title: 'Registro'
    };
    this.bsModalRef = this.modalService.show(SignupComponent, {initialState});
    this.bsModalRef.content.closeBtnName = 'Cancelar';
  }

}
