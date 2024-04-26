import { Injectable } from '@angular/core';
import {Login} from '../interfaces/login';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(protected http: HttpClient) { }
  login(data: Login): Observable<Usuario>{
    return this.http.post<Usuario>('http://127.0.0.1:8000/api/login', data);
  }
}
