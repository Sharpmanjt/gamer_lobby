import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { PlayerListComponent } from './players/player-list/player-list.component';
// import { PlayerDetailsComponent } from './players/player-details/player-details.component';

import {  MatTabsModule, 
          MatButtonModule, 
          MatTableModule, 
          MatFormFieldModule, 
          MatInputModule,
          MatDialogModule
        } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CdkColumnDef } from '@angular/cdk/table';
// import { AdminLoginComponent } from './users/admin-login/admin-login.component';
// import { GameListComponent } from './games/game-list/game-list.component';
// import { GameDetailsComponent } from './games/game-details/game-details.component';
// import { LoginButtonComponent } from './users/login-button/login-button.component';
// import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    // PlayerListComponent,
    // PlayerDetailsComponent,
    // AdminLoginComponent,
    // GameListComponent,
    // GameDetailsComponent,
    // LoginButtonComponent,
    // DashboardComponent
  ],
  imports: [
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
    AppRoutingModule
  ],
  providers: [
    CdkColumnDef
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
