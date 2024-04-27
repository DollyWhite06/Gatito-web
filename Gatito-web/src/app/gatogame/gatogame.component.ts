import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { WebsocketService } from '../servicios/websocket.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GatoService } from '../servicios/gato.service';
import { Gato } from '../interfaces/gato';
import { GameService } from '../servicios/game.service';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    CommonModule,
    NgIf,
    NgFor,
    MatSlideToggle,
    MatToolbarModule,
    MatButtonToggleModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule
  ],
  templateUrl: './gatogame.component.html',
  styleUrls: ['./gatogame.component.css']
})
export class GameComponent implements OnInit {
  tiles: string[][] = [];
  buttonStates: boolean[][] = [];

  constructor(
    protected websocket: WebsocketService,
    protected router: Router,
    protected gatoService: GatoService,
    protected activatedRoute: ActivatedRoute,
    public gameService: GameService // Inyecta el servicio GameService
  ) {}

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
        this.tiles[i][j] = this.gameService.board[i * 3 + j].state
          ? this.gameService.board[i * 3 + j].state === 'X'
            ? 'assets/XX.png'
            : 'assets/OO.png'
          : '../../assets/background.png';
      }
    }
  }

  initializeButtonStates() {
    for (let i = 0; i < this.tiles.length; i++) {
      this.buttonStates[i] = Array(this.tiles[i].length).fill(true);
    }
  }

  handleClick(rowIndex: number, colIndex: number) {
    const squareIndex = rowIndex * 3 + colIndex;
    if (!this.gameService.board[squareIndex].state && this.gameService.isGameRunning) {
      this.gameService.changePlayerTurn({ id: squareIndex, state: this.gameService.activePlayer });
      this.tableroGatito();
      this.initializeButtonStates();
    }
  }

  resetGame() {
    this.gameService.newGame();
    this.tableroGatito();
    this.initializeButtonStates();
  }
}