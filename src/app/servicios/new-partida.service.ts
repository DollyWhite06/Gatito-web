import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {NewPartida} from '../interfaces/new-partida'
import { Observable, from } from 'rxjs';
import { LoginService } from './login.service';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NewPartidaService {
  constructor(private http: HttpClient, private authService: AuthService, protected router: Router) { }

  partidate(): Observable<NewPartida> {
    return this.http.post<NewPartida>("http://127.0.0.1:8000/api/partida", undefined)
  }

  index(): Observable<NewPartida[]> {
    return this.http.get<NewPartida[]>("http://127.0.0.1:8000/api/partidasDisponibles")
  }

  venga(id: string): Observable<any> {
    return this.http.put<NewPartida[]>("http://127.0.0.1:8000/api/partida/join/" + id, undefined)
  }

}
