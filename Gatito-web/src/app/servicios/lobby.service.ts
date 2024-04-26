import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Lobby } from '../interfaces/lobby';

@Injectable({
  providedIn: 'root'
})
export class LobbyService {
  constructor(private http: HttpClient, private authService: AuthService, protected router: Router) { }

  show(id: string): Observable<Lobby> {
    return this.http.get<Lobby>("http://127.0.0.1:8000/api/lobby/" + id)
  }
  
  atacon(id: string, data: any): Observable<Lobby> {
    return this.http.put<Lobby>("http://127.0.0.1:8000/api/lobby/" + id, data)
  }


}
