import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthenticationService } from '../../services/authentication/authentication.service';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup; //Formulario para el login
  public submitted: boolean;

  /**
   * Crea la instancia del componente login
   * @param formBuilder Agrupa los formContros
   * @param route 
   * @param router 
   * @param authenticationService Contiene los metodos para la autenticacion
   */
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public authenticationService: AuthenticationService,
    private toastr: ToastrService
  ) { 
    this.submitted = false;
  }

  /**
   * Inicializa los campos del formulario con sus validaciones
   */
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, , Validators.minLength(8)]]
    })
  }

  //Obtiene el facil acceso a los campos de formulario
  get formCtrl() { return this.loginForm.controls; }

  /**
   * Metodo que valida los campos del formulario y llama el servicio para la autenticacion
   */
  onSubmit(){
    this.submitted = true;
    //Valida que los campos no tengan errores 
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
        this.toastr.error('', "Correo o contraseña inválido.", {
          positionClass: 'toast-bottom-center'
        });
        //this.loading = false;
    });
    
  }

}
