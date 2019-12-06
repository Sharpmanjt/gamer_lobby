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

import { PlayerService } from './players/player.service';
import { GameService } from './games/game.service';

import {  
  MatTabsModule, 
  MatButtonModule, 
  MatTableModule, 
  MatFormFieldModule, 
  MatInputModule,
  MatDialogModule
} from '@angular/material';

const routes: Routes = [
  { path: '', redirectTo: '/playerList', pathMatch: 'full'},
  { path: 'gameList', component: GameListComponent },
  { path: 'updateGame/:id', component: GameDetailsComponent, data: { kind: 'update'}  },
  { path: 'addGame', component: GameDetailsComponent, data: { kind: 'add'} },
  { path: 'playerList', component: PlayerListComponent },
  { path: 'updatePlayer/:id', component: PlayerDetailsComponent, data: { kind: 'update'} },
  { path: 'addPlayer', component: PlayerDetailsComponent, data: { kind: 'add'} },
  { path: 'joinGame/:id', component: PlayerDetailsComponent, data: {kind: 'join' }},
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
    CdkColumnDef,
    PlayerService,
    GameService
  ]
})
export class AppRoutingModule { }