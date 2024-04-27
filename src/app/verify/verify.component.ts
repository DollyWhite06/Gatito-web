import { Component, OnInit } from '@angular/core';
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
import { ActivatedRoute, Router } from '@angular/router';
import { VerifyService } from '../servicios/verify.service';
import { Verify } from '../interfaces/verify';

@Component({
  selector: 'app-verify',
  standalone: true,
  imports: [ MatSlideToggle, MatToolbarModule, MatButtonToggleModule, MatCardModule,
    MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatIconModule, MatDividerModule, MatButtonModule],
 templateUrl: './verify.component.html',
  styleUrl: './verify.component.css'
})
export class VerifyComponent implements OnInit{
hide = true;
code = new FormControl('', [Validators.required, Validators.minLength(4)]);
  email!: string;
password!: string;

constructor(private route: ActivatedRoute, private service: VerifyService, private router: Router) { }

ngOnInit(): void {
  this.route.params.subscribe(params => {
    this.email = params['email']
    this.password = params['password']
  });
}
  verify() {
    let self = this
    let verify : Verify = {
      email: this.email ?? "",
      password: this.password ?? "",
      code: this.code.value ?? ""
    }
    // cehcar que no sea nulo
  
    this.service.verify(verify).subscribe({
      next(value
      ) {
        // llevarlo a verify
        
        self.router.navigate(['/sala'])
      },
      error(err) {
        console.log(err)
      },
    })
  }


getErrorMessageCode() {
if (this.code.hasError('required')) {
return 'Ingresa tu codigo';
}

return this.code.hasError('code') ? 'Codigo invalido' : '';
}
}