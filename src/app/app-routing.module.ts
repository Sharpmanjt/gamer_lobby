import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CdkColumnDef } from '@angular/cdk/table';

import { DashboardComponent } from './dashboard/dashboard.component';
import { GameDetailsComponent } from './games/game-details/game-details.component';
import { GameListComponent } from './games/game-list/game-list.component';
import { PlayerDetailsComponent } from './players/player-details/player-details.component';
import { PlayerListComponent } from './players/player-list/player-list.component';
import { AdminLoginComponent } from './users/admin-login/admin-login.component';

import {  
  MatTabsModule, 
  MatButtonModule, 
  MatTableModule, 
  MatFormFieldModule, 
  MatInputModule,
  MatDialogModule
} from '@angular/material';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  { path: 'dashboard', component: DashboardComponent },
  { path: 'gameList', component: GameListComponent },
  { path: 'gameDetail/:id', component: GameDetailsComponent },
  { path: 'playerList', component: PlayerListComponent },
  { path: 'playerDetail/:id', component: PlayerDetailsComponent },
  { path: 'login', component: AdminLoginComponent }
];

@NgModule({
  declarations: [
    DashboardComponent,
    GameDetailsComponent,
    GameListComponent,
    PlayerDetailsComponent,
    PlayerListComponent,
    AdminLoginComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    FormsModule,
    HttpModule,
    MatTabsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
  ],
  exports: [
    RouterModule
  ],
  providers: [
    CdkColumnDef
  ]
})
export class AppRoutingModule { }