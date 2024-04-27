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
import { ActivatedRoute, RouteReuseStrategy, Router, RouterLink } from '@angular/router';
import { Partida } from '../interfaces/partida';
import { ResultadosService } from '../servicios/resultados.service';
import { NgFor } from '@angular/common';
import { LogoutService } from '../servicios/logout.service';
import { Usuario } from '../interfaces/usuario';
import { AuthService } from '../servicios/auth.service';
import { WebsocketService } from '../servicios/websocket.service';
import Pusher from 'pusher-js';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [ NgFor,MatSlideToggle, MatToolbarModule, MatButtonToggleModule, MatCardModule,
    MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatIconModule, MatDividerModule, MatButtonModule, RouterLink],
  templateUrl: './results.component.html',
  styleUrl: './results.component.css'
})
export class ResultsComponent implements OnInit {

hide = true;
  partidas_ganadas: Partida[] = []
  partidas_perdidas: Partida[] = []

  constructor(protected resultadoService: ResultadosService, protected authService: AuthService, protected router: Router, protected websocket: WebsocketService) 
  { }

  ngOnInit(): void {
    this.obtenerPartidas();
    this.partidasP();
  }

  obtenerPartidas(): void {
    this.resultadoService.resultados()
      .subscribe(resultado => {
        this.partidas_ganadas = resultado.partidas;
        console.log(this.partidas_ganadas)
      });
  }

  partidasP(): void
  {
    this.resultadoService.partidasPerdidas()
      .subscribe(resultadoP => {
        this.partidas_perdidas = resultadoP.partidas;
        console.log(this.partidas_perdidas)
      }); 
  }

  logout()
  {
    this.authService.logout()
  }


 
 }
