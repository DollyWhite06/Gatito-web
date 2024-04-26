
import { Routes } from '@angular/router';
import { GameComponent } from './game/game.component';      
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { PartidaComponent } from './partida/partida.component';
import { RegisterComponent } from './register/register.component';
import { ResultsComponent } from './results/results.component';
import { SalaComponent } from './sala/sala.component';
import { VerifyComponent } from './verify/verify.component';
import { EsperaComponent } from './espera/espera.component';
import { autentificateGuard } from './guardias/autentificate.guard';

export const routes: Routes = [

    {path: '', component: IndexComponent},
    {path: 'game/:id', component: GameComponent, canActivate: [autentificateGuard]},
    {path: 'login', component: LoginComponent},
    {path: 'partida', component: PartidaComponent, canActivate: [autentificateGuard]},
    {path: 'register', component: RegisterComponent},
    {path: 'results', component: ResultsComponent, canActivate: [autentificateGuard]},
    {path: 'sala', component: SalaComponent, canActivate: [autentificateGuard]},
    {path: 'verify', component: VerifyComponent},
    {path: 'espera', component: EsperaComponent, canActivate: [autentificateGuard]}
];
