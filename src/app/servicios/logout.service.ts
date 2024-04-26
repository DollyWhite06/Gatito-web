import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../interfaces/usuario';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(protected http: HttpClient, private authService: AuthService){}
  logout():Observable<Usuario>
  {
    return this.http.post<Usuario>('http://127.0.0.1:8000/api/logout', undefined); 
  }
}
