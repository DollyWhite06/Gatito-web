import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDividerModule} from '@angular/material/divider';
import { LoginService } from '../servicios/login.service'
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Login } from '../interfaces/login';
import { Usuario } from '../interfaces/usuario';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ MatSlideToggle, MatToolbarModule, MatButtonToggleModule, MatCardModule,
    MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatIconModule, MatDividerModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
hide = true;
 email = new FormControl('', [Validators.required, Validators.email]);  
 password = new FormControl('', [Validators.required, Validators.minLength(9)]);

 constructor(protected service: LoginService, protected router: Router) {}

login() {
  let self = this
  let login : Login = {
    email: this.email.value ?? "",
    password: this.password.value ?? ""
  }
  // cehcar que no sea nulo

  this.service.login(login).subscribe({
    next(value: Usuario) {
      // llevarlo a verify
      console.log("id:", value.id);
      console.log("verify_code:",value.verified_token);
      console.log("Token:", value.verified_token);
      self.router.navigate(['/verify',{email: value.email, password: value.password}])
      localStorage.setItem('token',value.token)
      localStorage.setItem('id',value.id.toString())
    },
    error(err) {
      console.log(err)
    },
  })
}

 getErrorMessageEmail() {
 if (this.email.hasError('required')) {
 return 'Ingresa tu email';
 }

 return this.email.hasError('email') ? 'Email invalido' : '';
 }
 
 getErrorMessagePassword() {
 if (this.password.hasError('required')) {
 return 'Ingresa tu contraseña';
 }

 return this.password.hasError('password') ? 'Contraseña invalida' : '';
 }
}