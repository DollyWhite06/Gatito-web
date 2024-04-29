import { CommonModule, NgFor, NgIf } from '@angular/common';
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
import { WebsocketService } from '../servicios/websocket.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LobbyService } from '../servicios/lobby.service';
import { Lobby } from '../interfaces/lobby';
import { Gato } from '../interfaces/gato';
import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor,
    MatSlideToggle, MatToolbarModule, MatButtonToggleModule, MatCardModule,
    MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatIconModule, MatDividerModule, MatButtonModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent {
  
  catTiles: string[] = [
    '../../assets/fondo.png',
    '../../assets/xx.png',
    '../../assets/oo.png',
  ];
  
  loading = true
  gato: Gato | undefined
  id: string
  idUser: string
  private canalDibujoSubscription: Subscription | undefined;
  
  constructor(protected websocket: WebsocketService, protected router: Router, protected lobbyService: LobbyService,
    protected activatedRoute: ActivatedRoute
  ) {
    let self = this
    this.id = this.activatedRoute.snapshot.params['id']
    this.idUser = localStorage.getItem('id') ?? "0"
    var canalDibujo =  this.websocket.pusher.subscribe(`my-channel-${this.id}`)

    canalDibujo.bind('my-event',function(data:any){
      self.check()
    })
    self.check()
  }


  justShow()
  {
    let self = this
    this.lobbyService.show(this.id).subscribe(
      {
        next(value) {
          self.gato = value
          if (self.gato.jugadorX != null) {
            self.loading = false
          }
        }
      }
    )
  }

  check() {
    let self = this
    this.lobbyService.show(this.id).subscribe({
      next(value) {
        self.gato = value
        if (self.gato.jugadorX != null) {
          self.loading = false
        }
        if (self.gato.ganador != null) {
          if (self.gato.ganador.toString() == self.idUser) {
            alert("¡Ganaste!")
            self.router.navigate(['/results'])
          } else {
            alert("¡Perdiste!")
            self.router.navigate(['/results'])
          }
        }

        if(self.gato.empate)
          {
            alert("¡Empate! Nadie gana esta ronda")
            self.router.navigate(['/results'])
          }
      },
    })
  }

  dibujar(rowIndex: number, colIndex: number) {
    if (this.gato && this.gato.turno.toString() == this.idUser) {
      let self = this
      this.lobbyService.atacon(this.id, {rowIndex: rowIndex, colIndex: colIndex}).subscribe({
        next(value) {
          console.log(value)
          self.gato = value
        },
      })

    } else {
      alert("No es tu turno")
    }
    
  }
  

  //handleClick(rowIndex: number, colIndex: number) {
  //  this.buttonStates[rowIndex][colIndex] = false;
  //  const letter = this.getLetterFromIndex(rowIndex);
  //  this.currentCoordinate = `${letter}${colIndex + 1}`;
  //}
}
