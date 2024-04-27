import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSlideToggleModule } from '@angular/material/slide-toggle'; // Corregido
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { ResultadosService } from '../servicios/resultados.service';
import { Partida } from '../interfaces/partida';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-partida',
  standalone: true,
  imports: [ MatSlideToggleModule, MatToolbarModule, MatButtonToggleModule, MatCardModule,
    MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatIconModule, MatDividerModule, MatButtonModule,
  NgFor],
  templateUrl: './partida.component.html',
  styleUrl: './partida.component.css'
})
export class PartidaComponent implements OnInit { 
  hide = true;
  partidas_ganadas: Partida[] = []

  constructor(private partidaService: ResultadosService) { }

  ngOnInit(): void {
    this.obtenerPartidas();
  }

  obtenerPartidas(): void {
    this.partidaService.resultados()
      .subscribe(resultado => {
        this.partidas_ganadas = resultado.partidas;
        console.log(this.partidas_ganadas)
      });
  }
}
