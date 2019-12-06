import { Component } from '@angular/core';
import { User } from './users/user'
// import { RouterModule, Routes } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Gamer Lobby';
  selectedUser: User;

}

