import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../../helpers/mustMatch.validator';
import { UserService } from '../../services/user/user.service';
import { User } from '../../models/user/user';
import { SuccessModalComponent } from "../../components/success-modal/success-modal.component";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})
export class SignupComponent implements OnInit {
  
  title: string;
  closeBtnName: string;
  signUpForm: FormGroup;
  emailPattern: string; // Patron para validar el email
  user: User;

  /**
   * Crea la instancia del signup component
   * @param bsModalRef 
   * @param formBuilder 
   * @param userService 
   * @param modalService 
   * @param toastr 
   */
  constructor(
    public bsModalRef: BsModalRef,
    public formBuilder: FormBuilder,
    public userService: UserService,
    private modalService: BsModalService,
    private toastr: ToastrService
    ) { 
      this.emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
    }

    /**
     * Inicializa los campos del formulario con sus validaciones
     */
  ngOnInit() {
    this.signUpForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      phone: ['', Validators.required],
      password: ['', [Validators.required, , Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, , Validators.minLength(8)]],
    },{
      validator: MustMatch('password', 'confirmPassword')
    });
  }
  
  /**
   * Obtiene controls del formulario
   */
  get formSignupCtrl(){return this.signUpForm.controls}

  /**
   * Valida los campos y envía la información para el registro del usuario
   */
  onSubmit(){
    if (this.signUpForm.invalid) {
      return;
    }

    // Crea el usuario con los valores del formulario
    this.user = new User(
      this.formSignupCtrl.firstName.value,
      this.formSignupCtrl.lastName.value,
      this.formSignupCtrl.email.value,
      this.formSignupCtrl.phone.value,
      this.formSignupCtrl.password.value);
    
    // Realiza el llamado al servicio de registro
    let resRegistered = this.userService.saveUser(this.user);
    
    //Mapea el mensaje de error según el código de respuesta
    if (resRegistered.code === "200") {
      this.bsModalRef.hide();
      const initialState = {
        title: '¡Exito!',
        message: 'Se ha registrado su cuenta exitosamente.'
      };
      this.bsModalRef = this.modalService.show(SuccessModalComponent, {initialState});
    } else if (resRegistered.code === "500") {
      this.toastr.error('', "Ha ocurrido un error al registrar su cuenta.");
    } else if (resRegistered.code === "301"){
      this.toastr.error('', "Ya existe un usuario con el correo ingresado.", {
        positionClass: 'toast-bottom-center'
      });
    }
    
  }

}
