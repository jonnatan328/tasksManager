import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public submitted: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public authenticationService: AuthenticationService
  ) { 
    this.submitted = false;
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, , Validators.minLength(8)]]
    })
  }

  //easy access to form fields
  get formCtrl() { return this.loginForm.controls; }

  onSubmit(){
    console.log("submiting..");
    
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
      }
       
      //this.loading = true;
      this.authenticationService.login(this.formCtrl.email.value, this.formCtrl.password.value)
        .subscribe( data => {
          this.router.navigate(['/']);
        },
            error => {
              console.log("Error en el login: ", error);
              
          //this.toastr.error(error.error.message, 'Error');
          //this.loading = false;
      });
    
  }

}
