import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../servicios/auth.service';


export const authGuard: CanActivateFn = (route, state) => {
  return true;
};
