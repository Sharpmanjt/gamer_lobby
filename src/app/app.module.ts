import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { PlayerListComponent } from './players/player-list/player-list.component';
import { PlayerDetailsComponent } from './players/player-details/player-details.component';

import {  MatTabsModule, 
          MatButtonModule, 
          MatTableModule, 
          MatFormFieldModule, 
          MatInputModule,
          MatDialogModule
        } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CdkColumnDef } from '@angular/cdk/table';

@NgModule({
  declarations: [
    AppComponent,
    PlayerListComponent,
    PlayerDetailsComponent
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
    MatDialogModule
  ],
  providers: [
    CdkColumnDef
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
