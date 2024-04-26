import { Injectable } from '@angular/core';
import Pusher from 'pusher-js';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  pusher: Pusher 
  constructor() {
    this.pusher = new Pusher('13694229a9778f64b99d', {
      cluster: 'us3'
    });
  }

}
