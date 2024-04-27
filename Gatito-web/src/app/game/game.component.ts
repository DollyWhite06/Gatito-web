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

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor,
    MatSlideToggle, MatToolbarModule, 
    MatButtonToggleModule, MatCardModule,
    MatFormFieldModule, 
    MatInputModule,
     FormsModule, ReactiveFormsModule, 
     MatIconModule, 
     MatDividerModule, MatButtonModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent {
  
  caTiles: string[] = [
    '../../assets/background.png',
    'assets/XX.png',
    'assets/OO.png',
  ];

  loading = true
  lobby: Lobby | undefined
  id: string
  idUser: string

  constructor(protected websocket: WebsocketService, protected router: Router, protected lobbyService: LobbyService,
    protected activatedRoute: ActivatedRoute
  ) {
    let self = this
    this.id = this.activatedRoute.snapshot.params['id']
    this.idUser = localStorage.getItem('id') ?? "0"
    var canalsito = this.websocket.pusher.subscribe('my-channel');
    canalsito.bind('my-event', function(data: any) {
      self.check()
    })
    self.check()
  }

  check() {
    let self = this
    this.lobbyService.show(this.id).subscribe({
      next(value) {
        self.lobby = value
        if (self.lobby.jugador2 != null) {
          self.loading = false
        }
        if (self.lobby.ganador != null) {
          if (self.lobby.ganador.toString() == self.idUser) {
            alert("GANASTE!")
            self.router.navigate(['/results'])
          } else {
            alert("PERDISTE!")
            self.router.navigate(['/results'])
          }
        }
      },
    })
  }

  disparar(rowIndex: number, colIndex: number) {
    if (this.lobby && this.lobby.turno.toString() == this.idUser) {
      let self = this
      this.lobbyService.atacon(this.id, {rowIndex: rowIndex, colIndex: colIndex}).subscribe({
        next(value) {
          console.log(value)
          self.lobby = value
        },
      })

    } else {
      alert("No es tu turno")
    }
    
  }

 

 tiles: string[][] = [];
 buttonStates: boolean[][] = [];

 ngOnInit() {
   this.initTablero();
   this.initializeButtonStates();

 }

 initTablero() {
   this.tableroGatito();
 }



 tableroGatito() {
   for (let i = 0; i < 3; i++) {
     this.tiles[i] = [];
     for (let j = 0; j < 3; j++) {
       this.tiles[i][j] = this.caTiles[0];
     }
   }
 }

 getLetterFromIndex(index: number): string {
   return String.fromCharCode(65 + index);
 }
  initializeButtonStates() {
   for (let i = 0; i < this.tiles.length; i++) {
     this.buttonStates[i] = Array(this.tiles[i].length).fill(true);
   }
 }

 handleClick(rowIndex: number, colIndex: number) {
   this.buttonStates[rowIndex][colIndex] = false;
 }

}
