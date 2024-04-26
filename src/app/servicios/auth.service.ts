import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(protected http: HttpClient) {

  }

  getToken(): string {
    return localStorage.getItem('token') ?? '';
  }

  currentUser: Usuario | null = null

  setCurrentUser(user: Usuario): void {
    this.currentUser = user;
  }

  getCurrentUser(): Usuario | null {
    return this.currentUser;
  }

  me(): Observable<Usuario> {
    return this.http.post<Usuario>("http://192.168.124.141:8000/api/me", undefined)
  }

  logout()
  {
    localStorage.removeItem('token')
  }
}