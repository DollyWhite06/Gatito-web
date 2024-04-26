import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Resultado } from '../interfaces/resultados';

@Injectable({
  providedIn: 'root'
})
export class ResultadosService {

  constructor(private http: HttpClient) {}
  resultados(): Observable<Resultado>
  {
    return this.http.get<Resultado>('http://127.0.0.1:8000/api/partidasGanadas');
  }
  partidasPerdidas(): Observable<Resultado>
  {
    return this.http.get<Resultado>('http://127.0.0.1:8000/api/partidasPerdidas');
  }
}
