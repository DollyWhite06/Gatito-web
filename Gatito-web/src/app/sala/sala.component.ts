import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatCard, MatCardModule } from '@angular/material/card';
import { NewPartidaService } from '../servicios/new-partida.service';
import { NewPartida } from '../interfaces/new-partida';
import { WebsocketService } from '../servicios/websocket.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { AuthService } from '../servicios/auth.service';
import Pusher from 'pusher-js';
@Component({
  selector: 'app-sala',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule,MatButtonToggleModule, MatCardModule, NgFor, NgIf],
  templateUrl: './sala.component.html',
  styleUrl: './sala.component.css'
})
export class SalaComponent {

  partidas: NewPartida[] = []

  constructor(protected activatedRoute: ActivatedRoute, protected authService: AuthService,private newPartidaservice: NewPartidaService, protected websocket: WebsocketService,
    protected router: Router) {
        Pusher.logToConsole = true;
      var pusher = new Pusher('13694229a9778f64b99d', {
       cluster: 'us3',
     });
  
     let self = this;
     var channel = pusher.subscribe('partidas');
     channel.bind('partidasDisponibles', function(data:any) {
       // self.appaer = true;
       console.log("funcionaaaaaaa");
       self.disponibles()
     });
    this.disponibles()
  }

  mostrarTabla() {
    const tablaContainer = document.getElementById("tablaContainer");
    if (tablaContainer) {
      tablaContainer.style.display = "block";
    }
  }

  disponibles()
  {
    let self  = this
    this.newPartidaservice.index().subscribe({
      next(value){
        self.partidas = value
      }
    })
  }

  unirme(id: string) {
    let self = this
    this.newPartidaservice.venga(id).subscribe({
      next(value) {
        self.router.navigate(['/game/' + id])
        console.log("id")
        console.log(id)
      },
    })

  }

  crear() {
    let self = this
    this.newPartidaservice.partidate().subscribe({
      next(value) {
        self.router.navigate(['/game/' + value.id])
      },
    })
  }

}