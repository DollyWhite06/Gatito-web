import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Gato } from '../interfaces/gato';

@Injectable({
  providedIn: 'root'
})
export class GatoService {

  constructor(private http: HttpClient, private authservice: AuthService, protected router: Router) { }

  show(id: string): Observable<Gato> {
    return this.http.get<Gato>("http://127.0.0.1:8000/api/gato/" + id)
  }
  
  atacon(id: string, data: any): Observable<Gato> {
    return this.http.put<Gato>("http://127.0.0.1:8000/api/gato/" + id, data)
  }
}
