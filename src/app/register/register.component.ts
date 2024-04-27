import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDividerModule} from '@angular/material/divider';
import { RegisterService } from '../servicios/register.service'
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Registro } from '../interfaces/registro';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ MatSlideToggle, MatToolbarModule, MatButtonToggleModule, MatCardModule,
    MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatIconModule, MatDividerModule, MatButtonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})


export class RegisterComponent {
hide = true;
 email = new FormControl('', [Validators.required, Validators.email]);  
 password = new FormControl('', [Validators.required, Validators.minLength(9)]);
 name = new FormControl('',[Validators.required, Validators.minLength(10)] )

constructor(protected service: RegisterService, protected router: Router) {}

registrar() {
  let self = this
  let registro : Registro = {
    name: this.name.value ?? "",
    email: this.email.value ?? "",
    password: this.password.value ?? ""
  }
  // cehcar que no sea nulo

  this.service.register(registro).subscribe({
    next(value) {
      // llevarlo a login.
      console.log(value.name)
      self.router.navigate(['/login'])
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
 
 getErrorMessagename() {
  if (this.name.hasError('required')) {
   return 'Ingresa tu nombre';
  }

 return this.name.hasError('name') ? 'Nombre invalido' : '';
 }
 getErrorMessagePassword() {
 if (this.password.hasError('required')) {
 return 'Ingresa tu contraseña';
 }

 return this.password.hasError('password') ? 'Contraseña invalida' : '';
 }
} 