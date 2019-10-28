import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//Componentes
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { ErrorComponent } from './components/error/error.component';
import { SignupComponent } from "./components/signup/signup.component";

//Modulos
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { CarouselModule } from 'ngx-bootstrap';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule } from 'ngx-toastr';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';

//Servicios
import { InterceptorService } from './services/interceptor/interceptor.service';
import { APP_CONFIG, APP_DI_CONFIG } from "./services/appConfig/appConfig.constants";
import { LoginComponent } from './components/login/login.component';
import { TaskComponent } from './components/task/task.component';
import { SuccessModalComponent } from './components/success-modal/success-modal.component';
import { FilterPipe } from './pipes/filter/filter.pipe';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { BsDatepickerModule, BsLocaleService  } from 'ngx-bootstrap/datepicker';

import { defineLocale } from 'ngx-bootstrap/chronos';
import { deLocale } from 'ngx-bootstrap/locale';
defineLocale("es", deLocale);

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    ErrorComponent,
    LoginComponent,
    TaskComponent,
    SuccessModalComponent,
    FilterPipe,
    CreateTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    CollapseModule,
    CarouselModule,
    ButtonsModule,
    ModalModule.forRoot(),
    ToastrModule.forRoot(),
    BsDatepickerModule.forRoot()
  ],
  providers: [
    { provide: APP_CONFIG, useValue: APP_DI_CONFIG },
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    SignupComponent,
    SuccessModalComponent,
    CreateTaskComponent
  ],
})
export class AppModule { 
  
}
