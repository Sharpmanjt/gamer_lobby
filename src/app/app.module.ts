import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
    AppComponent
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
