import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Verify } from '../interfaces/verify';
import { Observable } from 'rxjs';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class VerifyService {

  constructor(protected http: HttpClient) { }
  verify(data: Verify): Observable<Usuario>{
    return this.http.post<Usuario>('http://127.0.0.1:8000/api/verify', data);
  }
}
