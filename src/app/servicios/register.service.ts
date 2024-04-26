import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Registro } from '../interfaces/registro';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(protected http: HttpClient) { }
  register(data: Registro): Observable<Usuario>{
    return this.http.post<Usuario>('http://127.0.0.1:8000/api/register', data);
  }
}
